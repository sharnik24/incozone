import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Visa & Immigration Page
//  Drop into: src/pages/VisaImmigration.jsx
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

.vi-root *, .vi-root *::before, .vi-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.vi-root {
  --n950: #020b14; --n900: #05111e; --n800: #091928; --n750: #0c2033;
  --n700: #102540; --n600: #163354;
  --g400: #C9A84C; --g300: #D4B468; --g200: #E2CC98;
  --glow: rgba(201,168,76,0.14); --glow2: rgba(201,168,76,0.07); --glow3: rgba(201,168,76,0.04);
  --cream-bg: #FAF6EE; --cream-100: #F4ECD8; --cream-200: #EDE0C4;
  --cream-ink: #1A120A; --cream-ink2: #3D2E1A; --cream-ink3: #7A6040;
  --cream-bdr: rgba(180,150,90,0.2);
  --w: #F8F5EE; --w80: rgba(248,245,238,0.80); --w60: rgba(248,245,238,0.60);
  --w30: rgba(248,245,238,0.30); --w12: rgba(248,245,238,0.12); --w06: rgba(248,245,238,0.06);
  --fd: 'Cormorant Garamond', Georgia, serif;
  --fb: 'DM Sans', system-ui, sans-serif;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  font-family: var(--fb); font-weight: 300; line-height: 1.6;
  color: var(--w); background: var(--n900); overflow-x: hidden; width: 100%;
}

/* ── NAV ── */
.vi-nav { position: fixed; inset-inline: 0; top: 0; z-index: 200; display: flex; align-items: center; justify-content: space-between; padding: 22px 60px; transition: background 0.5s, padding 0.4s, border-color 0.5s; border-bottom: 1px solid transparent; }
.vi-nav.scrolled { background: rgba(5,17,30,0.96); backdrop-filter: blur(20px); padding: 14px 60px; border-bottom-color: rgba(201,168,76,0.12); }
.vi-nav-logo { font-family: var(--fd); font-size: 1.5rem; font-weight: 500; letter-spacing: 0.15em; color: var(--w); cursor: pointer; }
.vi-nav-logo em { color: var(--g400); font-style: normal; }
.vi-nav-links { display: flex; gap: 36px; list-style: none; }
.vi-nav-links a { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--w60); text-decoration: none; transition: color 0.3s; cursor: pointer; }
.vi-nav-links a:hover { color: var(--g300); }
.vi-nav-cta { font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; background: transparent; border: 1px solid var(--g400); color: var(--g400); padding: 9px 22px; cursor: pointer; font-family: var(--fb); transition: background 0.3s, color 0.3s; }
.vi-nav-cta:hover { background: var(--g400); color: var(--n900); }
.vi-nav-hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 6px; }
.vi-nav-hamburger span { display: block; width: 24px; height: 1.5px; background: var(--w60); transition: all 0.35s var(--ease); transform-origin: center; }
.vi-nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: var(--g400); }
.vi-nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.vi-nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: var(--g400); }
.vi-drawer { position: fixed; inset: 0; z-index: 300; background: rgba(3,10,20,0.97); backdrop-filter: blur(24px); display: flex; flex-direction: column; align-items: center; justify-content: center; transform: translateX(100%); transition: transform 0.45s var(--ease); pointer-events: none; }
.vi-drawer.open { transform: translateX(0); pointer-events: all; }
.vi-drawer-brand { font-family: var(--fd); font-size: 1.3rem; letter-spacing: .18em; color: var(--w); margin-bottom: 44px; opacity: 0; transform: translateY(10px); transition: opacity .4s .1s, transform .4s .1s; cursor: pointer; }
.vi-drawer.open .vi-drawer-brand { opacity: 1; transform: translateY(0); }
.vi-drawer-brand em { color: var(--g400); font-style: normal; }
.vi-dlink { font-family: var(--fd); font-size: clamp(2rem,8vw,3rem); font-weight: 300; color: var(--w60); background: none; border: none; padding: 10px 0; cursor: pointer; display: block; width: 100%; text-align: center; opacity: 0; transform: translateY(18px); transition: color .3s, opacity .4s var(--ease), transform .4s var(--ease); }
.vi-drawer.open .vi-dlink { opacity: 1; transform: translateY(0); }
.vi-drawer.open .vi-dlink:nth-of-type(1){transition-delay:.12s} .vi-drawer.open .vi-dlink:nth-of-type(2){transition-delay:.17s} .vi-drawer.open .vi-dlink:nth-of-type(3){transition-delay:.22s} .vi-drawer.open .vi-dlink:nth-of-type(4){transition-delay:.27s} .vi-drawer.open .vi-dlink:nth-of-type(5){transition-delay:.32s}
.vi-dlink:hover { color: var(--g400); }
.vi-drawer-div { width: 40px; height: 1px; background: rgba(201,168,76,.25); margin: 18px 0; opacity: 0; transition: opacity .4s .34s; }
.vi-drawer.open .vi-drawer-div { opacity: 1; }
.vi-dcta { font-family: var(--fb); font-size: .7rem; letter-spacing: .18em; text-transform: uppercase; color: var(--g400); border: 1px solid var(--g400); background: none; padding: 12px 32px; cursor: pointer; margin-top: 8px; opacity: 0; transform: translateY(18px); transition: color .3s, background .3s, opacity .4s .38s, transform .4s .38s; }
.vi-drawer.open .vi-dcta { opacity: 1; transform: translateY(0); }
.vi-dcta:hover { background: var(--g400); color: var(--n900); }

