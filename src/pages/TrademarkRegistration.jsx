import { useState, useEffect, useRef } from "react";
import { IAward, IShield, IStar, IUsers, IPenTool, IFileText, IScale, IBriefcase, IGlobe, ITrendingUp, ILock } from "../icons";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Trademark Registration Page
//  Drop into: src/pages/TrademarkRegistration.jsx
//  Data source: UAE Ministry of Economy & Tourism (official)
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

.tm-root *, .tm-root *::before, .tm-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.tm-root {
  --n950: #020b14; --n900: #05111e; --n800: #091928; --n750: #0c2033; --n700: #102540; --n600: #163354;
  --g400: #C9A84C; --g300: #D4B468; --g200: #E2CC98;
  --glow2: rgba(201,168,76,0.07); --glow3: rgba(201,168,76,0.04);
  --cream-bg: #FAF6EE; --cream-100: #F4ECD8; --cream-200: #EDE0C4;
  --cream-ink: #1A120A; --cream-ink2: #3D2E1A; --cream-ink3: #7A6040; --cream-bdr: rgba(180,150,90,0.2);
  --w: #F8F5EE; --w80: rgba(248,245,238,0.80); --w60: rgba(248,245,238,0.60);
  --w30: rgba(248,245,238,0.30); --w12: rgba(248,245,238,0.12); --w06: rgba(248,245,238,0.06);
  --fd: 'Cormorant Garamond', Georgia, serif; --fb: 'DM Sans', system-ui, sans-serif;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  font-family: var(--fb); font-weight: 300; line-height: 1.6;
  color: var(--w); background: var(--n900); overflow-x: hidden; width: 100%;
}

/* ── NAV ── */
.tm-nav { position: fixed; inset-inline: 0; top: 0; z-index: 200; display: flex; align-items: center; justify-content: space-between; padding: 22px 60px; transition: background 0.5s, padding 0.4s, border-color 0.5s; border-bottom: 1px solid transparent; }
.tm-nav.scrolled { background: rgba(5,17,30,0.96); backdrop-filter: blur(20px); padding: 14px 60px; border-bottom-color: rgba(201,168,76,0.12); }
.tm-nav-logo { font-family: var(--fd); font-size: 1.5rem; font-weight: 500; letter-spacing: 0.15em; color: var(--w); cursor: pointer; }
.tm-nav-logo em { color: var(--g400); font-style: normal; }
.tm-nav-links { display: flex; gap: 36px; list-style: none; }
.tm-nav-links a { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--w60); text-decoration: none; transition: color 0.3s; cursor: pointer; }
.tm-nav-links a:hover { color: var(--g300); }
.tm-nav-cta { font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; background: transparent; border: 1px solid var(--g400); color: var(--g400); padding: 9px 22px; cursor: pointer; font-family: var(--fb); transition: background 0.3s, color 0.3s; }
.tm-nav-cta:hover { background: var(--g400); color: var(--n900); }
.tm-nav-hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 6px; }
.tm-nav-hamburger span { display: block; width: 24px; height: 1.5px; background: var(--w60); transition: all 0.35s var(--ease); transform-origin: center; }
.tm-nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: var(--g400); }
.tm-nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.tm-nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: var(--g400); }
.tm-drawer { position: fixed; inset: 0; z-index: 300; background: rgba(3,10,20,0.97); backdrop-filter: blur(24px); display: flex; flex-direction: column; align-items: center; justify-content: center; transform: translateX(100%); transition: transform 0.45s var(--ease); pointer-events: none; }
.tm-drawer.open { transform: translateX(0); pointer-events: all; }
.tm-drawer-brand { font-family: var(--fd); font-size: 1.3rem; letter-spacing: .18em; color: var(--w); margin-bottom: 44px; opacity: 0; transform: translateY(10px); transition: opacity .4s .1s, transform .4s .1s; cursor: pointer; }
.tm-drawer.open .tm-drawer-brand { opacity: 1; transform: translateY(0); }
.tm-drawer-brand em { color: var(--g400); font-style: normal; }
.tm-dlink { font-family: var(--fd); font-size: clamp(2rem,8vw,3rem); font-weight: 300; color: var(--w60); background: none; border: none; padding: 10px 0; cursor: pointer; display: block; width: 100%; text-align: center; opacity: 0; transform: translateY(18px); transition: color .3s, opacity .4s var(--ease), transform .4s var(--ease); }
.tm-drawer.open .tm-dlink { opacity: 1; transform: translateY(0); }
.tm-drawer.open .tm-dlink:nth-of-type(1){transition-delay:.12s} .tm-drawer.open .tm-dlink:nth-of-type(2){transition-delay:.17s} .tm-drawer.open .tm-dlink:nth-of-type(3){transition-delay:.22s} .tm-drawer.open .tm-dlink:nth-of-type(4){transition-delay:.27s} .tm-drawer.open .tm-dlink:nth-of-type(5){transition-delay:.32s}
.tm-dlink:hover { color: var(--g400); }
.tm-drawer-div { width: 40px; height: 1px; background: rgba(201,168,76,.25); margin: 18px 0; opacity: 0; transition: opacity .4s .34s; }
.tm-drawer.open .tm-drawer-div { opacity: 1; }
.tm-dcta { font-family: var(--fb); font-size: .7rem; letter-spacing: .18em; text-transform: uppercase; color: var(--g400); border: 1px solid var(--g400); background: none; padding: 12px 32px; cursor: pointer; margin-top: 8px; opacity: 0; transform: translateY(18px); transition: color .3s, background .3s, opacity .4s .38s, transform .4s .38s; }
.tm-drawer.open .tm-dcta { opacity: 1; transform: translateY(0); }
.tm-dcta:hover { background: var(--g400); color: var(--n900); }

