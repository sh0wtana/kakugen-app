import { html, raw } from "hono/html";
import type { HtmlEscapedString } from "hono/utils/html";
import { CSS } from "../styles";

const FONTS =
  "https://fonts.googleapis.com/css2?family=Yuji+Syuku&family=Shippori+Mincho:wght@500;600&family=Noto+Sans+JP:wght@400;500&display=swap";

export function layout(title: string, body: HtmlEscapedString | string): HtmlEscapedString {
  return html`<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<style>${raw(CSS)}</style>
</head>
<body>${body}</body>
</html>`;
}
