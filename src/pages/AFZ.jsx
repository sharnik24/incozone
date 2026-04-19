import { useState, useEffect, useRef } from "react";
import { IArrowsExchange, IBriefcase, IMonitor, IGear, IPackage, IPenTool, IWrench, ILeaf, ICar, ICross, IBookOpen, IShoppingBag, ITag, IClock, IIdCard, ILaptop, IGrid } from "../icons";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — AFZ Free Zone Page  (standalone, self-contained)
//  Drop into: src/pages/AFZ.jsx
//  Same structure & palette as DMCC.jsx — only content differs
// ═══════════════════════════════════════════════════════════════

const CSS = `

.afz-root *, .afz-root *::before, .afz-root *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}
.afz-root {
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
.afz-nav {
  position: fixed; inset-inline: 0; top: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 60px;
  transition: background 0.5s, padding 0.4s, border-color 0.5s;
  border-bottom: 1px solid transparent;
}
.afz-nav.scrolled {
  background: rgba(5,17,30,0.96); backdrop-filter: blur(20px);
  padding: 14px 60px; border-bottom-color: rgba(201,168,76,0.12);
}
.afz-nav-logo { font-family: var(--fd); font-size: 1.5rem; font-weight: 500; letter-spacing: 0.15em; color: var(--w); cursor: pointer; }
.afz-nav-logo em { color: var(--g400); font-style: normal; }
.afz-nav-links { display: flex; gap: 36px; list-style: none; }
.afz-nav-links a { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--w60); text-decoration: none; transition: color 0.3s; }
.afz-nav-links a:hover { color: var(--g300); }
.afz-nav-cta {
  font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
  background: transparent; border: 1px solid var(--g400); color: var(--g400);
  padding: 9px 22px; cursor: pointer; font-family: var(--fb);
  transition: background 0.3s, color 0.3s;
}
.afz-nav-cta:hover { background: var(--g400); color: var(--n900); }
.afz-back-btn {
  position: absolute; top: 90px; left: 60px; z-index: 20;
  background: none; border: none; font-family: var(--fb); font-size: 0.7rem;
  letter-spacing: 0.18em; text-transform: uppercase; color: var(--w30);
  cursor: pointer; display: flex; align-items: center; gap: 10px; padding: 0;
  transition: color 0.3s;
}
.afz-back-btn:hover { color: var(--g400); }
.afz-back-btn::before { content: '←'; font-size: 0.9rem; }

/* ── HERO ────────────────────────────────────────────────────── */
.afz-hero {
  min-height: 100vh; position: relative; overflow: hidden;
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: flex-end; padding: 0 60px 80px; gap: 60px;
}
.afz-hero-canvas { position: absolute; inset: 0; z-index: 0; display: block; }
.afz-hero-left { position: relative; z-index: 2; padding-top: 160px; }
.afz-hero-right { position: relative; z-index: 2; padding-top: 160px; display: flex; align-items: flex-end; justify-content: flex-end; }
.afz-hero-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--g400); border: 1px solid rgba(201,168,76,0.28); padding: 7px 16px;
  margin-bottom: 32px;
  opacity: 0; transform: translateY(16px);
  animation: afzFadeUp 1s var(--ease) 0.2s forwards;
}
.afz-hero-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--g400); animation: afzBlink 2s infinite; }
.afz-hero-h1 {
  font-family: var(--fd); font-weight: 300; line-height: 0.88;
  letter-spacing: -0.02em; color: var(--w);
  font-size: clamp(5rem, 10vw, 9.5rem); margin-bottom: 20px;
  opacity: 0; transform: translateY(20px);
  animation: afzFadeUp 1.1s var(--ease) 0.35s forwards;
}
.afz-hero-h1 em { display: block; color: var(--g400); font-style: italic; font-weight: 300; }
.afz-hero-fullname {
  font-family: var(--fd); font-size: 1rem; font-weight: 300;
  color: var(--w60); font-style: italic; margin-bottom: 36px; letter-spacing: 0.04em;
  opacity: 0; animation: afzFadeUp 1s var(--ease) 0.5s forwards;
}
.afz-hero-desc {
  font-size: 0.86rem; color: var(--w80); line-height: 1.85; max-width: 520px; margin-bottom: 44px;
  opacity: 0; animation: afzFadeUp 1s var(--ease) 0.65s forwards;
}
.afz-hero-actions {
  display: flex; gap: 14px; flex-wrap: wrap;
  opacity: 0; animation: afzFadeUp 1s var(--ease) 0.8s forwards;
}
.afz-hero-card {
  background: rgba(11,28,45,0.85); backdrop-filter: blur(16px);
  border: 1px solid var(--w12); padding: 36px 32px; min-width: 280px;
  opacity: 0; animation: afzFadeUp 1.1s var(--ease) 0.9s forwards;
}
.afz-hero-card-label {
  font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--g400); margin-bottom: 20px; display: block;
}
.afz-hero-card-row {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 11px 0; border-bottom: 1px solid var(--w06); font-size: 0.78rem;
}
.afz-hero-card-row:last-child { border-bottom: none; }
.afz-hero-card-row span:first-child { color: var(--w60); }
.afz-hero-card-row span:last-child { color: var(--w); font-weight: 500; text-align: right; }
.afz-hero-card-row span.gold { color: var(--g400); }
.afz-scroll-hint {
  position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
  z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px;
  opacity: 0; animation: afzFadeUp 1s var(--ease) 1.2s forwards;
}
.afz-scroll-hint span { font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--w30); }
.afz-scroll-line { width: 1px; height: 44px; background: linear-gradient(to bottom, var(--g400), transparent); animation: afzScrollPulse 2.2s ease-in-out infinite; }

/* ── STATS BAR ───────────────────────────────────────────────── */
.afz-stats {
  display: grid; grid-template-columns: repeat(6, 1fr);
  background: var(--n950); border-top: 1px solid var(--w12);
  border-bottom: 1px solid var(--w12);
}
.afz-stat { padding: 28px 20px; text-align: center; border-right: 1px solid var(--w12); transition: background 0.3s; }
.afz-stat:last-child { border-right: none; }
.afz-stat:hover { background: var(--glow3); }
.afz-stat-val { font-family: var(--fd); font-size: 2rem; font-weight: 300; color: var(--g400); display: block; line-height: 1; }
.afz-stat-key { font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--w30); margin-top: 6px; display: block; }

/* ── SECTION BASICS ──────────────────────────────────────────── */
.afz-section { padding: 96px 60px; }
.afz-section-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--g400); margin-bottom: 14px; display: block; }
.afz-h2 { font-family: var(--fd); font-size: clamp(2rem, 3.8vw, 3.4rem); font-weight: 300; line-height: 1.15; color: var(--w); }
.afz-h2 em { color: var(--g400); font-style: italic; }

/* ── INTRO ───────────────────────────────────────────────────── */
.afz-intro { background: var(--n800); }
.afz-intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; margin-top: 52px; }
.afz-intro-text p { font-size: 0.88rem; color: var(--w60); line-height: 1.88; margin-bottom: 22px; }
.afz-intro-text p strong { color: var(--w); font-weight: 500; }
.afz-intro-text p:last-child { margin-bottom: 0; }
.afz-pillars { display: flex; flex-direction: column; }
.afz-pillar { display: flex; gap: 20px; padding: 22px 0; border-bottom: 1px solid var(--w06); transition: padding-left 0.3s var(--ease); }
.afz-pillar:first-child { border-top: 1px solid var(--w06); }
.afz-pillar:hover { padding-left: 10px; }
.afz-pillar-icon { font-size: 1.3rem; flex-shrink: 0; margin-top: 2px; }
.afz-pillar h4 { font-size: 0.88rem; font-weight: 500; color: var(--w); margin-bottom: 5px; }
.afz-pillar p { font-size: 0.77rem; color: var(--w60); line-height: 1.65; }

/* ── PACKAGES ────────────────────────────────────────────────── */
.afz-packages { background: var(--cream-bg); position: relative; overflow: hidden; }
.afz-packages::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(201,168,76,0.09), transparent 60%);
  pointer-events: none;
}
.afz-packages::after {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, transparent, var(--g400) 40%, transparent);
  opacity: 0.6;
}
.afz-packages .afz-section-label { color: #8A6820; }
.afz-packages .afz-h2 { color: var(--cream-ink); }
.afz-packages .afz-h2 em { color: var(--g400); }
.afz-pkg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 52px; }
.afz-pkg {
  background: var(--cream-bg); border: 1px solid var(--cream-bdr);
  padding: 40px 34px; display: flex; flex-direction: column;
  transition: transform 0.35s var(--ease), box-shadow 0.35s var(--ease), border-color 0.35s;
  box-shadow: 0 2px 16px rgba(120,90,30,0.06); position: relative;
}
.afz-pkg:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(120,90,30,0.14); border-color: rgba(201,168,76,0.45); }
.afz-pkg.featured { background: var(--n900); border-color: rgba(201,168,76,0.35); box-shadow: 0 8px 40px rgba(0,0,0,0.25); }
.afz-pkg.featured:hover { border-color: var(--g400); box-shadow: 0 24px 60px rgba(0,0,0,0.35); }
.afz-pkg-badge { font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; padding: 4px 12px; width: fit-content; margin-bottom: 22px; font-weight: 500; }
.afz-pkg:not(.featured) .afz-pkg-badge { border: 1px solid var(--cream-bdr); color: var(--cream-ink3); background: var(--cream-100); }
.afz-pkg.featured .afz-pkg-badge { border: 1px solid var(--g400); color: var(--g400); background: rgba(201,168,76,0.08); }
.afz-pkg-name { font-family: var(--fd); font-size: 2rem; font-weight: 400; margin-bottom: 6px; }
.afz-pkg:not(.featured) .afz-pkg-name { color: var(--cream-ink); }
.afz-pkg.featured .afz-pkg-name { color: var(--w); }
.afz-pkg-tag { font-size: 0.75rem; margin-bottom: 26px; }
.afz-pkg:not(.featured) .afz-pkg-tag { color: var(--cream-ink3); }
.afz-pkg.featured .afz-pkg-tag { color: var(--w60); }
.afz-pkg-price { margin-bottom: 28px; padding-bottom: 24px; }
.afz-pkg:not(.featured) .afz-pkg-price { border-bottom: 1px solid var(--cream-bdr); }
.afz-pkg.featured .afz-pkg-price { border-bottom: 1px solid var(--w12); }
.afz-pkg-amount { font-family: var(--fd); font-size: 3rem; font-weight: 300; line-height: 1; }
.afz-pkg:not(.featured) .afz-pkg-amount { color: var(--cream-ink); }
.afz-pkg.featured .afz-pkg-amount { color: var(--g400); }
.afz-pkg-period { font-size: 0.68rem; letter-spacing: 0.08em; margin-top: 5px; }
.afz-pkg:not(.featured) .afz-pkg-period { color: var(--cream-bdr); }
.afz-pkg.featured .afz-pkg-period { color: var(--w30); }
.afz-pkg-features { list-style: none; display: flex; flex-direction: column; gap: 12px; flex: 1; margin-bottom: 32px; }
.afz-pkg-feat { display: flex; align-items: flex-start; gap: 11px; font-size: 0.79rem; line-height: 1.5; }
.afz-feat-on { color: #8A6820; flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.afz-feat-off { color: var(--cream-bdr); flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.afz-pkg.featured .afz-feat-on { color: var(--g400); }
.afz-pkg.featured .afz-feat-off { color: var(--w30); }
.afz-feat-label-on { color: var(--cream-ink2); }
.afz-feat-label-off { color: var(--cream-bdr); }
.afz-pkg.featured .afz-feat-label-on { color: var(--w80); }
.afz-pkg.featured .afz-feat-label-off { color: var(--w30); }
.afz-pkg-btn { width: 100%; padding: 13px 20px; font-family: var(--fb); font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
.afz-pkg:not(.featured) .afz-pkg-btn { background: transparent; border: 1px solid var(--cream-bdr); color: var(--cream-ink2); }
.afz-pkg:not(.featured) .afz-pkg-btn:hover { border-color: var(--g400); background: var(--cream-100); color: var(--cream-ink); }
.afz-pkg.featured .afz-pkg-btn { background: var(--g400); border: none; color: var(--n900); font-weight: 500; }
.afz-pkg.featured .afz-pkg-btn:hover { background: var(--g300); }

/* ── ACTIVITIES ──────────────────────────────────────────────── */
.afz-activities { background: var(--n800); }
.afz-act-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; margin-top: 52px; background: var(--w06); }
.afz-act-card { background: var(--n800); padding: 30px 24px; transition: background 0.3s; cursor: default; }
.afz-act-card:hover { background: var(--n750); }
.afz-act-card:hover .afz-act-name { color: var(--g300); }
.afz-act-icon { font-size: 1.5rem; margin-bottom: 14px; }
.afz-act-name { font-size: 0.84rem; font-weight: 500; color: var(--w); margin-bottom: 7px; transition: color 0.3s; }
.afz-act-desc { font-size: 0.73rem; color: var(--w60); line-height: 1.6; }

/* ── PROCESS ─────────────────────────────────────────────────── */
.afz-process { background: var(--n900); }
.afz-process-inner { max-width: 780px; margin: 52px auto 0; }
.afz-step { display: grid; grid-template-columns: 64px 1fr; gap: 28px; padding: 36px 0; border-bottom: 1px solid var(--w06); position: relative; }
.afz-step:last-child { border-bottom: none; }
.afz-step::before { content: ''; position: absolute; left: 31px; top: 84px; bottom: -36px; width: 1px; background: linear-gradient(to bottom, rgba(201,168,76,0.25), transparent); }
.afz-step:last-child::before { display: none; }
.afz-step-num { width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--g400); display: flex; align-items: center; justify-content: center; font-family: var(--fd); font-size: 0.92rem; color: var(--g400); background: var(--n900); position: relative; z-index: 1; flex-shrink: 0; }
.afz-step h3 { font-size: 0.96rem; font-weight: 500; color: var(--w); margin-bottom: 8px; }
.afz-step p { font-size: 0.81rem; color: var(--w60); line-height: 1.78; margin-bottom: 10px; }
.afz-step-time { font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--g400); margin-bottom: 12px; }
.afz-step-docs { display: flex; gap: 6px; flex-wrap: wrap; }
.afz-doc-tag { font-size: 0.62rem; padding: 4px 9px; border: 1px solid var(--w12); color: var(--w60); letter-spacing: 0.07em; }

/* ── DOCUMENTS ───────────────────────────────────────────────── */
.afz-documents { background: var(--n800); }
.afz-docs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 52px; }
.afz-doc-card { background: var(--n900); border: 1px solid var(--w06); padding: 22px 26px; display: flex; align-items: center; gap: 18px; transition: border-color 0.3s; }
.afz-doc-card:hover { border-color: rgba(201,168,76,0.2); }
.afz-doc-num { font-family: var(--fd); font-size: 1.9rem; font-weight: 300; color: rgba(201,168,76,0.18); min-width: 36px; line-height: 1; }
.afz-doc-title { font-size: 0.82rem; font-weight: 500; color: var(--w); margin-bottom: 4px; }
.afz-doc-desc { font-size: 0.72rem; color: var(--w60); line-height: 1.55; }

/* ── CALCULATOR ──────────────────────────────────────────────── */
.afz-calc { background: var(--n750); }
.afz-calc-inner { display: grid; grid-template-columns: 1.3fr 1fr; gap: 64px; align-items: start; margin-top: 52px; }
.afz-calc-form { display: flex; flex-direction: column; gap: 22px; }
.afz-calc-field { display: flex; flex-direction: column; gap: 7px; }
.afz-calc-label { font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--w60); }
.afz-calc-select { background: var(--n900); border: 1px solid var(--w12); color: var(--w); padding: 13px 16px; font-family: var(--fb); font-size: 0.83rem; font-weight: 300; outline: none; transition: border-color 0.3s; appearance: none; -webkit-appearance: none; cursor: pointer; }
.afz-calc-select:focus { border-color: var(--g400); }
.afz-calc-select option { background: var(--n800); }
.afz-toggle-row { display: flex; }
.afz-toggle { flex: 1; padding: 11px 10px; font-size: 0.66rem; letter-spacing: 0.12em; text-transform: uppercase; font-family: var(--fb); cursor: pointer; background: var(--n900); border: 1px solid var(--w12); color: var(--w60); transition: all 0.3s; margin-right: -1px; text-align: center; }
.afz-toggle.on { background: var(--glow2); border-color: var(--g400); color: var(--g400); position: relative; z-index: 1; }
.afz-result { background: var(--n900); border: 1px solid rgba(201,168,76,0.2); padding: 40px 36px; position: sticky; top: 90px; }
.afz-result-tag { font-size: 0.6rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--g400); margin-bottom: 22px; display: block; }
.afz-result-amount { font-family: var(--fd); font-size: 3.6rem; font-weight: 300; line-height: 1; color: var(--w); }
.afz-result-currency { color: var(--g400); }
.afz-result-note { font-size: 0.66rem; color: var(--w30); margin-top: 4px; margin-bottom: 28px; }
.afz-result-lines { border-top: 1px solid var(--w12); margin-bottom: 24px; }
.afz-result-line { display: flex; justify-content: space-between; padding: 11px 0; border-bottom: 1px solid var(--w06); font-size: 0.76rem; }
.afz-result-line-lbl { color: var(--w60); }
.afz-result-line-val { color: var(--w); font-weight: 500; }
.afz-result-total-row { display: flex; justify-content: space-between; padding: 14px 0 0; font-size: 0.86rem; }
.afz-result-disclaimer { font-size: 0.68rem; color: var(--w30); line-height: 1.65; margin-bottom: 22px; margin-top: 14px; }

/* ── FAQ ─────────────────────────────────────────────────────── */
.afz-faq { background: var(--n900); }
.afz-faq-inner { max-width: 820px; margin: 52px auto 0; }
.afz-faq-item { border-bottom: 1px solid var(--w06); }
.afz-faq-q { width: 100%; background: none; border: none; padding: 26px 0; display: flex; align-items: center; justify-content: space-between; gap: 24px; cursor: pointer; text-align: left; font-family: var(--fb); }
.afz-faq-q-text { font-size: 0.92rem; font-weight: 400; color: var(--w); line-height: 1.5; }
.afz-faq-icon { width: 26px; height: 26px; border: 1px solid var(--w12); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--g400); font-size: 1.1rem; flex-shrink: 0; transition: all 0.3s; }
.afz-faq-item.open .afz-faq-icon { background: var(--g400); color: var(--n900); border-color: var(--g400); transform: rotate(45deg); }
.afz-faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.45s var(--ease); }
.afz-faq-item.open .afz-faq-answer { max-height: 500px; }
.afz-faq-answer-inner { padding-bottom: 24px; }
.afz-faq-answer p { font-size: 0.83rem; color: var(--w60); line-height: 1.85; }
.afz-faq-answer ul { margin-top: 12px; list-style: none; display: flex; flex-direction: column; gap: 7px; }
.afz-faq-answer ul li { font-size: 0.8rem; color: var(--w60); padding-left: 18px; position: relative; line-height: 1.6; }
.afz-faq-answer ul li::before { content: '—'; position: absolute; left: 0; color: var(--g400); }

/* ── ADVISORY ────────────────────────────────────────────────── */
.afz-advisory { background: var(--n800); position: relative; overflow: hidden; }
.afz-advisory::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 70% at 50% 50%, rgba(201,168,76,0.04), transparent); pointer-events: none; }
.afz-advisory-inner { max-width: 900px; margin: 52px auto 0; position: relative; z-index: 1; }
.afz-advisory-quote { font-family: var(--fd); font-size: 1.35rem; font-weight: 300; color: var(--w80); line-height: 1.65; font-style: italic; text-align: center; padding: 40px 48px; border: 1px solid var(--w12); background: var(--n900); margin-bottom: 48px; }
.afz-advisory-quote strong { color: var(--g400); font-style: normal; }
.afz-advisory-quote-attr { margin-top: 18px; font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--g400); font-style: normal; }
.afz-advisory-tips { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 36px; }
.afz-tip { border: 1px solid var(--w06); padding: 30px 26px; transition: border-color 0.3s; }
.afz-tip:hover { border-color: rgba(201,168,76,0.2); }
.afz-tip-num { font-family: var(--fd); font-size: 0.68rem; letter-spacing: 0.22em; color: var(--g400); margin-bottom: 12px; display: block; }
.afz-tip h4 { font-size: 0.9rem; font-weight: 500; color: var(--w); margin-bottom: 9px; }
.afz-tip p { font-size: 0.78rem; color: var(--w60); line-height: 1.78; }
.afz-advisory-warning { background: rgba(201,168,76,0.05); border: 1px solid rgba(201,168,76,0.18); padding: 26px 30px; margin-bottom: 32px; }
.afz-advisory-warning h4 { font-size: 0.82rem; font-weight: 500; color: var(--g400); margin-bottom: 9px; }
.afz-advisory-warning p { font-size: 0.78rem; color: var(--w60); line-height: 1.78; }

/* ── CTA ─────────────────────────────────────────────────────── */
.afz-cta { background: var(--cream-bg); padding: 120px 60px; text-align: center; position: relative; overflow: hidden; }
.afz-cta::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(180,150,90,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(180,150,90,0.06) 1px, transparent 1px); background-size: 56px 56px; }
.afz-cta::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.10), transparent 70%); pointer-events: none; }
.afz-cta-inner { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }
.afz-cta .afz-section-label { color: #8A6820; text-align: center; }
.afz-cta h2 { font-family: var(--fd); font-size: clamp(2.4rem, 4.5vw, 4rem); font-weight: 300; color: var(--cream-ink); line-height: 1.15; margin-bottom: 18px; }
.afz-cta h2 em { color: var(--g400); font-style: italic; }
.afz-cta-divider { width: 44px; height: 1px; background: var(--g400); margin: 22px auto; opacity: 0.55; }
.afz-cta p { font-size: 0.83rem; color: var(--cream-ink3); line-height: 1.8; margin-bottom: 44px; }
.afz-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

/* ── BUTTONS ─────────────────────────────────────────────────── */
.afz-btn-gold { padding: 15px 36px; background: var(--g400); color: var(--n900); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.afz-btn-gold:hover { background: var(--g300); transform: translateY(-2px); }
.afz-btn-ghost { padding: 15px 36px; background: transparent; color: var(--w); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--w30); cursor: pointer; transition: all 0.3s; }
.afz-btn-ghost:hover { border-color: var(--g400); color: var(--g400); transform: translateY(-2px); }
.afz-btn-ink { padding: 15px 36px; background: var(--cream-ink); color: var(--cream-bg); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.afz-btn-ink:hover { background: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }
.afz-btn-cream-outline { padding: 15px 36px; background: transparent; color: var(--cream-ink2); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--cream-bdr); cursor: pointer; transition: all 0.3s; }
.afz-btn-cream-outline:hover { border-color: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }

/* ── FOOTER ──────────────────────────────────────────────────── */
.afz-footer { background: var(--n950); padding: 52px 60px; border-top: 1px solid var(--w06); }
.afz-footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
.afz-footer-logo { font-family: var(--fd); font-size: 1.3rem; letter-spacing: 0.15em; color: var(--w); }
.afz-footer-logo em { color: var(--g400); font-style: normal; }
.afz-footer-copy { font-size: 0.68rem; color: var(--w30); }
.afz-footer-back { padding: 9px 18px; background: transparent; border: 1px solid var(--w12); color: var(--w60); font-family: var(--fb); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
.afz-footer-back:hover { border-color: var(--g400); color: var(--g400); }

/* ── WA FLOAT ────────────────────────────────────────────────── */
.afz-wa { position: fixed; bottom: 28px; right: 28px; z-index: 300; width: 50px; height: 50px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 18px rgba(37,211,102,0.4); transition: transform 0.3s, box-shadow 0.3s; }
.afz-wa:hover { transform: scale(1.1); box-shadow: 0 6px 26px rgba(37,211,102,0.55); }

/* ── REVEAL ──────────────────────────────────────────────────── */
.afz-reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.8s var(--ease), transform 0.8s var(--ease); }
.afz-reveal.in { opacity: 1; transform: translateY(0); }
.ar1 { transition-delay: 0.08s; } .ar2 { transition-delay: 0.18s; }
.ar3 { transition-delay: 0.28s; } .ar4 { transition-delay: 0.38s; }

/* ── KEYFRAMES ───────────────────────────────────────────────── */
@keyframes afzFadeUp { to { opacity: 1; transform: translateY(0); } }
@keyframes afzScrollPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
@keyframes afzBlink { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.75); } }

/* ── RESPONSIVE ──────────────────────────────────────────────── */
@media(max-width:1100px) {
  .afz-hero { grid-template-columns: 1fr; }
  .afz-hero-right { display: none; }
  .afz-intro-grid { grid-template-columns: 1fr; gap: 48px; }
  .afz-pkg-grid { grid-template-columns: 1fr; max-width: 480px; }
  .afz-act-grid { grid-template-columns: repeat(3, 1fr); }
  .afz-calc-inner { grid-template-columns: 1fr; }
  .afz-result { position: static; }
  .afz-advisory-tips { grid-template-columns: 1fr; }
}
@media(max-width:768px) {
  .afz-nav { padding: 16px 24px; } .afz-nav.scrolled { padding: 12px 24px; } .afz-nav-links { display: none; }
  .afz-hero { padding: 0 24px 72px; }
  .afz-back-btn { left: 24px; }
  .afz-section { padding: 68px 24px; }
  .afz-stats { grid-template-columns: repeat(3, 1fr); }
  .afz-act-grid { grid-template-columns: repeat(2, 1fr); }
  .afz-docs-grid { grid-template-columns: 1fr; }
  .afz-footer { padding: 40px 24px; }
  .afz-cta { padding: 80px 24px; }
}
@media(max-width:480px) {
  .afz-stats { grid-template-columns: repeat(2, 1fr); }
  .afz-act-grid { grid-template-columns: 1fr; }
  .afz-hero-h1 { font-size: 4.5rem; }
}

  .afz-nav-hamburger {
    display: none; flex-direction: column; gap: 5px; cursor: pointer;
    background: none; border: none; padding: 6px; z-index: 310;
  }
  .afz-nav-hamburger span {
    display: block; width: 24px; height: 1.5px; background: rgba(248,245,238,0.6);
    transition: all 0.35s cubic-bezier(0.16,1,0.3,1); transform-origin: center;
  }
  .afz-nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: #C9A84C; }
  .afz-nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .afz-nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: #C9A84C; }
  .afz-drawer {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(3,10,20,0.97); backdrop-filter: blur(24px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    transform: translateX(100%); transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
    pointer-events: none;
  }
  .afz-drawer.open { transform: translateX(0); pointer-events: all; }
  .afz-drawer-brand {
    font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.3rem;
    letter-spacing: .18em; color: #F8F5EE; margin-bottom: 44px;
    opacity: 0; transform: translateY(10px);
    transition: opacity .4s .1s, transform .4s .1s;
  }
  .afz-drawer.open .afz-drawer-brand { opacity: 1; transform: translateY(0); }
  .afz-drawer-brand em { color: #C9A84C; font-style: normal; }
  .afz-dlink {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2rem, 8vw, 3rem); font-weight: 300; color: rgba(248,245,238,0.6);
    background: none; border: none; padding: 10px 0; cursor: pointer;
    display: block; width: 100%; text-align: center;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, opacity .4s cubic-bezier(0.16,1,0.3,1), transform .4s cubic-bezier(0.16,1,0.3,1);
  }
  .afz-drawer.open .afz-dlink { opacity: 1; transform: translateY(0); }
  .afz-drawer.open .afz-dlink:nth-of-type(1) { transition-delay: .12s; }
  .afz-drawer.open .afz-dlink:nth-of-type(2) { transition-delay: .17s; }
  .afz-drawer.open .afz-dlink:nth-of-type(3) { transition-delay: .22s; }
  .afz-drawer.open .afz-dlink:nth-of-type(4) { transition-delay: .27s; }
  .afz-drawer.open .afz-dlink:nth-of-type(5) { transition-delay: .32s; }
  .afz-dlink:hover { color: #C9A84C; }
  .afz-drawer-div { width: 40px; height: 1px; background: rgba(201,168,76,.25); margin: 18px 0; opacity: 0; transition: opacity .4s .34s; }
  .afz-drawer.open .afz-drawer-div { opacity: 1; }
  .afz-dcta {
    font-family: 'DM Sans', sans-serif; font-size: .7rem; letter-spacing: .18em;
    text-transform: uppercase; color: #C9A84C; border: 1px solid #C9A84C;
    background: none; padding: 12px 32px; cursor: pointer; margin-top: 8px;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, background .3s, opacity .4s .38s, transform .4s .38s;
  }
  .afz-drawer.open .afz-dcta { opacity: 1; transform: translateY(0); }
  .afz-dcta:hover { background: #C9A84C; color: #05111e; }
  @media (max-width: 900px) {
    .afz-nav-links { display: none; }
    .afz-nav-cta { display: none !important; }
    .afz-nav-hamburger { display: flex; }
  }
`;