/* ── HERO ── */
.tm-hero { min-height: 100vh; position: relative; overflow: hidden; display: grid; grid-template-columns: 1fr 1fr; align-items: flex-end; padding: 0 60px 80px; gap: 60px; }
.tm-hero-canvas { position: absolute; inset: 0; z-index: 0; }
.tm-hero-left { position: relative; z-index: 2; padding-top: 160px; }
.tm-hero-right { position: relative; z-index: 2; padding-top: 160px; display: flex; align-items: flex-end; justify-content: flex-end; }
.tm-hero-eyebrow { display: inline-flex; align-items: center; gap: 10px; font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--g400); border: 1px solid rgba(201,168,76,0.28); padding: 7px 16px; margin-bottom: 32px; opacity: 0; animation: tmUp 1s var(--ease) 0.2s forwards; }
.tm-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--g400); animation: tmBlink 2s infinite; }
.tm-hero-h1 { font-family: var(--fd); font-weight: 300; line-height: 0.88; letter-spacing: -0.02em; color: var(--w); font-size: clamp(3.8rem,8vw,7.5rem); margin-bottom: 20px; opacity: 0; animation: tmUp 1.1s var(--ease) 0.35s forwards; }
.tm-hero-h1 em { display: block; color: var(--g400); font-style: italic; }
.tm-hero-sub { font-family: var(--fd); font-size: 1rem; color: var(--w60); font-style: italic; margin-bottom: 32px; opacity: 0; animation: tmUp 1s var(--ease) 0.5s forwards; }
.tm-hero-desc { font-size: 0.88rem; color: var(--w60); line-height: 1.85; max-width: 520px; margin-bottom: 36px; opacity: 0; animation: tmUp 1s var(--ease) 0.65s forwards; }
.tm-hero-desc strong { color: var(--w80); font-weight: 400; }
.tm-hero-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 36px; opacity: 0; animation: tmUp 1s var(--ease) 0.75s forwards; }
.tm-hero-tag { font-size: 0.6rem; letter-spacing: 0.16em; text-transform: uppercase; padding: 6px 14px; border: 1px solid rgba(201,168,76,0.25); color: var(--g300); }
.tm-hero-btns { display: flex; gap: 14px; flex-wrap: wrap; opacity: 0; animation: tmUp 1s var(--ease) 0.85s forwards; }
.tm-btn-gold { padding: 15px 36px; background: var(--g400); color: var(--n900); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.tm-btn-gold:hover { background: var(--g300); transform: translateY(-2px); }
.tm-btn-ghost { padding: 15px 36px; background: transparent; color: var(--w60); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--w12); cursor: pointer; transition: all 0.3s; }
.tm-btn-ghost:hover { border-color: var(--w30); color: var(--w); transform: translateY(-2px); }

/* Official fee card */
.tm-fee-card { background: rgba(9,25,40,0.88); backdrop-filter: blur(16px); border: 1px solid rgba(201,168,76,0.22); padding: 44px 40px; min-width: 300px; position: relative; overflow: hidden; }
.tm-fee-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(201,168,76,0.06), transparent); pointer-events: none; }
.tm-fee-card-title { font-size: 0.58rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--g400); margin-bottom: 24px; display: flex; align-items: center; gap: 10px; }
.tm-fee-card-title::before { content: ''; width: 20px; height: 1px; background: var(--g400); }
.tm-fee-rows { display: flex; flex-direction: column; gap: 0; }
.tm-fee-row { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid var(--w06); gap: 20px; }
.tm-fee-row:last-child { border-bottom: none; }
.tm-fee-row-label { font-size: 0.75rem; color: var(--w60); flex: 1; }
.tm-fee-row-val { font-family: var(--fd); font-size: 1.3rem; font-weight: 300; color: var(--g400); white-space: nowrap; }
.tm-fee-total { margin-top: 20px; padding: 16px 20px; background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.2); display: flex; justify-content: space-between; align-items: center; }
.tm-fee-total-label { font-size: 0.65rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--w30); }
.tm-fee-total-val { font-family: var(--fd); font-size: 1.8rem; font-weight: 300; color: var(--g400); }
.tm-fee-source { font-size: 0.58rem; color: var(--w30); margin-top: 14px; text-align: right; letter-spacing: 0.06em; }

/* ── STATS BAR ── */
.tm-stats-bar { background: var(--n800); padding: 0 60px; display: grid; grid-template-columns: repeat(5,1fr); border-bottom: 1px solid var(--w06); }
.tm-sbar { padding: 32px 0; text-align: center; border-right: 1px solid var(--w06); }
.tm-sbar:last-child { border-right: none; }
.tm-sbar-val { font-family: var(--fd); font-size: 2.2rem; font-weight: 300; color: var(--g400); display: block; line-height: 1; }
.tm-sbar-key { font-size: 0.62rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--w30); margin-top: 6px; display: block; }

/* ── WHY TRADEMARK ── */
.tm-why { background: var(--n900); padding: 100px 60px; }
.tm-section-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--g400); margin-bottom: 16px; display: block; }
.tm-section-h2 { font-family: var(--fd); font-size: clamp(2.2rem,4vw,3.8rem); font-weight: 300; line-height: 1.1; color: var(--w); margin-bottom: 60px; }
.tm-section-h2 em { color: var(--g400); font-style: italic; }
.tm-why-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; background: var(--w06); }
.tm-why-card { background: var(--n800); padding: 44px 36px; position: relative; overflow: hidden; transition: background 0.4s var(--ease); }
.tm-why-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, var(--glow2), transparent); opacity: 0; transition: opacity 0.4s; }
.tm-why-card:hover { background: var(--n750); }
.tm-why-card:hover::before { opacity: 1; }
.tm-why-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--g400); transform: scaleX(0); transform-origin: left; transition: transform 0.5s var(--ease); }
.tm-why-card:hover::after { transform: scaleX(1); }
.tm-why-icon { font-size: 2rem; margin-bottom: 20px; display: block; }
.tm-why-title { font-family: var(--fd); font-size: 1.4rem; font-weight: 400; color: var(--w); margin-bottom: 12px; }
.tm-why-desc { font-size: 0.82rem; color: var(--w60); line-height: 1.78; }

/* ── TRADEMARK TYPES ── */
.tm-types { background: var(--n800); padding: 100px 60px; }
.tm-types-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; background: var(--w06); margin-bottom: 32px; }
.tm-type-card { background: var(--n800); padding: 44px 36px; position: relative; overflow: hidden; transition: background 0.4s; }
.tm-type-card:hover { background: var(--n750); }
.tm-type-badge { font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; padding: 4px 10px; border: 1px solid rgba(201,168,76,0.3); color: var(--g400); width: fit-content; margin-bottom: 20px; }
.tm-type-icon { font-size: 2rem; margin-bottom: 16px; display: block; }
.tm-type-title { font-family: var(--fd); font-size: 1.45rem; font-weight: 400; color: var(--w); margin-bottom: 10px; line-height: 1.2; }
.tm-type-desc { font-size: 0.8rem; color: var(--w60); line-height: 1.75; margin-bottom: 16px; }
.tm-type-examples { display: flex; flex-wrap: wrap; gap: 6px; }
.tm-type-ex { font-size: 0.58rem; letter-spacing: 0.1em; padding: 4px 9px; border: 1px solid var(--w06); color: var(--w30); }

