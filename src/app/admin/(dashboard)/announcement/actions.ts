"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/adminSession";
import { updateAnnouncementSettings, type AnnouncementSettings } from "@/lib/adminData";

export async function saveAnnouncementSettings(
  input: AnnouncementSettings,
): Promise<{ ok: boolean; error?: string }> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifyAdminSession(session)) {
    return { ok: false, error: "Unauthorized." };
  }

  try {
    await updateAnnouncementSettings(input);
    revalidateTag("announcement", { expire: 0 });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to save." };
  }
}
