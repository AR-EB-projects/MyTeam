import { NextRequest, NextResponse } from "next/server";

const BREVO_CONTACTS_ENDPOINT = "https://api.brevo.com/v3/contacts";
const BREVO_SMTP_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
export const runtime = "nodejs";

type LeadPayload = {
  club?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  kids?: unknown;
};

type BrevoEmailPayload = {
  senderEmail: string;
  senderName: string;
  toEmail: string;
  toName?: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  replyToEmail?: string;
  replyToName?: string;
};

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function parseListIds(raw: string): number[] {
  return raw
    .split(",")
    .map((item) => Number(item.trim()))
    .filter((value) => Number.isInteger(value) && value > 0);
}

function normalizePhoneToE164(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("+")) {
    const normalized = `+${trimmed.slice(1).replace(/\D/g, "")}`;
    return /^\+[1-9]\d{7,14}$/.test(normalized) ? normalized : null;
  }

  const digitsOnly = trimmed.replace(/\D/g, "");
  if (!digitsOnly) return null;

  // 00XXXXXXXX -> +XXXXXXXX
  if (digitsOnly.startsWith("00")) {
    const normalized = `+${digitsOnly.slice(2)}`;
    return /^\+[1-9]\d{7,14}$/.test(normalized) ? normalized : null;
  }

  // BG local numbers like 08XXXXXXXX -> +3598XXXXXXXX
  if (digitsOnly.startsWith("0")) {
    const normalized = `+359${digitsOnly.slice(1)}`;
    return /^\+[1-9]\d{7,14}$/.test(normalized) ? normalized : null;
  }

  // BG mobile entered without leading 0, e.g. 89XXXXXXX
  if (digitsOnly.length === 9) {
    const normalized = `+359${digitsOnly}`;
    return /^\+[1-9]\d{7,14}$/.test(normalized) ? normalized : null;
  }

  const normalized = `+${digitsOnly}`;
  return /^\+[1-9]\d{7,14}$/.test(normalized) ? normalized : null;
}