/* ── OFFICIAL PROCESS ── */
.tm-process { background: var(--n900); padding: 100px 60px; }
.tm-process-inner { display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px; align-items: start; }
.tm-process-intro { font-size: 0.84rem; color: var(--w60); line-height: 1.88; margin-top: 24px; }
.tm-process-intro strong { color: var(--w80); font-weight: 400; }
.tm-official-badge { display: inline-flex; align-items: center; gap: 10px; background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.2); padding: 10px 18px; margin-top: 28px; }
.tm-official-badge-icon { font-size: 1.2rem; }
.tm-official-badge-text { font-size: 0.68rem; color: var(--g400); letter-spacing: 0.1em; }

/* Steps */
.tm-steps { display: flex; flex-direction: column; gap: 0; }
.tm-step { display: grid; grid-template-columns: 64px 1fr; gap: 0; position: relative; border-top: 1px solid var(--w06); }
.tm-step:last-child { border-bottom: 1px solid var(--w06); }
.tm-step::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--g400); transform: scaleY(0); transform-origin: top; transition: transform 0.5s var(--ease); }
.tm-step:hover::before { transform: scaleY(1); }
.tm-step-num { font-family: var(--fd); font-size: 3rem; font-weight: 300; color: rgba(201,168,76,0.15); line-height: 1; padding: 32px 0; transition: color 0.4s; }
.tm-step:hover .tm-step-num { color: rgba(201,168,76,0.35); }
.tm-step-body { padding: 32px 0 32px 24px; }
.tm-step-title { font-size: 0.95rem; font-weight: 500; color: var(--w); margin-bottom: 8px; }
.tm-step-desc { font-size: 0.8rem; color: var(--w60); line-height: 1.72; }
.tm-step-fee { display: inline-flex; align-items: center; gap: 8px; margin-top: 12px; font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--g400); border: 1px solid rgba(201,168,76,0.2); padding: 4px 12px; }
.tm-step-time { font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--w30); margin-top: 6px; display: block; }

/* ── CLASSES SECTION ── */
.tm-classes { background: var(--n800); padding: 100px 60px; }
.tm-classes-inner { display: grid; grid-template-columns: 1fr 1.6fr; gap: 80px; align-items: start; }
.tm-classes-intro { font-size: 0.84rem; color: var(--w60); line-height: 1.88; margin-top: 20px; }
.tm-classes-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 1px; background: var(--w06); }
.tm-class-item { background: var(--n800); padding: 20px 16px; text-align: center; transition: background 0.3s; cursor: default; }
.tm-class-item:hover { background: var(--n750); }
.tm-class-num { font-family: var(--fd); font-size: 1.6rem; font-weight: 300; color: var(--g400); display: block; line-height: 1; }
.tm-class-name { font-size: 0.58rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--w30); margin-top: 4px; display: block; line-height: 1.4; }
.tm-class-note { margin-top: 28px; padding: 20px 24px; background: rgba(201,168,76,0.06); border: 1px solid rgba(201,168,76,0.15); font-size: 0.78rem; color: var(--w60); line-height: 1.75; }
.tm-class-note strong { color: var(--g400); font-weight: 400; }

/* ── DOCUMENTS REQUIRED ── */
.tm-docs { background: var(--n900); padding: 100px 60px; }
.tm-docs-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 2px; background: var(--w06); }
.tm-doc-card { background: var(--n900); padding: 36px 32px; transition: background 0.3s; display: flex; gap: 20px; align-items: flex-start; }
.tm-doc-card:hover { background: var(--n800); }
.tm-doc-icon { font-size: 1.8rem; flex-shrink: 0; margin-top: 4px; }
.tm-doc-body {}
.tm-doc-title { font-size: 0.9rem; font-weight: 500; color: var(--w); margin-bottom: 8px; }
.tm-doc-desc { font-size: 0.78rem; color: var(--w60); line-height: 1.72; }
.tm-doc-note { font-size: 0.68rem; color: rgba(201,168,76,0.6); margin-top: 8px; letter-spacing: 0.06em; }

