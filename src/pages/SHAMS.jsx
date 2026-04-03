import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — SHAMS Free Zone Page  (standalone, self-contained)
//  Drop into: src/pages/SHAMS.jsx
//  Same structure & palette as DMCC.jsx — only content differs
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

.sms-root *, .sms-root *::before, .sms-root *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}
.sms-root {
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
.sms-nav {
  position: fixed; inset-inline: 0; top: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 60px;
  transition: background 0.5s, padding 0.4s, border-color 0.5s;
  border-bottom: 1px solid transparent;
}
.sms-nav.scrolled {
  background: rgba(5,17,30,0.96); backdrop-filter: blur(20px);
  padding: 14px 60px; border-bottom-color: rgba(201,168,76,0.12);
}
.sms-nav-logo { font-family: var(--fd); font-size: 1.5rem; font-weight: 500; letter-spacing: 0.15em; color: var(--w); cursor: pointer; }
.sms-nav-logo em { color: var(--g400); font-style: normal; }
.sms-nav-links { display: flex; gap: 36px; list-style: none; }
.sms-nav-links a { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--w60); text-decoration: none; transition: color 0.3s; }
.sms-nav-links a:hover { color: var(--g300); }
.sms-nav-cta {
  font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
  background: transparent; border: 1px solid var(--g400); color: var(--g400);
  padding: 9px 22px; cursor: pointer; font-family: var(--fb);
  transition: background 0.3s, color 0.3s;
}
.sms-nav-cta:hover { background: var(--g400); color: var(--n900); }
.sms-back-btn {
  position: absolute; top: 90px; left: 60px; z-index: 20;
  background: none; border: none; font-family: var(--fb); font-size: 0.7rem;
  letter-spacing: 0.18em; text-transform: uppercase; color: var(--w30);
  cursor: pointer; display: flex; align-items: center; gap: 10px; padding: 0;
  transition: color 0.3s;
}
.sms-back-btn:hover { color: var(--g400); }
.sms-back-btn::before { content: '←'; font-size: 0.9rem; }

/* ── HERO ────────────────────────────────────────────────────── */
.sms-hero {
  min-height: 100vh; position: relative; overflow: hidden;
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: flex-end; padding: 0 60px 80px; gap: 60px;
}
.sms-hero-canvas { position: absolute; inset: 0; z-index: 0; display: block; }
.sms-hero-left { position: relative; z-index: 2; padding-top: 160px; }
.sms-hero-right { position: relative; z-index: 2; padding-top: 160px; display: flex; align-items: flex-end; justify-content: flex-end; }
.sms-hero-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--g400); border: 1px solid rgba(201,168,76,0.28); padding: 7px 16px;
  margin-bottom: 32px;
  opacity: 0; transform: translateY(16px);
  animation: smsFadeUp 1s var(--ease) 0.2s forwards;
}
.sms-hero-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--g400); animation: smsBlink 2s infinite; }
.sms-hero-h1 {
  font-family: var(--fd); font-weight: 300; line-height: 0.88;
  letter-spacing: -0.02em; color: var(--w);
  font-size: clamp(5rem, 10vw, 9.5rem); margin-bottom: 20px;
  opacity: 0; transform: translateY(20px);
  animation: smsFadeUp 1.1s var(--ease) 0.35s forwards;
}
.sms-hero-h1 em { display: block; color: var(--g400); font-style: italic; font-weight: 300; }
.sms-hero-fullname {
  font-family: var(--fd); font-size: 1rem; font-weight: 300;
  color: var(--w60); font-style: italic; margin-bottom: 36px; letter-spacing: 0.04em;
  opacity: 0; animation: smsFadeUp 1s var(--ease) 0.5s forwards;
}
.sms-hero-desc {
  font-size: 0.86rem; color: var(--w80); line-height: 1.85; max-width: 520px; margin-bottom: 44px;
  opacity: 0; animation: smsFadeUp 1s var(--ease) 0.65s forwards;
}
.sms-hero-actions {
  display: flex; gap: 14px; flex-wrap: wrap;
  opacity: 0; animation: smsFadeUp 1s var(--ease) 0.8s forwards;
}
.sms-hero-card {
  background: rgba(11,28,45,0.85); backdrop-filter: blur(16px);
  border: 1px solid var(--w12); padding: 36px 32px; min-width: 280px;
  opacity: 0; animation: smsFadeUp 1.1s var(--ease) 0.9s forwards;
}
.sms-hero-card-label {
  font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--g400); margin-bottom: 20px; display: block;
}
.sms-hero-card-row {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 11px 0; border-bottom: 1px solid var(--w06); font-size: 0.78rem;
}
.sms-hero-card-row:last-child { border-bottom: none; }
.sms-hero-card-row span:first-child { color: var(--w60); }
.sms-hero-card-row span:last-child { color: var(--w); font-weight: 500; text-align: right; }
.sms-hero-card-row span.gold { color: var(--g400); }
.sms-scroll-hint {
  position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
  z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px;
  opacity: 0; animation: smsFadeUp 1s var(--ease) 1.2s forwards;
}
.sms-scroll-hint span { font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--w30); }
.sms-scroll-line { width: 1px; height: 44px; background: linear-gradient(to bottom, var(--g400), transparent); animation: smsScrollPulse 2.2s ease-in-out infinite; }

/* ── STATS BAR ───────────────────────────────────────────────── */
.sms-stats {
  display: grid; grid-template-columns: repeat(6, 1fr);
  background: var(--n950); border-top: 1px solid var(--w12);
  border-bottom: 1px solid var(--w12);
}
.sms-stat { padding: 28px 20px; text-align: center; border-right: 1px solid var(--w12); transition: background 0.3s; }
.sms-stat:last-child { border-right: none; }
.sms-stat:hover { background: var(--glow3); }
.sms-stat-val { font-family: var(--fd); font-size: 2rem; font-weight: 300; color: var(--g400); display: block; line-height: 1; }
.sms-stat-key { font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--w30); margin-top: 6px; display: block; }

/* ── SECTION BASICS ──────────────────────────────────────────── */
.sms-section { padding: 96px 60px; }
.sms-section-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--g400); margin-bottom: 14px; display: block; }
.sms-h2 { font-family: var(--fd); font-size: clamp(2rem, 3.8vw, 3.4rem); font-weight: 300; line-height: 1.15; color: var(--w); }
.sms-h2 em { color: var(--g400); font-style: italic; }

/* ── INTRO ───────────────────────────────────────────────────── */
.sms-intro { background: var(--n800); }
.sms-intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; margin-top: 52px; }
.sms-intro-text p { font-size: 0.88rem; color: var(--w60); line-height: 1.88; margin-bottom: 22px; }
.sms-intro-text p strong { color: var(--w); font-weight: 500; }
.sms-intro-text p:last-child { margin-bottom: 0; }
.sms-pillars { display: flex; flex-direction: column; }
.sms-pillar { display: flex; gap: 20px; padding: 22px 0; border-bottom: 1px solid var(--w06); transition: padding-left 0.3s var(--ease); }
.sms-pillar:first-child { border-top: 1px solid var(--w06); }
.sms-pillar:hover { padding-left: 10px; }
.sms-pillar-icon { font-size: 1.3rem; flex-shrink: 0; margin-top: 2px; }
.sms-pillar h4 { font-size: 0.88rem; font-weight: 500; color: var(--w); margin-bottom: 5px; }
.sms-pillar p { font-size: 0.77rem; color: var(--w60); line-height: 1.65; }

