import { listPromoRedemptions, summarizePromoStats, formatMoney } from "@/lib/adminData";
import KpiCard from "@/components/admin/KpiCard";
import PromoTable from "@/components/admin/PromoTable";
import tableStyles from "@/components/admin/AdminTable.module.css";

export const dynamic = "force-dynamic";

const MONTHS = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const START_YEAR = 2026;
const END_YEAR = Math.max(START_YEAR + 5, new Date().getFullYear() + 5);
const YEARS = Array.from({ length: END_YEAR - START_YEAR + 1 }, (_, i) => START_YEAR + i);

interface PageProps {
  searchParams: Promise<{
    code?: string;
    fromYear?: string;
    fromMonth?: string;
    toYear?: string;
    toMonth?: string;
  }>;
}

export default async function AdminPromotionsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // A year picked with no month defaults to the start/end of that year, so
  // "just pick a year" filters the whole year without also requiring a month.
  const from = params.fromYear ? `${params.fromYear}-${params.fromMonth || "01"}` : undefined;
  const to = params.toYear ? `${params.toYear}-${params.toMonth || "12"}` : undefined;

  const redemptions = await listPromoRedemptions({ code: params.code, from, to });
  const stats = summarizePromoStats(redemptions);

  const totalUses = redemptions.length;
  const paidUses = redemptions.filter((r) => r.status === "paid").length;
  const discountGiven = paidUses * 2000; // €20 free frame per paid redemption, in cents
  const isFiltered = !!(params.code || params.fromYear || params.toYear);

  return (
    <div>
      <div className={tableStyles.section}>
        <form className={tableStyles.filters} method="get">
          <input type="text" name="code" placeholder="Search code (e.g. FRANKFURT)" defaultValue={params.code ?? ""} />

          <span className={tableStyles.filterGroup}>
            <span className={tableStyles.filterGroupLabel}>From</span>
            <select name="fromMonth" defaultValue={params.fromMonth ?? ""} aria-label="From month">
              <option value="">Month</option>
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <select name="fromYear" defaultValue={params.fromYear ?? ""} aria-label="From year">
              <option value="">Year</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </span>

          <span className={tableStyles.filterGroup}>
            <span className={tableStyles.filterGroupLabel}>To</span>
            <select name="toMonth" defaultValue={params.toMonth ?? ""} aria-label="To month">
              <option value="">Month</option>
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <select name="toYear" defaultValue={params.toYear ?? ""} aria-label="To year">
              <option value="">Year</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </span>

          <button type="submit">Filter</button>
        </form>
      </div>

      <div className={tableStyles.kpiRow}>
        <KpiCard label={isFiltered ? "Matching redemptions" : "Total redemptions"} value={String(totalUses)} />
        <KpiCard label="Paid redemptions" value={String(paidUses)} />
        <KpiCard label="Discount given (paid)" value={formatMoney(discountGiven, "eur")} />
      </div>

      <div className={tableStyles.section}>
        <h2 className={tableStyles.sectionTitle}>By code</h2>
        {stats.length === 0 ? (
          <p className={tableStyles.empty}>No promo codes match these filters.</p>
        ) : (
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>Code</th>
                <th>Total uses</th>
                <th>Paid uses</th>
                <th>Last used</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((s) => (
                <tr key={s.code}>
                  <td>{s.code}</td>
                  <td>{s.totalUses}</td>
                  <td>{s.paidUses}</td>
                  <td>{s.lastUsedAt ? new Date(s.lastUsedAt).toLocaleString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className={tableStyles.section}>
        <h2 className={tableStyles.sectionTitle}>
          {isFiltered ? `Matching redemptions (${totalUses})` : `All redemptions (${totalUses})`}
        </h2>
        <p style={{ fontSize: 13, opacity: 0.6, marginBottom: 12 }}>Click a column header to sort.</p>
        <PromoTable redemptions={redemptions} />
      </div>
    </div>
  );
}
