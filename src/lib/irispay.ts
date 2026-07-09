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
const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ж: "zh", з: "z", и: "i", й: "y",
  к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u",
  ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sht", ъ: "a", ь: "y", ю: "yu", я: "ya",
  А: "A", Б: "B", В: "V", Г: "G", Д: "D", Е: "E", Ж: "Zh", З: "Z", И: "I", Й: "Y",
  К: "K", Л: "L", М: "M", Н: "N", О: "O", П: "P", Р: "R", С: "S", Т: "T", У: "U",
  Ф: "F", Х: "H", Ц: "Ts", Ч: "Ch", Ш: "Sh", Щ: "Sht", Ъ: "A", Ь: "Y", Ю: "Yu", Я: "Ya",
};

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

function sanitizeIrisText(value: string, fallback: string, maxLength: number): string {
  const transliterated = Array.from(value)
    .map((char) => CYRILLIC_TO_LATIN[char] ?? char)
    .join("");
  const sanitized = transliterated
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9 .,_:()/-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength)
    .trim();

  return sanitized || fallback.slice(0, maxLength);
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
      description: sanitizeIrisText(input.description, "MyTeam payment", 240),
      hookUrl: input.hookUrl,
      lang: "bg",
      name: input.name ? sanitizeIrisText(input.name, "MyTeam", 34) : undefined,
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
