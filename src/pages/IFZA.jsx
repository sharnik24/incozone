import { useState, useEffect, useRef } from "react";
import { IArrowsExchange, IShoppingBag, IMonitor, IMegaphone, ICross, IBookOpen, IBuilding, IBriefcase, ILeaf, ICompass, IPackage, IPenTool, ITag, IClock, ILaptop, IShield, IUsers } from "../icons";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — IFZA Free Zone Page  (standalone, self-contained)
//  Drop into: src/pages/IFZA.jsx
//  Usage:     import IFZAPage from "./pages/IFZA"
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

.ifza-root *, .ifza-root *::before, .ifza-root *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}
.ifza-root {
  --n950: #020b14; --n900: #05111e; --n800: #091928; --n750: #0c2033;
  --n700: #102540; --n600: #163354; --n500: #1e4570;

  /* IFZA accent — teal-gold instead of pure gold */
  --a400: #4CAAAA; --a300: #68BCBC; --a200: #9DD4D4; --a100: #C8EDED;
  --aglow:  rgba(76,170,170,0.14); --aglow2: rgba(76,170,170,0.07);
  --aglow3: rgba(76,170,170,0.04);
  --g400: #C9A84C; --g300: #D4B468;

  --cream-bg:  #F5FAFA; --cream-100: #E8F4F4; --cream-200: #D4EBEB;
  --cream-ink: #0A1A1A; --cream-ink2: #1A3A3A; --cream-ink3: #3A6A6A;
  --cream-bdr: rgba(76,170,170,0.2);

  --w:   #F0F8F8; --w80: rgba(240,248,248,0.80); --w60: rgba(240,248,248,0.60);
  --w30: rgba(240,248,248,0.30); --w12: rgba(240,248,248,0.12);
  --w06: rgba(240,248,248,0.06); --w03: rgba(240,248,248,0.03);
  --fd: 'Cormorant Garamond', Georgia, serif;
  --fb: 'DM Sans', system-ui, sans-serif;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  font-family: var(--fb); font-weight: 300; line-height: 1.6;
  color: var(--w); background: var(--n900);
  overflow-x: hidden; width: 100%;
}

/* ── NAV ─────────────────────────────────────────────────────── */
.ifza-nav {
  position: fixed; inset-inline: 0; top: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 60px;
  transition: background 0.5s, padding 0.4s, border-color 0.5s;
  border-bottom: 1px solid transparent;
}
.ifza-nav.scrolled {
  background: rgba(5,17,30,0.96); backdrop-filter: blur(20px);
  padding: 14px 60px; border-bottom-color: rgba(76,170,170,0.15);
}
.ifza-nav-logo { font-family: var(--fd); font-size: 1.5rem; font-weight: 500; letter-spacing: 0.15em; color: var(--w); cursor: pointer; }
.ifza-nav-logo em { color: var(--a400); font-style: normal; }
.ifza-nav-links { display: flex; gap: 36px; list-style: none; }
.ifza-nav-links a { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--w60); text-decoration: none; transition: color 0.3s; }
.ifza-nav-links a:hover { color: var(--a300); }
.ifza-nav-cta {
  font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
  background: transparent; border: 1px solid var(--a400); color: var(--a400);
  padding: 9px 22px; cursor: pointer; font-family: var(--fb);
  transition: background 0.3s, color 0.3s;
}
.ifza-nav-cta:hover { background: var(--a400); color: var(--n900); }
.ifza-back-btn {
  position: absolute; top: 90px; left: 60px; z-index: 20;
  background: none; border: none; font-family: var(--fb); font-size: 0.7rem;
  letter-spacing: 0.18em; text-transform: uppercase; color: var(--w30);
  cursor: pointer; display: flex; align-items: center; gap: 10px; padding: 0;
  transition: color 0.3s;
}
.ifza-back-btn:hover { color: var(--a400); }
.ifza-back-btn::before { content: '←'; font-size: 0.9rem; }

/* ── HERO ────────────────────────────────────────────────────── */
.ifza-hero {
  min-height: 100vh; position: relative; overflow: hidden;
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: flex-end; padding: 0 60px 80px; gap: 60px;
}
.ifza-hero-canvas { position: absolute; inset: 0; z-index: 0; display: block; }
.ifza-hero-left { position: relative; z-index: 2; padding-top: 160px; }
.ifza-hero-right { position: relative; z-index: 2; padding-top: 160px; display: flex; align-items: flex-end; justify-content: flex-end; }
.ifza-hero-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--a400); border: 1px solid rgba(76,170,170,0.28); padding: 7px 16px;
  margin-bottom: 32px;
  opacity: 0; transform: translateY(16px);
  animation: ifzaFadeUp 1s var(--ease) 0.2s forwards;
}
.ifza-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--a400); animation: ifzaBlink 2s infinite; }
.ifza-hero-h1 {
  font-family: var(--fd); font-weight: 300; line-height: 0.88;
  letter-spacing: -0.02em; color: var(--w);
  font-size: clamp(5rem, 10vw, 9.5rem); margin-bottom: 20px;
  opacity: 0; transform: translateY(20px);
  animation: ifzaFadeUp 1.1s var(--ease) 0.35s forwards;
}
.ifza-hero-h1 em { display: block; color: var(--a400); font-style: italic; font-weight: 300; }
.ifza-hero-fullname {
  font-family: var(--fd); font-size: 1rem; font-weight: 300;
  color: var(--w60); font-style: italic; margin-bottom: 36px; letter-spacing: 0.04em;
  opacity: 0; animation: ifzaFadeUp 1s var(--ease) 0.5s forwards;
}
.ifza-hero-desc {
  font-size: 0.86rem; color: var(--w80); line-height: 1.85; max-width: 520px; margin-bottom: 44px;
  opacity: 0; animation: ifzaFadeUp 1s var(--ease) 0.65s forwards;
}
.ifza-hero-actions {
  display: flex; gap: 14px; flex-wrap: wrap;
  opacity: 0; animation: ifzaFadeUp 1s var(--ease) 0.8s forwards;
}

/* value pill strip */
.ifza-hero-pills {
  display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 32px;
  opacity: 0; animation: ifzaFadeUp 1s var(--ease) 0.55s forwards;
}
.ifza-pill {
  font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase;
  padding: 5px 12px; border: 1px solid rgba(76,170,170,0.2);
  color: var(--a300); background: rgba(76,170,170,0.06);
}

/* hero card */
.ifza-hero-card {
  background: rgba(9,25,40,0.88); backdrop-filter: blur(16px);
  border: 1px solid var(--w12); padding: 36px 32px; min-width: 280px;
  opacity: 0; animation: ifzaFadeUp 1.1s var(--ease) 0.9s forwards;
}
.ifza-hero-card-label {
  font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--a400); margin-bottom: 20px; display: block;
}
.ifza-hero-card-row {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 11px 0; border-bottom: 1px solid var(--w06); font-size: 0.78rem;
}
.ifza-hero-card-row:last-child { border-bottom: none; }
.ifza-hero-card-row span:first-child { color: var(--w60); }
.ifza-hero-card-row span:last-child { color: var(--w); font-weight: 500; text-align: right; }
.ifza-hero-card-row span.teal { color: var(--a400); }
.ifza-hero-card-row span.gold { color: var(--g400); }

/* scroll hint */
.ifza-scroll-hint {
  position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
  z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px;
  opacity: 0; animation: ifzaFadeUp 1s var(--ease) 1.2s forwards;
}
.ifza-scroll-hint span { font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--w30); }
.ifza-scroll-line { width: 1px; height: 44px; background: linear-gradient(to bottom, var(--a400), transparent); animation: ifzaScrollPulse 2.2s ease-in-out infinite; }

/* ── STATS BAR ───────────────────────────────────────────────── */
.ifza-stats {
  display: grid; grid-template-columns: repeat(6, 1fr);
  background: var(--n950); border-top: 1px solid var(--w12); border-bottom: 1px solid var(--w12);
}
.ifza-stat { padding: 28px 20px; text-align: center; border-right: 1px solid var(--w12); transition: background 0.3s; }
.ifza-stat:last-child { border-right: none; }
.ifza-stat:hover { background: var(--aglow3); }
.ifza-stat-val { font-family: var(--fd); font-size: 2rem; font-weight: 300; color: var(--a400); display: block; line-height: 1; }
.ifza-stat-key { font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--w30); margin-top: 6px; display: block; }

