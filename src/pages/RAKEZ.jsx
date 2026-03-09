import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — RAKEZ Free Zone Page  (standalone, self-contained)
//  Drop into: src/pages/RAKEZ.jsx
//  Same structure & palette as DMCC.jsx — only content differs
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

.rkz-root *, .rkz-root *::before, .rkz-root *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}
.rkz-root {
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
.rkz-nav {
  position: fixed; inset-inline: 0; top: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 60px;
  transition: background 0.5s, padding 0.4s, border-color 0.5s;
  border-bottom: 1px solid transparent;
}
.rkz-nav.scrolled {
  background: rgba(5,17,30,0.96); backdrop-filter: blur(20px);
  padding: 14px 60px; border-bottom-color: rgba(201,168,76,0.12);
}
.rkz-nav-logo { font-family: var(--fd); font-size: 1.5rem; font-weight: 500; letter-spacing: 0.15em; color: var(--w); cursor: pointer; }
.rkz-nav-logo em { color: var(--g400); font-style: normal; }
.rkz-nav-links { display: flex; gap: 36px; list-style: none; }
.rkz-nav-links a { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--w60); text-decoration: none; transition: color 0.3s; }
.rkz-nav-links a:hover { color: var(--g300); }
.rkz-nav-cta {
  font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
  background: transparent; border: 1px solid var(--g400); color: var(--g400);
  padding: 9px 22px; cursor: pointer; font-family: var(--fb);
  transition: background 0.3s, color 0.3s;
}
.rkz-nav-cta:hover { background: var(--g400); color: var(--n900); }
.rkz-back-btn {
  position: absolute; top: 90px; left: 60px; z-index: 20;
  background: none; border: none; font-family: var(--fb); font-size: 0.7rem;
  letter-spacing: 0.18em; text-transform: uppercase; color: var(--w30);
  cursor: pointer; display: flex; align-items: center; gap: 10px; padding: 0;
  transition: color 0.3s;
}
.rkz-back-btn:hover { color: var(--g400); }
.rkz-back-btn::before { content: '←'; font-size: 0.9rem; }

/* ── HERO ────────────────────────────────────────────────────── */
.rkz-hero {
  min-height: 100vh; position: relative; overflow: hidden;
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: flex-end; padding: 0 60px 80px; gap: 60px;
}
.rkz-hero-canvas { position: absolute; inset: 0; z-index: 0; display: block; }
.rkz-hero-left { position: relative; z-index: 2; padding-top: 160px; }
.rkz-hero-right { position: relative; z-index: 2; padding-top: 160px; display: flex; align-items: flex-end; justify-content: flex-end; }
.rkz-hero-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--g400); border: 1px solid rgba(201,168,76,0.28); padding: 7px 16px;
  margin-bottom: 32px;
  opacity: 0; transform: translateY(16px);
  animation: rkzFadeUp 1s var(--ease) 0.2s forwards;
}
.rkz-hero-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--g400); animation: rkzBlink 2s infinite; }
.rkz-hero-h1 {
  font-family: var(--fd); font-weight: 300; line-height: 0.88;
  letter-spacing: -0.02em; color: var(--w);
  font-size: clamp(5rem, 10vw, 9.5rem); margin-bottom: 20px;
  opacity: 0; transform: translateY(20px);
  animation: rkzFadeUp 1.1s var(--ease) 0.35s forwards;
}
.rkz-hero-h1 em { display: block; color: var(--g400); font-style: italic; font-weight: 300; }
.rkz-hero-fullname {
  font-family: var(--fd); font-size: 1rem; font-weight: 300;
  color: var(--w60); font-style: italic; margin-bottom: 36px; letter-spacing: 0.04em;
  opacity: 0; animation: rkzFadeUp 1s var(--ease) 0.5s forwards;
}
.rkz-hero-desc {
  font-size: 0.86rem; color: var(--w80); line-height: 1.85; max-width: 520px; margin-bottom: 44px;
  opacity: 0; animation: rkzFadeUp 1s var(--ease) 0.65s forwards;
}
.rkz-hero-actions {
  display: flex; gap: 14px; flex-wrap: wrap;
  opacity: 0; animation: rkzFadeUp 1s var(--ease) 0.8s forwards;
}
.rkz-hero-card {
  background: rgba(11,28,45,0.85); backdrop-filter: blur(16px);
  border: 1px solid var(--w12); padding: 36px 32px; min-width: 280px;
  opacity: 0; animation: rkzFadeUp 1.1s var(--ease) 0.9s forwards;
}
.rkz-hero-card-label {
  font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--g400); margin-bottom: 20px; display: block;
}
.rkz-hero-card-row {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 11px 0; border-bottom: 1px solid var(--w06); font-size: 0.78rem;
}
.rkz-hero-card-row:last-child { border-bottom: none; }
.rkz-hero-card-row span:first-child { color: var(--w60); }
.rkz-hero-card-row span:last-child { color: var(--w); font-weight: 500; text-align: right; }
.rkz-hero-card-row span.gold { color: var(--g400); }
.rkz-scroll-hint {
  position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
  z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px;
  opacity: 0; animation: rkzFadeUp 1s var(--ease) 1.2s forwards;
}
.rkz-scroll-hint span { font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--w30); }
.rkz-scroll-line { width: 1px; height: 44px; background: linear-gradient(to bottom, var(--g400), transparent); animation: rkzScrollPulse 2.2s ease-in-out infinite; }

/* ── STATS BAR ───────────────────────────────────────────────── */
.rkz-stats {
  display: grid; grid-template-columns: repeat(6, 1fr);
  background: var(--n950); border-top: 1px solid var(--w12);
  border-bottom: 1px solid var(--w12);
}
.rkz-stat { padding: 28px 20px; text-align: center; border-right: 1px solid var(--w12); transition: background 0.3s; }
.rkz-stat:last-child { border-right: none; }
.rkz-stat:hover { background: var(--glow3); }
.rkz-stat-val { font-family: var(--fd); font-size: 2rem; font-weight: 300; color: var(--g400); display: block; line-height: 1; }
.rkz-stat-key { font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--w30); margin-top: 6px; display: block; }

/* ── SECTION BASICS ──────────────────────────────────────────── */
.rkz-section { padding: 96px 60px; }
.rkz-section-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--g400); margin-bottom: 14px; display: block; }
.rkz-h2 { font-family: var(--fd); font-size: clamp(2rem, 3.8vw, 3.4rem); font-weight: 300; line-height: 1.15; color: var(--w); }
.rkz-h2 em { color: var(--g400); font-style: italic; }

/* ── INTRO ───────────────────────────────────────────────────── */
.rkz-intro { background: var(--n800); }
.rkz-intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; margin-top: 52px; }
.rkz-intro-text p { font-size: 0.88rem; color: var(--w60); line-height: 1.88; margin-bottom: 22px; }
.rkz-intro-text p strong { color: var(--w); font-weight: 500; }
.rkz-intro-text p:last-child { margin-bottom: 0; }
.rkz-pillars { display: flex; flex-direction: column; }
.rkz-pillar { display: flex; gap: 20px; padding: 22px 0; border-bottom: 1px solid var(--w06); transition: padding-left 0.3s var(--ease); }
.rkz-pillar:first-child { border-top: 1px solid var(--w06); }
.rkz-pillar:hover { padding-left: 10px; }
.rkz-pillar-icon { font-size: 1.3rem; flex-shrink: 0; margin-top: 2px; }
.rkz-pillar h4 { font-size: 0.88rem; font-weight: 500; color: var(--w); margin-bottom: 5px; }
.rkz-pillar p { font-size: 0.77rem; color: var(--w60); line-height: 1.65; }

