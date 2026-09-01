import { describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "./route";
import { prisma } from "@/lib/db";
import { verifyAndApplyIrisPayment } from "@/lib/irispayFinalize";

const mocks = vi.hoisted(() => ({
  irisPaymentFindUnique: vi.fn(),
  verifyAndApplyIrisPayment: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    irisPayment: {
      findUnique: mocks.irisPaymentFindUnique,
    },
  },
}));

vi.mock("@/lib/irispay", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/irispay")>();
  return {
    ...actual,
    isIrisPayEnabledForClub: vi.fn().mockReturnValue(true),
  };
});

vi.mock("@/lib/irispayFinalize", () => ({
  verifyAndApplyIrisPayment: mocks.verifyAndApplyIrisPayment,
}));

describe("IRISPay payment status route", () => {
  it("runs confirmed payments through the finalizer so link deactivation can be retried", async () => {
    mocks.irisPaymentFindUnique.mockResolvedValueOnce({
      id: "iris-1",
      orderId: "order-1",
      paymentHash: "hash-1",
      paymentLink: "https://paybyclick.irispay.bg/#/payment/link/hash-1",
      shortPaymentLink: null,
      amount: { toString: () => "20.00" },
      currency: "EUR",
      status: "CONFIRMED",
      clubId: "club-1",
      player: {
        cards: [{ cardCode: "CARD1" }],
      },
    });
    mocks.verifyAndApplyIrisPayment.mockResolvedValueOnce({
      status: "CONFIRMED",
      alreadyFinalized: true,
    });

    const response = await GET(
      new NextRequest("https://myteam7.com/api/members/CARD1/irispay/payment/hash-1"),
      { params: Promise.resolve({ cardCode: "CARD1", paymentHash: "hash-1" }) },
    );

    await expect(response.json()).resolves.toEqual({
      success: true,
      status: "CONFIRMED",
      alreadyFinalized: true,
    });
    expect(prisma.irisPayment.findUnique).toHaveBeenCalledWith(expect.objectContaining({
      where: { paymentHash: "hash-1" },
    }));
    expect(verifyAndApplyIrisPayment).toHaveBeenCalledWith({ orderId: "order-1" });
  });
});
