import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — UAE WILL Registration Page
//  Drop into: src/pages/WillRegistration.jsx
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

.wr-root *, .wr-root *::before, .wr-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.wr-root {
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
.wr-nav { position: fixed; inset-inline: 0; top: 0; z-index: 200; display: flex; align-items: center; justify-content: space-between; padding: 22px 60px; transition: background 0.5s, padding 0.4s, border-color 0.5s; border-bottom: 1px solid transparent; }
.wr-nav.scrolled { background: rgba(5,17,30,0.96); backdrop-filter: blur(20px); padding: 14px 60px; border-bottom-color: rgba(201,168,76,0.12); }
.wr-nav-logo { font-family: var(--fd); font-size: 1.5rem; font-weight: 500; letter-spacing: 0.15em; color: var(--w); cursor: pointer; }
.wr-nav-logo em { color: var(--g400); font-style: normal; }
.wr-nav-links { display: flex; gap: 36px; list-style: none; }
.wr-nav-links a { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--w60); text-decoration: none; transition: color 0.3s; cursor: pointer; }
.wr-nav-links a:hover { color: var(--g300); }
.wr-nav-cta { font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; background: transparent; border: 1px solid var(--g400); color: var(--g400); padding: 9px 22px; cursor: pointer; font-family: var(--fb); transition: background 0.3s, color 0.3s; }
.wr-nav-cta:hover { background: var(--g400); color: var(--n900); }
.wr-nav-hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 6px; }
.wr-nav-hamburger span { display: block; width: 24px; height: 1.5px; background: var(--w60); transition: all 0.35s var(--ease); transform-origin: center; }
.wr-nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: var(--g400); }
.wr-nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.wr-nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: var(--g400); }
.wr-drawer { position: fixed; inset: 0; z-index: 300; background: rgba(3,10,20,0.97); backdrop-filter: blur(24px); display: flex; flex-direction: column; align-items: center; justify-content: center; transform: translateX(100%); transition: transform 0.45s var(--ease); pointer-events: none; }
.wr-drawer.open { transform: translateX(0); pointer-events: all; }
.wr-drawer-brand { font-family: var(--fd); font-size: 1.3rem; letter-spacing: .18em; color: var(--w); margin-bottom: 44px; opacity: 0; transform: translateY(10px); transition: opacity .4s .1s, transform .4s .1s; cursor: pointer; }
.wr-drawer.open .wr-drawer-brand { opacity: 1; transform: translateY(0); }
.wr-drawer-brand em { color: var(--g400); font-style: normal; }
.wr-dlink { font-family: var(--fd); font-size: clamp(2rem,8vw,3rem); font-weight: 300; color: var(--w60); background: none; border: none; padding: 10px 0; cursor: pointer; display: block; width: 100%; text-align: center; opacity: 0; transform: translateY(18px); transition: color .3s, opacity .4s var(--ease), transform .4s var(--ease); }
.wr-drawer.open .wr-dlink { opacity: 1; transform: translateY(0); }
.wr-drawer.open .wr-dlink:nth-of-type(1){transition-delay:.12s} .wr-drawer.open .wr-dlink:nth-of-type(2){transition-delay:.17s} .wr-drawer.open .wr-dlink:nth-of-type(3){transition-delay:.22s} .wr-drawer.open .wr-dlink:nth-of-type(4){transition-delay:.27s} .wr-drawer.open .wr-dlink:nth-of-type(5){transition-delay:.32s}
.wr-dlink:hover { color: var(--g400); }
.wr-drawer-div { width: 40px; height: 1px; background: rgba(201,168,76,.25); margin: 18px 0; opacity: 0; transition: opacity .4s .34s; }
.wr-drawer.open .wr-drawer-div { opacity: 1; }
.wr-dcta { font-family: var(--fb); font-size: .7rem; letter-spacing: .18em; text-transform: uppercase; color: var(--g400); border: 1px solid var(--g400); background: none; padding: 12px 32px; cursor: pointer; margin-top: 8px; opacity: 0; transform: translateY(18px); transition: color .3s, background .3s, opacity .4s .38s, transform .4s .38s; }
.wr-drawer.open .wr-dcta { opacity: 1; transform: translateY(0); }
.wr-dcta:hover { background: var(--g400); color: var(--n900); }

