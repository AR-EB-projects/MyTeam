let schedulerStarted = false;

export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  if (process.env.LOCAL_SCHEDULER !== "true") {
    return;
  }

  if (schedulerStarted) {
    return;
  }
  schedulerStarted = true;

  const [{ runMonthlyMembershipPaymentReminder }, { runMonthlyOverduePaymentReminder }] =
    await Promise.all([
      import("@/lib/jobs/monthlyMembershipPaymentReminder"),
      import("@/lib/jobs/monthlyOverduePaymentReminder"),
    ]);

  const run = async () => {
    try {
      const [membershipResult, overdueResult] = await Promise.all([
        runMonthlyMembershipPaymentReminder(),
        runMonthlyOverduePaymentReminder(),
      ]);

      if (!membershipResult.skipped) {
        console.log("Monthly reminder job executed:", membershipResult);
      } else {
        console.log("Monthly reminder job skipped:", membershipResult.reason);
      }

      if (!overdueResult.skipped) {
        console.log("Monthly overdue reminder job executed:", overdueResult);
      } else {
        console.log("Monthly overdue reminder job skipped:", overdueResult.reason);
      }
    } catch (error) {
      console.error("Local monthly schedulers failed:", error);
    }
  };

  // Run once on startup, then re-check every hour.
  void run();
  setInterval(() => {
    void run();
  }, 60 * 60 * 1000);
}
