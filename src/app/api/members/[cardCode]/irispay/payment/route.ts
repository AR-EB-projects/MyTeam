import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import {
  buildAbsoluteAppUrl,
  createIrisPayment,
  getIrisWebhookSecret,
  isIrisPayEnabledForClub,
} from "@/lib/irispay";
import { resolveMemberPaymentIntent } from "@/lib/memberPayment";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function toMoney(value: Prisma.Decimal.Value): Prisma.Decimal {
  return new Prisma.Decimal(value).toDecimalPlaces(2);
}

function makeOrderId(): string {
  return `myclub-${crypto.randomUUID()}`;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ cardCode: string }> },
) {
  try {
    const { cardCode } = await params;
    const normalizedCardCode = cardCode.trim().toUpperCase();
    const body = await request.json().catch(() => ({}));
    const paidForRaw = (body as { paidFor?: unknown }).paidFor;

    if (!paidForRaw) {
      return NextResponse.json({ error: "paidFor is required" }, { status: 400 });
    }

    const parsedPaidFor = new Date(String(paidForRaw));
    if (Number.isNaN(parsedPaidFor.getTime())) {
      return NextResponse.json({ error: "paidFor must be a valid date" }, { status: 400 });
    }

    const card = await prisma.card.findFirst({
      where: {
        cardCode: normalizedCardCode,
        isActive: true,
      },
      select: {
        playerId: true,
        player: {
          select: {
            id: true,
            fullName: true,
            clubId: true,
            firstBillingMonth: true,
            paymentAmount: true,
            remainingTrainingCredits: true,
            club: {
              select: {
                id: true,
                name: true,
                paymentWorkflow: true,
                defaultPaymentAmount: true,
                defaultOnlineTrainingCredits: true,
              },
            },
          },
        },
      },
    });

    if (!card) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    if (!isIrisPayEnabledForClub(card.player.clubId)) {
      return NextResponse.json({ error: "Online payment is not enabled for this club" }, { status: 403 });
    }

    const workflow = card.player.club.paymentWorkflow;
    const isTrainingCreditWorkflow = workflow === "training_credits" || workflow === "training_credits_30_days";
    const onlineTrainingCredits = Number(card.player.club.defaultOnlineTrainingCredits ?? 0);

    if (isTrainingCreditWorkflow && (!Number.isInteger(onlineTrainingCredits) || onlineTrainingCredits <= 0)) {
      return NextResponse.json(
        { error: "Online payment is not configured for training credits." },
        { status: 400 },
      );
    }

    const resolved = await resolveMemberPaymentIntent({
      player: {
        id: card.player.id,
        fullName: card.player.fullName,
        firstBillingMonth: card.player.firstBillingMonth,
        remainingTrainingCredits: card.player.remainingTrainingCredits,
        club: { paymentWorkflow: workflow },
      },
      paidFor: parsedPaidFor,
      remainingTrainings: isTrainingCreditWorkflow ? onlineTrainingCredits : undefined,
    });

    const playerAmount = toMoney(card.player.paymentAmount);
    const clubAmount = toMoney(card.player.club.defaultPaymentAmount);
    const unitAmount = playerAmount.greaterThan(0) ? playerAmount : clubAmount;
    if (!unitAmount.greaterThan(0)) {
      return NextResponse.json(
        { error: "Online payment amount is not configured." },
        { status: 400 },
      );
    }

    const totalAmount = unitAmount.mul(resolved.paidDates.length).toDecimalPlaces(2);
    const existingPayment = await prisma.irisPayment.findFirst({
      where: {
        playerId: card.player.id,
        status: "WAITING",
        paidFor: resolved.paidFor,
        paidThrough: resolved.paidThrough,
        amount: totalAmount,
      },
      orderBy: { createdAt: "desc" },
    });

    if (existingPayment?.paymentHash && existingPayment.paymentLink) {
      return NextResponse.json({
        success: true,
        payment: {
          id: existingPayment.id,
          orderId: existingPayment.orderId,
          paymentHash: existingPayment.paymentHash,
          paymentLink: existingPayment.paymentLink,
          shortPaymentLink: existingPayment.shortPaymentLink,
          amount: existingPayment.amount.toString(),
          currency: existingPayment.currency,
          status: existingPayment.status,
          qrUrl: `/api/members/${encodeURIComponent(normalizedCardCode)}/irispay/payment/${encodeURIComponent(existingPayment.paymentHash)}/qr`,
        },
      });
    }

    const orderId = makeOrderId();
    const secret = getIrisWebhookSecret();
    const hookParams = new URLSearchParams({ secret, orderId });
    const hookUrl = buildAbsoluteAppUrl(`/api/irispay/webhook?${hookParams.toString()}`);
    const redirectUrl = buildAbsoluteAppUrl(`/member/${encodeURIComponent(normalizedCardCode)}?irispay=${encodeURIComponent(orderId)}`);

    const irisPayment = await prisma.irisPayment.create({
      data: {
        clubId: card.player.clubId,
        playerId: card.player.id,
        orderId,
        amount: totalAmount,
        currency: "EUR",
        paidFor: resolved.paidFor,
        paidThrough: resolved.paidThrough,
        trainingCredits: resolved.trainingCredits,
        status: "WAITING",
      },
    });

    try {
      const createPayload = await createIrisPayment({
        amount: totalAmount.toString(),
        description: `${card.player.club.name} - ${card.player.fullName}`,
        name: card.player.club.name,
        hookUrl,
        orderId,
        redirectUrl,
      });

      const updated = await prisma.irisPayment.update({
        where: { id: irisPayment.id },
        data: {
          accountId: createPayload.accountId ?? null,
          paymentHash: createPayload.paymentHash,
          paymentLink: createPayload.paymentLink,
          shortPaymentLink: createPayload.shortPaymentLink ?? null,
          rawCreatePayload: createPayload,
        },
      });

      return NextResponse.json({
        success: true,
        payment: {
          id: updated.id,
          orderId: updated.orderId,
          paymentHash: updated.paymentHash,
          paymentLink: updated.paymentLink,
          shortPaymentLink: updated.shortPaymentLink,
          amount: updated.amount.toString(),
          currency: updated.currency,
          status: updated.status,
          qrUrl: `/api/members/${encodeURIComponent(normalizedCardCode)}/irispay/payment/${encodeURIComponent(createPayload.paymentHash)}/qr`,
        },
      });
    } catch (error) {
      await prisma.irisPayment.update({
        where: { id: irisPayment.id },
        data: {
          status: "FAILED",
          rawCreatePayload: {
            error: error instanceof Error ? error.message : "IRISPay create payment failed",
          },
        },
      });
      throw error;
    }
  } catch (error) {
    console.error("IRISPay payment creation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 },
    );
  }
}
