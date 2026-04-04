import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Corporate & PRO Advisory Page
//  Unique layout · Same navy/gold palette
//  Drop into: src/pages/PRO.jsx
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500&family=EB+Garamond:ital,wght@1,400;1,500&display=swap');

.pro-root *, .pro-root *::before, .pro-root *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}
.pro-root {
  --n950:#020b14; --n900:#05111e; --n800:#091928; --n750:#0c2033;
  --n700:#102540; --n600:#163354;
  --g400:#C9A84C; --g300:#D4B468; --g200:#E2CC98; --g100:#F0E4C0;
  --glow:rgba(201,168,76,0.14); --glow2:rgba(201,168,76,0.07); --glow3:rgba(201,168,76,0.04);
  --cream-bg:#FAF6EE; --cream-100:#F4ECD8;
  --cream-ink:#1A120A; --cream-ink2:#3D2E1A; --cream-ink3:#7A6040;
  --cream-bdr:rgba(180,150,90,0.22);
  --w:#F8F5EE; --w80:rgba(248,245,238,0.80); --w60:rgba(248,245,238,0.60);
  --w30:rgba(248,245,238,0.30); --w12:rgba(248,245,238,0.12); --w06:rgba(248,245,238,0.06);
  --fd:'Cormorant Garamond',Georgia,serif;
  --fe:'EB Garamond',Georgia,serif;
  --fb:'DM Sans',system-ui,sans-serif;
  --ease:cubic-bezier(0.16,1,0.3,1);
  font-family:var(--fb); font-weight:300; color:var(--w);
  background:var(--n900); overflow-x:hidden; width:100%;
}

/* ── NAV ─────────────────────────────────────────────────────── */
.pro-nav { position:fixed; inset-inline:0; top:0; z-index:200; display:flex; align-items:center; justify-content:space-between; padding:22px 60px; transition:background .5s,padding .4s,border-color .5s; border-bottom:1px solid transparent; }
.pro-nav.scrolled { background:rgba(5,17,30,0.96); backdrop-filter:blur(20px); padding:14px 60px; border-bottom-color:rgba(201,168,76,0.12); }
.pro-nav-logo { font-family:var(--fd); font-size:1.5rem; font-weight:500; letter-spacing:0.15em; color:var(--w); cursor:pointer; }
.pro-nav-logo em { color:var(--g400); font-style:normal; }
.pro-nav-links { display:flex; gap:36px; list-style:none; }
.pro-nav-links a { font-size:0.72rem; letter-spacing:0.14em; text-transform:uppercase; color:var(--w60); text-decoration:none; transition:color .3s; }
.pro-nav-links a:hover { color:var(--g300); }
.pro-nav-cta { font-size:0.7rem; letter-spacing:0.14em; text-transform:uppercase; background:transparent; border:1px solid var(--g400); color:var(--g400); padding:9px 22px; cursor:pointer; font-family:var(--fb); transition:background .3s,color .3s; }
.pro-nav-cta:hover { background:var(--g400); color:var(--n900); }
.pro-back-btn { position:absolute; top:90px; left:60px; z-index:20; background:none; border:none; font-family:var(--fb); font-size:0.7rem; letter-spacing:0.18em; text-transform:uppercase; color:var(--w30); cursor:pointer; display:flex; align-items:center; gap:10px; padding:0; transition:color .3s; }
.pro-back-btn:hover { color:var(--g400); }
.pro-back-btn::before { content:'←'; font-size:0.9rem; }

/* ═══════════════════════════════════════════════════
   HERO — Full-width typographic with marquee strip
═══════════════════════════════════════════════════ */
.pro-hero {
  min-height:100vh; position:relative; overflow:hidden;
  display:flex; flex-direction:column; justify-content:flex-end;
  padding:0 0 0;
}
.pro-hero-canvas { position:absolute; inset:0; z-index:0; }

/* Diagonal decorative rule */
.pro-hero-rule {
  position:absolute; z-index:1;
  width:200%; height:1px;
  background:linear-gradient(90deg,transparent,rgba(201,168,76,0.18),transparent);
  top:62%; left:-50%; transform:rotate(-4deg);
  pointer-events:none;
}

.pro-hero-content {
  position:relative; z-index:2;
  padding:160px 60px 0;
  display:grid; grid-template-columns:1fr 480px;
  gap:60px; align-items:end;
}

.pro-hero-left {}
.pro-hero-badge {
  display:inline-flex; align-items:center; gap:12px;
  margin-bottom:32px;
  opacity:0; animation:proUp .8s var(--ease) .3s forwards;
}
.pro-hero-badge-num {
  font-family:var(--fd); font-size:0.65rem; font-weight:500;
  letter-spacing:0.3em; color:var(--n900);
  background:var(--g400); padding:6px 14px;
}
.pro-hero-badge-label {
  font-size:0.6rem; letter-spacing:0.26em; text-transform:uppercase;
  color:var(--w30);
}

.pro-hero-h1 {
  font-family:var(--fd); font-weight:300;
  font-size:clamp(3.8rem,8vw,8.5rem);
  line-height:.88; letter-spacing:-.03em; color:var(--w);
  margin-bottom:0;
  opacity:0; animation:proUp 1s var(--ease) .45s forwards;
}
.pro-hero-h1 .row2 {
  display:block; padding-left:3.5rem;
  color:var(--g400); font-style:italic;
}
.pro-hero-h1 .row3 {
  display:block; padding-left:7rem;
  color:var(--w60);
}

.pro-hero-right {
  padding-bottom:4px;
  opacity:0; animation:proUp .9s var(--ease) .7s forwards;
}
.pro-hero-right-label {
  font-size:0.58rem; letter-spacing:0.3em; text-transform:uppercase;
  color:var(--g400); margin-bottom:20px; display:block;
}
.pro-hero-right p {
  font-size:0.88rem; color:var(--w60); line-height:1.9; margin-bottom:32px;
}
.pro-hero-right p strong { color:var(--w); font-weight:400; }
.pro-hero-actions { display:flex; gap:12px; flex-wrap:wrap; }

/* Marquee strip */
.pro-marquee-wrap {
  position:relative; z-index:2;
  margin-top:60px;
  border-top:1px solid var(--w06); border-bottom:1px solid var(--w06);
  background:var(--n950); overflow:hidden; padding:16px 0;
  opacity:0; animation:proUp .8s var(--ease) 1s forwards;
}
.pro-marquee-track {
  display:flex; gap:0; white-space:nowrap;
  animation:proMarquee 28s linear infinite;
}
.pro-marquee-item {
  display:inline-flex; align-items:center; gap:20px;
  padding:0 32px; font-size:0.62rem; letter-spacing:0.22em;
  text-transform:uppercase; color:var(--w30);
  flex-shrink:0;
}
.pro-marquee-item em { color:var(--g400); font-style:normal; }
.pro-marquee-dot {
  width:4px; height:4px; border-radius:50%; background:rgba(201,168,76,0.3);
}
@keyframes proMarquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

/* ═══════════════════════════════════════════════════
   WHAT IS PRO — Magazine two-column pull quote
═══════════════════════════════════════════════════ */
.pro-intro { background:var(--n800); padding:96px 60px; }
.pro-intro-grid {
  display:grid; grid-template-columns:1fr 1fr;
  gap:80px; align-items:start; margin-top:52px;
}
.pro-intro-left {}
.pro-pull-quote {
  font-family:var(--fd); font-size:clamp(1.5rem,2.8vw,2.3rem);
  font-weight:300; font-style:italic; line-height:1.45;
  color:var(--w80); margin-bottom:32px; padding-bottom:32px;
  border-bottom:1px solid var(--w12);
}
.pro-pull-quote strong { font-style:normal; color:var(--g400); }
.pro-intro-body p {
  font-size:0.86rem; color:var(--w60); line-height:1.9;
  margin-bottom:18px;
}
.pro-intro-body p:last-child { margin-bottom:0; }
.pro-intro-body strong { color:var(--w); font-weight:400; }

