import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Services Page
//  Unique editorial layout · Same navy/gold palette
//  Drop into: src/pages/Services.jsx
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500&family=Playfair+Display:ital,wght@1,400;1,500&display=swap');

.srv-root *, .srv-root *::before, .srv-root *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}

.srv-root {
  --n950: #020b14; --n900: #05111e; --n800: #091928; --n750: #0c2033;
  --n700: #102540; --n600: #163354;
  --g400: #C9A84C; --g300: #D4B468; --g200: #E2CC98; --g100: #F0E4C0;
  --glow: rgba(201,168,76,0.14); --glow2: rgba(201,168,76,0.07); --glow3: rgba(201,168,76,0.04);
  --cream-bg: #FAF6EE; --cream-100: #F4ECD8; --cream-ink: #1A120A;
  --cream-ink2: #3D2E1A; --cream-ink3: #7A6040; --cream-bdr: rgba(180,150,90,0.22);
  --w: #F8F5EE; --w80: rgba(248,245,238,0.80); --w60: rgba(248,245,238,0.60);
  --w30: rgba(248,245,238,0.30); --w12: rgba(248,245,238,0.12); --w06: rgba(248,245,238,0.06);
  --fd: 'Cormorant Garamond', Georgia, serif;
  --fp: 'Playfair Display', Georgia, serif;
  --fb: 'DM Sans', system-ui, sans-serif;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  --ease2: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  font-family: var(--fb); font-weight: 300; color: var(--w);
  background: var(--n900); overflow-x: hidden; width: 100%;
}

/* ── NAV ─────────────────────────────────────────────────────── */
.srv-nav {
  position: fixed; inset-inline: 0; top: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 60px;
  transition: background 0.5s, padding 0.4s, border-color 0.5s;
  border-bottom: 1px solid transparent;
}
.srv-nav.scrolled {
  background: rgba(5,17,30,0.96); backdrop-filter: blur(20px);
  padding: 14px 60px; border-bottom-color: rgba(201,168,76,0.12);
}
.srv-nav-logo { font-family: var(--fd); font-size: 1.5rem; font-weight: 500; letter-spacing: 0.15em; color: var(--w); cursor: pointer; text-decoration: none; }
.srv-nav-logo em { color: var(--g400); font-style: normal; }
.srv-nav-links { display: flex; gap: 36px; list-style: none; }
.srv-nav-links a { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--w60); text-decoration: none; transition: color 0.3s; }
.srv-nav-links a:hover, .srv-nav-links a.active { color: var(--g400); }
.srv-nav-cta { font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; background: transparent; border: 1px solid var(--g400); color: var(--g400); padding: 9px 22px; cursor: pointer; font-family: var(--fb); transition: background 0.3s, color 0.3s; }
.srv-nav-cta:hover { background: var(--g400); color: var(--n900); }

/* ── HERO ────────────────────────────────────────────────────── */
.srv-hero {
  min-height: 100vh; position: relative; overflow: hidden;
  display: flex; flex-direction: column; justify-content: center;
  padding: 120px 60px 80px;
}
.srv-hero-canvas { position: absolute; inset: 0; z-index: 0; }

.srv-hero-inner { position: relative; z-index: 2; max-width: 900px; }

.srv-hero-overline {
  display: flex; align-items: center; gap: 16px; margin-bottom: 28px;
  opacity: 0; animation: srvUp 0.9s var(--ease) 0.4s forwards;
}
.srv-hero-overline-line { width: 44px; height: 1px; background: var(--g400); }
.srv-hero-overline span { font-size: 0.62rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--g400); }

.srv-hero-h1 {
  font-family: var(--fd); font-weight: 300; line-height: 1.0;
  letter-spacing: -0.02em; color: var(--w);
  font-size: clamp(2.8rem, 5vw, 5.2rem);
  opacity: 0; animation: srvUp 1s var(--ease) 0.6s forwards;
}
.srv-hero-h1 .line-2 { display: block; padding-left: 40px; color: var(--g400); font-style: italic; }
.srv-hero-h1 .line-3 { display: block; padding-left: 80px; }

.srv-hero-sub {
  margin-top: 36px; max-width: 480px;
  font-size: 0.86rem; color: var(--w60); line-height: 1.9;
  opacity: 0; animation: srvUp 0.9s var(--ease) 0.85s forwards;
}
.srv-hero-sub strong { color: var(--w); font-weight: 400; }

.srv-hero-scroll {
  position: absolute; right: 60px; bottom: 80px; z-index: 2;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  opacity: 0; animation: srvUp 0.9s var(--ease) 1.1s forwards;
}
.srv-hero-scroll span { font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--w30); writing-mode: vertical-rl; }
.srv-hero-scroll-track { width: 1px; height: 60px; background: var(--w12); position: relative; overflow: hidden; }
.srv-hero-scroll-fill { position: absolute; top: -100%; width: 100%; height: 100%; background: linear-gradient(to bottom, transparent, var(--g400)); animation: srvScroll 2s ease-in-out infinite; }
@keyframes srvScroll { 0% { top: -100%; } 100% { top: 100%; } }

/* ── INTRO BAND ──────────────────────────────────────────────── */
.srv-intro-band {
  background: var(--n950); padding: 32px 60px;
  border-top: 1px solid var(--w06); border-bottom: 1px solid var(--w06);
  display: flex; align-items: center; justify-content: space-between; gap: 40px;
  overflow: hidden;
}
.srv-intro-band-text { font-size: 0.78rem; color: var(--w30); letter-spacing: 0.08em; flex-shrink: 0; }
.srv-intro-band-pills { display: flex; gap: 10px; flex-wrap: wrap; }
.srv-intro-band-pill { font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase; padding: 6px 14px; border: 1px solid var(--w12); color: var(--w60); transition: all 0.3s; cursor: default; }
.srv-intro-band-pill:hover { border-color: var(--g400); color: var(--g400); }
.srv-intro-band-count { font-family: var(--fd); font-size: 2.2rem; font-weight: 300; color: var(--g400); flex-shrink: 0; }
.srv-intro-band-count span { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--w30); display: block; font-family: var(--fb); margin-top: 2px; }

