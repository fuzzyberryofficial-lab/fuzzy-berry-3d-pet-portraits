"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { OrderRow } from "@/lib/adminData";
import { formatMoney } from "@/lib/adminData";
import StatusBadge from "./StatusBadge";
import tableStyles from "./AdminTable.module.css";

type SortKey = "date" | "code" | "customer" | "amount" | "status";
type SortDir = "asc" | "desc";

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "date", label: "Date & time" },
  { key: "code", label: "Code" },
  { key: "customer", label: "Customer" },
  { key: "amount", label: "Order total" },
  { key: "status", label: "Status" },
];

export default function PromoTable({ redemptions }: { redemptions: OrderRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sorted = useMemo(() => {
    const rows = [...redemptions];
    rows.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "date":
          cmp = a.created_at.localeCompare(b.created_at);
          break;
        case "code":
          cmp = (a.promo_code ?? "").localeCompare(b.promo_code ?? "");
          break;
        case "customer":
          cmp = (a.customers?.name ?? a.shipping_name).localeCompare(b.customers?.name ?? b.shipping_name);
          break;
        case "amount":
          cmp = a.amount_total - b.amount_total;
          break;
        case "status":
          cmp = a.status.localeCompare(b.status);
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [redemptions, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "date" ? "desc" : "asc");
    }
  };

  if (redemptions.length === 0) {
    return <p className={tableStyles.empty}>No promo code redemptions yet.</p>;
  }

  return (
    <table className={tableStyles.table}>
      <thead>
        <tr>
          {COLUMNS.map((col) => (
            <th key={col.key} className={tableStyles.sortableHeader} onClick={() => toggleSort(col.key)}>
              {col.label}
              {sortKey === col.key ? (sortDir === "asc" ? " ▲" : " ▼") : ""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map((order) => {
          const date = new Date(order.created_at);
          return (
            <tr key={order.id}>
              <td>
                {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </td>
              <td>{order.promo_code}</td>
              <td>
                <Link href={`/admin/orders/${order.id}`} className={tableStyles.rowLink}>
                  {order.customers?.name ?? order.shipping_name}
                </Link>
                <div>{order.customers?.email}</div>
              </td>
              <td>{formatMoney(order.amount_total, order.currency)}</td>
              <td>
                <StatusBadge status={order.status} createdAt={order.created_at} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
