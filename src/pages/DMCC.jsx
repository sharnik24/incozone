import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — DMCC Free Zone Page  (standalone, self-contained)
//  Drop into: src/pages/DMCC.jsx
//  Usage:     import DMCCPage from "./pages/DMCC"
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

/* ── RESET (scoped inside .dmcc-root) ─────────────────────── */
.dmcc-root *, .dmcc-root *::before, .dmcc-root *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}
.dmcc-root {
  --n950: #020b14; --n900: #05111e; --n800: #091928; --n750: #0c2033;
  --n700: #102540; --n600: #163354; --n500: #1e4570;
  --g400: #C9A84C; --g300: #D4B468; --g200: #E2CC98; --g100: #F0E4C0;
  --glow:  rgba(201,168,76,0.14); --glow2: rgba(201,168,76,0.07);
  --glow3: rgba(201,168,76,0.04);
  --cream-bg:  #FAF6EE; --cream-100: #F4ECD8; --cream-200: #EDE0C4;
  --cream-ink: #1A120A; --cream-ink2: #3D2E1A; --cream-ink3: #7A6040;
  --cream-bdr: rgba(180,150,90,0.2);
  --w:   #F8F5EE; --w80: rgba(248,245,238,0.80); --w60: rgba(248,245,238,0.60);
  --w30: rgba(248,245,238,0.30); --w12: rgba(248,245,238,0.12);
  --w06: rgba(248,245,238,0.06); --w03: rgba(248,245,238,0.03);
  --fd: 'Cormorant Garamond', Georgia, serif;
  --fb: 'DM Sans', system-ui, sans-serif;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  font-family: var(--fb); font-weight: 300; line-height: 1.6;
  color: var(--w); background: var(--n900);
  overflow-x: hidden; width: 100%;
}

/* ── NAV ─────────────────────────────────────────────────────── */
.dmcc-nav {
  position: fixed; inset-inline: 0; top: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 60px;
  transition: background 0.5s, padding 0.4s, border-color 0.5s;
  border-bottom: 1px solid transparent;
}
.dmcc-nav.scrolled {
  background: rgba(5,17,30,0.96); backdrop-filter: blur(20px);
  padding: 14px 60px; border-bottom-color: rgba(201,168,76,0.12);
}
.dmcc-nav-logo { font-family: var(--fd); font-size: 1.5rem; font-weight: 500; letter-spacing: 0.15em; color: var(--w); cursor: pointer; }
.dmcc-nav-logo em { color: var(--g400); font-style: normal; }
.dmcc-nav-links { display: flex; gap: 36px; list-style: none; }
.dmcc-nav-links a { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--w60); text-decoration: none; transition: color 0.3s; }
.dmcc-nav-links a:hover { color: var(--g300); }
.dmcc-nav-cta {
  font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
  background: transparent; border: 1px solid var(--g400); color: var(--g400);
  padding: 9px 22px; cursor: pointer; font-family: var(--fb);
  transition: background 0.3s, color 0.3s;
}
.dmcc-nav-cta:hover { background: var(--g400); color: var(--n900); }
.dmcc-back-btn {
  position: absolute; top: 90px; left: 60px; z-index: 20;
  background: none; border: none; font-family: var(--fb); font-size: 0.7rem;
  letter-spacing: 0.18em; text-transform: uppercase; color: var(--w30);
  cursor: pointer; display: flex; align-items: center; gap: 10px; padding: 0;
  transition: color 0.3s;
}
.dmcc-back-btn:hover { color: var(--g400); }
.dmcc-back-btn::before { content: '←'; font-size: 0.9rem; }

/* ── HERO ────────────────────────────────────────────────────── */
.dmcc-hero {
  min-height: 100vh; position: relative; overflow: hidden;
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: flex-end; padding: 0 60px 80px; gap: 60px;
}
.dmcc-hero-canvas { position: absolute; inset: 0; z-index: 0; display: block; }
.dmcc-hero-left { position: relative; z-index: 2; padding-top: 160px; }
.dmcc-hero-right { position: relative; z-index: 2; padding-top: 160px; display: flex; align-items: flex-end; justify-content: flex-end; }
.dmcc-hero-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--g400); border: 1px solid rgba(201,168,76,0.28); padding: 7px 16px;
  margin-bottom: 32px;
  opacity: 0; transform: translateY(16px);
  animation: fadeUp 1s var(--ease) 0.2s forwards;
}
.dmcc-hero-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--g400); animation: blink 2s infinite; }
.dmcc-hero-h1 {
  font-family: var(--fd); font-weight: 300; line-height: 0.88;
  letter-spacing: -0.02em; color: var(--w);
  font-size: clamp(5rem, 10vw, 9.5rem); margin-bottom: 20px;
  opacity: 0; transform: translateY(20px);
  animation: fadeUp 1.1s var(--ease) 0.35s forwards;
}
.dmcc-hero-h1 em { display: block; color: var(--g400); font-style: italic; font-weight: 300; }
.dmcc-hero-fullname {
  font-family: var(--fd); font-size: 1rem; font-weight: 300;
  color: var(--w60); font-style: italic; margin-bottom: 36px; letter-spacing: 0.04em;
  opacity: 0; animation: fadeUp 1s var(--ease) 0.5s forwards;
}
.dmcc-hero-desc {
  font-size: 0.86rem; color: var(--w80); line-height: 1.85; max-width: 520px; margin-bottom: 44px;
  opacity: 0; animation: fadeUp 1s var(--ease) 0.65s forwards;
}
.dmcc-hero-actions {
  display: flex; gap: 14px; flex-wrap: wrap;
  opacity: 0; animation: fadeUp 1s var(--ease) 0.8s forwards;
}

/* Quick-fact card in hero right */
.dmcc-hero-card {
  background: rgba(11,28,45,0.85); backdrop-filter: blur(16px);
  border: 1px solid var(--w12); padding: 36px 32px; min-width: 280px;
  opacity: 0; animation: fadeUp 1.1s var(--ease) 0.9s forwards;
}
.dmcc-hero-card-label {
  font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--g400); margin-bottom: 20px; display: block;
}
.dmcc-hero-card-row {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 11px 0; border-bottom: 1px solid var(--w06);
  font-size: 0.78rem;
}
.dmcc-hero-card-row:last-child { border-bottom: none; }
.dmcc-hero-card-row span:first-child { color: var(--w60); }
.dmcc-hero-card-row span:last-child { color: var(--w); font-weight: 500; text-align: right; }
.dmcc-hero-card-row span.gold { color: var(--g400); }

/* scroll hint */
.dmcc-scroll-hint {
  position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
  z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px;
  opacity: 0; animation: fadeUp 1s var(--ease) 1.2s forwards;
}
.dmcc-scroll-hint span { font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--w30); }
.dmcc-scroll-line { width: 1px; height: 44px; background: linear-gradient(to bottom, var(--g400), transparent); animation: scrollPulse 2.2s ease-in-out infinite; }

/* ── STATS BAR ───────────────────────────────────────────────── */
.dmcc-stats {
  display: grid; grid-template-columns: repeat(6, 1fr);
  background: var(--n950); border-top: 1px solid var(--w12);
  border-bottom: 1px solid var(--w12);
}
.dmcc-stat {
  padding: 28px 20px; text-align: center;
  border-right: 1px solid var(--w12); transition: background 0.3s;
}
.dmcc-stat:last-child { border-right: none; }
.dmcc-stat:hover { background: var(--glow3); }
.dmcc-stat-val { font-family: var(--fd); font-size: 2rem; font-weight: 300; color: var(--g400); display: block; line-height: 1; }
.dmcc-stat-key { font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--w30); margin-top: 6px; display: block; }

/* ── SECTION BASICS ──────────────────────────────────────────── */
.dmcc-section { padding: 96px 60px; }
.dmcc-section-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--g400); margin-bottom: 14px; display: block; }
.dmcc-h2 { font-family: var(--fd); font-size: clamp(2rem, 3.8vw, 3.4rem); font-weight: 300; line-height: 1.15; color: var(--w); }
.dmcc-h2 em { color: var(--g400); font-style: italic; }