/* ── SERVICES LIST ───────────────────────────────────────────── */
.srv-list { background: var(--n900); }

/* Section header */
.srv-list-header {
  padding: 80px 60px 0;
  display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: end;
}
.srv-list-header-left { }
.srv-list-header-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--g400); margin-bottom: 14px; display: block; }
.srv-list-header-h2 { font-family: var(--fd); font-size: clamp(2.2rem, 4vw, 3.8rem); font-weight: 300; line-height: 1.1; color: var(--w); }
.srv-list-header-h2 em { color: var(--g400); font-style: italic; }
.srv-list-header-right { padding-bottom: 8px; }
.srv-list-header-desc { font-size: 0.84rem; color: var(--w60); line-height: 1.88; }
.srv-list-header-desc strong { color: var(--w); font-weight: 400; }

/* Individual service item — editorial horizontal layout */
.srv-items { padding: 60px 0 0; }

.srv-item {
  display: grid;
  grid-template-columns: 120px 1fr 1fr 200px;
  gap: 0;
  padding: 0 60px;
  border-top: 1px solid var(--w06);
  position: relative;
  transition: background 0.5s var(--ease);
  cursor: pointer;
  overflow: hidden;
}
.srv-item::before {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, var(--glow3), transparent 60%);
  opacity: 0; transition: opacity 0.5s var(--ease);
  pointer-events: none;
}
.srv-item:hover { background: rgba(9,25,40,0.8); }
.srv-item:hover::before { opacity: 1; }
.srv-item:last-child { border-bottom: 1px solid var(--w06); }

/* Gold left accent line */
.srv-item::after {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  background: linear-gradient(to bottom, transparent, var(--g400), transparent);
  transform: scaleY(0); transform-origin: center;
  transition: transform 0.5s var(--ease);
}
.srv-item:hover::after { transform: scaleY(1); }

/* Column 1 — giant number */
.srv-item-num {
  padding: 52px 0; display: flex; align-items: flex-start;
}
.srv-item-num-inner {
  font-family: var(--fd); font-size: 5.5rem; font-weight: 300;
  line-height: 1; color: transparent;
  -webkit-text-stroke: 1px rgba(201,168,76,0.2);
  transition: color 0.4s var(--ease), -webkit-text-stroke-color 0.4s;
  position: relative;
}
.srv-item:hover .srv-item-num-inner {
  color: rgba(201,168,76,0.12);
  -webkit-text-stroke-color: rgba(201,168,76,0.5);
}

/* Column 2 — title area */
.srv-item-title-col {
  padding: 52px 48px 52px 0; border-left: 1px solid var(--w06);
  padding-left: 40px;
}
.srv-item-category {
  font-size: 0.58rem; letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--g400); margin-bottom: 16px; display: block;
  opacity: 0.7; transition: opacity 0.3s;
}
.srv-item:hover .srv-item-category { opacity: 1; }
.srv-item-title {
  font-family: var(--fd); font-size: clamp(1.6rem, 2.5vw, 2.4rem);
  font-weight: 400; line-height: 1.15; color: var(--w);
  margin-bottom: 0; letter-spacing: -0.01em;
  transition: color 0.3s;
}
.srv-item:hover .srv-item-title { color: var(--g300); }
.srv-item-title em { font-style: italic; color: var(--g400); font-weight: 300; }

/* Expanding underline on hover */
.srv-item-title-underline {
  width: 0; height: 1px; background: var(--g400);
  margin-top: 14px; transition: width 0.5s var(--ease);
}
.srv-item:hover .srv-item-title-underline { width: 100%; }

/* Column 3 — description + tags */
.srv-item-desc-col {
  padding: 52px 48px; border-left: 1px solid var(--w06);
}
.srv-item-desc {
  font-size: 0.84rem; color: var(--w60); line-height: 1.88;
  margin-bottom: 24px; max-width: 440px;
}
.srv-item-desc strong { color: var(--w80); font-weight: 400; }
.srv-item-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.srv-item-tag {
  font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase;
  padding: 5px 11px; border: 1px solid var(--w06); color: var(--w30);
  transition: all 0.3s;
}
.srv-item:hover .srv-item-tag { border-color: rgba(201,168,76,0.2); color: var(--w60); }

/* Column 4 — CTA + stat */
.srv-item-cta-col {
  padding: 52px 0 52px 48px; border-left: 1px solid var(--w06);
  display: flex; flex-direction: column; justify-content: space-between; align-items: flex-start;
}
.srv-item-stat { }
.srv-item-stat-val {
  font-family: var(--fd); font-size: 3rem; font-weight: 300;
  color: rgba(201,168,76,0.2); line-height: 1;
  transition: color 0.4s var(--ease);
}
.srv-item:hover .srv-item-stat-val { color: var(--g400); }
.srv-item-stat-label { font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--w30); margin-top: 4px; }
.srv-item-cta {
  display: flex; align-items: center; gap: 10px;
  font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--w30); background: none; border: none; cursor: pointer;
  font-family: var(--fb); padding: 0; transition: color 0.3s;
}
.srv-item:hover .srv-item-cta { color: var(--g400); }
.srv-item-cta-arrow {
  width: 28px; height: 28px; border: 1px solid var(--w12); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; transition: all 0.4s var(--ease);
}
.srv-item:hover .srv-item-cta-arrow {
  background: var(--g400); border-color: var(--g400); color: var(--n900);
  transform: rotate(45deg);
}

