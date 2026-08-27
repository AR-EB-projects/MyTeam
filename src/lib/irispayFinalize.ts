import { type IrisPayment } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getIrisPaymentStatus, normalizeIrisStatus } from "@/lib/irispay";
import {
  finalizeResolvedMemberPayment,
  publishPaymentUpdates,
  sendMemberPaymentNotification,
} from "@/lib/memberPayment";

type IrisPaymentWithPlayer = IrisPayment & {
  player: {
    cards: Array<{ cardCode: string }>;
  };
};

function buildPaidDates(payment: IrisPayment): Date[] {
  if (payment.paidThrough && payment.paidThrough.getTime() !== payment.paidFor.getTime()) {
    const dates: Date[] = [];
    const cursor = new Date(payment.paidFor);
    const end = payment.paidThrough;
    while (cursor.getTime() <= end.getTime()) {
      dates.push(new Date(cursor));
      cursor.setUTCMonth(cursor.getUTCMonth() + 1);
    }
    return dates;
  }
  return [payment.paidFor];
}

export async function verifyAndApplyIrisPayment(input: {
  orderId: string;
  webhookPayload?: Record<string, unknown>;
}) {
  const pendingPayment = await prisma.irisPayment.findUnique({
    where: { orderId: input.orderId },
    include: {
      player: {
        select: {
          cards: {
            where: { isActive: true },
            select: { cardCode: true },
            take: 1,
          },
        },
      },
    },
  });

  if (!pendingPayment) {
    throw new Error("IRIS payment transaction not found");
  }

  if (!pendingPayment.paymentHash) {
    throw new Error("IRIS payment hash is missing");
  }

  if (pendingPayment.status === "CONFIRMED" && pendingPayment.paymentLogId) {
    return {
      status: "CONFIRMED" as const,
      alreadyFinalized: true,
      irisPayment: pendingPayment,
    };
  }

  const statusPayload = await getIrisPaymentStatus(pendingPayment.paymentHash);
  const verifiedStatus = normalizeIrisStatus(statusPayload.status);
  if (!verifiedStatus) {
    throw new Error("IRISPay returned an unknown payment status");
  }

  if (verifiedStatus !== "CONFIRMED") {
    const updated = await prisma.irisPayment.update({
      where: { id: pendingPayment.id },
      data: {
        status: verifiedStatus,
        rawStatusPayload: statusPayload,
        ...(input.webhookPayload ? { rawWebhookPayload: input.webhookPayload } : {}),
      },
      include: {
        player: {
          select: {
            cards: {
              where: { isActive: true },
              select: { cardCode: true },
              take: 1,
            },
          },
        },
      },
    });
    return {
      status: verifiedStatus,
      alreadyFinalized: false,
      irisPayment: updated,
    };
  }

  const paidDates = buildPaidDates(pendingPayment);
  const finalized = await prisma.$transaction(async (tx) => {
    const claim = await tx.irisPayment.updateMany({
      where: {
        id: pendingPayment.id,
        paymentLogId: null,
      },
      data: {
        status: "CONFIRMED",
        confirmedAt: new Date(),
        rawStatusPayload: statusPayload,
        ...(input.webhookPayload ? { rawWebhookPayload: input.webhookPayload } : {}),
      },
    });

    if (claim.count === 0) {
      const currentPayment = await tx.irisPayment.findUnique({
        where: { id: pendingPayment.id },
        select: {
          status: true,
          paymentLogId: true,
        },
      });
      if (currentPayment?.status === "CONFIRMED" && currentPayment.paymentLogId) {
        return {
          alreadyFinalized: true,
          paymentLogId: currentPayment.paymentLogId,
        };
      }
      if (!currentPayment) {
        throw new Error("IRIS payment transaction not found");
      }
      throw new Error("IRIS payment could not be finalized");
    }

    const result = await finalizeResolvedMemberPayment({
      tx,
      playerId: pendingPayment.playerId,
      paidDates,
      recordedBy: "irispay",
      trainingCredits: pendingPayment.trainingCredits,
    });

    const primaryPaymentLogId = result.paymentLogIds[0] ?? null;
    await tx.irisPayment.update({
      where: { id: pendingPayment.id },
      data: {
        paymentLogId: primaryPaymentLogId,
        rawStatusPayload: statusPayload,
        ...(input.webhookPayload ? { rawWebhookPayload: input.webhookPayload } : {}),
      },
    });

    return {
      alreadyFinalized: false,
      paymentLogId: primaryPaymentLogId,
    };
  }, { isolationLevel: "Serializable" });

  const cardCode = (pendingPayment as IrisPaymentWithPlayer).player.cards[0]?.cardCode;
  if (cardCode) {
    publishPaymentUpdates(cardCode);
    if (!finalized.alreadyFinalized) {
      await sendMemberPaymentNotification({
        playerId: pendingPayment.playerId,
        paidDates,
        cardCode,
      });
    }
  }

  const updatedPayment = await prisma.irisPayment.findUnique({
    where: { id: pendingPayment.id },
    include: {
      player: {
        select: {
          cards: {
            where: { isActive: true },
            select: { cardCode: true },
            take: 1,
          },
        },
      },
    },
  });

  return {
    status: "CONFIRMED" as const,
    alreadyFinalized: finalized.alreadyFinalized,
    irisPayment: updatedPayment ?? pendingPayment,
  };
}