/* ── SECTION BASICS ──────────────────────────────────────────── */
.ifza-section { padding: 96px 60px; }
.ifza-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--a400); margin-bottom: 14px; display: block; }
.ifza-h2 { font-family: var(--fd); font-size: clamp(2rem, 3.8vw, 3.4rem); font-weight: 300; line-height: 1.15; color: var(--w); }
.ifza-h2 em { color: var(--a400); font-style: italic; }

/* ── INTRO / WHY IFZA ────────────────────────────────────────── */
.ifza-intro { background: var(--n800); }
.ifza-intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; margin-top: 52px; }
.ifza-intro-text p { font-size: 0.88rem; color: var(--w60); line-height: 1.88; margin-bottom: 22px; }
.ifza-intro-text p strong { color: var(--w); font-weight: 500; }
.ifza-pillars { display: flex; flex-direction: column; }
.ifza-pillar { display: flex; gap: 20px; padding: 22px 0; border-bottom: 1px solid var(--w06); transition: padding-left 0.3s var(--ease); }
.ifza-pillar:first-child { border-top: 1px solid var(--w06); }
.ifza-pillar:hover { padding-left: 10px; }
.ifza-pillar-icon { font-size: 1.3rem; flex-shrink: 0; margin-top: 2px; }
.ifza-pillar h4 { font-size: 0.88rem; font-weight: 500; color: var(--w); margin-bottom: 5px; }
.ifza-pillar p { font-size: 0.77rem; color: var(--w60); line-height: 1.65; }

/* ── VS DMCC COMPARISON STRIP ────────────────────────────────── */
.ifza-vs { background: var(--n750); }
.ifza-vs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-top: 52px; background: var(--w06); }
.ifza-vs-col { background: var(--n750); padding: 40px 36px; }
.ifza-vs-col.highlight { background: var(--n800); border: 1px solid rgba(76,170,170,0.15); }
.ifza-vs-col-title { font-size: 0.62rem; letter-spacing: 0.26em; text-transform: uppercase; margin-bottom: 28px; display: flex; align-items: center; gap: 10px; }
.ifza-vs-col-title .badge { padding: 3px 10px; font-size: 0.58rem; letter-spacing: 0.15em; }
.ifza-vs-col.highlight .ifza-vs-col-title { color: var(--a400); }
.ifza-vs-col.highlight .badge { border: 1px solid var(--a400); color: var(--a400); background: var(--aglow2); }
.ifza-vs-col:not(.highlight) .ifza-vs-col-title { color: var(--w30); }
.ifza-vs-col:not(.highlight) .badge { border: 1px solid var(--w12); color: var(--w30); }
.ifza-vs-row { display: flex; justify-content: space-between; align-items: flex-start; padding: 14px 0; border-bottom: 1px solid var(--w06); gap: 20px; }
.ifza-vs-row:last-child { border-bottom: none; }
.ifza-vs-row-key { font-size: 0.72rem; color: var(--w60); flex-shrink: 0; }
.ifza-vs-row-val { font-size: 0.78rem; font-weight: 500; text-align: right; line-height: 1.4; }
.ifza-vs-col.highlight .ifza-vs-row-val { color: var(--w); }
.ifza-vs-col:not(.highlight) .ifza-vs-row-val { color: var(--w60); }
.ifza-vs-row-val.win { color: var(--a400) !important; }

/* ── PACKAGES (CREAM TEAL) ───────────────────────────────────── */
.ifza-packages { background: var(--cream-bg); position: relative; overflow: hidden; }
.ifza-packages::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 70% 60% at 50% 0%, rgba(76,170,170,0.08), transparent 60%);
  pointer-events: none;
}
.ifza-packages::after {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, transparent, var(--a400) 40%, transparent); opacity: 0.55;
}
.ifza-packages .ifza-label { color: #2A7070; }
.ifza-packages .ifza-h2 { color: var(--cream-ink); }
.ifza-packages .ifza-h2 em { color: var(--a400); }
.ifza-pkg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 52px; }
.ifza-pkg {
  background: var(--cream-bg); border: 1px solid var(--cream-bdr);
  padding: 40px 34px; display: flex; flex-direction: column;
  transition: transform 0.35s var(--ease), box-shadow 0.35s, border-color 0.35s;
  box-shadow: 0 2px 16px rgba(30,100,100,0.06); position: relative;
}
.ifza-pkg:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(30,100,100,0.12); border-color: rgba(76,170,170,0.4); }
.ifza-pkg.featured { background: var(--n900); border-color: rgba(76,170,170,0.3); box-shadow: 0 8px 40px rgba(0,0,0,0.25); }
.ifza-pkg.featured:hover { border-color: var(--a400); box-shadow: 0 24px 60px rgba(0,0,0,0.35); }
.ifza-pkg-badge { font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; padding: 4px 12px; width: fit-content; margin-bottom: 22px; font-weight: 500; }
.ifza-pkg:not(.featured) .ifza-pkg-badge { border: 1px solid var(--cream-bdr); color: var(--cream-ink3); background: var(--cream-100); }
.ifza-pkg.featured .ifza-pkg-badge { border: 1px solid var(--a400); color: var(--a400); background: var(--aglow2); }
.ifza-pkg-name { font-family: var(--fd); font-size: 2rem; font-weight: 400; margin-bottom: 6px; }
.ifza-pkg:not(.featured) .ifza-pkg-name { color: var(--cream-ink); }
.ifza-pkg.featured .ifza-pkg-name { color: var(--w); }
.ifza-pkg-tag { font-size: 0.75rem; margin-bottom: 26px; }
.ifza-pkg:not(.featured) .ifza-pkg-tag { color: var(--cream-ink3); }
.ifza-pkg.featured .ifza-pkg-tag { color: var(--w60); }
.ifza-pkg-price { margin-bottom: 28px; padding-bottom: 24px; }
.ifza-pkg:not(.featured) .ifza-pkg-price { border-bottom: 1px solid var(--cream-bdr); }
.ifza-pkg.featured .ifza-pkg-price { border-bottom: 1px solid var(--w12); }
.ifza-pkg-amount { font-family: var(--fd); font-size: 3rem; font-weight: 300; line-height: 1; }
.ifza-pkg:not(.featured) .ifza-pkg-amount { color: var(--cream-ink); }
.ifza-pkg.featured .ifza-pkg-amount { color: var(--a400); }
.ifza-pkg-period { font-size: 0.68rem; letter-spacing: 0.08em; margin-top: 5px; }
.ifza-pkg:not(.featured) .ifza-pkg-period { color: rgba(30,100,100,0.4); }
.ifza-pkg.featured .ifza-pkg-period { color: var(--w30); }
.ifza-pkg-features { list-style: none; display: flex; flex-direction: column; gap: 12px; flex: 1; margin-bottom: 32px; }
.ifza-pkg-feat { display: flex; align-items: flex-start; gap: 11px; font-size: 0.79rem; line-height: 1.5; }
.ifza-feat-on { color: #2A7070; flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.ifza-feat-off { color: var(--cream-bdr); flex-shrink: 0; font-size: 0.75rem; margin-top: 2px; }
.ifza-pkg.featured .ifza-feat-on { color: var(--a400); }
.ifza-pkg.featured .ifza-feat-off { color: var(--w30); }
.ifza-feat-label-on { color: var(--cream-ink2); }
.ifza-feat-label-off { color: var(--cream-bdr); }
.ifza-pkg.featured .ifza-feat-label-on { color: var(--w80); }
.ifza-pkg.featured .ifza-feat-label-off { color: var(--w30); }
.ifza-pkg-btn {
  width: 100%; padding: 13px 20px; font-family: var(--fb); font-size: 0.7rem;
  letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer; transition: all 0.3s;
}
.ifza-pkg:not(.featured) .ifza-pkg-btn { background: transparent; border: 1px solid var(--cream-bdr); color: var(--cream-ink2); }
.ifza-pkg:not(.featured) .ifza-pkg-btn:hover { border-color: var(--a400); background: var(--cream-100); color: var(--cream-ink); }
.ifza-pkg.featured .ifza-pkg-btn { background: var(--a400); border: none; color: var(--n900); font-weight: 500; }
.ifza-pkg.featured .ifza-pkg-btn:hover { background: var(--a300); }

/* ── ACTIVITIES ──────────────────────────────────────────────── */
.ifza-activities { background: var(--n800); }
.ifza-act-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; margin-top: 52px; background: var(--w06); }
.ifza-act-card { background: var(--n800); padding: 30px 24px; transition: background 0.3s; cursor: default; }
.ifza-act-card:hover { background: var(--n750); }
.ifza-act-card:hover .ifza-act-name { color: var(--a300); }
.ifza-act-icon { font-size: 1.5rem; margin-bottom: 14px; }
.ifza-act-name { font-size: 0.84rem; font-weight: 500; color: var(--w); margin-bottom: 7px; transition: color 0.3s; }
.ifza-act-desc { font-size: 0.73rem; color: var(--w60); line-height: 1.6; }