/* ── HERO ── */
.vi-hero { min-height: 100vh; position: relative; overflow: hidden; display: grid; grid-template-columns: 1fr 1fr; align-items: flex-end; padding: 0 60px 80px; gap: 60px; }
.vi-hero-canvas { position: absolute; inset: 0; z-index: 0; }
.vi-hero-left { position: relative; z-index: 2; padding-top: 160px; }
.vi-hero-right { position: relative; z-index: 2; padding-top: 160px; display: flex; align-items: flex-end; justify-content: flex-end; }
.vi-hero-eyebrow { display: inline-flex; align-items: center; gap: 10px; font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--g400); border: 1px solid rgba(201,168,76,0.28); padding: 7px 16px; margin-bottom: 32px; opacity: 0; transform: translateY(16px); animation: viUp 1s var(--ease) 0.2s forwards; }
.vi-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--g400); animation: viBlink 2s infinite; }
.vi-hero-h1 { font-family: var(--fd); font-weight: 300; line-height: 0.88; letter-spacing: -0.02em; color: var(--w); font-size: clamp(4rem, 9vw, 8rem); margin-bottom: 20px; opacity: 0; transform: translateY(20px); animation: viUp 1.1s var(--ease) 0.35s forwards; }
.vi-hero-h1 em { display: block; color: var(--g400); font-style: italic; }
.vi-hero-sub { font-family: var(--fd); font-size: 1rem; color: var(--w60); font-style: italic; margin-bottom: 32px; opacity: 0; animation: viUp 1s var(--ease) 0.5s forwards; }
.vi-hero-desc { font-size: 0.88rem; color: var(--w60); line-height: 1.85; max-width: 520px; margin-bottom: 36px; opacity: 0; animation: viUp 1s var(--ease) 0.65s forwards; }
.vi-hero-desc strong { color: var(--w80); font-weight: 400; }
.vi-hero-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 36px; opacity: 0; animation: viUp 1s var(--ease) 0.75s forwards; }
.vi-hero-tag { font-size: 0.6rem; letter-spacing: 0.16em; text-transform: uppercase; padding: 6px 14px; border: 1px solid rgba(201,168,76,0.25); color: var(--g300); }
.vi-hero-btns { display: flex; gap: 14px; flex-wrap: wrap; opacity: 0; animation: viUp 1s var(--ease) 0.85s forwards; }
.vi-btn-gold { padding: 15px 36px; background: var(--g400); color: var(--n900); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.vi-btn-gold:hover { background: var(--g300); transform: translateY(-2px); }
.vi-btn-ghost { padding: 15px 36px; background: transparent; color: var(--w60); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--w12); cursor: pointer; transition: all 0.3s; }
.vi-btn-ghost:hover { border-color: var(--w30); color: var(--w); transform: translateY(-2px); }

/* Hero right stat panel */
.vi-stat-panel { background: rgba(9,25,40,0.88); backdrop-filter: blur(16px); border: 1px solid rgba(201,168,76,0.22); padding: 44px 40px; min-width: 260px; position: relative; overflow: hidden; }
.vi-stat-panel::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(201,168,76,0.06), transparent); pointer-events: none; }
.vi-stat-panel-row { display: flex; flex-direction: column; gap: 28px; }
.vi-stat-item { border-bottom: 1px solid var(--w06); padding-bottom: 24px; }
.vi-stat-item:last-child { border-bottom: none; padding-bottom: 0; }
.vi-stat-val { font-family: var(--fd); font-size: 3.2rem; font-weight: 300; color: var(--g400); line-height: 1; display: block; }
.vi-stat-key { font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--w30); margin-top: 4px; display: block; }

/* ── STATS BAR ── */
.vi-stats-bar { background: var(--n800); padding: 0 60px; display: grid; grid-template-columns: repeat(5,1fr); border-bottom: 1px solid var(--w06); }
.vi-sbar { padding: 32px 0; text-align: center; border-right: 1px solid var(--w06); }
.vi-sbar:last-child { border-right: none; }
.vi-sbar-val { font-family: var(--fd); font-size: 2.2rem; font-weight: 300; color: var(--g400); display: block; line-height: 1; }
.vi-sbar-key { font-size: 0.62rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--w30); margin-top: 6px; display: block; }

