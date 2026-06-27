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

describe("GET /", () => {
  it("renders the draw button and full tally for a fresh visitor", async () => {
    const res = await app.request("/", {}, env);
    expect(res.status).toBe(200);
    const body = await res.text();
    expect(body).toContain("引く");
    expect(body).toContain("本日 残り 3 回");
  });
});
