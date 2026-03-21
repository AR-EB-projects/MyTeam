import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { buildCloudinaryUrlFromUploadPath } from "@/lib/cloudinaryImagePath";
import { verifyAdminToken } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PlayerImageRecord = {
  imageUrl: string;
  isAdminView: boolean;
};

function getPlayerImagePathByAudience(
  images: PlayerImageRecord[],
  preferAdminView: boolean,
): string | null {
  if (preferAdminView) {
    const adminImage = images.find((image) => image.isAdminView);
    return adminImage?.imageUrl ?? images[0]?.imageUrl ?? null;
  }

  const nonAdminImage = images.find((image) => !image.isAdminView);
  if (nonAdminImage) {
    return nonAdminImage.imageUrl;
  }

  const adminImage = images.find((image) => image.isAdminView);
  return adminImage?.imageUrl ?? images[0]?.imageUrl ?? null;
}

function buildAvatarUrlFromPath(imagePath: string | null, cloudName: string): string | null {
  if (!imagePath) {
    return null;
  }
  if (imagePath.startsWith("http")) {
    return imagePath;
  }
  if (!cloudName) {
    return null;
  }
  return buildCloudinaryUrlFromUploadPath(imagePath, cloudName);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ cardCode: string }> }
) {
  const { cardCode } = await params;
  const normalizedCardCode = cardCode.trim().toUpperCase();
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const adminSessionToken = request.cookies.get("admin_session")?.value ?? null;
  const sessionPayload = adminSessionToken ? await verifyAdminToken(adminSessionToken) : null;
  const roles = sessionPayload?.roles ?? [];
  const isPrivilegedViewer = roles.includes("admin") || roles.includes("coach");

  try {
    const card = await prisma.card.findFirst({
      where: {
        cardCode: normalizedCardCode,
        isActive: true,
      },
      include: {
        player: {
          include: {
            club: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
                emblemUrl: true,
              },
            },
            images: {
              select: {
                imageUrl: true,
                isAdminView: true,
              },
            },
          },
        },
      },
    });

    if (!card) {
      return NextResponse.json(
        { error: "Member not found" },
        {
          status: 404,
          headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" },
        }
      );
    }

    let notifications: {
      id: string;
      type: string;
      title: string;
      body: string;
      url: string | null;
      sentAt: Date;
      readAt: Date | null;
    }[] = [];
    let unreadCount = 0;

    try {
      const [items, count] = await Promise.all([
        prisma.playerNotification.findMany({
          where: {
            playerId: card.player.id,
            sentAt: {
              gte: oneWeekAgo,
            },
          },
          orderBy: { sentAt: "desc" },
          take: 20,
        }),
        prisma.playerNotification.count({
          where: {
            playerId: card.player.id,
            readAt: null,
            sentAt: {
              gte: oneWeekAgo,
            },
          },
        }),
      ]);
      notifications = items;
      unreadCount = count;
    } catch (notificationError) {
      // Keep profile available if notification history table is not migrated yet.
      const code =
        typeof notificationError === "object" &&
        notificationError !== null &&
        "code" in notificationError
          ? String((notificationError as { code?: unknown }).code)
          : "";

      if (code !== "P2021") {
        console.error("Notification history unavailable:", notificationError);
      }
    }

    const paymentLogs = await prisma.paymentLog.findMany({
      where: { playerId: card.player.id },
      orderBy: { paidAt: "desc" },
      select: {
        id: true,
        paidFor: true,
        paidAt: true,
      },
    });

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME ?? "";
    const playerImagePath = getPlayerImagePathByAudience(card.player.images, isPrivilegedViewer);
    const clubImagePath = card.player.club?.imageUrl ?? null;
    const clubLogoUrl = clubImagePath
      ? clubImagePath.startsWith("http")
        ? clubImagePath
        : cloudName
          ? buildCloudinaryUrlFromUploadPath(clubImagePath, cloudName)
          : null
      : card.player.club?.emblemUrl ?? null;

    return NextResponse.json(
      {
        id: card.player.id,
        cardCode: card.cardCode,
        name: card.player.fullName,
        clubId: card.player.club?.id ?? null,
        clubName: card.player.club?.name ?? null,
        clubLogoUrl,
        avatarUrl: buildAvatarUrlFromPath(playerImagePath, cloudName),
        visits_total: 0,
        visits_used: 0,
        isActive: card.isActive,
        team_group: card.player.teamGroup,
        jerseyNumber: card.player.jerseyNumber,
        birthDate: card.player.birthDate,
        status: card.player.status,
        last_payment_date: card.player.lastPaymentDate,
        paymentLogs: paymentLogs.map((item) => ({
          id: item.id,
          paidFor: item.paidFor,
          paidAt: item.paidAt,
        })),
        notifications: notifications.map((item) => ({
          id: item.id,
          type: item.type,
          title: item.title,
          body: item.body,
          url: item.url,
          sentAt: item.sentAt,
          readAt: item.readAt,
        })),
        unread_notifications: unreadCount,
      },
      {
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" },
      }
    );
  } catch (error) {
    console.error("Member fetch error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
        headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" },
      }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ cardCode: string }> }
) {
  const { cardCode } = await params;
  const normalizedCardCode = cardCode.trim().toUpperCase();

  try {
    const body = await request.json().catch(() => ({}));

    const hasFullName = Object.prototype.hasOwnProperty.call(body, "fullName");
    const hasBirthDate = Object.prototype.hasOwnProperty.call(body, "birthDate");
    const hasTeamGroup = Object.prototype.hasOwnProperty.call(body, "teamGroup");
    const hasJerseyNumber = Object.prototype.hasOwnProperty.call(body, "jerseyNumber");
    const hasImageUrl = Object.prototype.hasOwnProperty.call(body, "imageUrl");

    if (!hasFullName && !hasBirthDate && !hasTeamGroup && !hasJerseyNumber && !hasImageUrl) {
      return NextResponse.json({ error: "No editable fields provided" }, { status: 400 });
    }

    const card = await prisma.card.findFirst({
      where: {
        cardCode: normalizedCardCode,
        isActive: true,
      },
      select: {
        playerId: true,
      },
    });

    if (!card) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    const data: {
      fullName?: string;
      birthDate?: Date | null;
      teamGroup?: number | null;
      jerseyNumber?: string | null;
    } = {};

    if (hasFullName) {
      const nextFullName = String((body as { fullName?: unknown }).fullName ?? "").trim();
      if (!nextFullName) {
        return NextResponse.json({ error: "fullName is required" }, { status: 400 });
      }
      data.fullName = nextFullName;
    }

    if (hasBirthDate) {
      const rawBirthDate = (body as { birthDate?: unknown }).birthDate;
      if (rawBirthDate === null || rawBirthDate === undefined || String(rawBirthDate).trim() === "") {
        data.birthDate = null;
      } else {
        const parsed = new Date(String(rawBirthDate));
        if (Number.isNaN(parsed.getTime())) {
          return NextResponse.json({ error: "Invalid birthDate" }, { status: 400 });
        }
        data.birthDate = parsed;
      }
    }

    if (hasTeamGroup) {
      const rawTeamGroup = (body as { teamGroup?: unknown }).teamGroup;
      if (rawTeamGroup === null || rawTeamGroup === undefined || String(rawTeamGroup).trim() === "") {
        data.teamGroup = null;
      } else {
        const parsed = Number.parseInt(String(rawTeamGroup), 10);
        if (Number.isNaN(parsed)) {
          return NextResponse.json({ error: "Invalid teamGroup" }, { status: 400 });
        }
        data.teamGroup = parsed;
      }
    }

    if (hasJerseyNumber) {
      const rawJerseyNumber = (body as { jerseyNumber?: unknown }).jerseyNumber;
      data.jerseyNumber =
        rawJerseyNumber === null || rawJerseyNumber === undefined || String(rawJerseyNumber).trim() === ""
          ? null
          : String(rawJerseyNumber).trim();
    }

    const nextImageUrl = hasImageUrl
      ? (body as { imageUrl?: unknown }).imageUrl === null ||
        (body as { imageUrl?: unknown }).imageUrl === undefined ||
        String((body as { imageUrl?: unknown }).imageUrl).trim() === ""
        ? null
        : String((body as { imageUrl?: unknown }).imageUrl).trim()
      : null;

    await prisma.$transaction(async (tx) => {
      if (Object.keys(data).length > 0) {
        await tx.player.update({
          where: {
            id: card.playerId,
          },
          data,
        });
      }

      if (hasImageUrl && nextImageUrl) {
        // Keep admin-view image intact; replace only the member-view image.
        await tx.image.deleteMany({
          where: {
            playerId: card.playerId,
            isAdminView: false,
          },
        });

        await tx.image.create({
          data: {
            playerId: card.playerId,
            imageUrl: nextImageUrl,
            isAdminView: false,
          },
        });
      }
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Member update error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
