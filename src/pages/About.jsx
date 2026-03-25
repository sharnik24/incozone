import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — About Us Page
//  Drop into: src/pages/About.jsx
//  Route: if (currentPage === "about") return <AboutPage onBack={...} />;
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=EB+Garamond:ital,wght@0,400;1,400;1,500&display=swap');

.ab-root *, .ab-root *::before, .ab-root *::after { box-sizing:border-box; margin:0; padding:0; }

.ab-root {
  --n950:#020b14; --n900:#05111e; --n800:#091928; --n750:#0c2033;
  --n700:#102540; --n600:#163354;
  --g400:#C9A84C; --g300:#D4B468; --g200:#E2CC98; --g100:#F0E4C0;
  --glow:rgba(201,168,76,0.14); --glow2:rgba(201,168,76,0.07);
  --cream-bg:#FAF6EE; --cream-100:#F4ECD8; --cream-200:#EDE0C4;
  --cream-ink:#1A120A; --cream-ink2:#3D2E1A; --cream-ink3:#7A6040;
  --cream-bdr:rgba(180,150,90,0.22);
  --w:#F8F5EE; --w80:rgba(248,245,238,0.80); --w60:rgba(248,245,238,0.60);
  --w30:rgba(248,245,238,0.30); --w12:rgba(248,245,238,0.12); --w06:rgba(248,245,238,0.06);
  --fd:'Cormorant Garamond',Georgia,serif;
  --fp:'Playfair Display',Georgia,serif;
  --fe:'EB Garamond',Georgia,serif;
  --fb:'DM Sans',system-ui,sans-serif;
  --ease:cubic-bezier(0.16,1,0.3,1);
  font-family:var(--fb); font-weight:300; color:var(--w);
  background:var(--n900); overflow-x:hidden; width:100%;
}

/* ══ NAV ═══════════════════════════════════════════════════════ */
.ab-nav {
  position:fixed; inset-inline:0; top:0; z-index:200;
  display:flex; align-items:center; justify-content:space-between;
  padding:22px 60px;
  transition:background .5s, padding .4s, border-color .5s;
  border-bottom:1px solid transparent;
}
.ab-nav.scrolled {
  background:rgba(5,17,30,0.96); backdrop-filter:blur(20px);
  padding:14px 60px; border-bottom-color:rgba(201,168,76,0.12);
}
.ab-nav-logo { font-family:var(--fd); font-size:1.5rem; font-weight:500; letter-spacing:.15em; color:var(--w); cursor:pointer; }
.ab-nav-logo em { color:var(--g400); font-style:normal; }
.ab-nav-links { display:flex; gap:36px; list-style:none; }
.ab-nav-links a { font-size:.72rem; letter-spacing:.14em; text-transform:uppercase; color:var(--w60); text-decoration:none; transition:color .3s; }
.ab-nav-links a:hover { color:var(--g300); }
.ab-nav-cta { font-size:.7rem; letter-spacing:.14em; text-transform:uppercase; background:transparent; border:1px solid var(--g400); color:var(--g400); padding:9px 22px; cursor:pointer; font-family:var(--fb); transition:background .3s,color .3s; }
.ab-nav-cta:hover { background:var(--g400); color:var(--n900); }
.ab-back-btn { position:absolute; top:90px; left:60px; z-index:20; background:none; border:none; font-family:var(--fb); font-size:.7rem; letter-spacing:.18em; text-transform:uppercase; color:var(--w30); cursor:pointer; display:flex; align-items:center; gap:10px; padding:0; transition:color .3s; }
.ab-back-btn:hover { color:var(--g400); }
.ab-back-btn::before { content:'←'; font-size:.9rem; }

/* ══ HERO — CINEMATIC SPLIT ════════════════════════════════════ */
.ab-hero {
  min-height:100vh; position:relative; overflow:hidden;
  display:grid; grid-template-columns:1fr 1fr;
}

/* Left — dark textured panel */
.ab-hero-left {
  background:var(--n950); position:relative;
  display:flex; flex-direction:column; justify-content:flex-end;
  padding:160px 60px 80px;
  z-index:2;
}
.ab-hero-left::before {
  content:''; position:absolute; inset:0;
  background:radial-gradient(ellipse 70% 80% at 0% 60%, rgba(201,168,76,.06), transparent);
  pointer-events:none;
}
/* Vertical gold line */
.ab-hero-left::after {
  content:''; position:absolute; right:0; top:10%; bottom:10%;
  width:1px; background:linear-gradient(to bottom, transparent, rgba(201,168,76,.3), transparent);
}

/* Giant ghost letterform */
.ab-hero-ghost {
  position:absolute; left:-40px; top:50%; transform:translateY(-50%);
  font-family:var(--fd); font-weight:300;
  font-size:clamp(16rem,28vw,26rem); line-height:1;
  color:transparent; -webkit-text-stroke:1px rgba(201,168,76,.04);
  pointer-events:none; user-select:none; letter-spacing:-.05em;
  white-space:nowrap;
}

.ab-hero-eyebrow {
  display:inline-flex; align-items:center; gap:14px; margin-bottom:28px;
  font-size:.58rem; letter-spacing:.34em; text-transform:uppercase; color:var(--g400);
  opacity:0; animation:abUp .8s var(--ease) .4s forwards;
}
.ab-hero-eyebrow::before { content:''; width:28px; height:1px; background:var(--g400); }

.ab-hero-h1 {
  font-family:var(--fd); font-weight:300;
  font-size:clamp(3.8rem,6vw,7rem);
  line-height:.9; letter-spacing:-.03em; color:var(--w);
  margin-bottom:0;
  opacity:0; animation:abUp 1s var(--ease) .55s forwards;
}
.ab-hero-h1 .line2 {
  display:block; padding-left:2.5rem;
  color:var(--g400); font-style:italic;
}
.ab-hero-h1 .line3 { display:block; padding-left:5rem; color:var(--w60); }

.ab-hero-desc {
  margin-top:36px; max-width:400px;
  font-size:.86rem; color:var(--w60); line-height:1.9;
  opacity:0; animation:abUp .9s var(--ease) .75s forwards;
}
.ab-hero-desc strong { color:var(--w); font-weight:400; }

.ab-hero-cta-row {
  margin-top:40px; display:flex; gap:12px;
  opacity:0; animation:abUp .8s var(--ease) .9s forwards;
}

/* Right — image-like dark gold panel with floating stats */
.ab-hero-right {
  background:var(--n800); position:relative; overflow:hidden;
  display:flex; align-items:center; justify-content:center;
}
.ab-hero-right-bg {
  position:absolute; inset:0;
  background:
    radial-gradient(ellipse 80% 60% at 60% 40%, rgba(201,168,76,.08), transparent 70%),
    radial-gradient(ellipse 50% 70% at 20% 80%, rgba(16,37,64,.8), transparent);
}
/* Animated diagonal lines */
.ab-hero-right-lines {
  position:absolute; inset:0; overflow:hidden;
}
.ab-hero-line {
  position:absolute; height:1px; background:linear-gradient(90deg,transparent,rgba(201,168,76,.12),transparent);
  animation:abLineSweep 8s ease-in-out infinite;
}
.ab-hero-line:nth-child(1) { width:120%; top:25%; transform:rotate(-8deg) translateX(-110%); animation-delay:0s; }
.ab-hero-line:nth-child(2) { width:120%; top:55%; transform:rotate(-8deg) translateX(-110%); animation-delay:2.5s; }
.ab-hero-line:nth-child(3) { width:120%; top:78%; transform:rotate(-8deg) translateX(-110%); animation-delay:5s; }
@keyframes abLineSweep { 0%{transform:rotate(-8deg) translateX(-110%)} 100%{transform:rotate(-8deg) translateX(110%)} }