/* ── PROCESS SECTION ─────────────────────────────────────────── */
.srv-process { background: var(--n800); padding: 100px 60px; }
.srv-process-header { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-bottom: 72px; align-items: end; }
.srv-process-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--g400); margin-bottom: 14px; display: block; }
.srv-process-h2 { font-family: var(--fd); font-size: clamp(2rem, 3.5vw, 3.4rem); font-weight: 300; line-height: 1.1; color: var(--w); }
.srv-process-h2 em { color: var(--g400); font-style: italic; }
.srv-process-intro { font-size: 0.84rem; color: var(--w60); line-height: 1.88; }

.srv-process-steps {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
  background: var(--w06);
}
.srv-process-step {
  background: var(--n800); padding: 48px 36px;
  transition: background 0.3s; position: relative; overflow: hidden;
}
.srv-process-step:hover { background: var(--n750); }
.srv-process-step-num {
  font-family: var(--fd); font-size: 4.5rem; font-weight: 300;
  line-height: 1; color: rgba(201,168,76,0.12); margin-bottom: 28px;
  transition: color 0.4s;
}
.srv-process-step:hover .srv-process-step-num { color: rgba(201,168,76,0.25); }
.srv-process-step-title { font-size: 0.92rem; font-weight: 500; color: var(--w); margin-bottom: 12px; }
.srv-process-step-desc { font-size: 0.77rem; color: var(--w60); line-height: 1.75; }
.srv-process-step-time {
  margin-top: 20px; font-size: 0.6rem; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--g400);
  padding-top: 16px; border-top: 1px solid var(--w06);
}

/* ── TRUST STRIP ─────────────────────────────────────────────── */
.srv-trust { background: var(--cream-bg); padding: 80px 60px; position: relative; overflow: hidden; }
.srv-trust::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 70% 80% at 50% 50%, rgba(201,168,76,0.06), transparent);
  pointer-events: none;
}
.srv-trust-inner { position: relative; z-index: 1; }
.srv-trust-header { text-align: center; margin-bottom: 60px; }
.srv-trust-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: #8A6820; margin-bottom: 14px; display: block; }
.srv-trust-h2 { font-family: var(--fd); font-size: clamp(2rem, 3.5vw, 3.2rem); font-weight: 300; color: var(--cream-ink); line-height: 1.15; }
.srv-trust-h2 em { color: var(--g400); font-style: italic; }
.srv-trust-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--cream-bdr); }
.srv-trust-card {
  background: var(--cream-bg); padding: 44px 40px;
  transition: background 0.3s;
}
.srv-trust-card:hover { background: var(--cream-100); }
.srv-trust-card-icon { font-size: 2rem; margin-bottom: 20px; }
.srv-trust-card-num {
  font-family: var(--fd); font-size: 3.2rem; font-weight: 300;
  color: var(--cream-ink); line-height: 1; margin-bottom: 6px;
}
.srv-trust-card-num em { color: var(--g400); font-style: normal; }
.srv-trust-card-title { font-size: 0.82rem; font-weight: 500; color: var(--cream-ink2); margin-bottom: 10px; }
.srv-trust-card-desc { font-size: 0.76rem; color: var(--cream-ink3); line-height: 1.75; }

/* ── ADVISORY STRIP ──────────────────────────────────────────── */
.srv-advisory {
  background: var(--n750); padding: 100px 60px;
  display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
  position: relative; overflow: hidden;
}
.srv-advisory::before {
  content: '"'; position: absolute;
  font-family: var(--fd); font-size: 28rem; line-height: 1;
  color: rgba(201,168,76,0.03); top: -40px; left: 40px;
  pointer-events: none; user-select: none;
}
.srv-advisory-left { position: relative; z-index: 1; }
.srv-advisory-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--g400); margin-bottom: 20px; display: block; }
.srv-advisory-quote {
  font-family: var(--fd); font-size: clamp(1.4rem, 2.5vw, 2.1rem);
  font-weight: 300; font-style: italic; line-height: 1.55;
  color: var(--w80); margin-bottom: 28px;
}
.srv-advisory-quote strong { color: var(--g400); font-style: normal; font-weight: 400; }
.srv-advisory-attr { font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--w30); display: flex; align-items: center; gap: 14px; }
.srv-advisory-attr::before { content: ''; display: block; width: 28px; height: 1px; background: var(--g400); }
.srv-advisory-right { position: relative; z-index: 1; }
.srv-advisory-promise {
  border: 1px solid var(--w12); padding: 44px 40px; background: var(--n900);
}
.srv-advisory-promise-title { font-family: var(--fd); font-size: 1.1rem; font-weight: 400; color: var(--w); margin-bottom: 28px; letter-spacing: 0.02em; }
.srv-advisory-promise-item { display: flex; gap: 16px; padding: 16px 0; border-bottom: 1px solid var(--w06); }
.srv-advisory-promise-item:last-child { border-bottom: none; }
.srv-advisory-promise-check { color: var(--g400); font-size: 0.7rem; flex-shrink: 0; margin-top: 3px; }
.srv-advisory-promise-text { font-size: 0.8rem; color: var(--w60); line-height: 1.65; }
.srv-advisory-promise-text strong { color: var(--w); font-weight: 400; }

/* ── CTA ─────────────────────────────────────────────────────── */
.srv-cta {
  background: var(--cream-bg); padding: 120px 60px; text-align: center;
  position: relative; overflow: hidden;
}
.srv-cta::before {
  content: ''; position: absolute; inset: 0;
  background-image: linear-gradient(rgba(180,150,90,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(180,150,90,0.05) 1px, transparent 1px);
  background-size: 60px 60px;
}
.srv-cta::after {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 65% 55% at 50% 50%, rgba(201,168,76,0.09), transparent);
  pointer-events: none;
}
.srv-cta-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
.srv-cta-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: #8A6820; margin-bottom: 20px; display: block; }
.srv-cta-h2 { font-family: var(--fd); font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 300; color: var(--cream-ink); line-height: 1.1; margin-bottom: 12px; }
.srv-cta-h2 em { color: var(--g400); font-style: italic; }
.srv-cta-divider { width: 44px; height: 1px; background: var(--g400); margin: 24px auto; opacity: 0.5; }
.srv-cta-p { font-size: 0.84rem; color: var(--cream-ink3); line-height: 1.85; margin-bottom: 48px; }
.srv-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.srv-btn-dark { padding: 15px 40px; background: var(--cream-ink); color: var(--cream-bg); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.srv-btn-dark:hover { background: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }
.srv-btn-outline { padding: 15px 40px; background: transparent; color: var(--cream-ink2); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--cream-bdr); cursor: pointer; transition: all 0.3s; }
.srv-btn-outline:hover { border-color: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }

