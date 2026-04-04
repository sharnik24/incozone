import { useState, useEffect, useRef } from "react";
import { ITrendingUp, IUsers, IBarChart, IBriefcase, ICreditCard, IScale, IBuilding, IShield, IArrowsExchange, ILightbulb, IDroplet, IGlobe, ICrown } from "../icons";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — ADGM Free Zone Page  (standalone, self-contained)
//  Drop into: src/pages/ADGM.jsx
//  Same structure & palette as DMCC.jsx — only content differs
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

.adg-root *, .adg-root *::before, .adg-root *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}
.adg-root {
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
.adg-nav {
  position: fixed; inset-inline: 0; top: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 60px;
  transition: background 0.5s, padding 0.4s, border-color 0.5s;
  border-bottom: 1px solid transparent;
}
.adg-nav.scrolled {
  background: rgba(5,17,30,0.96); backdrop-filter: blur(20px);
  padding: 14px 60px; border-bottom-color: rgba(201,168,76,0.12);
}
.adg-nav-logo { font-family: var(--fd); font-size: 1.5rem; font-weight: 500; letter-spacing: 0.15em; color: var(--w); cursor: pointer; }
.adg-nav-logo em { color: var(--g400); font-style: normal; }
.adg-nav-links { display: flex; gap: 36px; list-style: none; }
.adg-nav-links a { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--w60); text-decoration: none; transition: color 0.3s; }
.adg-nav-links a:hover { color: var(--g300); }
.adg-nav-cta {
  font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
  background: transparent; border: 1px solid var(--g400); color: var(--g400);
  padding: 9px 22px; cursor: pointer; font-family: var(--fb);
  transition: background 0.3s, color 0.3s;
}
.adg-nav-cta:hover { background: var(--g400); color: var(--n900); }
.adg-back-btn {
  position: absolute; top: 90px; left: 60px; z-index: 20;
  background: none; border: none; font-family: var(--fb); font-size: 0.7rem;
  letter-spacing: 0.18em; text-transform: uppercase; color: var(--w30);
  cursor: pointer; display: flex; align-items: center; gap: 10px; padding: 0;
  transition: color 0.3s;
}
.adg-back-btn:hover { color: var(--g400); }
.adg-back-btn::before { content: '←'; font-size: 0.9rem; }

/* ── HERO ────────────────────────────────────────────────────── */
.adg-hero {
  min-height: 100vh; position: relative; overflow: hidden;
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: flex-end; padding: 0 60px 80px; gap: 60px;
}
.adg-hero-canvas { position: absolute; inset: 0; z-index: 0; display: block; }
.adg-hero-left { position: relative; z-index: 2; padding-top: 160px; }
.adg-hero-right { position: relative; z-index: 2; padding-top: 160px; display: flex; align-items: flex-end; justify-content: flex-end; }
.adg-hero-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--g400); border: 1px solid rgba(201,168,76,0.28); padding: 7px 16px;
  margin-bottom: 32px;
  opacity: 0; transform: translateY(16px);
  animation: adgFadeUp 1s var(--ease) 0.2s forwards;
}
.adg-hero-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--g400); animation: adgBlink 2s infinite; }
.adg-hero-h1 {
  font-family: var(--fd); font-weight: 300; line-height: 0.88;
  letter-spacing: -0.02em; color: var(--w);
  font-size: clamp(5rem, 10vw, 9.5rem); margin-bottom: 20px;
  opacity: 0; transform: translateY(20px);
  animation: adgFadeUp 1.1s var(--ease) 0.35s forwards;
}
.adg-hero-h1 em { display: block; color: var(--g400); font-style: italic; font-weight: 300; }
.adg-hero-fullname {
  font-family: var(--fd); font-size: 1rem; font-weight: 300;
  color: var(--w60); font-style: italic; margin-bottom: 36px; letter-spacing: 0.04em;
  opacity: 0; animation: adgFadeUp 1s var(--ease) 0.5s forwards;
}
.adg-hero-desc {
  font-size: 0.86rem; color: var(--w80); line-height: 1.85; max-width: 520px; margin-bottom: 44px;
  opacity: 0; animation: adgFadeUp 1s var(--ease) 0.65s forwards;
}
.adg-hero-actions {
  display: flex; gap: 14px; flex-wrap: wrap;
  opacity: 0; animation: adgFadeUp 1s var(--ease) 0.8s forwards;
}
.adg-hero-card {
  background: rgba(11,28,45,0.85); backdrop-filter: blur(16px);
  border: 1px solid var(--w12); padding: 36px 32px; min-width: 280px;
  opacity: 0; animation: adgFadeUp 1.1s var(--ease) 0.9s forwards;
}
.adg-hero-card-label {
  font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--g400); margin-bottom: 20px; display: block;
}
.adg-hero-card-row {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 11px 0; border-bottom: 1px solid var(--w06); font-size: 0.78rem;
}
.adg-hero-card-row:last-child { border-bottom: none; }
.adg-hero-card-row span:first-child { color: var(--w60); }
.adg-hero-card-row span:last-child { color: var(--w); font-weight: 500; text-align: right; }
.adg-hero-card-row span.gold { color: var(--g400); }
.adg-scroll-hint {
  position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
  z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px;
  opacity: 0; animation: adgFadeUp 1s var(--ease) 1.2s forwards;
}
.adg-scroll-hint span { font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--w30); }
.adg-scroll-line { width: 1px; height: 44px; background: linear-gradient(to bottom, var(--g400), transparent); animation: adgScrollPulse 2.2s ease-in-out infinite; }

/* ── STATS BAR ───────────────────────────────────────────────── */
.adg-stats {
  display: grid; grid-template-columns: repeat(6, 1fr);
  background: var(--n950); border-top: 1px solid var(--w12);
  border-bottom: 1px solid var(--w12);
}
.adg-stat { padding: 28px 20px; text-align: center; border-right: 1px solid var(--w12); transition: background 0.3s; }
.adg-stat:last-child { border-right: none; }
.adg-stat:hover { background: var(--glow3); }
.adg-stat-val { font-family: var(--fd); font-size: 2rem; font-weight: 300; color: var(--g400); display: block; line-height: 1; }
.adg-stat-key { font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--w30); margin-top: 6px; display: block; }

/* ── SECTION BASICS ──────────────────────────────────────────── */
.adg-section { padding: 96px 60px; }
.adg-section-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--g400); margin-bottom: 14px; display: block; }
.adg-h2 { font-family: var(--fd); font-size: clamp(2rem, 3.8vw, 3.4rem); font-weight: 300; line-height: 1.15; color: var(--w); }
.adg-h2 em { color: var(--g400); font-style: italic; }

/* ── INTRO ───────────────────────────────────────────────────── */
.adg-intro { background: var(--n800); }
.adg-intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; margin-top: 52px; }
.adg-intro-text p { font-size: 0.88rem; color: var(--w60); line-height: 1.88; margin-bottom: 22px; }
.adg-intro-text p strong { color: var(--w); font-weight: 500; }
.adg-intro-text p:last-child { margin-bottom: 0; }
.adg-pillars { display: flex; flex-direction: column; }
.adg-pillar { display: flex; gap: 20px; padding: 22px 0; border-bottom: 1px solid var(--w06); transition: padding-left 0.3s var(--ease); }
.adg-pillar:first-child { border-top: 1px solid var(--w06); }
.adg-pillar:hover { padding-left: 10px; }
.adg-pillar-icon { font-size: 1.3rem; flex-shrink: 0; margin-top: 2px; }
.adg-pillar h4 { font-size: 0.88rem; font-weight: 500; color: var(--w); margin-bottom: 5px; }
.adg-pillar p { font-size: 0.77rem; color: var(--w60); line-height: 1.65; }

