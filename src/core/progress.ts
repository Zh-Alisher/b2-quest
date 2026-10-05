export type Rating = "again" | "hard" | "good";
export type Review = {
  due: number;
  interval: number;
  successes: number;
  attempts: number;
};
export type Progress = {
  version: 1;
  xp: number;
  reviews: Record<string, Review>;
  completed: string[];
  activity: Record<string, number>;
  favorites: string[];
  hints: boolean;
  goal: number;
};
export const emptyProgress = (): Progress => ({
  version: 1,
  xp: 0,
  reviews: {},
  completed: [],
  activity: {},
  favorites: [],
  hints: true,
  goal: 10,
});
export function dayKey(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function schedule(
  previous: Review | undefined,
  rating: Rating,
  now = Date.now(),
): Review {
  const successes =
    rating === "good"
      ? (previous?.successes ?? 0) + 1
      : rating === "again"
        ? 0
        : (previous?.successes ?? 0);
  const interval =
    rating === "again"
      ? 0
      : rating === "hard"
        ? 1
        : Math.min(60, [1, 3, 7, 14, 30, 60][Math.min(successes - 1, 5)]);
  return {
    due: now + (rating === "again" ? 600000 : interval * 86400000),
    interval,
    successes,
    attempts: (previous?.attempts ?? 0) + 1,
  };
}
export function recordReview(
  p: Progress,
  id: string,
  rating: Rating,
  now = Date.now(),
): Progress {
  const key = dayKey(new Date(now));
  return {
    ...p,
    reviews: { ...p.reviews, [id]: schedule(p.reviews[id], rating, now) },
    xp: p.xp + (rating === "good" ? 10 : 5),
    activity: { ...p.activity, [key]: (p.activity[key] ?? 0) + 1 },
  };
}
export function completeLesson(
  p: Progress,
  id: string,
  now = Date.now(),
): Progress {
  if (p.completed.includes(id)) return p;
  const key = dayKey(new Date(now));
  return {
    ...p,
    completed: [...p.completed, id],
    xp: p.xp + 30,
    activity: { ...p.activity, [key]: (p.activity[key] ?? 0) + 1 },
  };
}
export function streak(
  activity: Record<string, number>,
  now = new Date(),
): number {
  const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12);
  if (!activity[dayKey(cursor)]) cursor.setDate(cursor.getDate() - 1);
  let n = 0;
  while (activity[dayKey(cursor)]) {
    n++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return n;
}
export function queue(
  ids: string[],
  p: Progress,
  now = Date.now(),
  limit = 10,
): string[] {
  const due = ids
    .filter((id) => p.reviews[id] && p.reviews[id].due <= now)
    .sort((a, b) => p.reviews[a].due - p.reviews[b].due);
  const fresh = ids.filter((id) => !p.reviews[id]);
  return [...due, ...fresh].slice(0, limit);
}
/** Do not overwrite an unreadable save with a fresh profile. */
export function parseProgress(raw: string): Progress {
  const p = JSON.parse(raw);
  const strings = (x: unknown): x is string[] =>
    Array.isArray(x) && x.every((v) => typeof v === "string");
  const number = (x: unknown): x is number =>
    typeof x === "number" && Number.isFinite(x) && x >= 0;
  if (
    !p ||
    p.version !== 1 ||
    !number(p.xp) ||
    !strings(p.completed) ||
    !strings(p.favorites) ||
    typeof p.hints !== "boolean" ||
    ![5, 10, 15].includes(p.goal)
  )
    throw new Error("Invalid profile");
  for (const key of ["reviews", "activity"])
    if (!p[key] || typeof p[key] !== "object" || Array.isArray(p[key]))
      throw new Error("Invalid profile");
  for (const r of Object.values(p.reviews) as Review[])
    if (!r || ![r.due, r.interval, r.successes, r.attempts].every(number))
      throw new Error("Invalid review");
  if (!Object.values(p.activity).every(number))
    throw new Error("Invalid activity");
  return p as Progress;
}