/* ── PACKAGES ── */
.tm-packages { background: var(--cream-bg); padding: 100px 60px; position: relative; overflow: hidden; }
.tm-packages::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, transparent, var(--g400), transparent); opacity: 0.5; }
.tm-pkg-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: #8A6820; margin-bottom: 16px; display: block; }
.tm-pkg-h2 { font-family: var(--fd); font-size: clamp(2.2rem,4vw,3.5rem); font-weight: 300; color: var(--cream-ink); line-height: 1.1; margin-bottom: 60px; }
.tm-pkg-h2 em { color: var(--g400); font-style: italic; }
.tm-pkgs-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
.tm-pkg { background: var(--cream-bg); border: 1px solid var(--cream-bdr); padding: 44px 36px; display: flex; flex-direction: column; transition: all 0.35s var(--ease); box-shadow: 0 2px 12px rgba(120,90,30,0.06); cursor: pointer; }
.tm-pkg:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(120,90,30,0.14); border-color: rgba(201,168,76,0.45); }
.tm-pkg.featured { background: var(--n900); border: 1px solid rgba(201,168,76,0.35); box-shadow: 0 8px 40px rgba(0,0,0,0.22); }
.tm-pkg.featured:hover { border-color: var(--g400); }
.tm-pkg-badge { font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; padding: 4px 10px; width: fit-content; margin-bottom: 22px; border: 1px solid; font-weight: 500; }
.tm-pkg:not(.featured) .tm-pkg-badge { border-color: var(--cream-bdr); color: var(--cream-ink3); background: var(--cream-200); }
.tm-pkg.featured .tm-pkg-badge { border-color: var(--g400); color: var(--g400); background: rgba(201,168,76,0.08); }
.tm-pkg-name { font-family: var(--fd); font-size: 1.7rem; font-weight: 400; margin-bottom: 8px; }
.tm-pkg:not(.featured) .tm-pkg-name { color: var(--cream-ink); }
.tm-pkg.featured .tm-pkg-name { color: var(--w); }
.tm-pkg-tagline { font-size: 0.78rem; margin-bottom: 28px; }
.tm-pkg:not(.featured) .tm-pkg-tagline { color: var(--cream-ink3); }
.tm-pkg.featured .tm-pkg-tagline { color: var(--w60); }
.tm-pkg-div { height: 1px; margin-bottom: 28px; }
.tm-pkg:not(.featured) .tm-pkg-div { background: var(--cream-bdr); }
.tm-pkg.featured .tm-pkg-div { background: var(--w06); }
.tm-pkg-feats { list-style: none; display: flex; flex-direction: column; gap: 11px; flex: 1; margin-bottom: 32px; }
.tm-pkg-feat { display: flex; align-items: flex-start; gap: 11px; font-size: 0.8rem; line-height: 1.5; }
.tm-pkg:not(.featured) .tm-pkg-feat { color: var(--cream-ink2); }
.tm-pkg.featured .tm-pkg-feat { color: var(--w80); }
.tm-feat-chk { flex-shrink: 0; margin-top: 2px; font-size: 0.75rem; }
.tm-feat-chk.yes { color: #8A6820; }
.tm-pkg.featured .tm-feat-chk.yes { color: var(--g400); }
.tm-feat-chk.no { color: rgba(180,150,90,0.3); }
.tm-pkg-cta { padding: 13px 20px; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; font-family: var(--fb); cursor: pointer; transition: all 0.3s; width: 100%; font-weight: 500; }
.tm-pkg:not(.featured) .tm-pkg-cta { background: transparent; border: 1px solid var(--cream-bdr); color: var(--cream-ink2); }
.tm-pkg:not(.featured) .tm-pkg-cta:hover { border-color: var(--g400); color: var(--cream-ink); background: var(--cream-200); }
.tm-pkg.featured .tm-pkg-cta { background: var(--g400); border: none; color: var(--n900); }
.tm-pkg.featured .tm-pkg-cta:hover { background: var(--g300); }

/* ── FAQ ── */
.tm-faq { background: var(--n900); padding: 100px 60px; }
.tm-faq-inner { display: grid; grid-template-columns: 1fr 1.6fr; gap: 80px; align-items: start; }
.tm-faq-list { display: flex; flex-direction: column; }
.tm-faq-item { border-top: 1px solid var(--w06); }
.tm-faq-item:last-child { border-bottom: 1px solid var(--w06); }
.tm-faq-q { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 22px 0; cursor: pointer; }
.tm-faq-q-text { font-size: 0.9rem; font-weight: 400; color: var(--w); transition: color 0.3s; }
.tm-faq-item.open .tm-faq-q-text { color: var(--g400); }
.tm-faq-icon { width: 28px; height: 28px; border: 1px solid var(--w12); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--w30); flex-shrink: 0; transition: all 0.4s var(--ease); }
.tm-faq-item.open .tm-faq-icon { background: var(--g400); border-color: var(--g400); color: var(--n900); transform: rotate(45deg); }
.tm-faq-a { font-size: 0.82rem; color: var(--w60); line-height: 1.82; padding-bottom: 22px; max-height: 0; overflow: hidden; transition: max-height 0.5s var(--ease); }
.tm-faq-item.open .tm-faq-a { max-height: 320px; }

/* ── CTA ── */
.tm-cta { background: var(--cream-bg); padding: 120px 60px; text-align: center; position: relative; overflow: hidden; }
.tm-cta::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(180,150,90,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(180,150,90,0.06) 1px, transparent 1px); background-size: 60px 60px; }
.tm-cta::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.09), transparent); pointer-events: none; }
.tm-cta-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
.tm-cta-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: #8A6820; margin-bottom: 20px; display: block; }
.tm-cta-h2 { font-family: var(--fd); font-size: clamp(2.5rem,5vw,4.2rem); font-weight: 300; color: var(--cream-ink); line-height: 1.1; margin-bottom: 12px; }
.tm-cta-h2 em { color: var(--g400); font-style: italic; }
.tm-cta-divider { width: 44px; height: 1px; background: var(--g400); margin: 24px auto; opacity: 0.5; }
.tm-cta-p { font-size: 0.84rem; color: var(--cream-ink3); line-height: 1.85; margin-bottom: 44px; }
.tm-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.tm-btn-dark { padding: 15px 40px; background: var(--cream-ink); color: var(--cream-bg); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.tm-btn-dark:hover { background: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }
.tm-btn-outline { padding: 15px 40px; background: transparent; color: var(--cream-ink2); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--cream-bdr); cursor: pointer; transition: all 0.3s; }
.tm-btn-outline:hover { border-color: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }

/* ── FOOTER ── */
.tm-footer { background: var(--n950); padding: 52px 60px; border-top: 1px solid var(--w06); }
.tm-footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
.tm-footer-logo { font-family: var(--fd); font-size: 1.3rem; letter-spacing: 0.15em; color: var(--w); }
.tm-footer-logo em { color: var(--g400); font-style: normal; }
.tm-footer-copy { font-size: 0.68rem; color: var(--w30); }
.tm-wa { position: fixed; bottom: 28px; right: 28px; z-index: 300; width: 50px; height: 50px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 18px rgba(37,211,102,0.4); transition: transform 0.3s; }
.tm-wa:hover { transform: scale(1.1); }

/* ── REVEAL ── */
.tm-reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.85s var(--ease), transform 0.85s var(--ease); }
.tm-reveal.in { opacity: 1; transform: translateY(0); }
.tm-d1{transition-delay:0.05s} .tm-d2{transition-delay:0.15s} .tm-d3{transition-delay:0.25s} .tm-d4{transition-delay:0.35s}

@keyframes tmUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes tmBlink { 0%,100%{opacity:1} 50%{opacity:0.3} }

