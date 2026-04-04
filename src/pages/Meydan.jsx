import { useState, useEffect, useRef } from "react";
import { IBriefcase, IMonitor, IMegaphone, IFilm, IBuilding, ILeaf, ICompass, IBookOpen, ICross, IArrowsExchange, IShoppingBag, IActivity, ICrown, IClock, IMapPin, IShield, IStar } from "../icons";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Meydan Free Zone Page  (standalone, self-contained)
//  Drop into: src/pages/Meydan.jsx
//  Same structure & palette as DMCC.jsx — only content differs
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

.myd-root *, .myd-root *::before, .myd-root *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}
.myd-root {
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
.myd-nav {
  position: fixed; inset-inline: 0; top: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 60px;
  transition: background 0.5s, padding 0.4s, border-color 0.5s;
  border-bottom: 1px solid transparent;
}
.myd-nav.scrolled {
  background: rgba(5,17,30,0.96); backdrop-filter: blur(20px);
  padding: 14px 60px; border-bottom-color: rgba(201,168,76,0.12);
}
.myd-nav-logo { font-family: var(--fd); font-size: 1.5rem; font-weight: 500; letter-spacing: 0.15em; color: var(--w); cursor: pointer; }
.myd-nav-logo em { color: var(--g400); font-style: normal; }
.myd-nav-links { display: flex; gap: 36px; list-style: none; }
.myd-nav-links a { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--w60); text-decoration: none; transition: color 0.3s; }
.myd-nav-links a:hover { color: var(--g300); }
.myd-nav-cta {
  font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
  background: transparent; border: 1px solid var(--g400); color: var(--g400);
  padding: 9px 22px; cursor: pointer; font-family: var(--fb);
  transition: background 0.3s, color 0.3s;
}
.myd-nav-cta:hover { background: var(--g400); color: var(--n900); }
.myd-back-btn {
  position: absolute; top: 90px; left: 60px; z-index: 20;
  background: none; border: none; font-family: var(--fb); font-size: 0.7rem;
  letter-spacing: 0.18em; text-transform: uppercase; color: var(--w30);
  cursor: pointer; display: flex; align-items: center; gap: 10px; padding: 0;
  transition: color 0.3s;
}
.myd-back-btn:hover { color: var(--g400); }
.myd-back-btn::before { content: '←'; font-size: 0.9rem; }

/* ── HERO ────────────────────────────────────────────────────── */
.myd-hero {
  min-height: 100vh; position: relative; overflow: hidden;
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: flex-end; padding: 0 60px 80px; gap: 60px;
}
.myd-hero-canvas { position: absolute; inset: 0; z-index: 0; display: block; }
.myd-hero-left { position: relative; z-index: 2; padding-top: 160px; }
.myd-hero-right { position: relative; z-index: 2; padding-top: 160px; display: flex; align-items: flex-end; justify-content: flex-end; }
.myd-hero-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--g400); border: 1px solid rgba(201,168,76,0.28); padding: 7px 16px;
  margin-bottom: 32px;
  opacity: 0; transform: translateY(16px);
  animation: mydFadeUp 1s var(--ease) 0.2s forwards;
}
.myd-hero-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--g400); animation: mydBlink 2s infinite; }
.myd-hero-h1 {
  font-family: var(--fd); font-weight: 300; line-height: 0.88;
  letter-spacing: -0.02em; color: var(--w);
  font-size: clamp(5rem, 10vw, 9.5rem); margin-bottom: 20px;
  opacity: 0; transform: translateY(20px);
  animation: mydFadeUp 1.1s var(--ease) 0.35s forwards;
}
.myd-hero-h1 em { display: block; color: var(--g400); font-style: italic; font-weight: 300; }
.myd-hero-fullname {
  font-family: var(--fd); font-size: 1rem; font-weight: 300;
  color: var(--w60); font-style: italic; margin-bottom: 36px; letter-spacing: 0.04em;
  opacity: 0; animation: mydFadeUp 1s var(--ease) 0.5s forwards;
}
.myd-hero-desc {
  font-size: 0.86rem; color: var(--w80); line-height: 1.85; max-width: 520px; margin-bottom: 44px;
  opacity: 0; animation: mydFadeUp 1s var(--ease) 0.65s forwards;
}
.myd-hero-actions {
  display: flex; gap: 14px; flex-wrap: wrap;
  opacity: 0; animation: mydFadeUp 1s var(--ease) 0.8s forwards;
}
.myd-hero-card {
  background: rgba(11,28,45,0.85); backdrop-filter: blur(16px);
  border: 1px solid var(--w12); padding: 36px 32px; min-width: 280px;
  opacity: 0; animation: mydFadeUp 1.1s var(--ease) 0.9s forwards;
}
.myd-hero-card-label {
  font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--g400); margin-bottom: 20px; display: block;
}
.myd-hero-card-row {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 11px 0; border-bottom: 1px solid var(--w06); font-size: 0.78rem;
}
.myd-hero-card-row:last-child { border-bottom: none; }
.myd-hero-card-row span:first-child { color: var(--w60); }
.myd-hero-card-row span:last-child { color: var(--w); font-weight: 500; text-align: right; }
.myd-hero-card-row span.gold { color: var(--g400); }
.myd-scroll-hint {
  position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
  z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px;
  opacity: 0; animation: mydFadeUp 1s var(--ease) 1.2s forwards;
}
.myd-scroll-hint span { font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--w30); }
.myd-scroll-line { width: 1px; height: 44px; background: linear-gradient(to bottom, var(--g400), transparent); animation: mydScrollPulse 2.2s ease-in-out infinite; }

/* ── STATS BAR ───────────────────────────────────────────────── */
.myd-stats {
  display: grid; grid-template-columns: repeat(6, 1fr);
  background: var(--n950); border-top: 1px solid var(--w12);
  border-bottom: 1px solid var(--w12);
}
.myd-stat { padding: 28px 20px; text-align: center; border-right: 1px solid var(--w12); transition: background 0.3s; }
.myd-stat:last-child { border-right: none; }
.myd-stat:hover { background: var(--glow3); }
.myd-stat-val { font-family: var(--fd); font-size: 2rem; font-weight: 300; color: var(--g400); display: block; line-height: 1; }
.myd-stat-key { font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--w30); margin-top: 6px; display: block; }

/* ── SECTION BASICS ──────────────────────────────────────────── */
.myd-section { padding: 96px 60px; }
.myd-section-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--g400); margin-bottom: 14px; display: block; }
.myd-h2 { font-family: var(--fd); font-size: clamp(2rem, 3.8vw, 3.4rem); font-weight: 300; line-height: 1.15; color: var(--w); }
.myd-h2 em { color: var(--g400); font-style: italic; }

/* ── INTRO ───────────────────────────────────────────────────── */
.myd-intro { background: var(--n800); }
.myd-intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; margin-top: 52px; }
.myd-intro-text p { font-size: 0.88rem; color: var(--w60); line-height: 1.88; margin-bottom: 22px; }
.myd-intro-text p strong { color: var(--w); font-weight: 500; }
.myd-intro-text p:last-child { margin-bottom: 0; }
.myd-pillars { display: flex; flex-direction: column; }
.myd-pillar { display: flex; gap: 20px; padding: 22px 0; border-bottom: 1px solid var(--w06); transition: padding-left 0.3s var(--ease); }
.myd-pillar:first-child { border-top: 1px solid var(--w06); }
.myd-pillar:hover { padding-left: 10px; }
.myd-pillar-icon { font-size: 1.3rem; flex-shrink: 0; margin-top: 2px; }
.myd-pillar h4 { font-size: 0.88rem; font-weight: 500; color: var(--w); margin-bottom: 5px; }
.myd-pillar p { font-size: 0.77rem; color: var(--w60); line-height: 1.65; }

