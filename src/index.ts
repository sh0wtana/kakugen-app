import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import {
  COOKIE_NAME, jstDate, parseDrawState, serializeDrawState,
  atLimit, increment, remaining,
} from "./drawLimit";
import { randomKakugen, getKakugen, insertKakugen } from "./db";
import { homePage } from "./views/home";
import { resultPage } from "./views/result";
import { limitPage } from "./views/limit";
import { registerPage } from "./views/register";

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
  return c.redirect(`/kakugens/${k.id}`, 303);
});

app.get("/kakugens/:id", async (c) => {
  const id = Number(c.req.param("id"));
  if (!Number.isInteger(id)) return c.notFound();
  const k = await getKakugen(c.env.DB, id);
  if (!k) return c.notFound();
  const state = parseDrawState(getCookie(c, COOKIE_NAME), jstDate());
  return c.html(resultPage(k, remaining(state)));
});

app.get("/new", (c) => c.html(registerPage()));

app.post("/kakugens", async (c) => {
  const body = await c.req.parseBody();
  const text = String(body.text ?? "").trim().slice(0, 200);
  const author = String(body.author ?? "").trim().slice(0, 60);
  if (!text || !author) {
    return c.html(
      registerPage({ text, author, error: "格言と著者の両方を入力してください。" }),
      422
    );
  }
  const id = await insertKakugen(c.env.DB, text, author);
  return c.redirect(`/kakugens/${id}`, 303);
});

export default app;
