import { useState, useEffect, useRef } from "react";
import DMCCPage from "./pages/DMCC";
import IFZAPage from "./pages/IFZA";
import MeydanPage from "./pages/Meydan";
import RAKEZPage from "./pages/RAKEZ";
import SHAMSPage from "./pages/SHAMS";
import JAFZAPage from "./pages/JAFZA";
import AFZPage from "./pages/AFZ";
import ADGMPage from "./pages/ADGM";
import ServicesPage from "./pages/Services";
import MainlandPage from "./pages/Mainland";
import PROPage from "./pages/PRO";
import AboutPage from "./pages/About";
import BlogPage from "./pages/Blog";
import ContactPage from "./pages/Contact";
import SchedulePage from "./pages/Schedule";
import AdminPage from "./pages/Admin";
import GoldenVisaPage from "./pages/GoldenVisa";
import BankingPage from "./pages/Banking";
import VisaImmigrationPage from "./pages/VisaImmigration";
import WillRegistrationPage from "./pages/WillRegistration";
import TrademarkRegistrationPage from "./pages/TrademarkRegistration";
import SpecialApprovalsPage from "./pages/SpecialApprovals";
import OffshoreFormationPage from "./pages/OffshoreFormation";
import CompanyLiquidationPage from "./pages/CompanyLiquidation";
import FreeZoneIncorporationPage from "./pages/FreeZoneIncorporation";
import CompanyAmendmentsPage from "./pages/CompanyAmendments";
import heroBg from "./images/business-data-analysis.jpg";
import imgDMCC   from "./images/compressed/aerial-view-tall-skyscraper-city.webp";
import imgIFZA   from "./images/compressed/futuristic-landscape-dubai.webp";
import imgMeydan from "./images/compressed/dramatic-perspective-with-low-angle-view-skyscrapers-looking-up-sky-dubai-vanishing-point.webp";
import imgRAKEZ  from "./images/compressed/modern-glass-skyscraper-reflecting-twilight-sky.webp";
import imgSHAMS  from "./images/compressed/modern-cityscape-view-from-high-rise-building.webp";
import imgJAFZA  from "./images/compressed/bridge-with-city.webp";
import imgAFZ    from "./images/compressed/landscape-with-colorful-rainbow-appearing-sky.webp";
import imgADGM   from "./images/compressed/representation-ecology-sustainability.webp";

// Preload hero image at module level so it's in browser cache before any navigation
const _heroBgPreload = new Image(); _heroBgPreload.src = heroBg;