/* ── PACKAGES ────────────────────────────────────────────────── */
.myd-packages { background: var(--cream-bg); position: relative; overflow: hidden; }
.myd-packages::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(201,168,76,0.09), transparent 60%);
  pointer-events: none;
}
.myd-packages::after {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, transparent, var(--g400) 40%, transparent);
  opacity: 0.6;
}
.myd-packages .myd-section-label { color: #8A6820; }
.myd-packages .myd-h2 { color: var(--cream-ink); }
.myd-packages .myd-h2 em { color: var(--g400); }
.myd-pkg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 52px; }
.myd-pkg {
  background: var(--cream-bg); border: 1px solid var(--cream-bdr);
  padding: 40px 34px; display: flex; flex-direction: column;
  transition: transform 0.35s var(--ease), box-shadow 0.35s var(--ease), border-color 0.35s;
  box-shadow: 0 2px 16px rgba(120,90,30,0.06); position: relative;
}
.myd-pkg:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(120,90,30,0.14); border-color: rgba(201,168,76,0.45); }
.myd-pkg.featured { background: var(--n900); border-color: rgba(201,168,76,0.35); box-shadow: 0 8px 40px rgba(0,0,0,0.25); }
.myd-pkg.featured:hover { border-color: var(--g400); box-shadow: 0 24px 60px rgba(0,0,0,0.35); }
.myd-pkg-badge { font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; padding: 4px 12px; width: fit-content; margin-bottom: 22px; font-weight: 500; }
.myd-pkg:not(.featured) .myd-pkg-badge { border: 1px solid var(--cream-bdr); color: var(--cream-ink3); background: var(--cream-100); }
.myd-pkg.featured .myd-pkg-badge { border: 1px solid var(--g400); color: var(--g400); background: rgba(201,168,76,0.08); }
.myd-pkg-name { font-family: var(--fd); font-size: 2rem; font-weight: 400; margin-bottom: 6px; }
.myd-pkg:not(.featured) .myd-pkg-name { color: var(--cream-ink); }
.myd-pkg.featured .myd-pkg-name { color: var(--w); }
.myd-pkg-tag { font-size: 0.75rem; margin-bottom: 26px; }
.myd-pkg:not(.featured) .myd-pkg-tag { color: var(--cream-ink3); }
.myd-pkg.featured .myd-pkg-tag { color: var(--w60); }
.myd-pkg-price { margin-bottom: 28px; padding-bottom: 24px; }
.myd-pkg:not(.featured) .myd-pkg-price { border-bottom: 1px solid var(--cream-bdr); }
.myd-pkg.featured .myd-pkg-price { border-bottom: 1px solid var(--w12); }
.myd-pkg-amount { font-family: var(--fd); font-size: 3rem; font-weight: 300; line-height: 1; }
.myd-pkg:not(.featured) .myd-pkg-amount { color: var(--cream-ink); }
.myd-pkg.featured .myd-pkg-amount { color: var(--g400); }
.myd-pkg-period { font-size: 0.68rem; letter-spacing: 0.08em; margin-top: 5px; }
.myd-pkg:not(.featured) .myd-pkg-period { color: var(--cream-bdr); }
.myd-pkg.featured .myd-pkg-period { color: var(--w30); }
.myd-pkg-features { list-style: none; display: flex; flex-direction: column; gap: 12px; flex: 1; margin-bottom: 32px; }
.myd-pkg-feat { display: flex; align-items: flex-start; gap: 11px; font-size: 0.79rem; line-height: 1.5; }
.myd-feat-on { color: #8A6820; flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.myd-feat-off { color: var(--cream-bdr); flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.myd-pkg.featured .myd-feat-on { color: var(--g400); }
.myd-pkg.featured .myd-feat-off { color: var(--w30); }
.myd-feat-label-on { color: var(--cream-ink2); }
.myd-feat-label-off { color: var(--cream-bdr); }
.myd-pkg.featured .myd-feat-label-on { color: var(--w80); }
.myd-pkg.featured .myd-feat-label-off { color: var(--w30); }
.myd-pkg-btn { width: 100%; padding: 13px 20px; font-family: var(--fb); font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
.myd-pkg:not(.featured) .myd-pkg-btn { background: transparent; border: 1px solid var(--cream-bdr); color: var(--cream-ink2); }
.myd-pkg:not(.featured) .myd-pkg-btn:hover { border-color: var(--g400); background: var(--cream-100); color: var(--cream-ink); }
.myd-pkg.featured .myd-pkg-btn { background: var(--g400); border: none; color: var(--n900); font-weight: 500; }
.myd-pkg.featured .myd-pkg-btn:hover { background: var(--g300); }

/* ── ACTIVITIES ──────────────────────────────────────────────── */
.myd-activities { background: var(--n800); }
.myd-act-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; margin-top: 52px; background: var(--w06); }
.myd-act-card { background: var(--n800); padding: 30px 24px; transition: background 0.3s; cursor: default; }
.myd-act-card:hover { background: var(--n750); }
.myd-act-card:hover .myd-act-name { color: var(--g300); }
.myd-act-icon { font-size: 1.5rem; margin-bottom: 14px; }
.myd-act-name { font-size: 0.84rem; font-weight: 500; color: var(--w); margin-bottom: 7px; transition: color 0.3s; }
.myd-act-desc { font-size: 0.73rem; color: var(--w60); line-height: 1.6; }

/* ── PROCESS ─────────────────────────────────────────────────── */
.myd-process { background: var(--n900); }
.myd-process-inner { max-width: 780px; margin: 52px auto 0; }
.myd-step { display: grid; grid-template-columns: 64px 1fr; gap: 28px; padding: 36px 0; border-bottom: 1px solid var(--w06); position: relative; }
.myd-step:last-child { border-bottom: none; }
.myd-step::before { content: ''; position: absolute; left: 31px; top: 84px; bottom: -36px; width: 1px; background: linear-gradient(to bottom, rgba(201,168,76,0.25), transparent); }
.myd-step:last-child::before { display: none; }
.myd-step-num { width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--g400); display: flex; align-items: center; justify-content: center; font-family: var(--fd); font-size: 0.92rem; color: var(--g400); background: var(--n900); position: relative; z-index: 1; flex-shrink: 0; }
.myd-step h3 { font-size: 0.96rem; font-weight: 500; color: var(--w); margin-bottom: 8px; }
.myd-step p { font-size: 0.81rem; color: var(--w60); line-height: 1.78; margin-bottom: 10px; }
.myd-step-time { font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--g400); margin-bottom: 12px; }
.myd-step-docs { display: flex; gap: 6px; flex-wrap: wrap; }
.myd-doc-tag { font-size: 0.62rem; padding: 4px 9px; border: 1px solid var(--w12); color: var(--w60); letter-spacing: 0.07em; }

