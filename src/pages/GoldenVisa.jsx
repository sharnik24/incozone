import { useState, useEffect, useRef } from "react";
import { IBuilding, ITrendingUp, ILightbulb, IAward, IIdCard, IHeart, ICalendar, IUsers, IShield, IGlobe, ICreditCard, IBriefcase, IBookOpen, ILock } from "../icons";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — UAE Golden Visa Page
//  Drop into: src/pages/GoldenVisa.jsx
//  Usage:     import GoldenVisaPage from "./pages/GoldenVisa"
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

.gv-root *, .gv-root *::before, .gv-root *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}
.gv-root {
  --n950: #020b14; --n900: #05111e; --n800: #091928; --n750: #0c2033;
  --n700: #102540; --n600: #163354; --n500: #1e4570;
  --g400: #C9A84C; --g300: #D4B468; --g200: #E2CC98; --g100: #F0E4C0;
  --glow: rgba(201,168,76,0.14); --glow2: rgba(201,168,76,0.07);
  --glow3: rgba(201,168,76,0.04);
  --cream-bg: #FAF6EE; --cream-100: #F4ECD8; --cream-200: #EDE0C4;
  --cream-ink: #1A120A; --cream-ink2: #3D2E1A; --cream-ink3: #7A6040;
  --cream-bdr: rgba(180,150,90,0.2);
  --w: #F8F5EE; --w80: rgba(248,245,238,0.80); --w60: rgba(248,245,238,0.60);
  --w30: rgba(248,245,238,0.30); --w12: rgba(248,245,238,0.12);
  --w06: rgba(248,245,238,0.06); --w03: rgba(248,245,238,0.03);
  --fd: 'Cormorant Garamond', Georgia, serif;
  --fb: 'DM Sans', system-ui, sans-serif;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  font-family: var(--fb); font-weight: 300; line-height: 1.6;
  color: var(--w); background: var(--n900);
  overflow-x: hidden; width: 100%;
}

/* ── NAV ── */
.gv-nav {
  position: fixed; inset-inline: 0; top: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 60px;
  transition: background 0.5s, padding 0.4s, border-color 0.5s;
  border-bottom: 1px solid transparent;
}
.gv-nav.scrolled {
  background: rgba(5,17,30,0.96); backdrop-filter: blur(20px);
  padding: 14px 60px; border-bottom-color: rgba(201,168,76,0.12);
}
.gv-nav-logo { font-family: var(--fd); font-size: 1.5rem; font-weight: 500; letter-spacing: 0.15em; color: var(--w); cursor: pointer; }
.gv-nav-logo em { color: var(--g400); font-style: normal; }
.gv-nav-links { display: flex; gap: 36px; list-style: none; }
.gv-nav-links a { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--w60); text-decoration: none; transition: color 0.3s; cursor: pointer; }
.gv-nav-links a:hover { color: var(--g300); }
.gv-nav-cta { font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; background: transparent; border: 1px solid var(--g400); color: var(--g400); padding: 9px 22px; cursor: pointer; font-family: var(--fb); transition: background 0.3s, color 0.3s; }
.gv-nav-cta:hover { background: var(--g400); color: var(--n900); }

.gv-nav-hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 6px; z-index: 310; }
.gv-nav-hamburger span { display: block; width: 24px; height: 1.5px; background: rgba(248,245,238,0.6); transition: all 0.35s var(--ease); transform-origin: center; }
.gv-nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: var(--g400); }
.gv-nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.gv-nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: var(--g400); }

.gv-drawer { position: fixed; inset: 0; z-index: 300; background: rgba(3,10,20,0.97); backdrop-filter: blur(24px); display: flex; flex-direction: column; align-items: center; justify-content: center; transform: translateX(100%); transition: transform 0.45s var(--ease); pointer-events: none; }
.gv-drawer.open { transform: translateX(0); pointer-events: all; }
.gv-drawer-brand { font-family: var(--fd); font-size: 1.3rem; letter-spacing: .18em; color: var(--w); margin-bottom: 44px; opacity: 0; transform: translateY(10px); transition: opacity .4s .1s, transform .4s .1s; cursor: pointer; }
.gv-drawer.open .gv-drawer-brand { opacity: 1; transform: translateY(0); }
.gv-drawer-brand em { color: var(--g400); font-style: normal; }
.gv-dlink { font-family: var(--fd); font-size: clamp(2rem, 8vw, 3rem); font-weight: 300; color: var(--w60); background: none; border: none; padding: 10px 0; cursor: pointer; display: block; width: 100%; text-align: center; opacity: 0; transform: translateY(18px); transition: color .3s, opacity .4s var(--ease), transform .4s var(--ease); }
.gv-drawer.open .gv-dlink { opacity: 1; transform: translateY(0); }
.gv-drawer.open .gv-dlink:nth-of-type(1){transition-delay:.12s} .gv-drawer.open .gv-dlink:nth-of-type(2){transition-delay:.17s} .gv-drawer.open .gv-dlink:nth-of-type(3){transition-delay:.22s} .gv-drawer.open .gv-dlink:nth-of-type(4){transition-delay:.27s} .gv-drawer.open .gv-dlink:nth-of-type(5){transition-delay:.32s}
.gv-dlink:hover { color: var(--g400); }
.gv-drawer-div { width: 40px; height: 1px; background: rgba(201,168,76,.25); margin: 18px 0; opacity: 0; transition: opacity .4s .34s; }
.gv-drawer.open .gv-drawer-div { opacity: 1; }
.gv-dcta { font-family: var(--fb); font-size: .7rem; letter-spacing: .18em; text-transform: uppercase; color: var(--g400); border: 1px solid var(--g400); background: none; padding: 12px 32px; cursor: pointer; margin-top: 8px; opacity: 0; transform: translateY(18px); transition: color .3s, background .3s, opacity .4s .38s, transform .4s .38s; }
.gv-drawer.open .gv-dcta { opacity: 1; transform: translateY(0); }
.gv-dcta:hover { background: var(--g400); color: var(--n900); }