.pro-intro-right {}
.pro-intro-metrics {
  display:grid; grid-template-columns:1fr 1fr; gap:1px;
  background:var(--w06); margin-bottom:32px;
}
.pro-metric {
  background:var(--n800); padding:28px 24px;
  transition:background .3s;
}
.pro-metric:hover { background:var(--n750); }
.pro-metric-val {
  font-family:var(--fd); font-size:2.8rem; font-weight:300;
  color:var(--g400); line-height:1; display:block;
}
.pro-metric-label {
  font-size:0.62rem; letter-spacing:0.16em; text-transform:uppercase;
  color:var(--w30); margin-top:6px; display:block; line-height:1.4;
}
.pro-included-note {
  background:var(--n900); border:1px solid var(--w06); padding:24px 28px;
}
.pro-included-note-title {
  font-size:0.68rem; letter-spacing:0.2em; text-transform:uppercase;
  color:var(--g400); margin-bottom:14px;
}
.pro-included-list { display:flex; flex-direction:column; gap:9px; }
.pro-included-item {
  display:flex; align-items:center; gap:12px;
  font-size:0.77rem; color:var(--w60);
}
.pro-included-item::before { content:''; color:var(--g400); font-size:.55rem; flex-shrink:0; }

/* ═══════════════════════════════════════════════════
   SERVICES MATRIX — Mosaic grid
═══════════════════════════════════════════════════ */
.pro-matrix { background:var(--n900); padding:96px 60px; }
.pro-matrix-header {
  display:grid; grid-template-columns:1fr 1fr;
  gap:60px; align-items:end; margin-bottom:52px;
}
.pro-section-label {
  font-size:.6rem; letter-spacing:.32em; text-transform:uppercase;
  color:var(--g400); margin-bottom:14px; display:block;
}
.pro-h2 {
  font-family:var(--fd); font-size:clamp(2rem,3.8vw,3.4rem);
  font-weight:300; line-height:1.1; color:var(--w);
}
.pro-h2 em { color:var(--g400); font-style:italic; }
.pro-matrix-desc {
  font-size:0.84rem; color:var(--w60); line-height:1.88;
}
.pro-matrix-desc strong { color:var(--w); font-weight:400; }

/* Mosaic: 3 columns, varying row heights */
.pro-mosaic {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  grid-template-rows:auto;
  gap:1px; background:var(--w06);
}
.pro-mosaic-card {
  background:var(--n900); padding:40px 36px;
  position:relative; overflow:hidden;
  transition:background .4s var(--ease);
  cursor:default;
}
.pro-mosaic-card.tall { grid-row:span 2; }
.pro-mosaic-card:hover { background:var(--n800); }

/* Animated gold corner on hover */
.pro-mosaic-card::before {
  content:''; position:absolute;
  top:0; right:0; width:0; height:0;
  border-style:solid;
  border-width:0 0 0 0;
  border-color:transparent var(--g400) transparent transparent;
  transition:border-width .4s var(--ease);
}
.pro-mosaic-card:hover::before {
  border-width:0 44px 44px 0;
}

.pro-mosaic-cat {
  font-size:.58rem; letter-spacing:.24em; text-transform:uppercase;
  color:var(--g400); margin-bottom:20px; display:block; opacity:.7;
  transition:opacity .3s;
}
.pro-mosaic-card:hover .pro-mosaic-cat { opacity:1; }
.pro-mosaic-icon { font-size:1.8rem; margin-bottom:16px; }
.pro-mosaic-title {
  font-family:var(--fd); font-size:1.5rem; font-weight:400;
  color:var(--w); margin-bottom:12px; line-height:1.2;
  transition:color .3s;
}
.pro-mosaic-card:hover .pro-mosaic-title { color:var(--g300); }
.pro-mosaic-desc {
  font-size:0.78rem; color:var(--w60); line-height:1.78;
  margin-bottom:20px;
}
.pro-mosaic-items { display:flex; flex-direction:column; gap:7px; }
.pro-mosaic-item {
  font-size:.7rem; color:var(--w30);
  display:flex; align-items:center; gap:9px;
  transition:color .3s;
}
.pro-mosaic-card:hover .pro-mosaic-item { color:var(--w60); }
.pro-mosaic-item::before { content:'→'; color:var(--g400); font-size:.65rem; }
.pro-mosaic-time {
  margin-top:20px; padding-top:16px; border-top:1px solid var(--w06);
  font-size:.6rem; letter-spacing:.18em; text-transform:uppercase;
  color:var(--g400);
}