// Preload all zone images immediately so cards render without flicker
[imgDMCC, imgIFZA, imgMeydan, imgRAKEZ, imgSHAMS, imgJAFZA, imgAFZ, imgADGM].forEach(src => {
  const img = new Image(); img.src = src;
});

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Dark Navy + Cream Accents
// ═══════════════════════════════════════════════════════════════

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy-950: #030d17;
    --navy-900: #05111e;
    --navy-800: #0B1C2D;
    --navy-700: #102540;
    --navy-600: #163354;
    --navy-500: #1e4570;
    --gold-400: #C9A84C;
    --gold-300: #D4B468;
    --gold-200: #E2CC98;
    --gold-glow: rgba(201,168,76,0.15);
    --gold-glow2: rgba(201,168,76,0.08);

    /* ── Cream/Ivory palette (used only for pricing + CTA) ── */
    --cream-50:  #FDFBF6;
    --cream-100: #FAF6EE;
    --cream-200: #F4ECD8;
    --cream-300: #EDE0C4;
    --cream-border: rgba(180,150,90,0.18);
    --cream-ink:  #1A120A;
    --cream-ink2: #3D2E1A;
    --cream-ink3: #7A6040;

    --white: #F8F5EE;
    --white-80: rgba(248,245,238,0.8);
    --white-60: rgba(248,245,238,0.6);
    --white-30: rgba(248,245,238,0.3);
    --white-10: rgba(248,245,238,0.08);
    --white-05: rgba(248,245,238,0.04);
    --font-display: 'Cormorant Garamond', Georgia, serif;
    --font-body: 'DM Sans', sans-serif;
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  }
  html { scroll-behavior: auto; }
  body {
    background: var(--navy-900);
    color: var(--white);
    font-family: var(--font-body);
    font-weight: 300;
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 22px 60px;
    transition: background 0.5s, backdrop-filter 0.5s, padding 0.4s;
  }
  .nav.scrolled {
    background: rgba(5,17,30,0.94);
    backdrop-filter: blur(18px);
    padding: 14px 60px;
    border-bottom: 1px solid rgba(201,168,76,0.12);
  }
  .nav-logo {
    font-family: var(--font-display); font-size: 1.5rem; font-weight: 500;
    letter-spacing: 0.15em; color: var(--white); cursor: pointer; transition: color 0.3s;
  }
  .nav-logo:hover { color: var(--gold-300); }
  .nav-logo span { color: var(--gold-400); }
  .nav-links { display: flex; gap: 36px; list-style: none; }
  .nav-links a {
    font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--white-60); text-decoration: none; transition: color 0.3s; cursor: pointer;
  }
  .nav-links a:hover { color: var(--gold-300); }
  .nav-cta {
    font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
    background: transparent; border: 1px solid var(--gold-400); color: var(--gold-400);
    padding: 10px 22px; cursor: pointer; transition: background 0.3s, color 0.3s;
    font-family: var(--font-body);
  }
  .nav-cta:hover { background: var(--gold-400); color: var(--navy-900); }

  /* ── HERO ── */
  .hero {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden; padding: 0 60px; background: var(--navy-900);
  }
  .hero::before {
    content: ""; position: absolute; inset: 0; z-index: 1;
    background: rgba(6, 14, 35, 0.72);
  }
  .hero-canvas { position: absolute; inset: 0; z-index: 0; }
  .hero-content {
    position: relative; z-index: 2; max-width: 820px; text-align: center;
    opacity: 0; transform: translateY(28px);
    animation: fadeUp 1.2s var(--ease-out) 0.3s forwards;
    padding-top: 80px;
  }
  .hero-eyebrow {
    font-size: 0.72rem; letter-spacing: 0.28em; text-transform: uppercase;
    color: var(--gold-400); margin-bottom: 28px; display: block;
  }
  .hero-h1 {
    font-family: var(--font-display);
    font-size: clamp(2.8rem, 5.5vw, 5rem); font-weight: 300;
    line-height: 1.12; letter-spacing: -0.01em; color: var(--white); margin-bottom: 28px;
  }
  .hero-h1 em { color: var(--gold-400); font-style: italic; }
  .hero-sub {
    font-size: 0.85rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--white-60); margin-bottom: 52px;
  }
  .hero-sub span { margin: 0 12px; color: var(--gold-400); opacity: 0.5; }
  .hero-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
  .hero-scroll {
    position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 2;
    opacity: 0; animation: fadeUp 1s var(--ease-out) 1.4s forwards;
  }
  .hero-scroll span { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--white-30); }
  .scroll-line { width: 1px; height: 48px; background: linear-gradient(to bottom, var(--gold-400), transparent); animation: scrollPulse 2s ease-in-out infinite; }

  /* ── BUTTONS ── */
  .btn-primary {
    padding: 16px 36px; background: var(--gold-400); color: var(--navy-900);
    font-family: var(--font-body); font-size: 0.75rem; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer;
    transition: background 0.3s, transform 0.2s;
  }
  .btn-primary:hover { background: var(--gold-300); transform: translateY(-2px); }
  .btn-ghost {
    padding: 16px 36px; background: transparent; color: var(--white);
    font-family: var(--font-body); font-size: 0.75rem; font-weight: 400;
    letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--white-30);
    cursor: pointer; transition: border-color 0.3s, color 0.3s, transform 0.2s;
  }
  .btn-ghost:hover { border-color: var(--white-60); transform: translateY(-2px); }
  .btn-sm {
    padding: 10px 20px; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase;
    font-family: var(--font-body); cursor: pointer; transition: all 0.3s; border: none;
  }
  .btn-gold-sm { background: var(--gold-400); color: var(--navy-900); font-weight: 500; }
  .btn-gold-sm:hover { background: var(--gold-300); }
  .btn-outline-sm { background: transparent; border: 1px solid var(--white-30); color: var(--white); }
  .btn-outline-sm:hover { border-color: var(--gold-400); color: var(--gold-400); }

  /* cream variant buttons (inside cream sections) */
  .btn-cream-primary {
    padding: 16px 36px; background: var(--cream-ink); color: var(--cream-50);
    font-family: var(--font-body); font-size: 0.75rem; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase; border: none; cursor: pointer;
    transition: background 0.3s, transform 0.2s;
  }
  .btn-cream-primary:hover { background: var(--gold-400); color: var(--cream-ink); transform: translateY(-2px); }
  .btn-cream-ghost {
    padding: 16px 36px; background: transparent; color: var(--cream-ink2);
    font-family: var(--font-body); font-size: 0.75rem; font-weight: 400;
    letter-spacing: 0.14em; text-transform: uppercase; border: 1px solid var(--cream-border);
    cursor: pointer; transition: all 0.3s;
  }
  .btn-cream-ghost:hover { border-color: var(--gold-400); color: var(--cream-ink); transform: translateY(-2px); }

  /* ── SECTION BASE ── */
  section { padding: 120px 60px; }
  .section-label {
    font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--gold-400); margin-bottom: 20px; display: block;
  }
  .section-title {
    font-family: var(--font-display); font-size: clamp(2rem, 3.5vw, 3.2rem);
    font-weight: 300; line-height: 1.18; color: var(--white);
  }
  .section-title em { color: var(--gold-400); font-style: italic; }

  /* ── ZONE FINDER ── */
  .zone-finder { background: var(--navy-800); position: relative; overflow: hidden; }
  .zone-finder::before {
    content: ''; position: absolute; top: -200px; right: -200px;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.05), transparent 70%);
    pointer-events: none;
  }
  .zf-header { text-align: center; margin-bottom: 64px; }
  .zf-filter-bar { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 48px; }
  .zf-filter-btn {
    padding: 8px 20px; font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
    font-family: var(--font-body); background: transparent;
    border: 1px solid var(--white-10); color: var(--white-60); cursor: pointer;
    transition: all 0.3s; border-radius: 2px;
  }
  .zf-filter-btn:hover { border-color: var(--gold-400); color: var(--gold-400); }
  .zf-filter-btn.active { border-color: var(--gold-400); color: var(--gold-400); background: var(--gold-glow2); }
  .zf-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .zf-card {
    background: var(--navy-700); border: 1px solid var(--white-10);
    background-size: cover; background-position: center; background-repeat: no-repeat;
    padding: 0; position: relative; overflow: hidden; min-height: 420px;
    cursor: pointer; transition: all 0.35s var(--ease-out); display: flex; flex-direction: column;
  }
  .zf-card::before {
    content: ''; position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(to bottom, rgba(5,17,30,0.60) 0%, rgba(5,17,30,0.80) 55%, rgba(5,17,30,0.96) 100%);
    transition: background 0.35s;
  }
  .zf-card:hover::before {
    background: linear-gradient(to bottom, rgba(5,17,30,0.68) 0%, rgba(5,17,30,0.86) 55%, rgba(5,17,30,0.98) 100%);
  }
  .zf-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; z-index: 3;
    background: var(--gold-400); transform: scaleX(0); transform-origin: left;
    transition: transform 0.4s var(--ease-out);
  }
  .zf-card-inner {
    position: relative; z-index: 2; padding: 36px 28px 28px;
    display: flex; flex-direction: column; flex: 1;
  }
  .zf-card:hover { border-color: rgba(201,168,76,0.5); transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.2); }
  .zf-card:hover::after { transform: scaleX(1); }
  .zf-card:hover .zf-arrow { transform: translateX(6px); opacity: 1; }
  .zf-card:active { transform: translateY(-3px) scale(0.99); }

  /* Golden rays ripple on click */
  @keyframes goldenRipple {
    0%   { transform: translate(-50%,-50%) scale(0); opacity: 0.7; }
    100% { transform: translate(-50%,-50%) scale(4); opacity: 0; }
  }
  @keyframes goldenRays {
    0%   { transform: translate(-50%,-50%) scale(0) rotate(0deg); opacity: 0.9; }
    100% { transform: translate(-50%,-50%) scale(3.5) rotate(30deg); opacity: 0; }
  }
  .zf-ripple {
    position: absolute; z-index: 10; pointer-events: none;
    width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.55) 0%, rgba(201,168,76,0.15) 50%, transparent 70%);
    animation: goldenRipple 0.7s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  .zf-rays {
    position: absolute; z-index: 9; pointer-events: none;
    width: 300px; height: 300px;
    background: conic-gradient(from 0deg, transparent 0deg, rgba(201,168,76,0.22) 10deg, transparent 20deg, rgba(201,168,76,0.18) 30deg, transparent 40deg, rgba(201,168,76,0.22) 50deg, transparent 60deg, rgba(201,168,76,0.18) 70deg, transparent 80deg, rgba(201,168,76,0.22) 90deg, transparent 100deg, rgba(201,168,76,0.18) 110deg, transparent 120deg, rgba(201,168,76,0.22) 130deg, transparent 140deg, rgba(201,168,76,0.18) 150deg, transparent 160deg, rgba(201,168,76,0.22) 170deg, transparent 180deg, rgba(201,168,76,0.18) 190deg, transparent 200deg, rgba(201,168,76,0.22) 210deg, transparent 220deg, rgba(201,168,76,0.18) 230deg, transparent 240deg, rgba(201,168,76,0.22) 250deg, transparent 260deg, rgba(201,168,76,0.18) 270deg, transparent 280deg, rgba(201,168,76,0.22) 290deg, transparent 300deg, rgba(201,168,76,0.18) 310deg, transparent 320deg, rgba(201,168,76,0.22) 330deg, transparent 340deg, rgba(201,168,76,0.18) 350deg, transparent 360deg);
    animation: goldenRays 0.8s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  /* Smooth image fade-in */
  .zf-card { background-color: #091928; }
  .zf-img {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    opacity: 0; transition: opacity 0.6s ease;
  }
  .zf-img.loaded { opacity: 1; }
  .zf-badge {
    display: inline-block; font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
    padding: 4px 10px; border: 1px solid; margin-bottom: 20px; width: fit-content;
  }
  .badge-trade { border-color: rgba(201,168,76,0.4); color: var(--gold-400); background: rgba(201,168,76,0.06); }
  .badge-tech { border-color: rgba(99,179,237,0.4); color: #63b3ed; background: rgba(99,179,237,0.06); }
  .badge-media { border-color: rgba(154,117,232,0.4); color: #9a75e8; background: rgba(154,117,232,0.06); }
  .badge-industrial { border-color: rgba(72,187,120,0.4); color: #48bb78; background: rgba(72,187,120,0.06); }
  .badge-financial { border-color: rgba(237,137,54,0.4); color: #ed8936; background: rgba(237,137,54,0.06); }
  .badge-free { border-color: rgba(248,245,238,0.2); color: var(--white-60); background: var(--white-05); }
  .zf-zone-name {
    font-family: var(--font-display); font-size: 1.75rem; font-weight: 400;
    color: var(--white); margin-bottom: 8px; line-height: 1.1;
  }
  .zf-zone-full { font-size: 0.72rem; color: var(--white-30); letter-spacing: 0.05em; margin-bottom: 16px; }
  .zf-desc { font-size: 0.8rem; color: var(--white-60); line-height: 1.7; margin-bottom: 20px; flex: 1; }
  .zf-meta { display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
  .zf-meta-item { font-size: 0.7rem; color: var(--white-60); display: flex; align-items: center; gap: 6px; }
  .zf-meta-item strong { color: var(--white); font-weight: 500; }
  .zf-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--gold-400); }
  .zf-arrow { font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold-400); transition: transform 0.3s, opacity 0.3s; opacity: 0.6; margin-top: auto; }
  .zf-skeleton-overlay {
    position: absolute; inset: 0; background: var(--navy-700); z-index: 4;
    display: flex; flex-direction: column; padding: 36px 28px 28px;
    animation: skeletonLoad 0.5s var(--ease-out) forwards;
  }
  .skeleton-bar {
    background: linear-gradient(90deg, var(--white-05) 25%, var(--white-10) 50%, var(--white-05) 75%);
    background-size: 200% 100%; border-radius: 2px; animation: shimmer 1.8s infinite;
  }
  @keyframes shimmer { to { background-position: -200% 0; } }
  @keyframes skeletonLoad { to { opacity: 0; pointer-events: none; } }

  /* ── EXPERTISE ── */
  .expertise { background: var(--navy-900); }
  .expertise-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 64px; }
  .expertise-card {
    background: var(--navy-700); padding: 52px 44px; position: relative; overflow: hidden;
    cursor: pointer; transition: background 0.4s;
  }
  .expertise-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, var(--gold-glow), transparent);
    opacity: 0; transition: opacity 0.4s;
  }
  .expertise-card:hover { background: var(--navy-600); }
  .expertise-card:hover::before { opacity: 1; }
  .expertise-card:hover .card-arrow { transform: translateX(6px); }
  .expertise-num { font-family: var(--font-display); font-size: 0.75rem; letter-spacing: 0.2em; color: var(--gold-400); margin-bottom: 32px; display: block; }
  .expertise-card h3 { font-family: var(--font-display); font-size: 1.6rem; font-weight: 400; line-height: 1.2; color: var(--white); margin-bottom: 16px; }
  .expertise-card p { font-size: 0.84rem; color: var(--white-60); line-height: 1.7; margin-bottom: 32px; }
  .card-arrow { font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold-400); transition: transform 0.3s; }

  /* ── WHY ── */
  .why {
    background: var(--navy-800);
    position: relative; overflow: hidden;
  }
  .why::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 80% at 100% 50%, rgba(201,168,76,0.04), transparent 65%),
      radial-gradient(ellipse 40% 60% at 0% 50%, rgba(22,51,84,0.5), transparent 60%);
    pointer-events: none;
  }
  /* Ghost "WHY" behind the whole section */
  .why::after {
    content: 'WHY';
    position: absolute; right: -20px; top: 50%;
    transform: translateY(-50%);
    font-family: var(--font-display); font-weight: 300;
    font-size: clamp(10rem, 20vw, 18rem); line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1px rgba(201,168,76,0.05);
    pointer-events: none; user-select: none; z-index: 0;
    letter-spacing: -0.04em;
  }

  .why-inner {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; align-items: center;
    position: relative; z-index: 1;
  }

  /* Left col header */
  .why-header-label {
    font-size: 0.62rem; letter-spacing: 0.32em; text-transform: uppercase;
    color: var(--gold-400); margin-bottom: 14px; display: flex; align-items: center; gap: 14px;
  }
  .why-header-label::before {
    content: ''; width: 32px; height: 1px; background: var(--gold-400);
  }

  /* Pillars redesigned */
  .why-pillars { display: flex; flex-direction: column; gap: 0; margin-top: 52px; }

  .pillar {
    display: grid;
    grid-template-columns: 72px 1fr;
    gap: 0;
    position: relative;
    cursor: default;
    border-top: 1px solid rgba(248,245,238,0.06);
    overflow: hidden;
    transition: background 0.5s cubic-bezier(0.16,1,0.3,1);
  }
  .pillar:last-child { border-bottom: 1px solid rgba(248,245,238,0.06); }

  /* Gold fill sweep on hover */
  .pillar-fill {
    position: absolute; inset: 0; left: 0;
    background: linear-gradient(90deg, rgba(201,168,76,0.07), transparent 70%);
    transform: translateX(-101%);
    transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
    pointer-events: none;
  }
  .pillar:hover .pillar-fill { transform: translateX(0); }

  /* Left: big animated number */
  .pillar-num-col {
    display: flex; align-items: stretch;
    padding: 32px 24px 32px 0;
    position: relative;
  }
  .pillar-num-col::after {
    content: ''; position: absolute; right: 0; top: 24px; bottom: 24px;
    width: 1px; background: rgba(248,245,238,0.06);
    transition: background 0.4s;
  }
  .pillar:hover .pillar-num-col::after { background: rgba(201,168,76,0.25); }

  .pillar-num-inner {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    width: 100%;
  }
  .pillar-num-big {
    font-family: var(--font-display); font-weight: 300;
    font-size: 2.8rem; line-height: 1;
    color: rgba(201,168,76,0.18);
    transition: color 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s;
    display: block;
  }
  .pillar:hover .pillar-num-big {
    color: var(--gold-400);
    transform: scale(1.08);
  }

  /* Progress bar */
  .pillar-bar {
    width: 1px; flex: 1; margin-top: 8px;
    background: rgba(201,168,76,0.1);
    position: relative; overflow: hidden; min-height: 20px;
  }
  .pillar-bar::after {
    content: ''; position: absolute;
    top: -100%; left: 0; right: 0;
    height: 100%;
    background: linear-gradient(to bottom, transparent, var(--gold-400));
    transition: top 0.6s cubic-bezier(0.16,1,0.3,1);
  }
  .pillar:hover .pillar-bar::after { top: 0; }

  /* Right: content */
  .pillar-body {
    padding: 32px 0 32px 28px;
    position: relative; z-index: 1;
  }
  .pillar-body-tag {
    font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase;
    color: rgba(201,168,76,0.5); margin-bottom: 10px; display: block;
    transition: color 0.3s;
  }
  .pillar:hover .pillar-body-tag { color: var(--gold-400); }
  .pillar-body h4 {
    font-family: var(--font-display); font-size: 1.35rem; font-weight: 400;
    color: var(--white); margin-bottom: 10px; line-height: 1.2;
    letter-spacing: -0.01em;
    transition: color 0.3s;
  }
  .pillar:hover .pillar-body h4 { color: var(--gold-300); }
  .pillar-body p { font-size: 0.8rem; color: var(--white-60); line-height: 1.75; }

  /* Animated arrow on hover */
  .pillar-arrow {
    position: absolute; right: 0; top: 50%; transform: translateY(-50%);
    font-size: 0.7rem; letter-spacing: 0.15em; color: var(--gold-400);
    opacity: 0; transform: translateY(-50%) translateX(-8px);
    transition: opacity 0.4s, transform 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  .pillar:hover .pillar-arrow {
    opacity: 1; transform: translateY(-50%) translateX(0);
  }

  /* Right col: visual panel */
  .why-visual {
    position: relative; height: 560px; width: 100%;
    display: flex; align-items: center; justify-content: center;
  }

  /* Concentric rings */
  .why-orb {
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, var(--navy-600), var(--navy-900));
    border: 1px solid rgba(201,168,76,0.22);
    position: absolute;
    box-shadow: 0 0 100px rgba(201,168,76,0.09), inset 0 0 60px rgba(201,168,76,0.04);
    animation: orbPulse 6s ease-in-out infinite;
  }
  .why-orb-ring {
    width: 370px; height: 370px; border-radius: 50%;
    border: 1px solid rgba(201,168,76,0.08); position: absolute;
    animation: orbPulse 6s ease-in-out infinite 1.2s;
  }
  .why-orb-ring2 {
    width: 450px; height: 450px; border-radius: 50%;
    border: 1px solid rgba(201,168,76,0.04); position: absolute;
    animation: orbPulse 6s ease-in-out infinite 2.4s;
  }
  /* Rotating dashed ring */
  .why-orb-dashed {
    width: 410px; height: 410px; border-radius: 50%;
    border: 1px dashed rgba(201,168,76,0.1); position: absolute;
    animation: orbRotate 40s linear infinite;
  }

  /* Stats floating around orb */
  .why-stat {
    position: absolute; text-align: center;
    background: rgba(9,25,40,0.92); backdrop-filter: blur(12px);
    border: 1px solid rgba(201,168,76,0.18);
    padding: 16px 22px; min-width: 110px;
    animation: statFloat 5s ease-in-out infinite;
  }
  .why-stat:nth-child(5) { top: 52px; right: 48px; animation-delay: 0s; }
  .why-stat:nth-child(6) { bottom: 72px; left: 32px; animation-delay: 1.6s; }
  .why-stat:nth-child(7) { top: 48%; right: 8px; transform: translateY(-50%); animation-delay: 3.2s; }
  .why-stat-num {
    font-family: var(--font-display); font-size: 2.2rem; font-weight: 300;
    color: var(--gold-400); display: block; line-height: 1;
  }
  .why-stat-label {
    font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--white-60); margin-top: 4px; display: block; white-space: nowrap;
  }

  /* Orb inner content */
  .why-orb-inner {
    position: absolute; z-index: 2;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center;
  }
  .why-orb-inner-label {
    font-size: 0.56rem; letter-spacing: 0.28em; text-transform: uppercase;
    color: rgba(201,168,76,0.6); margin-bottom: 8px;
  }
  .why-orb-inner-num {
    font-family: var(--font-display); font-size: 3.8rem; font-weight: 300;
    color: var(--white); line-height: 1;
  }
  .why-orb-inner-num em { color: var(--gold-400); font-style: normal; }
  .why-orb-inner-sub {
    font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--white-60); margin-top: 6px;
  }

  @keyframes orbRotate { to { transform: rotate(360deg); } }
  @keyframes statFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  .why-stat:nth-child(7) {
    animation-name: statFloat7;
  }
  @keyframes statFloat7 {
    0%, 100% { transform: translateY(-50%); }
    50% { transform: translateY(calc(-50% - 8px)); }
  }

  /* ── TESTIMONIALS ── */
  .testimonials { background: var(--navy-900); }
  .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px; }
  .testi-card { padding: 40px 36px; border: 1px solid var(--white-10); position: relative; transition: border-color 0.35s; }
  .testi-card:hover { border-color: rgba(201,168,76,0.25); }
  .testi-stars { display: flex; gap: 4px; margin-bottom: 20px; }
  .star { color: var(--gold-400); font-size: 0.9rem; }
  .testi-text { font-family: var(--font-display); font-size: 1.05rem; font-weight: 300; line-height: 1.65; color: var(--white); margin-bottom: 28px; font-style: italic; }
  .testi-author { display: flex; align-items: center; gap: 14px; }
  .testi-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--navy-600); border: 1px solid var(--gold-400); display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 1rem; color: var(--gold-400); flex-shrink: 0; }
  .testi-name { font-size: 0.82rem; font-weight: 500; color: var(--white); }
  .testi-role { font-size: 0.72rem; color: var(--white-60); }

  /* ══════════════════════════════════════════
     ── PARTNERS SECTION — PREMIUM ──
  ══════════════════════════════════════════ */
  .partners {
    background: var(--navy-950);
    padding: 110px 60px;
    position: relative; overflow: hidden;
  }
  .partners::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.04), transparent 65%),
      radial-gradient(ellipse 40% 80% at 0% 50%, rgba(22,51,84,0.3), transparent),
      radial-gradient(ellipse 40% 80% at 100% 50%, rgba(22,51,84,0.3), transparent);
    pointer-events: none;
  }
  /* Subtle grid texture */
  .partners::after {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(201,168,76,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(201,168,76,0.025) 1px, transparent 1px);
    background-size: 72px 72px;
    pointer-events: none;
  }

  .partners-inner { position: relative; z-index: 1; }

  /* Header */
  .partners-header { text-align: center; margin-bottom: 72px; }
  .partners-eyebrow {
    display: inline-flex; align-items: center; gap: 14px;
    font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase;
    color: var(--gold-400); margin-bottom: 20px;
  }
  .partners-eyebrow::before,
  .partners-eyebrow::after { content: ''; width: 28px; height: 1px; background: var(--gold-400); opacity: 0.5; }
  .partners-title {
    font-family: var(--font-display); font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 300; color: var(--white); line-height: 1.15; margin-bottom: 14px;
  }
  .partners-title em { color: var(--gold-400); font-style: italic; }
  .partners-subtitle {
    font-size: 0.82rem; color: var(--white-60); max-width: 480px; margin: 0 auto; line-height: 1.8;
  }

  /* Divider with gold dot */
  .partners-divider {
    display: flex; align-items: center; justify-content: center; gap: 16px;
    margin: 28px auto 0;
  }
  .partners-divider-line { width: 60px; height: 1px; background: linear-gradient(to right, transparent, rgba(201,168,76,0.3)); }
  .partners-divider-line:last-child { transform: scaleX(-1); }
  .partners-divider-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold-400); }

  /* Main grid — 3 rows of cards */
  .partners-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: rgba(248,245,238,0.04);
    border: 1px solid rgba(248,245,238,0.04);
    margin-bottom: 1px;
  }
  .partners-grid-row2 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: rgba(248,245,238,0.04);
    border: 1px solid rgba(248,245,238,0.04);
    border-top: none;
  }

  /* Individual partner card */
  .partner-card {
    background: var(--navy-950);
    padding: 44px 40px;
    display: flex; flex-direction: column; justify-content: space-between;
    position: relative; overflow: hidden;
    transition: background 0.45s cubic-bezier(0.16,1,0.3,1);
    cursor: default; min-height: 170px;
  }
  .partner-card:hover { background: #081521; }

  /* Gold corner accent on hover */
  .partner-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 0; height: 3px;
    background: linear-gradient(90deg, var(--gold-400), transparent);
    transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
  }
  .partner-card:hover::before { width: 100%; }

  /* Subtle radial glow on hover */
  .partner-card::after {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 80% at 30% 50%, rgba(201,168,76,0.05), transparent);
    opacity: 0; transition: opacity 0.5s;
    pointer-events: none;
  }
  .partner-card:hover::after { opacity: 1; }

  /* Logo area */
  .partner-logo-wrap {
    flex: 1; display: flex; align-items: center;
    margin-bottom: 24px;
  }
  .partner-logo-svg {
    max-height: 40px; width: auto;
    filter: brightness(0) invert(1) opacity(0.35);
    transition: filter 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.4s;
  }
  .partner-card:hover .partner-logo-svg {
    filter: brightness(0) invert(1) opacity(0.9);
    transform: translateY(-2px);
  }
  /* Gold tint for hover on some logos */
  .partner-card.gold-tint:hover .partner-logo-svg {
    filter: brightness(0) saturate(100%) invert(75%) sepia(40%) saturate(500%) hue-rotate(5deg) brightness(100%) opacity(0.95);
  }

  /* Bottom meta */
  .partner-card-meta {
    display: flex; align-items: center; justify-content: space-between;
  }
  .partner-card-type {
    font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(248,245,238,0.2);
    transition: color 0.35s;
  }
  .partner-card:hover .partner-card-type { color: rgba(201,168,76,0.6); }
  .partner-card-arrow {
    font-size: 0.65rem; color: rgba(201,168,76,0.2);
    transition: color 0.35s, transform 0.35s;
    opacity: 0; transform: translateX(-4px);
  }
  .partner-card:hover .partner-card-arrow {
    opacity: 1; color: var(--gold-400);
    transform: translateX(0);
  }

  /* Wide card — spans 2 columns */
  .partner-card.wide {
    grid-column: span 2;
  }
  /* Tall card */
  .partner-card.tall {
    grid-row: span 2;
  }

  /* Featured card — darker with gold border */
  .partner-card.featured {
    background: #060f18;
    border-left: 2px solid rgba(201,168,76,0.2);
  }
  .partner-card.featured:hover {
    background: #081a27;
    border-left-color: rgba(201,168,76,0.5);
  }

  /* Bottom strip — stats bar */
  .partners-stats {
    display: grid; grid-template-columns: repeat(4, 1fr);
    border: 1px solid rgba(248,245,238,0.04);
    border-top: none;
  }
  .partners-stat {
    padding: 28px 36px;
    border-right: 1px solid rgba(248,245,238,0.04);
    text-align: center;
    transition: background 0.3s;
  }
  .partners-stat:last-child { border-right: none; }
  .partners-stat:hover { background: rgba(201,168,76,0.03); }
  .partners-stat-val {
    font-family: var(--font-display); font-size: 2.2rem; font-weight: 300;
    color: var(--gold-400); line-height: 1; display: block;
  }
  .partners-stat-label {
    font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--white-30); margin-top: 6px; display: block;
  }

  /* Marquee strip below grid */
  .partners-marquee-wrap {
    margin-top: 52px;
    border-top: 1px solid rgba(248,245,238,0.04);
    padding-top: 36px;
    overflow: hidden; position: relative;
  }
  .partners-marquee-label {
    text-align: center; font-size: 0.58rem; letter-spacing: 0.28em;
    text-transform: uppercase; color: var(--white-30); margin-bottom: 24px;
  }
  .partners-marquee-track {
    display: flex; gap: 0;
    animation: partnersMarquee 32s linear infinite;
    white-space: nowrap;
  }
  .partners-marquee-item {
    display: inline-flex; align-items: center; gap: 20px;
    padding: 0 40px; flex-shrink: 0;
    font-family: var(--font-display); font-size: 1.1rem; font-weight: 300;
    letter-spacing: 0.08em; color: rgba(248,245,238,0.15);
    transition: color 0.3s;
  }
  .partners-marquee-item:hover { color: rgba(248,245,238,0.4); }
  .partners-marquee-sep { color: rgba(201,168,76,0.3); font-size: 0.5rem; }
  @keyframes partnersMarquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  /* ══════════════════════════════════════════
     ── CREAM CTA SECTION ──
  ══════════════════════════════════════════ */
  .elite-cta {
    background: var(--cream-100);
    padding: 140px 60px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  /* Subtle warm texture overlay */
  .elite-cta::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(180,150,90,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(180,150,90,0.07) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  /* Soft radial glow */
  .elite-cta::after {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.10), transparent 70%);
    pointer-events: none;
  }
  .elite-cta-content { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
  .elite-cta .section-label { color: var(--gold-500, #A8852A); }
  .elite-cta h2 {
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 4.5vw, 4.2rem);
    font-weight: 300; line-height: 1.13;
    color: var(--cream-ink);
    margin-bottom: 20px;
  }
  .elite-cta h2 em { color: var(--gold-400); font-style: italic; }
  .elite-cta p {
    font-size: 0.85rem;
    color: var(--cream-ink3);
    letter-spacing: 0.06em;
    margin-bottom: 52px;
    line-height: 1.8;
  }
  .cta-divider { width: 48px; height: 1px; background: var(--gold-400); margin: 0 auto 44px; opacity: 0.6; }

  /* ── FOOTER ── */
  footer { background: #030d17; padding: 72px 60px 40px; border-top: 1px solid var(--white-10); }
  .footer-top { display: grid; grid-template-columns: 1.8fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 60px; }
  .footer-brand-name { font-family: var(--font-display); font-size: 1.4rem; letter-spacing: 0.15em; font-weight: 500; color: var(--white); margin-bottom: 16px; }
  .footer-brand-name span { color: var(--gold-400); }
  .footer-tagline { font-size: 0.78rem; color: var(--white-60); line-height: 1.7; max-width: 240px; }
  .footer-col h5 { font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold-400); margin-bottom: 20px; }
  .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .footer-col a { font-size: 0.8rem; color: var(--white-60); text-decoration: none; transition: color 0.3s; cursor: pointer; }
  .footer-col a:hover { color: var(--white); }
  .footer-bottom { display: flex; align-items: center; justify-content: space-between; padding-top: 32px; border-top: 1px solid var(--white-10); font-size: 0.72rem; color: var(--white-30); }

  /* ── WA FLOAT ── */
  .wa-float { position: fixed; bottom: 32px; right: 32px; z-index: 300; width: 52px; height: 52px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 20px rgba(37,211,102,0.4); transition: transform 0.3s, box-shadow 0.3s; }
  .wa-float:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(37,211,102,0.55); }

  /* ══════════════════════════════════════════
     ── ZONE DETAIL: CREAM PACKAGES SECTION ──
  ══════════════════════════════════════════ */
  .zone-page { min-height: 100vh; background: var(--navy-900); }
  .zone-hero {
    min-height: 55vh; display: flex; align-items: flex-end;
    padding: 120px 60px 80px; position: relative; overflow: hidden;
  }
  .zone-hero-bg { position: absolute; inset: 0; z-index: 0; }
  .zone-hero-content { position: relative; z-index: 2; max-width: 700px; }
  .zone-back {
    position: absolute; top: 100px; left: 60px; z-index: 10;
    font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--white-60); cursor: pointer; transition: color 0.3s;
    display: flex; align-items: center; gap: 8px; background: none; border: none; font-family: var(--font-body);
  }
  .zone-back:hover { color: var(--gold-400); }
  .zone-hero-eyebrow { font-size: 0.68rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--gold-400); margin-bottom: 20px; display: block; }
  .zone-hero-name { font-family: var(--font-display); font-size: clamp(3.5rem, 7vw, 6.5rem); font-weight: 300; line-height: 0.95; color: var(--white); margin-bottom: 12px; }
  .zone-hero-fullname { font-family: var(--font-display); font-size: 1.2rem; font-weight: 300; color: var(--white-60); margin-bottom: 28px; font-style: italic; }
  .zone-hero-desc { font-size: 0.88rem; color: var(--white-80); line-height: 1.75; max-width: 560px; }
  .zone-stats-bar {
    background: var(--navy-800); padding: 32px 60px;
    display: flex; gap: 0; border-bottom: 1px solid var(--white-10);
  }
  .zone-stat { flex: 1; padding: 0 40px; border-right: 1px solid var(--white-10); text-align: center; }
  .zone-stat:first-child { padding-left: 0; }
  .zone-stat:last-child { border-right: none; }
  .zone-stat-val { font-family: var(--font-display); font-size: 2rem; font-weight: 300; color: var(--gold-400); display: block; }
  .zone-stat-key { font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--white-30); margin-top: 4px; }

  /* ── CREAM PACKAGES SECTION ── */
  .packages-section {
    padding: 100px 60px;
    background: var(--cream-100);
    position: relative;
  }
  .packages-section::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, transparent, var(--gold-400), transparent);
    opacity: 0.5;
  }
  .packages-section .section-label { color: var(--gold-500, #A8852A); }
  .packages-section .section-title { color: var(--cream-ink); }
  .packages-section .section-title em { color: var(--gold-400); }

  .packages-tabs { display: flex; gap: 0; border-bottom: 1px solid var(--cream-border); margin-bottom: 56px; }
  .pkg-tab {
    padding: 14px 28px; font-size: 0.75rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--cream-ink3); cursor: pointer; background: none; border: none;
    border-bottom: 2px solid transparent; font-family: var(--font-body); transition: all 0.3s; margin-bottom: -1px;
  }
  .pkg-tab.active { color: var(--cream-ink); border-bottom-color: var(--cream-ink); font-weight: 500; }
  .pkg-tab:hover { color: var(--cream-ink2); }

  .packages-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

  /* Standard card — warm ivory */
  .pkg-card {
    background: var(--cream-50);
    border: 1px solid var(--cream-border);
    padding: 40px 36px; position: relative; transition: all 0.35s var(--ease-out); cursor: pointer;
    display: flex; flex-direction: column;
    box-shadow: 0 2px 12px rgba(120,90,30,0.06);
  }
  .pkg-card:hover {
    border-color: rgba(201,168,76,0.5);
    transform: translateY(-5px);
    box-shadow: 0 16px 48px rgba(120,90,30,0.14);
  }

  /* Featured card — deep navy standing out from the cream */
  .pkg-card.featured {
    background: var(--navy-900);
    border: 1px solid rgba(201,168,76,0.35);
    box-shadow: 0 8px 40px rgba(0,0,0,0.22);
  }
  .pkg-card.featured:hover {
    border-color: var(--gold-400);
    transform: translateY(-5px);
    box-shadow: 0 20px 56px rgba(0,0,0,0.32);
  }
  .pkg-card.featured .pkg-name { color: var(--white); }
  .pkg-card.featured .pkg-tagline { color: var(--white-60); }
  .pkg-card.featured .pkg-price-val { color: var(--gold-400); }
  .pkg-card.featured .pkg-price-period { color: var(--white-30); }
  .pkg-card.featured .pkg-features { border-top: 1px solid var(--white-10); }
  .pkg-card.featured .pkg-feat { color: var(--white-80); }
  .pkg-card.featured .feat-check { color: var(--gold-400); }
  .pkg-card.featured .feat-x { color: var(--white-30); }

  .pkg-badge {
    font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
    padding: 4px 10px; width: fit-content; margin-bottom: 24px;
    border: 1px solid; font-weight: 500;
  }
  /* badge on standard cream card */
  .pkg-card:not(.featured) .pkg-badge { border-color: var(--cream-border); color: var(--cream-ink3); background: var(--cream-200); }
  /* badge on featured dark card */
  .pkg-card.featured .pkg-badge { border-color: var(--gold-400); color: var(--gold-400); background: rgba(201,168,76,0.08); }

  .pkg-name { font-family: var(--font-display); font-size: 1.8rem; font-weight: 400; color: var(--cream-ink); margin-bottom: 8px; }
  .pkg-tagline { font-size: 0.78rem; color: var(--cream-ink3); margin-bottom: 28px; }

  .pkg-price { margin-bottom: 32px; padding-bottom: 28px; border-bottom: 1px solid var(--cream-border); }
  .pkg-card.featured .pkg-price { border-bottom-color: var(--white-10); }
  .pkg-price-val { font-family: var(--font-display); font-size: 2.8rem; font-weight: 300; color: var(--cream-ink); line-height: 1; }
  .pkg-price-period { font-size: 0.72rem; color: var(--cream-ink3); letter-spacing: 0.1em; margin-top: 4px; }

  .pkg-features { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 36px; flex: 1; padding-top: 4px; }
  .pkg-feat { display: flex; align-items: flex-start; gap: 12px; font-size: 0.8rem; color: var(--cream-ink2); line-height: 1.5; }
  .feat-check { color: var(--gold-400); font-size: 0.8rem; margin-top: 2px; flex-shrink: 0; }
  .feat-x { color: var(--cream-border); font-size: 0.8rem; margin-top: 2px; flex-shrink: 0; }
  .pkg-card:not(.featured) .feat-check { color: #8A6820; }

  /* CTA buttons inside package cards */
  .pkg-card:not(.featured) .pkg-cta-btn {
    padding: 12px 20px; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase;
    font-family: var(--font-body); cursor: pointer; transition: all 0.3s; width: 100%;
    background: transparent; border: 1px solid var(--cream-border); color: var(--cream-ink2);
  }
  .pkg-card:not(.featured) .pkg-cta-btn:hover { border-color: var(--gold-400); color: var(--cream-ink); background: var(--cream-200); }
  .pkg-card.featured .pkg-cta-btn {
    padding: 12px 20px; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase;
    font-family: var(--font-body); cursor: pointer; transition: all 0.3s; width: 100%;
    background: var(--gold-400); border: none; color: var(--navy-900); font-weight: 500;
  }
  .pkg-card.featured .pkg-cta-btn:hover { background: var(--gold-300); }

  /* ── Includes & Steps (remain dark) ── */
  .includes-section { padding: 100px 60px; background: var(--navy-900); }
  .includes-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 56px; }
  .include-card { border: 1px solid var(--white-10); padding: 32px 24px; transition: border-color 0.3s; }
  .include-card:hover { border-color: rgba(201,168,76,0.2); }
  .include-icon { font-size: 1.5rem; margin-bottom: 16px; }
  .include-title { font-size: 0.88rem; font-weight: 500; color: var(--white); margin-bottom: 8px; }
  .include-desc { font-size: 0.76rem; color: var(--white-60); line-height: 1.65; }

  .steps-section { padding: 100px 60px; background: var(--navy-800); }
  .steps-list { display: flex; flex-direction: column; gap: 0; margin-top: 56px; max-width: 720px; margin-left: auto; margin-right: auto; }
  .step { display: flex; gap: 36px; padding: 36px 0; border-bottom: 1px solid var(--white-10); align-items: flex-start; }
  .step-num { font-family: var(--font-display); font-size: 3rem; font-weight: 300; color: rgba(201,168,76,0.2); line-height: 1; min-width: 60px; }
  .step-body h4 { font-size: 1rem; font-weight: 500; color: var(--white); margin-bottom: 8px; }
  .step-body p { font-size: 0.82rem; color: var(--white-60); line-height: 1.7; }
  .step-timeline { font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold-400); margin-top: 8px; }

  /* Calculator (remains dark) */
  .calc-section { padding: 100px 60px; background: var(--navy-800); }
  .calc-inner { display: grid; grid-template-columns: 1.2fr 1fr; gap: 64px; align-items: start; }
  .calc-title { font-family: var(--font-display); font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 300; color: var(--white); margin-bottom: 8px; }
  .calc-sub { font-size: 0.82rem; color: var(--white-60); margin-bottom: 44px; }
  .calc-form { display: flex; flex-direction: column; gap: 24px; }
  .calc-field { display: flex; flex-direction: column; gap: 8px; }
  .calc-label { font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--white-60); }
  .calc-select, .calc-input {
    background: var(--navy-900); border: 1px solid var(--white-10); color: var(--white);
    padding: 14px 16px; font-family: var(--font-body); font-size: 0.85rem; font-weight: 300;
    outline: none; transition: border-color 0.3s; appearance: none; -webkit-appearance: none;
  }
  .calc-select:focus, .calc-input:focus { border-color: var(--gold-400); }
  .calc-select option { background: var(--navy-800); }
  .calc-toggle-group { display: flex; gap: 0; }
  .calc-toggle {
    flex: 1; padding: 12px; text-align: center; font-size: 0.72rem; letter-spacing: 0.12em;
    text-transform: uppercase; font-family: var(--font-body); cursor: pointer; background: var(--navy-900);
    border: 1px solid var(--white-10); color: var(--white-60); transition: all 0.3s; margin-right: -1px;
  }
  .calc-toggle.active { background: var(--gold-glow2); border-color: var(--gold-400); color: var(--gold-400); z-index: 1; position: relative; }
  .calc-result { background: var(--navy-900); border: 1px solid rgba(201,168,76,0.2); padding: 44px 40px; position: sticky; top: 100px; }
  .calc-result-label { font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold-400); margin-bottom: 28px; }
  .calc-result-total { font-family: var(--font-display); font-size: 3.5rem; font-weight: 300; color: var(--white); line-height: 1; margin-bottom: 6px; }
  .calc-result-currency { font-family: var(--font-display); font-size: 1.6rem; color: var(--gold-400); }
  .calc-result-period { font-size: 0.72rem; color: var(--white-30); letter-spacing: 0.1em; margin-bottom: 36px; }
  .calc-breakdown { display: flex; flex-direction: column; gap: 0; margin-bottom: 36px; border-top: 1px solid var(--white-10); }
  .calc-line { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid var(--white-10); }
  .calc-line-label { font-size: 0.78rem; color: var(--white-60); }
  .calc-line-val { font-size: 0.82rem; color: var(--white); font-weight: 500; }
  .calc-note { font-size: 0.72rem; color: var(--white-30); line-height: 1.6; margin-bottom: 28px; }

  /* ── REVEAL ── */
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out); }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }
  .reveal-delay-5 { transition-delay: 0.5s; }

  /* ── KEYFRAMES ── */
  @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
  @keyframes scrollPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
  @keyframes orbPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
  @keyframes meshFloat1 { 0%, 100% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(40px, -30px) scale(1.05); } 66% { transform: translate(-20px, 20px) scale(0.97); } }
  @keyframes meshFloat2 { 0%, 100% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(-50px, 25px) scale(1.08); } 66% { transform: translate(30px, -15px) scale(0.95); } }
  @keyframes meshFloat3 { 0%, 100% { transform: translate(0px, 0px) scale(1); } 50% { transform: translate(25px, 40px) scale(1.06); } }
  @keyframes gridDrift { 0% { transform: translate(0, 0); } 100% { transform: translate(90px, 90px); } }

  /* ── HAMBURGER + DRAWER ── */
  .nav-hamburger {
    display: none; flex-direction: column; gap: 5px; cursor: pointer;
    background: none; border: none; padding: 6px; z-index: 310;
  }
  .nav-hamburger span {
    display: block; width: 24px; height: 1.5px; background: var(--white-60);
    transition: all 0.35s var(--ease-out); transform-origin: center;
  }
  .nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: var(--gold-400); }
  .nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: var(--gold-400); }

  .nav-drawer {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(3,10,20,0.97); backdrop-filter: blur(24px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    transform: translateX(100%); transition: transform 0.45s var(--ease-out);
    pointer-events: none; padding: 40px 24px;
  }
  .nav-drawer.open { transform: translateX(0); pointer-events: all; }
  .nav-drawer-brand {
    font-family: var(--font-display); font-size: 1.3rem; letter-spacing: .18em;
    color: var(--white); margin-bottom: 48px;
    opacity: 0; transform: translateY(10px);
    transition: opacity .4s .1s var(--ease-out), transform .4s .1s var(--ease-out);
  }
  .nav-drawer-brand span { color: var(--gold-400); }
  .nav-drawer.open .nav-drawer-brand { opacity: 1; transform: translateY(0); }
  .drawer-link {
    font-family: var(--font-display); font-size: clamp(2rem, 8vw, 3.2rem); font-weight: 300;
    letter-spacing: .02em; color: var(--white-60); background: none; border: none;
    padding: 10px 0; cursor: pointer; display: block; width: 100%; text-align: center;
    opacity: 0; transform: translateY(20px);
    transition: color .3s, opacity .4s var(--ease-out), transform .4s var(--ease-out);
  }
  .nav-drawer.open .drawer-link { opacity: 1; transform: translateY(0); }
  .nav-drawer.open .drawer-link:nth-of-type(1) { transition-delay: .12s; }
  .nav-drawer.open .drawer-link:nth-of-type(2) { transition-delay: .17s; }
  .nav-drawer.open .drawer-link:nth-of-type(3) { transition-delay: .22s; }
  .nav-drawer.open .drawer-link:nth-of-type(4) { transition-delay: .27s; }
  .nav-drawer.open .drawer-link:nth-of-type(5) { transition-delay: .32s; }
  .drawer-link:hover { color: var(--gold-400); }
  .drawer-divider { width: 40px; height: 1px; background: rgba(201,168,76,.25); margin: 20px 0; opacity: 0; transition: opacity .4s .35s; }
  .nav-drawer.open .drawer-divider { opacity: 1; }
  .drawer-cta-btn {
    font-family: var(--font-body); font-size: .72rem; letter-spacing: .18em; text-transform: uppercase;
    color: var(--gold-400); border: 1px solid var(--gold-400); background: none;
    padding: 13px 36px; cursor: pointer; margin-top: 8px;
    opacity: 0; transform: translateY(20px);
    transition: color .3s, background .3s, opacity .4s .37s var(--ease-out), transform .4s .37s var(--ease-out);
  }
  .nav-drawer.open .drawer-cta-btn { opacity: 1; transform: translateY(0); }
  .drawer-cta-btn:hover { background: var(--gold-400); color: var(--navy-900); }

  /* ── RESPONSIVE ── */
  @media (max-width: 1200px) {
    .zf-grid { grid-template-columns: repeat(3, 1fr); }
    .includes-grid { grid-template-columns: repeat(2, 1fr); }
    .calc-inner { grid-template-columns: 1fr; }
    .calc-result { position: static; }
  }
  @media (max-width: 900px) {
    .nav { padding: 16px 22px; }
    .nav.scrolled { padding: 12px 22px; }
    .nav-links { display: none; }
    .nav-cta { display: none; }
    .nav-hamburger { display: flex; }
    section { padding: 70px 22px; }
    .hero { padding: 0 22px; min-height: 100svh; }
    .hero-h1 { font-size: clamp(2.1rem, 7.5vw, 3.5rem); }
    .hero-sub { font-size: .75rem; letter-spacing: .1em; }
    .hero-actions { flex-direction: column; align-items: center; gap: 12px; }
    .hero-actions .btn-primary, .hero-actions .btn-ghost { width: 100%; max-width: 320px; text-align: center; }
    .zf-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .packages-grid { grid-template-columns: 1fr; }
    .expertise-grid { grid-template-columns: 1fr; gap: 12px; }
    .testi-grid { grid-template-columns: 1fr; }
    .why-inner { grid-template-columns: 1fr; }
    .why-visual { display: none; }
    .footer-top { grid-template-columns: 1fr 1fr; gap: 28px; }
    .footer-bottom { flex-direction: column; gap: 8px; text-align: center; padding: 20px 22px; }
    .zone-hero { padding: 88px 22px 52px; }
    .zone-back { left: 22px; top: 18px; }
    .zone-stats-bar { padding: 22px; flex-wrap: wrap; gap: 16px; }
    .zone-stat { flex: none; width: calc(50% - 8px); border-right: none; padding: 0 0 14px; border-bottom: 1px solid var(--white-10); }
    .packages-section, .calc-section, .includes-section, .steps-section { padding: 70px 22px; }
    .includes-grid { grid-template-columns: repeat(2, 1fr); }
    .partners-strip { gap: 20px; }
    .partners-grid { grid-template-columns: 1fr 1fr; }
    .partners-grid-row2 { grid-template-columns: 1fr 1fr; }
    .partners-stats { grid-template-columns: 1fr 1fr; }
    .elite-cta { padding: 80px 22px; }
    .section-title { font-size: clamp(1.7rem, 5vw, 2.8rem); }
    .why-pillars { gap: 12px; }
  }
  @media (max-width: 580px) {
    .nav { padding: 14px 16px; }
    section { padding: 56px 16px; }
    .hero { padding: 0 16px; }
    .hero-h1 { font-size: clamp(1.8rem, 9vw, 2.8rem); }
    .hero-sub { font-size: .68rem; }
    .hero-sub span { margin: 0 5px; }
    .zf-grid { grid-template-columns: 1fr; gap: 10px; }
    .zf-filter-bar { gap: 6px; }
    .zf-filter-btn { padding: 6px 12px; font-size: .65rem; }
    .includes-grid { grid-template-columns: 1fr; }
    .zone-stats-bar { flex-direction: column; gap: 0; }
    .zone-stat { width: 100%; border-right: none; padding: 14px 0; border-bottom: 1px solid var(--white-10); }
    .zone-stat:last-child { border-bottom: none; }
    .calc-toggle-group { flex-wrap: wrap; }
    .footer-top { grid-template-columns: 1fr; gap: 32px; }
    .partners-grid, .partners-grid-row2 { grid-template-columns: 1fr; }
    .partners-stats { grid-template-columns: 1fr 1fr; }
    .pillar { grid-template-columns: 48px 1fr; }
    .expertise-card { padding: 28px 18px; }
    .testi-card { padding: 24px 18px; }
    .btn-primary, .btn-ghost { padding: 13px 22px; font-size: .72rem; }
    .section-title { font-size: clamp(1.6rem, 8vw, 2.4rem); }
    .elite-cta h2 { font-size: clamp(1.8rem, 7vw, 2.8rem); }
    .hero-actions { padding: 0 8px; }
    .zf-card { padding: 24px 18px 20px; }
    .zf-zone-name { font-size: 1.4rem; }
    .why-pillar-num-big { font-size: 2rem; }
    .partners-marquee-track { gap: 28px; }
    .partners-logo-item { padding: 14px 18px; }
    .elite-cta { padding: 60px 16px; }
    .elite-cta-content { max-width: 100%; }
    .elite-cta-content > div { flex-direction: column; }
  }
  /* ── Global overflow fix ── */
  body, #root { overflow-x: hidden; max-width: 100vw; }
  * { box-sizing: border-box; }
  img, canvas, video { max-width: 100%; }
`;

// ─── ZONE DATA ────────────────────────────────────────────────
const ZONES = [
  {
    id: "dmcc", name: "DMCC", full: "Dubai Multi Commodities Centre", category: "trade", img: imgDMCC,
    badgeClass: "badge-trade", badgeLabel: "Trade & Commodities",
    desc: "The world's most connected free zone, hosting 23,000+ companies across commodities, fintech, and professional services.",
    location: "Jumeirah Lake Towers, Dubai", setupFrom: "AED 18,500", visaQuota: "Up to 6 visas", setupDays: "7–14", color: "#C9A84C",
    stats: [{ val: "23,000+", key: "Companies" }, { val: "7–14", key: "Setup Days" }, { val: "100%", key: "Foreign Ownership" }, { val: "0%", key: "Personal Tax" }],
    packages: [
      { name: "Starter", tagline: "Sole proprietor or single-activity setup", price: "18,500", badge: null, features: [{ text: "1 Trade License Activity", included: true }, { text: "Flexi Desk (Shared)", included: true }, { text: "2 Visa Allocation", included: true }, { text: "Company Stamp", included: true }, { text: "Bank Account Assistance", included: false }, { text: "Dedicated RM", included: false }] },
      { name: "Business", tagline: "Small to mid-size operations", price: "26,900", badge: "Most Popular", featured: true, features: [{ text: "3 Trade License Activities", included: true }, { text: "Private Office or Flexi Desk", included: true }, { text: "4 Visa Allocation", included: true }, { text: "Company Stamp + MOA", included: true }, { text: "Bank Account Assistance", included: true }, { text: "Dedicated RM", included: false }] },
      { name: "Elite", tagline: "Full-scale corporate presence", price: "44,500", badge: "Premium", features: [{ text: "Unlimited Activities", included: true }, { text: "Private Office", included: true }, { text: "6+ Visa Allocation", included: true }, { text: "Full Corporate Documents", included: true }, { text: "Priority Bank Account Setup", included: true }, { text: "Dedicated Relationship Manager", included: true }] },
    ],
    includes: [{ icon: "", title: "Trade License", desc: "Official DMCC trade license with your selected activities" }, { icon: "", title: "Registered Address", desc: "Legal UAE business address at Jumeirah Lake Towers" }, { icon: "", title: "Visa Processing", desc: "Investor & employee visa applications managed end-to-end" }, { icon: "", title: "Bank Referrals", desc: "Introductions to major UAE & international banking partners" }, { icon: "", title: "Corporate Documents", desc: "MOA, Memorandum, Share Certificates, Company Stamp" }, { icon: "", title: "Government Liaison", desc: "All government submissions and approvals managed by us" }, { icon: "", title: "PRO Support", desc: "Ongoing PRO assistance throughout setup and beyond" }, { icon: "", title: "Portal Access", desc: "Real-time status tracking through your client dashboard" }],
    steps: [{ title: "Initial Consultation", desc: "We assess your business activities, share structure, and visa requirements to recommend the optimal setup path.", time: "Day 1" }, { title: "Name Reservation", desc: "Trade name reservation submitted to DMCC authority.", time: "Day 1–2" }, { title: "License Application", desc: "Full license application with supporting documents submitted.", time: "Day 2–5" }, { title: "Authority Approvals", desc: "DMCC authority reviews and approves your application.", time: "Day 5–10" }, { title: "Visa & Banking", desc: "Investor visa processing begins. Bank account introductions initiated.", time: "Day 10–21" }, { title: "Operational Handover", desc: "Final documents delivered. Full setup briefing.", time: "Day 14–21" }],
    calcs: { basePrice: 18500, activities: { 1: 0, 3: 3500, 5: 6500, "unlimited": 12000 }, office: { flexi: 0, private: 8400, premium: 18000 }, visas: { 0: 0, 2: 0, 4: 3200, 6: 6400, 8: 9600 } },
  },
  {
    id: "ifza", name: "IFZA", full: "International Free Zone Authority", category: "free", img: imgIFZA,
    badgeClass: "badge-free", badgeLabel: "Multi-Activity",
    desc: "One of UAE's most competitive free zones. Fast, flexible, and cost-effective with broad activity coverage.",
    location: "Dubai Silicon Oasis, Dubai", setupFrom: "AED 12,900", visaQuota: "Up to 6 visas", setupDays: "3–7", color: "#D4B468",
    stats: [{ val: "10,000+", key: "Companies" }, { val: "3–7", key: "Setup Days" }, { val: "100%", key: "Foreign Ownership" }, { val: "0%", key: "Personal Tax" }],
    packages: [
      { name: "Flexi", tagline: "Digital nomads & solo operators", price: "12,900", badge: null, features: [{ text: "1 Activity", included: true }, { text: "Virtual Office", included: true }, { text: "1 Visa Allocation", included: true }, { text: "Company Documents", included: true }, { text: "Bank Assistance", included: false }, { text: "Dedicated RM", included: false }] },
      { name: "Growth", tagline: "SMEs and growing businesses", price: "19,500", badge: "Best Value", featured: true, features: [{ text: "Up to 3 Activities", included: true }, { text: "Flexi Desk", included: true }, { text: "3 Visa Allocation", included: true }, { text: "Full Corporate Documents", included: true }, { text: "Bank Account Assistance", included: true }, { text: "Dedicated RM", included: false }] },
      { name: "Corporate", tagline: "Full-scale incorporation", price: "34,500", badge: "Premium", features: [{ text: "Unlimited Activities", included: true }, { text: "Private Office", included: true }, { text: "6 Visa Allocation", included: true }, { text: "Full Corporate Documents", included: true }, { text: "Priority Banking Setup", included: true }, { text: "Dedicated Relationship Manager", included: true }] },
    ],
    includes: [{ icon: "", title: "Rapid Processing", desc: "License issued in as little as 3 business days" }, { icon: "", title: "100+ Activities", desc: "Trading, consulting, services, e-commerce and more" }, { icon: "", title: "Trade License", desc: "Official IFZA trade license with full legal standing" }, { icon: "", title: "Registered Address", desc: "Legal UAE business address in Dubai Silicon Oasis" }, { icon: "", title: "Visa Services", desc: "Investor and employee visa processing, managed fully" }, { icon: "", title: "Banking Support", desc: "Relationships with UAE's top banking institutions" }, { icon: "", title: "Corporate Docs", desc: "MOA, share certificates, company stamp, all documents" }, { icon: "", title: "Government PRO", desc: "Complete government liaison throughout the process" }],
    steps: [{ title: "Consultation & Planning", desc: "Activity selection, share structure, and package recommendation.", time: "Day 1" }, { title: "Document Submission", desc: "Passport copies, application forms and business plan submitted.", time: "Day 1–2" }, { title: "License Issuance", desc: "IFZA processes and issues your trade license.", time: "Day 3–5" }, { title: "Corporate Docs", desc: "MOA, share certificates, company stamp issued.", time: "Day 5–7" }, { title: "Visa Processing", desc: "Investor visa applications submitted, medical and Emirates ID.", time: "Day 7–21" }, { title: "Bank Account", desc: "Bank introductions and account opening support.", time: "Day 14–30" }],
    calcs: { basePrice: 12900, activities: { 1: 0, 3: 2000, 5: 4500, "unlimited": 9000 }, office: { virtual: 0, flexi: 2800, private: 7200 }, visas: { 0: 0, 1: 0, 3: 2400, 6: 4800 } },
  },
  {
    id: "meydan", name: "Meydan", full: "Meydan Free Zone", category: "free", img: imgMeydan,
    badgeClass: "badge-free", badgeLabel: "Premium Location",
    desc: "Premium free zone in the heart of Dubai's most iconic district. Ideal for consultancies, tech firms, and lifestyle brands.",
    location: "Meydan, Dubai", setupFrom: "AED 14,500", visaQuota: "Up to 3 visas", setupDays: "5–10", color: "#9a75e8",
    stats: [{ val: "5,000+", key: "Companies" }, { val: "5–10", key: "Setup Days" }, { val: "100%", key: "Foreign Ownership" }, { val: "0%", key: "Personal Tax" }],
    packages: [
      { name: "Solo", tagline: "Individual consultants & freelancers", price: "14,500", badge: null, features: [{ text: "1 Activity", included: true }, { text: "Virtual Address", included: true }, { text: "1 Visa", included: true }, { text: "Documents", included: true }, { text: "Banking Support", included: false }, { text: "Dedicated RM", included: false }] },
      { name: "Studio", tagline: "Small teams and boutique firms", price: "22,500", badge: "Popular", featured: true, features: [{ text: "3 Activities", included: true }, { text: "Flexi Desk", included: true }, { text: "3 Visas", included: true }, { text: "Full Documents", included: true }, { text: "Banking Support", included: true }, { text: "Dedicated RM", included: false }] },
      { name: "Prestige", tagline: "Full-service corporate setup", price: "39,900", badge: "Elite", features: [{ text: "Unlimited Activities", included: true }, { text: "Private Office", included: true }, { text: "6+ Visas", included: true }, { text: "Full Documents", included: true }, { text: "Priority Banking", included: true }, { text: "Dedicated RM", included: true }] },
    ],
    includes: [{ icon: "", title: "Prestigious Address", desc: "Meydan — one of Dubai's most recognisable addresses" }, { icon: "", title: "Trade License", desc: "Official Meydan Free Zone trade license" }, { icon: "", title: "Wide Activities", desc: "Consulting, trading, tech, media, and e-commerce" }, { icon: "", title: "Bank Introductions", desc: "Local and international banking partners" }, { icon: "", title: "Visa Services", desc: "Investor and employee visa management" }, { icon: "", title: "Corporate Documents", desc: "Complete set of incorporation documents" }, { icon: "", title: "PRO Services", desc: "Full government liaison and document services" }, { icon: "", title: "Client Portal", desc: "Track your setup status in real time" }],
    steps: [{ title: "Initial Consultation", desc: "Activity, structure, and visa planning session.", time: "Day 1" }, { title: "Application Submission", desc: "Forms, passport copies, business summary submitted.", time: "Day 2–3" }, { title: "Approvals", desc: "Meydan authority review and approval.", time: "Day 3–7" }, { title: "License Issued", desc: "Trade license and corporate documents ready.", time: "Day 7–10" }, { title: "Visa & ID", desc: "Investor visa processing and Emirates ID.", time: "Day 10–25" }, { title: "Handover", desc: "Full document handover and onboarding.", time: "Day 15–25" }],
    calcs: { basePrice: 14500, activities: { 1: 0, 3: 2500, 5: 5000, unlimited: 9500 }, office: { virtual: 0, flexi: 3200, private: 8500 }, visas: { 0: 0, 1: 0, 3: 2800, 6: 5600 } },
  },
  {
    id: "rakez", name: "RAKEZ", full: "Ras Al Khaimah Economic Zone", category: "industrial", img: imgRAKEZ,
    badgeClass: "badge-industrial", badgeLabel: "Industrial & Commercial",
    desc: "Northern Emirates' most competitive zone. Ideal for manufacturing, trading, and industrial operations at low cost.",
    location: "Ras Al Khaimah, UAE", setupFrom: "AED 8,500", visaQuota: "Up to 10 visas", setupDays: "3–7", color: "#48bb78",
    stats: [{ val: "14,000+", key: "Companies" }, { val: "3–7", key: "Setup Days" }, { val: "100%", key: "Foreign Ownership" }, { val: "0%", key: "Personal Tax" }],
    packages: [
      { name: "Starter", tagline: "Entry-level SME setup", price: "8,500", badge: null, features: [{ text: "1 Activity", included: true }, { text: "Virtual Office", included: true }, { text: "2 Visas", included: true }, { text: "Documents", included: true }, { text: "Banking Support", included: false }, { text: "Dedicated RM", included: false }] },
      { name: "Business", tagline: "Established SMEs & trading companies", price: "16,500", badge: "Best Value", featured: true, features: [{ text: "3 Activities", included: true }, { text: "Office Space", included: true }, { text: "5 Visas", included: true }, { text: "Full Documents", included: true }, { text: "Banking Support", included: true }, { text: "Dedicated RM", included: false }] },
      { name: "Industrial", tagline: "Factory, warehouse & manufacturing", price: "28,500", badge: "Industrial", features: [{ text: "Unlimited Activities", included: true }, { text: "Warehouse/Factory Unit", included: true }, { text: "10 Visas", included: true }, { text: "Full Documents", included: true }, { text: "Priority Banking", included: true }, { text: "Dedicated RM", included: true }] },
    ],
    includes: [{ icon: "", title: "Industrial Land", desc: "Access to warehouses, factories and land plots" }, { icon: "", title: "Fast Processing", desc: "Setup completed in as little as 3 days" }, { icon: "", title: "Trade License", desc: "Official RAKEZ trade license" }, { icon: "", title: "Lowest Cost", desc: "UAE's most competitive free zone setup costs" }, { icon: "", title: "Up to 10 Visas", desc: "Generous visa quota for teams and staff" }, { icon: "", title: "Banking Support", desc: "Bank account facilitation and referrals" }, { icon: "", title: "PRO Services", desc: "Full government liaison support" }, { icon: "", title: "Port Access", desc: "Direct access to Saqr and Khorfakkan ports" }],
    steps: [{ title: "Zone & Activity Selection", desc: "We guide you through RAKEZ's business and industrial zones.", time: "Day 1" }, { title: "Application Submission", desc: "Documents and forms submitted to RAKEZ authority.", time: "Day 1–2" }, { title: "License Issuance", desc: "License issued rapidly — often within 3 business days.", time: "Day 3–5" }, { title: "Facility Allocation", desc: "Office, warehouse or factory allocation confirmed.", time: "Day 5–7" }, { title: "Visa Processing", desc: "Investor and employee visa processing begins.", time: "Day 7–21" }, { title: "Operational Handover", desc: "Full document set delivered and setup complete.", time: "Day 14–21" }],
    calcs: { basePrice: 8500, activities: { 1: 0, 3: 1500, 5: 3000, unlimited: 7000 }, office: { virtual: 0, shared: 1800, private: 5500, warehouse: 14000 }, visas: { 0: 0, 2: 0, 5: 3500, 10: 7000 } },
  },
  {
    id: "shams", name: "SHAMS", full: "Sharjah Media City", category: "media", img: imgSHAMS,
    badgeClass: "badge-media", badgeLabel: "Media & Creative",
    desc: "UAE's leading media-focused free zone. Designed for content creators, media companies, and consultancies.",
    location: "Sharjah, UAE", setupFrom: "AED 11,500", visaQuota: "Up to 6 visas", setupDays: "5–8", color: "#9a75e8",
    stats: [{ val: "8,000+", key: "Companies" }, { val: "5–8", key: "Setup Days" }, { val: "100%", key: "Foreign Ownership" }, { val: "0%", key: "Personal Tax" }],
    packages: [
      { name: "Creator", tagline: "Freelancers & content creators", price: "11,500", badge: null, features: [{ text: "1 Media Activity", included: true }, { text: "Virtual Address", included: true }, { text: "1 Visa", included: true }, { text: "Documents", included: true }, { text: "Banking Support", included: false }, { text: "Dedicated RM", included: false }] },
      { name: "Studio", tagline: "Production companies & agencies", price: "18,900", badge: "Popular", featured: true, features: [{ text: "3 Activities", included: true }, { text: "Studio Access", included: true }, { text: "3 Visas", included: true }, { text: "Full Documents", included: true }, { text: "Banking Support", included: true }, { text: "Dedicated RM", included: false }] },
      { name: "Broadcast", tagline: "Full media enterprise setup", price: "32,500", badge: "Enterprise", features: [{ text: "Unlimited Activities", included: true }, { text: "Private Office/Studio", included: true }, { text: "6 Visas", included: true }, { text: "Full Documents", included: true }, { text: "Priority Banking", included: true }, { text: "Dedicated RM", included: true }] },
    ],
    includes: [{ icon: "", title: "Media License", desc: "Specific media, broadcasting and creative activities" }, { icon: "", title: "Digital Activities", desc: "Social media, content production, digital marketing" }, { icon: "", title: "Creative Workspace", desc: "Studios, production suites and creative offices" }, { icon: "", title: "Trade License", desc: "Official SHAMS trade license" }, { icon: "", title: "Visa Services", desc: "Investor and employee visa management" }, { icon: "", title: "Banking Support", desc: "Bank account facilitation and referrals" }, { icon: "", title: "PRO Services", desc: "Full government liaison" }, { icon: "", title: "Media Network", desc: "Access to Sharjah's growing media ecosystem" }],
    steps: [{ title: "Activity Consultation", desc: "Select from SHAMS' comprehensive list of media and creative activities.", time: "Day 1" }, { title: "Application", desc: "Documents submitted to SHAMS authority.", time: "Day 1–3" }, { title: "Approvals", desc: "SHAMS reviews and approves application.", time: "Day 3–6" }, { title: "License Issued", desc: "Trade license and corporate documents ready.", time: "Day 6–8" }, { title: "Visa Processing", desc: "Investor visa applications and Emirates ID.", time: "Day 8–22" }, { title: "Handover", desc: "Full document and onboarding session.", time: "Day 15–22" }],
    calcs: { basePrice: 11500, activities: { 1: 0, 3: 2000, 5: 4200, unlimited: 8500 }, office: { virtual: 0, flexi: 2600, studio: 7800, private: 9200 }, visas: { 0: 0, 1: 0, 3: 2600, 6: 5200 } },
  },
  {
    id: "jafza", name: "JAFZA", full: "Jebel Ali Free Zone Authority", category: "trade", img: imgJAFZA,
    badgeClass: "badge-trade", badgeLabel: "Logistics & Trade",
    desc: "The world's largest free zone by area. Unmatched for logistics, import/export, and large-scale trade operations.",
    location: "Jebel Ali, Dubai", setupFrom: "AED 22,000", visaQuota: "Up to 15 visas", setupDays: "7–14", color: "#C9A84C",
    stats: [{ val: "9,000+", key: "Companies" }, { val: "7–14", key: "Setup Days" }, { val: "100%", key: "Foreign Ownership" }, { val: "0%", key: "Corporate Tax" }],
    packages: [
      { name: "Trade", tagline: "Import/export SMEs", price: "22,000", badge: null, features: [{ text: "1 Trading Activity", included: true }, { text: "Registered Office", included: true }, { text: "3 Visas", included: true }, { text: "Documents", included: true }, { text: "Banking Support", included: false }, { text: "Dedicated RM", included: false }] },
      { name: "Logistics Plus", tagline: "Freight, distribution & logistics", price: "38,500", badge: "Most Popular", featured: true, features: [{ text: "5 Activities", included: true }, { text: "Warehouse Unit", included: true }, { text: "8 Visas", included: true }, { text: "Full Documents", included: true }, { text: "Banking Support", included: true }, { text: "Dedicated RM", included: false }] },
      { name: "Enterprise", tagline: "Large-scale operations", price: "65,000", badge: "Enterprise", features: [{ text: "Unlimited Activities", included: true }, { text: "Large Warehouse/Land", included: true }, { text: "15 Visas", included: true }, { text: "Full Documents", included: true }, { text: "Priority Banking", included: true }, { text: "Dedicated RM", included: true }] },
    ],
    includes: [{ icon: "", title: "Port Access", desc: "Direct access to Jebel Ali — world's 9th largest port" }, { icon: "", title: "Logistics Hub", desc: "World-class infrastructure for logistics and distribution" }, { icon: "", title: "Trade License", desc: "Official JAFZA trade license" }, { icon: "", title: "Warehouse & Land", desc: "Warehouses, factories and land plots available" }, { icon: "", title: "Up to 15 Visas", desc: "Largest visa quota of any UAE free zone" }, { icon: "", title: "Banking Support", desc: "Major bank account facilitation" }, { icon: "", title: "Global Access", desc: "190+ countries connected through Jebel Ali port" }, { icon: "", title: "PRO Services", desc: "Full government and customs liaison" }],
    steps: [{ title: "Consultation", desc: "Activity, facility type and corporate structure planning.", time: "Day 1" }, { title: "Application", desc: "Submission to JAFZA authority with all documentation.", time: "Day 1–3" }, { title: "Approvals", desc: "JAFZA reviews application and conducts facility allocation.", time: "Day 3–8" }, { title: "License Issued", desc: "Trade license and corporate documents issued.", time: "Day 8–12" }, { title: "Visa Processing", desc: "Investor and staff visa applications submitted.", time: "Day 12–28" }, { title: "Operational Handover", desc: "Keys, documents and full onboarding session.", time: "Day 14–28" }],
    calcs: { basePrice: 22000, activities: { 1: 0, 5: 5000, 10: 9500, unlimited: 18000 }, office: { office: 0, warehouse: 12000, large_warehouse: 28000, land: 45000 }, visas: { 0: 0, 3: 0, 8: 6000, 15: 14000 } },
  },
  {
    id: "afz", name: "AFZ", full: "Ajman Free Zone", category: "free", img: imgAFZ,
    badgeClass: "badge-free", badgeLabel: "Budget Friendly",
    desc: "UAE's most affordable free zone option. Perfect for startups, freelancers, and cost-conscious entrepreneurs.",
    location: "Ajman, UAE", setupFrom: "AED 5,500", visaQuota: "Up to 6 visas", setupDays: "2–5", color: "#48bb78",
    stats: [{ val: "10,000+", key: "Companies" }, { val: "2–5", key: "Setup Days" }, { val: "100%", key: "Foreign Ownership" }, { val: "0%", key: "Personal Tax" }],
    packages: [
      { name: "Micro", tagline: "Solo operators on a budget", price: "5,500", badge: "Lowest Cost", features: [{ text: "1 Activity", included: true }, { text: "Virtual Office", included: true }, { text: "1 Visa", included: true }, { text: "Documents", included: true }, { text: "Banking Support", included: false }, { text: "Dedicated RM", included: false }] },
      { name: "SME", tagline: "Small businesses & startups", price: "11,900", badge: "Best Value", featured: true, features: [{ text: "3 Activities", included: true }, { text: "Office Unit", included: true }, { text: "3 Visas", included: true }, { text: "Full Documents", included: true }, { text: "Banking Support", included: true }, { text: "Dedicated RM", included: false }] },
      { name: "Growth", tagline: "Scaling businesses", price: "22,500", badge: "Growth", features: [{ text: "Unlimited Activities", included: true }, { text: "Large Office", included: true }, { text: "6 Visas", included: true }, { text: "Full Documents", included: true }, { text: "Priority Banking", included: true }, { text: "Dedicated RM", included: true }] },
    ],
    includes: [{ icon: "", title: "Lowest Cost in UAE", desc: "Most affordable free zone setup starting from AED 5,500" }, { icon: "", title: "2-Day Setup", desc: "Fastest license issuance in the UAE" }, { icon: "", title: "Trade License", desc: "Official Ajman Free Zone trade license" }, { icon: "", title: "Registered Address", desc: "Legal UAE business address in Ajman" }, { icon: "", title: "Visa Services", desc: "Investor and employee visa processing" }, { icon: "", title: "Banking Support", desc: "UAE bank account introductions" }, { icon: "", title: "PRO Services", desc: "Full government liaison" }, { icon: "", title: "Wide Activities", desc: "Trading, consulting, services and more" }],
    steps: [{ title: "Consultation", desc: "Quick activity selection and package confirmation.", time: "Day 1" }, { title: "Application", desc: "Documents submitted — process is extremely streamlined.", time: "Day 1" }, { title: "License Issued", desc: "Among the fastest in UAE — often 2 business days.", time: "Day 2–3" }, { title: "Documents", desc: "Corporate documents and company stamp ready.", time: "Day 3–5" }, { title: "Visa Processing", desc: "Investor visa and Emirates ID applications.", time: "Day 5–18" }, { title: "Handover", desc: "Full document delivery and setup complete.", time: "Day 10–18" }],
    calcs: { basePrice: 5500, activities: { 1: 0, 3: 1200, 5: 2500, unlimited: 5500 }, office: { virtual: 0, shared: 1500, private: 4000 }, visas: { 0: 0, 1: 0, 3: 2000, 6: 4000 } },
  },
  {
    id: "adgm", name: "ADGM", full: "Abu Dhabi Global Market", category: "financial", img: imgADGM,
    badgeClass: "badge-financial", badgeLabel: "Financial Services",
    desc: "Abu Dhabi's premier international financial centre. Ideal for asset management, fintech, and regulated financial services.",
    location: "Al Maryah Island, Abu Dhabi", setupFrom: "AED 28,500", visaQuota: "Up to 8 visas", setupDays: "10–21", color: "#ed8936",
    stats: [{ val: "2,500+", key: "Companies" }, { val: "10–21", key: "Setup Days" }, { val: "100%", key: "Foreign Ownership" }, { val: "0%", key: "Personal Tax" }],
    packages: [
      { name: "Professional", tagline: "Licensed professionals & consultants", price: "28,500", badge: null, features: [{ text: "1 Professional Activity", included: true }, { text: "Registered Office", included: true }, { text: "2 Visas", included: true }, { text: "Documents", included: true }, { text: "Banking Support", included: false }, { text: "Dedicated RM", included: false }] },
      { name: "Financial", tagline: "Asset managers & fintech firms", price: "45,000", badge: "Most Popular", featured: true, features: [{ text: "3 Financial Activities", included: true }, { text: "Office Space", included: true }, { text: "4 Visas", included: true }, { text: "Full Documents", included: true }, { text: "Banking Support", included: true }, { text: "Dedicated RM", included: false }] },
      { name: "Institution", tagline: "Banks, funds & institutions", price: "85,000", badge: "Institutional", features: [{ text: "Unlimited Activities", included: true }, { text: "Premium Office", included: true }, { text: "8 Visas", included: true }, { text: "Full Documents", included: true }, { text: "Priority Banking", included: true }, { text: "Dedicated RM", included: true }] },
    ],
    includes: [{ icon: "", title: "Regulated Framework", desc: "ADGM's internationally recognised legal framework" }, { icon: "", title: "Financial Activities", desc: "Asset management, fintech, banking and advisory" }, { icon: "", title: "Trade License", desc: "Official ADGM commercial license" }, { icon: "", title: "Global Recognition", desc: "Recognised alongside DIFC as a top global IFC" }, { icon: "", title: "Visa Services", desc: "Investor and professional visa management" }, { icon: "", title: "Tier-1 Banking", desc: "Introductions to Abu Dhabi's elite banks" }, { icon: "", title: "Legal Framework", desc: "English Common Law jurisdiction" }, { icon: "", title: "PRO Services", desc: "Full government liaison and compliance" }],
    steps: [{ title: "Regulatory Consultation", desc: "Assess regulated vs non-regulated activities and licensing requirements.", time: "Day 1–3" }, { title: "Application Preparation", desc: "Comprehensive application with business plan and compliance documents.", time: "Day 3–7" }, { title: "ADGM Review", desc: "Authority conducts thorough review of application.", time: "Day 7–14" }, { title: "License Issuance", desc: "Commercial license and registration certificate issued.", time: "Day 14–18" }, { title: "Visa & Banking", desc: "Investor visa processing and elite banking introductions.", time: "Day 18–35" }, { title: "Handover", desc: "Full regulatory briefing and operational handover.", time: "Day 21–35" }],
    calcs: { basePrice: 28500, activities: { 1: 0, 3: 6000, 5: 12000, unlimited: 22000 }, office: { registered: 0, office: 15000, premium: 35000 }, visas: { 0: 0, 2: 0, 4: 4500, 8: 9000 } },
  },
];

const CATEGORIES = [
  { id: "all", label: "All Zones" }, { id: "trade", label: "Trade & Logistics" },
  { id: "tech", label: "Tech & Fintech" }, { id: "media", label: "Media & Creative" },
  { id: "industrial", label: "Industrial" }, { id: "financial", label: "Financial Services" },
  { id: "free", label: "Multi-Purpose" },
];

// ─── CANVAS / HERO ────────────────────────────────────────────
function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext("2d"); let W, H, raf;
    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const pts = Array.from({ length: 70 }, () => ({ x: Math.random() * 1920, y: Math.random() * 1080, vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22, r: Math.random() * 1.4 + .4, o: Math.random() * 0.5 + 0.15 }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) { const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy); if (d < 190) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = `rgba(201,168,76,${0.09 * (1 - d / 190)})`; ctx.lineWidth = .5; ctx.stroke(); } }
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4); grd.addColorStop(0, `rgba(201,168,76,${p.o})`); grd.addColorStop(1, "rgba(201,168,76,0)");
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fillStyle = grd; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(201,168,76,${p.o + 0.2})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2 }} />;
}

function HeroCanvas() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, animation: "meshFloat1 18s ease-in-out infinite", background: "radial-gradient(ellipse 70% 60% at 20% 60%, rgba(22,51,84,0.4) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, animation: "meshFloat2 14s ease-in-out infinite", background: "radial-gradient(ellipse 50% 50% at 80% 30%, rgba(16,37,64,0.4) 0%, transparent 65%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, animation: "meshFloat3 20s ease-in-out infinite", background: "radial-gradient(ellipse 40% 40% at 60% 75%, rgba(201,168,76,0.05) 0%, transparent 60%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 2, backgroundImage: `linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)`, backgroundSize: "90px 90px", animation: "gridDrift 25s linear infinite" }} />
      <ParticleCanvas />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "200px", zIndex: 4, background: "linear-gradient(to top, rgba(5,17,30,0.8), transparent)" }} />
    </div>
  );
}

function ZoneHeroCanvas({ color }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let W, H, raf, t = 0;
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      t += 0.005; ctx.clearRect(0, 0, W, H);
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "rgba(5,17,30,0.96)"); g.addColorStop(0.5, "rgba(11,28,45,0.9)"); g.addColorStop(1, "rgba(3,13,23,0.98)");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < 3; i++) {
        const x = W * (0.2 + i * 0.3) + Math.sin(t + i) * 60, y = H * (0.3 + i * 0.2) + Math.cos(t * 0.7 + i) * 40, r = 200 + i * 80;
        const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
        const c1 = color || "#C9A84C"; const rgb = parseInt(c1.slice(1), 16); const [rr, gg, bb] = [rgb >> 16, (rgb >> 8) & 255, rgb & 255];
        rg.addColorStop(0, `rgba(${rr},${gg},${bb},0.08)`); rg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [color]);
  return <canvas ref={ref} className="zone-hero-bg" style={{ width: "100%", height: "100%" }} />;
}

function useReveal() {
  useEffect(() => {
    const setup = () => {
      const els = document.querySelectorAll(".reveal");
      const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }), { threshold: 0.1 });
      els.forEach(el => obs.observe(el));
      return () => obs.disconnect();
    };
    return setup();
  });
}

// ─── CALCULATOR ───────────────────────────────────────────────
function Calculator({ zone }) {
  const calcs = zone.calcs;
  const activityKeys = Object.keys(calcs.activities);
  const officeKeys = Object.keys(calcs.office);
  const visaKeys = Object.keys(calcs.visas);
  const [activity, setActivity] = useState(activityKeys[0]);
  const [office, setOffice] = useState(officeKeys[0]);
  const [visas, setVisas] = useState(visaKeys[0]);
  const [proSupport, setProSupport] = useState(false);
  const base = calcs.basePrice, actCost = calcs.activities[activity] || 0, offCost = calcs.office[office] || 0, visaCost = calcs.visas[visas] || 0, proCost = proSupport ? 3500 : 0;
  const total = base + actCost + offCost + visaCost + proCost;
  const fmt = n => "AED " + n.toLocaleString();
  return (
    <div className="calc-section">
      <span className="section-label reveal">Cost Estimator</span>
      <div className="calc-inner">
        <div>
          <h2 className="calc-title reveal">Build Your <em style={{ color: "var(--gold-400)", fontStyle: "italic", fontFamily: "var(--font-display)" }}>Custom Package</em></h2>
          <p className="calc-sub reveal reveal-delay-1">Configure your requirements and get an instant cost breakdown.</p>
          <div className="calc-form">
            <div className="calc-field reveal reveal-delay-2"><label className="calc-label">Business Activities</label><select className="calc-select" value={activity} onChange={e => setActivity(e.target.value)}>{activityKeys.map(k => <option key={k} value={k}>{k === "unlimited" ? "Unlimited Activities" : k + " Activity" + (k > 1 ? "s" : "")}{k !== "unlimited" && calcs.activities[k] > 0 ? " (+AED " + calcs.activities[k].toLocaleString() + ")" : " (Included)"}</option>)}</select></div>
            <div className="calc-field reveal reveal-delay-2"><label className="calc-label">Office / Workspace</label><select className="calc-select" value={office} onChange={e => setOffice(e.target.value)}>{officeKeys.map(k => <option key={k} value={k}>{k.charAt(0).toUpperCase() + k.slice(1).replace(/_/g, " ")}{calcs.office[k] > 0 ? " (+AED " + calcs.office[k].toLocaleString() + ")" : " (Included)"}</option>)}</select></div>
            <div className="calc-field reveal reveal-delay-3"><label className="calc-label">Visa Allocation</label><select className="calc-select" value={visas} onChange={e => setVisas(e.target.value)}>{visaKeys.map(k => <option key={k} value={k}>{k === "0" ? "No Visas" : k + " Visa" + (k > 1 ? "s" : "")}{calcs.visas[k] > 0 ? " (+AED " + calcs.visas[k].toLocaleString() + ")" : " (Included)"}</option>)}</select></div>
            <div className="calc-field reveal reveal-delay-3"><label className="calc-label">PRO & Government Support</label>
              <div className="calc-toggle-group">
                <button className={`calc-toggle${!proSupport ? " active" : ""}`} onClick={() => setProSupport(false)}>Not Required</button>
                <button className={`calc-toggle${proSupport ? " active" : ""}`} onClick={() => setProSupport(true)}>Add PRO Support (+AED 3,500)</button>
              </div>
            </div>
          </div>
        </div>
        <div className="calc-result reveal">
          <div className="calc-result-label">Estimated Total Cost</div>
          <div className="calc-result-total"><span className="calc-result-currency">AED </span>{total.toLocaleString()}</div>
          <div className="calc-result-period">One-time setup cost (excl. annual renewal)</div>
          <div className="calc-breakdown">
            <div className="calc-line"><span className="calc-line-label">Base License Fee</span><span className="calc-line-val">{fmt(base)}</span></div>
            {actCost > 0 && <div className="calc-line"><span className="calc-line-label">Additional Activities</span><span className="calc-line-val">+{fmt(actCost)}</span></div>}
            {offCost > 0 && <div className="calc-line"><span className="calc-line-label">Workspace</span><span className="calc-line-val">+{fmt(offCost)}</span></div>}
            {visaCost > 0 && <div className="calc-line"><span className="calc-line-label">Visa Processing</span><span className="calc-line-val">+{fmt(visaCost)}</span></div>}
            {proCost > 0 && <div className="calc-line"><span className="calc-line-label">PRO Support</span><span className="calc-line-val">+{fmt(proCost)}</span></div>}
            <div className="calc-line" style={{ borderBottom: "none", paddingTop: "16px" }}><span className="calc-line-label" style={{ fontWeight: "500", color: "var(--white)" }}>Total Estimate</span><span className="calc-line-val" style={{ color: "var(--gold-400)", fontSize: "1rem" }}>{fmt(total)}</span></div>
          </div>
          <p className="calc-note">This is an estimate. Final costs depend on specific activities, authority fees, and prevailing government charges.</p>
          <button className="btn-primary" style={{ width: "100%" }} onClick={() => onNavigate && onNavigate("schedule")}>Get Exact Quote →</button>
        </div>
      </div>
    </div>
  );
}

// ─── ZONE DETAIL PAGE ─────────────────────────────────────────
function ZonePage({ zone, onBack, onNavigate }) {
  const [activeTab, setActiveTab] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  useReveal();
  useEffect(() => {
    window.scrollTo(0, 0);
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, [zone]);

  return (
    <div className="zone-page">
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-logo">INCO<span>ZONE</span></div>
        <ul className="nav-links">{["Services","Free Zones","About","Blog","Contact"].map(l=>{const m={"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};return <li key={l}><a href="#" onClick={e=>{e.preventDefault();if(onNavigate){onNavigate(m[l]);window.scrollTo(0,0);}}}>{l}</a></li>;})}  </ul>
        <button className="nav-cta" onClick={() => onNavigate && onNavigate("schedule")}>Schedule Consultation</button>
      </nav>
      <div className="zone-hero">
        <ZoneHeroCanvas color={zone.color} />
        <button className="zone-back" onClick={onBack}>← All Free Zones</button>
        <div className="zone-hero-content">
          <span className="zone-hero-eyebrow">{zone.badgeLabel} · UAE Free Zone</span>
          <div className="zone-hero-name">{zone.name}</div>
          <div className="zone-hero-fullname">{zone.full}</div>
          <p className="zone-hero-desc">{zone.desc}</p>
        </div>
      </div>
      <div className="zone-stats-bar">
        {zone.stats.map((s, i) => <div className="zone-stat" key={i}><span className="zone-stat-val">{s.val}</span><span className="zone-stat-key">{s.key}</span></div>)}
        <div className="zone-stat"><span className="zone-stat-val">{zone.setupFrom}</span><span className="zone-stat-key">Starting From</span></div>
        <div className="zone-stat"><span className="zone-stat-val">{zone.location.split(",")[0]}</span><span className="zone-stat-key">Location</span></div>
      </div>

      {/* ── CREAM PACKAGES SECTION ── */}
      <div className="packages-section">
        <span className="section-label reveal">Setup Packages</span>
        <h2 className="section-title reveal reveal-delay-1">Choose Your <em>{zone.name} Package</em></h2>
        <div className="packages-tabs">
          {["All-Inclusive Packages", "What's Included", "Setup Process"].map((t, i) => (
            <button key={i} className={`pkg-tab${activeTab === i ? " active" : ""}`} onClick={() => setActiveTab(i)}>{t}</button>
          ))}
        </div>
        {activeTab === 0 && (
          <div className="packages-grid">
            {zone.packages.map((pkg, i) => (
              <div className={`pkg-card reveal reveal-delay-${i + 1}${pkg.featured ? " featured" : ""}`} key={i}>
                {pkg.badge && <div className="pkg-badge">{pkg.badge}</div>}
                <div className="pkg-name">{pkg.name}</div>
                <p className="pkg-tagline">{pkg.tagline}</p>
                <div className="pkg-price">
                  <div className="pkg-price-val">AED {pkg.price}</div>
                  <div className="pkg-price-period">One-time setup · excludes annual renewal</div>
                </div>
                <ul className="pkg-features">
                  {pkg.features.map((f, j) => (
                    <li className="pkg-feat" key={j}>
                      <span className={f.included ? "feat-check" : "feat-x"}>{f.included ? "" : "×"}</span>
                      <span style={{ color: pkg.featured ? (f.included ? "var(--white-80)" : "var(--white-30)") : (f.included ? "var(--cream-ink2)" : "var(--cream-border)") }}>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <button className="pkg-cta-btn">{pkg.featured ? "Select This Package →" : "Get Started →"}</button>
              </div>
            ))}
          </div>
        )}
        {activeTab === 1 && (
          <div className="includes-grid" style={{ background: "none" }}>
            {zone.includes.map((inc, i) => (
              <div className={`include-card reveal reveal-delay-${(i % 4) + 1}`} key={i} style={{ background: "var(--cream-50)", border: "1px solid var(--cream-border)" }}>
                <div className="include-icon">{inc.icon}</div>
                <div className="include-title" style={{ color: "var(--cream-ink)" }}>{inc.title}</div>
                <p className="include-desc" style={{ color: "var(--cream-ink3)" }}>{inc.desc}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === 2 && (
          <div className="steps-list">
            {zone.steps.map((s, i) => (
              <div className={`step reveal reveal-delay-${(i % 4) + 1}`} key={i} style={{ borderColor: "var(--cream-border)" }}>
                <div className="step-num" style={{ color: "rgba(180,150,90,0.25)" }}>0{i + 1}</div>
                <div className="step-body">
                  <h4 style={{ color: "var(--cream-ink)" }}>{s.title}</h4>
                  <p style={{ color: "var(--cream-ink3)" }}>{s.desc}</p>
                  <div className="step-timeline">{s.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Calculator zone={zone} />

      {/* CREAM CTA on zone page */}
      <div className="elite-cta">
        <div className="elite-cta-content">
          <span className="section-label" style={{ textAlign: "center", display: "block" }}>Ready to Begin</span>
          <h2>Start Your {zone.name}<br /><em>Incorporation Today.</em></h2>
          <div className="cta-divider" />
          <p>Private consultation. No obligation. Expert advisory from day one.</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-cream-primary" onClick={() => onNavigate && onNavigate("schedule")}>Schedule Private Consultation</button>
            <button className="btn-cream-ghost" onClick={onBack}>← Explore Other Zones</button>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-top">
          <div><div className="footer-brand-name">INCO<span>ZONE</span></div><p className="footer-tagline">UAE's premier private advisory firm for business incorporation and corporate structuring.</p></div>
          <div className="footer-col"><h5>Services</h5><ul>{[["Free Zone Formation","services"],["Mainland Setup","mainland"],["PRO Services","pro"],["Amendments","pro"]].map(([s,p]) => <li key={s}><a href="#" onClick={e=>{e.preventDefault();if(onNavigate){onNavigate(p);window.scrollTo(0,0);}}}>{s}</a></li>)}</ul></div>
          <div className="footer-col"><h5>Free Zones</h5><ul>{ZONES.map(z => <li key={z.id}><a href="#" onClick={e=>{e.preventDefault();if(onNavigate){onNavigate(z.id);window.scrollTo(0,0);}}}>{z.name}</a></li>)}</ul></div>
          <div className="footer-col"><h5>Company</h5><ul>{[["About","about"],["Blog","blog"],["Contact","contact"]].map(([s,p]) => <li key={s}><a href="#" onClick={e=>{e.preventDefault();if(onNavigate){onNavigate(p);window.scrollTo(0,0);}}}>{s}</a></li>)}</ul></div>
        </div>
        <div className="footer-bottom"><span>© 2025 INCOZONE.</span><span>Dubai, UAE</span></div>
      </footer>
      <div className="wa-float"><svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg></div>
    </div>
  );
}

// ─── UAE GLOBE ────────────────────────────────────────────────
const UAE_ZONES_MAP = [
  { name: "DMCC", x: 0.38, y: 0.52, color: "#C9A84C" }, { name: "JAFZA", x: 0.30, y: 0.56, color: "#C9A84C" },
  { name: "IFZA", x: 0.55, y: 0.45, color: "#D4B468" }, { name: "Meydan", x: 0.44, y: 0.50, color: "#D4B468" },
  { name: "DIFC", x: 0.40, y: 0.48, color: "#E2CC98" }, { name: "ADGM", x: 0.25, y: 0.60, color: "#C9A84C" },
  { name: "SHAMS", x: 0.60, y: 0.38, color: "#D4B468" }, { name: "RAKEZ", x: 0.72, y: 0.30, color: "#48bb78" },
  { name: "AFZ", x: 0.68, y: 0.32, color: "#48bb78" }, { name: "SAIF", x: 0.62, y: 0.40, color: "#D4B468" },
];

function UAEGlobe() {
  const canvasRef = useRef(null);
  const stateRef = useRef({ rotation: 0, hovered: false, mouseX: 0, mouseY: 0, glowIntensity: 0, pulseT: 0 });
  useEffect(() => {
    const canvas = canvasRef.current; const ctx = canvas.getContext("2d"); let raf, W, H;
    const resize = () => { W = canvas.width = canvas.offsetWidth * window.devicePixelRatio; H = canvas.height = canvas.offsetHeight * window.devicePixelRatio; ctx.scale(window.devicePixelRatio, window.devicePixelRatio); };
    resize();
    const onMove = (e) => { const r = canvas.getBoundingClientRect(); const mx = e.clientX - r.left, my = e.clientY - r.top; stateRef.current.mouseX = mx; stateRef.current.mouseY = my; stateRef.current.hovered = Math.sqrt((mx - r.width / 2) ** 2 + (my - r.height / 2) ** 2) < r.width * 0.42; };
    const onLeave = () => { stateRef.current.hovered = false; };
    canvas.addEventListener("mousemove", onMove); canvas.addEventListener("mouseleave", onLeave);
    const draw = () => {
      const s = stateRef.current; const cw = canvas.offsetWidth, ch = canvas.offsetHeight;
      ctx.clearRect(0, 0, cw, ch);
      s.rotation += s.hovered ? 0.002 : 0.005; s.pulseT += 0.04;
      s.glowIntensity = Math.max(0, Math.min(1, s.glowIntensity + (s.hovered ? 1 : -1) * 0.06));
      const cx = cw / 2, cy = ch / 2, R = Math.min(cw, ch) * 0.38;
      for (let ring = 3; ring >= 1; ring--) { const alpha = (0.04 + s.glowIntensity * 0.08) / ring, rr = R * (1 + ring * 0.18); const grad = ctx.createRadialGradient(cx, cy, R * 0.8, cx, cy, rr); grad.addColorStop(0, `rgba(201,168,76,${alpha})`); grad.addColorStop(1, "rgba(201,168,76,0)"); ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2); ctx.fillStyle = grad; ctx.fill(); }
      const bg = ctx.createRadialGradient(cx - R * .3, cy - R * .3, R * .05, cx, cy, R); bg.addColorStop(0, "#1e4570"); bg.addColorStop(.5, "#102540"); bg.addColorStop(1, "#05111e"); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fillStyle = bg; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.strokeStyle = `rgba(201,168,76,${0.25 + s.glowIntensity * 0.5})`; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
      for (let lat = -60; lat <= 60; lat += 20) { const y = cy + R * Math.sin(lat * Math.PI / 180), rL = R * Math.cos(lat * Math.PI / 180); ctx.beginPath(); ctx.ellipse(cx, y, rL, rL * 0.15, 0, 0, Math.PI * 2); ctx.strokeStyle = "rgba(201,168,76,0.07)"; ctx.lineWidth = 0.8; ctx.stroke(); }
      for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2 + s.rotation; ctx.beginPath(); ctx.moveTo(cx + R * Math.cos(a), cy); ctx.bezierCurveTo(cx + R * Math.cos(a) * .5, cy - R, cx + R * Math.cos(a) * .5, cy + R, cx + R * Math.cos(a + Math.PI), cy); ctx.strokeStyle = "rgba(201,168,76,0.06)"; ctx.lineWidth = 0.8; ctx.stroke(); }
      const rotOff = s.rotation * 0.8 % (Math.PI * 2), sx = cx + Math.cos(rotOff) * R * 0.08, shiftX = sx - cx;
      ctx.beginPath(); ctx.moveTo(cx + shiftX - R * .18, cy + R * .04); ctx.lineTo(cx + shiftX - R * .05, cy - R * .02); ctx.lineTo(cx + shiftX + R * .12, cy - R * .08); ctx.lineTo(cx + shiftX + R * .20, cy + R * .02); ctx.lineTo(cx + shiftX + R * .18, cy + R * .12); ctx.lineTo(cx + shiftX + R * .05, cy + R * .16); ctx.lineTo(cx + shiftX - R * .08, cy + R * .14); ctx.closePath(); ctx.fillStyle = "rgba(22,51,84,0.9)"; ctx.fill(); ctx.strokeStyle = "rgba(201,168,76,0.25)"; ctx.lineWidth = 1; ctx.stroke();
      UAE_ZONES_MAP.forEach(zone => {
        const zx = cx + shiftX + (zone.x - 0.5) * R * 1.1, zy = cy + (zone.y - 0.5) * R;
        const dist = s.hovered ? Math.sqrt((s.mouseX - zx) ** 2 + (s.mouseY - zy) ** 2) : 999;
        const isActive = dist < 28; const pulse = Math.sin(s.pulseT + UAE_ZONES_MAP.indexOf(zone)) * 0.3 + 0.7;
        const glow = ctx.createRadialGradient(zx, zy, 0, zx, zy, isActive ? 20 : 12); glow.addColorStop(0, zone.color + (isActive ? "CC" : "66")); glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath(); ctx.arc(zx, zy, isActive ? 20 : 12, 0, Math.PI * 2); ctx.fillStyle = glow; ctx.fill();
        ctx.beginPath(); ctx.arc(zx, zy, (isActive ? 5 : 3.5) * pulse, 0, Math.PI * 2); ctx.fillStyle = zone.color; ctx.fill();
        if (s.glowIntensity > 0.4) { ctx.font = `${isActive ? "600" : "400"} ${isActive ? 11 : 9}px DM Sans`; ctx.fillStyle = isActive ? zone.color : "rgba(248,245,238,0.5)"; ctx.textAlign = "center"; ctx.fillText(zone.name, zx, zy - (isActive ? 5 : 3.5) - 6); }
      });
      ctx.restore();
      const spec = ctx.createRadialGradient(cx - R * .35, cy - R * .35, 0, cx - R * .2, cy - R * .2, R * .6); spec.addColorStop(0, "rgba(255,255,255,0.07)"); spec.addColorStop(1, "rgba(255,255,255,0)"); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fillStyle = spec; ctx.fill();
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); canvas.removeEventListener("mousemove", onMove); canvas.removeEventListener("mouseleave", onLeave); };
  }, []);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: "500px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", cursor: "crosshair", display: "block" }} />
      <div style={{ position: "absolute", bottom: "-10px", left: "50%", transform: "translateX(-50%)", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,76,0.4)", whiteSpace: "nowrap" }}>Hover to explore UAE free zones</div>
    </div>
  );
}

// ─── GLOBAL NAV (shared across ALL pages) ────────────────────
function GlobalNav({ onNavigate, scrolled }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const go = (page) => {
    close();
    if (page === "home") {
      onNavigate("home");
      setTimeout(() => window.scrollTo(0,0), 50);
    } else if (page === "zones") {
      onNavigate("home");
      setTimeout(() => {
        document.getElementById("zone-finder")?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      onNavigate(page);
      window.scrollTo(0,0);
    }
  };

  // lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { label: "Home",      page: "home" },
    { label: "Services",   page: "services" },
    { label: "Free Zones", page: "zones" },
    { label: "About",      page: "about" },
    { label: "Blog",       page: "blog" },
    { label: "Contact",    page: "contact" },
  ];

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-logo" onClick={() => go("home")}>INCO<span>ZONE</span></div>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.label}>
              <a href="#" onClick={e => { e.preventDefault(); go(l.page); }}>{l.label}</a>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => go("schedule")}>Schedule Consultation</button>
        {/* Hamburger */}
        <button
          className={`nav-hamburger${open ? " open" : ""}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Full-screen mobile drawer */}
      <div className={`nav-drawer${open ? " open" : ""}`} role="dialog" aria-modal="true">
        <div className="nav-drawer-brand" onClick={() => go("home")}>INCO<span>ZONE</span></div>
        {links.map(l => (
          <button key={l.label} className="drawer-link" onClick={() => go(l.page)}>
            {l.label}
          </button>
        ))}
        <div className="drawer-divider" />
        <button className="drawer-cta-btn" onClick={() => go("schedule")}>
          Schedule Consultation
        </button>
      </div>
    </>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────
