import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — JAFZA Free Zone Page  (standalone, self-contained)
//  Drop into: src/pages/JAFZA.jsx
//  Same structure & palette as DMCC.jsx — only content differs
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

.jfz-root *, .jfz-root *::before, .jfz-root *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}
.jfz-root {
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
.jfz-nav {
  position: fixed; inset-inline: 0; top: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 60px;
  transition: background 0.5s, padding 0.4s, border-color 0.5s;
  border-bottom: 1px solid transparent;
}
.jfz-nav.scrolled {
  background: rgba(5,17,30,0.96); backdrop-filter: blur(20px);
  padding: 14px 60px; border-bottom-color: rgba(201,168,76,0.12);
}
.jfz-nav-logo { font-family: var(--fd); font-size: 1.5rem; font-weight: 500; letter-spacing: 0.15em; color: var(--w); cursor: pointer; }
.jfz-nav-logo em { color: var(--g400); font-style: normal; }
.jfz-nav-links { display: flex; gap: 36px; list-style: none; }
.jfz-nav-links a { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--w60); text-decoration: none; transition: color 0.3s; }
.jfz-nav-links a:hover { color: var(--g300); }
.jfz-nav-cta {
  font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
  background: transparent; border: 1px solid var(--g400); color: var(--g400);
  padding: 9px 22px; cursor: pointer; font-family: var(--fb);
  transition: background 0.3s, color 0.3s;
}
.jfz-nav-cta:hover { background: var(--g400); color: var(--n900); }
.jfz-back-btn {
  position: absolute; top: 90px; left: 60px; z-index: 20;
  background: none; border: none; font-family: var(--fb); font-size: 0.7rem;
  letter-spacing: 0.18em; text-transform: uppercase; color: var(--w30);
  cursor: pointer; display: flex; align-items: center; gap: 10px; padding: 0;
  transition: color 0.3s;
}
.jfz-back-btn:hover { color: var(--g400); }
.jfz-back-btn::before { content: '←'; font-size: 0.9rem; }

/* ── HERO ────────────────────────────────────────────────────── */
.jfz-hero {
  min-height: 100vh; position: relative; overflow: hidden;
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: flex-end; padding: 0 60px 80px; gap: 60px;
}
.jfz-hero-canvas { position: absolute; inset: 0; z-index: 0; display: block; }
.jfz-hero-left { position: relative; z-index: 2; padding-top: 160px; }
.jfz-hero-right { position: relative; z-index: 2; padding-top: 160px; display: flex; align-items: flex-end; justify-content: flex-end; }
.jfz-hero-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--g400); border: 1px solid rgba(201,168,76,0.28); padding: 7px 16px;
  margin-bottom: 32px;
  opacity: 0; transform: translateY(16px);
  animation: jfzFadeUp 1s var(--ease) 0.2s forwards;
}
.jfz-hero-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--g400); animation: jfzBlink 2s infinite; }
.jfz-hero-h1 {
  font-family: var(--fd); font-weight: 300; line-height: 0.88;
  letter-spacing: -0.02em; color: var(--w);
  font-size: clamp(5rem, 10vw, 9.5rem); margin-bottom: 20px;
  opacity: 0; transform: translateY(20px);
  animation: jfzFadeUp 1.1s var(--ease) 0.35s forwards;
}
.jfz-hero-h1 em { display: block; color: var(--g400); font-style: italic; font-weight: 300; }
.jfz-hero-fullname {
  font-family: var(--fd); font-size: 1rem; font-weight: 300;
  color: var(--w60); font-style: italic; margin-bottom: 36px; letter-spacing: 0.04em;
  opacity: 0; animation: jfzFadeUp 1s var(--ease) 0.5s forwards;
}
.jfz-hero-desc {
  font-size: 0.86rem; color: var(--w80); line-height: 1.85; max-width: 520px; margin-bottom: 44px;
  opacity: 0; animation: jfzFadeUp 1s var(--ease) 0.65s forwards;
}
.jfz-hero-actions {
  display: flex; gap: 14px; flex-wrap: wrap;
  opacity: 0; animation: jfzFadeUp 1s var(--ease) 0.8s forwards;
}
.jfz-hero-card {
  background: rgba(11,28,45,0.85); backdrop-filter: blur(16px);
  border: 1px solid var(--w12); padding: 36px 32px; min-width: 280px;
  opacity: 0; animation: jfzFadeUp 1.1s var(--ease) 0.9s forwards;
}
.jfz-hero-card-label {
  font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--g400); margin-bottom: 20px; display: block;
}
.jfz-hero-card-row {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 11px 0; border-bottom: 1px solid var(--w06); font-size: 0.78rem;
}
.jfz-hero-card-row:last-child { border-bottom: none; }
.jfz-hero-card-row span:first-child { color: var(--w60); }
.jfz-hero-card-row span:last-child { color: var(--w); font-weight: 500; text-align: right; }
.jfz-hero-card-row span.gold { color: var(--g400); }
.jfz-scroll-hint {
  position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
  z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px;
  opacity: 0; animation: jfzFadeUp 1s var(--ease) 1.2s forwards;
}
.jfz-scroll-hint span { font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--w30); }
.jfz-scroll-line { width: 1px; height: 44px; background: linear-gradient(to bottom, var(--g400), transparent); animation: jfzScrollPulse 2.2s ease-in-out infinite; }

/* ── STATS BAR ───────────────────────────────────────────────── */
.jfz-stats {
  display: grid; grid-template-columns: repeat(6, 1fr);
  background: var(--n950); border-top: 1px solid var(--w12);
  border-bottom: 1px solid var(--w12);
}
.jfz-stat { padding: 28px 20px; text-align: center; border-right: 1px solid var(--w12); transition: background 0.3s; }
.jfz-stat:last-child { border-right: none; }
.jfz-stat:hover { background: var(--glow3); }
.jfz-stat-val { font-family: var(--fd); font-size: 2rem; font-weight: 300; color: var(--g400); display: block; line-height: 1; }
.jfz-stat-key { font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--w30); margin-top: 6px; display: block; }

/* ── SECTION BASICS ──────────────────────────────────────────── */
.jfz-section { padding: 96px 60px; }
.jfz-section-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--g400); margin-bottom: 14px; display: block; }
.jfz-h2 { font-family: var(--fd); font-size: clamp(2rem, 3.8vw, 3.4rem); font-weight: 300; line-height: 1.15; color: var(--w); }
.jfz-h2 em { color: var(--g400); font-style: italic; }

/* ── INTRO ───────────────────────────────────────────────────── */
.jfz-intro { background: var(--n800); }
.jfz-intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; margin-top: 52px; }
.jfz-intro-text p { font-size: 0.88rem; color: var(--w60); line-height: 1.88; margin-bottom: 22px; }
.jfz-intro-text p strong { color: var(--w); font-weight: 500; }
.jfz-intro-text p:last-child { margin-bottom: 0; }
.jfz-pillars { display: flex; flex-direction: column; }
.jfz-pillar { display: flex; gap: 20px; padding: 22px 0; border-bottom: 1px solid var(--w06); transition: padding-left 0.3s var(--ease); }
.jfz-pillar:first-child { border-top: 1px solid var(--w06); }
.jfz-pillar:hover { padding-left: 10px; }
.jfz-pillar-icon { font-size: 1.3rem; flex-shrink: 0; margin-top: 2px; }
.jfz-pillar h4 { font-size: 0.88rem; font-weight: 500; color: var(--w); margin-bottom: 5px; }
.jfz-pillar p { font-size: 0.77rem; color: var(--w60); line-height: 1.65; }