/* ── PACKAGES ────────────────────────────────────────────────── */
.rkz-packages { background: var(--cream-bg); position: relative; overflow: hidden; }
.rkz-packages::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(201,168,76,0.09), transparent 60%);
  pointer-events: none;
}
.rkz-packages::after {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, transparent, var(--g400) 40%, transparent);
  opacity: 0.6;
}
.rkz-packages .rkz-section-label { color: #8A6820; }
.rkz-packages .rkz-h2 { color: var(--cream-ink); }
.rkz-packages .rkz-h2 em { color: var(--g400); }
.rkz-pkg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 52px; }
.rkz-pkg {
  background: var(--cream-bg); border: 1px solid var(--cream-bdr);
  padding: 40px 34px; display: flex; flex-direction: column;
  transition: transform 0.35s var(--ease), box-shadow 0.35s var(--ease), border-color 0.35s;
  box-shadow: 0 2px 16px rgba(120,90,30,0.06); position: relative;
}
.rkz-pkg:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(120,90,30,0.14); border-color: rgba(201,168,76,0.45); }
.rkz-pkg.featured { background: var(--n900); border-color: rgba(201,168,76,0.35); box-shadow: 0 8px 40px rgba(0,0,0,0.25); }
.rkz-pkg.featured:hover { border-color: var(--g400); box-shadow: 0 24px 60px rgba(0,0,0,0.35); }
.rkz-pkg-badge { font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; padding: 4px 12px; width: fit-content; margin-bottom: 22px; font-weight: 500; }
.rkz-pkg:not(.featured) .rkz-pkg-badge { border: 1px solid var(--cream-bdr); color: var(--cream-ink3); background: var(--cream-100); }
.rkz-pkg.featured .rkz-pkg-badge { border: 1px solid var(--g400); color: var(--g400); background: rgba(201,168,76,0.08); }
.rkz-pkg-name { font-family: var(--fd); font-size: 2rem; font-weight: 400; margin-bottom: 6px; }
.rkz-pkg:not(.featured) .rkz-pkg-name { color: var(--cream-ink); }
.rkz-pkg.featured .rkz-pkg-name { color: var(--w); }
.rkz-pkg-tag { font-size: 0.75rem; margin-bottom: 26px; }
.rkz-pkg:not(.featured) .rkz-pkg-tag { color: var(--cream-ink3); }
.rkz-pkg.featured .rkz-pkg-tag { color: var(--w60); }
.rkz-pkg-price { margin-bottom: 28px; padding-bottom: 24px; }
.rkz-pkg:not(.featured) .rkz-pkg-price { border-bottom: 1px solid var(--cream-bdr); }
.rkz-pkg.featured .rkz-pkg-price { border-bottom: 1px solid var(--w12); }
.rkz-pkg-amount { font-family: var(--fd); font-size: 3rem; font-weight: 300; line-height: 1; }
.rkz-pkg:not(.featured) .rkz-pkg-amount { color: var(--cream-ink); }
.rkz-pkg.featured .rkz-pkg-amount { color: var(--g400); }
.rkz-pkg-period { font-size: 0.68rem; letter-spacing: 0.08em; margin-top: 5px; }
.rkz-pkg:not(.featured) .rkz-pkg-period { color: var(--cream-bdr); }
.rkz-pkg.featured .rkz-pkg-period { color: var(--w30); }
.rkz-pkg-features { list-style: none; display: flex; flex-direction: column; gap: 12px; flex: 1; margin-bottom: 32px; }
.rkz-pkg-feat { display: flex; align-items: flex-start; gap: 11px; font-size: 0.79rem; line-height: 1.5; }
.rkz-feat-on { color: #8A6820; flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.rkz-feat-off { color: var(--cream-bdr); flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.rkz-pkg.featured .rkz-feat-on { color: var(--g400); }
.rkz-pkg.featured .rkz-feat-off { color: var(--w30); }
.rkz-feat-label-on { color: var(--cream-ink2); }
.rkz-feat-label-off { color: var(--cream-bdr); }
.rkz-pkg.featured .rkz-feat-label-on { color: var(--w80); }
.rkz-pkg.featured .rkz-feat-label-off { color: var(--w30); }
.rkz-pkg-btn { width: 100%; padding: 13px 20px; font-family: var(--fb); font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
.rkz-pkg:not(.featured) .rkz-pkg-btn { background: transparent; border: 1px solid var(--cream-bdr); color: var(--cream-ink2); }
.rkz-pkg:not(.featured) .rkz-pkg-btn:hover { border-color: var(--g400); background: var(--cream-100); color: var(--cream-ink); }
.rkz-pkg.featured .rkz-pkg-btn { background: var(--g400); border: none; color: var(--n900); font-weight: 500; }
.rkz-pkg.featured .rkz-pkg-btn:hover { background: var(--g300); }

/* ── ACTIVITIES ──────────────────────────────────────────────── */
.rkz-activities { background: var(--n800); }
.rkz-act-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; margin-top: 52px; background: var(--w06); }
.rkz-act-card { background: var(--n800); padding: 30px 24px; transition: background 0.3s; cursor: default; }
.rkz-act-card:hover { background: var(--n750); }
.rkz-act-card:hover .rkz-act-name { color: var(--g300); }
.rkz-act-icon { font-size: 1.5rem; margin-bottom: 14px; }
.rkz-act-name { font-size: 0.84rem; font-weight: 500; color: var(--w); margin-bottom: 7px; transition: color 0.3s; }
.rkz-act-desc { font-size: 0.73rem; color: var(--w60); line-height: 1.6; }

/* ── PROCESS ─────────────────────────────────────────────────── */
.rkz-process { background: var(--n900); }
.rkz-process-inner { max-width: 780px; margin: 52px auto 0; }
.rkz-step { display: grid; grid-template-columns: 64px 1fr; gap: 28px; padding: 36px 0; border-bottom: 1px solid var(--w06); position: relative; }
.rkz-step:last-child { border-bottom: none; }
.rkz-step::before { content: ''; position: absolute; left: 31px; top: 84px; bottom: -36px; width: 1px; background: linear-gradient(to bottom, rgba(201,168,76,0.25), transparent); }
.rkz-step:last-child::before { display: none; }
.rkz-step-num { width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--g400); display: flex; align-items: center; justify-content: center; font-family: var(--fd); font-size: 0.92rem; color: var(--g400); background: var(--n900); position: relative; z-index: 1; flex-shrink: 0; }
.rkz-step h3 { font-size: 0.96rem; font-weight: 500; color: var(--w); margin-bottom: 8px; }
.rkz-step p { font-size: 0.81rem; color: var(--w60); line-height: 1.78; margin-bottom: 10px; }
.rkz-step-time { font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--g400); margin-bottom: 12px; }
.rkz-step-docs { display: flex; gap: 6px; flex-wrap: wrap; }
.rkz-doc-tag { font-size: 0.62rem; padding: 4px 9px; border: 1px solid var(--w12); color: var(--w60); letter-spacing: 0.07em; }