export default function App() {
  const [selectedZone, setSelectedZone]   = useState(null);
  const [currentPage, setCurrentPage]     = useState("home");
  const [activeCategory, setActiveCategory] = useState("all");
  const [scrolled, setScrolled]           = useState(false);
  const [skeletonDone, setSkeletonDone]   = useState(false);
  useReveal();

  // ── Browser history: push state on every navigation ──────────
  const pushHistory = (page, zoneId = null) => {
    const state = { page, zoneId };
    const url = page === "home" ? "/" : zoneId ? `/${zoneId}` : `/${page}`;
    window.history.pushState(state, "", url);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const onPop = (e) => {
      const state = e.state;
      if (!state) {
        setSelectedZone(null);
        setCurrentPage("home");
        return;
      }
      if (state.zoneId) {
        const zone = ZONES.find(z => z.id === state.zoneId);
        setSelectedZone(zone || null);
        setCurrentPage("home");
      } else {
        setSelectedZone(null);
        setCurrentPage(state.page || "home");
      }
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", onPop);
    // Set initial history entry so back button works from first page
    if (!window.history.state) {
      window.history.replaceState({ page: "home", zoneId: null }, "", "/");
    }
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => { const t = setTimeout(() => setSkeletonDone(true), 1200); return () => clearTimeout(t); }, []);
  useEffect(() => {
    if (selectedZone || currentPage !== "home") return;
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => { window.removeEventListener("scroll", h); };
  }, [selectedZone, currentPage]);

  // ── Lenis smooth scroll ───────────────────────────────────────
  useEffect(() => {
    let lenis;
    let rafId;
    import("@studio-freight/lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.4,
        easing: t => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
        infinite: false,
      });
      const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
      rafId = requestAnimationFrame(raf);
    });
    return () => { cancelAnimationFrame(rafId); lenis && lenis.destroy(); };
  }, []);

  const goHome = () => {
    setSelectedZone(null);
    setCurrentPage("home");
    pushHistory("home");
    setTimeout(() => window.scrollTo({ top: document.getElementById("zone-finder")?.offsetTop || 0, behavior: "smooth" }), 100);
  };
  const goServices = () => {
    setCurrentPage("services");
    setSelectedZone(null);
    pushHistory("services");
    window.scrollTo(0, 0);
  };
  const goPage = (page) => {
    // Check if page is a zone ID
    const zone = ZONES.find(z => z.id === page);
    if (zone) {
      setSelectedZone(zone);
      setCurrentPage("home");
      pushHistory(zone.id, zone.id);
      window.scrollTo(0, 0);
      return;
    }
    setCurrentPage(page);
    setSelectedZone(null);
    pushHistory(page);
    window.scrollTo(0, 0);
  };

  // Zone pages — all receive onNavigate so their nav works
  if (selectedZone?.id === "dmcc")   return <DMCCPage   onBack={goHome} onNavigate={goPage} />;
  if (selectedZone?.id === "ifza")   return <IFZAPage   onBack={goHome} onNavigate={goPage} />;
  if (selectedZone?.id === "meydan") return <MeydanPage onBack={goHome} onNavigate={goPage} />;
  if (selectedZone?.id === "rakez")  return <RAKEZPage  onBack={goHome} onNavigate={goPage} />;
  if (selectedZone?.id === "shams")  return <SHAMSPage  onBack={goHome} onNavigate={goPage} />;
  if (selectedZone?.id === "jafza")  return <JAFZAPage  onBack={goHome} onNavigate={goPage} />;
  if (selectedZone?.id === "afz")    return <AFZPage    onBack={goHome} onNavigate={goPage} />;
  if (selectedZone?.id === "adgm")   return <ADGMPage   onBack={goHome} onNavigate={goPage} />;
  if (selectedZone) return <ZonePage zone={selectedZone} onBack={goHome} onNavigate={goPage} />;

  // Service pages — all 12 fully wired
  if (currentPage === "services")           return <ServicesPage            onBack={() => goPage("home")}     onNavigate={goPage} />;
  if (currentPage === "mainland")           return <MainlandPage            onBack={() => goPage("services")} onNavigate={goPage} />;
  if (currentPage === "pro")                return <PROPage                 onBack={() => goPage("services")} onNavigate={goPage} />;
  if (currentPage === "goldenvisa")         return <GoldenVisaPage          onBack={() => goPage("services")} onNavigate={goPage} />;
  if (currentPage === "banking")            return <BankingPage             onBack={() => goPage("services")} onNavigate={goPage} />;
  if (currentPage === "visaimmigration")    return <VisaImmigrationPage     onBack={() => goPage("services")} onNavigate={goPage} />;
  if (currentPage === "willregistration")   return <WillRegistrationPage    onBack={() => goPage("services")} onNavigate={goPage} />;
  if (currentPage === "trademark")          return <TrademarkRegistrationPage onBack={() => goPage("services")} onNavigate={goPage} />;
  if (currentPage === "specialapprovals")   return <SpecialApprovalsPage    onBack={() => goPage("services")} onNavigate={goPage} />;
  if (currentPage === "offshore")           return <OffshoreFormationPage   onBack={() => goPage("services")} onNavigate={goPage} />;
  if (currentPage === "liquidation")        return <CompanyLiquidationPage  onBack={() => goPage("services")} onNavigate={goPage} />;
  if (currentPage === "freezoneincorp")     return <FreeZoneIncorporationPage onBack={() => goPage("services")} onNavigate={goPage} />;
  if (currentPage === "amendments")         return <CompanyAmendmentsPage   onBack={() => goPage("services")} onNavigate={goPage} />;

  // Other pages
  if (currentPage === "about")    return <AboutPage    onBack={() => goPage("home")}  onNavigate={goPage} />;
  if (currentPage === "blog")     return <BlogPage     onBack={() => goPage("home")}  onNavigate={goPage} />;
  if (currentPage === "contact")  return <ContactPage  onBack={() => goPage("home")}  onNavigate={goPage} onSchedule={() => goPage("schedule")} />;
  if (currentPage === "schedule") return <SchedulePage onBack={() => goPage("home")}  onNavigate={goPage} />;
  if (currentPage === "admin")    return <AdminPage />;

  const filtered = activeCategory === "all" ? ZONES : ZONES.filter(z => z.category === activeCategory);

  return (
    <>
      <style>{CSS}</style>

      {/* NAV — shared GlobalNav component */}
      <GlobalNav onNavigate={goPage} scrolled={scrolled} />

      {/* HERO — dark navy with particles */}
      <section className="hero" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <HeroCanvas />
        <div className="hero-content">
          <span className="hero-eyebrow">Private UAE Incorporation Advisory</span>
          <h1 className="hero-h1">Ready To Setup<br />Your Business <em>In UAE</em></h1>
          <p className="hero-sub">Free Zone <span>·</span> Mainland <span>·</span> PRO Services <span>·</span> Corporate Structuring</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => goPage("schedule")}>Schedule Private Consultation</button>
            <button className="btn-ghost" onClick={() => document.getElementById("zone-finder")?.scrollIntoView({ behavior: "smooth" })}>Explore Free Zones ↓</button>
          </div>
        </div>
        <div className="hero-scroll"><span>Scroll</span><div className="scroll-line" /></div>
      </section>

      {/* ZONE FINDER — dark navy */}
      <section className="zone-finder" id="zone-finder">
        <div className="zf-header">
          <span className="section-label reveal">Free Zone Explorer</span>
          <h2 className="section-title reveal reveal-delay-1">Which Zone is <em>Perfect for You?</em></h2>
          <p className="reveal reveal-delay-2" style={{ fontSize: "0.85rem", color: "var(--white-60)", marginTop: "12px", maxWidth: "480px", margin: "12px auto 0" }}>
            Select your industry or business type to find your ideal UAE free zone.
          </p>
        </div>
        <div className="zf-filter-bar">
          {CATEGORIES.map(cat => <button key={cat.id} className={`zf-filter-btn${activeCategory === cat.id ? " active" : ""}`} onClick={() => setActiveCategory(cat.id)}>{cat.label}</button>)}
        </div>
        <div className="zf-grid">
          {filtered.map((zone, i) => (
            <div
              className={`zf-card reveal reveal-delay-${(i % 4) + 1}`}
              key={zone.id}
              onClick={(e) => {
                // Golden ripple burst
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                ["zf-rays", "zf-ripple"].forEach((cls, idx) => {
                  const el = document.createElement("div");
                  el.className = cls;
                  el.style.left = x + "px"; el.style.top = y + "px";
                  e.currentTarget.appendChild(el);
                  setTimeout(() => el.remove(), idx === 0 ? 850 : 750);
                });
                setTimeout(() => { setSelectedZone(zone); pushHistory(zone.id, zone.id); window.scrollTo(0, 0); }, 180);
              }}
            >
              {zone.img && (
                <img
                  className="zf-img"
                  src={zone.img}
                  alt={zone.name}
                  onLoad={e => e.currentTarget.classList.add("loaded")}
                />
              )}
              {!skeletonDone && (
                <div className="zf-skeleton-overlay" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="skeleton-bar" style={{ width: "60px", height: "20px", marginBottom: "20px" }} />
                  <div className="skeleton-bar" style={{ width: "80%", height: "32px", marginBottom: "10px" }} />
                  <div className="skeleton-bar" style={{ width: "55%", height: "14px", marginBottom: "20px" }} />
                  <div className="skeleton-bar" style={{ width: "100%", height: "12px", marginBottom: "8px" }} />
                  <div className="skeleton-bar" style={{ width: "85%", height: "12px", marginBottom: "8px" }} />
                  <div className="skeleton-bar" style={{ width: "70%", height: "12px", marginBottom: "24px" }} />
                </div>
              )}
              <div className="zf-card-inner">
                <span className={`zf-badge ${zone.badgeClass}`}>{zone.badgeLabel}</span>
                <div className="zf-zone-name">{zone.name}</div>
                <div className="zf-zone-full">{zone.full}</div>
                <p className="zf-desc">{zone.desc}</p>
                <div className="zf-meta">
                  <div className="zf-meta-item"><div className="zf-dot" /><span>From <strong>{zone.setupFrom}</strong></span></div>
                  <div className="zf-meta-item"><div className="zf-dot" /><span><strong>{zone.setupDays}</strong> days</span></div>
                </div>
                <div className="zf-arrow">Explore Packages →</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERTISE — dark navy */}
      <section className="expertise">
        <span className="section-label reveal">Our Expertise</span>
        <h2 className="section-title reveal reveal-delay-1">Three Pillars of<br /><em>Structured Authority</em></h2>
        <div className="expertise-grid">
          {[
            { num: "01", title: "Free Zone Incorporation", desc: "Strategic establishment within UAE's premier free zones — DMCC, IFZA, Meydan, SHAMS, and beyond. Full licensing, visa, and banking facilitation." },
            { num: "02", title: "Mainland Company Formation", desc: "End-to-end mainland LLC and professional license setup. Government liaison, DED approvals, and local sponsor management handled discreetly." },
            { num: "03", title: "Corporate & PRO Advisory", desc: "Amendments, share transfers, visa processing, and complete government service management through dedicated relationship managers." },
          ].map((e, i) => {
            const dest = i === 0 ? "services" : i === 1 ? "mainland" : "pro";
            return (
              <div
                className={`expertise-card reveal reveal-delay-${i + 1}`}
                key={i}
                onClick={() => { setCurrentPage(dest); window.scrollTo(0, 0); }}
              >
                <span className="expertise-num">{e.num}</span>
                <h3>{e.title}</h3>
                <p>{e.desc}</p>
                <span className="card-arrow">Learn More →</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* WHY — premium animated pillars */}
      <section className="why">
        <div className="why-inner">
          <div>
            <div className="why-header-label reveal">Why INCOZONE</div>
            <h2 className="section-title reveal reveal-delay-1">The Advisory Standard<br /><em>UAE Business Demands</em></h2>
            <div className="why-pillars">
              {[
                { tag: "Strategy First", title: "Strategic Advisory Approach", desc: "We assess your business model first — structure follows strategy, never the reverse. Zone selection is a consequence of clarity, not guesswork." },
                { tag: "Authority Access", title: "Government Liaison Experts", desc: "Deep relationships across UAE free zone authorities, DED, GDRFA, and MOFA ensure frictionless approvals and direct officer access." },
                { tag: "Zero Surprises", title: "Transparent Structuring", desc: "Clear timelines, documented processes, and zero hidden fees. Every cost is disclosed before you commit to a single dirham." },
                { tag: "Always On", title: "Dedicated Relationship Manager", desc: "One point of contact for every interaction — proactive, accountable, and available. Your RM knows your company as well as you do." },
              ].map((p, i) => (
                <div className={`pillar reveal reveal-delay-${i + 1}`} key={i}>
                  <div className="pillar-fill" />
                  <div className="pillar-num-col">
                    <div className="pillar-num-inner">
                      <span className="pillar-num-big">0{i + 1}</span>
                      <div className="pillar-bar" />
                    </div>
                  </div>
                  <div className="pillar-body">
                    <span className="pillar-body-tag">{p.tag}</span>
                    <h4>{p.title}</h4>
                    <p>{p.desc}</p>
                    <span className="pillar-arrow">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="why-visual">
            <div className="why-orb-dashed" />
            <div className="why-orb-ring2" />
            <div className="why-orb-ring" />
            <div className="why-orb" />
            <div className="why-orb-inner">
              <span className="why-orb-inner-label">Established</span>
              <span className="why-orb-inner-num">3,200<em>+</em></span>
              <span className="why-orb-inner-sub">Companies Incorporated</span>
            </div>
            <div className="why-stat">
              <span className="why-stat-num">68+</span>
              <span className="why-stat-label">Nationalities</span>
            </div>
            <div className="why-stat">
              <span className="why-stat-num">12yr</span>
              <span className="why-stat-label">UAE Experience</span>
            </div>
            <div className="why-stat">
              <span className="why-stat-num">4.9</span>
              <span className="why-stat-label">Client Rating</span>
            </div>
            <UAEGlobe />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — dark navy */}
      <section className="testimonials">
        <span className="section-label reveal">Client Perspectives</span>
        <h2 className="section-title reveal reveal-delay-1"><em>Trusted</em> by Founders,<br />Executives & Family Offices</h2>
        <div className="testi-grid">
          {[
            { text: "INCOZONE handled our DMCC setup with remarkable discretion and precision. From licensing to banking — flawless execution.", name: "Rashid Al-Mansoori", role: "Managing Director, Trade Group" },
            { text: "Their mainland structuring advisory saved us months of back and forth. Professional, knowledgeable, and deeply connected.", name: "Alexandra V.", role: "Founder, European Holdings" },
            { text: "The team understood our offshore requirements instantly. The level of service matches what we'd expect from a private law firm.", name: "James W.", role: "CEO, Family Office" },
          ].map((t, i) => (
            <div className={`testi-card reveal reveal-delay-${i + 1}`} key={i}>
              <div className="testi-stars">{[...Array(5)].map((_, j) => <span key={j} className="star"></span>)}</div>
              <p className="testi-text">"{t.text}"</p>
              <div className="testi-author">
                <div className="testi-avatar">{t.name[0]}</div>
                <div><div className="testi-name">{t.name}</div><div className="testi-role">{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNERS — premium section */}
      <div className="partners">
        <div className="partners-inner">

          {/* Header */}
          <div className="partners-header reveal">
            <div className="partners-eyebrow">Official Partner Network</div>
            <h2 className="partners-title">Authorised by the <em>Authorities</em><br />That Matter Most</h2>
            <p className="partners-subtitle">INCOZONE holds official accreditations and working relationships with every major UAE free zone authority and business ecosystem partner.</p>
            <div className="partners-divider">
              <div className="partners-divider-line" />
              <div className="partners-divider-dot" />
              <div className="partners-divider-line" />
            </div>
          </div>

          {/* Partner Cards Grid */}
          <div className="partners-grid reveal reveal-delay-1">

            {/* DMCC */}
            <div className="partner-card gold-tint">
              <div className="partner-logo-wrap">
                <svg className="partner-logo-svg" viewBox="0 0 160 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height:"36px"}}>
                  <rect x="0" y="6" width="32" height="32" rx="2" fill="currentColor" opacity="0.15"/>
                  <rect x="4" y="10" width="24" height="24" rx="1" fill="currentColor" opacity="0.3"/>
                  <rect x="10" y="16" width="12" height="12" fill="currentColor"/>
                  <text x="42" y="30" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="22" fill="currentColor" letterSpacing="1">DMCC</text>
                  <text x="42" y="42" fontFamily="Arial,sans-serif" fontWeight="400" fontSize="7" fill="currentColor" opacity="0.6" letterSpacing="0.5">DUBAI MULTI COMMODITIES CENTRE</text>
                </svg>
              </div>
              <div className="partner-card-meta">
                <span className="partner-card-type">Free Zone Authority</span>
                <span className="partner-card-arrow">→</span>
              </div>
            </div>

            {/* IFZA */}
            <div className="partner-card">
              <div className="partner-logo-wrap">
                <svg className="partner-logo-svg" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height:"38px"}}>
                  <circle cx="20" cy="25" r="18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <circle cx="20" cy="25" r="11" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
                  <circle cx="20" cy="25" r="5" fill="currentColor" opacity="0.7"/>
                  <path d="M5 25 Q12 18 20 25 Q28 32 35 25" stroke="currentColor" strokeWidth="1" fill="none"/>
                  <path d="M5 25 Q12 32 20 25 Q28 18 35 25" stroke="currentColor" strokeWidth="1" fill="none"/>
                  <text x="46" y="21" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="18" fill="currentColor" letterSpacing="2">IFZA</text>
                  <text x="46" y="33" fontFamily="Arial,sans-serif" fontWeight="300" fontSize="7" fill="currentColor" opacity="0.55" letterSpacing="0.4">INTERNATIONAL FREE ZONE AUTHORITY</text>
                </svg>
              </div>
              <div className="partner-card-meta">
                <span className="partner-card-type">Free Zone Authority</span>
                <span className="partner-card-arrow">→</span>
              </div>
            </div>

            {/* JAFZA */}
            <div className="partner-card featured">
              <div className="partner-logo-wrap">
                <svg className="partner-logo-svg" viewBox="0 0 180 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height:"40px"}}>
                  <path d="M4 8 L16 8 L16 36 Q16 44 8 44 Q4 44 2 42 L4 38 Q6 40 8 40 Q12 40 12 36 L12 12 L4 12 Z" fill="currentColor"/>
                  <path d="M22 8 L22 44 L26 44 L26 28 L36 44 L41 44 L30 26 L40 8 L35 8 L26 24 L26 8 Z" fill="currentColor" opacity="0.9"/>
                  <path d="M47 8 L62 44 L58 44 L54 34 L46 34 L42 44 L38 44 L53 8 Z M50 12 L47 30 L53 30 Z" fill="currentColor" opacity="0.85"/>
                  <text x="68" y="30" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="14" fill="currentColor" letterSpacing="0.5">Jebel Ali</text>
                  <text x="68" y="42" fontFamily="Arial,sans-serif" fontWeight="400" fontSize="9" fill="currentColor" opacity="0.5">Free Zone</text>
                </svg>
              </div>
              <div className="partner-card-meta">
                <span className="partner-card-type">Logistics Free Zone</span>
                <span className="partner-card-arrow">→</span>
              </div>
            </div>

            {/* RAKEZ */}
            <div className="partner-card">
              <div className="partner-logo-wrap">
                <svg className="partner-logo-svg" viewBox="0 0 180 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height:"38px"}}>
                  <path d="M6 44 L6 8 L22 8 Q30 8 34 12 Q38 16 38 22 Q38 30 30 33 L40 44 L34 44 L24 34 L12 34 L12 44 Z M12 30 L22 30 Q28 30 31 27 Q34 24 34 22 Q34 18 31 15 Q28 12 22 12 L12 12 Z" fill="currentColor"/>
                  <text x="46" y="24" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="16" fill="currentColor" letterSpacing="1">RAKEZ</text>
                  <text x="46" y="36" fontFamily="Arial,sans-serif" fontWeight="300" fontSize="7" fill="currentColor" opacity="0.5" letterSpacing="0.3">RAS AL KHAIMAH ECONOMIC ZONE</text>
                  <path d="M136 10 L148 10 L144 18 L152 18 L138 34 L142 22 L134 22 Z" fill="currentColor" opacity="0.8"/>
                </svg>
              </div>
              <div className="partner-card-meta">
                <span className="partner-card-type">Economic Zone</span>
                <span className="partner-card-arrow">→</span>
              </div>
            </div>

            {/* Meydan FZ */}
            <div className="partner-card">
              <div className="partner-logo-wrap">
                <svg className="partner-logo-svg" viewBox="0 0 180 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height:"38px"}}>
                  <ellipse cx="22" cy="26" rx="18" ry="18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M10 26 Q16 16 22 26 Q28 36 34 26" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <circle cx="22" cy="26" r="3" fill="currentColor"/>
                  <text x="48" y="22" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="16" fill="currentColor" letterSpacing="0.5">meydan</text>
                  <rect x="48" y="26" width="60" height="1" fill="currentColor" opacity="0.25"/>
                  <text x="48" y="37" fontFamily="Arial,sans-serif" fontWeight="600" fontSize="10" fill="currentColor" letterSpacing="1" opacity="0.7">FZ.</text>
                  <text x="62" y="37" fontFamily="Arial,sans-serif" fontWeight="300" fontSize="7" fill="currentColor" opacity="0.4" letterSpacing="0.3">DUBAI TO THE WORLD</text>
                </svg>
              </div>
              <div className="partner-card-meta">
                <span className="partner-card-type">Free Zone Authority</span>
                <span className="partner-card-arrow">→</span>
              </div>
            </div>

            {/* SPC Free Zone */}
            <div className="partner-card">
              <div className="partner-logo-wrap">
                <svg className="partner-logo-svg" viewBox="0 0 180 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height:"38px"}}>
                  <path d="M4 14 L4 8 L28 8 L28 14 L19 14 L19 44 L13 44 L13 14 Z" fill="currentColor" opacity="0.9"/>
                  <rect x="2" y="6" width="2" height="38" fill="currentColor"/>
                  <text x="35" y="24" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="18" fill="currentColor" letterSpacing="1">SPC</text>
                  <rect x="35" y="28" width="80" height="1" fill="currentColor" opacity="0.2"/>
                  <text x="35" y="38" fontFamily="Arial,sans-serif" fontWeight="400" fontSize="8.5" fill="currentColor" opacity="0.7" letterSpacing="0.3">Free Zone</text>
                  <text x="80" y="38" fontFamily="Arial,sans-serif" fontWeight="300" fontSize="6.5" fill="currentColor" opacity="0.4" letterSpacing="0.2">WHERE MORE IS POSSIBLE</text>
                </svg>
              </div>
              <div className="partner-card-meta">
                <span className="partner-card-type">Sharjah Free Zone</span>
                <span className="partner-card-arrow">→</span>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="partners-grid-row2 reveal reveal-delay-2">

            {/* Ajman Free Zone */}
            <div className="partner-card">
              <div className="partner-logo-wrap">
                <svg className="partner-logo-svg" viewBox="0 0 200 56" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height:"42px"}}>
                  <rect x="2" y="8" width="36" height="4" fill="currentColor"/>
                  <rect x="2" y="16" width="36" height="4" fill="currentColor" opacity="0.7"/>
                  <rect x="2" y="24" width="36" height="4" fill="currentColor" opacity="0.5"/>
                  <rect x="2" y="32" width="36" height="4" fill="currentColor" opacity="0.35"/>
                  <rect x="2" y="40" width="36" height="4" fill="currentColor" opacity="0.2"/>
                  <text x="46" y="24" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="13" fill="currentColor" letterSpacing="0.3">منطقة عجمان الحرة</text>
                  <text x="46" y="38" fontFamily="Arial,sans-serif" fontWeight="600" fontSize="11" fill="currentColor" opacity="0.8" letterSpacing="0.3">Ajman Free Zone</text>
                </svg>
              </div>
              <div className="partner-card-meta">
                <span className="partner-card-type">Free Zone Authority</span>
                <span className="partner-card-arrow">→</span>
              </div>
            </div>

            {/* Cin7 Core */}
            <div className="partner-card">
              <div className="partner-logo-wrap">
                <svg className="partner-logo-svg" viewBox="0 0 180 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height:"36px"}}>
                  <rect x="2" y="10" width="12" height="32" rx="3" fill="currentColor" opacity="0.8"/>
                  <rect x="8" y="4" width="12" height="32" rx="3" fill="currentColor" opacity="0.5" transform="translate(4,0)"/>
                  <rect x="8" y="16" width="12" height="32" rx="3" fill="currentColor" opacity="0.3" transform="translate(8,0)"/>
                  <text x="44" y="22" fontFamily="Arial,sans-serif" fontWeight="300" fontSize="11" fill="currentColor" opacity="0.7" letterSpacing="0.5">Cin7</text>
                  <text x="44" y="36" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="16" fill="currentColor" letterSpacing="0.5">Core</text>
                </svg>
              </div>
              <div className="partner-card-meta">
                <span className="partner-card-type">Tech Partner</span>
                <span className="partner-card-arrow">→</span>
              </div>
            </div>

            {/* Zoho */}
            <div className="partner-card gold-tint">
              <div className="partner-logo-wrap">
                <svg className="partner-logo-svg" viewBox="0 0 180 52" fill="none" xmlns="http://www.w3.org/2000/svg" style={{height:"38px"}}>
                  <rect x="2" y="8" width="14" height="14" rx="3" fill="currentColor"/>
                  <rect x="18" y="8" width="14" height="14" rx="3" fill="currentColor" opacity="0.75"/>
                  <rect x="2" y="24" width="14" height="14" rx="3" fill="currentColor" opacity="0.55"/>
                  <rect x="18" y="24" width="14" height="14" rx="3" fill="currentColor" opacity="0.4"/>
                  <text x="40" y="22" fontFamily="Arial,sans-serif" fontWeight="800" fontSize="18" fill="currentColor" letterSpacing="0.5">Zoho</text>
                  <rect x="40" y="26" width="68" height="1" fill="currentColor" opacity="0.2"/>
                  <text x="40" y="36" fontFamily="Arial,sans-serif" fontWeight="500" fontSize="7.5" fill="currentColor" opacity="0.6" letterSpacing="0.4">AUTHORIZED PARTNER</text>
                </svg>
              </div>
              <div className="partner-card-meta">
                <span className="partner-card-type">Software Partner</span>
                <span className="partner-card-arrow">→</span>
              </div>
            </div>

          </div>

          {/* Stats bar */}
          <div className="partners-stats reveal reveal-delay-3">
            {[
              { val: "9", label: "Official Accreditations" },
              { val: "8", label: "Free Zone Authorities" },
              { val: "100%", label: "Direct Authority Access" },
              { val: "15yr+", label: "Collective Expertise" },
            ].map((s, i) => (
              <div className="partners-stat" key={i}>
                <span className="partners-stat-val">{s.val}</span>
                <span className="partners-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Marquee strip */}
          <div className="partners-marquee-wrap reveal">
            <p className="partners-marquee-label">All UAE free zone authorities · Official accreditations</p>
            <div className="partners-marquee-track">
              {[
                "DMCC", "IFZA", "JAFZA", "RAKEZ", "Meydan FZ",
                "Ajman Free Zone", "SPC Free Zone", "Zoho Partner", "Cin7 Core",
                "SHAMS", "ADGM", "DIFC", "DED",
                "DMCC", "IFZA", "JAFZA", "RAKEZ", "Meydan FZ",
                "Ajman Free Zone", "SPC Free Zone", "Zoho Partner", "Cin7 Core",
                "SHAMS", "ADGM", "DIFC", "DED",
              ].map((name, i) => (
                <span className="partners-marquee-item" key={i}>
                  {name}
                  <span className="partners-marquee-sep"></span>
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── CREAM CTA ── */}
      <section className="elite-cta">
        <div className="elite-cta-content">
          <span className="section-label" style={{ textAlign: "center", display: "block" }}>Begin Your Journey</span>
          <h2>Begin Your UAE<br /><em>Incorporation Strategy.</em></h2>
          <div className="cta-divider" />
          <p>Private consultation. Structured approach. Measurable results.</p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-cream-primary" onClick={() => goPage("schedule")}>Schedule Private Consultation</button>
            <button className="btn-cream-ghost">Download Setup Guide</button>
          </div>
        </div>
      </section>

      {/* FOOTER — very dark */}
      <footer>
        <div className="footer-top">
          <div><div className="footer-brand-name">INCO<span>ZONE</span></div><p className="footer-tagline">UAE's premier private advisory firm for business incorporation, corporate structuring, and government liaison services.</p></div>
          <div className="footer-col"><h5>Services</h5><ul>{[["Free Zone Formation","services"],["Mainland Setup","mainland"],["Offshore Formation","services"],["Corporate Amendments","pro"],["PRO Services","pro"],["Liquidation","services"]].map(([s,p]) => <li key={s}><a href="#" onClick={e=>{e.preventDefault();goPage(p)}}>{s}</a></li>)}</ul></div>
          <div className="footer-col"><h5>Free Zones</h5><ul>{ZONES.map(z => <li key={z.id}><a href="#" onClick={e=>{e.preventDefault();setSelectedZone(z);pushHistory(z.id,z.id);window.scrollTo(0,0)}}>{z.name}</a></li>)}</ul></div>
          <div className="footer-col"><h5>Company</h5><ul>{[["About Us","about"],["Blog","blog"],["Contact","contact"],["Privacy Policy","home"],["Terms","home"]].map(([s,p]) => <li key={s}><a href="#" onClick={e=>{e.preventDefault();goPage(p)}}>{s}</a></li>)}</ul></div>
        </div>
        <div className="footer-bottom">
          <span style={{cursor:"default"}} onClick={(()=>{let c=0,t;return()=>{c++;clearTimeout(t);t=setTimeout(()=>{c=0},600);if(c>=3){goPage("admin")}}})()}>© 2026 INCOZONE. All rights reserved.</span>
          <span>Dubai, United Arab Emirates</span>
        </div>
      </footer>

      <div className="wa-float"><svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg></div>
    </>
  );
}
