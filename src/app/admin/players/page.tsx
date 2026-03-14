"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type StatusFilter = "all" | "paid" | "unpaid";

interface PaymentLog {
  id: string;
  paidAt: string;
}

interface Player {
  id: string;
  fullName: string;
  teamGroup: number | null;
  paymentLogs: PaymentLog[];
}

const BG_MONTHS = [
  "Януари",
  "Февруари",
  "Март",
  "Април",
  "Май",
  "Юни",
  "Юли",
  "Август",
  "Септември",
  "Октомври",
  "Ноември",
  "Декември",
];

const BG_MONTHS_SHORT = BG_MONTHS.map((m) => m.slice(0, 3));

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function printViaIframe(html: string): void {
  const iframe = document.createElement("iframe");
  iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
  if (!doc) {
    document.body.removeChild(iframe);
    return;
  }

  doc.open();
  doc.write(html);
  doc.close();

  setTimeout(() => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch {
      // ignore
    }

    const cleanup = () => {
      try {
        document.body.removeChild(iframe);
      } catch {
        // ignore
      }
    };

    try {
      iframe.contentWindow?.addEventListener("afterprint", cleanup, { once: true });
    } catch {
      // ignore
    }
    setTimeout(cleanup, 60_000);
  }, 450);
}

export default function AdminPlayersPage() {
  const router = useRouter();
  const now = new Date();
  const currentYear = now.getFullYear();

  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingAnnual, setLoadingAnnual] = useState(false);

  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(Math.max(2026, currentYear));
  const [groupFilter, setGroupFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  useEffect(() => {
    if (!open) return;

    const loadPlayers = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/admin/members", { cache: "no-store" });
        if (!response.ok) {
          setPlayers([]);
          return;
        }

        const data = (await response.json()) as Array<{
          id: string;
          fullName: string;
          teamGroup: number | null;
          paymentLogs?: PaymentLog[];
        }>;

        setPlayers(
          data.map((p) => ({
            id: p.id,
            fullName: p.fullName,
            teamGroup: p.teamGroup ?? null,
            paymentLogs: p.paymentLogs ?? [],
          }))
        );
      } catch (error) {
        console.error("Failed to fetch players:", error);
        setPlayers([]);
      } finally {
        setLoading(false);
      }
    };

    void loadPlayers();
  }, [open]);

  const years = useMemo(() => {
    const end = Math.max(2026, currentYear + 1);
    return Array.from({ length: end - 2026 + 1 }, (_, i) => 2026 + i);
  }, [currentYear]);

  const groups = useMemo(
    () =>
      Array.from(
        new Set(players.map((p) => p.teamGroup).filter((g): g is number => g !== null))
      ).sort((a, b) => a - b),
    [players]
  );

  const filteredPlayers =
    groupFilter === "all"
      ? players
      : players.filter((p) => p.teamGroup === Number(groupFilter));

  const paidIds = useMemo(() => {
    const set = new Set<string>();
    for (const player of filteredPlayers) {
      for (const log of player.paymentLogs) {
        const d = new Date(log.paidAt);
        if (d.getMonth() === month && d.getFullYear() === year) {
          set.add(player.id);
          break;
        }
      }
    }
    return set;
  }, [filteredPlayers, month, year]);

  const paidPlayers = filteredPlayers.filter((p) => paidIds.has(p.id));
  const unpaidPlayers = filteredPlayers.filter((p) => !paidIds.has(p.id));
  const total = filteredPlayers.length;
  const paidCount = paidPlayers.length;
  const unpaidCount = unpaidPlayers.length;
  const percentage = total > 0 ? Math.round((paidCount / total) * 100) : 0;

  const displayPlayers =
    statusFilter === "paid"
      ? paidPlayers
      : statusFilter === "unpaid"
        ? unpaidPlayers
        : filteredPlayers;

  const paidAtMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const player of filteredPlayers) {
      const latest = player.paymentLogs
        .filter((log) => {
          const d = new Date(log.paidAt);
          return d.getMonth() === month && d.getFullYear() === year;
        })
        .sort((a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime())[0];
      if (latest) {
        map.set(player.id, latest.paidAt);
      }
    }
    return map;
  }, [filteredPlayers, month, year]);

  const percentColor =
    percentage >= 75 ? "#32cd32" : percentage >= 50 ? "#ffd700" : "#ff4d4d";

  const todayFormatted = new Date().toLocaleDateString("bg-BG", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleMonthlyReport = () => {
    const rows = displayPlayers
      .map((p, i) => {
        const isPaid = paidIds.has(p.id);
        const paidAt = paidAtMap.get(p.id);
        const dateStr = isPaid && paidAt ? new Date(paidAt).toLocaleDateString("bg-BG") : "—";
        return `<tr>
          <td>${i + 1}</td>
          <td>${esc(p.fullName)}</td>
          <td>${p.teamGroup ?? "—"}</td>
          <td>${dateStr}</td>
          <td>${isPaid ? "Платено" : "Неплатено"}</td>
        </tr>`;
      })
      .join("");

    const groupLine =
      groupFilter !== "all"
        ? `<p style="margin:4px 0 0;font-size:13px;color:#555">Набор: ${esc(groupFilter)}</p>`
        : "";

    const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
  @page { size: portrait; margin: 15mm; }
  body { font-family: Arial, sans-serif; color: #000; margin: 0; padding: 20px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { border-bottom: 2px solid #000; padding: 6px 8px; text-align: left; }
  td { border-bottom: 1px solid #ddd; padding: 6px 8px; }
</style></head><body>
  <h1 style="margin:0 0 6px;font-size:20px;font-weight:800">ФК ВИХЪР ВОЙВОДИНОВО</h1>
  <h2 style="margin:0 0 12px;font-size:16px;font-weight:600">ФИНАНСОВ ОТЧЕТ ЗА ${esc(BG_MONTHS[month].toUpperCase())} ${year}</h2>
  ${groupLine}
  <p style="font-size:14px;margin-bottom:16px"><strong>Платили:</strong> ${paidCount} / ${total} (${percentage}%)</p>
  <table>
    <thead><tr><th>#</th><th>Име</th><th>Набор</th><th>Дата на плащане</th><th>Статус</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <p style="margin-top:24px;font-size:11px;color:#888">Генериран на ${todayFormatted}</p>
</body></html>`;

    printViaIframe(html);
  };

  const handleAnnualReport = async () => {
    setLoadingAnnual(true);
    try {
      const filtered = [...filteredPlayers].sort((a, b) => {
        if (groupFilter === "all") {
          const ga = a.teamGroup ?? 0;
          const gb = b.teamGroup ?? 0;
          if (ga !== gb) return ga - gb;
        }
        return a.fullName.localeCompare(b.fullName, "bg");
      });

      const rows = filtered
        .map((p, i) => {
          const paidMonths = new Set(
            p.paymentLogs
              .map((l) => new Date(l.paidAt))
              .filter((d) => d.getFullYear() === year)
              .map((d) => d.getMonth())
          );
          const cells = BG_MONTHS.map((_, mi) => {
            const paid = paidMonths.has(mi);
            return `<td style="text-align:center;color:${paid ? "#228B22" : "#CC0000"};font-weight:${paid ? 700 : 400}">${paid ? "✓" : "—"}</td>`;
          }).join("");
          return `<tr><td style="text-align:center">${i + 1}</td><td style="white-space:nowrap">${esc(p.fullName)}</td>${cells}</tr>`;
        })
        .join("");

      const monthHeaders = BG_MONTHS_SHORT.map(
        (m) =>
          `<th style="padding:4px 2px;text-align:center;font-size:10px;font-weight:600">${m}</th>`
      ).join("");

      const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
  @page { size: landscape; margin: 10mm; }
  body { font-family: Arial, sans-serif; color: #000; margin: 0; padding: 10px; zoom: 0.9; }
  table { width: 100%; border-collapse: collapse; font-size: 11px; }
  th { border-bottom: 2px solid #000; padding: 4px 6px; font-size: 10px; font-weight: 600; }
  td { border-bottom: 1px solid #ddd; padding: 4px 6px; font-size: 11px; }
</style></head><body>
  <h1 style="margin:0 0 6px;font-size:18px;font-weight:800">ФК ВИХЪР ВОЙВОДИНОВО</h1>
  <h2 style="margin:0 0 12px;font-size:14px;font-weight:600">ГОДИШЕН ОТЧЕТ ЗА СЪБИРАЕМОСТ - ${year} Г.</h2>
  <table>
    <thead><tr><th>#</th><th style="text-align:left;min-width:120px">Име</th>${monthHeaders}</tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <p style="margin-top:16px;font-size:10px;color:#888">Генериран на ${todayFormatted}</p>
</body></html>`;

      printViaIframe(html);
    } finally {
      setLoadingAnnual(false);
    }
  };

  return (
    <div className="container p-6 fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-gold" style={{ fontSize: "2rem", fontWeight: 700 }}>
          Играчи
        </h1>
        <button className="btn btn-secondary" onClick={() => router.push("/admin/members")}>
          Назад
        </button>
      </div>

      <button
        className="btn"
        onClick={() => setOpen(true)}
        style={{
          border: "1px solid rgba(50,205,50,0.35)",
          color: "#32cd32",
          background: "rgba(50,205,50,0.08)",
          fontWeight: 700,
        }}
      >
        Център за отчети
      </button>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div
            className="modal-content fade-in"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "980px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#0d0d0d",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 style={{ margin: 0, color: "#32cd32", fontSize: "1.65rem", fontWeight: 800 }}>
                Център за отчети
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "2rem",
                  lineHeight: 1,
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            <div className="flex flex-wrap gap-3 items-end mb-5">
              <div className="flex gap-2">
                <div>
                  <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Месец
                  </label>
                  <select
                    className="input"
                    style={{ width: "140px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    value={String(month)}
                    onChange={(e) => setMonth(Number(e.target.value))}
                  >
                    {BG_MONTHS.map((m, i) => (
                      <option key={m} value={String(i)}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Година
                  </label>
                  <select
                    className="input"
                    style={{ width: "110px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    value={String(year)}
                    onChange={(e) => setYear(Number(e.target.value))}
                  >
                    {years.map((y) => (
                      <option key={y} value={String(y)}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Набор
                </label>
                <select
                  className="input"
                  style={{ width: "130px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                  value={groupFilter}
                  onChange={(e) => setGroupFilter(e.target.value)}
                >
                  <option value="all">Всички</option>
                  {groups.map((g) => (
                    <option key={g} value={String(g)}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Статус
                </label>
                <div
                  style={{
                    display: "flex",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {(
                    [
                      ["all", "Всички"],
                      ["paid", "Платили"],
                      ["unpaid", "Неплатили"],
                    ] as const
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => setStatusFilter(value)}
                      style={{
                        border: "none",
                        padding: "8px 12px",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        color:
                          statusFilter === value ? "#32cd32" : "rgba(255,255,255,0.5)",
                        background:
                          statusFilter === value
                            ? "rgba(50,205,50,0.18)"
                            : "rgba(255,255,255,0.05)",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-10">
                <div className="loading"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  <div
                    style={{
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.05)",
                      padding: "16px",
                    }}
                  >
                    <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                      👥 Общо събрани такси
                    </div>
                    <div className="text-2xl font-bold" style={{ color: "#32cd32" }}>
                      {paidCount}
                      <span className="text-sm ml-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                        / {total}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.05)",
                      padding: "16px",
                    }}
                  >
                    <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                      📈 Процент събираемост
                    </div>
                    <div className="text-2xl font-bold" style={{ color: percentColor }}>
                      {percentage}%
                    </div>
                  </div>

                  <div
                    style={{
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.05)",
                      padding: "16px",
                    }}
                  >
                    <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                      ⚠ Липсващи плащания
                    </div>
                    <div className="text-2xl font-bold" style={{ color: unpaidCount > 0 ? "#ff4d4d" : "#32cd32" }}>
                      {unpaidCount}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    maxHeight: "320px",
                    overflowY: "auto",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <table className="w-full text-sm">
                    <thead
                      style={{
                        position: "sticky",
                        top: 0,
                        background: "#1a1a1a",
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.8rem",
                      }}
                    >
                      <tr>
                        <th className="py-2 px-3 text-left font-medium">#</th>
                        <th className="py-2 px-3 text-left font-medium">Име</th>
                        <th className="py-2 px-3 text-left font-medium">Набор</th>
                        <th className="py-2 px-3 text-left font-medium">Дата на плащане</th>
                        <th className="py-2 px-3 text-left font-medium">Статус</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayPlayers.map((player, idx) => {
                        const isPaid = paidIds.has(player.id);
                        const paidAt = paidAtMap.get(player.id);
                        return (
                          <tr key={player.id} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                            <td className="py-2 px-3" style={{ color: "rgba(255,255,255,0.45)" }}>
                              {idx + 1}
                            </td>
                            <td className="py-2 px-3">{player.fullName}</td>
                            <td className="py-2 px-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                              {player.teamGroup ?? "—"}
                            </td>
                            <td className="py-2 px-3" style={{ color: "rgba(255,255,255,0.6)" }}>
                              {isPaid && paidAt ? new Date(paidAt).toLocaleDateString("bg-BG") : "—"}
                            </td>
                            <td className="py-2 px-3">
                              {isPaid ? (
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    borderRadius: "999px",
                                    padding: "2px 9px",
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    background: "rgba(50,205,50,0.2)",
                                    color: "#32cd32",
                                  }}
                                >
                                  Платено
                                </span>
                              ) : (
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    borderRadius: "999px",
                                    padding: "2px 9px",
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    background: "rgba(255,77,77,0.2)",
                                    color: "#ff4d4d",
                                  }}
                                >
                                  Неплатено
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}

                      {displayPlayers.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-8 text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
                            Няма играчи за показване
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="btn"
                    onClick={handleMonthlyReport}
                    style={{
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff",
                      background: "rgba(255,255,255,0.05)",
                      fontWeight: 600,
                    }}
                  >
                    Генерирай месечен отчет
                  </button>
                  <button
                    className="btn"
                    onClick={handleAnnualReport}
                    disabled={loadingAnnual}
                    style={{
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff",
                      background: "rgba(255,255,255,0.05)",
                      fontWeight: 600,
                      opacity: loadingAnnual ? 0.7 : 1,
                    }}
                  >
                    {loadingAnnual ? "Зареждане..." : "Генерирай годишен отчет"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
