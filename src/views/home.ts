import { html, raw } from "hono/html";
import type { HtmlEscapedString } from "hono/utils/html";
import { layout } from "./layout";
import { DRAW_LIMIT } from "../drawLimit";

// The ensō (円相): a single-breath Zen brush circle, drawn as a ~330° arc with
// the traditional opening at the top. Static, trusted markup → raw() is safe.
const ENSO = raw(`
<svg class="enso" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
  <defs>
    <filter id="ink" x="-25%" y="-25%" width="150%" height="150%">
      <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>
  <path class="enso-path" pathLength="1" transform="rotate(-8 100 100)"
    d="M 145.9 34.5 A 80 80 0 1 1 107.0 20.3"/>
</svg>`);

export function homePage(remaining: number): HtmlEscapedString {
  const used = DRAW_LIMIT - remaining;
  const dots = Array.from({ length: DRAW_LIMIT }, (_, i) =>
    html`<span class="dot ${i < used ? "used" : ""}"></span>`
  );
  const disabled = remaining <= 0;
  const body = html`
    <main class="screen home">
      <header class="masthead">
        <h1 class="wordmark">格言みくじ</h1>
      </header>
      <a class="enso-draw ${disabled ? "is-spent" : ""}" href="/draw"
         aria-disabled="${disabled ? "true" : "false"}" aria-label="格言を引く">
        ${ENSO}
        <span class="enso-label">引く</span>
      </a>
      <div class="tally">
        ${dots}
        <span>${disabled ? html`本日は${DRAW_LIMIT}回引き終えました。` : html`本日 残り ${remaining} 回`}</span>
      </div>
      <a class="reg-link" href="/new">格言を登録する</a>
    </main>`;
  return layout("格言みくじ", body);
}
