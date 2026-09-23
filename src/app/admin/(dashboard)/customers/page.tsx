import Link from "next/link";
import { listCustomers, formatMoney } from "@/lib/adminData";
import tableStyles from "@/components/admin/AdminTable.module.css";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const customers = await listCustomers();

  return (
    <div className={tableStyles.section}>
      <h2 className={tableStyles.sectionTitle}>Customers ({customers.length})</h2>
      {customers.length === 0 ? (
        <p className={tableStyles.empty}>No customers yet.</p>
      ) : (
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Orders</th>
              <th>Lifetime spend</th>
              <th>First seen</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <Link href={`/admin/customers/${customer.id}`} className={tableStyles.rowLink}>
                    {customer.name}
                  </Link>
                </td>
                <td>{customer.email}</td>
                <td>{customer.order_count}</td>
                <td>{formatMoney(customer.lifetime_spend, "eur")}</td>
                <td>{new Date(customer.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
