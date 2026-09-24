import { unstable_cache } from "next/cache";
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
  promo_code: string | null;
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

export interface PromoStat {
  code: string;
  totalUses: number;
  paidUses: number;
  lastUsedAt: string | null;
}

export interface PromoFilters {
  code?: string;
  from?: string;
  to?: string;
}

export async function listPromoRedemptions(filters: PromoFilters = {}): Promise<OrderRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseAdmin();
  let query = supabase.from("orders").select(ORDER_SELECT).not("promo_code", "is", null);

  if (filters.code) {
    query = query.ilike("promo_code", `%${filters.code}%`);
  }
  // "from"/"to" come from <input type="month"> values ("YYYY-MM", a bare
  // month with no day or time) — Postgres can't parse that directly, and a
  // raw month is ambiguous as a boundary anyway. Convert each to a real
  // instant: "from" is the start of that month, "to" is the start of the
  // *next* month so the whole month is included (inclusive upper bound).
  if (filters.from) {
    const fromDate = new Date(`${filters.from}-01T00:00:00.000Z`);
    query = query.gte("created_at", fromDate.toISOString());
  }
  if (filters.to) {
    const toDate = new Date(`${filters.to}-01T00:00:00.000Z`);
    toDate.setUTCMonth(toDate.getUTCMonth() + 1);
    query = query.lt("created_at", toDate.toISOString());
  }

  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;
  return (data as OrderRow[]) ?? [];
}

export function summarizePromoStats(redemptions: OrderRow[]): PromoStat[] {
  const byCode = new Map<string, PromoStat>();
  for (const row of redemptions) {
    if (!row.promo_code) continue;
    const existing = byCode.get(row.promo_code) ?? {
      code: row.promo_code,
      totalUses: 0,
      paidUses: 0,
      lastUsedAt: null,
    };
    existing.totalUses += 1;
    if (row.status === "paid") existing.paidUses += 1;
    if (!existing.lastUsedAt || row.created_at > existing.lastUsedAt) existing.lastUsedAt = row.created_at;
    byCode.set(row.promo_code, existing);
  }
  return Array.from(byCode.values()).sort((a, b) => b.totalUses - a.totalUses);
}

export function formatMoney(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(cents / 100);
}

export interface AnnouncementSettings {
  enabled: boolean;
  textEn: string;
  textDe: string;
  bgColor: string;
  textColor: string;
}

export const DEFAULT_ANNOUNCEMENT: AnnouncementSettings = {
  enabled: true,
  textEn: "✨ Enjoy Free Worldwide Shipping on All Orders! Limited Time Only. ✨",
  textDe: "✨ Kostenloser weltweiter Versand auf alle Bestellungen! Nur für kurze Zeit. ✨",
  bgColor: "#332f2a",
  textColor: "#ffe9a3",
};

async function fetchAnnouncementSettings(): Promise<AnnouncementSettings> {
  if (!isSupabaseConfigured()) return DEFAULT_ANNOUNCEMENT;
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("announcement_settings").select("*").eq("id", "default").maybeSingle();
  if (error || !data) return DEFAULT_ANNOUNCEMENT;
  return {
    enabled: data.enabled,
    textEn: data.text_en,
    textDe: data.text_de,
    bgColor: data.bg_color,
    textColor: data.text_color,
  };
}

export const getAnnouncementSettings = unstable_cache(fetchAnnouncementSettings, ["announcement-settings"], {
  tags: ["announcement"],
  revalidate: 60,
});

export async function updateAnnouncementSettings(input: AnnouncementSettings): Promise<void> {
  if (!isSupabaseConfigured()) throw new Error("Supabase is not configured.");
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("announcement_settings").upsert({
    id: "default",
    enabled: input.enabled,
    text_en: input.textEn,
    text_de: input.textDe,
    bg_color: input.bgColor,
    text_color: input.textColor,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}