/* ── INTRO / ABOUT SECTION ───────────────────────────────────── */
.dmcc-intro { background: var(--n800); }
.dmcc-intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; margin-top: 52px; }
.dmcc-intro-text p { font-size: 0.88rem; color: var(--w60); line-height: 1.88; margin-bottom: 22px; }
.dmcc-intro-text p strong { color: var(--w); font-weight: 500; }
.dmcc-intro-text p:last-child { margin-bottom: 0; }

/* Why DMCC pillars */
.dmcc-pillars { display: flex; flex-direction: column; }
.dmcc-pillar { display: flex; gap: 20px; padding: 22px 0; border-bottom: 1px solid var(--w06); transition: padding-left 0.3s var(--ease); }
.dmcc-pillar:first-child { border-top: 1px solid var(--w06); }
.dmcc-pillar:hover { padding-left: 10px; }
.dmcc-pillar-icon { font-size: 1.3rem; flex-shrink: 0; margin-top: 2px; }
.dmcc-pillar h4 { font-size: 0.88rem; font-weight: 500; color: var(--w); margin-bottom: 5px; }
.dmcc-pillar p { font-size: 0.77rem; color: var(--w60); line-height: 1.65; }

/* ── PACKAGES SECTION (CREAM) ────────────────────────────────── */
.dmcc-packages { background: var(--cream-bg); position: relative; overflow: hidden; }
.dmcc-packages::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(201,168,76,0.09), transparent 60%);
  pointer-events: none;
}
.dmcc-packages::after {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, transparent, var(--g400) 40%, transparent);
  opacity: 0.6;
}
.dmcc-packages .dmcc-section-label { color: #8A6820; }
.dmcc-packages .dmcc-h2 { color: var(--cream-ink); }
.dmcc-packages .dmcc-h2 em { color: var(--g400); }
.dmcc-pkg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 52px; }

.dmcc-pkg {
  background: var(--cream-bg); border: 1px solid var(--cream-bdr);
  padding: 40px 34px; display: flex; flex-direction: column;
  transition: transform 0.35s var(--ease), box-shadow 0.35s var(--ease), border-color 0.35s;
  box-shadow: 0 2px 16px rgba(120,90,30,0.06); position: relative;
}
.dmcc-pkg:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(120,90,30,0.14); border-color: rgba(201,168,76,0.45); }
.dmcc-pkg.featured {
  background: var(--n900); border-color: rgba(201,168,76,0.35);
  box-shadow: 0 8px 40px rgba(0,0,0,0.25);
}
.dmcc-pkg.featured:hover { border-color: var(--g400); box-shadow: 0 24px 60px rgba(0,0,0,0.35); }

.dmcc-pkg-badge {
  font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase;
  padding: 4px 12px; width: fit-content; margin-bottom: 22px; font-weight: 500;
}
.dmcc-pkg:not(.featured) .dmcc-pkg-badge { border: 1px solid var(--cream-bdr); color: var(--cream-ink3); background: var(--cream-100); }
.dmcc-pkg.featured .dmcc-pkg-badge { border: 1px solid var(--g400); color: var(--g400); background: rgba(201,168,76,0.08); }

.dmcc-pkg-name { font-family: var(--fd); font-size: 2rem; font-weight: 400; margin-bottom: 6px; }
.dmcc-pkg:not(.featured) .dmcc-pkg-name { color: var(--cream-ink); }
.dmcc-pkg.featured .dmcc-pkg-name { color: var(--w); }

.dmcc-pkg-tag { font-size: 0.75rem; margin-bottom: 26px; }
.dmcc-pkg:not(.featured) .dmcc-pkg-tag { color: var(--cream-ink3); }
.dmcc-pkg.featured .dmcc-pkg-tag { color: var(--w60); }

.dmcc-pkg-price { margin-bottom: 28px; padding-bottom: 24px; }
.dmcc-pkg:not(.featured) .dmcc-pkg-price { border-bottom: 1px solid var(--cream-bdr); }
.dmcc-pkg.featured .dmcc-pkg-price { border-bottom: 1px solid var(--w12); }
.dmcc-pkg-amount { font-family: var(--fd); font-size: 3rem; font-weight: 300; line-height: 1; }
.dmcc-pkg:not(.featured) .dmcc-pkg-amount { color: var(--cream-ink); }
.dmcc-pkg.featured .dmcc-pkg-amount { color: var(--g400); }
.dmcc-pkg-period { font-size: 0.68rem; letter-spacing: 0.08em; margin-top: 5px; }
.dmcc-pkg:not(.featured) .dmcc-pkg-period { color: var(--cream-bdr); }
.dmcc-pkg.featured .dmcc-pkg-period { color: var(--w30); }

.dmcc-pkg-features { list-style: none; display: flex; flex-direction: column; gap: 12px; flex: 1; margin-bottom: 32px; }
.dmcc-pkg-feat { display: flex; align-items: flex-start; gap: 11px; font-size: 0.79rem; line-height: 1.5; }
.feat-on { color: #8A6820; flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.feat-off { color: var(--cream-bdr); flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.dmcc-pkg.featured .feat-on { color: var(--g400); }
.dmcc-pkg.featured .feat-off { color: var(--w30); }
.feat-label-on { color: var(--cream-ink2); }
.feat-label-off { color: var(--cream-bdr); }
.dmcc-pkg.featured .feat-label-on { color: var(--w80); }
.dmcc-pkg.featured .feat-label-off { color: var(--w30); }

.dmcc-pkg-btn {
  width: 100%; padding: 13px 20px; font-family: var(--fb); font-size: 0.7rem;
  letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer; transition: all 0.3s;
}
.dmcc-pkg:not(.featured) .dmcc-pkg-btn { background: transparent; border: 1px solid var(--cream-bdr); color: var(--cream-ink2); }
.dmcc-pkg:not(.featured) .dmcc-pkg-btn:hover { border-color: var(--g400); background: var(--cream-100); color: var(--cream-ink); }
.dmcc-pkg.featured .dmcc-pkg-btn { background: var(--g400); border: none; color: var(--n900); font-weight: 500; }
.dmcc-pkg.featured .dmcc-pkg-btn:hover { background: var(--g300); }

/* ── ACTIVITIES ──────────────────────────────────────────────── */
.dmcc-activities { background: var(--n800); }
.dmcc-act-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; margin-top: 52px; background: var(--w06); }
.dmcc-act-card {
  background: var(--n800); padding: 30px 24px; transition: background 0.3s;
  cursor: default;
}
.dmcc-act-card:hover { background: var(--n750); }
.dmcc-act-card:hover .dmcc-act-name { color: var(--g300); }
.dmcc-act-icon { font-size: 1.5rem; margin-bottom: 14px; }
.dmcc-act-name { font-size: 0.84rem; font-weight: 500; color: var(--w); margin-bottom: 7px; transition: color 0.3s; }
.dmcc-act-desc { font-size: 0.73rem; color: var(--w60); line-height: 1.6; }

/* ── PROCESS TIMELINE ────────────────────────────────────────── */
.dmcc-process { background: var(--n900); }
.dmcc-process-inner { max-width: 780px; margin: 52px auto 0; }
.dmcc-step {
  display: grid; grid-template-columns: 64px 1fr; gap: 28px;
  padding: 36px 0; border-bottom: 1px solid var(--w06); position: relative;
}
.dmcc-step:last-child { border-bottom: none; }
.dmcc-step::before {
  content: ''; position: absolute; left: 31px; top: 84px; bottom: -36px;
  width: 1px; background: linear-gradient(to bottom, rgba(201,168,76,0.25), transparent);
}
.dmcc-step:last-child::before { display: none; }
.dmcc-step-num {
  width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--g400);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--fd); font-size: 0.92rem; color: var(--g400);
  background: var(--n900); position: relative; z-index: 1; flex-shrink: 0;
}
.dmcc-step h3 { font-size: 0.96rem; font-weight: 500; color: var(--w); margin-bottom: 8px; }
.dmcc-step p { font-size: 0.81rem; color: var(--w60); line-height: 1.78; margin-bottom: 10px; }
.dmcc-step-time { font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--g400); margin-bottom: 12px; }
.dmcc-step-docs { display: flex; gap: 6px; flex-wrap: wrap; }
.dmcc-doc-tag { font-size: 0.62rem; padding: 4px 9px; border: 1px solid var(--w12); color: var(--w60); letter-spacing: 0.07em; }

