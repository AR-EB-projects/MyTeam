import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

function readString(value: unknown, maxLength = 300) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  return trimmed.length > maxLength ? trimmed.slice(0, maxLength) : trimmed;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const payload = asRecord(body);
  if (!payload) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const cardCode = readString(payload.cardCode, 64) ?? "unknown";
  const phase = readString(payload.phase, 64) ?? "unknown";
  const errorName = readString(payload.errorName, 128) ?? "UnknownError";
  const errorMessage = readString(payload.errorMessage, 600) ?? "No message";
  const diagnostics = asRecord(payload.diagnostics) ?? null;

  console.error("Push client setup diagnostic:", {
    cardCode,
    phase,
    errorName,
    errorMessage,
    diagnostics,
    userAgent: request.headers.get("user-agent"),
    ip:
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip") ??
      null,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ success: true }, { status: 202 });
}