/* Central visual — UAE map silhouette made of dots */
.ab-hero-map {
  position:relative; z-index:2;
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  gap:0;
}

/* Large number display */
.ab-hero-founded {
  text-align:center; position:relative; z-index:3;
}
.ab-hero-founded-num {
  font-family:var(--fd); font-size:clamp(5rem,10vw,9rem); font-weight:300;
  color:var(--g400); line-height:1; display:block;
  opacity:0; animation:abUp 1.2s var(--ease) .6s forwards;
}
.ab-hero-founded-label {
  font-size:.6rem; letter-spacing:.32em; text-transform:uppercase;
  color:var(--w30); display:block; margin-top:8px;
  opacity:0; animation:abUp .8s var(--ease) .8s forwards;
}

/* Floating stat cards */
.ab-hero-stat-card {
  position:absolute; z-index:4;
  background:rgba(9,25,40,.92); backdrop-filter:blur(16px);
  border:1px solid rgba(201,168,76,.18); padding:18px 24px; min-width:130px;
}
.ab-hero-stat-card:nth-child(2) { top:15%; left:8%; animation:abFloat 5s ease-in-out infinite; }
.ab-hero-stat-card:nth-child(3) { top:22%; right:6%; animation:abFloat 5s ease-in-out infinite 1.8s; }
.ab-hero-stat-card:nth-child(4) { bottom:18%; left:5%; animation:abFloat 5s ease-in-out infinite 3.3s; }
.ab-hero-stat-card:nth-child(5) { bottom:25%; right:4%; animation:abFloat 5s ease-in-out infinite .9s; }
.ab-stat-val { font-family:var(--fd); font-size:2.2rem; font-weight:300; color:var(--g400); line-height:1; display:block; }
.ab-stat-label { font-size:.58rem; letter-spacing:.18em; text-transform:uppercase; color:var(--w30); margin-top:5px; display:block; line-height:1.4; }

/* Bottom scroll prompt */
.ab-hero-scroll {
  position:absolute; bottom:36px; left:60px; z-index:10;
  display:flex; align-items:center; gap:14px;
  opacity:0; animation:abUp .8s var(--ease) 1.2s forwards;
}
.ab-hero-scroll-line { width:48px; height:1px; background:linear-gradient(to right, var(--g400), transparent); animation:abScrollPulse 2s ease-in-out infinite; }
.ab-hero-scroll-text { font-size:.58rem; letter-spacing:.3em; text-transform:uppercase; color:var(--w30); }

@keyframes abFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
@keyframes abScrollPulse { 0%,100%{opacity:.4;width:48px} 50%{opacity:1;width:64px} }

/* ══ MANIFESTO BAND ════════════════════════════════════════════ */
.ab-manifesto {
  background:var(--g400); padding:28px 60px;
  display:flex; align-items:center; justify-content:center;
  overflow:hidden; position:relative;
}
.ab-manifesto::before {
  content:''; position:absolute; inset:0;
  background:linear-gradient(90deg, rgba(0,0,0,.15), transparent 30%, transparent 70%, rgba(0,0,0,.15));
}
.ab-manifesto-text {
  font-family:var(--fd); font-size:clamp(.9rem,1.8vw,1.2rem); font-weight:400;
  color:var(--n900); letter-spacing:.06em; text-align:center; position:relative; z-index:1;
  line-height:1.6;
}
.ab-manifesto-text em { font-style:italic; }

/* ══ STORY — NEWSPAPER LAYOUT ═══════════════════════════════════ */
.ab-story { background:var(--cream-bg); padding:120px 60px; position:relative; overflow:hidden; }
.ab-story::before {
  content:'SINCE\A2012'; white-space:pre;
  position:absolute; right:-40px; top:40px;
  font-family:var(--fd); font-size:clamp(8rem,16vw,14rem); font-weight:300; line-height:.9;
  color:transparent; -webkit-text-stroke:1px rgba(180,150,90,.07);
  pointer-events:none; text-align:right;
}

.ab-story-layout {
  display:grid; grid-template-columns:1px 1fr 80px 1fr;
  gap:0 60px; align-items:start;
}
/* Vertical rule */
.ab-story-rule { background:rgba(180,150,90,.25); align-self:stretch; }

.ab-story-left {}
.ab-story-dateline {
  font-size:.58rem; letter-spacing:.3em; text-transform:uppercase;
  color:var(--cream-ink3); margin-bottom:20px; display:flex; align-items:center; gap:12px;
}
.ab-story-dateline::before { content:''; width:20px; height:1px; background:var(--cream-ink3); }

.ab-story-h2 {
  font-family:var(--fd); font-size:clamp(2.4rem,4.5vw,4.2rem); font-weight:300;
  color:var(--cream-ink); line-height:1.05; letter-spacing:-.02em;
  margin-bottom:0;
}
.ab-story-h2 em { color:var(--g400); font-style:italic; }

.ab-story-drop {
  margin-top:32px;
  font-family:var(--fe); font-size:1.08rem; color:var(--cream-ink3);
  line-height:1.9; columns:1;
}
/* Drop cap */
.ab-story-drop::first-letter {
  font-family:var(--fd); font-size:4.5rem; font-weight:500;
  color:var(--cream-ink); float:left; line-height:.8;
  margin-right:10px; margin-top:6px; padding:0;
}
.ab-story-drop strong { color:var(--cream-ink); font-weight:500; }

/* Center column number */
.ab-story-mid {
  display:flex; flex-direction:column; align-items:center; padding-top:12px;
}
.ab-story-mid-num {
  font-family:var(--fd); font-size:.75rem; letter-spacing:.28em;
  color:var(--g400); writing-mode:vertical-rl; text-orientation:mixed;
  transform:rotate(180deg);
}

/* Right column */
.ab-story-right { padding-top:72px; }
.ab-story-right p {
  font-size:.88rem; color:var(--cream-ink3); line-height:1.95;
  margin-bottom:20px; font-family:var(--fe);
}
.ab-story-right p:last-child { margin-bottom:0; }
.ab-story-right strong { color:var(--cream-ink); font-weight:500; }

/* Pull quote */
.ab-pull-quote {
  margin-top:40px; padding:28px 0 28px 28px;
  border-left:3px solid var(--g400);
  font-family:var(--fd); font-size:1.4rem; font-style:italic;
  font-weight:300; color:var(--cream-ink); line-height:1.5;
}
.ab-pull-quote cite {
  display:block; font-style:normal; font-family:var(--fb);
  font-size:.65rem; letter-spacing:.2em; text-transform:uppercase;
  color:var(--cream-ink3); margin-top:14px;
}

/* ══ NUMBERS — DARK ANIMATED COUNTER ROW ═══════════════════════ */
.ab-numbers { background:var(--n950); padding:0; }
.ab-numbers-grid { display:grid; grid-template-columns:repeat(4,1fr); }
.ab-num-cell {
  padding:64px 48px; border-right:1px solid var(--w06);
  position:relative; overflow:hidden;
  transition:background .4s var(--ease);
}
.ab-num-cell:last-child { border-right:none; }
.ab-num-cell:hover { background:rgba(201,168,76,.03); }
/* Gold fill from bottom */
.ab-num-cell::before {
  content:''; position:absolute; inset-inline:0; bottom:0;
  height:0;
  background:linear-gradient(to top, rgba(201,168,76,.05), transparent);
  transition:height .6s var(--ease);
}
.ab-num-cell:hover::before { height:100%; }
.ab-num-cell::after {
  content:''; position:absolute; top:0; left:0; right:0; height:2px;
  background:var(--g400); transform:scaleX(0); transform-origin:left;
  transition:transform .5s var(--ease);
}
.ab-num-cell:hover::after { transform:scaleX(1); }