/* ── PACKAGES ────────────────────────────────────────────────── */
.sms-packages { background: var(--cream-bg); position: relative; overflow: hidden; }
.sms-packages::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(201,168,76,0.09), transparent 60%);
  pointer-events: none;
}
.sms-packages::after {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, transparent, var(--g400) 40%, transparent);
  opacity: 0.6;
}
.sms-packages .sms-section-label { color: #8A6820; }
.sms-packages .sms-h2 { color: var(--cream-ink); }
.sms-packages .sms-h2 em { color: var(--g400); }
.sms-pkg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 52px; }
.sms-pkg {
  background: var(--cream-bg); border: 1px solid var(--cream-bdr);
  padding: 40px 34px; display: flex; flex-direction: column;
  transition: transform 0.35s var(--ease), box-shadow 0.35s var(--ease), border-color 0.35s;
  box-shadow: 0 2px 16px rgba(120,90,30,0.06); position: relative;
}
.sms-pkg:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(120,90,30,0.14); border-color: rgba(201,168,76,0.45); }
.sms-pkg.featured { background: var(--n900); border-color: rgba(201,168,76,0.35); box-shadow: 0 8px 40px rgba(0,0,0,0.25); }
.sms-pkg.featured:hover { border-color: var(--g400); box-shadow: 0 24px 60px rgba(0,0,0,0.35); }
.sms-pkg-badge { font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; padding: 4px 12px; width: fit-content; margin-bottom: 22px; font-weight: 500; }
.sms-pkg:not(.featured) .sms-pkg-badge { border: 1px solid var(--cream-bdr); color: var(--cream-ink3); background: var(--cream-100); }
.sms-pkg.featured .sms-pkg-badge { border: 1px solid var(--g400); color: var(--g400); background: rgba(201,168,76,0.08); }
.sms-pkg-name { font-family: var(--fd); font-size: 2rem; font-weight: 400; margin-bottom: 6px; }
.sms-pkg:not(.featured) .sms-pkg-name { color: var(--cream-ink); }
.sms-pkg.featured .sms-pkg-name { color: var(--w); }
.sms-pkg-tag { font-size: 0.75rem; margin-bottom: 26px; }
.sms-pkg:not(.featured) .sms-pkg-tag { color: var(--cream-ink3); }
.sms-pkg.featured .sms-pkg-tag { color: var(--w60); }
.sms-pkg-price { margin-bottom: 28px; padding-bottom: 24px; }
.sms-pkg:not(.featured) .sms-pkg-price { border-bottom: 1px solid var(--cream-bdr); }
.sms-pkg.featured .sms-pkg-price { border-bottom: 1px solid var(--w12); }
.sms-pkg-amount { font-family: var(--fd); font-size: 3rem; font-weight: 300; line-height: 1; }
.sms-pkg:not(.featured) .sms-pkg-amount { color: var(--cream-ink); }
.sms-pkg.featured .sms-pkg-amount { color: var(--g400); }
.sms-pkg-period { font-size: 0.68rem; letter-spacing: 0.08em; margin-top: 5px; }
.sms-pkg:not(.featured) .sms-pkg-period { color: var(--cream-bdr); }
.sms-pkg.featured .sms-pkg-period { color: var(--w30); }
.sms-pkg-features { list-style: none; display: flex; flex-direction: column; gap: 12px; flex: 1; margin-bottom: 32px; }
.sms-pkg-feat { display: flex; align-items: flex-start; gap: 11px; font-size: 0.79rem; line-height: 1.5; }
.sms-feat-on { color: #8A6820; flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.sms-feat-off { color: var(--cream-bdr); flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.sms-pkg.featured .sms-feat-on { color: var(--g400); }
.sms-pkg.featured .sms-feat-off { color: var(--w30); }
.sms-feat-label-on { color: var(--cream-ink2); }
.sms-feat-label-off { color: var(--cream-bdr); }
.sms-pkg.featured .sms-feat-label-on { color: var(--w80); }
.sms-pkg.featured .sms-feat-label-off { color: var(--w30); }
.sms-pkg-btn { width: 100%; padding: 13px 20px; font-family: var(--fb); font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
.sms-pkg:not(.featured) .sms-pkg-btn { background: transparent; border: 1px solid var(--cream-bdr); color: var(--cream-ink2); }
.sms-pkg:not(.featured) .sms-pkg-btn:hover { border-color: var(--g400); background: var(--cream-100); color: var(--cream-ink); }
.sms-pkg.featured .sms-pkg-btn { background: var(--g400); border: none; color: var(--n900); font-weight: 500; }
.sms-pkg.featured .sms-pkg-btn:hover { background: var(--g300); }

/* ── ACTIVITIES ──────────────────────────────────────────────── */
.sms-activities { background: var(--n800); }
.sms-act-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; margin-top: 52px; background: var(--w06); }
.sms-act-card { background: var(--n800); padding: 30px 24px; transition: background 0.3s; cursor: default; }
.sms-act-card:hover { background: var(--n750); }
.sms-act-card:hover .sms-act-name { color: var(--g300); }
.sms-act-icon { font-size: 1.5rem; margin-bottom: 14px; }
.sms-act-name { font-size: 0.84rem; font-weight: 500; color: var(--w); margin-bottom: 7px; transition: color 0.3s; }
.sms-act-desc { font-size: 0.73rem; color: var(--w60); line-height: 1.6; }

/* ── PROCESS ─────────────────────────────────────────────────── */
.sms-process { background: var(--n900); }
.sms-process-inner { max-width: 780px; margin: 52px auto 0; }
.sms-step { display: grid; grid-template-columns: 64px 1fr; gap: 28px; padding: 36px 0; border-bottom: 1px solid var(--w06); position: relative; }
.sms-step:last-child { border-bottom: none; }
.sms-step::before { content: ''; position: absolute; left: 31px; top: 84px; bottom: -36px; width: 1px; background: linear-gradient(to bottom, rgba(201,168,76,0.25), transparent); }
.sms-step:last-child::before { display: none; }
.sms-step-num { width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--g400); display: flex; align-items: center; justify-content: center; font-family: var(--fd); font-size: 0.92rem; color: var(--g400); background: var(--n900); position: relative; z-index: 1; flex-shrink: 0; }
.sms-step h3 { font-size: 0.96rem; font-weight: 500; color: var(--w); margin-bottom: 8px; }
.sms-step p { font-size: 0.81rem; color: var(--w60); line-height: 1.78; margin-bottom: 10px; }
.sms-step-time { font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--g400); margin-bottom: 12px; }
.sms-step-docs { display: flex; gap: 6px; flex-wrap: wrap; }
.sms-doc-tag { font-size: 0.62rem; padding: 4px 9px; border: 1px solid var(--w12); color: var(--w60); letter-spacing: 0.07em; }

/* ── DOCUMENTS ───────────────────────────────────────────────── */
.sms-documents { background: var(--n800); }
.sms-docs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 52px; }
.sms-doc-card { background: var(--n900); border: 1px solid var(--w06); padding: 22px 26px; display: flex; align-items: center; gap: 18px; transition: border-color 0.3s; }
.sms-doc-card:hover { border-color: rgba(201,168,76,0.2); }
.sms-doc-num { font-family: var(--fd); font-size: 1.9rem; font-weight: 300; color: rgba(201,168,76,0.18); min-width: 36px; line-height: 1; }
.sms-doc-title { font-size: 0.82rem; font-weight: 500; color: var(--w); margin-bottom: 4px; }
.sms-doc-desc { font-size: 0.72rem; color: var(--w60); line-height: 1.55; }