/* ── HERO ── */
.gv-hero {
  min-height: 100vh; position: relative; overflow: hidden;
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: flex-end; padding: 0 60px 80px; gap: 60px;
}
.gv-hero-canvas { position: absolute; inset: 0; z-index: 0; display: block; }
.gv-hero-left { position: relative; z-index: 2; padding-top: 160px; }
.gv-hero-right { position: relative; z-index: 2; padding-top: 160px; display: flex; align-items: flex-end; justify-content: flex-end; }

.gv-hero-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase;
  color: var(--g400); border: 1px solid rgba(201,168,76,0.28); padding: 7px 16px;
  margin-bottom: 32px;
  opacity: 0; transform: translateY(16px);
  animation: gvUp 1s var(--ease) 0.2s forwards;
}
.gv-hero-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--g400); animation: gvBlink 2s infinite; }

.gv-hero-h1 {
  font-family: var(--fd); font-weight: 300; line-height: 0.88;
  letter-spacing: -0.02em; color: var(--w);
  font-size: clamp(4rem, 9vw, 8.5rem); margin-bottom: 20px;
  opacity: 0; transform: translateY(20px);
  animation: gvUp 1.1s var(--ease) 0.35s forwards;
}
.gv-hero-h1 em { display: block; color: var(--g400); font-style: italic; font-weight: 300; }

.gv-hero-fullname {
  font-family: var(--fd); font-size: 1.1rem; font-weight: 300;
  color: var(--w60); font-style: italic; margin-bottom: 36px; letter-spacing: 0.04em;
  opacity: 0; animation: gvUp 1s var(--ease) 0.5s forwards;
}

.gv-hero-desc {
  font-size: 0.88rem; color: var(--w60); line-height: 1.85; max-width: 520px; margin-bottom: 40px;
  opacity: 0; animation: gvUp 1s var(--ease) 0.65s forwards;
}
.gv-hero-desc strong { color: var(--w80); font-weight: 400; }

.gv-hero-tags {
  display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 40px;
  opacity: 0; animation: gvUp 1s var(--ease) 0.75s forwards;
}
.gv-hero-tag { font-size: 0.6rem; letter-spacing: 0.16em; text-transform: uppercase; padding: 6px 14px; border: 1px solid rgba(201,168,76,0.25); color: var(--g300); }

.gv-hero-btns {
  display: flex; gap: 14px; flex-wrap: wrap;
  opacity: 0; animation: gvUp 1s var(--ease) 0.85s forwards;
}
.gv-btn-gold { padding: 15px 36px; background: var(--g400); color: var(--n900); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.gv-btn-gold:hover { background: var(--g300); transform: translateY(-2px); }
.gv-btn-ghost { padding: 15px 36px; background: transparent; color: var(--w60); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--w12); cursor: pointer; transition: all 0.3s; }
.gv-btn-ghost:hover { border-color: var(--w30); color: var(--w); transform: translateY(-2px); }

/* Hero right — big stat card */
.gv-hero-stat-card {
  background: rgba(9,25,40,0.85); backdrop-filter: blur(16px);
  border: 1px solid rgba(201,168,76,0.22); padding: 52px 44px;
  min-width: 280px; text-align: center; position: relative; overflow: hidden;
}
.gv-hero-stat-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(201,168,76,0.06), transparent); pointer-events: none; }
.gv-hero-stat-label { font-size: 0.58rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--g400); margin-bottom: 16px; display: block; }
.gv-hero-stat-num { font-family: var(--fd); font-size: 7rem; font-weight: 300; color: var(--g400); line-height: 1; display: block; }
.gv-hero-stat-unit { font-family: var(--fd); font-size: 1.8rem; font-weight: 300; color: var(--w60); display: block; margin-top: 4px; letter-spacing: 0.05em; }
.gv-hero-stat-sub { font-size: 0.68rem; color: var(--w30); letter-spacing: 0.12em; text-transform: uppercase; margin-top: 20px; display: block; }

/* ── STATS BAR ── */
.gv-stats-bar {
  background: var(--n800); padding: 0 60px;
  display: grid; grid-template-columns: repeat(5, 1fr);
  border-bottom: 1px solid var(--w06);
}
.gv-stat { padding: 32px 0; text-align: center; border-right: 1px solid var(--w06); }
.gv-stat:last-child { border-right: none; }
.gv-stat-val { font-family: var(--fd); font-size: 2.2rem; font-weight: 300; color: var(--g400); display: block; line-height: 1; }
.gv-stat-key { font-size: 0.62rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--w30); margin-top: 6px; display: block; }

/* ── WHO QUALIFIES ── */
.gv-qualify { background: var(--n900); padding: 100px 60px; }
.gv-section-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--g400); margin-bottom: 16px; display: block; }
.gv-section-h2 { font-family: var(--fd); font-size: clamp(2.2rem, 4vw, 3.8rem); font-weight: 300; line-height: 1.1; color: var(--w); margin-bottom: 60px; }
.gv-section-h2 em { color: var(--g400); font-style: italic; }

.gv-qualify-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: var(--w06); }
.gv-qualify-card {
  background: var(--n800); padding: 48px 40px;
  position: relative; overflow: hidden; cursor: default;
  transition: background 0.4s var(--ease);
}
.gv-qualify-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, var(--glow2), transparent); opacity: 0; transition: opacity 0.4s; pointer-events: none; }
.gv-qualify-card:hover { background: var(--n750); }
.gv-qualify-card:hover::before { opacity: 1; }
.gv-qualify-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--g400); transform: scaleX(0); transform-origin: left; transition: transform 0.5s var(--ease); }
.gv-qualify-card:hover::after { transform: scaleX(1); }