.ab-num-digit {
  font-family:var(--fd); font-size:clamp(3rem,5vw,5.5rem); font-weight:300;
  line-height:1; color:var(--g400); display:block;
  position:relative; z-index:1;
}
.ab-num-digit sup { font-size:.45em; vertical-align:super; }
.ab-num-label {
  font-size:.62rem; letter-spacing:.22em; text-transform:uppercase;
  color:var(--w30); margin-top:10px; display:block; position:relative; z-index:1;
  transition:color .35s;
}
.ab-num-cell:hover .ab-num-label { color:var(--w60); }
.ab-num-desc {
  font-size:.76rem; color:var(--w60); line-height:1.7; margin-top:12px;
  position:relative; z-index:1;
}

/* ══ PILLARS — WHO WE ARE ═══════════════════════════════════════ */
.ab-pillars { background:var(--n800); padding:120px 60px; position:relative; overflow:hidden; }
.ab-pillars::after {
  content:'INCOZONE'; position:absolute;
  left:-20px; bottom:-60px;
  font-family:var(--fd); font-size:clamp(8rem,18vw,16rem); font-weight:300;
  color:transparent; -webkit-text-stroke:1px rgba(201,168,76,.03);
  pointer-events:none; white-space:nowrap;
}

.ab-pillars-top {
  display:grid; grid-template-columns:1fr 1fr; gap:60px;
  align-items:end; margin-bottom:72px;
}
.ab-pillars-h2 {
  font-family:var(--fd); font-size:clamp(2.2rem,4vw,3.8rem); font-weight:300;
  color:var(--w); line-height:1.1;
}
.ab-pillars-h2 em { color:var(--g400); font-style:italic; }
.ab-pillars-intro { font-size:.86rem; color:var(--w60); line-height:1.9; }
.ab-pillars-intro strong { color:var(--w); font-weight:400; }

.ab-pillars-grid {
  display:grid; grid-template-columns:repeat(3,1fr);
  gap:1px; background:var(--w06);
}
.ab-pillar-card {
  background:var(--n800); padding:52px 40px;
  position:relative; overflow:hidden;
  transition:background .45s var(--ease);
  cursor:default;
}
.ab-pillar-card:hover { background:var(--n750); }

/* Animated number watermark */
.ab-pillar-num-bg {
  position:absolute; right:-10px; bottom:-20px;
  font-family:var(--fd); font-size:9rem; font-weight:300; line-height:1;
  color:rgba(201,168,76,.04);
  transition:color .5s, transform .5s var(--ease);
  pointer-events:none;
}
.ab-pillar-card:hover .ab-pillar-num-bg { color:rgba(201,168,76,.09); transform:scale(1.08) rotate(-3deg); }

/* Top accent bar */
.ab-pillar-card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:3px;
  background:linear-gradient(90deg, var(--g400) 0%, transparent 100%);
  transform:scaleX(0); transform-origin:left;
  transition:transform .5s var(--ease);
}
.ab-pillar-card:hover::before { transform:scaleX(1); }

.ab-pillar-icon {
  width:48px; height:48px; border:1px solid rgba(201,168,76,.2);
  display:flex; align-items:center; justify-content:center;
  font-size:1.4rem; margin-bottom:28px;
  transition:border-color .35s, background .35s;
}
.ab-pillar-card:hover .ab-pillar-icon { border-color:var(--g400); background:rgba(201,168,76,.06); }
.ab-pillar-title {
  font-family:var(--fd); font-size:1.6rem; font-weight:400;
  color:var(--w); margin-bottom:14px; line-height:1.2;
  transition:color .3s;
}
.ab-pillar-card:hover .ab-pillar-title { color:var(--g300); }
.ab-pillar-body { font-size:.8rem; color:var(--w60); line-height:1.82; }

/* ══ TEAM — EDITORIAL GRID ══════════════════════════════════════ */
.ab-team { background:var(--n900); padding:120px 60px; }
.ab-team-header { margin-bottom:64px; }
.ab-team-label { font-size:.58rem; letter-spacing:.34em; text-transform:uppercase; color:var(--g400); display:flex; align-items:center; gap:14px; margin-bottom:16px; }
.ab-team-label::after { content:''; flex:1; height:1px; background:rgba(201,168,76,.2); max-width:80px; }
.ab-team-h2 { font-family:var(--fd); font-size:clamp(2rem,3.8vw,3.4rem); font-weight:300; color:var(--w); line-height:1.1; }
.ab-team-h2 em { color:var(--g400); font-style:italic; }

.ab-team-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--w06); }
.ab-team-card {
  background:var(--n900); padding:40px 32px 36px;
  position:relative; overflow:hidden;
  transition:background .4s;
}
.ab-team-card:hover { background:var(--n800); }

/* Gold top bar on hover */
.ab-team-card::after {
  content:''; position:absolute; top:0; left:0; right:0; height:2px;
  background:var(--g400); transform:scaleX(0); transform-origin:left;
  transition:transform .5s var(--ease);
}
.ab-team-card:hover::after { transform:scaleX(1); }

/* Avatar */
.ab-team-avatar {
  width:64px; height:64px; border-radius:50%;
  border:1.5px solid rgba(201,168,76,.25);
  display:flex; align-items:center; justify-content:center;
  font-family:var(--fd); font-size:1.6rem; font-weight:400;
  color:var(--g400); background:var(--n750); margin-bottom:24px;
  transition:border-color .35s, background .35s;
}
.ab-team-card:hover .ab-team-avatar { border-color:var(--g400); background:rgba(201,168,76,.07); }
.ab-team-name { font-family:var(--fd); font-size:1.3rem; font-weight:400; color:var(--w); margin-bottom:5px; line-height:1.2; }
.ab-team-role { font-size:.62rem; letter-spacing:.18em; text-transform:uppercase; color:var(--g400); margin-bottom:16px; opacity:.7; }
.ab-team-bio { font-size:.76rem; color:var(--w60); line-height:1.75; }
.ab-team-line { width:32px; height:1px; background:rgba(201,168,76,.3); margin:20px 0; }
.ab-team-exp { font-size:.65rem; color:var(--w30); }