/* ── CALCULATOR ──────────────────────────────────────────────── */
.sms-calc { background: var(--n750); }
.sms-calc-inner { display: grid; grid-template-columns: 1.3fr 1fr; gap: 64px; align-items: start; margin-top: 52px; }
.sms-calc-form { display: flex; flex-direction: column; gap: 22px; }
.sms-calc-field { display: flex; flex-direction: column; gap: 7px; }
.sms-calc-label { font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--w60); }
.sms-calc-select { background: var(--n900); border: 1px solid var(--w12); color: var(--w); padding: 13px 16px; font-family: var(--fb); font-size: 0.83rem; font-weight: 300; outline: none; transition: border-color 0.3s; appearance: none; -webkit-appearance: none; cursor: pointer; }
.sms-calc-select:focus { border-color: var(--g400); }
.sms-calc-select option { background: var(--n800); }
.sms-toggle-row { display: flex; }
.sms-toggle { flex: 1; padding: 11px 10px; font-size: 0.66rem; letter-spacing: 0.12em; text-transform: uppercase; font-family: var(--fb); cursor: pointer; background: var(--n900); border: 1px solid var(--w12); color: var(--w60); transition: all 0.3s; margin-right: -1px; text-align: center; }
.sms-toggle.on { background: var(--glow2); border-color: var(--g400); color: var(--g400); position: relative; z-index: 1; }
.sms-result { background: var(--n900); border: 1px solid rgba(201,168,76,0.2); padding: 40px 36px; position: sticky; top: 90px; }
.sms-result-tag { font-size: 0.6rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--g400); margin-bottom: 22px; display: block; }
.sms-result-amount { font-family: var(--fd); font-size: 3.6rem; font-weight: 300; line-height: 1; color: var(--w); }
.sms-result-currency { color: var(--g400); }
.sms-result-note { font-size: 0.66rem; color: var(--w30); margin-top: 4px; margin-bottom: 28px; }
.sms-result-lines { border-top: 1px solid var(--w12); margin-bottom: 24px; }
.sms-result-line { display: flex; justify-content: space-between; padding: 11px 0; border-bottom: 1px solid var(--w06); font-size: 0.76rem; }
.sms-result-line-lbl { color: var(--w60); }
.sms-result-line-val { color: var(--w); font-weight: 500; }
.sms-result-total-row { display: flex; justify-content: space-between; padding: 14px 0 0; font-size: 0.86rem; }
.sms-result-disclaimer { font-size: 0.68rem; color: var(--w30); line-height: 1.65; margin-bottom: 22px; margin-top: 14px; }

/* ── FAQ ─────────────────────────────────────────────────────── */
.sms-faq { background: var(--n900); }
.sms-faq-inner { max-width: 820px; margin: 52px auto 0; }
.sms-faq-item { border-bottom: 1px solid var(--w06); }
.sms-faq-q { width: 100%; background: none; border: none; padding: 26px 0; display: flex; align-items: center; justify-content: space-between; gap: 24px; cursor: pointer; text-align: left; font-family: var(--fb); }
.sms-faq-q-text { font-size: 0.92rem; font-weight: 400; color: var(--w); line-height: 1.5; }
.sms-faq-icon { width: 26px; height: 26px; border: 1px solid var(--w12); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--g400); font-size: 1.1rem; flex-shrink: 0; transition: all 0.3s; }
.sms-faq-item.open .sms-faq-icon { background: var(--g400); color: var(--n900); border-color: var(--g400); transform: rotate(45deg); }
.sms-faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.45s var(--ease); }
.sms-faq-item.open .sms-faq-answer { max-height: 500px; }
.sms-faq-answer-inner { padding-bottom: 24px; }
.sms-faq-answer p { font-size: 0.83rem; color: var(--w60); line-height: 1.85; }
.sms-faq-answer ul { margin-top: 12px; list-style: none; display: flex; flex-direction: column; gap: 7px; }
.sms-faq-answer ul li { font-size: 0.8rem; color: var(--w60); padding-left: 18px; position: relative; line-height: 1.6; }
.sms-faq-answer ul li::before { content: '—'; position: absolute; left: 0; color: var(--g400); }

/* ── ADVISORY ────────────────────────────────────────────────── */
.sms-advisory { background: var(--n800); position: relative; overflow: hidden; }
.sms-advisory::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 70% at 50% 50%, rgba(201,168,76,0.04), transparent); pointer-events: none; }
.sms-advisory-inner { max-width: 900px; margin: 52px auto 0; position: relative; z-index: 1; }
.sms-advisory-quote { font-family: var(--fd); font-size: 1.35rem; font-weight: 300; color: var(--w80); line-height: 1.65; font-style: italic; text-align: center; padding: 40px 48px; border: 1px solid var(--w12); background: var(--n900); margin-bottom: 48px; }
.sms-advisory-quote strong { color: var(--g400); font-style: normal; }
.sms-advisory-quote-attr { margin-top: 18px; font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--g400); font-style: normal; }
.sms-advisory-tips { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 36px; }
.sms-tip { border: 1px solid var(--w06); padding: 30px 26px; transition: border-color 0.3s; }
.sms-tip:hover { border-color: rgba(201,168,76,0.2); }
.sms-tip-num { font-family: var(--fd); font-size: 0.68rem; letter-spacing: 0.22em; color: var(--g400); margin-bottom: 12px; display: block; }
.sms-tip h4 { font-size: 0.9rem; font-weight: 500; color: var(--w); margin-bottom: 9px; }
.sms-tip p { font-size: 0.78rem; color: var(--w60); line-height: 1.78; }
.sms-advisory-warning { background: rgba(201,168,76,0.05); border: 1px solid rgba(201,168,76,0.18); padding: 26px 30px; margin-bottom: 32px; }
.sms-advisory-warning h4 { font-size: 0.82rem; font-weight: 500; color: var(--g400); margin-bottom: 9px; }
.sms-advisory-warning p { font-size: 0.78rem; color: var(--w60); line-height: 1.78; }

