"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./ChristmasCountdown.module.css";
import type { Lang } from "./navTypes";

// Last day to order a portrait for delivery before Christmas: Dec 1, end of
// day in Germany/Austria. Before it, count down the days. From Dec 2 until
// Christmas, point people to the gift voucher instead (ready instantly). After
// Christmas, show nothing. Computed every year, so no yearly edit is needed.
type State =
  | { kind: "countdown"; days: number }
  | { kind: "lastDay" }
  | { kind: "voucher" }
  | null;

function berlinDate(now: Date): { y: number; m: number; d: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return { y: get("year"), m: get("month"), d: get("day") };
}

export function christmasState(now: Date = new Date()): State {
  const { y, m, d } = berlinDate(now);
  const today = Date.UTC(y, m - 1, d);
  const deadline = Date.UTC(y, 11, 1);
  const christmas = Date.UTC(y, 11, 25);
  const days = Math.round((deadline - today) / 86_400_000);
  // Only from November on, so the banner doesn't appear all year.
  if (m < 11) return null;
  if (days > 0) return { kind: "countdown", days };
  if (days === 0) return { kind: "lastDay" };
  if (today < christmas) return { kind: "voucher" };
  return null;
}

export default function ChristmasCountdown({ lang, className }: { lang: Lang; className?: string }) {
  // Rendered only after mount: the server can't know the visitor's "today",
  // and rendering it there could disagree with the browser.
  const [state, setState] = useState<State>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(christmasState());
  }, []);

  if (!state) return null;
  const de = lang === "de";

  if (state.kind === "voucher") {
    return (
      <Link href="/gift-card" className={`${styles.box} ${styles.voucher} ${className ?? ""}`}>
        <span aria-hidden>🎁</span>
        <span>
          {de
            ? "Zu knapp bis Weihnachten? Verschenken Sie einen Gutschein – sofort fertig, Porträt wird später gemalt."
            : "Too close to Christmas? Give a gift voucher – ready instantly, the portrait is painted later."}{" "}
          <strong>{de ? "Gutschein ansehen →" : "See vouchers →"}</strong>
        </span>
      </Link>
    );
  }

  const text =
    state.kind === "lastDay"
      ? de
        ? "Heute ist der letzte Tag: Bis 23:59 bestellen, vor Weihnachten geliefert."
        : "Today is the last day: order by 11:59 pm for delivery before Christmas."
      : de
        ? `Noch ${state.days} ${state.days === 1 ? "Tag" : "Tage"}: bis 1. Dezember bestellen, vor Weihnachten geliefert.`
        : `${state.days} ${state.days === 1 ? "day" : "days"} left: order by Dec 1 for delivery before Christmas.`;

  return (
    <p className={`${styles.box} ${className ?? ""}`}>
      <span aria-hidden>🎄</span>
      <span>{text}</span>
    </p>
  );
}
