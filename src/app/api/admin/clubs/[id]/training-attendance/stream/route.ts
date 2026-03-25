import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdminToken } from "@/lib/adminAuth";
import { isIsoDate, isoDateToUtcMidnight } from "@/lib/training";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CHECK_INTERVAL_MS = 3000;

async function verifySession(request: NextRequest) {
  const token = request.cookies.get("admin_session")?.value;
  return token ? await verifyAdminToken(token) : null;
}

async function getAttendanceSignature(clubId: string, trainingDate: Date) {
  const [optOutCount, optOutAggregate, note] = await Promise.all([
    prisma.trainingOptOut.count({
      where: {
        trainingDate,
        player: {
          clubId,
          isActive: true,
        },
      },
    }),
    prisma.trainingOptOut.aggregate({
      where: {
        trainingDate,
        player: {
          clubId,
          isActive: true,
        },
      },
      _max: {
        createdAt: true,
      },
    }),
    prisma.trainingNote.findUnique({
      where: {
        clubId_trainingDate: {
          clubId,
          trainingDate,
        },
      },
      select: {
        updatedAt: true,
        note: true,
      },
    }),
  ]);

  const maxOptOutCreatedAt = optOutAggregate._max.createdAt?.getTime() ?? 0;
  const noteUpdatedAt = note?.updatedAt?.getTime() ?? 0;
  const noteLength = note?.note?.length ?? 0;
  return `${optOutCount}:${maxOptOutCreatedAt}:${noteUpdatedAt}:${noteLength}`;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await verifySession(request);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  const dateParam = request.nextUrl.searchParams.get("date")?.trim() ?? "";
  if (!isIsoDate(dateParam)) {
    return new Response("Invalid date query parameter", { status: 400 });
  }
  const trainingDate = isoDateToUtcMidnight(dateParam);

  const encoder = new TextEncoder();
  let previousSignature = await getAttendanceSignature(id, trainingDate);

  const stream = new ReadableStream({
    start(controller) {
      const sendEvent = (event: string, data: Record<string, unknown>) => {
        controller.enqueue(encoder.encode(`event: ${event}\n`));
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      sendEvent("connected", { date: dateParam });

      const interval = setInterval(async () => {
        if (request.signal.aborted) {
          clearInterval(interval);
          controller.close();
          return;
        }

        try {
          const nextSignature = await getAttendanceSignature(id, trainingDate);
          if (nextSignature !== previousSignature) {
            previousSignature = nextSignature;
            sendEvent("attendance-update", { date: dateParam, at: Date.now() });
          } else {
            sendEvent("heartbeat", { at: Date.now() });
          }
        } catch {
          sendEvent("stream-error", { at: Date.now() });
        }
      }, CHECK_INTERVAL_MS);

      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