/* ═══════════════════════════════════════════════════
   RELATIONSHIP MODEL — How your RM works
═══════════════════════════════════════════════════ */
.pro-rm { background:var(--cream-bg); padding:96px 60px; position:relative; overflow:hidden; }
.pro-rm::before {
  content:''; position:absolute; inset:0;
  background:radial-gradient(ellipse 70% 60% at 50% 50%,rgba(201,168,76,.07),transparent);
  pointer-events:none;
}
.pro-rm::after {
  content:''; position:absolute; top:0; left:0; right:0; height:3px;
  background:linear-gradient(90deg,transparent,var(--g400) 40%,transparent);
  opacity:.5;
}
.pro-rm-inner { position:relative; z-index:1; }
.pro-rm-header { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:end; margin-bottom:60px; }
.pro-rm .pro-section-label { color:#8A6820; }
.pro-rm .pro-h2 { color:var(--cream-ink); }
.pro-rm-intro { font-size:.84rem; color:var(--cream-ink3); line-height:1.88; }
.pro-rm-intro strong { color:var(--cream-ink); font-weight:400; }

.pro-rm-grid {
  display:grid; grid-template-columns:repeat(3,1fr);
  gap:16px;
}
.pro-rm-card {
  background:var(--cream-bg); border:1px solid var(--cream-bdr);
  padding:36px 30px;
  transition:transform .35s var(--ease),box-shadow .35s,border-color .35s;
  box-shadow:0 2px 12px rgba(120,90,30,.06);
}
.pro-rm-card:hover {
  transform:translateY(-5px);
  box-shadow:0 16px 40px rgba(120,90,30,.12);
  border-color:rgba(201,168,76,.4);
}
.pro-rm-card-num {
  font-family:var(--fd); font-size:3rem; font-weight:300;
  color:rgba(201,168,76,.15); line-height:1; margin-bottom:16px;
  transition:color .4s;
}
.pro-rm-card:hover .pro-rm-card-num { color:rgba(201,168,76,.35); }
.pro-rm-card-title { font-size:.92rem; font-weight:500; color:var(--cream-ink); margin-bottom:10px; }
.pro-rm-card-desc { font-size:.78rem; color:var(--cream-ink3); line-height:1.78; }

/* ═══════════════════════════════════════════════════
   AMENDMENTS DETAIL — Accordion-style categories
═══════════════════════════════════════════════════ */
.pro-amendments { background:var(--n800); padding:96px 60px; }
.pro-amend-layout { display:grid; grid-template-columns:380px 1fr; gap:64px; margin-top:52px; align-items:start; }
.pro-amend-sticky { position:sticky; top:100px; }
.pro-amend-intro {
  font-size:.86rem; color:var(--w60); line-height:1.88; margin-bottom:24px;
}
.pro-amend-intro strong { color:var(--w); font-weight:400; }
.pro-amend-stat-box {
  background:var(--n900); border:1px solid rgba(201,168,76,.15);
  padding:28px 24px; margin-top:28px;
}
.pro-amend-stat-box-label {
  font-size:.58rem; letter-spacing:.24em; text-transform:uppercase;
  color:var(--g400); margin-bottom:16px; display:block;
}
.pro-amend-stat-row {
  display:flex; justify-content:space-between; align-items:baseline;
  padding:10px 0; border-bottom:1px solid var(--w06);
  font-size:.76rem;
}
.pro-amend-stat-row:last-child { border-bottom:none; }
.pro-amend-stat-row span:first-child { color:var(--w60); }
.pro-amend-stat-row span:last-child { color:var(--g400); font-weight:500; }

.pro-amend-cats { display:flex; flex-direction:column; gap:1px; }
.pro-amend-cat {
  background:var(--n900); border-left:3px solid transparent;
  transition:border-color .3s,background .3s;
  cursor:pointer;
}
.pro-amend-cat.open { border-left-color:var(--g400); background:var(--n800); }
.pro-amend-cat-header {
  display:grid; grid-template-columns:48px 1fr auto;
  gap:20px; align-items:center; padding:24px 28px;
}
.pro-amend-cat-icon { font-size:1.3rem; }
.pro-amend-cat-title { font-size:.9rem; font-weight:500; color:var(--w); }
.pro-amend-cat-arrow {
  width:24px; height:24px; border:1px solid var(--w12); border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  color:var(--g400); font-size:.8rem; transition:transform .35s var(--ease);
}
.pro-amend-cat.open .pro-amend-cat-arrow { transform:rotate(45deg); background:var(--g400); color:var(--n900); border-color:var(--g400); }
.pro-amend-cat-body { max-height:0; overflow:hidden; transition:max-height .5s var(--ease); }
.pro-amend-cat.open .pro-amend-cat-body { max-height:600px; }
.pro-amend-cat-inner { padding:0 28px 28px; }
.pro-amend-cat-desc { font-size:.8rem; color:var(--w60); line-height:1.8; margin-bottom:16px; }
.pro-amend-items-grid {
  display:grid; grid-template-columns:1fr 1fr; gap:8px;
}
.pro-amend-item {
  background:var(--n750); padding:12px 14px;
  font-size:.72rem; color:var(--w60); line-height:1.5;
  display:flex; gap:10px; align-items:flex-start;
}
.pro-amend-item::before { content:'·'; color:var(--g400); flex-shrink:0; font-size:1rem; line-height:1.2; }
.pro-amend-time-tag {
  display:inline-flex; align-items:center; gap:6px;
  font-size:.6rem; letter-spacing:.18em; text-transform:uppercase;
  color:var(--g400); margin-top:14px;
}
.pro-amend-time-tag::before { content:''; width:16px; height:1px; background:var(--g400); }

/* ═══════════════════════════════════════════════════
   VISA SECTION — Cards with progress bars
═══════════════════════════════════════════════════ */
.pro-visa { background:var(--n750); padding:96px 60px; }
.pro-visa-grid {
  display:grid; grid-template-columns:repeat(3,1fr);
  gap:1px; background:var(--w06); margin-top:52px;
}
.pro-visa-card {
  background:var(--n750); padding:40px 32px;
  transition:background .3s; position:relative;
}
.pro-visa-card:hover { background:var(--n700); }
.pro-visa-card-tag {
  font-size:.58rem; letter-spacing:.24em; text-transform:uppercase;
  color:var(--g400); margin-bottom:20px; display:block;
}
.pro-visa-card-title {
  font-family:var(--fd); font-size:1.65rem; font-weight:400;
  color:var(--w); margin-bottom:8px; line-height:1.2;
}
.pro-visa-card-subtitle {
  font-size:.72rem; color:var(--w30); margin-bottom:24px;
}
.pro-visa-steps { display:flex; flex-direction:column; gap:0; margin-bottom:24px; }
.pro-visa-step {
  display:flex; gap:16px; align-items:flex-start; padding:12px 0;
  border-bottom:1px solid var(--w06); position:relative;
}
.pro-visa-step:last-child { border-bottom:none; }
.pro-visa-step-dot {
  width:8px; height:8px; border-radius:50%;
  border:1px solid var(--g400); background:transparent;
  flex-shrink:0; margin-top:5px;
  transition:background .3s;
}
.pro-visa-card:hover .pro-visa-step-dot { background:var(--g400); }
.pro-visa-step-text { font-size:.76rem; color:var(--w60); line-height:1.55; }
.pro-visa-step-time { font-size:.62rem; color:var(--w30); margin-top:3px; }
.pro-visa-card-meta {
  padding-top:16px; border-top:1px solid var(--w06);
  display:flex; justify-content:space-between; align-items:center;
}
.pro-visa-card-meta-timeline {
  font-size:.6rem; letter-spacing:.16em; text-transform:uppercase;
  color:var(--g400);
}
.pro-visa-card-cost {
  font-family:var(--fd); font-size:1.4rem; font-weight:300; color:var(--w60);
}

/* ═══════════════════════════════════════════════════
   RETAINER PLANS
═══════════════════════════════════════════════════ */
.pro-retainer { background:var(--n900); padding:96px 60px; }
.pro-retainer-grid {
  display:grid; grid-template-columns:repeat(3,1fr);
  gap:20px; margin-top:52px;
}
.pro-plan {
  border:1px solid var(--w06); padding:44px 36px;
  display:flex; flex-direction:column;
  transition:border-color .35s,transform .35s var(--ease),box-shadow .35s;
  position:relative;
}
.pro-plan:hover { transform:translateY(-6px); box-shadow:0 20px 48px rgba(0,0,0,.3); border-color:rgba(201,168,76,.3); }
.pro-plan.featured { background:var(--n800); border-color:rgba(201,168,76,.35); }
.pro-plan.featured:hover { border-color:var(--g400); box-shadow:0 24px 60px rgba(0,0,0,.4); }
.pro-plan-badge {
  font-size:.58rem; letter-spacing:.2em; text-transform:uppercase;
  padding:4px 12px; width:fit-content; margin-bottom:20px; font-weight:500;
  border:1px solid var(--w12); color:var(--w30);
}
.pro-plan.featured .pro-plan-badge { border-color:var(--g400); color:var(--g400); background:rgba(201,168,76,.07); }
.pro-plan-name {
  font-family:var(--fd); font-size:2rem; font-weight:400;
  color:var(--w); margin-bottom:6px;
}
.pro-plan-sub { font-size:.74rem; color:var(--w60); margin-bottom:24px; }
.pro-plan-price { margin-bottom:24px; padding-bottom:20px; border-bottom:1px solid var(--w06); }
.pro-plan-amount {
  font-family:var(--fd); font-size:2.8rem; font-weight:300; line-height:1;
}
.pro-plan:not(.featured) .pro-plan-amount { color:var(--w); }
.pro-plan.featured .pro-plan-amount { color:var(--g400); }
.pro-plan-period { font-size:.68rem; color:var(--w30); margin-top:4px; letter-spacing:.06em; }
.pro-plan-features { list-style:none; display:flex; flex-direction:column; gap:11px; flex:1; margin-bottom:28px; }
.pro-plan-feat { display:flex; align-items:flex-start; gap:11px; font-size:.78rem; line-height:1.5; }
.pro-feat-on { color:var(--g400); flex-shrink:0; font-size:.72rem; margin-top:2px; }
.pro-feat-off { color:var(--w12); flex-shrink:0; font-size:.72rem; margin-top:2px; }
.pro-feat-label-on { color:var(--w80); }
.pro-feat-label-off { color:var(--w30); }
.pro-plan-btn {
  width:100%; padding:13px 20px; font-family:var(--fb);
  font-size:.7rem; letter-spacing:.14em; text-transform:uppercase;
  cursor:pointer; transition:all .3s;
}
.pro-plan:not(.featured) .pro-plan-btn { background:transparent; border:1px solid var(--w12); color:var(--w60); }
.pro-plan:not(.featured) .pro-plan-btn:hover { border-color:var(--g400); color:var(--g400); }
.pro-plan.featured .pro-plan-btn { background:var(--g400); border:none; color:var(--n900); font-weight:500; }
.pro-plan.featured .pro-plan-btn:hover { background:var(--g300); }

/* ═══════════════════════════════════════════════════
   FAQ
═══════════════════════════════════════════════════ */
.pro-faq { background:var(--n800); padding:96px 60px; }
.pro-faq-inner { max-width:820px; margin:52px auto 0; }
.pro-faq-item { border-bottom:1px solid var(--w06); }
.pro-faq-q { width:100%; background:none; border:none; padding:26px 0; display:flex; align-items:center; justify-content:space-between; gap:24px; cursor:pointer; text-align:left; font-family:var(--fb); }
.pro-faq-q-text { font-size:.92rem; font-weight:400; color:var(--w); line-height:1.5; }
.pro-faq-icon { width:26px; height:26px; border:1px solid var(--w12); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--g400); font-size:1.1rem; flex-shrink:0; transition:all .3s; }
.pro-faq-item.open .pro-faq-icon { background:var(--g400); color:var(--n900); border-color:var(--g400); transform:rotate(45deg); }
.pro-faq-answer { max-height:0; overflow:hidden; transition:max-height .45s var(--ease); }
.pro-faq-item.open .pro-faq-answer { max-height:500px; }
.pro-faq-answer-inner { padding-bottom:24px; }
.pro-faq-answer p { font-size:.83rem; color:var(--w60); line-height:1.85; }
.pro-faq-answer ul { margin-top:12px; list-style:none; display:flex; flex-direction:column; gap:7px; }
.pro-faq-answer ul li { font-size:.8rem; color:var(--w60); padding-left:18px; position:relative; line-height:1.6; }
.pro-faq-answer ul li::before { content:'—'; position:absolute; left:0; color:var(--g400); }