// ── DATA ──────────────────────────────────────────────────────
const STATS = [
  { v:"10,000+", k:"Companies" }, { v:"3–5", k:"Setup Days" },
  { v:"100%", k:"Foreign Ownership" }, { v:"0%", k:"Income Tax" },
  { v:"AED 5,500", k:"Starting Cost" }, { v:"Ajman", k:"Northern Emirates" },
];

const ACTIVITIES = [
  { i:IArrowsExchange, n:"General Trading", d:"Multi-product import, export, and re-export trading across all commodity categories" },
  { i:IBriefcase, n:"Consulting & Advisory", d:"Business consulting, management advisory, strategy and professional services" },
  { i:IMonitor, n:"IT & Technology", d:"Software development, IT services, tech consulting and digital solutions" },
  { i:IGear, n:"Light Manufacturing", d:"Assembly, processing, light industrial production and product finishing" },
  { i:IPackage, n:"Warehousing & Storage", d:"Goods storage, inventory management, fulfilment and distribution services" },
  { i:IPenTool, n:"Creative & Design", d:"Graphic design, branding, marketing materials and creative production" },
  { i:IWrench, n:"Construction & Contracting", d:"Construction consulting, contracting services and building materials trading" },
  { i:ILeaf, n:"Food & Agriculture", d:"Food processing, agricultural trading, spices, grains and commodity trading" },
  { i:ICar, n:"Automobile Trading", d:"Car trading, spare parts, auto accessories and vehicle services" },
  { i:ICross, n:"Healthcare & Pharma", d:"Medical equipment, pharmaceutical products and healthcare consultancy" },
  { i:IBookOpen, n:"Education & Training", d:"Training institutes, e-learning, educational content and skills development" },
  { i:IShoppingBag, n:"E-Commerce", d:"Online retail, dropshipping, digital marketplaces and cross-border commerce" },
];

