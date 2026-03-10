import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Mainland Company Formation Page
//  Unique editorial layout · Same navy/gold palette
//  Drop into: src/pages/Mainland.jsx
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500&family=Libre+Baskerville:ital,wght@1,400&display=swap');

.mnl-root *, .mnl-root *::before, .mnl-root *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}
.mnl-root {
  --n950: #020b14; --n900: #05111e; --n800: #091928; --n750: #0c2033;
  --n700: #102540; --n600: #163354;
  --g400: #C9A84C; --g300: #D4B468; --g200: #E2CC98; --g100: #F0E4C0;
  --glow: rgba(201,168,76,0.14); --glow2: rgba(201,168,76,0.07); --glow3: rgba(201,168,76,0.04);
  --cream-bg: #FAF6EE; --cream-100: #F4ECD8;
  --cream-ink: #1A120A; --cream-ink2: #3D2E1A; --cream-ink3: #7A6040;
  --cream-bdr: rgba(180,150,90,0.22);
  --w: #F8F5EE; --w80: rgba(248,245,238,0.80); --w60: rgba(248,245,238,0.60);
  --w30: rgba(248,245,238,0.30); --w12: rgba(248,245,238,0.12); --w06: rgba(248,245,238,0.06);
  --fd: 'Cormorant Garamond', Georgia, serif;
  --fi: 'Libre Baskerville', Georgia, serif;
  --fb: 'DM Sans', system-ui, sans-serif;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  font-family: var(--fb); font-weight: 300; color: var(--w);
  background: var(--n900); overflow-x: hidden; width: 100%;
}

/* ── NAV ─────────────────────────────────────────────────────── */
.mnl-nav {
  position: fixed; inset-inline: 0; top: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 60px;
  transition: background 0.5s, padding 0.4s, border-color 0.5s;
  border-bottom: 1px solid transparent;
}
.mnl-nav.scrolled {
  background: rgba(5,17,30,0.96); backdrop-filter: blur(20px);
  padding: 14px 60px; border-bottom-color: rgba(201,168,76,0.12);
}
.mnl-nav-logo { font-family: var(--fd); font-size: 1.5rem; font-weight: 500; letter-spacing: 0.15em; color: var(--w); cursor: pointer; }
.mnl-nav-logo em { color: var(--g400); font-style: normal; }
.mnl-nav-links { display: flex; gap: 36px; list-style: none; }
.mnl-nav-links a { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--w60); text-decoration: none; transition: color 0.3s; }
.mnl-nav-links a:hover { color: var(--g300); }
.mnl-nav-cta { font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; background: transparent; border: 1px solid var(--g400); color: var(--g400); padding: 9px 22px; cursor: pointer; font-family: var(--fb); transition: background 0.3s, color 0.3s; }
.mnl-nav-cta:hover { background: var(--g400); color: var(--n900); }
.mnl-back-btn { position: absolute; top: 90px; left: 60px; z-index: 20; background: none; border: none; font-family: var(--fb); font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--w30); cursor: pointer; display: flex; align-items: center; gap: 10px; padding: 0; transition: color 0.3s; }
.mnl-back-btn:hover { color: var(--g400); }
.mnl-back-btn::before { content: '←'; font-size: 0.9rem; }

/* ═══════════════════════════════════════════════════
   HERO — Split layout: left text / right rotated label
═══════════════════════════════════════════════════ */
.mnl-hero {
  min-height: 100vh; position: relative; overflow: hidden;
  display: grid; grid-template-columns: 1fr 420px;
  padding-top: 140px;
}
.mnl-hero-canvas { position: absolute; inset: 0; z-index: 0; }

/* Left column */
.mnl-hero-left {
  position: relative; z-index: 2;
  padding: 0 60px 80px; display: flex; flex-direction: column; justify-content: flex-end;
}
.mnl-hero-service-num {
  font-family: var(--fd); font-size: 0.75rem; font-weight: 300;
  letter-spacing: 0.35em; color: var(--g400); margin-bottom: 36px;
  display: flex; align-items: center; gap: 16px;
  opacity: 0; animation: mnlFade 0.8s var(--ease) 0.3s forwards;
}
.mnl-hero-service-num::before { content: ''; width: 40px; height: 1px; background: var(--g400); }
.mnl-hero-service-num::after { content: '/ 06'; color: var(--w30); }

.mnl-hero-h1 {
  font-family: var(--fd); font-weight: 300;
  font-size: clamp(3.5rem, 7.5vw, 7.5rem);
  line-height: 0.9; letter-spacing: -0.03em; color: var(--w);
  margin-bottom: 40px;
  opacity: 0; animation: mnlFade 1s var(--ease) 0.45s forwards;
}
.mnl-hero-h1 .accent { color: var(--g400); font-style: italic; font-weight: 300; display: block; }
.mnl-hero-h1 .indent { display: block; padding-left: 2.5rem; }

.mnl-hero-desc {
  font-size: 0.88rem; color: var(--w60); line-height: 1.92;
  max-width: 500px; margin-bottom: 52px;
  opacity: 0; animation: mnlFade 0.9s var(--ease) 0.65s forwards;
}
.mnl-hero-desc strong { color: var(--w); font-weight: 400; }

.mnl-hero-actions {
  display: flex; gap: 14px; align-items: center;
  opacity: 0; animation: mnlFade 0.8s var(--ease) 0.8s forwards;
}

/* Right column — vertical stats panel */
.mnl-hero-right {
  position: relative; z-index: 2;
  border-left: 1px solid var(--w06);
  display: flex; flex-direction: column;
  opacity: 0; animation: mnlFade 1s var(--ease) 0.6s forwards;
}
.mnl-hero-stat-item {
  flex: 1; padding: 32px 36px;
  border-bottom: 1px solid var(--w06);
  display: flex; flex-direction: column; justify-content: center;
  transition: background 0.3s;
}
.mnl-hero-stat-item:last-child { border-bottom: none; }
.mnl-hero-stat-item:hover { background: var(--glow3); }
.mnl-hero-stat-eyebrow { font-size: 0.56rem; letter-spacing: 0.26em; text-transform: uppercase; color: var(--w30); margin-bottom: 8px; }
.mnl-hero-stat-val { font-family: var(--fd); font-size: 2.6rem; font-weight: 300; color: var(--g400); line-height: 1; }
.mnl-hero-stat-sub { font-size: 0.7rem; color: var(--w60); margin-top: 6px; line-height: 1.5; }

/* ═══════════════════════════════════════════════════
   DISTINCTION BAND — Free Zone vs Mainland
═══════════════════════════════════════════════════ */
.mnl-distinction {
  background: var(--n950);
  border-top: 1px solid var(--w06); border-bottom: 1px solid var(--w06);
  padding: 0 60px;
  display: grid; grid-template-columns: 1fr 1px 1fr;
  overflow: hidden;
}
.mnl-distinction-divider { background: var(--w06); }
.mnl-distinction-col { padding: 52px 0; }
.mnl-distinction-col:last-child { padding-left: 60px; }
.mnl-distinction-col:first-child { padding-right: 60px; }
.mnl-distinction-label { font-size: 0.58rem; letter-spacing: 0.28em; text-transform: uppercase; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
.mnl-distinction-label.free { color: var(--w30); }
.mnl-distinction-label.mainland { color: var(--g400); }
.mnl-distinction-label-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.mnl-distinction-title { font-family: var(--fd); font-size: 1.4rem; font-weight: 400; margin-bottom: 16px; color: var(--w); }
.mnl-distinction-text { font-size: 0.79rem; color: var(--w60); line-height: 1.82; margin-bottom: 20px; }
.mnl-distinction-tags { display: flex; gap: 8px; flex-wrap: wrap; }
.mnl-distinction-tag { font-size: 0.6rem; letter-spacing: 0.12em; padding: 5px 12px; border: 1px solid var(--w06); color: var(--w30); }
.mnl-distinction-tag.active { border-color: rgba(201,168,76,0.3); color: var(--g400); }

/* ═══════════════════════════════════════════════════
   LICENSE TYPES — Horizontal scroll cards
═══════════════════════════════════════════════════ */
.mnl-licenses { background: var(--n800); padding: 96px 60px; }
.mnl-licenses-header { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: end; margin-bottom: 60px; }
.mnl-section-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--g400); margin-bottom: 14px; display: block; }
.mnl-h2 { font-family: var(--fd); font-size: clamp(2rem, 3.8vw, 3.4rem); font-weight: 300; line-height: 1.1; color: var(--w); }
.mnl-h2 em { color: var(--g400); font-style: italic; }
.mnl-licenses-desc { font-size: 0.84rem; color: var(--w60); line-height: 1.88; }
.mnl-licenses-desc strong { color: var(--w); font-weight: 400; }