/* ── HERO ── */
.wr-hero { min-height: 100vh; position: relative; overflow: hidden; display: grid; grid-template-columns: 1fr 1fr; align-items: flex-end; padding: 0 60px 80px; gap: 60px; }
.wr-hero-canvas { position: absolute; inset: 0; z-index: 0; }
.wr-hero-left { position: relative; z-index: 2; padding-top: 160px; }
.wr-hero-right { position: relative; z-index: 2; padding-top: 160px; display: flex; align-items: flex-end; justify-content: flex-end; }
.wr-hero-eyebrow { display: inline-flex; align-items: center; gap: 10px; font-size: 0.62rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--g400); border: 1px solid rgba(201,168,76,0.28); padding: 7px 16px; margin-bottom: 32px; opacity: 0; transform: translateY(16px); animation: wrUp 1s var(--ease) 0.2s forwards; }
.wr-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--g400); animation: wrBlink 2s infinite; }
.wr-hero-h1 { font-family: var(--fd); font-weight: 300; line-height: 0.88; letter-spacing: -0.02em; color: var(--w); font-size: clamp(4rem,9vw,8rem); margin-bottom: 20px; opacity: 0; animation: wrUp 1.1s var(--ease) 0.35s forwards; }
.wr-hero-h1 em { display: block; color: var(--g400); font-style: italic; }
.wr-hero-sub { font-family: var(--fd); font-size: 1rem; color: var(--w60); font-style: italic; margin-bottom: 32px; opacity: 0; animation: wrUp 1s var(--ease) 0.5s forwards; }
.wr-hero-desc { font-size: 0.88rem; color: var(--w60); line-height: 1.85; max-width: 520px; margin-bottom: 36px; opacity: 0; animation: wrUp 1s var(--ease) 0.65s forwards; }
.wr-hero-desc strong { color: var(--w80); font-weight: 400; }
.wr-hero-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 36px; opacity: 0; animation: wrUp 1s var(--ease) 0.75s forwards; }
.wr-hero-tag { font-size: 0.6rem; letter-spacing: 0.16em; text-transform: uppercase; padding: 6px 14px; border: 1px solid rgba(201,168,76,0.25); color: var(--g300); }
.wr-hero-btns { display: flex; gap: 14px; flex-wrap: wrap; opacity: 0; animation: wrUp 1s var(--ease) 0.85s forwards; }
.wr-btn-gold { padding: 15px 36px; background: var(--g400); color: var(--n900); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.wr-btn-gold:hover { background: var(--g300); transform: translateY(-2px); }
.wr-btn-ghost { padding: 15px 36px; background: transparent; color: var(--w60); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--w12); cursor: pointer; transition: all 0.3s; }
.wr-btn-ghost:hover { border-color: var(--w30); color: var(--w); transform: translateY(-2px); }

/* Alert box */
.wr-alert { background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.3); padding: 32px 36px; min-width: 300px; position: relative; }
.wr-alert-icon { font-size: 2rem; margin-bottom: 14px; display: block; }
.wr-alert-title { font-family: var(--fd); font-size: 1.3rem; color: var(--g400); margin-bottom: 10px; }
.wr-alert-text { font-size: 0.8rem; color: var(--w60); line-height: 1.78; }
.wr-alert-text strong { color: var(--w80); font-weight: 400; }

/* ── STATS BAR ── */
.wr-stats-bar { background: var(--n800); padding: 0 60px; display: grid; grid-template-columns: repeat(4,1fr); border-bottom: 1px solid var(--w06); }
.wr-sbar { padding: 32px 0; text-align: center; border-right: 1px solid var(--w06); }
.wr-sbar:last-child { border-right: none; }
.wr-sbar-val { font-family: var(--fd); font-size: 2.2rem; font-weight: 300; color: var(--g400); display: block; line-height: 1; }
.wr-sbar-key { font-size: 0.62rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--w30); margin-top: 6px; display: block; }

/* ── WHY SECTION ── */
.wr-why { background: var(--n900); padding: 100px 60px; }
.wr-section-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--g400); margin-bottom: 16px; display: block; }
.wr-section-h2 { font-family: var(--fd); font-size: clamp(2.2rem,4vw,3.8rem); font-weight: 300; line-height: 1.1; color: var(--w); margin-bottom: 60px; }
.wr-section-h2 em { color: var(--g400); font-style: italic; }

/* Risk vs Protected split */
.wr-split { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; background: var(--w06); margin-bottom: 60px; }
.wr-split-col { padding: 52px 44px; }
.wr-split-col.danger { background: rgba(180,30,30,0.08); border-top: 3px solid rgba(220,60,60,0.4); }
.wr-split-col.safe { background: rgba(201,168,76,0.05); border-top: 3px solid var(--g400); }
.wr-split-title { font-family: var(--fd); font-size: 1.4rem; font-weight: 400; margin-bottom: 28px; }
.wr-split-col.danger .wr-split-title { color: rgba(255,100,100,0.8); }
.wr-split-col.safe .wr-split-title { color: var(--g400); }
.wr-split-items { display: flex; flex-direction: column; gap: 14px; }
.wr-split-item { display: flex; align-items: flex-start; gap: 12px; font-size: 0.82rem; color: var(--w60); line-height: 1.6; }
.wr-split-icon { flex-shrink: 0; font-size: 0.9rem; margin-top: 2px; }

/* Urgency strip */
.wr-urgency { background: rgba(201,168,76,0.06); border: 1px solid rgba(201,168,76,0.2); padding: 36px 44px; display: flex; align-items: center; gap: 32px; }
.wr-urgency-icon { font-size: 2.5rem; flex-shrink: 0; }
.wr-urgency-text h4 { font-family: var(--fd); font-size: 1.3rem; color: var(--g400); margin-bottom: 8px; }
.wr-urgency-text p { font-size: 0.82rem; color: var(--w60); line-height: 1.75; }
.wr-urgency-text p strong { color: var(--w80); font-weight: 400; }

/* ── WILL TYPES ── */
.wr-types { background: var(--n800); padding: 100px 60px; }
.wr-types-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; background: var(--w06); }
.wr-type-card { background: var(--n800); padding: 48px 40px; position: relative; overflow: hidden; transition: background 0.4s var(--ease); }
.wr-type-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, var(--glow2), transparent); opacity: 0; transition: opacity 0.4s; }
.wr-type-card:hover { background: var(--n750); }
.wr-type-card:hover::before { opacity: 1; }
.wr-type-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--g400); transform: scaleX(0); transform-origin: left; transition: transform 0.5s var(--ease); }
.wr-type-card:hover::after { transform: scaleX(1); }
.wr-type-badge { font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; padding: 5px 12px; border: 1px solid rgba(201,168,76,0.3); color: var(--g400); width: fit-content; margin-bottom: 24px; }
.wr-type-icon { font-size: 2.2rem; margin-bottom: 20px; display: block; }
.wr-type-title { font-family: var(--fd); font-size: 1.6rem; font-weight: 400; color: var(--w); margin-bottom: 12px; line-height: 1.2; }
.wr-type-desc { font-size: 0.82rem; color: var(--w60); line-height: 1.78; margin-bottom: 20px; }
.wr-type-features { display: flex; flex-direction: column; gap: 9px; }
.wr-type-feat { display: flex; align-items: flex-start; gap: 10px; font-size: 0.76rem; color: var(--w60); }
.wr-type-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--g400); flex-shrink: 0; margin-top: 6px; }
.wr-type-cost { margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--w06); font-size: 0.72rem; color: var(--w30); letter-spacing: 0.08em; }
.wr-type-cost strong { color: var(--g400); font-size: 1.1rem; font-family: var(--fd); font-weight: 300; }

