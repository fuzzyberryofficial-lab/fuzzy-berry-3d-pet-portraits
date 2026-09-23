import Link from "next/link";
import { listOrders, formatMoney } from "@/lib/adminData";
import StatusBadge from "@/components/admin/StatusBadge";
import tableStyles from "@/components/admin/AdminTable.module.css";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ q?: string; status?: string; from?: string; to?: string }>;
}

export default async function AdminOrdersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const orders = await listOrders(params);

  return (
    <div>
      <div className={tableStyles.section}>
        <h2 className={tableStyles.sectionTitle}>Orders ({orders.length})</h2>

        <form className={tableStyles.filters} method="get">
          <input type="text" name="q" placeholder="Search name or email" defaultValue={params.q ?? ""} />
          <select name="status" defaultValue={params.status ?? ""}>
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input type="date" name="from" defaultValue={params.from ?? ""} />
          <input type="date" name="to" defaultValue={params.to ?? ""} />
          <button type="submit">Filter</button>
        </form>

        {orders.length === 0 ? (
          <p className={tableStyles.empty}>No orders match these filters.</p>
        ) : (
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <Link href={`/admin/orders/${order.id}`} className={tableStyles.rowLink}>
                      {order.customers?.name ?? order.shipping_name}
                    </Link>
                    <div>{order.customers?.email}</div>
                  </td>
                  <td>
                    {order.collection_key} · {order.type_key} · {order.size_label}
                    {order.frame_color ? ` · ${order.frame_color} frame` : ""}
                  </td>
                  <td>{formatMoney(order.amount_total, order.currency)}</td>
                  <td>
                    <StatusBadge status={order.status} />
                  </td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
