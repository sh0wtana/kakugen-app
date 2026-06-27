export const DRAW_LIMIT = 3;
export const COOKIE_NAME = "kakugen_draws";

export interface DrawState {
  date: string; // YYYY-MM-DD (JST)
  count: number;
}

// Calendar date in Asia/Tokyo (JST = UTC+9, no DST).
export function jstDate(now: Date = new Date()): string {
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

export function parseDrawState(cookie: string | undefined, today: string): DrawState {
  if (!cookie) return { date: today, count: 0 };
  const [date, countStr] = cookie.split("|");
  const count = Number(countStr);
  if (date !== today || !Number.isInteger(count) || count < 0) {
    return { date: today, count: 0 };
  }
  return { date, count };
}

export function serializeDrawState(s: DrawState): string {
  return `${s.date}|${s.count}`;
}

export function atLimit(s: DrawState): boolean {
  return s.count >= DRAW_LIMIT;
}

export function increment(s: DrawState): DrawState {
  return { date: s.date, count: s.count + 1 };
}

export function remaining(s: DrawState): number {
  return Math.max(0, DRAW_LIMIT - s.count);
}
