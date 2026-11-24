// Date and email checks shared by the gift form (browser) and the server.

export const MAX_DAYS_AHEAD = 365;

export function berlinToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function addDays(ymd: string, days: number): string {
  const d = new Date(`${ymd}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

// A real calendar day, from tomorrow up to a year ahead.
export function isValidSendOn(value: string, today: string = berlinToday()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const roundTrip = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(roundTrip.getTime()) || roundTrip.toISOString().slice(0, 10) !== value) return false;
  return value > today && value <= addDays(today, MAX_DAYS_AHEAD);
}

export function isEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]{2,}$/.test(value);
}
