import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdminToken } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function verifySession(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value;
  return token ? await verifyAdminToken(token) : null;
}

function normalizeMode(raw: unknown) {
  const value = String(raw ?? "").trim();
  if (value === "team_group" || value === "custom_group") {
    return value;
  }
  return null;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await verifySession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!session.roles.includes("admin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const trainingGroupMode = normalizeMode((body as { trainingGroupMode?: unknown }).trainingGroupMode);
  if (!trainingGroupMode) {
    return NextResponse.json({ error: "Invalid trainingGroupMode." }, { status: 400 });
  }

  try {
    const club = await prisma.club.update({
      where: { id },
      data: { trainingGroupMode },
      select: { id: true, trainingGroupMode: true },
    });
    return NextResponse.json(club);
  } catch (error) {
    console.error("Training group mode PATCH error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
