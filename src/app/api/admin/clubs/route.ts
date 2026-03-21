import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdminToken } from "@/lib/adminAuth";
import {
  applyCloudinaryTransformToUrl,
  buildCloudinaryUrlFromUploadPath,
} from "@/lib/cloudinaryImagePath";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value;

  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const clubs = await prisma.club.findMany({
      select: {
        id: true,
        name: true,
        emblemUrl: true,
        imageUrl: true,
        imagePublicId: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME ?? "";
    const clubLogoTransform = "w_160,h_160,c_limit,dpr_auto,f_auto,q_auto:good";
    const normalizedClubs = clubs.map((club) => {
      if (club.imageUrl && cloudName && !club.imageUrl.startsWith("http")) {
        return {
          ...club,
          imageUrl: buildCloudinaryUrlFromUploadPath(club.imageUrl, cloudName, clubLogoTransform),
        };
      }
      if (club.imageUrl && club.imageUrl.startsWith("http")) {
        return {
          ...club,
          imageUrl: applyCloudinaryTransformToUrl(club.imageUrl, clubLogoTransform),
        };
      }
      return club;
    });

    return NextResponse.json(normalizedClubs);
  } catch (error) {
    console.error("Clubs fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