const STEPS = [
  { n:"01", t:"Consultation & Activity Selection", d:"We assess your business model and map it to AFZ's activity list — keeping your license lean and cost-effective. AFZ's streamlined process starts with choosing the right activities from day one.", time:"Day 1", docs:["Passport Copy","Business Overview"] },
  { n:"02", t:"Trade Name Reservation", d:"Your preferred company name is submitted to Ajman Free Zone authority. AFZ maintains a fast digital name approval process — typically same-day confirmation.", time:"Day 1", docs:["Name Options","Shareholder Details"] },
  { n:"03", t:"License Application Submission", d:"Complete application submitted digitally to AFZ — one of the UAE's most streamlined free zone authorities. Known for minimal bureaucracy and fast turnaround.", time:"Day 1–2", docs:["Application Form","Passport Copies","KYC Documents"] },
  { n:"04", t:"AFZ Authority Approval", d:"Authority review and approval. AFZ is one of the fastest free zones in the UAE — standard approvals typically within 1–2 working days from submission.", time:"Day 2–3", docs:["Activity Approvals"] },
  { n:"05", t:"License & Corporate Document Issuance", d:"Trade license, MOA, Share Certificates, and Company Stamp issued. AFZ often delivers all corporate documents within 3–5 days total — among the fastest in the UAE.", time:"Day 3–5", docs:["Trade License","MOA","Share Certificates","Company Stamp"] },
  { n:"06", t:"Investor Visa Processing", d:"Entry permit, medical fitness, biometrics, and Emirates ID — managed by INCOZONE's PRO team. Full UAE residence visa identical in rights to any other emirate.", time:"Day 5–18", docs:["Visa Application","Medical Test","Emirates ID"] },
  { n:"07", t:"Bank Account Opening", d:"Introduction to UAE banking partners. INCOZONE prepares a complete documentation package to maximise your account approval chances.", time:"Day 18–32", docs:["Bank Application","Company Docs","Source of Funds"] },
];

