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
/* ── home (ensō ritual) ── */
.home{position:relative}
/* atmosphere: a faint warm ink-bloom that breathes, and an edge vignette for depth */
.home::before{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;
  background:radial-gradient(58% 48% at 50% 41%, rgba(188,59,46,.06), transparent 70%);
  animation:breathe 14s ease-in-out infinite}
.home::after{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;
  box-shadow:inset 0 0 24vh 9vh rgba(8,6,4,.72)}
@keyframes breathe{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.07)}}
.masthead{display:flex;flex-direction:column;align-items:center;gap:.7rem;margin-bottom:clamp(1.8rem,6vh,3.2rem)}
.wordmark{font-family:"Yuji Syuku",serif;font-weight:400;font-size:clamp(2.3rem,11vw,3.5rem);
  letter-spacing:.34em;text-indent:.34em;line-height:1;color:var(--gofun)}
.ritual-tag{font-family:"Shippori Mincho",serif;font-size:.8rem;letter-spacing:.32em;
  text-indent:.32em;color:var(--nezu)}
.enso-draw{position:relative;display:grid;place-items:center;
  width:clamp(13rem,56vw,18rem);aspect-ratio:1;cursor:pointer;
  -webkit-tap-highlight-color:transparent;transition:transform .15s ease}
.enso{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.enso-path{fill:none;stroke:var(--gofun);stroke-width:8;stroke-linecap:round;
  filter:url(#ink);transition:stroke .5s ease;
  stroke-dasharray:1;stroke-dashoffset:1;
  animation:draw-enso 1.25s cubic-bezier(.22,.61,.36,1) .15s forwards}
.enso-label{position:relative;font-family:"Yuji Syuku",serif;
  font-size:clamp(1.9rem,8vw,2.5rem);letter-spacing:.34em;text-indent:.34em;
  color:var(--gofun);transition:color .4s ease,text-shadow .4s ease}
.enso-draw:hover .enso-path{stroke:var(--shu)}
.enso-draw:hover .enso-label{color:#F6EEDF;text-shadow:0 0 18px rgba(188,59,46,.45)}
.enso-draw:active{transform:scale(.975)}
.enso-draw.is-spent{opacity:.32;pointer-events:none}
@keyframes draw-enso{to{stroke-dashoffset:0}}
.reg-link{margin-top:clamp(2rem,7vh,3rem);font-family:"Shippori Mincho",serif;
  font-size:.8rem;letter-spacing:.28em;color:var(--nezu);
  border-bottom:1px solid transparent;padding-bottom:.15rem;
  transition:color .3s ease,border-color .3s ease}
.reg-link:hover{color:var(--gofun);border-color:var(--nibi)}
@media (prefers-reduced-motion: reduce){
  .enso-path{animation:none!important;stroke-dashoffset:0!important}
  .home::before{animation:none!important}
}
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
.sig{align-self:center;margin-top:1.5rem;display:flex;align-items:center;gap:.6rem;
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
.form input,.form textarea{width:100%;background:transparent;color:var(--gofun);
  font-family:"Shippori Mincho",serif;font-size:1.1rem}
.form input{border:none;border-bottom:1px solid var(--nibi);padding:.5rem 0}
.form textarea{border:1px solid var(--nibi);border-radius:3px;padding:.65rem .75rem;
  line-height:1.8;min-height:7rem;resize:vertical}
.form input:focus{outline:none;border-bottom-color:var(--shu)}
.form textarea:focus{outline:none;border-color:var(--shu)}
.form .err{color:var(--shu);font-size:.8rem}
.submit{align-self:center;margin-top:.5rem;color:var(--shu);background:transparent;
  border:1px solid var(--shu);border-radius:3px;padding:.6rem 1.6rem;
  font-family:"Shippori Mincho",serif;font-size:1rem;letter-spacing:.3em;cursor:pointer}
.msg{font-family:"Shippori Mincho",serif;font-size:1.2rem;color:var(--gofun);text-align:center;line-height:2}
:focus-visible{outline:2px solid var(--shu);outline-offset:3px}
@media (prefers-reduced-motion: reduce){
  .quote .ch,.sig,.seal{animation:none!important;opacity:1!important;filter:none!important;transform:none!important}
}
`;