/* ── DOCUMENTS ───────────────────────────────────────────────── */
.myd-documents { background: var(--n800); }
.myd-docs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 52px; }
.myd-doc-card { background: var(--n900); border: 1px solid var(--w06); padding: 22px 26px; display: flex; align-items: center; gap: 18px; transition: border-color 0.3s; }
.myd-doc-card:hover { border-color: rgba(201,168,76,0.2); }
.myd-doc-num { font-family: var(--fd); font-size: 1.9rem; font-weight: 300; color: rgba(201,168,76,0.18); min-width: 36px; line-height: 1; }
.myd-doc-title { font-size: 0.82rem; font-weight: 500; color: var(--w); margin-bottom: 4px; }
.myd-doc-desc { font-size: 0.72rem; color: var(--w60); line-height: 1.55; }

/* ── CALCULATOR ──────────────────────────────────────────────── */
.myd-calc { background: var(--n750); }
.myd-calc-inner { display: grid; grid-template-columns: 1.3fr 1fr; gap: 64px; align-items: start; margin-top: 52px; }
.myd-calc-form { display: flex; flex-direction: column; gap: 22px; }
.myd-calc-field { display: flex; flex-direction: column; gap: 7px; }
.myd-calc-label { font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--w60); }
.myd-calc-select { background: var(--n900); border: 1px solid var(--w12); color: var(--w); padding: 13px 16px; font-family: var(--fb); font-size: 0.83rem; font-weight: 300; outline: none; transition: border-color 0.3s; appearance: none; -webkit-appearance: none; cursor: pointer; }
.myd-calc-select:focus { border-color: var(--g400); }
.myd-calc-select option { background: var(--n800); }
.myd-toggle-row { display: flex; }
.myd-toggle { flex: 1; padding: 11px 10px; font-size: 0.66rem; letter-spacing: 0.12em; text-transform: uppercase; font-family: var(--fb); cursor: pointer; background: var(--n900); border: 1px solid var(--w12); color: var(--w60); transition: all 0.3s; margin-right: -1px; text-align: center; }
.myd-toggle.on { background: var(--glow2); border-color: var(--g400); color: var(--g400); position: relative; z-index: 1; }
.myd-result { background: var(--n900); border: 1px solid rgba(201,168,76,0.2); padding: 40px 36px; position: sticky; top: 90px; }
.myd-result-tag { font-size: 0.6rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--g400); margin-bottom: 22px; display: block; }
.myd-result-amount { font-family: var(--fd); font-size: 3.6rem; font-weight: 300; line-height: 1; color: var(--w); }
.myd-result-currency { color: var(--g400); }
.myd-result-note { font-size: 0.66rem; color: var(--w30); margin-top: 4px; margin-bottom: 28px; }
.myd-result-lines { border-top: 1px solid var(--w12); margin-bottom: 24px; }
.myd-result-line { display: flex; justify-content: space-between; padding: 11px 0; border-bottom: 1px solid var(--w06); font-size: 0.76rem; }
.myd-result-line-lbl { color: var(--w60); }
.myd-result-line-val { color: var(--w); font-weight: 500; }
.myd-result-total-row { display: flex; justify-content: space-between; padding: 14px 0 0; font-size: 0.86rem; }
.myd-result-disclaimer { font-size: 0.68rem; color: var(--w30); line-height: 1.65; margin-bottom: 22px; margin-top: 14px; }

/* ── FAQ ─────────────────────────────────────────────────────── */
.myd-faq { background: var(--n900); }
.myd-faq-inner { max-width: 820px; margin: 52px auto 0; }
.myd-faq-item { border-bottom: 1px solid var(--w06); }
.myd-faq-q { width: 100%; background: none; border: none; padding: 26px 0; display: flex; align-items: center; justify-content: space-between; gap: 24px; cursor: pointer; text-align: left; font-family: var(--fb); }
.myd-faq-q-text { font-size: 0.92rem; font-weight: 400; color: var(--w); line-height: 1.5; }
.myd-faq-icon { width: 26px; height: 26px; border: 1px solid var(--w12); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--g400); font-size: 1.1rem; flex-shrink: 0; transition: all 0.3s; }
.myd-faq-item.open .myd-faq-icon { background: var(--g400); color: var(--n900); border-color: var(--g400); transform: rotate(45deg); }
.myd-faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.45s var(--ease); }
.myd-faq-item.open .myd-faq-answer { max-height: 500px; }
.myd-faq-answer-inner { padding-bottom: 24px; }
.myd-faq-answer p { font-size: 0.83rem; color: var(--w60); line-height: 1.85; }
.myd-faq-answer ul { margin-top: 12px; list-style: none; display: flex; flex-direction: column; gap: 7px; }
.myd-faq-answer ul li { font-size: 0.8rem; color: var(--w60); padding-left: 18px; position: relative; line-height: 1.6; }
.myd-faq-answer ul li::before { content: '—'; position: absolute; left: 0; color: var(--g400); }

/* ── ADVISORY ────────────────────────────────────────────────── */
.myd-advisory { background: var(--n800); position: relative; overflow: hidden; }
.myd-advisory::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 70% at 50% 50%, rgba(201,168,76,0.04), transparent); pointer-events: none; }
.myd-advisory-inner { max-width: 900px; margin: 52px auto 0; position: relative; z-index: 1; }
.myd-advisory-quote { font-family: var(--fd); font-size: 1.35rem; font-weight: 300; color: var(--w80); line-height: 1.65; font-style: italic; text-align: center; padding: 40px 48px; border: 1px solid var(--w12); background: var(--n900); margin-bottom: 48px; }
.myd-advisory-quote strong { color: var(--g400); font-style: normal; }
.myd-advisory-quote-attr { margin-top: 18px; font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--g400); font-style: normal; }
.myd-advisory-tips { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 36px; }
.myd-tip { border: 1px solid var(--w06); padding: 30px 26px; transition: border-color 0.3s; }
.myd-tip:hover { border-color: rgba(201,168,76,0.2); }
.myd-tip-num { font-family: var(--fd); font-size: 0.68rem; letter-spacing: 0.22em; color: var(--g400); margin-bottom: 12px; display: block; }
.myd-tip h4 { font-size: 0.9rem; font-weight: 500; color: var(--w); margin-bottom: 9px; }
.myd-tip p { font-size: 0.78rem; color: var(--w60); line-height: 1.78; }
.myd-advisory-warning { background: rgba(201,168,76,0.05); border: 1px solid rgba(201,168,76,0.18); padding: 26px 30px; margin-bottom: 32px; }
.myd-advisory-warning h4 { font-size: 0.82rem; font-weight: 500; color: var(--g400); margin-bottom: 9px; }
.myd-advisory-warning p { font-size: 0.78rem; color: var(--w60); line-height: 1.78; }

