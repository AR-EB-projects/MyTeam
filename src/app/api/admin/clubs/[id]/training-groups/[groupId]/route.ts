import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdminToken } from "@/lib/adminAuth";
import {
  getWeekdayMondayFirst,
  getTodayIsoDateInTimeZone,
  isIsoDate,
  isoDateToUtcMidnight,
} from "@/lib/training";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const FIXED_TIME_ZONE = "Europe/Sofia";
const TRAINING_SELECTION_WINDOW_DAYS = 30;

async function verifySession(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value;
  return token ? await verifyAdminToken(token) : null;
}

function normalizeTrainingDates(raw: unknown): string[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  const todayIso = getTodayIsoDateInTimeZone(FIXED_TIME_ZONE);
  const start = isoDateToUtcMidnight(todayIso).getTime();
  const end = start + (TRAINING_SELECTION_WINDOW_DAYS - 1) * 24 * 60 * 60 * 1000;
  const dates: string[] = [];

  for (const value of raw) {
    const date = String(value ?? "").trim();
    if (!isIsoDate(date)) {
      throw new Error("Training dates must be valid ISO dates.");
    }
    const timestamp = isoDateToUtcMidnight(date).getTime();
    if (timestamp < start || timestamp > end) {
      throw new Error(`Training dates must be within the next ${TRAINING_SELECTION_WINDOW_DAYS} days.`);
    }
    dates.push(date);
  }

  return Array.from(new Set(dates)).sort((a, b) => a.localeCompare(b));
}

function normalizeTeamGroups(raw: unknown): number[] {
  if (!Array.isArray(raw)) {
    return [];
  }
  const unique = Array.from(
    new Set(
      raw
        .map((value) => Number.parseInt(String(value ?? "").trim(), 10))
        .filter((value) => Number.isInteger(value) && value > 0),
    ),
  );
  return unique.sort((a, b) => a - b);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; groupId: string }> },
) {
  const session = await verifySession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: clubId, groupId } = await params;
  if (!clubId || !groupId) {
    return NextResponse.json({ error: "Invalid parameters." }, { status: 400 });
  }

  try {
    const group = await prisma.clubTrainingScheduleGroup.findFirst({
      where: {
        id: groupId,
        clubId,
      },
      select: { id: true },
    });

    if (!group) {
      return NextResponse.json({ error: "Training group not found." }, { status: 404 });
    }

    await prisma.clubTrainingScheduleGroup.delete({
      where: { id: groupId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Training groups DELETE error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; groupId: string }> },
) {
  const session = await verifySession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: clubId, groupId } = await params;
  if (!clubId || !groupId) {
    return NextResponse.json({ error: "Invalid parameters." }, { status: 400 });
  }

  const body = await request.json().catch(() => ({}));
  const payload = body as { name?: unknown; teamGroups?: unknown; trainingDates?: unknown };
  const hasNameField = Object.prototype.hasOwnProperty.call(payload, "name");
  const hasTeamGroupsField = Object.prototype.hasOwnProperty.call(payload, "teamGroups");
  const hasTrainingDatesField = Object.prototype.hasOwnProperty.call(payload, "trainingDates");
  if (!hasNameField && !hasTeamGroupsField && !hasTrainingDatesField) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  try {
    const group = await prisma.clubTrainingScheduleGroup.findFirst({
      where: {
        id: groupId,
        clubId,
      },
      select: {
        id: true,
        name: true,
        teamGroups: true,
      },
    });

    if (!group) {
      return NextResponse.json({ error: "Training group not found." }, { status: 404 });
    }

    let nextTeamGroups = group.teamGroups;
    if (hasTeamGroupsField) {
      nextTeamGroups = normalizeTeamGroups(payload.teamGroups);
      if (nextTeamGroups.length < 2) {
        return NextResponse.json(
          { error: "Select at least 2 team groups for a training group." },
          { status: 400 },
        );
      }
    }

    let nextName = group.name;
    if (hasNameField) {
      const nameInput = String(payload.name ?? "").trim();
      nextName = nameInput || nextTeamGroups.map((value) => String(value)).join("/");
    }

    let nextTrainingDates: string[] | undefined;
    let nextTrainingWeekdays: number[] | undefined;
    if (hasTrainingDatesField) {
      try {
        nextTrainingDates = normalizeTrainingDates(payload.trainingDates);
      } catch (error) {
        return NextResponse.json(
          { error: error instanceof Error ? error.message : "Invalid training dates." },
          { status: 400 },
        );
      }
      nextTrainingWeekdays = Array.from(
        new Set(nextTrainingDates.map((date) => getWeekdayMondayFirst(date, FIXED_TIME_ZONE)).filter((value) => value >= 1 && value <= 7)),
      ).sort((a, b) => a - b);
    }

    const updateData: {
      name?: string;
      teamGroups?: number[];
      trainingDates?: string[];
      trainingWeekdays?: number[];
      trainingWindowDays?: number;
    } = {
      name: nextName,
      teamGroups: nextTeamGroups,
    };
    if (hasTrainingDatesField) {
      updateData.trainingDates = nextTrainingDates;
      updateData.trainingWeekdays = nextTrainingWeekdays;
      updateData.trainingWindowDays = TRAINING_SELECTION_WINDOW_DAYS;
    }

    const updated = await prisma.clubTrainingScheduleGroup.update({
      where: { id: groupId },
      data: updateData,
      select: {
        id: true,
        name: true,
        teamGroups: true,
        trainingDates: true,
        trainingWeekdays: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Training groups PATCH error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
