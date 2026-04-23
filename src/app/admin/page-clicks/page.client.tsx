"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./page.css";

interface ClickEntry {
  id: string;
  clickedAt: string;
  action?: string;
}

export default function PageClicksClient() {
  const router = useRouter();
  const [total, setTotal] = useState<number | null>(null);
  const [clicks, setClicks] = useState<ClickEntry[]>([]);
  const [chatbotStats, setChatbotStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/page-clicks", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: { total?: number; clicks?: ClickEntry[]; chatbotStats?: Record<string, number> }) => {
        setTotal(data.total ?? 0);
        setClicks(Array.isArray(data.clicks) ? data.clicks : []);
        setChatbotStats(data.chatbotStats || {});
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("bg-BG", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const optionsMap: Record<string, string> = {
    "chatbot_option_fees": "1. Такси",
    "chatbot_option_schedule": "2. График",
    "chatbot_option_communication": "3. Комуникация",
    "chatbot_option_discounts": "4. Отстъпки",
    "chatbot_option_other": "5. Друго",
    "chatbot_cta_call": "CTA: Обаждане",
    "chatbot_cta_form": "CTA: Форма за демо"
  };

  return (
    <main className="pc-page">
      <div className="pc-dot-grid" aria-hidden="true" />
      <div className="pc-inner">
        <button className="pc-back-btn" type="button" onClick={() => router.push("/admin/players")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Назад
        </button>

        <div className="pc-header">
          <h1 className="pc-title">Кликове и Взаимодействия</h1>
          <p className="pc-subtitle">Статистика за посещенията и чатбот асистента</p>
          <div className="pc-title-line" />
        </div>

        <div className="pc-stats-grid">
          <div className="pc-stat-card">
            <p className="pc-stat-label">Общо посещения на страницата</p>
            <p className="pc-stat-num">{loading ? "—" : (total ?? 0)}</p>
          </div>
          
          <div className="pc-stat-card chatbot-stats">
            <p className="pc-stat-label" style={{ marginBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "8px" }}>Чатбот Взаимодействия</p>
            {loading ? (
              <p className="pc-empty">Зареждане...</p>
            ) : Object.keys(chatbotStats).length === 0 ? (
              <p className="pc-empty">Няма данни.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                {Object.entries(chatbotStats).sort((a,b) => b[1] - a[1]).map(([key, val]) => (
                  <li key={key} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.95rem", color: "var(--light-gray)" }}>
                    <span>{optionsMap[key] || key}</span>
                    <strong style={{ color: "var(--neon-green)" }}>{val}</strong>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="pc-history">
          <h2 className="pc-history-title">История на кликовете</h2>
          {loading && <p className="pc-empty">Зареждане...</p>}
          {!loading && clicks.length === 0 && (
            <p className="pc-empty">Няма записани кликове.</p>
          )}
          {!loading && clicks.length > 0 && (
            <div className="pc-table-wrap">
              <table className="pc-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Дата и час</th>
                  </tr>
                </thead>
                <tbody>
                  {clicks.map((click, i) => (
                    <tr key={click.id}>
                      <td className="pc-td-num">{i + 1}</td>
                      <td>{formatDate(click.clickedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
