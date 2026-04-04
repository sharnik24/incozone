import { useState, useEffect, useRef } from "react";
import { ICrown, IGlobe, IBuilding, IArrowsExchange, IScale, IShield, ITrendingUp, IUsers } from "../icons";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Offshore Company Formation Page
//  Drop into: src/pages/OffshoreFormation.jsx
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
.of-root*,.of-root *::before,.of-root *::after{box-sizing:border-box;margin:0;padding:0}
.of-root{--n950:#020b14;--n900:#05111e;--n800:#091928;--n750:#0c2033;--n700:#102540;--n600:#163354;--g400:#C9A84C;--g300:#D4B468;--g200:#E2CC98;--glow2:rgba(201,168,76,0.07);--cream-bg:#FAF6EE;--cream-100:#F4ECD8;--cream-200:#EDE0C4;--cream-ink:#1A120A;--cream-ink2:#3D2E1A;--cream-ink3:#7A6040;--cream-bdr:rgba(180,150,90,0.2);--w:#F8F5EE;--w80:rgba(248,245,238,0.80);--w60:rgba(248,245,238,0.60);--w30:rgba(248,245,238,0.30);--w12:rgba(248,245,238,0.12);--w06:rgba(248,245,238,0.06);--fd:'Cormorant Garamond',Georgia,serif;--fb:'DM Sans',system-ui,sans-serif;--ease:cubic-bezier(0.16,1,0.3,1);font-family:var(--fb);font-weight:300;line-height:1.6;color:var(--w);background:var(--n900);overflow-x:hidden;width:100%}
.of-nav{position:fixed;inset-inline:0;top:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:22px 60px;transition:background 0.5s,padding 0.4s,border-color 0.5s;border-bottom:1px solid transparent}
.of-nav.scrolled{background:rgba(5,17,30,0.96);backdrop-filter:blur(20px);padding:14px 60px;border-bottom-color:rgba(201,168,76,0.12)}
.of-nav-logo{font-family:var(--fd);font-size:1.5rem;font-weight:500;letter-spacing:0.15em;color:var(--w);cursor:pointer}
.of-nav-logo em{color:var(--g400);font-style:normal}
.of-nav-links{display:flex;gap:36px;list-style:none}
.of-nav-links a{font-size:0.72rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--w60);text-decoration:none;transition:color 0.3s;cursor:pointer}
.of-nav-links a:hover{color:var(--g300)}
.of-nav-cta{font-size:0.7rem;letter-spacing:0.14em;text-transform:uppercase;background:transparent;border:1px solid var(--g400);color:var(--g400);padding:9px 22px;cursor:pointer;font-family:var(--fb);transition:background 0.3s,color 0.3s}
.of-nav-cta:hover{background:var(--g400);color:var(--n900)}
.of-nav-hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:6px}
.of-nav-hamburger span{display:block;width:24px;height:1.5px;background:var(--w60);transition:all 0.35s var(--ease);transform-origin:center}
.of-nav-hamburger.open span:nth-child(1){transform:translateY(6.5px) rotate(45deg);background:var(--g400)}
.of-nav-hamburger.open span:nth-child(2){opacity:0;transform:scaleX(0)}
.of-nav-hamburger.open span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg);background:var(--g400)}
.of-drawer{position:fixed;inset:0;z-index:300;background:rgba(3,10,20,0.97);backdrop-filter:blur(24px);display:flex;flex-direction:column;align-items:center;justify-content:center;transform:translateX(100%);transition:transform 0.45s var(--ease);pointer-events:none}
.of-drawer.open{transform:translateX(0);pointer-events:all}
.of-drawer-brand{font-family:var(--fd);font-size:1.3rem;letter-spacing:.18em;color:var(--w);margin-bottom:44px;opacity:0;transform:translateY(10px);transition:opacity .4s .1s,transform .4s .1s;cursor:pointer}
.of-drawer.open .of-drawer-brand{opacity:1;transform:translateY(0)}
.of-drawer-brand em{color:var(--g400);font-style:normal}
.of-dlink{font-family:var(--fd);font-size:clamp(2rem,8vw,3rem);font-weight:300;color:var(--w60);background:none;border:none;padding:10px 0;cursor:pointer;display:block;width:100%;text-align:center;opacity:0;transform:translateY(18px);transition:color .3s,opacity .4s var(--ease),transform .4s var(--ease)}
.of-drawer.open .of-dlink{opacity:1;transform:translateY(0)}
.of-drawer.open .of-dlink:nth-of-type(1){transition-delay:.12s}.of-drawer.open .of-dlink:nth-of-type(2){transition-delay:.17s}.of-drawer.open .of-dlink:nth-of-type(3){transition-delay:.22s}.of-drawer.open .of-dlink:nth-of-type(4){transition-delay:.27s}.of-drawer.open .of-dlink:nth-of-type(5){transition-delay:.32s}
.of-dlink:hover{color:var(--g400)}
.of-drawer-div{width:40px;height:1px;background:rgba(201,168,76,.25);margin:18px 0;opacity:0;transition:opacity .4s .34s}
.of-drawer.open .of-drawer-div{opacity:1}
.of-dcta{font-family:var(--fb);font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:var(--g400);border:1px solid var(--g400);background:none;padding:12px 32px;cursor:pointer;margin-top:8px;opacity:0;transform:translateY(18px);transition:color .3s,background .3s,opacity .4s .38s,transform .4s .38s}
.of-drawer.open .of-dcta{opacity:1;transform:translateY(0)}
.of-dcta:hover{background:var(--g400);color:var(--n900)}
.of-hero{min-height:100vh;position:relative;overflow:hidden;display:grid;grid-template-columns:1fr 1fr;align-items:flex-end;padding:0 60px 80px;gap:60px}
.of-hero-canvas{position:absolute;inset:0;z-index:0}
.of-hero-left{position:relative;z-index:2;padding-top:160px}
.of-hero-right{position:relative;z-index:2;padding-top:160px;display:flex;align-items:flex-end;justify-content:flex-end}
.of-hero-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:0.62rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--g400);border:1px solid rgba(201,168,76,0.28);padding:7px 16px;margin-bottom:32px;opacity:0;animation:ofUp 1s var(--ease) 0.2s forwards}
.of-eyebrow-dot{width:5px;height:5px;border-radius:50%;background:var(--g400);animation:ofBlink 2s infinite}
.of-hero-h1{font-family:var(--fd);font-weight:300;line-height:0.88;letter-spacing:-0.02em;color:var(--w);font-size:clamp(3.8rem,8vw,7.5rem);margin-bottom:20px;opacity:0;animation:ofUp 1.1s var(--ease) 0.35s forwards}
.of-hero-h1 em{display:block;color:var(--g400);font-style:italic}
.of-hero-sub{font-family:var(--fd);font-size:1rem;color:var(--w60);font-style:italic;margin-bottom:32px;opacity:0;animation:ofUp 1s var(--ease) 0.5s forwards}
.of-hero-desc{font-size:0.88rem;color:var(--w60);line-height:1.85;max-width:520px;margin-bottom:36px;opacity:0;animation:ofUp 1s var(--ease) 0.65s forwards}
.of-hero-desc strong{color:var(--w80);font-weight:400}
.of-hero-tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:36px;opacity:0;animation:ofUp 1s var(--ease) 0.75s forwards}
.of-hero-tag{font-size:0.6rem;letter-spacing:0.16em;text-transform:uppercase;padding:6px 14px;border:1px solid rgba(201,168,76,0.25);color:var(--g300)}
.of-hero-btns{display:flex;gap:14px;flex-wrap:wrap;opacity:0;animation:ofUp 1s var(--ease) 0.85s forwards}
.of-btn-gold{padding:15px 36px;background:var(--g400);color:var(--n900);font-family:var(--fb);font-size:0.72rem;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;border:none;cursor:pointer;transition:background 0.3s,transform 0.2s}
.of-btn-gold:hover{background:var(--g300);transform:translateY(-2px)}
.of-btn-ghost{padding:15px 36px;background:transparent;color:var(--w60);font-family:var(--fb);font-size:0.72rem;letter-spacing:0.14em;text-transform:uppercase;border:1px solid var(--w12);cursor:pointer;transition:all 0.3s}
.of-btn-ghost:hover{border-color:var(--w30);color:var(--w);transform:translateY(-2px)}
.of-stat-panel{background:rgba(9,25,40,0.88);backdrop-filter:blur(16px);border:1px solid rgba(201,168,76,0.22);padding:44px 40px;min-width:270px;position:relative;overflow:hidden}
.of-stat-panel::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(201,168,76,0.06),transparent);pointer-events:none}
.of-stat-rows{display:flex;flex-direction:column;gap:0}
.of-stat-row{padding:16px 0;border-bottom:1px solid var(--w06);display:flex;align-items:center;justify-content:space-between;gap:16px}
.of-stat-row:last-child{border-bottom:none}
.of-stat-label{font-size:0.7rem;color:var(--w30);letter-spacing:0.08em}
.of-stat-value{font-family:var(--fd);font-size:1.4rem;font-weight:300;color:var(--g400)}
.of-stats-bar{background:var(--n800);padding:0 60px;display:grid;grid-template-columns:repeat(5,1fr);border-bottom:1px solid var(--w06)}
.of-sbar{padding:32px 0;text-align:center;border-right:1px solid var(--w06)}
.of-sbar:last-child{border-right:none}
.of-sbar-val{font-family:var(--fd);font-size:2.2rem;font-weight:300;color:var(--g400);display:block;line-height:1}
.of-sbar-key{font-size:0.62rem;letter-spacing:0.16em;text-transform:uppercase;color:var(--w30);margin-top:6px;display:block}
.of-section-label{font-size:0.6rem;letter-spacing:0.32em;text-transform:uppercase;color:var(--g400);margin-bottom:16px;display:block}
.of-section-h2{font-family:var(--fd);font-size:clamp(2.2rem,4vw,3.8rem);font-weight:300;line-height:1.1;color:var(--w);margin-bottom:60px}
.of-section-h2 em{color:var(--g400);font-style:italic}
.of-jurisdictions{background:var(--n900);padding:100px 60px}
.of-jur-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px;background:var(--w06)}
.of-jur-card{background:var(--n800);padding:52px 44px;position:relative;overflow:hidden;transition:background 0.4s var(--ease)}
.of-jur-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--glow2),transparent);opacity:0;transition:opacity 0.4s}
.of-jur-card:hover{background:var(--n750)}
.of-jur-card:hover::before{opacity:1}
.of-jur-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--g400);transform:scaleX(0);transform-origin:left;transition:transform 0.5s var(--ease)}
.of-jur-card:hover::after{transform:scaleX(1)}
.of-jur-badge{font-size:0.58rem;letter-spacing:0.2em;text-transform:uppercase;padding:5px 12px;border:1px solid rgba(201,168,76,0.3);color:var(--g400);width:fit-content;margin-bottom:20px}
.of-jur-icon{font-size:2.2rem;margin-bottom:18px;display:block}
.of-jur-title{font-family:var(--fd);font-size:2rem;font-weight:400;color:var(--w);margin-bottom:8px}
.of-jur-full{font-family:var(--fd);font-size:0.9rem;color:var(--w30);font-style:italic;margin-bottom:20px}
.of-jur-desc{font-size:0.84rem;color:var(--w60);line-height:1.8;margin-bottom:24px}
.of-jur-features{display:flex;flex-direction:column;gap:10px}
.of-jur-feat{display:flex;align-items:flex-start;gap:10px;font-size:0.8rem;color:var(--w60)}
.of-jur-dot{width:5px;height:5px;border-radius:50%;background:var(--g400);flex-shrink:0;margin-top:6px}
.of-compare{background:var(--n800);padding:100px 60px}
.of-compare-inner{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start}
.of-compare-table{width:100%}
.of-compare-header{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:1px;background:rgba(201,168,76,0.15);margin-bottom:2px}
.of-compare-hcell{padding:12px 16px;font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase}
.of-compare-hcell:first-child{color:var(--w30);background:var(--n800)}
.of-compare-hcell:nth-child(2){color:var(--g400);background:rgba(201,168,76,0.08)}
.of-compare-hcell:last-child{color:var(--w30);background:var(--n800)}
.of-compare-row{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:1px;background:var(--w06);margin-bottom:1px}
.of-compare-cell{background:var(--n800);padding:14px 16px;font-size:0.78rem;color:var(--w60)}
.of-compare-cell.gold{color:var(--g400);font-weight:500}
.of-compare-cell.label{color:var(--w30);font-size:0.7rem;letter-spacing:0.06em}
.of-use-cases{margin-top:52px}
.of-use-case-title{font-family:var(--fd);font-size:1.3rem;color:var(--w);margin-bottom:20px}
.of-use-case-grid{display:flex;flex-direction:column;gap:12px}
.of-use-case{display:flex;align-items:flex-start;gap:14px;padding:16px 20px;background:var(--n750);border-left:2px solid rgba(201,168,76,0.25);transition:border-color 0.3s}
.of-use-case:hover{border-left-color:var(--g400)}
.of-use-case-icon{font-size:1.3rem;flex-shrink:0}
.of-use-case-text h5{font-size:0.85rem;font-weight:500;color:var(--w);margin-bottom:4px}
.of-use-case-text p{font-size:0.76rem;color:var(--w60);line-height:1.65}
.of-packages{background:var(--cream-bg);padding:100px 60px;position:relative;overflow:hidden}
.of-packages::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,var(--g400),transparent);opacity:0.5}
.of-pkg-label{font-size:0.6rem;letter-spacing:0.32em;text-transform:uppercase;color:#8A6820;margin-bottom:16px;display:block}
.of-pkg-h2{font-family:var(--fd);font-size:clamp(2.2rem,4vw,3.5rem);font-weight:300;color:var(--cream-ink);line-height:1.1;margin-bottom:60px}
.of-pkg-h2 em{color:var(--g400);font-style:italic}
.of-pkgs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.of-pkg{background:var(--cream-bg);border:1px solid var(--cream-bdr);padding:44px 36px;display:flex;flex-direction:column;transition:all 0.35s var(--ease);box-shadow:0 2px 12px rgba(120,90,30,0.06);cursor:pointer}
.of-pkg:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(120,90,30,0.14);border-color:rgba(201,168,76,0.45)}
.of-pkg.featured{background:var(--n900);border:1px solid rgba(201,168,76,0.35);box-shadow:0 8px 40px rgba(0,0,0,0.22)}
.of-pkg.featured:hover{border-color:var(--g400)}
.of-pkg-badge{font-size:0.58rem;letter-spacing:0.2em;text-transform:uppercase;padding:4px 10px;width:fit-content;margin-bottom:22px;border:1px solid;font-weight:500}
.of-pkg:not(.featured) .of-pkg-badge{border-color:var(--cream-bdr);color:var(--cream-ink3);background:var(--cream-200)}
.of-pkg.featured .of-pkg-badge{border-color:var(--g400);color:var(--g400);background:rgba(201,168,76,0.08)}
.of-pkg-name{font-family:var(--fd);font-size:1.7rem;font-weight:400;margin-bottom:8px}
.of-pkg:not(.featured) .of-pkg-name{color:var(--cream-ink)}
.of-pkg.featured .of-pkg-name{color:var(--w)}
.of-pkg-tagline{font-size:0.78rem;margin-bottom:28px}
.of-pkg:not(.featured) .of-pkg-tagline{color:var(--cream-ink3)}
.of-pkg.featured .of-pkg-tagline{color:var(--w60)}
.of-pkg-div{height:1px;margin-bottom:28px}
.of-pkg:not(.featured) .of-pkg-div{background:var(--cream-bdr)}
.of-pkg.featured .of-pkg-div{background:var(--w06)}
.of-pkg-feats{list-style:none;display:flex;flex-direction:column;gap:11px;flex:1;margin-bottom:32px}
.of-pkg-feat{display:flex;align-items:flex-start;gap:11px;font-size:0.8rem;line-height:1.5}
.of-pkg:not(.featured) .of-pkg-feat{color:var(--cream-ink2)}
.of-pkg.featured .of-pkg-feat{color:var(--w80)}
.of-feat-chk{flex-shrink:0;margin-top:2px;font-size:0.75rem}
.of-feat-chk.yes{color:#8A6820}
.of-pkg.featured .of-feat-chk.yes{color:var(--g400)}
.of-feat-chk.no{color:rgba(180,150,90,0.3)}
.of-pkg-cta{padding:13px 20px;font-size:0.7rem;letter-spacing:0.12em;text-transform:uppercase;font-family:var(--fb);cursor:pointer;transition:all 0.3s;width:100%;font-weight:500}
.of-pkg:not(.featured) .of-pkg-cta{background:transparent;border:1px solid var(--cream-bdr);color:var(--cream-ink2)}
.of-pkg:not(.featured) .of-pkg-cta:hover{border-color:var(--g400);color:var(--cream-ink);background:var(--cream-200)}
.of-pkg.featured .of-pkg-cta{background:var(--g400);border:none;color:var(--n900)}
.of-pkg.featured .of-pkg-cta:hover{background:var(--g300)}
.of-faq{background:var(--n900);padding:100px 60px}
.of-faq-inner{display:grid;grid-template-columns:1fr 1.6fr;gap:80px;align-items:start}
.of-faq-list{display:flex;flex-direction:column}
.of-faq-item{border-top:1px solid var(--w06)}
.of-faq-item:last-child{border-bottom:1px solid var(--w06)}
.of-faq-q{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:22px 0;cursor:pointer}
.of-faq-q-text{font-size:0.9rem;font-weight:400;color:var(--w);transition:color 0.3s}
.of-faq-item.open .of-faq-q-text{color:var(--g400)}
.of-faq-icon{width:28px;height:28px;border:1px solid var(--w12);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--w30);flex-shrink:0;transition:all 0.4s var(--ease)}
.of-faq-item.open .of-faq-icon{background:var(--g400);border-color:var(--g400);color:var(--n900);transform:rotate(45deg)}
.of-faq-a{font-size:0.82rem;color:var(--w60);line-height:1.82;padding-bottom:22px;max-height:0;overflow:hidden;transition:max-height 0.5s var(--ease)}
.of-faq-item.open .of-faq-a{max-height:300px}
.of-cta{background:var(--cream-bg);padding:120px 60px;text-align:center;position:relative;overflow:hidden}
.of-cta::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(180,150,90,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(180,150,90,0.06) 1px,transparent 1px);background-size:60px 60px}
.of-cta::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% 50%,rgba(201,168,76,0.09),transparent);pointer-events:none}
.of-cta-inner{position:relative;z-index:1;max-width:640px;margin:0 auto}
.of-cta-label{font-size:0.6rem;letter-spacing:0.32em;text-transform:uppercase;color:#8A6820;margin-bottom:20px;display:block}
.of-cta-h2{font-family:var(--fd);font-size:clamp(2.5rem,5vw,4.2rem);font-weight:300;color:var(--cream-ink);line-height:1.1;margin-bottom:12px}
.of-cta-h2 em{color:var(--g400);font-style:italic}
.of-cta-divider{width:44px;height:1px;background:var(--g400);margin:24px auto;opacity:0.5}
.of-cta-p{font-size:0.84rem;color:var(--cream-ink3);line-height:1.85;margin-bottom:44px}
.of-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.of-btn-dark{padding:15px 40px;background:var(--cream-ink);color:var(--cream-bg);font-family:var(--fb);font-size:0.72rem;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;border:none;cursor:pointer;transition:background 0.3s,transform 0.2s}
.of-btn-dark:hover{background:var(--g400);color:var(--cream-ink);transform:translateY(-2px)}
.of-btn-outline{padding:15px 40px;background:transparent;color:var(--cream-ink2);font-family:var(--fb);font-size:0.72rem;letter-spacing:0.14em;text-transform:uppercase;border:1px solid var(--cream-bdr);cursor:pointer;transition:all 0.3s}
.of-btn-outline:hover{border-color:var(--g400);color:var(--cream-ink);transform:translateY(-2px)}
.of-footer{background:var(--n950);padding:52px 60px;border-top:1px solid var(--w06)}
.of-footer-inner{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px}
.of-footer-logo{font-family:var(--fd);font-size:1.3rem;letter-spacing:0.15em;color:var(--w)}
.of-footer-logo em{color:var(--g400);font-style:normal}
.of-footer-copy{font-size:0.68rem;color:var(--w30)}
.of-wa{position:fixed;bottom:28px;right:28px;z-index:300;width:50px;height:50px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 18px rgba(37,211,102,0.4);transition:transform 0.3s}
.of-wa:hover{transform:scale(1.1)}
.of-reveal{opacity:0;transform:translateY(22px);transition:opacity 0.85s var(--ease),transform 0.85s var(--ease)}
.of-reveal.in{opacity:1;transform:translateY(0)}
.of-d1{transition-delay:0.05s}.of-d2{transition-delay:0.15s}.of-d3{transition-delay:0.25s}.of-d4{transition-delay:0.35s}
@keyframes ofUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes ofBlink{0%,100%{opacity:1}50%{opacity:0.3}}
@media(max-width:1000px){.of-hero{grid-template-columns:1fr;padding:120px 40px 60px}.of-hero-right{justify-content:flex-start}.of-jur-grid{grid-template-columns:1fr}.of-compare-inner{grid-template-columns:1fr}.of-faq-inner{grid-template-columns:1fr;gap:48px}.of-pkgs-grid{grid-template-columns:1fr}.of-stats-bar{grid-template-columns:repeat(3,1fr)}}
@media(max-width:768px){.of-nav{padding:16px 24px}.of-nav.scrolled{padding:12px 24px}.of-nav-links{display:none}.of-nav-cta{display:none}.of-nav-hamburger{display:flex}.of-hero{padding:100px 24px 52px}.of-jurisdictions,.of-compare,.of-packages,.of-faq,.of-cta{padding:70px 24px}.of-footer{padding:40px 24px}.of-stats-bar{padding:0 24px;grid-template-columns:1fr 1fr}}
`;

const JURISDICTIONS = [
  {
    icon: ICrown, badge: "Most Popular",
    title: "RAK ICC",
    full: "Ras Al Khaimah International Corporate Centre",
    desc: "The UAE's most popular offshore jurisdiction — cost-effective, flexible, and globally recognised. RAK ICC is ideal for holding companies, asset protection, international trading, and IP ownership structures.",
    features: ["100% foreign ownership", "Zero corporate and personal tax", "No audit or financial reporting required", "Bank accounts with UAE and international banks", "Real estate holding in UAE permitted", "Nominee director and shareholder services", "Fast incorporation — 3–5 working days", "Confidential shareholder register"],
  },
  {
    icon: IGlobe, badge: "Established",
    title: "Ajman Offshore",
    full: "Ajman Free Zone Offshore",
    desc: "A well-established UAE offshore option with competitive fees and straightforward incorporation. Particularly suited for international trading structures, holding arrangements, and businesses seeking a simple, low-cost offshore vehicle.",
    features: ["100% foreign ownership", "Zero tax on income and profits", "Minimal reporting requirements", "UAE-based banking access", "Suitable for trading and holding structures", "Nominee services available", "Competitive annual fees", "Quick turnaround — 5–7 working days"],
  },
];

const USE_CASES = [
  { icon: IBuilding, title: "UAE Real Estate Holding", desc: "Hold Dubai freehold property under an offshore company — provides privacy, easier transfer on death, and cleaner inheritance planning." },
  { icon: IArrowsExchange, title: "International Trading", desc: "Invoice international clients through a UAE offshore entity — zero tax, full banking access, and professional UAE address for contracts." },
  { icon: IScale, title: "IP & Patent Ownership", desc: "Hold trademarks, patents, and intellectual property in a UAE offshore company — licence IP to operating companies globally." },
  { icon: IShield, title: "Asset Protection", desc: "Ring-fence personal and business assets from liability — offshore structures provide legal separation from operating risk." },
  { icon: ITrendingUp, title: "Investment Holding", desc: "Hold UAE and international investments, stocks, bonds, and funds through an offshore vehicle for clean structuring." },
  { icon: IUsers, title: "Family Wealth Structure", desc: "Organise family wealth across generations through a structured offshore holding entity — with clear succession planning." },
];

const FAQS = [
  { q: "Can an offshore company open a UAE bank account?", a: "Yes. RAK ICC and Ajman Offshore companies can open corporate bank accounts with UAE banks — including major institutions like ENBD, FAB, and RAKBank. The approval process requires a full business plan and KYC documentation. INCOZONE prepares complete banking packages to maximise approval probability." },
  { q: "Can an offshore company trade inside the UAE?", a: "No. UAE offshore companies are not permitted to conduct business directly within the UAE domestic market. They are designed for international trade and holding purposes only. For UAE domestic operations, you need a free zone or mainland company. INCOZONE advises on optimal structures combining offshore holding with an operational entity." },
  { q: "Is a UAE offshore company legal and transparent?", a: "Absolutely. RAK ICC and Ajman Offshore are regulated by their respective authorities under UAE federal law. They are fully legal entities — not tax havens. UAE offshore companies comply with international AML/CFT standards, FATF requirements, and CRS/AEOI automatic information exchange obligations." },
  { q: "Can an offshore company own UAE real estate?", a: "RAK ICC offshore companies can hold UAE real estate in freehold areas — including Dubai properties. This is one of the most popular uses for offshore structures in the UAE. It provides privacy, avoids probate on death, and simplifies property transfer. Ajman Offshore has more limited property holding rights." },
  { q: "How long does offshore company incorporation take?", a: "RAK ICC incorporation typically takes 3–5 working days from document submission. Ajman Offshore takes 5–7 working days. INCOZONE manages the complete process remotely — you do not need to be present in the UAE." },
  { q: "Does an offshore company need annual audits?", a: "Neither RAK ICC nor Ajman Offshore require mandatory annual audits or financial statements for standard offshore companies. This significantly reduces annual compliance costs compared to free zone or mainland companies. However, if the company holds regulated assets or has banking requirements, some reporting may be requested by financial institutions." },
];

function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let W, H, raf, t = 0;
    const pts = Array.from({ length: 52 }, () => ({ x: Math.random() * 1920, y: Math.random() * 1080, vx: (Math.random() - .5) * 0.16, vy: (Math.random() - .5) * 0.16, r: Math.random() * 1.4 + 0.4, o: Math.random() * 0.35 + 0.1 }));
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      t += 0.003; ctx.clearRect(0, 0, W, H);
      const bg = ctx.createLinearGradient(0, 0, W, H); bg.addColorStop(0, "#05111e"); bg.addColorStop(1, "#020b14"); ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      [[0.12, 0.28, "#C9A84C", 0.05, 11], [0.84, 0.22, "#163354", 0.44, 9], [0.5, 0.78, "#C9A84C", 0.038, 14]].forEach(([bx, by, col, a, spd], i) => { const x = W * bx + Math.sin(t * (spd / 10) + i * 2) * 70, y = H * by + Math.cos(t * (spd / 13) + i) * 50, r = Math.min(W, H) * 0.6, g = ctx.createRadialGradient(x, y, 0, x, y, r), rgb = parseInt(col.slice(1), 16); g.addColorStop(0, `rgba(${rgb >> 16},${(rgb >> 8) & 255},${rgb & 255},${a})`); g.addColorStop(1, "rgba(0,0,0,0)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); });
      ctx.strokeStyle = "rgba(201,168,76,0.024)"; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      for (let i = 0; i < pts.length; i++) { const p = pts[i]; p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0; for (let j = i + 1; j < pts.length; j++) { const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy); if (d < 145) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(201,168,76,${0.065 * (1 - d / 145)})`; ctx.lineWidth = 0.4; ctx.stroke(); } } ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(201,168,76,${p.o})`; ctx.fill(); }
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, H * 0.9); vg.addColorStop(0, "transparent"); vg.addColorStop(1, "rgba(2,11,20,0.7)"); ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="of-hero-canvas" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".of-reveal");
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } }), { threshold: 0.07 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

export default function OffshoreFormationPage({ onBack, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useReveal();
  useEffect(() => { window.scrollTo(0, 0); const h = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { document.body.style.overflow = drawerOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [drawerOpen]);
  const go = (page) => { setDrawerOpen(false); if (onNavigate) { onNavigate(page); window.scrollTo(0, 0); } };
  const navLinks = [{ label: "Home", page: "home" }, { label: "Services", page: "services" }, { label: "Free Zones", page: "home" }, { label: "About", page: "about" }, { label: "Blog", page: "blog" }, { label: "Contact", page: "contact" }];

  return (
    <div className="of-root">
      <style>{CSS}</style>
      <nav className={`of-nav${scrolled ? " scrolled" : ""}`}>
        <div className="of-nav-logo" onClick={() => go("home")}>INCO<em>ZONE</em></div>
        <ul className="of-nav-links">{navLinks.map(l => <li key={l.label}><a onClick={() => go(l.page)}>{l.label}</a></li>)}</ul>
        <button className="of-nav-cta" onClick={() => go("schedule")}>Schedule Consultation</button>
        <button className={`of-nav-hamburger${drawerOpen ? " open" : ""}`} onClick={() => setDrawerOpen(o => !o)}><span /><span /><span /></button>
      </nav>
      <div className={`of-drawer${drawerOpen ? " open" : ""}`}>
        <div className="of-drawer-brand" onClick={() => go("home")}>INCO<em>ZONE</em></div>
        {navLinks.map(l => <button key={l.label} className="of-dlink" onClick={() => go(l.page)}>{l.label}</button>)}
        <div className="of-drawer-div" />
        <button className="of-dcta" onClick={() => go("schedule")}>Schedule Consultation</button>
      </div>

      <section className="of-hero">
        <HeroCanvas />
        <div className="of-hero-left">
          <div className="of-hero-eyebrow"><div className="of-eyebrow-dot" />Offshore Structuring · UAE</div>
          <h1 className="of-hero-h1">Offshore<br /><em>Company</em><br />Formation.</h1>
          <div className="of-hero-sub">RAK ICC & Ajman Offshore — 0% Tax, Full Privacy</div>
          <p className="of-hero-desc">Establish an <strong>offshore holding company in RAK ICC or Ajman Offshore</strong> — ideal for asset protection, international trade, holding UAE real estate, IP ownership, and confidential corporate structures. 100% foreign ownership, zero tax, no audit requirement, and full banking access. INCOZONE manages incorporation, nominee services, and ongoing secretarial support.</p>
          <div className="of-hero-tags">{["RAK ICC", "Ajman Offshore", "Asset Holding", "IP Ownership", "Real Estate Holding", "Zero Audit", "Nominee Services"].map(t => <span className="of-hero-tag" key={t}>{t}</span>)}</div>
          <div className="of-hero-btns">
            <button className="of-btn-gold" onClick={() => go("schedule")}>Structure Advisory →</button>
            <button className="of-btn-ghost" onClick={() => onBack && onBack()}>← Back to Services</button>
          </div>
        </div>
        <div className="of-hero-right">
          <div className="of-stat-panel">
            <div className="of-stat-rows">
              {[["Tax on Income", "0%"], ["Foreign Ownership", "100%"], ["Annual Audit Required", "None"], ["Setup Time", "3–5 Days"], ["Nominee Services", "Available"], ["Bank Account", "UAE + Int'l"]].map(([label, value]) => (
                <div className="of-stat-row" key={label}><span className="of-stat-label">{label}</span><span className="of-stat-value">{value}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="of-stats-bar">
        {[{ val: "0%", key: "Corporate Tax" }, { val: "100%", key: "Foreign Ownership" }, { val: "3 Days", key: "Min. Setup Time" }, { val: "No Audit", key: "Annual Requirement" }, { val: "Private", key: "Share Register" }].map((s, i) => (
          <div className="of-sbar" key={i}><span className="of-sbar-val">{s.val}</span><span className="of-sbar-key">{s.key}</span></div>
        ))}
      </div>

      <section className="of-jurisdictions">
        <div className="of-reveal"><span className="of-section-label">Jurisdictions</span><h2 className="of-section-h2">Choose Your<br /><em>Offshore Jurisdiction</em></h2></div>
        <div className="of-jur-grid">
          {JURISDICTIONS.map((j, i) => (
            <div className={`of-jur-card of-reveal of-d${i + 1}`} key={i}>
              <div className="of-jur-badge">{j.badge}</div>
              <span className="of-jur-icon">{j.icon}</span>
              <div className="of-jur-title">{j.title}</div>
              <div className="of-jur-full">{j.full}</div>
              <p className="of-jur-desc">{j.desc}</p>
              <div className="of-jur-features">{j.features.map((f, k) => <div className="of-jur-feat" key={k}><div className="of-jur-dot" /><span>{f}</span></div>)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="of-compare">
        <div className="of-compare-inner">
          <div className="of-reveal">
            <span className="of-section-label">Comparison</span>
            <h2 className="of-section-h2" style={{ marginBottom: "28px" }}>RAK ICC vs<br /><em>Ajman Offshore</em></h2>
            <div className="of-compare-table">
              <div className="of-compare-header">
                <div className="of-compare-hcell">Feature</div>
                <div className="of-compare-hcell">RAK ICC</div>
                <div className="of-compare-hcell">Ajman Offshore</div>
              </div>
              {[["Setup Time", "3–5 Days", "5–7 Days"], ["Government Fee", "Lower", "Very Low"], ["UAE Real Estate", " Permitted", "Limited"], ["Banking Access", "Excellent", "Good"], ["International Reputation", "Very High", "High"], ["Nominee Services", " Available", " Available"], ["Annual Renewal", "Simple", "Simple"], ["CRS / AEOI", "Compliant", "Compliant"]].map(([feat, rak, ajm]) => (
                <div className="of-compare-row" key={feat}>
                  <div className="of-compare-cell label">{feat}</div>
                  <div className="of-compare-cell gold">{rak}</div>
                  <div className="of-compare-cell">{ajm}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="of-reveal of-d2">
            <div className="of-use-cases">
              <div className="of-use-case-title">Common Use Cases</div>
              <div className="of-use-case-grid">
                {USE_CASES.map((u, i) => (
                  <div className="of-use-case" key={i}>
                    <span className="of-use-case-icon">{u.icon}</span>
                    <div className="of-use-case-text"><h5>{u.title}</h5><p>{u.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="of-packages">
        <span className="of-pkg-label of-reveal">Service Packages</span>
        <h2 className="of-pkg-h2 of-reveal of-d1">Choose Your<br /><em>Offshore Package</em></h2>
        <div className="of-pkgs-grid">
          {[
            { name: "Standard", tagline: "Offshore incorporation — essentials", badge: null, featured: false, features: [{ t: "Jurisdiction advisory & selection", y: true }, { t: "Company name reservation", y: true }, { t: "Full incorporation & documents", y: true }, { t: "Registered agent service (1 year)", y: true }, { t: "Nominee director/shareholder", y: false }, { t: "Banking introduction", y: false }] },
            { name: "Complete", tagline: "Incorporation + banking + nominees", badge: "Most Popular", featured: true, features: [{ t: "Jurisdiction advisory & selection", y: true }, { t: "Full incorporation & documents", y: true }, { t: "Registered agent service (1 year)", y: true }, { t: "Nominee director service", y: true }, { t: "Banking introduction & KYC pack", y: true }, { t: "Annual secretarial support", y: true }] },
            { name: "Structure Plus", tagline: "Full holding structure advisory", badge: "Premium", featured: false, features: [{ t: "Complete corporate structure design", y: true }, { t: "Offshore + operating entity setup", y: true }, { t: "Full nominee services", y: true }, { t: "Multi-bank introductions", y: true }, { t: "UAE real estate holding structure", y: true }, { t: "Ongoing corporate secretary", y: true }] },
          ].map((pkg, i) => (
            <div className={`of-pkg of-reveal of-d${i + 1}${pkg.featured ? " featured" : ""}`} key={i}>
              {pkg.badge && <div className="of-pkg-badge">{pkg.badge}</div>}
              <div className="of-pkg-name">{pkg.name}</div>
              <p className="of-pkg-tagline">{pkg.tagline}</p>
              <div className="of-pkg-div" />
              <ul className="of-pkg-feats">
                {pkg.features.map((f, j) => (
                  <li className="of-pkg-feat" key={j}>
                    <span className={`of-feat-chk ${f.y ? "yes" : "no"}`}>{f.y ? "" : "×"}</span>
                    <span style={{ color: pkg.featured ? (f.y ? "var(--w80)" : "rgba(248,245,238,0.25)") : (f.y ? "var(--cream-ink2)" : "var(--cream-bdr)") }}>{f.t}</span>
                  </li>
                ))}
              </ul>
              <button className="of-pkg-cta" onClick={() => go("schedule")}>{pkg.featured ? "Get Started →" : "Learn More →"}</button>
            </div>
          ))}
        </div>
      </section>

      <section className="of-faq">
        <div className="of-faq-inner">
          <div className="of-reveal">
            <span className="of-section-label">Common Questions</span>
            <h2 className="of-section-h2" style={{ marginBottom: "24px" }}>Offshore<br /><em>FAQ</em></h2>
            <p style={{ fontSize: "0.82rem", color: "var(--w60)", lineHeight: "1.8", marginBottom: "40px" }}>Everything you need to know about UAE offshore company formation — answered clearly.</p>
            <button className="of-btn-gold" onClick={() => go("schedule")}>Free Structure Consultation →</button>
          </div>
          <div className="of-faq-list of-reveal of-d2">
            {FAQS.map((f, i) => (
              <div className={`of-faq-item${openFaq === i ? " open" : ""}`} key={i}>
                <div className="of-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="of-faq-q-text">{f.q}</span><div className="of-faq-icon">+</div></div>
                <div className="of-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="of-cta">
        <div className="of-cta-inner">
          <span className="of-cta-label of-reveal">Structure Your Wealth</span>
          <h2 className="of-cta-h2 of-reveal of-d1">Build Your Offshore<br /><em>Structure Today.</em></h2>
          <div className="of-cta-divider" />
          <p className="of-cta-p of-reveal of-d2">Private consultation. We assess your assets, objectives, and recommend the optimal offshore structure — whether RAK ICC, Ajman, or a combined onshore/offshore approach.</p>
          <div className="of-cta-btns of-reveal of-d3">
            <button className="of-btn-dark" onClick={() => go("schedule")}>Schedule Private Consultation</button>
            <button className="of-btn-outline" onClick={() => onBack && onBack()}>← Back to Services</button>
          </div>
        </div>
      </section>

      <footer className="of-footer"><div className="of-footer-inner"><div className="of-footer-logo">INCO<em>ZONE</em></div><div className="of-footer-copy">© 2026 INCOZONE. All rights reserved. Dubai, UAE.</div></div></footer>
      <div className="of-wa" onClick={()=>window.open("https://wa.me/971565834586","_blank")}><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></div>
    </div>
  );
}