/* ── VISA TYPES ── */
.vi-types { background: var(--n900); padding: 100px 60px; }
.vi-section-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--g400); margin-bottom: 16px; display: block; }
.vi-section-h2 { font-family: var(--fd); font-size: clamp(2.2rem,4vw,3.8rem); font-weight: 300; line-height: 1.1; color: var(--w); margin-bottom: 60px; }
.vi-section-h2 em { color: var(--g400); font-style: italic; }
.vi-types-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 2px; background: var(--w06); }
.vi-type-card { background: var(--n800); padding: 44px 36px; position: relative; overflow: hidden; transition: background 0.4s var(--ease); cursor: default; }
.vi-type-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, var(--glow2), transparent); opacity: 0; transition: opacity 0.4s; }
.vi-type-card:hover { background: var(--n750); }
.vi-type-card:hover::before { opacity: 1; }
.vi-type-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--g400); transform: scaleX(0); transform-origin: left; transition: transform 0.5s var(--ease); }
.vi-type-card:hover::after { transform: scaleX(1); }
.vi-type-icon { font-size: 2rem; margin-bottom: 20px; display: block; }
.vi-type-num { font-family: var(--fd); font-size: 0.65rem; letter-spacing: 0.28em; color: rgba(201,168,76,0.4); margin-bottom: 12px; display: block; transition: color 0.3s; }
.vi-type-card:hover .vi-type-num { color: var(--g400); }
.vi-type-title { font-family: var(--fd); font-size: 1.45rem; font-weight: 400; color: var(--w); margin-bottom: 12px; line-height: 1.2; }
.vi-type-desc { font-size: 0.8rem; color: var(--w60); line-height: 1.75; margin-bottom: 18px; }
.vi-type-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.vi-type-tag { font-size: 0.58rem; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 9px; border: 1px solid var(--w06); color: var(--w30); transition: all 0.3s; }
.vi-type-card:hover .vi-type-tag { border-color: rgba(201,168,76,0.18); color: var(--w60); }

/* ── WHAT'S INCLUDED ── */
.vi-includes { background: var(--n800); padding: 100px 60px; }
.vi-includes-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
.vi-includes-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--w06); margin-top: 52px; }
.vi-include-card { background: var(--n800); padding: 32px 28px; transition: background 0.3s; }
.vi-include-card:hover { background: var(--n750); }
.vi-include-icon { font-size: 1.6rem; margin-bottom: 14px; display: block; }
.vi-include-title { font-size: 0.88rem; font-weight: 500; color: var(--w); margin-bottom: 8px; }
.vi-include-desc { font-size: 0.76rem; color: var(--w60); line-height: 1.7; }

/* Timeline visual */
.vi-timeline { position: relative; }
.vi-timeline-title { font-family: var(--fd); font-size: 1.4rem; color: var(--w); margin-bottom: 6px; }
.vi-timeline-sub { font-size: 0.78rem; color: var(--w30); margin-bottom: 36px; letter-spacing: 0.06em; }
.vi-tl-items { display: flex; flex-direction: column; gap: 0; }
.vi-tl-item { display: grid; grid-template-columns: 56px 1fr; gap: 0; position: relative; }
.vi-tl-left { display: flex; flex-direction: column; align-items: center; }
.vi-tl-dot { width: 12px; height: 12px; border-radius: 50%; border: 2px solid var(--g400); background: var(--n800); flex-shrink: 0; margin-top: 4px; transition: background 0.3s; }
.vi-tl-item:hover .vi-tl-dot { background: var(--g400); }
.vi-tl-line { width: 1px; flex: 1; background: rgba(201,168,76,0.15); margin-top: 4px; }
.vi-tl-item:last-child .vi-tl-line { display: none; }
.vi-tl-body { padding: 0 0 32px 20px; }
.vi-tl-step { font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--g400); margin-bottom: 6px; display: block; }
.vi-tl-name { font-size: 0.92rem; font-weight: 500; color: var(--w); margin-bottom: 6px; }
.vi-tl-desc { font-size: 0.76rem; color: var(--w60); line-height: 1.7; }
.vi-tl-time { font-size: 0.6rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--g400); margin-top: 8px; display: inline-block; border: 1px solid rgba(201,168,76,0.2); padding: 3px 10px; }

