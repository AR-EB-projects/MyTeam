import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdminToken } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const FIXED_TIME_ZONE = "Europe/Sofia";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = request.cookies.get("admin_session")?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "\u041d\u044f\u043c\u0430\u0442\u0435 \u0434\u043e\u0441\u0442\u044a\u043f." }, { status: 401 });
  }

  const { id } = await params;
  const club = await prisma.club.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      reminderDay: true,
      overdueDay: true,
      reminderHour: true,
    },
  });

  if (!club) {
    return NextResponse.json({ error: "\u041e\u0442\u0431\u043e\u0440\u044a\u0442 \u043d\u0435 \u0435 \u043d\u0430\u043c\u0435\u0440\u0435\u043d." }, { status: 404 });
  }

  return NextResponse.json(club);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = request.cookies.get("admin_session")?.value;
  const session = token ? await verifyAdminToken(token) : null;
  if (!session) {
    return NextResponse.json({ error: "\u041d\u044f\u043c\u0430\u0442\u0435 \u0434\u043e\u0441\u0442\u044a\u043f." }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const reminderDay = Number.parseInt(String((body as { reminderDay?: unknown }).reminderDay ?? ""), 10);
  const overdueDay = Number.parseInt(String((body as { overdueDay?: unknown }).overdueDay ?? ""), 10);
  const reminderHour = Number.parseInt(String((body as { reminderHour?: unknown }).reminderHour ?? ""), 10);

  if (!Number.isInteger(reminderDay) || reminderDay < 1 || reminderDay > 28) {
    return NextResponse.json({ error: "\u0414\u0435\u043d\u044f\u0442 \u0437\u0430 \u043c\u0435\u0441\u0435\u0447\u043d\u043e \u043d\u0430\u043f\u043e\u043c\u043d\u044f\u043d\u0435 \u0442\u0440\u044f\u0431\u0432\u0430 \u0434\u0430 \u0435 \u043c\u0435\u0436\u0434\u0443 1 \u0438 28." }, { status: 400 });
  }
  if (!Number.isInteger(overdueDay) || overdueDay < 1 || overdueDay > 28) {
    return NextResponse.json({ error: "\u0414\u0435\u043d\u044f\u0442 \u0437\u0430 \u043f\u0440\u043e\u0441\u0440\u043e\u0447\u0438\u0435 \u0442\u0440\u044f\u0431\u0432\u0430 \u0434\u0430 \u0435 \u043c\u0435\u0436\u0434\u0443 1 \u0438 28." }, { status: 400 });
  }
  if (!Number.isInteger(reminderHour) || reminderHour < 0 || reminderHour > 23) {
    return NextResponse.json({ error: "\u0427\u0430\u0441\u044a\u0442 \u0442\u0440\u044f\u0431\u0432\u0430 \u0434\u0430 \u0435 \u043c\u0435\u0436\u0434\u0443 0 \u0438 23." }, { status: 400 });
  }
  const updated = await prisma.club.update({
    where: { id },
    data: {
      reminderDay,
      overdueDay,
      reminderHour,
      reminderTz: FIXED_TIME_ZONE,
    },
    select: {
      id: true,
      name: true,
      reminderDay: true,
      overdueDay: true,
      reminderHour: true,
    },
  });

  return NextResponse.json(updated);
}
