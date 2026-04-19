import { useState, useEffect, useRef } from "react";
import { useContent } from "../context/ContentContext";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Contact Page
//  Drop into: src/pages/Contact.jsx
// ═══════════════════════════════════════════════════════════════

const CSS = `

.ct-root*,.ct-root*::before,.ct-root*::after{box-sizing:border-box;margin:0;padding:0}
.ct-root{
  --n950:#020b14;--n900:#05111e;--n800:#091928;--n750:#0c2033;--n700:#102540;
  --g400:#C9A84C;--g300:#D4B468;--g200:#E2CC98;
  --glow:rgba(201,168,76,0.13);--glow2:rgba(201,168,76,0.06);
  --w:#F8F5EE;--w80:rgba(248,245,238,0.80);--w60:rgba(248,245,238,0.60);
  --w30:rgba(248,245,238,0.30);--w12:rgba(248,245,238,0.12);--w06:rgba(248,245,238,0.06);
  --fd:'Cormorant Garamond',Georgia,serif;
  --fb:'DM Sans',system-ui,sans-serif;
  --ease:cubic-bezier(0.16,1,0.3,1);
  font-family:var(--fb);font-weight:300;color:var(--w);
  background:var(--n900);overflow-x:hidden;width:100%;
}

/* ── NAV ──────────────────────────────────────────────────── */
.ct-nav{
  position:fixed;inset-inline:0;top:0;z-index:200;
  display:flex;align-items:center;justify-content:space-between;
  padding:20px 60px;transition:background .5s,padding .4s,border-color .5s;
  border-bottom:1px solid transparent;
}
.ct-nav.scrolled{background:rgba(5,17,30,0.97);backdrop-filter:blur(20px);padding:13px 60px;border-bottom-color:rgba(201,168,76,0.12);}
.ct-nav-logo{font-family:var(--fd);font-size:1.5rem;font-weight:500;letter-spacing:.15em;color:var(--w);cursor:pointer;}
.ct-nav-logo em{color:var(--g400);font-style:normal;}
.ct-nav-links{display:flex;gap:32px;list-style:none;}
.ct-nav-links a{font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:var(--w60);text-decoration:none;transition:color .3s;font-family:var(--fb);}
.ct-nav-links a:hover{color:var(--g400);}
.ct-back{background:none;border:none;font-family:var(--fb);font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:var(--w30);cursor:pointer;display:flex;align-items:center;gap:8px;padding:0;transition:color .3s;}
.ct-back:hover{color:var(--g400);}
.ct-back::before{content:'←';}

/* ── HERO SPLIT ───────────────────────────────────────────── */
.ct-hero{
  min-height:100vh;display:grid;grid-template-columns:1fr 1fr;
  position:relative;
}

/* LEFT — dark form panel */
.ct-hero-left{
  background:var(--n950);position:relative;overflow:hidden;
  display:flex;flex-direction:column;justify-content:center;
  padding:130px 64px 80px;z-index:2;
}
.ct-hero-left::after{
  content:'';position:absolute;right:0;top:8%;bottom:8%;
  width:1px;background:linear-gradient(to bottom,transparent,rgba(201,168,76,.25),transparent);
}
/* Ghost letterform */
.ct-ghost{
  position:absolute;right:-60px;bottom:-80px;
  font-family:var(--fd);font-size:clamp(14rem,22vw,20rem);font-weight:300;line-height:1;
  color:transparent;-webkit-text-stroke:1px rgba(201,168,76,.03);
  pointer-events:none;user-select:none;letter-spacing:-.05em;
}
/* Radial glow */
.ct-hero-left::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 60% 70% at 10% 60%,rgba(201,168,76,.05),transparent);
  pointer-events:none;
}

.ct-eyebrow{
  font-size:.58rem;letter-spacing:.36em;text-transform:uppercase;color:var(--g400);
  display:inline-flex;align-items:center;gap:14px;margin-bottom:24px;
  opacity:0;animation:ctUp .8s var(--ease) .3s forwards;
}
.ct-eyebrow::before{content:'';width:28px;height:1px;background:var(--g400);}
.ct-h1{
  font-family:var(--fd);font-size:clamp(3rem,5vw,5.2rem);font-weight:300;
  line-height:.95;letter-spacing:-.025em;color:var(--w);
  opacity:0;animation:ctUp .9s var(--ease) .45s forwards;
}
.ct-h1 em{color:var(--g400);font-style:italic;display:block;}
.ct-h1 .small{font-size:.55em;color:var(--w30);font-weight:300;display:block;letter-spacing:.02em;}
.ct-sub{
  margin-top:28px;font-size:.84rem;color:var(--w60);line-height:1.85;max-width:380px;
  opacity:0;animation:ctUp .8s var(--ease) .6s forwards;
}

/* ── FORM ─────────────────────────────────────────────────── */
.ct-form{margin-top:44px;display:flex;flex-direction:column;gap:20px;opacity:0;animation:ctUp .9s var(--ease) .75s forwards;}

.ct-field{position:relative;}
.ct-field label{
  display:block;font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;
  color:var(--w30);margin-bottom:8px;transition:color .3s;
}
.ct-field:focus-within label{color:var(--g400);}

.ct-input,.ct-select,.ct-textarea{
  width:100%;background:var(--n800);border:1px solid var(--w12);
  color:var(--w);font-family:var(--fb);font-size:.84rem;font-weight:300;
  padding:14px 16px;outline:none;transition:border-color .35s,background .35s,box-shadow .35s;
  appearance:none;-webkit-appearance:none;
}
.ct-input::placeholder,.ct-textarea::placeholder{color:var(--w30);}
.ct-input:focus,.ct-select:focus,.ct-textarea:focus{
  border-color:var(--g400);background:rgba(9,25,40,.9);
  box-shadow:0 0 0 3px rgba(201,168,76,.07),inset 0 0 0 1px rgba(201,168,76,.1);
}
.ct-textarea{min-height:110px;resize:vertical;line-height:1.7;}
.ct-select{cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C9A84C' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;}
.ct-select option{background:var(--n800);color:var(--w);}

/* 2-col row */
.ct-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}

/* Submit */
.ct-submit{
  padding:16px 40px;background:var(--g400);color:var(--n900);
  font-family:var(--fb);font-size:.72rem;font-weight:500;letter-spacing:.18em;text-transform:uppercase;
  border:none;cursor:pointer;position:relative;overflow:hidden;
  transition:background .3s,transform .2s;align-self:flex-start;margin-top:4px;
}
.ct-submit::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);
  transform:translateX(-100%);transition:transform .5s;
}
.ct-submit:hover{background:var(--g300);transform:translateY(-2px);}
.ct-submit:hover::after{transform:translateX(100%);}

/* Success state */
.ct-success{
  display:flex;flex-direction:column;align-items:flex-start;gap:16px;
  padding:40px;background:rgba(201,168,76,.06);border:1px solid rgba(201,168,76,.2);
  animation:ctUp .7s var(--ease) forwards;
}
.ct-success-icon{width:52px;height:52px;border:1px solid var(--g400);display:flex;align-items:center;justify-content:center;font-size:1.4rem;}
.ct-success-title{font-family:var(--fd);font-size:1.8rem;font-weight:300;color:var(--w);}
.ct-success-body{font-size:.82rem;color:var(--w60);line-height:1.8;}

/* ── RIGHT — CONTACT INFO + MAP ───────────────────────────── */
.ct-hero-right{
  background:var(--n800);position:relative;overflow:hidden;
  display:flex;flex-direction:column;
}
/* Animated canvas bg */
.ct-right-canvas{position:absolute;inset:0;width:100%;height:100%;}

/* Office panel */
.ct-office-panel{
  position:relative;z-index:2;
  padding:130px 60px 48px;
  flex:1;display:flex;flex-direction:column;
}
.ct-office-label{font-size:.58rem;letter-spacing:.34em;text-transform:uppercase;color:var(--g400);margin-bottom:16px;display:block;}
.ct-office-name{font-family:var(--fd);font-size:clamp(1.8rem,3vw,2.8rem);font-weight:300;line-height:1.1;color:var(--w);margin-bottom:8px;}
.ct-office-name em{color:var(--g400);font-style:italic;}
.ct-office-addr{font-size:.82rem;color:var(--w60);line-height:1.85;margin-bottom:36px;}

/* Contact method cards */
.ct-contact-cards{display:flex;flex-direction:column;gap:1px;background:var(--w06);flex:1;}
.ct-contact-card{
  background:var(--n800);padding:22px 28px;
  display:flex;align-items:center;gap:20px;
  border-left:3px solid transparent;
  transition:background .35s,border-color .35s;
  cursor:pointer;position:relative;overflow:hidden;
}
.ct-contact-card:hover{background:var(--n750);border-left-color:var(--g400);}
.ct-contact-card::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,rgba(201,168,76,.04),transparent);
  opacity:0;transition:opacity .35s;
}
.ct-contact-card:hover::after{opacity:1;}
.ct-cc-icon{
  width:44px;height:44px;border:1px solid var(--w12);
  display:flex;align-items:center;justify-content:center;font-size:1.2rem;
  transition:border-color .35s,background .35s;flex-shrink:0;
}
.ct-contact-card:hover .ct-cc-icon{border-color:var(--g400);background:rgba(201,168,76,.07);}
.ct-cc-label{font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:var(--w30);display:block;margin-bottom:4px;}
.ct-cc-val{font-family:var(--fd);font-size:1.1rem;font-weight:400;color:var(--w);}
.ct-cc-sub{font-size:.7rem;color:var(--w30);margin-top:2px;display:block;}
.ct-cc-arrow{margin-left:auto;color:var(--g400);opacity:0;transform:translateX(-8px);transition:opacity .3s,transform .3s;font-size:.9rem;}
.ct-contact-card:hover .ct-cc-arrow{opacity:1;transform:translateX(0);}

/* Hours strip */
.ct-hours{
  position:relative;z-index:2;
  padding:24px 28px;background:rgba(201,168,76,.06);border-top:1px solid rgba(201,168,76,.15);
  display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;
}
.ct-hours-item{text-align:center;}
.ct-hours-day{font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:var(--w30);display:block;margin-bottom:4px;}
.ct-hours-time{font-family:var(--fd);font-size:.95rem;font-weight:400;color:var(--w);}

/* ── BELOW — FAQ + MAP EMBED ──────────────────────────────── */
.ct-bottom{background:var(--n900);padding:100px 60px;}
.ct-bottom-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;}

.ct-faq-h2{font-family:var(--fd);font-size:clamp(2rem,3.5vw,3rem);font-weight:300;color:var(--w);margin-bottom:36px;line-height:1.1;}
.ct-faq-h2 em{color:var(--g400);font-style:italic;}
.ct-faq-item{border-bottom:1px solid var(--w06);overflow:hidden;}
.ct-faq-q{
  width:100%;background:none;border:none;text-align:left;
  padding:20px 0;display:flex;align-items:center;justify-content:space-between;
  font-family:var(--fb);font-size:.86rem;color:var(--w80);cursor:pointer;
  transition:color .3s;gap:16px;
}
.ct-faq-q:hover{color:var(--g400);}
.ct-faq-chevron{
  width:24px;height:24px;border:1px solid var(--w12);display:flex;align-items:center;justify-content:center;
  font-size:.7rem;color:var(--g400);flex-shrink:0;
  transition:transform .4s var(--ease),border-color .3s,background .3s;
}
.ct-faq-item.open .ct-faq-chevron{transform:rotate(45deg);background:rgba(201,168,76,.08);border-color:var(--g400);}
.ct-faq-a{
  max-height:0;overflow:hidden;
  transition:max-height .5s var(--ease),padding .4s;
  font-size:.8rem;color:var(--w60);line-height:1.85;
}
.ct-faq-item.open .ct-faq-a{max-height:200px;padding-bottom:20px;}

/* Map placeholder */
.ct-map-panel{}
.ct-map-label{font-size:.58rem;letter-spacing:.34em;text-transform:uppercase;color:var(--g400);display:block;margin-bottom:16px;}
.ct-map-h2{font-family:var(--fd);font-size:clamp(2rem,3.5vw,3rem);font-weight:300;color:var(--w);margin-bottom:28px;line-height:1.1;}
.ct-map-h2 em{color:var(--g400);font-style:italic;}
.ct-map-box{
  width:100%;aspect-ratio:4/3;background:var(--n800);
  position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;
  border:1px solid var(--w06);
}
.ct-map-box::before{
  content:'';position:absolute;inset:0;
  background:
    repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(201,168,76,.04) 39px,rgba(201,168,76,.04) 40px),
    repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(201,168,76,.04) 39px,rgba(201,168,76,.04) 40px);
}
.ct-map-dot{
  width:12px;height:12px;border-radius:50%;background:var(--g400);
  box-shadow:0 0 0 4px rgba(201,168,76,.15),0 0 0 8px rgba(201,168,76,.06);
  position:relative;z-index:2;animation:ctPulse 2.5s ease-in-out infinite;
}
@keyframes ctPulse{0%,100%{box-shadow:0 0 0 4px rgba(201,168,76,.15),0 0 0 8px rgba(201,168,76,.06)}50%{box-shadow:0 0 0 8px rgba(201,168,76,.1),0 0 0 16px rgba(201,168,76,.04)}}
.ct-map-pin-label{
  position:absolute;bottom:28px;left:50%;transform:translateX(-50%);
  background:rgba(9,25,40,.94);backdrop-filter:blur(12px);
  border:1px solid rgba(201,168,76,.2);padding:14px 22px;
  text-align:center;z-index:3;white-space:nowrap;
}
.ct-map-pin-name{font-family:var(--fd);font-size:1.1rem;font-weight:400;color:var(--w);display:block;}
.ct-map-pin-addr{font-size:.65rem;color:var(--w60);display:block;margin-top:3px;}
.ct-map-pin-link{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:var(--g400);display:block;margin-top:6px;cursor:pointer;}

/* ── CTA STRIP ────────────────────────────────────────────── */
.ct-cta{
  background:var(--n950);padding:80px 60px;
  text-align:center;position:relative;overflow:hidden;
}
.ct-cta::before{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse 60% 60% at 50% 50%,rgba(201,168,76,.055),transparent);
}
.ct-cta-inner{position:relative;z-index:1;}
.ct-cta-h2{font-family:var(--fd);font-size:clamp(2rem,4vw,3.8rem);font-weight:300;color:var(--w);line-height:1.1;margin-bottom:10px;}
.ct-cta-h2 em{color:var(--g400);font-style:italic;}
.ct-cta-p{font-size:.84rem;color:var(--w60);max-width:420px;margin:18px auto 36px;line-height:1.85;}
.ct-cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}

/* ── FOOTER ───────────────────────────────────────────────── */
.ct-footer{background:var(--n950);padding:44px 60px;border-top:1px solid var(--w06);}
.ct-footer-inner{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px;}
.ct-footer-logo{font-family:var(--fd);font-size:1.3rem;letter-spacing:.15em;color:var(--w);}
.ct-footer-logo em{color:var(--g400);font-style:normal;}
.ct-footer-copy{font-size:.65rem;color:var(--w30);}
.ct-footer-back-btn{padding:8px 18px;background:transparent;border:1px solid var(--w12);color:var(--w60);font-family:var(--fb);font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:all .3s;}
.ct-footer-back-btn:hover{border-color:var(--g400);color:var(--g400);}

/* ── BUTTONS ──────────────────────────────────────────────── */
.ct-btn-gold{padding:14px 36px;background:var(--g400);color:var(--n900);font-family:var(--fb);font-size:.7rem;font-weight:500;letter-spacing:.16em;text-transform:uppercase;border:none;cursor:pointer;transition:background .3s,transform .2s;}
.ct-btn-gold:hover{background:var(--g300);transform:translateY(-2px);}
.ct-btn-ghost{padding:14px 36px;background:transparent;color:var(--w);font-family:var(--fb);font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;border:1px solid var(--w30);cursor:pointer;transition:all .3s;}
.ct-btn-ghost:hover{border-color:var(--g400);color:var(--g400);}

/* ── REVEAL ───────────────────────────────────────────────── */
.ct-reveal{opacity:0;transform:translateY(18px);transition:opacity .9s var(--ease),transform .9s var(--ease);}
.ct-reveal.in{opacity:1;transform:translateY(0);}
.ct-d1{transition-delay:.06s}.ct-d2{transition-delay:.14s}.ct-d3{transition-delay:.22s}

/* ── KEYFRAMES ────────────────────────────────────────────── */
@keyframes ctUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}

/* ── RESPONSIVE ───────────────────────────────────────────── */
@media(max-width:1100px){
  .ct-hero{grid-template-columns:1fr;}
  .ct-hero-right{min-height:60vh;}
  .ct-office-panel{padding:60px 40px 40px;}
  .ct-bottom-grid{grid-template-columns:1fr;gap:60px;}
}
@media(max-width:768px){
  .ct-nav{padding:14px 20px;}.ct-nav.scrolled{padding:10px 20px;}
  .ct-nav-links{display:none;}
  .ct-hero-left,.ct-bottom,.ct-cta,.ct-footer{padding-left:20px;padding-right:20px;}
  .ct-hero-left{padding-top:100px;}
  .ct-row{grid-template-columns:1fr;}
  .ct-office-panel{padding:60px 20px 32px;}
}

  .ct-nav-hamburger {
    display: none; flex-direction: column; gap: 5px; cursor: pointer;
    background: none; border: none; padding: 6px; z-index: 310;
  }
  .ct-nav-hamburger span {
    display: block; width: 24px; height: 1.5px; background: rgba(248,245,238,0.6);
    transition: all 0.35s cubic-bezier(0.16,1,0.3,1); transform-origin: center;
  }
  .ct-nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: #C9A84C; }
  .ct-nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .ct-nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: #C9A84C; }
  .ct-drawer {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(3,10,20,0.97); backdrop-filter: blur(24px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    transform: translateX(100%); transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
    pointer-events: none;
  }
  .ct-drawer.open { transform: translateX(0); pointer-events: all; }
  .ct-drawer-brand {
    font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.3rem;
    letter-spacing: .18em; color: #F8F5EE; margin-bottom: 44px;
    opacity: 0; transform: translateY(10px);
    transition: opacity .4s .1s, transform .4s .1s;
  }
  .ct-drawer.open .ct-drawer-brand { opacity: 1; transform: translateY(0); }
  .ct-drawer-brand em { color: #C9A84C; font-style: normal; }
  .ct-dlink {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2rem, 8vw, 3rem); font-weight: 300; color: rgba(248,245,238,0.6);
    background: none; border: none; padding: 10px 0; cursor: pointer;
    display: block; width: 100%; text-align: center;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, opacity .4s cubic-bezier(0.16,1,0.3,1), transform .4s cubic-bezier(0.16,1,0.3,1);
  }
  .ct-drawer.open .ct-dlink { opacity: 1; transform: translateY(0); }
  .ct-drawer.open .ct-dlink:nth-of-type(1) { transition-delay: .12s; }
  .ct-drawer.open .ct-dlink:nth-of-type(2) { transition-delay: .17s; }
  .ct-drawer.open .ct-dlink:nth-of-type(3) { transition-delay: .22s; }
  .ct-drawer.open .ct-dlink:nth-of-type(4) { transition-delay: .27s; }
  .ct-drawer.open .ct-dlink:nth-of-type(5) { transition-delay: .32s; }
  .ct-dlink:hover { color: #C9A84C; }
  .ct-drawer-div { width: 40px; height: 1px; background: rgba(201,168,76,.25); margin: 18px 0; opacity: 0; transition: opacity .4s .34s; }
  .ct-drawer.open .ct-drawer-div { opacity: 1; }
  .ct-dcta {
    font-family: 'DM Sans', sans-serif; font-size: .7rem; letter-spacing: .18em;
    text-transform: uppercase; color: #C9A84C; border: 1px solid #C9A84C;
    background: none; padding: 12px 32px; cursor: pointer; margin-top: 8px;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, background .3s, opacity .4s .38s, transform .4s .38s;
  }
  .ct-drawer.open .ct-dcta { opacity: 1; transform: translateY(0); }
  .ct-dcta:hover { background: #C9A84C; color: #05111e; }
  @media (max-width: 900px) {
    .ct-nav-links { display: none; }
    .ct-nav-cta { display: none !important; }
    .ct-nav-hamburger { display: flex; }
  }
`;