/* ── WHAT'S COVERED ── */
.wr-covered { background: var(--n900); padding: 100px 60px; }
.wr-covered-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
.wr-covered-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--w06); margin-top: 52px; }
.wr-covered-card { background: var(--n900); padding: 32px 28px; transition: background 0.3s; }
.wr-covered-card:hover { background: var(--n800); }
.wr-covered-icon { font-size: 1.6rem; margin-bottom: 14px; display: block; }
.wr-covered-title { font-size: 0.88rem; font-weight: 500; color: var(--w); margin-bottom: 8px; }
.wr-covered-desc { font-size: 0.76rem; color: var(--w60); line-height: 1.7; }

/* Process steps (right col) */
.wr-process-box { background: var(--n800); border: 1px solid var(--w06); padding: 48px 44px; }
.wr-process-box-title { font-family: var(--fd); font-size: 1.4rem; color: var(--w); margin-bottom: 6px; }
.wr-process-box-sub { font-size: 0.76rem; color: var(--w30); margin-bottom: 36px; letter-spacing: 0.06em; }
.wr-steps { display: flex; flex-direction: column; gap: 0; }
.wr-step { display: grid; grid-template-columns: 52px 1fr; gap: 0; position: relative; }
.wr-step-left { display: flex; flex-direction: column; align-items: center; }
.wr-step-dot { width: 11px; height: 11px; border-radius: 50%; border: 2px solid var(--g400); background: var(--n800); flex-shrink: 0; margin-top: 4px; transition: background 0.3s; }
.wr-step:hover .wr-step-dot { background: var(--g400); }
.wr-step-line { width: 1px; flex: 1; background: rgba(201,168,76,0.12); margin-top: 4px; }
.wr-step:last-child .wr-step-line { display: none; }
.wr-step-body { padding: 0 0 28px 18px; }
.wr-step-num { font-size: 0.56rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--g400); margin-bottom: 5px; display: block; }
.wr-step-name { font-size: 0.9rem; font-weight: 500; color: var(--w); margin-bottom: 5px; }
.wr-step-desc { font-size: 0.75rem; color: var(--w60); line-height: 1.68; }
.wr-step-time { font-size: 0.58rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--g400); border: 1px solid rgba(201,168,76,0.18); padding: 3px 9px; display: inline-block; margin-top: 7px; }

