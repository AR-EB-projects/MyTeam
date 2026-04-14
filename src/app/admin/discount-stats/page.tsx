import type { Metadata } from "next";
import AdminDiscountStatsClient from "./page.client";

export const metadata: Metadata = {
  title: "Партньорски отстъпки | My Team Admin",
};

export default function AdminDiscountStatsPage() {
  return <AdminDiscountStatsClient />;
}