const FAQS = [
  { q:"How long does a typical UAE company formation take?", a:"Free zone formations typically take 5–14 business days depending on the zone. RAKEZ and AFZ can be completed in 3–5 days. DMCC and ADGM typically require 10–14 days for the initial license. Visa processing adds 14–21 days after the license is issued." },
  { q:"Do I need to be physically present in the UAE to set up a company?", a:"No. The majority of INCOZONE clients complete their entire formation remotely — from company structure through to license issuance. Visa applications and Emirates ID collection do require a UAE visit, though we manage the entire scheduling and logistics." },
  { q:"What is the minimum capital requirement for UAE company formation?", a:"Most free zone entities have no minimum paid-up capital requirement. DMCC requires a nominal share capital of AED 50,000 but this does not need to be paid up or held in a UAE bank account. Mainland entities have sector-specific requirements." },
  { q:"Can I open a UAE bank account as a non-resident?", a:"Yes. UAE bank accounts can be opened by non-residents who hold a UAE trade license. Physical presence at the bank is typically required, though we can arrange introductory meetings and prepare all documentation in advance to minimise your time in-branch." },
  { q:"How do I know which free zone is right for my business?", a:"The answer depends on your activity, your customers, your visa requirements, your desired company structure, and your budget. Our initial consultation maps these factors to a structured recommendation. Most clients are presented with two to three options with clear trade-offs explained." },
];

