import { getSupabaseAdmin, isSupabaseConfigured, ORDER_PHOTOS_BUCKET } from "./supabase";

export interface OrderCustomer {
  name: string;
  email: string;
}

export interface OrderRow {
  id: string;
  customer_id: string;
  stripe_session_id: string;
  status: "pending" | "paid" | "cancelled";
  collection_key: string;
  type_key: string;
  size_label: string;
  frame_color: string | null;
  artist_notes: string | null;
  shipping_name: string;
  shipping_address: string;
  shipping_city: string;
  shipping_postal: string;
  shipping_country: string;
  amount_total: number;
  currency: string;
  created_at: string;
  paid_at: string | null;
  customers: OrderCustomer | null;
}

export interface CustomerStatsRow {
  id: string;
  email: string;
  name: string;
  created_at: string;
  order_count: number;
  lifetime_spend: number;
}

export interface OrderPhoto {
  id: string;
  storage_path: string;
  uploaded_at: string;
  signedUrl: string | null;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  ordersThisWeek: number;
  uniqueCustomers: number;
  recentOrders: OrderRow[];
}

const ORDER_SELECT = "*, customers(name, email)";

export async function getDashboardStats(): Promise<DashboardStats> {
  if (!isSupabaseConfigured()) {
    return { totalOrders: 0, totalRevenue: 0, ordersThisWeek: 0, uniqueCustomers: 0, recentOrders: [] };
  }
  const supabase = getSupabaseAdmin();

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [paidOrders, ordersThisWeek, customerCount, recentOrders] = await Promise.all([
    supabase.from("orders").select("amount_total", { count: "exact" }).eq("status", "paid"),
    supabase.from("orders").select("id", { count: "exact", head: true }).gte("created_at", weekAgo),
    supabase.from("customers").select("id", { count: "exact", head: true }),
    supabase.from("orders").select(ORDER_SELECT).order("created_at", { ascending: false }).limit(10),
  ]);

  const totalRevenue = (paidOrders.data ?? []).reduce((sum, row) => sum + (row.amount_total ?? 0), 0);

  return {
    totalOrders: paidOrders.count ?? 0,
    totalRevenue,
    ordersThisWeek: ordersThisWeek.count ?? 0,
    uniqueCustomers: customerCount.count ?? 0,
    recentOrders: (recentOrders.data as OrderRow[]) ?? [],
  };
}

export interface OrderFilters {
  q?: string;
  status?: string;
  from?: string;
  to?: string;
}

export async function listOrders(filters: OrderFilters): Promise<OrderRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseAdmin();
  let query = supabase.from("orders").select(ORDER_SELECT).order("created_at", { ascending: false }).limit(200);

  if (filters.status) {
    query = query.eq("status", filters.status);
  }
  if (filters.from) {
    query = query.gte("created_at", filters.from);
  }
  if (filters.to) {
    query = query.lte("created_at", filters.to);
  }
  if (filters.q) {
    query = query.or(`shipping_name.ilike.%${filters.q}%`);
  }

  const { data, error } = await query;
  if (error) throw error;

  let rows = (data as OrderRow[]) ?? [];
  if (filters.q) {
    const needle = filters.q.toLowerCase();
    rows = rows.filter(
      (row) =>
        row.shipping_name.toLowerCase().includes(needle) ||
        row.customers?.email?.toLowerCase().includes(needle) ||
        row.customers?.name?.toLowerCase().includes(needle),
    );
  }
  return rows;
}

export async function getOrderById(id: string): Promise<OrderRow | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("orders").select(ORDER_SELECT).eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as OrderRow | null) ?? null;
}

export async function getOrderPhotos(orderId: string): Promise<OrderPhoto[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("order_photos")
    .select("id, storage_path, uploaded_at")
    .eq("order_id", orderId)
    .order("uploaded_at", { ascending: true });
  if (error) throw error;

  const rows = data ?? [];
  const signed = await Promise.all(
    rows.map(async (row) => {
      const { data: signedData } = await supabase.storage
        .from(ORDER_PHOTOS_BUCKET)
        .createSignedUrl(row.storage_path, 60 * 10);
      return { ...row, signedUrl: signedData?.signedUrl ?? null };
    }),
  );
  return signed;
}

export async function listCustomers(): Promise<CustomerStatsRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("customer_stats")
    .select("*")
    .order("lifetime_spend", { ascending: false });
  if (error) throw error;
  return (data as CustomerStatsRow[]) ?? [];
}

export async function getCustomerById(id: string): Promise<CustomerStatsRow | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("customer_stats").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as CustomerStatsRow | null) ?? null;
}

export async function getOrdersByCustomerId(customerId: string): Promise<OrderRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("orders")
    .select(ORDER_SELECT)
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as OrderRow[]) ?? [];
}

export function formatMoney(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(cents / 100);
}
