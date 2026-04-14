"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import "./page.css";

const PARTNER_LABELS: Record<string, string> = {
  SPORT_DEPOT: "Sport Depot",
  IDB: "Innline Dragon Body",
  NIKO: "Мебели Нико",
  DALIDA: "Dalida Dance",
};

const PARTNER_BADGE_CLASS: Record<string, string> = {
  SPORT_DEPOT: "ds-badge-sd",
  IDB: "ds-badge-idb",
  NIKO: "ds-badge-niko",
  DALIDA: "ds-badge-dalida",
};

interface ClubRow {
  id: string;
  name: string;
}

interface DailyRow {
  createdAt: string;
  partner: string;
  action: string;
}

interface StatsResponse {
  totals: Record<string, { view: number; copy: number }>;
  daily: DailyRow[];
}

function getDefaultFrom(): string {
  const d = new Date();
  d.setDate(d.getDate() - 29);
  return d.toISOString().slice(0, 10);
}

function getDefaultTo(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function AdminDiscountStatsClient() {
  const router = useRouter();

  const [clubs, setClubs] = useState<ClubRow[]>([]);
  const [selectedClubId, setSelectedClubId] = useState("");
  const [from, setFrom] = useState(getDefaultFrom);
  const [to, setTo] = useState(getDefaultTo);

  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void fetch("/api/admin/clubs", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: unknown) => {
        if (Array.isArray(data)) setClubs(data as ClubRow[]);
      })
      .catch(() => {});
  }, []);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (selectedClubId) params.set("clubId", selectedClubId);
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      const res = await fetch(`/api/admin/discount-stats?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) {
        setError("Грешка при зареждане на данните.");
        return;
      }
      const data = (await res.json()) as StatsResponse;
      setStats(data);
    } catch {
      setError("Грешка при зареждане на данните.");
    } finally {
      setLoading(false);
    }
  }, [selectedClubId, from, to]);

  useEffect(() => {
    void fetchStats();
  }, [fetchStats]);

  // Always keep a ref to the latest fetchStats so the SSE handler
  // never captures a stale closure, without reopening the connection on filter changes.
  const fetchStatsRef = useRef(fetchStats);
  useEffect(() => {
    fetchStatsRef.current = fetchStats;
  }, [fetchStats]);

  useEffect(() => {
    const es = new EventSource("/api/admin/discount-stats/events");

    es.onmessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data as string) as { type: string };
      if (data.type === "discount-usage") {
        void fetchStatsRef.current();
      }
    };

    return () => {
      es.close();
    };
  }, []); // Opens once on mount, never closed by filter changes

  const PARTNERS = ["SPORT_DEPOT", "IDB", "NIKO", "DALIDA"];

  return (
    <div className="ds-page">
      <div className="ds-dot-grid" />
      <div className="ds-inner">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
          <div>
            <button className="ds-back-btn" onClick={() => router.push("/admin/players")} type="button">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6" /></svg>
              Назад
            </button>
            <div className="ds-header">
              <h1 className="ds-title">Партньорски отстъпки</h1>
              <p className="ds-subtitle">Статистика за използване на отстъпките по партньори</p>
              <div className="ds-title-line" />
            </div>
          </div>
          <AdminLogoutButton />
        </div>

        {/* Filters */}
        <div className="ds-filters">
          <select
            className="ds-filter-select"
            value={selectedClubId}
            onChange={(e) => setSelectedClubId(e.target.value)}
          >
            <option value="">Всички отбори</option>
            {clubs.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <input
            type="date"
            className="ds-filter-input"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            type="date"
            className="ds-filter-input"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        {/* Summary cards */}
        <div className="ds-summary">
          {PARTNERS.map((partner) => {
            const t = stats?.totals[partner] ?? { view: 0, copy: 0 };
            return (
              <div key={partner} className="ds-card">
                <div className="ds-card-name">{PARTNER_LABELS[partner]}</div>
                <div className="ds-card-stats">
                  <div className="ds-stat">
                    <span className="ds-stat-value">{t.view}</span>
                    <span className="ds-stat-label">Прегледи</span>
                  </div>
                  <div className="ds-stat">
                    <span className="ds-stat-value">{t.copy}</span>
                    <span className="ds-stat-label">Копирания</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Daily table */}
        <div className="ds-table-wrap">
          <div className="ds-table-title">Дневна разбивка</div>
          {loading ? (
            <div className="ds-loading">Зареждане...</div>
          ) : error ? (
            <div className="ds-empty">{error}</div>
          ) : !stats || stats.daily.length === 0 ? (
            <div className="ds-empty">Няма записани използвания за избрания период.</div>
          ) : (
            <table className="ds-table">
              <thead>
                <tr>
                  <th>Дата и час</th>
                  <th>Партньор</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {stats.daily.map((row, i) => {
                  const dt = new Date(row.createdAt);
                  const dateStr = dt.toLocaleDateString("bg-BG", { timeZone: "Europe/Sofia", day: "2-digit", month: "2-digit", year: "numeric" });
                  const timeStr = dt.toLocaleTimeString("bg-BG", { timeZone: "Europe/Sofia", hour: "2-digit", minute: "2-digit", second: "2-digit" });
                  return (
                    <tr key={i}>
                      <td style={{ whiteSpace: "nowrap" }}>{dateStr} {timeStr}</td>
                      <td>
                        <span className={`ds-partner-badge ${PARTNER_BADGE_CLASS[row.partner] ?? ""}`}>
                          {PARTNER_LABELS[row.partner] ?? row.partner}
                        </span>
                      </td>
                      <td>
                        <span className={row.action === "copy" ? "ds-action-copy" : "ds-action-view"}>
                          {row.action === "copy" ? "Копиран код" : "Преглед"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