/* ── PACKAGES ────────────────────────────────────────────────── */
.jfz-packages { background: var(--cream-bg); position: relative; overflow: hidden; }
.jfz-packages::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(201,168,76,0.09), transparent 60%);
  pointer-events: none;
}
.jfz-packages::after {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, transparent, var(--g400) 40%, transparent);
  opacity: 0.6;
}
.jfz-packages .jfz-section-label { color: #8A6820; }
.jfz-packages .jfz-h2 { color: var(--cream-ink); }
.jfz-packages .jfz-h2 em { color: var(--g400); }
.jfz-pkg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 52px; }
.jfz-pkg {
  background: var(--cream-bg); border: 1px solid var(--cream-bdr);
  padding: 40px 34px; display: flex; flex-direction: column;
  transition: transform 0.35s var(--ease), box-shadow 0.35s var(--ease), border-color 0.35s;
  box-shadow: 0 2px 16px rgba(120,90,30,0.06); position: relative;
}
.jfz-pkg:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(120,90,30,0.14); border-color: rgba(201,168,76,0.45); }
.jfz-pkg.featured { background: var(--n900); border-color: rgba(201,168,76,0.35); box-shadow: 0 8px 40px rgba(0,0,0,0.25); }
.jfz-pkg.featured:hover { border-color: var(--g400); box-shadow: 0 24px 60px rgba(0,0,0,0.35); }
.jfz-pkg-badge { font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; padding: 4px 12px; width: fit-content; margin-bottom: 22px; font-weight: 500; }
.jfz-pkg:not(.featured) .jfz-pkg-badge { border: 1px solid var(--cream-bdr); color: var(--cream-ink3); background: var(--cream-100); }
.jfz-pkg.featured .jfz-pkg-badge { border: 1px solid var(--g400); color: var(--g400); background: rgba(201,168,76,0.08); }
.jfz-pkg-name { font-family: var(--fd); font-size: 2rem; font-weight: 400; margin-bottom: 6px; }
.jfz-pkg:not(.featured) .jfz-pkg-name { color: var(--cream-ink); }
.jfz-pkg.featured .jfz-pkg-name { color: var(--w); }
.jfz-pkg-tag { font-size: 0.75rem; margin-bottom: 26px; }
.jfz-pkg:not(.featured) .jfz-pkg-tag { color: var(--cream-ink3); }
.jfz-pkg.featured .jfz-pkg-tag { color: var(--w60); }
.jfz-pkg-price { margin-bottom: 28px; padding-bottom: 24px; }
.jfz-pkg:not(.featured) .jfz-pkg-price { border-bottom: 1px solid var(--cream-bdr); }
.jfz-pkg.featured .jfz-pkg-price { border-bottom: 1px solid var(--w12); }
.jfz-pkg-amount { font-family: var(--fd); font-size: 3rem; font-weight: 300; line-height: 1; }
.jfz-pkg:not(.featured) .jfz-pkg-amount { color: var(--cream-ink); }
.jfz-pkg.featured .jfz-pkg-amount { color: var(--g400); }
.jfz-pkg-period { font-size: 0.68rem; letter-spacing: 0.08em; margin-top: 5px; }
.jfz-pkg:not(.featured) .jfz-pkg-period { color: var(--cream-bdr); }
.jfz-pkg.featured .jfz-pkg-period { color: var(--w30); }
.jfz-pkg-features { list-style: none; display: flex; flex-direction: column; gap: 12px; flex: 1; margin-bottom: 32px; }
.jfz-pkg-feat { display: flex; align-items: flex-start; gap: 11px; font-size: 0.79rem; line-height: 1.5; }
.jfz-feat-on { color: #8A6820; flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.jfz-feat-off { color: var(--cream-bdr); flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.jfz-pkg.featured .jfz-feat-on { color: var(--g400); }
.jfz-pkg.featured .jfz-feat-off { color: var(--w30); }
.jfz-feat-label-on { color: var(--cream-ink2); }
.jfz-feat-label-off { color: var(--cream-bdr); }
.jfz-pkg.featured .jfz-feat-label-on { color: var(--w80); }
.jfz-pkg.featured .jfz-feat-label-off { color: var(--w30); }
.jfz-pkg-btn { width: 100%; padding: 13px 20px; font-family: var(--fb); font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
.jfz-pkg:not(.featured) .jfz-pkg-btn { background: transparent; border: 1px solid var(--cream-bdr); color: var(--cream-ink2); }
.jfz-pkg:not(.featured) .jfz-pkg-btn:hover { border-color: var(--g400); background: var(--cream-100); color: var(--cream-ink); }
.jfz-pkg.featured .jfz-pkg-btn { background: var(--g400); border: none; color: var(--n900); font-weight: 500; }
.jfz-pkg.featured .jfz-pkg-btn:hover { background: var(--g300); }

/* ── ACTIVITIES ──────────────────────────────────────────────── */
.jfz-activities { background: var(--n800); }
.jfz-act-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; margin-top: 52px; background: var(--w06); }
.jfz-act-card { background: var(--n800); padding: 30px 24px; transition: background 0.3s; cursor: default; }
.jfz-act-card:hover { background: var(--n750); }
.jfz-act-card:hover .jfz-act-name { color: var(--g300); }
.jfz-act-icon { font-size: 1.5rem; margin-bottom: 14px; }
.jfz-act-name { font-size: 0.84rem; font-weight: 500; color: var(--w); margin-bottom: 7px; transition: color 0.3s; }
.jfz-act-desc { font-size: 0.73rem; color: var(--w60); line-height: 1.6; }

/* ── PROCESS ─────────────────────────────────────────────────── */
.jfz-process { background: var(--n900); }
.jfz-process-inner { max-width: 780px; margin: 52px auto 0; }
.jfz-step { display: grid; grid-template-columns: 64px 1fr; gap: 28px; padding: 36px 0; border-bottom: 1px solid var(--w06); position: relative; }
.jfz-step:last-child { border-bottom: none; }
.jfz-step::before { content: ''; position: absolute; left: 31px; top: 84px; bottom: -36px; width: 1px; background: linear-gradient(to bottom, rgba(201,168,76,0.25), transparent); }
.jfz-step:last-child::before { display: none; }
.jfz-step-num { width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--g400); display: flex; align-items: center; justify-content: center; font-family: var(--fd); font-size: 0.92rem; color: var(--g400); background: var(--n900); position: relative; z-index: 1; flex-shrink: 0; }
.jfz-step h3 { font-size: 0.96rem; font-weight: 500; color: var(--w); margin-bottom: 8px; }
.jfz-step p { font-size: 0.81rem; color: var(--w60); line-height: 1.78; margin-bottom: 10px; }
.jfz-step-time { font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--g400); margin-bottom: 12px; }
.jfz-step-docs { display: flex; gap: 6px; flex-wrap: wrap; }
.jfz-doc-tag { font-size: 0.62rem; padding: 4px 9px; border: 1px solid var(--w12); color: var(--w60); letter-spacing: 0.07em; }

