import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdminToken } from "@/lib/adminAuth";
import {
  getWeekdayMondayFirst,
  getTodayIsoDateInTimeZone,
  isIsoDate,
  isoDateToUtcMidnight,
} from "@/lib/training";
import {
  sendTrainingScheduleNotifications,
  shouldNotifyForTrainingDatesChange,
} from "@/lib/push/trainingScheduleNotifications";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FIXED_TIME_ZONE = "Europe/Sofia";
const TRAINING_SELECTION_WINDOW_DAYS = 30;

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

async function verifySession(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value;
  return token ? await verifyAdminToken(token) : null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await verifySession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const groups = await prisma.clubTrainingScheduleGroup.findMany({
      where: { clubId: id },
      orderBy: { createdAt: "desc" },
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
    return NextResponse.json(groups);
  } catch (error) {
    console.error("Training groups GET error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await verifySession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  const teamGroups = normalizeTeamGroups((body as { teamGroups?: unknown }).teamGroups);
  if (teamGroups.length < 2) {
    return NextResponse.json(
      { error: "Select at least 2 team groups for a training group." },
      { status: 400 },
    );
  }

  const rawTrainingDates = (body as { trainingDates?: unknown }).trainingDates;
  const hasExplicitTrainingDates = Array.isArray(rawTrainingDates) && rawTrainingDates.length > 0;
  let trainingDates: string[] = [];
  if (hasExplicitTrainingDates) {
    try {
      trainingDates = normalizeTrainingDates(rawTrainingDates);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Invalid training dates." },
        { status: 400 },
      );
    }
  }

  const trainingWeekdays = Array.from(
    new Set(trainingDates.map((date) => getWeekdayMondayFirst(date, FIXED_TIME_ZONE)).filter((value) => value >= 1 && value <= 7)),
  ).sort((a, b) => a - b);

  const nameInput = String((body as { name?: unknown }).name ?? "").trim();
  const defaultName = teamGroups.map((group) => String(group)).join("/");
  const name = nameInput || defaultName;

  try {
    const group = await prisma.$transaction(async (tx) => {
      const club = await tx.club.findUnique({
        where: { id },
        select: { id: true },
      });
      if (!club) {
        throw new Error("CLUB_NOT_FOUND");
      }

      const created = await tx.clubTrainingScheduleGroup.create({
        data: {
          clubId: id,
          name,
          teamGroups,
          trainingDates,
          trainingWeekdays,
          trainingWindowDays: TRAINING_SELECTION_WINDOW_DAYS,
        },
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

      if (hasExplicitTrainingDates) {
        for (const teamGroup of teamGroups) {
          await tx.clubTrainingGroupSchedule.upsert({
            where: {
              clubId_teamGroup: {
                clubId: id,
                teamGroup,
              },
            },
            update: {
              trainingDates,
              trainingWeekdays,
              trainingWindowDays: TRAINING_SELECTION_WINDOW_DAYS,
            },
            create: {
              clubId: id,
              teamGroup,
              trainingDates,
              trainingWeekdays,
              trainingWindowDays: TRAINING_SELECTION_WINDOW_DAYS,
            },
          });
        }
      }

      return created;
    });

    let notifications = null;
    if (shouldNotifyForTrainingDatesChange([], group.trainingDates ?? [])) {
      notifications = await sendTrainingScheduleNotifications({
        clubId: id,
        teamGroups: group.teamGroups,
        previousDates: [],
        trainingDates: group.trainingDates,
      });
    }

    return NextResponse.json({ ...group, notifications }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "CLUB_NOT_FOUND") {
      return NextResponse.json({ error: "Club not found." }, { status: 404 });
    }
    console.error("Training groups POST error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
