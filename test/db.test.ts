import { env } from "cloudflare:test";
import { describe, it, expect, beforeEach } from "vitest";
import { randomKakugen, getKakugen, insertKakugen } from "../src/db";
// @ts-expect-error - vite raw import
import seedSql from "../seed/seed.sql?raw";

beforeEach(async () => {
  await env.DB.prepare("DELETE FROM kakugen").run();
});

describe("db helpers", () => {
  it("randomKakugen returns a row when rows exist", async () => {
    await env.DB.prepare(
      "INSERT INTO kakugen (text, author, citation, origin) VALUES ('七転び八起き', '諺', '出典', 'seed')"
    ).run();
    const k = await randomKakugen(env.DB);
    expect(k).not.toBeNull();
    expect(k!.text).toBe("七転び八起き");
    expect(k!.origin).toBe("seed");
  });

  it("randomKakugen returns null when table is empty", async () => {
    expect(await randomKakugen(env.DB)).toBeNull();
  });

  it("insertKakugen stores a user row with null citation and returns its id", async () => {
    const id = await insertKakugen(env.DB, "我が道を行く", "自分");
    expect(id).toBeGreaterThan(0);
    const k = await getKakugen(env.DB, id);
    expect(k).not.toBeNull();
    expect(k!.text).toBe("我が道を行く");
    expect(k!.author).toBe("自分");
    expect(k!.origin).toBe("user");
    expect(k!.citation).toBeNull();
  });

  it("getKakugen returns null for a missing id", async () => {
    expect(await getKakugen(env.DB, 999999)).toBeNull();
  });

  it("seed.sql inserts the 50 verified entries", async () => {
    await env.DB.prepare("DELETE FROM kakugen").run();
    // D1 exec runs the statement(s) in the file.
    await env.DB.exec(seedSql.replace(/\n/g, " "));
    const row = await env.DB.prepare("SELECT COUNT(*) AS n FROM kakugen WHERE origin='seed'").first<{ n: number }>();
    expect(row!.n).toBe(50);
  });
});
