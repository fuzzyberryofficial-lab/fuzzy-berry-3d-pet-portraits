import Link from "next/link";
import { CHECKOUT_CHAIN, FUNNEL_STEPS } from "@/lib/funnel";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";
import tableStyles from "@/components/admin/AdminTable.module.css";

export const dynamic = "force-dynamic";

const RANGES = [7, 30, 90] as const;

interface Row {
  step: string;
  source: string;
  device: string;
}

async function loadRows(days: number): Promise<Row[] | null> {
  if (!isSupabaseConfigured()) return null;
  const since = new Date(Date.now() - (days - 1) * 86400000).toISOString().slice(0, 10);
  const { data, error } = await getSupabaseAdmin()
    .from("funnel_events")
    .select("step, source, device")
    .gte("day", since)
    .limit(100000);
  if (error) return null;
  return (data ?? []) as Row[];
}

function pct(n: number, of: number): string {
  if (!of) return "–";
  return `${Math.round((n / of) * 100)}%`;
}

export default async function AdminFunnelPage({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
  const params = await searchParams;
  const days = RANGES.find((d) => String(d) === params.days) ?? 30;
  const rows = await loadRows(days);

  const count = (step: string, filter?: (r: Row) => boolean) =>
    rows ? rows.filter((r) => r.step === step && (!filter || filter(r))).length : 0;

  const sources = rows ? Array.from(new Set(rows.map((r) => r.source))).sort() : [];

  return (
    <div className={tableStyles.section}>
      <h2 className={tableStyles.sectionTitle}>Funnel</h2>
      <p className={tableStyles.empty} style={{ marginBottom: 14 }}>
        How many visits reach each step, and where people leave. Anonymous counts only: no cookies, no IP address, no
        visitor ID. Each step is counted once per page load, so a person who reloads is counted again.
      </p>
      <p style={{ marginBottom: 18, display: "flex", gap: 12 }}>
        {RANGES.map((d) => (
          <Link key={d} href={`/admin/funnel?days=${d}`} style={{ fontWeight: d === days ? 700 : 400 }}>
            Last {d} days
          </Link>
        ))}
      </p>

      {rows === null ? (
        <p className={tableStyles.empty}>
          No funnel data yet. The funnel_events table may not exist: run supabase/funnel_events.sql once in the
          Supabase SQL editor.
        </p>
      ) : (
        <>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>Step</th>
                <th>Visits</th>
                <th>From previous step</th>
                <th>From homepage</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {CHECKOUT_CHAIN.map(({ step, label }, i) => {
                const n = count(step);
                const prev = i > 0 ? count(CHECKOUT_CHAIN[i - 1].step) : n;
                return (
                  <tr key={step}>
                    <td>{label}</td>
                    <td>{n}</td>
                    <td>{i === 0 ? "" : pct(n, prev)}</td>
                    <td>{i === 0 ? "" : pct(n, count("view_home"))}</td>
                    <td>{pct(count(step, (r) => r.device === "mobile"), n)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <h3 className={tableStyles.sectionTitle} style={{ marginTop: 32 }}>
            Where visitors come from
          </h3>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>Source</th>
                <th>Homepage</th>
                <th>Order page</th>
                <th>Pressed Pay</th>
                <th>Paid</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((s) => (
                <tr key={s}>
                  <td>{s}</td>
                  <td>{count("view_home", (r) => r.source === s)}</td>
                  <td>{count("checkout_style", (r) => r.source === s)}</td>
                  <td>{count("checkout_pay_click", (r) => r.source === s)}</td>
                  <td>{count("checkout_done", (r) => r.source === s)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className={tableStyles.sectionTitle} style={{ marginTop: 32 }}>
            All steps
          </h3>
          <table className={tableStyles.table}>
            <tbody>
              {FUNNEL_STEPS.map((s) => (
                <tr key={s}>
                  <td>{s}</td>
                  <td>{count(s)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
