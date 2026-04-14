type DiscountUsageSubscriber = (event: { type: "discount-usage"; timestamp: number }) => void;

const subscribers = new Set<DiscountUsageSubscriber>();

export function subscribeDiscountUsageEvents(subscriber: DiscountUsageSubscriber) {
  subscribers.add(subscriber);
  return () => {
    subscribers.delete(subscriber);
  };
}

export function publishDiscountUsage() {
  if (subscribers.size === 0) return;

  const event = { type: "discount-usage" as const, timestamp: Date.now() };

  for (const subscriber of subscribers) {
    try {
      subscriber(event);
    } catch (error) {
      console.error("Discount usage event subscriber error:", error);
    }
  }
}