/* ── PACKAGES ── */
.wr-packages { background: var(--cream-bg); padding: 100px 60px; position: relative; overflow: hidden; }
.wr-packages::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, transparent, var(--g400), transparent); opacity: 0.5; }
.wr-pkg-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: #8A6820; margin-bottom: 16px; display: block; }
.wr-pkg-h2 { font-family: var(--fd); font-size: clamp(2.2rem,4vw,3.5rem); font-weight: 300; color: var(--cream-ink); line-height: 1.1; margin-bottom: 60px; }
.wr-pkg-h2 em { color: var(--g400); font-style: italic; }
.wr-pkgs-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
.wr-pkg { background: var(--cream-bg); border: 1px solid var(--cream-bdr); padding: 44px 36px; display: flex; flex-direction: column; transition: all 0.35s var(--ease); box-shadow: 0 2px 12px rgba(120,90,30,0.06); cursor: pointer; }
.wr-pkg:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(120,90,30,0.14); border-color: rgba(201,168,76,0.45); }
.wr-pkg.featured { background: var(--n900); border: 1px solid rgba(201,168,76,0.35); box-shadow: 0 8px 40px rgba(0,0,0,0.22); }
.wr-pkg.featured:hover { border-color: var(--g400); }
.wr-pkg-badge { font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; padding: 4px 10px; width: fit-content; margin-bottom: 22px; border: 1px solid; font-weight: 500; }
.wr-pkg:not(.featured) .wr-pkg-badge { border-color: var(--cream-bdr); color: var(--cream-ink3); background: var(--cream-200); }
.wr-pkg.featured .wr-pkg-badge { border-color: var(--g400); color: var(--g400); background: rgba(201,168,76,0.08); }
.wr-pkg-name { font-family: var(--fd); font-size: 1.7rem; font-weight: 400; margin-bottom: 8px; }
.wr-pkg:not(.featured) .wr-pkg-name { color: var(--cream-ink); }
.wr-pkg.featured .wr-pkg-name { color: var(--w); }
.wr-pkg-tagline { font-size: 0.78rem; margin-bottom: 28px; }
.wr-pkg:not(.featured) .wr-pkg-tagline { color: var(--cream-ink3); }
.wr-pkg.featured .wr-pkg-tagline { color: var(--w60); }
.wr-pkg-div { height: 1px; margin-bottom: 28px; }
.wr-pkg:not(.featured) .wr-pkg-div { background: var(--cream-bdr); }
.wr-pkg.featured .wr-pkg-div { background: var(--w06); }
.wr-pkg-feats { list-style: none; display: flex; flex-direction: column; gap: 11px; flex: 1; margin-bottom: 32px; }
.wr-pkg-feat { display: flex; align-items: flex-start; gap: 11px; font-size: 0.8rem; line-height: 1.5; }
.wr-pkg:not(.featured) .wr-pkg-feat { color: var(--cream-ink2); }
.wr-pkg.featured .wr-pkg-feat { color: var(--w80); }
.wr-feat-chk { flex-shrink: 0; margin-top: 2px; font-size: 0.75rem; }
.wr-feat-chk.yes { color: #8A6820; }
.wr-pkg.featured .wr-feat-chk.yes { color: var(--g400); }
.wr-feat-chk.no { color: rgba(180,150,90,0.3); }
.wr-pkg-cta { padding: 13px 20px; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; font-family: var(--fb); cursor: pointer; transition: all 0.3s; width: 100%; font-weight: 500; }
.wr-pkg:not(.featured) .wr-pkg-cta { background: transparent; border: 1px solid var(--cream-bdr); color: var(--cream-ink2); }
.wr-pkg:not(.featured) .wr-pkg-cta:hover { border-color: var(--g400); color: var(--cream-ink); background: var(--cream-200); }
.wr-pkg.featured .wr-pkg-cta { background: var(--g400); border: none; color: var(--n900); }
.wr-pkg.featured .wr-pkg-cta:hover { background: var(--g300); }

/* ── FAQ ── */
.wr-faq { background: var(--n900); padding: 100px 60px; }
.wr-faq-inner { display: grid; grid-template-columns: 1fr 1.6fr; gap: 80px; align-items: start; }
.wr-faq-list { display: flex; flex-direction: column; }
.wr-faq-item { border-top: 1px solid var(--w06); }
.wr-faq-item:last-child { border-bottom: 1px solid var(--w06); }
.wr-faq-q { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 22px 0; cursor: pointer; }
.wr-faq-q-text { font-size: 0.9rem; font-weight: 400; color: var(--w); transition: color 0.3s; }
.wr-faq-item.open .wr-faq-q-text { color: var(--g400); }
.wr-faq-icon { width: 28px; height: 28px; border: 1px solid var(--w12); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--w30); flex-shrink: 0; transition: all 0.4s var(--ease); }
.wr-faq-item.open .wr-faq-icon { background: var(--g400); border-color: var(--g400); color: var(--n900); transform: rotate(45deg); }
.wr-faq-a { font-size: 0.82rem; color: var(--w60); line-height: 1.82; padding-bottom: 22px; max-height: 0; overflow: hidden; transition: max-height 0.5s var(--ease); }
.wr-faq-item.open .wr-faq-a { max-height: 320px; }

/* ── CTA ── */
.wr-cta { background: var(--cream-bg); padding: 120px 60px; text-align: center; position: relative; overflow: hidden; }
.wr-cta::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(180,150,90,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(180,150,90,0.06) 1px, transparent 1px); background-size: 60px 60px; }
.wr-cta::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.09), transparent); pointer-events: none; }
.wr-cta-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
.wr-cta-label { font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: #8A6820; margin-bottom: 20px; display: block; }
.wr-cta-h2 { font-family: var(--fd); font-size: clamp(2.5rem,5vw,4.2rem); font-weight: 300; color: var(--cream-ink); line-height: 1.1; margin-bottom: 12px; }
.wr-cta-h2 em { color: var(--g400); font-style: italic; }
.wr-cta-divider { width: 44px; height: 1px; background: var(--g400); margin: 24px auto; opacity: 0.5; }
.wr-cta-p { font-size: 0.84rem; color: var(--cream-ink3); line-height: 1.85; margin-bottom: 44px; }
.wr-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.wr-btn-dark { padding: 15px 40px; background: var(--cream-ink); color: var(--cream-bg); font-family: var(--fb); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer; transition: background 0.3s, transform 0.2s; }
.wr-btn-dark:hover { background: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }
.wr-btn-outline { padding: 15px 40px; background: transparent; color: var(--cream-ink2); font-family: var(--fb); font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--cream-bdr); cursor: pointer; transition: all 0.3s; }
.wr-btn-outline:hover { border-color: var(--g400); color: var(--cream-ink); transform: translateY(-2px); }

/* ── FOOTER ── */
.wr-footer { background: var(--n950); padding: 52px 60px; border-top: 1px solid var(--w06); }
.wr-footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
.wr-footer-logo { font-family: var(--fd); font-size: 1.3rem; letter-spacing: 0.15em; color: var(--w); }
.wr-footer-logo em { color: var(--g400); font-style: normal; }
.wr-footer-copy { font-size: 0.68rem; color: var(--w30); }
.wr-wa { position: fixed; bottom: 28px; right: 28px; z-index: 300; width: 50px; height: 50px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 18px rgba(37,211,102,0.4); transition: transform 0.3s; }
.wr-wa:hover { transform: scale(1.1); }

/* ── REVEAL ── */
.wr-reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.85s var(--ease), transform 0.85s var(--ease); }
.wr-reveal.in { opacity: 1; transform: translateY(0); }
.wr-d1{transition-delay:0.05s} .wr-d2{transition-delay:0.15s} .wr-d3{transition-delay:0.25s} .wr-d4{transition-delay:0.35s}

@keyframes wrUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes wrBlink { 0%,100%{opacity:1} 50%{opacity:0.3} }