/* ── PACKAGES ── */
.vi-packages { background: var(--cream-bg); padding: 100px 60px; position: relative; overflow: hidden; }
.vi-packages::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, transparent, var(--g400), transparent); opacity: 0.5; }
.vi-pkg-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: #8A6820; margin-bottom: 16px; display: block; }
.vi-pkg-h2 { font-family: var(--fd); font-size: clamp(2.2rem,4vw,3.5rem); font-weight: 300; color: var(--cream-ink); line-height: 1.1; margin-bottom: 60px; }
.vi-pkg-h2 em { color: var(--g400); font-style: italic; }
.vi-pkgs-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
.vi-pkg { background: var(--cream-bg); border: 1px solid var(--cream-bdr); padding: 44px 36px; display: flex; flex-direction: column; transition: all 0.35s var(--ease); box-shadow: 0 2px 12px rgba(120,90,30,0.06); cursor: pointer; }
.vi-pkg:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(120,90,30,0.14); border-color: rgba(201,168,76,0.45); }
.vi-pkg.featured { background: var(--n900); border: 1px solid rgba(201,168,76,0.35); box-shadow: 0 8px 40px rgba(0,0,0,0.22); }
.vi-pkg.featured:hover { border-color: var(--g400); }
.vi-pkg-badge { font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; padding: 4px 10px; width: fit-content; margin-bottom: 22px; border: 1px solid; font-weight: 500; }
.vi-pkg:not(.featured) .vi-pkg-badge { border-color: var(--cream-bdr); color: var(--cream-ink3); background: var(--cream-200); }
.vi-pkg.featured .vi-pkg-badge { border-color: var(--g400); color: var(--g400); background: rgba(201,168,76,0.08); }
.vi-pkg-name { font-family: var(--fd); font-size: 1.7rem; font-weight: 400; margin-bottom: 8px; }
.vi-pkg:not(.featured) .vi-pkg-name { color: var(--cream-ink); }
.vi-pkg.featured .vi-pkg-name { color: var(--w); }
.vi-pkg-tagline { font-size: 0.78rem; margin-bottom: 28px; }
.vi-pkg:not(.featured) .vi-pkg-tagline { color: var(--cream-ink3); }
.vi-pkg.featured .vi-pkg-tagline { color: var(--w60); }
.vi-pkg-div { height: 1px; margin-bottom: 28px; }
.vi-pkg:not(.featured) .vi-pkg-div { background: var(--cream-bdr); }
.vi-pkg.featured .vi-pkg-div { background: var(--w06); }
.vi-pkg-feats { list-style: none; display: flex; flex-direction: column; gap: 11px; flex: 1; margin-bottom: 32px; }
.vi-pkg-feat { display: flex; align-items: flex-start; gap: 11px; font-size: 0.8rem; line-height: 1.5; }
.vi-pkg:not(.featured) .vi-pkg-feat { color: var(--cream-ink2); }
.vi-pkg.featured .vi-pkg-feat { color: var(--w80); }
.vi-feat-chk { flex-shrink: 0; margin-top: 2px; font-size: 0.75rem; }
.vi-pkg:not(.featured) .vi-feat-chk.yes { color: #8A6820; }
.vi-pkg.featured .vi-feat-chk.yes { color: var(--g400); }
.vi-feat-chk.no { color: rgba(180,150,90,0.3); }
.vi-pkg-cta { padding: 13px 20px; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; font-family: var(--fb); cursor: pointer; transition: all 0.3s; width: 100%; font-weight: 500; }
.vi-pkg:not(.featured) .vi-pkg-cta { background: transparent; border: 1px solid var(--cream-bdr); color: var(--cream-ink2); }
.vi-pkg:not(.featured) .vi-pkg-cta:hover { border-color: var(--g400); color: var(--cream-ink); background: var(--cream-200); }
.vi-pkg.featured .vi-pkg-cta { background: var(--g400); border: none; color: var(--n900); }
.vi-pkg.featured .vi-pkg-cta:hover { background: var(--g300); }

/* ── FAQ ── */
.vi-faq { background: var(--n900); padding: 100px 60px; }
.vi-faq-inner { display: grid; grid-template-columns: 1fr 1.6fr; gap: 80px; align-items: start; }
.vi-faq-list { display: flex; flex-direction: column; }
.vi-faq-item { border-top: 1px solid var(--w06); }
.vi-faq-item:last-child { border-bottom: 1px solid var(--w06); }
.vi-faq-q { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 22px 0; cursor: pointer; }
.vi-faq-q-text { font-size: 0.9rem; font-weight: 400; color: var(--w); transition: color 0.3s; }
.vi-faq-item.open .vi-faq-q-text { color: var(--g400); }
.vi-faq-icon { width: 28px; height: 28px; border: 1px solid var(--w12); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--w30); flex-shrink: 0; transition: all 0.4s var(--ease); }
.vi-faq-item.open .vi-faq-icon { background: var(--g400); border-color: var(--g400); color: var(--n900); transform: rotate(45deg); }
.vi-faq-a { font-size: 0.82rem; color: var(--w60); line-height: 1.82; padding-bottom: 22px; max-height: 0; overflow: hidden; transition: max-height 0.5s var(--ease); }
.vi-faq-item.open .vi-faq-a { max-height: 300px; }

/* ── CTA ── */
.vi-cta { background: var(--cream-bg); padding: 120px 60px; text-align: center; position: relative; overflow: hidden; }
.vi-cta::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(180,150,90,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(180,150,90,0.06) 1px, transparent 1px); background-size: 60px 60px; }
.vi-cta::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.09), transparent); pointer-events: none; }
.vi-cta-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
.vi-cta-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: #8A6820; margin-bottom: 20px; display: block; }
.vi-cta-h2 { font-family: var(--fd); font-size: clamp(2.5rem,5vw,4.2rem); font-weight: 300; color: var(--cream-ink); line-height: 1.1; margin-bottom: 12px; }
.vi-cta-h2 em { color: var(--g400); font-style: italic; }
.vi-cta-divider { width: 44px; height: 1px; background: var(--g400); margin: 24px auto; opacity: 0.5; }
.vi-cta-p { font-size: 0.84rem; color: var(--cream-ink3); line-height: 1.85; margin-bottom: 44px; }
.vi-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.vi-btn-dark { padding: 15px 40px; background: var(--cream-ink); color: var(--cream-bg); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.vi-btn-dark:hover { background: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }
.vi-btn-outline { padding: 15px 40px; background: transparent; color: var(--cream-ink2); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--cream-bdr); cursor: pointer; transition: all 0.3s; }
.vi-btn-outline:hover { border-color: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }

