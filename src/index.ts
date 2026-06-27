import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import {
  COOKIE_NAME, jstDate, parseDrawState, serializeDrawState,
  atLimit, increment, remaining,
} from "./drawLimit";
import { randomKakugen, getKakugen } from "./db";
import { homePage } from "./views/home";
import { resultPage } from "./views/result";
import { limitPage } from "./views/limit";

const app = new Hono<{ Bindings: Env }>();

app.get("/", (c) => {
  const state = parseDrawState(getCookie(c, COOKIE_NAME), jstDate());
  return c.html(homePage(remaining(state)));
});

app.get("/draw", async (c) => {
  const state = parseDrawState(getCookie(c, COOKIE_NAME), jstDate());
  if (atLimit(state)) return c.html(limitPage());

  const k = await randomKakugen(c.env.DB);
  if (!k) return c.html(limitPage()); // empty DB safety net

  const next = increment(state);
  setCookie(c, COOKIE_NAME, serializeDrawState(next), {
    httpOnly: true, path: "/", sameSite: "Lax", maxAge: 60 * 60 * 48,
  });
  return c.html(resultPage(k, remaining(next)));
});

app.get("/kakugens/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (!Number.isInteger(id)) return c.notFound();
  const k = await getKakugen(c.env.DB, id);
  if (!k) return c.notFound();
  const state = parseDrawState(getCookie(c, COOKIE_NAME), jstDate());
  return c.html(resultPage(k, remaining(state)));
});

export default app;