/* ══ VALUES — ALTERNATING ROWS ══════════════════════════════════ */
.ab-values { background:var(--cream-bg); padding:120px 0; position:relative; overflow:hidden; }
.ab-values-header { padding:0 60px; margin-bottom:72px; }
.ab-values-label { font-size:.58rem; letter-spacing:.32em; text-transform:uppercase; color:#8A6820; margin-bottom:16px; display:block; }
.ab-values-h2 { font-family:var(--fd); font-size:clamp(2.2rem,4vw,3.8rem); font-weight:300; color:var(--cream-ink); line-height:1.1; }
.ab-values-h2 em { color:var(--g400); font-style:italic; }

.ab-value-row {
  display:grid; grid-template-columns:120px 1fr 1fr;
  border-top:1px solid var(--cream-bdr); padding:52px 60px;
  gap:60px; align-items:start;
  transition:background .4s;
  cursor:default;
}
.ab-value-row:last-child { border-bottom:1px solid var(--cream-bdr); }
.ab-value-row:hover { background:rgba(201,168,76,.04); }

.ab-value-row-num {
  font-family:var(--fd); font-size:3.5rem; font-weight:300;
  color:rgba(201,168,76,.18); line-height:1;
  transition:color .4s;
}
.ab-value-row:hover .ab-value-row-num { color:rgba(201,168,76,.45); }
.ab-value-row-title {
  font-family:var(--fd); font-size:clamp(1.5rem,2.5vw,2.2rem); font-weight:400;
  color:var(--cream-ink); line-height:1.2; padding-top:8px;
}
.ab-value-row-body { font-family:var(--fe); font-size:.88rem; color:var(--cream-ink3); line-height:1.9; padding-top:8px; }
.ab-value-row-body strong { color:var(--cream-ink); font-weight:500; }

/* ══ TIMELINE — FOUNDING STORY ══════════════════════════════════ */
.ab-timeline { background:var(--n800); padding:120px 60px; }
.ab-timeline-header { max-width:640px; margin-bottom:72px; }
.ab-tl-label { font-size:.58rem; letter-spacing:.32em; text-transform:uppercase; color:var(--g400); display:block; margin-bottom:16px; }
.ab-tl-h2 { font-family:var(--fd); font-size:clamp(2.2rem,4vw,3.4rem); font-weight:300; color:var(--w); line-height:1.1; }
.ab-tl-h2 em { color:var(--g400); font-style:italic; }

.ab-tl-track { display:grid; grid-template-columns:1fr 2px 1fr; gap:0 0; }
.ab-tl-line { background:linear-gradient(to bottom, transparent, var(--g400) 10%, var(--g400) 90%, transparent); position:relative; }
.ab-tl-line::before { content:''; position:absolute; top:0; left:50%; transform:translateX(-50%); width:10px; height:10px; border-radius:50%; background:var(--g400); }

.ab-tl-left { display:flex; flex-direction:column; gap:0; }
.ab-tl-right { display:flex; flex-direction:column; gap:0; }

.ab-tl-item {
  padding:40px 48px 40px 0;
  border-bottom:1px solid var(--w06);
  position:relative;
}
.ab-tl-right .ab-tl-item { padding:40px 0 40px 48px; }
.ab-tl-item:last-child { border-bottom:none; }

/* Dot connector */
.ab-tl-item::after {
  content:''; position:absolute; right:-5px; top:48px;
  width:10px; height:10px; border-radius:50%;
  border:1.5px solid var(--g400); background:var(--n800);
  transition:background .35s;
}
.ab-tl-right .ab-tl-item::after { left:-5px; right:auto; }
.ab-tl-item:hover::after { background:var(--g400); }

/* Spacer items (offset rows) */
.ab-tl-spacer { padding:40px 0; border-bottom:1px solid var(--w06); }
.ab-tl-spacer:last-child { border-bottom:none; }

.ab-tl-year { font-family:var(--fd); font-size:2.8rem; font-weight:300; color:rgba(201,168,76,.2); line-height:1; margin-bottom:12px; transition:color .4s; }
.ab-tl-item:hover .ab-tl-year { color:var(--g400); }
.ab-tl-title { font-size:.92rem; font-weight:500; color:var(--w); margin-bottom:8px; }
.ab-tl-desc { font-size:.78rem; color:var(--w60); line-height:1.78; }

/* ══ RECOGNITION ════════════════════════════════════════════════ */
.ab-recognition { background:var(--n950); padding:96px 60px; }
.ab-recog-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--w06); margin-top:52px; }
.ab-recog-card {
  background:var(--n950); padding:44px 36px; position:relative; overflow:hidden;
  transition:background .4s;
}
.ab-recog-card:hover { background:#081521; }
.ab-recog-card::before {
  content:''; position:absolute; top:0; left:0; right:0; height:2px;
  background:linear-gradient(90deg, var(--g400), transparent);
  transform:scaleX(0); transform-origin:left;
  transition:transform .5s var(--ease);
}
.ab-recog-card:hover::before { transform:scaleX(1); }
.ab-recog-icon { font-size:2rem; margin-bottom:20px; display:block; }
.ab-recog-title { font-family:var(--fd); font-size:1.4rem; font-weight:400; color:var(--w); margin-bottom:10px; line-height:1.2; transition:color .3s; }
.ab-recog-card:hover .ab-recog-title { color:var(--g300); }
.ab-recog-body { font-size:.78rem; color:var(--w60); line-height:1.78; }

/* ══ CTA ════════════════════════════════════════════════════════ */
.ab-cta {
  background:var(--n900); padding:140px 60px;
  position:relative; overflow:hidden; text-align:center;
}
.ab-cta::before {
  content:''; position:absolute; inset:0;
  background:
    radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,.06), transparent),
    linear-gradient(180deg, var(--n950) 0%, var(--n900) 100%);
}
.ab-cta::after {
  content:''; position:absolute; inset:0;
  background-image:linear-gradient(rgba(201,168,76,.03) 1px,transparent 1px),
    linear-gradient(90deg,rgba(201,168,76,.03) 1px,transparent 1px);
  background-size:72px 72px;
}
.ab-cta-inner { position:relative; z-index:1; max-width:620px; margin:0 auto; }
.ab-cta-label { font-size:.58rem; letter-spacing:.34em; text-transform:uppercase; color:var(--g400); display:block; margin-bottom:22px; }
.ab-cta-h2 { font-family:var(--fd); font-size:clamp(2.8rem,5vw,5rem); font-weight:300; color:var(--w); line-height:1.05; margin-bottom:10px; }
.ab-cta-h2 em { color:var(--g400); font-style:italic; }
.ab-cta-divider { width:48px; height:1px; background:var(--g400); margin:28px auto; opacity:.4; }
.ab-cta-p { font-size:.86rem; color:var(--w60); line-height:1.9; margin-bottom:48px; max-width:440px; margin-inline:auto; margin-bottom:48px; }
.ab-cta-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }

/* Contact card below CTA */
.ab-contact-strip {
  background:var(--n800); padding:52px 60px;
  display:grid; grid-template-columns:repeat(3,1fr);
  gap:1px; background-clip:content-box;
  border-top:1px solid var(--w06);
}
.ab-contact-item {
  padding:36px 44px; background:var(--n800); text-align:center;
  transition:background .35s;
  border-right:1px solid var(--w06);
}
.ab-contact-item:last-child { border-right:none; }
.ab-contact-item:hover { background:var(--n750); }
.ab-contact-icon { font-size:1.6rem; display:block; margin-bottom:12px; }
.ab-contact-label { font-size:.58rem; letter-spacing:.24em; text-transform:uppercase; color:var(--g400); display:block; margin-bottom:8px; }
.ab-contact-val { font-family:var(--fd); font-size:1.1rem; font-weight:400; color:var(--w); }

/* ══ FOOTER ════════════════════════════════════════════════════ */
.ab-footer { background:var(--n950); padding:48px 60px; border-top:1px solid var(--w06); }
.ab-footer-inner { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:20px; }
.ab-footer-logo { font-family:var(--fd); font-size:1.3rem; letter-spacing:.15em; color:var(--w); }
.ab-footer-logo em { color:var(--g400); font-style:normal; }
.ab-footer-copy { font-size:.68rem; color:var(--w30); }
.ab-footer-back { padding:9px 18px; background:transparent; border:1px solid var(--w12); color:var(--w60); font-family:var(--fb); font-size:.68rem; letter-spacing:.12em; text-transform:uppercase; cursor:pointer; transition:all .3s; }
.ab-footer-back:hover { border-color:var(--g400); color:var(--g400); }