/* ── DOCUMENTS ───────────────────────────────────────────────── */
.dmcc-documents { background: var(--n800); }
.dmcc-docs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 52px; }
.dmcc-doc-card {
  background: var(--n900); border: 1px solid var(--w06);
  padding: 22px 26px; display: flex; align-items: center; gap: 18px;
  transition: border-color 0.3s;
}
.dmcc-doc-card:hover { border-color: rgba(201,168,76,0.2); }
.dmcc-doc-num { font-family: var(--fd); font-size: 1.9rem; font-weight: 300; color: rgba(201,168,76,0.18); min-width: 36px; line-height: 1; }
.dmcc-doc-title { font-size: 0.82rem; font-weight: 500; color: var(--w); margin-bottom: 4px; }
.dmcc-doc-desc { font-size: 0.72rem; color: var(--w60); line-height: 1.55; }

/* ── CALCULATOR ──────────────────────────────────────────────── */
.dmcc-calc { background: var(--n750); }
.dmcc-calc-inner { display: grid; grid-template-columns: 1.3fr 1fr; gap: 64px; align-items: start; margin-top: 52px; }
.dmcc-calc-form { display: flex; flex-direction: column; gap: 22px; }
.dmcc-calc-field { display: flex; flex-direction: column; gap: 7px; }
.dmcc-calc-label { font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--w60); }
.dmcc-calc-select {
  background: var(--n900); border: 1px solid var(--w12); color: var(--w);
  padding: 13px 16px; font-family: var(--fb); font-size: 0.83rem; font-weight: 300;
  outline: none; transition: border-color 0.3s; appearance: none; -webkit-appearance: none;
  cursor: pointer;
}
.dmcc-calc-select:focus { border-color: var(--g400); }
.dmcc-calc-select option { background: var(--n800); }
.dmcc-toggle-row { display: flex; }
.dmcc-toggle {
  flex: 1; padding: 11px 10px; font-size: 0.66rem; letter-spacing: 0.12em;
  text-transform: uppercase; font-family: var(--fb); cursor: pointer;
  background: var(--n900); border: 1px solid var(--w12); color: var(--w60);
  transition: all 0.3s; margin-right: -1px; text-align: center;
}
.dmcc-toggle.on { background: var(--glow2); border-color: var(--g400); color: var(--g400); position: relative; z-index: 1; }

.dmcc-result {
  background: var(--n900); border: 1px solid rgba(201,168,76,0.2);
  padding: 40px 36px; position: sticky; top: 90px;
}
.dmcc-result-tag { font-size: 0.6rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--g400); margin-bottom: 22px; display: block; }
.dmcc-result-amount { font-family: var(--fd); font-size: 3.6rem; font-weight: 300; line-height: 1; color: var(--w); }
.dmcc-result-currency { color: var(--g400); }
.dmcc-result-note { font-size: 0.66rem; color: var(--w30); margin-top: 4px; margin-bottom: 28px; }
.dmcc-result-lines { border-top: 1px solid var(--w12); margin-bottom: 24px; }
.dmcc-result-line { display: flex; justify-content: space-between; padding: 11px 0; border-bottom: 1px solid var(--w06); font-size: 0.76rem; }
.dmcc-result-line-lbl { color: var(--w60); }
.dmcc-result-line-val { color: var(--w); font-weight: 500; }
.dmcc-result-total-row { display: flex; justify-content: space-between; padding: 14px 0 0; font-size: 0.86rem; }
.dmcc-result-disclaimer { font-size: 0.68rem; color: var(--w30); line-height: 1.65; margin-bottom: 22px; margin-top: 14px; }

/* ── FAQ ─────────────────────────────────────────────────────── */
.dmcc-faq { background: var(--n900); }
.dmcc-faq-inner { max-width: 820px; margin: 52px auto 0; }
.dmcc-faq-item { border-bottom: 1px solid var(--w06); }
.dmcc-faq-q {
  width: 100%; background: none; border: none; padding: 26px 0;
  display: flex; align-items: center; justify-content: space-between; gap: 24px;
  cursor: pointer; text-align: left; font-family: var(--fb);
}
.dmcc-faq-q-text { font-size: 0.92rem; font-weight: 400; color: var(--w); line-height: 1.5; }
.dmcc-faq-icon {
  width: 26px; height: 26px; border: 1px solid var(--w12); border-radius: 50%;
  display: flex; align-items: center; justify-content: center; color: var(--g400);
  font-size: 1.1rem; flex-shrink: 0; transition: all 0.3s;
}
.dmcc-faq-item.open .dmcc-faq-icon { background: var(--g400); color: var(--n900); border-color: var(--g400); transform: rotate(45deg); }
.dmcc-faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.45s var(--ease); }
.dmcc-faq-item.open .dmcc-faq-answer { max-height: 500px; }
.dmcc-faq-answer-inner { padding-bottom: 24px; }
.dmcc-faq-answer p { font-size: 0.83rem; color: var(--w60); line-height: 1.85; }
.dmcc-faq-answer ul { margin-top: 12px; list-style: none; display: flex; flex-direction: column; gap: 7px; }
.dmcc-faq-answer ul li { font-size: 0.8rem; color: var(--w60); padding-left: 18px; position: relative; line-height: 1.6; }
.dmcc-faq-answer ul li::before { content: '—'; position: absolute; left: 0; color: var(--g400); }

/* ── ADVISORY ────────────────────────────────────────────────── */
.dmcc-advisory { background: var(--n800); position: relative; overflow: hidden; }
.dmcc-advisory::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 80% 70% at 50% 50%, rgba(201,168,76,0.04), transparent);
  pointer-events: none;
}
.dmcc-advisory-inner { max-width: 900px; margin: 52px auto 0; position: relative; z-index: 1; }
.dmcc-advisory-quote {
  font-family: var(--fd); font-size: 1.35rem; font-weight: 300; color: var(--w80);
  line-height: 1.65; font-style: italic; text-align: center; padding: 40px 48px;
  border: 1px solid var(--w12); background: var(--n900); margin-bottom: 48px;
}
.dmcc-advisory-quote strong { color: var(--g400); font-style: normal; }
.dmcc-advisory-quote-attr { margin-top: 18px; font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--g400); font-style: normal; }
.dmcc-advisory-tips { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 36px; }
.dmcc-tip {
  border: 1px solid var(--w06); padding: 30px 26px; transition: border-color 0.3s;
}
.dmcc-tip:hover { border-color: rgba(201,168,76,0.2); }
.dmcc-tip-num { font-family: var(--fd); font-size: 0.68rem; letter-spacing: 0.22em; color: var(--g400); margin-bottom: 12px; display: block; }
.dmcc-tip h4 { font-size: 0.9rem; font-weight: 500; color: var(--w); margin-bottom: 9px; }
.dmcc-tip p { font-size: 0.78rem; color: var(--w60); line-height: 1.78; }
.dmcc-advisory-warning {
  background: rgba(201,168,76,0.05); border: 1px solid rgba(201,168,76,0.18);
  padding: 26px 30px; margin-bottom: 32px;
}
.dmcc-advisory-warning h4 { font-size: 0.82rem; font-weight: 500; color: var(--g400); margin-bottom: 9px; }
.dmcc-advisory-warning p { font-size: 0.78rem; color: var(--w60); line-height: 1.78; }

