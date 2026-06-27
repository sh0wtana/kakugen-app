import { html } from "hono/html";
import type { HtmlEscapedString } from "hono/utils/html";
import { layout } from "./layout";

export function registerPage(opts: { text?: string; author?: string; error?: string } = {}): HtmlEscapedString {
  const { text = "", author = "", error } = opts;
  const body = html`
    <main class="screen">
      <form class="form" method="post" action="/kakugens">
        ${error ? html`<p class="err">${error}</p>` : ""}
        <div>
          <label for="text">格言</label>
          <input id="text" name="text" value="${text}" maxlength="200" autocomplete="off">
        </div>
        <div>
          <label for="author">著者</label>
          <input id="author" name="author" value="${author}" maxlength="60" autocomplete="off">
        </div>
        <button class="submit" type="submit">納める</button>
      </form>
    </main>`;
  return layout("格言を登録", body);
}