/* ── CTA ─────────────────────────────────────────────────────── */
.sms-cta { background: var(--cream-bg); padding: 120px 60px; text-align: center; position: relative; overflow: hidden; }
.sms-cta::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(180,150,90,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(180,150,90,0.06) 1px, transparent 1px); background-size: 56px 56px; }
.sms-cta::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.10), transparent 70%); pointer-events: none; }
.sms-cta-inner { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }
.sms-cta .sms-section-label { color: #8A6820; text-align: center; }
.sms-cta h2 { font-family: var(--fd); font-size: clamp(2.4rem, 4.5vw, 4rem); font-weight: 300; color: var(--cream-ink); line-height: 1.15; margin-bottom: 18px; }
.sms-cta h2 em { color: var(--g400); font-style: italic; }
.sms-cta-divider { width: 44px; height: 1px; background: var(--g400); margin: 22px auto; opacity: 0.55; }
.sms-cta p { font-size: 0.83rem; color: var(--cream-ink3); line-height: 1.8; margin-bottom: 44px; }
.sms-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

/* ── BUTTONS ─────────────────────────────────────────────────── */
.sms-btn-gold { padding: 15px 36px; background: var(--g400); color: var(--n900); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.sms-btn-gold:hover { background: var(--g300); transform: translateY(-2px); }
.sms-btn-ghost { padding: 15px 36px; background: transparent; color: var(--w); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--w30); cursor: pointer; transition: all 0.3s; }
.sms-btn-ghost:hover { border-color: var(--g400); color: var(--g400); transform: translateY(-2px); }
.sms-btn-ink { padding: 15px 36px; background: var(--cream-ink); color: var(--cream-bg); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.sms-btn-ink:hover { background: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }
.sms-btn-cream-outline { padding: 15px 36px; background: transparent; color: var(--cream-ink2); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--cream-bdr); cursor: pointer; transition: all 0.3s; }
.sms-btn-cream-outline:hover { border-color: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }

/* ── FOOTER ──────────────────────────────────────────────────── */
.sms-footer { background: var(--n950); padding: 52px 60px; border-top: 1px solid var(--w06); }
.sms-footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
.sms-footer-logo { font-family: var(--fd); font-size: 1.3rem; letter-spacing: 0.15em; color: var(--w); }
.sms-footer-logo em { color: var(--g400); font-style: normal; }
.sms-footer-copy { font-size: 0.68rem; color: var(--w30); }
.sms-footer-back { padding: 9px 18px; background: transparent; border: 1px solid var(--w12); color: var(--w60); font-family: var(--fb); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
.sms-footer-back:hover { border-color: var(--g400); color: var(--g400); }

/* ── WA FLOAT ────────────────────────────────────────────────── */
.sms-wa { position: fixed; bottom: 28px; right: 28px; z-index: 300; width: 50px; height: 50px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 18px rgba(37,211,102,0.4); transition: transform 0.3s, box-shadow 0.3s; }
.sms-wa:hover { transform: scale(1.1); box-shadow: 0 6px 26px rgba(37,211,102,0.55); }

/* ── REVEAL ──────────────────────────────────────────────────── */
.sms-reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.8s var(--ease), transform 0.8s var(--ease); }
.sms-reveal.in { opacity: 1; transform: translateY(0); }
.sr1 { transition-delay: 0.08s; } .sr2 { transition-delay: 0.18s; }
.sr3 { transition-delay: 0.28s; } .sr4 { transition-delay: 0.38s; }

/* ── KEYFRAMES ───────────────────────────────────────────────── */
@keyframes smsFadeUp { to { opacity: 1; transform: translateY(0); } }
@keyframes smsScrollPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
@keyframes smsBlink { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.75); } }

