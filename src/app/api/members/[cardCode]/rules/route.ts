import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ cardCode: string }> },
) {
  const { cardCode } = await params;

  const card = await prisma.card.findFirst({
    where: { cardCode: cardCode.toUpperCase(), isActive: true },
    select: {
      player: {
        select: {
          club: { select: { id: true, rulesDocuments: { select: { id: true, name: true }, orderBy: { createdAt: "asc" } } } },
        },
      },
    },
  });

  const club = card?.player?.club;
  if (!club) return NextResponse.json({ documents: [] });

  return NextResponse.json({ documents: club.rulesDocuments });
}