const DOCUMENTS = [
  { t:"Passport Copies", d:"Valid passport copies for all shareholders and directors — minimum 6 months validity" },
  { t:"Passport-size Photographs", d:"White background, recent photographs for all shareholders and visa applicants" },
  { t:"Residential Address Proof", d:"Utility bill or bank statement — not older than 3 months" },
  { t:"Business Overview", d:"Brief description of your planned business activities and UAE objectives" },
  { t:"Source of Funds Declaration", d:"Bank statement or letter confirming the origin of your investment capital" },
  { t:"NOC from Employer", d:"Required only if currently employed in the UAE under an active residence visa" },
  { t:"Corporate Documents", d:"For corporate shareholders: Certificate of Incorporation, MOA, Board Resolution" },
  { t:"KYC Form", d:"AFZ standard Know Your Customer form — completed and signed by all shareholders" },
];

const FAQS = [
  { q:"What is AFZ and why is it the most affordable UAE free zone?", a:"AFZ (Ajman Free Zone) is one of the UAE's oldest and most established free zones, founded in 1988 in the Emirate of Ajman. Its pricing is the most competitive in the UAE — starting from AED 5,500 — because Ajman's lower cost base allows AFZ to offer the same legal structure, 100% foreign ownership, and UAE residency rights as Dubai zones at a fraction of the cost." },
  { q:"Do I get a real UAE residence visa through AFZ?", a:"Yes — your AFZ investor visa is a full UAE residence visa. Emirates ID, residency stamp, UAE residency rights, and banking access are identical to a visa issued through DMCC, IFZA, or any Dubai free zone. The Ajman location has zero effect on the validity or recognition of your UAE residency.", list:["Same Emirates ID as any UAE resident","Same bank account opening rights","Same UAE residency duration (2–3 years)","Same travel and re-entry rights"] },
  { q:"Can I open a UAE bank account with an AFZ company?", a:"Yes. AFZ companies can open accounts at all major UAE banks including Emirates NBD, Mashreq, FAB, ADCB, and RAKBank. The key factors are your source of funds documentation, business plan, and personal banking history — not the free zone. INCOZONE prepares a complete banking package tailored to your business model." },
  { q:"How does AFZ compare to RAKEZ for budget-conscious setups?", a:"Both are highly affordable. AFZ starts lower (AED 5,500 vs RAKEZ AED 8,500) but RAKEZ offers stronger industrial infrastructure — warehouses, port access at Saqr Port, and manufacturing facilities. For pure service businesses, consulting, trading, and tech companies, AFZ's lower cost is the decisive advantage. For businesses needing physical industrial space, RAKEZ adds more value." },
  { q:"Can AFZ companies do business in Dubai and Abu Dhabi?", a:"Yes — AFZ companies can provide services to clients across all UAE emirates including Dubai, Abu Dhabi, and Sharjah. There are no restrictions on who you can serve. The only limitation is physically operating a retail or consumer-facing establishment on the mainland, which requires a mainland license." },
  { q:"Is AFZ suitable for e-commerce and online businesses?", a:"Yes — AFZ explicitly licenses e-commerce and digital commerce activities. For online businesses operating from the UAE, AFZ is one of the most cost-effective options available. Combined with a UAE residence visa and bank account, it provides everything needed to operate a legitimate online business." },
  { q:"What is the annual renewal cost for AFZ?", a:"AFZ annual renewal typically ranges from AED 4,500 to AED 8,000 depending on your license type, activities, and office arrangement — the lowest annual renewal of any UAE free zone. This makes AFZ particularly attractive for businesses watching ongoing operational costs, not just setup fees." },
  { q:"How long does AFZ setup actually take?", a:"AFZ is one of the fastest free zones in the UAE — license issuance typically within 3–5 working days. Combined with INCOZONE's preparation, most clients receive their full corporate documents within one week of starting the process. Visa and bank account steps follow sequentially." },
  { q:"Can I set up AFZ remotely without visiting the UAE?", a:"Yes — AFZ license formation can be completed remotely. Visa biometric registration and bank account opening require a UAE visit. INCOZONE coordinates a single efficient visit to complete both steps simultaneously, minimising your time in the UAE." },
  { q:"What are the most popular business activities on an AFZ license?", a:"The most commonly licensed activities at AFZ include:", list:["General Trading (multi-commodity)","IT & Software Consulting","Business & Management Consulting","E-Commerce & Online Retail","Marketing & Digital Services","Construction Materials Trading","Food & Agricultural Trading","Healthcare & Medical Equipment"] },
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
  return <canvas ref={ref} className="afz-hero-canvas" style={{ width: "100%", height: "100%" }} />;
}