/* ── RESPONSIVE ──────────────────────────────────────────────── */
@media(max-width:1100px) {
  .sms-hero { grid-template-columns: 1fr; }
  .sms-hero-right { display: none; }
  .sms-intro-grid { grid-template-columns: 1fr; gap: 48px; }
  .sms-pkg-grid { grid-template-columns: 1fr; max-width: 480px; }
  .sms-act-grid { grid-template-columns: repeat(3, 1fr); }
  .sms-calc-inner { grid-template-columns: 1fr; }
  .sms-result { position: static; }
  .sms-advisory-tips { grid-template-columns: 1fr; }
}
@media(max-width:768px) {
  .sms-nav { padding: 16px 24px; } .sms-nav.scrolled { padding: 12px 24px; } .sms-nav-links { display: none; }
  .sms-hero { padding: 0 24px 72px; }
  .sms-back-btn { left: 24px; }
  .sms-section { padding: 68px 24px; }
  .sms-stats { grid-template-columns: repeat(3, 1fr); }
  .sms-act-grid { grid-template-columns: repeat(2, 1fr); }
  .sms-docs-grid { grid-template-columns: 1fr; }
  .sms-footer { padding: 40px 24px; }
  .sms-cta { padding: 80px 24px; }
}
@media(max-width:480px) {
  .sms-stats { grid-template-columns: repeat(2, 1fr); }
  .sms-act-grid { grid-template-columns: 1fr; }
  .sms-hero-h1 { font-size: 4.5rem; }
}

  .sms-nav-hamburger {
    display: none; flex-direction: column; gap: 5px; cursor: pointer;
    background: none; border: none; padding: 6px; z-index: 310;
  }
  .sms-nav-hamburger span {
    display: block; width: 24px; height: 1.5px; background: rgba(248,245,238,0.6);
    transition: all 0.35s cubic-bezier(0.16,1,0.3,1); transform-origin: center;
  }
  .sms-nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: #C9A84C; }
  .sms-nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .sms-nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: #C9A84C; }
  .sms-drawer {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(3,10,20,0.97); backdrop-filter: blur(24px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    transform: translateX(100%); transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
    pointer-events: none;
  }
  .sms-drawer.open { transform: translateX(0); pointer-events: all; }
  .sms-drawer-brand {
    font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.3rem;
    letter-spacing: .18em; color: #F8F5EE; margin-bottom: 44px;
    opacity: 0; transform: translateY(10px);
    transition: opacity .4s .1s, transform .4s .1s;
  }
  .sms-drawer.open .sms-drawer-brand { opacity: 1; transform: translateY(0); }
  .sms-drawer-brand em { color: #C9A84C; font-style: normal; }
  .sms-dlink {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2rem, 8vw, 3rem); font-weight: 300; color: rgba(248,245,238,0.6);
    background: none; border: none; padding: 10px 0; cursor: pointer;
    display: block; width: 100%; text-align: center;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, opacity .4s cubic-bezier(0.16,1,0.3,1), transform .4s cubic-bezier(0.16,1,0.3,1);
  }
  .sms-drawer.open .sms-dlink { opacity: 1; transform: translateY(0); }
  .sms-drawer.open .sms-dlink:nth-of-type(1) { transition-delay: .12s; }
  .sms-drawer.open .sms-dlink:nth-of-type(2) { transition-delay: .17s; }
  .sms-drawer.open .sms-dlink:nth-of-type(3) { transition-delay: .22s; }
  .sms-drawer.open .sms-dlink:nth-of-type(4) { transition-delay: .27s; }
  .sms-drawer.open .sms-dlink:nth-of-type(5) { transition-delay: .32s; }
  .sms-dlink:hover { color: #C9A84C; }
  .sms-drawer-div { width: 40px; height: 1px; background: rgba(201,168,76,.25); margin: 18px 0; opacity: 0; transition: opacity .4s .34s; }
  .sms-drawer.open .sms-drawer-div { opacity: 1; }
  .sms-dcta {
    font-family: 'DM Sans', sans-serif; font-size: .7rem; letter-spacing: .18em;
    text-transform: uppercase; color: #C9A84C; border: 1px solid #C9A84C;
    background: none; padding: 12px 32px; cursor: pointer; margin-top: 8px;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, background .3s, opacity .4s .38s, transform .4s .38s;
  }
  .sms-drawer.open .sms-dcta { opacity: 1; transform: translateY(0); }
  .sms-dcta:hover { background: #C9A84C; color: #05111e; }
  @media (max-width: 900px) {
    .sms-nav-links { display: none; }
    .sms-nav-cta { display: none !important; }
    .sms-nav-hamburger { display: flex; }
  }
`;

// ── DATA ──────────────────────────────────────────────────────
const STATS = [
  { v:"30,000+", k:"Companies" }, { v:"5–8", k:"Setup Days" },
  { v:"100%", k:"Foreign Ownership" }, { v:"0%", k:"Income Tax" },
  { v:"AED 11.5K", k:"Starting Cost" }, { v:"Media City", k:"Sharjah" },
];

const ACTIVITIES = [
  { i:"", n:"Content Creation", d:"Video production, YouTube channels, podcasting and digital content" },
  { i:"", n:"Social Media Management", d:"Instagram, TikTok, LinkedIn and multi-platform social strategy" },
  { i:"", n:"Influencer Marketing", d:"Influencer agency, talent management and brand partnerships" },
  { i:"", n:"Digital Marketing", d:"SEO, SEM, performance marketing and online advertising" },
  { i:"", n:"Publishing & Editorial", d:"Online publishing, journalism, editorial services and blogging" },
  { i:"", n:"Broadcasting & Radio", d:"Radio production, broadcasting services and audio content" },
  { i:"", n:"Design & Creative", d:"Graphic design, branding, motion graphics and visual identity" },
  { i:"", n:"Events & Entertainment", d:"Event management, entertainment production and talent booking" },
  { i:"", n:"PR & Communications", d:"Public relations, corporate communications and media relations" },
  { i:"", n:"Tech & Software", d:"Software development, apps, SaaS and digital product studios" },
  { i:"", n:"E-Commerce", d:"Online retail, dropshipping and digital commerce platforms" },
  { i:"", n:"Consulting & Advisory", d:"Business consulting, strategy advisory and professional services" },
];

const STEPS = [
  { n:"01", t:"Initial Consultation & Activity Planning", d:"Our SHAMS specialists review your business model and select the most appropriate media activities from SHAMS' comprehensive list — ensuring maximum flexibility.", time:"Day 1", docs:["Passport Copy","Business Overview"] },
  { n:"02", t:"Trade Name Reservation", d:"We submit your preferred company name to SHAMS authority — ensuring compliance with Sharjah Media City's naming guidelines.", time:"Day 1–2", docs:["Name Options","Shareholder Details"] },
  { n:"03", t:"License Application Submission", d:"Full license application submitted with all supporting documents. SHAMS is known for a streamlined, digitally-managed process.", time:"Day 2–4", docs:["Application Form","Passport Copies","KYC Documents"] },
  { n:"04", t:"SHAMS Authority Approvals", d:"Authority reviews your application. Standard approvals typically come within 2–4 working days — one of the faster turnarounds in the UAE.", time:"Day 4–8", docs:["Activity Approvals","NOC if required"] },
  { n:"05", t:"License Issuance & Corporate Documents", d:"Trade license, MOA, Share Certificates, Company Stamp and all official documents issued — delivered digitally and physically.", time:"Day 6–8", docs:["Trade License","MOA","Share Certificates","Company Stamp"] },
  { n:"06", t:"Investor Visa Processing", d:"Entry permit, medical fitness test, biometrics and Emirates ID. Our PRO team manages the full process end-to-end.", time:"Day 8–22", docs:["Visa Application","Medical Test","Emirates ID"] },
  { n:"07", t:"Bank Account Opening", d:"Introduction to our banking partners. Full documentation support throughout the account opening process.", time:"Day 22–36", docs:["Bank Application","Company Documents","Source of Funds"] },
];

const DOCUMENTS = [
  { t:"Passport Copies", d:"Valid passport copies for all shareholders and directors — minimum 6 months validity" },
  { t:"Passport-size Photographs", d:"White background, recent photographs for all shareholders and visa applicants" },
  { t:"Residential Address Proof", d:"Utility bill or bank statement — not older than 3 months" },
  { t:"Business Plan / Overview", d:"Brief description of your media or creative business activities and UAE objectives" },
  { t:"Source of Funds Declaration", d:"Bank statement or letter confirming the source of your investment funds" },
  { t:"NOC from Employer", d:"Required only if currently employed in the UAE under an existing residence visa" },
  { t:"Corporate Documents", d:"For corporate shareholders: Certificate of Incorporation, MOA, Board Resolution" },
  { t:"Portfolio / Work Samples", d:"Optional but recommended for media-specific activities — strengthens the application" },
];

const FAQS = [
  { q:"What makes SHAMS the right choice for media and creative businesses?", a:"SHAMS (Sharjah Media City) is the only UAE free zone purpose-built for media and creative industries. It explicitly licenses social media management, influencer marketing, content creation, broadcasting, and digital publishing — activities that some other zones classify ambiguously. It's the most affordable media-specific free zone in the UAE." },
  { q:"Can influencers and content creators set up a company in SHAMS?", a:"Yes — SHAMS explicitly supports content creation, social media management, and influencer marketing as licensed business activities. This is one of SHAMS' key advantages over general free zones. Many UAE-based influencers and content creators operate legally under SHAMS licenses." },
  { q:"How does SHAMS compare in cost to other UAE free zones?", a:"SHAMS starts from AED 11,500 — competitive with RAKEZ and significantly more affordable than DMCC or JAFZA. For businesses in media and creative industries, SHAMS offers the best combination of activity-specific licensing and affordable cost." },
  { q:"Can I get a UAE residence visa through SHAMS?", a:"Yes. A SHAMS investor visa is a standard UAE residence visa — Emirates ID, residency rights, and banking access are identical to any Dubai or Abu Dhabi free zone visa. The Sharjah location has no negative impact on UAE residency.", list:["Virtual Office: 1 Visa","Flexi Desk: 2–3 Visas","Studio Office: 3–4 Visas","Private Office: 5+ Visas"] },
  { q:"Is SHAMS recognised by UAE banks for account opening?", a:"Yes — SHAMS is well-recognised by all major UAE banks. Account opening with SHAMS companies follows the same process as any other free zone. The key factor is your source-of-funds documentation, business plan, and personal banking history." },
  { q:"Can SHAMS companies work with Dubai-based clients?", a:"Yes. SHAMS companies can provide services to clients across the UAE including Dubai and Abu Dhabi. There is no restriction on who you can serve — only on physically operating a retail or consumer-facing establishment on the mainland without a mainland license." },
  { q:"What is the annual renewal cost for SHAMS?", a:"SHAMS annual renewal ranges from AED 8,000 to AED 13,000 depending on your license type, activities, and office arrangement — among the most affordable annual renewals for a UAE media-specific free zone." },
  { q:"Can I set up SHAMS remotely without visiting the UAE?", a:"Yes — SHAMS license formation can be completed remotely for most applicants. Visa biometric registration and bank account opening require a UAE visit. INCOZONE coordinates one efficient visit to complete all remaining steps." },
  { q:"Does SHAMS allow me to hire staff?", a:"Yes — your visa allocation allows you to sponsor employees. The number of employee visas you can hold depends on your office type. INCOZONE advises on the optimal setup for your team size from the beginning." },
  { q:"What are the most popular activities on a SHAMS license?", a:"The most commonly licensed activities include:", list:["Social Media Management & Consulting","Content Creation (Video, Photo, Written)","Influencer Marketing & Talent Management","Digital Marketing & Advertising","Publishing & Journalism","PR & Communications","Broadcasting & Podcasting"] },
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
  return <canvas ref={ref} className="sms-hero-canvas" style={{ width: "100%", height: "100%" }} />;
}

// ── SCROLL REVEAL ─────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".sms-reveal");
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
    }), { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ── CALCULATOR ────────────────────────────────────────────────
function Calculator() {
  const [pkg, setPkg] = useState("creator");
  const [off, setOff] = useState("virtual");
  const [vis, setVis] = useState("1");
  const [pro, setPro] = useState(false);
  const [bnk, setBnk] = useState(false);
  const pkgC = { creator: 11500, studio: 16500, enterprise: 24500 };
  const offC = { virtual: 0, flexi: 2600, studio: 7800, private: 9200 };
  const visC = { "0": 0, "1": 0, "3": 2600, "5": 4800, "6": 5800 };
  const total = (pkgC[pkg] || 0) + (offC[off] || 0) + (visC[vis] || 0) + (pro ? 3000 : 0) + (bnk ? 2500 : 0);
  const f = n => "AED " + n.toLocaleString();
  return (
    <div className="sms-calc-inner">
      <div>
        <h2 className="sms-h2 sms-reveal">Build Your <em>Custom Package</em></h2>
        <p className="sms-reveal sr1" style={{ fontSize: "0.84rem", color: "var(--w60)", margin: "12px 0 36px" }}>Configure your SHAMS requirements and get an instant cost breakdown.</p>
        <div className="sms-calc-form">
          {[
            { l: "License Package", id: "pkg", val: pkg, set: setPkg, opts: [["creator","Creator (AED 11,500)"],["studio","Studio (AED 16,500)"],["enterprise","Enterprise (AED 24,500)"]] },
            { l: "Office / Workspace", id: "off", val: off, set: setOff, opts: [["virtual","Virtual Office (Included)"],["flexi","Flexi Desk (+AED 2,600/yr)"],["studio","Studio Office (+AED 7,800/yr)"],["private","Private Office (+AED 9,200/yr)"]] },
            { l: "Visa Allocation", id: "vis", val: vis, set: setVis, opts: [["0","No Visas"],["1","1 Visa (Included)"],["3","3 Visas (+AED 2,600)"],["5","5 Visas (+AED 4,800)"],["6","6 Visas (+AED 5,800)"]] },
          ].map(({ l, id, val, set, opts }) => (
            <div className="sms-calc-field sms-reveal" key={id}>
              <label className="sms-calc-label">{l}</label>
              <select className="sms-calc-select" value={val} onChange={e => set(e.target.value)}>
                {opts.map(([v, lab]) => <option key={v} value={v}>{lab}</option>)}
              </select>
            </div>
          ))}
          <div className="sms-calc-field sms-reveal">
            <label className="sms-calc-label">PRO & Government Services</label>
            <div className="sms-toggle-row">
              <button className={`sms-toggle${!pro ? " on" : ""}`} onClick={() => setPro(false)}>Not Required</button>
              <button className={`sms-toggle${pro ? " on" : ""}`} onClick={() => setPro(true)}>Add PRO (+AED 3,000)</button>
            </div>
          </div>
          <div className="sms-calc-field sms-reveal">
            <label className="sms-calc-label">Banking Assistance</label>
            <div className="sms-toggle-row">
              <button className={`sms-toggle${!bnk ? " on" : ""}`} onClick={() => setBnk(false)}>Not Required</button>
              <button className={`sms-toggle${bnk ? " on" : ""}`} onClick={() => setBnk(true)}>Add Banking (+AED 2,500)</button>
            </div>
          </div>
        </div>
      </div>
      <div className="sms-result sms-reveal">
        <span className="sms-result-tag">Estimated Total</span>
        <div className="sms-result-amount"><span className="sms-result-currency">AED </span>{total.toLocaleString()}</div>
        <div className="sms-result-note">One-time cost · excludes annual renewal</div>
        <div className="sms-result-lines">
          <div className="sms-result-line"><span className="sms-result-line-lbl">Base License Fee</span><span className="sms-result-line-val">{f(pkgC[pkg])}</span></div>
          {offC[off] > 0 && <div className="sms-result-line"><span className="sms-result-line-lbl">Office / Studio (Annual)</span><span className="sms-result-line-val">+{f(offC[off])}</span></div>}
          {visC[vis] > 0 && <div className="sms-result-line"><span className="sms-result-line-lbl">Visa Processing</span><span className="sms-result-line-val">+{f(visC[vis])}</span></div>}
          {pro && <div className="sms-result-line"><span className="sms-result-line-lbl">PRO Services</span><span className="sms-result-line-val">+{f(3000)}</span></div>}
          {bnk && <div className="sms-result-line"><span className="sms-result-line-lbl">Banking Assistance</span><span className="sms-result-line-val">+{f(2500)}</span></div>}
        </div>
        <div className="sms-result-total-row"><span style={{ color: "var(--w)", fontWeight: 500 }}>Total Estimate</span><span style={{ color: "var(--g400)", fontWeight: 600 }}>{f(total)}</span></div>
        <p className="sms-result-disclaimer">Estimate only. Final cost depends on current authority fees and specific requirements.</p>
        <button className="sms-btn-gold" style={{ width: "100%" }}>Get Exact Quote →</button>
      </div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────
export default function SHAMSPage({ onBack, onNavigate }) {
  const [_smsOpen, setsmsOpen] = useState(false);
  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = _smsOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [_smsOpen]);

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
    <div className="sms-root">
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className={`sms-nav${scrolled ? " scrolled" : ""}`}>
        <div className="sms-nav-logo" onClick={()=>{if(onNavigate){onNavigate("home");window.scrollTo(0,0);}}}>INCO<em>ZONE</em></div>
        <ul className="sms-nav-links">{["Services","Free Zones","About","Blog","Contact"].map(l=>{const pgMap={"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};return <li key={l}><a href="#" onClick={e=>{e.preventDefault();if(onNavigate){onNavigate(pgMap[l]);window.scrollTo(0,0);}}}>{ l}</a></li>;})}</ul>
        <button className="sms-nav-cta" onClick={()=>{if(onNavigate){onNavigate("schedule");window.scrollTo(0,0);}}}>Schedule Consultation</button>
      
        {/* Hamburger */}
        <button
          className={`sms-nav-hamburger${_smsOpen ? " open" : ""}`}
          onClick={() => setsmsOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`sms-drawer${_smsOpen ? " open" : ""}`}>
        <div className="sms-drawer-brand"
          onClick={() => { setsmsOpen(false); if(onNavigate) { onNavigate("home"); window.scrollTo(0,0); } }}>
          INCO<em>ZONE</em>
        </div>
        {["Services","Free Zones","About","Blog","Contact"].map((l) => {
          const pm = {"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};
          return (
            <button key={l} className="sms-dlink"
              onClick={() => { setsmsOpen(false); if(onNavigate) { onNavigate(pm[l]); window.scrollTo(0,0); } }}>
              {l}
            </button>
          );
        })}
        <div className="sms-drawer-div" />
        <button className="sms-dcta"
          onClick={() => { setsmsOpen(false); if(onNavigate) { onNavigate("schedule"); window.scrollTo(0,0); } }}>
          Schedule Consultation
        </button>
      </div>

      {/* ── HERO ── */}
      <div className="sms-hero">
        <HeroCanvas />
        <button className="sms-back-btn" onClick={onBack}>Back to Free Zones</button>

        <div className="sms-hero-left">
          <div className="sms-hero-eyebrow">
            <div className="sms-hero-eyebrow-dot" />
            Media &amp; Creative · Sharjah Free Zone
          </div>
          <h1 className="sms-hero-h1">SHAMS<em>Free Zone</em></h1>
          <div className="sms-hero-fullname">Sharjah Media City — UAE's Creative Capital</div>
          <p className="sms-hero-desc">
            The UAE's only free zone purpose-built for media, content creation, and creative industries. Explicit licensing for influencers, social media managers, and digital agencies — starting from just <strong style={{ color: "var(--g300)" }}>AED 11,500.</strong>
          </p>
          <div className="sms-hero-actions">
            <button className="sms-btn-gold">Start SHAMS Setup →</button>
            <button className="sms-btn-ghost">Download Free Guide</button>
          </div>
        </div>

        <div className="sms-hero-right">
          <div className="sms-hero-card">
            <span className="sms-hero-card-label">Quick Reference</span>
            {[
              ["Location","Sharjah, UAE"], ["Setup From","AED 11,500","gold"],
              ["Setup Time","5–8 Days","gold"], ["Min. Capital","Not Required"],
              ["Ownership","100% Foreign","gold"], ["Visa Quota","Up to 6"],
              ["Annual Renewal","AED 8–13K"], ["Tax","0% Personal"],
            ].map(([l, v, cls]) => (
              <div className="sms-hero-card-row" key={l}>
                <span>{l}</span><span className={cls || ""}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sms-scroll-hint"><span>Scroll</span><div className="sms-scroll-line" /></div>
      </div>

      {/* ── STATS ── */}
      <div className="sms-stats">
        {STATS.map((s, i) => (
          <div className="sms-stat" key={i}>
            <span className="sms-stat-val">{s.v}</span>
            <span className="sms-stat-key">{s.k}</span>
          </div>
        ))}
      </div>

      {/* ── INTRO ── */}
      <div className="sms-intro sms-section">
        <span className="sms-section-label sms-reveal">Zone Overview</span>
        <h2 className="sms-h2 sms-reveal sr1" style={{ maxWidth: "640px" }}>The UAE's Creative<br /><em>Media Capital</em></h2>
        <div className="sms-intro-grid">
          <div className="sms-intro-text">
            <p className="sms-reveal sr1"><strong>Sharjah Media City (SHAMS)</strong> is the UAE's only free zone specifically designed and regulated for the media, creative, and content industry. Unlike general free zones that accommodate media activities as a secondary category, SHAMS is purpose-built — with licensing structures explicitly tailored for content creators, influencers, agencies, and digital media businesses.</p>
            <p className="sms-reveal sr2">Established in 2017, SHAMS has grown to host over <strong>30,000 companies</strong> from content creators and solo operators to established media production houses and digital marketing agencies. It remains the most affordable media-specific free zone in the UAE.</p>
            <p className="sms-reveal sr3">SHAMS explicitly licenses <strong>social media management, influencer marketing, content creation, broadcasting, digital publishing, and PR</strong> — activities that many other zones classify ambiguously or don't license directly. For anyone building a business in the creator economy, SHAMS offers unmatched legal clarity.</p>
            <p className="sms-reveal sr3">The zone offers virtual offices, flexi desks, dedicated studio spaces, and private offices — giving media businesses the right workspace for every stage of growth, all within <strong>5–8 working days</strong> of application.</p>
          </div>
          <div className="sms-reveal sr2">
            <div className="sms-pillars">
              {[
                { i:"", h:"Purpose-Built for Media", p:"The UAE's only free zone specifically designed for content creation, media production, and creative industries — not an afterthought. Activity licensing is explicit and legally precise." },
                { i:"", h:"Creator Economy Friendly", p:"Influencer marketing, social media management, and content creation are explicitly licensed activities — giving creators and agencies clear legal standing for their business model." },
                { i:"", h:"Most Affordable Media Zone", p:"Starting from AED 11,500 — the lowest setup cost of any UAE media-specific free zone. Annual renewals from AED 8,000, making SHAMS ideal for early-stage creative businesses." },
                { i:"", h:"Studio Workspaces Available", p:"Beyond virtual offices, SHAMS offers dedicated studio spaces and creative offices suited to production businesses. Purpose-built creative infrastructure at competitive rates." },
                { i:"", h:"5 to 8 Day Setup", p:"Streamlined digital application with fast authority turnaround. Most SHAMS licenses are issued within 5–8 working days from document submission." },
              ].map((p, i) => (
                <div className="sms-pillar" key={i}>
                  <div className="sms-pillar-icon">{p.i}</div>
                  <div><h4>{p.h}</h4><p>{p.p}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PACKAGES ── */}
      <div className="sms-packages sms-section">
        <span className="sms-section-label sms-reveal">Setup Packages</span>
        <h2 className="sms-h2 sms-reveal sr1">Choose Your <em>SHAMS Package</em></h2>
        <p className="sms-reveal sr2" style={{ fontSize: "0.84rem", color: "var(--cream-ink3)", marginTop: "10px", maxWidth: "520px" }}>All packages include full company incorporation, trade license, and corporate documents.</p>
        <div className="sms-pkg-grid">
          {[
            { name:"Creator", tag:"Solo creators & freelancers", price:"11,500", badge:"Most Affordable", featured:false, feats:[["1 Media License Activity",true],["Virtual Office (UAE Address)",true],["1 Investor Visa",true],["Company Stamp & MOA",true],["Bank Account Assistance",false],["Dedicated Account Manager",false]] },
            { name:"Studio", tag:"Agencies & production companies", price:"16,500", badge:"Most Popular", featured:true, feats:[["3 Media License Activities",true],["Flexi Desk / Studio Access",true],["3 Investor Visas",true],["Full Corporate Documents",true],["Bank Account Assistance",true],["Dedicated Account Manager",false]] },
            { name:"Enterprise", tag:"Full media enterprise setup", price:"24,500", badge:"Full Service", featured:false, feats:[["Unlimited Activities",true],["Private Office / Studio",true],["5+ Investor Visas",true],["Full Corporate Documents",true],["Priority Bank Account Setup",true],["Dedicated Account Manager",true]] },
          ].map((pkg, i) => (
            <div className={`sms-pkg sms-reveal sr${i+1}${pkg.featured ? " featured" : ""}`} key={i}>
              <div className="sms-pkg-badge">{pkg.badge}</div>
              <div className="sms-pkg-name">{pkg.name}</div>
              <p className="sms-pkg-tag">{pkg.tag}</p>
              <div className="sms-pkg-price">
                <div className="sms-pkg-amount">AED {pkg.price}</div>
                <div className="sms-pkg-period">One-time setup · excludes annual renewal</div>
              </div>
              <ul className="sms-pkg-features">
                {pkg.feats.map(([t, on], j) => (
                  <li className="sms-pkg-feat" key={j}>
                    <span className={on ? "sms-feat-on" : "sms-feat-off"}>{on ? "" : "×"}</span>
                    <span className={on ? "sms-feat-label-on" : "sms-feat-label-off"}>{t}</span>
                  </li>
                ))}
              </ul>
              <button className="sms-pkg-btn">{pkg.featured ? "Select This Package →" : "Get Started →"}</button>
            </div>
          ))}
        </div>
      </div>

      {/* ── ACTIVITIES ── */}
      <div className="sms-activities sms-section">
        <span className="sms-section-label sms-reveal">Licensed Activities</span>
        <h2 className="sms-h2 sms-reveal sr1">What Can You Do <em>Under SHAMS?</em></h2>
        <p className="sms-reveal sr2" style={{ fontSize: "0.83rem", color: "var(--w60)", marginTop: "10px", maxWidth: "580px" }}>SHAMS supports 1,500+ business activities spanning media, creative, and digital industries:</p>
        <div className="sms-act-grid">
          {ACTIVITIES.map((a, i) => (
            <div className={`sms-act-card sms-reveal sr${(i%4)+1}`} key={i}>
              <div className="sms-act-icon">{a.i}</div>
              <div className="sms-act-name">{a.n}</div>
              <div className="sms-act-desc">{a.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROCESS ── */}
      <div className="sms-process sms-section">
        <span className="sms-section-label sms-reveal" style={{ textAlign: "center", display: "block" }}>Setup Process</span>
        <h2 className="sms-h2 sms-reveal sr1" style={{ textAlign: "center" }}>Your SHAMS <em>Journey — Step by Step</em></h2>
        <div className="sms-process-inner">
          {STEPS.map((s, i) => (
            <div className={`sms-step sms-reveal sr${(i%4)+1}`} key={i}>
              <div className="sms-step-num">{s.n}</div>
              <div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <div className="sms-step-time">{s.time}</div>
                <div className="sms-step-docs">{s.docs.map(d => <span className="sms-doc-tag" key={d}>{d}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DOCUMENTS ── */}
      <div className="sms-documents sms-section">
        <span className="sms-section-label sms-reveal">Required Documents</span>
        <h2 className="sms-h2 sms-reveal sr1">What You <em>Need to Prepare</em></h2>
        <p className="sms-reveal sr2" style={{ fontSize: "0.83rem", color: "var(--w60)", marginTop: "10px" }}>SHAMS has a simple, straightforward document checklist:</p>
        <div className="sms-docs-grid">
          {DOCUMENTS.map((d, i) => (
            <div className={`sms-doc-card sms-reveal sr${(i%2)+1}`} key={i}>
              <div className="sms-doc-num">0{i+1}</div>
              <div><div className="sms-doc-title">{d.t}</div><div className="sms-doc-desc">{d.d}</div></div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CALCULATOR ── */}
      <div className="sms-calc sms-section">
        <span className="sms-section-label sms-reveal">Cost Estimator</span>
        <Calculator />
      </div>

      {/* ── FAQ ── */}
      <div className="sms-faq sms-section">
        <span className="sms-section-label sms-reveal" style={{ textAlign: "center", display: "block" }}>FAQ</span>
        <h2 className="sms-h2 sms-reveal sr1" style={{ textAlign: "center" }}>Frequently Asked <em>Questions</em></h2>
        <div className="sms-faq-inner">
          {FAQS.map((f, i) => (
            <div className={`sms-faq-item sms-reveal sr${(i%3)+1}${openFaq===i ? " open" : ""}`} key={i}>
              <button className="sms-faq-q" onClick={() => setOpenFaq(openFaq===i ? null : i)}>
                <span className="sms-faq-q-text">{f.q}</span>
                <div className="sms-faq-icon">+</div>
              </button>
              <div className="sms-faq-answer">
                <div className="sms-faq-answer-inner">
                  <p>{f.a}</p>
                  {f.list && <ul>{f.list.map(li => <li key={li}>{li}</li>)}</ul>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ADVISORY ── */}
      <div className="sms-advisory sms-section">
        <span className="sms-section-label sms-reveal" style={{ textAlign: "center", display: "block" }}>INCOZONE Advisory</span>
        <h2 className="sms-h2 sms-reveal sr1" style={{ textAlign: "center" }}>Expert Advice Before <em>You Decide</em></h2>
        <div className="sms-advisory-inner">
          <div className="sms-advisory-quote sms-reveal sr2">
            "For content creators, influencers, and digital agencies — SHAMS removes the ambiguity that plagues other free zones.{" "}
            <strong>You don't want to spend AED 18,000 on a DMCC license only to find your social media management activities are classified under a different, unlicensed category. SHAMS was built for this business model.</strong>"
            <div className="sms-advisory-quote-attr">— INCOZONE Advisory Team</div>
          </div>
          <div className="sms-advisory-tips">
            {[
              { n:"01", t:"Activity Specificity Matters", p:"SHAMS' strength is in how precisely it defines media and creative activities. When setting up, ensure your license activities exactly match how you generate revenue — don't over-license or under-license. Our team will map your business model to the right activities before submission." },
              { n:"02", t:"Studio Space vs Virtual Office", p:"If you produce video or photo content and clients want to visit, upgrading to a studio space or flexi desk makes business sense. Virtual offices work well for purely digital businesses. Don't pay for physical space you won't use." },
              { n:"03", t:"Bank Account — Prepare Early", p:"UAE bank account opening for media businesses requires a clear business plan explaining your revenue model. Influencer businesses sometimes face additional questions. INCOZONE prepares a tailored business plan and source-of-funds package that dramatically speeds up approval." },
              { n:"04", t:"Corporate Tax for Creators", p:"UAE's 9% corporate tax applies to businesses with annual profits exceeding AED 375,000. Content creators and small agencies typically fall well below this threshold. As your business grows, INCOZONE connects you with licensed tax agents from day one." },
            ].map((tip, i) => (
              <div className={`sms-tip sms-reveal sr${(i%2)+1}`} key={i}>
                <span className="sms-tip-num">{tip.n}</span>
                <h4>{tip.t}</h4>
                <p>{tip.p}</p>
              </div>
            ))}
          </div>
          <div className="sms-advisory-warning sms-reveal">
            <h4> When SHAMS Might Not Be the Best Fit</h4>
            <p>Consider alternatives if: your business is primarily in trading or manufacturing rather than media — RAKEZ or IFZA may be more appropriate · you need a Dubai address specifically for client-facing reasons — Meydan or DMCC may serve better · your business requires DIFC or ADGM's regulated financial services framework · or your operations require substantial physical infrastructure beyond creative workspaces. INCOZONE will always recommend the right zone for your situation.</p>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="sms-cta">
        <div className="sms-cta-inner">
          <span className="sms-section-label sms-reveal">Begin Your Journey</span>
          <h2 className="sms-reveal sr1">Ready to Launch Your<br /><em>SHAMS Media Business?</em></h2>
          <div className="sms-cta-divider" />
          <p className="sms-reveal sr2">
            Schedule a private consultation. No obligation. Our SHAMS specialists will assess your creative business and give you a clear, honest recommendation — whether that's SHAMS or another zone entirely.
          </p>
          <div className="sms-cta-btns sms-reveal sr3">
            <button className="sms-btn-ink">Schedule Private Consultation</button>
            <button className="sms-btn-cream-outline" onClick={onBack}>← Explore Other Zones</button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="sms-footer">
        <div className="sms-footer-inner">
          <div className="sms-footer-logo">INCO<em>ZONE</em></div>
          <div className="sms-footer-copy">© 2025 INCOZONE. All rights reserved. Dubai, UAE.</div>
          <button className="sms-footer-back" onClick={onBack}>← Back to Free Zones</button>
        </div>
      </div>

      {/* ── WA FLOAT ── */}
      <div className="sms-wa">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </div>
    </div>
  );
}