/* ── FOOTER ──────────────────────────────────────────────────── */
.srv-footer { background: var(--n950); padding: 52px 60px; border-top: 1px solid var(--w06); }
.srv-footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
.srv-footer-logo { font-family: var(--fd); font-size: 1.3rem; letter-spacing: 0.15em; color: var(--w); }
.srv-footer-logo em { color: var(--g400); font-style: normal; }
.srv-footer-copy { font-size: 0.68rem; color: var(--w30); }

/* ── WA ──────────────────────────────────────────────────────── */
.srv-wa { position: fixed; bottom: 28px; right: 28px; z-index: 300; width: 50px; height: 50px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 18px rgba(37,211,102,0.4); transition: transform 0.3s; }
.srv-wa:hover { transform: scale(1.1); }

/* ── REVEAL ──────────────────────────────────────────────────── */
.srv-reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.85s var(--ease), transform 0.85s var(--ease); }
.srv-reveal.in { opacity: 1; transform: translateY(0); }
.sd1 { transition-delay: 0.05s; } .sd2 { transition-delay: 0.15s; }
.sd3 { transition-delay: 0.25s; } .sd4 { transition-delay: 0.35s; }

/* ── KEYFRAMES ───────────────────────────────────────────────── */
@keyframes srvUp { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }

