import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  applyCloudinaryTransformToUrl,
  buildCloudinaryUrlFromUploadPath,
} from "@/lib/cloudinaryImagePath";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    const team = await prisma.club.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        emblemUrl: true,
        imageUrl: true,
        imagePublicId: true,
      },
    });

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME ?? "";
    const clubLogoTransform = "w_160,h_160,c_limit,dpr_auto,f_auto,q_auto:good";
    const normalizedTeam =
      team.imageUrl && cloudName && !team.imageUrl.startsWith("http")
        ? {
            ...team,
            imagePath: team.imageUrl,
            imageUrl: buildCloudinaryUrlFromUploadPath(team.imageUrl, cloudName, clubLogoTransform),
          }
        : team.imageUrl && team.imageUrl.startsWith("http")
          ? {
              ...team,
              imagePath: team.imageUrl,
              imageUrl: applyCloudinaryTransformToUrl(team.imageUrl, clubLogoTransform),
            }
        : {
            ...team,
            imagePath: team.imageUrl,
          };

    return NextResponse.json(normalizedTeam);
  } catch (error) {
    console.error("Team fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const imageUrlRaw = body.imageUrl;
    const imagePublicIdRaw = body.imagePublicId;

    if (!name) {
      return NextResponse.json({ error: "Team name is required" }, { status: 400 });
    }

    const existingTeam = await prisma.club.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingTeam) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const imageUrl =
      imageUrlRaw === null || imageUrlRaw === undefined || String(imageUrlRaw).trim() === ""
        ? null
        : String(imageUrlRaw).trim();
    const imagePublicId =
      imagePublicIdRaw === null ||
      imagePublicIdRaw === undefined ||
      String(imagePublicIdRaw).trim() === ""
        ? null
        : String(imagePublicIdRaw).trim();

    const updated = await prisma.club.update({
      where: { id },
      data: {
        name,
        imageUrl,
        imagePublicId,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Team update error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