/* ═══════════════════════════════════════════════════
   CTA
═══════════════════════════════════════════════════ */
.pro-cta { background:var(--cream-bg); padding:120px 60px; text-align:center; position:relative; overflow:hidden; }
.pro-cta::before { content:''; position:absolute; inset:0; background-image:linear-gradient(rgba(180,150,90,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(180,150,90,.05) 1px,transparent 1px); background-size:56px 56px; }
.pro-cta::after { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 65% 55% at 50% 50%,rgba(201,168,76,.09),transparent); pointer-events:none; }
.pro-cta-inner { position:relative; z-index:1; max-width:600px; margin:0 auto; }
.pro-cta-label { font-size:.6rem; letter-spacing:.32em; text-transform:uppercase; color:#8A6820; margin-bottom:20px; display:block; }
.pro-cta-h2 { font-family:var(--fd); font-size:clamp(2.4rem,4.5vw,4rem); font-weight:300; color:var(--cream-ink); line-height:1.12; margin-bottom:12px; }
.pro-cta-h2 em { color:var(--g400); font-style:italic; }
.pro-cta-divider { width:44px; height:1px; background:var(--g400); margin:22px auto; opacity:.5; }
.pro-cta-p { font-size:.84rem; color:var(--cream-ink3); line-height:1.85; margin-bottom:48px; }
.pro-cta-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }

/* ── BUTTONS ─────────────────────────────────────── */
.pro-btn-gold { padding:15px 38px; background:var(--g400); color:var(--n900); font-family:var(--fb); font-size:.72rem; font-weight:500; letter-spacing:.14em; text-transform:uppercase; border:none; cursor:pointer; transition:background .3s,transform .2s; }
.pro-btn-gold:hover { background:var(--g300); transform:translateY(-2px); }
.pro-btn-ghost { padding:15px 38px; background:transparent; color:var(--w); font-family:var(--fb); font-size:.72rem; letter-spacing:.14em; text-transform:uppercase; border:1px solid var(--w30); cursor:pointer; transition:all .3s; }
.pro-btn-ghost:hover { border-color:var(--g400); color:var(--g400); transform:translateY(-2px); }
.pro-btn-ink { padding:15px 38px; background:var(--cream-ink); color:var(--cream-bg); font-family:var(--fb); font-size:.72rem; font-weight:500; letter-spacing:.14em; text-transform:uppercase; border:none; cursor:pointer; transition:background .3s,transform .2s; }
.pro-btn-ink:hover { background:var(--g400); color:var(--cream-ink); transform:translateY(-2px); }
.pro-btn-cream-out { padding:15px 38px; background:transparent; color:var(--cream-ink2); font-family:var(--fb); font-size:.72rem; letter-spacing:.14em; text-transform:uppercase; border:1px solid var(--cream-bdr); cursor:pointer; transition:all .3s; }
.pro-btn-cream-out:hover { border-color:var(--g400); color:var(--cream-ink); transform:translateY(-2px); }

/* ── FOOTER ──────────────────────────────────────── */
.pro-footer { background:var(--n950); padding:52px 60px; border-top:1px solid var(--w06); }
.pro-footer-inner { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:20px; }
.pro-footer-logo { font-family:var(--fd); font-size:1.3rem; letter-spacing:.15em; color:var(--w); }
.pro-footer-logo em { color:var(--g400); font-style:normal; }
.pro-footer-copy { font-size:.68rem; color:var(--w30); }
.pro-footer-back { padding:9px 18px; background:transparent; border:1px solid var(--w12); color:var(--w60); font-family:var(--fb); font-size:.68rem; letter-spacing:.12em; text-transform:uppercase; cursor:pointer; transition:all .3s; }
.pro-footer-back:hover { border-color:var(--g400); color:var(--g400); }

