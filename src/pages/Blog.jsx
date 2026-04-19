import { useState, useEffect, useRef, useCallback } from "react";
import { useContent } from "../context/ContentContext";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — The UAE Business Gazette  (Blog Page)
//  Newspaper broadsheet aesthetic · Paper-fold open animation
//  Drop into: src/pages/Blog.jsx
// ═══════════════════════════════════════════════════════════════

const CSS = `

/* ─── RESET ─────────────────────────────────────────────────── */
.bg-root *, .bg-root *::before, .bg-root *::after { box-sizing:border-box; margin:0; padding:0; }

.bg-root {
  --ink:     #0d0b08;
  --ink2:    #2a2520;
  --ink3:    #5c5248;
  --ink4:    #8c8078;
  --paper:   #f5f0e8;
  --paper2:  #ede8dc;
  --paper3:  #e2dace;
  --paper4:  #d4ccbc;
  --gold:    #8B6914;
  --gold2:   #C9A84C;
  --red:     #8B1A1A;
  --rule:    rgba(13,11,8,0.18);
  --rule2:   rgba(13,11,8,0.08);

  /* Dark nav palette */
  --n900:#05111e; --n800:#091928; --n750:#0c2033;
  --w:#F8F5EE; --w60:rgba(248,245,238,0.6); --w30:rgba(248,245,238,0.3);

  --fd:'Playfair Display',Georgia,serif;
  --fb:'Libre Baskerville',Georgia,serif;
  --fs:'DM Sans',system-ui,sans-serif;
  --fc:'Cormorant Garamond',Georgia,serif;
  --ff:'Cormorant Garamond',Georgia,serif;

  background:var(--paper); color:var(--ink);
  font-family:var(--fb); font-weight:400;
  overflow-x:hidden; width:100%;
  /* Paper grain texture */
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
}

/* ─── PAPER FOLD ANIMATION ───────────────────────────────────── */
/* The whole page folds in from top like unfolding a newspaper */
.bg-paper-fold {
  animation: paperUnfold 1.1s cubic-bezier(0.16,1,0.3,1) forwards;
  transform-origin: top center;
}
@keyframes paperUnfold {
  0%  { transform: perspective(1200px) rotateX(-12deg) translateY(-20px); }
  100%{ transform: perspective(1200px) rotateX(0deg) translateY(0); }
}

/* Article open: newspaper page-turn from right */
.bg-article-enter {
  animation: pageTurn 0.7s cubic-bezier(0.4,0,0.2,1) forwards;
  transform-origin: left center;
}
@keyframes pageTurn {
  0%  { transform: perspective(1400px) rotateY(-80deg) translateX(60px); opacity:0; }
  60% { opacity:1; }
  100%{ transform: perspective(1400px) rotateY(0deg) translateX(0); opacity:1; }
}

/* Article close: fold back */
.bg-article-exit {
  animation: pageFold 0.45s cubic-bezier(0.4,0,0.6,1) forwards;
  transform-origin: left center;
}
@keyframes pageFold {
  0%  { transform:perspective(1400px) rotateY(0deg); opacity:1; }
  100%{ transform:perspective(1400px) rotateY(-80deg) translateX(60px); opacity:0; }
}

/* Ink stamp reveal for headlines */
@keyframes inkStamp {
  0%  { opacity:0; transform:scale(1.04); filter:blur(2px); }
  50% { filter:blur(0); }
  100%{ opacity:1; transform:scale(1); }
}
.ink-stamp { animation: inkStamp 0.6s cubic-bezier(0.16,1,0.3,1) both; }

/* Press print line-by-line reveal */
@keyframes inkPress {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0% 0 0); }
}
.ink-press { animation: inkPress 1.2s cubic-bezier(0.16,1,0.3,1) both; }

/* ─── NAV — DARK ─────────────────────────────────────────────── */
.bg-nav {
  background:var(--n900); position:fixed; inset-inline:0; top:0; z-index:300;
  display:flex; align-items:center; justify-content:space-between;
  padding:18px 60px; border-bottom:1px solid rgba(201,168,76,0.15);
  transition:padding .4s;
}
.bg-nav.scrolled { padding:12px 60px; }
.bg-nav-logo { font-family:'Cormorant Garamond',serif; font-size:1.4rem; font-weight:400; letter-spacing:.15em; color:var(--w); cursor:pointer; }
.bg-nav-logo em { color:#C9A84C; font-style:normal; }
.bg-nav-links { display:flex; gap:32px; list-style:none; }
.bg-nav-links a { font-size:.68rem; letter-spacing:.14em; text-transform:uppercase; color:var(--w60); text-decoration:none; transition:color .3s; font-family:var(--fs); }
.bg-nav-links a:hover { color:#C9A84C; }
.bg-nav-cta { font-size:.68rem; letter-spacing:.14em; text-transform:uppercase; background:transparent; border:1px solid #C9A84C; color:#C9A84C; padding:8px 20px; cursor:pointer; font-family:var(--fs); transition:all .3s; }
.bg-nav-cta:hover { background:#C9A84C; color:var(--n900); }
.bg-back-btn { background:none; border:none; font-family:var(--fs); font-size:.65rem; letter-spacing:.18em; text-transform:uppercase; color:var(--w30); cursor:pointer; display:flex; align-items:center; gap:8px; padding:0; transition:color .3s; }
.bg-back-btn:hover { color:#C9A84C; }
.bg-back-btn::before { content:'←'; font-size:.85rem; }

/* ─── MASTHEAD ───────────────────────────────────────────────── */
.bg-masthead {
  padding:96px 60px 0;
  border-bottom:4px double var(--ink);
  position:relative;
}
.bg-masthead-top {
  display:flex; align-items:center; justify-content:space-between;
  padding-bottom:12px; border-bottom:1px solid var(--rule);
  margin-bottom:12px;
}
.bg-masthead-meta { font-family:var(--fs); font-size:.62rem; color:var(--ink4); letter-spacing:.06em; }
.bg-masthead-meta strong { color:var(--ink3); }

/* THE GAZETTE nameplate */
.bg-nameplate {
  text-align:center; padding:18px 0 20px; position:relative;
}
.bg-nameplate-title {
  font-family:var(--ff); font-size:clamp(3.2rem,7vw,6.5rem);
  color:var(--ink); line-height:1; display:block;
  letter-spacing:.02em;
}
.bg-nameplate-sub {
  font-family:var(--fb); font-size:.72rem; letter-spacing:.35em;
  text-transform:uppercase; color:var(--ink3); margin-top:6px; display:block;
}
.bg-nameplate-rule {
  display:flex; align-items:center; gap:0; margin:12px 0 0;
}
.bg-nameplate-rule-thick { height:3px; flex:1; background:var(--ink); }
.bg-nameplate-rule-thin  { height:1px; flex:1; background:var(--ink); margin-top:4px; }
.bg-nameplate-rule-gap { width:20px; }

/* Category nav strip */
.bg-catbar {
  display:flex; gap:0; overflow-x:auto; scrollbar-width:none;
  border-top:1px solid var(--rule); margin-top:0;
  padding:10px 0 11px;
}
.bg-catbar::-webkit-scrollbar { display:none; }
.bg-cat-btn {
  font-family:var(--fs); font-size:.65rem; letter-spacing:.16em; text-transform:uppercase;
  background:none; border:none; color:var(--ink3); cursor:pointer; padding:4px 20px;
  border-right:1px solid var(--rule); white-space:nowrap; transition:all .25s;
}
.bg-cat-btn:first-child { padding-left:0; }
.bg-cat-btn:last-child { border-right:none; }
.bg-cat-btn:hover { color:var(--ink); }
.bg-cat-btn.active { color:var(--ink); font-weight:700; }

/* ─── TICKER ─────────────────────────────────────────────────── */
.bg-ticker {
  background:var(--ink); color:var(--paper); padding:7px 0; overflow:hidden;
  display:flex; align-items:center; gap:0;
}
.bg-ticker-label {
  font-family:var(--fs); font-size:.6rem; font-weight:700; letter-spacing:.2em;
  text-transform:uppercase; background:var(--red); color:#fff;
  padding:0 14px; white-space:nowrap; align-self:stretch;
  display:flex; align-items:center;
}
.bg-ticker-track {
  display:flex; gap:0; white-space:nowrap;
  animation:bgTicker 35s linear infinite;
}
.bg-ticker-item {
  font-family:var(--fs); font-size:.65rem; letter-spacing:.04em; color:var(--paper2);
  padding:0 32px; display:inline-flex; align-items:center; gap:20px;
}
.bg-ticker-sep { color:var(--gold2); opacity:.6; font-size:.5rem; }
@keyframes bgTicker { from{transform:translateX(0)} to{transform:translateX(-50%)} }

/* ─── MAIN BROADSHEET GRID ───────────────────────────────────── */
.bg-broadsheet {
  padding:0 60px; display:grid;
  grid-template-columns:1fr 2px 2.2fr 2px 1fr;
  gap:0; margin-top:0;
  border-bottom:2px solid var(--ink);
}
.bg-col-rule { background:var(--rule); align-self:stretch; margin:24px 0; }

/* Left column */
.bg-col-left { padding:24px 28px 32px 0; border-right:none; }
.bg-col-center { padding:24px 32px 32px; }
.bg-col-right { padding:24px 0 32px 28px; }

/* ─── SECTION LABELS ─────────────────────────────────────────── */
.bg-section-label {
  font-family:var(--fs); font-size:.58rem; letter-spacing:.28em; text-transform:uppercase;
  color:var(--ink3); border-bottom:2px solid var(--ink); padding-bottom:6px;
  margin-bottom:20px; display:flex; align-items:center; justify-content:space-between;
}
.bg-section-label-tag {
  background:var(--ink); color:var(--paper); padding:2px 8px; font-size:.52rem;
}

/* ─── HEADLINE STORY (center top) ───────────────────────────── */
.bg-headline-story { margin-bottom:28px; cursor:pointer; }
.bg-headline-kicker {
  font-family:var(--fs); font-size:.6rem; letter-spacing:.22em; text-transform:uppercase;
  color:var(--red); margin-bottom:10px; display:block;
}
.bg-headline-h1 {
  font-family:var(--fd); font-size:clamp(2.4rem,4.5vw,3.8rem); font-weight:900;
  line-height:1.0; color:var(--ink); margin-bottom:14px;
  letter-spacing:-.02em;
  transition:color .3s;
}
.bg-headline-story:hover .bg-headline-h1 { color:var(--red); }
.bg-headline-deck {
  font-family:var(--fb); font-size:.9rem; color:var(--ink2); line-height:1.6;
  margin-bottom:16px; font-style:italic;
}
.bg-headline-byline {
  font-family:var(--fs); font-size:.62rem; letter-spacing:.1em; color:var(--ink3);
  display:flex; align-items:center; gap:16px;
}
.bg-headline-byline::before { content:''; width:20px; height:1px; background:var(--ink3); }

/* Feature image placeholder (paper-toned) */
.bg-headline-img {
  width:100%; aspect-ratio:16/7; margin:18px 0;
  background:linear-gradient(135deg, var(--paper3) 0%, var(--paper4) 100%);
  position:relative; overflow:hidden;
  display:flex; align-items:center; justify-content:center;
}
.bg-headline-img::before {
  content:''; position:absolute; inset:0;
  background:repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(13,11,8,.04) 28px,rgba(13,11,8,.04) 29px);
}
.bg-headline-img-label {
  font-family:var(--fb); font-size:.7rem; font-style:italic; color:var(--ink4);
  position:relative; z-index:1; text-align:center; padding:0 40px;
}

/* ─── COLUMN RULE TEXT (body copy layout) ───────────────────── */
.bg-body-cols {
  columns:2; column-gap:24px;
  column-rule:1px solid var(--rule);
  font-family:var(--fb); font-size:.82rem; line-height:1.75; color:var(--ink2);
  margin-bottom:0; text-align:justify;
  hyphens:auto;
}
.bg-body-cols p { margin-bottom:.75em; break-inside:avoid; }
.bg-body-cols::first-letter {
  font-family:var(--fd); font-size:3.8rem; font-weight:700;
  float:left; line-height:.8; margin:4px 8px 0 0; color:var(--ink);
}

/* ─── SIDE STORY CARDS ───────────────────────────────────────── */
.bg-side-story {
  padding:16px 0; border-bottom:1px solid var(--rule);
  cursor:pointer; transition:background .3s;
}
.bg-side-story:last-child { border-bottom:none; }
.bg-side-story:hover { background:rgba(13,11,8,.025); margin:-2px; padding:18px 2px; }
.bg-side-story-cat {
  font-family:var(--fs); font-size:.55rem; letter-spacing:.24em; text-transform:uppercase;
  color:var(--red); margin-bottom:6px; display:block;
}
.bg-side-story-title {
  font-family:var(--fd); font-size:1.05rem; font-weight:600; line-height:1.25;
  color:var(--ink); margin-bottom:8px;
  transition:color .3s;
}
.bg-side-story:hover .bg-side-story-title { color:var(--red); }
.bg-side-story-deck { font-size:.76rem; color:var(--ink3); line-height:1.6; font-family:var(--fb); margin-bottom:8px; }
.bg-side-story-meta { font-family:var(--fs); font-size:.58rem; color:var(--ink4); letter-spacing:.06em; }

/* ─── ISSUE DATE / WEATHER STRIP (left col top) ─────────────── */
.bg-datebox {
  background:var(--ink); color:var(--paper); padding:16px 18px; margin-bottom:20px;
  text-align:center;
}
.bg-datebox-date { font-family:var(--fd); font-size:1.5rem; font-weight:600; display:block; line-height:1; }
.bg-datebox-label { font-family:var(--fs); font-size:.55rem; letter-spacing:.2em; text-transform:uppercase; color:rgba(245,240,232,.5); margin-top:5px; display:block; }
.bg-datebox-info { font-family:var(--fs); font-size:.62rem; color:rgba(245,240,232,.7); margin-top:10px; line-height:1.6; }

/* ─── PULL QUOTE ─────────────────────────────────────────────── */
.bg-pull-quote {
  margin:24px 0; padding:18px 0; border-top:3px solid var(--ink); border-bottom:1px solid var(--rule);
  font-family:var(--fd); font-size:1.25rem; font-style:italic; font-weight:500;
  line-height:1.45; color:var(--ink); text-align:center;
}
.bg-pull-quote cite { display:block; font-style:normal; font-family:var(--fs); font-size:.6rem; letter-spacing:.18em; text-transform:uppercase; color:var(--ink4); margin-top:10px; }

/* ─── BELOW-FOLD GRID ────────────────────────────────────────── */
.bg-below-fold {
  padding:0 60px 40px; display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:0; border-bottom:2px solid var(--ink);
}
.bg-bf-card {
  padding:24px 24px 24px 0; border-right:1px solid var(--rule);
  cursor:pointer; transition:background .3s;
}
.bg-bf-card:last-child { border-right:none; padding-right:0; padding-left:24px; }
.bg-bf-card:nth-child(2) { padding:24px; }
.bg-bf-card:nth-child(3) { padding:24px; }
.bg-bf-card:hover { background:rgba(13,11,8,.025); }
.bg-bf-img {
  width:100%; aspect-ratio:4/2.5; margin-bottom:14px;
  background:linear-gradient(135deg, var(--paper3), var(--paper4));
  position:relative; overflow:hidden;
}
.bg-bf-img::after {
  content:''; position:absolute; inset:0;
  background:repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(13,11,8,.03) 10px,rgba(13,11,8,.03) 11px);
}
.bg-bf-tag { font-family:var(--fs); font-size:.55rem; letter-spacing:.22em; text-transform:uppercase; color:var(--red); margin-bottom:7px; display:block; }
.bg-bf-title {
  font-family:var(--fd); font-size:1.05rem; font-weight:600; line-height:1.3;
  color:var(--ink); margin-bottom:8px;
  transition:color .3s;
}
.bg-bf-card:hover .bg-bf-title { color:var(--red); }
.bg-bf-deck { font-size:.74rem; color:var(--ink3); line-height:1.55; font-family:var(--fb); margin-bottom:8px; }
.bg-bf-meta { font-family:var(--fs); font-size:.57rem; color:var(--ink4); letter-spacing:.06em; }

/* ─── OPINION + DIGEST ROW ───────────────────────────────────── */
.bg-digest-row {
  padding:0 60px 40px;
  display:grid; grid-template-columns:1.5fr 2px 1fr 2px 1fr;
  gap:0; border-bottom:2px solid var(--ink);
}
.bg-digest-rule { background:var(--rule); margin:20px 0; }
.bg-opinion { padding:24px 32px 24px 0; }
.bg-opinion-title { font-family:var(--fd); font-size:1.8rem; font-weight:700; line-height:1.15; color:var(--ink); margin-bottom:12px; cursor:pointer; transition:color .3s; }
.bg-opinion-title:hover { color:var(--red); }
.bg-opinion-author { display:flex; align-items:center; gap:14px; margin-bottom:14px; }
.bg-opinion-avatar { width:42px; height:42px; border-radius:50%; background:var(--paper3); border:1px solid var(--rule); display:flex; align-items:center; justify-content:center; font-family:var(--fd); font-size:1.1rem; color:var(--ink3); }
.bg-opinion-author-info { font-family:var(--fs); font-size:.65rem; color:var(--ink3); }
.bg-opinion-body { font-family:var(--fb); font-size:.82rem; color:var(--ink2); line-height:1.78; font-style:italic; }

.bg-digest { padding:24px 28px; }
.bg-digest-item { padding:12px 0; border-bottom:1px solid var(--rule); cursor:pointer; }
.bg-digest-item:last-child { border-bottom:none; }
.bg-digest-item-num { font-family:var(--fd); font-size:1.8rem; font-weight:700; color:var(--paper4); line-height:1; float:left; margin-right:12px; margin-top:-4px; }
.bg-digest-item-title { font-family:var(--fd); font-size:.9rem; font-weight:600; color:var(--ink); line-height:1.3; margin-bottom:4px; transition:color .3s; }
.bg-digest-item:hover .bg-digest-item-title { color:var(--red); }
.bg-digest-item-meta { font-family:var(--fs); font-size:.57rem; color:var(--ink4); clear:both; }

/* ─── ARTICLE OVERLAY ────────────────────────────────────────── */
.bg-overlay {
  position:fixed; inset:0; z-index:400;
  background:var(--paper); overflow-y:auto;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E");
}
.bg-overlay-inner { max-width:840px; margin:0 auto; padding:80px 48px 80px; }
.bg-overlay-close {
  position:fixed; top:24px; right:32px; z-index:500;
  background:var(--ink); color:var(--paper); border:none;
  width:40px; height:40px; font-size:1.1rem; cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  font-family:var(--fs); transition:background .3s;
}
.bg-overlay-close:hover { background:var(--red); }

/* Article typography */
.bg-art-kicker { font-family:var(--fs); font-size:.65rem; letter-spacing:.28em; text-transform:uppercase; color:var(--red); margin-bottom:14px; display:block; }
.bg-art-h1 {
  font-family:var(--fd); font-size:clamp(2.4rem,5vw,4rem); font-weight:900;
  line-height:.97; color:var(--ink); margin-bottom:18px; letter-spacing:-.025em;
}
.bg-art-deck { font-family:var(--fb); font-size:1.05rem; font-style:italic; color:var(--ink2); line-height:1.65; margin-bottom:20px; border-bottom:2px solid var(--ink); padding-bottom:20px; }
.bg-art-byline-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:28px; padding-bottom:16px; border-bottom:1px solid var(--rule); }
.bg-art-byline { font-family:var(--fs); font-size:.65rem; letter-spacing:.08em; color:var(--ink3); }
.bg-art-byline strong { color:var(--ink); font-weight:600; }
.bg-art-date { font-family:var(--fs); font-size:.62rem; color:var(--ink4); }

.bg-art-img {
  width:100%; aspect-ratio:16/7; margin-bottom:8px;
  background:linear-gradient(135deg, var(--paper3) 0%, var(--paper4) 100%);
  position:relative; overflow:hidden;
  display:flex; align-items:center; justify-content:center;
}
.bg-art-img::before {
  content:''; position:absolute; inset:0;
  background:repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(13,11,8,.05) 28px,rgba(13,11,8,.05) 29px);
}
.bg-art-caption { font-family:var(--fs); font-size:.6rem; color:var(--ink4); font-style:italic; margin-bottom:28px; }

.bg-art-body { columns:2; column-gap:32px; column-rule:1px solid var(--rule); }
.bg-art-body p { font-family:var(--fb); font-size:.88rem; line-height:1.85; color:var(--ink2); margin-bottom:1.1em; text-align:justify; hyphens:auto; }
.bg-art-body p:first-of-type::first-letter {
  font-family:var(--fd); font-size:4.5rem; font-weight:700;
  float:left; line-height:.82; margin:6px 10px 0 0; color:var(--ink);
}
.bg-art-pull {
  column-span:all; margin:20px 0; padding:20px 0;
  border-top:3px solid var(--ink); border-bottom:1px solid var(--rule);
  font-family:var(--fd); font-size:1.4rem; font-style:italic;
  text-align:center; color:var(--ink); line-height:1.45;
}
.bg-art-subhead { font-family:var(--fd); font-size:1.1rem; font-weight:700; color:var(--ink); margin:1.5em 0 .5em; column-span:all; }

/* ─── FOOTER BAR ─────────────────────────────────────────────── */
.bg-footer {
  background:var(--ink); padding:44px 60px; margin-top:0;
  display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:20px;
}
.bg-footer-logo { font-family:var(--ff); font-size:2rem; color:var(--paper2); }
.bg-footer-copy { font-family:var(--fs); font-size:.65rem; color:rgba(245,240,232,.4); letter-spacing:.08em; }
.bg-footer-back { padding:9px 20px; background:transparent; border:1px solid rgba(245,240,232,.2); color:rgba(245,240,232,.6); font-family:var(--fs); font-size:.65rem; letter-spacing:.12em; text-transform:uppercase; cursor:pointer; transition:all .3s; }
.bg-footer-back:hover { border-color:var(--gold2); color:var(--gold2); }

/* ─── REVEAL ─────────────────────────────────────────────────── */
@keyframes bgReveal { from{opacity:0;transform:translateY(14px);} to{opacity:1;transform:translateY(0);} }
.bg-reveal { animation:bgReveal .65s cubic-bezier(0.16,1,0.3,1) both; }
.bg-d1{animation-delay:.06s}.bg-d2{animation-delay:.13s}.bg-d3{animation-delay:.20s}.bg-d4{animation-delay:.27s}

/* ─── FEATURED CAROUSEL ──────────────────────────────────────── */
.bg-featured-wrap { position:relative; overflow:hidden; }
.bg-featured-slide { transition:opacity .55s ease, transform .55s cubic-bezier(0.4,0,0.2,1); }
.bg-featured-slide.exiting { opacity:0; transform:translateX(-24px); pointer-events:none; }
.bg-featured-slide.entering { opacity:0; transform:translateX(24px); }
.bg-featured-slide.visible { opacity:1; transform:translateX(0); }
.bg-progress-dots { display:flex; gap:6px; justify-content:center; margin-top:14px; }
.bg-dot { width:20px; height:2px; background:var(--rule); cursor:pointer; transition:background .3s, width .3s; border:none; padding:0; }
.bg-dot.active { background:var(--ink); width:32px; }

/* ─── MARKET WATCH ───────────────────────────────────────────── */
.bg-market-watch {
  border:1px solid var(--rule); padding:14px 16px; margin-top:20px;
  background:var(--paper2);
}
.bg-market-title { font-family:var(--fs); font-size:.55rem; letter-spacing:.24em; text-transform:uppercase; color:var(--ink3); border-bottom:1px solid var(--rule); padding-bottom:8px; margin-bottom:10px; }
.bg-market-row { display:flex; justify-content:space-between; align-items:baseline; padding:4px 0; border-bottom:1px solid var(--rule2); }
.bg-market-row:last-child { border-bottom:none; }
.bg-market-label { font-family:var(--fs); font-size:.6rem; color:var(--ink3); }
.bg-market-val { font-family:var(--fd); font-size:.85rem; font-weight:600; color:var(--ink); }
.bg-market-chg { font-family:var(--fs); font-size:.56rem; }
.up { color:#2d6a2d; } .dn { color:var(--red); }

/* ─── ROTATING STAT ──────────────────────────────────────────── */
.bg-stat-rotator {
  margin-top:20px; padding:18px 16px; background:var(--ink); color:var(--paper); text-align:center;
  transition:opacity .4s;
}
.bg-stat-num { font-family:var(--fd); font-size:2.4rem; font-weight:700; color:var(--gold2); line-height:1; display:block; }
.bg-stat-lbl { font-family:var(--fs); font-size:.58rem; letter-spacing:.18em; text-transform:uppercase; color:rgba(245,240,232,.5); margin-top:6px; display:block; }

/* ─── EDITORIAL NOTE ─────────────────────────────────────────── */
.bg-editorial-note {
  margin-top:20px; padding:16px 0; border-top:2px solid var(--ink); border-bottom:1px solid var(--rule);
}
.bg-editorial-ornament { text-align:center; font-family:var(--fd); font-size:1.2rem; color:var(--ink4); margin-bottom:8px; }
.bg-editorial-text { font-family:var(--fd); font-size:.85rem; font-style:italic; color:var(--ink2); line-height:1.6; text-align:center; }
.bg-editorial-cite { font-family:var(--fs); font-size:.55rem; letter-spacing:.16em; text-transform:uppercase; color:var(--ink4); text-align:center; display:block; margin-top:8px; }

/* ─── TAG CLOUD ──────────────────────────────────────────────── */
.bg-tag-cloud { margin-top:20px; }
.bg-tag-cloud-title { font-family:var(--fs); font-size:.55rem; letter-spacing:.24em; text-transform:uppercase; color:var(--ink3); border-bottom:2px solid var(--ink); padding-bottom:6px; margin-bottom:12px; }
.bg-tags { display:flex; flex-wrap:wrap; gap:6px; }
.bg-tag {
  font-family:var(--fs); font-size:.58rem; letter-spacing:.1em; text-transform:uppercase;
  border:1px solid var(--rule); padding:4px 10px; cursor:pointer; background:transparent;
  color:var(--ink3); transition:all .25s;
}
.bg-tag:hover,.bg-tag.active { background:var(--ink); color:var(--paper); border-color:var(--ink); }
.bg-tag-count { font-size:.5rem; opacity:.5; margin-left:4px; }

/* ─── SECOND EDITION ─────────────────────────────────────────── */
.bg-second-ed-hdr { padding:8px 60px 0; border-bottom:2px solid var(--ink); }
.bg-second-ed {
  padding:0 60px 40px; display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:0; border-bottom:2px solid var(--ink);
}
.bg-se-card {
  padding:24px 24px 24px 0; border-right:1px solid var(--rule); cursor:pointer; transition:background .3s;
}
.bg-se-card:last-child { border-right:none; padding-right:0; padding-left:24px; }
.bg-se-card:nth-child(2),.bg-se-card:nth-child(3) { padding:24px; }
.bg-se-card:hover { background:rgba(13,11,8,.025); }
.bg-se-num { font-family:var(--fd); font-size:2.4rem; font-weight:700; color:var(--paper3); line-height:1; margin-bottom:6px; }
.bg-se-tag { font-family:var(--fs); font-size:.55rem; letter-spacing:.2em; text-transform:uppercase; color:var(--red); margin-bottom:7px; display:block; }
.bg-se-title { font-family:var(--fd); font-size:1rem; font-weight:600; line-height:1.28; color:var(--ink); margin-bottom:8px; transition:color .3s; }
.bg-se-card:hover .bg-se-title { color:var(--red); }
.bg-se-deck { font-size:.72rem; color:var(--ink3); line-height:1.5; font-family:var(--fb); margin-bottom:8px; }
.bg-se-meta { font-family:var(--fs); font-size:.56rem; color:var(--ink4); }

/* ─── EXTRA COLUMN WIDGETS ──────────────────────────────────── */
html { scroll-behavior:smooth; }
.bg-zone-spotlight { margin-top:20px; border-top:1px solid var(--rule); padding-top:16px; }
.bg-zone-name { font-family:var(--fd); font-size:1.1rem; font-weight:700; color:var(--ink); margin:8px 0 4px; }
.bg-zone-desc { font-family:var(--fb); font-size:.75rem; color:var(--ink3); line-height:1.55; }
.bg-zone-stat { display:inline-block; margin-top:8px; font-family:var(--fs); font-size:.6rem; letter-spacing:.14em; text-transform:uppercase; background:var(--gold); color:var(--paper); padding:3px 9px; }

.bg-quick-facts { margin-top:20px; border-top:1px solid var(--rule); padding-top:16px; }
.bg-qf-row { display:flex; align-items:center; gap:10px; padding:7px 0; border-bottom:1px solid var(--rule2); }
.bg-qf-row:last-child { border-bottom:none; }
.bg-qf-icon { font-size:1rem; flex-shrink:0; width:22px; text-align:center; }
.bg-qf-text { font-family:var(--fb); font-size:.75rem; color:var(--ink2); line-height:1.4; }
.bg-qf-val { font-family:var(--fs); font-size:.68rem; font-weight:600; color:var(--red); margin-left:auto; flex-shrink:0; }

.bg-how-it-works { margin-top:20px; border-top:1px solid var(--rule); padding-top:16px; }
.bg-hiw-step { display:flex; gap:12px; align-items:flex-start; padding:8px 0; border-bottom:1px solid var(--rule2); }
.bg-hiw-step:last-child { border-bottom:none; }
.bg-hiw-num { font-family:var(--fd); font-size:1.4rem; font-weight:700; color:var(--paper3); line-height:1; flex-shrink:0; width:22px; }
.bg-hiw-body { font-family:var(--fb); font-size:.74rem; color:var(--ink2); line-height:1.45; }
.bg-hiw-body strong { font-weight:700; color:var(--ink); display:block; margin-bottom:2px; }

.bg-rates-box { margin-top:20px; border-top:1px solid var(--rule); padding-top:16px; }
.bg-rate-row { display:flex; justify-content:space-between; align-items:center; padding:7px 0; border-bottom:1px solid var(--rule2); }
.bg-rate-row:last-child { border-bottom:none; }
.bg-rate-zone { font-family:var(--fs); font-size:.68rem; font-weight:500; color:var(--ink); }
.bg-rate-price { font-family:var(--fs); font-size:.65rem; color:var(--ink3); }
.bg-rate-badge { font-family:var(--fs); font-size:.55rem; background:var(--rule2); padding:2px 7px; color:var(--ink4); }

/* ─── SPECIAL REPORT BAND ────────────────────────────────────── */
.bg-special-band {
  background:var(--red); color:var(--paper); padding:28px 60px;
  display:flex; align-items:center; gap:40px; cursor:pointer;
  border-bottom:2px solid var(--ink); transition:background .3s;
}
.bg-special-band:hover { background:#6e1414; }
.bg-special-label { font-family:var(--fs); font-size:.55rem; letter-spacing:.3em; text-transform:uppercase; opacity:.65; white-space:nowrap; }
.bg-special-title { font-family:var(--fd); font-size:clamp(1.2rem,2.5vw,1.8rem); font-weight:700; flex:1; line-height:1.2; }
.bg-special-arrow { font-family:var(--fd); font-size:2rem; opacity:.5; flex-shrink:0; }

@media(max-width:768px) {
  .bg-second-ed,.bg-se-card { grid-template-columns:1fr 1fr; }
  .bg-second-ed-hdr,.bg-second-ed { padding-left:20px; padding-right:20px; }
  .bg-special-band { padding:20px; flex-direction:column; align-items:flex-start; gap:10px; }
}

/* ─── RESPONSIVE ─────────────────────────────────────────────── */
@media(max-width:1100px) {
  .bg-broadsheet { grid-template-columns:1fr; }
  .bg-col-rule { display:none; }
  .bg-col-left,.bg-col-center,.bg-col-right { padding:24px 0; border-bottom:1px solid var(--rule); }
  .bg-below-fold { grid-template-columns:1fr 1fr; }
  .bg-digest-row { grid-template-columns:1fr; }
  .bg-digest-rule { display:none; }
  .bg-opinion,.bg-digest { padding:24px 0; border-bottom:1px solid var(--rule); }
}
@media(max-width:768px) {
  .bg-nav { padding:14px 20px; }
  .bg-nav.scrolled { padding:10px 20px; }
  .bg-nav-links { display:none; }
  .bg-masthead,.bg-broadsheet,.bg-below-fold,.bg-digest-row,.bg-footer { padding-left:20px; padding-right:20px; }
  .bg-below-fold { grid-template-columns:1fr; }
  .bg-body-cols { columns:1; }
  .bg-art-body { columns:1; }
  .bg-overlay-inner { padding:60px 24px 60px; }
  .bg-nameplate-title { font-size:clamp(2.4rem,10vw,4rem); }
}

  .bg-nav-hamburger {
    display: none; flex-direction: column; gap: 5px; cursor: pointer;
    background: none; border: none; padding: 6px; z-index: 310;
  }
  .bg-nav-hamburger span {
    display: block; width: 24px; height: 1.5px; background: rgba(248,245,238,0.6);
    transition: all 0.35s cubic-bezier(0.16,1,0.3,1); transform-origin: center;
  }
  .bg-nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: #C9A84C; }
  .bg-nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .bg-nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: #C9A84C; }
  .bg-drawer {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(3,10,20,0.97); backdrop-filter: blur(24px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    transform: translateX(100%); transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
    pointer-events: none;
  }
  .bg-drawer.open { transform: translateX(0); pointer-events: all; }
  .bg-drawer-brand {
    font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.3rem;
    letter-spacing: .18em; color: #F8F5EE; margin-bottom: 44px;
    opacity: 0; transform: translateY(10px);
    transition: opacity .4s .1s, transform .4s .1s;
  }
  .bg-drawer.open .bg-drawer-brand { opacity: 1; transform: translateY(0); }
  .bg-drawer-brand em { color: #C9A84C; font-style: normal; }
  .bg-dlink {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2rem, 8vw, 3rem); font-weight: 300; color: rgba(248,245,238,0.6);
    background: none; border: none; padding: 10px 0; cursor: pointer;
    display: block; width: 100%; text-align: center;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, opacity .4s cubic-bezier(0.16,1,0.3,1), transform .4s cubic-bezier(0.16,1,0.3,1);
  }
  .bg-drawer.open .bg-dlink { opacity: 1; transform: translateY(0); }
  .bg-drawer.open .bg-dlink:nth-of-type(1) { transition-delay: .12s; }
  .bg-drawer.open .bg-dlink:nth-of-type(2) { transition-delay: .17s; }
  .bg-drawer.open .bg-dlink:nth-of-type(3) { transition-delay: .22s; }
  .bg-drawer.open .bg-dlink:nth-of-type(4) { transition-delay: .27s; }
  .bg-drawer.open .bg-dlink:nth-of-type(5) { transition-delay: .32s; }
  .bg-dlink:hover { color: #C9A84C; }
  .bg-drawer-div { width: 40px; height: 1px; background: rgba(201,168,76,.25); margin: 18px 0; opacity: 0; transition: opacity .4s .34s; }
  .bg-drawer.open .bg-drawer-div { opacity: 1; }
  .bg-dcta {
    font-family: 'DM Sans', sans-serif; font-size: .7rem; letter-spacing: .18em;
    text-transform: uppercase; color: #C9A84C; border: 1px solid #C9A84C;
    background: none; padding: 12px 32px; cursor: pointer; margin-top: 8px;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, background .3s, opacity .4s .38s, transform .4s .38s;
  }
  .bg-drawer.open .bg-dcta { opacity: 1; transform: translateY(0); }
  .bg-dcta:hover { background: #C9A84C; color: #05111e; }
  @media (max-width: 900px) {
    .bg-nav-links { display: none; }
    .bg-nav-cta { display: none !important; }
    .bg-nav-hamburger { display: flex; }
  }
`;

