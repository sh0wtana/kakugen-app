import { env } from "cloudflare:test";
import { describe, it, expect } from "vitest";
import app from "../src/index";

describe("smoke", () => {
  it("GET / returns 200", async () => {
    const res = await app.request("/", {}, env);
    expect(res.status).toBe(200);
  });
});
