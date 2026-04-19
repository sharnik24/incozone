import { useState, useEffect, useRef } from "react";
import { IBuilding, IBriefcase, IGlobe, IAlertCircle, IBan, ILock, IShield, IUsers, IScale } from "../icons";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Company Liquidation Page
//  Drop into: src/pages/CompanyLiquidation.jsx
// ═══════════════════════════════════════════════════════════════

const CSS = `
.cl-root*,.cl-root *::before,.cl-root *::after{box-sizing:border-box;margin:0;padding:0}
.cl-root{--n950:#020b14;--n900:#05111e;--n800:#091928;--n750:#0c2033;--n700:#102540;--n600:#163354;--g400:#C9A84C;--g300:#D4B468;--g200:#E2CC98;--glow2:rgba(201,168,76,0.07);--cream-bg:#FAF6EE;--cream-100:#F4ECD8;--cream-200:#EDE0C4;--cream-ink:#1A120A;--cream-ink2:#3D2E1A;--cream-ink3:#7A6040;--cream-bdr:rgba(180,150,90,0.2);--w:#F8F5EE;--w80:rgba(248,245,238,0.80);--w60:rgba(248,245,238,0.60);--w30:rgba(248,245,238,0.30);--w12:rgba(248,245,238,0.12);--w06:rgba(248,245,238,0.06);--fd:'Cormorant Garamond',Georgia,serif;--fb:'DM Sans',system-ui,sans-serif;--ease:cubic-bezier(0.16,1,0.3,1);font-family:var(--fb);font-weight:300;line-height:1.6;color:var(--w);background:var(--n900);overflow-x:hidden;width:100%}
.cl-nav{position:fixed;inset-inline:0;top:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:22px 60px;transition:background 0.5s,padding 0.4s,border-color 0.5s;border-bottom:1px solid transparent}
.cl-nav.scrolled{background:rgba(5,17,30,0.96);backdrop-filter:blur(20px);padding:14px 60px;border-bottom-color:rgba(201,168,76,0.12)}
.cl-nav-logo{font-family:var(--fd);font-size:1.5rem;font-weight:500;letter-spacing:0.15em;color:var(--w);cursor:pointer}
.cl-nav-logo em{color:var(--g400);font-style:normal}
.cl-nav-links{display:flex;gap:36px;list-style:none}
.cl-nav-links a{font-size:0.72rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--w60);text-decoration:none;transition:color 0.3s;cursor:pointer}
.cl-nav-links a:hover{color:var(--g300)}
.cl-nav-cta{font-size:0.7rem;letter-spacing:0.14em;text-transform:uppercase;background:transparent;border:1px solid var(--g400);color:var(--g400);padding:9px 22px;cursor:pointer;font-family:var(--fb);transition:background 0.3s,color 0.3s}
.cl-nav-cta:hover{background:var(--g400);color:var(--n900)}
.cl-nav-hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:6px}
.cl-nav-hamburger span{display:block;width:24px;height:1.5px;background:var(--w60);transition:all 0.35s var(--ease);transform-origin:center}
.cl-nav-hamburger.open span:nth-child(1){transform:translateY(6.5px) rotate(45deg);background:var(--g400)}
.cl-nav-hamburger.open span:nth-child(2){opacity:0;transform:scaleX(0)}
.cl-nav-hamburger.open span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg);background:var(--g400)}
.cl-drawer{position:fixed;inset:0;z-index:300;background:rgba(3,10,20,0.97);backdrop-filter:blur(24px);display:flex;flex-direction:column;align-items:center;justify-content:center;transform:translateX(100%);transition:transform 0.45s var(--ease);pointer-events:none}
.cl-drawer.open{transform:translateX(0);pointer-events:all}
.cl-drawer-brand{font-family:var(--fd);font-size:1.3rem;letter-spacing:.18em;color:var(--w);margin-bottom:44px;opacity:0;transform:translateY(10px);transition:opacity .4s .1s,transform .4s .1s;cursor:pointer}
.cl-drawer.open .cl-drawer-brand{opacity:1;transform:translateY(0)}
.cl-drawer-brand em{color:var(--g400);font-style:normal}
.cl-dlink{font-family:var(--fd);font-size:clamp(2rem,8vw,3rem);font-weight:300;color:var(--w60);background:none;border:none;padding:10px 0;cursor:pointer;display:block;width:100%;text-align:center;opacity:0;transform:translateY(18px);transition:color .3s,opacity .4s var(--ease),transform .4s var(--ease)}
.cl-drawer.open .cl-dlink{opacity:1;transform:translateY(0)}
.cl-drawer.open .cl-dlink:nth-of-type(1){transition-delay:.12s}.cl-drawer.open .cl-dlink:nth-of-type(2){transition-delay:.17s}.cl-drawer.open .cl-dlink:nth-of-type(3){transition-delay:.22s}.cl-drawer.open .cl-dlink:nth-of-type(4){transition-delay:.27s}.cl-drawer.open .cl-dlink:nth-of-type(5){transition-delay:.32s}
.cl-dlink:hover{color:var(--g400)}
.cl-drawer-div{width:40px;height:1px;background:rgba(201,168,76,.25);margin:18px 0;opacity:0;transition:opacity .4s .34s}
.cl-drawer.open .cl-drawer-div{opacity:1}
.cl-dcta{font-family:var(--fb);font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:var(--g400);border:1px solid var(--g400);background:none;padding:12px 32px;cursor:pointer;margin-top:8px;opacity:0;transform:translateY(18px);transition:color .3s,background .3s,opacity .4s .38s,transform .4s .38s}
.cl-drawer.open .cl-dcta{opacity:1;transform:translateY(0)}
.cl-dcta:hover{background:var(--g400);color:var(--n900)}
.cl-hero{min-height:100vh;position:relative;overflow:hidden;display:grid;grid-template-columns:1.2fr 1fr;align-items:flex-end;padding:0 60px 80px;gap:60px}
.cl-hero-canvas{position:absolute;inset:0;z-index:0}
.cl-hero-left{position:relative;z-index:2;padding-top:160px}
.cl-hero-right{position:relative;z-index:2;padding-top:160px;display:flex;align-items:flex-end;justify-content:flex-end}
.cl-hero-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:0.62rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--g400);border:1px solid rgba(201,168,76,0.28);padding:7px 16px;margin-bottom:32px;opacity:0;animation:clUp 1s var(--ease) 0.2s forwards}
.cl-eyebrow-dot{width:5px;height:5px;border-radius:50%;background:var(--g400);animation:clBlink 2s infinite}
.cl-hero-h1{font-family:var(--fd);font-weight:300;line-height:0.88;letter-spacing:-0.02em;color:var(--w);font-size:clamp(3.8rem,8vw,7.5rem);margin-bottom:20px;opacity:0;animation:clUp 1.1s var(--ease) 0.35s forwards}
.cl-hero-h1 em{display:block;color:var(--g400);font-style:italic}
.cl-hero-sub{font-family:var(--fd);font-size:1rem;color:var(--w60);font-style:italic;margin-bottom:32px;opacity:0;animation:clUp 1s var(--ease) 0.5s forwards}
.cl-hero-desc{font-size:0.88rem;color:var(--w60);line-height:1.85;max-width:540px;margin-bottom:36px;opacity:0;animation:clUp 1s var(--ease) 0.65s forwards}
.cl-hero-desc strong{color:var(--w80);font-weight:400}
.cl-hero-tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:36px;opacity:0;animation:clUp 1s var(--ease) 0.75s forwards}
.cl-hero-tag{font-size:0.6rem;letter-spacing:0.16em;text-transform:uppercase;padding:6px 14px;border:1px solid rgba(201,168,76,0.25);color:var(--g300)}
.cl-hero-btns{display:flex;gap:14px;flex-wrap:wrap;opacity:0;animation:clUp 1s var(--ease) 0.85s forwards}
.cl-btn-gold{padding:15px 36px;background:var(--g400);color:var(--n900);font-family:var(--fb);font-size:0.72rem;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;border:none;cursor:pointer;transition:background 0.3s,transform 0.2s}
.cl-btn-gold:hover{background:var(--g300);transform:translateY(-2px)}
.cl-btn-ghost{padding:15px 36px;background:transparent;color:var(--w60);font-family:var(--fb);font-size:0.72rem;letter-spacing:0.14em;text-transform:uppercase;border:1px solid var(--w12);cursor:pointer;transition:all 0.3s}
.cl-btn-ghost:hover{border-color:var(--w30);color:var(--w);transform:translateY(-2px)}
.cl-warning-card{background:rgba(180,60,40,0.08);border:1px solid rgba(220,80,60,0.25);padding:40px 36px;min-width:280px;position:relative;overflow:hidden}
.cl-warning-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(220,80,60,0.04),transparent);pointer-events:none}
.cl-warning-title{font-family:var(--fd);font-size:1.2rem;color:rgba(255,120,100,0.85);margin-bottom:16px;display:flex;align-items:center;gap:10px}
.cl-warning-items{display:flex;flex-direction:column;gap:10px}
.cl-warning-item{display:flex;align-items:flex-start;gap:10px;font-size:0.78rem;color:var(--w60);line-height:1.6}
.cl-warning-icon{color:rgba(255,120,100,0.7);flex-shrink:0;font-size:0.85rem;margin-top:2px}
.cl-stats-bar{background:var(--n800);padding:0 60px;display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid var(--w06)}
.cl-sbar{padding:32px 0;text-align:center;border-right:1px solid var(--w06)}
.cl-sbar:last-child{border-right:none}
.cl-sbar-val{font-family:var(--fd);font-size:2.2rem;font-weight:300;color:var(--g400);display:block;line-height:1}
.cl-sbar-key{font-size:0.62rem;letter-spacing:0.16em;text-transform:uppercase;color:var(--w30);margin-top:6px;display:block}
.cl-section-label{font-size:0.6rem;letter-spacing:0.32em;text-transform:uppercase;color:var(--g400);margin-bottom:16px;display:block}
.cl-section-h2{font-family:var(--fd);font-size:clamp(2.2rem,4vw,3.8rem);font-weight:300;line-height:1.1;color:var(--w);margin-bottom:60px}
.cl-section-h2 em{color:var(--g400);font-style:italic}
.cl-types{background:var(--n900);padding:100px 60px}
.cl-types-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:var(--w06)}
.cl-type-card{background:var(--n800);padding:44px 36px;position:relative;overflow:hidden;transition:background 0.4s var(--ease)}
.cl-type-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--glow2),transparent);opacity:0;transition:opacity 0.4s}
.cl-type-card:hover{background:var(--n750)}
.cl-type-card:hover::before{opacity:1}
.cl-type-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--g400);transform:scaleX(0);transform-origin:left;transition:transform 0.5s var(--ease)}
.cl-type-card:hover::after{transform:scaleX(1)}
.cl-type-badge{font-size:0.58rem;letter-spacing:0.2em;text-transform:uppercase;padding:4px 10px;border:1px solid rgba(201,168,76,0.3);color:var(--g400);width:fit-content;margin-bottom:20px}
.cl-type-icon{font-size:2rem;margin-bottom:16px;display:block}
.cl-type-title{font-family:var(--fd);font-size:1.45rem;font-weight:400;color:var(--w);margin-bottom:10px;line-height:1.2}
.cl-type-desc{font-size:0.8rem;color:var(--w60);line-height:1.75;margin-bottom:16px}
.cl-type-includes{display:flex;flex-direction:column;gap:8px}
.cl-type-include{display:flex;align-items:flex-start;gap:10px;font-size:0.76rem;color:var(--w60)}
.cl-type-dot{width:5px;height:5px;border-radius:50%;background:var(--g400);flex-shrink:0;margin-top:6px}
.cl-process{background:var(--n800);padding:100px 60px}
.cl-process-inner{display:grid;grid-template-columns:1fr 1.4fr;gap:80px;align-items:start}
.cl-process-intro{font-size:0.84rem;color:var(--w60);line-height:1.88;margin-top:24px}
.cl-process-intro strong{color:var(--w80);font-weight:400}
.cl-steps{display:flex;flex-direction:column;gap:0}
.cl-step{display:grid;grid-template-columns:64px 1fr;gap:0;border-top:1px solid var(--w06);position:relative}
.cl-step:last-child{border-bottom:1px solid var(--w06)}
.cl-step::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--g400);transform:scaleY(0);transform-origin:top;transition:transform 0.5s var(--ease)}
.cl-step:hover::before{transform:scaleY(1)}
.cl-step-num{font-family:var(--fd);font-size:3rem;font-weight:300;color:rgba(201,168,76,0.15);line-height:1;padding:32px 0;transition:color 0.4s}
.cl-step:hover .cl-step-num{color:rgba(201,168,76,0.35)}
.cl-step-body{padding:32px 0 32px 24px}
.cl-step-title{font-size:0.95rem;font-weight:500;color:var(--w);margin-bottom:8px}
.cl-step-desc{font-size:0.8rem;color:var(--w60);line-height:1.72}
.cl-step-time{font-size:0.6rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--g400);border:1px solid rgba(201,168,76,0.2);padding:4px 12px;display:inline-flex;margin-top:12px}
.cl-consequences{background:var(--n900);padding:100px 60px}
.cl-con-inner{display:grid;grid-template-columns:1fr 1fr;gap:2px;background:var(--w06)}
.cl-con-card{background:var(--n900);padding:44px 36px;transition:background 0.3s;display:flex;gap:20px;align-items:flex-start}
.cl-con-card:hover{background:var(--n800)}
.cl-con-icon{font-size:2rem;flex-shrink:0}
.cl-con-title{font-size:0.92rem;font-weight:500;color:var(--w);margin-bottom:8px}
.cl-con-desc{font-size:0.78rem;color:var(--w60);line-height:1.72}
.cl-packages{background:var(--cream-bg);padding:100px 60px;position:relative;overflow:hidden}
.cl-packages::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,var(--g400),transparent);opacity:0.5}
.cl-pkg-label{font-size:0.6rem;letter-spacing:0.32em;text-transform:uppercase;color:#8A6820;margin-bottom:16px;display:block}
.cl-pkg-h2{font-family:var(--fd);font-size:clamp(2.2rem,4vw,3.5rem);font-weight:300;color:var(--cream-ink);line-height:1.1;margin-bottom:60px}
.cl-pkg-h2 em{color:var(--g400);font-style:italic}
.cl-pkgs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.cl-pkg{background:var(--cream-bg);border:1px solid var(--cream-bdr);padding:44px 36px;display:flex;flex-direction:column;transition:all 0.35s var(--ease);box-shadow:0 2px 12px rgba(120,90,30,0.06);cursor:pointer}
.cl-pkg:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(120,90,30,0.14);border-color:rgba(201,168,76,0.45)}
.cl-pkg.featured{background:var(--n900);border:1px solid rgba(201,168,76,0.35);box-shadow:0 8px 40px rgba(0,0,0,0.22)}
.cl-pkg.featured:hover{border-color:var(--g400)}
.cl-pkg-badge{font-size:0.58rem;letter-spacing:0.2em;text-transform:uppercase;padding:4px 10px;width:fit-content;margin-bottom:22px;border:1px solid;font-weight:500}
.cl-pkg:not(.featured) .cl-pkg-badge{border-color:var(--cream-bdr);color:var(--cream-ink3);background:var(--cream-200)}
.cl-pkg.featured .cl-pkg-badge{border-color:var(--g400);color:var(--g400);background:rgba(201,168,76,0.08)}
.cl-pkg-name{font-family:var(--fd);font-size:1.7rem;font-weight:400;margin-bottom:8px}
.cl-pkg:not(.featured) .cl-pkg-name{color:var(--cream-ink)}
.cl-pkg.featured .cl-pkg-name{color:var(--w)}
.cl-pkg-tagline{font-size:0.78rem;margin-bottom:28px}
.cl-pkg:not(.featured) .cl-pkg-tagline{color:var(--cream-ink3)}
.cl-pkg.featured .cl-pkg-tagline{color:var(--w60)}
.cl-pkg-div{height:1px;margin-bottom:28px}
.cl-pkg:not(.featured) .cl-pkg-div{background:var(--cream-bdr)}
.cl-pkg.featured .cl-pkg-div{background:var(--w06)}
.cl-pkg-feats{list-style:none;display:flex;flex-direction:column;gap:11px;flex:1;margin-bottom:32px}
.cl-pkg-feat{display:flex;align-items:flex-start;gap:11px;font-size:0.8rem;line-height:1.5}
.cl-pkg:not(.featured) .cl-pkg-feat{color:var(--cream-ink2)}
.cl-pkg.featured .cl-pkg-feat{color:var(--w80)}
.cl-feat-chk{flex-shrink:0;margin-top:2px;font-size:0.75rem}
.cl-feat-chk.yes{color:#8A6820}
.cl-pkg.featured .cl-feat-chk.yes{color:var(--g400)}
.cl-feat-chk.no{color:rgba(180,150,90,0.3)}
.cl-pkg-cta{padding:13px 20px;font-size:0.7rem;letter-spacing:0.12em;text-transform:uppercase;font-family:var(--fb);cursor:pointer;transition:all 0.3s;width:100%;font-weight:500}
.cl-pkg:not(.featured) .cl-pkg-cta{background:transparent;border:1px solid var(--cream-bdr);color:var(--cream-ink2)}
.cl-pkg:not(.featured) .cl-pkg-cta:hover{border-color:var(--g400);color:var(--cream-ink);background:var(--cream-200)}
.cl-pkg.featured .cl-pkg-cta{background:var(--g400);border:none;color:var(--n900)}
.cl-pkg.featured .cl-pkg-cta:hover{background:var(--g300)}
.cl-faq{background:var(--n900);padding:100px 60px}
.cl-faq-inner{display:grid;grid-template-columns:1fr 1.6fr;gap:80px;align-items:start}
.cl-faq-list{display:flex;flex-direction:column}
.cl-faq-item{border-top:1px solid var(--w06)}
.cl-faq-item:last-child{border-bottom:1px solid var(--w06)}
.cl-faq-q{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:22px 0;cursor:pointer}
.cl-faq-q-text{font-size:0.9rem;font-weight:400;color:var(--w);transition:color 0.3s}
.cl-faq-item.open .cl-faq-q-text{color:var(--g400)}
.cl-faq-icon{width:28px;height:28px;border:1px solid var(--w12);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--w30);flex-shrink:0;transition:all 0.4s var(--ease)}
.cl-faq-item.open .cl-faq-icon{background:var(--g400);border-color:var(--g400);color:var(--n900);transform:rotate(45deg)}
.cl-faq-a{font-size:0.82rem;color:var(--w60);line-height:1.82;padding-bottom:22px;max-height:0;overflow:hidden;transition:max-height 0.5s var(--ease)}
.cl-faq-item.open .cl-faq-a{max-height:300px}
.cl-cta{background:var(--cream-bg);padding:120px 60px;text-align:center;position:relative;overflow:hidden}
.cl-cta::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(180,150,90,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(180,150,90,0.06) 1px,transparent 1px);background-size:60px 60px}
.cl-cta::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% 50%,rgba(201,168,76,0.09),transparent);pointer-events:none}
.cl-cta-inner{position:relative;z-index:1;max-width:640px;margin:0 auto}
.cl-cta-label{font-size:0.6rem;letter-spacing:0.32em;text-transform:uppercase;color:#8A6820;margin-bottom:20px;display:block}
.cl-cta-h2{font-family:var(--fd);font-size:clamp(2.5rem,5vw,4.2rem);font-weight:300;color:var(--cream-ink);line-height:1.1;margin-bottom:12px}
.cl-cta-h2 em{color:var(--g400);font-style:italic}
.cl-cta-divider{width:44px;height:1px;background:var(--g400);margin:24px auto;opacity:0.5}
.cl-cta-p{font-size:0.84rem;color:var(--cream-ink3);line-height:1.85;margin-bottom:44px}
.cl-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.cl-btn-dark{padding:15px 40px;background:var(--cream-ink);color:var(--cream-bg);font-family:var(--fb);font-size:0.72rem;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;border:none;cursor:pointer;transition:background 0.3s,transform 0.2s}
.cl-btn-dark:hover{background:var(--g400);color:var(--cream-ink);transform:translateY(-2px)}
.cl-btn-outline{padding:15px 40px;background:transparent;color:var(--cream-ink2);font-family:var(--fb);font-size:0.72rem;letter-spacing:0.14em;text-transform:uppercase;border:1px solid var(--cream-bdr);cursor:pointer;transition:all 0.3s}
.cl-btn-outline:hover{border-color:var(--g400);color:var(--cream-ink);transform:translateY(-2px)}
.cl-footer{background:var(--n950);padding:52px 60px;border-top:1px solid var(--w06)}
.cl-footer-inner{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px}
.cl-footer-logo{font-family:var(--fd);font-size:1.3rem;letter-spacing:0.15em;color:var(--w)}
.cl-footer-logo em{color:var(--g400);font-style:normal}
.cl-footer-copy{font-size:0.68rem;color:var(--w30)}
.cl-wa{position:fixed;bottom:28px;right:28px;z-index:300;width:50px;height:50px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 18px rgba(37,211,102,0.4);transition:transform 0.3s}
.cl-wa:hover{transform:scale(1.1)}
.cl-reveal{opacity:0;transform:translateY(22px);transition:opacity 0.85s var(--ease),transform 0.85s var(--ease)}
.cl-reveal.in{opacity:1;transform:translateY(0)}
.cl-d1{transition-delay:0.05s}.cl-d2{transition-delay:0.15s}.cl-d3{transition-delay:0.25s}.cl-d4{transition-delay:0.35s}
@keyframes clUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes clBlink{0%,100%{opacity:1}50%{opacity:0.3}}
@media(max-width:1000px){.cl-hero{grid-template-columns:1fr;padding:120px 40px 60px}.cl-hero-right{justify-content:flex-start}.cl-types-grid{grid-template-columns:1fr}.cl-process-inner{grid-template-columns:1fr}.cl-con-inner{grid-template-columns:1fr}.cl-faq-inner{grid-template-columns:1fr;gap:48px}.cl-pkgs-grid{grid-template-columns:1fr}.cl-stats-bar{grid-template-columns:1fr 1fr}}
@media(max-width:768px){.cl-nav{padding:16px 24px}.cl-nav.scrolled{padding:12px 24px}.cl-nav-links{display:none}.cl-nav-cta{display:none}.cl-nav-hamburger{display:flex}.cl-hero{padding:100px 24px 52px}.cl-types,.cl-process,.cl-consequences,.cl-packages,.cl-faq,.cl-cta{padding:70px 24px}.cl-footer{padding:40px 24px}.cl-stats-bar{padding:0 24px}}
`;

