import { useState, useEffect, useRef } from "react";
import { IIdCard, IFileText, ITrendingUp, IUsers, IAward, IShield } from "../icons";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Corporate Banking Setup Page
//  Drop into: src/pages/Banking.jsx
//  Usage:     import BankingPage from "./pages/Banking"
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

.bk-root *, .bk-root *::before, .bk-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.bk-root {
  --n950: #020b14; --n900: #05111e; --n800: #091928; --n750: #0c2033;
  --n700: #102540; --n600: #163354; --n500: #1e4570;
  --g400: #C9A84C; --g300: #D4B468; --g200: #E2CC98;
  --glow: rgba(201,168,76,0.14); --glow2: rgba(201,168,76,0.07); --glow3: rgba(201,168,76,0.04);
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
  color: var(--w); background: var(--n900); overflow-x: hidden; width: 100%;
}

/* ── NAV ── */
.bk-nav { position: fixed; inset-inline: 0; top: 0; z-index: 200; display: flex; align-items: center; justify-content: space-between; padding: 22px 60px; transition: background 0.5s, padding 0.4s, border-color 0.5s; border-bottom: 1px solid transparent; }
.bk-nav.scrolled { background: rgba(5,17,30,0.96); backdrop-filter: blur(20px); padding: 14px 60px; border-bottom-color: rgba(201,168,76,0.12); }
.bk-nav-logo { font-family: var(--fd); font-size: 1.5rem; font-weight: 500; letter-spacing: 0.15em; color: var(--w); cursor: pointer; }
.bk-nav-logo em { color: var(--g400); font-style: normal; }
.bk-nav-links { display: flex; gap: 36px; list-style: none; }
.bk-nav-links a { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--w60); text-decoration: none; transition: color 0.3s; cursor: pointer; }
.bk-nav-links a:hover { color: var(--g300); }
.bk-nav-cta { font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; background: transparent; border: 1px solid var(--g400); color: var(--g400); padding: 9px 22px; cursor: pointer; font-family: var(--fb); transition: background 0.3s, color 0.3s; }
.bk-nav-cta:hover { background: var(--g400); color: var(--n900); }
.bk-nav-hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 6px; z-index: 310; }
.bk-nav-hamburger span { display: block; width: 24px; height: 1.5px; background: rgba(248,245,238,0.6); transition: all 0.35s var(--ease); transform-origin: center; }
.bk-nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: var(--g400); }
.bk-nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.bk-nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: var(--g400); }
.bk-drawer { position: fixed; inset: 0; z-index: 300; background: rgba(3,10,20,0.97); backdrop-filter: blur(24px); display: flex; flex-direction: column; align-items: center; justify-content: center; transform: translateX(100%); transition: transform 0.45s var(--ease); pointer-events: none; }
.bk-drawer.open { transform: translateX(0); pointer-events: all; }
.bk-drawer-brand { font-family: var(--fd); font-size: 1.3rem; letter-spacing: .18em; color: var(--w); margin-bottom: 44px; opacity: 0; transform: translateY(10px); transition: opacity .4s .1s, transform .4s .1s; cursor: pointer; }
.bk-drawer.open .bk-drawer-brand { opacity: 1; transform: translateY(0); }
.bk-drawer-brand em { color: var(--g400); font-style: normal; }
.bk-dlink { font-family: var(--fd); font-size: clamp(2rem,8vw,3rem); font-weight: 300; color: var(--w60); background: none; border: none; padding: 10px 0; cursor: pointer; display: block; width: 100%; text-align: center; opacity: 0; transform: translateY(18px); transition: color .3s, opacity .4s var(--ease), transform .4s var(--ease); }
.bk-drawer.open .bk-dlink { opacity: 1; transform: translateY(0); }
.bk-drawer.open .bk-dlink:nth-of-type(1){transition-delay:.12s} .bk-drawer.open .bk-dlink:nth-of-type(2){transition-delay:.17s} .bk-drawer.open .bk-dlink:nth-of-type(3){transition-delay:.22s} .bk-drawer.open .bk-dlink:nth-of-type(4){transition-delay:.27s} .bk-drawer.open .bk-dlink:nth-of-type(5){transition-delay:.32s}
.bk-dlink:hover { color: var(--g400); }
.bk-drawer-div { width: 40px; height: 1px; background: rgba(201,168,76,.25); margin: 18px 0; opacity: 0; transition: opacity .4s .34s; }
.bk-drawer.open .bk-drawer-div { opacity: 1; }
.bk-dcta { font-family: var(--fb); font-size: .7rem; letter-spacing: .18em; text-transform: uppercase; color: var(--g400); border: 1px solid var(--g400); background: none; padding: 12px 32px; cursor: pointer; margin-top: 8px; opacity: 0; transform: translateY(18px); transition: color .3s, background .3s, opacity .4s .38s, transform .4s .38s; }
.bk-drawer.open .bk-dcta { opacity: 1; transform: translateY(0); }
.bk-dcta:hover { background: var(--g400); color: var(--n900); }

/* ── HERO ── */
.bk-hero { min-height: 100vh; position: relative; overflow: hidden; display: grid; grid-template-columns: 1fr 1fr; align-items: flex-end; padding: 0 60px 80px; gap: 60px; }
.bk-hero-canvas { position: absolute; inset: 0; z-index: 0; display: block; }
.bk-hero-left { position: relative; z-index: 2; padding-top: 160px; }
.bk-hero-right { position: relative; z-index: 2; padding-top: 160px; display: flex; align-items: flex-end; justify-content: flex-end; }
.bk-hero-eyebrow { display: inline-flex; align-items: center; gap: 10px; font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--g400); border: 1px solid rgba(201,168,76,0.28); padding: 7px 16px; margin-bottom: 32px; opacity: 0; transform: translateY(16px); animation: bkUp 1s var(--ease) 0.2s forwards; }
.bk-hero-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--g400); animation: bkBlink 2s infinite; }
.bk-hero-h1 { font-family: var(--fd); font-weight: 300; line-height: 0.88; letter-spacing: -0.02em; color: var(--w); font-size: clamp(4rem, 9vw, 8.5rem); margin-bottom: 20px; opacity: 0; transform: translateY(20px); animation: bkUp 1.1s var(--ease) 0.35s forwards; }
.bk-hero-h1 em { display: block; color: var(--g400); font-style: italic; font-weight: 300; }
.bk-hero-fullname { font-family: var(--fd); font-size: 1.1rem; font-weight: 300; color: var(--w60); font-style: italic; margin-bottom: 36px; letter-spacing: 0.04em; opacity: 0; animation: bkUp 1s var(--ease) 0.5s forwards; }
.bk-hero-desc { font-size: 0.88rem; color: var(--w60); line-height: 1.85; max-width: 520px; margin-bottom: 40px; opacity: 0; animation: bkUp 1s var(--ease) 0.65s forwards; }
.bk-hero-desc strong { color: var(--w80); font-weight: 400; }
.bk-hero-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 40px; opacity: 0; animation: bkUp 1s var(--ease) 0.75s forwards; }
.bk-hero-tag { font-size: 0.6rem; letter-spacing: 0.16em; text-transform: uppercase; padding: 6px 14px; border: 1px solid rgba(201,168,76,0.25); color: var(--g300); }
.bk-hero-btns { display: flex; gap: 14px; flex-wrap: wrap; opacity: 0; animation: bkUp 1s var(--ease) 0.85s forwards; }
.bk-btn-gold { padding: 15px 36px; background: var(--g400); color: var(--n900); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.bk-btn-gold:hover { background: var(--g300); transform: translateY(-2px); }
.bk-btn-ghost { padding: 15px 36px; background: transparent; color: var(--w60); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--w12); cursor: pointer; transition: all 0.3s; }
.bk-btn-ghost:hover { border-color: var(--w30); color: var(--w); transform: translateY(-2px); }