// ── SCROLL REVEAL ──────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".afz-reveal");
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
  const pkgC = { starter: 5500, business: 9900, pro_pkg: 15500 };
  const offC = { virtual: 0, flexi: 1800, office: 4500, warehouse: 9000 };
  const visC = { "0": 0, "1": 0, "3": 2200, "5": 4000 };
  const total = (pkgC[pkg] || 0) + (offC[off] || 0) + (visC[vis] || 0) + (pro ? 2500 : 0) + (bnk ? 2000 : 0);
  const f = n => "AED " + n.toLocaleString();
  return (
    <div className="afz-calc-inner">
      <div>
        <h2 className="afz-h2 afz-reveal">Build Your <em>Custom Package</em></h2>
        <p className="afz-reveal ar1" style={{ fontSize: "0.84rem", color: "var(--w60)", margin: "12px 0 36px" }}>Configure your AFZ requirements and get an instant cost breakdown.</p>
        <div className="afz-calc-form">
          {[
            { l: "License Package", id: "pkg", val: pkg, set: setPkg, opts: [["starter","Starter (AED 5,500)"],["business","Business (AED 9,900)"],["pro_pkg","Pro (AED 15,500)"]] },
            { l: "Office / Workspace", id: "off", val: off, set: setOff, opts: [["virtual","Virtual Office (Included)"],["flexi","Flexi Desk (+AED 1,800/yr)"],["office","Private Office (+AED 4,500/yr)"],["warehouse","Warehouse (+AED 9,000/yr)"]] },
            { l: "Visa Allocation", id: "vis", val: vis, set: setVis, opts: [["0","No Visas"],["1","1 Visa (Included)"],["3","3 Visas (+AED 2,200)"],["5","5 Visas (+AED 4,000)"]] },
          ].map(({ l, id, val, set, opts }) => (
            <div className="afz-calc-field afz-reveal" key={id}>
              <label className="afz-calc-label">{l}</label>
              <select className="afz-calc-select" value={val} onChange={e => set(e.target.value)}>
                {opts.map(([v, lab]) => <option key={v} value={v}>{lab}</option>)}
              </select>
            </div>
          ))}
          <div className="afz-calc-field afz-reveal">
            <label className="afz-calc-label">PRO & Government Services</label>
            <div className="afz-toggle-row">
              <button className={`afz-toggle${!pro ? " on" : ""}`} onClick={() => setPro(false)}>Not Required</button>
              <button className={`afz-toggle${pro ? " on" : ""}`} onClick={() => setPro(true)}>Add PRO (+AED 2,500)</button>
            </div>
          </div>
          <div className="afz-calc-field afz-reveal">
            <label className="afz-calc-label">Banking Assistance</label>
            <div className="afz-toggle-row">
              <button className={`afz-toggle${!bnk ? " on" : ""}`} onClick={() => setBnk(false)}>Not Required</button>
              <button className={`afz-toggle${bnk ? " on" : ""}`} onClick={() => setBnk(true)}>Add Banking (+AED 2,000)</button>
            </div>
          </div>
        </div>
      </div>
      <div className="afz-result afz-reveal">
        <span className="afz-result-tag">Estimated Total</span>
        <div className="afz-result-amount"><span className="afz-result-currency">AED </span>{total.toLocaleString()}</div>
        <div className="afz-result-note">One-time cost · excludes annual renewal</div>
        <div className="afz-result-lines">
          <div className="afz-result-line"><span className="afz-result-line-lbl">Base License Fee</span><span className="afz-result-line-val">{f(pkgC[pkg])}</span></div>
          {offC[off] > 0 && <div className="afz-result-line"><span className="afz-result-line-lbl">Office (Annual)</span><span className="afz-result-line-val">+{f(offC[off])}</span></div>}
          {visC[vis] > 0 && <div className="afz-result-line"><span className="afz-result-line-lbl">Visa Processing</span><span className="afz-result-line-val">+{f(visC[vis])}</span></div>}
          {pro && <div className="afz-result-line"><span className="afz-result-line-lbl">PRO Services</span><span className="afz-result-line-val">+{f(2500)}</span></div>}
          {bnk && <div className="afz-result-line"><span className="afz-result-line-lbl">Banking Assistance</span><span className="afz-result-line-val">+{f(2000)}</span></div>}
        </div>
        <div className="afz-result-total-row"><span style={{ color: "var(--w)", fontWeight: 500 }}>Total Estimate</span><span style={{ color: "var(--g400)", fontWeight: 600 }}>{f(total)}</span></div>
        <p className="afz-result-disclaimer">Estimate only. Final costs depend on current authority fees and specific requirements.</p>
        <button className="afz-btn-gold" style={{ width: "100%" }}>Get Exact Quote →</button>
      </div>
    </div>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────
export default function AFZPage({ onBack, onNavigate }) {
  const [_afzOpen, setafzOpen] = useState(false);
  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = _afzOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [_afzOpen]);

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
    <div className="afz-root">
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className={`afz-nav${scrolled ? " scrolled" : ""}`}>
        <div className="afz-nav-logo" onClick={()=>{if(onNavigate){onNavigate("home");window.scrollTo(0,0);}}}>INCO<em>ZONE</em></div>
        <ul className="afz-nav-links">{["Services","Free Zones","About","Blog","Contact"].map(l=>{const pgMap={"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};return <li key={l}><a href="#" onClick={e=>{e.preventDefault();if(onNavigate){onNavigate(pgMap[l]);window.scrollTo(0,0);}}}>{ l}</a></li>;})}</ul>
        <button className="afz-nav-cta" onClick={()=>{if(onNavigate){onNavigate("schedule");window.scrollTo(0,0);}}}>Schedule Consultation</button>
      
        {/* Hamburger */}
        <button
          className={`afz-nav-hamburger${_afzOpen ? " open" : ""}`}
          onClick={() => setafzOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`afz-drawer${_afzOpen ? " open" : ""}`}>
        <div className="afz-drawer-brand"
          onClick={() => { setafzOpen(false); if(onNavigate) { onNavigate("home"); window.scrollTo(0,0); } }}>
          INCO<em>ZONE</em>
        </div>
        {["Services","Free Zones","About","Blog","Contact"].map((l) => {
          const pm = {"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};
          return (
            <button key={l} className="afz-dlink"
              onClick={() => { setafzOpen(false); if(onNavigate) { onNavigate(pm[l]); window.scrollTo(0,0); } }}>
              {l}
            </button>
          );
        })}
        <div className="afz-drawer-div" />
        <button className="afz-dcta"
          onClick={() => { setafzOpen(false); if(onNavigate) { onNavigate("schedule"); window.scrollTo(0,0); } }}>
          Schedule Consultation
        </button>
      </div>

      {/* ── HERO ── */}
      <div className="afz-hero">
        <HeroCanvas />
        <button className="afz-back-btn" onClick={onBack}>Back to Free Zones</button>

        <div className="afz-hero-left">
          <div className="afz-hero-eyebrow">
            <div className="afz-hero-eyebrow-dot" />
            Budget-Friendly · Ajman, Northern UAE
          </div>
          <h1 className="afz-hero-h1">AFZ<em>Free Zone</em></h1>
          <div className="afz-hero-fullname">Ajman Free Zone — UAE's Most Affordable Setup</div>
          <p className="afz-hero-desc">
            The UAE's lowest-cost free zone — full legal standing, 100% foreign ownership, and a genuine UAE residence visa starting from just <strong style={{ color: "var(--g300)" }}>AED 5,500.</strong> Everything you need, nothing you don't.
          </p>
          <div className="afz-hero-actions">
            <button className="afz-btn-gold">Start AFZ Setup →</button>
            <button className="afz-btn-ghost">Download Free Guide</button>
          </div>
        </div>

        <div className="afz-hero-right">
          <div className="afz-hero-card">
            <span className="afz-hero-card-label">Quick Reference</span>
            {[
              ["Location","Ajman, UAE"], ["Setup From","AED 5,500","gold"],
              ["Setup Time","3–5 Days","gold"], ["Min. Capital","Not Required"],
              ["Ownership","100% Foreign","gold"], ["Visa Quota","Up to 5"],
              ["Annual Renewal","AED 4.5–8K"], ["Tax","0% Personal"],
            ].map(([l, v, cls]) => (
              <div className="afz-hero-card-row" key={l}>
                <span>{l}</span><span className={cls || ""}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="afz-scroll-hint"><span>Scroll</span><div className="afz-scroll-line" /></div>
      </div>

      {/* ── STATS ── */}
      <div className="afz-stats">
        {STATS.map((s, i) => (
          <div className="afz-stat" key={i}>
            <span className="afz-stat-val">{s.v}</span>
            <span className="afz-stat-key">{s.k}</span>
          </div>
        ))}
      </div>

      {/* ── INTRO ── */}
      <div className="afz-intro afz-section">
        <span className="afz-section-label afz-reveal">Zone Overview</span>
        <h2 className="afz-h2 afz-reveal ar1" style={{ maxWidth: "640px" }}>The UAE's Most<br /><em>Accessible Entry Point</em></h2>
        <div className="afz-intro-grid">
          <div className="afz-intro-text">
            <p className="afz-reveal ar1"><strong>Ajman Free Zone (AFZ)</strong> is one of the UAE's oldest free zones, established in 1988. It has built a reputation as the most cost-effective legitimate free zone in the UAE — offering the same legal framework, 100% foreign ownership, and full UAE residency rights as any Dubai free zone, at the lowest possible price point.</p>
            <p className="afz-reveal ar2">With over <strong>10,000 companies</strong> from more than 100 countries, AFZ has proven that an affordable setup does not mean a lesser one. The zone supports trading, services, consulting, technology, manufacturing, and e-commerce — covering the majority of what most small and medium-sized businesses actually need.</p>
            <p className="afz-reveal ar3">AFZ's location in Ajman — the UAE's smallest emirate, 25 minutes from Dubai — keeps costs low without compromising on the substance of what a UAE free zone provides. Your <strong>UAE residence visa, Emirates ID, and corporate banking rights</strong> are identical to those of a business established anywhere else in the UAE.</p>
            <p className="afz-reveal ar3">For entrepreneurs, freelancers, consultants, and small business owners who need a <strong>legitimate UAE company and residence visa at the lowest possible cost</strong>, AFZ is the honest answer. INCOZONE recommends AFZ when it is genuinely the right fit — and will always say so clearly.</p>
          </div>
          <div className="afz-reveal ar2">
            <div className="afz-pillars">
              {[
                { i:ITag, h:"UAE's Lowest Setup Cost", p:"Starting from AED 5,500 — the most affordable legitimate free zone setup in the UAE. Annual renewal from AED 4,500 keeps your ongoing costs minimal. Full legal standing, same tax benefits, same ownership rights." },
                { i:IClock, h:"3 to 5 Day Setup", p:"Among the fastest free zone setups in the UAE. AFZ's streamlined digital process means license issuance within 3–5 working days from document submission — one of the quickest turnarounds available." },
                { i:IIdCard, h:"Full UAE Residence Visa", p:"Your AFZ investor visa is a genuine UAE residence visa — Emirates ID, residency rights, and banking access identical to any Dubai free zone visa. The Ajman location does not affect visa quality or recognition." },
                { i:ILaptop, h:"Flexible Workspace Options", p:"Virtual offices for remote businesses, flexi desks for occasional use, private offices for established teams, and warehouse units for businesses with physical inventory needs." },
                { i:IGrid, h:"1,500+ Licensed Activities", p:"AFZ supports over 1,500 business activities including general trading, consulting, technology, e-commerce, manufacturing, food trading, and healthcare — broad enough to cover almost any legitimate business model." },
              ].map((p, i) => (
                <div className="afz-pillar" key={i}>
                  <div className="afz-pillar-icon">{p.i}</div>
                  <div><h4>{p.h}</h4><p>{p.p}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PACKAGES ── */}
      <div className="afz-packages afz-section">
        <span className="afz-section-label afz-reveal">Setup Packages</span>
        <h2 className="afz-h2 afz-reveal ar1">Choose Your <em>AFZ Package</em></h2>
        <p className="afz-reveal ar2" style={{ fontSize: "0.84rem", color: "var(--cream-ink3)", marginTop: "10px", maxWidth: "520px" }}>All packages include full company incorporation, trade license, and corporate documents. The UAE's most affordable all-inclusive packages.</p>
        <div className="afz-pkg-grid">
          {[
            { name:"Starter", tag:"Solo operators & freelancers", price:"5,500", badge:"Lowest in UAE", featured:false, feats:[["1 Business Activity",true],["Virtual Office (UAE Address)",true],["1 Investor Visa",true],["Company Stamp & MOA",true],["Bank Account Assistance",false],["Dedicated Account Manager",false]] },
            { name:"Business", tag:"SMEs, traders & consultants", price:"9,900", badge:"Most Popular", featured:true, feats:[["3 Business Activities",true],["Flexi Desk / Office Access",true],["3 Investor Visas",true],["Full Corporate Documents",true],["Bank Account Assistance",true],["Dedicated Account Manager",false]] },
            { name:"Pro", tag:"Established businesses & teams", price:"15,500", badge:"Full Service", featured:false, feats:[["Unlimited Activities",true],["Private Office",true],["5 Investor Visas",true],["Full Corporate Documents",true],["Priority Bank Account Setup",true],["Dedicated Account Manager",true]] },
          ].map((pkg, i) => (
            <div className={`afz-pkg afz-reveal ar${i+1}${pkg.featured ? " featured" : ""}`} key={i}>
              <div className="afz-pkg-badge">{pkg.badge}</div>
              <div className="afz-pkg-name">{pkg.name}</div>
              <p className="afz-pkg-tag">{pkg.tag}</p>
              <div className="afz-pkg-price">
                <div className="afz-pkg-amount">AED {pkg.price}</div>
                <div className="afz-pkg-period">One-time setup · excludes annual renewal</div>
              </div>
              <ul className="afz-pkg-features">
                {pkg.feats.map(([t, on], j) => (
                  <li className="afz-pkg-feat" key={j}>
                    <span className={on ? "afz-feat-on" : "afz-feat-off"}>{on ? "" : "×"}</span>
                    <span className={on ? "afz-feat-label-on" : "afz-feat-label-off"}>{t}</span>
                  </li>
                ))}
              </ul>
              <button className="afz-pkg-btn">{pkg.featured ? "Select This Package →" : "Get Started →"}</button>
            </div>
          ))}
        </div>
      </div>

      {/* ── ACTIVITIES ── */}
      <div className="afz-activities afz-section">
        <span className="afz-section-label afz-reveal">Licensed Activities</span>
        <h2 className="afz-h2 afz-reveal ar1">What Can You Do <em>Under AFZ?</em></h2>
        <p className="afz-reveal ar2" style={{ fontSize: "0.83rem", color: "var(--w60)", marginTop: "10px", maxWidth: "580px" }}>AFZ supports 1,500+ business activities across trading, services, and light industry:</p>
        <div className="afz-act-grid">
          {ACTIVITIES.map((a, i) => (
            <div className={`afz-act-card afz-reveal ar${(i%4)+1}`} key={i}>
              <div className="afz-act-icon">{a.i}</div>
              <div className="afz-act-name">{a.n}</div>
              <div className="afz-act-desc">{a.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROCESS ── */}
      <div className="afz-process afz-section">
        <span className="afz-section-label afz-reveal" style={{ textAlign: "center", display: "block" }}>Setup Process</span>
        <h2 className="afz-h2 afz-reveal ar1" style={{ textAlign: "center" }}>Your AFZ <em>Journey — Step by Step</em></h2>
        <div className="afz-process-inner">
          {STEPS.map((s, i) => (
            <div className={`afz-step afz-reveal ar${(i%4)+1}`} key={i}>
              <div className="afz-step-num">{s.n}</div>
              <div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <div className="afz-step-time">{s.time}</div>
                <div className="afz-step-docs">{s.docs.map(d => <span className="afz-doc-tag" key={d}>{d}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DOCUMENTS ── */}
      <div className="afz-documents afz-section">
        <span className="afz-section-label afz-reveal">Required Documents</span>
        <h2 className="afz-h2 afz-reveal ar1">What You <em>Need to Prepare</em></h2>
        <p className="afz-reveal ar2" style={{ fontSize: "0.83rem", color: "var(--w60)", marginTop: "10px" }}>AFZ has the simplest document checklist of any UAE free zone:</p>
        <div className="afz-docs-grid">
          {DOCUMENTS.map((d, i) => (
            <div className={`afz-doc-card afz-reveal ar${(i%2)+1}`} key={i}>
              <div className="afz-doc-num">0{i+1}</div>
              <div><div className="afz-doc-title">{d.t}</div><div className="afz-doc-desc">{d.d}</div></div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CALCULATOR ── */}
      <div className="afz-calc afz-section">
        <span className="afz-section-label afz-reveal">Cost Estimator</span>
        <Calculator />
      </div>

      {/* ── FAQ ── */}
      <div className="afz-faq afz-section">
        <span className="afz-section-label afz-reveal" style={{ textAlign: "center", display: "block" }}>FAQ</span>
        <h2 className="afz-h2 afz-reveal ar1" style={{ textAlign: "center" }}>Frequently Asked <em>Questions</em></h2>
        <div className="afz-faq-inner">
          {FAQS.map((f, i) => (
            <div className={`afz-faq-item afz-reveal ar${(i%3)+1}${openFaq===i ? " open" : ""}`} key={i}>
              <button className="afz-faq-q" onClick={() => setOpenFaq(openFaq===i ? null : i)}>
                <span className="afz-faq-q-text">{f.q}</span>
                <div className="afz-faq-icon">+</div>
              </button>
              <div className="afz-faq-answer">
                <div className="afz-faq-answer-inner">
                  <p>{f.a}</p>
                  {f.list && <ul>{f.list.map(li => <li key={li}>{li}</li>)}</ul>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ADVISORY ── */}
      <div className="afz-advisory afz-section">
        <span className="afz-section-label afz-reveal" style={{ textAlign: "center", display: "block" }}>INCOZONE Advisory</span>
        <h2 className="afz-h2 afz-reveal ar1" style={{ textAlign: "center" }}>Expert Advice Before <em>You Decide</em></h2>
        <div className="afz-advisory-inner">
          <div className="afz-advisory-quote afz-reveal ar2">
            "AFZ is the answer we give clients who ask: do I really need to spend AED 18,000 on a DMCC license?{" "}
            <strong>For many businesses — consultants, freelancers, e-commerce operators, small traders — the honest answer is no. AFZ gives you everything that legally and practically matters: a UAE company, a UAE residence visa, and a UAE bank account. At the lowest cost available anywhere in the UAE.</strong>"
            <div className="afz-advisory-quote-attr">— INCOZONE Advisory Team</div>
          </div>
          <div className="afz-advisory-tips">
            {[
              { n:"01", t:"Ajman Address — Does It Matter?", p:"For most businesses, no. If you are a consultant, tech company, e-commerce operator, or trader, your clients care about your work — not your registered address. However, if your business requires a prestigious Dubai address for specific client-facing or regulatory reasons, Meydan or DMCC may be more appropriate. INCOZONE will tell you honestly." },
              { n:"02", t:"Visa Quality Is Identical", p:"Your AFZ investor visa is the same UAE residence visa as one issued through DMCC. Same duration, same Emirates ID, same banking rights, same travel benefits. The Ajman location appears nowhere on your Emirates ID — it simply states 'United Arab Emirates'." },
              { n:"03", t:"Banking with AFZ", p:"AFZ companies can open accounts at all major UAE banks. The key variable is your business plan and source of funds — not which free zone you chose. INCOZONE prepares a tailored banking package for every client, which dramatically improves approval rates regardless of the zone." },
              { n:"04", t:"When to Upgrade Later", p:"Starting with AFZ doesn't lock you in. Many clients begin with AFZ for UAE residency and banking access, then upgrade to a Dubai free zone as their business grows and a premium address becomes commercially relevant. INCOZONE structures this migration efficiently when the time comes." },
            ].map((tip, i) => (
              <div className={`afz-tip afz-reveal ar${(i%2)+1}`} key={i}>
                <span className="afz-tip-num">{tip.n}</span>
                <h4>{tip.t}</h4>
                <p>{tip.p}</p>
              </div>
            ))}
          </div>
          <div className="afz-advisory-warning afz-reveal">
            <h4> When AFZ Might Not Be the Best Fit</h4>
            <p>Consider alternatives if: your clients specifically require a Dubai or Abu Dhabi registered address — Meydan or IFZA offer better value at moderate cost · your business requires industrial infrastructure, warehousing, or port access — RAKEZ or JAFZA are more appropriate · you are in media and creative industries — SHAMS is purpose-built for your activities · you need financial services licensing — ADGM is the only option · or your business model requires maximum visa allocation beyond 5 — JAFZA or DMCC support larger teams. INCOZONE always recommends based on your situation, not on margins.</p>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="afz-cta">
        <div className="afz-cta-inner">
          <span className="afz-section-label afz-reveal">Begin Your Journey</span>
          <h2 className="afz-reveal ar1">Start Your UAE Business<br /><em>The Smart Way.</em></h2>
          <div className="afz-cta-divider" />
          <p className="afz-reveal ar2">
            Schedule a private consultation. No obligation. If AFZ is right for your situation, we will tell you. If another zone serves you better, we will tell you that too.
          </p>
          <div className="afz-cta-btns afz-reveal ar3">
            <button className="afz-btn-ink">Schedule Private Consultation</button>
            <button className="afz-btn-cream-outline" onClick={onBack}>← Explore Other Zones</button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="afz-footer">
        <div className="afz-footer-inner">
          <div className="afz-footer-logo">INCO<em>ZONE</em></div>
          <div className="afz-footer-copy">© 2025 INCOZONE. All rights reserved. Dubai, UAE.</div>
          <button className="afz-footer-back" onClick={onBack}>← Back to Free Zones</button>
        </div>
      </div>

      {/* ── WA FLOAT ── */}
      <div className="afz-wa" onClick={()=>window.open("https://wa.me/971565834586","_blank")}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </div>
    </div>
  );
}