/* ── DOCUMENTS ───────────────────────────────────────────────── */
.rkz-documents { background: var(--n800); }
.rkz-docs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 52px; }
.rkz-doc-card { background: var(--n900); border: 1px solid var(--w06); padding: 22px 26px; display: flex; align-items: center; gap: 18px; transition: border-color 0.3s; }
.rkz-doc-card:hover { border-color: rgba(201,168,76,0.2); }
.rkz-doc-num { font-family: var(--fd); font-size: 1.9rem; font-weight: 300; color: rgba(201,168,76,0.18); min-width: 36px; line-height: 1; }
.rkz-doc-title { font-size: 0.82rem; font-weight: 500; color: var(--w); margin-bottom: 4px; }
.rkz-doc-desc { font-size: 0.72rem; color: var(--w60); line-height: 1.55; }

/* ── CALCULATOR ──────────────────────────────────────────────── */
.rkz-calc { background: var(--n750); }
.rkz-calc-inner { display: grid; grid-template-columns: 1.3fr 1fr; gap: 64px; align-items: start; margin-top: 52px; }
.rkz-calc-form { display: flex; flex-direction: column; gap: 22px; }
.rkz-calc-field { display: flex; flex-direction: column; gap: 7px; }
.rkz-calc-label { font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--w60); }
.rkz-calc-select { background: var(--n900); border: 1px solid var(--w12); color: var(--w); padding: 13px 16px; font-family: var(--fb); font-size: 0.83rem; font-weight: 300; outline: none; transition: border-color 0.3s; appearance: none; -webkit-appearance: none; cursor: pointer; }
.rkz-calc-select:focus { border-color: var(--g400); }
.rkz-calc-select option { background: var(--n800); }
.rkz-toggle-row { display: flex; }
.rkz-toggle { flex: 1; padding: 11px 10px; font-size: 0.66rem; letter-spacing: 0.12em; text-transform: uppercase; font-family: var(--fb); cursor: pointer; background: var(--n900); border: 1px solid var(--w12); color: var(--w60); transition: all 0.3s; margin-right: -1px; text-align: center; }
.rkz-toggle.on { background: var(--glow2); border-color: var(--g400); color: var(--g400); position: relative; z-index: 1; }
.rkz-result { background: var(--n900); border: 1px solid rgba(201,168,76,0.2); padding: 40px 36px; position: sticky; top: 90px; }
.rkz-result-tag { font-size: 0.6rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--g400); margin-bottom: 22px; display: block; }
.rkz-result-amount { font-family: var(--fd); font-size: 3.6rem; font-weight: 300; line-height: 1; color: var(--w); }
.rkz-result-currency { color: var(--g400); }
.rkz-result-note { font-size: 0.66rem; color: var(--w30); margin-top: 4px; margin-bottom: 28px; }
.rkz-result-lines { border-top: 1px solid var(--w12); margin-bottom: 24px; }
.rkz-result-line { display: flex; justify-content: space-between; padding: 11px 0; border-bottom: 1px solid var(--w06); font-size: 0.76rem; }
.rkz-result-line-lbl { color: var(--w60); }
.rkz-result-line-val { color: var(--w); font-weight: 500; }
.rkz-result-total-row { display: flex; justify-content: space-between; padding: 14px 0 0; font-size: 0.86rem; }
.rkz-result-disclaimer { font-size: 0.68rem; color: var(--w30); line-height: 1.65; margin-bottom: 22px; margin-top: 14px; }

/* ── FAQ ─────────────────────────────────────────────────────── */
.rkz-faq { background: var(--n900); }
.rkz-faq-inner { max-width: 820px; margin: 52px auto 0; }
.rkz-faq-item { border-bottom: 1px solid var(--w06); }
.rkz-faq-q { width: 100%; background: none; border: none; padding: 26px 0; display: flex; align-items: center; justify-content: space-between; gap: 24px; cursor: pointer; text-align: left; font-family: var(--fb); }
.rkz-faq-q-text { font-size: 0.92rem; font-weight: 400; color: var(--w); line-height: 1.5; }
.rkz-faq-icon { width: 26px; height: 26px; border: 1px solid var(--w12); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--g400); font-size: 1.1rem; flex-shrink: 0; transition: all 0.3s; }
.rkz-faq-item.open .rkz-faq-icon { background: var(--g400); color: var(--n900); border-color: var(--g400); transform: rotate(45deg); }
.rkz-faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.45s var(--ease); }
.rkz-faq-item.open .rkz-faq-answer { max-height: 500px; }
.rkz-faq-answer-inner { padding-bottom: 24px; }
.rkz-faq-answer p { font-size: 0.83rem; color: var(--w60); line-height: 1.85; }
.rkz-faq-answer ul { margin-top: 12px; list-style: none; display: flex; flex-direction: column; gap: 7px; }
.rkz-faq-answer ul li { font-size: 0.8rem; color: var(--w60); padding-left: 18px; position: relative; line-height: 1.6; }
.rkz-faq-answer ul li::before { content: '—'; position: absolute; left: 0; color: var(--g400); }

/* ── ADVISORY ────────────────────────────────────────────────── */
.rkz-advisory { background: var(--n800); position: relative; overflow: hidden; }
.rkz-advisory::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 70% at 50% 50%, rgba(201,168,76,0.04), transparent); pointer-events: none; }
.rkz-advisory-inner { max-width: 900px; margin: 52px auto 0; position: relative; z-index: 1; }
.rkz-advisory-quote { font-family: var(--fd); font-size: 1.35rem; font-weight: 300; color: var(--w80); line-height: 1.65; font-style: italic; text-align: center; padding: 40px 48px; border: 1px solid var(--w12); background: var(--n900); margin-bottom: 48px; }
.rkz-advisory-quote strong { color: var(--g400); font-style: normal; }
.rkz-advisory-quote-attr { margin-top: 18px; font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--g400); font-style: normal; }
.rkz-advisory-tips { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 36px; }
.rkz-tip { border: 1px solid var(--w06); padding: 30px 26px; transition: border-color 0.3s; }
.rkz-tip:hover { border-color: rgba(201,168,76,0.2); }
.rkz-tip-num { font-family: var(--fd); font-size: 0.68rem; letter-spacing: 0.22em; color: var(--g400); margin-bottom: 12px; display: block; }
.rkz-tip h4 { font-size: 0.9rem; font-weight: 500; color: var(--w); margin-bottom: 9px; }
.rkz-tip p { font-size: 0.78rem; color: var(--w60); line-height: 1.78; }
.rkz-advisory-warning { background: rgba(201,168,76,0.05); border: 1px solid rgba(201,168,76,0.18); padding: 26px 30px; margin-bottom: 32px; }
.rkz-advisory-warning h4 { font-size: 0.82rem; font-weight: 500; color: var(--g400); margin-bottom: 9px; }
.rkz-advisory-warning p { font-size: 0.78rem; color: var(--w60); line-height: 1.78; }