/* ── DOCUMENTS ───────────────────────────────────────────────── */
.jfz-documents { background: var(--n800); }
.jfz-docs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 52px; }
.jfz-doc-card { background: var(--n900); border: 1px solid var(--w06); padding: 22px 26px; display: flex; align-items: center; gap: 18px; transition: border-color 0.3s; }
.jfz-doc-card:hover { border-color: rgba(201,168,76,0.2); }
.jfz-doc-num { font-family: var(--fd); font-size: 1.9rem; font-weight: 300; color: rgba(201,168,76,0.18); min-width: 36px; line-height: 1; }
.jfz-doc-title { font-size: 0.82rem; font-weight: 500; color: var(--w); margin-bottom: 4px; }
.jfz-doc-desc { font-size: 0.72rem; color: var(--w60); line-height: 1.55; }

/* ── CALCULATOR ──────────────────────────────────────────────── */
.jfz-calc { background: var(--n750); }
.jfz-calc-inner { display: grid; grid-template-columns: 1.3fr 1fr; gap: 64px; align-items: start; margin-top: 52px; }
.jfz-calc-form { display: flex; flex-direction: column; gap: 22px; }
.jfz-calc-field { display: flex; flex-direction: column; gap: 7px; }
.jfz-calc-label { font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--w60); }
.jfz-calc-select { background: var(--n900); border: 1px solid var(--w12); color: var(--w); padding: 13px 16px; font-family: var(--fb); font-size: 0.83rem; font-weight: 300; outline: none; transition: border-color 0.3s; appearance: none; -webkit-appearance: none; cursor: pointer; }
.jfz-calc-select:focus { border-color: var(--g400); }
.jfz-calc-select option { background: var(--n800); }
.jfz-toggle-row { display: flex; }
.jfz-toggle { flex: 1; padding: 11px 10px; font-size: 0.66rem; letter-spacing: 0.12em; text-transform: uppercase; font-family: var(--fb); cursor: pointer; background: var(--n900); border: 1px solid var(--w12); color: var(--w60); transition: all 0.3s; margin-right: -1px; text-align: center; }
.jfz-toggle.on { background: var(--glow2); border-color: var(--g400); color: var(--g400); position: relative; z-index: 1; }
.jfz-result { background: var(--n900); border: 1px solid rgba(201,168,76,0.2); padding: 40px 36px; position: sticky; top: 90px; }
.jfz-result-tag { font-size: 0.6rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--g400); margin-bottom: 22px; display: block; }
.jfz-result-amount { font-family: var(--fd); font-size: 3.6rem; font-weight: 300; line-height: 1; color: var(--w); }
.jfz-result-currency { color: var(--g400); }
.jfz-result-note { font-size: 0.66rem; color: var(--w30); margin-top: 4px; margin-bottom: 28px; }
.jfz-result-lines { border-top: 1px solid var(--w12); margin-bottom: 24px; }
.jfz-result-line { display: flex; justify-content: space-between; padding: 11px 0; border-bottom: 1px solid var(--w06); font-size: 0.76rem; }
.jfz-result-line-lbl { color: var(--w60); }
.jfz-result-line-val { color: var(--w); font-weight: 500; }
.jfz-result-total-row { display: flex; justify-content: space-between; padding: 14px 0 0; font-size: 0.86rem; }
.jfz-result-disclaimer { font-size: 0.68rem; color: var(--w30); line-height: 1.65; margin-bottom: 22px; margin-top: 14px; }

/* ── FAQ ─────────────────────────────────────────────────────── */
.jfz-faq { background: var(--n900); }
.jfz-faq-inner { max-width: 820px; margin: 52px auto 0; }
.jfz-faq-item { border-bottom: 1px solid var(--w06); }
.jfz-faq-q { width: 100%; background: none; border: none; padding: 26px 0; display: flex; align-items: center; justify-content: space-between; gap: 24px; cursor: pointer; text-align: left; font-family: var(--fb); }
.jfz-faq-q-text { font-size: 0.92rem; font-weight: 400; color: var(--w); line-height: 1.5; }
.jfz-faq-icon { width: 26px; height: 26px; border: 1px solid var(--w12); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--g400); font-size: 1.1rem; flex-shrink: 0; transition: all 0.3s; }
.jfz-faq-item.open .jfz-faq-icon { background: var(--g400); color: var(--n900); border-color: var(--g400); transform: rotate(45deg); }
.jfz-faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.45s var(--ease); }
.jfz-faq-item.open .jfz-faq-answer { max-height: 500px; }
.jfz-faq-answer-inner { padding-bottom: 24px; }
.jfz-faq-answer p { font-size: 0.83rem; color: var(--w60); line-height: 1.85; }
.jfz-faq-answer ul { margin-top: 12px; list-style: none; display: flex; flex-direction: column; gap: 7px; }
.jfz-faq-answer ul li { font-size: 0.8rem; color: var(--w60); padding-left: 18px; position: relative; line-height: 1.6; }
.jfz-faq-answer ul li::before { content: '—'; position: absolute; left: 0; color: var(--g400); }

/* ── ADVISORY ────────────────────────────────────────────────── */
.jfz-advisory { background: var(--n800); position: relative; overflow: hidden; }
.jfz-advisory::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 70% at 50% 50%, rgba(201,168,76,0.04), transparent); pointer-events: none; }
.jfz-advisory-inner { max-width: 900px; margin: 52px auto 0; position: relative; z-index: 1; }
.jfz-advisory-quote { font-family: var(--fd); font-size: 1.35rem; font-weight: 300; color: var(--w80); line-height: 1.65; font-style: italic; text-align: center; padding: 40px 48px; border: 1px solid var(--w12); background: var(--n900); margin-bottom: 48px; }
.jfz-advisory-quote strong { color: var(--g400); font-style: normal; }
.jfz-advisory-quote-attr { margin-top: 18px; font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--g400); font-style: normal; }
.jfz-advisory-tips { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 36px; }
.jfz-tip { border: 1px solid var(--w06); padding: 30px 26px; transition: border-color 0.3s; }
.jfz-tip:hover { border-color: rgba(201,168,76,0.2); }
.jfz-tip-num { font-family: var(--fd); font-size: 0.68rem; letter-spacing: 0.22em; color: var(--g400); margin-bottom: 12px; display: block; }
.jfz-tip h4 { font-size: 0.9rem; font-weight: 500; color: var(--w); margin-bottom: 9px; }
.jfz-tip p { font-size: 0.78rem; color: var(--w60); line-height: 1.78; }
.jfz-advisory-warning { background: rgba(201,168,76,0.05); border: 1px solid rgba(201,168,76,0.18); padding: 26px 30px; margin-bottom: 32px; }
.jfz-advisory-warning h4 { font-size: 0.82rem; font-weight: 500; color: var(--g400); margin-bottom: 9px; }
.jfz-advisory-warning p { font-size: 0.78rem; color: var(--w60); line-height: 1.78; }