// ─── BLOG DATA ────────────────────────────────────────────────
const ARTICLES = [
  {
    id:1, cat:"Free Zone Guide", kicker:"EXCLUSIVE ANALYSIS",
    title:"Why DMCC Remains the UAE's Most Coveted Business Address",
    deck:"Despite the proliferation of cheaper alternatives, Dubai Multi Commodities Centre continues to command a premium — and for institutional founders, the reasons run deeper than prestige.",
    author:"Rashid Al-Mansoori", authorInitial:"R",
    date:"March 8, 2026", readTime:"8 min read",
    featured:true,
    imgLabel:"Dubai Skyline · DMCC Headquarters, Jumeirah Lake Towers",
    body:[
      "The question we hear most often in initial consultations is deceptively simple: 'Should I choose DMCC or something cheaper?' The answer requires understanding what DMCC actually sells — and it is not merely a trade license.",
      "When a multinational bank in Frankfurt reviews a counterparty's corporate documents, or when a compliance officer in Singapore runs a KYC check on a new supplier, the name 'Dubai Multi Commodities Centre' carries institutional weight that AED 6,000 in annual savings cannot offset. This is not sentiment. It is the commercial reality that 22,000+ member companies have built their businesses upon.",
      "DMCC's 2024 report confirmed it as the world's most interconnected free zone for the fifth consecutive year — a designation that reflects not just the volume of registered entities, but the depth of their interconnection through DMCC's commodity trading infrastructure, professional services ecosystem, and direct government relationships.",
      "The practical implications for INCOZONE clients are significant. DMCC-registered entities typically receive faster bank account approvals at both local and international banks, are treated differently in institutional due diligence processes, and benefit from DMCC's active market-making role in commodity trading, fintech, and professional services sectors.",
      "That said, DMCC is not the right answer for every question. A solo digital consultant who needs a UAE base for tax residency purposes — with no institutional counterparties, no physical office requirement, and a tight setup budget — may extract more utility from IFZA at half the cost. The work is knowing which situation is which.",
    ],
    pullQuote:"DMCC sells institutional credibility. That is a different product from a trade license — and it is priced accordingly.",
    subhead:"The Banking Advantage",
    body2:[
      "The most concrete DMCC advantage for most clients materialises at the banking stage. Our 2024 data shows a 23-percentage-point difference in first-attempt bank account approval rates between DMCC and non-DMCC free zone entities at Tier-1 UAE banks.",
      "This reflects the fact that DMCC's KYC infrastructure — its member due diligence, its active monitoring of registered entities, and its direct relationships with UAE financial institutions — effectively pre-certifies its members in a way that other free zones have not replicated.",
      "For clients whose primary business involves receiving payments from European or American counterparties, this approval rate differential has a direct commercial value that often exceeds the cost premium of DMCC registration.",
    ],
  },
  {
    id:2, cat:"Market Intelligence", kicker:"BREAKING",
    title:"UAE Corporate Tax: What Every Free Zone Company Must Know Before 2026",
    deck:"The 9% corporate tax regime has clarified — and for many free zone businesses, the path to Qualifying Free Zone Person status is more navigable than initially feared.",
    author:"Alexandra Voss", authorInitial:"A",
    date:"March 5, 2026", readTime:"6 min read",
    featured:false,
    imgLabel:"Federal Tax Authority · UAE Corporate Tax Framework",
    body:[
      "When the UAE announced a 9% corporate tax in 2022, the response from the business community ranged from measured concern to outright alarm. Two years into the regime's operation, a clearer picture has emerged — one that is considerably more nuanced than the initial headlines suggested.",
      "For free zone entities, the pivotal concept is Qualifying Free Zone Person (QFZP) status. QFZP entities can maintain a 0% rate on Qualifying Income — which, for businesses that genuinely operate within the parameters the legislation anticipates, is most of their revenue.",
      "The critical word is 'genuinely.' The UAE's corporate tax legislation was clearly drafted to distinguish between businesses with substantive UAE operations and entities using free zone registration as a purely technical structure. The former can access QFZP status relatively cleanly. The latter face a more complex path.",
    ],
    pullQuote:"QFZP status is available to businesses with genuine UAE operations. The legislation was designed to reward substance, not structure.",
    subhead:"Qualifying Income Defined",
    body2:[
      "Qualifying Income under the QFZP framework broadly covers income from transactions with other free zone entities, income from qualifying activities as defined by the Cabinet Decision, and certain investment income.",
      "Non-qualifying income — which includes income from UAE mainland customers, real estate transactions, and certain categories of passive income — is taxed at the standard 9% rate. For most free zone businesses, this means a blended effective rate well below 9%, rather than full exposure.",
    ],
  },
  {
    id:3, cat:"Incorporation Guide", kicker:"MUST READ",
    title:"The Mainland vs Free Zone Decision: A Framework for 2026",
    deck:"After the 2021 commercial companies law reforms, the calculus for UAE mainland formation changed fundamentally. Many businesses that once defaulted to free zones should now reconsider.",
    author:"Khalid Ibrahim", authorInitial:"K",
    date:"March 1, 2026", readTime:"5 min read",
    featured:false,
    imgLabel:"Dubai International Financial Centre · Downtown Dubai",
    body:[
      "The 2021 amendment to Federal Law No. 2 of 2015 on Commercial Companies — which allowed 100% foreign ownership of mainland entities in most sectors — removed the most significant structural objection to mainland formation. Yet the reflex toward free zones remains strong, often for reasons that no longer apply.",
      "The practical question for any UAE market-entry decision in 2026 is not 'free zone or mainland?' but rather 'who are my customers, and where are they?' A business whose primary revenue comes from UAE mainland entities — government contracts, corporate clients, retail consumers — needs mainland access. A free zone license does not provide it without additional licensing or agent arrangements.",
    ],
    pullQuote:"The question is not 'free zone or mainland?' It is: 'Who are my customers, and where are they?'",
    subhead:"The Sector Exception List",
    body2:[
      "It is worth noting that 100% foreign ownership on the mainland is not universal. The Positive List — sectors reserved for UAE national ownership participation — still covers certain strategic industries including oil and gas, military, banking, and specific segments of the healthcare and education sectors.",
      "For the vast majority of INCOZONE clients — trading, consulting, technology, services, financial advisory — 100% foreign ownership on mainland is both legally available and operationally straightforward.",
    ],
  },
  {
    id:4, cat:"Banking & Finance", kicker:"INSIGHT",
    title:"UAE Business Banking in 2026: What Has Changed and What Hasn't",
    deck:"Opening a UAE business bank account remains the most friction-heavy part of the formation process — but the landscape has shifted significantly since 2022.",
    author:"Sarah Chen", authorInitial:"S",
    date:"February 26, 2026", readTime:"7 min read",
    imgLabel:"Dubai International Financial Centre · Banking District",
    featured:false,
    body:[
      "UAE bank account opening has a reputation — mostly justified — for being slow, document-intensive, and opaque. What is less understood is that the difficulty is highly variable depending on three factors: the bank selected, the applicant's profile, and the quality of the documentation presented.",
      "Our 2025 data across 340 account applications shows a first-attempt approval rate of 94.7% — significantly above the industry average. The difference is almost entirely explained by document preparation and bank selection. Wrong bank, wrong order, wrong documents, and a straightforward application becomes a six-month ordeal.",
    ],
    pullQuote:"The right bank for your profile matters more than the quality of your documents. Choosing incorrectly costs months.",
    subhead:"The Tier-1 vs Tier-2 Decision",
    body2:[
      "Tier-1 banks — Emirates NBD, FAB, ADCB, DIB — offer the most credible UAE banking relationships and are required by many institutional counterparties. They also have the most stringent onboarding requirements. For businesses with complex ownership structures, multiple shareholders from high-risk jurisdictions, or business models that are difficult to explain simply, Tier-2 banks often provide faster timelines and more pragmatic compliance teams.",
      "The strategic approach for most INCOZONE clients is to pursue the highest-tier bank their profile can support, while having a Tier-2 backup ready in parallel. Both applications can typically be run simultaneously without conflict.",
    ],
  },
  {
    id:5, cat:"Visa & Residency", kicker:"GUIDE",
    title:"UAE Golden Visa for Investors: The 2026 Eligibility Landscape",
    deck:"The Golden Visa programme has expanded its qualifying criteria significantly since its 2019 launch — including new pathways for business owners and investors that many eligible individuals are unaware of.",
    author:"Rashid Al-Mansoori", authorInitial:"R",
    date:"February 20, 2026", readTime:"5 min read",
    imgLabel:"UAE Residency · Long-Term Visa Framework",
    featured:false,
    body:[
      "The UAE Golden Visa — a 10-year renewable residency permit — was initially understood as a privilege of real estate investors and senior employees. The 2022 amendments fundamentally changed that understanding, creating practical pathways for business owners, investors, and specialists that did not previously exist.",
      "For business owners, the primary Golden Visa pathway requires: a business valued at AED 2 million or more (verified by an accredited auditor), ownership of at least two years' standing, and compliance with UAE corporate tax and VAT obligations. The value threshold can be met through accumulated assets, not just initial capitalisation.",
    ],
    pullQuote:"Most qualifying UAE business owners do not know they are eligible. The AED 2 million business value threshold is easier to meet than it sounds.",
    subhead:"The Investor Pathway",
    body2:[
      "For pure investors — those who hold UAE assets without operating a business — the primary pathway is investment of AED 2 million or more in UAE public equities, approved investment funds, or direct real estate (with a registered mortgage-free certificate).",
      "Importantly, the Golden Visa is not automatically granted. Applications require correct documentation, accurate business valuation, and in most cases, the involvement of an accredited UAE entity to submit on behalf of the applicant. INCOZONE manages Golden Visa applications as part of its investor visa service suite.",
    ],
  },
  {
    id:6, cat:"Free Zone Guide", kicker:"ANALYSIS",
    title:"ADGM vs DIFC: Choosing Abu Dhabi's Financial Centre Over Dubai's",
    deck:"The comparison between the UAE's two international financial centres has become more genuinely contested — and for certain business types, ADGM now presents a compelling case.",
    author:"Alexandra Voss", authorInitial:"A",
    date:"February 14, 2026", readTime:"6 min read",
    imgLabel:"Al Maryah Island · ADGM · Abu Dhabi",
    featured:false,
    body:[
      "DIFC has long held the position of default destination for financial services businesses entering the UAE. Its critical mass of institutional tenants, its established legal ecosystem, and its proximity to Dubai's commercial centre have made the case almost self-evident.",
      "ADGM's case, however, has strengthened materially over the past three years. Abu Dhabi's sovereign wealth positioning, ADGM's progressive digital assets framework, and the development of Al Maryah Island as a genuine financial district have created a credible alternative — particularly for fund management, family office, and digital assets businesses.",
    ],
    pullQuote:"ADGM's digital assets framework is the most advanced in the region. For crypto-native businesses, the choice between ADGM and DIFC has effectively reversed.",
    subhead:"Regulatory Framework Comparison",
    body2:[
      "Both ADGM and DIFC operate under English Common Law — a critical distinction from the broader UAE civil law system. Both have independent courts and arbitration centres of genuine international standing.",
      "Where they diverge is in regulatory culture. DIFC's DFSA has a longer operating history and a larger body of published guidance. ADGM's FSRA has demonstrated a willingness to engage more pragmatically with novel business models — particularly in digital assets, tokenisation, and alternative fund structures. For businesses operating at the frontier of financial regulation, this matters.",
    ],
  },
  {
    id:7, cat:"PRO Services", kicker:"EXPLAINER",
    title:"UBO Registration in the UAE: What Every Company Director Must Do Before Penalties Apply",
    deck:"Federal Decree Law No. 13 of 2023 on Beneficial Ownership created new mandatory obligations for all UAE companies — many of which remain unfulfilled 18 months after the regulation came into force.",
    author:"Khalid Ibrahim", authorInitial:"K",
    date:"February 8, 2026", readTime:"4 min read",
    imgLabel:"UAE Federal Government · Regulatory Compliance",
    featured:false,
    body:[
      "The UAE's Ultimate Beneficial Owner (UBO) registration requirement is not new. The obligation to register natural persons controlling 25% or more of a UAE company has existed in various forms since 2020. What changed in 2023 is both the scope and the enforcement framework.",
      "Federal Decree Law No. 13 of 2023 extended UBO obligations to a broader category of entities, tightened the definition of 'effective control,' and — critically — activated a penalty mechanism that was largely dormant under the previous regime. Fines for non-compliance now reach AED 100,000 for initial violations, with escalating penalties for continued non-compliance.",
    ],
    pullQuote:"UBO registration is not a one-time event. It is an ongoing obligation that must be updated within 15 days of any ownership change.",
    subhead:"What Must Be Filed",
    body2:[
      "Every UAE company — free zone and mainland — must file a UBO Register identifying all natural persons who own or control 25% or more of the entity, whether directly or through a chain of entities. Where no individual meets the 25% threshold, the senior managing official must be registered.",
      "The Register must be updated within 15 days of any change in beneficial ownership. Importantly, the information must be filed with the relevant licensing authority — not merely maintained internally. INCOZONE conducts UBO compliance reviews as part of all annual license renewal engagements.",
    ],
  },
  {
    id:8, cat:"Market Intelligence", kicker:"DATA",
    title:"UAE Business Formation Statistics 2025: The Numbers Behind the Boom",
    deck:"Official data from DED, DMCC, and IFZA reveals the sectors, nationalities, and business types driving UAE's record incorporation volumes — and what they signal for 2026.",
    author:"Sarah Chen", authorInitial:"S",
    date:"February 1, 2026", readTime:"5 min read",
    imgLabel:"UAE Business Statistics · Annual Report 2025",
    featured:false,
    body:[
      "UAE business formation hit a new record in 2025, with combined free zone and mainland new entity registrations exceeding 180,000 for the first time. The headline figure, however, conceals a distribution story that is more instructive than the aggregate.",
      "The top-5 source nationalities by new formation volume in 2025 were India, United Kingdom, Russia, Pakistan, and Germany — a list that reflects both the UAE's traditional diaspora base and its emergence as a destination of choice for European entrepreneurs seeking non-EU corporate bases post-Brexit.",
    ],
    pullQuote:"The influx of European founders since 2022 has changed the profile of UAE free zone clients more than any other single factor in the past decade.",
    subhead:"Sector Distribution",
    body2:[
      "Consulting and professional services continued to dominate formation volume, accounting for 34% of all new entities. Technology (including fintech) grew to 21% — up from 15% in 2023. Trading and import/export, while still significant in absolute terms, declined as a percentage of total formations for the third consecutive year.",
      "The shift toward professional services and technology reflects a structural change in the UAE's position in the global economy — from a trade hub serving regional markets to a professional and financial services hub serving global clients.",
    ],
  },
];

