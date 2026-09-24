import Link from "next/link";
import { getDashboardStats, formatMoney } from "@/lib/adminData";
import { isSupabaseConfigured } from "@/lib/supabase";
import KpiCard from "@/components/admin/KpiCard";
import StatusBadge from "@/components/admin/StatusBadge";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteOrder } from "./orders/actions";
import tableStyles from "@/components/admin/AdminTable.module.css";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div>
      {!isSupabaseConfigured() && (
        <p className={tableStyles.notice}>
          Not connected to a database yet — this is a preview of the layout with no data. Add your Supabase
          credentials to activate real orders, photos, and customers.
        </p>
      )}

      <div className={tableStyles.kpiRow}>
        <KpiCard label="Total revenue (paid)" value={formatMoney(stats.totalRevenue, "eur")} />
        <KpiCard label="Paid orders" value={String(stats.totalOrders)} />
        <KpiCard label="Orders this week" value={String(stats.ordersThisWeek)} />
        <KpiCard label="Unique customers" value={String(stats.uniqueCustomers)} />
      </div>

      <div className={tableStyles.section}>
        <h2 className={tableStyles.sectionTitle}>Recent orders</h2>
        {stats.recentOrders.length === 0 ? (
          <p className={tableStyles.empty}>No orders yet.</p>
        ) : (
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <Link href={`/admin/orders/${order.id}`} className={tableStyles.rowLink}>
                      {order.customers?.name ?? order.shipping_name}
                    </Link>
                    <div>{order.customers?.email}</div>
                  </td>
                  <td>
                    {order.collection_key} · {order.type_key} · {order.size_label}
                  </td>
                  <td>{formatMoney(order.amount_total, order.currency)}</td>
                  <td>
                    <StatusBadge status={order.status} />
                  </td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>
                    <DeleteButton id={order.id} action={deleteOrder} confirmText="Delete this order? This can't be undone." />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