.gv-qualify-icon { font-size: 2rem; margin-bottom: 24px; display: block; }
.gv-qualify-num { font-family: var(--fd); font-size: 0.7rem; letter-spacing: 0.28em; color: rgba(201,168,76,0.5); margin-bottom: 14px; display: block; transition: color 0.3s; }
.gv-qualify-card:hover .gv-qualify-num { color: var(--g400); }
.gv-qualify-title { font-family: var(--fd); font-size: 1.5rem; font-weight: 400; color: var(--w); margin-bottom: 14px; line-height: 1.2; }
.gv-qualify-desc { font-size: 0.82rem; color: var(--w60); line-height: 1.78; margin-bottom: 20px; }
.gv-qualify-req { display: flex; flex-direction: column; gap: 8px; }
.gv-qualify-req-item { display: flex; align-items: flex-start; gap: 10px; font-size: 0.76rem; color: var(--w60); line-height: 1.5; }
.gv-qualify-req-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--g400); flex-shrink: 0; margin-top: 6px; }

/* ── BENEFITS ── */
.gv-benefits { background: var(--n800); padding: 100px 60px; }
.gv-benefits-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
.gv-benefits-left { }
.gv-benefits-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--w06); margin-top: 52px; }
.gv-benefit-card { background: var(--n800); padding: 36px 32px; transition: background 0.3s; }
.gv-benefit-card:hover { background: var(--n750); }
.gv-benefit-icon { font-size: 1.6rem; margin-bottom: 16px; display: block; }
.gv-benefit-title { font-size: 0.88rem; font-weight: 500; color: var(--w); margin-bottom: 8px; }
.gv-benefit-desc { font-size: 0.76rem; color: var(--w60); line-height: 1.72; }

.gv-benefits-right { }
.gv-compare-box { border: 1px solid rgba(201,168,76,0.2); background: var(--n750); padding: 48px 44px; position: relative; overflow: hidden; }
.gv-compare-box::before { content: 'GOLDEN\AVISA'; position: absolute; right: -20px; top: 50%; transform: translateY(-50%); font-family: var(--fd); font-size: 8rem; font-weight: 300; color: transparent; -webkit-text-stroke: 1px rgba(201,168,76,0.05); line-height: 1; pointer-events: none; white-space: pre; }
.gv-compare-title { font-family: var(--fd); font-size: 1.4rem; font-weight: 400; color: var(--w); margin-bottom: 8px; }
.gv-compare-sub { font-size: 0.76rem; color: var(--w30); margin-bottom: 36px; letter-spacing: 0.06em; }
.gv-compare-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--w06); margin-bottom: 1px; }
.gv-compare-row:last-of-type { margin-bottom: 0; }
.gv-compare-cell { background: var(--n800); padding: 16px 18px; font-size: 0.78rem; }
.gv-compare-cell.label { color: var(--w30); font-size: 0.68rem; letter-spacing: 0.1em; }
.gv-compare-cell.gold { color: var(--g400); font-weight: 500; }
.gv-compare-cell.dim { color: var(--w30); }
.gv-compare-header { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: rgba(201,168,76,0.15); margin-bottom: 2px; }
.gv-compare-header-cell { padding: 10px 18px; font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; }
.gv-compare-header-cell:first-child { color: var(--g400); background: rgba(201,168,76,0.08); }
.gv-compare-header-cell:last-child { color: var(--w30); background: var(--n800); }

/* ── PROCESS ── */
.gv-process { background: var(--n900); padding: 100px 60px; }
.gv-process-header { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-bottom: 72px; align-items: end; }
.gv-process-intro { font-size: 0.84rem; color: var(--w60); line-height: 1.88; }
.gv-process-intro strong { color: var(--w); font-weight: 400; }
.gv-process-steps { display: flex; flex-direction: column; gap: 0; max-width: 860px; }
.gv-step { display: grid; grid-template-columns: 80px 1fr 160px; gap: 0; border-top: 1px solid var(--w06); padding: 36px 0; align-items: start; position: relative; overflow: hidden; transition: background 0.4s; }
.gv-step:last-child { border-bottom: 1px solid var(--w06); }
.gv-step::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--g400); transform: scaleY(0); transform-origin: top; transition: transform 0.5s var(--ease); }
.gv-step:hover::before { transform: scaleY(1); }
.gv-step-num { font-family: var(--fd); font-size: 3.5rem; font-weight: 300; color: rgba(201,168,76,0.15); line-height: 1; transition: color 0.4s; }
.gv-step:hover .gv-step-num { color: rgba(201,168,76,0.35); }
.gv-step-body { padding: 0 40px 0 0; }
.gv-step-title { font-size: 1rem; font-weight: 500; color: var(--w); margin-bottom: 10px; }
.gv-step-desc { font-size: 0.8rem; color: var(--w60); line-height: 1.75; }
.gv-step-docs { margin-top: 14px; display: flex; flex-wrap: wrap; gap: 6px; }
.gv-step-doc { font-size: 0.58rem; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 10px; border: 1px solid var(--w06); color: var(--w30); }
.gv-step-time { font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--g400); padding: 6px 14px; border: 1px solid rgba(201,168,76,0.2); text-align: center; height: fit-content; margin-top: 4px; }

/* ── PACKAGES ── */
.gv-packages { background: var(--cream-bg); padding: 100px 60px; position: relative; overflow: hidden; }
.gv-packages::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, transparent, var(--g400), transparent); opacity: 0.5; }
.gv-packages-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: #8A6820; margin-bottom: 16px; display: block; }
.gv-packages-h2 { font-family: var(--fd); font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 300; color: var(--cream-ink); line-height: 1.1; margin-bottom: 60px; }
.gv-packages-h2 em { color: var(--g400); font-style: italic; }