.mnl-license-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
  background: var(--w06);
}
.mnl-license-card {
  background: var(--n800); padding: 44px 36px;
  position: relative; overflow: hidden;
  transition: background 0.35s var(--ease);
  cursor: default;
}
.mnl-license-card::after {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, transparent, var(--g400), transparent);
  transform: scaleX(0); transition: transform 0.5s var(--ease);
}
.mnl-license-card:hover { background: var(--n750); }
.mnl-license-card:hover::after { transform: scaleX(1); }
.mnl-license-card-num { font-family: var(--fd); font-size: 0.7rem; letter-spacing: 0.25em; color: var(--g400); margin-bottom: 24px; display: block; }
.mnl-license-icon { font-size: 2rem; margin-bottom: 20px; }
.mnl-license-name { font-family: var(--fd); font-size: 1.6rem; font-weight: 400; color: var(--w); margin-bottom: 8px; line-height: 1.2; }
.mnl-license-subtitle { font-size: 0.72rem; color: var(--g400); letter-spacing: 0.1em; margin-bottom: 20px; }
.mnl-license-desc { font-size: 0.79rem; color: var(--w60); line-height: 1.78; margin-bottom: 24px; }
.mnl-license-examples { display: flex; flex-direction: column; gap: 7px; }
.mnl-license-example { font-size: 0.71rem; color: var(--w30); display: flex; align-items: center; gap: 10px; }
.mnl-license-example::before { content: '—'; color: var(--g400); flex-shrink: 0; }

/* ═══════════════════════════════════════════════════
   SPONSOR SECTION — The honest section
═══════════════════════════════════════════════════ */
.mnl-sponsor { background: var(--n900); padding: 96px 60px; }
.mnl-sponsor-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
.mnl-sponsor-left { }
.mnl-sponsor-text p { font-size: 0.87rem; color: var(--w60); line-height: 1.9; margin-bottom: 22px; }
.mnl-sponsor-text p:last-child { margin-bottom: 0; }
.mnl-sponsor-text strong { color: var(--w); font-weight: 400; }
.mnl-sponsor-text em { color: var(--g300); font-style: italic; }
.mnl-sponsor-right { }

.mnl-sponsor-types { display: flex; flex-direction: column; gap: 1px; }
.mnl-sponsor-type {
  background: var(--n800); padding: 28px 32px;
  display: grid; grid-template-columns: 28px 1fr; gap: 20px; align-items: start;
  border-left: 3px solid transparent;
  transition: border-color 0.3s, background 0.3s;
}
.mnl-sponsor-type:hover { border-left-color: var(--g400); background: var(--n750); }
.mnl-sponsor-type-num { font-family: var(--fd); font-size: 1rem; color: var(--g400); }
.mnl-sponsor-type-content h4 { font-size: 0.9rem; font-weight: 500; color: var(--w); margin-bottom: 8px; }
.mnl-sponsor-type-content p { font-size: 0.77rem; color: var(--w60); line-height: 1.7; }
.mnl-sponsor-type-badge { font-size: 0.56rem; letter-spacing: 0.18em; text-transform: uppercase; padding: 3px 9px; border: 1px solid rgba(201,168,76,0.3); color: var(--g400); display: inline-block; margin-top: 10px; }

/* ═══════════════════════════════════════════════════
   PROCESS — Vertical timeline
═══════════════════════════════════════════════════ */
.mnl-process { background: var(--n800); padding: 96px 60px; }
.mnl-process-layout { display: grid; grid-template-columns: 400px 1fr; gap: 80px; align-items: start; margin-top: 60px; }
.mnl-process-intro-sticky { position: sticky; top: 100px; }
.mnl-process-intro-title { font-family: var(--fd); font-size: 1.1rem; font-weight: 400; color: var(--w80); line-height: 1.6; margin-bottom: 28px; }
.mnl-process-intro-note { font-size: 0.77rem; color: var(--w30); line-height: 1.75; padding: 20px; border: 1px solid var(--w06); margin-top: 28px; }
.mnl-process-intro-note strong { color: var(--w60); font-weight: 400; }

.mnl-timeline { display: flex; flex-direction: column; }
.mnl-timeline-item {
  display: grid; grid-template-columns: 56px 1fr;
  gap: 28px; padding-bottom: 48px; position: relative;
}
.mnl-timeline-item:last-child { padding-bottom: 0; }
.mnl-timeline-item::before {
  content: ''; position: absolute;
  left: 27px; top: 56px; bottom: 0; width: 1px;
  background: linear-gradient(to bottom, rgba(201,168,76,0.2), transparent);
}
.mnl-timeline-item:last-child::before { display: none; }
.mnl-timeline-dot {
  width: 56px; height: 56px; border-radius: 50%;
  border: 1px solid var(--g400); background: var(--n800);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--fd); font-size: 1rem; color: var(--g400);
  flex-shrink: 0; position: relative; z-index: 1;
  transition: background 0.3s, color 0.3s;
}
.mnl-timeline-item:hover .mnl-timeline-dot { background: var(--g400); color: var(--n900); }
.mnl-timeline-content { padding-top: 14px; }
.mnl-timeline-phase { font-size: 0.58rem; letter-spacing: 0.24em; text-transform: uppercase; color: var(--g400); margin-bottom: 8px; }
.mnl-timeline-title { font-size: 1rem; font-weight: 500; color: var(--w); margin-bottom: 10px; }
.mnl-timeline-desc { font-size: 0.8rem; color: var(--w60); line-height: 1.82; margin-bottom: 14px; }
.mnl-timeline-meta { display: flex; gap: 8px; flex-wrap: wrap; }
.mnl-timeline-tag { font-size: 0.6rem; padding: 4px 10px; border: 1px solid var(--w06); color: var(--w30); letter-spacing: 0.07em; }

/* ═══════════════════════════════════════════════════
   DOCUMENTS
═══════════════════════════════════════════════════ */
.mnl-documents { background: var(--n750); padding: 96px 60px; }
.mnl-docs-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-top: 52px; }
.mnl-docs-col-title { font-family: var(--fd); font-size: 1.1rem; font-weight: 300; color: var(--w60); font-style: italic; margin-bottom: 28px; }
.mnl-doc-item { display: flex; gap: 16px; padding: 18px 0; border-bottom: 1px solid var(--w06); align-items: flex-start; }
.mnl-doc-item:last-child { border-bottom: none; }
.mnl-doc-num { font-family: var(--fd); font-size: 1.4rem; font-weight: 300; color: rgba(201,168,76,0.18); min-width: 32px; line-height: 1; flex-shrink: 0; }
.mnl-doc-info h4 { font-size: 0.82rem; font-weight: 500; color: var(--w); margin-bottom: 4px; }
.mnl-doc-info p { font-size: 0.72rem; color: var(--w60); line-height: 1.55; }
.mnl-docs-note { margin-top: 32px; padding: 24px 28px; border: 1px solid rgba(201,168,76,0.15); background: var(--glow3); font-size: 0.78rem; color: var(--w60); line-height: 1.75; }
.mnl-docs-note strong { color: var(--g400); font-weight: 400; }