/* ── PACKAGES ────────────────────────────────────────────────── */
.adg-packages { background: var(--cream-bg); position: relative; overflow: hidden; }
.adg-packages::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(201,168,76,0.09), transparent 60%);
  pointer-events: none;
}
.adg-packages::after {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, transparent, var(--g400) 40%, transparent);
  opacity: 0.6;
}
.adg-packages .adg-section-label { color: #8A6820; }
.adg-packages .adg-h2 { color: var(--cream-ink); }
.adg-packages .adg-h2 em { color: var(--g400); }
.adg-pkg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 52px; }
.adg-pkg {
  background: var(--cream-bg); border: 1px solid var(--cream-bdr);
  padding: 40px 34px; display: flex; flex-direction: column;
  transition: transform 0.35s var(--ease), box-shadow 0.35s var(--ease), border-color 0.35s;
  box-shadow: 0 2px 16px rgba(120,90,30,0.06); position: relative;
}
.adg-pkg:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(120,90,30,0.14); border-color: rgba(201,168,76,0.45); }
.adg-pkg.featured { background: var(--n900); border-color: rgba(201,168,76,0.35); box-shadow: 0 8px 40px rgba(0,0,0,0.25); }
.adg-pkg.featured:hover { border-color: var(--g400); box-shadow: 0 24px 60px rgba(0,0,0,0.35); }
.adg-pkg-badge { font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; padding: 4px 12px; width: fit-content; margin-bottom: 22px; font-weight: 500; }
.adg-pkg:not(.featured) .adg-pkg-badge { border: 1px solid var(--cream-bdr); color: var(--cream-ink3); background: var(--cream-100); }
.adg-pkg.featured .adg-pkg-badge { border: 1px solid var(--g400); color: var(--g400); background: rgba(201,168,76,0.08); }
.adg-pkg-name { font-family: var(--fd); font-size: 2rem; font-weight: 400; margin-bottom: 6px; }
.adg-pkg:not(.featured) .adg-pkg-name { color: var(--cream-ink); }
.adg-pkg.featured .adg-pkg-name { color: var(--w); }
.adg-pkg-tag { font-size: 0.75rem; margin-bottom: 26px; }
.adg-pkg:not(.featured) .adg-pkg-tag { color: var(--cream-ink3); }
.adg-pkg.featured .adg-pkg-tag { color: var(--w60); }
.adg-pkg-price { margin-bottom: 28px; padding-bottom: 24px; }
.adg-pkg:not(.featured) .adg-pkg-price { border-bottom: 1px solid var(--cream-bdr); }
.adg-pkg.featured .adg-pkg-price { border-bottom: 1px solid var(--w12); }
.adg-pkg-amount { font-family: var(--fd); font-size: 3rem; font-weight: 300; line-height: 1; }
.adg-pkg:not(.featured) .adg-pkg-amount { color: var(--cream-ink); }
.adg-pkg.featured .adg-pkg-amount { color: var(--g400); }
.adg-pkg-period { font-size: 0.68rem; letter-spacing: 0.08em; margin-top: 5px; }
.adg-pkg:not(.featured) .adg-pkg-period { color: var(--cream-bdr); }
.adg-pkg.featured .adg-pkg-period { color: var(--w30); }
.adg-pkg-features { list-style: none; display: flex; flex-direction: column; gap: 12px; flex: 1; margin-bottom: 32px; }
.adg-pkg-feat { display: flex; align-items: flex-start; gap: 11px; font-size: 0.79rem; line-height: 1.5; }
.adg-feat-on { color: #8A6820; flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.adg-feat-off { color: var(--cream-bdr); flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.adg-pkg.featured .adg-feat-on { color: var(--g400); }
.adg-pkg.featured .adg-feat-off { color: var(--w30); }
.adg-feat-label-on { color: var(--cream-ink2); }
.adg-feat-label-off { color: var(--cream-bdr); }
.adg-pkg.featured .adg-feat-label-on { color: var(--w80); }
.adg-pkg.featured .adg-feat-label-off { color: var(--w30); }
.adg-pkg-btn { width: 100%; padding: 13px 20px; font-family: var(--fb); font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
.adg-pkg:not(.featured) .adg-pkg-btn { background: transparent; border: 1px solid var(--cream-bdr); color: var(--cream-ink2); }
.adg-pkg:not(.featured) .adg-pkg-btn:hover { border-color: var(--g400); background: var(--cream-100); color: var(--cream-ink); }
.adg-pkg.featured .adg-pkg-btn { background: var(--g400); border: none; color: var(--n900); font-weight: 500; }
.adg-pkg.featured .adg-pkg-btn:hover { background: var(--g300); }

/* ── ACTIVITIES ──────────────────────────────────────────────── */
.adg-activities { background: var(--n800); }
.adg-act-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; margin-top: 52px; background: var(--w06); }
.adg-act-card { background: var(--n800); padding: 30px 24px; transition: background 0.3s; cursor: default; }
.adg-act-card:hover { background: var(--n750); }
.adg-act-card:hover .adg-act-name { color: var(--g300); }
.adg-act-icon { font-size: 1.5rem; margin-bottom: 14px; }
.adg-act-name { font-size: 0.84rem; font-weight: 500; color: var(--w); margin-bottom: 7px; transition: color 0.3s; }
.adg-act-desc { font-size: 0.73rem; color: var(--w60); line-height: 1.6; }

/* ── PROCESS ─────────────────────────────────────────────────── */
.adg-process { background: var(--n900); }
.adg-process-inner { max-width: 780px; margin: 52px auto 0; }
.adg-step { display: grid; grid-template-columns: 64px 1fr; gap: 28px; padding: 36px 0; border-bottom: 1px solid var(--w06); position: relative; }
.adg-step:last-child { border-bottom: none; }
.adg-step::before { content: ''; position: absolute; left: 31px; top: 84px; bottom: -36px; width: 1px; background: linear-gradient(to bottom, rgba(201,168,76,0.25), transparent); }
.adg-step:last-child::before { display: none; }
.adg-step-num { width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--g400); display: flex; align-items: center; justify-content: center; font-family: var(--fd); font-size: 0.92rem; color: var(--g400); background: var(--n900); position: relative; z-index: 1; flex-shrink: 0; }
.adg-step h3 { font-size: 0.96rem; font-weight: 500; color: var(--w); margin-bottom: 8px; }
.adg-step p { font-size: 0.81rem; color: var(--w60); line-height: 1.78; margin-bottom: 10px; }
.adg-step-time { font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--g400); margin-bottom: 12px; }
.adg-step-docs { display: flex; gap: 6px; flex-wrap: wrap; }
.adg-doc-tag { font-size: 0.62rem; padding: 4px 9px; border: 1px solid var(--w12); color: var(--w60); letter-spacing: 0.07em; }

/* ── DOCUMENTS ───────────────────────────────────────────────── */
.adg-documents { background: var(--n800); }
.adg-docs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 52px; }
.adg-doc-card { background: var(--n900); border: 1px solid var(--w06); padding: 22px 26px; display: flex; align-items: center; gap: 18px; transition: border-color 0.3s; }
.adg-doc-card:hover { border-color: rgba(201,168,76,0.2); }
.adg-doc-num { font-family: var(--fd); font-size: 1.9rem; font-weight: 300; color: rgba(201,168,76,0.18); min-width: 36px; line-height: 1; }
.adg-doc-title { font-size: 0.82rem; font-weight: 500; color: var(--w); margin-bottom: 4px; }
.adg-doc-desc { font-size: 0.72rem; color: var(--w60); line-height: 1.55; }