// ── CANVAS ─────────────────────────────────────────────────────
function ContactCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let raf, t = 0;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);

    // UAE coordinate grid dots
    const grid = []; const spacing = 64;
    const rebuild = () => {
      grid.length = 0;
      for (let x = 0; x < c.width + spacing; x += spacing)
        for (let y = 0; y < c.height + spacing; y += spacing)
          grid.push({ x, y, base: Math.random() * Math.PI * 2 });
    };
    rebuild(); window.addEventListener("resize", rebuild);

    const draw = () => {
      t += .005; ctx.clearRect(0, 0, c.width, c.height);
      // dark background
      ctx.fillStyle = "#091928"; ctx.fillRect(0, 0, c.width, c.height);
      // radial glow
      const g = ctx.createRadialGradient(c.width * .6, c.height * .4, 0, c.width * .6, c.height * .4, c.width * .7);
      g.addColorStop(0, "rgba(201,168,76,.07)"); g.addColorStop(1, "transparent");
      ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height);
      // animated dots
      grid.forEach(pt => {
        const pulse = (Math.sin(t * 1.5 + pt.base) + 1) / 2;
        const r = .8 + pulse * 1.2; const a = .1 + pulse * .18;
        ctx.beginPath(); ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${a})`; ctx.fill();
      });
      // connection lines between near dots
      for (let i = 0; i < grid.length; i += 4) {
        for (let j = i + 1; j < Math.min(i + 10, grid.length); j++) {
          const dx = grid[i].x - grid[j].x, dy = grid[i].y - grid[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath(); ctx.moveTo(grid[i].x, grid[i].y); ctx.lineTo(grid[j].x, grid[j].y);
            ctx.strokeStyle = `rgba(201,168,76,${.03 * (1 - d / 90)})`; ctx.lineWidth = .5; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("resize", rebuild); };
  }, []);
  return <canvas ref={ref} className="ct-right-canvas" />;
}

export default function ContactPage({ onBack, onSchedule, onNavigate }) {
  const { content } = useContent();
  const faqs = content?.contact?.faqItems || FAQS;
  const [_ctOpen, setctOpen] = useState(false);
  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = _ctOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [_ctOpen]);

  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", phone:"", company:"", service:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // reveal
  useEffect(() => {
    const els = document.querySelectorAll(".ct-reveal");
    const obs = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
    }), { threshold: .07 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    // POST to serverless function → saves to private GitHub CRM repo
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (_) {
      // Fail silently — user still sees confirmation
    }
    setTimeout(() => setSubmitted(true), 300);
  };

  const update = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div className="ct-root">
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`ct-nav${scrolled ? " scrolled" : ""}`}>
        <div className="ct-nav-logo" onClick={()=>{if(onNavigate){onNavigate("home");window.scrollTo(0,0);}}}>INCO<em>ZONE</em></div>
        <ul className="ct-nav-links">{["Services","Free Zones","About","Blog","Contact"].map(l=>{const m={"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};return <li key={l}><a href="#" onClick={e=>{e.preventDefault();if(onNavigate){onNavigate(m[l]);window.scrollTo(0,0);}}}>{l}</a></li>;})}</ul>
        <button className="ct-back" onClick={onBack}>Back to Home</button>
      
        {/* Hamburger */}
        <button
          className={`ct-nav-hamburger${_ctOpen ? " open" : ""}`}
          onClick={() => setctOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`ct-drawer${_ctOpen ? " open" : ""}`}>
        <div className="ct-drawer-brand"
          onClick={() => { setctOpen(false); if(onNavigate) { onNavigate("home"); window.scrollTo(0,0); } }}>
          INCO<em>ZONE</em>
        </div>
        {["Services","Free Zones","About","Blog","Contact"].map((l) => {
          const pm = {"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};
          return (
            <button key={l} className="ct-dlink"
              onClick={() => { setctOpen(false); if(onNavigate) { onNavigate(pm[l]); window.scrollTo(0,0); } }}>
              {l}
            </button>
          );
        })}
        <div className="ct-drawer-div" />
        <button className="ct-dcta"
          onClick={() => { setctOpen(false); if(onNavigate) { onNavigate("schedule"); window.scrollTo(0,0); } }}>
          Schedule Consultation
        </button>
      </div>

      {/* ═══ HERO SPLIT ══════════════════════════════════════ */}
      <div className="ct-hero">

        {/* LEFT — form */}
        <div className="ct-hero-left">
          <div className="ct-ghost" aria-hidden>C</div>
          <span className="ct-eyebrow">{content?.contact?.heroLabel || "Get in Touch"}</span>
          <h1 className="ct-h1">
            {content?.contact?.heroHeadline || "Let's build your UAE structure together."}
          </h1>
          <p className="ct-sub">
            {content?.contact?.heroBody || "Tell us about your business and we'll match you to the right zone, license type, and structure — with full cost transparency before you commit to anything."}
          </p>

          {submitted ? (
            <div className="ct-success" style={{marginTop:"40px"}}>
              <div className="ct-success-icon"></div>
              <div className="ct-success-title">Message Received.</div>
              <p className="ct-success-body">
                One of our advisors will review your enquiry and respond within one business day. For urgent matters, call us directly on +971 4 XXX XXXX.
              </p>
              <button className="ct-btn-gold" onClick={() => setSubmitted(false)}>Send Another Message</button>
            </div>
          ) : (
            <form className="ct-form" onSubmit={handleSubmit}>
              <div className="ct-row">
                <div className="ct-field">
                  <label>Full Name *</label>
                  <input className="ct-input" placeholder="Your full name" value={form.name} onChange={update("name")} required />
                </div>
                <div className="ct-field">
                  <label>Email Address *</label>
                  <input className="ct-input" type="email" placeholder="your@email.com" value={form.email} onChange={update("email")} required />
                </div>
              </div>
              <div className="ct-row">
                <div className="ct-field">
                  <label>Phone / WhatsApp</label>
                  <input className="ct-input" placeholder="+971 XX XXX XXXX" value={form.phone} onChange={update("phone")} />
                </div>
                <div className="ct-field">
                  <label>Company Name</label>
                  <input className="ct-input" placeholder="Your company (if any)" value={form.company} onChange={update("company")} />
                </div>
              </div>
              <div className="ct-field">
                <label>Service Required</label>
                <select className="ct-select" value={form.service} onChange={update("service")}>
                  <option value="">Select a service</option>
                  <option>Free Zone Company Formation</option>
                  <option>Mainland Company Formation</option>
                  <option>Corporate & PRO Advisory</option>
                  <option>UAE Investor Visa / Golden Visa</option>
                  <option>Corporate Banking Setup</option>
                  <option>Company Amendments & Renewals</option>
                  <option>General Advisory</option>
                </select>
              </div>
              <div className="ct-field">
                <label>Message</label>
                <textarea className="ct-textarea" placeholder="Tell us about your business, nationality, and what you're trying to build in the UAE…" value={form.message} onChange={update("message")} />
              </div>
              <div style={{display:"flex",gap:"12px",flexWrap:"wrap",alignItems:"center"}}>
                <button type="submit" className="ct-submit">Send Enquiry →</button>
                {onSchedule && (
                  <button type="button" className="ct-btn-ghost" onClick={onSchedule}>
                    Schedule Consultation Instead
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

        {/* RIGHT — info */}
        <div className="ct-hero-right">
          <ContactCanvas />
          <div className="ct-office-panel">
            <span className="ct-office-label">Head Office</span>
            <div className="ct-office-name">Business Bay,<em>Dubai, UAE</em></div>
            <p className="ct-office-addr">
              Office 15, Iris Bay Tower<br />
              Business Bay, Dubai<br />
              United Arab Emirates, PO Box 000000
            </p>

            {[
              { icon:"", label:"Direct Line", val:"+971 56 583 4586", sub:"Sun–Thu, 9:00am–6:00pm GST" },
              { icon:"", label:"Email Advisory", val:"info@essenceuae.com", sub:"Response within 1 business day" },
              { icon:"", label:"WhatsApp", val:"+971 56 583 4586", sub:"Instant messaging, 7 days" },
              { icon:"", label:"Location", val:"Business Bay, Dubai", sub:"Near Dubai Mall Metro Station" },
            ].map((c, i) => (
              <div className="ct-contact-card ct-reveal" key={i} style={{transitionDelay:`${i*.08}s`}}>
                <div className="ct-cc-icon">{c.icon}</div>
                <div>
                  <span className="ct-cc-label">{c.label}</span>
                  <div className="ct-cc-val">{c.val}</div>
                  <span className="ct-cc-sub">{c.sub}</span>
                </div>
                <span className="ct-cc-arrow">→</span>
              </div>
            ))}
          </div>

          {/* Hours */}
          <div className="ct-hours">
            {[
              { day:"Sun–Thu", time:"9:00 – 18:00" },
              { day:"Saturday", time:"10:00 – 14:00" },
              { day:"Friday", time:"Closed" },
            ].map((h, i) => (
              <div className="ct-hours-item" key={i}>
                <span className="ct-hours-day">{h.day}</span>
                <span className="ct-hours-time">{h.time}</span>
              </div>
            ))}
            <div className="ct-hours-item">
              <span className="ct-hours-day">Timezone</span>
              <span className="ct-hours-time">GST (UTC+4)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ FAQ + MAP ════════════════════════════════════════ */}
      <div className="ct-bottom">
        <div className="ct-bottom-grid">

          {/* FAQ */}
          <div>
            <h2 className="ct-faq-h2 ct-reveal">Common<em> Questions.</em></h2>
            {faqs.map((f, i) => (
              <div className={`ct-faq-item ct-reveal ct-d${(i%3)+1}${openFaq===i?" open":""}`} key={i}>
                <button className="ct-faq-q" onClick={() => setOpenFaq(openFaq===i?null:i)}>
                  <span>{f.q}</span>
                  <span className="ct-faq-chevron">+</span>
                </button>
                <div className="ct-faq-a"><div style={{paddingBottom:"4px"}}>{f.a}</div></div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="ct-map-panel ct-reveal ct-d2">
            <span className="ct-map-label">Find Us</span>
            <h2 className="ct-map-h2">Visit Our<em> Dubai Office.</em></h2>
            <div className="ct-map-box">
              <div className="ct-map-dot" />
              <div className="ct-map-pin-label">
                <span className="ct-map-pin-name">INCOZONE Advisory</span>
                <span className="ct-map-pin-addr">Iris Bay Tower, Business Bay, Dubai</span>
                <span className="ct-map-pin-link">Open in Google Maps →</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ CTA ══════════════════════════════════════════════ */}
      <div className="ct-cta">
        <div className="ct-cta-inner">
          <span style={{fontSize:".58rem",letterSpacing:".34em",textTransform:"uppercase",color:"var(--g400)",display:"block",marginBottom:"16px"}}>Ready to Begin</span>
          <h2 className="ct-cta-h2">Prefer a call?<em> Schedule it.</em></h2>
          <p className="ct-cta-p">Book a private 30-minute consultation with a senior INCOZONE advisor. No obligation, no sales pitch — just a structured conversation about your UAE goals.</p>
          <div className="ct-cta-btns">
            {onSchedule && <button className="ct-btn-gold" onClick={onSchedule}>Schedule Consultation →</button>}
            <button className="ct-btn-ghost" onClick={onBack}>← Back to Home</button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="ct-footer">
        <div className="ct-footer-inner">
          <div className="ct-footer-logo">INCO<em>ZONE</em></div>
          <div className="ct-footer-copy">© 2026 INCOZONE. Business Bay, Dubai, UAE.</div>
          <button className="ct-footer-back-btn" onClick={onBack}>← Back to Home</button>
        </div>
      </footer>
    </div>
  );
}