/* ── PROCESS ─────────────────────────────────────────────────── */
.ifza-process { background: var(--n900); }
.ifza-process-inner { max-width: 780px; margin: 52px auto 0; }
.ifza-step { display: grid; grid-template-columns: 64px 1fr; gap: 28px; padding: 36px 0; border-bottom: 1px solid var(--w06); position: relative; }
.ifza-step:last-child { border-bottom: none; }
.ifza-step::before { content: ''; position: absolute; left: 31px; top: 84px; bottom: -36px; width: 1px; background: linear-gradient(to bottom, rgba(76,170,170,0.22), transparent); }
.ifza-step:last-child::before { display: none; }
.ifza-step-num { width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--a400); display: flex; align-items: center; justify-content: center; font-family: var(--fd); font-size: 0.92rem; color: var(--a400); background: var(--n900); position: relative; z-index: 1; flex-shrink: 0; }
.ifza-step h3 { font-size: 0.96rem; font-weight: 500; color: var(--w); margin-bottom: 8px; }
.ifza-step p { font-size: 0.81rem; color: var(--w60); line-height: 1.78; margin-bottom: 10px; }
.ifza-step-time { font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--a400); margin-bottom: 12px; }
.ifza-step-docs { display: flex; gap: 6px; flex-wrap: wrap; }
.ifza-doc-tag { font-size: 0.62rem; padding: 4px 9px; border: 1px solid var(--w12); color: var(--w60); letter-spacing: 0.07em; }

/* ── DOCUMENTS ───────────────────────────────────────────────── */
.ifza-documents { background: var(--n800); }
.ifza-docs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 52px; }
.ifza-doc-card { background: var(--n900); border: 1px solid var(--w06); padding: 22px 26px; display: flex; align-items: center; gap: 18px; transition: border-color 0.3s; }
.ifza-doc-card:hover { border-color: rgba(76,170,170,0.2); }
.ifza-doc-num { font-family: var(--fd); font-size: 1.9rem; font-weight: 300; color: rgba(76,170,170,0.18); min-width: 36px; line-height: 1; }
.ifza-doc-title { font-size: 0.82rem; font-weight: 500; color: var(--w); margin-bottom: 4px; }
.ifza-doc-desc { font-size: 0.72rem; color: var(--w60); line-height: 1.55; }

/* ── CALCULATOR ──────────────────────────────────────────────── */
.ifza-calc { background: var(--n750); }
.ifza-calc-inner { display: grid; grid-template-columns: 1.3fr 1fr; gap: 64px; align-items: start; margin-top: 52px; }
.ifza-calc-form { display: flex; flex-direction: column; gap: 22px; }
.ifza-calc-field { display: flex; flex-direction: column; gap: 7px; }
.ifza-calc-label { font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--w60); }
.ifza-calc-select { background: var(--n900); border: 1px solid var(--w12); color: var(--w); padding: 13px 16px; font-family: var(--fb); font-size: 0.83rem; font-weight: 300; outline: none; transition: border-color 0.3s; appearance: none; cursor: pointer; }
.ifza-calc-select:focus { border-color: var(--a400); }
.ifza-calc-select option { background: var(--n800); }
.ifza-toggle-row { display: flex; }
.ifza-toggle { flex: 1; padding: 11px 10px; font-size: 0.66rem; letter-spacing: 0.12em; text-transform: uppercase; font-family: var(--fb); cursor: pointer; background: var(--n900); border: 1px solid var(--w12); color: var(--w60); transition: all 0.3s; margin-right: -1px; text-align: center; }
.ifza-toggle.on { background: var(--aglow2); border-color: var(--a400); color: var(--a400); position: relative; z-index: 1; }
.ifza-result { background: var(--n900); border: 1px solid rgba(76,170,170,0.2); padding: 40px 36px; position: sticky; top: 90px; }
.ifza-result-tag { font-size: 0.6rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--a400); margin-bottom: 22px; display: block; }
.ifza-result-amount { font-family: var(--fd); font-size: 3.6rem; font-weight: 300; line-height: 1; color: var(--w); }
.ifza-result-currency { color: var(--a400); }
.ifza-result-note { font-size: 0.66rem; color: var(--w30); margin-top: 4px; margin-bottom: 28px; }
.ifza-result-lines { border-top: 1px solid var(--w12); margin-bottom: 24px; }
.ifza-result-line { display: flex; justify-content: space-between; padding: 11px 0; border-bottom: 1px solid var(--w06); font-size: 0.76rem; }
.ifza-result-line-lbl { color: var(--w60); }
.ifza-result-line-val { color: var(--w); font-weight: 500; }
.ifza-result-total-row { display: flex; justify-content: space-between; padding: 14px 0 0; font-size: 0.86rem; }
.ifza-result-disclaimer { font-size: 0.68rem; color: var(--w30); line-height: 1.65; margin-bottom: 22px; margin-top: 14px; }

/* ── FAQ ─────────────────────────────────────────────────────── */
.ifza-faq { background: var(--n900); }
.ifza-faq-inner { max-width: 820px; margin: 52px auto 0; }
.ifza-faq-item { border-bottom: 1px solid var(--w06); }
.ifza-faq-q { width: 100%; background: none; border: none; padding: 26px 0; display: flex; align-items: center; justify-content: space-between; gap: 24px; cursor: pointer; text-align: left; font-family: var(--fb); }
.ifza-faq-q-text { font-size: 0.92rem; font-weight: 400; color: var(--w); line-height: 1.5; }
.ifza-faq-icon { width: 26px; height: 26px; border: 1px solid var(--w12); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--a400); font-size: 1.1rem; flex-shrink: 0; transition: all 0.3s; }
.ifza-faq-item.open .ifza-faq-icon { background: var(--a400); color: var(--n900); border-color: var(--a400); transform: rotate(45deg); }
.ifza-faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.45s var(--ease); }
.ifza-faq-item.open .ifza-faq-answer { max-height: 500px; }
.ifza-faq-answer-inner { padding-bottom: 24px; }
.ifza-faq-answer p { font-size: 0.83rem; color: var(--w60); line-height: 1.85; }
.ifza-faq-answer ul { margin-top: 12px; list-style: none; display: flex; flex-direction: column; gap: 7px; }
.ifza-faq-answer ul li { font-size: 0.8rem; color: var(--w60); padding-left: 18px; position: relative; line-height: 1.6; }
.ifza-faq-answer ul li::before { content: '—'; position: absolute; left: 0; color: var(--a400); }

/* ── ADVISORY ────────────────────────────────────────────────── */
.ifza-advisory { background: var(--n800); position: relative; overflow: hidden; }
.ifza-advisory::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 70% at 50% 50%, rgba(76,170,170,0.04), transparent); pointer-events: none; }
.ifza-advisory-inner { max-width: 900px; margin: 52px auto 0; position: relative; z-index: 1; }
.ifza-advisory-quote { font-family: var(--fd); font-size: 1.35rem; font-weight: 300; color: var(--w80); line-height: 1.65; font-style: italic; text-align: center; padding: 40px 48px; border: 1px solid var(--w12); background: var(--n900); margin-bottom: 48px; }
.ifza-advisory-quote strong { color: var(--a400); font-style: normal; }
.ifza-advisory-quote-attr { margin-top: 18px; font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--a400); font-style: normal; }
.ifza-advisory-tips { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 36px; }
.ifza-tip { border: 1px solid var(--w06); padding: 30px 26px; transition: border-color 0.3s; }
.ifza-tip:hover { border-color: rgba(76,170,170,0.18); }
.ifza-tip-num { font-family: var(--fd); font-size: 0.68rem; letter-spacing: 0.22em; color: var(--a400); margin-bottom: 12px; display: block; }
.ifza-tip h4 { font-size: 0.9rem; font-weight: 500; color: var(--w); margin-bottom: 9px; }
.ifza-tip p { font-size: 0.78rem; color: var(--w60); line-height: 1.78; }
.ifza-advisory-warning { background: rgba(76,170,170,0.05); border: 1px solid rgba(76,170,170,0.16); padding: 26px 30px; margin-bottom: 0; }
.ifza-advisory-warning h4 { font-size: 0.82rem; font-weight: 500; color: var(--a400); margin-bottom: 9px; }
.ifza-advisory-warning p { font-size: 0.78rem; color: var(--w60); line-height: 1.78; }

