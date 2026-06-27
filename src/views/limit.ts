import { html } from "hono/html";
import type { HtmlEscapedString } from "hono/utils/html";
import { layout } from "./layout";

export function limitPage(): HtmlEscapedString {
  const body = html`
    <main class="screen">
      <div class="tally"><span class="dot used"></span><span class="dot used"></span><span class="dot used"></span></div>
      <p class="msg">本日の三回を引き終えました。<br>また明日</p>
      <div class="tally"><a href="/new">格言を登録する</a></div>
    </main>`;
  return layout("また明日", body);
}
