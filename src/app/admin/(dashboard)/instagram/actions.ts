"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/adminSession";
import { addInstagramPost, deleteInstagramPost, moveInstagramPost, normalizeInstagramPermalink } from "@/lib/adminData";

export async function addInstagramPostAction(permalinkInput: string): Promise<{ ok: boolean; error?: string }> {
  const cookieStore = await cookies();
  if (!verifyAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)) {
    return { ok: false, error: "Unauthorized." };
  }

  const permalink = normalizeInstagramPermalink(permalinkInput);
  if (!permalink) {
    return { ok: false, error: "That doesn't look like an Instagram post or reel link." };
  }

  try {
    await addInstagramPost(permalink);
    revalidateTag("instagram-posts", { expire: 0 });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to add." };
  }
}

export async function deleteInstagramPostAction(id: string): Promise<{ ok: boolean; error?: string }> {
  const cookieStore = await cookies();
  if (!verifyAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)) {
    return { ok: false, error: "Unauthorized." };
  }

  try {
    await deleteInstagramPost(id);
    revalidateTag("instagram-posts", { expire: 0 });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to delete." };
  }
}

export async function moveInstagramPostAction(
  id: string,
  direction: "up" | "down",
): Promise<{ ok: boolean; error?: string }> {
  const cookieStore = await cookies();
  if (!verifyAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)) {
    return { ok: false, error: "Unauthorized." };
  }

  try {
    await moveInstagramPost(id, direction);
    revalidateTag("instagram-posts", { expire: 0 });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed to reorder." };
  }
}