/* ── CTA (CREAM) ─────────────────────────────────────────────── */
.dmcc-cta {
  background: var(--cream-bg); padding: 120px 60px; text-align: center;
  position: relative; overflow: hidden;
}
.dmcc-cta::before {
  content: ''; position: absolute; inset: 0;
  background-image: linear-gradient(rgba(180,150,90,0.06) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(180,150,90,0.06) 1px, transparent 1px);
  background-size: 56px 56px;
}
.dmcc-cta::after {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.10), transparent 70%);
  pointer-events: none;
}
.dmcc-cta-inner { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }
.dmcc-cta .dmcc-section-label { color: #8A6820; text-align: center; }
.dmcc-cta h2 { font-family: var(--fd); font-size: clamp(2.4rem, 4.5vw, 4rem); font-weight: 300; color: var(--cream-ink); line-height: 1.15; margin-bottom: 18px; }
.dmcc-cta h2 em { color: var(--g400); font-style: italic; }
.dmcc-cta-divider { width: 44px; height: 1px; background: var(--g400); margin: 22px auto; opacity: 0.55; }
.dmcc-cta p { font-size: 0.83rem; color: var(--cream-ink3); line-height: 1.8; margin-bottom: 44px; }
.dmcc-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.btn-ink { padding: 15px 36px; background: var(--cream-ink); color: var(--cream-bg); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.btn-ink:hover { background: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }
.btn-cream-outline { padding: 15px 36px; background: transparent; color: var(--cream-ink2); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--cream-bdr); cursor: pointer; transition: all 0.3s; }
.btn-cream-outline:hover { border-color: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }

/* ── BUTTONS (global dark) ───────────────────────────────────── */
.dmcc-btn-gold { padding: 15px 36px; background: var(--g400); color: var(--n900); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.dmcc-btn-gold:hover { background: var(--g300); transform: translateY(-2px); }
.dmcc-btn-ghost { padding: 15px 36px; background: transparent; color: var(--w); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--w30); cursor: pointer; transition: all 0.3s; }
.dmcc-btn-ghost:hover { border-color: var(--g400); color: var(--g400); transform: translateY(-2px); }

/* ── FOOTER ──────────────────────────────────────────────────── */
.dmcc-footer { background: var(--n950); padding: 52px 60px; border-top: 1px solid var(--w06); }
.dmcc-footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
.dmcc-footer-logo { font-family: var(--fd); font-size: 1.3rem; letter-spacing: 0.15em; color: var(--w); }
.dmcc-footer-logo em { color: var(--g400); font-style: normal; }
.dmcc-footer-copy { font-size: 0.68rem; color: var(--w30); }
.dmcc-footer-back { padding: 9px 18px; background: transparent; border: 1px solid var(--w12); color: var(--w60); font-family: var(--fb); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
.dmcc-footer-back:hover { border-color: var(--g400); color: var(--g400); }

/* ── WA FLOAT ────────────────────────────────────────────────── */
.dmcc-wa { position: fixed; bottom: 28px; right: 28px; z-index: 300; width: 50px; height: 50px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 18px rgba(37,211,102,0.4); transition: transform 0.3s, box-shadow 0.3s; }
.dmcc-wa:hover { transform: scale(1.1); box-shadow: 0 6px 26px rgba(37,211,102,0.55); }

/* ── REVEAL ──────────────────────────────────────────────────── */
.dmcc-reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.8s var(--ease), transform 0.8s var(--ease); }
.dmcc-reveal.in { opacity: 1; transform: translateY(0); }
.dr1 { transition-delay: 0.08s; } .dr2 { transition-delay: 0.18s; }
.dr3 { transition-delay: 0.28s; } .dr4 { transition-delay: 0.38s; }

/* ── KEYFRAMES ───────────────────────────────────────────────── */
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
@keyframes scrollPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
@keyframes blink { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.75); } }
@keyframes meshMove1 { 0%,100%{transform:translate(0,0) scale(1);} 40%{transform:translate(50px,-40px) scale(1.05);} 70%{transform:translate(-25px,30px) scale(0.97);} }
@keyframes meshMove2 { 0%,100%{transform:translate(0,0) scale(1);} 35%{transform:translate(-60px,30px) scale(1.06);} 65%{transform:translate(30px,-20px) scale(0.96);} }

