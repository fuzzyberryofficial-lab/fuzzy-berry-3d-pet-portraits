import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderById, getOrderPhotos, formatMoney, buildAbandonedCartReminderMailto } from "@/lib/adminData";
import StatusBadge from "@/components/admin/StatusBadge";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteOrder } from "../actions";
import tableStyles from "@/components/admin/AdminTable.module.css";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminOrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) notFound();

  const photos = await getOrderPhotos(order.id);

  const reminderMailto = buildAbandonedCartReminderMailto({
    ...order,
    customerName: order.customers?.name,
    email: order.customers?.email,
  });

  return (
    <div>
      <Link href="/admin/orders" className={tableStyles.backLink}>
        ← Back to orders
      </Link>

      <div className={tableStyles.section}>
        <h2 className={tableStyles.sectionTitle} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          Order for {order.customers?.name ?? order.shipping_name} <StatusBadge status={order.status} createdAt={order.created_at} />
          <span style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
            {order.status === "pending" && reminderMailto && (
              <a href={reminderMailto} className={tableStyles.rowLink}>
                ✉️ Send reminder email
              </a>
            )}
            <DeleteButton
              id={order.id}
              action={deleteOrder}
              confirmText="Delete this order? This can't be undone."
              redirectTo="/admin/orders"
            />
          </span>
        </h2>

        <div className={tableStyles.detailGrid}>
          <div>
            <p className={tableStyles.detailLabel}>Email</p>
            <p className={tableStyles.detailValue}>
              {order.customers?.email && <a href={`mailto:${order.customers.email}`}>{order.customers.email}</a>}
            </p>
          </div>
          <div>
            <p className={tableStyles.detailLabel}>Placed</p>
            <p className={tableStyles.detailValue}>{new Date(order.created_at).toLocaleString()}</p>
          </div>
          {order.paid_at && (
            <div>
              <p className={tableStyles.detailLabel}>Paid</p>
              <p className={tableStyles.detailValue}>{new Date(order.paid_at).toLocaleString()}</p>
            </div>
          )}
          <div>
            <p className={tableStyles.detailLabel}>Amount</p>
            <p className={tableStyles.detailValue}>{formatMoney(order.amount_total, order.currency)}</p>
          </div>
          <div>
            <p className={tableStyles.detailLabel}>Product</p>
            <p className={tableStyles.detailValue}>
              {order.collection_key} · {order.type_key} · {order.size_label}
            </p>
          </div>
          <div>
            <p className={tableStyles.detailLabel}>Frame</p>
            <p className={tableStyles.detailValue}>{order.frame_color ?? "None"}</p>
          </div>
          <div>
            <p className={tableStyles.detailLabel}>Shipping address</p>
            <p className={tableStyles.detailValue}>
              {order.shipping_address}, {order.shipping_city} {order.shipping_postal}, {order.shipping_country}
            </p>
          </div>
          {order.artist_notes && (
            <div>
              <p className={tableStyles.detailLabel}>Artist notes</p>
              <p className={tableStyles.detailValue}>{order.artist_notes}</p>
            </div>
          )}
        </div>
      </div>

      <div className={tableStyles.section}>
        <h2 className={tableStyles.sectionTitle}>Uploaded photos ({photos.length})</h2>
        {photos.length === 0 ? (
          <p className={tableStyles.empty}>No photos uploaded.</p>
        ) : (
          <div className={tableStyles.photoGrid}>
            {photos.map((photo) =>
              photo.signedUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={photo.id} src={photo.signedUrl} alt="Uploaded pet photo" />
              ) : (
                <div key={photo.id}>Failed to load</div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
