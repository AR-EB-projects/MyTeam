import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getIrisQrImage, isIrisPayEnabledForClub } from "@/lib/irispay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ cardCode: string; paymentHash: string }> },
) {
  try {
    const { cardCode, paymentHash } = await params;
    const normalizedCardCode = cardCode.trim().toUpperCase();
    const payment = await prisma.irisPayment.findUnique({
      where: { paymentHash },
      select: {
        clubId: true,
        player: {
          select: {
            cards: {
              where: {
                cardCode: normalizedCardCode,
                isActive: true,
              },
              select: { cardCode: true },
              take: 1,
            },
          },
        },
      },
    });

    if (!payment || payment.player.cards.length === 0) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    if (!isIrisPayEnabledForClub(payment.clubId)) {
      return NextResponse.json({ error: "Online payment is not enabled for this club" }, { status: 403 });
    }

    const image = await getIrisQrImage(paymentHash);
    return new NextResponse(image.body, {
      headers: {
        "Content-Type": image.contentType,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("IRISPay QR error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 },
    );
  }
}
