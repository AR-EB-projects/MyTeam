export type IrisPaymentStatusValue = "WAITING" | "FAILED" | "CONFIRMED";

export type IrisCreatePaymentInput = {
  amount: string;
  description: string;
  hookUrl: string;
  name?: string;
  orderId: string;
  redirectUrl: string;
};

export type IrisCreatePaymentResponse = {
  accountId?: string;
  paymentHash: string;
  paymentLink: string;
  shortPaymentLink?: string;
};

export type IrisStatusResponse = {
  currency?: string;
  date?: string;
  description?: string;
  orderId?: string;
  payerBank?: string;
  payerIban?: string;
  payerName?: string;
  receiverIban?: string;
  status?: string;
  sum?: number;
};

const DEFAULT_ALLOWED_CLUB_ID = "3600c653-f688-44eb-b63b-4e1c73385c01";

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}

function getBaseUrl(): string {
  return (process.env.IRISPAY_BASE_URL?.trim() || "https://dev.paybyclick.irispay.bg").replace(/\/+$/, "");
}

export function getIrisPayAllowedClubId(): string {
  return process.env.IRISPAY_CLUB_ID?.trim() || DEFAULT_ALLOWED_CLUB_ID;
}

export function isIrisPayEnabledForClub(clubId: string | null | undefined): boolean {
  if (!clubId) return false;
  if (process.env.IRISPAY_ENABLED?.trim().toLowerCase() === "false") return false;
  return clubId === getIrisPayAllowedClubId();
}

export function getIrisWebhookSecret(): string {
  return requiredEnv("IRISPAY_WEBHOOK_SECRET");
}

export function buildAbsoluteAppUrl(path: string): string {
  const baseUrl = requiredEnv("APP_BASE_URL").replace(/\/+$/, "");
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

async function parseIrisJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};
  if (!response.ok) {
    throw new Error(
      typeof payload?.message === "string"
        ? payload.message
        : typeof payload?.error === "string"
          ? payload.error
          : `IRISPay request failed with status ${response.status}`,
    );
  }
  return payload as T;
}

export async function createIrisPayment(input: IrisCreatePaymentInput): Promise<IrisCreatePaymentResponse> {
  const key = requiredEnv("IRISPAY_MERCHANT_KEY");
  const response = await fetch(`${getBaseUrl()}/backend/payment/external/${encodeURIComponent(key)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      currency: "EUR",
      description: input.description.slice(0, 240),
      hookUrl: input.hookUrl,
      lang: "bg",
      name: input.name?.slice(0, 34),
      orderId: input.orderId,
      redirectUrl: input.redirectUrl,
      sum: Number(input.amount),
      repayable: false,
      requestShortLink: true,
    }),
    cache: "no-store",
  });

  const payload = await parseIrisJson<IrisCreatePaymentResponse>(response);
  if (!payload.paymentHash || !payload.paymentLink) {
    throw new Error("IRISPay did not return a payment link");
  }
  return payload;
}

export async function getIrisPaymentStatus(paymentHash: string): Promise<IrisStatusResponse> {
  const response = await fetch(`${getBaseUrl()}/backend/payment/status/${encodeURIComponent(paymentHash)}`, {
    method: "GET",
    headers: { accept: "application/json" },
    cache: "no-store",
  });
  return parseIrisJson<IrisStatusResponse>(response);
}

export async function getIrisQrImage(paymentHash: string): Promise<{ body: ArrayBuffer; contentType: string }> {
  const response = await fetch(`${getBaseUrl()}/backend/payment/qr/${encodeURIComponent(paymentHash)}`, {
    method: "GET",
    headers: { accept: "image/jpeg" },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`IRISPay QR request failed with status ${response.status}`);
  }
  return {
    body: await response.arrayBuffer(),
    contentType: response.headers.get("content-type") || "image/jpeg",
  };
}

export function normalizeIrisStatus(status: unknown): IrisPaymentStatusValue | null {
  const normalized = String(status ?? "").trim().toUpperCase();
  if (normalized === "WAITING" || normalized === "FAILED" || normalized === "CONFIRMED") {
    return normalized;
  }
  return null;
}