/* ── CTA (CREAM) ─────────────────────────────────────────────── */
.rkz-cta { background: var(--cream-bg); padding: 120px 60px; text-align: center; position: relative; overflow: hidden; }
.rkz-cta::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(180,150,90,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(180,150,90,0.06) 1px, transparent 1px); background-size: 56px 56px; }
.rkz-cta::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.10), transparent 70%); pointer-events: none; }
.rkz-cta-inner { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }
.rkz-cta .rkz-section-label { color: #8A6820; text-align: center; }
.rkz-cta h2 { font-family: var(--fd); font-size: clamp(2.4rem, 4.5vw, 4rem); font-weight: 300; color: var(--cream-ink); line-height: 1.15; margin-bottom: 18px; }
.rkz-cta h2 em { color: var(--g400); font-style: italic; }
.rkz-cta-divider { width: 44px; height: 1px; background: var(--g400); margin: 22px auto; opacity: 0.55; }
.rkz-cta p { font-size: 0.83rem; color: var(--cream-ink3); line-height: 1.8; margin-bottom: 44px; }
.rkz-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

/* ── BUTTONS ─────────────────────────────────────────────────── */
.rkz-btn-gold { padding: 15px 36px; background: var(--g400); color: var(--n900); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.rkz-btn-gold:hover { background: var(--g300); transform: translateY(-2px); }
.rkz-btn-ghost { padding: 15px 36px; background: transparent; color: var(--w); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--w30); cursor: pointer; transition: all 0.3s; }
.rkz-btn-ghost:hover { border-color: var(--g400); color: var(--g400); transform: translateY(-2px); }
.rkz-btn-ink { padding: 15px 36px; background: var(--cream-ink); color: var(--cream-bg); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.rkz-btn-ink:hover { background: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }
.rkz-btn-cream-outline { padding: 15px 36px; background: transparent; color: var(--cream-ink2); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--cream-bdr); cursor: pointer; transition: all 0.3s; }
.rkz-btn-cream-outline:hover { border-color: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }

/* ── FOOTER ──────────────────────────────────────────────────── */
.rkz-footer { background: var(--n950); padding: 52px 60px; border-top: 1px solid var(--w06); }
.rkz-footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
.rkz-footer-logo { font-family: var(--fd); font-size: 1.3rem; letter-spacing: 0.15em; color: var(--w); }
.rkz-footer-logo em { color: var(--g400); font-style: normal; }
.rkz-footer-copy { font-size: 0.68rem; color: var(--w30); }
.rkz-footer-back { padding: 9px 18px; background: transparent; border: 1px solid var(--w12); color: var(--w60); font-family: var(--fb); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
.rkz-footer-back:hover { border-color: var(--g400); color: var(--g400); }

/* ── WA FLOAT ────────────────────────────────────────────────── */
.rkz-wa { position: fixed; bottom: 28px; right: 28px; z-index: 300; width: 50px; height: 50px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 18px rgba(37,211,102,0.4); transition: transform 0.3s, box-shadow 0.3s; }
.rkz-wa:hover { transform: scale(1.1); box-shadow: 0 6px 26px rgba(37,211,102,0.55); }

/* ── REVEAL ──────────────────────────────────────────────────── */
.rkz-reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.8s var(--ease), transform 0.8s var(--ease); }
.rkz-reveal.in { opacity: 1; transform: translateY(0); }
.rr1 { transition-delay: 0.08s; } .rr2 { transition-delay: 0.18s; }
.rr3 { transition-delay: 0.28s; } .rr4 { transition-delay: 0.38s; }

/* ── KEYFRAMES ───────────────────────────────────────────────── */
@keyframes rkzFadeUp { to { opacity: 1; transform: translateY(0); } }
@keyframes rkzScrollPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
@keyframes rkzBlink { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.75); } }