function addCustomAttribute(
  attrs: Record<string, string>,
  envKey: string,
  value: string
) {
  const brevoAttrName = process.env[envKey]?.trim();
  if (brevoAttrName && value) {
    attrs[brevoAttrName] = value;
  }
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

async function sendBrevoEmail(
  apiKey: string,
  payload: BrevoEmailPayload
): Promise<boolean> {
  const response = await fetch(BREVO_SMTP_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: {
        email: payload.senderEmail,
        name: payload.senderName,
      },
      to: [{ email: payload.toEmail, name: payload.toName }],
      replyTo: payload.replyToEmail
        ? { email: payload.replyToEmail, name: payload.replyToName }
        : undefined,
      subject: payload.subject,
      htmlContent: payload.htmlContent,
      textContent: payload.textContent,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Brevo email send failed:", errorText);
    return false;
  }

  return true;
}

function buildSubmissionNotificationContent(
  club: string,
  name: string,
  email: string,
  phone: string,
  kids: string
) {
  const htmlContent = `
    <h2>Ново запитване от формата</h2>
    <p><strong>Клуб:</strong> ${escapeHtml(club)}</p>
    <p><strong>Име:</strong> ${escapeHtml(name)}</p>
    <p><strong>Имейл:</strong> ${escapeHtml(email)}</p>
    <p><strong>Телефон:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Брой деца:</strong> ${escapeHtml(kids)}</p>
  `;

  const textContent = [
    "Ново запитване от формата",
    `Клуб: ${club}`,
    `Име: ${name}`,
    `Имейл: ${email}`,
    `Телефон: ${phone}`,
    `Брой деца: ${kids}`,
  ].join("\n");

  return { htmlContent, textContent };
}

function buildLeadConfirmationContent(
  logoUrl: string,
  club: string,
  name: string,
  email: string,
  phone: string,
  kids: string
) {
  const htmlContent = `
  <div style="margin:0;padding:24px 0;background:#070C14;font-family:Arial,sans-serif;color:#EAF2FF;">
    <div style="max-width:620px;margin:0 auto;background:#0D1520;border:1px solid rgba(255,255,255,0.08);border-radius:14px;overflow:hidden;">
      <div style="padding:28px 28px 18px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.08);">
        <img src="${escapeHtml(logoUrl)}" alt="MyTeam" style="max-width:160px;height:auto;display:inline-block;" />
      </div>
      <div style="padding:28px;">
        <h1 style="margin:0 0 12px;font-size:24px;line-height:1.3;color:#39FF14;">Благодарим Ви за запитването, ${escapeHtml(name)}!</h1>
        <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#D9E5F5;">
          Получихме Вашата заявка успешно. Нашият екип ще се свърже с Вас възможно най-скоро.
        </p>
        <p style="margin:0 0 14px;font-size:14px;color:#9FB2C9;">Подадени данни:</p>
        <table role="presentation" style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;color:#8FA4BC;font-size:14px;">Клуб</td><td style="padding:8px 0;color:#FFFFFF;font-size:14px;">${escapeHtml(club)}</td></tr>
          <tr><td style="padding:8px 0;color:#8FA4BC;font-size:14px;">Име</td><td style="padding:8px 0;color:#FFFFFF;font-size:14px;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 0;color:#8FA4BC;font-size:14px;">Имейл</td><td style="padding:8px 0;color:#FFFFFF;font-size:14px;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px 0;color:#8FA4BC;font-size:14px;">Телефон</td><td style="padding:8px 0;color:#FFFFFF;font-size:14px;">${escapeHtml(phone)}</td></tr>
          <tr><td style="padding:8px 0;color:#8FA4BC;font-size:14px;">Прибл. брой деца</td><td style="padding:8px 0;color:#FFFFFF;font-size:14px;">${escapeHtml(kids)}</td></tr>
        </table>
      </div>
      <div style="padding:16px 28px;background:#0A111B;border-top:1px solid rgba(255,255,255,0.08);color:#88A0BC;font-size:12px;">
        MyTeam • Това е автоматично потвърждение.
      </div>
    </div>
  </div>
  `;

  const textContent = [
    `Благодарим Ви за запитването, ${name}!`,
    "Получихме Вашата заявка успешно.",
    "Подадени данни:",
    `Клуб: ${club}`,
    `Име: ${name}`,
    `Имейл: ${email}`,
    `Телефон: ${phone}`,
    `Прибл. брой деца: ${kids}`,
    "",
    "MyTeam",
  ].join("\n");

  return { htmlContent, textContent };
}

async function syncBrevoContact(
  apiKey: string,
  club: string,
  name: string,
  email: string,
  phone: string,
  kids: string
): Promise<boolean> {
  const listIds = parseListIds(process.env.BREVO_LEAD_LIST_IDS ?? "");
  const normalizedPhone = normalizePhoneToE164(phone);
  const attributes: Record<string, string> = {
    FIRSTNAME: name,
  };
  if (normalizedPhone) {
    attributes.SMS = normalizedPhone;
  }
  addCustomAttribute(attributes, "BREVO_ATTR_CLUB", club);
  addCustomAttribute(attributes, "BREVO_ATTR_KIDS", kids);
  addCustomAttribute(attributes, "BREVO_ATTR_PHONE", phone);

  const headers = {
    "Content-Type": "application/json",
    "api-key": apiKey,
  };
  const payload = {
    email,
    attributes,
    updateEnabled: true,
    listIds: listIds.length > 0 ? listIds : undefined,
  };

  let response = await fetch(BREVO_CONTACTS_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorJson: unknown = null;
    const errorText = await response.text();
    try {
      errorJson = JSON.parse(errorText) as unknown;
    } catch {
      // Keep raw text logging below if parsing fails.
    }

    const duplicateIdentifiers =
      typeof errorJson === "object" &&
      errorJson !== null &&
      "metadata" in errorJson &&
      typeof (errorJson as { metadata?: unknown }).metadata === "object" &&
      (errorJson as { metadata?: { duplicate_identifiers?: unknown } }).metadata !== null &&
      Array.isArray(
        (errorJson as { metadata?: { duplicate_identifiers?: unknown } }).metadata
          ?.duplicate_identifiers
      )
        ? (
            (errorJson as {
              metadata?: { duplicate_identifiers?: unknown[] };
            }).metadata?.duplicate_identifiers ?? []
          )
            .filter((entry): entry is string => typeof entry === "string")
        : [];

    const hasSmsDuplicate = duplicateIdentifiers.includes("SMS");
    if (hasSmsDuplicate && "SMS" in attributes) {
      const retryAttributes = { ...attributes };
      delete retryAttributes.SMS;

      response = await fetch(BREVO_CONTACTS_ENDPOINT, {
        method: "POST",
        headers,
        body: JSON.stringify({
          ...payload,
          attributes: retryAttributes,
        }),
      });
    } else {
      console.error("Brevo lead sync failed:", errorText);
    }
  }

  if (!response.ok) {
    const brevoError = await response.text();
    console.error("Brevo lead sync failed:", brevoError);
    return false;
  }

  return true;
}

async function sendSubmissionNotificationEmail(
  apiKey: string,
  senderEmail: string,
  senderName: string,
  notifyTo: string,
  club: string,
  name: string,
  email: string,
  phone: string,
  kids: string
): Promise<boolean> {
  const { htmlContent, textContent } = buildSubmissionNotificationContent(
    club,
    name,
    email,
    phone,
    kids
  );

  return sendBrevoEmail(apiKey, {
    senderEmail,
    senderName,
    toEmail: notifyTo,
    subject: `Ново запитване: ${club}`,
    htmlContent,
    textContent,
    replyToEmail: email,
    replyToName: name,
  });
}

async function sendLeadConfirmationEmail(
  apiKey: string,
  senderEmail: string,
  senderName: string,
  logoUrl: string,
  club: string,
  name: string,
  email: string,
  phone: string,
  kids: string
): Promise<boolean> {
  const { htmlContent, textContent } = buildLeadConfirmationContent(
    logoUrl,
    club,
    name,
    email,
    phone,
    kids
  );

  return sendBrevoEmail(apiKey, {
    senderEmail,
    senderName,
    toEmail: email,
    toName: name,
    subject: "Получихме Вашето запитване - MyTeam",
    htmlContent,
    textContent,
    replyToEmail: process.env.BREVO_NOTIFY_TO?.trim() ?? senderEmail,
    replyToName: senderName,
  });
}

export async function POST(request: NextRequest) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const club = asTrimmedString(body.club);
  const name = asTrimmedString(body.name);
  const email = asTrimmedString(body.email);
  const phone = asTrimmedString(body.phone);
  const kids = asTrimmedString(body.kids);

  if (!club || !name || !email || !phone || !kids) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "Brevo is not configured on the server" },
      { status: 500 }
    );
  }

  const senderEmail = process.env.BREVO_SENDER_EMAIL?.trim() ?? "";
  const senderName = process.env.BREVO_SENDER_NAME?.trim() || "MyTeam";
  const notifyTo = process.env.BREVO_NOTIFY_TO?.trim() ?? "";
  if (!senderEmail || !notifyTo) {
    return NextResponse.json(
      { error: "Brevo email settings are missing" },
      { status: 500 }
    );
  }

  const appBaseUrl =
    process.env.APP_BASE_URL?.trim() ??
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ??
    request.nextUrl.origin;
  const logoUrl = `${appBaseUrl.replace(/\/$/, "")}/myteam-logo.png`;

  const emailSent = await sendSubmissionNotificationEmail(
    apiKey,
    senderEmail,
    senderName,
    notifyTo,
    club,
    name,
    email,
    phone,
    kids
  );
  if (!emailSent) {
    return NextResponse.json(
      { error: "Failed to send submission email" },
      { status: 502 }
    );
  }

  const confirmationSent = await sendLeadConfirmationEmail(
    apiKey,
    senderEmail,
    senderName,
    logoUrl,
    club,
    name,
    email,
    phone,
    kids
  );

  const shouldSyncContacts = process.env.BREVO_SYNC_CONTACTS?.trim() === "true";
  let contactSynced = false;
  if (shouldSyncContacts) {
    contactSynced = await syncBrevoContact(apiKey, club, name, email, phone, kids);
  }

  return NextResponse.json({
    success: true,
    emailSent: true,
    confirmationSent,
    contactSynced,
    lead: { club, name, email, phone, kids },
  });
}