/* ── CALCULATOR ──────────────────────────────────────────────── */
.adg-calc { background: var(--n750); }
.adg-calc-inner { display: grid; grid-template-columns: 1.3fr 1fr; gap: 64px; align-items: start; margin-top: 52px; }
.adg-calc-form { display: flex; flex-direction: column; gap: 22px; }
.adg-calc-field { display: flex; flex-direction: column; gap: 7px; }
.adg-calc-label { font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--w60); }
.adg-calc-select { background: var(--n900); border: 1px solid var(--w12); color: var(--w); padding: 13px 16px; font-family: var(--fb); font-size: 0.83rem; font-weight: 300; outline: none; transition: border-color 0.3s; appearance: none; -webkit-appearance: none; cursor: pointer; }
.adg-calc-select:focus { border-color: var(--g400); }
.adg-calc-select option { background: var(--n800); }
.adg-toggle-row { display: flex; }
.adg-toggle { flex: 1; padding: 11px 10px; font-size: 0.66rem; letter-spacing: 0.12em; text-transform: uppercase; font-family: var(--fb); cursor: pointer; background: var(--n900); border: 1px solid var(--w12); color: var(--w60); transition: all 0.3s; margin-right: -1px; text-align: center; }
.adg-toggle.on { background: var(--glow2); border-color: var(--g400); color: var(--g400); position: relative; z-index: 1; }
.adg-result { background: var(--n900); border: 1px solid rgba(201,168,76,0.2); padding: 40px 36px; position: sticky; top: 90px; }
.adg-result-tag { font-size: 0.6rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--g400); margin-bottom: 22px; display: block; }
.adg-result-amount { font-family: var(--fd); font-size: 3.6rem; font-weight: 300; line-height: 1; color: var(--w); }
.adg-result-currency { color: var(--g400); }
.adg-result-note { font-size: 0.66rem; color: var(--w30); margin-top: 4px; margin-bottom: 28px; }
.adg-result-lines { border-top: 1px solid var(--w12); margin-bottom: 24px; }
.adg-result-line { display: flex; justify-content: space-between; padding: 11px 0; border-bottom: 1px solid var(--w06); font-size: 0.76rem; }
.adg-result-line-lbl { color: var(--w60); }
.adg-result-line-val { color: var(--w); font-weight: 500; }
.adg-result-total-row { display: flex; justify-content: space-between; padding: 14px 0 0; font-size: 0.86rem; }
.adg-result-disclaimer { font-size: 0.68rem; color: var(--w30); line-height: 1.65; margin-bottom: 22px; margin-top: 14px; }

/* ── FAQ ─────────────────────────────────────────────────────── */
.adg-faq { background: var(--n900); }
.adg-faq-inner { max-width: 820px; margin: 52px auto 0; }
.adg-faq-item { border-bottom: 1px solid var(--w06); }
.adg-faq-q { width: 100%; background: none; border: none; padding: 26px 0; display: flex; align-items: center; justify-content: space-between; gap: 24px; cursor: pointer; text-align: left; font-family: var(--fb); }
.adg-faq-q-text { font-size: 0.92rem; font-weight: 400; color: var(--w); line-height: 1.5; }
.adg-faq-icon { width: 26px; height: 26px; border: 1px solid var(--w12); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--g400); font-size: 1.1rem; flex-shrink: 0; transition: all 0.3s; }
.adg-faq-item.open .adg-faq-icon { background: var(--g400); color: var(--n900); border-color: var(--g400); transform: rotate(45deg); }
.adg-faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.45s var(--ease); }
.adg-faq-item.open .adg-faq-answer { max-height: 500px; }
.adg-faq-answer-inner { padding-bottom: 24px; }
.adg-faq-answer p { font-size: 0.83rem; color: var(--w60); line-height: 1.85; }
.adg-faq-answer ul { margin-top: 12px; list-style: none; display: flex; flex-direction: column; gap: 7px; }
.adg-faq-answer ul li { font-size: 0.8rem; color: var(--w60); padding-left: 18px; position: relative; line-height: 1.6; }
.adg-faq-answer ul li::before { content: '—'; position: absolute; left: 0; color: var(--g400); }

/* ── ADVISORY ────────────────────────────────────────────────── */
.adg-advisory { background: var(--n800); position: relative; overflow: hidden; }
.adg-advisory::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 70% at 50% 50%, rgba(201,168,76,0.04), transparent); pointer-events: none; }
.adg-advisory-inner { max-width: 900px; margin: 52px auto 0; position: relative; z-index: 1; }
.adg-advisory-quote { font-family: var(--fd); font-size: 1.35rem; font-weight: 300; color: var(--w80); line-height: 1.65; font-style: italic; text-align: center; padding: 40px 48px; border: 1px solid var(--w12); background: var(--n900); margin-bottom: 48px; }
.adg-advisory-quote strong { color: var(--g400); font-style: normal; }
.adg-advisory-quote-attr { margin-top: 18px; font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--g400); font-style: normal; }
.adg-advisory-tips { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 36px; }
.adg-tip { border: 1px solid var(--w06); padding: 30px 26px; transition: border-color 0.3s; }
.adg-tip:hover { border-color: rgba(201,168,76,0.2); }
.adg-tip-num { font-family: var(--fd); font-size: 0.68rem; letter-spacing: 0.22em; color: var(--g400); margin-bottom: 12px; display: block; }
.adg-tip h4 { font-size: 0.9rem; font-weight: 500; color: var(--w); margin-bottom: 9px; }
.adg-tip p { font-size: 0.78rem; color: var(--w60); line-height: 1.78; }
.adg-advisory-warning { background: rgba(201,168,76,0.05); border: 1px solid rgba(201,168,76,0.18); padding: 26px 30px; margin-bottom: 32px; }
.adg-advisory-warning h4 { font-size: 0.82rem; font-weight: 500; color: var(--g400); margin-bottom: 9px; }
.adg-advisory-warning p { font-size: 0.78rem; color: var(--w60); line-height: 1.78; }

/* ── CTA ─────────────────────────────────────────────────────── */
.adg-cta { background: var(--cream-bg); padding: 120px 60px; text-align: center; position: relative; overflow: hidden; }
.adg-cta::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(180,150,90,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(180,150,90,0.06) 1px, transparent 1px); background-size: 56px 56px; }
.adg-cta::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.10), transparent 70%); pointer-events: none; }
.adg-cta-inner { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }
.adg-cta .adg-section-label { color: #8A6820; text-align: center; }
.adg-cta h2 { font-family: var(--fd); font-size: clamp(2.4rem, 4.5vw, 4rem); font-weight: 300; color: var(--cream-ink); line-height: 1.15; margin-bottom: 18px; }
.adg-cta h2 em { color: var(--g400); font-style: italic; }
.adg-cta-divider { width: 44px; height: 1px; background: var(--g400); margin: 22px auto; opacity: 0.55; }
.adg-cta p { font-size: 0.83rem; color: var(--cream-ink3); line-height: 1.8; margin-bottom: 44px; }
.adg-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

/* ── BUTTONS ─────────────────────────────────────────────────── */
.adg-btn-gold { padding: 15px 36px; background: var(--g400); color: var(--n900); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.adg-btn-gold:hover { background: var(--g300); transform: translateY(-2px); }
.adg-btn-ghost { padding: 15px 36px; background: transparent; color: var(--w); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--w30); cursor: pointer; transition: all 0.3s; }
.adg-btn-ghost:hover { border-color: var(--g400); color: var(--g400); transform: translateY(-2px); }
.adg-btn-ink { padding: 15px 36px; background: var(--cream-ink); color: var(--cream-bg); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.adg-btn-ink:hover { background: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }
.adg-btn-cream-outline { padding: 15px 36px; background: transparent; color: var(--cream-ink2); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--cream-bdr); cursor: pointer; transition: all 0.3s; }
.adg-btn-cream-outline:hover { border-color: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }

/* ── FOOTER ──────────────────────────────────────────────────── */
.adg-footer { background: var(--n950); padding: 52px 60px; border-top: 1px solid var(--w06); }
.adg-footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
.adg-footer-logo { font-family: var(--fd); font-size: 1.3rem; letter-spacing: 0.15em; color: var(--w); }
.adg-footer-logo em { color: var(--g400); font-style: normal; }
.adg-footer-copy { font-size: 0.68rem; color: var(--w30); }
.adg-footer-back { padding: 9px 18px; background: transparent; border: 1px solid var(--w12); color: var(--w60); font-family: var(--fb); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
.adg-footer-back:hover { border-color: var(--g400); color: var(--g400); }

/* ── WA FLOAT ────────────────────────────────────────────────── */
.adg-wa { position: fixed; bottom: 28px; right: 28px; z-index: 300; width: 50px; height: 50px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 18px rgba(37,211,102,0.4); transition: transform 0.3s, box-shadow 0.3s; }
.adg-wa:hover { transform: scale(1.1); box-shadow: 0 6px 26px rgba(37,211,102,0.55); }

/* ── REVEAL ──────────────────────────────────────────────────── */
.adg-reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.8s var(--ease), transform 0.8s var(--ease); }
.adg-reveal.in { opacity: 1; transform: translateY(0); }
.agr1 { transition-delay: 0.08s; } .agr2 { transition-delay: 0.18s; }
.agr3 { transition-delay: 0.28s; } .agr4 { transition-delay: 0.38s; }

/* ── KEYFRAMES ───────────────────────────────────────────────── */
@keyframes adgFadeUp { to { opacity: 1; transform: translateY(0); } }
@keyframes adgScrollPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
@keyframes adgBlink { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.75); } }