/* ── RESPONSIVE ──────────────────────────────────────────────── */
@media(max-width:1100px) {
  .rkz-hero { grid-template-columns: 1fr; }
  .rkz-hero-right { display: none; }
  .rkz-intro-grid { grid-template-columns: 1fr; gap: 48px; }
  .rkz-pkg-grid { grid-template-columns: 1fr; max-width: 480px; }
  .rkz-act-grid { grid-template-columns: repeat(3, 1fr); }
  .rkz-calc-inner { grid-template-columns: 1fr; }
  .rkz-result { position: static; }
  .rkz-advisory-tips { grid-template-columns: 1fr; }
}
@media(max-width:768px) {
  .rkz-nav { padding: 16px 24px; } .rkz-nav.scrolled { padding: 12px 24px; } .rkz-nav-links { display: none; }
  .rkz-hero { padding: 0 24px 72px; }
  .rkz-back-btn { left: 24px; }
  .rkz-section { padding: 68px 24px; }
  .rkz-stats { grid-template-columns: repeat(3, 1fr); }
  .rkz-act-grid { grid-template-columns: repeat(2, 1fr); }
  .rkz-docs-grid { grid-template-columns: 1fr; }
  .rkz-footer { padding: 40px 24px; }
  .rkz-cta { padding: 80px 24px; }
}
@media(max-width:480px) {
  .rkz-stats { grid-template-columns: repeat(2, 1fr); }
  .rkz-act-grid { grid-template-columns: 1fr; }
  .rkz-hero-h1 { font-size: 4.5rem; }
}
`;

// ── DATA ──────────────────────────────────────────────────────
const STATS = [
  { v:"20,000+", k:"Companies" }, { v:"3–7", k:"Setup Days" },
  { v:"100%", k:"Foreign Ownership" }, { v:"0%", k:"Income Tax" },
  { v:"AED 8.5K", k:"Starting Cost" }, { v:"Saqr Port", k:"Direct Access" },
];

const ACTIVITIES = [
  { i:"🏭", n:"Manufacturing", d:"Production, assembly, processing and light industrial manufacturing" },
  { i:"📦", n:"Trading & Import/Export", d:"General trading, wholesale distribution and cross-border trade" },
  { i:"🚢", n:"Logistics & Warehousing", d:"Storage, freight forwarding, supply chain and distribution" },
  { i:"💻", n:"Technology & IT", d:"Software, IT consulting, digital services and tech startups" },
  { i:"💡", n:"Consulting & Professional", d:"Business consulting, management advisory and professional services" },
  { i:"🏗️", n:"Construction & Engineering", d:"Engineering services, construction consulting and project management" },
  { i:"🌿", n:"Food & Agriculture", d:"Food processing, agricultural trading and FMCG distribution" },
  { i:"⚗️", n:"Pharma & Chemicals", d:"Pharmaceutical trading, chemical distribution and healthcare products" },
  { i:"✈️", n:"Travel & Tourism", d:"Travel agencies, hospitality management and tourism services" },
  { i:"🎓", n:"Education & Training", d:"Training centres, educational consulting and e-learning platforms" },
  { i:"🏥", n:"Healthcare", d:"Medical equipment trading, healthcare consulting and wellness" },
  { i:"⚡", n:"Energy & Renewables", d:"Oil & gas trading, solar energy and clean technology solutions" },
];

const STEPS = [
  { n:"01", t:"Initial Consultation & Zone Fit Check", d:"Our RAKEZ specialists review your business model, activity requirements, and visa needs — confirming RAKEZ is the right fit or recommending an alternative if not.", time:"Day 1", docs:["Passport Copy","Business Overview"] },
  { n:"02", t:"Trade Name Reservation", d:"We submit your preferred company name to RAKEZ authority and prepare the complete application package aligned with RAK Government naming guidelines.", time:"Day 1–2", docs:["Name Options","Shareholder Details"] },
  { n:"03", t:"License Application Submission", d:"Full application submitted with all supporting documents. RAKEZ is known for one of the fastest processing times in the UAE.", time:"Day 2–4", docs:["Application Form","Passport Copies","KYC Documents"] },
  { n:"04", t:"RAKEZ Authority Approvals", d:"Authority reviews your application. For standard service and trading licenses, approvals typically come within 1–3 working days.", time:"Day 3–7", docs:["Activity Approvals","NOC if required"] },
  { n:"05", t:"License Issuance & Corporate Documents", d:"Trade license, MOA, Share Certificates, Company Stamp and all official documents issued — delivered digitally and physically.", time:"Day 5–7", docs:["Trade License","MOA","Share Certificates","Company Stamp"] },
  { n:"06", t:"Investor Visa Processing", d:"Entry permit, medical fitness test, biometrics and Emirates ID. Our PRO team manages the full process end-to-end in Ras Al Khaimah.", time:"Day 7–21", docs:["Visa Application","Medical Test","Emirates ID"] },
  { n:"07", t:"Bank Account Opening", d:"Introduction to our banking partners with UAE-wide coverage. Full documentation support throughout the account opening process.", time:"Day 21–35", docs:["Bank Application","Company Documents","Source of Funds"] },
];

const DOCUMENTS = [
  { t:"Passport Copies", d:"Valid passport copies for all shareholders and directors — minimum 6 months validity" },
  { t:"Passport-size Photographs", d:"White background, recent photographs for all shareholders and visa applicants" },
  { t:"Residential Address Proof", d:"Utility bill or bank statement — not older than 3 months" },
  { t:"Business Plan / Overview", d:"Brief description of your planned business activities and UAE objectives" },
  { t:"Source of Funds Declaration", d:"Bank statement or letter confirming the source of your investment funds" },
  { t:"NOC from Employer", d:"Required only if currently employed in the UAE under an existing residence visa" },
  { t:"Corporate Documents", d:"For corporate shareholders: Certificate of Incorporation, MOA, Board Resolution" },
  { t:"Bank Reference Letter", d:"Optional but recommended — significantly helps with UAE bank account opening" },
];

const FAQS = [
  { q:"How affordable is RAKEZ compared to other UAE free zones?", a:"RAKEZ starts from AED 8,500 — the most affordable major free zone in the UAE. IFZA starts from AED 12,000, Meydan from AED 14,500, and DMCC from AED 18,500. For budget-conscious businesses that don't need a Dubai address, RAKEZ is unbeatable on price." },
  { q:"Is RAKEZ a legitimate and internationally recognised free zone?", a:"Yes — RAKEZ is a UAE government free zone established under RAK Government authority. It is fully recognised by UAE banks, government entities, Emirates ID authority, and international partners. Over 20,000 companies from 100+ countries operate from RAKEZ." },
  { q:"Can I get a UAE residence visa through RAKEZ?", a:"Yes. A RAKEZ investor visa is a UAE residence visa — the same Emirates ID, the same residency rights, and the same banking access as any Dubai free zone visa. The zone address on your visa has no practical impact on your UAE residency." },
  { q:"How many visas can I get with a RAKEZ license?", a:"Visa allocation depends on your package and office type.", list:["Virtual Office: 1–2 Visas","Flexi Desk: 3 Visas","Office Unit: 5 Visas","Industrial / Warehouse Unit: 8+ Visas"] },
  { q:"Does RAKEZ have warehousing and industrial facilities?", a:"Yes — RAKEZ has dedicated industrial parks with warehouses, light industrial units, factories, and land plots. These are available at costs significantly below Dubai equivalents — making RAKEZ the go-to for any business that needs physical operational space." },
  { q:"Can RAKEZ companies serve Dubai-based clients?", a:"Yes. RAKEZ companies can provide services to clients across the UAE, including Dubai. For physical goods trading on the UAE mainland, a local distributor or customs arrangement is required — standard practice for all free zone companies." },
  { q:"What is the annual renewal cost for RAKEZ?", a:"RAKEZ annual renewal ranges from AED 6,000 to AED 11,000 depending on your license type, activities, and office arrangement — the lowest renewal cost of any major UAE free zone." },
  { q:"How does RAKEZ compare to IFZA?", a:"Both are affordable. RAKEZ wins on starting price, industrial infrastructure, warehouse availability, and visa quota for industrial setups. IFZA wins on its Dubai Silicon Oasis location and established banking recognition. INCOZONE will advise based on your specific business needs." },
  { q:"Can I set up RAKEZ remotely?", a:"Yes — RAKEZ license formation can be completed fully remotely. Visa processing and biometric registration require a brief UAE visit. INCOZONE helps you plan one efficient trip to complete visas and banking simultaneously." },
  { q:"What makes RAKEZ suitable for manufacturing?", a:"RAKEZ has purpose-built industrial zones with dedicated electricity, water, and logistics infrastructure. Companies can lease warehouses, factories, and land plots on flexible terms — with direct access to Saqr Port, one of the largest bulk cargo ports in the Middle East." },
];

// ── HERO CANVAS ── identical gold particle system ─────────────
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
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#05111e"); bg.addColorStop(1, "#020b14");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      [[0.12, 0.35, "#C9A84C", 0.06, 14], [0.88, 0.25, "#163354", 0.45, 11], [0.55, 0.75, "#C9A84C", 0.04, 16]].forEach(([bx, by, col, a, spd], i) => {
        const x = W * bx + Math.sin(t * (spd / 10) + i * 2.1) * 70, y = H * by + Math.cos(t * (spd / 14) + i) * 50;
        const r = Math.min(W, H) * 0.55;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        const rgb = parseInt(col.slice(1), 16);
        g.addColorStop(0, `rgba(${rgb >> 16},${(rgb >> 8) & 255},${rgb & 255},${a})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      });
      ctx.strokeStyle = "rgba(201,168,76,0.035)"; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 90) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 90) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
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
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.9);
      vg.addColorStop(0, "transparent"); vg.addColorStop(1, "rgba(2,11,20,0.6)");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="rkz-hero-canvas" style={{ width: "100%", height: "100%" }} />;
}

