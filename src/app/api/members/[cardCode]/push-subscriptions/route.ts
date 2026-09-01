import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { inferDeviceLabel } from "@/lib/push/device";
import {
  deactivatePushSubscription,
  hasOtherActivePushSubscriptions,
  savePushSubscription,
} from "@/lib/push/service";
import { notifyMemberPushEnabled } from "@/lib/push/notifyMemberPushEnabled";
import { parseBrowserPushSubscription } from "@/lib/push/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ cardCode: string }> }
) {
  const { cardCode } = await params;
  const normalizedCardCode = cardCode.trim().toUpperCase();
  const endpoint = request.nextUrl.searchParams.get("endpoint")?.trim() ?? "";

  if (!endpoint) {
    return NextResponse.json({ error: "endpoint is required" }, { status: 400 });
  }

  const card = await prisma.card.findFirst({
    where: {
      cardCode: normalizedCardCode,
      isActive: true,
    },
    select: {
      playerId: true,
    },
  });

  if (!card) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  try {
    const subscription = await prisma.pushSubscription.findUnique({
      where: {
        playerId_endpoint: {
          playerId: card.playerId,
          endpoint,
        },
      },
      select: { playerId: true, isActive: true },
    });

    return NextResponse.json({
      success: true,
      isActive: Boolean(subscription?.isActive),
    });
  } catch (error) {
    console.error("Push subscription GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch push subscription state." },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ cardCode: string }> }
) {
  const { cardCode } = await params;
  const normalizedCardCode = cardCode.trim().toUpperCase();
  const card = await prisma.card.findFirst({
    where: {
      cardCode: normalizedCardCode,
      isActive: true,
    },
    select: {
      playerId: true,
    },
  });

  if (!card) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const payload = body as { subscription?: unknown };
  const subscription = parseBrowserPushSubscription(payload.subscription);

  if (!subscription) {
    return NextResponse.json(
      { error: "Invalid push subscription payload" },
      { status: 400 }
    );
  }

  try {
    const userAgent = request.headers.get("user-agent");
    const device = inferDeviceLabel(userAgent);

    const existing = await prisma.pushSubscription.findUnique({
      where: {
        playerId_endpoint: {
          playerId: card.playerId,
          endpoint: subscription.endpoint,
        },
      },
      select: { playerId: true, isActive: true },
    });

    const saved = await savePushSubscription({
      memberId: card.playerId,
      subscription,
      userAgent,
      device,
    });

    const shouldNotifyAdmins = !existing || !existing.isActive;

    if (shouldNotifyAdmins) {
      try {
        await notifyMemberPushEnabled({ playerId: card.playerId });
      } catch (notifyError) {
        console.error("notifyMemberPushEnabled error:", notifyError);
      }
    }

    return NextResponse.json({
      success: true,
      id: saved.id,
      isActive: saved.isActive,
    });
  } catch (error) {
    console.error("Push subscription save error:", error);
    return NextResponse.json(
      { error: "Failed to save push subscription" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ cardCode: string }> }
) {
  const { cardCode } = await params;
  const normalizedCardCode = cardCode.trim().toUpperCase();
  const card = await prisma.card.findFirst({
    where: {
      cardCode: normalizedCardCode,
      isActive: true,
    },
    select: {
      playerId: true,
    },
  });

  if (!card) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const endpoint = (body as { endpoint?: unknown })?.endpoint;
  if (typeof endpoint !== "string" || endpoint.trim() === "") {
    return NextResponse.json(
      { error: "endpoint is required" },
      { status: 400 }
    );
  }

  try {
    const normalizedEndpoint = endpoint.trim();
    await deactivatePushSubscription(normalizedEndpoint, card.playerId);
    const hasOtherActiveProfiles = await hasOtherActivePushSubscriptions(
      normalizedEndpoint,
      card.playerId
    );

    return NextResponse.json({
      success: true,
      shouldUnsubscribeBrowser: !hasOtherActiveProfiles,
    });
  } catch (error) {
    console.error("Push subscription deactivate error:", error);
    return NextResponse.json(
      { error: "Failed to deactivate push subscription" },
      { status: 500 }
    );
  }
}