/* ── RESPONSIVE ──────────────────────────────────────────────── */
@media(max-width:1100px) {
  .adg-hero { grid-template-columns: 1fr; }
  .adg-hero-right { display: none; }
  .adg-intro-grid { grid-template-columns: 1fr; gap: 48px; }
  .adg-pkg-grid { grid-template-columns: 1fr; max-width: 480px; }
  .adg-act-grid { grid-template-columns: repeat(3, 1fr); }
  .adg-calc-inner { grid-template-columns: 1fr; }
  .adg-result { position: static; }
  .adg-advisory-tips { grid-template-columns: 1fr; }
}
@media(max-width:768px) {
  .adg-nav { padding: 16px 24px; } .adg-nav.scrolled { padding: 12px 24px; } .adg-nav-links { display: none; }
  .adg-hero { padding: 0 24px 72px; }
  .adg-back-btn { left: 24px; }
  .adg-section { padding: 68px 24px; }
  .adg-stats { grid-template-columns: repeat(3, 1fr); }
  .adg-act-grid { grid-template-columns: repeat(2, 1fr); }
  .adg-docs-grid { grid-template-columns: 1fr; }
  .adg-footer { padding: 40px 24px; }
  .adg-cta { padding: 80px 24px; }
}
@media(max-width:480px) {
  .adg-stats { grid-template-columns: repeat(2, 1fr); }
  .adg-act-grid { grid-template-columns: 1fr; }
  .adg-hero-h1 { font-size: 4.5rem; }
}

  .adg-nav-hamburger {
    display: none; flex-direction: column; gap: 5px; cursor: pointer;
    background: none; border: none; padding: 6px; z-index: 310;
  }
  .adg-nav-hamburger span {
    display: block; width: 24px; height: 1.5px; background: rgba(248,245,238,0.6);
    transition: all 0.35s cubic-bezier(0.16,1,0.3,1); transform-origin: center;
  }
  .adg-nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: #C9A84C; }
  .adg-nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .adg-nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: #C9A84C; }
  .adg-drawer {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(3,10,20,0.97); backdrop-filter: blur(24px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    transform: translateX(100%); transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
    pointer-events: none;
  }
  .adg-drawer.open { transform: translateX(0); pointer-events: all; }
  .adg-drawer-brand {
    font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.3rem;
    letter-spacing: .18em; color: #F8F5EE; margin-bottom: 44px;
    opacity: 0; transform: translateY(10px);
    transition: opacity .4s .1s, transform .4s .1s;
  }
  .adg-drawer.open .adg-drawer-brand { opacity: 1; transform: translateY(0); }
  .adg-drawer-brand em { color: #C9A84C; font-style: normal; }
  .adg-dlink {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2rem, 8vw, 3rem); font-weight: 300; color: rgba(248,245,238,0.6);
    background: none; border: none; padding: 10px 0; cursor: pointer;
    display: block; width: 100%; text-align: center;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, opacity .4s cubic-bezier(0.16,1,0.3,1), transform .4s cubic-bezier(0.16,1,0.3,1);
  }
  .adg-drawer.open .adg-dlink { opacity: 1; transform: translateY(0); }
  .adg-drawer.open .adg-dlink:nth-of-type(1) { transition-delay: .12s; }
  .adg-drawer.open .adg-dlink:nth-of-type(2) { transition-delay: .17s; }
  .adg-drawer.open .adg-dlink:nth-of-type(3) { transition-delay: .22s; }
  .adg-drawer.open .adg-dlink:nth-of-type(4) { transition-delay: .27s; }
  .adg-drawer.open .adg-dlink:nth-of-type(5) { transition-delay: .32s; }
  .adg-dlink:hover { color: #C9A84C; }
  .adg-drawer-div { width: 40px; height: 1px; background: rgba(201,168,76,.25); margin: 18px 0; opacity: 0; transition: opacity .4s .34s; }
  .adg-drawer.open .adg-drawer-div { opacity: 1; }
  .adg-dcta {
    font-family: 'DM Sans', sans-serif; font-size: .7rem; letter-spacing: .18em;
    text-transform: uppercase; color: #C9A84C; border: 1px solid #C9A84C;
    background: none; padding: 12px 32px; cursor: pointer; margin-top: 8px;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, background .3s, opacity .4s .38s, transform .4s .38s;
  }
  .adg-drawer.open .adg-dcta { opacity: 1; transform: translateY(0); }
  .adg-dcta:hover { background: #C9A84C; color: #05111e; }
  @media (max-width: 900px) {
    .adg-nav-links { display: none; }
    .adg-nav-cta { display: none !important; }
    .adg-nav-hamburger { display: flex; }
  }
`;

// ── DATA ──────────────────────────────────────────────────────
const STATS = [
  { v:"1,500+", k:"Registered Entities" }, { v:"10–20", k:"Setup Days" },
  { v:"100%", k:"Foreign Ownership" }, { v:"0%", k:"Personal Tax" },
  { v:"AED 28.5K", k:"Starting Cost" }, { v:"Al Maryah", k:"Abu Dhabi Island" },
];

const ACTIVITIES = [
  { i:ITrendingUp, n:"Asset Management", d:"Fund management, portfolio management, investment advisory and discretionary mandates" },
  { i:IUsers, n:"Family Office", d:"Single and multi-family office structures, wealth planning and private capital management" },
  { i:IBarChart, n:"Capital Markets", d:"Securities dealing, brokerage, market making and capital markets advisory" },
  { i:IBriefcase, n:"Private Equity", d:"PE fund structuring, venture capital, buyout funds and alternative investment vehicles" },
  { i:ICreditCard, n:"Fintech & Digital Assets", d:"Digital asset trading, crypto regulation, payment services and fintech innovation" },
  { i:IScale, n:"Legal & Professional Services", d:"International law firms, compliance, regulatory advisory and legal consulting" },
  { i:IBuilding, n:"Corporate HQ & SPVs", d:"Holding companies, special purpose vehicles, regional headquarters and IP holding" },
  { i:IShield, n:"Insurance & Reinsurance", d:"Insurance management, captive insurance, reinsurance and risk advisory" },
  { i:IArrowsExchange, n:"M&A & Corporate Finance", d:"Mergers and acquisitions advisory, restructuring, due diligence and deal execution" },
  { i:ILightbulb, n:"Venture Capital", d:"VC fund structures, startup investment vehicles, accelerator programmes and seed funds" },
  { i:IDroplet, n:"Commodities & FX", d:"Commodities trading, forex operations, derivatives and structured financial products" },
  { i:IGlobe, n:"International Business", d:"Cross-border corporate structuring, tax planning vehicles and international holding" },
];

const STEPS = [
  { n:"01", t:"Regulatory Scoping & Structure Planning", d:"ADGM is a regulated financial centre — every setup begins with a careful assessment of whether FSRA (financial services) or ADGM Registration Authority (non-financial) applies to your business. Getting this right from day one is critical.", time:"Day 1–3", docs:["Passport Copy","Business Plan","Regulatory Activity Assessment"] },
  { n:"02", t:"Entity Type & Name Reservation", d:"ADGM offers multiple entity types — SPLCs, LLPs, partnerships, branches, and foundations. We determine the optimal structure and reserve your preferred name with ADGM Registration Authority.", time:"Day 3–5", docs:["Name Options","Entity Type Decision","Shareholder Structure"] },
  { n:"03", t:"Application Preparation & Submission", d:"Comprehensive application package prepared — including constitutional documents, business plans, KYC, UBO declarations, and FSRA regulatory business plan if financial services are involved.", time:"Day 5–10", docs:["Memorandum & Articles","Business Plan","KYC Documents","UBO Declaration"] },
  { n:"04", t:"ADGM Authority & FSRA Review", d:"ADGM Registration Authority conducts its review. For FSRA-regulated activities, the Financial Services Regulatory Authority conducts an additional, thorough regulatory review — timeline depends on activity type.", time:"Day 10–20", docs:["FSRA Application (if required)","Regulatory Business Plan","Fit & Proper Forms"] },
  { n:"05", t:"Licence & Incorporation Certificate Issuance", d:"Commercial Licence and Certificate of Incorporation issued by ADGM Registration Authority. FSRA Financial Services Permission issued separately for regulated activities.", time:"Day 15–25", docs:["Commercial Licence","Certificate of Incorporation","FSRA Permission (if applicable)"] },
  { n:"06", t:"Investor Visa Processing", d:"Entry permit, medical fitness, biometrics and Emirates ID. ADGM investor visas are Abu Dhabi residence visas — full UAE residency rights identical to any other emirate.", time:"Day 25–40", docs:["Visa Application","Medical Test","Emirates ID"] },
  { n:"07", t:"Bank Account Opening", d:"Introduction to UAE and international banking partners with ADGM relationship experience. ADGM entities are recognised by premier private banks and institutional banking partners globally.", time:"Day 40–60", docs:["Bank Application","Corporate Documents","Source of Funds","Regulatory Approvals"] },
];

const DOCUMENTS = [
  { t:"Passport Copies", d:"Valid passport copies for all shareholders, directors and UBOs — minimum 6 months validity" },
  { t:"Detailed Business Plan", d:"Comprehensive plan covering regulated activities, revenue model, client base, and compliance framework — required by ADGM RA and FSRA" },
  { t:"UBO Declaration", d:"Ultimate Beneficial Owner declaration for all persons holding 25%+ of the entity — mandatory under ADGM regulations" },
  { t:"Source of Funds & Wealth", d:"Detailed documentation of the source of both investment funds and personal wealth — scrutinised by ADGM and banking partners" },
  { t:"Fit & Proper Forms", d:"For FSRA-regulated activities: personal questionnaires, criminal record checks, and regulatory history for all controllers and managers" },
  { t:"Corporate Documents", d:"For corporate shareholders: Certificate of Incorporation, MOA, Board Resolution, Register of Members, UBO chain" },
  { t:"Regulatory Business Plan", d:"For financial services activities: detailed regulatory business plan including risk framework, compliance procedures and staffing" },
  { t:"Professional References", d:"References from existing financial institution relationships, regulatory bodies, or professional advisors — strongly recommended" },
];

const FAQS = [
  { q:"What makes ADGM different from DIFC and other UAE financial centres?", a:"ADGM (Abu Dhabi Global Market) is Abu Dhabi's international financial centre on Al Maryah Island, operating under its own common law jurisdiction — distinct from UAE federal law. Its key differentiators are: Abu Dhabi's sovereign backing and proximity to sovereign wealth fund capital (ADIA, Mubadala), a progressive digital assets and crypto regulatory framework, and a strong focus on family offices and private wealth management alongside institutional finance." },
  { q:"What types of businesses are best suited to ADGM?", a:"ADGM is purpose-built for regulated financial services and sophisticated capital structures:", list:["Asset managers and investment advisors","Family offices (single and multi-family)","Private equity and venture capital funds","Digital assets and fintech companies","Corporate holding structures and SPVs","International law firms and professional services","Commodity traders and derivatives operators","Regional headquarters for financial institutions"] },
  { q:"Do I need FSRA regulation for every ADGM business?", a:"No. ADGM has two distinct regulatory tracks: FSRA-regulated (for financial services activities like asset management, dealing in securities, operating a fund) and non-regulated (for professional services, holding companies, SPVs, law firms, and consulting). Non-regulated businesses go through ADGM Registration Authority only — faster and less complex. INCOZONE determines your regulatory path in the initial consultation." },
  { q:"How does ADGM's legal framework compare to DIFC?", a:"Both operate under English common law, separate from UAE federal law. ADGM's courts are modelled on English commercial courts with English judges. For contractual disputes, both are equally credible internationally. ADGM's advantage is Abu Dhabi sovereign proximity and its digital assets framework — DIFC's advantage is the larger established financial ecosystem and proximity to Dubai's commercial base." },
  { q:"What is the cost difference between ADGM and DIFC?", a:"Both are premium-tier financial centres with comparable cost structures — significantly more expensive than general free zones. ADGM starts from AED 28,500 for non-regulated setups; FSRA-regulated setups involve additional regulatory fees, minimum capital requirements, and compliance costs that can range from AED 50,000 to several hundred thousand dirhams depending on the activity. INCOZONE provides precise cost breakdowns in consultation." },
  { q:"Can I get a UAE residence visa through ADGM?", a:"Yes — ADGM investor and employee visas are full UAE Abu Dhabi residence visas. Emirates ID and residency rights are identical to any other UAE free zone visa.", list:["Full UAE residence visa (Abu Dhabi)","Same Emirates ID as any UAE resident","Access to UAE banking system","UAE residency duration: 2–3 years renewable"] },
  { q:"Is ADGM suitable for digital assets and crypto businesses?", a:"Yes — ADGM's FSRA has developed one of the most comprehensive and progressive digital assets regulatory frameworks in the world. It explicitly licenses virtual asset service providers, digital securities exchanges, and crypto custody operations. For regulated crypto businesses seeking a credible UAE licence, ADGM is the premier choice." },
  { q:"How long does ADGM setup take?", a:"Non-regulated ADGM setups typically take 10–20 working days. FSRA-regulated setups involve a more thorough review and can take 3–6 months depending on the activity category, application quality, and FSRA's current workload. INCOZONE prepares applications to the highest standard to minimise review time." },
  { q:"What are the minimum capital requirements for ADGM?", a:"Non-regulated businesses: no minimum capital requirement. FSRA-regulated businesses: minimum capital requirements vary significantly by activity — from AED 1 million for some advisory licences to AED 10 million+ for fund management permissions. INCOZONE provides precise capital requirement guidance before you commit to the application." },
  { q:"Can ADGM companies do business across the UAE?", a:"ADGM entities can provide services to clients across all UAE emirates. For retail financial services, regulations may require specific licensing. For professional and corporate services, there are no geographic restrictions. ADGM's Abu Dhabi address carries significant weight with Abu Dhabi government entities, sovereign wealth funds, and regional institutional investors." },
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
  return <canvas ref={ref} className="adg-hero-canvas" style={{ width: "100%", height: "100%" }} />;
}

// ── SCROLL REVEAL ──────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".adg-reveal");
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
    }), { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ── CALCULATOR ────────────────────────────────────────────────
function Calculator() {
  const [pkg, setPkg] = useState("non_reg");
  const [off, setOff] = useState("serviced");
  const [vis, setVis] = useState("2");
  const [fsra, setFsra] = useState(false);
  const [bnk, setBnk] = useState(false);
  const pkgC = { non_reg: 28500, advisory: 55000, fund: 95000 };
  const offC = { virtual: 0, serviced: 12000, private: 28000, premium: 55000 };
  const visC = { "0": 0, "2": 0, "5": 8500, "10": 18000 };
  const total = (pkgC[pkg] || 0) + (offC[off] || 0) + (visC[vis] || 0) + (fsra ? 22000 : 0) + (bnk ? 5000 : 0);
  const f = n => "AED " + n.toLocaleString();
  return (
    <div className="adg-calc-inner">
      <div>
        <h2 className="adg-h2 adg-reveal">Build Your <em>Custom Package</em></h2>
        <p className="adg-reveal agr1" style={{ fontSize: "0.84rem", color: "var(--w60)", margin: "12px 0 36px" }}>Configure your ADGM setup and get an indicative cost breakdown. Final costs depend on regulatory requirements.</p>
        <div className="adg-calc-form">
          {[
            { l: "Entity / Licence Type", id: "pkg", val: pkg, set: setPkg, opts: [["non_reg","Non-Regulated (AED 28,500)"],["advisory","Advisory / Professional (AED 55,000)"],["fund","Fund / Asset Management (AED 95,000)"]] },
            { l: "Office / Workspace", id: "off", val: off, set: setOff, opts: [["virtual","Virtual Office (AED 0)"],["serviced","Serviced Office (+AED 12,000/yr)"],["private","Private Office (+AED 28,000/yr)"],["premium","Premium Suite (+AED 55,000/yr)"]] },
            { l: "Visa Allocation", id: "vis", val: vis, set: setVis, opts: [["0","No Visas"],["2","2 Visas (Included)"],["5","5 Visas (+AED 8,500)"],["10","10 Visas (+AED 18,000)"]] },
          ].map(({ l, id, val, set, opts }) => (
            <div className="adg-calc-field adg-reveal" key={id}>
              <label className="adg-calc-label">{l}</label>
              <select className="adg-calc-select" value={val} onChange={e => set(e.target.value)}>
                {opts.map(([v, lab]) => <option key={v} value={v}>{lab}</option>)}
              </select>
            </div>
          ))}
          <div className="adg-calc-field adg-reveal">
            <label className="adg-calc-label">FSRA Regulatory Application Support</label>
            <div className="adg-toggle-row">
              <button className={`adg-toggle${!fsra ? " on" : ""}`} onClick={() => setFsra(false)}>Not Required</button>
              <button className={`adg-toggle${fsra ? " on" : ""}`} onClick={() => setFsra(true)}>Add FSRA Support (+AED 22,000)</button>
            </div>
          </div>
          <div className="adg-calc-field adg-reveal">
            <label className="adg-calc-label">Banking & Private Banking Assistance</label>
            <div className="adg-toggle-row">
              <button className={`adg-toggle${!bnk ? " on" : ""}`} onClick={() => setBnk(false)}>Not Required</button>
              <button className={`adg-toggle${bnk ? " on" : ""}`} onClick={() => setBnk(true)}>Add Banking (+AED 5,000)</button>
            </div>
          </div>
        </div>
      </div>
      <div className="adg-result adg-reveal">
        <span className="adg-result-tag">Indicative Total</span>
        <div className="adg-result-amount"><span className="adg-result-currency">AED </span>{total.toLocaleString()}</div>
        <div className="adg-result-note">Indicative cost · excludes annual renewal & capital requirements</div>
        <div className="adg-result-lines">
          <div className="adg-result-line"><span className="adg-result-line-lbl">Base Licence Fee</span><span className="adg-result-line-val">{f(pkgC[pkg])}</span></div>
          {offC[off] > 0 && <div className="adg-result-line"><span className="adg-result-line-lbl">Office (Annual)</span><span className="adg-result-line-val">+{f(offC[off])}</span></div>}
          {visC[vis] > 0 && <div className="adg-result-line"><span className="adg-result-line-lbl">Visa Processing</span><span className="adg-result-line-val">+{f(visC[vis])}</span></div>}
          {fsra && <div className="adg-result-line"><span className="adg-result-line-lbl">FSRA Application Support</span><span className="adg-result-line-val">+{f(22000)}</span></div>}
          {bnk && <div className="adg-result-line"><span className="adg-result-line-lbl">Banking Assistance</span><span className="adg-result-line-val">+{f(5000)}</span></div>}
        </div>
        <div className="adg-result-total-row"><span style={{ color: "var(--w)", fontWeight: 500 }}>Total Estimate</span><span style={{ color: "var(--g400)", fontWeight: 600 }}>{f(total)}</span></div>
        <p className="adg-result-disclaimer">Indicative only. FSRA-regulated setups have additional regulatory fees and minimum capital requirements. Exact figures provided in consultation.</p>
        <button className="adg-btn-gold" style={{ width: "100%" }}>Get Exact Quote →</button>
      </div>
    </div>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────
export default function ADGMPage({ onBack, onNavigate }) {
  const [_adgOpen, setadgOpen] = useState(false);
  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = _adgOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [_adgOpen]);

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
    <div className="adg-root">
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className={`adg-nav${scrolled ? " scrolled" : ""}`}>
        <div className="adg-nav-logo" onClick={()=>{if(onNavigate){onNavigate("home");window.scrollTo(0,0);}}}>INCO<em>ZONE</em></div>
        <ul className="adg-nav-links">{["Services","Free Zones","About","Blog","Contact"].map(l=>{const m={"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};return <li key={l}><a href="#" onClick={e=>{e.preventDefault();if(onNavigate){onNavigate(m[l]);window.scrollTo(0,0);}}}>{l}</a></li>;})}</ul>
        <button className="adg-nav-cta" onClick={()=>{if(onNavigate){onNavigate("schedule");window.scrollTo(0,0);}}}>Schedule Consultation</button>
      
        {/* Hamburger */}
        <button
          className={`adg-nav-hamburger${_adgOpen ? " open" : ""}`}
          onClick={() => setadgOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`adg-drawer${_adgOpen ? " open" : ""}`}>
        <div className="adg-drawer-brand"
          onClick={() => { setadgOpen(false); if(onNavigate) { onNavigate("home"); window.scrollTo(0,0); } }}>
          INCO<em>ZONE</em>
        </div>
        {["Services","Free Zones","About","Blog","Contact"].map((l) => {
          const pm = {"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};
          return (
            <button key={l} className="adg-dlink"
              onClick={() => { setadgOpen(false); if(onNavigate) { onNavigate(pm[l]); window.scrollTo(0,0); } }}>
              {l}
            </button>
          );
        })}
        <div className="adg-drawer-div" />
        <button className="adg-dcta"
          onClick={() => { setadgOpen(false); if(onNavigate) { onNavigate("schedule"); window.scrollTo(0,0); } }}>
          Schedule Consultation
        </button>
      </div>

      {/* ── HERO ── */}
      <div className="adg-hero">
        <HeroCanvas />
        <button className="adg-back-btn" onClick={onBack}>Back to Free Zones</button>

        <div className="adg-hero-left">
          <div className="adg-hero-eyebrow">
            <div className="adg-hero-eyebrow-dot" />
            Financial Services · Al Maryah Island, Abu Dhabi
          </div>
          <h1 className="adg-hero-h1">ADGM<em>Free Zone</em></h1>
          <div className="adg-hero-fullname">Abu Dhabi Global Market — International Financial Centre</div>
          <p className="adg-hero-desc">
            Abu Dhabi's premier international financial centre — common law jurisdiction, sovereign backing, and the UAE's most progressive digital assets regulatory framework. The address of choice for asset managers, family offices, and sophisticated capital structures. Starting from <strong style={{ color: "var(--g300)" }}>AED 28,500.</strong>
          </p>
          <div className="adg-hero-actions">
            <button className="adg-btn-gold">Start ADGM Setup →</button>
            <button className="adg-btn-ghost">Download Free Guide</button>
          </div>
        </div>

        <div className="adg-hero-right">
          <div className="adg-hero-card">
            <span className="adg-hero-card-label">Quick Reference</span>
            {[
              ["Location","Al Maryah Island, Abu Dhabi"], ["Setup From","AED 28,500","gold"],
              ["Setup Time","10–20 Days","gold"], ["Legal Framework","English Common Law"],
              ["Ownership","100% Foreign","gold"], ["Regulator","FSRA (Financial)"],
              ["Annual Renewal","AED 20–50K+"], ["Tax","0% Personal"],
            ].map(([l, v, cls]) => (
              <div className="adg-hero-card-row" key={l}>
                <span>{l}</span><span className={cls || ""}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="adg-scroll-hint"><span>Scroll</span><div className="adg-scroll-line" /></div>
      </div>

      {/* ── STATS ── */}
      <div className="adg-stats">
        {STATS.map((s, i) => (
          <div className="adg-stat" key={i}>
            <span className="adg-stat-val">{s.v}</span>
            <span className="adg-stat-key">{s.k}</span>
          </div>
        ))}
      </div>

      {/* ── INTRO ── */}
      <div className="adg-intro adg-section">
        <span className="adg-section-label adg-reveal">Zone Overview</span>
        <h2 className="adg-h2 adg-reveal agr1" style={{ maxWidth: "640px" }}>Abu Dhabi's Gateway to<br /><em>Global Capital Markets</em></h2>
        <div className="adg-intro-grid">
          <div className="adg-intro-text">
            <p className="adg-reveal agr1"><strong>Abu Dhabi Global Market (ADGM)</strong> is an international financial centre and free zone located on Al Maryah Island in Abu Dhabi. Established in 2015, ADGM operates under its own independent legal system based on English common law — entirely separate from UAE federal law — with its own courts staffed by English-qualified judges.</p>
            <p className="adg-reveal agr2">ADGM is home to over <strong>1,500 registered entities</strong> including leading asset managers, family offices, private equity firms, global law firms, and financial technology companies. Its proximity to Abu Dhabi's sovereign wealth ecosystem — ADIA, Mubadala, and ADQ — makes it the natural financial address for those seeking access to Abu Dhabi's capital and institutional networks.</p>
            <p className="adg-reveal agr3">The zone's <strong>Financial Services Regulatory Authority (FSRA)</strong> has built a reputation as one of the most sophisticated and internationally recognised financial regulators in the region — with a particularly progressive framework for digital assets, crypto, and fintech that has attracted global players seeking a credible regulated base in the Middle East.</p>
            <p className="adg-reveal agr3">For non-financial services businesses — law firms, consulting, holding companies, and SPVs — ADGM Registration Authority offers a streamlined, English common law corporate framework that is internationally credible and operationally flexible, without the complexity of FSRA regulation.</p>
          </div>
          <div className="adg-reveal agr2">
            <div className="adg-pillars">
              {[
                { i:IScale, h:"English Common Law Jurisdiction", p:"ADGM operates entirely under English common law — separate from UAE federal law. International contracts, dispute resolution, and corporate governance follow globally familiar legal standards trusted by international investors and institutions." },
                { i:ICrown, h:"Sovereign Backing & Capital Access", p:"ADGM's Abu Dhabi location provides proximity to ADIA, Mubadala, ADQ, and Abu Dhabi's sovereign capital ecosystem — unmatched access to sovereign wealth fund relationships and Abu Dhabi institutional networks." },
                { i:ICreditCard, h:"Leading Digital Assets Framework", p:"ADGM's FSRA has developed one of the world's most comprehensive and credible digital assets regulatory frameworks — attracting global crypto exchanges, asset managers, and fintech innovators seeking a regulated UAE base." },
                { i:IUsers, h:"Family Office Jurisdiction of Choice", p:"ADGM is the preferred structure for sophisticated family offices in the region — offering flexible SPV and holding structures, strong confidentiality protections, and direct proximity to Abu Dhabi's private wealth ecosystem." },
                { i:IGlobe, h:"International Legal Credibility", p:"ADGM's legal framework is recognised and trusted by international counterparties, investors, and institutions worldwide. English common law contracts and ADGM courts carry weight that UAE onshore or other free zone structures cannot match for institutional transactions." },
              ].map((p, i) => (
                <div className="adg-pillar" key={i}>
                  <div className="adg-pillar-icon">{p.i}</div>
                  <div><h4>{p.h}</h4><p>{p.p}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PACKAGES ── */}
      <div className="adg-packages adg-section">
        <span className="adg-section-label adg-reveal">Setup Packages</span>
        <h2 className="adg-h2 adg-reveal agr1">Choose Your <em>ADGM Package</em></h2>
        <p className="adg-reveal agr2" style={{ fontSize: "0.84rem", color: "var(--cream-ink3)", marginTop: "10px", maxWidth: "560px" }}>Packages reflect entity type and regulatory track. FSRA-regulated businesses require additional regulatory fees and minimum capital requirements beyond these setup costs.</p>
        <div className="adg-pkg-grid">
          {[
            { name:"Holding", tag:"SPVs, holding companies & non-regulated", price:"28,500", badge:"Non-Regulated", featured:false, feats:[["ADGM RA Incorporation",true],["Corporate SPV / Holding Co",true],["2 Investor Visas",true],["Certificate of Incorporation",true],["FSRA Licensing",false],["Dedicated Account Manager",false]] },
            { name:"Advisory", tag:"Professional & advisory services", price:"55,000", badge:"Most Popular", featured:true, feats:[["ADGM Commercial Licence",true],["Serviced Office Access",true],["5 Investor Visas",true],["Full Corporate Documents",true],["FSRA Advisory Licence",true],["Dedicated Account Manager",false]] },
            { name:"Fund", tag:"Asset management & fund structures", price:"95,000", badge:"Regulated Entity", featured:false, feats:[["FSRA Full Authorisation",true],["Private Office / Suite",true],["10 Investor Visas",true],["Full Regulatory Documents",true],["Compliance Framework Setup",true],["Dedicated Account Manager",true]] },
          ].map((pkg, i) => (
            <div className={`adg-pkg adg-reveal agr${i+1}${pkg.featured ? " featured" : ""}`} key={i}>
              <div className="adg-pkg-badge">{pkg.badge}</div>
              <div className="adg-pkg-name">{pkg.name}</div>
              <p className="adg-pkg-tag">{pkg.tag}</p>
              <div className="adg-pkg-price">
                <div className="adg-pkg-amount">AED {pkg.price}</div>
                <div className="adg-pkg-period">Setup cost · excludes renewal, office & capital requirements</div>
              </div>
              <ul className="adg-pkg-features">
                {pkg.feats.map(([t, on], j) => (
                  <li className="adg-pkg-feat" key={j}>
                    <span className={on ? "adg-feat-on" : "adg-feat-off"}>{on ? "" : "×"}</span>
                    <span className={on ? "adg-feat-label-on" : "adg-feat-label-off"}>{t}</span>
                  </li>
                ))}
              </ul>
              <button className="adg-pkg-btn">{pkg.featured ? "Select This Package →" : "Get Started →"}</button>
            </div>
          ))}
        </div>
      </div>

      {/* ── ACTIVITIES ── */}
      <div className="adg-activities adg-section">
        <span className="adg-section-label adg-reveal">Licensed Activities</span>
        <h2 className="adg-h2 adg-reveal agr1">What Can You Do <em>Under ADGM?</em></h2>
        <p className="adg-reveal agr2" style={{ fontSize: "0.83rem", color: "var(--w60)", marginTop: "10px", maxWidth: "580px" }}>ADGM supports a broad range of financial services, professional services, and corporate structures:</p>
        <div className="adg-act-grid">
          {ACTIVITIES.map((a, i) => (
            <div className={`adg-act-card adg-reveal agr${(i%4)+1}`} key={i}>
              <div className="adg-act-icon">{a.i}</div>
              <div className="adg-act-name">{a.n}</div>
              <div className="adg-act-desc">{a.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROCESS ── */}
      <div className="adg-process adg-section">
        <span className="adg-section-label adg-reveal" style={{ textAlign: "center", display: "block" }}>Setup Process</span>
        <h2 className="adg-h2 adg-reveal agr1" style={{ textAlign: "center" }}>Your ADGM <em>Journey — Step by Step</em></h2>
        <div className="adg-process-inner">
          {STEPS.map((s, i) => (
            <div className={`adg-step adg-reveal agr${(i%4)+1}`} key={i}>
              <div className="adg-step-num">{s.n}</div>
              <div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <div className="adg-step-time">{s.time}</div>
                <div className="adg-step-docs">{s.docs.map(d => <span className="adg-doc-tag" key={d}>{d}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DOCUMENTS ── */}
      <div className="adg-documents adg-section">
        <span className="adg-section-label adg-reveal">Required Documents</span>
        <h2 className="adg-h2 adg-reveal agr1">What You <em>Need to Prepare</em></h2>
        <p className="adg-reveal agr2" style={{ fontSize: "0.83rem", color: "var(--w60)", marginTop: "10px" }}>ADGM requires the most thorough documentation package of any UAE free zone — reflecting its regulated financial centre status:</p>
        <div className="adg-docs-grid">
          {DOCUMENTS.map((d, i) => (
            <div className={`adg-doc-card adg-reveal agr${(i%2)+1}`} key={i}>
              <div className="adg-doc-num">0{i+1}</div>
              <div><div className="adg-doc-title">{d.t}</div><div className="adg-doc-desc">{d.d}</div></div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CALCULATOR ── */}
      <div className="adg-calc adg-section">
        <span className="adg-section-label adg-reveal">Cost Estimator</span>
        <Calculator />
      </div>

      {/* ── FAQ ── */}
      <div className="adg-faq adg-section">
        <span className="adg-section-label adg-reveal" style={{ textAlign: "center", display: "block" }}>FAQ</span>
        <h2 className="adg-h2 adg-reveal agr1" style={{ textAlign: "center" }}>Frequently Asked <em>Questions</em></h2>
        <div className="adg-faq-inner">
          {FAQS.map((f, i) => (
            <div className={`adg-faq-item adg-reveal agr${(i%3)+1}${openFaq === i ? " open" : ""}`} key={i}>
              <button className="adg-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="adg-faq-q-text">{f.q}</span>
                <div className="adg-faq-icon">+</div>
              </button>
              <div className="adg-faq-answer">
                <div className="adg-faq-answer-inner">
                  <p>{f.a}</p>
                  {f.list && <ul>{f.list.map(li => <li key={li}>{li}</li>)}</ul>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ADVISORY ── */}
      <div className="adg-advisory adg-section">
        <span className="adg-section-label adg-reveal" style={{ textAlign: "center", display: "block" }}>INCOZONE Advisory</span>
        <h2 className="adg-h2 adg-reveal agr1" style={{ textAlign: "center" }}>Expert Advice Before <em>You Decide</em></h2>
        <div className="adg-advisory-inner">
          <div className="adg-advisory-quote adg-reveal agr2">
            "ADGM is not just another free zone — it is a jurisdiction.{" "}
            <strong>The distinction matters enormously for asset managers, family offices, and financial businesses where legal framework, regulatory credibility, and institutional counterparty perception are commercial considerations as important as the licence itself. ADGM delivers on all three.</strong>"
            <div className="adg-advisory-quote-attr">— INCOZONE Advisory Team</div>
          </div>
          <div className="adg-advisory-tips">
            {[
              { n:"01", t:"FSRA vs Non-Regulated — The Critical First Decision", p:"The most important choice in any ADGM setup is whether you need FSRA regulation. Many businesses assume they do — and pay significantly more than necessary. Holding companies, law firms, consulting practices, and corporate treasury structures often qualify as non-regulated. INCOZONE determines this in the first consultation, saving clients significant cost and time." },
              { n:"02", t:"Capital Requirements Are Real", p:"FSRA-regulated businesses face genuine minimum capital requirements — not just licence fees. These range from AED 1 million for some advisory categories to AED 10 million+ for full asset management permissions. Plan your capital structure before you begin. INCOZONE maps this precisely for your specific activity category upfront." },
              { n:"03", t:"Abu Dhabi's Sovereign Proximity", p:"ADGM's single greatest advantage over DIFC is physical and relational proximity to Abu Dhabi's sovereign capital — ADIA, Mubadala, ADQ. For fund managers and investment firms seeking LP relationships with sovereign wealth funds, this proximity has real commercial value that no Dubai address can replicate." },
              { n:"04", t:"Banking at the Premium Tier", p:"ADGM entities are served by UAE's top-tier private banks and international institutions — FAB, ADCB, Citibank, HSBC Private Banking, UBS, and others. For family offices and investment managers, ADGM unlocks banking relationships and private banking services that are materially different from what general free zone entities can access." },
            ].map((tip, i) => (
              <div className={`adg-tip adg-reveal agr${(i%2)+1}`} key={i}>
                <span className="adg-tip-num">{tip.n}</span>
                <h4>{tip.t}</h4>
                <p>{tip.p}</p>
              </div>
            ))}
          </div>
          <div className="adg-advisory-warning adg-reveal">
            <h4> When ADGM Might Not Be the Best Fit</h4>
            <p>Consider alternatives if: your business is in trading, logistics, or manufacturing — JAFZA, RAKEZ, or DMCC are more appropriate · you are an early-stage business where ADGM's cost cannot be justified yet — IFZA or Meydan offer credible UAE setups at a fraction of the cost · your primary market is Dubai rather than Abu Dhabi — DIFC or DMCC provide stronger Dubai ecosystem access · you need retail financial services rather than institutional — DIFC has deeper retail infrastructure · or your business is in media or creative services — SHAMS is purpose-built for that sector. ADGM is a precision instrument — INCOZONE will tell you clearly whether your situation calls for it.</p>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="adg-cta">
        <div className="adg-cta-inner">
          <span className="adg-section-label adg-reveal">Begin Your Journey</span>
          <h2 className="adg-reveal agr1">Ready to Establish Your<br /><em>ADGM Presence?</em></h2>
          <div className="adg-cta-divider" />
          <p className="adg-reveal agr2">
            Schedule a private consultation. No obligation. Our ADGM specialists will assess your financial services requirements and regulatory needs — and give you an honest, precise roadmap from day one.
          </p>
          <div className="adg-cta-btns adg-reveal agr3">
            <button className="adg-btn-ink">Schedule Private Consultation</button>
            <button className="adg-btn-cream-outline" onClick={onBack}>← Explore Other Zones</button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="adg-footer">
        <div className="adg-footer-inner">
          <div className="adg-footer-logo">INCO<em>ZONE</em></div>
          <div className="adg-footer-copy">© 2025 INCOZONE. All rights reserved. Dubai, UAE.</div>
          <button className="adg-footer-back" onClick={onBack}>← Back to Free Zones</button>
        </div>
      </div>

      {/* ── WA FLOAT ── */}
      <div className="adg-wa">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </div>
    </div>
  );
}