/* ═══════════════════════════════════════════════════
   COST ESTIMATOR
═══════════════════════════════════════════════════ */
.mnl-calc { background: var(--n900); padding: 96px 60px; }
.mnl-calc-layout { display: grid; grid-template-columns: 1.2fr 1fr; gap: 64px; align-items: start; margin-top: 52px; }
.mnl-calc-form { display: flex; flex-direction: column; gap: 20px; }
.mnl-calc-field { display: flex; flex-direction: column; gap: 7px; }
.mnl-calc-lbl { font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--w60); }
.mnl-calc-select { background: var(--n800); border: 1px solid var(--w12); color: var(--w); padding: 13px 16px; font-family: var(--fb); font-size: 0.83rem; font-weight: 300; outline: none; transition: border-color 0.3s; appearance: none; cursor: pointer; }
.mnl-calc-select:focus { border-color: var(--g400); }
.mnl-calc-select option { background: var(--n800); }
.mnl-toggle-row { display: flex; }
.mnl-toggle { flex: 1; padding: 11px 10px; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; font-family: var(--fb); cursor: pointer; background: var(--n800); border: 1px solid var(--w12); color: var(--w60); transition: all 0.3s; margin-right: -1px; text-align: center; }
.mnl-toggle.on { background: var(--glow2); border-color: var(--g400); color: var(--g400); position: relative; z-index: 1; }
.mnl-result { background: var(--n800); border: 1px solid rgba(201,168,76,0.2); padding: 40px 36px; position: sticky; top: 90px; }
.mnl-result-tag { font-size: 0.6rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--g400); margin-bottom: 20px; display: block; }
.mnl-result-amount { font-family: var(--fd); font-size: 3.6rem; font-weight: 300; line-height: 1; color: var(--w); }
.mnl-result-currency { color: var(--g400); }
.mnl-result-note { font-size: 0.64rem; color: var(--w30); margin-top: 4px; margin-bottom: 28px; }
.mnl-result-lines { border-top: 1px solid var(--w12); margin-bottom: 20px; }
.mnl-result-line { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--w06); font-size: 0.75rem; }
.mnl-result-line-lbl { color: var(--w60); }
.mnl-result-line-val { color: var(--w); font-weight: 500; }
.mnl-result-total { display: flex; justify-content: space-between; padding: 14px 0 0; font-size: 0.86rem; }
.mnl-result-disclaimer { font-size: 0.67rem; color: var(--w30); line-height: 1.65; margin: 14px 0 22px; }

/* ═══════════════════════════════════════════════════
   FAQ
═══════════════════════════════════════════════════ */
.mnl-faq { background: var(--n800); padding: 96px 60px; }
.mnl-faq-inner { max-width: 820px; margin: 52px auto 0; }
.mnl-faq-item { border-bottom: 1px solid var(--w06); }
.mnl-faq-q { width: 100%; background: none; border: none; padding: 26px 0; display: flex; align-items: center; justify-content: space-between; gap: 24px; cursor: pointer; text-align: left; font-family: var(--fb); }
.mnl-faq-q-text { font-size: 0.92rem; font-weight: 400; color: var(--w); line-height: 1.5; }
.mnl-faq-icon { width: 26px; height: 26px; border: 1px solid var(--w12); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--g400); font-size: 1.1rem; flex-shrink: 0; transition: all 0.3s; }
.mnl-faq-item.open .mnl-faq-icon { background: var(--g400); color: var(--n900); border-color: var(--g400); transform: rotate(45deg); }
.mnl-faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.45s var(--ease); }
.mnl-faq-item.open .mnl-faq-answer { max-height: 500px; }
.mnl-faq-answer-inner { padding-bottom: 24px; }
.mnl-faq-answer p { font-size: 0.83rem; color: var(--w60); line-height: 1.85; }
.mnl-faq-answer ul { margin-top: 12px; list-style: none; display: flex; flex-direction: column; gap: 7px; }
.mnl-faq-answer ul li { font-size: 0.8rem; color: var(--w60); padding-left: 18px; position: relative; line-height: 1.6; }
.mnl-faq-answer ul li::before { content: '—'; position: absolute; left: 0; color: var(--g400); }

/* ═══════════════════════════════════════════════════
   ADVISORY QUOTE
═══════════════════════════════════════════════════ */
.mnl-advisory { background: var(--n750); padding: 96px 60px; position: relative; overflow: hidden; }
.mnl-advisory::before {
  content: '"'; font-family: var(--fd); font-size: 32rem; font-weight: 300;
  position: absolute; top: -80px; left: 30px; line-height: 1;
  color: rgba(201,168,76,0.03); pointer-events: none; user-select: none;
}
.mnl-advisory-inner { max-width: 900px; margin: 0 auto; position: relative; z-index: 1; }
.mnl-advisory-quote {
  font-family: var(--fd); font-size: clamp(1.3rem, 2.5vw, 2rem);
  font-weight: 300; font-style: italic; color: var(--w80); line-height: 1.6;
  text-align: center; padding: 48px 60px;
  border: 1px solid var(--w12); background: var(--n900);
  margin-bottom: 52px;
}
.mnl-advisory-quote strong { color: var(--g400); font-style: normal; }
.mnl-advisory-quote-attr { margin-top: 20px; font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--g400); font-style: normal; display: block; }
.mnl-advisory-tips { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 36px; }
.mnl-tip { border: 1px solid var(--w06); padding: 30px 28px; transition: border-color 0.3s; }
.mnl-tip:hover { border-color: rgba(201,168,76,0.2); }
.mnl-tip-num { font-family: var(--fd); font-size: 0.68rem; letter-spacing: 0.22em; color: var(--g400); margin-bottom: 12px; display: block; }
.mnl-tip h4 { font-size: 0.9rem; font-weight: 500; color: var(--w); margin-bottom: 9px; }
.mnl-tip p { font-size: 0.78rem; color: var(--w60); line-height: 1.78; }
.mnl-advisory-warning { background: rgba(201,168,76,0.05); border: 1px solid rgba(201,168,76,0.18); padding: 28px 32px; }
.mnl-advisory-warning h4 { font-size: 0.82rem; font-weight: 500; color: var(--g400); margin-bottom: 9px; }
.mnl-advisory-warning p { font-size: 0.78rem; color: var(--w60); line-height: 1.78; }

/* ── CTA ─────────────────────────────────────────── */
.mnl-cta { background: var(--cream-bg); padding: 120px 60px; text-align: center; position: relative; overflow: hidden; }
.mnl-cta::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(180,150,90,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(180,150,90,0.06) 1px, transparent 1px); background-size: 56px 56px; }
.mnl-cta::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 65% 55% at 50% 50%, rgba(201,168,76,0.09), transparent); pointer-events: none; }
.mnl-cta-inner { position: relative; z-index: 1; max-width: 620px; margin: 0 auto; }
.mnl-cta-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: #8A6820; margin-bottom: 20px; display: block; }
.mnl-cta-h2 { font-family: var(--fd); font-size: clamp(2.4rem, 4.5vw, 4rem); font-weight: 300; color: var(--cream-ink); line-height: 1.12; margin-bottom: 14px; }
.mnl-cta-h2 em { color: var(--g400); font-style: italic; }
.mnl-cta-divider { width: 44px; height: 1px; background: var(--g400); margin: 22px auto; opacity: 0.5; }
.mnl-cta-p { font-size: 0.84rem; color: var(--cream-ink3); line-height: 1.85; margin-bottom: 48px; }
.mnl-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

/* ── BUTTONS ─────────────────────────────────────── */
.mnl-btn-gold { padding: 15px 38px; background: var(--g400); color: var(--n900); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.mnl-btn-gold:hover { background: var(--g300); transform: translateY(-2px); }
.mnl-btn-ghost { padding: 15px 38px; background: transparent; color: var(--w); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--w30); cursor: pointer; transition: all 0.3s; }
.mnl-btn-ghost:hover { border-color: var(--g400); color: var(--g400); transform: translateY(-2px); }
.mnl-btn-ink { padding: 15px 38px; background: var(--cream-ink); color: var(--cream-bg); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.mnl-btn-ink:hover { background: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }
.mnl-btn-cream-out { padding: 15px 38px; background: transparent; color: var(--cream-ink2); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--cream-bdr); cursor: pointer; transition: all 0.3s; }
.mnl-btn-cream-out:hover { border-color: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }

