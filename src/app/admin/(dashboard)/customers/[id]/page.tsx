import Link from "next/link";
import { notFound } from "next/navigation";
import { getCustomerById, getOrdersByCustomerId, formatMoney } from "@/lib/adminData";
import StatusBadge from "@/components/admin/StatusBadge";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteCustomer } from "../actions";
import tableStyles from "@/components/admin/AdminTable.module.css";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminCustomerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const customer = await getCustomerById(id);
  if (!customer) notFound();

  const orders = await getOrdersByCustomerId(customer.id);

  return (
    <div>
      <Link href="/admin/customers" className={tableStyles.backLink}>
        ← Back to customers
      </Link>

      <div className={tableStyles.section}>
        <h2 className={tableStyles.sectionTitle} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {customer.name}
          <span style={{ marginLeft: "auto" }}>
            <DeleteButton
              id={customer.id}
              action={deleteCustomer}
              confirmText={`Delete ${customer.name} and all ${customer.order_count} of their order(s)? This can't be undone.`}
              redirectTo="/admin/customers"
            />
          </span>
        </h2>
        <div className={tableStyles.detailGrid}>
          <div>
            <p className={tableStyles.detailLabel}>Email</p>
            <p className={tableStyles.detailValue}>{customer.email}</p>
          </div>
          <div>
            <p className={tableStyles.detailLabel}>Orders</p>
            <p className={tableStyles.detailValue}>{customer.order_count}</p>
          </div>
          <div>
            <p className={tableStyles.detailLabel}>Lifetime spend</p>
            <p className={tableStyles.detailValue}>{formatMoney(customer.lifetime_spend, "eur")}</p>
          </div>
          <div>
            <p className={tableStyles.detailLabel}>First seen</p>
            <p className={tableStyles.detailValue}>{new Date(customer.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className={tableStyles.section}>
        <h2 className={tableStyles.sectionTitle}>Order history</h2>
        {orders.length === 0 ? (
          <p className={tableStyles.empty}>No orders yet.</p>
        ) : (
          <table className={tableStyles.table}>
            <thead>
              <tr>
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
                      {order.collection_key} · {order.type_key} · {order.size_label}
                    </Link>
                  </td>
                  <td>{formatMoney(order.amount_total, order.currency)}</td>
                  <td>
                    <StatusBadge status={order.status} createdAt={order.created_at} />
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