/* ── CTA (CREAM TEAL) ────────────────────────────────────────── */
.ifza-cta { background: var(--cream-bg); padding: 120px 60px; text-align: center; position: relative; overflow: hidden; }
.ifza-cta::before {
  content: ''; position: absolute; inset: 0;
  background-image: linear-gradient(rgba(76,170,170,0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(76,170,170,0.05) 1px, transparent 1px);
  background-size: 56px 56px;
}
.ifza-cta::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(76,170,170,0.10), transparent 70%); pointer-events: none; }
.ifza-cta-inner { position: relative; z-index: 1; max-width: 600px; margin: 0 auto; }
.ifza-cta .ifza-label { color: #2A7070; }
.ifza-cta h2 { font-family: var(--fd); font-size: clamp(2.4rem, 4.5vw, 4rem); font-weight: 300; color: var(--cream-ink); line-height: 1.15; margin-bottom: 18px; }
.ifza-cta h2 em { color: var(--a400); font-style: italic; }
.ifza-cta-divider { width: 44px; height: 1px; background: var(--a400); margin: 22px auto; opacity: 0.5; }
.ifza-cta p { font-size: 0.83rem; color: var(--cream-ink3); line-height: 1.8; margin-bottom: 44px; }
.ifza-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.ifza-btn-ink { padding: 15px 36px; background: var(--cream-ink); color: var(--cream-bg); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.ifza-btn-ink:hover { background: var(--a400); color: var(--cream-ink); transform: translateY(-2px); }
.ifza-btn-outline { padding: 15px 36px; background: transparent; color: var(--cream-ink2); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--cream-bdr); cursor: pointer; transition: all 0.3s; }
.ifza-btn-outline:hover { border-color: var(--a400); color: var(--cream-ink); transform: translateY(-2px); }

/* ── BUTTONS DARK ────────────────────────────────────────────── */
.ifza-btn-teal { padding: 15px 36px; background: var(--a400); color: var(--n900); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.ifza-btn-teal:hover { background: var(--a300); transform: translateY(-2px); }
.ifza-btn-ghost { padding: 15px 36px; background: transparent; color: var(--w); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--w30); cursor: pointer; transition: all 0.3s; }
.ifza-btn-ghost:hover { border-color: var(--a400); color: var(--a400); transform: translateY(-2px); }

/* ── FOOTER ──────────────────────────────────────────────────── */
.ifza-footer { background: var(--n950); padding: 52px 60px; border-top: 1px solid var(--w06); }
.ifza-footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
.ifza-footer-logo { font-family: var(--fd); font-size: 1.3rem; letter-spacing: 0.15em; color: var(--w); }
.ifza-footer-logo em { color: var(--a400); font-style: normal; }
.ifza-footer-copy { font-size: 0.68rem; color: var(--w30); }
.ifza-footer-back { padding: 9px 18px; background: transparent; border: 1px solid var(--w12); color: var(--w60); font-family: var(--fb); font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.3s; }
.ifza-footer-back:hover { border-color: var(--a400); color: var(--a400); }

/* ── WA FLOAT ────────────────────────────────────────────────── */
.ifza-wa { position: fixed; bottom: 28px; right: 28px; z-index: 300; width: 50px; height: 50px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 18px rgba(37,211,102,0.4); transition: transform 0.3s, box-shadow 0.3s; }
.ifza-wa:hover { transform: scale(1.1); box-shadow: 0 6px 26px rgba(37,211,102,0.55); }

/* ── REVEAL ──────────────────────────────────────────────────── */
.ifza-reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.8s var(--ease), transform 0.8s var(--ease); }
.ifza-reveal.in { opacity: 1; transform: translateY(0); }
.ir1 { transition-delay: 0.08s; } .ir2 { transition-delay: 0.18s; }
.ir3 { transition-delay: 0.28s; } .ir4 { transition-delay: 0.38s; }

/* ── KEYFRAMES ───────────────────────────────────────────────── */
@keyframes ifzaFadeUp { to { opacity: 1; transform: translateY(0); } }
@keyframes ifzaScrollPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
@keyframes ifzaBlink { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.75); } }