/* ── RESPONSIVE ──────────────────────────────────────────────── */
@media(max-width:1200px) {
  .srv-item { grid-template-columns: 80px 1fr 1fr 160px; }
  .srv-item-num-inner { font-size: 4rem; }
}
@media(max-width:1000px) {
  .srv-item { grid-template-columns: 1fr; padding: 36px 60px; gap: 0; }
  .srv-item-num { padding: 0 0 12px; }
  .srv-item-num-inner { font-size: 3rem; }
  .srv-item-title-col, .srv-item-desc-col { border-left: none; padding: 20px 0; border-top: 1px solid var(--w06); }
  .srv-item-cta-col { border-left: none; padding: 20px 0; border-top: 1px solid var(--w06); flex-direction: row; justify-content: space-between; align-items: center; }
  .srv-list-header, .srv-process-header { grid-template-columns: 1fr; gap: 28px; }
  .srv-process-steps { grid-template-columns: repeat(2, 1fr); }
  .srv-trust-grid { grid-template-columns: 1fr; }
  .srv-advisory { grid-template-columns: 1fr; gap: 48px; }
}
@media(max-width:768px) {
  .srv-nav { padding: 16px 24px; } .srv-nav.scrolled { padding: 12px 24px; } .srv-nav-links { display: none; }
  .srv-hero { padding: 0 24px 72px; }
  .srv-hero-h1 .line-2 { padding-left: 32px; }
  .srv-hero-h1 .line-3 { padding-left: 64px; }
  .srv-hero-scroll { display: none; }
  .srv-intro-band { padding: 24px; flex-wrap: wrap; }
  .srv-list-header, .srv-process, .srv-trust, .srv-advisory, .srv-cta { padding-left: 24px; padding-right: 24px; }
  .srv-items .srv-item { padding: 32px 24px; }
  .srv-process-steps { grid-template-columns: 1fr; }
  .srv-footer { padding: 40px 24px; }
}

  .srv-nav-hamburger {
    display: none; flex-direction: column; gap: 5px; cursor: pointer;
    background: none; border: none; padding: 6px; z-index: 310;
  }
  .srv-nav-hamburger span {
    display: block; width: 24px; height: 1.5px; background: rgba(248,245,238,0.6);
    transition: all 0.35s cubic-bezier(0.16,1,0.3,1); transform-origin: center;
  }
  .srv-nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: #C9A84C; }
  .srv-nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .srv-nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: #C9A84C; }
  .srv-drawer {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(3,10,20,0.97); backdrop-filter: blur(24px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    transform: translateX(100%); transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
    pointer-events: none;
  }
  .srv-drawer.open { transform: translateX(0); pointer-events: all; }
  .srv-drawer-brand {
    font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.3rem;
    letter-spacing: .18em; color: #F8F5EE; margin-bottom: 44px;
    opacity: 0; transform: translateY(10px);
    transition: opacity .4s .1s, transform .4s .1s;
  }
  .srv-drawer.open .srv-drawer-brand { opacity: 1; transform: translateY(0); }
  .srv-drawer-brand em { color: #C9A84C; font-style: normal; }
  .srv-dlink {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2rem, 8vw, 3rem); font-weight: 300; color: rgba(248,245,238,0.6);
    background: none; border: none; padding: 10px 0; cursor: pointer;
    display: block; width: 100%; text-align: center;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, opacity .4s cubic-bezier(0.16,1,0.3,1), transform .4s cubic-bezier(0.16,1,0.3,1);
  }
  .srv-drawer.open .srv-dlink { opacity: 1; transform: translateY(0); }
  .srv-drawer.open .srv-dlink:nth-of-type(1) { transition-delay: .12s; }
  .srv-drawer.open .srv-dlink:nth-of-type(2) { transition-delay: .17s; }
  .srv-drawer.open .srv-dlink:nth-of-type(3) { transition-delay: .22s; }
  .srv-drawer.open .srv-dlink:nth-of-type(4) { transition-delay: .27s; }
  .srv-drawer.open .srv-dlink:nth-of-type(5) { transition-delay: .32s; }
  .srv-dlink:hover { color: #C9A84C; }
  .srv-drawer-div { width: 40px; height: 1px; background: rgba(201,168,76,.25); margin: 18px 0; opacity: 0; transition: opacity .4s .34s; }
  .srv-drawer.open .srv-drawer-div { opacity: 1; }
  .srv-dcta {
    font-family: 'DM Sans', sans-serif; font-size: .7rem; letter-spacing: .18em;
    text-transform: uppercase; color: #C9A84C; border: 1px solid #C9A84C;
    background: none; padding: 12px 32px; cursor: pointer; margin-top: 8px;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, background .3s, opacity .4s .38s, transform .4s .38s;
  }
  .srv-drawer.open .srv-dcta { opacity: 1; transform: translateY(0); }
  .srv-dcta:hover { background: #C9A84C; color: #05111e; }
  @media (max-width: 900px) {
    .srv-nav-links { display: none; }
    .srv-nav-cta { display: none !important; }
    .srv-nav-hamburger { display: flex; }
  }
`;

// ── DATA ──────────────────────────────────────────────────────
const SERVICES = [
  {
    num: "01",
    category: "Formation",
    title: "Free Zone\nIncorporation",
    desc: "Strategic establishment within UAE's premier free zones — <strong>DMCC, IFZA, Meydan, SHAMS, RAKEZ, JAFZA, AFZ, and ADGM.</strong> Full licensing, activity selection, and corporate document facilitation. We match your business model to the right zone from the first conversation — not the most profitable one for us.",
    tags: ["Trade License", "MOA & Articles", "Corporate Stamp", "Activity Selection", "Zone Advisory"],
    stat: "8",
    statLabel: "Free Zones",
    cta: "Explore Zones",
    page: "home",
  },
  {
    num: "02",
    category: "Mainland",
    title: "UAE Mainland\nSetup",
    desc: "DED-licensed mainland company formation — <strong>sole establishment, LLC structures, and professional licenses</strong> with full local sponsor and LSA arrangements. Ideal for businesses targeting the UAE domestic market, government contracts, or requiring a physical Dubai address without free zone restrictions.",
    tags: ["DED License", "LLC Formation", "Local Sponsor", "Professional License", "Branch Office"],
    stat: "3,200+",
    statLabel: "Companies",
    cta: "Learn More",
    page: "mainland",
  },
  {
    num: "03",
    category: "Residency & Immigration",
    title: "Visa &\nImmigration Services",
    desc: "Complete UAE visa management — <strong>investor visas, employment visas, dependent visas, visa renewals, and cancellations.</strong> Entry permit, medical fitness, biometric registration, Emirates ID, and residence stamping all managed under one roof. Average investor visa timeline: 10 working days.",
    tags: ["Investor Visa", "Employment Visa", "Dependent Visa", "Visa Renewal", "Visa Cancellation", "Emirates ID", "Entry Permit", "Medical Test"],
    stat: "10",
    statLabel: "Days Average",
    cta: "Get in Touch",
    page: "visaimmigration",
  },
  {
    num: "04",
    category: "Prestige Residency",
    title: "UAE Golden\nVisa",
    desc: "The UAE Golden Visa grants <strong>10-year renewable residency</strong> for investors, entrepreneurs, exceptional talent, and qualified professionals. No employer sponsorship needed — full independence. We manage the complete qualification assessment, application, and approval process. Applicable for real estate investors (AED 2M+), business owners, and high-net-worth individuals.",
    tags: ["10-Year Residency", "Investor Category", "Entrepreneur Route", "Talent Category", "Real Estate", "Self-Sponsored", "Family Inclusion"],
    stat: "10",
    statLabel: "Year Visa",
    cta: "Check Eligibility",
    page: "goldenvisa",
  },
  {
    num: "05",
    category: "Banking",
    title: "Corporate\nBanking Setup",
    desc: "Introductions to UAE's top corporate banks — <strong>ENBD, FAB, ADCB, Mashreq, RAKBank</strong> — with fully prepared documentation packages tailored to your business model. Source-of-funds letters, business plans, KYC packages curated to maximise approval probability. We know what each bank looks for and structure your application accordingly.",
    tags: ["Bank Introductions", "KYC Package", "Business Plan", "Source of Funds", "Trade Finance", "Multi-Currency"],
    stat: "95%",
    statLabel: "Approval Rate",
    cta: "Get in Touch",
    page: "banking",
  },
  {
    num: "06",
    category: "Operations",
    title: "PRO &\nGovernment Services",
    desc: "Your permanent government liaison in the UAE — <strong>license renewals, visa renewals, Emirates ID renewals, activity amendments, MOA updates, NOCs, attestations, MOHRE approvals, and authority submissions.</strong> Trusted by 500+ businesses for all routine and complex government transactions. No more queues. No more confusion.",
    tags: ["License Renewal", "Visa Renewal", "MOHRE Services", "Attestation", "NOC Services", "MOA Updates", "Authority Liaison"],
    stat: "1,200+",
    statLabel: "Transactions",
    cta: "Learn More",
    page: "pro",
  },
  {
    num: "07",
    category: "Restructuring",
    title: "Company\nAmendments",
    desc: "Shareholder changes, director appointments, activity expansions, trade name amendments, share transfers, and <strong>corporate restructuring across all UAE free zones and mainland.</strong> Whether it's a simple name change or a complex cross-border restructuring, we execute with the same precision regardless of complexity or timeline.",
    tags: ["Share Transfer", "Director Change", "Activity Addition", "Name Change", "Capital Change", "Cross-Border"],
    stat: "48hr",
    statLabel: "Turnaround",
    cta: "Get in Touch",
    page: "contact",
  },
  {
    num: "08",
    category: "Legal Asset Protection",
    title: "UAE WILL\nRegistration",
    desc: "Protect your UAE assets and secure your family's future with a <strong>legally registered WILL under DIFC or Abu Dhabi Courts.</strong> Without a registered WILL, UAE assets can be frozen upon death and distributed under Sharia law regardless of your nationality. Our WILL advisory ensures your assets, shares, and property transfer exactly as you intend — legally enforced.",
    tags: ["DIFC WILL", "Abu Dhabi Courts", "Asset Protection", "Inheritance Planning", "Share Transfer on Death", "Property", "Family Security"],
    stat: "100%",
    statLabel: "Legal Certainty",
    cta: "Get in Touch",
    page: "contact",
  },
  {
    num: "09",
    category: "Intellectual Property",
    title: "Trademark\nRegistration",
    desc: "Register and protect your brand in the UAE with a <strong>Ministry of Economy trademark</strong> — covering your name, logo, slogan, and brand identity across all 45 international classes. Without registration, your brand is unprotected. We manage the full application, classification, examination response, and certificate delivery. Regional GCC trademark filing also available.",
    tags: ["UAE Trademark", "Ministry of Economy", "Brand Protection", "Logo Registration", "GCC Filing", "45 Classes", "Renewal Management"],
    stat: "45",
    statLabel: "IP Classes",
    cta: "Protect Your Brand",
    page: "contact",
  },
  {
    num: "10",
    category: "Special Approvals",
    title: "Government\nSpecial Approvals",
    desc: "Certain business activities in the UAE require <strong>approvals beyond the standard trade license</strong> — from sector regulators including CBUAE, SCA, KHDA, DHA, CAA, TDRA, and Dubai Economy. Regulated industries including fintech, healthcare, education, food & beverage, aviation, media, and financial services require dedicated authority clearance. We navigate every approval pathway.",
    tags: ["CBUAE Approval", "SCA License", "KHDA Permit", "DHA License", "CAA Approval", "TDRA", "Fintech Regulatory", "Healthcare"],
    stat: "15+",
    statLabel: "Regulators",
    cta: "Discuss Requirements",
    page: "contact",
  },
  {
    num: "11",
    category: "Offshore Structuring",
    title: "Offshore Company\nFormation",
    desc: "Establish an <strong>offshore holding company in RAK ICC or Ajman Offshore</strong> — ideal for asset protection, international trade, holding UAE real estate, IP ownership, and confidential corporate structures. 100% foreign ownership, zero tax, no audit requirement, and full banking privacy. INCOZONE manages incorporation, nominee services, and ongoing secretarial support.",
    tags: ["RAK ICC", "Ajman Offshore", "Asset Holding", "IP Ownership", "Real Estate Holding", "Zero Audit", "Nominee Services"],
    stat: "0%",
    statLabel: "Tax Obligation",
    cta: "Structure Advisory",
    page: "contact",
  },
  {
    num: "12",
    category: "Exit Strategy",
    title: "Company\nLiquidation",
    desc: "Clean, compliant, and <strong>professionally managed company closure</strong> across all UAE free zones and mainland — including visa cancellations, lease terminations, bank account closure, final government clearances, and deregistration certificates. Avoid penalties and blacklisting through proper winding down. We manage every authority interaction from first notice to final clearance.",
    tags: ["License Cancellation", "Visa Cancellation", "Bank Closure", "Authority Clearance", "Deregistration", "Free Zone & Mainland"],
    stat: "30",
    statLabel: "Day Process",
    cta: "Get in Touch",
    page: "contact",
  },
];

const PROCESS = [
  { n: "01", title: "Free Consultation", desc: "30-minute private advisory session. We assess your business model, objectives, and recommend the optimal zone or structure — at no cost and no obligation.", time: "Day 1" },
  { n: "02", title: "Document Preparation", desc: "We prepare your complete application package — license forms, MOA, KYC, business plan, and all authority-specific documentation to the highest standard.", time: "Day 1–3" },
  { n: "03", title: "Authority Submission", desc: "Application submitted to the relevant free zone or mainland authority. We track progress daily and handle all queries and clarifications from the authority.", time: "Day 3–14" },
  { n: "04", title: "Handover & Activation", desc: "License delivered. Visa processed. Bank account introduced. We remain your ongoing partner for renewals, amendments, and all future government transactions.", time: "Day 14–45" },
];

const TRUST = [
  { icon: "🏢", num: "3,200", numEm: "+", title: "Companies Incorporated", desc: "Over 3,200 successful company formations across all 8 major UAE free zones and mainland — from solo consultants to multinational holding structures." },
  { icon: "🌍", num: "68", numEm: "+", title: "Nationalities Served", desc: "Clients from over 68 countries trust INCOZONE as their UAE corporate advisor. We understand international compliance requirements and cross-border structures." },
  { icon: "⭐", num: "4.9", numEm: "/5", title: "Client Satisfaction", desc: "Consistently rated 4.9 out of 5 across independent review platforms. Our advisory-first approach is reflected in every client engagement." },
  { icon: "⚡", num: "5", numEm: " Days", title: "Fastest Setup Time", desc: "Our fastest free zone setup — AFZ — completed in 5 working days from document submission to license issuance. Speed without compromising quality." },
  { icon: "🔄", num: "96", numEm: "%", title: "Renewal Retention Rate", desc: "96% of our clients return for annual renewals and additional services. Long-term advisory relationships are at the core of how we operate." },
  { icon: "💼", num: "12", numEm: " Yrs", title: "UAE Market Experience", desc: "Over 12 years navigating UAE free zone regulations, authority relationships, and corporate structuring — institutional knowledge that benefits every client." },
];

// ── HERO CANVAS ────────────────────────────────────────────────
function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let W, H, raf, t = 0;
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * 1920, y: Math.random() * 1080,
      vx: (Math.random() - .5) * 0.15, vy: (Math.random() - .5) * 0.15,
      r: Math.random() * 1.4 + 0.4, o: Math.random() * 0.35 + 0.1,
    }));
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      t += 0.003; ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#05111e"); bg.addColorStop(1, "#020b14");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      [[0.15, 0.3, "#C9A84C", 0.055, 12], [0.85, 0.2, "#163354", 0.4, 9], [0.5, 0.7, "#C9A84C", 0.035, 15], [0.3, 0.8, "#0c2033", 0.5, 8]].forEach(([bx, by, col, a, spd], i) => {
        const x = W * bx + Math.sin(t * (spd / 10) + i * 2.1) * 80, y = H * by + Math.cos(t * (spd / 13) + i) * 55;
        const r = Math.min(W, H) * 0.6;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        const rgb = parseInt(col.slice(1), 16);
        g.addColorStop(0, `rgba(${rgb >> 16},${(rgb >> 8) & 255},${rgb & 255},${a})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      });
      ctx.strokeStyle = "rgba(201,168,76,0.028)"; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 160) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(201,168,76,${0.07 * (1 - d / 160)})`; ctx.lineWidth = 0.4; ctx.stroke(); }
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.o})`; ctx.fill();
      }
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, H * 0.85);
      vg.addColorStop(0, "transparent"); vg.addColorStop(1, "rgba(2,11,20,0.65)");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="srv-hero-canvas" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />;
}