/* ── CTA ─────────────────────────────────────────────────────── */
.jfz-cta { background: var(--cream-bg); padding: 120px 60px; text-align: center; position: relative; overflow: hidden; }
.jfz-cta::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(180,150,90,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(180,150,90,0.06) 1px, transparent 1px); background-size: 56px 56px; }
.jfz-cta::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.10), transparent 70%); pointer-events: none; }
.jfz-cta-inner { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }
.jfz-cta .jfz-section-label { color: #8A6820; text-align: center; }
.jfz-cta h2 { font-family: var(--fd); font-size: clamp(2.4rem, 4.5vw, 4rem); font-weight: 300; color: var(--cream-ink); line-height: 1.15; margin-bottom: 18px; }
.jfz-cta h2 em { color: var(--g400); font-style: italic; }
.jfz-cta-divider { width: 44px; height: 1px; background: var(--g400); margin: 22px auto; opacity: 0.55; }
.jfz-cta p { font-size: 0.83rem; color: var(--cream-ink3); line-height: 1.8; margin-bottom: 44px; }
.jfz-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

/* ── BUTTONS ─────────────────────────────────────────────────── */
.jfz-btn-gold { padding: 15px 36px; background: var(--g400); color: var(--n900); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.jfz-btn-gold:hover { background: var(--g300); transform: translateY(-2px); }
.jfz-btn-ghost { padding: 15px 36px; background: transparent; color: var(--w); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--w30); cursor: pointer; transition: all 0.3s; }
.jfz-btn-ghost:hover { border-color: var(--g400); color: var(--g400); transform: translateY(-2px); }
.jfz-btn-ink { padding: 15px 36px; background: var(--cream-ink); color: var(--cream-bg); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.jfz-btn-ink:hover { background: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }
.jfz-btn-cream-outline { padding: 15px 36px; background: transparent; color: var(--cream-ink2); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--cream-bdr); cursor: pointer; transition: all 0.3s; }
.jfz-btn-cream-outline:hover { border-color: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }

/* ── FOOTER ──────────────────────────────────────────────────── */
.jfz-footer { background: var(--n950); padding: 52px 60px; border-top: 1px solid var(--w06); }
.jfz-footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
.jfz-footer-logo { font-family: var(--fd); font-size: 1.3rem; letter-spacing: 0.15em; color: var(--w); }
.jfz-footer-logo em { color: var(--g400); font-style: normal; }
.jfz-footer-copy { font-size: 0.68rem; color: var(--w30); }
.jfz-footer-back { padding: 9px 18px; background: transparent; border: 1px solid var(--w12); color: var(--w60); font-family: var(--fb); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
.jfz-footer-back:hover { border-color: var(--g400); color: var(--g400); }

/* ── WA FLOAT ────────────────────────────────────────────────── */
.jfz-wa { position: fixed; bottom: 28px; right: 28px; z-index: 300; width: 50px; height: 50px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 18px rgba(37,211,102,0.4); transition: transform 0.3s, box-shadow 0.3s; }
.jfz-wa:hover { transform: scale(1.1); box-shadow: 0 6px 26px rgba(37,211,102,0.55); }

/* ── REVEAL ──────────────────────────────────────────────────── */
.jfz-reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.8s var(--ease), transform 0.8s var(--ease); }
.jfz-reveal.in { opacity: 1; transform: translateY(0); }
.jr1 { transition-delay: 0.08s; } .jr2 { transition-delay: 0.18s; }
.jr3 { transition-delay: 0.28s; } .jr4 { transition-delay: 0.38s; }

/* ── KEYFRAMES ───────────────────────────────────────────────── */
@keyframes jfzFadeUp { to { opacity: 1; transform: translateY(0); } }
@keyframes jfzScrollPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
@keyframes jfzBlink { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.75); } }