.gv-packages-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.gv-pkg { background: var(--cream-bg); border: 1px solid var(--cream-bdr); padding: 44px 36px; position: relative; display: flex; flex-direction: column; transition: all 0.35s var(--ease); box-shadow: 0 2px 12px rgba(120,90,30,0.06); cursor: pointer; }
.gv-pkg:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(120,90,30,0.14); border-color: rgba(201,168,76,0.45); }
.gv-pkg.featured { background: var(--n900); border: 1px solid rgba(201,168,76,0.35); box-shadow: 0 8px 40px rgba(0,0,0,0.22); }
.gv-pkg.featured:hover { border-color: var(--g400); box-shadow: 0 20px 56px rgba(0,0,0,0.32); }
.gv-pkg-badge { font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; padding: 4px 10px; width: fit-content; margin-bottom: 24px; border: 1px solid; font-weight: 500; }
.gv-pkg:not(.featured) .gv-pkg-badge { border-color: var(--cream-bdr); color: var(--cream-ink3); background: var(--cream-200); }
.gv-pkg.featured .gv-pkg-badge { border-color: var(--g400); color: var(--g400); background: rgba(201,168,76,0.08); }
.gv-pkg-name { font-family: var(--fd); font-size: 1.7rem; font-weight: 400; margin-bottom: 8px; }
.gv-pkg:not(.featured) .gv-pkg-name { color: var(--cream-ink); }
.gv-pkg.featured .gv-pkg-name { color: var(--w); }
.gv-pkg-tagline { font-size: 0.78rem; margin-bottom: 28px; }
.gv-pkg:not(.featured) .gv-pkg-tagline { color: var(--cream-ink3); }
.gv-pkg.featured .gv-pkg-tagline { color: var(--w60); }
.gv-pkg-divider { height: 1px; margin-bottom: 28px; }
.gv-pkg:not(.featured) .gv-pkg-divider { background: var(--cream-bdr); }
.gv-pkg.featured .gv-pkg-divider { background: var(--w06); }
.gv-pkg-features { list-style: none; display: flex; flex-direction: column; gap: 12px; flex: 1; margin-bottom: 36px; }
.gv-pkg-feat { display: flex; align-items: flex-start; gap: 12px; font-size: 0.8rem; line-height: 1.5; }
.gv-pkg:not(.featured) .gv-pkg-feat { color: var(--cream-ink2); }
.gv-pkg.featured .gv-pkg-feat { color: var(--w80); }
.gv-feat-check { flex-shrink: 0; margin-top: 2px; font-size: 0.75rem; }
.gv-pkg:not(.featured) .gv-feat-check { color: #8A6820; }
.gv-pkg.featured .gv-feat-check { color: var(--g400); }
.gv-pkg-cta { padding: 13px 20px; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; font-family: var(--fb); cursor: pointer; transition: all 0.3s; width: 100%; font-weight: 500; }
.gv-pkg:not(.featured) .gv-pkg-cta { background: transparent; border: 1px solid var(--cream-bdr); color: var(--cream-ink2); }
.gv-pkg:not(.featured) .gv-pkg-cta:hover { border-color: var(--g400); color: var(--cream-ink); background: var(--cream-200); }
.gv-pkg.featured .gv-pkg-cta { background: var(--g400); border: none; color: var(--n900); }
.gv-pkg.featured .gv-pkg-cta:hover { background: var(--g300); }

/* ── FAQ ── */
.gv-faq { background: var(--n900); padding: 100px 60px; }
.gv-faq-inner { display: grid; grid-template-columns: 1fr 1.6fr; gap: 80px; align-items: start; }
.gv-faq-list { display: flex; flex-direction: column; gap: 0; }
.gv-faq-item { border-top: 1px solid var(--w06); overflow: hidden; }
.gv-faq-item:last-child { border-bottom: 1px solid var(--w06); }
.gv-faq-q { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 24px 0; cursor: pointer; transition: color 0.3s; }
.gv-faq-q-text { font-size: 0.92rem; font-weight: 400; color: var(--w); transition: color 0.3s; }
.gv-faq-item.open .gv-faq-q-text { color: var(--g400); }
.gv-faq-icon { width: 28px; height: 28px; border: 1px solid var(--w12); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1rem; color: var(--w30); flex-shrink: 0; transition: all 0.4s var(--ease); }
.gv-faq-item.open .gv-faq-icon { background: var(--g400); border-color: var(--g400); color: var(--n900); transform: rotate(45deg); }
.gv-faq-a { font-size: 0.82rem; color: var(--w60); line-height: 1.82; padding-bottom: 24px; max-height: 0; overflow: hidden; transition: max-height 0.5s var(--ease), padding 0.3s; }
.gv-faq-item.open .gv-faq-a { max-height: 300px; }

/* ── CTA ── */
.gv-cta { background: var(--cream-bg); padding: 120px 60px; text-align: center; position: relative; overflow: hidden; }
.gv-cta::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(180,150,90,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(180,150,90,0.06) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; }
.gv-cta::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.09), transparent); pointer-events: none; }
.gv-cta-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
.gv-cta-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: #8A6820; margin-bottom: 20px; display: block; }
.gv-cta-h2 { font-family: var(--fd); font-size: clamp(2.5rem, 5vw, 4.2rem); font-weight: 300; color: var(--cream-ink); line-height: 1.1; margin-bottom: 12px; }
.gv-cta-h2 em { color: var(--g400); font-style: italic; }
.gv-cta-divider { width: 44px; height: 1px; background: var(--g400); margin: 24px auto; opacity: 0.5; }
.gv-cta-p { font-size: 0.84rem; color: var(--cream-ink3); line-height: 1.85; margin-bottom: 44px; }
.gv-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.gv-btn-dark { padding: 15px 40px; background: var(--cream-ink); color: var(--cream-bg); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.gv-btn-dark:hover { background: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }
.gv-btn-outline { padding: 15px 40px; background: transparent; color: var(--cream-ink2); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--cream-bdr); cursor: pointer; transition: all 0.3s; }
.gv-btn-outline:hover { border-color: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }

/* ── FOOTER ── */
.gv-footer { background: var(--n950); padding: 52px 60px; border-top: 1px solid var(--w06); }
.gv-footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
.gv-footer-logo { font-family: var(--fd); font-size: 1.3rem; letter-spacing: 0.15em; color: var(--w); }
.gv-footer-logo em { color: var(--g400); font-style: normal; }
.gv-footer-copy { font-size: 0.68rem; color: var(--w30); }

/* ── WA ── */
.gv-wa { position: fixed; bottom: 28px; right: 28px; z-index: 300; width: 50px; height: 50px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 18px rgba(37,211,102,0.4); transition: transform 0.3s; }
.gv-wa:hover { transform: scale(1.1); }

