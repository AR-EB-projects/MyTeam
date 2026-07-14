import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ cardCode: string; docId: string }> },
) {
  const { cardCode, docId } = await params;

  const card = await prisma.card.findFirst({
    where: { cardCode: cardCode.toUpperCase(), isActive: true },
    select: { player: { select: { clubId: true } } },
  });

  if (!card?.player?.clubId) return new NextResponse("Not found", { status: 404 });

  const doc = await prisma.clubRulesDocument.findFirst({
    where: { id: docId, clubId: card.player.clubId },
    select: { document: true },
  });

  if (!doc) return new NextResponse("Not found", { status: 404 });

  return new NextResponse(new Uint8Array(doc.document), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
    },
  });
}