/* ── RESPONSIVE ──────────────────────────────────────────────── */
@media(max-width:1100px) {
  .jfz-hero { grid-template-columns: 1fr; }
  .jfz-hero-right { display: none; }
  .jfz-intro-grid { grid-template-columns: 1fr; gap: 48px; }
  .jfz-pkg-grid { grid-template-columns: 1fr; max-width: 480px; }
  .jfz-act-grid { grid-template-columns: repeat(3, 1fr); }
  .jfz-calc-inner { grid-template-columns: 1fr; }
  .jfz-result { position: static; }
  .jfz-advisory-tips { grid-template-columns: 1fr; }
}
@media(max-width:768px) {
  .jfz-nav { padding: 16px 24px; } .jfz-nav.scrolled { padding: 12px 24px; } .jfz-nav-links { display: none; }
  .jfz-hero { padding: 0 24px 72px; }
  .jfz-back-btn { left: 24px; }
  .jfz-section { padding: 68px 24px; }
  .jfz-stats { grid-template-columns: repeat(3, 1fr); }
  .jfz-act-grid { grid-template-columns: repeat(2, 1fr); }
  .jfz-docs-grid { grid-template-columns: 1fr; }
  .jfz-footer { padding: 40px 24px; }
  .jfz-cta { padding: 80px 24px; }
}
@media(max-width:480px) {
  .jfz-stats { grid-template-columns: repeat(2, 1fr); }
  .jfz-act-grid { grid-template-columns: 1fr; }
  .jfz-hero-h1 { font-size: 4.5rem; }
}
`;

// ── DATA ──────────────────────────────────────────────────────
const STATS = [
  { v:"9,000+", k:"Companies" }, { v:"7–14", k:"Setup Days" },
  { v:"100%", k:"Foreign Ownership" }, { v:"0%", k:"Corporate Tax" },
  { v:"AED 22K", k:"Starting Cost" }, { v:"Jebel Ali", k:"World's 9th Largest Port" },
];

const ACTIVITIES = [
  { i:"🚢", n:"Import & Export", d:"International trade, customs clearance, re-export and cross-border distribution" },
  { i:"🚛", n:"Logistics & Freight", d:"Freight forwarding, 3PL, supply chain management and transport coordination" },
  { i:"🏭", n:"Manufacturing", d:"Light and heavy manufacturing, assembly, processing and production" },
  { i:"📦", n:"Warehousing & Storage", d:"Bonded warehouses, cold storage, distribution centres and fulfilment hubs" },
  { i:"⚓", n:"Port & Maritime Services", d:"Ship chandling, maritime agency, port services and vessel operations" },
  { i:"🛢️", n:"Oil & Gas Trading", d:"Petroleum products, energy commodities and oil field services" },
  { i:"⚙️", n:"Industrial Services", d:"Engineering, maintenance, equipment supply and industrial project management" },
  { i:"🌍", n:"General Trading", d:"Multi-category general trading with international buying and selling" },
  { i:"💊", n:"Pharma & Healthcare", d:"Pharmaceutical distribution, medical devices and healthcare supply chain" },
  { i:"🍱", n:"Food & FMCG", d:"Food processing, FMCG distribution and consumer goods trading" },
  { i:"🔌", n:"Technology & Electronics", d:"Electronics trading, tech hardware distribution and IT infrastructure" },
  { i:"🏗️", n:"Construction & Engineering", d:"Construction materials, engineering consultancy and project contracting" },
];

const STEPS = [
  { n:"01", t:"Strategic Consultation & Structure Planning", d:"Our JAFZA specialists assess your logistics, trade, or industrial requirements — determining the optimal entity type, facility, and activity structure before a single document is submitted.", time:"Day 1", docs:["Passport Copy","Business Plan"] },
  { n:"02", t:"Trade Name Reservation", d:"We submit your preferred company name to JAFZA authority, ensuring compliance with DP World / JAFZA naming conventions and trade activity classifications.", time:"Day 1–2", docs:["Name Options","Activity List"] },
  { n:"03", t:"License Application Submission", d:"Full license application submitted to JAFZA — including activity selection, facility type, and all supporting KYC documentation.", time:"Day 2–5", docs:["Application Form","Passport Copies","Business Plan","KYC Documents"] },
  { n:"04", t:"JAFZA Authority Review & Approvals", d:"JAFZA conducts its review — a thorough process given the regulated nature of port-adjacent operations. Industrial and warehouse allocations are confirmed at this stage.", time:"Day 5–10", docs:["Activity Approvals","Facility Agreement","NOC if required"] },
  { n:"05", t:"License & Corporate Document Issuance", d:"Trade license, MOA, Share Certificates, Company Stamp, and all official incorporation documents issued by JAFZA authority.", time:"Day 8–14", docs:["Trade License","MOA","Share Certificates","Company Stamp"] },
  { n:"06", t:"Investor Visa Processing", d:"Entry permit submission, medical fitness, biometric registration and Emirates ID. INCOZONE's PRO team manages the full government process.", time:"Day 14–28", docs:["Visa Application","Medical Test","Emirates ID"] },
  { n:"07", t:"Bank Account Opening", d:"Introductions to UAE banks with strong trade finance and corporate banking capabilities. Full documentation package prepared for smooth account opening.", time:"Day 28–45", docs:["Bank Application","Corporate Documents","Source of Funds","Trade References"] },
];

const DOCUMENTS = [
  { t:"Passport Copies", d:"Valid passport copies for all shareholders and directors — minimum 6 months validity required" },
  { t:"Passport-size Photographs", d:"White background, recent photographs for all shareholders and visa applicants" },
  { t:"Residential Address Proof", d:"Utility bill or bank statement — not older than 3 months" },
  { t:"Detailed Business Plan", d:"Comprehensive business plan including trade flows, target markets, and revenue model — required by JAFZA" },
  { t:"Source of Funds Declaration", d:"Bank statements or audited accounts confirming the source and legitimacy of investment funds" },
  { t:"NOC from Employer", d:"Required if currently employed in the UAE under an existing residence visa" },
  { t:"Corporate Documents", d:"For corporate shareholders: Certificate of Incorporation, MOA, Board Resolution, UBO Declaration" },
  { t:"Bank Reference Letter", d:"Strongly recommended — JAFZA banking partners expect established financial history" },
];

const FAQS = [
  { q:"What makes JAFZA unique compared to other UAE free zones?", a:"JAFZA's defining advantage is its physical integration with Jebel Ali Port — the world's 9th largest port and the largest in the Middle East. Companies in JAFZA can move goods directly between their facilities and port berths with minimal customs friction. No other UAE free zone offers this level of port connectivity." },
  { q:"What types of businesses are best suited to JAFZA?", a:"JAFZA is purpose-built for businesses that need physical infrastructure and port access:", list:["Import/export and international trading companies","Logistics, freight forwarding, and 3PL operators","Manufacturing and light industrial operations","Oil & gas and energy sector companies","Pharma, FMCG, and food distribution businesses","Large-scale warehousing and distribution centres"] },
  { q:"How much does JAFZA cost compared to other free zones?", a:"JAFZA starts from AED 22,000 — more expensive than RAKEZ or IFZA, but positioned against the specific infrastructure it offers. If your business requires port access, warehouse space, or large-scale logistics infrastructure, the operational cost savings from port integration typically far exceed the higher setup fee." },
  { q:"Can I get a UAE residence visa through JAFZA?", a:"Yes. JAFZA investor visas are full UAE residence visas — Emirates ID, residency rights, and banking access identical to any other UAE free zone. JAFZA offers up to 15 visas depending on your facility type — the highest quota of any UAE free zone." },
  { q:"What facility types are available in JAFZA?", a:"JAFZA offers a comprehensive range of facilities:", list:["Offices: Standard and premium serviced offices","Warehouses: Various sizes with port connectivity","Industrial Units: Light to heavy manufacturing","Land Plots: For custom-built facilities","Temperature-controlled: Cold storage available","Showrooms: Product display and trading facilities"] },
  { q:"How long does JAFZA setup take?", a:"JAFZA has a more thorough review process than smaller free zones — typically 7–14 working days for license issuance. Facility allocation, visa processing, and bank account opening extend the full operational timeline to 6–10 weeks. INCOZONE manages the entire process." },
  { q:"What is the annual renewal cost for JAFZA?", a:"JAFZA annual renewal ranges from AED 14,000 to AED 35,000+ depending on your license type, facility size, and number of activities. These are among the higher renewal costs in UAE free zones — reflecting the premium infrastructure and port access provided." },
  { q:"Can JAFZA companies trade with the UAE mainland?", a:"Yes — JAFZA companies can sell goods into the UAE mainland by paying the applicable import duties at UAE customs checkpoints. For services, JAFZA companies can provide services to mainland clients freely. INCOZONE advises on the most efficient customs and trade structure for your specific business model." },
  { q:"What banking options are available for JAFZA companies?", a:"JAFZA companies have access to all major UAE banks. Given JAFZA's established reputation for trade and logistics, banks are typically more comfortable with JAFZA account applications than smaller free zones — particularly for trade finance facilities, letters of credit, and corporate banking services." },
  { q:"How does JAFZA compare to RAKEZ for industrial businesses?", a:"RAKEZ is more affordable and suitable for smaller manufacturing and trading businesses. JAFZA is the choice when port connectivity is operationally critical — when your business model depends on fast, integrated customs clearance and direct port access. For large-scale logistics, JAFZA's infrastructure advantage is unmatched in the UAE." },
];

// ── HERO CANVAS ────────────────────────────────────────────────
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
  return <canvas ref={ref} className="jfz-hero-canvas" style={{ width: "100%", height: "100%" }} />;
}

// ── SCROLL REVEAL ──────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".jfz-reveal");
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
    }), { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ── CALCULATOR ────────────────────────────────────────────────
function Calculator() {
  const [pkg, setPkg] = useState("trade");
  const [off, setOff] = useState("office");
  const [vis, setVis] = useState("3");
  const [pro, setPro] = useState(false);
  const [bnk, setBnk] = useState(false);
  const pkgC = { trade: 22000, logistics: 38500, enterprise: 65000 };
  const offC = { office: 0, warehouse: 12000, large_warehouse: 28000, land: 45000 };
  const visC = { "0": 0, "3": 0, "8": 6000, "15": 14000 };
  const total = (pkgC[pkg] || 0) + (offC[off] || 0) + (visC[vis] || 0) + (pro ? 4500 : 0) + (bnk ? 3500 : 0);
  const f = n => "AED " + n.toLocaleString();
  return (
    <div className="jfz-calc-inner">
      <div>
        <h2 className="jfz-h2 jfz-reveal">Build Your <em>Custom Package</em></h2>
        <p className="jfz-reveal jr1" style={{ fontSize: "0.84rem", color: "var(--w60)", margin: "12px 0 36px" }}>Configure your JAFZA setup and get an instant cost breakdown.</p>
        <div className="jfz-calc-form">
          {[
            { l: "License Package", id: "pkg", val: pkg, set: setPkg, opts: [["trade","Trade (AED 22,000)"],["logistics","Logistics Plus (AED 38,500)"],["enterprise","Enterprise (AED 65,000)"]] },
            { l: "Facility Type", id: "off", val: off, set: setOff, opts: [["office","Office (Included)"],["warehouse","Warehouse (+AED 12,000/yr)"],["large_warehouse","Large Warehouse (+AED 28,000/yr)"],["land","Land Plot (+AED 45,000/yr)"]] },
            { l: "Visa Allocation", id: "vis", val: vis, set: setVis, opts: [["0","No Visas"],["3","3 Visas (Included)"],["8","8 Visas (+AED 6,000)"],["15","15 Visas (+AED 14,000)"]] },
          ].map(({ l, id, val, set, opts }) => (
            <div className="jfz-calc-field jfz-reveal" key={id}>
              <label className="jfz-calc-label">{l}</label>
              <select className="jfz-calc-select" value={val} onChange={e => set(e.target.value)}>
                {opts.map(([v, lab]) => <option key={v} value={v}>{lab}</option>)}
              </select>
            </div>
          ))}
          <div className="jfz-calc-field jfz-reveal">
            <label className="jfz-calc-label">PRO & Government Services</label>
            <div className="jfz-toggle-row">
              <button className={`jfz-toggle${!pro ? " on" : ""}`} onClick={() => setPro(false)}>Not Required</button>
              <button className={`jfz-toggle${pro ? " on" : ""}`} onClick={() => setPro(true)}>Add PRO (+AED 4,500)</button>
            </div>
          </div>
          <div className="jfz-calc-field jfz-reveal">
            <label className="jfz-calc-label">Banking Assistance</label>
            <div className="jfz-toggle-row">
              <button className={`jfz-toggle${!bnk ? " on" : ""}`} onClick={() => setBnk(false)}>Not Required</button>
              <button className={`jfz-toggle${bnk ? " on" : ""}`} onClick={() => setBnk(true)}>Add Banking (+AED 3,500)</button>
            </div>
          </div>
        </div>
      </div>
      <div className="jfz-result jfz-reveal">
        <span className="jfz-result-tag">Estimated Total</span>
        <div className="jfz-result-amount"><span className="jfz-result-currency">AED </span>{total.toLocaleString()}</div>
        <div className="jfz-result-note">One-time cost · excludes annual renewal</div>
        <div className="jfz-result-lines">
          <div className="jfz-result-line"><span className="jfz-result-line-lbl">Base License Fee</span><span className="jfz-result-line-val">{f(pkgC[pkg])}</span></div>
          {offC[off] > 0 && <div className="jfz-result-line"><span className="jfz-result-line-lbl">Facility (Annual)</span><span className="jfz-result-line-val">+{f(offC[off])}</span></div>}
          {visC[vis] > 0 && <div className="jfz-result-line"><span className="jfz-result-line-lbl">Visa Processing</span><span className="jfz-result-line-val">+{f(visC[vis])}</span></div>}
          {pro && <div className="jfz-result-line"><span className="jfz-result-line-lbl">PRO Services</span><span className="jfz-result-line-val">+{f(4500)}</span></div>}
          {bnk && <div className="jfz-result-line"><span className="jfz-result-line-lbl">Banking Assistance</span><span className="jfz-result-line-val">+{f(3500)}</span></div>}
        </div>
        <div className="jfz-result-total-row"><span style={{ color: "var(--w)", fontWeight: 500 }}>Total Estimate</span><span style={{ color: "var(--g400)", fontWeight: 600 }}>{f(total)}</span></div>
        <p className="jfz-result-disclaimer">Estimate only. Final costs depend on facility availability, current authority fees, and specific activity requirements.</p>
        <button className="jfz-btn-gold" style={{ width: "100%" }}>Get Exact Quote →</button>
      </div>
    </div>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────
export default function JAFZAPage({ onBack }) {
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
    <div className="jfz-root">
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className={`jfz-nav${scrolled ? " scrolled" : ""}`}>
        <div className="jfz-nav-logo">INCO<em>ZONE</em></div>
        <ul className="jfz-nav-links">{["Services","Free Zones","About","Blog","Contact"].map(l=><li key={l}><a href="#">{l}</a></li>)}</ul>
        <button className="jfz-nav-cta">Schedule Consultation</button>
      </nav>

      {/* ── HERO ── */}
      <div className="jfz-hero">
        <HeroCanvas />
        <button className="jfz-back-btn" onClick={onBack}>Back to Free Zones</button>

        <div className="jfz-hero-left">
          <div className="jfz-hero-eyebrow">
            <div className="jfz-hero-eyebrow-dot" />
            Logistics &amp; Trade · Jebel Ali, Dubai
          </div>
          <h1 className="jfz-hero-h1">JAFZA<em>Free Zone</em></h1>
          <div className="jfz-hero-fullname">Jebel Ali Free Zone Authority — DP World</div>
          <p className="jfz-hero-desc">
            The world's largest free zone by area — directly integrated with Jebel Ali Port, the Middle East's biggest port. Unmatched for logistics, manufacturing, and large-scale trade operations. Starting from <strong style={{ color: "var(--g300)" }}>AED 22,000.</strong>
          </p>
          <div className="jfz-hero-actions">
            <button className="jfz-btn-gold">Start JAFZA Setup →</button>
            <button className="jfz-btn-ghost">Download Free Guide</button>
          </div>
        </div>

        <div className="jfz-hero-right">
          <div className="jfz-hero-card">
            <span className="jfz-hero-card-label">Quick Reference</span>
            {[
              ["Location","Jebel Ali, Dubai"], ["Setup From","AED 22,000","gold"],
              ["Setup Time","7–14 Days","gold"], ["Min. Capital","Not Required"],
              ["Ownership","100% Foreign","gold"], ["Visa Quota","Up to 15"],
              ["Annual Renewal","AED 14–35K"], ["Tax","0% Corporate"],
            ].map(([l, v, cls]) => (
              <div className="jfz-hero-card-row" key={l}>
                <span>{l}</span><span className={cls || ""}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="jfz-scroll-hint"><span>Scroll</span><div className="jfz-scroll-line" /></div>
      </div>

      {/* ── STATS ── */}
      <div className="jfz-stats">
        {STATS.map((s, i) => (
          <div className="jfz-stat" key={i}>
            <span className="jfz-stat-val">{s.v}</span>
            <span className="jfz-stat-key">{s.k}</span>
          </div>
        ))}
      </div>

      {/* ── INTRO ── */}
      <div className="jfz-intro jfz-section">
        <span className="jfz-section-label jfz-reveal">Zone Overview</span>
        <h2 className="jfz-h2 jfz-reveal jr1" style={{ maxWidth: "640px" }}>The World's Gateway<br /><em>to Global Trade</em></h2>
        <div className="jfz-intro-grid">
          <div className="jfz-intro-text">
            <p className="jfz-reveal jr1"><strong>JAFZA (Jebel Ali Free Zone Authority)</strong> is the world's largest free zone by area and the UAE's premier destination for large-scale trade, logistics, and manufacturing. Established in 1985 alongside Jebel Ali Port — the Middle East's biggest and busiest port — JAFZA and the port form an integrated trade ecosystem that connects to over 190 countries worldwide.</p>
            <p className="jfz-reveal jr2">Home to <strong>9,000+ companies</strong> including some of the world's largest multinationals — Sony, General Electric, Siemens, and Procter & Gamble — JAFZA is where serious trade infrastructure lives. The zone offers warehouses, factories, land plots, and offices, all within direct reach of Jebel Ali's 67 berths.</p>
            <p className="jfz-reveal jr3">JAFZA's defining advantage is its <strong>seamless customs integration with Jebel Ali Port</strong>. Goods can move from vessel to warehouse to market with minimal friction — a competitive advantage that no other UAE free zone can replicate. For businesses where supply chain speed is a revenue driver, JAFZA is the only choice.</p>
            <p className="jfz-reveal jr3">The zone also offers the UAE's largest visa quota — <strong>up to 15 investor and employee visas</strong> per license — supporting the large teams that industrial and logistics operations require.</p>
          </div>
          <div className="jfz-reveal jr2">
            <div className="jfz-pillars">
              {[
                { i:"⚓", h:"Jebel Ali Port Integration", p:"Direct, seamless integration with the world's 9th largest port. Goods move between vessel, warehouse, and market with zero friction — the operational advantage that defines JAFZA." },
                { i:"🌍", h:"190+ Country Connectivity", p:"Jebel Ali Port connects to over 190 countries via regular shipping services. For businesses that need to reach global markets efficiently, no UAE address provides better connectivity." },
                { i:"🏭", h:"Industrial Infrastructure at Scale", p:"Warehouses, factories, land plots, and cold storage facilities at a scale unavailable in any other UAE free zone. JAFZA can accommodate operations from small warehouses to full manufacturing plants." },
                { i:"👥", h:"Highest Visa Quota in UAE", p:"Up to 15 investor and employee visas — the highest allocation of any UAE free zone. Designed to support the larger teams that industrial and logistics operations require." },
                { i:"🏦", h:"Trade Finance Friendly", p:"JAFZA's reputation with UAE banks is unmatched for trade finance — letters of credit, facilities, and corporate banking are significantly easier to access than from smaller free zones." },
              ].map((p, i) => (
                <div className="jfz-pillar" key={i}>
                  <div className="jfz-pillar-icon">{p.i}</div>
                  <div><h4>{p.h}</h4><p>{p.p}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PACKAGES ── */}
      <div className="jfz-packages jfz-section">
        <span className="jfz-section-label jfz-reveal">Setup Packages</span>
        <h2 className="jfz-h2 jfz-reveal jr1">Choose Your <em>JAFZA Package</em></h2>
        <p className="jfz-reveal jr2" style={{ fontSize: "0.84rem", color: "var(--cream-ink3)", marginTop: "10px", maxWidth: "520px" }}>All packages include full company incorporation, trade license, and corporate documents. Facility costs are additional and depend on size and type.</p>
        <div className="jfz-pkg-grid">
          {[
            { name:"Trade", tag:"Import/export & trading SMEs", price:"22,000", badge:"Entry Level", featured:false, feats:[["1 Trading Activity",true],["Registered Office",true],["3 Investor Visas",true],["Company Stamp & MOA",true],["Bank Account Assistance",false],["Dedicated Account Manager",false]] },
            { name:"Logistics Plus", tag:"Freight, logistics & distribution", price:"38,500", badge:"Most Popular", featured:true, feats:[["5 Trade Activities",true],["Warehouse Unit Access",true],["8 Investor Visas",true],["Full Corporate Documents",true],["Bank Account Assistance",true],["Dedicated Account Manager",false]] },
            { name:"Enterprise", tag:"Large-scale industrial operations", price:"65,000", badge:"Enterprise", featured:false, feats:[["Unlimited Activities",true],["Large Warehouse / Land Plot",true],["15 Investor Visas",true],["Full Corporate Documents",true],["Priority Bank Account Setup",true],["Dedicated Account Manager",true]] },
          ].map((pkg, i) => (
            <div className={`jfz-pkg jfz-reveal jr${i+1}${pkg.featured ? " featured" : ""}`} key={i}>
              <div className="jfz-pkg-badge">{pkg.badge}</div>
              <div className="jfz-pkg-name">{pkg.name}</div>
              <p className="jfz-pkg-tag">{pkg.tag}</p>
              <div className="jfz-pkg-price">
                <div className="jfz-pkg-amount">AED {pkg.price}</div>
                <div className="jfz-pkg-period">One-time setup · excludes annual renewal & facility</div>
              </div>
              <ul className="jfz-pkg-features">
                {pkg.feats.map(([t, on], j) => (
                  <li className="jfz-pkg-feat" key={j}>
                    <span className={on ? "jfz-feat-on" : "jfz-feat-off"}>{on ? "✓" : "×"}</span>
                    <span className={on ? "jfz-feat-label-on" : "jfz-feat-label-off"}>{t}</span>
                  </li>
                ))}
              </ul>
              <button className="jfz-pkg-btn">{pkg.featured ? "Select This Package →" : "Get Started →"}</button>
            </div>
          ))}
        </div>
      </div>

      {/* ── ACTIVITIES ── */}
      <div className="jfz-activities jfz-section">
        <span className="jfz-section-label jfz-reveal">Licensed Activities</span>
        <h2 className="jfz-h2 jfz-reveal jr1">What Can You Do <em>Under JAFZA?</em></h2>
        <p className="jfz-reveal jr2" style={{ fontSize: "0.83rem", color: "var(--w60)", marginTop: "10px", maxWidth: "580px" }}>JAFZA supports hundreds of trade, logistics, and industrial activities:</p>
        <div className="jfz-act-grid">
          {ACTIVITIES.map((a, i) => (
            <div className={`jfz-act-card jfz-reveal jr${(i%4)+1}`} key={i}>
              <div className="jfz-act-icon">{a.i}</div>
              <div className="jfz-act-name">{a.n}</div>
              <div className="jfz-act-desc">{a.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROCESS ── */}
      <div className="jfz-process jfz-section">
        <span className="jfz-section-label jfz-reveal" style={{ textAlign: "center", display: "block" }}>Setup Process</span>
        <h2 className="jfz-h2 jfz-reveal jr1" style={{ textAlign: "center" }}>Your JAFZA <em>Journey — Step by Step</em></h2>
        <div className="jfz-process-inner">
          {STEPS.map((s, i) => (
            <div className={`jfz-step jfz-reveal jr${(i%4)+1}`} key={i}>
              <div className="jfz-step-num">{s.n}</div>
              <div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <div className="jfz-step-time">{s.time}</div>
                <div className="jfz-step-docs">{s.docs.map(d => <span className="jfz-doc-tag" key={d}>{d}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DOCUMENTS ── */}
      <div className="jfz-documents jfz-section">
        <span className="jfz-section-label jfz-reveal">Required Documents</span>
        <h2 className="jfz-h2 jfz-reveal jr1">What You <em>Need to Prepare</em></h2>
        <p className="jfz-reveal jr2" style={{ fontSize: "0.83rem", color: "var(--w60)", marginTop: "10px" }}>JAFZA requires a thorough documentation package reflecting its regulated port-adjacent status:</p>
        <div className="jfz-docs-grid">
          {DOCUMENTS.map((d, i) => (
            <div className={`jfz-doc-card jfz-reveal jr${(i%2)+1}`} key={i}>
              <div className="jfz-doc-num">0{i+1}</div>
              <div><div className="jfz-doc-title">{d.t}</div><div className="jfz-doc-desc">{d.d}</div></div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CALCULATOR ── */}
      <div className="jfz-calc jfz-section">
        <span className="jfz-section-label jfz-reveal">Cost Estimator</span>
        <Calculator />
      </div>

      {/* ── FAQ ── */}
      <div className="jfz-faq jfz-section">
        <span className="jfz-section-label jfz-reveal" style={{ textAlign: "center", display: "block" }}>FAQ</span>
        <h2 className="jfz-h2 jfz-reveal jr1" style={{ textAlign: "center" }}>Frequently Asked <em>Questions</em></h2>
        <div className="jfz-faq-inner">
          {FAQS.map((f, i) => (
            <div className={`jfz-faq-item jfz-reveal jr${(i%3)+1}${openFaq===i ? " open" : ""}`} key={i}>
              <button className="jfz-faq-q" onClick={() => setOpenFaq(openFaq===i ? null : i)}>
                <span className="jfz-faq-q-text">{f.q}</span>
                <div className="jfz-faq-icon">+</div>
              </button>
              <div className="jfz-faq-answer">
                <div className="jfz-faq-answer-inner">
                  <p>{f.a}</p>
                  {f.list && <ul>{f.list.map(li => <li key={li}>{li}</li>)}</ul>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ADVISORY ── */}
      <div className="jfz-advisory jfz-section">
        <span className="jfz-section-label jfz-reveal" style={{ textAlign: "center", display: "block" }}>INCOZONE Advisory</span>
        <h2 className="jfz-h2 jfz-reveal jr1" style={{ textAlign: "center" }}>Expert Advice Before <em>You Decide</em></h2>
        <div className="jfz-advisory-inner">
          <div className="jfz-advisory-quote jfz-reveal jr2">
            "JAFZA is not for everyone — and that's precisely the point.{" "}
            <strong>If your business model depends on moving physical goods efficiently through a major port, no free zone in the UAE or the wider region comes close. The port integration isn't a marketing claim — it's a genuine operational advantage that changes unit economics for logistics and trade businesses.</strong>"
            <div className="jfz-advisory-quote-attr">— INCOZONE Advisory Team</div>
          </div>
          <div className="jfz-advisory-tips">
            {[
              { n:"01", t:"Port Access is the Product", p:"Don't evaluate JAFZA purely on license cost. The real calculation is the operational savings from direct port integration — faster customs clearance, lower demurrage, fewer intermediaries. For high-volume importers and exporters, these savings dwarf the higher setup cost." },
              { n:"02", t:"Facility Planning is Critical", p:"JAFZA's infrastructure must be matched to your business scale. We help clients avoid over-committing to large warehouses before demand justifies it — or under-planning and facing bottlenecks. The right facility structure from day one saves significant cost." },
              { n:"03", t:"Multinationals Set the Standard", p:"JAFZA's tenant base — Sony, GE, Siemens, P&G — signals the credibility the address carries with international partners and banks. For businesses pitching to global buyers or seeking trade finance, JAFZA's address carries weight." },
              { n:"04", t:"Banking is Stronger Here", p:"UAE banks have deep familiarity with JAFZA's trade and logistics business models. Letters of credit, import financing, and corporate banking facilities are significantly easier to access for JAFZA companies than for those in smaller or newer free zones." },
            ].map((tip, i) => (
              <div className={`jfz-tip jfz-reveal jr${(i%2)+1}`} key={i}>
                <span className="jfz-tip-num">{tip.n}</span>
                <h4>{tip.t}</h4>
                <p>{tip.p}</p>
              </div>
            ))}
          </div>
          <div className="jfz-advisory-warning jfz-reveal">
            <h4>⚠️ When JAFZA Might Not Be the Best Fit</h4>
            <p>Consider alternatives if: your business is primarily service-based without physical goods movement — DMCC, IFZA, or Meydan offer better value · you are an early-stage startup or solo operator — RAKEZ or AFZ provide far lower cost with equivalent residency benefits · your budget does not support annual renewal costs of AED 14,000–35,000+ · you are in media or creative industries — SHAMS is more appropriate · or your business requires ADGM's financial services regulatory framework. INCOZONE will always recommend honestly.</p>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="jfz-cta">
        <div className="jfz-cta-inner">
          <span className="jfz-section-label jfz-reveal">Begin Your Journey</span>
          <h2 className="jfz-reveal jr1">Ready to Establish Your<br /><em>JAFZA Operation?</em></h2>
          <div className="jfz-cta-divider" />
          <p className="jfz-reveal jr2">
            Schedule a private consultation. No obligation. Our JAFZA specialists will assess your trade and logistics requirements and give you an honest recommendation on whether JAFZA is right for your business model.
          </p>
          <div className="jfz-cta-btns jfz-reveal jr3">
            <button className="jfz-btn-ink">Schedule Private Consultation</button>
            <button className="jfz-btn-cream-outline" onClick={onBack}>← Explore Other Zones</button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="jfz-footer">
        <div className="jfz-footer-inner">
          <div className="jfz-footer-logo">INCO<em>ZONE</em></div>
          <div className="jfz-footer-copy">© 2025 INCOZONE. All rights reserved. Dubai, UAE.</div>
          <button className="jfz-footer-back" onClick={onBack}>← Back to Free Zones</button>
        </div>
      </div>

      {/* ── WA FLOAT ── */}
      <div className="jfz-wa">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </div>
    </div>
  );
}