import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdminToken } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function verifySession(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value;
  return token ? await verifyAdminToken(token) : null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const docs = await prisma.clubRulesDocument.findMany({
    where: { clubId: id },
    select: { id: true, name: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ documents: docs });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await verifySession(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const club = await prisma.club.findUnique({ where: { id }, select: { id: true } });
  if (!club) return NextResponse.json({ error: "Club not found" }, { status: 404 });

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (file.type !== "application/pdf") return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });

  const MAX_SIZE_BYTES = 20 * 1024 * 1024;
  if (file.size > MAX_SIZE_BYTES) return NextResponse.json({ error: "File too large (max 20 MB)" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const doc = await prisma.clubRulesDocument.create({
    data: { clubId: id, name: file.name, document: buffer },
    select: { id: true, name: true },
  });

  return NextResponse.json({ document: doc });
}
