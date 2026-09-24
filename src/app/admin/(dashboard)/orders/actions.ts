"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/adminSession";
import { getSupabaseAdmin, ORDER_PHOTOS_BUCKET } from "@/lib/supabase";

export async function deleteOrder(orderId: string): Promise<{ ok: boolean; error?: string }> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifyAdminSession(session)) {
    return { ok: false, error: "Unauthorized." };
  }

  try {
    const supabase = getSupabaseAdmin();

    const { data: photos, error: photosError } = await supabase
      .from("order_photos")
      .select("storage_path")
      .eq("order_id", orderId);
    if (photosError) throw photosError;
    if (photos && photos.length > 0) {
      await supabase.storage.from(ORDER_PHOTOS_BUCKET).remove(photos.map((p) => p.storage_path));
    }

    const { error } = await supabase.from("orders").delete().eq("id", orderId);
    if (error) throw error;

    revalidatePath("/admin");
    revalidatePath("/admin/orders");
    revalidatePath("/admin/customers");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to delete order." };
  }
}