/* ══ BUTTONS ═══════════════════════════════════════════════════ */
.ab-btn-gold { padding:15px 38px; background:var(--g400); color:var(--n900); font-family:var(--fb); font-size:.72rem; font-weight:500; letter-spacing:.14em; text-transform:uppercase; border:none; cursor:pointer; transition:background .3s,transform .2s; }
.ab-btn-gold:hover { background:var(--g300); transform:translateY(-2px); }
.ab-btn-ghost { padding:15px 38px; background:transparent; color:var(--w); font-family:var(--fb); font-size:.72rem; letter-spacing:.14em; text-transform:uppercase; border:1px solid var(--w30); cursor:pointer; transition:all .3s; }
.ab-btn-ghost:hover { border-color:var(--g400); color:var(--g400); transform:translateY(-2px); }

/* ══ WA FLOAT ══════════════════════════════════════════════════ */
.ab-wa { position:fixed; bottom:28px; right:28px; z-index:300; width:50px; height:50px; border-radius:50%; background:#25D366; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 4px 18px rgba(37,211,102,.4); transition:transform .3s; }
.ab-wa:hover { transform:scale(1.1); }

/* ══ REVEAL ════════════════════════════════════════════════════ */
.ab-reveal { opacity:0; transform:translateY(22px); transition:opacity .9s var(--ease),transform .9s var(--ease); }
.ab-reveal.in { opacity:1; transform:translateY(0); }
.ab-d1{transition-delay:.05s} .ab-d2{transition-delay:.15s} .ab-d3{transition-delay:.25s} .ab-d4{transition-delay:.35s} .ab-d5{transition-delay:.45s}

/* ══ KEYFRAMES ════════════════════════════════════════════════ */
@keyframes abUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes abCountUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }

