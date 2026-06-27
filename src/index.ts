import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { COOKIE_NAME, jstDate, parseDrawState, remaining } from "./drawLimit";
import { homePage } from "./views/home";

const app = new Hono<{ Bindings: Env }>();

app.get("/", (c) => {
  const state = parseDrawState(getCookie(c, COOKIE_NAME), jstDate());
  return c.html(homePage(remaining(state)));
});

export default app;