/* ── FOOTER ──────────────────────────────────────── */
.mnl-footer { background: var(--n950); padding: 52px 60px; border-top: 1px solid var(--w06); }
.mnl-footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
.mnl-footer-logo { font-family: var(--fd); font-size: 1.3rem; letter-spacing: 0.15em; color: var(--w); }
.mnl-footer-logo em { color: var(--g400); font-style: normal; }
.mnl-footer-copy { font-size: 0.68rem; color: var(--w30); }
.mnl-footer-back { padding: 9px 18px; background: transparent; border: 1px solid var(--w12); color: var(--w60); font-family: var(--fb); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
.mnl-footer-back:hover { border-color: var(--g400); color: var(--g400); }

/* ── WA ──────────────────────────────────────────── */
.mnl-wa { position: fixed; bottom: 28px; right: 28px; z-index: 300; width: 50px; height: 50px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 18px rgba(37,211,102,0.4); transition: transform 0.3s; }
.mnl-wa:hover { transform: scale(1.1); }

/* ── REVEAL ──────────────────────────────────────── */
.mnl-reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.85s var(--ease), transform 0.85s var(--ease); }
.mnl-reveal.in { opacity: 1; transform: translateY(0); }
.md1 { transition-delay: 0.05s; } .md2 { transition-delay: 0.15s; }
.md3 { transition-delay: 0.25s; } .md4 { transition-delay: 0.35s; }

/* ── KEYFRAMES ───────────────────────────────────── */
@keyframes mnlFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