/* ── REVEAL ── */
.gv-reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.85s var(--ease), transform 0.85s var(--ease); }
.gv-reveal.in { opacity: 1; transform: translateY(0); }
.gv-d1 { transition-delay: 0.05s; } .gv-d2 { transition-delay: 0.15s; }
.gv-d3 { transition-delay: 0.25s; } .gv-d4 { transition-delay: 0.35s; }

/* ── KEYFRAMES ── */
@keyframes gvUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes gvBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
@keyframes gvPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }

/* ── RESPONSIVE ── */
@media (max-width: 1000px) {
  .gv-hero { grid-template-columns: 1fr; padding: 120px 40px 60px; }
  .gv-hero-right { justify-content: flex-start; }
  .gv-hero-stat-card { min-width: unset; width: 100%; max-width: 340px; }
  .gv-stats-bar { grid-template-columns: repeat(3, 1fr); }
  .gv-qualify-grid { grid-template-columns: 1fr 1fr; }
  .gv-benefits-inner { grid-template-columns: 1fr; }
  .gv-process-header { grid-template-columns: 1fr; gap: 28px; }
  .gv-packages-grid { grid-template-columns: 1fr; }
  .gv-faq-inner { grid-template-columns: 1fr; gap: 48px; }
}
@media (max-width: 768px) {
  .gv-nav { padding: 16px 24px; } .gv-nav.scrolled { padding: 12px 24px; }
  .gv-nav-links { display: none; } .gv-nav-cta { display: none; }
  .gv-nav-hamburger { display: flex; }
  .gv-hero { padding: 100px 24px 52px; }
  .gv-qualify { padding: 70px 24px; } .gv-qualify-grid { grid-template-columns: 1fr; }
  .gv-benefits { padding: 70px 24px; } .gv-benefits-grid { grid-template-columns: 1fr; }
  .gv-process { padding: 70px 24px; }
  .gv-step { grid-template-columns: 56px 1fr; gap: 0; }
  .gv-step-time { display: none; }
  .gv-packages { padding: 70px 24px; }
  .gv-faq { padding: 70px 24px; }
  .gv-cta { padding: 80px 24px; }
  .gv-footer { padding: 40px 24px; }
  .gv-stats-bar { grid-template-columns: 1fr 1fr; padding: 0 24px; }
}
@media (max-width: 480px) {
  .gv-stats-bar { grid-template-columns: 1fr 1fr; }
  .gv-hero-btns { flex-direction: column; }
  .gv-hero-btns button { width: 100%; }
}
`;

// ── DATA ──────────────────────────────────────────────────────

const CATEGORIES = [
  {
    icon: IBuilding,
    num: "01",
    title: "Real Estate Investor",
    desc: "Own UAE property worth AED 2 million or more — whether purchased outright or with a mortgage from an approved UAE bank.",
    reqs: [
      "Property value AED 2M+ (single or multiple properties)",
      "Title deed in applicant's name",
      "Mortgage properties accepted (from approved UAE banks)",
      "Off-plan properties accepted from approved developers",
    ],
  },
  {
    icon: ITrendingUp,
    num: "02",
    title: "Business Owner / Investor",
    desc: "Entrepreneurs and investors who own a business with a minimum capital investment or who have established a company in the UAE.",
    reqs: [
      "Minimum AED 2M capital investment in a UAE company",
      "OR own a business with AED 500K+ annual revenue",
      "Approvals from Ministry of Economy or local economic departments",
      "Existing free zone or mainland company owners may qualify",
    ],
  },
  {
    icon: ILightbulb,
    num: "03",
    title: "Exceptional Talent",
    desc: "Professionals recognised for outstanding contributions in science, arts, culture, sports, medicine, education, or technology.",
    reqs: [
      "Endorsed by an accredited UAE entity in your field",
      "Doctors, scientists, engineers, artists, athletes",
      "PhD holders and academic researchers",
      "Inventors with registered patents",
    ],
  },
  {
    icon: IAward,
    num: "04",
    title: "Outstanding Students",
    desc: "High-achieving students from UAE universities or top-ranked international institutions who demonstrate academic excellence.",
    reqs: [
      "GPA of 3.75 or above from a UAE university",
      "Students from top 100 globally ranked universities",
      "Secondary school students with exceptional grades",
      "Ministry of Education endorsement required",
    ],
  },
  {
    icon: IIdCard,
    num: "05",
    title: "Skilled Professional",
    desc: "Professionals in priority sectors who meet the UAE's criteria for skills and salary thresholds in high-demand industries.",
    reqs: [
      "Monthly salary of AED 30,000 or more",
      "Employment in a UAE-registered company",
      "Priority sectors: tech, healthcare, STEM, finance",
      "Valid UAE work permit and residency",
    ],
  },
  {
    icon: IHeart,
    num: "06",
    title: "Humanitarian Pioneer",
    desc: "Individuals who have made significant charitable contributions or shown extraordinary humanitarian service.",
    reqs: [
      "Recognised charitable work in the UAE",
      "Endorsed by the Ministry of Community Development",
      "NGO leaders and social entrepreneurs",
      "Donors of significant charitable funds",
    ],
  },
];

const BENEFITS = [
  { icon: ICalendar, title: "10-Year Renewable Residency", desc: "Live, work, and study in the UAE for 10 years — automatically renewable if conditions are maintained." },
  { icon: IUsers, title: "Full Family Sponsorship", desc: "Sponsor spouse, children (all ages), and parents. No age limit restrictions on children unlike standard visas." },
  { icon: IShield, title: "No Employer Sponsorship", desc: "Completely self-sponsored. Your residency is independent of any employer — full freedom to change jobs or start businesses." },
  { icon: IGlobe, title: "Stay Outside UAE", desc: "No mandatory return requirement every 6 months. Live internationally without losing your UAE residency status." },
  { icon: ICreditCard, title: "Full Banking Access", desc: "Access premium UAE banking facilities, investments, property ownership rights, and financial services as a long-term resident." },
  { icon: IBriefcase, title: "Business Freedom", desc: "Full freedom to establish, own, and operate UAE businesses. Start companies, hold shares, and run operations independently." },
  { icon: IBookOpen, title: "Education & Healthcare", desc: "Access to UAE government schools, universities, and healthcare at resident rates — not visitor rates." },
  { icon: ILock, title: "Stability & Security", desc: "10-year horizon provides the stability to invest, plan, and build in the UAE with full long-term confidence." },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Eligibility Assessment",
    desc: "We review your profile — assets, business ownership, profession, or talent category — and confirm your qualification pathway. If you qualify under multiple categories, we recommend the strongest route.",
    docs: ["Passport Copy", "Business Documents", "Property Title Deed", "Salary Certificate"],
    time: "Day 1–2",
  },
  {
    num: "02",
    title: "Document Preparation",
    desc: "We prepare and organise your complete application package. All documents are verified, attested where required, and formatted to meet ICA (Federal Authority for Identity and Citizenship) standards.",
    docs: ["Attestation", "Translation", "Business Valuation", "Bank Statements"],
    time: "Day 2–7",
  },
  {
    num: "03",
    title: "ICA Application Submission",
    desc: "Application submitted to the Federal Authority for Identity & Citizenship. We track progress daily and respond to any authority queries immediately — ensuring zero delays from our side.",
    docs: ["ICA Portal", "GDRFA Dubai", "ADSC Abu Dhabi"],
    time: "Day 7–14",
  },
  {
    num: "04",
    title: "Medical & Biometrics",
    desc: "Medical fitness test, Emirates ID biometrics, and health insurance confirmation. We book and guide you through every appointment — or manage it remotely for overseas applicants.",
    docs: ["Medical Test", "Biometric Scan", "Emirates ID"],
    time: "Day 14–21",
  },
  {
    num: "05",
    title: "Visa Issuance & Stamping",
    desc: "Golden Visa entry permit issued. Residence stamp in passport completed. Emirates ID delivered. Full 10-year validity confirmed with all certificates and documents handed over.",
    docs: ["Residence Visa", "Emirates ID Card", "Visa Certificate"],
    time: "Day 21–30",
  },
];

const FAQS = [
  {
    q: "How long does the UAE Golden Visa process take?",
    a: "The typical timeline is 21–30 working days from document submission to visa issuance. In some cases it can be completed faster. The main variable is the ICA approval timeline, which we actively track and expedite where possible.",
  },
  {
    q: "Can I include my family on the Golden Visa?",
    a: "Yes. Your Golden Visa allows you to sponsor your spouse, children of all ages (no upper age limit unlike standard visas), and parents. Domestic helpers can also be sponsored. Family members receive the same 10-year validity.",
  },
  {
    q: "Do I need to live in the UAE to maintain my Golden Visa?",
    a: "No. Unlike standard UAE residency which requires you to return every 6 months, the Golden Visa has no mandatory return requirement. You can live abroad without risking cancellation of your UAE residency.",
  },
  {
    q: "Does my UAE-registered company qualify me for the Golden Visa?",
    a: "Potentially yes. If your company has a minimum capital of AED 2 million or generates AED 500,000+ in annual revenue, you may qualify under the investor/entrepreneur category. We conduct a detailed assessment before advising.",
  },
  {
    q: "What happens if I sell my property after getting the Golden Visa?",
    a: "Your Golden Visa is tied to your qualifying condition at the time of application. If you sell the property, your eligibility may change at renewal. However, if you have qualified under another category by then, renewal may proceed under the new category.",
  },
  {
    q: "Is the Golden Visa valid for working in any UAE emirate?",
    a: "Yes. The UAE Golden Visa is a federal residency — valid across all seven emirates. You can live in Dubai and work in Abu Dhabi, or vice versa, without any restrictions.",
  },
];

// ── HERO CANVAS ─────────────────────────────────────────────
function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let W, H, raf, t = 0;
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * 1920, y: Math.random() * 1080,
      vx: (Math.random() - .5) * 0.18, vy: (Math.random() - .5) * 0.18,
      r: Math.random() * 1.5 + 0.4, o: Math.random() * 0.4 + 0.12,
    }));
    const draw = () => {
      t += 0.004; ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, "#05111e"); bg.addColorStop(1, "#020b14");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      // Gold warm glow blobs
      [[0.15, 0.3, "#C9A84C", 0.06, 12], [0.85, 0.25, "#D4B468", 0.04, 9], [0.5, 0.75, "#C9A84C", 0.05, 15], [0.3, 0.85, "#0c2033", 0.5, 8]].forEach(([bx, by, col, a, spd], i) => {
        const x = W * bx + Math.sin(t * (spd / 10) + i * 2.1) * 80, y = H * by + Math.cos(t * (spd / 13) + i) * 55;
        const r = Math.min(W, H) * 0.65;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        const rgb = parseInt(col.slice(1), 16);
        g.addColorStop(0, `rgba(${rgb >> 16},${(rgb >> 8) & 255},${rgb & 255},${a})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      });
      // Grid
      ctx.strokeStyle = "rgba(201,168,76,0.025)"; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      // Particles + connections
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(201,168,76,${0.07 * (1 - d / 150)})`; ctx.lineWidth = 0.4; ctx.stroke(); }
        }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.o})`; ctx.fill();
      }
      // Vignette
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, H * 0.9);
      vg.addColorStop(0, "transparent"); vg.addColorStop(1, "rgba(2,11,20,0.7)");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="gv-hero-canvas" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />;
}