/* ── RESPONSIVE ──────────────────────────────────────────────── */
@media(max-width:1100px) {
  .dmcc-hero { grid-template-columns: 1fr; }
  .dmcc-hero-right { display: none; }
  .dmcc-intro-grid { grid-template-columns: 1fr; gap: 48px; }
  .dmcc-pkg-grid { grid-template-columns: 1fr; max-width: 480px; }
  .dmcc-act-grid { grid-template-columns: repeat(3, 1fr); }
  .dmcc-calc-inner { grid-template-columns: 1fr; }
  .dmcc-result { position: static; }
  .dmcc-advisory-tips { grid-template-columns: 1fr; }
}
@media(max-width:768px) {
  .dmcc-nav { padding: 16px 24px; } .dmcc-nav.scrolled { padding: 12px 24px; } .dmcc-nav-links { display: none; }
  .dmcc-hero { padding: 0 24px 72px; }
  .dmcc-back-btn { left: 24px; }
  .dmcc-section { padding: 68px 24px; }
  .dmcc-stats { grid-template-columns: repeat(3, 1fr); }
  .dmcc-act-grid { grid-template-columns: repeat(2, 1fr); }
  .dmcc-docs-grid { grid-template-columns: 1fr; }
  .dmcc-footer { padding: 40px 24px; }
  .dmcc-cta { padding: 80px 24px; }
}
@media(max-width:480px) {
  .dmcc-stats { grid-template-columns: repeat(2, 1fr); }
  .dmcc-act-grid { grid-template-columns: 1fr; }
  .dmcc-hero-h1 { font-size: 4.5rem; }
}

  .dmcc-nav-hamburger {
    display: none; flex-direction: column; gap: 5px; cursor: pointer;
    background: none; border: none; padding: 6px; z-index: 310;
  }
  .dmcc-nav-hamburger span {
    display: block; width: 24px; height: 1.5px; background: rgba(248,245,238,0.6);
    transition: all 0.35s cubic-bezier(0.16,1,0.3,1); transform-origin: center;
  }
  .dmcc-nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: #C9A84C; }
  .dmcc-nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .dmcc-nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: #C9A84C; }
  .dmcc-drawer {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(3,10,20,0.97); backdrop-filter: blur(24px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    transform: translateX(100%); transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
    pointer-events: none;
  }
  .dmcc-drawer.open { transform: translateX(0); pointer-events: all; }
  .dmcc-drawer-brand {
    font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.3rem;
    letter-spacing: .18em; color: #F8F5EE; margin-bottom: 44px;
    opacity: 0; transform: translateY(10px);
    transition: opacity .4s .1s, transform .4s .1s;
  }
  .dmcc-drawer.open .dmcc-drawer-brand { opacity: 1; transform: translateY(0); }
  .dmcc-drawer-brand em { color: #C9A84C; font-style: normal; }
  .dmcc-dlink {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2rem, 8vw, 3rem); font-weight: 300; color: rgba(248,245,238,0.6);
    background: none; border: none; padding: 10px 0; cursor: pointer;
    display: block; width: 100%; text-align: center;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, opacity .4s cubic-bezier(0.16,1,0.3,1), transform .4s cubic-bezier(0.16,1,0.3,1);
  }
  .dmcc-drawer.open .dmcc-dlink { opacity: 1; transform: translateY(0); }
  .dmcc-drawer.open .dmcc-dlink:nth-of-type(1) { transition-delay: .12s; }
  .dmcc-drawer.open .dmcc-dlink:nth-of-type(2) { transition-delay: .17s; }
  .dmcc-drawer.open .dmcc-dlink:nth-of-type(3) { transition-delay: .22s; }
  .dmcc-drawer.open .dmcc-dlink:nth-of-type(4) { transition-delay: .27s; }
  .dmcc-drawer.open .dmcc-dlink:nth-of-type(5) { transition-delay: .32s; }
  .dmcc-dlink:hover { color: #C9A84C; }
  .dmcc-drawer-div { width: 40px; height: 1px; background: rgba(201,168,76,.25); margin: 18px 0; opacity: 0; transition: opacity .4s .34s; }
  .dmcc-drawer.open .dmcc-drawer-div { opacity: 1; }
  .dmcc-dcta {
    font-family: 'DM Sans', sans-serif; font-size: .7rem; letter-spacing: .18em;
    text-transform: uppercase; color: #C9A84C; border: 1px solid #C9A84C;
    background: none; padding: 12px 32px; cursor: pointer; margin-top: 8px;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, background .3s, opacity .4s .38s, transform .4s .38s;
  }
  .dmcc-drawer.open .dmcc-dcta { opacity: 1; transform: translateY(0); }
  .dmcc-dcta:hover { background: #C9A84C; color: #05111e; }
  @media (max-width: 900px) {
    .dmcc-nav-links { display: none; }
    .dmcc-nav-cta { display: none !important; }
    .dmcc-nav-hamburger { display: flex; }
  }
`;

// ── DATA ──────────────────────────────────────────────────────
const STATS = [
  { v:"23,000+", k:"Companies" }, { v:"7–14", k:"Setup Days" },
  { v:"100%", k:"Foreign Ownership" }, { v:"0%", k:"Income Tax" },
  { v:"50+", k:"Yrs Renewable" }, { v:"190+", k:"Countries" },
];

const ACTIVITIES = [
  { i:"", n:"Commodities Trading", d:"Gold, diamonds, precious metals and raw materials" },
  { i:"", n:"Professional Services", d:"Consulting, advisory and management services" },
  { i:"", n:"Technology & IT", d:"Software, fintech, crypto and digital services" },
  { i:"", n:"Financial Services", d:"Investment advisory, fund management, financial consulting" },
  { i:"", n:"Logistics & Shipping", d:"Freight forwarding, import/export, supply chain" },
  { i:"", n:"Media & Marketing", d:"Digital media, content creation, advertising" },
  { i:"", n:"Healthcare & Pharma", d:"Medical distribution, pharma trading, health consulting" },
  { i:"", n:"Real Estate", d:"Property management, real estate consulting, prop-tech" },
  { i:"", n:"Education & Training", d:"E-learning platforms, training centers, EdTech" },
  { i:"", n:"Food & Agri Trading", d:"Food commodities, agricultural products, FMCG" },
  { i:"", n:"Travel & Tourism", d:"Tour operations, travel agencies, hospitality" },
  { i:"", n:"Energy & Renewables", d:"Oil & gas, solar energy, clean tech solutions" },
];

const STEPS = [
  { n:"01", t:"Initial Consultation & Planning", d:"Our DMCC specialists assess your business activities, share structure, visa requirements and recommend the optimal setup path for your situation.", time:"Day 1", docs:["Passport Copy","Business Overview"] },
  { n:"02", t:"Trade Name Reservation", d:"We submit your preferred company name to DMCC authority — ensuring compliance with DMCC naming guidelines and handling all documentation.", time:"Day 1–2", docs:["Name Options","Shareholder Details"] },
  { n:"03", t:"License Application Submission", d:"Full license application submitted with supporting documents — share capital declaration, activity selection, and ownership structure.", time:"Day 2–5", docs:["Application Form","Passport Copies","Share Capital Docs"] },
  { n:"04", t:"DMCC Authority Approvals", d:"DMCC authority reviews your application. Our team manages all communication, responds to additional requirements, and tracks status daily.", time:"Day 5–10", docs:["NOC (if required)","Activity Approvals"] },
  { n:"05", t:"License Issuance & Corporate Documents", d:"Trade license issued. MOA, Share Certificates, Company Stamp, and all official documentation prepared and delivered.", time:"Day 10–14", docs:["Trade License","MOA","Share Certificates","Company Stamp"] },
  { n:"06", t:"Investor Visa Processing", d:"Investor visa applications submitted. Medical fitness test, Emirates ID registration. Our PRO team manages all immigration procedures end-to-end.", time:"Day 14–21", docs:["Visa Application","Medical Test","Emirates ID"] },
  { n:"07", t:"Bank Account Opening", d:"Introduction to our banking partners — Emirates NBD, ADCB, Mashreq, and international banks. Full account opening process supported.", time:"Day 21–35", docs:["Bank Application","Company Documents","Proof of Address"] },
];

const DOCUMENTS = [
  { t:"Passport Copies", d:"Valid passport copies for all shareholders and directors (minimum 6 months validity)" },
  { t:"Passport-size Photographs", d:"White background, recent photographs for all shareholders and visa applicants" },
  { t:"Residential Address Proof", d:"Utility bill or bank statement — not older than 3 months" },
  { t:"Business Plan / Overview", d:"Brief description of your business activities and objectives in the UAE" },
  { t:"Source of Funds Declaration", d:"Letter or documents confirming the source of investment funds (required by banks)" },
  { t:"NOC from Employer", d:"Required only if the applicant is currently employed in the UAE under a residence visa" },
  { t:"Corporate Documents", d:"For corporate shareholders: Certificate of Incorporation, MOA, Board Resolution" },
  { t:"Bank Reference Letter", d:"Optional but highly recommended — strengthens the bank account opening application" },
];

const FAQS = [
  { q:"How long does it take to set up a company in DMCC?", a:"Standard DMCC company formation takes 7 to 14 working days from document submission to license issuance. Investor visa processing takes an additional 7–14 days. Bank account opening typically takes 2–4 weeks. Total from start to fully operational: 4–6 weeks." },
  { q:"What is the minimum share capital required?", a:"DMCC requires a minimum share capital of AED 50,000 for most company types. This capital does not need to be deposited upfront — it is a declared amount on your company documents. Banks typically require AED 50,000–100,000 as a minimum opening deposit." },
  { q:"Can I have 100% foreign ownership in DMCC?", a:"Yes. DMCC is a UAE free zone and allows 100% foreign ownership with no requirement for a UAE national partner or local sponsor. You retain full control of your company." },
  { q:"How many visas can I get with a DMCC license?", a:"The number of visas depends on your office type.", list:["Flexi Desk: 2 Visas","Serviced Office: 3–4 Visas","Private Office: 5–6+ Visas","Additional visas possible with upgrade"] },
  { q:"Can I trade with mainland UAE companies from DMCC?", a:"DMCC companies can provide services to mainland UAE clients. For direct goods trading with the mainland, you will need to appoint a mainland distributor or obtain relevant customs/import permits." },
  { q:"Is DMCC suitable for crypto and blockchain businesses?", a:"Yes. DMCC is one of the most crypto-friendly free zones in the UAE — offering a Virtual Asset License for companies dealing in virtual assets, blockchain technology, cryptocurrency trading, or NFT platforms." },
  { q:"What are the annual renewal costs?", a:"Annual renewal typically costs AED 12,000–18,000 depending on your license type, activities, and office arrangement. Our team will notify you 90 days before your renewal is due." },
  { q:"Can I open a DMCC company without visiting the UAE?", a:"Yes — for the initial license setup, most documentation can be handled remotely. However, for visa processing and bank account opening, physical presence in the UAE is required. INCOZONE can plan your visit efficiently." },
  { q:"Does DMCC have a corporate tax obligation?", a:"UAE introduced a 9% corporate tax for businesses with annual profits exceeding AED 375,000. Free zone businesses including DMCC may qualify for a 0% rate on qualifying income if they meet specific substance requirements." },
];

// ── HERO CANVAS ───────────────────────────────────────────────
function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let W, H, raf, t = 0;
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * 1920, y: Math.random() * 1080,
      vx: (Math.random() - .5) * 0.2, vy: (Math.random() - .5) * 0.2,
      r: Math.random() * 1.2 + 0.3, o: Math.random() * 0.4 + 0.15,
    }));
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      t += 0.004; ctx.clearRect(0, 0, W, H);
      // dark gradient base
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#05111e"); bg.addColorStop(1, "#020b14");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      // animated blobs
      [[0.12, 0.35, "#C9A84C", 0.06, 14], [0.88, 0.25, "#163354", 0.45, 11], [0.55, 0.75, "#C9A84C", 0.04, 16]].forEach(([bx, by, col, a, spd], i) => {
        const x = W * bx + Math.sin(t * (spd / 10) + i * 2.1) * 70, y = H * by + Math.cos(t * (spd / 14) + i) * 50;
        const r = Math.min(W, H) * 0.55;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        const rgb = parseInt(col.slice(1), 16);
        g.addColorStop(0, `rgba(${rgb >> 16},${(rgb >> 8) & 255},${rgb & 255},${a})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      });
      // grid
      ctx.strokeStyle = "rgba(201,168,76,0.035)"; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 90) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 90) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      // particles
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 180) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(201,168,76,${0.08 * (1 - d / 180)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.o})`; ctx.fill();
      }
      // vignette
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.9);
      vg.addColorStop(0, "transparent"); vg.addColorStop(1, "rgba(2,11,20,0.6)");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="dmcc-hero-canvas" style={{ width: "100%", height: "100%" }} />;
}

// ── SCROLL REVEAL ─────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".dmcc-reveal");
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
    }), { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ── CALCULATOR ────────────────────────────────────────────────
function Calculator() {
  const [act, setAct] = useState("1"); const [off, setOff] = useState("flexi");
  const [vis, setVis] = useState("2"); const [pro, setPro] = useState(false); const [bnk, setBnk] = useState(false);
  const BASE = 18500;
  const aC = { "1": 0, "3": 3500, "5": 6500, "unlimited": 12000 };
  const oC = { flexi: 0, serviced: 8400, private: 18000 };
  const vC = { "0": 0, "2": 0, "4": 3200, "6": 6400, "8": 9600 };
  const total = BASE + (aC[act] || 0) + (oC[off] || 0) + (vC[vis] || 0) + (pro ? 3500 : 0) + (bnk ? 2500 : 0);
  const f = n => "AED " + n.toLocaleString();
  return (
    <div className="dmcc-calc-inner">
      <div>
        <h2 className="dmcc-h2 dmcc-reveal">Build Your <em>Custom Package</em></h2>
        <p className="dmcc-reveal dr1" style={{ fontSize: "0.84rem", color: "var(--w60)", margin: "12px 0 36px" }}>Configure your DMCC requirements and get an instant cost breakdown.</p>
        <div className="dmcc-calc-form">
          {[
            { l: "Business Activities", id: "act", val: act, set: setAct, opts: [["1","1 Activity (Included)"],["3","3 Activities (+AED 3,500)"],["5","5 Activities (+AED 6,500)"],["unlimited","Unlimited (+AED 12,000)"]] },
            { l: "Office / Workspace", id: "off", val: off, set: setOff, opts: [["flexi","Flexi Desk (Included)"],["serviced","Serviced Office (+AED 8,400/yr)"],["private","Private Office (+AED 18,000/yr)"]] },
            { l: "Visa Allocation", id: "vis", val: vis, set: setVis, opts: [["0","No Visas"],["2","2 Visas (Included)"],["4","4 Visas (+AED 3,200)"],["6","6 Visas (+AED 6,400)"],["8","8 Visas (+AED 9,600)"]] },
          ].map(({ l, id, val, set, opts }) => (
            <div className="dmcc-calc-field dmcc-reveal" key={id}>
              <label className="dmcc-calc-label">{l}</label>
              <select className="dmcc-calc-select" value={val} onChange={e => set(e.target.value)}>
                {opts.map(([v, lab]) => <option key={v} value={v}>{lab}</option>)}
              </select>
            </div>
          ))}
          <div className="dmcc-calc-field dmcc-reveal">
            <label className="dmcc-calc-label">PRO & Government Services</label>
            <div className="dmcc-toggle-row">
              <button className={`dmcc-toggle${!pro ? " on" : ""}`} onClick={() => setPro(false)}>Not Required</button>
              <button className={`dmcc-toggle${pro ? " on" : ""}`} onClick={() => setPro(true)}>Add PRO (+AED 3,500)</button>
            </div>
          </div>
          <div className="dmcc-calc-field dmcc-reveal">
            <label className="dmcc-calc-label">Banking Assistance</label>
            <div className="dmcc-toggle-row">
              <button className={`dmcc-toggle${!bnk ? " on" : ""}`} onClick={() => setBnk(false)}>Not Required</button>
              <button className={`dmcc-toggle${bnk ? " on" : ""}`} onClick={() => setBnk(true)}>Add Banking (+AED 2,500)</button>
            </div>
          </div>
        </div>
      </div>
      <div className="dmcc-result dmcc-reveal">
        <span className="dmcc-result-tag">Estimated Total</span>
        <div className="dmcc-result-amount"><span className="dmcc-result-currency">AED </span>{total.toLocaleString()}</div>
        <div className="dmcc-result-note">One-time cost · excludes annual renewal</div>
        <div className="dmcc-result-lines">
          <div className="dmcc-result-line"><span className="dmcc-result-line-lbl">Base License Fee</span><span className="dmcc-result-line-val">{f(BASE)}</span></div>
          {aC[act] > 0 && <div className="dmcc-result-line"><span className="dmcc-result-line-lbl">Additional Activities</span><span className="dmcc-result-line-val">+{f(aC[act])}</span></div>}
          {oC[off] > 0 && <div className="dmcc-result-line"><span className="dmcc-result-line-lbl">Office Space (Annual)</span><span className="dmcc-result-line-val">+{f(oC[off])}</span></div>}
          {vC[vis] > 0 && <div className="dmcc-result-line"><span className="dmcc-result-line-lbl">Visa Processing</span><span className="dmcc-result-line-val">+{f(vC[vis])}</span></div>}
          {pro && <div className="dmcc-result-line"><span className="dmcc-result-line-lbl">PRO Services</span><span className="dmcc-result-line-val">+{f(3500)}</span></div>}
          {bnk && <div className="dmcc-result-line"><span className="dmcc-result-line-lbl">Banking Assistance</span><span className="dmcc-result-line-val">+{f(2500)}</span></div>}
        </div>
        <div className="dmcc-result-total-row"><span style={{ color: "var(--w)", fontWeight: 500 }}>Total Estimate</span><span style={{ color: "var(--g400)", fontWeight: 600 }}>{f(total)}</span></div>
        <p className="dmcc-result-disclaimer">Estimate only. Final cost depends on current authority fees and specific requirements.</p>
        <button className="dmcc-btn-gold" style={{ width: "100%" }}>Get Exact Quote →</button>
      </div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────
export default function DMCCPage({ onBack, onNavigate }) {
  const [_dmccOpen, setdmccOpen] = useState(false);
  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = _dmccOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [_dmccOpen]);

  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useReveal();
  useEffect(() => {
    window.scrollTo(0, 0);
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="dmcc-root">
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className={`dmcc-nav${scrolled ? " scrolled" : ""}`}>
        <div className="dmcc-nav-logo" onClick={()=>{if(onNavigate){onNavigate("home");window.scrollTo(0,0);}}}>INCO<em>ZONE</em></div>
        <ul className="dmcc-nav-links">{["Services","Free Zones","About","Blog","Contact"].map(l=>{const pgMap={"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};return <li key={l}><a href="#" onClick={e=>{e.preventDefault();if(onNavigate){onNavigate(pgMap[l]);window.scrollTo(0,0);}}}>{ l}</a></li>;})}</ul>
        <button className="dmcc-nav-cta" onClick={()=>{if(onNavigate){onNavigate("schedule");window.scrollTo(0,0);}}}>Schedule Consultation</button>
      
        {/* Hamburger */}
        <button
          className={`dmcc-nav-hamburger${_dmccOpen ? " open" : ""}`}
          onClick={() => setdmccOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`dmcc-drawer${_dmccOpen ? " open" : ""}`}>
        <div className="dmcc-drawer-brand"
          onClick={() => { setdmccOpen(false); if(onNavigate) { onNavigate("home"); window.scrollTo(0,0); } }}>
          INCO<em>ZONE</em>
        </div>
        {["Services","Free Zones","About","Blog","Contact"].map((l) => {
          const pm = {"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};
          return (
            <button key={l} className="dmcc-dlink"
              onClick={() => { setdmccOpen(false); if(onNavigate) { onNavigate(pm[l]); window.scrollTo(0,0); } }}>
              {l}
            </button>
          );
        })}
        <div className="dmcc-drawer-div" />
        <button className="dmcc-dcta"
          onClick={() => { setdmccOpen(false); if(onNavigate) { onNavigate("schedule"); window.scrollTo(0,0); } }}>
          Schedule Consultation
        </button>
      </div>

      {/* ── HERO ── */}
      <div className="dmcc-hero">
        <HeroCanvas />
        <button className="dmcc-back-btn" onClick={onBack}>Back to Free Zones</button>

        <div className="dmcc-hero-left">
          <div className="dmcc-hero-eyebrow">
            <div className="dmcc-hero-eyebrow-dot" />
            Trade &amp; Commodities · UAE Free Zone
          </div>
          <h1 className="dmcc-hero-h1">DMCC<em>Free Zone</em></h1>
          <div className="dmcc-hero-fullname">Dubai Multi Commodities Centre</div>
          <p className="dmcc-hero-desc">
            The world's most connected free zone — home to 23,000+ companies across commodities, fintech, professional services, and technology. Consistently ranked <strong style={{ color: "var(--g300)" }}>#1 globally</strong> by the Financial Times fDi Magazine.
          </p>
          <div className="dmcc-hero-actions">
            <button className="dmcc-btn-gold">Start DMCC Setup →</button>
            <button className="dmcc-btn-ghost">Download Free Guide</button>
          </div>
        </div>

        <div className="dmcc-hero-right">
          <div className="dmcc-hero-card">
            <span className="dmcc-hero-card-label">Quick Reference</span>
            {[
              ["Location","JLT, Dubai"], ["Setup From","AED 18,500","gold"],
              ["Setup Time","7–14 Days"], ["Min. Capital","AED 50,000"],
              ["Ownership","100% Foreign","gold"], ["Visa Quota","Up to 6"],
              ["Annual Renewal","AED 12–18K"], ["Tax","0% Personal"],
            ].map(([l, v, cls]) => (
              <div className="dmcc-hero-card-row" key={l}>
                <span>{l}</span>
                <span className={cls || ""}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dmcc-scroll-hint"><span>Scroll</span><div className="dmcc-scroll-line" /></div>
      </div>

      {/* ── STATS ── */}
      <div className="dmcc-stats">
        {STATS.map((s, i) => (
          <div className="dmcc-stat" key={i}>
            <span className="dmcc-stat-val">{s.v}</span>
            <span className="dmcc-stat-key">{s.k}</span>
          </div>
        ))}
      </div>

      {/* ── ZONE OVERVIEW / INTRO ── */}
      <div className="dmcc-intro dmcc-section">
        <span className="dmcc-section-label dmcc-reveal">Zone Overview</span>
        <h2 className="dmcc-h2 dmcc-reveal dr1" style={{ maxWidth: "640px" }}>
          Why DMCC is the<br /><em>World's Premier Free Zone</em>
        </h2>
        <div className="dmcc-intro-grid">
          <div className="dmcc-intro-text">
            <p className="dmcc-reveal dr1">
              <strong>DMCC (Dubai Multi Commodities Centre)</strong> was established in 2002 and has since grown into the UAE's most prestigious free zone — hosting over 23,000 companies from 170+ countries. It is consistently ranked as the <strong>world's #1 free zone</strong> by the Financial Times fDi Magazine for over a decade.
            </p>
            <p className="dmcc-reveal dr2">
              Located in the heart of <strong>Jumeirah Lake Towers (JLT)</strong>, DMCC offers unparalleled access to Dubai's financial district, world-class infrastructure, and a thriving business community. The zone is particularly renowned for commodities trading — gold, diamonds, tea, and cotton — alongside fintech, technology, and professional services.
            </p>
            <p className="dmcc-reveal dr3">
              As a DMCC member company, you benefit from <strong>100% foreign ownership</strong>, full profit repatriation, zero personal income tax, and access to DMCC's exclusive ecosystem of 23,000+ businesses, curated networking events, and dedicated government support services.
            </p>
            <p className="dmcc-reveal dr3" style={{ marginTop: "8px" }}>
              DMCC is a <strong>UAE Federal Government authority</strong> — giving it an internationally recognised, regulated status that commands credibility with global banks, investors, and corporate partners that smaller free zones cannot match.
            </p>
          </div>
          <div className="dmcc-reveal dr2">
            <div className="dmcc-pillars">
              {[
                { i:"", h:"World's #1 Free Zone", p:"Ranked #1 globally by Financial Times fDi Magazine for 10 consecutive years — the only free zone to achieve this." },
                { i:"", h:"Global Connectivity", p:"190+ countries connected through DMCC's trade and business network. Unrivalled for international commodity flows." },
                { i:"", h:"Regulated & Credible", p:"DMCC is a UAE government authority — internationally recognised, respected by banks and institutional investors worldwide." },
                { i:"", h:"Full Business Ecosystem", p:"Legal, banking, logistics, insurance and business services all operate within the DMCC zone — everything in one place." },
                { i:"", h:"100% Profit Repatriation", p:"No restrictions on moving funds internationally. Zero capital controls or withholding taxes on dividends or profits." },
              ].map((p, i) => (
                <div className="dmcc-pillar" key={i}>
                  <div className="dmcc-pillar-icon">{p.i}</div>
                  <div><h4>{p.h}</h4><p>{p.p}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PACKAGES (CREAM) ── */}
      <div className="dmcc-packages dmcc-section">
        <span className="dmcc-section-label dmcc-reveal">Setup Packages</span>
        <h2 className="dmcc-h2 dmcc-reveal dr1">Choose Your <em>DMCC Package</em></h2>
        <p className="dmcc-reveal dr2" style={{ fontSize: "0.84rem", color: "var(--cream-ink3)", marginTop: "10px", maxWidth: "520px" }}>
          All packages include full company incorporation. Select based on your activity scope, team size, and workspace needs.
        </p>
        <div className="dmcc-pkg-grid">
          {[
            { name:"Starter", tag:"Sole operators & single-activity businesses", price:"18,500", badge:null, feats:[{t:"1 Trade License Activity",on:true},{t:"Flexi Desk (Shared Workspace)",on:true},{t:"2 Investor Visa Allocation",on:true},{t:"Company Stamp & MOA",on:true},{t:"Bank Account Assistance",on:false},{t:"Dedicated Relationship Manager",on:false}] },
            { name:"Business", tag:"Growing SMEs & multi-activity setups", price:"26,900", badge:"Most Popular", featured:true, feats:[{t:"3 Trade License Activities",on:true},{t:"Serviced Office or Flexi Desk",on:true},{t:"4 Investor Visa Allocation",on:true},{t:"Full Corporate Documents",on:true},{t:"Bank Account Assistance",on:true},{t:"Dedicated Relationship Manager",on:false}] },
            { name:"Elite", tag:"Full-scale corporate & trading operations", price:"44,500", badge:"Premium", feats:[{t:"Unlimited Activities",on:true},{t:"Private Office",on:true},{t:"6+ Investor Visas",on:true},{t:"Full Corporate Documents",on:true},{t:"Priority Bank Account Setup",on:true},{t:"Dedicated Relationship Manager",on:true}] },
          ].map((pkg, i) => (
            <div className={`dmcc-pkg dmcc-reveal dr${i+1}${pkg.featured?" featured":""}`} key={i}>
              {pkg.badge && <div className="dmcc-pkg-badge">{pkg.badge}</div>}
              <div className="dmcc-pkg-name">{pkg.name}</div>
              <p className="dmcc-pkg-tag">{pkg.tag}</p>
              <div className="dmcc-pkg-price">
                <div className="dmcc-pkg-amount">AED {pkg.price}</div>
                <div className="dmcc-pkg-period">One-time setup · excludes annual renewal</div>
              </div>
              <ul className="dmcc-pkg-features">
                {pkg.feats.map((f, j) => (
                  <li className="dmcc-pkg-feat" key={j}>
                    <span className={f.on ? "feat-on" : "feat-off"}>{f.on ? "" : "×"}</span>
                    <span className={f.on ? "feat-label-on" : "feat-label-off"}>{f.t}</span>
                  </li>
                ))}
              </ul>
              <button className="dmcc-pkg-btn">{pkg.featured ? "Select This Package →" : "Get Started →"}</button>
            </div>
          ))}
        </div>
      </div>

      {/* ── ACTIVITIES ── */}
      <div className="dmcc-activities dmcc-section">
        <span className="dmcc-section-label dmcc-reveal">Licensed Activities</span>
        <h2 className="dmcc-h2 dmcc-reveal dr1">What Can You Do <em>Under DMCC?</em></h2>
        <p className="dmcc-reveal dr2" style={{ fontSize: "0.83rem", color: "var(--w60)", marginTop: "10px", marginBottom: "0", maxWidth: "580px" }}>
          DMCC supports 600+ business activities across multiple sectors. Here are the most popular:
        </p>
        <div className="dmcc-act-grid" style={{ marginTop: "44px" }}>
          {ACTIVITIES.map((a, i) => (
            <div className={`dmcc-act-card dmcc-reveal dr${(i%4)+1}`} key={i}>
              <div className="dmcc-act-icon">{a.i}</div>
              <div className="dmcc-act-name">{a.n}</div>
              <div className="dmcc-act-desc">{a.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROCESS ── */}
      <div className="dmcc-process dmcc-section">
        <span className="dmcc-section-label dmcc-reveal" style={{ textAlign: "center", display: "block" }}>Setup Process</span>
        <h2 className="dmcc-h2 dmcc-reveal dr1" style={{ textAlign: "center" }}>Your DMCC <em>Journey — Step by Step</em></h2>
        <div className="dmcc-process-inner">
          {STEPS.map((s, i) => (
            <div className={`dmcc-step dmcc-reveal dr${(i%4)+1}`} key={i}>
              <div className="dmcc-step-num">{s.n}</div>
              <div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <div className="dmcc-step-time">{s.time}</div>
                <div className="dmcc-step-docs">{s.docs.map(d => <span className="dmcc-doc-tag" key={d}>{d}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DOCUMENTS ── */}
      <div className="dmcc-documents dmcc-section">
        <span className="dmcc-section-label dmcc-reveal">Required Documents</span>
        <h2 className="dmcc-h2 dmcc-reveal dr1">What You <em>Need to Prepare</em></h2>
        <p className="dmcc-reveal dr2" style={{ fontSize: "0.83rem", color: "var(--w60)", marginTop: "10px" }}>
          Preparing documents in advance significantly speeds up your DMCC setup. Here is the complete checklist:
        </p>
        <div className="dmcc-docs-grid">
          {DOCUMENTS.map((d, i) => (
            <div className={`dmcc-doc-card dmcc-reveal dr${(i%2)+1}`} key={i}>
              <div className="dmcc-doc-num">0{i+1}</div>
              <div><div className="dmcc-doc-title">{d.t}</div><div className="dmcc-doc-desc">{d.d}</div></div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CALCULATOR ── */}
      <div className="dmcc-calc dmcc-section">
        <span className="dmcc-section-label dmcc-reveal">Cost Estimator</span>
        <Calculator />
      </div>

      {/* ── FAQ ── */}
      <div className="dmcc-faq dmcc-section">
        <span className="dmcc-section-label dmcc-reveal" style={{ textAlign: "center", display: "block" }}>FAQ</span>
        <h2 className="dmcc-h2 dmcc-reveal dr1" style={{ textAlign: "center" }}>Frequently Asked <em>Questions</em></h2>
        <div className="dmcc-faq-inner">
          {FAQS.map((f, i) => (
            <div className={`dmcc-faq-item dmcc-reveal dr${(i%3)+1}${openFaq===i?" open":""}`} key={i}>
              <button className="dmcc-faq-q" onClick={() => setOpenFaq(openFaq===i ? null : i)}>
                <span className="dmcc-faq-q-text">{f.q}</span>
                <div className="dmcc-faq-icon">+</div>
              </button>
              <div className="dmcc-faq-answer">
                <div className="dmcc-faq-answer-inner">
                  <p>{f.a}</p>
                  {f.list && <ul>{f.list.map(li => <li key={li}>{li}</li>)}</ul>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ADVISORY ── */}
      <div className="dmcc-advisory dmcc-section">
        <span className="dmcc-section-label dmcc-reveal" style={{ textAlign: "center", display: "block" }}>INCOZONE Advisory</span>
        <h2 className="dmcc-h2 dmcc-reveal dr1" style={{ textAlign: "center" }}>Expert Advice Before <em>You Decide</em></h2>
        <div className="dmcc-advisory-inner">
          <div className="dmcc-advisory-quote dmcc-reveal dr2">
            "DMCC is an excellent choice — but only if it aligns with your business model.{" "}
            <strong>Do not choose DMCC simply because it is prestigious.</strong> We have seen many clients pay a premium for DMCC when IFZA or Meydan would have served them equally well at a fraction of the cost. Our job is to find the right fit, not the most expensive one."
            <div className="dmcc-advisory-quote-attr">— INCOZONE Advisory Team</div>
          </div>
          <div className="dmcc-advisory-tips">
            {[
              { n:"01", t:"Choose Activities Carefully", p:"DMCC licenses activities very specifically. Over-licensing unused activities adds cost without benefit. Under-licensing restricts your operations. Our advisors will map your exact business model to the right activities before submission." },
              { n:"02", t:"Plan Your Visa Quota Early", p:"Many clients underestimate visa requirements at setup. We recommend planning for at least 2x your current team size to allow growth. Upgrading office space later to get more visas is possible but adds cost and time." },
              { n:"03", t:"Bank Account — Start Early", p:"UAE bank account opening is the longest part of the process. Some banks take 4–8 weeks. Submit banking applications immediately after license issuance. Strong source-of-funds documentation dramatically speeds up approval." },
              { n:"04", t:"Corporate Tax Compliance", p:"Since UAE's 9% corporate tax launched in 2023, DMCC free zone companies must maintain proper financial records and understand their Qualifying Income status. INCOZONE connects you with licensed tax agents from day one." },
            ].map((tip, i) => (
              <div className={`dmcc-tip dmcc-reveal dr${(i%2)+1}`} key={i}>
                <span className="dmcc-tip-num">{tip.n}</span>
                <h4>{tip.t}</h4>
                <p>{tip.p}</p>
              </div>
            ))}
          </div>
          <div className="dmcc-advisory-warning dmcc-reveal">
            <h4> Common Mistakes to Avoid</h4>
            <p>The most common errors: choosing too few activities and needing expensive amendments later · underestimating visa requirements at setup · not preparing source-of-funds documentation before banking · missing annual renewal deadlines (results in fines and license suspension) · choosing the wrong office type for your visa needs. INCOZONE's advisory process is specifically designed to prevent all of these.</p>
          </div>
        </div>
      </div>

      {/* ── CTA (CREAM) ── */}
      <div className="dmcc-cta">
        <div className="dmcc-cta-inner">
          <span className="dmcc-section-label dmcc-reveal">Begin Your Journey</span>
          <h2 className="dmcc-reveal dr1">Ready to Establish Your<br /><em>DMCC Presence?</em></h2>
          <div className="dmcc-cta-divider" />
          <p className="dmcc-reveal dr2">
            Schedule a private consultation. No obligation. Our DMCC specialists will assess your situation and give you a clear, honest recommendation — whether that's DMCC or another zone entirely.
          </p>
          <div className="dmcc-cta-btns dmcc-reveal dr3">
            <button className="btn-ink" onClick={() => { if(onNavigate){ onNavigate("schedule"); window.scrollTo(0,0); } }}>Schedule Private Consultation</button>
            <button className="btn-cream-outline" onClick={onBack}>← Explore Other Zones</button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="dmcc-footer">
        <div className="dmcc-footer-inner">
          <div className="dmcc-footer-logo">INCO<em>ZONE</em></div>
          <div className="dmcc-footer-copy">© 2025 INCOZONE. All rights reserved. Dubai, UAE.</div>
          <button className="dmcc-footer-back" onClick={onBack}>← Back to Free Zones</button>
        </div>
      </div>

      {/* ── WA FLOAT ── */}
      <div className="dmcc-wa">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </div>
    </div>
  );
}
