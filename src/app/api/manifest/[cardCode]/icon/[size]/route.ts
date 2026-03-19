import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { buildCloudinaryUrlFromUploadPath } from "@/lib/cloudinaryImagePath";

function buildCloudinaryPngSquare(url: string, size: number): string {
  const marker = "/upload/";
  const idx = url.indexOf(marker);
  if (idx === -1) {
    return url;
  }

  const prefix = url.slice(0, idx + marker.length);
  const suffix = url.slice(idx + marker.length);
  return `${prefix}c_fill,w_${size},h_${size},q_auto,f_png/${suffix}`;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ cardCode: string; size: string }> },
) {
  const { cardCode: cardCodeRaw, size: sizeRaw } = await params;
  const cardCode = cardCodeRaw.trim().toUpperCase();
  const parsedSize = Number.parseInt(sizeRaw, 10);
  const size = Number.isFinite(parsedSize) && parsedSize > 0 ? parsedSize : 192;

  try {
    const card = await prisma.card.findFirst({
      where: {
        cardCode,
        isActive: true,
      },
      select: {
        player: {
          select: {
            club: {
              select: {
                imageUrl: true,
                emblemUrl: true,
              },
            },
          },
        },
      },
    });

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME ?? "";
    const imagePath = card?.player.club?.imageUrl ?? null;
    const baseLogoUrl = imagePath
      ? imagePath.startsWith("http")
        ? imagePath
        : cloudName
          ? buildCloudinaryUrlFromUploadPath(imagePath, cloudName)
          : null
      : card?.player.club?.emblemUrl ?? null;

    if (baseLogoUrl) {
      const iconUrl = buildCloudinaryPngSquare(baseLogoUrl, size);
      return NextResponse.redirect(iconUrl, 302);
    }
  } catch (error) {
    console.error("Manifest icon route error:", error);
  }

  const fallback = size >= 512 ? "/icon-512.png" : "/icon-192.png";
  return NextResponse.redirect(fallback, 302);
}