// ── REVEAL HOOK ─────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".gv-reveal");
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
    }), { threshold: 0.07 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ── MAIN ─────────────────────────────────────────────────────
export default function GoldenVisaPage({ onBack, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const go = (page) => {
    setDrawerOpen(false);
    if (onNavigate) { onNavigate(page); window.scrollTo(0, 0); }
  };

  const navLinks = [
    { label: "Home", page: "home" }, { label: "Services", page: "services" },
    { label: "Free Zones", page: "home" }, { label: "About", page: "about" },
    { label: "Blog", page: "blog" }, { label: "Contact", page: "contact" },
  ];

  return (
    <div className="gv-root">
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className={`gv-nav${scrolled ? " scrolled" : ""}`}>
        <div className="gv-nav-logo" onClick={() => go("home")}>INCO<em>ZONE</em></div>
        <ul className="gv-nav-links">
          {navLinks.map(l => (
            <li key={l.label}><a onClick={() => go(l.page)}>{l.label}</a></li>
          ))}
        </ul>
        <button className="gv-nav-cta" onClick={() => go("schedule")}>Schedule Consultation</button>
        <button className={`gv-nav-hamburger${drawerOpen ? " open" : ""}`} onClick={() => setDrawerOpen(o => !o)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div className={`gv-drawer${drawerOpen ? " open" : ""}`}>
        <div className="gv-drawer-brand" onClick={() => go("home")}>INCO<em>ZONE</em></div>
        {navLinks.map(l => <button key={l.label} className="gv-dlink" onClick={() => go(l.page)}>{l.label}</button>)}
        <div className="gv-drawer-div" />
        <button className="gv-dcta" onClick={() => go("schedule")}>Schedule Consultation</button>
      </div>

      {/* ── HERO ── */}
      <section className="gv-hero">
        <HeroCanvas />

        <div className="gv-hero-left">
          <div className="gv-hero-eyebrow">
            <div className="gv-hero-eyebrow-dot" />
            Prestige Residency · UAE Federal Programme
          </div>
          <h1 className="gv-hero-h1">
            UAE<br />
            <em>Golden</em>
            Visa.
          </h1>
          <div className="gv-hero-fullname">10-Year Renewable UAE Residency — Self-Sponsored</div>
          <p className="gv-hero-desc">
            The UAE Golden Visa grants <strong>10-year renewable residency</strong> for investors, entrepreneurs, exceptional talent, and qualified professionals. No employer sponsorship needed — full independence. We manage the complete qualification assessment, application, and approval process.
          </p>
          <div className="gv-hero-tags">
            {["10-Year Residency", "Investor Category", "Entrepreneur Route", "Talent Category", "Real Estate", "Self-Sponsored", "Family Inclusion"].map(t => (
              <span className="gv-hero-tag" key={t}>{t}</span>
            ))}
          </div>
          <div className="gv-hero-btns">
            <button className="gv-btn-gold" onClick={() => go("schedule")}>Check My Eligibility →</button>
            <button className="gv-btn-ghost" onClick={() => onBack && onBack()}>← Back to Services</button>
          </div>
        </div>

        <div className="gv-hero-right">
          <div className="gv-hero-stat-card">
            <span className="gv-hero-stat-label">Residency Duration</span>
            <span className="gv-hero-stat-num">10</span>
            <span className="gv-hero-stat-unit">Year Visa</span>
            <span className="gv-hero-stat-sub">Renewable · Self-Sponsored · All Emirates</span>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="gv-stats-bar">
        {[
          { val: "10 Yrs", key: "Visa Duration" },
          { val: "100%", key: "Self-Sponsored" },
          { val: "AED 2M", key: "Min. Investment" },
          { val: "30 Days", key: "Avg. Processing" },
          { val: "All 7", key: "Emirates Valid" },
        ].map((s, i) => (
          <div className="gv-stat" key={i}>
            <span className="gv-stat-val">{s.val}</span>
            <span className="gv-stat-key">{s.key}</span>
          </div>
        ))}
      </div>

      {/* ── WHO QUALIFIES ── */}
      <section className="gv-qualify">
        <div className="gv-reveal">
          <span className="gv-section-label">Eligibility Categories</span>
          <h2 className="gv-section-h2">Who <em>Qualifies</em> for the<br />UAE Golden Visa?</h2>
        </div>
        <div className="gv-qualify-grid">
          {CATEGORIES.map((c, i) => (
            <div className={`gv-qualify-card gv-reveal gv-d${(i % 3) + 1}`} key={i}>
              <span className="gv-qualify-icon">{c.icon}</span>
              <span className="gv-qualify-num">{c.num}</span>
              <div className="gv-qualify-title">{c.title}</div>
              <p className="gv-qualify-desc">{c.desc}</p>
              <div className="gv-qualify-req">
                {c.reqs.map((r, j) => (
                  <div className="gv-qualify-req-item" key={j}>
                    <div className="gv-qualify-req-dot" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="gv-benefits">
        <div className="gv-benefits-inner">
          <div className="gv-benefits-left">
            <div className="gv-reveal">
              <span className="gv-section-label">What You Get</span>
              <h2 className="gv-section-h2">The Golden Visa<br /><em>Advantage</em></h2>
            </div>
            <div className="gv-benefits-grid">
              {BENEFITS.map((b, i) => (
                <div className={`gv-benefit-card gv-reveal gv-d${(i % 2) + 1}`} key={i}>
                  <span className="gv-benefit-icon">{b.icon}</span>
                  <div className="gv-benefit-title">{b.title}</div>
                  <p className="gv-benefit-desc">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="gv-benefits-right gv-reveal gv-d2">
            <div className="gv-compare-box">
              <div className="gv-compare-title">Golden Visa vs Standard Visa</div>
              <div className="gv-compare-sub">A direct comparison for informed decisions</div>
              <div className="gv-compare-header">
                <div className="gv-compare-header-cell">Golden Visa</div>
                <div className="gv-compare-header-cell">Standard Residency</div>
              </div>
              {[
                ["Duration", "10 Years", "2–3 Years"],
                ["Renewal Required", "Once per decade", "Every 2–3 years"],
                ["Employer Tie", "None — fully independent", "Tied to employer"],
                ["Family Inclusion", "Spouse, children (all ages), parents", "Spouse & children only"],
                ["Stay Outside UAE", "No restriction", "Must return every 6 months"],
                ["Business Freedom", "Full — start anything", "Limited to work permit scope"],
                ["Banking Access", "Premium long-term access", "Standard access"],
                ["Stability", "High — 10-year horizon", "Low — employer-dependent"],
              ].map(([label, gold, std], i) => (
                <div className="gv-compare-row" key={i}>
                  <div className="gv-compare-cell label">{label}<br /><span className="gv-compare-cell gold" style={{ display: "block", fontSize: "0.76rem", letterSpacing: "0" }}>{gold}</span></div>
                  <div className="gv-compare-cell dim">{std}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="gv-process">
        <div className="gv-process-header">
          <div className="gv-reveal">
            <span className="gv-section-label">How It Works</span>
            <h2 className="gv-section-h2">From assessment<br /><em>to approval.</em></h2>
          </div>
          <div className="gv-reveal gv-d2">
            <p className="gv-process-intro">
              INCOZONE manages the <strong>complete Golden Visa process</strong> — from eligibility assessment to final visa stamping. Most applications are completed within <strong>21–30 working days</strong>. We handle all authority interactions, document preparation, and ICA submissions on your behalf.
            </p>
          </div>
        </div>
        <div className="gv-process-steps">
          {PROCESS_STEPS.map((s, i) => (
            <div className={`gv-step gv-reveal gv-d${(i % 4) + 1}`} key={i}>
              <div className="gv-step-num">{s.num}</div>
              <div className="gv-step-body">
                <div className="gv-step-title">{s.title}</div>
                <p className="gv-step-desc">{s.desc}</p>
                <div className="gv-step-docs">
                  {s.docs.map(d => <span className="gv-step-doc" key={d}>{d}</span>)}
                </div>
              </div>
              <div className="gv-step-time">{s.time}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="gv-packages">
        <span className="gv-packages-label gv-reveal">Advisory Packages</span>
        <h2 className="gv-packages-h2 gv-reveal gv-d1">Choose Your<br /><em>Golden Visa Package</em></h2>
        <div className="gv-packages-grid">
          {[
            {
              name: "Essential",
              tagline: "Self-managed with expert guidance",
              badge: null,
              featured: false,
              features: [
                "Eligibility assessment",
                "Document checklist & preparation guide",
                "ICA application submission",
                "Medical appointment coordination",
                "Progress tracking portal",
                "Dedicated advisor excluded",
              ],
            },
            {
              name: "Complete",
              tagline: "Full-service Golden Visa management",
              badge: "Most Popular",
              featured: true,
              features: [
                "Full eligibility assessment & strategy",
                "Complete document preparation & attestation",
                "ICA application submission & tracking",
                "Medical & biometrics coordination",
                "Emirates ID processing",
                "Dedicated relationship manager",
              ],
            },
            {
              name: "Family",
              tagline: "Main applicant + full family inclusion",
              badge: "Best Value",
              featured: false,
              features: [
                "Everything in Complete package",
                "Spouse Golden Visa included",
                "Children (all ages) sponsorship",
                "Parents sponsorship management",
                "Household staff visa assistance",
                "Ongoing annual PRO support",
              ],
            },
          ].map((pkg, i) => (
            <div className={`gv-pkg gv-reveal gv-d${i + 1}${pkg.featured ? " featured" : ""}`} key={i}>
              {pkg.badge && <div className="gv-pkg-badge">{pkg.badge}</div>}
              <div className="gv-pkg-name">{pkg.name}</div>
              <p className="gv-pkg-tagline">{pkg.tagline}</p>
              <div className="gv-pkg-divider" />
              <ul className="gv-pkg-features">
                {pkg.features.map((f, j) => {
                  const included = j < (pkg.featured ? 6 : pkg.name === "Family" ? 6 : 5);
                  return (
                    <li className="gv-pkg-feat" key={j}>
                      <span className="gv-feat-check">{included ? "" : "×"}</span>
                      <span style={{ color: pkg.featured ? (included ? "var(--w80)" : "rgba(248,245,238,0.25)") : (included ? "var(--cream-ink2)" : "var(--cream-bdr)") }}>{f}</span>
                    </li>
                  );
                })}
              </ul>
              <button className="gv-pkg-cta" onClick={() => go("schedule")}>
                {pkg.featured ? "Get Started →" : "Learn More →"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="gv-faq">
        <div className="gv-faq-inner">
          <div className="gv-reveal">
            <span className="gv-section-label">Common Questions</span>
            <h2 className="gv-section-h2" style={{ marginBottom: "24px" }}>Golden Visa<br /><em>FAQ</em></h2>
            <p style={{ fontSize: "0.82rem", color: "var(--w60)", lineHeight: "1.8", marginBottom: "40px" }}>
              The most common questions we receive from clients considering the UAE Golden Visa. For specific eligibility queries, schedule a free consultation.
            </p>
            <button className="gv-btn-gold" onClick={() => go("schedule")}>Free Eligibility Check →</button>
          </div>
          <div className="gv-faq-list gv-reveal gv-d2">
            {FAQS.map((f, i) => (
              <div className={`gv-faq-item${openFaq === i ? " open" : ""}`} key={i}>
                <div className="gv-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="gv-faq-q-text">{f.q}</span>
                  <div className="gv-faq-icon">+</div>
                </div>
                <div className="gv-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="gv-cta">
        <div className="gv-cta-inner">
          <span className="gv-cta-label gv-reveal">Begin Your Application</span>
          <h2 className="gv-cta-h2 gv-reveal gv-d1">
            Secure Your<br /><em>UAE Golden Visa.</em>
          </h2>
          <div className="gv-cta-divider" />
          <p className="gv-cta-p gv-reveal gv-d2">
            Private eligibility assessment — no obligation. Our advisors will review your profile and confirm your qualification pathway within 24 hours.
          </p>
          <div className="gv-cta-btns gv-reveal gv-d3">
            <button className="gv-btn-dark" onClick={() => go("schedule")}>Schedule Private Consultation</button>
            <button className="gv-btn-outline" onClick={() => onBack && onBack()}>← Back to Services</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="gv-footer">
        <div className="gv-footer-inner">
          <div className="gv-footer-logo">INCO<em>ZONE</em></div>
          <div className="gv-footer-copy">© 2026 INCOZONE. All rights reserved. Dubai, UAE.</div>
        </div>
      </footer>

      {/* ── WA ── */}
      <div className="gv-wa" onClick={()=>window.open("https://wa.me/971565834586","_blank")}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </div>
    </div>
  );
}