/* ── CTA (CREAM) ─────────────────────────────────────────────── */
.myd-cta { background: var(--cream-bg); padding: 120px 60px; text-align: center; position: relative; overflow: hidden; }
.myd-cta::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(180,150,90,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(180,150,90,0.06) 1px, transparent 1px); background-size: 56px 56px; }
.myd-cta::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.10), transparent 70%); pointer-events: none; }
.myd-cta-inner { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }
.myd-cta .myd-section-label { color: #8A6820; text-align: center; }
.myd-cta h2 { font-family: var(--fd); font-size: clamp(2.4rem, 4.5vw, 4rem); font-weight: 300; color: var(--cream-ink); line-height: 1.15; margin-bottom: 18px; }
.myd-cta h2 em { color: var(--g400); font-style: italic; }
.myd-cta-divider { width: 44px; height: 1px; background: var(--g400); margin: 22px auto; opacity: 0.55; }
.myd-cta p { font-size: 0.83rem; color: var(--cream-ink3); line-height: 1.8; margin-bottom: 44px; }
.myd-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

/* ── BUTTONS ─────────────────────────────────────────────────── */
.myd-btn-gold { padding: 15px 36px; background: var(--g400); color: var(--n900); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.myd-btn-gold:hover { background: var(--g300); transform: translateY(-2px); }
.myd-btn-ghost { padding: 15px 36px; background: transparent; color: var(--w); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--w30); cursor: pointer; transition: all 0.3s; }
.myd-btn-ghost:hover { border-color: var(--g400); color: var(--g400); transform: translateY(-2px); }
.myd-btn-ink { padding: 15px 36px; background: var(--cream-ink); color: var(--cream-bg); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.myd-btn-ink:hover { background: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }
.myd-btn-cream-outline { padding: 15px 36px; background: transparent; color: var(--cream-ink2); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--cream-bdr); cursor: pointer; transition: all 0.3s; }
.myd-btn-cream-outline:hover { border-color: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }

/* ── FOOTER ──────────────────────────────────────────────────── */
.myd-footer { background: var(--n950); padding: 52px 60px; border-top: 1px solid var(--w06); }
.myd-footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
.myd-footer-logo { font-family: var(--fd); font-size: 1.3rem; letter-spacing: 0.15em; color: var(--w); }
.myd-footer-logo em { color: var(--g400); font-style: normal; }
.myd-footer-copy { font-size: 0.68rem; color: var(--w30); }
.myd-footer-back { padding: 9px 18px; background: transparent; border: 1px solid var(--w12); color: var(--w60); font-family: var(--fb); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
.myd-footer-back:hover { border-color: var(--g400); color: var(--g400); }

/* ── WA FLOAT ────────────────────────────────────────────────── */
.myd-wa { position: fixed; bottom: 28px; right: 28px; z-index: 300; width: 50px; height: 50px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 18px rgba(37,211,102,0.4); transition: transform 0.3s, box-shadow 0.3s; }
.myd-wa:hover { transform: scale(1.1); box-shadow: 0 6px 26px rgba(37,211,102,0.55); }

/* ── REVEAL ──────────────────────────────────────────────────── */
.myd-reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.8s var(--ease), transform 0.8s var(--ease); }
.myd-reveal.in { opacity: 1; transform: translateY(0); }
.mr1 { transition-delay: 0.08s; } .mr2 { transition-delay: 0.18s; }
.mr3 { transition-delay: 0.28s; } .mr4 { transition-delay: 0.38s; }

/* ── KEYFRAMES ───────────────────────────────────────────────── */
@keyframes mydFadeUp { to { opacity: 1; transform: translateY(0); } }
@keyframes mydScrollPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
@keyframes mydBlink { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.75); } }