/* ── FOOTER ── */
.vi-footer { background: var(--n950); padding: 52px 60px; border-top: 1px solid var(--w06); }
.vi-footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
.vi-footer-logo { font-family: var(--fd); font-size: 1.3rem; letter-spacing: 0.15em; color: var(--w); }
.vi-footer-logo em { color: var(--g400); font-style: normal; }
.vi-footer-copy { font-size: 0.68rem; color: var(--w30); }
.vi-wa { position: fixed; bottom: 28px; right: 28px; z-index: 300; width: 50px; height: 50px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 18px rgba(37,211,102,0.4); transition: transform 0.3s; }
.vi-wa:hover { transform: scale(1.1); }

/* ── REVEAL ── */
.vi-reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.85s var(--ease), transform 0.85s var(--ease); }
.vi-reveal.in { opacity: 1; transform: translateY(0); }
.vi-d1{transition-delay:0.05s} .vi-d2{transition-delay:0.15s} .vi-d3{transition-delay:0.25s} .vi-d4{transition-delay:0.35s}

@keyframes viUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes viBlink { 0%,100%{opacity:1} 50%{opacity:0.3} }

/* ── RESPONSIVE ── */
@media(max-width:1000px){
  .vi-hero{grid-template-columns:1fr;padding:120px 40px 60px}
  .vi-hero-right{justify-content:flex-start}
  .vi-types-grid{grid-template-columns:1fr 1fr}
  .vi-includes-inner{grid-template-columns:1fr}
  .vi-faq-inner{grid-template-columns:1fr;gap:48px}
  .vi-pkgs-grid{grid-template-columns:1fr}
  .vi-stats-bar{grid-template-columns:repeat(3,1fr)}
}
@media(max-width:768px){
  .vi-nav{padding:16px 24px} .vi-nav.scrolled{padding:12px 24px}
  .vi-nav-links{display:none} .vi-nav-cta{display:none} .vi-nav-hamburger{display:flex}
  .vi-hero{padding:100px 24px 52px}
  .vi-types{padding:70px 24px} .vi-types-grid{grid-template-columns:1fr}
  .vi-includes{padding:70px 24px} .vi-includes-grid{grid-template-columns:1fr}
  .vi-packages,.vi-faq,.vi-cta{padding:70px 24px}
  .vi-footer{padding:40px 24px}
  .vi-stats-bar{padding:0 24px;grid-template-columns:1fr 1fr}
}
`;

// ── DATA ──────────────────────────────────────────────────────
const VISA_TYPES = [
  {
    icon: "💼", num: "01", title: "Investor Visa",
    desc: "For company owners and shareholders in UAE free zones or mainland. Linked to your trade license — full 2-year residency with Emirates ID.",
    tags: ["Free Zone", "Mainland", "2-Year Validity", "Renewable"],
  },
  {
    icon: "👔", num: "02", title: "Employment Visa",
    desc: "For employees sponsored by a UAE-registered company. Includes labour contract, MOHRE registration, medical, biometrics, and residence stamp.",
    tags: ["Labour Contract", "MOHRE", "Work Permit", "All Sectors"],
  },
  {
    icon: "👨‍👩‍👧", num: "03", title: "Dependent / Family Visa",
    desc: "Sponsor your spouse, children, and parents under your UAE residency. Full family residency management from entry permit to Emirates ID.",
    tags: ["Spouse", "Children", "Parents", "Emirates ID"],
  },
  {
    icon: "🔄", num: "04", title: "Visa Renewal",
    desc: "Timely renewal of investor, employment, and dependent visas before expiry — avoiding fines, overstay penalties, and status complications.",
    tags: ["Before Expiry", "Fine Avoidance", "All Visa Types", "Express Option"],
  },
  {
    icon: "❌", num: "05", title: "Visa Cancellation",
    desc: "Clean, compliant visa cancellation for employees, dependents, and business owners — including labour ban clearance and final exit processing.",
    tags: ["Labour Ban Check", "Final Exit", "No Complications", "Same Day"],
  },
  {
    icon: "🎓", num: "06", title: "Student Visa",
    desc: "UAE student visas for enrolment in government or private universities — including KHDA-approved institutions across all seven emirates.",
    tags: ["KHDA Approved", "University", "All Emirates", "Renewable"],
  },
  {
    icon: "🏠", num: "07", title: "Domestic Worker Visa",
    desc: "Sponsorship and visa processing for housemaids, drivers, nannies, and domestic helpers under personal or corporate sponsorship.",
    tags: ["Housemaid", "Driver", "Nanny", "MOHRE Approved"],
  },
  {
    icon: "📋", num: "08", title: "Status Change",
    desc: "Change your UAE visa status — tourist to residency, visit to employment — without exiting the country where permitted by GDRFA.",
    tags: ["In-Country", "GDRFA Approved", "Tourist to Resident", "Visit to Work"],
  },
];

const INCLUDES = [
  { icon: "📄", title: "Entry Permit", desc: "Initial entry permission issued before you arrive in the UAE — or while on visit visa inside the country." },
  { icon: "🏥", title: "Medical Fitness Test", desc: "Mandatory medical examination at an approved UAE health authority centre — we book and coordinate your appointment." },
  { icon: "🖐️", title: "Biometric Registration", desc: "Fingerprint and photo capture at ICA or GDRFA — required for all UAE residents. We accompany or guide remotely." },
  { icon: "🪪", title: "Emirates ID", desc: "Federal identity card — required for all banking, healthcare, government, and daily services in the UAE." },
  { icon: "🏷️", title: "Residence Stamping", desc: "UAE residence visa stamp in your passport — the final confirmation of your legal residency status." },
  { icon: "🛡️", title: "Health Insurance", desc: "Mandatory health insurance in Dubai and Abu Dhabi — we coordinate appropriate plans during visa processing." },
  { icon: "📋", title: "Labour Contract", desc: "Employment contracts registered with MOHRE — required for all employment visa categories." },
  { icon: "🔗", title: "Authority Liaison", desc: "Direct communication with ICA, GDRFA, MOHRE, and free zone authorities — no portals, no queues for you." },
];

const TIMELINE = [
  { step: "Day 1–2", name: "Document Collection", desc: "Passport copies, photos, existing visa details, sponsor documents — all collected and verified.", time: "1–2 Days" },
  { step: "Day 2–4", name: "Entry Permit / Change Status", desc: "Entry permit applied or in-country status change submitted to ICA/GDRFA.", time: "2–4 Days" },
  { step: "Day 4–7", name: "Medical & Biometrics", desc: "Medical fitness test and biometric scan appointments coordinated and completed.", time: "2–3 Days" },
  { step: "Day 7–12", name: "Emirates ID Application", desc: "Emirates ID application submitted at ICA — production takes 5–7 working days.", time: "5–7 Days" },
  { step: "Day 10–14", name: "Residence Stamp", desc: "Residence visa stamped in passport — official UAE residency confirmed.", time: "1–2 Days" },
  { step: "Day 14–18", name: "Emirates ID Collection", desc: "Emirates ID card collected or delivered — full process complete.", time: "1–2 Days" },
];

const PACKAGES = [
  {
    name: "Single Visa",
    tagline: "One applicant, fully managed",
    badge: null,
    featured: false,
    features: [
      { text: "Entry permit processing", yes: true },
      { text: "Medical appointment coordination", yes: true },
      { text: "Biometrics & Emirates ID", yes: true },
      { text: "Residence visa stamping", yes: true },
      { text: "Health insurance coordination", yes: false },
      { text: "Dedicated relationship manager", yes: false },
    ],
  },
  {
    name: "Business Pack",
    tagline: "Investor visa + up to 3 employees",
    badge: "Most Popular",
    featured: true,
    features: [
      { text: "Investor visa processing", yes: true },
      { text: "Up to 3 employee visas", yes: true },
      { text: "All biometrics & Emirates IDs", yes: true },
      { text: "Labour contracts & MOHRE", yes: true },
      { text: "Health insurance coordination", yes: true },
      { text: "Dedicated relationship manager", yes: true },
    ],
  },
  {
    name: "Family Bundle",
    tagline: "Investor + spouse + children",
    badge: "Best Value",
    featured: false,
    features: [
      { text: "Investor visa processing", yes: true },
      { text: "Spouse visa included", yes: true },
      { text: "Children visas (all ages)", yes: true },
      { text: "All Emirates IDs included", yes: true },
      { text: "Health insurance for all", yes: true },
      { text: "Annual renewal reminders", yes: true },
    ],
  },
];

const FAQS = [
  { q: "How long does a UAE investor visa take to process?", a: "An investor visa typically takes 10–14 working days from document submission to residence stamp in your passport. Emirates ID delivery takes an additional 5–7 working days. We provide real-time updates throughout the process." },
  { q: "Can I process my UAE visa without leaving the country?", a: "Yes, in many cases. If you are already in the UAE on a visit or tourist visa, we can process an in-country status change to residency through GDRFA — avoiding the need for a border run or exit." },
  { q: "How many dependents can I sponsor on my UAE visa?", a: "There is no fixed limit on dependents. You can sponsor your spouse, children of all ages, and parents. The key requirement is that your monthly income meets the minimum salary threshold (AED 4,000–6,000 depending on the emirate)." },
  { q: "What happens if my UAE visa expires?", a: "Overstaying a UAE visa attracts daily fines of AED 50–200 depending on visa type, plus a possible travel ban. We provide expiry alerts and manage renewals well before the deadline to avoid penalties." },
  { q: "Can employees be sponsored by a free zone company?", a: "Yes. Free zone companies can sponsor employees up to their visa quota. The process goes through the free zone authority rather than MOHRE — we manage both pathways depending on your company structure." },
  { q: "Is health insurance mandatory for UAE residency?", a: "In Dubai and Abu Dhabi, health insurance is legally mandatory for all residents. Sponsors are responsible for providing coverage. We coordinate appropriate health plans during visa processing — including affordable group plans for businesses." },
];

// ── CANVAS ──────────────────────────────────────────────────
function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let W, H, raf, t = 0;
    const pts = Array.from({ length: 55 }, () => ({ x: Math.random() * 1920, y: Math.random() * 1080, vx: (Math.random() - .5) * 0.18, vy: (Math.random() - .5) * 0.18, r: Math.random() * 1.4 + 0.4, o: Math.random() * 0.38 + 0.1 }));
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      t += 0.004; ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, W, H); bg.addColorStop(0, "#05111e"); bg.addColorStop(1, "#020b14"); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      [[0.1, 0.3, "#C9A84C", 0.05, 11], [0.8, 0.2, "#163354", 0.45, 9], [0.55, 0.75, "#C9A84C", 0.04, 14]].forEach(([bx, by, col, a, spd], i) => { const x = W * bx + Math.sin(t * (spd / 10) + i * 2) * 70, y = H * by + Math.cos(t * (spd / 13) + i) * 50, r = Math.min(W, H) * 0.6, g = ctx.createRadialGradient(x, y, 0, x, y, r), rgb = parseInt(col.slice(1), 16); g.addColorStop(0, `rgba(${rgb >> 16},${(rgb >> 8) & 255},${rgb & 255},${a})`); g.addColorStop(1, "rgba(0,0,0,0)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); });
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
  return <canvas ref={ref} className="vi-hero-canvas" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".vi-reveal");
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } }), { threshold: 0.07 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ── MAIN ─────────────────────────────────────────────────────
export default function VisaImmigrationPage({ onBack, onNavigate }) {
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
    <div className="vi-root">
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`vi-nav${scrolled ? " scrolled" : ""}`}>
        <div className="vi-nav-logo" onClick={() => go("home")}>INCO<em>ZONE</em></div>
        <ul className="vi-nav-links">{navLinks.map(l => <li key={l.label}><a onClick={() => go(l.page)}>{l.label}</a></li>)}</ul>
        <button className="vi-nav-cta" onClick={() => go("schedule")}>Schedule Consultation</button>
        <button className={`vi-nav-hamburger${drawerOpen ? " open" : ""}`} onClick={() => setDrawerOpen(o => !o)} aria-label="Toggle menu"><span /><span /><span /></button>
      </nav>

      {/* DRAWER */}
      <div className={`vi-drawer${drawerOpen ? " open" : ""}`}>
        <div className="vi-drawer-brand" onClick={() => go("home")}>INCO<em>ZONE</em></div>
        {navLinks.map(l => <button key={l.label} className="vi-dlink" onClick={() => go(l.page)}>{l.label}</button>)}
        <div className="vi-drawer-div" />
        <button className="vi-dcta" onClick={() => go("schedule")}>Schedule Consultation</button>
      </div>

      {/* HERO */}
      <section className="vi-hero">
        <HeroCanvas />
        <div className="vi-hero-left">
          <div className="vi-hero-eyebrow"><div className="vi-eyebrow-dot" />Residency & Immigration · UAE</div>
          <h1 className="vi-hero-h1">Visa &<br /><em>Immigration</em><br />Services.</h1>
          <div className="vi-hero-sub">Complete UAE Visa Management — End to End</div>
          <p className="vi-hero-desc">Complete UAE visa management — <strong>investor visas, employment visas, dependent visas, visa renewals, and cancellations.</strong> Entry permit, medical fitness, biometric registration, Emirates ID, and residence stamping all managed under one roof. Average investor visa timeline: 10 working days.</p>
          <div className="vi-hero-tags">
            {["Investor Visa", "Employment Visa", "Dependent Visa", "Visa Renewal", "Visa Cancellation", "Emirates ID", "Entry Permit", "Medical Test"].map(t => <span className="vi-hero-tag" key={t}>{t}</span>)}
          </div>
          <div className="vi-hero-btns">
            <button className="vi-btn-gold" onClick={() => go("schedule")}>Start Visa Application →</button>
            <button className="vi-btn-ghost" onClick={() => onBack && onBack()}>← Back to Services</button>
          </div>
        </div>
        <div className="vi-hero-right">
          <div className="vi-stat-panel">
            <div className="vi-stat-panel-row">
              <div className="vi-stat-item"><span className="vi-stat-val">10</span><span className="vi-stat-key">Days Average — Investor Visa</span></div>
              <div className="vi-stat-item"><span className="vi-stat-val">8</span><span className="vi-stat-key">Visa Types Managed</span></div>
              <div className="vi-stat-item"><span className="vi-stat-val">100%</span><span className="vi-stat-key">Government Liaison Handled</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="vi-stats-bar">
        {[{ val: "10 Days", key: "Investor Visa" }, { val: "8 Types", key: "Visa Categories" }, { val: "0 Queues", key: "You Visit Nothing" }, { val: "7 Emirates", key: "Full Coverage" }, { val: "96%", key: "First-Time Approval" }].map((s, i) => (
          <div className="vi-sbar" key={i}><span className="vi-sbar-val">{s.val}</span><span className="vi-sbar-key">{s.key}</span></div>
        ))}
      </div>

      {/* VISA TYPES */}
      <section className="vi-types">
        <div className="vi-reveal">
          <span className="vi-section-label">Visa Categories</span>
          <h2 className="vi-section-h2">Every UAE Visa Type,<br /><em>Fully Managed.</em></h2>
        </div>
        <div className="vi-types-grid">
          {VISA_TYPES.map((v, i) => (
            <div className={`vi-type-card vi-reveal vi-d${(i % 4) + 1}`} key={i}>
              <span className="vi-type-icon">{v.icon}</span>
              <span className="vi-type-num">{v.num}</span>
              <div className="vi-type-title">{v.title}</div>
              <p className="vi-type-desc">{v.desc}</p>
              <div className="vi-type-tags">{v.tags.map(t => <span className="vi-type-tag" key={t}>{t}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* INCLUDES + TIMELINE */}
      <section className="vi-includes">
        <div className="vi-includes-inner">
          <div>
            <div className="vi-reveal">
              <span className="vi-section-label">What's Included</span>
              <h2 className="vi-section-h2" style={{ marginBottom: "0" }}>Every Step<br /><em>Covered.</em></h2>
            </div>
            <div className="vi-includes-grid">
              {INCLUDES.map((inc, i) => (
                <div className={`vi-include-card vi-reveal vi-d${(i % 2) + 1}`} key={i}>
                  <span className="vi-include-icon">{inc.icon}</span>
                  <div className="vi-include-title">{inc.title}</div>
                  <p className="vi-include-desc">{inc.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="vi-timeline vi-reveal vi-d2">
            <div className="vi-timeline-title">Processing Timeline</div>
            <div className="vi-timeline-sub">Investor Visa — Typical Journey</div>
            <div className="vi-tl-items">
              {TIMELINE.map((tl, i) => (
                <div className="vi-tl-item" key={i}>
                  <div className="vi-tl-left"><div className="vi-tl-dot" /><div className="vi-tl-line" /></div>
                  <div className="vi-tl-body">
                    <span className="vi-tl-step">{tl.step}</span>
                    <div className="vi-tl-name">{tl.name}</div>
                    <p className="vi-tl-desc">{tl.desc}</p>
                    <span className="vi-tl-time">{tl.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="vi-packages">
        <span className="vi-pkg-label vi-reveal">Service Packages</span>
        <h2 className="vi-pkg-h2 vi-reveal vi-d1">Choose Your<br /><em>Visa Package</em></h2>
        <div className="vi-pkgs-grid">
          {PACKAGES.map((pkg, i) => (
            <div className={`vi-pkg vi-reveal vi-d${i + 1}${pkg.featured ? " featured" : ""}`} key={i}>
              {pkg.badge && <div className="vi-pkg-badge">{pkg.badge}</div>}
              <div className="vi-pkg-name">{pkg.name}</div>
              <p className="vi-pkg-tagline">{pkg.tagline}</p>
              <div className="vi-pkg-div" />
              <ul className="vi-pkg-feats">
                {pkg.features.map((f, j) => (
                  <li className="vi-pkg-feat" key={j}>
                    <span className={`vi-feat-chk ${f.yes ? "yes" : "no"}`}>{f.yes ? "✓" : "×"}</span>
                    <span style={{ color: pkg.featured ? (f.yes ? "var(--w80)" : "rgba(248,245,238,0.25)") : (f.yes ? "var(--cream-ink2)" : "var(--cream-bdr)") }}>{f.text}</span>
                  </li>
                ))}
              </ul>
              <button className="vi-pkg-cta" onClick={() => go("schedule")}>{pkg.featured ? "Get Started →" : "Learn More →"}</button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="vi-faq">
        <div className="vi-faq-inner">
          <div className="vi-reveal">
            <span className="vi-section-label">Common Questions</span>
            <h2 className="vi-section-h2" style={{ marginBottom: "24px" }}>Visa &<br /><em>Immigration FAQ</em></h2>
            <p style={{ fontSize: "0.82rem", color: "var(--w60)", lineHeight: "1.8", marginBottom: "40px" }}>Answers to the most common questions we receive about UAE visa and immigration services.</p>
            <button className="vi-btn-gold" onClick={() => go("schedule")}>Free Consultation →</button>
          </div>
          <div className="vi-faq-list vi-reveal vi-d2">
            {FAQS.map((f, i) => (
              <div className={`vi-faq-item${openFaq === i ? " open" : ""}`} key={i}>
                <div className="vi-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="vi-faq-q-text">{f.q}</span>
                  <div className="vi-faq-icon">+</div>
                </div>
                <div className="vi-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="vi-cta">
        <div className="vi-cta-inner">
          <span className="vi-cta-label vi-reveal">Start Today</span>
          <h2 className="vi-cta-h2 vi-reveal vi-d1">Your UAE Visa,<br /><em>Handled Completely.</em></h2>
          <div className="vi-cta-divider" />
          <p className="vi-cta-p vi-reveal vi-d2">No government offices. No queues. No confusion. We manage every step — from entry permit to Emirates ID in your hands.</p>
          <div className="vi-cta-btns vi-reveal vi-d3">
            <button className="vi-btn-dark" onClick={() => go("schedule")}>Schedule Private Consultation</button>
            <button className="vi-btn-outline" onClick={() => onBack && onBack()}>← Back to Services</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="vi-footer">
        <div className="vi-footer-inner">
          <div className="vi-footer-logo">INCO<em>ZONE</em></div>
          <div className="vi-footer-copy">© 2026 INCOZONE. All rights reserved. Dubai, UAE.</div>
        </div>
      </footer>

      <div className="vi-wa">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </div>
    </div>
  );
}