/* ── RESPONSIVE ── */
@media(max-width:1000px){
  .wr-hero{grid-template-columns:1fr;padding:120px 40px 60px}
  .wr-hero-right{justify-content:flex-start}
  .wr-split{grid-template-columns:1fr}
  .wr-types-grid{grid-template-columns:1fr}
  .wr-covered-inner{grid-template-columns:1fr}
  .wr-faq-inner{grid-template-columns:1fr;gap:48px}
  .wr-pkgs-grid{grid-template-columns:1fr}
  .wr-stats-bar{grid-template-columns:1fr 1fr}
}
@media(max-width:768px){
  .wr-nav{padding:16px 24px} .wr-nav.scrolled{padding:12px 24px}
  .wr-nav-links{display:none} .wr-nav-cta{display:none} .wr-nav-hamburger{display:flex}
  .wr-hero{padding:100px 24px 52px}
  .wr-why,.wr-types,.wr-covered,.wr-packages,.wr-faq,.wr-cta{padding:70px 24px}
  .wr-footer{padding:40px 24px}
  .wr-stats-bar{padding:0 24px}
  .wr-covered-grid{grid-template-columns:1fr}
  .wr-urgency{flex-direction:column;gap:16px}
}
`;

// ── DATA ──────────────────────────────────────────────────────
const WILL_TYPES = [
  {
    icon: "⚖️",
    badge: "Most Common",
    title: "DIFC WILL",
    desc: "The most widely used WILL for expatriates in Dubai and the northern emirates. Registered with the DIFC Courts — internationally recognised and enforceable under English Common Law.",
    features: [
      "Covers UAE assets, bank accounts, and investments",
      "Property WILL covers UAE real estate",
      "Business WILL covers company shares & ownership",
      "Guardian WILL appoints legal guardians for children",
      "Full WILL covers all UAE assets comprehensively",
    ],
    cost: "From AED 2,500",
  },
  {
    icon: "🏛️",
    badge: "Abu Dhabi Based",
    title: "Abu Dhabi Courts WILL",
    desc: "Registered with the Abu Dhabi Judicial Department — ideal for residents based in Abu Dhabi or with significant Abu Dhabi assets. Equally enforceable and legally binding.",
    features: [
      "Ideal for Abu Dhabi residents and property owners",
      "Registered directly with Abu Dhabi Judicial Dept",
      "Covers all Abu Dhabi-based assets",
      "Recognised across all UAE emirates",
      "Lower registration fees than DIFC in some cases",
    ],
    cost: "From AED 2,000",
  },
  {
    icon: "🌐",
    badge: "Comprehensive",
    title: "Mirror WILL",
    desc: "Dual WILLs for couples — each mirroring the other's intentions. Ensures both spouses' assets are protected and transfer seamlessly regardless of which partner passes first.",
    features: [
      "Two WILLs drafted simultaneously for couples",
      "Assets transfer to surviving spouse first",
      "Children's inheritance protected as second stage",
      "Consistent, coordinated estate planning",
      "Most cost-effective option for married couples",
    ],
    cost: "From AED 4,200 (pair)",
  },
];

const COVERED_ITEMS = [
  { icon: "🏠", title: "UAE Real Estate", desc: "Freehold and leasehold properties in Dubai, Abu Dhabi, and all other emirates." },
  { icon: "💰", title: "Bank Accounts", desc: "All UAE savings, current, and investment accounts — including joint accounts." },
  { icon: "📈", title: "Investment Portfolios", desc: "UAE stocks, bonds, funds, crypto held locally, and brokerage accounts." },
  { icon: "🏢", title: "Company Shares", desc: "Free zone company shares, mainland shareholdings, and business ownership stakes." },
  { icon: "🚗", title: "Vehicles & Assets", desc: "UAE-registered vehicles, boats, and valuable personal property." },
  { icon: "👶", title: "Guardian Appointment", desc: "Legal appointment of guardians for minor children residing in the UAE." },
  { icon: "💎", title: "Personal Valuables", desc: "Jewellery, art, and high-value personal items stored in the UAE." },
  { icon: "🔐", title: "Digital Assets", desc: "Cryptocurrency, digital wallets, and online accounts — a growing area of estate planning." },
];

const PROCESS_STEPS = [
  { num: "01", name: "Initial Consultation", desc: "We assess your UAE assets, family situation, and recommend the right WILL type and structure.", time: "Day 1" },
  { num: "02", name: "WILL Drafting", desc: "Your WILL is professionally drafted by our legal team — clearly defining beneficiaries, assets, and guardians.", time: "Day 2–5" },
  { num: "03", name: "Review & Approval", desc: "You review the draft WILL. Amendments made until you are fully satisfied with every clause.", time: "Day 5–7" },
  { num: "04", name: "Registration", desc: "WILL submitted and registered with DIFC Courts or Abu Dhabi Judicial Department. Official registration certificate issued.", time: "Day 7–14" },
  { num: "05", name: "Document Delivery", desc: "Original registered WILL and all registration certificates delivered to you securely.", time: "Day 14–16" },
];

const FAQS = [
  { q: "Do I need a WILL if I already have one in my home country?", a: "Yes. A foreign WILL may not be automatically recognised for UAE-based assets. Without a UAE-registered WILL, your UAE assets are subject to Sharia inheritance law regardless of your nationality or home country WILL. A separate UAE WILL is strongly recommended for all expatriates with UAE assets." },
  { q: "What happens to my UAE assets if I die without a WILL?", a: "Without a registered UAE WILL, your UAE assets will be frozen immediately upon death and distributed according to Sharia law — regardless of your religion or nationality. This means your spouse may not automatically inherit your assets, and your children's shares are fixed by Sharia formula. Bank accounts can be frozen for months or years." },
  { q: "Can I appoint a guardian for my children in a UAE WILL?", a: "Yes. The DIFC WILL includes a specific Guardian WILL option — allowing you to legally appoint who will care for your minor children if both parents pass away. Without this, a UAE court will decide guardianship, which may not align with your wishes." },
  { q: "How long does it take to register a UAE WILL?", a: "The full process typically takes 14–16 working days from initial consultation to registration certificate. The drafting phase takes 5–7 days, and DIFC Courts registration takes a further 7–10 days after submission." },
  { q: "Can I update my WILL after it is registered?", a: "Yes. You can update or replace your UAE WILL at any time. We recommend reviewing your WILL after major life events — property purchases, new children, business changes, divorce, or significant asset changes. Updates require a new registration process." },
  { q: "Is the DIFC WILL valid for property outside Dubai?", a: "DIFC WILLs cover all UAE assets regardless of emirate — including Abu Dhabi, Sharjah, Ras Al Khaimah, and beyond. The DIFC Court's jurisdiction for non-Muslim expatriate estate matters extends across the entire UAE." },
];

// ── CANVAS ──────────────────────────────────────────────────
function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let W, H, raf, t = 0;
    const pts = Array.from({ length: 50 }, () => ({ x: Math.random() * 1920, y: Math.random() * 1080, vx: (Math.random() - .5) * 0.15, vy: (Math.random() - .5) * 0.15, r: Math.random() * 1.4 + 0.4, o: Math.random() * 0.35 + 0.1 }));
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      t += 0.003; ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, W, H); bg.addColorStop(0, "#05111e"); bg.addColorStop(1, "#020b14"); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      [[0.1, 0.25, "#C9A84C", 0.045, 11], [0.82, 0.2, "#163354", 0.42, 9], [0.5, 0.8, "#C9A84C", 0.035, 14]].forEach(([bx, by, col, a, spd], i) => {
        const x = W * bx + Math.sin(t * (spd / 10) + i * 2) * 70, y = H * by + Math.cos(t * (spd / 13) + i) * 50, r = Math.min(W, H) * 0.6, g = ctx.createRadialGradient(x, y, 0, x, y, r), rgb = parseInt(col.slice(1), 16);
        g.addColorStop(0, `rgba(${rgb >> 16},${(rgb >> 8) & 255},${rgb & 255},${a})`); g.addColorStop(1, "rgba(0,0,0,0)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      });
      ctx.strokeStyle = "rgba(201,168,76,0.022)"; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]; p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        for (let j = i + 1; j < pts.length; j++) { const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy); if (d < 140) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(201,168,76,${0.06 * (1 - d / 140)})`; ctx.lineWidth = 0.4; ctx.stroke(); } }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(201,168,76,${p.o})`; ctx.fill();
      }
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, H * 0.9); vg.addColorStop(0, "transparent"); vg.addColorStop(1, "rgba(2,11,20,0.7)"); ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="wr-hero-canvas" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".wr-reveal");
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } }), { threshold: 0.07 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ── MAIN ─────────────────────────────────────────────────────
export default function WillRegistrationPage({ onBack, onNavigate }) {
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
    <div className="wr-root">
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`wr-nav${scrolled ? " scrolled" : ""}`}>
        <div className="wr-nav-logo" onClick={() => go("home")}>INCO<em>ZONE</em></div>
        <ul className="wr-nav-links">{navLinks.map(l => <li key={l.label}><a onClick={() => go(l.page)}>{l.label}</a></li>)}</ul>
        <button className="wr-nav-cta" onClick={() => go("schedule")}>Schedule Consultation</button>
        <button className={`wr-nav-hamburger${drawerOpen ? " open" : ""}`} onClick={() => setDrawerOpen(o => !o)} aria-label="Toggle menu"><span /><span /><span /></button>
      </nav>

      {/* DRAWER */}
      <div className={`wr-drawer${drawerOpen ? " open" : ""}`}>
        <div className="wr-drawer-brand" onClick={() => go("home")}>INCO<em>ZONE</em></div>
        {navLinks.map(l => <button key={l.label} className="wr-dlink" onClick={() => go(l.page)}>{l.label}</button>)}
        <div className="wr-drawer-div" />
        <button className="wr-dcta" onClick={() => go("schedule")}>Schedule Consultation</button>
      </div>

      {/* HERO */}
      <section className="wr-hero">
        <HeroCanvas />
        <div className="wr-hero-left">
          <div className="wr-hero-eyebrow"><div className="wr-eyebrow-dot" />Legal Asset Protection · UAE</div>
          <h1 className="wr-hero-h1">UAE WILL<br /><em>Registration</em></h1>
          <div className="wr-hero-sub">Protect Your Assets. Secure Your Family's Future.</div>
          <p className="wr-hero-desc">
            Protect your UAE assets and secure your family's future with a <strong>legally registered WILL under DIFC or Abu Dhabi Courts.</strong> Without a registered WILL, UAE assets can be frozen upon death and distributed under Sharia law — regardless of your nationality. Our WILL advisory ensures your assets transfer exactly as you intend.
          </p>
          <div className="wr-hero-tags">
            {["DIFC WILL", "Abu Dhabi Courts", "Asset Protection", "Inheritance Planning", "Share Transfer on Death", "Property", "Family Security"].map(t => <span className="wr-hero-tag" key={t}>{t}</span>)}
          </div>
          <div className="wr-hero-btns">
            <button className="wr-btn-gold" onClick={() => go("schedule")}>Register My WILL →</button>
            <button className="wr-btn-ghost" onClick={() => onBack && onBack()}>← Back to Services</button>
          </div>
        </div>
        <div className="wr-hero-right">
          <div className="wr-alert">
            <span className="wr-alert-icon">⚠️</span>
            <div className="wr-alert-title">Critical for Every Expatriate</div>
            <p className="wr-alert-text">
              <strong>Without a UAE-registered WILL</strong>, your UAE bank accounts will be frozen immediately upon death. Assets will be distributed under Sharia law — regardless of your religion, nationality, or wishes expressed in a foreign WILL. <strong>This affects every non-Muslim expatriate in the UAE.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="wr-stats-bar">
        {[{ val: "100%", key: "Legal Certainty" }, { val: "14 Days", key: "Registration Time" }, { val: "3 Types", key: "WILL Options" }, { val: "All UAE", key: "Asset Coverage" }].map((s, i) => (
          <div className="wr-sbar" key={i}><span className="wr-sbar-val">{s.val}</span><span className="wr-sbar-key">{s.key}</span></div>
        ))}
      </div>

      {/* WHY */}
      <section className="wr-why">
        <div className="wr-reveal">
          <span className="wr-section-label">Why It Matters</span>
          <h2 className="wr-section-h2">Without a WILL vs<br /><em>With a Registered WILL</em></h2>
        </div>
        <div className="wr-split">
          <div className="wr-split-col danger wr-reveal">
            <div className="wr-split-title">⚠️ Without a UAE WILL</div>
            <div className="wr-split-items">
              {[
                ["❌", "Bank accounts frozen immediately upon death"],
                ["❌", "Assets distributed under Sharia law regardless of your religion"],
                ["❌", "Spouse may receive only 1/8 of estate under Sharia formula"],
                ["❌", "Children's shares fixed by law — not your wishes"],
                ["❌", "Foreign WILLs may not be recognised for UAE assets"],
                ["❌", "Court appoints guardians for your children — not you"],
                ["❌", "Estate settlement can take years and significant legal cost"],
                ["❌", "Business shares and company ownership in legal limbo"],
              ].map(([icon, text], i) => (
                <div className="wr-split-item" key={i}><span className="wr-split-icon">{icon}</span><span>{text}</span></div>
              ))}
            </div>
          </div>
          <div className="wr-split-col safe wr-reveal wr-d2">
            <div className="wr-split-title">✦ With a Registered UAE WILL</div>
            <div className="wr-split-items">
              {[
                ["✓", "Assets transfer to your chosen beneficiaries immediately"],
                ["✓", "Distribution follows your exact written instructions"],
                ["✓", "Spouse receives exactly what you intend — no formula"],
                ["✓", "Children's inheritance protected and documented"],
                ["✓", "Legally enforceable under English Common Law (DIFC)"],
                ["✓", "You choose guardians for your children in writing"],
                ["✓", "Estate settled efficiently — typically within months"],
                ["✓", "Business continuity protected and ownership transferred cleanly"],
              ].map(([icon, text], i) => (
                <div className="wr-split-item" key={i}><span className="wr-split-icon" style={{ color: "var(--g400)" }}>{icon}</span><span>{text}</span></div>
              ))}
            </div>
          </div>
        </div>
        <div className="wr-urgency wr-reveal">
          <div className="wr-urgency-icon">🔔</div>
          <div className="wr-urgency-text">
            <h4>This applies to every expatriate in the UAE — regardless of nationality</h4>
            <p>Whether you are British, Indian, American, European, or any other nationality — <strong>if you have assets in the UAE and no registered UAE WILL, your family is at risk.</strong> INCOZONE has helped hundreds of families protect their UAE estate. The process is simple. The consequences of not acting are not.</p>
          </div>
        </div>
      </section>

      {/* WILL TYPES */}
      <section className="wr-types">
        <div className="wr-reveal">
          <span className="wr-section-label">WILL Options</span>
          <h2 className="wr-section-h2">Choose the Right<br /><em>WILL for You</em></h2>
        </div>
        <div className="wr-types-grid">
          {WILL_TYPES.map((w, i) => (
            <div className={`wr-type-card wr-reveal wr-d${i + 1}`} key={i}>
              <div className="wr-type-badge">{w.badge}</div>
              <span className="wr-type-icon">{w.icon}</span>
              <div className="wr-type-title">{w.title}</div>
              <p className="wr-type-desc">{w.desc}</p>
              <div className="wr-type-features">
                {w.features.map((f, j) => (
                  <div className="wr-type-feat" key={j}><div className="wr-type-dot" /><span>{f}</span></div>
                ))}
              </div>
              <div className="wr-type-cost">Starting from <strong>{w.cost}</strong></div>
            </div>
          ))}
        </div>
      </section>

      {/* COVERED + PROCESS */}
      <section className="wr-covered">
        <div className="wr-covered-inner">
          <div>
            <div className="wr-reveal">
              <span className="wr-section-label">What's Protected</span>
              <h2 className="wr-section-h2" style={{ marginBottom: 0 }}>All Your UAE<br /><em>Assets Covered</em></h2>
            </div>
            <div className="wr-covered-grid">
              {COVERED_ITEMS.map((item, i) => (
                <div className={`wr-covered-card wr-reveal wr-d${(i % 2) + 1}`} key={i}>
                  <span className="wr-covered-icon">{item.icon}</span>
                  <div className="wr-covered-title">{item.title}</div>
                  <p className="wr-covered-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="wr-reveal wr-d2">
            <div className="wr-process-box">
              <div className="wr-process-box-title">Registration Process</div>
              <div className="wr-process-box-sub">From consultation to registered WILL</div>
              <div className="wr-steps">
                {PROCESS_STEPS.map((s, i) => (
                  <div className="wr-step" key={i}>
                    <div className="wr-step-left"><div className="wr-step-dot" /><div className="wr-step-line" /></div>
                    <div className="wr-step-body">
                      <span className="wr-step-num">{s.num}</span>
                      <div className="wr-step-name">{s.name}</div>
                      <p className="wr-step-desc">{s.desc}</p>
                      <span className="wr-step-time">{s.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="wr-packages">
        <span className="wr-pkg-label wr-reveal">Service Packages</span>
        <h2 className="wr-pkg-h2 wr-reveal wr-d1">Choose Your<br /><em>WILL Package</em></h2>
        <div className="wr-pkgs-grid">
          {[
            { name: "Single WILL", tagline: "One applicant — full asset protection", badge: null, featured: false, features: [{ text: "Full asset & beneficiary consultation", yes: true }, { text: "Professional WILL drafting", yes: true }, { text: "DIFC or Abu Dhabi Courts registration", yes: true }, { text: "Registration certificate delivery", yes: true }, { text: "Guardian appointment included", yes: false }, { text: "Annual WILL review reminder", yes: false }] },
            { name: "Complete WILL", tagline: "All asset types + guardian appointment", badge: "Most Popular", featured: true, features: [{ text: "Full asset & beneficiary consultation", yes: true }, { text: "Professional WILL drafting", yes: true }, { text: "DIFC or Abu Dhabi Courts registration", yes: true }, { text: "Registration certificate delivery", yes: true }, { text: "Guardian appointment included", yes: true }, { text: "Annual WILL review reminder", yes: true }] },
            { name: "Mirror WILL", tagline: "Husband & wife — coordinated WILLs", badge: "Best Value", featured: false, features: [{ text: "Two coordinated WILLs drafted", yes: true }, { text: "Both registered simultaneously", yes: true }, { text: "Both registration certificates", yes: true }, { text: "Guardian appointments for children", yes: true }, { text: "Asset cross-transfer planning", yes: true }, { text: "Annual review for both WILLs", yes: true }] },
          ].map((pkg, i) => (
            <div className={`wr-pkg wr-reveal wr-d${i + 1}${pkg.featured ? " featured" : ""}`} key={i}>
              {pkg.badge && <div className="wr-pkg-badge">{pkg.badge}</div>}
              <div className="wr-pkg-name">{pkg.name}</div>
              <p className="wr-pkg-tagline">{pkg.tagline}</p>
              <div className="wr-pkg-div" />
              <ul className="wr-pkg-feats">
                {pkg.features.map((f, j) => (
                  <li className="wr-pkg-feat" key={j}>
                    <span className={`wr-feat-chk ${f.yes ? "yes" : "no"}`}>{f.yes ? "✓" : "×"}</span>
                    <span style={{ color: pkg.featured ? (f.yes ? "var(--w80)" : "rgba(248,245,238,0.25)") : (f.yes ? "var(--cream-ink2)" : "var(--cream-bdr)") }}>{f.text}</span>
                  </li>
                ))}
              </ul>
              <button className="wr-pkg-cta" onClick={() => go("schedule")}>{pkg.featured ? "Get Started →" : "Learn More →"}</button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="wr-faq">
        <div className="wr-faq-inner">
          <div className="wr-reveal">
            <span className="wr-section-label">Common Questions</span>
            <h2 className="wr-section-h2" style={{ marginBottom: "24px" }}>UAE WILL<br /><em>FAQ</em></h2>
            <p style={{ fontSize: "0.82rem", color: "var(--w60)", lineHeight: "1.8", marginBottom: "40px" }}>Everything you need to know about UAE WILL registration — answered clearly.</p>
            <button className="wr-btn-gold" onClick={() => go("schedule")}>Free Consultation →</button>
          </div>
          <div className="wr-faq-list wr-reveal wr-d2">
            {FAQS.map((f, i) => (
              <div className={`wr-faq-item${openFaq === i ? " open" : ""}`} key={i}>
                <div className="wr-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="wr-faq-q-text">{f.q}</span>
                  <div className="wr-faq-icon">+</div>
                </div>
                <div className="wr-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="wr-cta">
        <div className="wr-cta-inner">
          <span className="wr-cta-label wr-reveal">Act Today</span>
          <h2 className="wr-cta-h2 wr-reveal wr-d1">Protect Your Family.<br /><em>Register Your WILL.</em></h2>
          <div className="wr-cta-divider" />
          <p className="wr-cta-p wr-reveal wr-d2">A registered UAE WILL takes less than 3 weeks and provides complete legal certainty for your family. Don't leave your UAE assets unprotected.</p>
          <div className="wr-cta-btns wr-reveal wr-d3">
            <button className="wr-btn-dark" onClick={() => go("schedule")}>Schedule Private Consultation</button>
            <button className="wr-btn-outline" onClick={() => onBack && onBack()}>← Back to Services</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="wr-footer">
        <div className="wr-footer-inner">
          <div className="wr-footer-logo">INCO<em>ZONE</em></div>
          <div className="wr-footer-copy">© 2026 INCOZONE. All rights reserved. Dubai, UAE.</div>
        </div>
      </footer>

      <div className="wr-wa">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </div>
    </div>
  );
}