/* ── RESPONSIVE ──────────────────────────────────────────────── */
@media(max-width:1100px) {
  .myd-hero { grid-template-columns: 1fr; }
  .myd-hero-right { display: none; }
  .myd-intro-grid { grid-template-columns: 1fr; gap: 48px; }
  .myd-pkg-grid { grid-template-columns: 1fr; max-width: 480px; }
  .myd-act-grid { grid-template-columns: repeat(3, 1fr); }
  .myd-calc-inner { grid-template-columns: 1fr; }
  .myd-result { position: static; }
  .myd-advisory-tips { grid-template-columns: 1fr; }
}
@media(max-width:768px) {
  .myd-nav { padding: 16px 24px; } .myd-nav.scrolled { padding: 12px 24px; } .myd-nav-links { display: none; }
  .myd-hero { padding: 0 24px 72px; }
  .myd-back-btn { left: 24px; }
  .myd-section { padding: 68px 24px; }
  .myd-stats { grid-template-columns: repeat(3, 1fr); }
  .myd-act-grid { grid-template-columns: repeat(2, 1fr); }
  .myd-docs-grid { grid-template-columns: 1fr; }
  .myd-footer { padding: 40px 24px; }
  .myd-cta { padding: 80px 24px; }
}
@media(max-width:480px) {
  .myd-stats { grid-template-columns: repeat(2, 1fr); }
  .myd-act-grid { grid-template-columns: 1fr; }
  .myd-hero-h1 { font-size: 4.5rem; }
}

  .myd-nav-hamburger {
    display: none; flex-direction: column; gap: 5px; cursor: pointer;
    background: none; border: none; padding: 6px; z-index: 310;
  }
  .myd-nav-hamburger span {
    display: block; width: 24px; height: 1.5px; background: rgba(248,245,238,0.6);
    transition: all 0.35s cubic-bezier(0.16,1,0.3,1); transform-origin: center;
  }
  .myd-nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: #C9A84C; }
  .myd-nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .myd-nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: #C9A84C; }
  .myd-drawer {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(3,10,20,0.97); backdrop-filter: blur(24px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    transform: translateX(100%); transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
    pointer-events: none;
  }
  .myd-drawer.open { transform: translateX(0); pointer-events: all; }
  .myd-drawer-brand {
    font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.3rem;
    letter-spacing: .18em; color: #F8F5EE; margin-bottom: 44px;
    opacity: 0; transform: translateY(10px);
    transition: opacity .4s .1s, transform .4s .1s;
  }
  .myd-drawer.open .myd-drawer-brand { opacity: 1; transform: translateY(0); }
  .myd-drawer-brand em { color: #C9A84C; font-style: normal; }
  .myd-dlink {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2rem, 8vw, 3rem); font-weight: 300; color: rgba(248,245,238,0.6);
    background: none; border: none; padding: 10px 0; cursor: pointer;
    display: block; width: 100%; text-align: center;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, opacity .4s cubic-bezier(0.16,1,0.3,1), transform .4s cubic-bezier(0.16,1,0.3,1);
  }
  .myd-drawer.open .myd-dlink { opacity: 1; transform: translateY(0); }
  .myd-drawer.open .myd-dlink:nth-of-type(1) { transition-delay: .12s; }
  .myd-drawer.open .myd-dlink:nth-of-type(2) { transition-delay: .17s; }
  .myd-drawer.open .myd-dlink:nth-of-type(3) { transition-delay: .22s; }
  .myd-drawer.open .myd-dlink:nth-of-type(4) { transition-delay: .27s; }
  .myd-drawer.open .myd-dlink:nth-of-type(5) { transition-delay: .32s; }
  .myd-dlink:hover { color: #C9A84C; }
  .myd-drawer-div { width: 40px; height: 1px; background: rgba(201,168,76,.25); margin: 18px 0; opacity: 0; transition: opacity .4s .34s; }
  .myd-drawer.open .myd-drawer-div { opacity: 1; }
  .myd-dcta {
    font-family: 'DM Sans', sans-serif; font-size: .7rem; letter-spacing: .18em;
    text-transform: uppercase; color: #C9A84C; border: 1px solid #C9A84C;
    background: none; padding: 12px 32px; cursor: pointer; margin-top: 8px;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, background .3s, opacity .4s .38s, transform .4s .38s;
  }
  .myd-drawer.open .myd-dcta { opacity: 1; transform: translateY(0); }
  .myd-dcta:hover { background: #C9A84C; color: #05111e; }
  @media (max-width: 900px) {
    .myd-nav-links { display: none; }
    .myd-nav-cta { display: none !important; }
    .myd-nav-hamburger { display: flex; }
  }
`;

// ── DATA ──────────────────────────────────────────────────────
const STATS = [
  { v:"40,000+", k:"Companies" }, { v:"5–10", k:"Setup Days" },
  { v:"100%", k:"Foreign Ownership" }, { v:"0%", k:"Income Tax" },
  { v:"AED 14.5K", k:"Starting Cost" }, { v:"1,500+", k:"Activities" },
];

const ACTIVITIES = [
  { i:IBriefcase, n:"Consulting & Advisory", d:"Management, strategy, business advisory and professional services" },
  { i:IMonitor, n:"Technology & IT", d:"Software development, SaaS, IT consulting and digital solutions" },
  { i:IMegaphone, n:"Marketing & Creative", d:"Digital agencies, branding, PR and creative services" },
  { i:IFilm, n:"Media & Entertainment", d:"Content creation, production, events and entertainment" },
  { i:IBuilding, n:"Real Estate", d:"Property consulting, investment advisory and PropTech" },
  { i:ILeaf, n:"Food & Beverage", d:"F&B trading, restaurant consulting and catering services" },
  { i:ICompass, n:"Travel & Tourism", d:"Travel agencies, tour operators and hospitality management" },
  { i:IBookOpen, n:"Education & Training", d:"E-learning, coaching and professional development" },
  { i:ICross, n:"Health & Wellness", d:"Health consulting, wellness services and distribution" },
  { i:IArrowsExchange, n:"General Trading", d:"Import, export and trading across all goods categories" },
  { i:IShoppingBag, n:"E-Commerce", d:"Online retail, digital platforms and dropshipping" },
  { i:IActivity, n:"Sports & Lifestyle", d:"Sports management, fitness consulting and lifestyle brands" },
];

const STEPS = [
  { n:"01", t:"Initial Consultation & Planning", d:"Our Meydan specialists assess your business activities, visa requirements and confirm Meydan is the right fit — comparing it honestly against other zones.", time:"Day 1", docs:["Passport Copy","Business Overview"] },
  { n:"02", t:"Trade Name Reservation", d:"We submit your preferred company name to Meydan authority — ensuring compliance with naming guidelines and handling all documentation.", time:"Day 1–3", docs:["Name Options","Shareholder Details"] },
  { n:"03", t:"License Application Submission", d:"Full license application submitted with supporting documents. Our team manages all communication and tracks status daily.", time:"Day 3–7", docs:["Application Form","Passport Copies","KYC Documents"] },
  { n:"04", t:"Meydan Authority Approvals", d:"Meydan reviews your application. Initial approval typically within 24–72 hours — one of the fastest turnarounds in Dubai.", time:"Day 5–10", docs:["NOC (if required)","Activity Approvals"] },
  { n:"05", t:"License Issuance & Corporate Documents", d:"Trade license issued. MOA, Share Certificates, Company Stamp and all official documentation prepared and delivered digitally and physically.", time:"Day 7–10", docs:["Trade License","MOA","Share Certificates","Company Stamp"] },
  { n:"06", t:"Investor Visa Processing", d:"Entry permit, medical fitness test, biometrics and Emirates ID. Our PRO team manages all immigration procedures end-to-end.", time:"Day 10–21", docs:["Visa Application","Medical Test","Emirates ID"] },
  { n:"07", t:"Bank Account Opening", d:"Introduction to our banking partners — Emirates NBD, ADCB, Mashreq, and more. Full account opening process supported throughout.", time:"Day 21–35", docs:["Bank Application","Company Documents","Proof of Address"] },
];

const DOCUMENTS = [
  { t:"Passport Copies", d:"Valid passport copies for all shareholders and directors (minimum 6 months validity)" },
  { t:"Passport-size Photographs", d:"White background, recent photographs for all shareholders and visa applicants" },
  { t:"Residential Address Proof", d:"Utility bill or bank statement — not older than 3 months" },
  { t:"Business Plan / Overview", d:"Brief description of your business activities and objectives in the UAE" },
  { t:"Source of Funds Declaration", d:"Letter or documents confirming the source of investment funds" },
  { t:"NOC from Employer", d:"Required only if the applicant is currently employed in the UAE under a residence visa" },
  { t:"Corporate Documents", d:"For corporate shareholders: Certificate of Incorporation, MOA, Board Resolution" },
  { t:"Bank Reference Letter", d:"Optional but highly recommended — strengthens the bank account opening application" },
];

const FAQS = [
  { q:"How long does it take to set up a company in Meydan?", a:"Meydan company formation typically takes 5–10 working days from document submission to license issuance. Investor visa processing takes a further 7–14 days. Bank account opening typically takes 2–4 weeks. Total from start to fully operational: 4–6 weeks." },
  { q:"Is there a minimum share capital requirement?", a:"No. Unlike DMCC which requires AED 50,000 declared capital, Meydan has zero minimum share capital requirement. Your full investment is available as working capital from day one." },
  { q:"Can I have 100% foreign ownership in Meydan?", a:"Yes. Meydan is a UAE free zone and allows 100% foreign ownership with no requirement for a UAE national partner or local sponsor. You retain full control of your company." },
  { q:"How many visas can I get with a Meydan license?", a:"The number of visas depends on your office type.", list:["Virtual Office: 1–2 Visas","Flexi Desk: 2–3 Visas","Serviced Office: 4–5 Visas","Private Office: 6+ Visas"] },
  { q:"Can I trade with mainland UAE companies from Meydan?", a:"Meydan companies can provide services to mainland UAE clients. For direct goods trading with the mainland, you will need to appoint a mainland distributor or obtain relevant customs permits." },
  { q:"What makes Meydan's location valuable?", a:"Meydan is in Nad Al Sheba — home to the Meydan Racecourse and the Dubai World Cup, the world's richest horse race. This gives your company an internationally recognised, prestigious Dubai address associated with world-class sport and hospitality." },
  { q:"What are the annual renewal costs?", a:"Annual renewal typically costs AED 10,000–15,000 depending on your license type, activities, and office arrangement — among the lowest of any Dubai free zone." },
  { q:"Can I open a Meydan company without visiting the UAE?", a:"Yes — for the initial license setup, most documentation can be handled remotely. However, for visa processing and bank account opening, a UAE visit is required. INCOZONE can plan your visit efficiently." },
  { q:"How does Meydan compare to DMCC?", a:"DMCC is better for commodities trading, fintech, and financial services, and has a larger established business community. Meydan is better for consultancies, tech firms, and lifestyle brands who want a prestigious Dubai address at a significantly lower cost." },
  { q:"Does Meydan have a corporate tax obligation?", a:"UAE introduced a 9% corporate tax for businesses with annual profits exceeding AED 375,000. Free zone businesses including Meydan may qualify for a 0% rate on qualifying income if they meet specific substance requirements." },
];

// ── HERO CANVAS ── same gold particles as DMCC ────────────────
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
  return <canvas ref={ref} className="myd-hero-canvas" style={{ width: "100%", height: "100%" }} />;
}

// ── SCROLL REVEAL ─────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".myd-reveal");
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
  const pkgC = { starter: 14500, standard: 19900, business: 27500, premium: 38000 };
  const offC = { virtual: 0, flexi: 3200, serviced: 8500, private: 16000 };
  const visC = { "0": 0, "1": 0, "3": 2800, "5": 5200, "8": 8800 };
  const total = (pkgC[pkg] || 0) + (offC[off] || 0) + (visC[vis] || 0) + (pro ? 3000 : 0) + (bnk ? 2500 : 0);
  const f = n => "AED " + n.toLocaleString();
  return (
    <div className="myd-calc-inner">
      <div>
        <h2 className="myd-h2 myd-reveal">Build Your <em>Custom Package</em></h2>
        <p className="myd-reveal mr1" style={{ fontSize: "0.84rem", color: "var(--w60)", margin: "12px 0 36px" }}>Configure your Meydan requirements and get an instant cost breakdown.</p>
        <div className="myd-calc-form">
          {[
            { l: "License Package", id: "pkg", val: pkg, set: setPkg, opts: [["starter","Starter (AED 14,500)"],["standard","Standard (AED 19,900)"],["business","Business (AED 27,500)"],["premium","Premium (AED 38,000)"]] },
            { l: "Office / Workspace", id: "off", val: off, set: setOff, opts: [["virtual","Virtual Office (Included)"],["flexi","Flexi Desk (+AED 3,200/yr)"],["serviced","Serviced Office (+AED 8,500/yr)"],["private","Private Office (+AED 16,000/yr)"]] },
            { l: "Visa Allocation", id: "vis", val: vis, set: setVis, opts: [["0","No Visas"],["1","1 Visa (Included)"],["3","3 Visas (+AED 2,800)"],["5","5 Visas (+AED 5,200)"],["8","8 Visas (+AED 8,800)"]] },
          ].map(({ l, id, val, set, opts }) => (
            <div className="myd-calc-field myd-reveal" key={id}>
              <label className="myd-calc-label">{l}</label>
              <select className="myd-calc-select" value={val} onChange={e => set(e.target.value)}>
                {opts.map(([v, lab]) => <option key={v} value={v}>{lab}</option>)}
              </select>
            </div>
          ))}
          <div className="myd-calc-field myd-reveal">
            <label className="myd-calc-label">PRO & Government Services</label>
            <div className="myd-toggle-row">
              <button className={`myd-toggle${!pro ? " on" : ""}`} onClick={() => setPro(false)}>Not Required</button>
              <button className={`myd-toggle${pro ? " on" : ""}`} onClick={() => setPro(true)}>Add PRO (+AED 3,000)</button>
            </div>
          </div>
          <div className="myd-calc-field myd-reveal">
            <label className="myd-calc-label">Banking Assistance</label>
            <div className="myd-toggle-row">
              <button className={`myd-toggle${!bnk ? " on" : ""}`} onClick={() => setBnk(false)}>Not Required</button>
              <button className={`myd-toggle${bnk ? " on" : ""}`} onClick={() => setBnk(true)}>Add Banking (+AED 2,500)</button>
            </div>
          </div>
        </div>
      </div>
      <div className="myd-result myd-reveal">
        <span className="myd-result-tag">Estimated Total</span>
        <div className="myd-result-amount"><span className="myd-result-currency">AED </span>{total.toLocaleString()}</div>
        <div className="myd-result-note">One-time cost · excludes annual renewal</div>
        <div className="myd-result-lines">
          <div className="myd-result-line"><span className="myd-result-line-lbl">Base License Fee</span><span className="myd-result-line-val">{f(pkgC[pkg])}</span></div>
          {offC[off] > 0 && <div className="myd-result-line"><span className="myd-result-line-lbl">Office Space (Annual)</span><span className="myd-result-line-val">+{f(offC[off])}</span></div>}
          {visC[vis] > 0 && <div className="myd-result-line"><span className="myd-result-line-lbl">Visa Processing</span><span className="myd-result-line-val">+{f(visC[vis])}</span></div>}
          {pro && <div className="myd-result-line"><span className="myd-result-line-lbl">PRO Services</span><span className="myd-result-line-val">+{f(3000)}</span></div>}
          {bnk && <div className="myd-result-line"><span className="myd-result-line-lbl">Banking Assistance</span><span className="myd-result-line-val">+{f(2500)}</span></div>}
        </div>
        <div className="myd-result-total-row"><span style={{ color: "var(--w)", fontWeight: 500 }}>Total Estimate</span><span style={{ color: "var(--g400)", fontWeight: 600 }}>{f(total)}</span></div>
        <p className="myd-result-disclaimer">Estimate only. Final cost depends on current authority fees and specific requirements.</p>
        <button className="myd-btn-gold" style={{ width: "100%" }}>Get Exact Quote →</button>
      </div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────
export default function MeydanPage({ onBack, onNavigate }) {
  const [_mydOpen, setmydOpen] = useState(false);
  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = _mydOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [_mydOpen]);

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
    <div className="myd-root">
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className={`myd-nav${scrolled ? " scrolled" : ""}`}>
        <div className="myd-nav-logo" onClick={()=>{if(onNavigate){onNavigate("home");window.scrollTo(0,0);}}}>INCO<em>ZONE</em></div>
        <ul className="myd-nav-links">{["Services","Free Zones","About","Blog","Contact"].map(l=>{const pgMap={"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};return <li key={l}><a href="#" onClick={e=>{e.preventDefault();if(onNavigate){onNavigate(pgMap[l]);window.scrollTo(0,0);}}}>{ l}</a></li>;})}</ul>
        <button className="myd-nav-cta" onClick={()=>{if(onNavigate){onNavigate("schedule");window.scrollTo(0,0);}}}>Schedule Consultation</button>
      
        {/* Hamburger */}
        <button
          className={`myd-nav-hamburger${_mydOpen ? " open" : ""}`}
          onClick={() => setmydOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`myd-drawer${_mydOpen ? " open" : ""}`}>
        <div className="myd-drawer-brand"
          onClick={() => { setmydOpen(false); if(onNavigate) { onNavigate("home"); window.scrollTo(0,0); } }}>
          INCO<em>ZONE</em>
        </div>
        {["Services","Free Zones","About","Blog","Contact"].map((l) => {
          const pm = {"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};
          return (
            <button key={l} className="myd-dlink"
              onClick={() => { setmydOpen(false); if(onNavigate) { onNavigate(pm[l]); window.scrollTo(0,0); } }}>
              {l}
            </button>
          );
        })}
        <div className="myd-drawer-div" />
        <button className="myd-dcta"
          onClick={() => { setmydOpen(false); if(onNavigate) { onNavigate("schedule"); window.scrollTo(0,0); } }}>
          Schedule Consultation
        </button>
      </div>

      {/* ── HERO ── */}
      <div className="myd-hero">
        <HeroCanvas />
        <button className="myd-back-btn" onClick={onBack}>Back to Free Zones</button>

        <div className="myd-hero-left">
          <div className="myd-hero-eyebrow">
            <div className="myd-hero-eyebrow-dot" />
            Premium Location · Dubai Free Zone
          </div>
          <h1 className="myd-hero-h1">Meydan<em>Free Zone</em></h1>
          <div className="myd-hero-fullname">Meydan Free Zone Authority — Nad Al Sheba, Dubai</div>
          <p className="myd-hero-desc">
            Dubai's most prestigious affordable free zone — 40,000+ companies set within the iconic Meydan Racecourse complex. A globally recognised address, 5–10 day setup, starting from just <strong style={{ color: "var(--g300)" }}>AED 14,500.</strong>
          </p>
          <div className="myd-hero-actions">
            <button className="myd-btn-gold">Start Meydan Setup →</button>
            <button className="myd-btn-ghost">Download Free Guide</button>
          </div>
        </div>

        <div className="myd-hero-right">
          <div className="myd-hero-card">
            <span className="myd-hero-card-label">Quick Reference</span>
            {[
              ["Location","Nad Al Sheba, Dubai"], ["Setup From","AED 14,500","gold"],
              ["Setup Time","5–10 Days","gold"], ["Min. Capital","Not Required"],
              ["Ownership","100% Foreign","gold"], ["Visa Quota","Up to 6"],
              ["Annual Renewal","AED 10–15K"], ["Tax","0% Personal"],
            ].map(([l, v, cls]) => (
              <div className="myd-hero-card-row" key={l}>
                <span>{l}</span><span className={cls || ""}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="myd-scroll-hint"><span>Scroll</span><div className="myd-scroll-line" /></div>
      </div>

      {/* ── STATS ── */}
      <div className="myd-stats">
        {STATS.map((s, i) => (
          <div className="myd-stat" key={i}>
            <span className="myd-stat-val">{s.v}</span>
            <span className="myd-stat-key">{s.k}</span>
          </div>
        ))}
      </div>

      {/* ── INTRO ── */}
      <div className="myd-intro myd-section">
        <span className="myd-section-label myd-reveal">Zone Overview</span>
        <h2 className="myd-h2 myd-reveal mr1" style={{ maxWidth: "640px" }}>Dubai's Most Iconic<br /><em>Business Address</em></h2>
        <div className="myd-intro-grid">
          <div className="myd-intro-text">
            <p className="myd-reveal mr1"><strong>Meydan Free Zone</strong> is situated within the iconic Meydan City complex in Nad Al Sheba — home to the Meydan Racecourse and the Dubai World Cup, the world's richest horse race. This makes Meydan one of the most globally recognised business addresses in the UAE at a fraction of the cost of DMCC or DIFC.</p>
            <p className="myd-reveal mr2">Since its establishment, Meydan has rapidly grown to host over <strong>40,000 companies</strong> from around the world. For consultancies, tech firms, and lifestyle brands who want a prestigious Dubai address without the premium price tag, Meydan consistently tops the recommendation list.</p>
            <p className="myd-reveal mr3">The zone supports <strong>1,500+ business activities</strong>, offers virtual and physical office options, and issues trade licenses in as little as <strong>5 working days</strong> — among the fastest turnarounds of any Dubai free zone.</p>
            <p className="myd-reveal mr3">Meydan companies enjoy <strong>100% foreign ownership</strong>, full profit repatriation, zero personal income tax, and access to UAE's world-class banking infrastructure.</p>
          </div>
          <div className="myd-reveal mr2">
            <div className="myd-pillars">
              {[
                { i:ICrown, h:"Most Prestigious Affordable Zone", p:"A globally recognised Dubai address at a fraction of DMCC or DIFC costs. Starting from AED 14,500 — ideal for consultancies and lifestyle brands." },
                { i:IClock, h:"5 to 10 Day Setup", p:"Fast-track digital application process. Trade license typically issued within 5–10 working days from document submission." },
                { i:IMapPin, h:"World-Famous Address", p:"Meydan is known globally through the Dubai World Cup. Your Nad Al Sheba address carries instant prestige with international clients." },
                { i:IShield, h:"No Minimum Share Capital", p:"Zero declared share capital required — unlike DMCC's AED 50,000. Keep your full working capital available from day one." },
                { i:IStar, h:"Unique Lifestyle Ecosystem", p:"Office within the Meydan Racecourse complex — 5-star hotels, fine dining, events and world-class leisure at your doorstep." },
              ].map((p, i) => (
                <div className="myd-pillar" key={i}>
                  <div className="myd-pillar-icon">{p.i}</div>
                  <div><h4>{p.h}</h4><p>{p.p}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PACKAGES ── */}
      <div className="myd-packages myd-section">
        <span className="myd-section-label myd-reveal">Setup Packages</span>
        <h2 className="myd-h2 myd-reveal mr1">Choose Your <em>Meydan Package</em></h2>
        <p className="myd-reveal mr2" style={{ fontSize: "0.84rem", color: "var(--cream-ink3)", marginTop: "10px", maxWidth: "520px" }}>All packages include full company incorporation, trade license, and corporate documents.</p>
        <div className="myd-pkg-grid">
          {[
            { name:"Starter", tag:"Solo founders & lifestyle brands", price:"14,500", badge:"Best Value", featured:false, feats:[["1 Trade License Activity",true],["Virtual Office (UAE Address)",true],["1 Investor Visa",true],["Company Stamp & MOA",true],["Bank Account Assistance",false],["Dedicated Account Manager",false]] },
            { name:"Business", tag:"Growing teams & consultancies", price:"19,900", badge:"Most Popular", featured:true, feats:[["3 Trade License Activities",true],["Flexi Desk Workspace",true],["3 Investor Visas",true],["Full Corporate Documents",true],["Bank Account Assistance",true],["Dedicated Account Manager",false]] },
            { name:"Premium", tag:"Established businesses & brands", price:"27,500", badge:"Full Service", featured:false, feats:[["Unlimited Activities",true],["Serviced / Private Office",true],["5+ Investor Visas",true],["Full Corporate Documents",true],["Priority Bank Account Setup",true],["Dedicated Account Manager",true]] },
          ].map((pkg, i) => (
            <div className={`myd-pkg myd-reveal mr${i+1}${pkg.featured ? " featured" : ""}`} key={i}>
              <div className="myd-pkg-badge">{pkg.badge}</div>
              <div className="myd-pkg-name">{pkg.name}</div>
              <p className="myd-pkg-tag">{pkg.tag}</p>
              <div className="myd-pkg-price">
                <div className="myd-pkg-amount">AED {pkg.price}</div>
                <div className="myd-pkg-period">One-time setup · excludes annual renewal</div>
              </div>
              <ul className="myd-pkg-features">
                {pkg.feats.map(([t, on], j) => (
                  <li className="myd-pkg-feat" key={j}>
                    <span className={on ? "myd-feat-on" : "myd-feat-off"}>{on ? "" : "×"}</span>
                    <span className={on ? "myd-feat-label-on" : "myd-feat-label-off"}>{t}</span>
                  </li>
                ))}
              </ul>
              <button className="myd-pkg-btn">{pkg.featured ? "Select This Package →" : "Get Started →"}</button>
            </div>
          ))}
        </div>
      </div>

      {/* ── ACTIVITIES ── */}
      <div className="myd-activities myd-section">
        <span className="myd-section-label myd-reveal">Licensed Activities</span>
        <h2 className="myd-h2 myd-reveal mr1">What Can You Do <em>Under Meydan?</em></h2>
        <p className="myd-reveal mr2" style={{ fontSize: "0.83rem", color: "var(--w60)", marginTop: "10px", maxWidth: "580px" }}>Meydan supports 1,500+ business activities. Here are the most popular:</p>
        <div className="myd-act-grid">
          {ACTIVITIES.map((a, i) => (
            <div className={`myd-act-card myd-reveal mr${(i%4)+1}`} key={i}>
              <div className="myd-act-icon">{a.i}</div>
              <div className="myd-act-name">{a.n}</div>
              <div className="myd-act-desc">{a.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROCESS ── */}
      <div className="myd-process myd-section">
        <span className="myd-section-label myd-reveal" style={{ textAlign: "center", display: "block" }}>Setup Process</span>
        <h2 className="myd-h2 myd-reveal mr1" style={{ textAlign: "center" }}>Your Meydan <em>Journey — Step by Step</em></h2>
        <div className="myd-process-inner">
          {STEPS.map((s, i) => (
            <div className={`myd-step myd-reveal mr${(i%4)+1}`} key={i}>
              <div className="myd-step-num">{s.n}</div>
              <div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <div className="myd-step-time">{s.time}</div>
                <div className="myd-step-docs">{s.docs.map(d => <span className="myd-doc-tag" key={d}>{d}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DOCUMENTS ── */}
      <div className="myd-documents myd-section">
        <span className="myd-section-label myd-reveal">Required Documents</span>
        <h2 className="myd-h2 myd-reveal mr1">What You <em>Need to Prepare</em></h2>
        <p className="myd-reveal mr2" style={{ fontSize: "0.83rem", color: "var(--w60)", marginTop: "10px" }}>Meydan has one of the simplest document checklists of any Dubai free zone:</p>
        <div className="myd-docs-grid">
          {DOCUMENTS.map((d, i) => (
            <div className={`myd-doc-card myd-reveal mr${(i%2)+1}`} key={i}>
              <div className="myd-doc-num">0{i+1}</div>
              <div><div className="myd-doc-title">{d.t}</div><div className="myd-doc-desc">{d.d}</div></div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CALCULATOR ── */}
      <div className="myd-calc myd-section">
        <span className="myd-section-label myd-reveal">Cost Estimator</span>
        <Calculator />
      </div>

      {/* ── FAQ ── */}
      <div className="myd-faq myd-section">
        <span className="myd-section-label myd-reveal" style={{ textAlign: "center", display: "block" }}>FAQ</span>
        <h2 className="myd-h2 myd-reveal mr1" style={{ textAlign: "center" }}>Frequently Asked <em>Questions</em></h2>
        <div className="myd-faq-inner">
          {FAQS.map((f, i) => (
            <div className={`myd-faq-item myd-reveal mr${(i%3)+1}${openFaq===i ? " open" : ""}`} key={i}>
              <button className="myd-faq-q" onClick={() => setOpenFaq(openFaq===i ? null : i)}>
                <span className="myd-faq-q-text">{f.q}</span>
                <div className="myd-faq-icon">+</div>
              </button>
              <div className="myd-faq-answer">
                <div className="myd-faq-answer-inner">
                  <p>{f.a}</p>
                  {f.list && <ul>{f.list.map(li => <li key={li}>{li}</li>)}</ul>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ADVISORY ── */}
      <div className="myd-advisory myd-section">
        <span className="myd-section-label myd-reveal" style={{ textAlign: "center", display: "block" }}>INCOZONE Advisory</span>
        <h2 className="myd-h2 myd-reveal mr1" style={{ textAlign: "center" }}>Expert Advice Before <em>You Decide</em></h2>
        <div className="myd-advisory-inner">
          <div className="myd-advisory-quote myd-reveal mr2">
            "Meydan is one of the best-kept secrets in UAE free zone setup.{" "}
            <strong>For consultancies, tech firms, and lifestyle brands who want a prestigious Dubai address without overpaying — Meydan consistently wins on value.</strong> The World Cup address carries real-world credibility that surprises clients every time."
            <div className="myd-advisory-quote-attr">— INCOZONE Advisory Team</div>
          </div>
          <div className="myd-advisory-tips">
            {[
              { n:"01", t:"The Address Sells Itself", p:"Meydan's Nad Al Sheba address — associated with the Dubai World Cup — carries instant global prestige. We have seen clients win enterprise contracts on the strength of the address alone. It works in a way that most 'affordable' zone addresses simply don't." },
              { n:"02", t:"Start Virtual, Upgrade When Ready", p:"The virtual office package is an excellent starting point. As your business grows and you need more visas or a physical meeting space, upgrading is straightforward and cost-effective within Meydan's office tier structure." },
              { n:"03", t:"No Capital Requirement", p:"With zero minimum share capital — vs DMCC's AED 50,000 declared requirement — your full investment is available as working capital from day one. This is a significant advantage for early-stage businesses." },
              { n:"04", t:"Bank Account Is Getting Easier", p:"Meydan is now well-recognised by major UAE banks. Having your source-of-funds documentation prepared before approaching banks dramatically speeds up account opening. INCOZONE manages this process end-to-end." },
            ].map((tip, i) => (
              <div className={`myd-tip myd-reveal mr${(i%2)+1}`} key={i}>
                <span className="myd-tip-num">{tip.n}</span>
                <h4>{tip.t}</h4>
                <p>{tip.p}</p>
              </div>
            ))}
          </div>
          <div className="myd-advisory-warning myd-reveal">
            <h4> When Meydan Might Not Be the Best Fit</h4>
            <p>Consider alternatives if: you specifically need DMCC's commodities trading or fintech ecosystem · you require DIFC's regulated financial services framework · you need JAFZA's port-connected logistics infrastructure · your business requires a large-scale physical operation · or complex corporate structures require a zone with decade-long banking relationships. INCOZONE will always recommend the right zone — even if it's not Meydan.</p>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="myd-cta">
        <div className="myd-cta-inner">
          <span className="myd-section-label myd-reveal">Begin Your Journey</span>
          <h2 className="myd-reveal mr1">Ready to Establish Your<br /><em>Meydan Presence?</em></h2>
          <div className="myd-cta-divider" />
          <p className="myd-reveal mr2">
            Schedule a private consultation. No obligation. Our Meydan specialists will assess your situation and give you a clear, honest recommendation — whether that's Meydan or another zone entirely.
          </p>
          <div className="myd-cta-btns myd-reveal mr3">
            <button className="myd-btn-ink">Schedule Private Consultation</button>
            <button className="myd-btn-cream-outline" onClick={onBack}>← Explore Other Zones</button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="myd-footer">
        <div className="myd-footer-inner">
          <div className="myd-footer-logo">INCO<em>ZONE</em></div>
          <div className="myd-footer-copy">© 2025 INCOZONE. All rights reserved. Dubai, UAE.</div>
          <button className="myd-footer-back" onClick={onBack}>← Back to Free Zones</button>
        </div>
      </div>

      {/* ── WA FLOAT ── */}
      <div className="myd-wa" onClick={()=>window.open("https://wa.me/971565834586","_blank")}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </div>
    </div>
  );
}
