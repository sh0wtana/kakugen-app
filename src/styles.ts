export const CSS = `
:root{
  --sumi:#15120E; --sumi-center:#211C16; --gofun:#EDE6D6;
  --shu:#BC3B2E; --nezu:#6E665B; --nibi:#34302A;
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{
  background:radial-gradient(120% 80% at 50% 38%, var(--sumi-center), var(--sumi) 70%);
  color:var(--gofun);
  font-family:"Noto Sans JP",sans-serif;
  min-height:100dvh; display:flex; flex-direction:column;
  -webkit-font-smoothing:antialiased;
}
a{color:inherit;text-decoration:none}
.screen{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem 1.25rem}
/* ── home ── */
.home-title{font-family:"Shippori Mincho",serif;font-size:1.1rem;letter-spacing:.5em;color:var(--nezu);margin-bottom:2.5rem}
.draw-btn{
  font-family:"Shippori Mincho",serif;font-size:1.6rem;letter-spacing:.4em;
  color:var(--gofun);background:transparent;border:1px solid var(--nibi);
  width:8.5rem;height:8.5rem;border-radius:50%;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:transform .15s ease, border-color .2s ease;
}
.draw-btn:hover{border-color:var(--shu)}
.draw-btn:active{transform:scale(.96)}
.draw-btn[aria-disabled="true"]{opacity:.35;pointer-events:none}
.tally{margin-top:2rem;color:var(--nezu);font-size:.8rem;letter-spacing:.25em;display:flex;gap:.6rem;align-items:center}
.dot{width:.5rem;height:.5rem;border-radius:50%;border:1px solid var(--nezu);display:inline-block}
.dot.used{background:var(--shu);border-color:var(--shu)}
/* ── result / wallpaper ── */
.wall{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;padding:3rem 1.5rem 1rem}
.quote{
  writing-mode:vertical-rl; text-orientation:upright;
  font-family:"Yuji Syuku",serif; line-height:1.9;
  font-size:clamp(1.4rem, 7vw, 2.6rem);
  max-height:62vh; color:var(--gofun);
}
.quote.long{font-family:"Shippori Mincho",serif;font-size:clamp(1.1rem,5vw,1.8rem)}
.quote .ch{display:inline-block;opacity:0;filter:blur(6px);transform:translateY(-6px);
  animation:inkin .5s ease forwards; animation-delay:calc(var(--i) * 40ms)}
@keyframes inkin{to{opacity:1;filter:blur(0);transform:none}}
.sig{align-self:flex-start;margin-top:1.5rem;display:flex;align-items:center;gap:.6rem;
  opacity:0;animation:fadein .4s ease forwards .5s}
.seal{width:2.1rem;height:2.1rem;border:2px solid var(--shu);color:var(--shu);
  border-radius:3px;display:flex;align-items:center;justify-content:center;
  font-family:"Shippori Mincho",serif;font-size:.7rem;line-height:1;text-align:center;
  transform:scale(1.25);opacity:0;animation:stamp .25s ease forwards .8s}
.author{font-family:"Shippori Mincho",serif;font-size:1rem;color:var(--gofun)}
.citation{font-family:"Shippori Mincho",serif;font-size:.75rem;color:var(--nezu);margin-top:.2rem}
@keyframes fadein{to{opacity:1}}
@keyframes stamp{to{transform:scale(1);opacity:1}}
/* ── bottom bar (outside screenshot zone) ── */
.bar{display:flex;align-items:center;justify-content:space-between;gap:1rem;
  width:100%;padding:.9rem 1.25rem;border-top:1px solid var(--nibi);background:var(--sumi)}
.bar a,.bar button{font-family:"Noto Sans JP",sans-serif;font-size:.85rem;letter-spacing:.15em;
  color:var(--gofun);background:transparent;border:none;cursor:pointer}
.bar .muted{color:var(--nezu)}
/* ── forms ── */
.form{width:100%;max-width:22rem;display:flex;flex-direction:column;gap:1.25rem}
.form label{font-size:.8rem;letter-spacing:.2em;color:var(--nezu);display:block;margin-bottom:.4rem}
.form input{width:100%;background:transparent;border:none;border-bottom:1px solid var(--nibi);
  color:var(--gofun);font-family:"Shippori Mincho",serif;font-size:1.1rem;padding:.5rem 0}
.form input:focus{outline:none;border-bottom-color:var(--shu)}
.form .err{color:var(--shu);font-size:.8rem}
.submit{align-self:flex-start;margin-top:.5rem;color:var(--shu);background:transparent;
  border:1px solid var(--shu);border-radius:3px;padding:.6rem 1.6rem;
  font-family:"Shippori Mincho",serif;font-size:1rem;letter-spacing:.3em;cursor:pointer}
.msg{font-family:"Shippori Mincho",serif;font-size:1.2rem;color:var(--gofun);text-align:center;line-height:2}
:focus-visible{outline:2px solid var(--shu);outline-offset:3px}
@media (prefers-reduced-motion: reduce){
  .quote .ch,.sig,.seal{animation:none!important;opacity:1!important;filter:none!important;transform:none!important}
}
`;
