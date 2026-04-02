type TrainingAttendanceEvent = {
  type: "attendance-update";
  clubId: string;
  trainingDate: string;
  timestamp: number;
};

type TrainingAttendanceSubscriber = (event: TrainingAttendanceEvent) => void;

const subscribersByClubId = new Map<string, Set<TrainingAttendanceSubscriber>>();

export function subscribeTrainingAttendanceEvents(
  clubId: string,
  subscriber: TrainingAttendanceSubscriber,
) {
  if (!subscribersByClubId.has(clubId)) {
    subscribersByClubId.set(clubId, new Set());
  }

  const set = subscribersByClubId.get(clubId)!;
  set.add(subscriber);

  return () => {
    const currentSet = subscribersByClubId.get(clubId);
    if (!currentSet) {
      return;
    }
    currentSet.delete(subscriber);
    if (currentSet.size === 0) {
      subscribersByClubId.delete(clubId);
    }
  };
}

export function publishTrainingAttendanceUpdated(clubId: string, trainingDate: string) {
  const set = subscribersByClubId.get(clubId);
  if (!set || set.size === 0) {
    return;
  }

  const event: TrainingAttendanceEvent = {
    type: "attendance-update",
    clubId,
    trainingDate,
    timestamp: Date.now(),
  };

  for (const subscriber of set) {
    try {
      subscriber(event);
    } catch (error) {
      console.error("Training attendance event subscriber error:", error);
    }
  }
}