/* ── RESPONSIVE ── */
@media(max-width:1100px){
  .tm-classes-grid{grid-template-columns:repeat(4,1fr)}
}
@media(max-width:1000px){
  .tm-hero{grid-template-columns:1fr;padding:120px 40px 60px}
  .tm-hero-right{justify-content:flex-start}
  .tm-why-grid{grid-template-columns:1fr 1fr}
  .tm-types-grid{grid-template-columns:1fr}
  .tm-process-inner{grid-template-columns:1fr}
  .tm-classes-inner{grid-template-columns:1fr}
  .tm-docs-grid{grid-template-columns:1fr}
  .tm-faq-inner{grid-template-columns:1fr;gap:48px}
  .tm-pkgs-grid{grid-template-columns:1fr}
  .tm-stats-bar{grid-template-columns:repeat(3,1fr)}
}
@media(max-width:768px){
  .tm-nav{padding:16px 24px} .tm-nav.scrolled{padding:12px 24px}
  .tm-nav-links{display:none} .tm-nav-cta{display:none} .tm-nav-hamburger{display:flex}
  .tm-hero{padding:100px 24px 52px}
  .tm-why,.tm-types,.tm-process,.tm-classes,.tm-docs,.tm-packages,.tm-faq,.tm-cta{padding:70px 24px}
  .tm-footer{padding:40px 24px}
  .tm-stats-bar{padding:0 24px;grid-template-columns:1fr 1fr}
  .tm-why-grid{grid-template-columns:1fr}
  .tm-classes-grid{grid-template-columns:repeat(3,1fr)}
}
`;

// ── DATA ──────────────────────────────────────────────────────

const TRADEMARK_TYPES = [
  {
    icon: "™", badge: "Most Common",
    title: "Goods & Services Trademark",
    desc: "The standard trademark covering your brand name, logo, or slogan used in connection with specific goods or services. Applicable to any business, company, or individual.",
    examples: ["Brand Name", "Logo", "Slogan", "Product Name", "Service Mark"],
  },
  {
    icon: IAward, badge: "Quality Certification",
    title: "Quality / Control Mark",
    desc: "A certification mark that certifies the quality, characteristics, or origin of goods or services — not tied to a specific commercial source. Requires Ministry approval.",
    examples: ["Quality Standard", "Origin Mark", "Certification", "Approved Standards"],
  },
  {
    icon: IShield, badge: "Government Only",
    title: "Geographical Indication",
    desc: "Used by government entities to indicate that a product originates from a specific geographic region with qualities attributable to that origin. Requires official legal instruments.",
    examples: ["Regional Products", "Origin-Specific", "Government Entity", "Product Specification"],
  },
  {
    icon: IStar, badge: "Event Protection",
    title: "Exhibition Trademark",
    desc: "Temporary trademark protection for brands displayed at exhibitions and trade shows — protecting your mark during the event period before full registration.",
    examples: ["Trade Shows", "Exhibitions", "Event Protection", "Temporary"],
  },
  {
    icon: IUsers, badge: "Member Association",
    title: "Collective Mark",
    desc: "Used by members of an association or group to distinguish their goods or services. The applicant entity controls member usage and sets criteria for use.",
    examples: ["Association", "Member Control", "Collective Use", "Group Identity"],
  },
];

const OFFICIAL_STEPS = [
  {
    num: "01",
    title: "Submit Application + Pay Examination Fee",
    desc: "Complete the trademark application with your mark image (JPEG), trade license copy, and required documents. Submit via Ministry of Economy website or smart app — available 24/7.",
    fee: "AED 750 (Regular) · AED 2,250 (Expedited — 1 Business Day)",
    time: "Day 1",
  },
  {
    num: "02",
    title: "Ministry Examination & Decision",
    desc: "The Ministry of Economy reviews your application to ensure the mark is not identical or similar to any previously registered trademark. You will be officially notified within 20 working days.",
    fee: "No additional fee",
    time: "Up to 20 Working Days",
  },
  {
    num: "03",
    title: "Publication in Official Trademark Bulletin",
    desc: "Upon approval, pay the publication fee. Your trademark is published in the official UAE Trademark Bulletin — issued twice per month. A 30-day objection period begins from publication date.",
    fee: "AED 750 Publication Fee",
    time: "Published within bulletin cycle",
  },
  {
    num: "04",
    title: "30-Day Objection Period",
    desc: "Any third party may lodge an objection within 30 days of the bulletin publication. INCOZONE monitors this period and responds to any objections on your behalf.",
    fee: "No fee (unless objection response required)",
    time: "30 Days",
  },
  {
    num: "05",
    title: "Pay Registration Fee & Certificate Issued",
    desc: "After the objection period ends with no sustained objections, pay the final registration fee. Your Trademark Registration Certificate is issued within 30 days — valid for 10 years.",
    fee: "AED 5,000 (Trademark) · AED 7,500 (Quality Mark)",
    time: "Within 30 days of payment",
  },
];

const NICE_CLASSES = [
  { num: "01", name: "Chemicals" }, { num: "02", name: "Paints" }, { num: "03", name: "Cosmetics" },
  { num: "04", name: "Lubricants" }, { num: "05", name: "Pharmaceuticals" }, { num: "06", name: "Metals" },
  { num: "07", name: "Machinery" }, { num: "08", name: "Hand Tools" }, { num: "09", name: "Electronics" },
  { num: "10", name: "Medical Devices" }, { num: "11", name: "Appliances" }, { num: "12", name: "Vehicles" },
  { num: "16", name: "Paper/Print" }, { num: "18", name: "Leather Goods" }, { num: "25", name: "Clothing" },
  { num: "29", name: "Food" }, { num: "30", name: "Beverages" }, { num: "35", name: "Advertising" },
  { num: "36", name: "Finance" }, { num: "41", name: "Education" }, { num: "42", name: "Tech/IT" },
  { num: "43", name: "Food Services" }, { num: "44", name: "Healthcare" }, { num: "45", name: "Legal Services" },
  { num: "...", name: "45 Classes Total" },
];

const REQUIRED_DOCS = [
  { icon: IPenTool, title: "Trademark Image (JPEG)", desc: "A clear copy of your trademark — logo, wordmark, or combined mark — in JPEG format.", note: "Required for all applications" },
  { icon: IFileText, title: "Trade License Copy", desc: "If the applicant is a company or establishment, a copy of the valid UAE trade license must be attached.", note: "Companies & establishments" },
  { icon: IScale, title: "Power of Attorney", desc: "Duly certified and notarized power of attorney if applying through a registered trademark agent (like INCOZONE). Required for overseas applicants.", note: "Must be notarized & legally translated" },
  { icon: IBriefcase, title: "Articles of Association", desc: "Required for Quality Marks and Collective Marks — must include specific declarations about mark usage, standards, and member control.", note: "Quality / Collective Marks only" },
  { icon: IGlobe, title: "Arabic Translation", desc: "All supporting documents must be duly notarized, legalized, and translated into Arabic by a certified legal translator.", note: "All non-Arabic documents" },
  { icon: IStar, title: "Exhibition Details", desc: "For temporary exhibition protection — exhibitor name, official opening date, duration, and goods/services specification are required.", note: "Exhibition Trademarks only" },
];

const FAQS = [
  {
    q: "How long does UAE trademark registration take?",
    a: "The standard process takes approximately 3–6 months from submission to certificate. This includes up to 20 working days for Ministry examination, the publication cycle, the 30-day objection period, and final certificate issuance. With INCOZONE's expedited examination option, the initial review can be completed in 1 business day.",
  },
  {
    q: "What is the total official cost for a UAE trademark?",
    a: "The minimum official government fees for a standard trademark registration are: AED 750 (examination) + AED 750 (publication) + AED 5,000 (registration) = AED 6,500 in government fees. Expedited examination costs AED 2,250 instead of AED 750. INCOZONE's professional service fee is charged separately.",
  },
  {
    q: "How many classes should I register my trademark under?",
    a: "The UAE follows the Nice Classification system with 45 international classes (34 goods classes + 11 service classes). You should register under every class relevant to your current business and planned expansion. Each additional class requires a separate fee. INCOZONE advises on optimal class selection to maximise protection without unnecessary cost.",
  },
  {
    q: "How long is a UAE trademark valid?",
    a: "A UAE trademark is valid for 10 years from the registration date and can be renewed indefinitely for successive 10-year periods. INCOZONE provides renewal reminders and manages the renewal process on your behalf.",
  },
  {
    q: "Can I apply for a UAE trademark if I am outside the UAE?",
    a: "Yes — however, overseas applicants must submit through a registered trademark agent in the UAE. A notarized and legally translated power of attorney must be provided. INCOZONE is a registered trademark agent and manages overseas applications completely remotely.",
  },
  {
    q: "What happens if someone objects to my trademark during the 30-day period?",
    a: "An objection triggers a formal review process. The objecting party must file a formal opposition, and you have the right to respond and defend your mark. INCOZONE monitors the bulletin, advises on objection strategy, and manages the opposition response. Most objections are successfully resolved or overcome with proper legal response.",
  },
];

// ── CANVAS ──────────────────────────────────────────────────
function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let W, H, raf, t = 0;
    const pts = Array.from({ length: 55 }, () => ({ x: Math.random() * 1920, y: Math.random() * 1080, vx: (Math.random() - .5) * 0.16, vy: (Math.random() - .5) * 0.16, r: Math.random() * 1.4 + 0.4, o: Math.random() * 0.36 + 0.1 }));
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      t += 0.003; ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, W, H); bg.addColorStop(0, "#05111e"); bg.addColorStop(1, "#020b14"); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      [[0.12, 0.28, "#C9A84C", 0.05, 11], [0.84, 0.22, "#163354", 0.44, 9], [0.5, 0.78, "#C9A84C", 0.038, 14]].forEach(([bx, by, col, a, spd], i) => {
        const x = W * bx + Math.sin(t * (spd / 10) + i * 2) * 70, y = H * by + Math.cos(t * (spd / 13) + i) * 50, r = Math.min(W, H) * 0.6, g = ctx.createRadialGradient(x, y, 0, x, y, r), rgb = parseInt(col.slice(1), 16);
        g.addColorStop(0, `rgba(${rgb >> 16},${(rgb >> 8) & 255},${rgb & 255},${a})`); g.addColorStop(1, "rgba(0,0,0,0)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      });
      ctx.strokeStyle = "rgba(201,168,76,0.024)"; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        for (let j = i + 1; j < pts.length; j++) { const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy); if (d < 145) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(201,168,76,${0.065 * (1 - d / 145)})`; ctx.lineWidth = 0.4; ctx.stroke(); } }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(201,168,76,${p.o})`; ctx.fill();
      }
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, H * 0.9); vg.addColorStop(0, "transparent"); vg.addColorStop(1, "rgba(2,11,20,0.7)"); ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="tm-hero-canvas" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".tm-reveal");
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } }), { threshold: 0.07 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ── MAIN ─────────────────────────────────────────────────────
export default function TrademarkRegistrationPage({ onBack, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h);
  }, []);
  useEffect(() => { document.body.style.overflow = drawerOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [drawerOpen]);

  const go = (page) => { setDrawerOpen(false); if (onNavigate) { onNavigate(page); window.scrollTo(0, 0); } };
  const navLinks = [{ label: "Home", page: "home" }, { label: "Services", page: "services" }, { label: "Free Zones", page: "home" }, { label: "About", page: "about" }, { label: "Blog", page: "blog" }, { label: "Contact", page: "contact" }];

  return (
    <div className="tm-root">
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`tm-nav${scrolled ? " scrolled" : ""}`}>
        <div className="tm-nav-logo" onClick={() => go("home")}>INCO<em>ZONE</em></div>
        <ul className="tm-nav-links">{navLinks.map(l => <li key={l.label}><a onClick={() => go(l.page)}>{l.label}</a></li>)}</ul>
        <button className="tm-nav-cta" onClick={() => go("schedule")}>Schedule Consultation</button>
        <button className={`tm-nav-hamburger${drawerOpen ? " open" : ""}`} onClick={() => setDrawerOpen(o => !o)} aria-label="Toggle menu"><span /><span /><span /></button>
      </nav>

      {/* DRAWER */}
      <div className={`tm-drawer${drawerOpen ? " open" : ""}`}>
        <div className="tm-drawer-brand" onClick={() => go("home")}>INCO<em>ZONE</em></div>
        {navLinks.map(l => <button key={l.label} className="tm-dlink" onClick={() => go(l.page)}>{l.label}</button>)}
        <div className="tm-drawer-div" />
        <button className="tm-dcta" onClick={() => go("schedule")}>Schedule Consultation</button>
      </div>

      {/* HERO */}
      <section className="tm-hero">
        <HeroCanvas />
        <div className="tm-hero-left">
          <div className="tm-hero-eyebrow"><div className="tm-eyebrow-dot" />Intellectual Property · UAE Ministry of Economy</div>
          <h1 className="tm-hero-h1">Trademark<br /><em>Registration</em><br />UAE.</h1>
          <div className="tm-hero-sub">Ministry of Economy — Official Registration</div>
          <p className="tm-hero-desc">
            Register and protect your brand in the UAE with a <strong>Ministry of Economy trademark</strong> — covering your name, logo, slogan, and brand identity across all 45 international classes. Without registration, your brand is legally unprotected. INCOZONE manages the complete application, examination, objection monitoring, and certificate delivery.
          </p>
          <div className="tm-hero-tags">
            {["UAE Trademark", "Ministry of Economy", "Brand Protection", "Logo Registration", "GCC Filing", "45 Classes", "10-Year Validity"].map(t => <span className="tm-hero-tag" key={t}>{t}</span>)}
          </div>
          <div className="tm-hero-btns">
            <button className="tm-btn-gold" onClick={() => go("schedule")}>Register My Trademark →</button>
            <button className="tm-btn-ghost" onClick={() => onBack && onBack()}>← Back to Services</button>
          </div>
        </div>

        {/* Official Fee Card */}
        <div className="tm-hero-right">
          <div className="tm-fee-card">
            <div className="tm-fee-card-title">Official Government Fees</div>
            <div className="tm-fee-rows">
              <div className="tm-fee-row">
                <span className="tm-fee-row-label">Examination Fee (Regular)</span>
                <span className="tm-fee-row-val">AED 750</span>
              </div>
              <div className="tm-fee-row">
                <span className="tm-fee-row-label">Examination Fee (Expedited — 1 Day)</span>
                <span className="tm-fee-row-val">AED 2,250</span>
              </div>
              <div className="tm-fee-row">
                <span className="tm-fee-row-label">Publication Fee</span>
                <span className="tm-fee-row-val">AED 750</span>
              </div>
              <div className="tm-fee-row">
                <span className="tm-fee-row-label">Registration Fee (Trademark)</span>
                <span className="tm-fee-row-val">AED 5,000</span>
              </div>
              <div className="tm-fee-row">
                <span className="tm-fee-row-label">Registration Fee (Quality Mark)</span>
                <span className="tm-fee-row-val">AED 7,500</span>
              </div>
            </div>
            <div className="tm-fee-total">
              <span className="tm-fee-total-label">Total Govt. Fees (Standard)</span>
              <span className="tm-fee-total-val">AED 6,500</span>
            </div>
            <div className="tm-fee-source">Source: UAE Ministry of Economy & Tourism · moet.gov.ae</div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="tm-stats-bar">
        {[{ val: "45", key: "Nice Classes" }, { val: "10 Yrs", key: "Validity" }, { val: "20 Days", key: "MoE Examination" }, { val: "24/7", key: "Online Filing" }, { val: "AED 6,500", key: "Govt. Fees" }].map((s, i) => (
          <div className="tm-sbar" key={i}><span className="tm-sbar-val">{s.val}</span><span className="tm-sbar-key">{s.key}</span></div>
        ))}
      </div>

      {/* WHY TRADEMARK */}
      <section className="tm-why">
        <div className="tm-reveal">
          <span className="tm-section-label">Why Register</span>
          <h2 className="tm-section-h2">Your Brand Is Your<br /><em>Most Valuable Asset</em></h2>
        </div>
        <div className="tm-why-grid">
          {[
            { icon: IScale, title: "Legal Ownership", desc: "Trademark registration gives you exclusive legal ownership of your brand name and logo in the UAE. Only you can use it — and you can take legal action against anyone who copies it." },
            { icon: IShield, title: "Enforcement Rights", desc: "Without registration, you have no legal standing to stop others from using your brand. With registration, you can pursue infringers through UAE courts and customs authorities." },
            { icon: ITrendingUp, title: "Commercial Asset", desc: "A registered trademark is a valuable intangible asset — it can be licensed, franchised, sold, or used as collateral. It directly increases the valuation of your business." },
            { icon: IGlobe, title: "GCC Protection", desc: "UAE trademark registration can form the basis for GCC-wide and international trademark filings — protecting your brand across the region as you grow." },
            { icon: ILock, title: "Stop Copycats", desc: "Registered trademarks are recorded with UAE Customs — giving you the power to intercept and seize counterfeit goods at the border before they reach the market." },
            { icon: IAward, title: "Brand Credibility", desc: "The ™ and ® symbols signal to customers, investors, and partners that you take your brand seriously. It builds instant credibility and trust in the marketplace." },
          ].map((w, i) => (
            <div className={`tm-why-card tm-reveal tm-d${(i % 3) + 1}`} key={i}>
              <span className="tm-why-icon">{w.icon}</span>
              <div className="tm-why-title">{w.title}</div>
              <p className="tm-why-desc">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRADEMARK TYPES */}
      <section className="tm-types">
        <div className="tm-reveal">
          <span className="tm-section-label">Trademark Categories</span>
          <h2 className="tm-section-h2">Types of UAE<br /><em>Trademarks</em></h2>
        </div>
        <div className="tm-types-grid">
          {TRADEMARK_TYPES.map((t, i) => (
            <div className={`tm-type-card tm-reveal tm-d${(i % 3) + 1}`} key={i}>
              <div className="tm-type-badge">{t.badge}</div>
              <span className="tm-type-icon">{t.icon}</span>
              <div className="tm-type-title">{t.title}</div>
              <p className="tm-type-desc">{t.desc}</p>
              <div className="tm-type-examples">{t.examples.map(e => <span className="tm-type-ex" key={e}>{e}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OFFICIAL PROCESS */}
      <section className="tm-process">
        <div className="tm-process-inner">
          <div className="tm-reveal">
            <span className="tm-section-label">Official Process</span>
            <h2 className="tm-section-h2" style={{ marginBottom: 0 }}>How UAE Trademark<br /><em>Registration Works</em></h2>
            <p className="tm-process-intro">
              The official UAE trademark registration process is managed by the <strong>Ministry of Economy & Tourism</strong>. INCOZONE handles every step on your behalf — from application to certificate delivery. The process is available <strong>online 24/7</strong> via the MoE website and smart app.
            </p>
            <div className="tm-official-badge">
              <span className="tm-official-badge-icon"></span>
              <span className="tm-official-badge-text">Official Source: Ministry of Economy & Tourism · moet.gov.ae · 800 1222</span>
            </div>
          </div>
          <div className="tm-steps tm-reveal tm-d2">
            {OFFICIAL_STEPS.map((s, i) => (
              <div className="tm-step" key={i}>
                <div className="tm-step-num">{s.num}</div>
                <div className="tm-step-body">
                  <div className="tm-step-title">{s.title}</div>
                  <p className="tm-step-desc">{s.desc}</p>
                  <div className="tm-step-fee">{s.fee}</div>
                  <span className="tm-step-time">{s.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NICE CLASSES */}
      <section className="tm-classes">
        <div className="tm-classes-inner">
          <div className="tm-reveal">
            <span className="tm-section-label">Nice Classification</span>
            <h2 className="tm-section-h2" style={{ marginBottom: 0 }}>45 International<br /><em>Classes</em></h2>
            <p className="tm-classes-intro">
              The UAE uses the Nice Classification system — 45 international classes covering every type of goods and service. You register your trademark in the specific class or classes that cover your business activities. INCOZONE advises on optimal class selection to ensure maximum protection.
            </p>
            <div className="tm-class-note">
              <strong>Important:</strong> Each class requires a separate registration fee of AED 5,000. INCOZONE recommends registering in all classes relevant to your current and future business activities to prevent brand squatting and competitor registration in adjacent classes.
            </div>
          </div>
          <div className="tm-reveal tm-d2">
            <div className="tm-classes-grid">
              {NICE_CLASSES.map((cls, i) => (
                <div className="tm-class-item" key={i}>
                  <span className="tm-class-num">{cls.num}</span>
                  <span className="tm-class-name">{cls.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="tm-docs">
        <div className="tm-reveal">
          <span className="tm-section-label">Required Documents</span>
          <h2 className="tm-section-h2">What You Need<br /><em>to Apply</em></h2>
        </div>
        <div className="tm-docs-grid">
          {REQUIRED_DOCS.map((doc, i) => (
            <div className={`tm-doc-card tm-reveal tm-d${(i % 2) + 1}`} key={i}>
              <span className="tm-doc-icon">{doc.icon}</span>
              <div className="tm-doc-body">
                <div className="tm-doc-title">{doc.title}</div>
                <p className="tm-doc-desc">{doc.desc}</p>
                <div className="tm-doc-note">{doc.note}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PACKAGES */}
      <section className="tm-packages">
        <span className="tm-pkg-label tm-reveal">Service Packages</span>
        <h2 className="tm-pkg-h2 tm-reveal tm-d1">Choose Your<br /><em>Trademark Package</em></h2>
        <div className="tm-pkgs-grid">
          {[
            {
              name: "Single Class",
              tagline: "One trademark — one class",
              badge: null, featured: false,
              features: [
                { text: "Trademark search & clearance", yes: true },
                { text: "Application preparation & filing", yes: true },
                { text: "MoE examination management", yes: true },
                { text: "Publication monitoring", yes: true },
                { text: "Objection response management", yes: false },
                { text: "Certificate delivery & storage", yes: false },
              ],
            },
            {
              name: "Complete Protection",
              tagline: "Full service — single trademark all classes",
              badge: "Most Popular", featured: true,
              features: [
                { text: "Trademark search & clearance", yes: true },
                { text: "Application preparation & filing", yes: true },
                { text: "MoE examination management", yes: true },
                { text: "Publication & objection monitoring", yes: true },
                { text: "Objection response management", yes: true },
                { text: "Certificate delivery + renewal alert", yes: true },
              ],
            },
            {
              name: "Brand Bundle",
              tagline: "Multiple marks or GCC expansion",
              badge: "Best Value", featured: false,
              features: [
                { text: "Up to 3 trademark applications", yes: true },
                { text: "Multi-class filing strategy", yes: true },
                { text: "All MoE management included", yes: true },
                { text: "GCC filing advisory", yes: true },
                { text: "Full objection management", yes: true },
                { text: "Renewal management for all marks", yes: true },
              ],
            },
          ].map((pkg, i) => (
            <div className={`tm-pkg tm-reveal tm-d${i + 1}${pkg.featured ? " featured" : ""}`} key={i}>
              {pkg.badge && <div className="tm-pkg-badge">{pkg.badge}</div>}
              <div className="tm-pkg-name">{pkg.name}</div>
              <p className="tm-pkg-tagline">{pkg.tagline}</p>
              <div className="tm-pkg-div" />
              <ul className="tm-pkg-feats">
                {pkg.features.map((f, j) => (
                  <li className="tm-pkg-feat" key={j}>
                    <span className={`tm-feat-chk ${f.yes ? "yes" : "no"}`}>{f.yes ? "" : "×"}</span>
                    <span style={{ color: pkg.featured ? (f.yes ? "var(--w80)" : "rgba(248,245,238,0.25)") : (f.yes ? "var(--cream-ink2)" : "var(--cream-bdr)") }}>{f.text}</span>
                  </li>
                ))}
              </ul>
              <button className="tm-pkg-cta" onClick={() => go("schedule")}>{pkg.featured ? "Get Started →" : "Learn More →"}</button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="tm-faq">
        <div className="tm-faq-inner">
          <div className="tm-reveal">
            <span className="tm-section-label">Common Questions</span>
            <h2 className="tm-section-h2" style={{ marginBottom: "24px" }}>Trademark<br /><em>FAQ</em></h2>
            <p style={{ fontSize: "0.82rem", color: "var(--w60)", lineHeight: "1.8", marginBottom: "40px" }}>Answers to the most common trademark questions — based on official UAE Ministry of Economy guidelines.</p>
            <button className="tm-btn-gold" onClick={() => go("schedule")}>Free Brand Consultation →</button>
          </div>
          <div className="tm-faq-list tm-reveal tm-d2">
            {FAQS.map((f, i) => (
              <div className={`tm-faq-item${openFaq === i ? " open" : ""}`} key={i}>
                <div className="tm-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="tm-faq-q-text">{f.q}</span>
                  <div className="tm-faq-icon">+</div>
                </div>
                <div className="tm-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tm-cta">
        <div className="tm-cta-inner">
          <span className="tm-cta-label tm-reveal">Protect Your Brand</span>
          <h2 className="tm-cta-h2 tm-reveal tm-d1">Register Your Trademark<br /><em>Before Someone Else Does.</em></h2>
          <div className="tm-cta-divider" />
          <p className="tm-cta-p tm-reveal tm-d2">Brand squatting is real in the UAE. Once another party registers your name or logo — even if you have been using it — you lose legal rights. Act now. INCOZONE manages the complete process from AED 6,500 in government fees.</p>
          <div className="tm-cta-btns tm-reveal tm-d3">
            <button className="tm-btn-dark" onClick={() => go("schedule")}>Schedule Private Consultation</button>
            <button className="tm-btn-outline" onClick={() => onBack && onBack()}>← Back to Services</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="tm-footer">
        <div className="tm-footer-inner">
          <div className="tm-footer-logo">INCO<em>ZONE</em></div>
          <div className="tm-footer-copy">© 2026 INCOZONE. All rights reserved. Dubai, UAE. · Fee data source: UAE Ministry of Economy & Tourism</div>
        </div>
      </footer>

      <div className="tm-wa" onClick={()=>window.open("https://wa.me/971565834586","_blank")}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </div>
    </div>
  );
}