/* ── WA ──────────────────────────────────────────── */
.pro-wa { position:fixed; bottom:28px; right:28px; z-index:300; width:50px; height:50px; border-radius:50%; background:#25D366; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 4px 18px rgba(37,211,102,.4); transition:transform .3s; }
.pro-wa:hover { transform:scale(1.1); }

/* ── REVEAL ──────────────────────────────────────── */
.pro-reveal { opacity:0; transform:translateY(22px); transition:opacity .85s var(--ease),transform .85s var(--ease); }
.pro-reveal.in { opacity:1; transform:translateY(0); }
.pd1{transition-delay:.05s} .pd2{transition-delay:.15s} .pd3{transition-delay:.25s} .pd4{transition-delay:.35s}

/* ── KEYFRAMES ───────────────────────────────────── */
@keyframes proUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

/* ── RESPONSIVE ──────────────────────────────────── */
@media(max-width:1100px){
  .pro-hero-content { grid-template-columns:1fr; }
  .pro-hero-right { padding-bottom:0; }
  .pro-intro-grid { grid-template-columns:1fr; gap:48px; }
  .pro-intro-metrics { grid-template-columns:repeat(4,1fr); }
  .pro-matrix-header { grid-template-columns:1fr; gap:24px; }
  .pro-mosaic { grid-template-columns:1fr 1fr; }
  .pro-mosaic-card.tall { grid-row:span 1; }
  .pro-rm-header { grid-template-columns:1fr; gap:24px; }
  .pro-rm-grid { grid-template-columns:1fr 1fr; }
  .pro-amend-layout { grid-template-columns:1fr; }
  .pro-amend-sticky { position:static; }
  .pro-visa-grid { grid-template-columns:1fr; }
  .pro-retainer-grid { grid-template-columns:1fr; max-width:480px; }
  .pro-amend-items-grid { grid-template-columns:1fr; }
}
@media(max-width:768px){
  .pro-nav{padding:16px 24px} .pro-nav.scrolled{padding:12px 24px} .pro-nav-links{display:none}
  .pro-back-btn{left:24px}
  .pro-hero-content{padding:140px 24px 0}
  .pro-intro,.pro-matrix,.pro-rm,.pro-amendments,.pro-visa,.pro-retainer,.pro-faq,.pro-cta{padding-left:24px;padding-right:24px}
  .pro-mosaic{grid-template-columns:1fr}
  .pro-intro-metrics{grid-template-columns:1fr 1fr}
  .pro-rm-grid{grid-template-columns:1fr}
  .pro-footer{padding:40px 24px}
  .pro-hero-h1 .row2{padding-left:1.5rem}
  .pro-hero-h1 .row3{padding-left:3rem}
}

  .pro-nav-hamburger {
    display: none; flex-direction: column; gap: 5px; cursor: pointer;
    background: none; border: none; padding: 6px; z-index: 310;
  }
  .pro-nav-hamburger span {
    display: block; width: 24px; height: 1.5px; background: rgba(248,245,238,0.6);
    transition: all 0.35s cubic-bezier(0.16,1,0.3,1); transform-origin: center;
  }
  .pro-nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: #C9A84C; }
  .pro-nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .pro-nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: #C9A84C; }
  .pro-drawer {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(3,10,20,0.97); backdrop-filter: blur(24px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    transform: translateX(100%); transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
    pointer-events: none;
  }
  .pro-drawer.open { transform: translateX(0); pointer-events: all; }
  .pro-drawer-brand {
    font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.3rem;
    letter-spacing: .18em; color: #F8F5EE; margin-bottom: 44px;
    opacity: 0; transform: translateY(10px);
    transition: opacity .4s .1s, transform .4s .1s;
  }
  .pro-drawer.open .pro-drawer-brand { opacity: 1; transform: translateY(0); }
  .pro-drawer-brand em { color: #C9A84C; font-style: normal; }
  .pro-dlink {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2rem, 8vw, 3rem); font-weight: 300; color: rgba(248,245,238,0.6);
    background: none; border: none; padding: 10px 0; cursor: pointer;
    display: block; width: 100%; text-align: center;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, opacity .4s cubic-bezier(0.16,1,0.3,1), transform .4s cubic-bezier(0.16,1,0.3,1);
  }
  .pro-drawer.open .pro-dlink { opacity: 1; transform: translateY(0); }
  .pro-drawer.open .pro-dlink:nth-of-type(1) { transition-delay: .12s; }
  .pro-drawer.open .pro-dlink:nth-of-type(2) { transition-delay: .17s; }
  .pro-drawer.open .pro-dlink:nth-of-type(3) { transition-delay: .22s; }
  .pro-drawer.open .pro-dlink:nth-of-type(4) { transition-delay: .27s; }
  .pro-drawer.open .pro-dlink:nth-of-type(5) { transition-delay: .32s; }
  .pro-dlink:hover { color: #C9A84C; }
  .pro-drawer-div { width: 40px; height: 1px; background: rgba(201,168,76,.25); margin: 18px 0; opacity: 0; transition: opacity .4s .34s; }
  .pro-drawer.open .pro-drawer-div { opacity: 1; }
  .pro-dcta {
    font-family: 'DM Sans', sans-serif; font-size: .7rem; letter-spacing: .18em;
    text-transform: uppercase; color: #C9A84C; border: 1px solid #C9A84C;
    background: none; padding: 12px 32px; cursor: pointer; margin-top: 8px;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, background .3s, opacity .4s .38s, transform .4s .38s;
  }
  .pro-drawer.open .pro-dcta { opacity: 1; transform: translateY(0); }
  .pro-dcta:hover { background: #C9A84C; color: #05111e; }
  @media (max-width: 900px) {
    .pro-nav-links { display: none; }
    .pro-nav-cta { display: none !important; }
    .pro-nav-hamburger { display: flex; }
  }
`;

// ── DATA ─────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  "License Renewal", "Visa Renewal", "Share Transfer", "Director Amendment",
  "Activity Addition", "Trade Name Change", "Capital Amendment", "Emirates ID",
  "Establishment Card", "Labour Card", "NOC Issuance", "Ejari Registration",
  "Attestation Services", "GDRFA Services", "MOL Approvals", "Shareholder Resolution",
];

const MOSAIC_SERVICES = [
  {
    cat:"License & Corporate",icon:"",title:"License Management",
    desc:"Complete management of your trade license lifecycle — renewal, amendments, upgrades, and compliance. We track expiry dates and initiate renewal 60 days in advance so you never risk a lapse.",
    items:["Annual license renewal","Activity additions & removals","License upgrade / downgrade","License cancellation"],
    time:"48–72 hr standard turnaround",tall:false,
  },
  {
    cat:"Shareholder Changes",icon:"",title:"Share Transfers & Restructuring",
    desc:"Full-scope ownership restructuring — share transfers between existing shareholders, introduction of new investors, exit arrangements, and corporate restructuring across all UAE free zones and mainland.",
    items:["Share transfer (partial or full)","New shareholder onboarding","Exit & buyout arrangements","Shareholding restructure","Board resolution drafting","Notarisation & authority filing"],
    time:"5–15 business days",tall:true,
  },
  {
    cat:"Compliance",icon:"",title:"Regulatory Compliance",
    desc:"UBO (Ultimate Beneficial Owner) filings, ESR (Economic Substance Regulation) compliance, AML declarations, and annual reporting obligations across all UAE jurisdictions.",
    items:["UBO registration & updates","ESR notification & reporting","AML compliance declarations","Annual return filings"],
    time:"Authority-dependent",tall:false,
  },
  {
    cat:"Authority Liaison",icon:"",title:"Government Liaison",
    desc:"Direct representation at UAE government authorities — DED, MOHRE, GDRFA, ICA, Ministry of Foreign Affairs, Chamber of Commerce, and all free zone authorities. Your PRO manages every counter interaction.",
    items:["DED & free zone authority visits","Ministry of Foreign Affairs","GDRFA & ICA immigration","Chamber of Commerce filings","Document attestation & legalisation"],
    time:"Same-day to 5 business days",tall:false,
  },
  {
    cat:"Corporate Records",icon:"",title:"Corporate Amendments",
    desc:"Director appointments and removals, trade name amendments, registered address changes, capital increases, and full constitutional document updates.",
    items:["Director / manager changes","Registered address update","Trade name amendment","Capital increase / decrease","MOA & AOA amendments"],
    time:"3–10 business days",tall:false,
  },
  {
    cat:"Documentation",icon:"",title:"Attestation & Legalisation",
    desc:"End-to-end document attestation — notarisation, MOFA attestation, embassy legalisation, apostille, and translation services for UAE and international use.",
    items:["UAE MOFA attestation","Embassy legalisation","Apostille certification","Certified translations","Corporate document packages"],
    time:"3–7 business days",tall:false,
  },
];

const RM_CARDS = [
  { num:"01", title:"Dedicated Relationship Manager", desc:"Every INCOZONE client has a named relationship manager — one person who knows your company, your history, and handles your requests directly. No ticketing systems. No call centres." },
  { num:"02", title:"Proactive Renewal Tracking", desc:"We track every expiry date across your portfolio — license, visas, Emirates IDs, establishment cards. Renewal is initiated 60 days in advance with zero prompting from you." },
  { num:"03", title:"Direct Authority Access", desc:"Your RM has direct working relationships with licensing officers, visa section staff, and compliance teams at all 8 UAE free zones and DED. Matters are resolved at source, not through portals." },
  { num:"04", title:"Same-Day Response Commitment", desc:"All client queries receive a substantive response within the same business day. Urgent government matters — visa cancellations, compliance flags — are escalated immediately." },
  { num:"05", title:"Full Document Custody", desc:"INCOZONE maintains a secure, organised digital record of all your corporate documents, licenses, visas, and correspondence — accessible to you on request at any time." },
  { num:"06", title:"Annual Corporate Review", desc:"Once a year, your RM conducts a full review of your corporate structure, activities, and ownership — proactively identifying amendments needed and compliance gaps before they become problems." },
];

const AMEND_CATS = [
  {
    icon:"", title:"Ownership & Shareholder Changes",
    desc:"The most complex category of amendments — requiring authority approval, legal documentation, and often notarisation. INCOZONE manages the entire chain.",
    items:["Full share transfer to new buyer","Partial share transfer","New shareholder introduction","Shareholder exit arrangement","Corporate shareholder onboarding","Trust & nominee amendments","Board resolution drafting","Shareholder agreement updates"],
    time:"7–15 business days",
  },
  {
    icon:"", title:"Director & Manager Amendments",
    desc:"Adding or removing directors, appointing managers, updating authorised signatories, and maintaining the authority's records.",
    items:["Director appointment","Director removal","Manager designation","Authorised signatory change","Signing authority update","Power of attorney issuance","Contact person update","Emergency director changes"],
    time:"3–7 business days",
  },
  {
    icon:"", title:"License & Activity Changes",
    desc:"Expanding or restricting your licensed activities, upgrading license categories, and managing multi-activity approvals across all authorities.",
    items:["Activity addition","Activity removal","License category upgrade","New activity approval","Restricted activity licensing","Freelancer permit addition","DED activity amendments","Free zone activity expansion"],
    time:"2–5 business days",
  },
  {
    icon:"", title:"Company Details & Corporate Records",
    desc:"Trade name changes, registered address updates, capital structure amendments, and official document reissuance.",
    items:["Trade name change","Registered address update","Office space upgrade / downgrade","Share capital increase","Share capital decrease","MOA / AOA amendments","Company objects change","Corporate stamp reissuance"],
    time:"3–10 business days",
  },
];

const VISA_TYPES = [
  {
    tag:"Investor Visa",title:"Investor &\nPartner Visa",subtitle:"For company owners & shareholders",
    steps:[
      { text:"Entry Permit (approval in principle)", time:"1–2 business days" },
      { text:"Medical fitness test (approved HAAD/DHA clinic)", time:"1–2 days" },
      { text:"Emirates biometric registration", time:"Same day" },
      { text:"Residence visa stamping in passport", time:"2–3 days" },
      { text:"Emirates ID application & collection", time:"5–7 days" },
    ],
    timeline:"10–15 working days",cost:"AED 4,200–6,500",
  },
  {
    tag:"Employment Visa",title:"Employee &\nStaff Visa",subtitle:"For hired employees under your license",
    steps:[
      { text:"Establishment card (if not issued)", time:"2–3 business days" },
      { text:"Labour card / work permit application", time:"2–3 days" },
      { text:"Entry permit issuance", time:"1–3 days" },
      { text:"Medical fitness & biometrics", time:"1–2 days" },
      { text:"Residence visa & Emirates ID", time:"7–10 days" },
    ],
    timeline:"15–20 working days",cost:"AED 5,500–8,000",
  },
  {
    tag:"Dependent Visa",title:"Family\nDependant Visa",subtitle:"Spouse, children & parents",
    steps:[
      { text:"Sponsor salary / income eligibility check", time:"Immediate assessment" },
      { text:"Marriage / birth certificate attestation", time:"3–7 days (if not attested)" },
      { text:"Entry permit for dependant", time:"1–3 days" },
      { text:"Medical fitness & biometrics", time:"1–2 days" },
      { text:"Residence visa & Emirates ID", time:"7–10 days" },
    ],
    timeline:"12–18 working days",cost:"AED 3,800–5,500",
  },
];

const PLANS = [
  {
    name:"Essential",sub:"Annual license & visa renewals",amount:"AED 3,500",period:"per year · up to 3 visas",featured:false,
    badge:"Entry",
    feats:[
      ["Annual license renewal management",true],
      ["Up to 3 visa renewals",true],
      ["Emirates ID renewals",true],
      ["Expiry date tracking",true],
      ["Email support",true],
      ["Dedicated relationship manager",false],
      ["Share transfers & amendments",false],
      ["Government authority visits",false],
      ["Priority same-day response",false],
    ],
  },
  {
    name:"Advisory",sub:"Full PRO + amendment coverage",amount:"AED 7,200",period:"per year · up to 8 visas",featured:true,
    badge:"Most Popular",
    feats:[
      ["Annual license renewal management",true],
      ["Up to 8 visa renewals",true],
      ["Emirates ID renewals",true],
      ["Dedicated relationship manager",true],
      ["Unlimited government authority visits",true],
      ["2 corporate amendments included",true],
      ["Priority same-day response",true],
      ["Share transfers & amendments",false],
      ["Annual corporate structure review",false],
    ],
  },
  {
    name:"Corporate",sub:"Full-scope ongoing management",amount:"AED 14,500",period:"per year · unlimited visas",featured:false,
    badge:"Full Service",
    feats:[
      ["Unlimited visa renewals",true],
      ["Dedicated senior relationship manager",true],
      ["Unlimited government authority visits",true],
      ["Unlimited corporate amendments",true],
      ["Share transfers included",true],
      ["Priority same-day response",true],
      ["Annual corporate structure review",true],
      ["Document custody & archive",true],
      ["Quarterly compliance check",true],
    ],
  },
];

const FAQS = [
  { q:"What is a PRO service and why do I need one?", a:"PRO stands for Public Relations Officer — in UAE corporate context, it refers to professional government liaison services. A PRO handles all physical interactions with government authorities on your behalf: DED, GDRFA, ICA, MOFA, MOHRE, and free zone authorities. Without a PRO, company owners must personally attend government offices — often requiring pre-booked appointments, Arabic-language interaction, and knowledge of specific procedures. INCOZONE's PRO team eliminates this entirely." },
  { q:"Can I handle my own license renewal without INCOZONE?", a:"Technically yes — but in practice, UAE license renewals involve multiple interconnected steps: confirming visa validity for all shareholders, clearing any outstanding fines, obtaining the correct renewal forms, making the right fee payment, and collecting the renewed license. A single missed step can result in a grace period lapse, which carries AED 500–1,000 per month in penalties. INCOZONE's 60-day advance renewal system means this risk is eliminated." },
  { q:"How does a share transfer work in a UAE free zone?", a:"A share transfer in a UAE free zone requires: a Share Purchase Agreement signed by buyer and seller, a Board Resolution authorising the transfer, updated corporate documents (MOA amendment), KYC documents for the new shareholder, and authority approval from the relevant free zone. Some free zones also require a No Objection Certificate from any UAE bank holding the company's account.", list:["Average timeline: 7–15 business days","Authority fees: AED 1,500–4,000 depending on zone","INCOZONE fee: disclosed upfront before engagement","Result: updated license, new share certificates, amended MOA"] },
  { q:"What documents do I need to renew my UAE investor visa?", a:"For a standard investor visa renewal: current passport (minimum 6 months validity), existing Emirates ID, company license copy, establishment card copy, and entry permit if the current visa has expired. If you are outside the UAE when your visa expires, re-entry requires a new entry permit before renewal can proceed. INCOZONE tracks all of this proactively." },
  { q:"What is an Establishment Card and do I need one?", a:"An Establishment Card (also called a Company Immigration Card) is a mandatory document for all UAE companies wishing to sponsor employee visas. It is issued by GDRFA (General Directorate of Residency and Foreigners Affairs) and must be renewed annually alongside the trade license. Without a current Establishment Card, no new employee visa applications can be processed." },
  { q:"How long does it take to add a new activity to my license?", a:"Adding a new licensed activity typically takes 2–5 business days for most free zones and DED. Some activities require additional regulatory approvals — healthcare, education, financial services, food — which can extend the timeline to 2–4 weeks. INCOZONE identifies any additional approval requirements upfront so there are no timeline surprises." },
  { q:"What is UBO registration and is it mandatory?", a:"UBO (Ultimate Beneficial Owner) registration is mandatory for all UAE companies under Federal Decree Law No. 13 of 2023. Every UAE company must register the natural persons who ultimately own or control 25% or more of the company — directly or indirectly. Failure to maintain accurate UBO records can result in significant fines and authority sanctions. INCOZONE manages UBO compliance as part of all annual renewal and corporate amendment engagements." },
  { q:"Can you handle PRO services for companies we did not originally incorporate?", a:"Yes — INCOZONE takes on PRO mandates for existing companies regardless of who formed them. We conduct an initial corporate health check to review all documents, expiry dates, and compliance status before assuming responsibility. Most clients migrating from other service providers are surprised by the number of minor compliance gaps we identify in the initial review." },
];

// ── HERO CANVAS ────────────────────────────────────────────────
function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let W, H, raf, t = 0;
    const pts = Array.from({length:55},()=>({
      x:Math.random()*1920, y:Math.random()*1080,
      vx:(Math.random()-.5)*.18, vy:(Math.random()-.5)*.18,
      r:Math.random()*1.3+.3, o:Math.random()*.38+.12,
    }));
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      t+=.003; ctx.clearRect(0,0,W,H);
      const bg = ctx.createLinearGradient(0,0,W,H);
      bg.addColorStop(0,"#05111e"); bg.addColorStop(1,"#020b14");
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
      [[.08,.45,"#C9A84C",.055,13],[.92,.22,"#163354",.42,10],[.5,.7,"#C9A84C",.03,16]].forEach(([bx,by,col,a,spd],i)=>{
        const x=W*bx+Math.sin(t*(spd/10)+i*2.1)*75, y=H*by+Math.cos(t*(spd/13)+i)*55;
        const r=Math.min(W,H)*.56;
        const g=ctx.createRadialGradient(x,y,0,x,y,r);
        const rgb=parseInt(col.slice(1),16);
        g.addColorStop(0,`rgba(${rgb>>16},${(rgb>>8)&255},${rgb&255},${a})`);
        g.addColorStop(1,"rgba(0,0,0,0)");
        ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
      });
      ctx.strokeStyle="rgba(201,168,76,0.028)"; ctx.lineWidth=1;
      for(let x=0;x<W;x+=88){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
      for(let y=0;y<H;y+=88){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
      for(let i=0;i<pts.length;i++){
        const p=pts[i]; p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        for(let j=i+1;j<pts.length;j++){
          const q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.sqrt(dx*dx+dy*dy);
          if(d<175){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(201,168,76,${.075*(1-d/175)})`;ctx.lineWidth=.45;ctx.stroke();}
        }
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(201,168,76,${p.o})`;ctx.fill();
      }
      const vg=ctx.createRadialGradient(W/2,H/2,H*.15,W/2,H/2,H*.88);
      vg.addColorStop(0,"transparent"); vg.addColorStop(1,"rgba(2,11,20,0.62)");
      ctx.fillStyle=vg; ctx.fillRect(0,0,W,H);
      raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={ref} className="pro-hero-canvas" style={{width:"100%",height:"100%",position:"absolute",inset:0}} />;
}

function useReveal() {
  useEffect(()=>{
    const els=document.querySelectorAll(".pro-reveal");
    const obs=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add("in");obs.unobserve(e.target);}
    }),{threshold:.07});
    els.forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  });
}

// ── MAIN ──────────────────────────────────────────────────────
export default function PROPage({ onBack, onNavigate }) {
  const [_proOpen, setproOpen] = useState(false);
  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = _proOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [_proOpen]);

  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [openCat, setOpenCat] = useState(0);
  useReveal();

  useEffect(()=>{
    window.scrollTo(0,0);
    const h=()=>setScrolled(window.scrollY>40);
    window.addEventListener("scroll",h);
    return()=>window.removeEventListener("scroll",h);
  },[]);

  return (
    <div className="pro-root">
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className={`pro-nav${scrolled?" scrolled":""}`}>
        <div className="pro-nav-logo" onClick={()=>{if(onNavigate){onNavigate("home");window.scrollTo(0,0);}}}>INCO<em>ZONE</em></div>
        <ul className="pro-nav-links">{["Services","Free Zones","About","Blog","Contact"].map(l=>{const pgMap={"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};return <li key={l}><a href="#" onClick={e=>{e.preventDefault();if(onNavigate){onNavigate(pgMap[l]);window.scrollTo(0,0);}}}>{ l}</a></li>;})}</ul>
        <button className="pro-nav-cta" onClick={()=>{if(onNavigate){onNavigate("schedule");window.scrollTo(0,0);}}}>Schedule Consultation</button>
      
        {/* Hamburger */}
        <button
          className={`pro-nav-hamburger${_proOpen ? " open" : ""}`}
          onClick={() => setproOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`pro-drawer${_proOpen ? " open" : ""}`}>
        <div className="pro-drawer-brand"
          onClick={() => { setproOpen(false); if(onNavigate) { onNavigate("home"); window.scrollTo(0,0); } }}>
          INCO<em>ZONE</em>
        </div>
        {["Services","Free Zones","About","Blog","Contact"].map((l) => {
          const pm = {"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};
          return (
            <button key={l} className="pro-dlink"
              onClick={() => { setproOpen(false); if(onNavigate) { onNavigate(pm[l]); window.scrollTo(0,0); } }}>
              {l}
            </button>
          );
        })}
        <div className="pro-drawer-div" />
        <button className="pro-dcta"
          onClick={() => { setproOpen(false); if(onNavigate) { onNavigate("schedule"); window.scrollTo(0,0); } }}>
          Schedule Consultation
        </button>
      </div>

      {/* ── HERO ── */}
      <section className="pro-hero">
        <HeroCanvas />
        <div className="pro-hero-rule" />
        <button className="pro-back-btn" onClick={onBack}>Back to Services</button>

        <div className="pro-hero-content">
          <div className="pro-hero-left">
            <div className="pro-hero-badge">
              <span className="pro-hero-badge-num">03</span>
              <span className="pro-hero-badge-label">Corporate & PRO Advisory</span>
            </div>
            <h1 className="pro-hero-h1">
              Your Company.
              <span className="row2">Always</span>
              <span className="row3">Compliant.</span>
            </h1>
          </div>
          <div className="pro-hero-right">
            <span className="pro-hero-right-label">The Complete Picture</span>
            <p>
              Amendments, share transfers, visa processing, and complete government service management — handled by <strong>dedicated relationship managers</strong> who know your company, your history, and every relevant authority contact. Ongoing protection, not just one-time setup.
            </p>
            <div className="pro-hero-actions">
              <button className="pro-btn-gold">Speak to an Advisor →</button>
              <button className="pro-btn-ghost">View Retainer Plans</button>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="pro-marquee-wrap">
          <div className="pro-marquee-track">
            {[...MARQUEE_ITEMS,...MARQUEE_ITEMS,...MARQUEE_ITEMS,...MARQUEE_ITEMS].map((item,i)=>(
              <div className="pro-marquee-item" key={i}>
                <em>{item}</em>
                <div className="pro-marquee-dot"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="pro-intro">
        <span className="pro-section-label pro-reveal">What is PRO Advisory</span>
        <div className="pro-intro-grid">
          <div className="pro-intro-left pro-reveal">
            <p className="pro-pull-quote">
              "Most companies experience their <strong>first compliance problem</strong> 12–18 months after setup — when a visa expires unnoticed, a license lapses, or a shareholding change is handled without the correct documentation."
            </p>
            <div className="pro-intro-body">
              <p>Setting up a UAE company is the beginning, not the end. Every free zone and mainland company has an ongoing compliance calendar — license renewals, visa renewals, establishment card renewals, UBO filings, and ESR obligations — each with its own deadline, its own authority, and its own consequence for missing it.</p>
              <p>INCOZONE's Corporate & PRO Advisory service turns this complexity into a <strong>managed, invisible system.</strong> You receive renewal confirmations, not renewal panics. Amendment completions, not government correspondence you don't understand. A dedicated relationship manager who knows your company and anticipates what needs to happen before you need to ask.</p>
              <p>For companies with shareholders across multiple time zones, with structures that have evolved since initial setup, or with management that simply has more important things to manage — <strong>INCOZONE is your UAE corporate operations team.</strong></p>
            </div>
          </div>
          <div className="pro-intro-right pro-reveal pd2">
            <div className="pro-intro-metrics">
              {[
                {val:"1,200+",label:"Transactions annually"},
                {val:"96%",label:"Client retention rate"},
                {val:"60",label:"Days advance renewal"},
                {val:"<4hr",label:"Avg query response"},
              ].map((m,i)=>(
                <div className="pro-metric" key={i}>
                  <span className="pro-metric-val">{m.val}</span>
                  <span className="pro-metric-label">{m.label}</span>
                </div>
              ))}
            </div>
            <div className="pro-included-note">
              <div className="pro-included-note-title">What Every Engagement Includes</div>
              <div className="pro-included-list">
                {[
                  "Named relationship manager for your company",
                  "Proactive expiry tracking across all documents",
                  "Direct authority access — not just portal submissions",
                  "Same business day response to all queries",
                  "Secure document custody and archive",
                  "Annual corporate compliance review",
                ].map(item=>(
                  <div className="pro-included-item" key={item}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES MATRIX ── */}
      <section className="pro-matrix">
        <div className="pro-matrix-header">
          <div className="pro-reveal">
            <span className="pro-section-label">Services Covered</span>
            <h2 className="pro-h2">Every government<br />touchpoint. <em>Managed.</em></h2>
          </div>
          <div className="pro-reveal pd2">
            <p className="pro-matrix-desc">From same-day document attestation to multi-week share transfer processes — <strong>every interaction with a UAE government authority</strong> is within INCOZONE's scope.</p>
          </div>
        </div>
        <div className="pro-mosaic">
          {MOSAIC_SERVICES.map((s,i)=>(
            <div className={`pro-mosaic-card pro-reveal pd${(i%3)+1}${s.tall?" tall":""}`} key={i}>
              <span className="pro-mosaic-cat">{s.cat}</span>
              <div className="pro-mosaic-icon">{s.icon}</div>
              <div className="pro-mosaic-title">{s.title}</div>
              <p className="pro-mosaic-desc">{s.desc}</p>
              <div className="pro-mosaic-items">
                {s.items.map(item=><div className="pro-mosaic-item" key={item}>{item}</div>)}
              </div>
              <div className="pro-mosaic-time">{s.time}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── RELATIONSHIP MODEL ── */}
      <section className="pro-rm">
        <div className="pro-rm-inner">
          <div className="pro-rm-header">
            <div className="pro-reveal">
              <span className="pro-section-label">The RM Model</span>
              <h2 className="pro-h2">One person.<br /><em>Everything handled.</em></h2>
            </div>
            <div className="pro-reveal pd2">
              <p className="pro-rm-intro">Your Relationship Manager is not a call centre agent reading from a script. They are a <strong>UAE corporate specialist who knows your company's history</strong> — your shareholders, your license category, your authority relationships — and manages your compliance proactively, not reactively.</p>
            </div>
          </div>
          <div className="pro-rm-grid">
            {RM_CARDS.map((c,i)=>(
              <div className={`pro-rm-card pro-reveal pd${(i%3)+1}`} key={i}>
                <div className="pro-rm-card-num">{c.num}</div>
                <div className="pro-rm-card-title">{c.title}</div>
                <p className="pro-rm-card-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AMENDMENTS ── */}
      <section className="pro-amendments">
        <span className="pro-section-label pro-reveal">Amendments & Changes</span>
        <h2 className="pro-h2 pro-reveal pd1" style={{maxWidth:600,marginBottom:0}}>
          Every amendment type.<br /><em>Handled precisely.</em>
        </h2>
        <div className="pro-amend-layout">
          <div className="pro-amend-sticky pro-reveal">
            <p className="pro-amend-intro">UAE corporate amendments are not difficult — but they are <strong>procedurally exact.</strong> A missed Board Resolution, an incorrectly drafted MOA amendment, or the wrong sequence of authority approvals adds weeks to what should be a straightforward change. INCOZONE's amendment team processes over 600 corporate amendments annually.</p>
            <div className="pro-amend-stat-box">
              <span className="pro-amend-stat-box-label">Amendment Benchmarks</span>
              {[
                ["Activity addition","2–5 days"],
                ["Director change","3–7 days"],
                ["Share transfer","7–15 days"],
                ["Trade name change","3–8 days"],
                ["Capital amendment","5–12 days"],
                ["MOA amendment","5–10 days"],
              ].map(([l,v])=>(
                <div className="pro-amend-stat-row" key={l}>
                  <span>{l}</span><span>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pro-amend-cats">
            {AMEND_CATS.map((cat,i)=>(
              <div className={`pro-amend-cat pro-reveal pd${(i%3)+1}${openCat===i?" open":""}`} key={i}>
                <div className="pro-amend-cat-header" onClick={()=>setOpenCat(openCat===i?null:i)}>
                  <div className="pro-amend-cat-icon">{cat.icon}</div>
                  <div className="pro-amend-cat-title">{cat.title}</div>
                  <div className="pro-amend-cat-arrow">+</div>
                </div>
                <div className="pro-amend-cat-body">
                  <div className="pro-amend-cat-inner">
                    <p className="pro-amend-cat-desc">{cat.desc}</p>
                    <div className="pro-amend-items-grid">
                      {cat.items.map(item=>(
                        <div className="pro-amend-item" key={item}>{item}</div>
                      ))}
                    </div>
                    <div className="pro-amend-time-tag">{cat.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISA SECTION ── */}
      <section className="pro-visa">
        <span className="pro-section-label pro-reveal">Visa Processing</span>
        <h2 className="pro-h2 pro-reveal pd1" style={{marginBottom:0}}>
          Every visa type. <em>Step by step.</em>
        </h2>
        <div className="pro-visa-grid">
          {VISA_TYPES.map((v,i)=>(
            <div className={`pro-visa-card pro-reveal pd${i+1}`} key={i}>
              <span className="pro-visa-card-tag">{v.tag}</span>
              <div className="pro-visa-card-title">
                {v.title.split("\n").map((line,j)=><span key={j} style={{display:"block"}}>{line}</span>)}
              </div>
              <div className="pro-visa-card-subtitle">{v.subtitle}</div>
              <div className="pro-visa-steps">
                {v.steps.map((s,j)=>(
                  <div className="pro-visa-step" key={j}>
                    <div className="pro-visa-step-dot"/>
                    <div>
                      <div className="pro-visa-step-text">{s.text}</div>
                      <div className="pro-visa-step-time">{s.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pro-visa-card-meta">
                <div className="pro-visa-card-meta-timeline">{v.timeline}</div>
                <div className="pro-visa-card-cost">{v.cost}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── RETAINER PLANS ── */}
      <section className="pro-retainer">
        <span className="pro-section-label pro-reveal">Annual Retainer Plans</span>
        <h2 className="pro-h2 pro-reveal pd1" style={{marginBottom:0}}>
          Ongoing coverage.<br /><em>Predictable cost.</em>
        </h2>
        <p className="pro-reveal pd2" style={{fontSize:".84rem",color:"var(--w60)",marginTop:"12px",maxWidth:520,lineHeight:1.8}}>Annual retainer plans replace unpredictable per-transaction billing with a fixed, comprehensive service. All plans include renewal management and a dedicated RM.</p>
        <div className="pro-retainer-grid">
          {PLANS.map((p,i)=>(
            <div className={`pro-plan pro-reveal pd${i+1}${p.featured?" featured":""}`} key={i}>
              <div className="pro-plan-badge">{p.badge}</div>
              <div className="pro-plan-name">{p.name}</div>
              <p className="pro-plan-sub">{p.sub}</p>
              <div className="pro-plan-price">
                <div className="pro-plan-amount">{p.amount}</div>
                <div className="pro-plan-period">{p.period}</div>
              </div>
              <ul className="pro-plan-features">
                {p.feats.map(([t,on],j)=>(
                  <li className="pro-plan-feat" key={j}>
                    <span className={on?"pro-feat-on":"pro-feat-off"}>{on?"":"×"}</span>
                    <span className={on?"pro-feat-label-on":"pro-feat-label-off"}>{t}</span>
                  </li>
                ))}
              </ul>
              <button className="pro-plan-btn">{p.featured?"Select Advisory Plan →":"Get Started →"}</button>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="pro-faq">
        <span className="pro-section-label pro-reveal" style={{textAlign:"center",display:"block"}}>FAQ</span>
        <h2 className="pro-h2 pro-reveal pd1" style={{textAlign:"center"}}>Frequently Asked <em>Questions</em></h2>
        <div className="pro-faq-inner">
          {FAQS.map((f,i)=>(
            <div className={`pro-faq-item pro-reveal pd${(i%3)+1}${openFaq===i?" open":""}`} key={i}>
              <button className="pro-faq-q" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                <span className="pro-faq-q-text">{f.q}</span>
                <div className="pro-faq-icon">+</div>
              </button>
              <div className="pro-faq-answer">
                <div className="pro-faq-answer-inner">
                  <p>{f.a}</p>
                  {f.list&&<ul>{f.list.map(li=><li key={li}>{li}</li>)}</ul>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="pro-cta">
        <div className="pro-cta-inner">
          <span className="pro-cta-label pro-reveal">Take Control</span>
          <h2 className="pro-cta-h2 pro-reveal pd1">Stop managing<br /><em>government paperwork.</em></h2>
          <div className="pro-cta-divider"/>
          <p className="pro-cta-p pro-reveal pd2">Hand over your corporate compliance calendar to INCOZONE. Your relationship manager takes it from here — proactively, precisely, and without surprises.</p>
          <div className="pro-cta-btns pro-reveal pd3">
            <button className="pro-btn-ink">Speak to an Advisor Today</button>
            <button className="pro-btn-cream-out" onClick={onBack}>← Back to Services</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="pro-footer">
        <div className="pro-footer-inner">
          <div className="pro-footer-logo">INCO<em>ZONE</em></div>
          <div className="pro-footer-copy">© 2025 INCOZONE. All rights reserved. Dubai, UAE.</div>
          <button className="pro-footer-back" onClick={onBack}>← Back to Services</button>
        </div>
      </footer>

      {/* ── WA ── */}
      <div className="pro-wa" onClick={()=>window.open("https://wa.me/971565834586","_blank")}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </div>
    </div>
  );
}
