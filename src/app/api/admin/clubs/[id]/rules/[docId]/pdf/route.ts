import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdminToken } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; docId: string }> },
) {
  const token = request.cookies.get("admin_session")?.value;
  const session = token ? await verifyAdminToken(token) : null;
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  const { id, docId } = await params;

  const doc = await prisma.clubRulesDocument.findFirst({
    where: { id: docId, clubId: id },
    select: { document: true },
  });

  if (!doc) return new NextResponse("Not found", { status: 404 });

  return new NextResponse(new Uint8Array(doc.document), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
    },
  });
}