/* ── RESPONSIVE ──────────────────────────────────── */
@media(max-width:1100px) {
  .mnl-hero { grid-template-columns: 1fr; }
  .mnl-hero-right { flex-direction: row; border-left: none; border-top: 1px solid var(--w06); }
  .mnl-hero-stat-item { border-bottom: none; border-right: 1px solid var(--w06); }
  .mnl-hero-stat-item:last-child { border-right: none; }
  .mnl-distinction { grid-template-columns: 1fr; }
  .mnl-distinction-divider { height: 1px; width: 100%; }
  .mnl-distinction-col:last-child { padding-left: 0; padding-top: 52px; }
  .mnl-licenses-header { grid-template-columns: 1fr; gap: 24px; }
  .mnl-license-grid { grid-template-columns: 1fr; }
  .mnl-sponsor-inner { grid-template-columns: 1fr; gap: 48px; }
  .mnl-process-layout { grid-template-columns: 1fr; }
  .mnl-process-intro-sticky { position: static; }
  .mnl-docs-layout { grid-template-columns: 1fr; }
  .mnl-calc-layout { grid-template-columns: 1fr; }
  .mnl-result { position: static; }
  .mnl-advisory-tips { grid-template-columns: 1fr; }
}
@media(max-width:768px) {
  .mnl-nav { padding: 16px 24px; } .mnl-nav.scrolled { padding: 12px 24px; } .mnl-nav-links { display: none; }
  .mnl-back-btn { left: 24px; }
  .mnl-hero { padding-top: 120px; }
  .mnl-hero-left { padding: 0 24px 60px; }
  .mnl-hero-h1 .indent { padding-left: 1.2rem; }
  .mnl-licenses, .mnl-sponsor, .mnl-process, .mnl-documents, .mnl-calc, .mnl-faq, .mnl-advisory, .mnl-cta { padding-left: 24px; padding-right: 24px; }
  .mnl-distinction { padding: 0 24px; }
  .mnl-footer { padding: 40px 24px; }
  .mnl-hero-right { flex-direction: column; }
  .mnl-hero-stat-item { border-right: none; border-bottom: 1px solid var(--w06); }
}

  .mnl-nav-hamburger {
    display: none; flex-direction: column; gap: 5px; cursor: pointer;
    background: none; border: none; padding: 6px; z-index: 310;
  }
  .mnl-nav-hamburger span {
    display: block; width: 24px; height: 1.5px; background: rgba(248,245,238,0.6);
    transition: all 0.35s cubic-bezier(0.16,1,0.3,1); transform-origin: center;
  }
  .mnl-nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: #C9A84C; }
  .mnl-nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .mnl-nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: #C9A84C; }
  .mnl-drawer {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(3,10,20,0.97); backdrop-filter: blur(24px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    transform: translateX(100%); transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
    pointer-events: none;
  }
  .mnl-drawer.open { transform: translateX(0); pointer-events: all; }
  .mnl-drawer-brand {
    font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.3rem;
    letter-spacing: .18em; color: #F8F5EE; margin-bottom: 44px;
    opacity: 0; transform: translateY(10px);
    transition: opacity .4s .1s, transform .4s .1s;
  }
  .mnl-drawer.open .mnl-drawer-brand { opacity: 1; transform: translateY(0); }
  .mnl-drawer-brand em { color: #C9A84C; font-style: normal; }
  .mnl-dlink {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2rem, 8vw, 3rem); font-weight: 300; color: rgba(248,245,238,0.6);
    background: none; border: none; padding: 10px 0; cursor: pointer;
    display: block; width: 100%; text-align: center;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, opacity .4s cubic-bezier(0.16,1,0.3,1), transform .4s cubic-bezier(0.16,1,0.3,1);
  }
  .mnl-drawer.open .mnl-dlink { opacity: 1; transform: translateY(0); }
  .mnl-drawer.open .mnl-dlink:nth-of-type(1) { transition-delay: .12s; }
  .mnl-drawer.open .mnl-dlink:nth-of-type(2) { transition-delay: .17s; }
  .mnl-drawer.open .mnl-dlink:nth-of-type(3) { transition-delay: .22s; }
  .mnl-drawer.open .mnl-dlink:nth-of-type(4) { transition-delay: .27s; }
  .mnl-drawer.open .mnl-dlink:nth-of-type(5) { transition-delay: .32s; }
  .mnl-dlink:hover { color: #C9A84C; }
  .mnl-drawer-div { width: 40px; height: 1px; background: rgba(201,168,76,.25); margin: 18px 0; opacity: 0; transition: opacity .4s .34s; }
  .mnl-drawer.open .mnl-drawer-div { opacity: 1; }
  .mnl-dcta {
    font-family: 'DM Sans', sans-serif; font-size: .7rem; letter-spacing: .18em;
    text-transform: uppercase; color: #C9A84C; border: 1px solid #C9A84C;
    background: none; padding: 12px 32px; cursor: pointer; margin-top: 8px;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, background .3s, opacity .4s .38s, transform .4s .38s;
  }
  .mnl-drawer.open .mnl-dcta { opacity: 1; transform: translateY(0); }
  .mnl-dcta:hover { background: #C9A84C; color: #05111e; }
  @media (max-width: 900px) {
    .mnl-nav-links { display: none; }
    .mnl-nav-cta { display: none !important; }
    .mnl-nav-hamburger { display: flex; }
  }
`;

// ── DATA ──────────────────────────────────────────────────────
const LICENSES = [
  {
    num: "01", icon: "🏢", name: "LLC", subtitle: "Limited Liability Company",
    desc: "The most widely used mainland structure. A UAE LLC requires 2–50 shareholders with a minimum 51% UAE national shareholding — however, in practice, the sponsor's role can be structured via a legally binding side agreement that protects 100% of economic rights for the foreign investor.",
    examples: ["Trading companies","Retail businesses","Distribution & logistics","Restaurants & hospitality","General contracting"],
  },
  {
    num: "02", icon: "👤", name: "Sole Est.", subtitle: "Sole Establishment",
    desc: "For individual foreign professionals and solo operators. A Sole Establishment is 100% owned by a foreign national — no UAE sponsor required — but is restricted to professional and service activities. The most direct route to UAE mainland for consultants and specialists.",
    examples: ["Consulting & advisory","IT & software services","Design & creative","Healthcare professionals","Engineering consultancy"],
  },
  {
    num: "03", icon: "🌐", name: "Branch", subtitle: "Foreign Company Branch",
    desc: "An extension of an existing overseas company into the UAE mainland. A branch carries the parent company's name and liability — no separate legal entity. Requires a Local Service Agent (LSA) rather than a sponsor. Well-suited for multinationals establishing a UAE presence.",
    examples: ["Multinational regional offices","Professional services firms","Engineering companies","IT & technology companies","Consulting practices"],
  },
];

const SPONSOR_TYPES = [
  { num: "01", title: "Local Service Agent (LSA)", desc: "Used for professional licenses and branch offices. The LSA has no ownership or profit-sharing rights — they simply represent the business with government authorities. Fee-based arrangement, typically AED 5,000–12,000 annually.", badge: "Professional License" },
  { num: "02", title: "UAE National Sponsor (LLC)", desc: "Holds the nominal 51% shareholding required by DED for LLC formation. A side agreement (Nominee Agreement) legally documents that 100% of economic benefits belong to the foreign investor. INCOZONE uses ADGM-registered legal frameworks for maximum protection.", badge: "LLC Formation" },
  { num: "03", title: "Corporate Sponsor", desc: "For larger transactions or investors requiring an additional layer of institutional credibility, a corporate UAE entity can act as sponsor. Adds cost but enhances counterparty perception for certain industries.", badge: "Premium Option" },
  { num: "04", title: "100% Foreign Ownership Activities", desc: "Since 2021, UAE Federal Law permits 100% foreign ownership for a growing list of mainland activities — no sponsor required. INCOZONE assesses whether your activity qualifies before recommending any sponsor arrangement.", badge: "No Sponsor Needed" },
];

const TIMELINE = [
  { num: "01", phase: "Week 1", title: "Initial Consultation & Structure Decision", desc: "We assess your business activity, ownership preferences, and budget — then recommend the right license type (LLC, Sole Est., or Branch) and the optimal emirate (Dubai, Abu Dhabi, Sharjah). Structure decisions made upfront save significant cost later.", tags: ["Business Plan", "Activity List", "Ownership Decision"] },
  { num: "02", phase: "Week 1–2", title: "Trade Name Reservation & Initial Approval", desc: "Preferred trade name submitted to DED (or relevant emirate authority). Initial approval letter issued upon name and activity clearance.", tags: ["Trade Name", "Activity Approval", "DED Initial Approval"] },
  { num: "03", phase: "Week 2–3", title: "MOA Drafting & Notarisation", desc: "Memorandum of Association drafted, reviewed by all shareholders, and notarised at a UAE Notary Public. For LLC structures, the sponsor and side agreement are executed simultaneously.", tags: ["MOA", "Notarisation", "Sponsor Agreement", "Side Agreement"] },
  { num: "04", phase: "Week 3–4", title: "License Issuance & Office Lease", desc: "Final DED application submitted with notarised MOA and Ejari (tenancy contract). Commercial license issued. Physical office address is mandatory for all mainland licenses — INCOZONE recommends cost-efficient options.", tags: ["Trade License", "Ejari", "DED Final Approval"] },
  { num: "05", phase: "Week 4–6", title: "Investor Visa & Emirates ID", desc: "Investor visa application, medical fitness, biometrics, and Emirates ID. Labour card and establishment card where required. INCOZONE's PRO team manages every government interaction.", tags: ["Investor Visa", "Medical Test", "Emirates ID", "Labour Card"] },
  { num: "06", phase: "Week 6–9", title: "Bank Account Opening", desc: "Introduction to UAE banks suited to mainland business models. Full documentation support — most mainland companies choose from Emirates NBD, Mashreq, FAB, or ADCB for primary banking.", tags: ["Bank Application", "Company Docs", "Source of Funds"] },
];

const DOCS_INDIVIDUAL = [
  { t: "Passport Copy", d: "Valid passport — minimum 6 months validity for all shareholders, directors and managers" },
  { t: "UAE Entry Visa or Residency", d: "Copy of UAE visit visa, residence visa, or entry stamp — all shareholders must be in the UAE for notarisation" },
  { t: "Passport-size Photograph", d: "Recent white background photograph for each shareholder and visa applicant" },
  { t: "Residential Address Proof", d: "Utility bill or bank statement — not older than 3 months, for all foreign shareholders" },
  { t: "No Objection Certificate", d: "If currently employed in UAE under a residence visa, NOC from current employer may be required" },
  { t: "Source of Funds", d: "Bank statement or declaration confirming the origin of investment capital" },
];

const DOCS_CORPORATE = [
  { t: "Certificate of Incorporation", d: "For corporate shareholders — original or certified copy, attested by UAE Embassy and Ministry of Foreign Affairs" },
  { t: "Memorandum & Articles", d: "Attested MOA/Articles of Association of the parent company — required for branch and LLC corporate shareholders" },
  { t: "Board Resolution", d: "Resolution authorising the UAE company formation and naming the authorised signatory" },
  { t: "Power of Attorney", d: "Notarised POA authorising a UAE-based representative to sign documents on behalf of the parent company" },
  { t: "Register of Shareholders", d: "Current shareholder register — UBO disclosure required under UAE AML regulations" },
  { t: "Audited Accounts", d: "Last 2 years audited financial statements — required for branches and some corporate structures" },
];

const FAQS = [
  { q: "Does UAE mainland still require a local sponsor for all businesses?", a: "No — since the 2021 UAE Commercial Companies Law reform, a significant list of mainland activities now permits 100% foreign ownership without any local sponsor. However, this does not apply to all activities. Trading companies and businesses in certain regulated sectors still require a UAE national to hold 51% nominal shareholding. INCOZONE assesses your specific activity before recommending any structure." },
  { q: "What is a 'side agreement' and how does it protect foreign investors?", a: "A side agreement (also called a Nominee Shareholder Agreement) is a private legal contract between the foreign investor and the UAE national sponsor. It legally documents that the sponsor holds shares in name only — all economic rights, profits, management authority, and liquidation proceeds belong to the foreign investor. INCOZONE structures these via ADGM-registered legal frameworks for maximum enforceability.", list: ["Profit entitlement: 100% to foreign investor", "Management authority: 100% to foreign investor", "Liquidation rights: 100% to foreign investor", "Sponsor compensation: Fixed annual fee only"] },
  { q: "What is the difference between a mainland license and a free zone license for banking?", a: "Mainland companies have a distinct advantage: they can open accounts at all UAE banks without the additional scrutiny sometimes applied to free zone entities. Mainland companies also have full access to UAE trade finance, letters of credit, and corporate banking facilities — particularly relevant for businesses with significant UAE domestic trade volumes." },
  { q: "Can a mainland company operate anywhere in the UAE?", a: "Yes — a UAE mainland trade license (DED or equivalent) permits you to conduct business anywhere in the UAE: all seven emirates, all free zones, and internationally. Unlike free zone companies, mainland entities face no restriction on where they operate or who they serve within the UAE domestic market." },
  { q: "Is a physical office address required for mainland setup?", a: "Yes — all UAE mainland licenses require a physical office address with an Ejari (registered tenancy contract). INCOZONE advises on cost-efficient flexi-desk and serviced office options that satisfy the requirement without committing to expensive long-term leases before the business is established." },
  { q: "How does the 2021 Foreign Ownership Law work in practice?", a: "The UAE's amended Commercial Companies Law (2021) removed the mandatory 51% UAE national shareholding requirement for a list of eligible activities. If your business activity appears on the eligible list, you can own 100% of a mainland LLC without any local partner. Activities not on the list still require the traditional sponsor structure. INCOZONE verifies your activity's eligibility in the initial consultation." },
  { q: "What are the annual renewal costs for a mainland company?", a: "UAE mainland license renewals typically range from AED 8,000 to AED 18,000 depending on the license type, number of activities, office arrangement, and emirate. Visa renewals are separate — approximately AED 3,500–5,500 per visa. INCOZONE manages all renewals proactively with advance reminders." },
  { q: "Can I have both a mainland license and a free zone license?", a: "Yes — having both structures is common and strategically sensible. The free zone entity handles international operations and provides visa-efficient residency; the mainland entity handles UAE domestic sales and operations. INCOZONE advises on dual-entity structures regularly and can manage both simultaneously." },
];

// ── HERO CANVAS ────────────────────────────────────────────────
function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let W, H, raf, t = 0;
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * 1920, y: Math.random() * 1080,
      vx: (Math.random() - .5) * 0.18, vy: (Math.random() - .5) * 0.18,
      r: Math.random() * 1.3 + 0.3, o: Math.random() * 0.38 + 0.12,
    }));
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      t += 0.004; ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#05111e"); bg.addColorStop(1, "#020b14");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      [[0.1, 0.4, "#C9A84C", 0.055, 13], [0.9, 0.2, "#163354", 0.42, 10], [0.5, 0.75, "#C9A84C", 0.035, 16]].forEach(([bx, by, col, a, spd], i) => {
        const x = W * bx + Math.sin(t * (spd / 10) + i * 2.1) * 75;
        const y = H * by + Math.cos(t * (spd / 13) + i) * 55;
        const r = Math.min(W, H) * 0.56;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        const rgb = parseInt(col.slice(1), 16);
        g.addColorStop(0, `rgba(${rgb >> 16},${(rgb >> 8) & 255},${rgb & 255},${a})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      });
      ctx.strokeStyle = "rgba(201,168,76,0.03)"; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 88) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 88) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 175) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(201,168,76,${0.075 * (1 - d / 175)})`; ctx.lineWidth = 0.45; ctx.stroke(); }
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.o})`; ctx.fill();
      }
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.15, W / 2, H / 2, H * 0.88);
      vg.addColorStop(0, "transparent"); vg.addColorStop(1, "rgba(2,11,20,0.62)");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="mnl-hero-canvas" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />;
}

