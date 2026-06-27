import { describe, it, expect } from "vitest";
import {
  DRAW_LIMIT, jstDate, parseDrawState, serializeDrawState,
  atLimit, increment, remaining,
} from "../src/drawLimit";

describe("drawLimit", () => {
  it("jstDate converts a UTC instant to the Asia/Tokyo calendar date", () => {
    // 2026-06-20T15:30:00Z is 2026-06-21 00:30 JST → next day in JST.
    expect(jstDate(new Date("2026-06-20T15:30:00Z"))).toBe("2026-06-21");
    // 2026-06-20T10:00:00Z is 2026-06-20 19:00 JST → same day.
    expect(jstDate(new Date("2026-06-20T10:00:00Z"))).toBe("2026-06-20");
  });

  it("parseDrawState returns count 0 when no cookie", () => {
    expect(parseDrawState(undefined, "2026-06-20")).toEqual({ date: "2026-06-20", count: 0 });
  });

  it("parseDrawState keeps count for today's cookie", () => {
    expect(parseDrawState("2026-06-20|2", "2026-06-20")).toEqual({ date: "2026-06-20", count: 2 });
  });

  it("parseDrawState resets when the cookie date is not today", () => {
    expect(parseDrawState("2026-06-19|3", "2026-06-20")).toEqual({ date: "2026-06-20", count: 0 });
  });

  it("parseDrawState resets on malformed cookies", () => {
    expect(parseDrawState("garbage", "2026-06-20")).toEqual({ date: "2026-06-20", count: 0 });
    expect(parseDrawState("2026-06-20|-1", "2026-06-20")).toEqual({ date: "2026-06-20", count: 0 });
    expect(parseDrawState("2026-06-20|abc", "2026-06-20")).toEqual({ date: "2026-06-20", count: 0 });
  });

  it("serializeDrawState round-trips", () => {
    expect(serializeDrawState({ date: "2026-06-20", count: 2 })).toBe("2026-06-20|2");
  });

  it("atLimit is true only at or above the limit", () => {
    expect(atLimit({ date: "d", count: DRAW_LIMIT - 1 })).toBe(false);
    expect(atLimit({ date: "d", count: DRAW_LIMIT })).toBe(true);
  });

  it("increment adds one to count", () => {
    expect(increment({ date: "d", count: 1 })).toEqual({ date: "d", count: 2 });
  });

  it("remaining never goes below zero", () => {
    expect(remaining({ date: "d", count: 0 })).toBe(3);
    expect(remaining({ date: "d", count: 3 })).toBe(0);
    expect(remaining({ date: "d", count: 5 })).toBe(0);
  });
});