const LIQ_TYPES = [
  {
    icon: IBuilding, badge: "Free Zone",
    title: "Free Zone Liquidation",
    desc: "Professional deregistration of free zone companies across DMCC, IFZA, JAFZA, RAKEZ, SHAMS, Meydan, AFZ, ADGM and all other UAE free zones. Each authority has a specific closure process — we manage all.",
    includes: ["License cancellation with authority", "Employee visa cancellations", "Signatory removal from free zone", "Corporate document surrender", "Final clearance certificate", "Bank account closure coordination"],
  },
  {
    icon: IBriefcase, badge: "Mainland",
    title: "Mainland Liquidation",
    desc: "DED and Department of Economic Development mainland company dissolution — including LLC, sole establishment, professional license, and branch office closures. Full MOE and labour clearance managed.",
    includes: ["DED license cancellation", "MOHRE / WPS clearance", "All employee visa cancellations", "Local sponsor release", "Municipality clearance", "Final deregistration certificate"],
  },
  {
    icon: IGlobe, badge: "Offshore",
    title: "Offshore Dissolution",
    desc: "Clean dissolution of RAK ICC, Ajman Offshore, and other UAE offshore companies — including registered agent termination, bank account closure, and final deregistration from the authority.",
    includes: ["Authority dissolution application", "Registered agent termination", "Bank account closure coordination", "Corporate document cancellation", "Dissolution certificate issuance", "Annual fee clearance"],
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Liquidation Assessment", desc: "We review your company status — outstanding fees, employee visas, lease obligations, bank accounts, and authority clearances needed. A complete closure roadmap is prepared before we begin.", time: "Day 1–2" },
  { num: "02", title: "Employee Visa Cancellations", desc: "All employee and investor visas cancelled through GDRFA or free zone authority. Labour clearances obtained from MOHRE. Final exit processing managed.", time: "Day 2–10" },
  { num: "03", title: "Outstanding Fee Settlement", desc: "Any outstanding license fees, penalties, or government dues are identified and cleared. We negotiate penalty waivers where possible before final submission.", time: "Day 5–14" },
  { num: "04", title: "Bank Account Closure", desc: "We coordinate with your UAE bank to formally close corporate accounts — including obtaining balance confirmation letters and account closure certificates required by authorities.", time: "Day 7–21" },
  { num: "05", title: "Authority Submission & Clearances", desc: "Liquidation application submitted to the relevant free zone or mainland authority. All supporting clearances from municipality, immigration, and MOHRE submitted simultaneously.", time: "Day 14–25" },
  { num: "06", title: "Deregistration Certificate", desc: "Final deregistration certificate issued by the authority — confirming the company is formally dissolved and all obligations extinguished. Delivered to you with full closure file.", time: "Day 25–35" },
];

const CONSEQUENCES = [
  { icon: IAlertCircle, title: "Daily Accumulating Fines", desc: "Expired UAE licenses accrue daily and monthly fines. Leaving a license to lapse without formal cancellation results in compounding penalties that can reach tens of thousands of dirhams." },
  { icon: IBan, title: "UAE Travel Ban", desc: "Outstanding company debts, unpaid fines, or improper closures can result in personal travel bans on company directors and shareholders — preventing re-entry to the UAE." },
  { icon: ILock, title: "Frozen Bank Accounts", desc: "An improperly closed or abandoned company can lead to corporate bank account freezing, which may affect personal accounts of directors in some circumstances." },
  { icon: IShield, title: "Blacklisting with Authorities", desc: "Abandoned companies with outstanding violations are flagged by free zone authorities and DED — preventing future company setup in the same jurisdiction under the same shareholders." },
  { icon: IUsers, title: "Ongoing Employee Liability", desc: "If employees are not formally released through MOHRE, the company remains the legal employer — with ongoing salary, end-of-service, and gratuity obligations accumulating." },
  { icon: IScale, title: "Director Personal Liability", desc: "In cases of wilful abandonment, UAE courts may pierce the corporate veil and hold directors personally liable for company debts and obligations." },
];

const FAQS = [
  { q: "How long does UAE company liquidation take?", a: "A clean free zone liquidation with no outstanding issues typically takes 25–35 working days from commencement to deregistration certificate. Mainland liquidation can take 30–45 days. Companies with outstanding fines, employee disputes, or bank complications take longer. INCOZONE provides an accurate timeline after the initial assessment." },
  { q: "What happens if I just stop renewing my license?", a: "Simply abandoning a UAE license is one of the most costly mistakes business owners make. Fines accumulate daily and monthly. After extended non-renewal, the company is blacklisted, authority clearances become harder to obtain, and personal travel bans may be issued. Proper liquidation always costs less than abandonment." },
  { q: "Can I liquidate a company while outside the UAE?", a: "Yes. INCOZONE manages the complete liquidation process remotely. We hold power of attorney on your behalf and represent the company at all authority visits, submissions, and approvals. You do not need to be physically present in the UAE." },
  { q: "What if my company has outstanding debts or fines?", a: "Outstanding fines and debts must be cleared before a company can be formally deregistered. INCOZONE identifies all outstanding obligations in the initial assessment, negotiates penalty waivers where possible, and manages settlement — giving you a clear picture of the total closure cost before proceeding." },
  { q: "Do all employees need their visas cancelled before liquidation?", a: "Yes. All employee and investor visas sponsored by the company must be formally cancelled through the relevant authority before the license can be closed. INCOZONE manages all visa cancellations, MOHRE clearances, and labour court clearances as part of the liquidation process." },
];

function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let W, H, raf, t = 0;
    const pts = Array.from({ length: 48 }, () => ({ x: Math.random() * 1920, y: Math.random() * 1080, vx: (Math.random() - .5) * 0.14, vy: (Math.random() - .5) * 0.14, r: Math.random() * 1.3 + 0.4, o: Math.random() * 0.32 + 0.1 }));
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      t += 0.003; ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, W, H); bg.addColorStop(0, "#05111e"); bg.addColorStop(1, "#020b14"); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      [[0.12, 0.28, "#C9A84C", 0.045, 11], [0.84, 0.22, "#163354", 0.42, 9], [0.5, 0.78, "#C9A84C", 0.035, 14]].forEach(([bx, by, col, a, spd], i) => { const x = W * bx + Math.sin(t * (spd / 10) + i * 2) * 70, y = H * by + Math.cos(t * (spd / 13) + i) * 50, r = Math.min(W, H) * 0.6, g = ctx.createRadialGradient(x, y, 0, x, y, r), rgb = parseInt(col.slice(1), 16); g.addColorStop(0, `rgba(${rgb >> 16},${(rgb >> 8) & 255},${rgb & 255},${a})`); g.addColorStop(1, "rgba(0,0,0,0)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); });
      ctx.strokeStyle = "rgba(201,168,76,0.022)"; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      for (let i = 0; i < pts.length; i++) { const p = pts[i]; p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0; for (let j = i + 1; j < pts.length; j++) { const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy); if (d < 140) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(201,168,76,${0.06 * (1 - d / 140)})`; ctx.lineWidth = 0.4; ctx.stroke(); } } ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(201,168,76,${p.o})`; ctx.fill(); }
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, H * 0.9); vg.addColorStop(0, "transparent"); vg.addColorStop(1, "rgba(2,11,20,0.7)"); ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="cl-hero-canvas" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".cl-reveal");
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } }), { threshold: 0.07 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

export default function CompanyLiquidationPage({ onBack, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useReveal();
  useEffect(() => { window.scrollTo(0, 0); const h = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { document.body.style.overflow = drawerOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [drawerOpen]);
  const go = (page) => { setDrawerOpen(false); if (onNavigate) { onNavigate(page); window.scrollTo(0, 0); } };
  const navLinks = [{ label: "Home", page: "home" }, { label: "Services", page: "services" }, { label: "Free Zones", page: "home" }, { label: "About", page: "about" }, { label: "Blog", page: "blog" }, { label: "Contact", page: "contact" }];

  return (
    <div className="cl-root">
      <style>{CSS}</style>
      <nav className={`cl-nav${scrolled ? " scrolled" : ""}`}>
        <div className="cl-nav-logo" onClick={() => go("home")}>INCO<em>ZONE</em></div>
        <ul className="cl-nav-links">{navLinks.map(l => <li key={l.label}><a onClick={() => go(l.page)}>{l.label}</a></li>)}</ul>
        <button className="cl-nav-cta" onClick={() => go("schedule")}>Schedule Consultation</button>
        <button className={`cl-nav-hamburger${drawerOpen ? " open" : ""}`} onClick={() => setDrawerOpen(o => !o)}><span /><span /><span /></button>
      </nav>
      <div className={`cl-drawer${drawerOpen ? " open" : ""}`}>
        <div className="cl-drawer-brand" onClick={() => go("home")}>INCO<em>ZONE</em></div>
        {navLinks.map(l => <button key={l.label} className="cl-dlink" onClick={() => go(l.page)}>{l.label}</button>)}
        <div className="cl-drawer-div" />
        <button className="cl-dcta" onClick={() => go("schedule")}>Schedule Consultation</button>
      </div>

      <section className="cl-hero">
        <HeroCanvas />
        <div className="cl-hero-left">
          <div className="cl-hero-eyebrow"><div className="cl-eyebrow-dot" />Exit Strategy · UAE</div>
          <h1 className="cl-hero-h1">Company<br /><em>Liquidation</em><br />UAE.</h1>
          <div className="cl-hero-sub">Clean, Compliant, Professionally Managed Exit</div>
          <p className="cl-hero-desc">Clean, compliant, and <strong>professionally managed company closure</strong> across all UAE free zones and mainland — including visa cancellations, lease terminations, bank account closure, final government clearances, and deregistration certificates. <strong>Avoid penalties and blacklisting</strong> through proper winding down. We manage every authority interaction from first notice to final clearance.</p>
          <div className="cl-hero-tags">{["License Cancellation", "Visa Cancellation", "Bank Closure", "Authority Clearance", "Deregistration", "Free Zone & Mainland"].map(t => <span className="cl-hero-tag" key={t}>{t}</span>)}</div>
          <div className="cl-hero-btns">
            <button className="cl-btn-gold" onClick={() => go("schedule")}>Start Liquidation →</button>
            <button className="cl-btn-ghost" onClick={() => onBack && onBack()}>← Back to Services</button>
          </div>
        </div>
        <div className="cl-hero-right">
          <div className="cl-warning-card">
            <div className="cl-warning-title"> Cost of Not Acting</div>
            <div className="cl-warning-items">
              {[["Daily fines for expired licenses accumulate indefinitely"], ["Personal travel ban for directors with outstanding obligations"], ["Blacklisting prevents future UAE company setup"], ["Bank accounts frozen — affecting personal banking"], ["Ongoing employee liability if MOHRE not cleared"], ["Compounding penalties reaching AED 10,000s+"]].map(([text], i) => (
                <div className="cl-warning-item" key={i}><span className="cl-warning-icon">→</span><span>{text}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="cl-stats-bar">
        {[{ val: "30 Days", key: "Avg. Process Time" }, { val: "3 Types", key: "Closure Options" }, { val: "100%", key: "Clearance Managed" }, { val: "Remote", key: "Process Available" }].map((s, i) => (
          <div className="cl-sbar" key={i}><span className="cl-sbar-val">{s.val}</span><span className="cl-sbar-key">{s.key}</span></div>
        ))}
      </div>

      <section className="cl-types">
        <div className="cl-reveal"><span className="cl-section-label">Liquidation Types</span><h2 className="cl-section-h2">Every UAE Entity<br /><em>Professionally Closed.</em></h2></div>
        <div className="cl-types-grid">
          {LIQ_TYPES.map((t, i) => (
            <div className={`cl-type-card cl-reveal cl-d${i + 1}`} key={i}>
              <div className="cl-type-badge">{t.badge}</div>
              <span className="cl-type-icon">{t.icon}</span>
              <div className="cl-type-title">{t.title}</div>
              <p className="cl-type-desc">{t.desc}</p>
              <div className="cl-type-includes">{t.includes.map((inc, j) => <div className="cl-type-include" key={j}><div className="cl-type-dot" /><span>{inc}</span></div>)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cl-process">
        <div className="cl-process-inner">
          <div className="cl-reveal">
            <span className="cl-section-label">Our Process</span>
            <h2 className="cl-section-h2" style={{ marginBottom: 0 }}>From active company<br /><em>to clean closure.</em></h2>
            <p className="cl-process-intro">INCOZONE manages the <strong>complete liquidation process</strong> — every authority, every clearance, every step. Most clean liquidations are completed within <strong>30–35 working days.</strong> We handle everything — you just need to confirm instructions.</p>
          </div>
          <div className="cl-steps cl-reveal cl-d2">
            {PROCESS_STEPS.map((s, i) => (
              <div className="cl-step" key={i}>
                <div className="cl-step-num">{s.num}</div>
                <div className="cl-step-body">
                  <div className="cl-step-title">{s.title}</div>
                  <p className="cl-step-desc">{s.desc}</p>
                  <span className="cl-step-time">{s.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cl-consequences">
        <div className="cl-reveal"><span className="cl-section-label">Why Act Now</span><h2 className="cl-section-h2">Consequences of<br /><em>Not Liquidating Properly</em></h2></div>
        <div className="cl-con-inner">
          {CONSEQUENCES.map((c, i) => (
            <div className={`cl-con-card cl-reveal cl-d${(i % 2) + 1}`} key={i}>
              <span className="cl-con-icon">{c.icon}</span>
              <div><div className="cl-con-title">{c.title}</div><p className="cl-con-desc">{c.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="cl-packages">
        <span className="cl-pkg-label cl-reveal">Service Packages</span>
        <h2 className="cl-pkg-h2 cl-reveal cl-d1">Choose Your<br /><em>Liquidation Package</em></h2>
        <div className="cl-pkgs-grid">
          {[
            { name: "Simple Closure", tagline: "Clean company — minimal obligations", badge: null, featured: false, features: [{ t: "License cancellation management", y: true }, { t: "Investor visa cancellation", y: true }, { t: "Authority clearance management", y: true }, { t: "Deregistration certificate", y: true }, { t: "Employee visa cancellations", y: false }, { t: "Bank account closure support", y: false }] },
            { name: "Complete Liquidation", tagline: "Full closure — all obligations managed", badge: "Most Popular", featured: true, features: [{ t: "License cancellation management", y: true }, { t: "All visa cancellations (investor + staff)", y: true }, { t: "MOHRE / WPS clearance", y: true }, { t: "Bank account closure coordination", y: true }, { t: "All authority clearances", y: true }, { t: "Final deregistration certificate", y: true }] },
            { name: "Complex Closure", tagline: "Outstanding fines, disputes & complications", badge: "Specialist", featured: false, features: [{ t: "Full obligation assessment", y: true }, { t: "Fine negotiation & penalty waivers", y: true }, { t: "Labour dispute resolution", y: true }, { t: "Multi-authority clearances", y: true }, { t: "Complete liquidation management", y: true }, { t: "Personal liability protection advisory", y: true }] },
          ].map((pkg, i) => (
            <div className={`cl-pkg cl-reveal cl-d${i + 1}${pkg.featured ? " featured" : ""}`} key={i}>
              {pkg.badge && <div className="cl-pkg-badge">{pkg.badge}</div>}
              <div className="cl-pkg-name">{pkg.name}</div>
              <p className="cl-pkg-tagline">{pkg.tagline}</p>
              <div className="cl-pkg-div" />
              <ul className="cl-pkg-feats">
                {pkg.features.map((f, j) => (
                  <li className="cl-pkg-feat" key={j}>
                    <span className={`cl-feat-chk ${f.y ? "yes" : "no"}`}>{f.y ? "" : "×"}</span>
                    <span style={{ color: pkg.featured ? (f.y ? "var(--w80)" : "rgba(248,245,238,0.25)") : (f.y ? "var(--cream-ink2)" : "var(--cream-bdr)") }}>{f.t}</span>
                  </li>
                ))}
              </ul>
              <button className="cl-pkg-cta" onClick={() => go("schedule")}>{pkg.featured ? "Get Started →" : "Learn More →"}</button>
            </div>
          ))}
        </div>
      </section>

      <section className="cl-faq">
        <div className="cl-faq-inner">
          <div className="cl-reveal">
            <span className="cl-section-label">Common Questions</span>
            <h2 className="cl-section-h2" style={{ marginBottom: "24px" }}>Liquidation<br /><em>FAQ</em></h2>
            <p style={{ fontSize: "0.82rem", color: "var(--w60)", lineHeight: "1.8", marginBottom: "40px" }}>Everything you need to know about closing a UAE company — answered honestly.</p>
            <button className="cl-btn-gold" onClick={() => go("schedule")}>Free Liquidation Assessment →</button>
          </div>
          <div className="cl-faq-list cl-reveal cl-d2">
            {FAQS.map((f, i) => (
              <div className={`cl-faq-item${openFaq === i ? " open" : ""}`} key={i}>
                <div className="cl-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="cl-faq-q-text">{f.q}</span><div className="cl-faq-icon">+</div></div>
                <div className="cl-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cl-cta">
        <div className="cl-cta-inner">
          <span className="cl-cta-label cl-reveal">Close Clean</span>
          <h2 className="cl-cta-h2 cl-reveal cl-d1">Close Your Company<br /><em>The Right Way.</em></h2>
          <div className="cl-cta-divider" />
          <p className="cl-cta-p cl-reveal cl-d2">Proper liquidation protects you from fines, travel bans, and blacklisting. INCOZONE manages the complete process — every authority, every clearance, every step — so your exit is as clean as your entry.</p>
          <div className="cl-cta-btns cl-reveal cl-d3">
            <button className="cl-btn-dark" onClick={() => go("schedule")}>Schedule Private Consultation</button>
            <button className="cl-btn-outline" onClick={() => onBack && onBack()}>← Back to Services</button>
          </div>
        </div>
      </section>

      <footer className="cl-footer"><div className="cl-footer-inner"><div className="cl-footer-logo">INCO<em>ZONE</em></div><div className="cl-footer-copy">© 2026 INCOZONE. All rights reserved. Dubai, UAE.</div></div></footer>
      <div className="cl-wa" onClick={()=>window.open("https://wa.me/971565834586","_blank")}><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></div>
    </div>
  );
}
