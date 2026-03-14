import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdminToken } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.cookies.get("admin_session")?.value;

  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { paidFor } = await request.json();

    if (!paidFor) {
      return NextResponse.json(
        { error: "paidFor is required" },
        { status: 400 }
      );
    }

    // Validate that paidFor is a valid date
    const paidForDate = new Date(paidFor);
    if (isNaN(paidForDate.getTime())) {
      return NextResponse.json(
        { error: "paidFor must be a valid date" },
        { status: 400 }
      );
    }

    // Check if player exists
    const player = await prisma.player.findUnique({
      where: { id },
      include: {
        paymentLogs: {
          orderBy: { paidAt: "desc" },
          take: 1,
        },
      },
    });

    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    // Check if this month/year is already paid
    const existingPayment = await prisma.paymentLog.findFirst({
      where: {
        playerId: id,
        paidFor: paidForDate,
      },
    });

    if (existingPayment) {
      return NextResponse.json(
        { error: `Този период (${paidForDate.toLocaleDateString("bg-BG")}) вече е платен` },
        { status: 400 }
      );
    }

    // Create payment log
    const paymentLog = await prisma.paymentLog.create({
      data: {
        playerId: id,
        paidFor: paidForDate,
        recordedBy: "admin",
      },
    });

    // Update player's last payment date and status
    await prisma.player.update({
      where: { id },
      data: {
        lastPaymentDate: new Date(),
        status: "paid",
      },
    });

    return NextResponse.json({
      success: true,
      payment: {
        id: paymentLog.id,
        paidFor: paymentLog.paidFor,
        paidAt: paymentLog.paidAt,
      },
    });

  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.cookies.get("admin_session")?.value;

  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    // Get all payment logs for this player
    const paymentLogs = await prisma.paymentLog.findMany({
      where: { playerId: id },
      orderBy: { paidAt: "desc" },
      select: {
        id: true,
        paidFor: true,
        paidAt: true,
        recordedBy: true,
      },
    });

    return NextResponse.json({
      payments: paymentLogs,
    });

  } catch (error) {
    console.error("Payment fetch error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
