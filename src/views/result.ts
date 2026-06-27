import { html } from "hono/html";
import type { HtmlEscapedString } from "hono/utils/html";
import { layout } from "./layout";
import type { Kakugen } from "../db";

const LONG_THRESHOLD = 28; // chars → switch to Shippori Mincho for legibility

// Wrap each character in a span with a stagger index. Escapes text via html``.
function inkChars(text: string): HtmlEscapedString[] {
  return Array.from(text).map((ch, i) => html`<span class="ch" style="--i:${i}">${ch}</span>`);
}

export function resultPage(k: Kakugen, remaining: number): HtmlEscapedString {
  const longClass = Array.from(k.text).length > LONG_THRESHOLD ? "long" : "";
  const body = html`
    <section class="wall">
      <div class="quote ${longClass}">${inkChars(k.text)}</div>
      <div class="sig">
        <span class="seal">落款</span>
        <span>
          <span class="author">${k.author}</span>
          ${k.citation ? html`<span class="citation">${k.citation}</span>` : ""}
        </span>
      </div>
    </section>
    <nav class="bar">
      <a href="/">← 戻る</a>
      <span class="muted">残り ${remaining} 回</span>
      ${remaining > 0 ? html`<a href="/draw">もう一度引く</a>` : html`<a href="/new">登録する</a>`}
    </nav>`;
  return layout(k.author, body);
}