// ── SCROLL REVEAL ─────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rkz-reveal");
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
    }), { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ── CALCULATOR ────────────────────────────────────────────────
function Calculator() {
  const [pkg, setPkg] = useState("starter");
  const [off, setOff] = useState("virtual");
  const [vis, setVis] = useState("1");
  const [pro, setPro] = useState(false);
  const [bnk, setBnk] = useState(false);
  const pkgC = { starter: 8500, standard: 12500, business: 18000, industrial: 28000 };
  const offC = { virtual: 0, flexi: 2800, office: 6500, warehouse: 14000 };
  const visC = { "0": 0, "1": 0, "3": 2600, "5": 4800, "8": 7600 };
  const total = (pkgC[pkg] || 0) + (offC[off] || 0) + (visC[vis] || 0) + (pro ? 2800 : 0) + (bnk ? 2200 : 0);
  const f = n => "AED " + n.toLocaleString();
  return (
    <div className="rkz-calc-inner">
      <div>
        <h2 className="rkz-h2 rkz-reveal">Build Your <em>Custom Package</em></h2>
        <p className="rkz-reveal rr1" style={{ fontSize: "0.84rem", color: "var(--w60)", margin: "12px 0 36px" }}>Configure your RAKEZ requirements and get an instant cost breakdown.</p>
        <div className="rkz-calc-form">
          {[
            { l: "License Package", id: "pkg", val: pkg, set: setPkg, opts: [["starter","Starter (AED 8,500)"],["standard","Standard (AED 12,500)"],["business","Business Office (AED 18,000)"],["industrial","Industrial / Warehouse (AED 28,000)"]] },
            { l: "Office / Facility Type", id: "off", val: off, set: setOff, opts: [["virtual","Virtual Office (Included)"],["flexi","Flexi Desk (+AED 2,800/yr)"],["office","Office Unit (+AED 6,500/yr)"],["warehouse","Warehouse Unit (+AED 14,000/yr)"]] },
            { l: "Visa Allocation", id: "vis", val: vis, set: setVis, opts: [["0","No Visas"],["1","1 Visa (Included)"],["3","3 Visas (+AED 2,600)"],["5","5 Visas (+AED 4,800)"],["8","8 Visas (+AED 7,600)"]] },
          ].map(({ l, id, val, set, opts }) => (
            <div className="rkz-calc-field rkz-reveal" key={id}>
              <label className="rkz-calc-label">{l}</label>
              <select className="rkz-calc-select" value={val} onChange={e => set(e.target.value)}>
                {opts.map(([v, lab]) => <option key={v} value={v}>{lab}</option>)}
              </select>
            </div>
          ))}
          <div className="rkz-calc-field rkz-reveal">
            <label className="rkz-calc-label">PRO & Government Services</label>
            <div className="rkz-toggle-row">
              <button className={`rkz-toggle${!pro ? " on" : ""}`} onClick={() => setPro(false)}>Not Required</button>
              <button className={`rkz-toggle${pro ? " on" : ""}`} onClick={() => setPro(true)}>Add PRO (+AED 2,800)</button>
            </div>
          </div>
          <div className="rkz-calc-field rkz-reveal">
            <label className="rkz-calc-label">Banking Assistance</label>
            <div className="rkz-toggle-row">
              <button className={`rkz-toggle${!bnk ? " on" : ""}`} onClick={() => setBnk(false)}>Not Required</button>
              <button className={`rkz-toggle${bnk ? " on" : ""}`} onClick={() => setBnk(true)}>Add Banking (+AED 2,200)</button>
            </div>
          </div>
        </div>
      </div>
      <div className="rkz-result rkz-reveal">
        <span className="rkz-result-tag">Estimated Total</span>
        <div className="rkz-result-amount"><span className="rkz-result-currency">AED </span>{total.toLocaleString()}</div>
        <div className="rkz-result-note">One-time cost · excludes annual renewal</div>
        <div className="rkz-result-lines">
          <div className="rkz-result-line"><span className="rkz-result-line-lbl">Base License Fee</span><span className="rkz-result-line-val">{f(pkgC[pkg])}</span></div>
          {offC[off] > 0 && <div className="rkz-result-line"><span className="rkz-result-line-lbl">Facility (Annual)</span><span className="rkz-result-line-val">+{f(offC[off])}</span></div>}
          {visC[vis] > 0 && <div className="rkz-result-line"><span className="rkz-result-line-lbl">Visa Processing</span><span className="rkz-result-line-val">+{f(visC[vis])}</span></div>}
          {pro && <div className="rkz-result-line"><span className="rkz-result-line-lbl">PRO Services</span><span className="rkz-result-line-val">+{f(2800)}</span></div>}
          {bnk && <div className="rkz-result-line"><span className="rkz-result-line-lbl">Banking Assistance</span><span className="rkz-result-line-val">+{f(2200)}</span></div>}
        </div>
        <div className="rkz-result-total-row"><span style={{ color: "var(--w)", fontWeight: 500 }}>Total Estimate</span><span style={{ color: "var(--g400)", fontWeight: 600 }}>{f(total)}</span></div>
        <p className="rkz-result-disclaimer">Estimate only. Final cost depends on current authority fees and specific requirements.</p>
        <button className="rkz-btn-gold" style={{ width: "100%" }}>Get Exact Quote →</button>
      </div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────
export default function RAKEZPage({ onBack }) {
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
    <div className="rkz-root">
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className={`rkz-nav${scrolled ? " scrolled" : ""}`}>
        <div className="rkz-nav-logo">INCO<em>ZONE</em></div>
        <ul className="rkz-nav-links">{["Services","Free Zones","About","Blog","Contact"].map(l=><li key={l}><a href="#">{l}</a></li>)}</ul>
        <button className="rkz-nav-cta">Schedule Consultation</button>
      </nav>

      {/* ── HERO ── */}
      <div className="rkz-hero">
        <HeroCanvas />
        <button className="rkz-back-btn" onClick={onBack}>Back to Free Zones</button>

        <div className="rkz-hero-left">
          <div className="rkz-hero-eyebrow">
            <div className="rkz-hero-eyebrow-dot" />
            Industrial &amp; Commercial · Ras Al Khaimah
          </div>
          <h1 className="rkz-hero-h1">RAKEZ<em>Free Zone</em></h1>
          <div className="rkz-hero-fullname">Ras Al Khaimah Economic Zone Authority</div>
          <p className="rkz-hero-desc">
            The Northern Emirates' most competitive free zone — purpose-built for manufacturing, trading, and industrial operations. Full UAE company ownership and residency at the lowest cost in the region, from just <strong style={{ color: "var(--g300)" }}>AED 8,500.</strong>
          </p>
          <div className="rkz-hero-actions">
            <button className="rkz-btn-gold">Start RAKEZ Setup →</button>
            <button className="rkz-btn-ghost">Download Free Guide</button>
          </div>
        </div>

        <div className="rkz-hero-right">
          <div className="rkz-hero-card">
            <span className="rkz-hero-card-label">Quick Reference</span>
            {[
              ["Location","Ras Al Khaimah, UAE"], ["Setup From","AED 8,500","gold"],
              ["Setup Time","3–7 Days","gold"], ["Min. Capital","Not Required"],
              ["Ownership","100% Foreign","gold"], ["Visa Quota","Up to 8"],
              ["Annual Renewal","AED 6–11K"], ["Tax","0% Personal"],
            ].map(([l, v, cls]) => (
              <div className="rkz-hero-card-row" key={l}>
                <span>{l}</span><span className={cls || ""}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rkz-scroll-hint"><span>Scroll</span><div className="rkz-scroll-line" /></div>
      </div>

      {/* ── STATS ── */}
      <div className="rkz-stats">
        {STATS.map((s, i) => (
          <div className="rkz-stat" key={i}>
            <span className="rkz-stat-val">{s.v}</span>
            <span className="rkz-stat-key">{s.k}</span>
          </div>
        ))}
      </div>

      {/* ── INTRO ── */}
      <div className="rkz-intro rkz-section">
        <span className="rkz-section-label rkz-reveal">Zone Overview</span>
        <h2 className="rkz-h2 rkz-reveal rr1" style={{ maxWidth: "640px" }}>The UAE's Most Competitive<br /><em>Industrial Free Zone</em></h2>
        <div className="rkz-intro-grid">
          <div className="rkz-intro-text">
            <p className="rkz-reveal rr1"><strong>RAKEZ (Ras Al Khaimah Economic Zone)</strong> is one of the UAE's largest and most diversified free zones — strategically located in Ras Al Khaimah, just 45 minutes from Dubai. Hosting over 20,000 companies, RAKEZ is the go-to choice for manufacturing, industrial operations, and cost-conscious trading businesses that want full UAE benefits without the Dubai price tag.</p>
            <p className="rkz-reveal rr2">RAKEZ emerged from the merger of RAK Free Trade Zone and RAK Investment Authority — combining decades of free zone expertise with modern infrastructure. The zone offers <strong>dedicated industrial parks</strong> with warehouses, factories, and land plots at costs that no Dubai free zone can match.</p>
            <p className="rkz-reveal rr3">For businesses that don't specifically need a Dubai address — <strong>100% foreign ownership</strong>, UAE residency, zero taxes, and full banking access — RAKEZ delivers every core benefit at the lowest price of any major UAE free zone.</p>
            <p className="rkz-reveal rr3">With direct access to <strong>Saqr Port</strong> — one of the largest bulk cargo ports in the Middle East — RAKEZ is also the natural choice for import/export and logistics businesses that need real port connectivity without JAFZA's premium price.</p>
          </div>
          <div className="rkz-reveal rr2">
            <div className="rkz-pillars">
              {[
                { i:"💰", h:"UAE's Most Affordable Free Zone", p:"Starting from AED 8,500 — the lowest setup cost of any major UAE free zone. Full company benefits, UAE residency, and zero taxes at an unbeatable price." },
                { i:"🏭", h:"Industrial Infrastructure", p:"Dedicated warehouses, factories, land plots, and industrial parks at costs 40–60% lower than Dubai equivalents. The only free zone to offer this scale of physical infrastructure at this price." },
                { i:"⚡", h:"3 to 7 Day Setup", p:"One of the fastest formation processes in the UAE. Simple digital application, straightforward requirements, and quick authority approvals." },
                { i:"🌐", h:"Full UAE Residency & Ownership", p:"UAE investor visa, Emirates ID, and 100% foreign company ownership — without paying the Dubai premium. Same residency rights, same banking access." },
                { i:"🚢", h:"Saqr Port Access", p:"Direct proximity to Saqr Port — one of the Middle East's largest bulk cargo ports. Ideal for import/export, logistics, and manufacturing businesses with real supply chain requirements." },
              ].map((p, i) => (
                <div className="rkz-pillar" key={i}>
                  <div className="rkz-pillar-icon">{p.i}</div>
                  <div><h4>{p.h}</h4><p>{p.p}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PACKAGES ── */}
      <div className="rkz-packages rkz-section">
        <span className="rkz-section-label rkz-reveal">Setup Packages</span>
        <h2 className="rkz-h2 rkz-reveal rr1">Choose Your <em>RAKEZ Package</em></h2>
        <p className="rkz-reveal rr2" style={{ fontSize: "0.84rem", color: "var(--cream-ink3)", marginTop: "10px", maxWidth: "520px" }}>All packages include full company incorporation, trade license, and corporate documents. Industrial packages quoted on request.</p>
        <div className="rkz-pkg-grid">
          {[
            { name:"Starter", tag:"Trading & service businesses", price:"8,500", badge:"Most Affordable in UAE", featured:false, feats:[["1 Trade License Activity",true],["Virtual Office",true],["1 Investor Visa",true],["Company Stamp & MOA",true],["Bank Account Assistance",false],["Dedicated Account Manager",false]] },
            { name:"Business", tag:"Growing teams & trading companies", price:"12,500", badge:"Most Popular", featured:true, feats:[["3 Trade License Activities",true],["Flexi Desk / Office",true],["3 Investor Visas",true],["Full Corporate Documents",true],["Bank Account Assistance",true],["Dedicated Account Manager",false]] },
            { name:"Industrial", tag:"Manufacturing & warehouse operations", price:"Custom", badge:"Industrial Package", featured:false, feats:[["Unlimited Activities",true],["Warehouse / Factory Unit",true],["5+ Investor Visas",true],["Full Corporate Documents",true],["Priority Bank Account Setup",true],["Dedicated Account Manager",true]] },
          ].map((pkg, i) => (
            <div className={`rkz-pkg rkz-reveal rr${i+1}${pkg.featured ? " featured" : ""}`} key={i}>
              <div className="rkz-pkg-badge">{pkg.badge}</div>
              <div className="rkz-pkg-name">{pkg.name}</div>
              <p className="rkz-pkg-tag">{pkg.tag}</p>
              <div className="rkz-pkg-price">
                <div className="rkz-pkg-amount">{pkg.price === "Custom" ? "Custom" : `AED ${pkg.price}`}</div>
                <div className="rkz-pkg-period">{pkg.price === "Custom" ? "Quoted based on space & activities" : "One-time setup · excludes annual renewal"}</div>
              </div>
              <ul className="rkz-pkg-features">
                {pkg.feats.map(([t, on], j) => (
                  <li className="rkz-pkg-feat" key={j}>
                    <span className={on ? "rkz-feat-on" : "rkz-feat-off"}>{on ? "✓" : "×"}</span>
                    <span className={on ? "rkz-feat-label-on" : "rkz-feat-label-off"}>{t}</span>
                  </li>
                ))}
              </ul>
              <button className="rkz-pkg-btn">{pkg.featured ? "Select This Package →" : pkg.price === "Custom" ? "Get Custom Quote →" : "Get Started →"}</button>
            </div>
          ))}
        </div>
      </div>

      {/* ── ACTIVITIES ── */}
      <div className="rkz-activities rkz-section">
        <span className="rkz-section-label rkz-reveal">Licensed Activities</span>
        <h2 className="rkz-h2 rkz-reveal rr1">What Can You Do <em>Under RAKEZ?</em></h2>
        <p className="rkz-reveal rr2" style={{ fontSize: "0.83rem", color: "var(--w60)", marginTop: "10px", maxWidth: "580px" }}>RAKEZ supports 5,000+ business activities. Here are the most popular categories:</p>
        <div className="rkz-act-grid">
          {ACTIVITIES.map((a, i) => (
            <div className={`rkz-act-card rkz-reveal rr${(i%4)+1}`} key={i}>
              <div className="rkz-act-icon">{a.i}</div>
              <div className="rkz-act-name">{a.n}</div>
              <div className="rkz-act-desc">{a.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROCESS ── */}
      <div className="rkz-process rkz-section">
        <span className="rkz-section-label rkz-reveal" style={{ textAlign: "center", display: "block" }}>Setup Process</span>
        <h2 className="rkz-h2 rkz-reveal rr1" style={{ textAlign: "center" }}>Your RAKEZ <em>Journey — Step by Step</em></h2>
        <div className="rkz-process-inner">
          {STEPS.map((s, i) => (
            <div className={`rkz-step rkz-reveal rr${(i%4)+1}`} key={i}>
              <div className="rkz-step-num">{s.n}</div>
              <div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <div className="rkz-step-time">{s.time}</div>
                <div className="rkz-step-docs">{s.docs.map(d => <span className="rkz-doc-tag" key={d}>{d}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DOCUMENTS ── */}
      <div className="rkz-documents rkz-section">
        <span className="rkz-section-label rkz-reveal">Required Documents</span>
        <h2 className="rkz-h2 rkz-reveal rr1">What You <em>Need to Prepare</em></h2>
        <p className="rkz-reveal rr2" style={{ fontSize: "0.83rem", color: "var(--w60)", marginTop: "10px" }}>RAKEZ has one of the simplest document requirements of any UAE free zone:</p>
        <div className="rkz-docs-grid">
          {DOCUMENTS.map((d, i) => (
            <div className={`rkz-doc-card rkz-reveal rr${(i%2)+1}`} key={i}>
              <div className="rkz-doc-num">0{i+1}</div>
              <div><div className="rkz-doc-title">{d.t}</div><div className="rkz-doc-desc">{d.d}</div></div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CALCULATOR ── */}
      <div className="rkz-calc rkz-section">
        <span className="rkz-section-label rkz-reveal">Cost Estimator</span>
        <Calculator />
      </div>

      {/* ── FAQ ── */}
      <div className="rkz-faq rkz-section">
        <span className="rkz-section-label rkz-reveal" style={{ textAlign: "center", display: "block" }}>FAQ</span>
        <h2 className="rkz-h2 rkz-reveal rr1" style={{ textAlign: "center" }}>Frequently Asked <em>Questions</em></h2>
        <div className="rkz-faq-inner">
          {FAQS.map((f, i) => (
            <div className={`rkz-faq-item rkz-reveal rr${(i%3)+1}${openFaq===i ? " open" : ""}`} key={i}>
              <button className="rkz-faq-q" onClick={() => setOpenFaq(openFaq===i ? null : i)}>
                <span className="rkz-faq-q-text">{f.q}</span>
                <div className="rkz-faq-icon">+</div>
              </button>
              <div className="rkz-faq-answer">
                <div className="rkz-faq-answer-inner">
                  <p>{f.a}</p>
                  {f.list && <ul>{f.list.map(li => <li key={li}>{li}</li>)}</ul>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ADVISORY ── */}
      <div className="rkz-advisory rkz-section">
        <span className="rkz-section-label rkz-reveal" style={{ textAlign: "center", display: "block" }}>INCOZONE Advisory</span>
        <h2 className="rkz-h2 rkz-reveal rr1" style={{ textAlign: "center" }}>Expert Advice Before <em>You Decide</em></h2>
        <div className="rkz-advisory-inner">
          <div className="rkz-advisory-quote rkz-reveal rr2">
            "RAKEZ is the answer for every client who asks: I want a UAE company and UAE residency, but I don't need a Dubai address.{" "}
            <strong>If budget is the priority — or if you need real industrial infrastructure — no UAE free zone beats RAKEZ on value.</strong> We recommend it constantly, and clients are always surprised by how legitimate and seamless it is."
            <div className="rkz-advisory-quote-attr">— INCOZONE Advisory Team</div>
          </div>
          <div className="rkz-advisory-tips">
            {[
              { n:"01", t:"RAK Is Not a Compromise", p:"Many clients assume a non-Dubai zone means lower quality. RAKEZ is a tier-1 UAE government free zone — fully recognised by banks, government entities, and international business partners. The only real difference is the cost." },
              { n:"02", t:"Industrial Advantage Is Real", p:"If your business needs physical space — warehousing, manufacturing, or storage — RAKEZ has dedicated industrial parks at costs 40–60% lower than Dubai equivalents. This is a genuine, tangible competitive advantage." },
              { n:"03", t:"Dubai Clients Are Fully Accessible", p:"Being in RAK doesn't restrict who you can serve. RAKEZ companies can provide services across the UAE including Dubai — exactly as any other free zone company would." },
              { n:"04", t:"Visa Processing Is Efficient", p:"RAKEZ has one of the most streamlined visa processing systems in the UAE. Our PRO team manages the complete process in Ras Al Khaimah — typically faster and less congested than Dubai processing centres." },
            ].map((tip, i) => (
              <div className={`rkz-tip rkz-reveal rr${(i%2)+1}`} key={i}>
                <span className="rkz-tip-num">{tip.n}</span>
                <h4>{tip.t}</h4>
                <p>{tip.p}</p>
              </div>
            ))}
          </div>
          <div className="rkz-advisory-warning rkz-reveal">
            <h4>⚠️ When RAKEZ Might Not Be the Best Fit</h4>
            <p>Consider alternatives if: your clients or banking partners specifically require a Dubai address · you need DMCC's commodities or fintech ecosystem · you require JAFZA's direct Jebel Ali port connectivity · your business requires DIFC's regulated financial services framework · or if the specific perception of a Dubai address is critical to your business development. INCOZONE will always give you an honest recommendation — including when that recommendation is not RAKEZ.</p>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="rkz-cta">
        <div className="rkz-cta-inner">
          <span className="rkz-section-label rkz-reveal">Begin Your Journey</span>
          <h2 className="rkz-reveal rr1">Ready to Establish Your<br /><em>RAKEZ Business?</em></h2>
          <div className="rkz-cta-divider" />
          <p className="rkz-reveal rr2">
            Schedule a private consultation. No obligation. Our RAKEZ specialists will assess your requirements and give you a clear, honest recommendation — whether that's RAKEZ or another zone entirely.
          </p>
          <div className="rkz-cta-btns rkz-reveal rr3">
            <button className="rkz-btn-ink">Schedule Private Consultation</button>
            <button className="rkz-btn-cream-outline" onClick={onBack}>← Explore Other Zones</button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="rkz-footer">
        <div className="rkz-footer-inner">
          <div className="rkz-footer-logo">INCO<em>ZONE</em></div>
          <div className="rkz-footer-copy">© 2025 INCOZONE. All rights reserved. Dubai, UAE.</div>
          <button className="rkz-footer-back" onClick={onBack}>← Back to Free Zones</button>
        </div>
      </div>

      {/* ── WA FLOAT ── */}
      <div className="rkz-wa">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </div>
    </div>
  );
}