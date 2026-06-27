import { env } from "cloudflare:test";
import { describe, it, expect, beforeEach } from "vitest";
import app from "../src/index";

beforeEach(async () => {
  await env.DB.prepare("DELETE FROM kakugen").run();
});

async function seedOne(text = "七転び八起き", author = "諺") {
  await env.DB.prepare(
    "INSERT INTO kakugen (text, author, citation, origin) VALUES (?, ?, '出典', 'seed')"
  ).bind(text, author).run();
}

function cookieFrom(res: Response): string {
  const sc = res.headers.get("set-cookie") || "";
  return sc.split(";")[0]; // "kakugen_draws=2026-..|1"
}

describe("GET /", () => {
  it("renders the draw button and full tally for a fresh visitor", async () => {
    const res = await app.request("/", {}, env);
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toContain("引く");
    expect(body).toContain("本日 残り 3 回");
  });
});

describe("GET /draw", () => {
  it("returns a quote and sets an incremented cookie on first draw", async () => {
    await seedOne("智に働けば角が立つ", "夏目漱石");
    const res = await app.request("/draw", {}, env);
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toContain("夏目漱石");
    const sc = res.headers.get("set-cookie") || "";
    expect(sc).toContain("kakugen_draws=");
    expect(sc.toLowerCase()).toContain("httponly");
    // Hono URL-encodes the "|" to %7C on the wire; decode to assert the value.
    expect(decodeURIComponent(sc)).toMatch(/kakugen_draws=\d{4}-\d{2}-\d{2}\|1/);
  });

  it("allows exactly 3 draws then shows the limit page on the 4th", async () => {
    await seedOne();
    let cookie = "";
    for (let n = 1; n <= 3; n++) {
      const res = await app.request("/draw", { headers: cookie ? { Cookie: cookie } : {} }, env);
      const body = await res.text();
      expect(body).not.toContain("また明日");
      cookie = cookieFrom(res);
      expect(decodeURIComponent(cookie)).toContain(`|${n}`);
    }
    const fourth = await app.request("/draw", { headers: { Cookie: cookie } }, env);
    const body = await fourth.text();
    expect(body).toContain("また明日");
    // 4th must NOT increment past 3
    expect(fourth.headers.get("set-cookie") || "").not.toMatch(/\|4/);
  });

  it("resets the count when the cookie holds yesterday's date", async () => {
    await seedOne();
    const res = await app.request("/draw", { headers: { Cookie: "kakugen_draws=2000-01-01|3" } }, env);
    const body = await res.text();
    expect(body).not.toContain("また明日"); // reset → allowed
    expect(decodeURIComponent(res.headers.get("set-cookie") || "")).toMatch(/\|1/);
  });
});

describe("GET /kakugens/:id", () => {
  it("shows a specific kakugen without consuming a draw", async () => {
    await seedOne("我が道を行く", "自分");
    const row = await env.DB.prepare("SELECT id FROM kakugen LIMIT 1").first<{ id: number }>();
    const res = await app.request(`/kakugens/${row!.id}`, {}, env);
    expect(res.status).toBe(200);
    // The quote is split into per-character spans for the ink-reveal, so assert
    // on the author (rendered contiguously) to confirm the right kakugen shows.
    expect(await res.text()).toContain("自分");
    // no draw consumed → no incrementing cookie
    expect(res.headers.get("set-cookie")).toBeNull();
  });

  it("404s for a missing id", async () => {
    const res = await app.request("/kakugens/999999", {}, env);
    expect(res.status).toBe(404);
  });
});
