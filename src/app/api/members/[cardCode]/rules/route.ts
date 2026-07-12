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
          club: { select: { rulesDocument: true } },
        },
      },
    },
  });

  const pdf = card?.player?.club?.rulesDocument;
  if (!pdf) return new NextResponse("Not found", { status: 404 });

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
    },
  });
}