// ── REVEAL HOOK ────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".mnl-reveal");
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
    }), { threshold: 0.07 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ── CALCULATOR ────────────────────────────────────────────────
function Calculator() {
  const [type, setType] = useState("llc");
  const [emirate, setEmirate] = useState("dubai");
  const [activities, setActivities] = useState("1");
  const [sponsor, setSponsor] = useState(true);
  const [visas, setVisas] = useState("2");
  const [pro, setPro] = useState(false);

  const typeC = { llc: 18500, sole: 12500, branch: 22000 };
  const emirateC = { dubai: 0, abudhabi: 2500, sharjah: -3000, ajman: -4500 };
  const actC = { "1": 0, "3": 2800, "5": 5200 };
  const visaC = { "0": 0, "2": 0, "5": 5500, "10": 12000 };

  const total = (typeC[type] || 0) + (emirateC[emirate] || 0) + (actC[activities] || 0) + (sponsor ? 4500 : 0) + (visaC[visas] || 0) + (pro ? 3800 : 0);
  const f = n => "AED " + n.toLocaleString();

  return (
    <div className="mnl-calc-layout">
      <div>
        <h2 className="mnl-h2 mnl-reveal">Estimate Your <em>Mainland Cost</em></h2>
        <p className="mnl-reveal md1" style={{ fontSize: "0.84rem", color: "var(--w60)", margin: "12px 0 36px", lineHeight: 1.8 }}>Configure your mainland requirements and get an indicative setup cost.</p>
        <div className="mnl-calc-form">
          {[
            { l: "License Type", id: "type", val: type, set: setType, opts: [["llc","LLC — Limited Liability Company (AED 18,500)"],["sole","Sole Establishment (AED 12,500)"],["branch","Foreign Branch (AED 22,000)"]] },
            { l: "Emirate", id: "em", val: emirate, set: setEmirate, opts: [["dubai","Dubai (DED)"],["abudhabi","Abu Dhabi (+AED 2,500)"],["sharjah","Sharjah (−AED 3,000)"],["ajman","Ajman (−AED 4,500)"]] },
            { l: "Business Activities", id: "act", val: activities, set: setActivities, opts: [["1","1 Activity (Included)"],["3","3 Activities (+AED 2,800)"],["5","5 Activities (+AED 5,200)"]] },
            { l: "Visa Allocation", id: "vis", val: visas, set: setVisas, opts: [["0","No Visas"],["2","2 Visas (Included)"],["5","5 Visas (+AED 5,500)"],["10","10 Visas (+AED 12,000)"]] },
          ].map(({ l, id, val, set, opts }) => (
            <div className="mnl-calc-field mnl-reveal" key={id}>
              <label className="mnl-calc-lbl">{l}</label>
              <select className="mnl-calc-select" value={val} onChange={e => set(e.target.value)}>
                {opts.map(([v, lab]) => <option key={v} value={v}>{lab}</option>)}
              </select>
            </div>
          ))}
          <div className="mnl-calc-field mnl-reveal">
            <label className="mnl-calc-lbl">Local Sponsor / LSA Arrangement</label>
            <div className="mnl-toggle-row">
              <button className={`mnl-toggle${!sponsor ? " on" : ""}`} onClick={() => setSponsor(false)}>100% Foreign Ownership</button>
              <button className={`mnl-toggle${sponsor ? " on" : ""}`} onClick={() => setSponsor(true)}>Sponsor Required (+AED 4,500)</button>
            </div>
          </div>
          <div className="mnl-calc-field mnl-reveal">
            <label className="mnl-calc-lbl">PRO & Government Services</label>
            <div className="mnl-toggle-row">
              <button className={`mnl-toggle${!pro ? " on" : ""}`} onClick={() => setPro(false)}>Not Required</button>
              <button className={`mnl-toggle${pro ? " on" : ""}`} onClick={() => setPro(true)}>Add PRO (+AED 3,800)</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mnl-result mnl-reveal">
        <span className="mnl-result-tag">Estimated Total</span>
        <div className="mnl-result-amount"><span className="mnl-result-currency">AED </span>{total.toLocaleString()}</div>
        <div className="mnl-result-note">One-time setup · excludes annual renewal & office lease</div>
        <div className="mnl-result-lines">
          <div className="mnl-result-line"><span className="mnl-result-line-lbl">Base License Fee</span><span className="mnl-result-line-val">{f(typeC[type])}</span></div>
          {emirateC[emirate] !== 0 && <div className="mnl-result-line"><span className="mnl-result-line-lbl">Emirate Adjustment</span><span className="mnl-result-line-val">{emirateC[emirate] > 0 ? "+" : ""}{f(emirateC[emirate])}</span></div>}
          {actC[activities] > 0 && <div className="mnl-result-line"><span className="mnl-result-line-lbl">Additional Activities</span><span className="mnl-result-line-val">+{f(actC[activities])}</span></div>}
          {sponsor && <div className="mnl-result-line"><span className="mnl-result-line-lbl">Sponsor Arrangement</span><span className="mnl-result-line-val">+{f(4500)}</span></div>}
          {visaC[visas] > 0 && <div className="mnl-result-line"><span className="mnl-result-line-lbl">Visa Processing</span><span className="mnl-result-line-val">+{f(visaC[visas])}</span></div>}
          {pro && <div className="mnl-result-line"><span className="mnl-result-line-lbl">PRO Services</span><span className="mnl-result-line-val">+{f(3800)}</span></div>}
        </div>
        <div className="mnl-result-total"><span style={{ color: "var(--w)", fontWeight: 500 }}>Total Estimate</span><span style={{ color: "var(--g400)", fontWeight: 600 }}>{f(total)}</span></div>
        <p className="mnl-result-disclaimer">Estimate only. Final costs depend on current DED authority fees, office lease, and specific activity requirements.</p>
        <button className="mnl-btn-gold" style={{ width: "100%" }}>Get Exact Quote →</button>
      </div>
    </div>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────
export default function MainlandPage({ onBack, onNavigate }) {
  const [_mnlOpen, setmnlOpen] = useState(false);
  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = _mnlOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [_mnlOpen]);

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
    <div className="mnl-root">
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className={`mnl-nav${scrolled ? " scrolled" : ""}`}>
        <div className="mnl-nav-logo" onClick={()=>{if(onNavigate){onNavigate("home");window.scrollTo(0,0);}}}>INCO<em>ZONE</em></div>
        <ul className="mnl-nav-links">{["Services","Free Zones","About","Blog","Contact"].map(l=>{const m={"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};return <li key={l}><a href="#" onClick={e=>{e.preventDefault();if(onNavigate){onNavigate(m[l]);window.scrollTo(0,0);}}}>{l}</a></li>;})}</ul>
        <button className="mnl-nav-cta" onClick={()=>{if(onNavigate){onNavigate("schedule");window.scrollTo(0,0);}}}>Schedule Consultation</button>
      
        {/* Hamburger */}
        <button
          className={`mnl-nav-hamburger${_mnlOpen ? " open" : ""}`}
          onClick={() => setmnlOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`mnl-drawer${_mnlOpen ? " open" : ""}`}>
        <div className="mnl-drawer-brand"
          onClick={() => { setmnlOpen(false); if(onNavigate) { onNavigate("home"); window.scrollTo(0,0); } }}>
          INCO<em>ZONE</em>
        </div>
        {["Services","Free Zones","About","Blog","Contact"].map((l) => {
          const pm = {"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};
          return (
            <button key={l} className="mnl-dlink"
              onClick={() => { setmnlOpen(false); if(onNavigate) { onNavigate(pm[l]); window.scrollTo(0,0); } }}>
              {l}
            </button>
          );
        })}
        <div className="mnl-drawer-div" />
        <button className="mnl-dcta"
          onClick={() => { setmnlOpen(false); if(onNavigate) { onNavigate("schedule"); window.scrollTo(0,0); } }}>
          Schedule Consultation
        </button>
      </div>

      {/* ── HERO ── */}
      <section className="mnl-hero">
        <HeroCanvas />
        <button className="mnl-back-btn" onClick={onBack}>Back to Services</button>

        <div className="mnl-hero-left">
          <div className="mnl-hero-service-num">02&nbsp;&nbsp;Mainland Formation</div>
          <h1 className="mnl-hero-h1">
            Operate<br />
            <span className="accent">Anywhere</span>
            <span className="indent">in UAE.</span>
          </h1>
          <p className="mnl-hero-desc">
            End-to-end mainland LLC, Sole Establishment, and Branch formation. <strong>Government liaison, DED approvals, and local sponsor arrangements managed discreetly.</strong> The only setup that gives you unrestricted access to UAE's domestic market.
          </p>
          <div className="mnl-hero-actions">
            <button className="mnl-btn-gold">Start Mainland Setup →</button>
            <button className="mnl-btn-ghost">Download Free Guide</button>
          </div>
        </div>

        <div className="mnl-hero-right">
          {[
            { eyebrow: "License From", val: "AED 12,500", sub: "Sole Establishment — lowest entry" },
            { eyebrow: "Setup Timeline", val: "4–6 Wks", sub: "License to visa to bank account" },
            { eyebrow: "Market Access", val: "100%", sub: "UAE domestic market — all 7 emirates" },
            { eyebrow: "Foreign Ownership", val: "Up to 100%", sub: "For eligible activity categories" },
            { eyebrow: "Annual Renewal", val: "AED 8–18K", sub: "Depending on emirate and activity" },
          ].map((s, i) => (
            <div className="mnl-hero-stat-item" key={i}>
              <div className="mnl-hero-stat-eyebrow">{s.eyebrow}</div>
              <div className="mnl-hero-stat-val">{s.val}</div>
              <div className="mnl-hero-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DISTINCTION BAND ── */}
      <div className="mnl-distinction">
        <div className="mnl-distinction-col mnl-reveal">
          <div className="mnl-distinction-label free"><div className="mnl-distinction-label-dot" />Free Zone</div>
          <div className="mnl-distinction-title">Ideal for international operations</div>
          <p className="mnl-distinction-text">Free zone companies offer fast, affordable setup with 100% foreign ownership and streamlined visa processing. Best suited for businesses that primarily operate internationally, provide professional services, or want the most efficient UAE residency route.</p>
          <div className="mnl-distinction-tags">
            {["Faster Setup","Lower Cost","100% Ownership","International Focus","Remote OK"].map(t => <span className="mnl-distinction-tag" key={t}>{t}</span>)}
          </div>
        </div>
        <div className="mnl-distinction-divider" />
        <div className="mnl-distinction-col mnl-reveal md2">
          <div className="mnl-distinction-label mainland"><div className="mnl-distinction-label-dot" />Mainland</div>
          <div className="mnl-distinction-title">Essential for UAE domestic business</div>
          <p className="mnl-distinction-text">A mainland license is required to directly sell to UAE consumers and businesses, bid on government contracts, open retail premises, and operate without geographic restriction. For businesses targeting the UAE domestic market, there is no alternative to a mainland license.</p>
          <div className="mnl-distinction-tags">
            {["UAE Domestic Market","Government Contracts","Retail Premises","No Restrictions","Stronger Banking"].map(t => <span className="mnl-distinction-tag active" key={t}>{t}</span>)}
          </div>
        </div>
      </div>

      {/* ── LICENSE TYPES ── */}
      <section className="mnl-licenses">
        <div className="mnl-licenses-header">
          <div className="mnl-reveal">
            <span className="mnl-section-label">License Structures</span>
            <h2 className="mnl-h2">Three paths.<br /><em>One right choice</em><br />for your model.</h2>
          </div>
          <div className="mnl-reveal md2">
            <p className="mnl-licenses-desc">UAE mainland offers three distinct legal structures — each with different ownership implications, liability profiles, and activity permissions. <strong>Choosing the right one from the start avoids expensive restructuring later.</strong></p>
          </div>
        </div>
        <div className="mnl-license-grid">
          {LICENSES.map((l, i) => (
            <div className={`mnl-license-card mnl-reveal md${i + 1}`} key={i}>
              <span className="mnl-license-card-num">{l.num}</span>
              <div className="mnl-license-icon">{l.icon}</div>
              <div className="mnl-license-name">{l.name}</div>
              <div className="mnl-license-subtitle">{l.subtitle}</div>
              <p className="mnl-license-desc">{l.desc}</p>
              <div className="mnl-license-examples">
                {l.examples.map(e => <div className="mnl-license-example" key={e}>{e}</div>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SPONSOR SECTION ── */}
      <section className="mnl-sponsor">
        <span className="mnl-section-label mnl-reveal">Sponsor Structures</span>
        <h2 className="mnl-h2 mnl-reveal md1" style={{ maxWidth: 600, marginBottom: 52 }}>The sponsor question —<br /><em>answered honestly.</em></h2>
        <div className="mnl-sponsor-inner">
          <div className="mnl-sponsor-left mnl-reveal">
            <div className="mnl-sponsor-text">
              <p>The UAE sponsor requirement is the topic most misunderstood — and most exploited — in the UAE company formation industry. Let us explain it plainly.</p>
              <p>For <strong>LLC formation</strong>, UAE law requires a UAE national to hold 51% of shares. In practice, this is a nominal shareholding — the sponsor has <em>no management rights, no profit entitlement, and no operational involvement.</em> Their role is to satisfy the legal requirement, for a fixed annual fee.</p>
              <p>A properly drafted <strong>Nominee Shareholder Agreement</strong> — ideally registered under a recognised common-law jurisdiction like ADGM — legally protects 100% of your economic and management rights. This is the structure INCOZONE uses for every LLC engagement.</p>
              <p>Importantly, since 2021, <strong>many activities qualify for 100% foreign ownership</strong> on the mainland — no sponsor at all. We verify your activity's eligibility before recommending any sponsor arrangement. If you don't need a sponsor, we will tell you.</p>
            </div>
          </div>
          <div className="mnl-sponsor-right mnl-reveal md2">
            <div className="mnl-sponsor-types">
              {SPONSOR_TYPES.map((s, i) => (
                <div className="mnl-sponsor-type" key={i}>
                  <div className="mnl-sponsor-type-num">{s.num}</div>
                  <div className="mnl-sponsor-type-content">
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                    <span className="mnl-sponsor-type-badge">{s.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="mnl-process">
        <span className="mnl-section-label mnl-reveal">Setup Process</span>
        <h2 className="mnl-h2 mnl-reveal md1">Your mainland setup —<br /><em>week by week.</em></h2>
        <div className="mnl-process-layout">
          <div className="mnl-process-intro-sticky mnl-reveal">
            <p className="mnl-process-intro-title">From first consultation to fully operational — 6 to 9 weeks, managed entirely by INCOZONE.</p>
            <div className="mnl-process-intro-note">
              <strong>Important:</strong> mainland setup requires a physical UAE presence at key stages — notarisation, visa biometrics, and bank account opening. INCOZONE plans these around a single efficient visit whenever possible.
            </div>
          </div>
          <div className="mnl-timeline">
            {TIMELINE.map((s, i) => (
              <div className={`mnl-timeline-item mnl-reveal md${(i % 3) + 1}`} key={i}>
                <div className="mnl-timeline-dot">{s.num}</div>
                <div className="mnl-timeline-content">
                  <div className="mnl-timeline-phase">{s.phase}</div>
                  <div className="mnl-timeline-title">{s.title}</div>
                  <p className="mnl-timeline-desc">{s.desc}</p>
                  <div className="mnl-timeline-meta">{s.tags.map(t => <span className="mnl-timeline-tag" key={t}>{t}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCUMENTS ── */}
      <section className="mnl-documents">
        <span className="mnl-section-label mnl-reveal">Required Documents</span>
        <h2 className="mnl-h2 mnl-reveal md1">What you need<br /><em>to prepare.</em></h2>
        <div className="mnl-docs-layout">
          <div>
            <div className="mnl-docs-col-title mnl-reveal">For individual shareholders</div>
            {DOCS_INDIVIDUAL.map((d, i) => (
              <div className={`mnl-doc-item mnl-reveal md${(i % 2) + 1}`} key={i}>
                <div className="mnl-doc-num">0{i + 1}</div>
                <div className="mnl-doc-info"><h4>{d.t}</h4><p>{d.d}</p></div>
              </div>
            ))}
          </div>
          <div>
            <div className="mnl-docs-col-title mnl-reveal">For corporate shareholders</div>
            {DOCS_CORPORATE.map((d, i) => (
              <div className={`mnl-doc-item mnl-reveal md${(i % 2) + 1}`} key={i}>
                <div className="mnl-doc-num">0{i + 1}</div>
                <div className="mnl-doc-info"><h4>{d.t}</h4><p>{d.d}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="mnl-docs-note mnl-reveal">
          <strong>Attestation note:</strong> Documents issued outside the UAE must be notarised in the country of issue, then attested by the UAE Embassy in that country, then counter-attested by the UAE Ministry of Foreign Affairs. INCOZONE provides a detailed attestation guide for every client.
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section className="mnl-calc">
        <span className="mnl-section-label mnl-reveal">Cost Estimator</span>
        <Calculator />
      </section>

      {/* ── FAQ ── */}
      <section className="mnl-faq">
        <span className="mnl-section-label mnl-reveal" style={{ textAlign: "center", display: "block" }}>FAQ</span>
        <h2 className="mnl-h2 mnl-reveal md1" style={{ textAlign: "center" }}>Frequently Asked <em>Questions</em></h2>
        <div className="mnl-faq-inner">
          {FAQS.map((f, i) => (
            <div className={`mnl-faq-item mnl-reveal md${(i % 3) + 1}${openFaq === i ? " open" : ""}`} key={i}>
              <button className="mnl-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="mnl-faq-q-text">{f.q}</span>
                <div className="mnl-faq-icon">+</div>
              </button>
              <div className="mnl-faq-answer">
                <div className="mnl-faq-answer-inner">
                  <p>{f.a}</p>
                  {f.list && <ul>{f.list.map(li => <li key={li}>{li}</li>)}</ul>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ADVISORY ── */}
      <section className="mnl-advisory">
        <div className="mnl-advisory-inner">
          <div className="mnl-advisory-quote mnl-reveal">
            "The mainland sponsor question has been used to scare investors away from the most commercially powerful UAE structure.{" "}
            <strong>A properly structured LLC with a legally sound nominee agreement gives you everything — full domestic market access, stronger banking, government contracts — with none of the risk that bad actors have historically associated with the sponsor requirement.</strong>"
            <span className="mnl-advisory-quote-attr">— INCOZONE Advisory Team</span>
          </div>
          <div className="mnl-advisory-tips">
            {[
              { n: "01", t: "Mainland or Free Zone — The Real Question", p: "The choice comes down to one question: do you need to sell directly to UAE consumers and businesses, or bid on government contracts? If yes — you need a mainland license. No free zone address can substitute. If you operate internationally and don't need UAE domestic market access, a free zone is more efficient. INCOZONE helps you answer this honestly." },
              { n: "02", t: "Dubai vs Other Emirates", p: "Dubai DED licenses are the most commercially credible — clients, partners, and banks respond best to a Dubai address. However, Abu Dhabi offers stronger access to government entity contracts; Sharjah and Ajman are meaningfully cheaper. INCOZONE recommends the emirate that matches your commercial objectives, not just the cheapest option." },
              { n: "03", t: "The Physical Office Requirement", p: "Mainland licenses require a real, physical office address registered under Ejari. This adds ongoing cost. INCOZONE has established relationships with affordable flexi-desk and serviced office providers across Dubai and Abu Dhabi that satisfy the DED requirement at the lowest possible annual cost — typically AED 8,000–18,000." },
              { n: "04", t: "100% Ownership Activities — Check First", p: "Since 2021, over 1,000 business activities qualify for 100% foreign ownership on the UAE mainland. Before any sponsor arrangement is recommended or signed, INCOZONE verifies whether your specific activity is on the eligible list. Many clients are surprised to discover they don't need a sponsor at all." },
            ].map((tip, i) => (
              <div className={`mnl-tip mnl-reveal md${(i % 2) + 1}`} key={i}>
                <span className="mnl-tip-num">{tip.n}</span>
                <h4>{tip.t}</h4>
                <p>{tip.p}</p>
              </div>
            ))}
          </div>
          <div className="mnl-advisory-warning mnl-reveal">
            <h4>⚠️ When Mainland Might Not Be Right For You</h4>
            <p>Consider a free zone if: you operate primarily internationally with no UAE domestic sales requirement · you need the fastest, most affordable setup — free zones are significantly cheaper and faster · your business model is consulting, IT, or professional services with no physical retail requirement · you want maximum visa allocation flexibility without committing to a physical office lease. INCOZONE will tell you clearly which structure serves your business — not which generates the higher fee.</p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mnl-cta">
        <div className="mnl-cta-inner">
          <span className="mnl-cta-label mnl-reveal">Begin</span>
          <h2 className="mnl-cta-h2 mnl-reveal md1">Ready to establish your<br /><em>UAE mainland presence?</em></h2>
          <div className="mnl-cta-divider" />
          <p className="mnl-cta-p mnl-reveal md2">Private consultation. No obligation. Our mainland specialists will assess your business model and tell you exactly what structure you need — and what it will cost.</p>
          <div className="mnl-cta-btns mnl-reveal md3">
            <button className="mnl-btn-ink">Schedule Private Consultation</button>
            <button className="mnl-btn-cream-out" onClick={onBack}>← Back to Services</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="mnl-footer">
        <div className="mnl-footer-inner">
          <div className="mnl-footer-logo">INCO<em>ZONE</em></div>
          <div className="mnl-footer-copy">© 2025 INCOZONE. All rights reserved. Dubai, UAE.</div>
          <button className="mnl-footer-back" onClick={onBack}>← Back to Services</button>
        </div>
      </footer>

      {/* ── WA ── */}
      <div className="mnl-wa">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </div>
    </div>
  );
}
