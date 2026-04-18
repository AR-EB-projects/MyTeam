import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdminToken } from "@/lib/adminAuth";
import { buildNotificationPayload } from "@/lib/push/templates";
import { sendPushToClubAdmins } from "@/lib/push/adminService";
import { saveAdminNotificationHistory } from "@/lib/push/adminHistory";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value;
  const session = token ? await verifyAdminToken(token) : null;
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!session.roles.includes("admin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const payload = body as { clubIds?: unknown; message?: unknown };

  if (typeof payload.message !== "string" || !payload.message.trim()) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  const rawClubIds = Array.isArray(payload.clubIds)
    ? payload.clubIds.filter((id): id is string => typeof id === "string" && id.trim().length > 0).map((id) => id.trim())
    : [];

  if (rawClubIds.length === 0) {
    return NextResponse.json({ error: "clubIds is required" }, { status: 400 });
  }

  const message = payload.message.trim();

  const clubs = await prisma.club.findMany({
    where: { id: { in: rawClubIds } },
    select: { id: true },
  });
  if (clubs.length === 0) {
    return NextResponse.json({ error: "No clubs found" }, { status: 404 });
  }

  const pushPayload = buildNotificationPayload({
    type: "admin_message",
    trainerMessage: message,
    url: "/admin/members",
  });

  const results = await Promise.all(
    clubs.map(async (club) => {
      const sendResult = await sendPushToClubAdmins(club.id, pushPayload);
      await saveAdminNotificationHistory({ clubId: club.id, type: "admin_message", payload: pushPayload });
      return { clubId: club.id, ...sendResult };
    }),
  );

  const summary = results.reduce(
    (acc, r) => { acc.total += r.total; acc.sent += r.sent; acc.failed += r.failed; acc.deactivated += r.deactivated; return acc; },
    { total: 0, sent: 0, failed: 0, deactivated: 0 },
  );

  return NextResponse.json({ success: true, ...summary, results });
}