/* Hero right stat card */
.bk-hero-stat-card { background: rgba(9,25,40,0.85); backdrop-filter: blur(16px); border: 1px solid rgba(201,168,76,0.22); padding: 52px 44px; min-width: 280px; text-align: center; position: relative; overflow: hidden; }
.bk-hero-stat-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(201,168,76,0.06), transparent); pointer-events: none; }
.bk-hero-stat-label { font-size: 0.58rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--g400); margin-bottom: 16px; display: block; }
.bk-hero-stat-num { font-family: var(--fd); font-size: 7rem; font-weight: 300; color: var(--g400); line-height: 1; display: block; }
.bk-hero-stat-unit { font-family: var(--fd); font-size: 2.2rem; font-weight: 300; color: var(--w60); display: block; margin-top: 4px; letter-spacing: 0.05em; }
.bk-hero-stat-sub { font-size: 0.68rem; color: var(--w30); letter-spacing: 0.12em; text-transform: uppercase; margin-top: 20px; display: block; }

/* ── STATS BAR ── */
.bk-stats-bar { background: var(--n800); padding: 0 60px; display: grid; grid-template-columns: repeat(5, 1fr); border-bottom: 1px solid var(--w06); }
.bk-stat { padding: 32px 0; text-align: center; border-right: 1px solid var(--w06); }
.bk-stat:last-child { border-right: none; }
.bk-stat-val { font-family: var(--fd); font-size: 2.2rem; font-weight: 300; color: var(--g400); display: block; line-height: 1; }
.bk-stat-key { font-size: 0.62rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--w30); margin-top: 6px; display: block; }

/* ── BANK SELECTOR ── */
.bk-banks { background: var(--n900); padding: 100px 60px; }
.bk-section-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--g400); margin-bottom: 16px; display: block; }
.bk-section-h2 { font-family: var(--fd); font-size: clamp(2.2rem, 4vw, 3.8rem); font-weight: 300; line-height: 1.1; color: var(--w); margin-bottom: 16px; }
.bk-section-h2 em { color: var(--g400); font-style: italic; }
.bk-section-sub { font-size: 0.84rem; color: var(--w60); line-height: 1.8; max-width: 600px; margin-bottom: 56px; }
.bk-section-sub strong { color: var(--w); font-weight: 400; }

/* Filter tabs */
.bk-filter-bar { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 44px; }
.bk-filter-btn { padding: 8px 20px; font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; font-family: var(--fb); background: transparent; border: 1px solid var(--w12); color: var(--w60); cursor: pointer; transition: all 0.3s; }
.bk-filter-btn:hover { border-color: var(--g400); color: var(--g400); }
.bk-filter-btn.active { border-color: var(--g400); color: var(--g400); background: var(--glow3); }

/* Bank cards grid */
.bk-banks-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: var(--w06); }

.bk-bank-card {
  background: var(--n800); padding: 44px 40px 36px;
  position: relative; overflow: hidden; cursor: pointer;
  transition: background 0.4s var(--ease);
  display: flex; flex-direction: column;
}
.bk-bank-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, var(--glow3), transparent 60%); opacity: 0; transition: opacity 0.4s; pointer-events: none; }
.bk-bank-card::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; transform: scaleX(0); transform-origin: left; transition: transform 0.5s var(--ease); }
.bk-bank-card:hover { background: var(--n750); }
.bk-bank-card:hover::before { opacity: 1; }
.bk-bank-card:hover::after { transform: scaleX(1); }
.bk-bank-card.selected { background: var(--n700); border: 1px solid rgba(201,168,76,0.35); margin: -1px; z-index: 1; }
.bk-bank-card.selected::after { transform: scaleX(1); }

