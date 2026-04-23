import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdminToken } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("admin_session")?.value;
    if (!token || !(await verifyAdminToken(token))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const baseClicks = await prisma.pageClick.count({ 
      where: { 
        action: { in: ["unknown", "page_visit"] } 
      } 
    });
    
    const chatbotGroups = await prisma.pageClick.groupBy({
      by: ['action'],
      _count: { _all: true },
      where: { action: { notIn: ["unknown", "page_visit"] } }
    });

    const rawClicks = await prisma.pageClick.findMany({
      where: { action: { in: ["unknown", "page_visit"] } },
      orderBy: { clickedAt: "desc" },
      take: 200,
      select: { id: true, clickedAt: true, action: true },
    });

    const chatbotStats = chatbotGroups.reduce((acc: any, g: any) => {
      acc[g.action] = g._count._all;
      return acc;
    }, {});

    return NextResponse.json({ 
      total: baseClicks, 
      clicks: rawClicks,
      chatbotStats
    });
  } catch (err: any) {
    console.error("Error fetching page clicks:", err);
    return NextResponse.json({ total: 0, clicks: [], chatbotStats: {}, error: String(err) }, { status: 500 });
  }
}
