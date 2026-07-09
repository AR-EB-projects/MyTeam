import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isIrisPayEnabledForClub } from "@/lib/irispay";
import { verifyAndApplyIrisPayment } from "@/lib/irispayFinalize";

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
        id: true,
        orderId: true,
        paymentHash: true,
        paymentLink: true,
        shortPaymentLink: true,
        amount: true,
        currency: true,
        status: true,
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

    if (payment.status === "WAITING") {
      const verified = await verifyAndApplyIrisPayment({ orderId: payment.orderId });
      return NextResponse.json({
        success: true,
        status: verified.status,
        alreadyFinalized: verified.alreadyFinalized,
      });
    }

    return NextResponse.json({
      success: true,
      status: payment.status,
      alreadyFinalized: payment.status === "CONFIRMED",
    });
  } catch (error) {
    console.error("IRISPay status check error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 },
    );
  }
}