/* Color-coded top bars per bank */
.bk-bank-card[data-bank="enbd"]::after    { background: #c8102e; }
.bk-bank-card[data-bank="fab"]::after     { background: #9b59b6; }
.bk-bank-card[data-bank="adcb"]::after    { background: #e05c00; }
.bk-bank-card[data-bank="mashreq"]::after { background: #e4002b; }
.bk-bank-card[data-bank="rakbank"]::after { background: #003087; }
.bk-bank-card[data-bank="cbd"]::after     { background: #00843d; }
.bk-bank-card[data-bank="dib"]::after     { background: #006b3f; }
.bk-bank-card[data-bank="adib"]::after    { background: #c8a951; }
.bk-bank-card[data-bank="hsbc"]::after    { background: #db0011; }
.bk-bank-card[data-bank="citi"]::after    { background: #003b70; }
.bk-bank-card[data-bank="scb"]::after     { background: #0d6abf; }
.bk-bank-card[data-bank="wio"]::after     { background: #3d5afe; }

.bk-bank-logo-area { margin-bottom: 28px; min-height: 52px; display: flex; align-items: center; }
.bk-bank-logo-svg { max-height: 44px; width: auto; transition: filter 0.4s, transform 0.3s; filter: brightness(0) invert(1) opacity(0.35); }
.bk-bank-card:hover .bk-bank-logo-svg, .bk-bank-card.selected .bk-bank-logo-svg { filter: brightness(0) invert(1) opacity(0.9); transform: translateY(-2px); }

.bk-bank-name { font-family: var(--fd); font-size: 1.5rem; font-weight: 400; color: var(--w); margin-bottom: 6px; line-height: 1.1; transition: color 0.3s; }
.bk-bank-card:hover .bk-bank-name, .bk-bank-card.selected .bk-bank-name { color: var(--g300); }
.bk-bank-full { font-size: 0.68rem; color: var(--w30); margin-bottom: 16px; letter-spacing: 0.04em; }
.bk-bank-type-badge { display: inline-block; font-size: 0.56rem; letter-spacing: 0.18em; text-transform: uppercase; padding: 4px 10px; border: 1px solid; margin-bottom: 18px; }
.bk-bank-card[data-type="local"] .bk-bank-type-badge { border-color: rgba(201,168,76,0.3); color: var(--g400); background: rgba(201,168,76,0.05); }
.bk-bank-card[data-type="islamic"] .bk-bank-type-badge { border-color: rgba(72,187,120,0.3); color: #48bb78; background: rgba(72,187,120,0.05); }
.bk-bank-card[data-type="international"] .bk-bank-type-badge { border-color: rgba(99,179,237,0.3); color: #63b3ed; background: rgba(99,179,237,0.05); }
.bk-bank-card[data-type="digital"] .bk-bank-type-badge { border-color: rgba(154,117,232,0.3); color: #9a75e8; background: rgba(154,117,232,0.05); }

.bk-bank-desc { font-size: 0.78rem; color: var(--w60); line-height: 1.72; margin-bottom: 20px; flex: 1; }
.bk-bank-features { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 24px; }
.bk-bank-feat { font-size: 0.58rem; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 10px; border: 1px solid var(--w06); color: var(--w30); transition: all 0.3s; }
.bk-bank-card:hover .bk-bank-feat { border-color: rgba(201,168,76,0.15); color: var(--w60); }
.bk-bank-footer { display: flex; align-items: center; justify-content: space-between; }
.bk-bank-min { font-size: 0.62rem; color: var(--w30); letter-spacing: 0.08em; }
.bk-bank-min strong { color: var(--g400); font-size: 0.72rem; }
.bk-bank-select-btn { font-size: 0.62rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--w30); background: none; border: none; cursor: pointer; font-family: var(--fb); transition: color 0.3s; display: flex; align-items: center; gap: 6px; }
.bk-bank-card:hover .bk-bank-select-btn { color: var(--g400); }
.bk-bank-card.selected .bk-bank-select-btn { color: var(--g400); }

/* Selected panel */
.bk-selected-panel { background: var(--n750); border: 1px solid rgba(201,168,76,0.2); padding: 36px 40px; margin-top: 2px; display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.bk-selected-panel-left { display: flex; flex-direction: column; gap: 6px; }
.bk-selected-label { font-size: 0.58rem; letter-spacing: 0.24em; text-transform: uppercase; color: var(--g400); }
.bk-selected-name { font-family: var(--fd); font-size: 1.8rem; font-weight: 400; color: var(--w); }
.bk-selected-sub { font-size: 0.78rem; color: var(--w60); }
.bk-selected-btn { padding: 13px 32px; background: var(--g400); color: var(--n900); font-family: var(--fb); font-size: 0.7rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; flex-shrink: 0; }
.bk-selected-btn:hover { background: var(--g300); transform: translateY(-2px); }

/* ── WHAT WE PREPARE ── */
.bk-prepare { background: var(--n800); padding: 100px 60px; }
.bk-prepare-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
.bk-prepare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; background: var(--w06); margin-top: 52px; }
.bk-prep-card { background: var(--n800); padding: 36px 32px; transition: background 0.3s; position: relative; overflow: hidden; }
.bk-prep-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, var(--glow3), transparent); opacity: 0; transition: opacity 0.4s; }
.bk-prep-card:hover { background: var(--n750); }
.bk-prep-card:hover::before { opacity: 1; }
.bk-prep-icon { font-size: 1.6rem; margin-bottom: 16px; display: block; position: relative; z-index: 1; }
.bk-prep-title { font-size: 0.88rem; font-weight: 500; color: var(--w); margin-bottom: 8px; position: relative; z-index: 1; }
.bk-prep-desc { font-size: 0.76rem; color: var(--w60); line-height: 1.72; position: relative; z-index: 1; }

/* Right: approval steps */
.bk-approval-box { border: 1px solid rgba(201,168,76,0.2); background: var(--n900); padding: 48px 44px; }
.bk-approval-title { font-family: var(--fd); font-size: 1.5rem; font-weight: 400; color: var(--w); margin-bottom: 8px; }
.bk-approval-sub { font-size: 0.76rem; color: var(--w30); margin-bottom: 36px; }
.bk-approval-steps { display: flex; flex-direction: column; gap: 0; }
.bk-approval-step { display: flex; gap: 20px; padding: 20px 0; border-bottom: 1px solid var(--w06); align-items: flex-start; }
.bk-approval-step:last-child { border-bottom: none; }
.bk-approval-num { font-family: var(--fd); font-size: 2.2rem; font-weight: 300; color: rgba(201,168,76,0.2); line-height: 1; min-width: 40px; transition: color 0.3s; }
.bk-approval-step:hover .bk-approval-num { color: var(--g400); }
.bk-approval-body-title { font-size: 0.84rem; font-weight: 500; color: var(--w); margin-bottom: 4px; }
.bk-approval-body-desc { font-size: 0.76rem; color: var(--w60); line-height: 1.65; }
.bk-approval-time { font-size: 0.58rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--g400); margin-top: 4px; display: block; }

/* ── PROCESS ── */
.bk-process { background: var(--n900); padding: 100px 60px; }
.bk-process-header { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-bottom: 72px; align-items: end; }
.bk-process-intro { font-size: 0.84rem; color: var(--w60); line-height: 1.88; }
.bk-process-intro strong { color: var(--w); font-weight: 400; }
.bk-process-steps { display: flex; flex-direction: column; gap: 0; max-width: 860px; }
.bk-step { display: grid; grid-template-columns: 80px 1fr 160px; gap: 0; border-top: 1px solid var(--w06); padding: 36px 0; align-items: start; position: relative; overflow: hidden; }
.bk-step:last-child { border-bottom: 1px solid var(--w06); }
.bk-step::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--g400); transform: scaleY(0); transform-origin: top; transition: transform 0.5s var(--ease); }
.bk-step:hover::before { transform: scaleY(1); }
.bk-step-num { font-family: var(--fd); font-size: 3.5rem; font-weight: 300; color: rgba(201,168,76,0.15); line-height: 1; transition: color 0.4s; }
.bk-step:hover .bk-step-num { color: rgba(201,168,76,0.35); }
.bk-step-body { padding: 0 40px 0 0; }
.bk-step-title { font-size: 1rem; font-weight: 500; color: var(--w); margin-bottom: 10px; }
.bk-step-desc { font-size: 0.8rem; color: var(--w60); line-height: 1.75; }
.bk-step-docs { margin-top: 14px; display: flex; flex-wrap: wrap; gap: 6px; }
.bk-step-doc { font-size: 0.58rem; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 10px; border: 1px solid var(--w06); color: var(--w30); }
.bk-step-time { font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--g400); padding: 6px 14px; border: 1px solid rgba(201,168,76,0.2); text-align: center; height: fit-content; margin-top: 4px; }

/* ── FAQ ── */
.bk-faq { background: var(--n800); padding: 100px 60px; }
.bk-faq-inner { display: grid; grid-template-columns: 1fr 1.6fr; gap: 80px; align-items: start; }
.bk-faq-list { display: flex; flex-direction: column; gap: 0; }
.bk-faq-item { border-top: 1px solid var(--w06); overflow: hidden; }
.bk-faq-item:last-child { border-bottom: 1px solid var(--w06); }
.bk-faq-q { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 24px 0; cursor: pointer; }
.bk-faq-q-text { font-size: 0.92rem; font-weight: 400; color: var(--w); transition: color 0.3s; }
.bk-faq-item.open .bk-faq-q-text { color: var(--g400); }
.bk-faq-icon { width: 28px; height: 28px; border: 1px solid var(--w12); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1rem; color: var(--w30); flex-shrink: 0; transition: all 0.4s var(--ease); }
.bk-faq-item.open .bk-faq-icon { background: var(--g400); border-color: var(--g400); color: var(--n900); transform: rotate(45deg); }
.bk-faq-a { font-size: 0.82rem; color: var(--w60); line-height: 1.82; padding-bottom: 24px; max-height: 0; overflow: hidden; transition: max-height 0.5s var(--ease); }
.bk-faq-item.open .bk-faq-a { max-height: 300px; }

/* ── CTA ── */
.bk-cta { background: var(--cream-bg); padding: 120px 60px; text-align: center; position: relative; overflow: hidden; }
.bk-cta::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(180,150,90,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(180,150,90,0.06) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; }
.bk-cta::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.09), transparent); pointer-events: none; }
.bk-cta-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
.bk-cta-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: #8A6820; margin-bottom: 20px; display: block; }
.bk-cta-h2 { font-family: var(--fd); font-size: clamp(2.5rem, 5vw, 4.2rem); font-weight: 300; color: var(--cream-ink); line-height: 1.1; margin-bottom: 12px; }
.bk-cta-h2 em { color: var(--g400); font-style: italic; }
.bk-cta-divider { width: 44px; height: 1px; background: var(--g400); margin: 24px auto; opacity: 0.5; }
.bk-cta-p { font-size: 0.84rem; color: var(--cream-ink3); line-height: 1.85; margin-bottom: 44px; }
.bk-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.bk-btn-dark { padding: 15px 40px; background: var(--cream-ink); color: var(--cream-bg); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.bk-btn-dark:hover { background: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }
.bk-btn-outline { padding: 15px 40px; background: transparent; color: var(--cream-ink2); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--cream-bdr); cursor: pointer; transition: all 0.3s; }
.bk-btn-outline:hover { border-color: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }

/* ── FOOTER ── */
.bk-footer { background: var(--n950); padding: 52px 60px; border-top: 1px solid var(--w06); }
.bk-footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
.bk-footer-logo { font-family: var(--fd); font-size: 1.3rem; letter-spacing: 0.15em; color: var(--w); }
.bk-footer-logo em { color: var(--g400); font-style: normal; }
.bk-footer-copy { font-size: 0.68rem; color: var(--w30); }

/* ── WA ── */
.bk-wa { position: fixed; bottom: 28px; right: 28px; z-index: 300; width: 50px; height: 50px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 18px rgba(37,211,102,0.4); transition: transform 0.3s; }
.bk-wa:hover { transform: scale(1.1); }

/* ── REVEAL ── */
.bk-reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.85s var(--ease), transform 0.85s var(--ease); }
.bk-reveal.in { opacity: 1; transform: translateY(0); }
.bk-d1{transition-delay:0.05s} .bk-d2{transition-delay:0.15s} .bk-d3{transition-delay:0.25s} .bk-d4{transition-delay:0.35s}

/* ── KEYFRAMES ── */
@keyframes bkUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes bkBlink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

/* ── RESPONSIVE ── */
@media(max-width:1100px) { .bk-banks-grid { grid-template-columns: repeat(2,1fr); } }
@media(max-width:900px) {
  .bk-hero { grid-template-columns: 1fr; padding: 120px 40px 60px; }
  .bk-hero-right { justify-content: flex-start; }
  .bk-stats-bar { grid-template-columns: repeat(3,1fr); }
  .bk-prepare-inner { grid-template-columns: 1fr; }
  .bk-process-header { grid-template-columns: 1fr; gap: 28px; }
  .bk-faq-inner { grid-template-columns: 1fr; gap: 48px; }
}
@media(max-width:768px) {
  .bk-nav { padding: 16px 24px; } .bk-nav.scrolled { padding: 12px 24px; }
  .bk-nav-links { display: none; } .bk-nav-cta { display: none; }
  .bk-nav-hamburger { display: flex; }
  .bk-hero { padding: 100px 24px 52px; }
  .bk-banks, .bk-prepare, .bk-process, .bk-faq, .bk-cta { padding: 70px 24px; }
  .bk-banks-grid { grid-template-columns: 1fr; }
  .bk-prepare-grid { grid-template-columns: 1fr; }
  .bk-step { grid-template-columns: 56px 1fr; }
  .bk-step-time { display: none; }
  .bk-footer { padding: 40px 24px; }
  .bk-stats-bar { grid-template-columns: 1fr 1fr; padding: 0 24px; }
  .bk-hero-btns { flex-direction: column; }
  .bk-hero-btns button { width: 100%; }
}
`;

// ── BANK DATA ─────────────────────────────────────────────────
const BANKS = [
  {
    id: "enbd",
    name: "ENBD",
    full: "Emirates NBD",
    type: "local",
    typeLabel: "UAE National Bank",
    desc: "UAE's largest bank by assets. Ideal for established businesses, trade finance, and companies seeking a premier UAE banking relationship with full corporate services.",
    features: ["Multi-Currency", "Trade Finance", "Online Banking", "Relationship Manager", "Treasury Services"],
    minBalance: "AED 50,000",
    bestFor: "Established companies & trade",
    approval: "Moderate",
    logo: (
      <svg viewBox="0 0 160 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="bk-bank-logo-svg" style={{height:"40px"}}>
        <rect x="2" y="10" width="8" height="32" fill="currentColor"/>
        <rect x="14" y="10" width="28" height="7" fill="currentColor"/>
        <rect x="14" y="25" width="22" height="7" fill="currentColor"/>
        <rect x="14" y="35" width="28" height="7" fill="currentColor"/>
        <text x="50" y="28" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="18" fill="currentColor" letterSpacing="1">ENBD</text>
        <text x="50" y="40" fontFamily="Arial,sans-serif" fontWeight="300" fontSize="7.5" fill="currentColor" opacity="0.6" letterSpacing="0.3">EMIRATES NBD</text>
      </svg>
    ),
  },
  {
    id: "fab",
    name: "FAB",
    full: "First Abu Dhabi Bank",
    type: "local",
    typeLabel: "UAE National Bank",
    desc: "The UAE's largest bank by market capitalisation. First choice for Abu Dhabi-based businesses, sovereign-linked entities, and high-net-worth clients requiring premium private banking.",
    features: ["Private Banking", "Investment Services", "International Transfer", "Trade Finance", "Islamic Window"],
    minBalance: "AED 50,000",
    bestFor: "Abu Dhabi operations & HNW",
    approval: "Moderate",
    logo: (
      <svg viewBox="0 0 160 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="bk-bank-logo-svg" style={{height:"40px"}}>
        <circle cx="22" cy="26" r="18" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="22" cy="26" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
        <circle cx="22" cy="26" r="4" fill="currentColor"/>
        <text x="48" y="24" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="20" fill="currentColor" letterSpacing="2">FAB</text>
        <text x="48" y="37" fontFamily="Arial,sans-serif" fontWeight="300" fontSize="7" fill="currentColor" opacity="0.6" letterSpacing="0.3">FIRST ABU DHABI BANK</text>
      </svg>
    ),
  },
  {
    id: "adcb",
    name: "ADCB",
    full: "Abu Dhabi Commercial Bank",
    type: "local",
    typeLabel: "UAE National Bank",
    desc: "Known for excellent SME and startup-friendly accounts. One of the fastest in account opening for free zone companies. Strong digital banking and trade finance capabilities.",
    features: ["SME Accounts", "Fast Opening", "Digital Banking", "Trade Finance", "Payroll Services"],
    minBalance: "AED 25,000",
    bestFor: "SMEs & free zone companies",
    approval: "Fast",
    logo: (
      <svg viewBox="0 0 160 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="bk-bank-logo-svg" style={{height:"40px"}}>
        <path d="M4 42 L16 10 L28 42 L24 42 L16 20 L8 42 Z" fill="currentColor"/>
        <rect x="8" y="34" width="16" height="4" fill="currentColor" opacity="0.6"/>
        <text x="36" y="26" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="18" fill="currentColor" letterSpacing="1">ADCB</text>
        <text x="36" y="38" fontFamily="Arial,sans-serif" fontWeight="300" fontSize="7" fill="currentColor" opacity="0.6" letterSpacing="0.3">ABU DHABI COMMERCIAL BANK</text>
      </svg>
    ),
  },
  {
    id: "mashreq",
    name: "Mashreq",
    full: "Mashreq Bank",
    type: "local",
    typeLabel: "UAE National Bank",
    desc: "One of the UAE's most innovative banks. Excellent for tech-forward businesses, startups, and companies requiring fast digital account management. Strong fintech integration.",
    features: ["Digital First", "Fast Approval", "Startup Friendly", "Multi-Currency", "API Banking"],
    minBalance: "AED 25,000",
    bestFor: "Tech companies & startups",
    approval: "Fast",
    logo: (
      <svg viewBox="0 0 180 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="bk-bank-logo-svg" style={{height:"40px"}}>
        <path d="M4 42 L4 10 L14 10 L22 30 L30 10 L40 10 L40 42 L34 42 L34 20 L26 40 L18 40 L10 20 L10 42 Z" fill="currentColor"/>
        <text x="48" y="28" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="16" fill="currentColor" letterSpacing="0.5">Mashreq</text>
        <text x="48" y="40" fontFamily="Arial,sans-serif" fontWeight="300" fontSize="7.5" fill="currentColor" opacity="0.5" letterSpacing="0.3">BANK</text>
      </svg>
    ),
  },
  {
    id: "rakbank",
    name: "RAKBank",
    full: "RAK Bank — National Bank of RAK",
    type: "local",
    typeLabel: "UAE National Bank",
    desc: "Best-in-class for SMEs and small businesses. Known for the most accessible account opening requirements and competitive SME banking products across the UAE.",
    features: ["SME Champion", "Easy Opening", "Low Minimums", "Business Loans", "Payroll WPS"],
    minBalance: "AED 10,000",
    bestFor: "SMEs & low-cost entry",
    approval: "Easiest",
    logo: (
      <svg viewBox="0 0 180 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="bk-bank-logo-svg" style={{height:"40px"}}>
        <path d="M4 42 L4 10 L18 10 Q26 10 30 14 Q34 18 34 24 Q34 32 26 35 L36 42 L28 42 L20 36 L12 36 L12 42 Z M12 30 L18 30 Q24 30 27 27 Q30 24 30 22 Q30 18 27 15 Q24 12 18 12 L12 12 Z" fill="currentColor"/>
        <text x="44" y="22" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="16" fill="currentColor" letterSpacing="1">RAKBank</text>
        <text x="44" y="36" fontFamily="Arial,sans-serif" fontWeight="300" fontSize="7" fill="currentColor" opacity="0.5" letterSpacing="0.3">NATIONAL BANK OF RAS AL KHAIMAH</text>
        <path d="M148 8 L158 8 L154 16 L162 16 L148 30 L152 18 L144 18 Z" fill="currentColor" opacity="0.7"/>
      </svg>
    ),
  },
  {
    id: "cbd",
    name: "CBD",
    full: "Commercial Bank of Dubai",
    type: "local",
    typeLabel: "UAE National Bank",
    desc: "Dubai-focused commercial bank with strong roots in trading and retail businesses. Excellent for companies operating in Dubai mainland requiring a well-connected local banking partner.",
    features: ["Dubai Focused", "Trade Finance", "SME Products", "Digital Banking", "Relationship Banking"],
    minBalance: "AED 25,000",
    bestFor: "Dubai mainland businesses",
    approval: "Moderate",
    logo: (
      <svg viewBox="0 0 160 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="bk-bank-logo-svg" style={{height:"40px"}}>
        <path d="M28 12 Q12 12 8 26 Q4 36 12 42 Q18 46 26 44 L24 38 Q16 40 14 34 Q10 26 16 18 Q20 12 28 14 Z" fill="currentColor"/>
        <text x="36" y="26" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="18" fill="currentColor" letterSpacing="2">CBD</text>
        <text x="36" y="38" fontFamily="Arial,sans-serif" fontWeight="300" fontSize="7" fill="currentColor" opacity="0.6" letterSpacing="0.3">COMMERCIAL BANK OF DUBAI</text>
      </svg>
    ),
  },
  {
    id: "dib",
    name: "DIB",
    full: "Dubai Islamic Bank",
    type: "islamic",
    typeLabel: "Islamic Bank",
    desc: "The world's first full Islamic bank. Perfect for businesses and individuals seeking Sharia-compliant banking. Full corporate banking suite under Islamic finance principles.",
    features: ["Sharia Compliant", "Islamic Finance", "Trade Finance", "Property Finance", "Wakala Deposits"],
    minBalance: "AED 25,000",
    bestFor: "Islamic banking & Sharia compliance",
    approval: "Moderate",
    logo: (
      <svg viewBox="0 0 160 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="bk-bank-logo-svg" style={{height:"40px"}}>
        <path d="M8 26 Q8 12 18 10 Q28 8 32 18 L26 20 Q24 14 18 16 Q14 18 14 26 Q14 34 18 36 Q24 38 26 32 L32 34 Q28 44 18 42 Q8 40 8 26 Z" fill="currentColor"/>
        <rect x="36" y="8" width="4" height="36" fill="currentColor" opacity="0.7"/>
        <text x="46" y="26" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="18" fill="currentColor" letterSpacing="2">DIB</text>
        <text x="46" y="38" fontFamily="Arial,sans-serif" fontWeight="300" fontSize="7" fill="currentColor" opacity="0.6" letterSpacing="0.3">DUBAI ISLAMIC BANK</text>
      </svg>
    ),
  },
  {
    id: "adib",
    name: "ADIB",
    full: "Abu Dhabi Islamic Bank",
    type: "islamic",
    typeLabel: "Islamic Bank",
    desc: "One of the largest Islamic banks globally with a strong UAE presence. Excellent for Abu Dhabi-based businesses requiring Sharia-compliant corporate banking with premium service.",
    features: ["Sharia Compliant", "Premium Service", "Trade Finance", "Investment Products", "Corporate Finance"],
    minBalance: "AED 25,000",
    bestFor: "Islamic banking in Abu Dhabi",
    approval: "Moderate",
    logo: (
      <svg viewBox="0 0 180 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="bk-bank-logo-svg" style={{height:"40px"}}>
        <path d="M4 42 L16 10 L28 42 L24 42 L16 20 L8 42 Z" fill="currentColor"/>
        <rect x="8" y="34" width="16" height="3" fill="currentColor" opacity="0.5"/>
        <text x="36" y="24" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="18" fill="currentColor" letterSpacing="1">ADIB</text>
        <rect x="36" y="28" width="80" height="1" fill="currentColor" opacity="0.2"/>
        <text x="36" y="38" fontFamily="Arial,sans-serif" fontWeight="300" fontSize="7" fill="currentColor" opacity="0.6" letterSpacing="0.3">ABU DHABI ISLAMIC BANK</text>
      </svg>
    ),
  },
  {
    id: "hsbc",
    name: "HSBC",
    full: "HSBC Bank Middle East",
    type: "international",
    typeLabel: "International Bank",
    desc: "Global banking powerhouse. Ideal for international businesses, multinationals, and companies requiring seamless cross-border banking between UAE and their home country.",
    features: ["Global Network", "Cross-Border", "Trade Finance", "FX Services", "Private Banking"],
    minBalance: "AED 100,000",
    bestFor: "International & cross-border business",
    approval: "Strict",
    logo: (
      <svg viewBox="0 0 160 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="bk-bank-logo-svg" style={{height:"40px"}}>
        <polygon points="4,10 22,26 4,42" fill="currentColor"/>
        <polygon points="22,26 40,10 40,42" fill="currentColor" opacity="0.6"/>
        <polygon points="4,10 40,10 22,26" fill="currentColor" opacity="0.3"/>
        <polygon points="4,42 40,42 22,26" fill="currentColor" opacity="0.8"/>
        <text x="48" y="28" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="20" fill="currentColor" letterSpacing="2">HSBC</text>
        <text x="48" y="40" fontFamily="Arial,sans-serif" fontWeight="300" fontSize="7" fill="currentColor" opacity="0.5" letterSpacing="0.3">BANK MIDDLE EAST</text>
      </svg>
    ),
  },
  {
    id: "citi",
    name: "Citibank",
    full: "Citibank UAE",
    type: "international",
    typeLabel: "International Bank",
    desc: "One of the world's most globally connected banks. Best for US-linked businesses, multinational treasury operations, and corporates requiring Citi's international correspondent network.",
    features: ["Global Treasury", "US Market Access", "Multinational", "FX & Derivatives", "Transaction Banking"],
    minBalance: "AED 150,000",
    bestFor: "US-linked & multinational companies",
    approval: "Strict",
    logo: (
      <svg viewBox="0 0 180 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="bk-bank-logo-svg" style={{height:"40px"}}>
        <path d="M26 12 Q10 12 6 26 Q2 36 10 42 Q16 46 24 44 L22 38 Q14 40 12 34 Q8 26 14 18 Q18 12 26 14 Z" fill="currentColor"/>
        <path d="M34 8 L38 8 L38 44 L34 44 Z" fill="currentColor" opacity="0.7"/>
        <path d="M33 8 Q38 4 44 8" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.8"/>
        <text x="52" y="28" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="17" fill="currentColor" letterSpacing="0.5">Citibank</text>
        <text x="52" y="40" fontFamily="Arial,sans-serif" fontWeight="300" fontSize="7" fill="currentColor" opacity="0.5" letterSpacing="0.3">UNITED ARAB EMIRATES</text>
      </svg>
    ),
  },
  {
    id: "scb",
    name: "Standard Chartered",
    full: "Standard Chartered Bank UAE",
    type: "international",
    typeLabel: "International Bank",
    desc: "One of Asia and Middle East's leading international banks. Excellent for businesses with Asia, Africa, or Middle East trade corridors and those seeking premium international corporate banking.",
    features: ["Asia Corridor", "Africa Trade", "Transaction Banking", "FX Services", "Structured Finance"],
    minBalance: "AED 100,000",
    bestFor: "Asia & Africa trade corridors",
    approval: "Strict",
    logo: (
      <svg viewBox="0 0 200 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="bk-bank-logo-svg" style={{height:"38px"}}>
        <rect x="2" y="20" width="30" height="5" fill="currentColor"/>
        <rect x="2" y="10" width="30" height="5" fill="currentColor" opacity="0.6"/>
        <rect x="2" y="30" width="30" height="5" fill="currentColor" opacity="0.4"/>
        <text x="40" y="22" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="13" fill="currentColor" letterSpacing="0.3">Standard</text>
        <text x="40" y="36" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="13" fill="currentColor" letterSpacing="0.3">Chartered</text>
      </svg>
    ),
  },
  {
    id: "wio",
    name: "Wio Bank",
    full: "Wio Bank — Digital Business Banking",
    type: "digital",
    typeLabel: "Digital Bank",
    desc: "UAE's first platform bank and the go-to choice for startups and digital businesses. 100% online account opening, instant approvals, and modern banking tools built for the new economy.",
    features: ["100% Digital", "Instant Opening", "No Branch Visits", "API Integration", "Startup Friendly"],
    minBalance: "AED 0",
    bestFor: "Startups & digital businesses",
    approval: "Fastest",
    logo: (
      <svg viewBox="0 0 160 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="bk-bank-logo-svg" style={{height:"40px"}}>
        <rect x="4" y="18" width="12" height="16" rx="4" fill="currentColor"/>
        <rect x="20" y="10" width="12" height="32" rx="4" fill="currentColor" opacity="0.7"/>
        <rect x="36" y="18" width="12" height="16" rx="4" fill="currentColor" opacity="0.4"/>
        <text x="56" y="28" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="20" fill="currentColor" letterSpacing="2">Wio</text>
        <text x="56" y="40" fontFamily="Arial,sans-serif" fontWeight="300" fontSize="7.5" fill="currentColor" opacity="0.5" letterSpacing="0.3">DIGITAL BANK</text>
      </svg>
    ),
  },
];

const PREPARE_ITEMS = [
  { icon: IIdCard, title: "KYC Package", desc: "Complete Know Your Customer documentation — passport copies, proof of address, source of funds declarations, and business ownership structure charts formatted to each bank's specific requirements." },
  { icon: IFileText, title: "Business Plan", desc: "Professional business plan covering your industry, revenue model, projected turnover, target markets, and UAE business rationale — written to satisfy each bank's compliance team." },
  { icon: ITrendingUp, title: "Source of Funds Letter", desc: "Legally structured source of funds declaration explaining the origin of your capital — one of the most scrutinised documents in UAE corporate account opening." },
  { icon: IUsers, title: "Corporate Structure Chart", desc: "Visual corporate ownership chart showing shareholders, directors, beneficial owners, and any parent/holding entities — required by all UAE banks for corporate accounts." },
  { icon: IAward, title: "Trade License Package", desc: "Certified copies of trade license, MOA, share certificates, and all free zone or mainland authority documents — organised and certified to bank-submission standard." },
  { icon: IShield, title: "Compliance Pre-Check", desc: "We run an internal compliance review of your profile against each target bank's known rejection triggers — ensuring we only submit where approval probability is high." },
];

const PROCESS_STEPS = [
  { num: "01", title: "Bank Selection Strategy", desc: "We review your business model, nationality, transaction profile, and industry to recommend the 2–3 banks most likely to approve your application. We never submit blindly.", docs: ["Business Profile", "Nationality Check", "Industry Assessment"], time: "Day 1" },
  { num: "02", title: "Document Preparation", desc: "Full documentation package prepared — business plan, source of funds, KYC documents, corporate structure, all certified copies — formatted to the exact specifications of each target bank.", docs: ["Business Plan", "Source of Funds", "KYC Package", "Corporate Docs"], time: "Day 1–5" },
  { num: "03", title: "Bank Introduction & Submission", desc: "We introduce your application directly to our relationship contacts at each bank — not through general submission portals. Our banker relationships significantly accelerate review timelines.", docs: ["Formal Introduction", "Application Submission", "RM Briefing"], time: "Day 5–10" },
  { num: "04", title: "Compliance Follow-Up", desc: "We actively follow up with the bank compliance team, answer queries on your behalf, and provide any additional documents requested — keeping the process moving without delays.", docs: ["Compliance Queries", "Additional Documents", "Status Updates"], time: "Day 10–21" },
  { num: "05", title: "Account Activation", desc: "Account approved and activated. We guide you through initial deposit, online banking setup, debit card ordering, and introduce you to your assigned relationship manager.", docs: ["Initial Deposit", "Online Banking", "Debit Card", "RM Introduction"], time: "Day 21–30" },
];

const FAQS = [
  { q: "How long does UAE corporate bank account opening take?", a: "Typically 3–6 weeks from document submission to account activation. Digital banks like Wio can be faster — sometimes within a week. International banks like HSBC and Standard Chartered take longer due to more thorough compliance reviews." },
  { q: "Which bank is easiest to open an account with in the UAE?", a: "RAKBank and Wio Bank are generally the most accessible for SMEs and free zone companies. ADCB is also known for efficient SME account opening. The 'easiest' bank depends on your business type, nationality, and transaction profile — we assess this before recommending." },
  { q: "Can a free zone company open a UAE bank account?", a: "Yes — all UAE banks accept free zone company accounts. Some banks have preferences for specific free zones (e.g., DMCC companies tend to have high approval rates). We align your bank selection to your free zone for maximum success." },
  { q: "What is the minimum balance requirement for a UAE business account?", a: "It varies significantly. Wio Bank has no minimum. RAKBank requires around AED 10,000. Local banks like ENBD and FAB typically require AED 50,000+. International banks can require AED 100,000–150,000. We recommend banks that match your capital position." },
  { q: "Why was my UAE bank account application rejected?", a: "Common reasons include incomplete documentation, unclear source of funds, high-risk business activity, nationality considerations, or mismatched business model. We review rejected cases and often successfully reapply to a different bank with a restructured application." },
  { q: "Do I need to be present in the UAE to open a business bank account?", a: "Most UAE banks require at least one visit for KYC verification and signature. However, Wio Bank is fully digital and can be opened remotely. We advise on the minimum visit requirement for your target bank." },
];

// ── HERO CANVAS ──────────────────────────────────────────────
function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let W, H, raf, t = 0;
    const pts = Array.from({ length: 55 }, () => ({ x: Math.random() * 1920, y: Math.random() * 1080, vx: (Math.random() - .5) * 0.18, vy: (Math.random() - .5) * 0.18, r: Math.random() * 1.5 + 0.4, o: Math.random() * 0.4 + 0.12 }));
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      t += 0.004; ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, W, H); bg.addColorStop(0, "#05111e"); bg.addColorStop(1, "#020b14"); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      [[0.1, 0.3, "#C9A84C", 0.055, 12], [0.9, 0.2, "#163354", 0.4, 9], [0.5, 0.8, "#C9A84C", 0.04, 15]].forEach(([bx, by, col, a, spd], i) => {
        const x = W * bx + Math.sin(t * (spd / 10) + i * 2.1) * 80, y = H * by + Math.cos(t * (spd / 13) + i) * 55, r = Math.min(W, H) * 0.65;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r); const rgb = parseInt(col.slice(1), 16);
        g.addColorStop(0, `rgba(${rgb >> 16},${(rgb >> 8) & 255},${rgb & 255},${a})`); g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      });
      ctx.strokeStyle = "rgba(201,168,76,0.025)"; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        for (let j = i + 1; j < pts.length; j++) { const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy); if (d < 150) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(201,168,76,${0.07 * (1 - d / 150)})`; ctx.lineWidth = 0.4; ctx.stroke(); } }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(201,168,76,${p.o})`; ctx.fill();
      }
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, H * 0.9); vg.addColorStop(0, "transparent"); vg.addColorStop(1, "rgba(2,11,20,0.7)"); ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="bk-hero-canvas" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".bk-reveal");
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } }), { threshold: 0.07 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ── MAIN ─────────────────────────────────────────────────────
export default function BankingPage({ onBack, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedBank, setSelectedBank] = useState(null);
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

  const go = (page) => { setDrawerOpen(false); if (onNavigate) { onNavigate(page); window.scrollTo(0, 0); } };

  const navLinks = [
    { label: "Home", page: "home" }, { label: "Services", page: "services" },
    { label: "Free Zones", page: "home" }, { label: "About", page: "about" },
    { label: "Blog", page: "blog" }, { label: "Contact", page: "contact" },
  ];

  const filters = [
    { id: "all", label: "All Banks" },
    { id: "local", label: "UAE National" },
    { id: "islamic", label: "Islamic Banking" },
    { id: "international", label: "International" },
    { id: "digital", label: "Digital Bank" },
  ];

  const filtered = activeFilter === "all" ? BANKS : BANKS.filter(b => b.type === activeFilter);
  const approvalColor = { "Fastest": "#48bb78", "Fast": "#68d391", "Moderate": "var(--g400)", "Strict": "#fc8181" };

  return (
    <div className="bk-root">
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className={`bk-nav${scrolled ? " scrolled" : ""}`}>
        <div className="bk-nav-logo" onClick={() => go("home")}>INCO<em>ZONE</em></div>
        <ul className="bk-nav-links">
          {navLinks.map(l => <li key={l.label}><a onClick={() => go(l.page)}>{l.label}</a></li>)}
        </ul>
        <button className="bk-nav-cta" onClick={() => go("schedule")}>Schedule Consultation</button>
        <button className={`bk-nav-hamburger${drawerOpen ? " open" : ""}`} onClick={() => setDrawerOpen(o => !o)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* ── DRAWER ── */}
      <div className={`bk-drawer${drawerOpen ? " open" : ""}`}>
        <div className="bk-drawer-brand" onClick={() => go("home")}>INCO<em>ZONE</em></div>
        {navLinks.map(l => <button key={l.label} className="bk-dlink" onClick={() => go(l.page)}>{l.label}</button>)}
        <div className="bk-drawer-div" />
        <button className="bk-dcta" onClick={() => go("schedule")}>Schedule Consultation</button>
      </div>

      {/* ── HERO ── */}
      <section className="bk-hero">
        <HeroCanvas />
        <div className="bk-hero-left">
          <div className="bk-hero-eyebrow">
            <div className="bk-hero-eyebrow-dot" />
            Corporate Banking · UAE Setup
          </div>
          <h1 className="bk-hero-h1">
            Corporate<br />
            <em>Banking</em>
            Setup.
          </h1>
          <div className="bk-hero-fullname">UAE Bank Account Opening — Fully Managed</div>
          <p className="bk-hero-desc">
            Introductions to UAE's top corporate banks — <strong>ENBD, FAB, ADCB, Mashreq, RAKBank, and more</strong> — with fully prepared documentation packages tailored to your business model. We know what each bank looks for and structure your application to maximise approval probability.
          </p>
          <div className="bk-hero-tags">
            {["Bank Introductions", "KYC Package", "Business Plan", "Source of Funds", "Trade Finance", "Multi-Currency"].map(t => (
              <span className="bk-hero-tag" key={t}>{t}</span>
            ))}
          </div>
          <div className="bk-hero-btns">
            <button className="bk-btn-gold" onClick={() => go("schedule")}>Start Bank Account Setup →</button>
            <button className="bk-btn-ghost" onClick={() => onBack && onBack()}>← Back to Services</button>
          </div>
        </div>
        <div className="bk-hero-right">
          <div className="bk-hero-stat-card">
            <span className="bk-hero-stat-label">Account Approval Rate</span>
            <span className="bk-hero-stat-num">95</span>
            <span className="bk-hero-stat-unit">%</span>
            <span className="bk-hero-stat-sub">Across All UAE Bank Applications</span>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bk-stats-bar">
        {[
          { val: "12", key: "Partner Banks" },
          { val: "95%", key: "Approval Rate" },
          { val: "21 Days", key: "Avg. Opening" },
          { val: "AED 0", key: "Min. (Digital)" },
          { val: "500+", key: "Accounts Opened" },
        ].map((s, i) => (
          <div className="bk-stat" key={i}>
            <span className="bk-stat-val">{s.val}</span>
            <span className="bk-stat-key">{s.key}</span>
          </div>
        ))}
      </div>

      {/* ── BANK SELECTOR ── */}
      <section className="bk-banks">
        <div className="bk-reveal">
          <span className="bk-section-label">Choose Your Bank</span>
          <h2 className="bk-section-h2">UAE's Premier<br /><em>Corporate Banks</em></h2>
          <p className="bk-section-sub">
            Select any bank below to see detailed information — account requirements, approval difficulty, minimum balance, and what each bank is <strong>best suited for.</strong> INCOZONE has active relationships with all 12 banks listed.
          </p>
        </div>

        {/* Filter bar */}
        <div className="bk-filter-bar bk-reveal bk-d1">
          {filters.map(f => (
            <button key={f.id} className={`bk-filter-btn${activeFilter === f.id ? " active" : ""}`} onClick={() => setActiveFilter(f.id)}>{f.label}</button>
          ))}
        </div>

        {/* Banks grid */}
        <div className="bk-banks-grid">
          {filtered.map((bank, i) => (
            <div
              key={bank.id}
              className={`bk-bank-card bk-reveal bk-d${(i % 3) + 1}${selectedBank === bank.id ? " selected" : ""}`}
              data-bank={bank.id}
              data-type={bank.type}
              onClick={() => setSelectedBank(selectedBank === bank.id ? null : bank.id)}
            >
              <div className="bk-bank-logo-area">{bank.logo}</div>
              <div className="bk-bank-name">{bank.name}</div>
              <div className="bk-bank-full">{bank.full}</div>
              <div className="bk-bank-type-badge">{bank.typeLabel}</div>
              <p className="bk-bank-desc">{bank.desc}</p>
              <div className="bk-bank-features">
                {bank.features.map(f => <span className="bk-bank-feat" key={f}>{f}</span>)}
              </div>
              <div className="bk-bank-footer">
                <div className="bk-bank-min">
                  Min. Balance<br />
                  <strong>{bank.minBalance}</strong>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--w30)", marginBottom: "4px" }}>Approval</div>
                  <div style={{ fontSize: "0.72rem", fontWeight: "500", color: approvalColor[bank.approval] || "var(--g400)" }}>{bank.approval}</div>
                </div>
              </div>
              <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--w06)" }}>
                <button className="bk-bank-select-btn">
                  {selectedBank === bank.id ? " Selected — Request This Bank" : "Select This Bank →"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Selected bank panel */}
        {selectedBank && (() => {
          const bank = BANKS.find(b => b.id === selectedBank);
          return bank ? (
            <div className="bk-selected-panel">
              <div className="bk-selected-panel-left">
                <span className="bk-selected-label">Selected Bank</span>
                <div className="bk-selected-name">{bank.full}</div>
                <div className="bk-selected-sub">Best for: {bank.bestFor} · Min. Balance: {bank.minBalance} · Approval: {bank.approval}</div>
              </div>
              <button className="bk-selected-btn" onClick={() => go("schedule")}>
                Open Account with {bank.name} →
              </button>
            </div>
          ) : null;
        })()}
      </section>

      {/* ── WHAT WE PREPARE ── */}
      <section className="bk-prepare">
        <div className="bk-prepare-inner">
          <div>
            <div className="bk-reveal">
              <span className="bk-section-label">Our Preparation</span>
              <h2 className="bk-section-h2">What We<br /><em>Prepare for You</em></h2>
            </div>
            <div className="bk-prepare-grid">
              {PREPARE_ITEMS.map((item, i) => (
                <div className={`bk-prep-card bk-reveal bk-d${(i % 2) + 1}`} key={i}>
                  <span className="bk-prep-icon">{item.icon}</span>
                  <div className="bk-prep-title">{item.title}</div>
                  <p className="bk-prep-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bk-reveal bk-d2">
            <div className="bk-approval-box">
              <div className="bk-approval-title">Why Our Approval Rate is 95%</div>
              <div className="bk-approval-sub">Five factors that separate our applications from generic submissions</div>
              <div className="bk-approval-steps">
                {[
                  { n: "01", title: "Bank-Specific Preparation", desc: "Every document is tailored to the target bank's compliance team — not a generic template.", time: "Before Submission" },
                  { n: "02", title: "Direct Relationship Access", desc: "We introduce applications via our RM contacts — not through general portals where files sit unread.", time: "At Submission" },
                  { n: "03", title: "Pre-Submission Compliance Check", desc: "We identify red flags before the bank does — and restructure the file to eliminate rejection triggers.", time: "Before Submission" },
                  { n: "04", title: "Active Follow-Up", desc: "We chase every query within 24 hours — our applications don't stall in compliance queues.", time: "During Review" },
                  { n: "05", title: "Rejection Recovery", desc: "If one bank declines, we pivot immediately to the next best option with a repositioned application.", time: "If Needed" },
                ].map((s, i) => (
                  <div className="bk-approval-step" key={i}>
                    <div className="bk-approval-num">{s.n}</div>
                    <div>
                      <div className="bk-approval-body-title">{s.title}</div>
                      <p className="bk-approval-body-desc">{s.desc}</p>
                      <span className="bk-approval-time">{s.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="bk-process">
        <div className="bk-process-header">
          <div className="bk-reveal">
            <span className="bk-section-label">How It Works</span>
            <h2 className="bk-section-h2">From selection<br /><em>to activation.</em></h2>
          </div>
          <div className="bk-reveal bk-d2">
            <p className="bk-process-intro">
              INCOZONE manages the <strong>complete bank account opening process</strong> — from identifying the right bank to account activation. Most accounts are opened within <strong>21–30 days</strong>. We handle all bank communication, document preparation, and follow-up on your behalf.
            </p>
          </div>
        </div>
        <div className="bk-process-steps">
          {PROCESS_STEPS.map((s, i) => (
            <div className={`bk-step bk-reveal bk-d${(i % 4) + 1}`} key={i}>
              <div className="bk-step-num">{s.num}</div>
              <div className="bk-step-body">
                <div className="bk-step-title">{s.title}</div>
                <p className="bk-step-desc">{s.desc}</p>
                <div className="bk-step-docs">
                  {s.docs.map(d => <span className="bk-step-doc" key={d}>{d}</span>)}
                </div>
              </div>
              <div className="bk-step-time">{s.time}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bk-faq">
        <div className="bk-faq-inner">
          <div className="bk-reveal">
            <span className="bk-section-label">Common Questions</span>
            <h2 className="bk-section-h2" style={{ marginBottom: "24px" }}>Banking<br /><em>FAQ</em></h2>
            <p style={{ fontSize: "0.82rem", color: "var(--w60)", lineHeight: "1.8", marginBottom: "40px" }}>
              The most frequently asked questions about opening a corporate bank account in the UAE. For a personalised assessment, book a free consultation.
            </p>
            <button className="bk-btn-gold" onClick={() => go("schedule")}>Free Banking Consultation →</button>
          </div>
          <div className="bk-faq-list bk-reveal bk-d2">
            {FAQS.map((f, i) => (
              <div className={`bk-faq-item${openFaq === i ? " open" : ""}`} key={i}>
                <div className="bk-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="bk-faq-q-text">{f.q}</span>
                  <div className="bk-faq-icon">+</div>
                </div>
                <div className="bk-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bk-cta">
        <div className="bk-cta-inner">
          <span className="bk-cta-label bk-reveal">Begin Your Application</span>
          <h2 className="bk-cta-h2 bk-reveal bk-d1">Open Your UAE<br /><em>Corporate Account.</em></h2>
          <div className="bk-cta-divider" />
          <p className="bk-cta-p bk-reveal bk-d2">
            Select your preferred bank above or schedule a consultation. We'll assess your business profile, identify the optimal bank, and manage the complete application process.
          </p>
          <div className="bk-cta-btns bk-reveal bk-d3">
            <button className="bk-btn-dark" onClick={() => go("schedule")}>Schedule Banking Consultation</button>
            <button className="bk-btn-outline" onClick={() => onBack && onBack()}>← Back to Services</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bk-footer">
        <div className="bk-footer-inner">
          <div className="bk-footer-logo">INCO<em>ZONE</em></div>
          <div className="bk-footer-copy">© 2026 INCOZONE. All rights reserved. Dubai, UAE.</div>
        </div>
      </footer>

      {/* ── WA ── */}
      <div className="bk-wa">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </div>
    </div>
  );
}
