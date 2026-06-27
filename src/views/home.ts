import { html } from "hono/html";
import type { HtmlEscapedString } from "hono/utils/html";
import { layout } from "./layout";
import { DRAW_LIMIT } from "../drawLimit";

export function homePage(remaining: number): HtmlEscapedString {
  const used = DRAW_LIMIT - remaining;
  const dots = Array.from({ length: DRAW_LIMIT }, (_, i) =>
    html`<span class="dot ${i < used ? "used" : ""}"></span>`
  );
  const disabled = remaining <= 0;
  const body = html`
    <main class="screen">
      <div class="home-title">格言</div>
      <a class="draw-btn" href="/draw" aria-disabled="${disabled ? "true" : "false"}">引く</a>
      <div class="tally">
        ${dots}
        <span>本日 残り ${remaining} 回</span>
      </div>
    </main>`;
  return layout("格言", body);
}
