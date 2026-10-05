import assert from "node:assert/strict";
import test from "node:test";
import {
  completeLesson,
  dayKey,
  emptyProgress,
  parseProgress,
  queue,
  recordReview,
  schedule,
  streak,
} from "../src/core/progress.ts";
import { cards, decks } from "../src/content/cards.ts";
import { lessons } from "../src/content/lessons.ts";
test("SRS grows after recall, resets after forgetting and caps at 60 days", () => {
  let r = undefined;
  for (const days of [1, 3, 7, 14, 30, 60, 60]) {
    r = schedule(r, "good", 1000);
    assert.equal(r.interval, days);
  }
  const forgotten = schedule(r, "again", 1000);
  assert.equal(forgotten.successes, 0);
  assert.equal(forgotten.due, 601000);
  assert.equal(schedule(forgotten, "good", 1000).interval, 1);
  assert.equal(schedule(r, "hard", 1000).interval, 1);
});
test("Queue prioritizes overdue cards, omits future reviews and limits session", () => {
  const p = emptyProgress();
  p.reviews.a = { due: 20, interval: 1, successes: 1, attempts: 1 };
  p.reviews.b = { due: 10, interval: 1, successes: 1, attempts: 1 };
  p.reviews.c = { due: 200, interval: 1, successes: 1, attempts: 1 };
  assert.deepEqual(queue(["a", "b", "c", "d", "e"], p, 100, 3), [
    "b",
    "a",
    "d",
  ]);
});
test("Review and first lesson award points, repeated lessons cannot farm XP", () => {
  const p = recordReview(emptyProgress(), "a", "again", 1000);
  assert.equal(p.xp, 5);
  assert.equal(p.activity[dayKey(new Date(1000))], 1);
  const done = completeLesson(p, "ipa", 1000);
  assert.equal(done.xp, 35);
  assert.equal(completeLesson(done, "ipa", 1000).xp, 35);
  assert.equal(p.completed.length, 0);
});
test("Streak tolerates unfinished today but breaks at a missed calendar day", () => {
  const now = new Date(2026, 9, 5, 12);
  assert.equal(streak({ "2026-10-04": 1, "2026-10-03": 2 }, now), 2);
  assert.equal(streak({ "2026-10-05": 1, "2026-10-03": 2 }, now), 1);
  assert.equal(streak({ "2026-10-03": 1 }, now), 0);
});
test("Unreadable or malformed saves are rejected", () => {
  assert.deepEqual(
    parseProgress(JSON.stringify(emptyProgress())),
    emptyProgress(),
  );
  for (const raw of [
    "null",
    "{}",
    "{",
    JSON.stringify({ ...emptyProgress(), xp: -1 }),
    JSON.stringify({ ...emptyProgress(), reviews: { a: { due: "tomorrow" } } }),
  ])
    assert.throws(() => parseProgress(raw));
});
test("Content has stable unique IDs, complete translations and valid quiz answers", () => {
  assert.equal(new Set(cards.map((c) => c.id)).size, cards.length);
  assert.equal(new Set(lessons.map((l) => l.id)).size, lessons.length);
  for (const c of cards) {
    assert.ok(decks.some((d) => d.id === c.deck));
    assert.ok(c.word && c.translation && c.ipa && c.hint && c.example && c.ru);
  }
  for (const d of decks)
    assert.equal(cards.filter((c) => c.deck === d.id).length, 8);
  for (const l of lessons)
    for (const q of l.questions) {
      assert.ok(q.answer >= 0 && q.answer < q.options.length);
      assert.equal(new Set(q.options).size, q.options.length);
    }
});