const TICKER_ITEMS = [
  "UAE Corporate Tax Q1 2026 filing deadline: March 31",
  "DMCC adds 18 new permitted activities for crypto businesses",
  "ADGM reports record 1,847 new entity registrations in 2025",
  "Emirates NBD launches dedicated SME banking hub in Business Bay",
  "UAE extends Grace Period for UBO registration compliance to June 2026",
  "New RAKEZ industrial zone expansion adds 2.4 million sq ft of warehouse space",
  "IFZA processing times reduced to 3 business days following portal upgrade",
  "Golden Visa applications from European founders up 340% year-on-year",
];

const CATS = ["All", "Free Zone Guide", "Market Intelligence", "Incorporation Guide", "Banking & Finance", "Visa & Residency", "PRO Services"];

// ─── PAGE-FLIP SOUND (synthesized via Web Audio API) ──────────
function playPageFlip() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.16), ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const t = i / data.length;
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 2.8) * 0.15;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const bpf = ctx.createBiquadFilter();
    bpf.type = "bandpass"; bpf.frequency.value = 3600; bpf.Q.value = 0.35;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.8, 0); gain.gain.exponentialRampToValueAtTime(0.001, 0.18);
    src.connect(bpf); bpf.connect(gain); gain.connect(ctx.destination);
    src.start();
    setTimeout(() => ctx.close(), 500);
  } catch(_) {}
}

