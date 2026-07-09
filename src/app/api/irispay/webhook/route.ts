import { NextRequest, NextResponse } from "next/server";
import { getIrisWebhookSecret } from "@/lib/irispay";
import { verifyAndApplyIrisPayment } from "@/lib/irispayFinalize";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function readWebhookPayload(request: NextRequest): Promise<Record<string, unknown>> {
  const contentType = request.headers.get("content-type") ?? "";
  const queryPayload = Object.fromEntries(request.nextUrl.searchParams.entries());

  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => ({}));
    return {
      ...queryPayload,
      ...(typeof body === "object" && body !== null ? body : { body }),
    };
  }

  const text = await request.text().catch(() => "");
  return text ? { ...queryPayload, body: text } : queryPayload;
}

async function handleWebhook(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get("secret") ?? "";
    if (secret !== getIrisWebhookSecret()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orderId = request.nextUrl.searchParams.get("orderId") ?? "";
    if (!orderId) {
      return NextResponse.json({ error: "orderId is required" }, { status: 400 });
    }

    const webhookPayload = await readWebhookPayload(request);
    const result = await verifyAndApplyIrisPayment({ orderId, webhookPayload });

    return NextResponse.json({
      success: true,
      status: result.status,
      alreadyFinalized: result.alreadyFinalized,
    });
  } catch (error) {
    console.error("IRISPay webhook error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  return handleWebhook(request);
}

export async function POST(request: NextRequest) {
  return handleWebhook(request);
}