/* ── RESPONSIVE ──────────────────────────────────────────────── */
@media(max-width:1100px) {
  .ifza-hero { grid-template-columns: 1fr; } .ifza-hero-right { display: none; }
  .ifza-intro-grid { grid-template-columns: 1fr; gap: 48px; }
  .ifza-vs-grid { grid-template-columns: 1fr; }
  .ifza-pkg-grid { grid-template-columns: 1fr; max-width: 480px; }
  .ifza-act-grid { grid-template-columns: repeat(3,1fr); }
  .ifza-calc-inner { grid-template-columns: 1fr; } .ifza-result { position: static; }
  .ifza-advisory-tips { grid-template-columns: 1fr; }
}
@media(max-width:768px) {
  .ifza-nav { padding: 16px 24px; } .ifza-nav.scrolled { padding: 12px 24px; } .ifza-nav-links { display: none; }
  .ifza-hero { padding: 0 24px 72px; } .ifza-back-btn { left: 24px; }
  .ifza-section { padding: 68px 24px; }
  .ifza-stats { grid-template-columns: repeat(3,1fr); }
  .ifza-act-grid { grid-template-columns: repeat(2,1fr); }
  .ifza-docs-grid { grid-template-columns: 1fr; }
  .ifza-footer { padding: 40px 24px; } .ifza-cta { padding: 80px 24px; }
}
@media(max-width:480px) {
  .ifza-stats { grid-template-columns: repeat(2,1fr); }
  .ifza-act-grid { grid-template-columns: 1fr; }
  .ifza-hero-h1 { font-size: 4.5rem; }
}

  .ifza-nav-hamburger {
    display: none; flex-direction: column; gap: 5px; cursor: pointer;
    background: none; border: none; padding: 6px; z-index: 310;
  }
  .ifza-nav-hamburger span {
    display: block; width: 24px; height: 1.5px; background: rgba(248,245,238,0.6);
    transition: all 0.35s cubic-bezier(0.16,1,0.3,1); transform-origin: center;
  }
  .ifza-nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: #C9A84C; }
  .ifza-nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .ifza-nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: #C9A84C; }
  .ifza-drawer {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(3,10,20,0.97); backdrop-filter: blur(24px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    transform: translateX(100%); transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
    pointer-events: none;
  }
  .ifza-drawer.open { transform: translateX(0); pointer-events: all; }
  .ifza-drawer-brand {
    font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.3rem;
    letter-spacing: .18em; color: #F8F5EE; margin-bottom: 44px;
    opacity: 0; transform: translateY(10px);
    transition: opacity .4s .1s, transform .4s .1s;
  }
  .ifza-drawer.open .ifza-drawer-brand { opacity: 1; transform: translateY(0); }
  .ifza-drawer-brand em { color: #C9A84C; font-style: normal; }
  .ifza-dlink {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2rem, 8vw, 3rem); font-weight: 300; color: rgba(248,245,238,0.6);
    background: none; border: none; padding: 10px 0; cursor: pointer;
    display: block; width: 100%; text-align: center;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, opacity .4s cubic-bezier(0.16,1,0.3,1), transform .4s cubic-bezier(0.16,1,0.3,1);
  }
  .ifza-drawer.open .ifza-dlink { opacity: 1; transform: translateY(0); }
  .ifza-drawer.open .ifza-dlink:nth-of-type(1) { transition-delay: .12s; }
  .ifza-drawer.open .ifza-dlink:nth-of-type(2) { transition-delay: .17s; }
  .ifza-drawer.open .ifza-dlink:nth-of-type(3) { transition-delay: .22s; }
  .ifza-drawer.open .ifza-dlink:nth-of-type(4) { transition-delay: .27s; }
  .ifza-drawer.open .ifza-dlink:nth-of-type(5) { transition-delay: .32s; }
  .ifza-dlink:hover { color: #C9A84C; }
  .ifza-drawer-div { width: 40px; height: 1px; background: rgba(201,168,76,.25); margin: 18px 0; opacity: 0; transition: opacity .4s .34s; }
  .ifza-drawer.open .ifza-drawer-div { opacity: 1; }
  .ifza-dcta {
    font-family: 'DM Sans', sans-serif; font-size: .7rem; letter-spacing: .18em;
    text-transform: uppercase; color: #C9A84C; border: 1px solid #C9A84C;
    background: none; padding: 12px 32px; cursor: pointer; margin-top: 8px;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, background .3s, opacity .4s .38s, transform .4s .38s;
  }
  .ifza-drawer.open .ifza-dcta { opacity: 1; transform: translateY(0); }
  .ifza-dcta:hover { background: #C9A84C; color: #05111e; }
  @media (max-width: 900px) {
    .ifza-nav-links { display: none; }
    .ifza-nav-cta { display: none !important; }
    .ifza-nav-hamburger { display: flex; }
  }
`;

// ── DATA ──────────────────────────────────────────────────────
const STATS = [
  { v:"10,000+", k:"Companies" }, { v:"5–7", k:"Setup Days" },
  { v:"100%", k:"Foreign Ownership" }, { v:"0%", k:"Income Tax" },
  { v:"AED 12K", k:"Starting Cost" }, { v:"170+", k:"Nationalities" },
];

const ACTIVITIES = [
  { i:IArrowsExchange, n:"General Trading", d:"Import, export and general trading of goods worldwide" },
  { i:IShoppingBag, n:"E-Commerce", d:"Online retail, digital marketplaces and dropshipping" },
  { i:IMonitor, n:"Technology & IT", d:"Software, SaaS, IT consulting and digital services" },
  { i:IMegaphone, n:"Marketing & Media", d:"Digital marketing, advertising, branding and PR agencies" },
  { i:ICross, n:"Healthcare & Wellness", d:"Health consulting, medical equipment and wellness services" },
  { i:IBookOpen, n:"Education & Training", d:"E-learning, coaching, training centers and EdTech" },
  { i:IBuilding, n:"Real Estate", d:"Property consulting, management and real estate advisory" },
  { i:IBriefcase, n:"Consulting & Advisory", d:"Business, strategy, management and professional consulting" },
  { i:ILeaf, n:"Food & Beverage", d:"F&B trading, catering, food import/export and FMCG" },
  { i:ICompass, n:"Travel & Tourism", d:"Travel agencies, tour operators and hospitality services" },
  { i:IPackage, n:"Logistics", d:"Freight, supply chain, warehousing and distribution" },
  { i:IPenTool, n:"Creative & Design", d:"Graphic design, content creation, photography, video" },
];

const STEPS = [
  { n:"01", t:"Free Consultation & Zone Assessment", d:"We evaluate whether IFZA is the right fit for your business model, visa needs, and budget — comparing it honestly against DMCC and other zones.", time:"Day 1", docs:["Passport Copy","Business Overview"] },
  { n:"02", t:"Activity Selection & Application Prep", d:"Our team selects the exact license activities for your business and prepares the complete application package — no back-and-forth with the authority.", time:"Day 1–2", docs:["Passport Copy","Activity List","Shareholder Details"] },
  { n:"03", t:"License Application Submission", d:"We submit your application directly to IFZA. IFZA's streamlined digital process means faster turnaround than most other UAE free zones.", time:"Day 2–3", docs:["Application Form","KYC Documents"] },
  { n:"04", t:"License Approval & Issuance", d:"IFZA reviews and approves your application. Trade license, MOA, and all corporate documents issued digitally and physically.", time:"Day 3–7", docs:["Trade License","MOA","Share Certificate","Company Stamp"] },
  { n:"05", t:"Investor Visa Processing", d:"Investor visa entry permit, medical fitness test, biometrics, and Emirates ID registration. Our PRO team handles every step end-to-end.", time:"Day 7–14", docs:["Visa Application","Medical Test","Emirates ID","Entry Permit"] },
  { n:"06", t:"Bank Account Opening", d:"We introduce you to our banking partners and assist with the full account opening documentation. IFZA's credibility helps accelerate bank approvals.", time:"Day 14–28", docs:["Bank Application","Company Documents","Proof of Address"] },
];

const DOCUMENTS = [
  { t:"Passport Copy", d:"Valid passport for all shareholders and directors — minimum 6 months validity required" },
  { t:"Passport Photo", d:"White background, recent photograph for each shareholder and visa applicant" },
  { t:"Residential Address Proof", d:"Utility bill or bank statement no older than 3 months" },
  { t:"Business Overview", d:"Brief description of your planned UAE business activities and objectives" },
  { t:"Source of Funds", d:"Bank statements or declaration letter confirming your investment source" },
  { t:"NOC from Employer", d:"Required only if currently employed in UAE under another residence visa" },
  { t:"Corporate Documents", d:"For company shareholders: Certificate of Incorporation, MOA, Board Resolution" },
  { t:"Bank Reference Letter", d:"Optional but strongly recommended — speeds up bank account opening significantly" },
];

const FAQS = [
  { q:"How affordable is IFZA compared to DMCC and other free zones?", a:"IFZA is one of the most cost-effective free zones in the UAE. Setup starts from AED 12,000 — significantly lower than DMCC (AED 18,500+) or JAFZA. For SMEs, consultants, and digital businesses, IFZA delivers full UAE company benefits at a fraction of the cost of premium zones." },
  { q:"How fast can I get my IFZA license?", a:"IFZA is one of the fastest free zones for company formation — typically 5 to 7 working days from document submission to license issuance. Investor visa processing takes an additional 7–14 days. You can be fully operational in under 4 weeks." },
  { q:"Can I have 100% foreign ownership with IFZA?", a:"Yes. IFZA is a UAE free zone and allows 100% foreign ownership with no UAE national partner or local sponsor required. You have full control of your company." },
  { q:"How many visas can I get with an IFZA license?", a:"Visa allocation depends on your package and office type.", list:["Starter (Virtual Office): 1–2 Visas","Standard Package: 3 Visas","Business Package: 5 Visas","Custom / Flexi Desk: Up to 6+ Visas"] },
  { q:"Can I trade with mainland UAE companies from IFZA?", a:"IFZA companies can provide services to mainland UAE companies. For physical goods trading into the mainland, you need a customs clearance agent or mainland distributor. We can structure your setup to facilitate smooth mainland dealings." },
  { q:"Is IFZA good for e-commerce and digital businesses?", a:"Yes — IFZA is particularly popular with e-commerce, digital marketing, SaaS, and online service businesses. The virtual office package makes it ideal for solo operators and digital-first companies who do not need a physical UAE office." },
  { q:"What is the annual renewal cost for IFZA?", a:"IFZA annual renewal typically ranges from AED 8,000 to AED 14,000 depending on your package, license activities, and visa count. Our team sends renewal reminders 90 days in advance." },
  { q:"Can I open an IFZA company without visiting the UAE?", a:"Yes — IFZA license formation can be completed 100% remotely. For visa processing, a short UAE visit is required. Bank account opening typically requires a visit too. INCOZONE helps you plan one efficient trip to complete both." },
  { q:"What is the difference between IFZA and DMCC?", a:"IFZA is more affordable, faster to set up, and better for SMEs, consultancies, e-commerce, and general trading. DMCC is more prestigious, better for commodities, fintech, and financial services, but significantly more expensive. Both offer 100% ownership. INCOZONE will recommend the right fit for your specific situation." },
  { q:"Does IFZA support multiple shareholders?", a:"Yes. IFZA supports sole proprietorships, FZ-LLCs with multiple shareholders (up to 50), and corporate shareholders. Our team will structure ownership in the most tax-efficient and practical way for your situation." },
];

// ── HERO CANVAS ───────────────────────────────────────────────
function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let W, H, raf, t = 0;
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * 1920, y: Math.random() * 1080,
      vx: (Math.random() - .5) * 0.18, vy: (Math.random() - .5) * 0.18,
      r: Math.random() * 1.2 + 0.3, o: Math.random() * 0.35 + 0.12,
    }));
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      t += 0.003; ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#05111e"); bg.addColorStop(1, "#020b14");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      // teal-tinted blobs
      [[0.1, 0.4, "#4CAAAA", 0.07, 13], [0.85, 0.3, "#163354", 0.45, 10], [0.5, 0.7, "#4CAAAA", 0.04, 17], [0.3, 0.8, "#0c2033", 0.5, 8]].forEach(([bx, by, col, a, spd], i) => {
        const x = W * bx + Math.sin(t * (spd / 10) + i * 2) * 65, y = H * by + Math.cos(t * (spd / 14) + i) * 45, r = Math.min(W, H) * 0.52;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        const rgb = parseInt(col.slice(1), 16);
        g.addColorStop(0, `rgba(${rgb >> 16},${(rgb >> 8) & 255},${rgb & 255},${a})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      });
      // grid
      ctx.strokeStyle = "rgba(76,170,170,0.04)"; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 90) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 90) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      // particles
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 175) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(76,170,170,${0.07 * (1 - d / 175)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(76,170,170,${p.o})`; ctx.fill();
      }
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.9);
      vg.addColorStop(0, "transparent"); vg.addColorStop(1, "rgba(2,11,20,0.6)");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="ifza-hero-canvas" style={{ width: "100%", height: "100%" }} />;
}

// ── SCROLL REVEAL ─────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".ifza-reveal");
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
    }), { threshold: 0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ── CALCULATOR ────────────────────────────────────────────────
function Calculator() {
  const [pkg, setPkg] = useState("standard");
  const [vis, setVis] = useState("2");
  const [pro, setPro] = useState(false);
  const [bnk, setBnk] = useState(false);

  const pkgC = { starter: 12000, standard: 15500, business: 21900, corporate: 31500 };
  const vC = { "0": 0, "2": 0, "3": 2800, "5": 5200, "8": 8400 };
  const total = pkgC[pkg] + (vC[vis] || 0) + (pro ? 2800 : 0) + (bnk ? 2200 : 0);
  const f = n => "AED " + n.toLocaleString();

  return (
    <div className="ifza-calc-inner">
      <div>
        <h2 className="ifza-h2 ifza-reveal">Build Your <em>Custom Package</em></h2>
        <p className="ifza-reveal ir1" style={{ fontSize: "0.84rem", color: "var(--w60)", margin: "12px 0 36px" }}>
          Configure your IFZA requirements and get an instant cost breakdown. All packages include full company incorporation.
        </p>
        <div className="ifza-calc-form">
          <div className="ifza-calc-field ifza-reveal">
            <label className="ifza-calc-label">License Package</label>
            <select className="ifza-calc-select" value={pkg} onChange={e => setPkg(e.target.value)}>
              <option value="starter">Starter — Virtual Office (AED 12,000)</option>
              <option value="standard">Standard — Flexi Desk (AED 15,500)</option>
              <option value="business">Business — Serviced Office (AED 21,900)</option>
              <option value="corporate">Corporate — Private Office (AED 31,500)</option>
            </select>
          </div>
          <div className="ifza-calc-field ifza-reveal">
            <label className="ifza-calc-label">Visa Allocation</label>
            <select className="ifza-calc-select" value={vis} onChange={e => setVis(e.target.value)}>
              <option value="0">No Visas</option>
              <option value="2">2 Visas (Included in Standard+)</option>
              <option value="3">3 Visas (+AED 2,800)</option>
              <option value="5">5 Visas (+AED 5,200)</option>
              <option value="8">8 Visas (+AED 8,400)</option>
            </select>
          </div>
          <div className="ifza-calc-field ifza-reveal">
            <label className="ifza-calc-label">PRO & Government Services</label>
            <div className="ifza-toggle-row">
              <button className={`ifza-toggle${!pro ? " on" : ""}`} onClick={() => setPro(false)}>Not Required</button>
              <button className={`ifza-toggle${pro ? " on" : ""}`} onClick={() => setPro(true)}>Add PRO (+AED 2,800)</button>
            </div>
          </div>
          <div className="ifza-calc-field ifza-reveal">
            <label className="ifza-calc-label">Banking Assistance</label>
            <div className="ifza-toggle-row">
              <button className={`ifza-toggle${!bnk ? " on" : ""}`} onClick={() => setBnk(false)}>Not Required</button>
              <button className={`ifza-toggle${bnk ? " on" : ""}`} onClick={() => setBnk(true)}>Add Banking (+AED 2,200)</button>
            </div>
          </div>
        </div>
      </div>
      <div className="ifza-result ifza-reveal">
        <span className="ifza-result-tag">Estimated Total</span>
        <div className="ifza-result-amount"><span className="ifza-result-currency">AED </span>{total.toLocaleString()}</div>
        <div className="ifza-result-note">One-time cost · excludes annual renewal</div>
        <div className="ifza-result-lines">
          <div className="ifza-result-line"><span className="ifza-result-line-lbl">License Package</span><span className="ifza-result-line-val">{f(pkgC[pkg])}</span></div>
          {vC[vis] > 0 && <div className="ifza-result-line"><span className="ifza-result-line-lbl">Visa Processing</span><span className="ifza-result-line-val">+{f(vC[vis])}</span></div>}
          {pro && <div className="ifza-result-line"><span className="ifza-result-line-lbl">PRO Services</span><span className="ifza-result-line-val">+{f(2800)}</span></div>}
          {bnk && <div className="ifza-result-line"><span className="ifza-result-line-lbl">Banking Assistance</span><span className="ifza-result-line-val">+{f(2200)}</span></div>}
        </div>
        <div className="ifza-result-total-row"><span style={{ color: "var(--w)", fontWeight: 500 }}>Total Estimate</span><span style={{ color: "var(--a400)", fontWeight: 600 }}>{f(total)}</span></div>
        <p className="ifza-result-disclaimer">Estimate only. Final cost depends on current authority fees and your specific requirements.</p>
        <button className="ifza-btn-teal" style={{ width: "100%" }}>Get Exact Quote →</button>
      </div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────
export default function IFZAPage({ onBack, onNavigate }) {
  const [_ifzaOpen, setifzaOpen] = useState(false);
  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = _ifzaOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [_ifzaOpen]);

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
    <div className="ifza-root">
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className={`ifza-nav${scrolled ? " scrolled" : ""}`}>
        <div className="ifza-nav-logo" onClick={()=>{if(onNavigate){onNavigate("home");window.scrollTo(0,0);}}}>INCO<em>ZONE</em></div>
        <ul className="ifza-nav-links">{["Services","Free Zones","About","Blog","Contact"].map(l=>{const pgMap={"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};return <li key={l}><a href="#" onClick={e=>{e.preventDefault();if(onNavigate){onNavigate(pgMap[l]);window.scrollTo(0,0);}}}>{ l}</a></li>;})}</ul>
        <button className="ifza-nav-cta" onClick={()=>{if(onNavigate){onNavigate("schedule");window.scrollTo(0,0);}}}>Schedule Consultation</button>
      
        {/* Hamburger */}
        <button
          className={`ifza-nav-hamburger${_ifzaOpen ? " open" : ""}`}
          onClick={() => setifzaOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`ifza-drawer${_ifzaOpen ? " open" : ""}`}>
        <div className="ifza-drawer-brand"
          onClick={() => { setifzaOpen(false); if(onNavigate) { onNavigate("home"); window.scrollTo(0,0); } }}>
          INCO<em>ZONE</em>
        </div>
        {["Services","Free Zones","About","Blog","Contact"].map((l) => {
          const pm = {"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};
          return (
            <button key={l} className="ifza-dlink"
              onClick={() => { setifzaOpen(false); if(onNavigate) { onNavigate(pm[l]); window.scrollTo(0,0); } }}>
              {l}
            </button>
          );
        })}
        <div className="ifza-drawer-div" />
        <button className="ifza-dcta"
          onClick={() => { setifzaOpen(false); if(onNavigate) { onNavigate("schedule"); window.scrollTo(0,0); } }}>
          Schedule Consultation
        </button>
      </div>

      {/* ── HERO ── */}
      <div className="ifza-hero">
        <HeroCanvas />
        <button className="ifza-back-btn" onClick={onBack}>Back to Free Zones</button>

        <div className="ifza-hero-left">
          <div className="ifza-hero-eyebrow">
            <div className="ifza-eyebrow-dot" />
            SME & Digital Business · UAE Free Zone
          </div>
          <h1 className="ifza-hero-h1">IFZA<em>Free Zone</em></h1>
          <div className="ifza-hero-fullname">International Free Zone Authority</div>
          <div className="ifza-hero-pills">
            {["From AED 12,000","5–7 Day Setup","100% Ownership","0% Tax","Virtual Office Available"].map(p => (
              <span className="ifza-pill" key={p}>{p}</span>
            ))}
          </div>
          <p className="ifza-hero-desc">
            The UAE's most affordable and fastest-growing free zone — purpose-built for SMEs, consultants, e-commerce businesses, and digital entrepreneurs. Set up your UAE company in as little as <strong style={{ color: "var(--a300)" }}>5 working days</strong>, starting from just AED 12,000.
          </p>
          <div className="ifza-hero-actions">
            <button className="ifza-btn-teal">Start IFZA Setup →</button>
            <button className="ifza-btn-ghost">Download Free Guide</button>
          </div>
        </div>

        <div className="ifza-hero-right">
          <div className="ifza-hero-card">
            <span className="ifza-hero-card-label">Quick Reference</span>
            {[
              ["Location","Dubai Silicon Oasis"],["Setup From","AED 12,000","teal"],
              ["Setup Time","5–7 Days","teal"],["Min. Capital","Not Required"],
              ["Ownership","100% Foreign","teal"],["Visa Quota","Up to 8"],
              ["Annual Renewal","AED 8–14K"],["Tax","0% Personal"],
            ].map(([l,v,cls])=>(
              <div className="ifza-hero-card-row" key={l}>
                <span>{l}</span>
                <span className={cls||""}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ifza-scroll-hint"><span>Scroll</span><div className="ifza-scroll-line" /></div>
      </div>

      {/* ── STATS ── */}
      <div className="ifza-stats">
        {STATS.map((s,i)=>(
          <div className="ifza-stat" key={i}>
            <span className="ifza-stat-val">{s.v}</span>
            <span className="ifza-stat-key">{s.k}</span>
          </div>
        ))}
      </div>

      {/* ── INTRO ── */}
      <div className="ifza-intro ifza-section">
        <span className="ifza-label ifza-reveal">Zone Overview</span>
        <h2 className="ifza-h2 ifza-reveal ir1" style={{ maxWidth: "640px" }}>
          The Smart, Affordable Choice for<br /><em>Modern UAE Business</em>
        </h2>
        <div className="ifza-intro-grid">
          <div>
            <div className="ifza-intro-text">
              <p className="ifza-reveal ir1">
                <strong>IFZA (International Free Zone Authority)</strong> is located in Dubai Silicon Oasis and has rapidly become one of the UAE's most popular free zones for small and medium businesses. Since its launch, IFZA has attracted over 10,000 companies from 170+ nationalities — drawn by its combination of speed, affordability, and flexibility.
              </p>
              <p className="ifza-reveal ir2">
                Unlike larger, premium free zones, IFZA is <strong>specifically designed for the modern entrepreneur</strong> — solo operators, digital service providers, e-commerce businesses, consultants, and growing SMEs who need a credible UAE company without the premium price tag of DMCC or JAFZA.
              </p>
              <p className="ifza-reveal ir3">
                A key differentiator is IFZA's <strong>virtual office option</strong> — meaning you can establish a fully legitimate UAE free zone company without needing a physical office space. This makes IFZA the most accessible route to UAE business presence for remote entrepreneurs and international businesses.
              </p>
              <p className="ifza-reveal ir3">
                IFZA companies benefit from <strong>100% foreign ownership</strong>, full profit repatriation, zero personal income tax, a fast-track licensing process, and a business-friendly regulatory environment backed by the UAE Federal Government framework.
              </p>
            </div>
          </div>
          <div className="ifza-reveal ir2">
            <div className="ifza-pillars">
              {[
                { i:ITag, h:"Most Affordable UAE Free Zone", p:"Starting from AED 12,000 — the lowest entry cost of any major UAE free zone. Ideal for bootstrapped founders and growing SMEs." },
                { i:IClock, h:"Fastest Setup — 5 to 7 Days", p:"IFZA's streamlined digital process delivers your trade license in 5–7 working days. Faster than DMCC, JAFZA, and most other zones." },
                { i:ILaptop, h:"Virtual Office Available", p:"No need for a physical office. IFZA's virtual office package gives you a legitimate UAE business address and mailing services from anywhere." },
                { i:IShield, h:"No Minimum Share Capital", p:"Unlike DMCC (AED 50,000 declared) and many other zones, IFZA has no minimum share capital requirement — freeing up your working capital." },
                { i:IUsers, h:"Multi-Shareholder Friendly", p:"IFZA supports sole proprietors, FZ-LLCs with up to 50 shareholders, and corporate shareholders — flexible for joint ventures and group structures." },
              ].map((p,i)=>(
                <div className="ifza-pillar" key={i}>
                  <div className="ifza-pillar-icon">{p.i}</div>
                  <div><h4>{p.h}</h4><p>{p.p}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── IFZA VS DMCC COMPARISON ── */}
      <div className="ifza-vs ifza-section">
        <span className="ifza-label ifza-reveal">Zone Comparison</span>
        <h2 className="ifza-h2 ifza-reveal ir1">IFZA vs DMCC — <em>Which Is Right for You?</em></h2>
        <p className="ifza-reveal ir2" style={{ fontSize: "0.83rem", color: "var(--w60)", marginTop: "10px", maxWidth: "600px" }}>
          Both are excellent UAE free zones. The right choice depends entirely on your business type, budget, and goals. Here is an honest breakdown.
        </p>
        <div className="ifza-vs-grid">
          {[
            {
              label: "IFZA", highlight: true,
              rows: [
                ["Setup Cost", "From AED 12,000", "win"],
                ["Setup Speed", "5–7 Working Days", "win"],
                ["Min. Share Capital", "Not Required", "win"],
                ["Virtual Office", "Yes — Available", "win"],
                ["Prestige Level", "Growing, Well-Respected"],
                ["Best For", "SMEs, E-commerce, Consultants", "win"],
                ["Annual Renewal", "AED 8,000–14,000", "win"],
                ["Visa Quota", "Up to 8 Visas"],
                ["Crypto / Fintech", "General IT License"],
                ["Banking Ease", "Good"],
              ]
            },
            {
              label: "DMCC", highlight: false,
              rows: [
                ["Setup Cost", "From AED 18,500"],
                ["Setup Speed", "7–14 Working Days"],
                ["Min. Share Capital", "AED 50,000 Declared"],
                ["Virtual Office", "No — Physical Required"],
                ["Prestige Level", "World's #1 Free Zone"],
                ["Best For", "Commodities, Fintech, Finance"],
                ["Annual Renewal", "AED 12,000–18,000"],
                ["Visa Quota", "Up to 6 (standard)"],
                ["Crypto / Fintech", "Dedicated VA License"],
                ["Banking Ease", "Excellent (Premium Banks)"],
              ]
            }
          ].map((col) => (
            <div className={`ifza-vs-col ifza-reveal${col.highlight ? " highlight" : ""}`} key={col.label}>
              <div className="ifza-vs-col-title">
                {col.label}
                <span className="badge">{col.highlight ? "Recommended for Most" : "Premium Choice"}</span>
              </div>
              {col.rows.map(([k,v,cls])=>(
                <div className="ifza-vs-row" key={k}>
                  <span className="ifza-vs-row-key">{k}</span>
                  <span className={`ifza-vs-row-val${cls?" "+cls:""}`}>{v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── PACKAGES ── */}
      <div className="ifza-packages ifza-section">
        <span className="ifza-label ifza-reveal">Setup Packages</span>
        <h2 className="ifza-h2 ifza-reveal ir1">Choose Your <em>IFZA Package</em></h2>
        <p className="ifza-reveal ir2" style={{ fontSize: "0.84rem", color: "var(--cream-ink3)", marginTop: "10px", maxWidth: "520px" }}>
          All packages include full company incorporation, trade license, and corporate documents. Choose based on your workspace and visa needs.
        </p>
        <div className="ifza-pkg-grid">
          {[
            {
              name:"Starter", tag:"Solo founders & remote operators", price:"12,000", badge:"Most Affordable",
              feats:[{t:"1 Trade License Activity",on:true},{t:"Virtual Office (UAE Address)",on:true},{t:"1 Investor Visa",on:true},{t:"Company Stamp & MOA",on:true},{t:"Bank Account Assistance",on:false},{t:"Dedicated Account Manager",on:false}]
            },
            {
              name:"Business", tag:"Growing teams & multi-activity SMEs", price:"15,500", badge:"Most Popular", featured:true,
              feats:[{t:"3 Trade License Activities",on:true},{t:"Flexi Desk Workspace",on:true},{t:"3 Investor Visas",on:true},{t:"Full Corporate Documents",on:true},{t:"Bank Account Assistance",on:true},{t:"Dedicated Account Manager",on:false}]
            },
            {
              name:"Corporate", tag:"Established businesses & larger teams", price:"21,900", badge:"Full Service",
              feats:[{t:"Unlimited Activities",on:true},{t:"Serviced Office",on:true},{t:"5+ Investor Visas",on:true},{t:"Full Corporate Documents",on:true},{t:"Priority Bank Account Setup",on:true},{t:"Dedicated Account Manager",on:true}]
            },
          ].map((pkg,i)=>(
            <div className={`ifza-pkg ifza-reveal ir${i+1}${pkg.featured?" featured":""}`} key={i}>
              {pkg.badge&&<div className="ifza-pkg-badge">{pkg.badge}</div>}
              <div className="ifza-pkg-name">{pkg.name}</div>
              <p className="ifza-pkg-tag">{pkg.tag}</p>
              <div className="ifza-pkg-price">
                <div className="ifza-pkg-amount">AED {pkg.price}</div>
                <div className="ifza-pkg-period">One-time setup · excludes annual renewal</div>
              </div>
              <ul className="ifza-pkg-features">
                {pkg.feats.map((f,j)=>(
                  <li className="ifza-pkg-feat" key={j}>
                    <span className={f.on?"ifza-feat-on":"ifza-feat-off"}>{f.on?"":"×"}</span>
                    <span className={f.on?"ifza-feat-label-on":"ifza-feat-label-off"}>{f.t}</span>
                  </li>
                ))}
              </ul>
              <button className="ifza-pkg-btn">{pkg.featured?"Select This Package →":"Get Started →"}</button>
            </div>
          ))}
        </div>
      </div>

      {/* ── ACTIVITIES ── */}
      <div className="ifza-activities ifza-section">
        <span className="ifza-label ifza-reveal">Licensed Activities</span>
        <h2 className="ifza-h2 ifza-reveal ir1">What Can You Do <em>Under IFZA?</em></h2>
        <p className="ifza-reveal ir2" style={{ fontSize: "0.83rem", color: "var(--w60)", marginTop: "10px", maxWidth: "580px" }}>
          IFZA supports 1,500+ business activities across all major sectors. Here are the most popular:
        </p>
        <div className="ifza-act-grid" style={{ marginTop: "44px" }}>
          {ACTIVITIES.map((a,i)=>(
            <div className={`ifza-act-card ifza-reveal ir${(i%4)+1}`} key={i}>
              <div className="ifza-act-icon">{a.i}</div>
              <div className="ifza-act-name">{a.n}</div>
              <div className="ifza-act-desc">{a.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROCESS ── */}
      <div className="ifza-process ifza-section">
        <span className="ifza-label ifza-reveal" style={{ textAlign:"center", display:"block" }}>Setup Process</span>
        <h2 className="ifza-h2 ifza-reveal ir1" style={{ textAlign:"center" }}>Your IFZA <em>Journey — Step by Step</em></h2>
        <div className="ifza-process-inner">
          {STEPS.map((s,i)=>(
            <div className={`ifza-step ifza-reveal ir${(i%4)+1}`} key={i}>
              <div className="ifza-step-num">{s.n}</div>
              <div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <div className="ifza-step-time">{s.time}</div>
                <div className="ifza-step-docs">{s.docs.map(d=><span className="ifza-doc-tag" key={d}>{d}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DOCUMENTS ── */}
      <div className="ifza-documents ifza-section">
        <span className="ifza-label ifza-reveal">Required Documents</span>
        <h2 className="ifza-h2 ifza-reveal ir1">What You <em>Need to Prepare</em></h2>
        <p className="ifza-reveal ir2" style={{ fontSize: "0.83rem", color: "var(--w60)", marginTop: "10px" }}>
          IFZA requires minimal documentation — one of the simplest document checklists of any UAE free zone.
        </p>
        <div className="ifza-docs-grid">
          {DOCUMENTS.map((d,i)=>(
            <div className={`ifza-doc-card ifza-reveal ir${(i%2)+1}`} key={i}>
              <div className="ifza-doc-num">0{i+1}</div>
              <div><div className="ifza-doc-title">{d.t}</div><div className="ifza-doc-desc">{d.d}</div></div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CALCULATOR ── */}
      <div className="ifza-calc ifza-section">
        <span className="ifza-label ifza-reveal">Cost Estimator</span>
        <Calculator />
      </div>

      {/* ── FAQ ── */}
      <div className="ifza-faq ifza-section">
        <span className="ifza-label ifza-reveal" style={{ textAlign:"center", display:"block" }}>FAQ</span>
        <h2 className="ifza-h2 ifza-reveal ir1" style={{ textAlign:"center" }}>Frequently Asked <em>Questions</em></h2>
        <div className="ifza-faq-inner">
          {FAQS.map((f,i)=>(
            <div className={`ifza-faq-item ifza-reveal ir${(i%3)+1}${openFaq===i?" open":""}`} key={i}>
              <button className="ifza-faq-q" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                <span className="ifza-faq-q-text">{f.q}</span>
                <div className="ifza-faq-icon">+</div>
              </button>
              <div className="ifza-faq-answer">
                <div className="ifza-faq-answer-inner">
                  <p>{f.a}</p>
                  {f.list&&<ul>{f.list.map(li=><li key={li}>{li}</li>)}</ul>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ADVISORY ── */}
      <div className="ifza-advisory ifza-section">
        <span className="ifza-label ifza-reveal" style={{ textAlign:"center", display:"block" }}>INCOZONE Advisory</span>
        <h2 className="ifza-h2 ifza-reveal ir1" style={{ textAlign:"center" }}>Is IFZA <em>Right for You?</em></h2>
        <div className="ifza-advisory-inner">
          <div className="ifza-advisory-quote ifza-reveal ir2">
            "IFZA is our most recommended zone for first-time UAE business owners, digital entrepreneurs, and anyone who wants a credible UAE company without overpaying.{" "}
            <strong>If your business doesn't specifically require DMCC's commodities network or JAFZA's logistics infrastructure, IFZA is almost always the smarter financial choice.</strong>"
            <div className="ifza-advisory-quote-attr">— INCOZONE Advisory Team</div>
          </div>
          <div className="ifza-advisory-tips">
            {[
              { n:"01", t:"Virtual Office Is Legitimate", p:"Many clients worry that a virtual office looks less credible. In UAE free zones, a virtual office address is completely legitimate for banking, contracts, and government registrations. IFZA's Dubai Silicon Oasis address is well-recognised." },
              { n:"02", t:"Start with 3 Activities, Not 1", p:"IFZA allows you to add activities affordably. We recommend starting with at least 3 relevant activities to give your business flexibility without over-licensing areas you'll never use." },
              { n:"03", t:"No Capital Requirement — Use It Wisely", p:"Unlike DMCC, IFZA has no minimum share capital requirement. This frees up your working capital. However, banks will still want to see financial substance — INCOZONE helps you prepare properly." },
              { n:"04", t:"IFZA to DMCC Upgrade Path", p:"Many clients start with IFZA and upgrade to DMCC as their business scales. This is a valid strategy. INCOZONE structures your IFZA setup to make a future upgrade as seamless as possible." },
            ].map((tip,i)=>(
              <div className={`ifza-tip ifza-reveal ir${(i%2)+1}`} key={i}>
                <span className="ifza-tip-num">{tip.n}</span>
                <h4>{tip.t}</h4>
                <p>{tip.p}</p>
              </div>
            ))}
          </div>
          <div className="ifza-advisory-warning ifza-reveal">
            <h4> When IFZA Is NOT the Right Choice</h4>
            <p>IFZA may not be ideal if: you need DMCC's commodities ecosystem · you are a regulated financial services firm requiring DMCC's FinTech Hive · your banking partners specifically require a DMCC or DIFC entity · you need more than 8 visas from a single license. In these cases, INCOZONE will recommend the right alternative — honestly.</p>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="ifza-cta">
        <div className="ifza-cta-inner">
          <span className="ifza-label ifza-reveal">Begin Your Journey</span>
          <h2 className="ifza-reveal ir1">Ready to Launch Your<br /><em>UAE Business?</em></h2>
          <div className="ifza-cta-divider" />
          <p className="ifza-reveal ir2">
            Schedule a free consultation. No obligation. Our IFZA specialists will assess your situation — and if another zone is a better fit, we'll tell you that too.
          </p>
          <div className="ifza-cta-btns ifza-reveal ir3">
            <button className="ifza-btn-ink">Schedule Free Consultation</button>
            <button className="ifza-btn-outline" onClick={onBack}>← Explore Other Zones</button>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="ifza-footer">
        <div className="ifza-footer-inner">
          <div className="ifza-footer-logo">INCO<em>ZONE</em></div>
          <div className="ifza-footer-copy">© 2025 INCOZONE. All rights reserved. Dubai, UAE.</div>
          <button className="ifza-footer-back" onClick={onBack}>← Back to Free Zones</button>
        </div>
      </div>

      {/* ── WA FLOAT ── */}
      <div className="ifza-wa">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </div>
    </div>
  );
}
