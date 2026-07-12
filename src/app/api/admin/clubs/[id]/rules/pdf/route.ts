import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdminToken } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = request.cookies.get("admin_session")?.value;
  const session = token ? await verifyAdminToken(token) : null;
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  const { id } = await params;

  const club = await prisma.club.findUnique({
    where: { id },
    select: { rulesDocument: true },
  });

  if (!club?.rulesDocument) return new NextResponse("Not found", { status: 404 });

  return new NextResponse(new Uint8Array(club.rulesDocument), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
    },
  });
}