/* ══ RESPONSIVE ════════════════════════════════════════════════ */
@media(max-width:1100px){
  .ab-hero { grid-template-columns:1fr; }
  .ab-hero-right { min-height:55vh; }
  .ab-story-layout { grid-template-columns:1fr; gap:36px; }
  .ab-story-rule,.ab-story-mid { display:none; }
  .ab-pillars-top { grid-template-columns:1fr; gap:24px; }
  .ab-pillars-grid { grid-template-columns:1fr 1fr; }
  .ab-numbers-grid { grid-template-columns:1fr 1fr; }
  .ab-team-grid { grid-template-columns:1fr 1fr; }
  .ab-tl-track { grid-template-columns:1fr; }
  .ab-tl-line { display:none; }
  .ab-tl-right .ab-tl-item { padding:40px 0; }
  .ab-tl-right .ab-tl-item::after { display:none; }
  .ab-recog-grid { grid-template-columns:1fr 1fr; }
  .ab-contact-strip { grid-template-columns:1fr; }
  .ab-contact-item { border-right:none; border-bottom:1px solid var(--w06); }
  .ab-contact-item:last-child { border-bottom:none; }
}
@media(max-width:768px){
  .ab-nav { padding:16px 24px; } .ab-nav.scrolled { padding:12px 24px; }
  .ab-nav-links { display:none; }
  .ab-back-btn { left:24px; }
  .ab-hero-left { padding:140px 24px 60px; }
  .ab-story,.ab-pillars,.ab-numbers,.ab-team,.ab-timeline,.ab-recognition,.ab-cta,.ab-recognition { padding-left:24px; padding-right:24px; }
  .ab-values-header { padding:0 24px; }
  .ab-value-row { padding:36px 24px; grid-template-columns:60px 1fr; grid-template-rows:auto auto; }
  .ab-value-row-body { grid-column:1/-1; }
  .ab-pillars-grid { grid-template-columns:1fr; }
  .ab-numbers-grid { grid-template-columns:1fr 1fr; }
  .ab-team-grid { grid-template-columns:1fr; }
  .ab-recog-grid { grid-template-columns:1fr; }
  .ab-footer { padding:36px 24px; }
  .ab-contact-strip { padding:0 24px; }
  .ab-contact-item { padding:28px 24px; }
}

  .ab-nav-hamburger {
    display: none; flex-direction: column; gap: 5px; cursor: pointer;
    background: none; border: none; padding: 6px; z-index: 310;
  }
  .ab-nav-hamburger span {
    display: block; width: 24px; height: 1.5px; background: rgba(248,245,238,0.6);
    transition: all 0.35s cubic-bezier(0.16,1,0.3,1); transform-origin: center;
  }
  .ab-nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: #C9A84C; }
  .ab-nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .ab-nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: #C9A84C; }
  .ab-drawer {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(3,10,20,0.97); backdrop-filter: blur(24px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    transform: translateX(100%); transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
    pointer-events: none;
  }
  .ab-drawer.open { transform: translateX(0); pointer-events: all; }
  .ab-drawer-brand {
    font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.3rem;
    letter-spacing: .18em; color: #F8F5EE; margin-bottom: 44px;
    opacity: 0; transform: translateY(10px);
    transition: opacity .4s .1s, transform .4s .1s;
  }
  .ab-drawer.open .ab-drawer-brand { opacity: 1; transform: translateY(0); }
  .ab-drawer-brand em { color: #C9A84C; font-style: normal; }
  .ab-dlink {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2rem, 8vw, 3rem); font-weight: 300; color: rgba(248,245,238,0.6);
    background: none; border: none; padding: 10px 0; cursor: pointer;
    display: block; width: 100%; text-align: center;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, opacity .4s cubic-bezier(0.16,1,0.3,1), transform .4s cubic-bezier(0.16,1,0.3,1);
  }
  .ab-drawer.open .ab-dlink { opacity: 1; transform: translateY(0); }
  .ab-drawer.open .ab-dlink:nth-of-type(1) { transition-delay: .12s; }
  .ab-drawer.open .ab-dlink:nth-of-type(2) { transition-delay: .17s; }
  .ab-drawer.open .ab-dlink:nth-of-type(3) { transition-delay: .22s; }
  .ab-drawer.open .ab-dlink:nth-of-type(4) { transition-delay: .27s; }
  .ab-drawer.open .ab-dlink:nth-of-type(5) { transition-delay: .32s; }
  .ab-dlink:hover { color: #C9A84C; }
  .ab-drawer-div { width: 40px; height: 1px; background: rgba(201,168,76,.25); margin: 18px 0; opacity: 0; transition: opacity .4s .34s; }
  .ab-drawer.open .ab-drawer-div { opacity: 1; }
  .ab-dcta {
    font-family: 'DM Sans', sans-serif; font-size: .7rem; letter-spacing: .18em;
    text-transform: uppercase; color: #C9A84C; border: 1px solid #C9A84C;
    background: none; padding: 12px 32px; cursor: pointer; margin-top: 8px;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, background .3s, opacity .4s .38s, transform .4s .38s;
  }
  .ab-drawer.open .ab-dcta { opacity: 1; transform: translateY(0); }
  .ab-dcta:hover { background: #C9A84C; color: #05111e; }
  @media (max-width: 900px) {
    .ab-nav-links { display: none; }
    .ab-nav-cta { display: none !important; }
    .ab-nav-hamburger { display: flex; }
  }
`;

// ── DATA ─────────────────────────────────────────────────────
const STATS = [
  { val: "3,200", sup: "+", label: "Companies Incorporated", pos: 2 },
  { val: "12",    sup: "yr", label: "UAE Expertise",         pos: 3 },
  { val: "68",    sup: "+",  label: "Nationalities Served",  pos: 4 },
  { val: "96",    sup: "%",  label: "Client Retention",      pos: 5 },
];

const PILLARS = [
  { icon:"🎯", num:"01", title:"Strategic Advisors", body:"We never recommend a structure before understanding your business model, your shareholders, and your long-term commercial intent. Zone selection and structure are outputs of strategy — never defaults." },
  { icon:"🏛️", num:"02", title:"Authority Insiders", body:"12 years of direct working relationships with licensing officers, visa section staff, and compliance teams across all UAE free zone authorities means your application moves at a different speed." },
  { icon:"🤝", num:"03", title:"Lifetime Partners", body:"Our 96% client retention rate is not a marketing claim. It reflects what happens when a firm treats every incorporation as the beginning of a relationship, not the completion of a transaction." },
];

const TEAM = [
  { initial:"R", name:"Chirag Mahyavansi", role:"Managing Director", bio:"Leads INCOZONE's advisory practice with 12 years of experience guiding high-net-worth individuals, family offices, and institutional investors through UAE market entry and corporate structuring.", exp:"12yr UAE" },
  { initial:"A", name:"Tushar Rathod", role:"Business Setup Consultant", bio:"Specialist in UAE free zone incorporation across all 8 major zones. Advises founders and SMEs on optimal zone selection, licensing strategy, and end-to-end company formation.", exp:"2yr Advisory" },
  { initial:"K", name:"Aakash Palgamkar", role:"Accountant", bio:"Manages corporate financial compliance, bookkeeping, VAT registration, and financial reporting for INCOZONE clients across free zone and mainland structures.", exp:"2yr Accounting" },
  { initial:"S", name:"Dharmesh Mahyavanshi", role:"Accounting Head", bio:"Heads INCOZONE's accounting and financial compliance practice. Oversees corporate financial structuring, VAT compliance, and financial reporting for high-value clients across free zone and mainland entities.", exp:"10yr Accounting" },
];

const VALUES = [
  { title:"Strategy before structure.", body:"Most advisory firms start with the license. We start with the question: what are you actually trying to build? <strong>Structure follows strategy.</strong> Every recommendation — zone, license type, visa quota, activity list — is derived from a clear understanding of your business, your ownership, and your 5-year intent." },
  { title:"Transparency as default.", body:"We publish our fees. We disclose government charges before you commit. We tell you when a structure <strong>won't serve your interests</strong> — even if it costs us the engagement. Clarity is a competitive advantage for both of us." },
  { title:"Relationships over transactions.", body:"The UAE is a relationship economy. Our 12-year tenure means we have direct contact relationships with licensing officers, visa section heads, and compliance teams at every major authority. <strong>That access is your advantage.</strong>" },
  { title:"Precision in every document.", body:"An incorrectly drafted Board Resolution. A missing UBO declaration. An activity mismatch in a license application. These are not minor administrative oversights — they are the difference between <strong>approval and rejection, speed and delay.</strong>" },
];

const TIMELINE = [
  { year:"2012", title:"Founded in Dubai", desc:"INCOZONE established in Business Bay, Dubai — with a single mandate: build the most technically rigorous business advisory firm in the UAE." },
  { year:"2014", title:"First DMCC Accreditation", desc:"Became an officially accredited DMCC formation partner — our first free zone authority relationship, and the beginning of a network that now spans 8 zones." },
  { year:"2016", title:"PRO Division Launched", desc:"Established a dedicated government liaison team after identifying that ongoing compliance — not initial setup — was where clients suffered most." },
  { year:"2018", title:"1,000 Companies Milestone", desc:"Surpassed 1,000 incorporated companies across UAE free zones and mainland — representing clients from 40+ nationalities." },
  { year:"2021", title:"ADGM & Financial Services", desc:"Expanded into regulated financial services incorporation, becoming one of the first non-law-firm advisors with direct FSRA working relationships." },
  { year:"2024", title:"3,200+ Companies & Growing", desc:"Today INCOZONE is the UAE's most trusted private incorporation advisory — 3,200+ companies, 68 nationalities, 96% client retention." },
];

const RECOGNITION = [
  { icon:"🏆", title:"DMCC Accredited Partner", body:"One of a select number of officially accredited DMCC formation partners — reflecting direct authority relationships and deep technical expertise in the UAE's most prestigious free zone." },
  { icon:"⚖️", title:"FTA-Registered Advisory", body:"Registered with the Federal Tax Authority as a compliant advisory firm. All structuring recommendations account for UAE corporate tax, VAT, and ESR obligations from the outset." },
  { icon:"🌐", title:"IFZA Official Partner", body:"Official IFZA partner with direct authority access, streamlined processing, and a dedicated relationship with the IFZA licensing team — reflected in our below-average setup timelines." },
  { icon:"🏛️", title:"ADGM Approved Intermediary", body:"Working relationship with ADGM Registration Authority enables INCOZONE to advise on both regulated and non-regulated ADGM structures — rare outside formal legal firms." },
  { icon:"🔒", title:"GDRFA Registered PRO", body:"Our PRO team holds active GDRFA registration, enabling direct visa and immigration submissions across all UAE free zones and mainland entities." },
  { icon:"📋", title:"MOHRE Accredited Agency", body:"Ministry of Human Resources and Emiratisation accreditation allows us to process employment visas, labour cards, and establishment cards for all client companies without third-party dependency." },
];

// ── CANVAS ────────────────────────────────────────────────────
function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let W, H, raf, t = 0;
    const pts = Array.from({length:50},()=>({
      x:Math.random()*1920, y:Math.random()*1080,
      vx:(Math.random()-.5)*.15, vy:(Math.random()-.5)*.15,
      r:Math.random()*1.2+.3, o:Math.random()*.35+.1,
    }));
    const resize=()=>{ W=c.width=c.offsetWidth; H=c.height=c.offsetHeight; };
    resize(); window.addEventListener("resize",resize);
    const draw=()=>{
      t+=.002; ctx.clearRect(0,0,W,H);
      const bg=ctx.createLinearGradient(0,0,W,H);
      bg.addColorStop(0,"#020b14"); bg.addColorStop(1,"#05111e");
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
      [[.15,.4,"#C9A84C",.06,12],[.85,.6,"#163354",.5,9],[.5,.8,"#C9A84C",.025,15]].forEach(([bx,by,col,a,spd],i)=>{
        const x=W*bx+Math.sin(t*(spd/10)+i*2)*60, y=H*by+Math.cos(t*(spd/13)+i)*45;
        const r=Math.min(W,H)*.55;
        const g=ctx.createRadialGradient(x,y,0,x,y,r);
        const rgb=parseInt(col.slice(1),16);
        g.addColorStop(0,`rgba(${rgb>>16},${(rgb>>8)&255},${rgb&255},${a})`);
        g.addColorStop(1,"rgba(0,0,0,0)");
        ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
      });
      ctx.strokeStyle="rgba(201,168,76,0.025)"; ctx.lineWidth=1;
      for(let x=0;x<W;x+=84){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
      for(let y=0;y<H;y+=84){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
      for(let i=0;i<pts.length;i++){
        const p=pts[i]; p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        for(let j=i+1;j<pts.length;j++){
          const q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.sqrt(dx*dx+dy*dy);
          if(d<170){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(201,168,76,${.07*(1-d/170)})`;ctx.lineWidth=.4;ctx.stroke();}
        }
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(201,168,76,${p.o})`;ctx.fill();
      }
      const vg=ctx.createRadialGradient(W/2,H/2,H*.1,W/2,H/2,H*.9);
      vg.addColorStop(0,"transparent"); vg.addColorStop(1,"rgba(2,11,20,0.7)");
      ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);
      raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%"}} />;
}

// ── Counter hook ──────────────────────────────────────────────
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target.replace(/\D/g, ""), 10);
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ── Counter cell component ─────────────────────────────────────
function NumCell({ val, sup, label, desc, delay }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const count = useCounter(val, 1800, started);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: .3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div className="ab-num-cell" ref={ref} style={{ transitionDelay: delay }}>
      <span className="ab-num-digit">{count.toLocaleString()}<sup>{sup}</sup></span>
      <span className="ab-num-label">{label}</span>
      {desc && <p className="ab-num-desc">{desc}</p>}
    </div>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".ab-reveal");
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
    }), { threshold: .07 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ── MAIN COMPONENT ────────────────────────────────────────────
export default function AboutPage({ onBack, onNavigate }) {
  const [_abOpen, setabOpen] = useState(false);
  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = _abOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [_abOpen]);

  const [scrolled, setScrolled] = useState(false);
  useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Timeline split into left/right alternating
  const tlLeft  = TIMELINE.filter((_, i) => i % 2 === 0);
  const tlRight = TIMELINE.filter((_, i) => i % 2 !== 0);

  return (
    <div className="ab-root">
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className={`ab-nav${scrolled ? " scrolled" : ""}`}>
        <div className="ab-nav-logo" onClick={()=>{if(onNavigate){onNavigate("home");window.scrollTo(0,0);}}}>INCO<em>ZONE</em></div>
        <ul className="ab-nav-links">{["Services","Free Zones","About","Blog","Contact"].map(l=>{const m={"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};return <li key={l}><a href="#" onClick={e=>{e.preventDefault();if(onNavigate){onNavigate(m[l]);window.scrollTo(0,0);}}}>{l}</a></li>;})}</ul>
        <button className="ab-nav-cta" onClick={()=>{if(onNavigate){onNavigate("schedule");window.scrollTo(0,0);}}}>Schedule Consultation</button>
      
        {/* Hamburger */}
        <button
          className={`ab-nav-hamburger${_abOpen ? " open" : ""}`}
          onClick={() => setabOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`ab-drawer${_abOpen ? " open" : ""}`}>
        <div className="ab-drawer-brand"
          onClick={() => { setabOpen(false); if(onNavigate) { onNavigate("home"); window.scrollTo(0,0); } }}>
          INCO<em>ZONE</em>
        </div>
        {["Services","Free Zones","About","Blog","Contact"].map((l) => {
          const pm = {"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};
          return (
            <button key={l} className="ab-dlink"
              onClick={() => { setabOpen(false); if(onNavigate) { onNavigate(pm[l]); window.scrollTo(0,0); } }}>
              {l}
            </button>
          );
        })}
        <div className="ab-drawer-div" />
        <button className="ab-dcta"
          onClick={() => { setabOpen(false); if(onNavigate) { onNavigate("schedule"); window.scrollTo(0,0); } }}>
          Schedule Consultation
        </button>
      </div>
      <button className="ab-back-btn" onClick={onBack}>Back to Home</button>

      {/* ═══════════════════════════════════════
          HERO — CINEMATIC SPLIT
      ═══════════════════════════════════════ */}
      <section className="ab-hero">

        {/* Left panel */}
        <div className="ab-hero-left">
          <div className="ab-hero-ghost" aria-hidden>About</div>
          <div className="ab-hero-eyebrow">About INCOZONE</div>
          <h1 className="ab-hero-h1">
            The UAE's<span className="line2">Most Trusted</span>
            <span className="line3">Advisors.</span>
          </h1>
          <p className="ab-hero-desc">
            <strong>12 years. 3,200+ companies. 68 nationalities.</strong> INCOZONE is not a document-processing firm. We are strategic advisors who built the most technically rigorous UAE business formation practice in the market — from the inside out.
          </p>
          <div className="ab-hero-cta-row">
            <button className="ab-btn-gold">Our Story ↓</button>
            <button className="ab-btn-ghost">Meet the Team</button>
          </div>
        </div>

        {/* Right panel — visual */}
        <div className="ab-hero-right">
          <HeroCanvas />
          <div className="ab-hero-right-lines">
            <div className="ab-hero-line" />
            <div className="ab-hero-line" />
            <div className="ab-hero-line" />
          </div>

          {/* Stats floating */}
          {STATS.map((s, i) => (
            <div className="ab-hero-stat-card" key={i}>
              <span className="ab-stat-val">{s.val}<span style={{fontSize:".55em",verticalAlign:"super"}}>{s.sup}</span></span>
              <span className="ab-stat-label">{s.label}</span>
            </div>
          ))}

          {/* Central large number */}
          <div className="ab-hero-founded">
            <span className="ab-hero-founded-num">2012</span>
            <span className="ab-hero-founded-label">Year Founded · Dubai, UAE</span>
          </div>
        </div>

        {/* Scroll prompt */}
        <div className="ab-hero-scroll">
          <div className="ab-hero-scroll-line" />
          <span className="ab-hero-scroll-text">Scroll to Explore</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MANIFESTO BAND
      ═══════════════════════════════════════ */}
      <div className="ab-manifesto">
        <p className="ab-manifesto-text">
          <em>"We believe the quality of your UAE structure determines the quality of your UAE future."</em> &nbsp;·&nbsp; Strategy First &nbsp;·&nbsp; Zero Surprises &nbsp;·&nbsp; Lifetime Partnership
        </p>
      </div>

      {/* ═══════════════════════════════════════
          STORY — NEWSPAPER LAYOUT
      ═══════════════════════════════════════ */}
      <section className="ab-story">
        <div className="ab-story-layout">
          <div className="ab-story-rule ab-reveal" />
          <div className="ab-story-left ab-reveal">
            <div className="ab-story-dateline">Est. 2012 · Dubai, UAE</div>
            <h2 className="ab-story-h2">
              Not a Document<br />Processing Firm.<br /><em>Never Was.</em>
            </h2>
            <p className="ab-story-drop">
              INCOZONE was founded in 2012 in Business Bay, Dubai, with a conviction that the UAE business formation market was fundamentally broken. Not in its mechanics — UAE free zones are world-class — but in how advisory firms were operating within it. <strong>Most were charging premium fees for commodity services:</strong> collecting documents, submitting applications, and calling it "advisory." We built something different. A firm where every engagement begins with a conversation about what the client is actually trying to build — and where zone selection, license structure, and visa strategy are derived from that conversation, not from a price list.
            </p>
          </div>
          <div className="ab-story-mid ab-reveal">
            <span className="ab-story-mid-num">INCOZONE · EST. 2012 · DUBAI</span>
          </div>
          <div className="ab-story-right ab-reveal ab-d2">
            <p>
              Today, INCOZONE manages over <strong>3,200 active corporate entities</strong> across UAE free zones and mainland — representing founders from 68 nationalities, from solo entrepreneurs setting up their first trading license to family offices structuring multi-jurisdiction holding arrangements.
            </p>
            <p>
              Our team includes former free zone licensing officers, ex-bank relationship managers, UAE national PRO specialists, and corporate lawyers — giving clients a depth of institutional knowledge that no single-discipline firm can replicate.
            </p>
            <p>
              We hold official accreditations from DMCC, IFZA, ADGM, and JAFZA — not because accreditation is a selling point, but because direct authority relationships are how we deliver <strong>below-market timelines and above-market outcomes.</strong>
            </p>
            <blockquote className="ab-pull-quote">
              "Structure is a permanent decision. The right advisor makes it once. The wrong one makes it again and again."
              <cite>— Rashid Al-Mansoori, Managing Director</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          NUMBERS — ANIMATED COUNTERS
      ═══════════════════════════════════════ */}
      <section className="ab-numbers">
        <div className="ab-numbers-grid">
          <NumCell val="3200" sup="+" label="Companies Incorporated" desc="Across all UAE free zones and mainland, spanning 68 nationalities." delay="0s" />
          <NumCell val="12" sup="yr" label="Years of UAE Expertise" desc="Founded 2012. Every authority relationship built over a decade." delay=".1s" />
          <NumCell val="96" sup="%" label="Client Retention Rate" desc="The most honest metric we have. Our clients stay." delay=".2s" />
          <NumCell val="68" sup="+" label="Nationalities Served" desc="From European family offices to Asian trading houses." delay=".3s" />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PILLARS — WHO WE ARE
      ═══════════════════════════════════════ */}
      <section className="ab-pillars">
        <div className="ab-pillars-top">
          <div className="ab-reveal">
            <span style={{fontSize:".58rem",letterSpacing:".32em",textTransform:"uppercase",color:"var(--g400)",display:"block",marginBottom:"14px"}}>Who We Are</span>
            <h2 className="ab-pillars-h2">Three things that make<br /><em>every client stay.</em></h2>
          </div>
          <p className="ab-pillars-intro ab-reveal ab-d2">
            Most advisory firms compete on price. We compete on <strong>depth of expertise, speed of authority access, and quality of long-term relationship.</strong> These are not marketing claims. They are structural advantages built over 12 years.
          </p>
        </div>
        <div className="ab-pillars-grid">
          {PILLARS.map((p, i) => (
            <div className={`ab-pillar-card ab-reveal ab-d${i+1}`} key={i}>
              <div className="ab-pillar-num-bg" aria-hidden>{p.num}</div>
              <div className="ab-pillar-icon">{p.icon}</div>
              <div className="ab-pillar-title">{p.title}</div>
              <p className="ab-pillar-body">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TEAM — EDITORIAL GRID
      ═══════════════════════════════════════ */}
      <section className="ab-team">
        <div className="ab-team-header ab-reveal">
          <div className="ab-team-label">The People</div>
          <h2 className="ab-team-h2">Former insiders.<br /><em>Now your advocates.</em></h2>
        </div>
        <div className="ab-team-grid">
          {TEAM.map((m, i) => (
            <div className={`ab-team-card ab-reveal ab-d${i+1}`} key={i}>
              <div className="ab-team-avatar">{m.initial}</div>
              <div className="ab-team-name">{m.name}</div>
              <div className="ab-team-role">{m.role}</div>
              <div className="ab-team-line" />
              <p className="ab-team-bio">{m.bio}</p>
              <div className="ab-team-line" style={{marginBottom:0,marginTop:"16px"}}/>
              <span className="ab-team-exp" style={{fontSize:".62rem",color:"var(--g400)",letterSpacing:".14em",textTransform:"uppercase",display:"block",marginTop:"12px"}}>{m.exp}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          VALUES — ALTERNATING ROWS (CREAM)
      ═══════════════════════════════════════ */}
      <section className="ab-values">
        <div className="ab-values-header ab-reveal">
          <span className="ab-values-label">Our Principles</span>
          <h2 className="ab-values-h2">What we believe<br /><em>drives everything.</em></h2>
        </div>
        {VALUES.map((v, i) => (
          <div className={`ab-value-row ab-reveal ab-d${(i%3)+1}`} key={i}>
            <div className="ab-value-row-num">0{i+1}</div>
            <div className="ab-value-row-title">{v.title}</div>
            <div className="ab-value-row-body" dangerouslySetInnerHTML={{__html:v.body}} />
          </div>
        ))}
      </section>

      {/* ═══════════════════════════════════════
          TIMELINE
      ═══════════════════════════════════════ */}
      <section className="ab-timeline">
        <div className="ab-timeline-header ab-reveal">
          <span className="ab-tl-label">Our Journey</span>
          <h2 className="ab-tl-h2">12 years built<br /><em>one decision at a time.</em></h2>
        </div>
        <div className="ab-tl-track">
          {/* Left column */}
          <div className="ab-tl-left">
            {tlLeft.map((item, i) => (
              <div className={`ab-tl-item ab-reveal ab-d${i+1}`} key={i}>
                <div className="ab-tl-year">{item.year}</div>
                <div className="ab-tl-title">{item.title}</div>
                <p className="ab-tl-desc">{item.desc}</p>
              </div>
            ))}
          </div>
          {/* Center line */}
          <div className="ab-tl-line" />
          {/* Right column (offset) */}
          <div className="ab-tl-right">
            <div className="ab-tl-spacer" />
            {tlRight.map((item, i) => (
              <div className={`ab-tl-item ab-reveal ab-d${i+2}`} key={i}>
                <div className="ab-tl-year">{item.year}</div>
                <div className="ab-tl-title">{item.title}</div>
                <p className="ab-tl-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          RECOGNITION & ACCREDITATIONS
      ═══════════════════════════════════════ */}
      <section className="ab-recognition">
        <span className="ab-reveal" style={{fontSize:".58rem",letterSpacing:".32em",textTransform:"uppercase",color:"var(--g400)",display:"block",marginBottom:"14px"}}>Accreditations</span>
        <h2 className="ab-reveal ab-d1" style={{fontFamily:"var(--fd)",fontSize:"clamp(2rem,3.8vw,3.2rem)",fontWeight:300,color:"var(--w)",lineHeight:1.1,marginBottom:0}}>
          Official recognition from<br /><em style={{color:"var(--g400)",fontStyle:"italic"}}>every authority that matters.</em>
        </h2>
        <div className="ab-recog-grid">
          {RECOGNITION.map((r, i) => (
            <div className={`ab-recog-card ab-reveal ab-d${(i%3)+1}`} key={i}>
              <span className="ab-recog-icon">{r.icon}</span>
              <div className="ab-recog-title">{r.title}</div>
              <p className="ab-recog-body">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA
      ═══════════════════════════════════════ */}
      <section className="ab-cta">
        <div className="ab-cta-inner">
          <span className="ab-cta-label ab-reveal">Begin Your Journey</span>
          <h2 className="ab-cta-h2 ab-reveal ab-d1">
            Ready to build<br /><em>properly?</em>
          </h2>
          <div className="ab-cta-divider" />
          <p className="ab-cta-p ab-reveal ab-d2">
            One conversation. No obligation. A clear, structured recommendation — tailored to your business, your nationality, and your commercial intent.
          </p>
          <div className="ab-cta-btns ab-reveal ab-d3">
            <button className="ab-btn-gold">Schedule Private Consultation</button>
            <button className="ab-btn-ghost" onClick={onBack}>← Back to Home</button>
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <div className="ab-contact-strip">
        {[
          { icon:"📍", label:"Head Office", val:"Business Bay, Dubai, UAE" },
          { icon:"📞", label:"Direct Line", val:"+971 4 XXX XXXX" },
          { icon:"✉️", label:"Email", val:"advisory@incozone.ae" },
        ].map((c, i) => (
          <div className="ab-contact-item ab-reveal" key={i} style={{transitionDelay:`${i*.1}s`}}>
            <span className="ab-contact-icon">{c.icon}</span>
            <span className="ab-contact-label">{c.label}</span>
            <span className="ab-contact-val">{c.val}</span>
          </div>
        ))}
      </div>

      {/* ── FOOTER ── */}
      <footer className="ab-footer">
        <div className="ab-footer-inner">
          <div className="ab-footer-logo">INCO<em>ZONE</em></div>
          <div className="ab-footer-copy">© 2025 INCOZONE. All rights reserved. Dubai, UAE.</div>
          <button className="ab-footer-back" onClick={onBack}>← Back to Home</button>
        </div>
      </footer>

      {/* WA */}
      <div className="ab-wa">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </div>
    </div>
  );
}
