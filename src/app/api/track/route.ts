import { NextResponse } from "next/server";
import { FUNNEL_STEPS, type FunnelStep } from "@/lib/funnel";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

// Counts one anonymous funnel step. No IP, cookie or visitor ID is stored:
// only the step, day, language, and a coarse source + device read from the
// request headers. Bots are skipped.
const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|lighthouse|headless/i;

function sourceOf(ua: string, host: string): string {
  if (/Instagram/i.test(ua)) return "instagram";
  if (/FBAN|FBAV|FB_IAB/i.test(ua)) return "facebook";
  if (!host || /fuzzyberry\.de$|vercel\.app$/.test(host)) return "direct";
  if (/instagram\./.test(host)) return "instagram";
  if (/facebook\.|fb\./.test(host)) return "facebook";
  if (/google\./.test(host)) return "google";
  if (/bing\.|duckduckgo\.|ecosia\./.test(host)) return "search";
  return "other";
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) return new NextResponse(null, { status: 204 });
  const ua = request.headers.get("user-agent") || "";
  if (BOT.test(ua)) return new NextResponse(null, { status: 204 });

  let step: unknown;
  let lang: unknown;
  let ref: unknown;
  try {
    ({ step, lang, ref } = await request.json());
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  if (typeof step !== "string" || !FUNNEL_STEPS.includes(step as FunnelStep)) {
    return new NextResponse(null, { status: 400 });
  }

  const host = typeof ref === "string" ? ref.slice(0, 120).toLowerCase() : "";
  const source = sourceOf(ua, host);
  const device = /Mobi|Android|iPhone|iPad/i.test(ua) ? "mobile" : "desktop";

  try {
    await getSupabaseAdmin()
      .from("funnel_events")
      .insert({ step, source, device, lang: lang === "de" ? "de" : "en" });
  } catch {
    // Counting must never break the site.
  }
  return new NextResponse(null, { status: 204 });
}