// ── REVEAL HOOK ────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".srv-reveal");
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
    }), { threshold: 0.07 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ── MAIN ──────────────────────────────────────────────────────
export default function ServicesPage({ onBack, onNavigate }) {
  const [_srvOpen, setsrvOpen] = useState(false);
  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = _srvOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [_srvOpen]);

  const [scrolled, setScrolled] = useState(false);
  useReveal();
  useEffect(() => {
    window.scrollTo(0, 0);
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="srv-root">
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className={`srv-nav${scrolled ? " scrolled" : ""}`}>
        <div className="srv-nav-logo" onClick={()=>{if(onNavigate){onNavigate("home");window.scrollTo(0,0);}}}>INCO<em>ZONE</em></div>
        <ul className="srv-nav-links">{["Home","Services","Free Zones","About","Blog","Contact"].map(l=>{const m={"Home":"home","Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};return <li key={l}><a href="#" onClick={e=>{e.preventDefault();if(onNavigate){onNavigate(m[l]);window.scrollTo(0,0);}}}>{l}</a></li>;})}</ul>
        <button className="srv-nav-cta" onClick={()=>{if(onNavigate){onNavigate("schedule");window.scrollTo(0,0);}}}>Schedule Consultation</button>
      
        {/* Hamburger */}
        <button
          className={`srv-nav-hamburger${_srvOpen ? " open" : ""}`}
          onClick={() => setsrvOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`srv-drawer${_srvOpen ? " open" : ""}`}>
        <div className="srv-drawer-brand"
          onClick={() => { setsrvOpen(false); if(onNavigate) { onNavigate("home"); window.scrollTo(0,0); } }}>
          INCO<em>ZONE</em>
        </div>
        {["Home","Services","Free Zones","About","Blog","Contact"].map((l) => {
          const pm = {"Home":"home","Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};
          return (
            <button key={l} className="srv-dlink"
              onClick={() => { setsrvOpen(false); if(onNavigate) { onNavigate(pm[l]); window.scrollTo(0,0); } }}>
              {l}
            </button>
          );
        })}
        <div className="srv-drawer-div" />
        <button className="srv-dcta"
          onClick={() => { setsrvOpen(false); if(onNavigate) { onNavigate("schedule"); window.scrollTo(0,0); } }}>
          Schedule Consultation
        </button>
      </div>

      {/* ── HERO ── */}
      <section className="srv-hero">
        <HeroCanvas />

        <div className="srv-hero-inner">
          <div className="srv-hero-overline">
            <div className="srv-hero-overline-line" />
            <span>What We Do · INCOZONE Advisory</span>
          </div>
          <h1 className="srv-hero-h1">
            Every Service
            <span className="line-2">Your Business</span>
            <span className="line-3">Needs in UAE.</span>
          </h1>
          <p className="srv-hero-sub">
            From <strong>free zone incorporation</strong> to Golden Visa, WILL registration, trademark protection, offshore structuring, and company liquidation — INCOZONE manages the full lifecycle of your UAE business presence. One advisor. End to end. Zero gaps.
          </p>
        </div>

        <div className="srv-hero-scroll">
          <span>Explore</span>
          <div className="srv-hero-scroll-track"><div className="srv-hero-scroll-fill" /></div>
        </div>
      </section>

      {/* ── INTRO BAND ── */}
      <div className="srv-intro-band">
        <div className="srv-intro-band-text">Our Services</div>
        <div className="srv-intro-band-pills">
          {["Free Zone Setup","Mainland","Visa & Immigration","Golden Visa","Banking","PRO Services","Amendments","WILL Registration","Trademark","Special Approvals","Offshore","Liquidation"].map(p => (
            <div className="srv-intro-band-pill" key={p}>{p}</div>
          ))}
        </div>
        <div className="srv-intro-band-count">
          12
          <span>Premium Services</span>
        </div>
      </div>

      {/* ── SERVICES LIST ── */}
      <section className="srv-list">
        <div className="srv-list-header">
          <div className="srv-list-header-left srv-reveal">
            <span className="srv-list-header-label">Full Service Advisory</span>
            <h2 className="srv-list-header-h2">Twelve services.<br /><em>One advisor.</em><br />Complete UAE coverage.</h2>
          </div>
          <div className="srv-list-header-right srv-reveal sd2">
            <p className="srv-list-header-desc">
              INCOZONE provides <strong>integrated advisory across every stage</strong> of UAE business establishment, operation, and exit. From incorporation and visas to Golden Visa, trademark protection, WILL registration, offshore structuring, and company liquidation — each service delivered by specialists with direct authority relationships.
            </p>
          </div>
        </div>

        <div className="srv-items">
          {SERVICES.map((s, i) => (
            <div className="srv-item srv-reveal" key={i} style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className="srv-item-num">
                <div className="srv-item-num-inner">{s.num}</div>
              </div>

              <div className="srv-item-title-col">
                <span className="srv-item-category">{s.category}</span>
                <h3 className="srv-item-title">
                  {s.title.split("\n").map((line, j) => (
                    <span key={j} style={{ display: "block" }}>{line}</span>
                  ))}
                </h3>
                <div className="srv-item-title-underline" />
              </div>

              <div className="srv-item-desc-col">
                <p className="srv-item-desc" dangerouslySetInnerHTML={{ __html: s.desc }} />
                <div className="srv-item-tags">
                  {s.tags.map(t => <span className="srv-item-tag" key={t}>{t}</span>)}
                </div>
              </div>

              <div className="srv-item-cta-col">
                <div className="srv-item-stat">
                  <div className="srv-item-stat-val">{s.stat}</div>
                  <div className="srv-item-stat-label">{s.statLabel}</div>
                </div>
                <button className="srv-item-cta" onClick={() => { if(onNavigate && s.page){ onNavigate(s.page); window.scrollTo(0,0); } }}>
                  {s.cta}
                  <div className="srv-item-cta-arrow">→</div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="srv-process">
        <div className="srv-process-header">
          <div className="srv-reveal">
            <span className="srv-process-label">How It Works</span>
            <h2 className="srv-process-h2">From conversation<br />to <em>incorporated.</em></h2>
          </div>
          <div className="srv-reveal sd2">
            <p className="srv-process-intro">
              Every INCOZONE engagement follows the same proven four-step process — built around <strong>transparency, speed, and zero surprises.</strong> Most clients reach operational status within 3–6 weeks from initial consultation.
            </p>
          </div>
        </div>
        <div className="srv-process-steps">
          {PROCESS.map((s, i) => (
            <div className={`srv-process-step srv-reveal sd${i + 1}`} key={i}>
              <div className="srv-process-step-num">{s.n}</div>
              <div className="srv-process-step-title">{s.title}</div>
              <div className="srv-process-step-desc">{s.desc}</div>
              <div className="srv-process-step-time">{s.time}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="srv-trust">
        <div className="srv-trust-inner">
          <div className="srv-trust-header srv-reveal">
            <span className="srv-trust-label">Track Record</span>
            <h2 className="srv-trust-h2">Numbers that<br /><em>speak for themselves.</em></h2>
          </div>
          <div className="srv-trust-grid">
            {TRUST.map((t, i) => (
              <div className={`srv-trust-card srv-reveal sd${(i % 3) + 1}`} key={i}>
                <div className="srv-trust-card-icon">{t.icon}</div>
                <div className="srv-trust-card-num">{t.num}<em>{t.numEm}</em></div>
                <div className="srv-trust-card-title">{t.title}</div>
                <div className="srv-trust-card-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADVISORY STRIP ── */}
      <section className="srv-advisory">
        <div className="srv-advisory-left srv-reveal">
          <span className="srv-advisory-label">The INCOZONE Difference</span>
          <blockquote className="srv-advisory-quote">
            "We recommend the <strong>right structure for your situation</strong> — not the one with the highest margin. If AFZ is right for you, we will say so. If ADGM is right, we will say that too. Our business is built on <strong>clients coming back</strong> — not on maximising the first transaction."
          </blockquote>
          <div className="srv-advisory-attr">INCOZONE Founding Advisory Team</div>
        </div>

        <div className="srv-advisory-right srv-reveal sd2">
          <div className="srv-advisory-promise">
            <div className="srv-advisory-promise-title">Our Advisory Commitments</div>
            {[
              ["Zone-agnostic advice", "We recommend based on fit — not on which zone pays us more. Every recommendation is documented and explained."],
              ["Fixed fee transparency", "No hidden government fees. No surprise charges. Full cost breakdown before you commit to anything."],
              ["Direct authority access", "Our team has direct relationships with licensing officers at all 8 UAE free zones — not just portal submissions."],
              ["Post-setup responsibility", "We remain your ongoing advisor for renewals, amendments, and questions — not just for the initial transaction."],
              ["Honest timelines", "We give you accurate setup timelines — not optimistic ones designed to win the business."],
            ].map(([title, desc], i) => (
              <div className="srv-advisory-promise-item" key={i}>
                <div className="srv-advisory-promise-check">✦</div>
                <div className="srv-advisory-promise-text"><strong>{title} — </strong>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="srv-cta">
        <div className="srv-cta-inner">
          <span className="srv-cta-label srv-reveal">Begin</span>
          <h2 className="srv-cta-h2 srv-reveal sd1">
            Ready to build your<br /><em>UAE presence?</em>
          </h2>
          <div className="srv-cta-divider" />
          <p className="srv-cta-p srv-reveal sd2">
            Schedule a private, no-obligation consultation. Our advisors will assess your business model and give you an honest recommendation — whether that leads to an engagement or simply answers your questions.
          </p>
          <div className="srv-cta-btns srv-reveal sd3">
            <button className="srv-btn-dark" onClick={() => { if(onNavigate){ onNavigate("schedule"); window.scrollTo(0,0); } }}>Schedule Private Consultation</button>
            <button className="srv-btn-outline" onClick={onBack}>← Back to Home</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="srv-footer">
        <div className="srv-footer-inner">
          <div className="srv-footer-logo">INCO<em>ZONE</em></div>
          <div className="srv-footer-copy">© 2025 INCOZONE. All rights reserved. Dubai, UAE.</div>
        </div>
      </footer>

      {/* ── WA ── */}
      <div className="srv-wa">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </div>
    </div>
  );
}