const UAE_STATS = [
  { val:"180,000+", lbl:"New companies registered in UAE — 2025" },
  { val:"AED 0",    lbl:"Personal income tax in UAE" },
  { val:"3 days",   lbl:"Fastest free zone setup (AFZ)" },
  { val:"68+",      lbl:"Nationalities served by INCOZONE" },
  { val:"100%",     lbl:"Foreign ownership allowed in most sectors" },
  { val:"3,200+",   lbl:"Companies incorporated by INCOZONE" },
  { val:"4.9 ★",    lbl:"INCOZONE average client rating" },
  { val:"96%",      lbl:"INCOZONE client retention rate" },
];

// ─── REVEAL HOOK ──────────────────────────────────────────────
// CSS animation handles the reveal; this hook is a no-op backup.
function useReveal() {
  useEffect(() => {}, []);
}

// ─── ARTICLE OVERLAY ──────────────────────────────────────────
function ArticleOverlay({ article, onClose }) {
  const [exiting, setExiting] = useState(false);

  const handleClose = useCallback(() => {
    setExiting(true);
    setTimeout(onClose, 420);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [handleClose]);

  return (
    <div className={`bg-overlay ${exiting ? "bg-article-exit" : "bg-article-enter"}`}>
      <button className="bg-overlay-close" onClick={handleClose} aria-label="Close"></button>
      <div className="bg-overlay-inner">
        {/* Masthead strip inside article */}
        <div style={{textAlign:"center",borderBottom:"3px double #0d0b08",paddingBottom:"14px",marginBottom:"28px"}}>
          <span style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"1.8rem",color:"var(--ink)"}}>The UAE Business Gazette</span>
        </div>

        <span className="bg-art-kicker ink-stamp">{article.kicker} · {article.cat}</span>
        <h1 className="bg-art-h1 ink-stamp" style={{animationDelay:".05s"}}>{article.title}</h1>
        <p className="bg-art-deck ink-stamp" style={{animationDelay:".1s"}}>{article.deck}</p>
        <div className="bg-art-byline-row">
          <div className="bg-art-byline">By <strong>{article.author}</strong> · INCOZONE Advisory</div>
          <div className="bg-art-date">{article.date} · {article.readTime}</div>
        </div>

        <div className="bg-art-img ink-press">
          {article.imageUrl
            ? <img src={article.imageUrl} alt={article.imgLabel || article.title} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}} />
            : <div style={{position:"absolute",inset:0,background:"repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(13,11,8,.05) 28px,rgba(13,11,8,.05) 29px)"}}/>
          }
          {!article.imageUrl && <span className="bg-art-img-label" style={{position:"relative",zIndex:1,fontFamily:"var(--fb)",fontSize:".7rem",fontStyle:"italic",color:"var(--ink4)",textAlign:"center",padding:"0 40px"}}>{article.imgLabel}</span>}
        </div>
        <p className="bg-art-caption">{article.imageUrl ? (article.imgLabel || "") : "Illustration: INCOZONE Research Division"}</p>

        <div className="bg-art-body">
          {article.body.map((p, i) => <p key={i}>{p}</p>)}
          <blockquote className="bg-art-pull">"{article.pullQuote}"</blockquote>
          {article.subhead && <h3 className="bg-art-subhead">{article.subhead}</h3>}
          {article.body2?.map((p, i) => <p key={i}>{p}</p>)}
        </div>

        {/* Footer inside article */}
        <div style={{marginTop:"48px",paddingTop:"20px",borderTop:"2px solid var(--ink)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"16px"}}>
          <div style={{fontFamily:"var(--fs)",fontSize:".65rem",color:"var(--ink4)",letterSpacing:".1em"}}>
            © 2026 INCOZONE · The UAE Business Gazette · All Rights Reserved
          </div>
          <button onClick={handleClose} style={{fontFamily:"var(--fs)",fontSize:".65rem",letterSpacing:".16em",textTransform:"uppercase",background:"none",border:"1px solid var(--rule)",padding:"8px 20px",cursor:"pointer",color:"var(--ink3)",transition:"all .3s"}}>
            ← Back to Gazette
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ──────────────────────────────────────────────────────
export default function BlogPage({ onBack, onNavigate }) {
  const [_bgOpen, setbgOpen] = useState(false);
  const { blogPosts } = useContent();

  const [scrolled, setScrolled]       = useState(false);
  const [activeCat, setActiveCat]     = useState("All");
  const [activeArt, setActiveArt]     = useState(null);
  const [folded, setFolded]           = useState(false);
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [featSlide, setFeatSlide]     = useState("visible"); // visible | exiting | entering
  const [statIdx, setStatIdx]         = useState(0);
  const [statFade, setStatFade]       = useState(true);
  useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => playPageFlip(), 50);
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Reset carousel when category changes
  useEffect(() => { setFeaturedIdx(0); setFeatSlide("visible"); }, [activeCat]);

  // Auto-rotate featured article every 4 s
  useEffect(() => {
    const t = setInterval(() => {
      setFeatSlide("exiting");
      setTimeout(() => {
        setFeaturedIdx(i => (i + 1) % Math.min(5, allArticles.length || 1));
        setFeatSlide("entering");
        setTimeout(() => setFeatSlide("visible"), 60);
      }, 320);
    }, 4000);
    return () => clearInterval(t);
  }, [blogPosts.length]);

  // Auto-rotate UAE stat every 3 s
  useEffect(() => {
    const t = setInterval(() => {
      setStatFade(false);
      setTimeout(() => { setStatIdx(i => (i + 1) % UAE_STATS.length); setStatFade(true); }, 300);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  // Map admin blog posts to article format, fall back to hardcoded ARTICLES
  const mapPost = (p) => ({
    id:           p.id,
    cat:          p.cat || "General",
    kicker:       p.kicker || "FEATURED",
    title:        p.title || "",
    deck:         p.excerpt || p.deck || "",
    author:       p.author || "INCOZONE",
    authorInitial:(p.author || "I")[0].toUpperCase(),
    date:         p.date || "",
    readTime:     p.readTime || "5 min read",
    featured:     !!p.featured,
    imgLabel:     p.imgLabel || "",
    imageUrl:     p.imageUrl || "",
    body:         p.body ? (Array.isArray(p.body) ? p.body : [p.body]) : [p.excerpt || p.deck || ""],
    pullQuote:    p.pullQuote || "",
    subhead:      p.subhead || "",
    body2:        p.body2 || [],
  });
  const allArticles = blogPosts.length > 0 ? blogPosts.map(mapPost) : ARTICLES;

  const filtered = activeCat === "All"
    ? allArticles
    : allArticles.filter(a => a.cat === activeCat);

  const carouselMax = Math.min(5, filtered.length);
  const featured   = filtered[featuredIdx % Math.max(1, carouselMax)] || filtered[0];
  const sideLeft   = filtered.slice(1, 3);
  const sideRight  = filtered.slice(3, 5);
  const belowFold  = filtered.slice(1, 5);
  const secondEd   = filtered.slice(4, 8);
  const opinion    = filtered[5] || filtered[0];
  const digest     = filtered.slice(5, 9).length >= 3 ? filtered.slice(5, 9) : filtered.slice(0, 4);
  const specialArt = filtered[7] || filtered[6] || filtered[0];

  const openArticle = (art) => { playPageFlip(); setActiveArt(art); };

  const today = new Date().toLocaleDateString("en-GB", { weekday:"long", day:"numeric", month:"long", year:"numeric" });

  return (
    <div className="bg-root">
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className={`bg-nav${scrolled ? " scrolled" : ""}`}>
        <div className="bg-nav-logo" onClick={()=>{if(onNavigate){onNavigate("home");window.scrollTo(0,0);}}}>INCO<em>ZONE</em></div>
        <ul className="bg-nav-links">{["Services","Free Zones","About","Blog","Contact"].map(l=>{const m={"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};return <li key={l}><a href="#" onClick={e=>{e.preventDefault();if(onNavigate){onNavigate(m[l]);window.scrollTo(0,0);}}}>{l}</a></li>;})}</ul>
        <div style={{display:"flex",alignItems:"center",gap:"16px"}}>
          <button className="bg-back-btn" onClick={onBack}>Back to Home</button>
          <button className="bg-nav-cta">Consult Now</button>
        </div>
      
        {/* Hamburger */}
        <button
          className={`bg-nav-hamburger${_bgOpen ? " open" : ""}`}
          onClick={() => setbgOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`bg-drawer${_bgOpen ? " open" : ""}`}>
        <div className="bg-drawer-brand"
          onClick={() => { setbgOpen(false); if(onNavigate) { onNavigate("home"); window.scrollTo(0,0); } }}>
          INCO<em>ZONE</em>
        </div>
        {["Services","Free Zones","About","Blog","Contact"].map((l) => {
          const pm = {"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};
          return (
            <button key={l} className="bg-dlink"
              onClick={() => { setbgOpen(false); if(onNavigate) { onNavigate(pm[l]); window.scrollTo(0,0); } }}>
              {l}
            </button>
          );
        })}
        <div className="bg-drawer-div" />
        <button className="bg-dcta"
          onClick={() => { setbgOpen(false); if(onNavigate) { onNavigate("schedule"); window.scrollTo(0,0); } }}>
          Schedule Consultation
        </button>
      </div>

      {/* ── MAIN CONTENT — paper fold in ── */}
      <div className={folded ? "" : "bg-paper-fold"} style={{paddingTop:"58px"}}>

        {/* ══ MASTHEAD ══════════════════════════════════════════ */}
        <div className="bg-masthead">
          <div className="bg-masthead-top">
            <span className="bg-masthead-meta"><strong>Dubai, United Arab Emirates</strong> · Est. 2012 · Incorporated Advisory</span>
            <span className="bg-masthead-meta" style={{textAlign:"center",fontStyle:"italic"}}>
              "Structure is a permanent decision. The right advisor makes it once."
            </span>
            <span className="bg-masthead-meta">Vol. XIV · No. 8 · <strong>{today}</strong></span>
          </div>

          {/* Nameplate */}
          <div className="bg-nameplate">
            <div className="bg-nameplate-rule">
              <div className="bg-nameplate-rule-thick" />
              <div className="bg-nameplate-rule-gap" />
              <div className="bg-nameplate-rule-thick" />
            </div>
            <span className="bg-nameplate-title ink-stamp" style={{animationDelay:".1s"}}>
              THE UAE BUSINESS GAZETTE
            </span>
            <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(3.2rem,7.5vw,7rem)",color:"var(--ink)",lineHeight:1,display:"block",margin:"4px 0 8px"}}>
              INCOZONE
            </div>
            <span className="bg-nameplate-sub ink-stamp" style={{animationDelay:".2s"}}>
              Authoritative Intelligence on UAE Business Formation, Corporate Law & Market Entry
            </span>
            <div className="bg-nameplate-rule" style={{marginTop:"10px"}}>
              <div className="bg-nameplate-rule-thick" />
              <div className="bg-nameplate-rule-gap" />
              <div className="bg-nameplate-rule-thin" />
            </div>
          </div>

          {/* Category bar */}
          <div className="bg-catbar">
            {CATS.map(cat => (
              <button key={cat} className={`bg-cat-btn${activeCat===cat?" active":""}`} onClick={() => setActiveCat(cat)}>{cat}</button>
            ))}
          </div>
        </div>

        {/* ── BREAKING NEWS TICKER ── */}
        <div className="bg-ticker">
          <span className="bg-ticker-label">BREAKING</span>
          <div className="bg-ticker-track">
            {[...TICKER_ITEMS,...TICKER_ITEMS].map((item,i) => (
              <span className="bg-ticker-item" key={i}>
                {item}<span className="bg-ticker-sep">◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* ══ BROADSHEET — THREE COLUMNS ════════════════════════ */}
        <div className="bg-broadsheet">

          {/* LEFT COLUMN */}
          <div className="bg-col-left">
            <div className="bg-datebox bg-reveal">
              <span className="bg-datebox-date">{new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short"})}</span>
              <span className="bg-datebox-label">Today's Edition</span>
              <div className="bg-datebox-info">
                Dubai: 31°C Sunny<br/>
                AED/USD: 3.6725<br/>
                Brent: $76.40/bbl<br/>
                FTSE: 8,247.35
              </div>
            </div>

            <div className="bg-section-label bg-reveal">
              Latest Briefings
              <span className="bg-section-label-tag">UAE</span>
            </div>

            {sideLeft.map((art, i) => (
              <div className={`bg-side-story bg-reveal bg-d${i+1}`} key={art.id} onClick={() => openArticle(art)}>
                {art.imageUrl && <img src={art.imageUrl} alt={art.title} style={{width:"100%",aspectRatio:"16/7",objectFit:"cover",display:"block",marginBottom:"10px"}} />}
                <span className="bg-side-story-cat">{art.cat}</span>
                <div className="bg-side-story-title">{art.title}</div>
                <p className="bg-side-story-deck">{(art.deck||"").substring(0,110)}…</p>
                <span className="bg-side-story-meta">{art.author} · {art.date}</span>
              </div>
            ))}

            {/* Market Watch */}
            <div className="bg-market-watch bg-reveal bg-d3">
              <div className="bg-market-title">Market Watch</div>
              {[
                { label:"AED / USD",    val:"3.6725", chg:"+0.01%", up:true },
                { label:"Brent Crude",  val:"$76.40", chg:"-0.8%",  up:false },
                { label:"Gold",         val:"$2,341", chg:"+0.4%",  up:true },
                { label:"UAE Corp Tax", val:"9%",     chg:"QFZP: 0%", up:true },
              ].map(r => (
                <div className="bg-market-row" key={r.label}>
                  <span className="bg-market-label">{r.label}</span>
                  <span className="bg-market-val">{r.val}</span>
                  <span className={`bg-market-chg ${r.up ? "up":"dn"}`}>{r.chg}</span>
                </div>
              ))}
            </div>

            {/* Rotating UAE stat */}
            <div className="bg-stat-rotator" style={{opacity: statFade ? 1 : 0, transition:"opacity .3s ease"}}>
              <span className="bg-stat-num">{UAE_STATS[statIdx].val}</span>
              <span className="bg-stat-lbl">{UAE_STATS[statIdx].lbl}</span>
            </div>

            {/* Editorial note */}
            <div className="bg-editorial-note bg-reveal">
              <div className="bg-editorial-ornament">❧</div>
              <p className="bg-editorial-text">"The right UAE structure is decided once. Every subsequent cost, every banking approval, every government interaction flows from that first decision."</p>
              <span className="bg-editorial-cite">— INCOZONE Advisory, est. 2012</span>
            </div>

            {/* More articles — fill left column */}
            {allArticles.slice(6).map((art, i) => (
              <div key={`lx-${art.id}`} onClick={() => openArticle(art)}
                style={{borderTop:"1px solid var(--rule)",paddingTop:"14px",marginTop:"14px",cursor:"pointer"}}>
                <span style={{fontFamily:"var(--fs)",fontSize:".54rem",letterSpacing:".16em",textTransform:"uppercase",color:"var(--red)",display:"block",marginBottom:"5px"}}>{art.cat}</span>
                <div style={{fontFamily:"var(--fd)",fontSize:".92rem",fontWeight:700,lineHeight:1.25,color:"var(--ink)",marginBottom:"6px"}}>{art.title}</div>
                <p style={{fontFamily:"var(--fb)",fontSize:".74rem",color:"var(--ink3)",lineHeight:1.5,margin:"0 0 6px"}}>{(art.deck||"").substring(0,90)}…</p>
                <span style={{fontFamily:"var(--fs)",fontSize:".58rem",color:"var(--ink4)",letterSpacing:".08em"}}>{art.author} · {art.date}</span>
              </div>
            ))}
          </div>

          {/* COLUMN RULE */}
          <div className="bg-col-rule" />

          {/* CENTER COLUMN — AUTO-ROTATING FEATURED */}
          {featured && (
            <div className="bg-col-center">
              <div className="bg-section-label bg-reveal" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <span>Today's Lead <span className="bg-section-label-tag">FEATURED</span></span>
                <span style={{fontFamily:"var(--fs)",fontSize:".54rem",color:"var(--ink4)",letterSpacing:".1em"}}>
                  {featuredIdx + 1} / {carouselMax}
                </span>
              </div>

              <div className="bg-featured-wrap">
                <div className={`bg-featured-slide ${featSlide}`}>
                  <div className="bg-headline-story" onClick={() => openArticle(featured)}>
                    <span className="bg-headline-kicker">{featured.kicker} · {featured.cat}</span>
                    <h2 className="bg-headline-h1">{featured.title}</h2>
                    <div className="bg-headline-img">
                      {featured.imageUrl
                        ? <img src={featured.imageUrl} alt={featured.imgLabel || featured.title} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",zIndex:1}} />
                        : <span className="bg-headline-img-label">{featured.imgLabel}</span>
                      }
                    </div>
                    <p className="bg-headline-deck">{featured.deck}</p>
                    <div className="bg-headline-byline">By {featured.author} · {featured.date} · {featured.readTime}</div>
                  </div>

                  <div className="bg-body-cols" style={{marginTop:"20px"}}>
                    <p>{featured.body[0]}</p>
                    <p>{featured.body[1]}</p>
                  </div>

                  {featured.pullQuote && (
                    <div className="bg-pull-quote">
                      "{featured.pullQuote}"
                      <cite>— {featured.author}, INCOZONE</cite>
                    </div>
                  )}

                  <div className="bg-body-cols" style={{marginTop:"0"}}>
                    <p>{featured.body[2]}</p>
                  </div>

                  <div style={{marginTop:"18px",paddingTop:"14px",borderTop:"1px solid var(--rule)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <button onClick={() => openArticle(featured)}
                      style={{fontFamily:"var(--fs)",fontSize:".65rem",letterSpacing:".18em",textTransform:"uppercase",background:"none",border:"none",cursor:"pointer",color:"var(--red)",padding:0}}>
                      Continue Reading →
                    </button>
                  </div>
                </div>
              </div>

              {/* Carousel progress dots */}
              {carouselMax > 1 && (
                <div className="bg-progress-dots">
                  {Array.from({length: carouselMax}).map((_, i) => (
                    <button key={i} className={`bg-dot${i === featuredIdx ? " active" : ""}`}
                      onClick={() => { setFeatSlide("exiting"); setTimeout(() => { setFeaturedIdx(i); setFeatSlide("entering"); setTimeout(() => setFeatSlide("visible"), 60); }, 320); }}
                    />
                  ))}
                </div>
              )}

              {/* Also In This Edition — fill center column */}
              {allArticles.slice(2, 5).length > 0 && (
                <div style={{marginTop:"24px",borderTop:"2px solid var(--ink)"}}>
                  <div className="bg-section-label bg-reveal" style={{marginBottom:"14px"}}>
                    Also In This Edition
                    <span className="bg-section-label-tag">MORE</span>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
                    {allArticles.slice(2, 5).map((art, i) => (
                      <div key={`cx-${art.id}`} onClick={() => openArticle(art)}
                        style={{borderTop:"1px solid var(--rule)",paddingTop:"13px",marginBottom:"16px",cursor:"pointer",gridColumn: i === 2 ? "1 / -1" : "auto"}}>
                        <span style={{fontFamily:"var(--fs)",fontSize:".52rem",letterSpacing:".16em",textTransform:"uppercase",color:"var(--red)",display:"block",marginBottom:"5px"}}>{art.cat}</span>
                        <div style={{fontFamily:"var(--fd)",fontSize:i === 2 ? ".82rem" : ".9rem",fontWeight:700,lineHeight:1.25,color:"var(--ink)",marginBottom:"6px"}}>{art.title}</div>
                        <p style={{fontFamily:"var(--fb)",fontSize:".72rem",color:"var(--ink3)",lineHeight:1.5,margin:"0 0 6px"}}>{(art.deck||"").substring(0, i === 2 ? 120 : 90)}…</p>
                        <span style={{fontFamily:"var(--fs)",fontSize:".57rem",color:"var(--ink4)",letterSpacing:".08em"}}>{art.author} · {art.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Opinion / Analysis spotlight */}
              {allArticles.slice(5, 6).map(art => (
                <div key={`co-${art.id}`} onClick={() => openArticle(art)}
                  style={{marginTop:"4px",background:"var(--ink)",color:"var(--paper)",padding:"18px 16px",cursor:"pointer"}}>
                  <div style={{fontFamily:"var(--fs)",fontSize:".5rem",letterSpacing:".22em",textTransform:"uppercase",opacity:.5,marginBottom:"8px"}}>Analysis</div>
                  <div style={{fontFamily:"var(--fd)",fontSize:"1rem",fontWeight:700,lineHeight:1.3,marginBottom:"8px"}}>{art.title}</div>
                  <p style={{fontFamily:"var(--fb)",fontSize:".72rem",color:"rgba(245,240,232,.75)",lineHeight:1.55,margin:"0 0 10px",fontStyle:"italic"}}>{(art.deck||"").substring(0,110)}…</p>
                  <span style={{fontFamily:"var(--fs)",fontSize:".56rem",letterSpacing:".1em",color:"var(--gold)"}}>Read Analysis →</span>
                </div>
              ))}
            </div>
          )}

          {/* COLUMN RULE */}
          <div className="bg-col-rule" />

          {/* RIGHT COLUMN */}
          <div className="bg-col-right">
            <div className="bg-section-label bg-reveal">
              In Focus
              <span className="bg-section-label-tag">ANALYSIS</span>
            </div>

            {sideRight.map((art, i) => (
              <div className={`bg-side-story bg-reveal bg-d${i+1}`} key={art.id} onClick={() => openArticle(art)}>
                {art.imageUrl && <img src={art.imageUrl} alt={art.title} style={{width:"100%",aspectRatio:"16/7",objectFit:"cover",display:"block",marginBottom:"10px"}} />}
                <span className="bg-side-story-cat">{art.cat}</span>
                <div className="bg-side-story-title">{art.title}</div>
                <p className="bg-side-story-deck">{(art.deck||"").substring(0,110)}…</p>
                <span className="bg-side-story-meta">{art.author} · {art.date}</span>
              </div>
            ))}

            {/* Trending Topics tag cloud */}
            <div className="bg-tag-cloud bg-reveal bg-d3">
              <div className="bg-tag-cloud-title">Trending Topics</div>
              <div className="bg-tags">
                {CATS.filter(c => c !== "All").map(cat => {
                  const count = allArticles.filter(a => a.cat === cat).length;
                  if (!count) return null;
                  return (
                    <button key={cat} className={`bg-tag${activeCat === cat ? " active" : ""}`}
                      onClick={() => setActiveCat(activeCat === cat ? "All" : cat)}>
                      {cat}<span className="bg-tag-count">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Private Advisory CTA */}
            <div className="bg-reveal bg-d4" style={{marginTop:"20px",background:"var(--ink)",color:"var(--paper)",padding:"22px 18px",textAlign:"center"}}>
              <div style={{fontFamily:"var(--fs)",fontSize:".52rem",letterSpacing:".22em",textTransform:"uppercase",opacity:.5,marginBottom:"10px"}}>Private Advisory</div>
              <div style={{fontFamily:"var(--ff)",fontSize:"1.35rem",marginBottom:"8px",lineHeight:1.2}}>Free Consultation</div>
              <p style={{fontFamily:"var(--fb)",fontSize:".72rem",color:"rgba(245,240,232,.7)",lineHeight:1.6,marginBottom:"14px",fontStyle:"italic"}}>
                30 minutes with a senior INCOZONE advisor. Structured, no obligation.
              </p>
              <button onClick={() => onNavigate && onNavigate("schedule")}
                style={{fontFamily:"var(--fs)",fontSize:".6rem",letterSpacing:".18em",textTransform:"uppercase",background:"var(--gold)",color:"var(--ink)",border:"none",padding:"9px 20px",cursor:"pointer",fontWeight:700,width:"100%"}}>
                Book Now →
              </button>
            </div>

            {/* Editor's note */}
            <div className="bg-reveal" style={{marginTop:"20px",padding:"14px 0",borderTop:"1px solid var(--rule)"}}>
              <div style={{fontFamily:"var(--fs)",fontSize:".54rem",letterSpacing:".2em",textTransform:"uppercase",color:"var(--ink4)",marginBottom:"8px"}}>Editor's Note</div>
              <p style={{fontFamily:"var(--fd)",fontSize:".88rem",fontStyle:"italic",color:"var(--ink3)",lineHeight:1.6}}>
                All editorial content is verified against UAE authority publications and updated quarterly. Formation costs and timelines reflect 2026 government fee schedules.
              </p>
            </div>

            {/* More articles — fill right column */}
            <div style={{marginTop:"20px",borderTop:"2px solid var(--ink)"}}>
              <div className="bg-section-label" style={{marginBottom:"12px"}}>
                Further Reading
                <span className="bg-section-label-tag">MORE</span>
              </div>
              {allArticles.slice(5).map((art, i) => (
                <div key={`rx-${art.id}`} onClick={() => openArticle(art)}
                  style={{borderTop:"1px solid var(--rule)",paddingTop:"14px",marginTop:"14px",cursor:"pointer"}}>
                  <span style={{fontFamily:"var(--fs)",fontSize:".54rem",letterSpacing:".16em",textTransform:"uppercase",color:"var(--red)",display:"block",marginBottom:"5px"}}>{art.cat}</span>
                  <div style={{fontFamily:"var(--fd)",fontSize:".92rem",fontWeight:700,lineHeight:1.25,color:"var(--ink)",marginBottom:"6px"}}>{art.title}</div>
                  <p style={{fontFamily:"var(--fb)",fontSize:".74rem",color:"var(--ink3)",lineHeight:1.5,margin:"0 0 6px"}}>{(art.deck||"").substring(0,90)}…</p>
                  <span style={{fontFamily:"var(--fs)",fontSize:".58rem",color:"var(--ink4)",letterSpacing:".08em"}}>{art.author} · {art.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ BELOW THE FOLD ════════════════════════════════════ */}
        <div style={{padding:"8px 60px 0",borderBottom:"2px solid var(--ink)"}}>
          <div className="bg-section-label bg-reveal" style={{marginBottom:"16px"}}>
            More From The Gazette
            <span className="bg-section-label-tag">ALL SECTIONS</span>
          </div>
        </div>
        <div className="bg-below-fold">
          {belowFold.map((art, i) => (
            <div className={`bg-bf-card bg-reveal bg-d${i+1}`} key={art.id} onClick={() => openArticle(art)}>
              <div className="bg-bf-img">
                {art.imageUrl && <img src={art.imageUrl} alt={art.title} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",zIndex:1}} />}
              </div>
              <span className="bg-bf-tag">{art.cat}</span>
              <div className="bg-bf-title">{art.title}</div>
              <p className="bg-bf-deck">{(art.deck||"").substring(0,90)}…</p>
              <span className="bg-bf-meta">{art.author} · {art.date}</span>
            </div>
          ))}
        </div>

        {/* ══ SECOND EDITION ════════════════════════════════════ */}
        {secondEd.length > 0 && (
          <>
            <div style={{padding:"8px 60px 0",borderBottom:"2px solid var(--ink)"}}>
              <div className="bg-section-label bg-reveal" style={{marginBottom:"0"}}>
                Second Edition
                <span className="bg-section-label-tag">CONTINUED COVERAGE</span>
              </div>
            </div>
            <div className="bg-second-ed">
              {secondEd.map((art, i) => (
                <div className={`bg-se-card bg-reveal bg-d${i+1}`} key={art.id} onClick={() => openArticle(art)}>
                  {art.imageUrl && (
                    <div style={{width:"100%",height:"110px",overflow:"hidden",marginBottom:"10px",position:"relative"}}>
                      <img src={art.imageUrl} alt={art.title}
                        style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}} />
                    </div>
                  )}
                  <span style={{fontFamily:"var(--fs)",fontSize:".54rem",letterSpacing:".18em",textTransform:"uppercase",color:"var(--red)",display:"block",marginBottom:"6px"}}>{art.cat}</span>
                  <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"1.05rem",fontWeight:700,lineHeight:1.25,color:"var(--ink)",marginBottom:"8px"}}>{art.title}</div>
                  <p style={{fontFamily:"var(--fd)",fontSize:".82rem",color:"var(--ink3)",lineHeight:1.55,margin:0}}>{(art.deck||"").substring(0,80)}…</p>
                  <div style={{fontFamily:"var(--fs)",fontSize:".58rem",letterSpacing:".12em",textTransform:"uppercase",color:"var(--ink4)",marginTop:"10px"}}>{art.author} · {art.readTime}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ══ SPECIAL REPORT BAND ═══════════════════════════════ */}
        {specialArt && (
          <div className="bg-special-band" onClick={() => openArticle(specialArt)}>
            <div style={{display:"flex",alignItems:"center",gap:"18px",flexWrap:"wrap"}}>
              <span style={{fontFamily:"var(--fs)",fontSize:".6rem",letterSpacing:".22em",textTransform:"uppercase",background:"var(--paper)",color:"var(--red)",padding:"4px 10px",fontWeight:700,flexShrink:0}}>
                Special Report
              </span>
              <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"1.3rem",fontWeight:700,lineHeight:1.2,flex:1,minWidth:"200px"}}>
                {specialArt.title}
              </div>
              <div style={{fontFamily:"var(--fd)",fontSize:".85rem",opacity:.85,flex:2,minWidth:"200px",lineHeight:1.5}}>
                {specialArt.deck.substring(0,120)}…
              </div>
              <span style={{fontFamily:"var(--fs)",fontSize:".62rem",letterSpacing:".14em",textTransform:"uppercase",opacity:.7,flexShrink:0,cursor:"pointer"}}>
                Read Full Report →
              </span>
            </div>
          </div>
        )}

        {/* ══ OPINION + DIGEST ══════════════════════════════════ */}
        <div style={{padding:"8px 60px 0",borderBottom:"2px solid var(--ink)"}}>
          <div className="bg-section-label bg-reveal" style={{marginBottom:"0"}}>
            Opinion & Analysis
            <span className="bg-section-label-tag">COMMENTARY</span>
          </div>
        </div>
        <div className="bg-digest-row">
          {opinion && <div className="bg-opinion bg-reveal">
            <div className="bg-opinion-author">
              <div className="bg-opinion-avatar">{opinion.authorInitial}</div>
              <div className="bg-opinion-author-info">
                <div style={{fontWeight:700,color:"var(--ink)"}}>{opinion.author}</div>
                <div style={{marginTop:"2px"}}>Senior Advisor, INCOZONE</div>
              </div>
            </div>
            <div className="bg-opinion-title" onClick={() => openArticle(opinion)}>{opinion.title}</div>
            <p className="bg-opinion-body">{opinion.deck}</p>
            <button onClick={() => openArticle(opinion)} style={{fontFamily:"var(--fs)",fontSize:".6rem",letterSpacing:".16em",textTransform:"uppercase",background:"none",border:"none",cursor:"pointer",color:"var(--red)",padding:"12px 0 0",display:"flex",alignItems:"center",gap:"8px"}}>
              Read Full Column →
            </button>
          </div>}

          <div className="bg-digest-rule" />

          {/* Most Read */}
          <div className="bg-digest bg-reveal bg-d2">
            <div className="bg-section-label" style={{marginBottom:"16px"}}>Most Read</div>
            {digest.map((art, i) => (
              <div className="bg-digest-item" key={art.id} onClick={() => openArticle(art)}>
                <div className="bg-digest-item-num">{i+1}</div>
                <div className="bg-digest-item-title">{art.title}</div>
                <div className="bg-digest-item-meta" style={{marginTop:"4px"}}>{art.cat} · {art.readTime}</div>
              </div>
            ))}
          </div>

          <div className="bg-digest-rule" />

          {/* Latest Briefings */}
          <div className="bg-digest bg-reveal bg-d3">
            <div className="bg-section-label" style={{marginBottom:"16px"}}>Latest Updates</div>
            {TICKER_ITEMS.slice(0,5).map((item, i) => (
              <div className="bg-digest-item" key={i} style={{cursor:"default"}}>
                <div className="bg-digest-item-num" style={{opacity:.15}}>{i+1}</div>
                <div className="bg-digest-item-title" style={{fontSize:".82rem"}}>{item}</div>
                <div className="bg-digest-item-meta" style={{marginTop:"4px"}}>UAE Regulatory Update</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ FOOTER ════════════════════════════════════════════ */}
        <div className="bg-footer">
          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"2.2rem",color:"var(--paper2)"}}>The UAE Business Gazette</div>
          <div style={{fontFamily:"var(--fs)",fontSize:".62rem",color:"rgba(245,240,232,.5)",letterSpacing:".06em",textAlign:"center"}}>
            © 2026 INCOZONE Advisory. All editorial content is for informational purposes only.<br/>
            Nothing herein constitutes legal or financial advice.
          </div>
          <button className="bg-footer-back" onClick={onBack}>← Back to INCOZONE</button>
        </div>

      </div>{/* end paper-fold wrapper */}

      {/* ══ ARTICLE OVERLAY ═══════════════════════════════════ */}
      {activeArt && (
        <ArticleOverlay article={activeArt} onClose={() => setActiveArt(null)} />
      )}
    </div>
  );
}
