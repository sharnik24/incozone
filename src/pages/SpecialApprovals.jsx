import { useState, useEffect, useRef } from "react";
import { ICreditCard, ITrendingUp, ICross, IBookOpen, ICompass, IWifi, ILeaf, IBolt, IBuilding } from "../icons";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Special Government Approvals Page
//  Drop into: src/pages/SpecialApprovals.jsx
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
.sa-root*,.sa-root *::before,.sa-root *::after{box-sizing:border-box;margin:0;padding:0}
.sa-root{--n950:#020b14;--n900:#05111e;--n800:#091928;--n750:#0c2033;--n700:#102540;--n600:#163354;--g400:#C9A84C;--g300:#D4B468;--g200:#E2CC98;--glow2:rgba(201,168,76,0.07);--cream-bg:#FAF6EE;--cream-100:#F4ECD8;--cream-200:#EDE0C4;--cream-ink:#1A120A;--cream-ink2:#3D2E1A;--cream-ink3:#7A6040;--cream-bdr:rgba(180,150,90,0.2);--w:#F8F5EE;--w80:rgba(248,245,238,0.80);--w60:rgba(248,245,238,0.60);--w30:rgba(248,245,238,0.30);--w12:rgba(248,245,238,0.12);--w06:rgba(248,245,238,0.06);--fd:'Cormorant Garamond',Georgia,serif;--fb:'DM Sans',system-ui,sans-serif;--ease:cubic-bezier(0.16,1,0.3,1);font-family:var(--fb);font-weight:300;line-height:1.6;color:var(--w);background:var(--n900);overflow-x:hidden;width:100%}
.sa-nav{position:fixed;inset-inline:0;top:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:22px 60px;transition:background 0.5s,padding 0.4s,border-color 0.5s;border-bottom:1px solid transparent}
.sa-nav.scrolled{background:rgba(5,17,30,0.96);backdrop-filter:blur(20px);padding:14px 60px;border-bottom-color:rgba(201,168,76,0.12)}
.sa-nav-logo{font-family:var(--fd);font-size:1.5rem;font-weight:500;letter-spacing:0.15em;color:var(--w);cursor:pointer}
.sa-nav-logo em{color:var(--g400);font-style:normal}
.sa-nav-links{display:flex;gap:36px;list-style:none}
.sa-nav-links a{font-size:0.72rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--w60);text-decoration:none;transition:color 0.3s;cursor:pointer}
.sa-nav-links a:hover{color:var(--g300)}
.sa-nav-cta{font-size:0.7rem;letter-spacing:0.14em;text-transform:uppercase;background:transparent;border:1px solid var(--g400);color:var(--g400);padding:9px 22px;cursor:pointer;font-family:var(--fb);transition:background 0.3s,color 0.3s}
.sa-nav-cta:hover{background:var(--g400);color:var(--n900)}
.sa-nav-hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:6px}
.sa-nav-hamburger span{display:block;width:24px;height:1.5px;background:var(--w60);transition:all 0.35s var(--ease);transform-origin:center}
.sa-nav-hamburger.open span:nth-child(1){transform:translateY(6.5px) rotate(45deg);background:var(--g400)}
.sa-nav-hamburger.open span:nth-child(2){opacity:0;transform:scaleX(0)}
.sa-nav-hamburger.open span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg);background:var(--g400)}
.sa-drawer{position:fixed;inset:0;z-index:300;background:rgba(3,10,20,0.97);backdrop-filter:blur(24px);display:flex;flex-direction:column;align-items:center;justify-content:center;transform:translateX(100%);transition:transform 0.45s var(--ease);pointer-events:none}
.sa-drawer.open{transform:translateX(0);pointer-events:all}
.sa-drawer-brand{font-family:var(--fd);font-size:1.3rem;letter-spacing:.18em;color:var(--w);margin-bottom:44px;opacity:0;transform:translateY(10px);transition:opacity .4s .1s,transform .4s .1s;cursor:pointer}
.sa-drawer.open .sa-drawer-brand{opacity:1;transform:translateY(0)}
.sa-drawer-brand em{color:var(--g400);font-style:normal}
.sa-dlink{font-family:var(--fd);font-size:clamp(2rem,8vw,3rem);font-weight:300;color:var(--w60);background:none;border:none;padding:10px 0;cursor:pointer;display:block;width:100%;text-align:center;opacity:0;transform:translateY(18px);transition:color .3s,opacity .4s var(--ease),transform .4s var(--ease)}
.sa-drawer.open .sa-dlink{opacity:1;transform:translateY(0)}
.sa-drawer.open .sa-dlink:nth-of-type(1){transition-delay:.12s}.sa-drawer.open .sa-dlink:nth-of-type(2){transition-delay:.17s}.sa-drawer.open .sa-dlink:nth-of-type(3){transition-delay:.22s}.sa-drawer.open .sa-dlink:nth-of-type(4){transition-delay:.27s}.sa-drawer.open .sa-dlink:nth-of-type(5){transition-delay:.32s}
.sa-dlink:hover{color:var(--g400)}
.sa-drawer-div{width:40px;height:1px;background:rgba(201,168,76,.25);margin:18px 0;opacity:0;transition:opacity .4s .34s}
.sa-drawer.open .sa-drawer-div{opacity:1}
.sa-dcta{font-family:var(--fb);font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;color:var(--g400);border:1px solid var(--g400);background:none;padding:12px 32px;cursor:pointer;margin-top:8px;opacity:0;transform:translateY(18px);transition:color .3s,background .3s,opacity .4s .38s,transform .4s .38s}
.sa-drawer.open .sa-dcta{opacity:1;transform:translateY(0)}
.sa-dcta:hover{background:var(--g400);color:var(--n900)}
.sa-hero{min-height:100vh;position:relative;overflow:hidden;display:grid;grid-template-columns:1.2fr 1fr;align-items:flex-end;padding:0 60px 80px;gap:60px}
.sa-hero-canvas{position:absolute;inset:0;z-index:0}
.sa-hero-left{position:relative;z-index:2;padding-top:160px}
.sa-hero-right{position:relative;z-index:2;padding-top:160px;display:flex;align-items:flex-end;justify-content:flex-end}
.sa-hero-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:0.62rem;letter-spacing:0.3em;text-transform:uppercase;color:var(--g400);border:1px solid rgba(201,168,76,0.28);padding:7px 16px;margin-bottom:32px;opacity:0;animation:saUp 1s var(--ease) 0.2s forwards}
.sa-eyebrow-dot{width:5px;height:5px;border-radius:50%;background:var(--g400);animation:saBlink 2s infinite}
.sa-hero-h1{font-family:var(--fd);font-weight:300;line-height:0.88;letter-spacing:-0.02em;color:var(--w);font-size:clamp(3.5rem,7.5vw,7rem);margin-bottom:20px;opacity:0;animation:saUp 1.1s var(--ease) 0.35s forwards}
.sa-hero-h1 em{display:block;color:var(--g400);font-style:italic}
.sa-hero-sub{font-family:var(--fd);font-size:1rem;color:var(--w60);font-style:italic;margin-bottom:32px;opacity:0;animation:saUp 1s var(--ease) 0.5s forwards}
.sa-hero-desc{font-size:0.88rem;color:var(--w60);line-height:1.85;max-width:560px;margin-bottom:36px;opacity:0;animation:saUp 1s var(--ease) 0.65s forwards}
.sa-hero-desc strong{color:var(--w80);font-weight:400}
.sa-hero-tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:36px;opacity:0;animation:saUp 1s var(--ease) 0.75s forwards}
.sa-hero-tag{font-size:0.6rem;letter-spacing:0.16em;text-transform:uppercase;padding:6px 14px;border:1px solid rgba(201,168,76,0.25);color:var(--g300)}
.sa-hero-btns{display:flex;gap:14px;flex-wrap:wrap;opacity:0;animation:saUp 1s var(--ease) 0.85s forwards}
.sa-btn-gold{padding:15px 36px;background:var(--g400);color:var(--n900);font-family:var(--fb);font-size:0.72rem;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;border:none;cursor:pointer;transition:background 0.3s,transform 0.2s}
.sa-btn-gold:hover{background:var(--g300);transform:translateY(-2px)}
.sa-btn-ghost{padding:15px 36px;background:transparent;color:var(--w60);font-family:var(--fb);font-size:0.72rem;letter-spacing:0.14em;text-transform:uppercase;border:1px solid var(--w12);cursor:pointer;transition:all 0.3s}
.sa-btn-ghost:hover{border-color:var(--w30);color:var(--w);transform:translateY(-2px)}
.sa-regulator-panel{background:rgba(9,25,40,0.88);backdrop-filter:blur(16px);border:1px solid rgba(201,168,76,0.22);padding:40px 36px;min-width:280px;position:relative;overflow:hidden}
.sa-regulator-panel::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(201,168,76,0.06),transparent);pointer-events:none}
.sa-panel-title{font-size:0.58rem;letter-spacing:0.28em;text-transform:uppercase;color:var(--g400);margin-bottom:20px;display:flex;align-items:center;gap:10px}
.sa-panel-title::before{content:'';width:20px;height:1px;background:var(--g400)}
.sa-reg-list{display:flex;flex-direction:column;gap:0}
.sa-reg-item{display:flex;align-items:center;justify-content:space-between;padding:11px 0;border-bottom:1px solid var(--w06);gap:12px}
.sa-reg-item:last-child{border-bottom:none}
.sa-reg-name{font-size:0.78rem;color:var(--w);font-weight:500}
.sa-reg-sector{font-size:0.62rem;color:var(--w30);letter-spacing:0.08em}
.sa-reg-badge{font-size:0.55rem;letter-spacing:0.14em;text-transform:uppercase;padding:3px 8px;border:1px solid rgba(201,168,76,0.25);color:var(--g400)}
.sa-stats-bar{background:var(--n800);padding:0 60px;display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid var(--w06)}
.sa-sbar{padding:32px 0;text-align:center;border-right:1px solid var(--w06)}
.sa-sbar:last-child{border-right:none}
.sa-sbar-val{font-family:var(--fd);font-size:2.2rem;font-weight:300;color:var(--g400);display:block;line-height:1}
.sa-sbar-key{font-size:0.62rem;letter-spacing:0.16em;text-transform:uppercase;color:var(--w30);margin-top:6px;display:block}
.sa-section-label{font-size:0.6rem;letter-spacing:0.32em;text-transform:uppercase;color:var(--g400);margin-bottom:16px;display:block}
.sa-section-h2{font-family:var(--fd);font-size:clamp(2.2rem,4vw,3.8rem);font-weight:300;line-height:1.1;color:var(--w);margin-bottom:60px}
.sa-section-h2 em{color:var(--g400);font-style:italic}
.sa-sectors{background:var(--n900);padding:100px 60px}
.sa-sectors-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:var(--w06)}
.sa-sector-card{background:var(--n800);padding:44px 36px;position:relative;overflow:hidden;transition:background 0.4s var(--ease);cursor:default}
.sa-sector-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--glow2),transparent);opacity:0;transition:opacity 0.4s}
.sa-sector-card:hover{background:var(--n750)}
.sa-sector-card:hover::before{opacity:1}
.sa-sector-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--g400);transform:scaleX(0);transform-origin:left;transition:transform 0.5s var(--ease)}
.sa-sector-card:hover::after{transform:scaleX(1)}
.sa-sector-icon{font-size:2rem;margin-bottom:18px;display:block}
.sa-sector-authority{font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--g400);margin-bottom:10px;display:block;opacity:0.7;transition:opacity 0.3s}
.sa-sector-card:hover .sa-sector-authority{opacity:1}
.sa-sector-title{font-family:var(--fd);font-size:1.45rem;font-weight:400;color:var(--w);margin-bottom:10px;line-height:1.2}
.sa-sector-desc{font-size:0.8rem;color:var(--w60);line-height:1.75;margin-bottom:16px}
.sa-sector-approvals{display:flex;flex-wrap:wrap;gap:6px}
.sa-sector-approval{font-size:0.58rem;letter-spacing:0.1em;text-transform:uppercase;padding:4px 9px;border:1px solid var(--w06);color:var(--w30);transition:all 0.3s}
.sa-sector-card:hover .sa-sector-approval{border-color:rgba(201,168,76,0.18);color:var(--w60)}
.sa-process{background:var(--n800);padding:100px 60px}
.sa-process-inner{display:grid;grid-template-columns:1fr 1.4fr;gap:80px;align-items:start}
.sa-process-intro{font-size:0.84rem;color:var(--w60);line-height:1.88;margin-top:24px}
.sa-process-intro strong{color:var(--w80);font-weight:400}
.sa-steps{display:flex;flex-direction:column;gap:0}
.sa-step{display:grid;grid-template-columns:64px 1fr;gap:0;border-top:1px solid var(--w06);position:relative}
.sa-step:last-child{border-bottom:1px solid var(--w06)}
.sa-step::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--g400);transform:scaleY(0);transform-origin:top;transition:transform 0.5s var(--ease)}
.sa-step:hover::before{transform:scaleY(1)}
.sa-step-num{font-family:var(--fd);font-size:3rem;font-weight:300;color:rgba(201,168,76,0.15);line-height:1;padding:32px 0;transition:color 0.4s}
.sa-step:hover .sa-step-num{color:rgba(201,168,76,0.35)}
.sa-step-body{padding:32px 0 32px 24px}
.sa-step-title{font-size:0.95rem;font-weight:500;color:var(--w);margin-bottom:8px}
.sa-step-desc{font-size:0.8rem;color:var(--w60);line-height:1.72}
.sa-step-time{font-size:0.6rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--g400);border:1px solid rgba(201,168,76,0.2);padding:4px 12px;display:inline-flex;margin-top:12px}
.sa-packages{background:var(--cream-bg);padding:100px 60px;position:relative;overflow:hidden}
.sa-packages::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,var(--g400),transparent);opacity:0.5}
.sa-pkg-label{font-size:0.6rem;letter-spacing:0.32em;text-transform:uppercase;color:#8A6820;margin-bottom:16px;display:block}
.sa-pkg-h2{font-family:var(--fd);font-size:clamp(2.2rem,4vw,3.5rem);font-weight:300;color:var(--cream-ink);line-height:1.1;margin-bottom:60px}
.sa-pkg-h2 em{color:var(--g400);font-style:italic}
.sa-pkgs-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.sa-pkg{background:var(--cream-bg);border:1px solid var(--cream-bdr);padding:44px 36px;display:flex;flex-direction:column;transition:all 0.35s var(--ease);box-shadow:0 2px 12px rgba(120,90,30,0.06);cursor:pointer}
.sa-pkg:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(120,90,30,0.14);border-color:rgba(201,168,76,0.45)}
.sa-pkg.featured{background:var(--n900);border:1px solid rgba(201,168,76,0.35);box-shadow:0 8px 40px rgba(0,0,0,0.22)}
.sa-pkg.featured:hover{border-color:var(--g400)}
.sa-pkg-badge{font-size:0.58rem;letter-spacing:0.2em;text-transform:uppercase;padding:4px 10px;width:fit-content;margin-bottom:22px;border:1px solid;font-weight:500}
.sa-pkg:not(.featured) .sa-pkg-badge{border-color:var(--cream-bdr);color:var(--cream-ink3);background:var(--cream-200)}
.sa-pkg.featured .sa-pkg-badge{border-color:var(--g400);color:var(--g400);background:rgba(201,168,76,0.08)}
.sa-pkg-name{font-family:var(--fd);font-size:1.7rem;font-weight:400;margin-bottom:8px}
.sa-pkg:not(.featured) .sa-pkg-name{color:var(--cream-ink)}
.sa-pkg.featured .sa-pkg-name{color:var(--w)}
.sa-pkg-tagline{font-size:0.78rem;margin-bottom:28px}
.sa-pkg:not(.featured) .sa-pkg-tagline{color:var(--cream-ink3)}
.sa-pkg.featured .sa-pkg-tagline{color:var(--w60)}
.sa-pkg-div{height:1px;margin-bottom:28px}
.sa-pkg:not(.featured) .sa-pkg-div{background:var(--cream-bdr)}
.sa-pkg.featured .sa-pkg-div{background:var(--w06)}
.sa-pkg-feats{list-style:none;display:flex;flex-direction:column;gap:11px;flex:1;margin-bottom:32px}
.sa-pkg-feat{display:flex;align-items:flex-start;gap:11px;font-size:0.8rem;line-height:1.5}
.sa-pkg:not(.featured) .sa-pkg-feat{color:var(--cream-ink2)}
.sa-pkg.featured .sa-pkg-feat{color:var(--w80)}
.sa-feat-chk{flex-shrink:0;margin-top:2px;font-size:0.75rem}
.sa-feat-chk.yes{color:#8A6820}
.sa-pkg.featured .sa-feat-chk.yes{color:var(--g400)}
.sa-feat-chk.no{color:rgba(180,150,90,0.3)}
.sa-pkg-cta{padding:13px 20px;font-size:0.7rem;letter-spacing:0.12em;text-transform:uppercase;font-family:var(--fb);cursor:pointer;transition:all 0.3s;width:100%;font-weight:500}
.sa-pkg:not(.featured) .sa-pkg-cta{background:transparent;border:1px solid var(--cream-bdr);color:var(--cream-ink2)}
.sa-pkg:not(.featured) .sa-pkg-cta:hover{border-color:var(--g400);color:var(--cream-ink);background:var(--cream-200)}
.sa-pkg.featured .sa-pkg-cta{background:var(--g400);border:none;color:var(--n900)}
.sa-pkg.featured .sa-pkg-cta:hover{background:var(--g300)}
.sa-faq{background:var(--n900);padding:100px 60px}
.sa-faq-inner{display:grid;grid-template-columns:1fr 1.6fr;gap:80px;align-items:start}
.sa-faq-list{display:flex;flex-direction:column}
.sa-faq-item{border-top:1px solid var(--w06)}
.sa-faq-item:last-child{border-bottom:1px solid var(--w06)}
.sa-faq-q{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:22px 0;cursor:pointer}
.sa-faq-q-text{font-size:0.9rem;font-weight:400;color:var(--w);transition:color 0.3s}
.sa-faq-item.open .sa-faq-q-text{color:var(--g400)}
.sa-faq-icon{width:28px;height:28px;border:1px solid var(--w12);border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--w30);flex-shrink:0;transition:all 0.4s var(--ease)}
.sa-faq-item.open .sa-faq-icon{background:var(--g400);border-color:var(--g400);color:var(--n900);transform:rotate(45deg)}
.sa-faq-a{font-size:0.82rem;color:var(--w60);line-height:1.82;padding-bottom:22px;max-height:0;overflow:hidden;transition:max-height 0.5s var(--ease)}
.sa-faq-item.open .sa-faq-a{max-height:300px}
.sa-cta{background:var(--cream-bg);padding:120px 60px;text-align:center;position:relative;overflow:hidden}
.sa-cta::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(180,150,90,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(180,150,90,0.06) 1px,transparent 1px);background-size:60px 60px}
.sa-cta::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% 50%,rgba(201,168,76,0.09),transparent);pointer-events:none}
.sa-cta-inner{position:relative;z-index:1;max-width:640px;margin:0 auto}
.sa-cta-label{font-size:0.6rem;letter-spacing:0.32em;text-transform:uppercase;color:#8A6820;margin-bottom:20px;display:block}
.sa-cta-h2{font-family:var(--fd);font-size:clamp(2.5rem,5vw,4.2rem);font-weight:300;color:var(--cream-ink);line-height:1.1;margin-bottom:12px}
.sa-cta-h2 em{color:var(--g400);font-style:italic}
.sa-cta-divider{width:44px;height:1px;background:var(--g400);margin:24px auto;opacity:0.5}
.sa-cta-p{font-size:0.84rem;color:var(--cream-ink3);line-height:1.85;margin-bottom:44px}
.sa-cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.sa-btn-dark{padding:15px 40px;background:var(--cream-ink);color:var(--cream-bg);font-family:var(--fb);font-size:0.72rem;font-weight:500;letter-spacing:0.14em;text-transform:uppercase;border:none;cursor:pointer;transition:background 0.3s,transform 0.2s}
.sa-btn-dark:hover{background:var(--g400);color:var(--cream-ink);transform:translateY(-2px)}
.sa-btn-outline{padding:15px 40px;background:transparent;color:var(--cream-ink2);font-family:var(--fb);font-size:0.72rem;letter-spacing:0.14em;text-transform:uppercase;border:1px solid var(--cream-bdr);cursor:pointer;transition:all 0.3s}
.sa-btn-outline:hover{border-color:var(--g400);color:var(--cream-ink);transform:translateY(-2px)}
.sa-footer{background:var(--n950);padding:52px 60px;border-top:1px solid var(--w06)}
.sa-footer-inner{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px}
.sa-footer-logo{font-family:var(--fd);font-size:1.3rem;letter-spacing:0.15em;color:var(--w)}
.sa-footer-logo em{color:var(--g400);font-style:normal}
.sa-footer-copy{font-size:0.68rem;color:var(--w30)}
.sa-wa{position:fixed;bottom:28px;right:28px;z-index:300;width:50px;height:50px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 18px rgba(37,211,102,0.4);transition:transform 0.3s}
.sa-wa:hover{transform:scale(1.1)}
.sa-reveal{opacity:0;transform:translateY(22px);transition:opacity 0.85s var(--ease),transform 0.85s var(--ease)}
.sa-reveal.in{opacity:1;transform:translateY(0)}
.sa-d1{transition-delay:0.05s}.sa-d2{transition-delay:0.15s}.sa-d3{transition-delay:0.25s}.sa-d4{transition-delay:0.35s}
@keyframes saUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes saBlink{0%,100%{opacity:1}50%{opacity:0.3}}
@media(max-width:1000px){.sa-hero{grid-template-columns:1fr;padding:120px 40px 60px}.sa-hero-right{justify-content:flex-start}.sa-sectors-grid{grid-template-columns:1fr 1fr}.sa-process-inner{grid-template-columns:1fr}.sa-faq-inner{grid-template-columns:1fr;gap:48px}.sa-pkgs-grid{grid-template-columns:1fr}.sa-stats-bar{grid-template-columns:1fr 1fr}}
@media(max-width:768px){.sa-nav{padding:16px 24px}.sa-nav.scrolled{padding:12px 24px}.sa-nav-links{display:none}.sa-nav-cta{display:none}.sa-nav-hamburger{display:flex}.sa-hero{padding:100px 24px 52px}.sa-sectors,.sa-process,.sa-packages,.sa-faq,.sa-cta{padding:70px 24px}.sa-footer{padding:40px 24px}.sa-stats-bar{padding:0 24px}.sa-sectors-grid{grid-template-columns:1fr}}
`;

const SECTORS = [
  { icon: ICreditCard, authority: "CBUAE", title: "Financial Services & Fintech", desc: "Central Bank of UAE approval required for payment services, lending, exchange, insurance, and financial technology platforms operating in the UAE.", approvals: ["Payment Service Provider", "Exchange House", "Lending License", "Insurance Permit", "Crypto Regulations", "Open Banking"] },
  { icon: ITrendingUp, authority: "SCA", title: "Investment & Securities", desc: "Securities & Commodities Authority regulates investment firms, brokers, fund managers, and platforms dealing in UAE-listed securities or commodities.", approvals: ["Investment Advisor", "Broker-Dealer", "Fund Manager", "Commodity Broker", "Portfolio Manager"] },
  { icon: ICross, authority: "DHA / DOH", title: "Healthcare & Medical", desc: "Dubai Health Authority (DHA) and Department of Health Abu Dhabi (DOH) approval required for all healthcare facilities, clinics, pharmacies, and medical professionals.", approvals: ["Clinic License", "Pharmacy Permit", "Medical Professional", "Healthcare Facility", "Medical Device"] },
  { icon: IBookOpen, authority: "KHDA / ADEK", title: "Education & Training", desc: "Knowledge & Human Development Authority (Dubai) and ADEK (Abu Dhabi) regulate all educational institutions, training centres, and e-learning platforms.", approvals: ["School License", "Training Centre", "University Permit", "E-Learning Platform", "Tutoring Centre"] },
  { icon: ICompass, authority: "GCAA / CAA", title: "Aviation & Aerospace", desc: "General Civil Aviation Authority approval required for aviation services, drone operations, maintenance organisations, and aviation training in the UAE.", approvals: ["Air Operator Certificate", "Drone Permit", "MRO License", "Aviation Training", "Ground Handling"] },
  { icon: IWifi, authority: "TDRA", title: "Telecom & Digital Media", desc: "Telecommunications & Digital Government Regulatory Authority approval required for telecoms services, frequency spectrum use, and digital media platforms.", approvals: ["ISP License", "Frequency Permit", "Content Provider", "OTT Platform", "Digital Media"] },
  { icon: ILeaf, authority: "Dubai Municipality / ADAFSA", title: "Food & Beverage", desc: "Dubai Municipality and Abu Dhabi Agriculture & Food Safety Authority require permits for all food production, distribution, import, and F&B establishments.", approvals: ["Food Trade License", "Import Permit", "Production Facility", "Restaurant Health", "Food Labelling"] },
  { icon: IBolt, authority: "DEWA / FEWA", title: "Energy & Utilities", desc: "Dubai Electricity & Water Authority and Federal Electricity & Water Authority approvals for energy services, renewable energy projects, and utility-related operations.", approvals: ["Energy Producer", "Solar Installation", "Water Treatment", "Utility Service", "EV Charging"] },
  { icon: IBuilding, authority: "Dubai DM / AD DMT", title: "Construction & Real Estate", desc: "Municipality and Real Estate Regulatory Authority (RERA) approvals for real estate brokerage, development, construction contracting, and property management.", approvals: ["RERA Broker Card", "Contractor Grade", "Developer Approval", "Property Manager", "Escrow Account"] },
];

const PROCESS_STEPS = [
  { num: "01", title: "Activity Assessment", desc: "We identify which regulatory authorities govern your specific business activity and map out all required approvals before you commit to any setup costs.", time: "Day 1–2" },
  { num: "02", title: "Pre-Application Strategy", desc: "Many authorities require specific conditions — minimum capital, qualified staff, physical premises, or insurance. We identify and resolve all pre-conditions before submission.", time: "Day 2–7" },
  { num: "03", title: "Document Preparation", desc: "Each authority has unique document requirements. We prepare business plans, compliance manuals, organisational charts, financial projections, and all authority-specific forms.", time: "Day 7–14" },
  { num: "04", title: "Authority Submission & Liaison", desc: "Application submitted directly to the regulator. We track progress, respond to queries, attend meetings, and escalate where needed — maintaining direct officer relationships.", time: "Day 14 onwards" },
  { num: "05", title: "Approval & Integration", desc: "Upon approval, we ensure your trade license reflects the regulated activity correctly and guide you through any post-approval conditions, reporting, or compliance setup.", time: "Varies by authority" },
];

const FAQS = [
  { q: "How do I know if my business needs a special government approval?", a: "If your business operates in a regulated sector — financial services, healthcare, education, aviation, food, telecoms, energy, or real estate — a special approval is almost certainly required in addition to a standard trade license. INCOZONE conducts a free activity assessment to confirm all required approvals before you begin." },
  { q: "Can I operate while my approval is pending?", a: "In most cases, no. Operating a regulated activity without the required approval is illegal in the UAE and can result in fines, license suspension, or criminal liability. Some authorities issue temporary or provisional approvals — INCOZONE advises on the fastest compliant route to operation." },
  { q: "How long do special government approvals take?", a: "Timelines vary significantly by authority. KHDA education approvals can take 2–4 months. CBUAE financial service licenses can take 6–18 months. DHA healthcare approvals typically take 4–8 weeks. INCOZONE provides realistic timelines based on current authority processing speeds — not optimistic estimates." },
  { q: "Can a free zone company get special government approvals?", a: "Yes, in many cases. DHA, KHDA, and some other authorities issue approvals to free zone companies. However, CBUAE and SCA regulated activities typically require a mainland company. INCOZONE advises on the optimal corporate structure before you set up to avoid costly restructuring later." },
  { q: "What happens if my approval application is rejected?", a: "Rejections are typically due to insufficient documentation, unmet pre-conditions, or regulatory concerns about the business model. INCOZONE reviews rejection reasons, addresses all deficiencies, and resubmits. Most rejections are ultimately resolved through proper preparation and response." },
];

function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); let W, H, raf, t = 0;
    const pts = Array.from({ length: 50 }, () => ({ x: Math.random() * 1920, y: Math.random() * 1080, vx: (Math.random() - .5) * 0.16, vy: (Math.random() - .5) * 0.16, r: Math.random() * 1.4 + 0.4, o: Math.random() * 0.35 + 0.1 }));
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
  return <canvas ref={ref} className="sa-hero-canvas" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".sa-reveal");
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } }), { threshold: 0.07 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

export default function SpecialApprovalsPage({ onBack, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  useReveal();
  useEffect(() => { window.scrollTo(0, 0); const h = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  useEffect(() => { document.body.style.overflow = drawerOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [drawerOpen]);
  const go = (page) => { setDrawerOpen(false); if (onNavigate) { onNavigate(page); window.scrollTo(0, 0); } };
  const navLinks = [{ label: "Home", page: "home" }, { label: "Services", page: "services" }, { label: "Free Zones", page: "home" }, { label: "About", page: "about" }, { label: "Blog", page: "blog" }, { label: "Contact", page: "contact" }];

  return (
    <div className="sa-root">
      <style>{CSS}</style>
      <nav className={`sa-nav${scrolled ? " scrolled" : ""}`}>
        <div className="sa-nav-logo" onClick={() => go("home")}>INCO<em>ZONE</em></div>
        <ul className="sa-nav-links">{navLinks.map(l => <li key={l.label}><a onClick={() => go(l.page)}>{l.label}</a></li>)}</ul>
        <button className="sa-nav-cta" onClick={() => go("schedule")}>Schedule Consultation</button>
        <button className={`sa-nav-hamburger${drawerOpen ? " open" : ""}`} onClick={() => setDrawerOpen(o => !o)}><span /><span /><span /></button>
      </nav>
      <div className={`sa-drawer${drawerOpen ? " open" : ""}`}>
        <div className="sa-drawer-brand" onClick={() => go("home")}>INCO<em>ZONE</em></div>
        {navLinks.map(l => <button key={l.label} className="sa-dlink" onClick={() => go(l.page)}>{l.label}</button>)}
        <div className="sa-drawer-div" />
        <button className="sa-dcta" onClick={() => go("schedule")}>Schedule Consultation</button>
      </div>

      <section className="sa-hero">
        <HeroCanvas />
        <div className="sa-hero-left">
          <div className="sa-hero-eyebrow"><div className="sa-eyebrow-dot" />Regulatory Advisory · UAE</div>
          <h1 className="sa-hero-h1">Special<br /><em>Government</em><br />Approvals.</h1>
          <div className="sa-hero-sub">Beyond the Trade License — Regulated Sector Clearance</div>
          <p className="sa-hero-desc">Certain business activities in the UAE require <strong>approvals beyond the standard trade license</strong> — from sector regulators including CBUAE, SCA, KHDA, DHA, CAA, TDRA, and more. Regulated industries including fintech, healthcare, education, aviation, and financial services require dedicated authority clearance. <strong>We navigate every approval pathway.</strong></p>
          <div className="sa-hero-tags">{["CBUAE Approval", "SCA License", "KHDA Permit", "DHA License", "CAA Approval", "TDRA", "Fintech Regulatory", "Healthcare"].map(t => <span className="sa-hero-tag" key={t}>{t}</span>)}</div>
          <div className="sa-hero-btns">
            <button className="sa-btn-gold" onClick={() => go("schedule")}>Discuss My Requirements →</button>
            <button className="sa-btn-ghost" onClick={() => onBack && onBack()}>← Back to Services</button>
          </div>
        </div>
        <div className="sa-hero-right">
          <div className="sa-regulator-panel">
            <div className="sa-panel-title">Key UAE Regulators</div>
            <div className="sa-reg-list">
              {[["CBUAE", "Financial Services", "Central Bank"],["SCA", "Securities & Investments", "Federal"],["DHA", "Healthcare Dubai", "Emirate"],["KHDA", "Education Dubai", "Emirate"],["GCAA", "Aviation", "Federal"],["TDRA", "Telecom & Digital", "Federal"],["RERA", "Real Estate", "Dubai"],["DOH", "Healthcare Abu Dhabi", "Emirate"]].map(([name, sector, level]) => (
                <div className="sa-reg-item" key={name}>
                  <div><div className="sa-reg-name">{name}</div><div className="sa-reg-sector">{sector}</div></div>
                  <span className="sa-reg-badge">{level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="sa-stats-bar">
        {[{ val: "15+", key: "Regulators" }, { val: "9", key: "Sectors Covered" }, { val: "100%", key: "Compliance Assured" }, { val: "Direct", key: "Authority Access" }].map((s, i) => (
          <div className="sa-sbar" key={i}><span className="sa-sbar-val">{s.val}</span><span className="sa-sbar-key">{s.key}</span></div>
        ))}
      </div>

      <section className="sa-sectors">
        <div className="sa-reveal"><span className="sa-section-label">Regulated Sectors</span><h2 className="sa-section-h2">Industries Requiring<br /><em>Special Approvals</em></h2></div>
        <div className="sa-sectors-grid">
          {SECTORS.map((s, i) => (
            <div className={`sa-sector-card sa-reveal sa-d${(i % 3) + 1}`} key={i}>
              <span className="sa-sector-icon">{s.icon}</span>
              <span className="sa-sector-authority">{s.authority}</span>
              <div className="sa-sector-title">{s.title}</div>
              <p className="sa-sector-desc">{s.desc}</p>
              <div className="sa-sector-approvals">{s.approvals.map(a => <span className="sa-sector-approval" key={a}>{a}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="sa-process">
        <div className="sa-process-inner">
          <div className="sa-reveal">
            <span className="sa-section-label">How We Work</span>
            <h2 className="sa-section-h2" style={{ marginBottom: 0 }}>From assessment<br /><em>to approval.</em></h2>
            <p className="sa-process-intro">INCOZONE has <strong>direct relationships with licensing officers</strong> across all major UAE regulatory authorities. We don't submit portal applications and wait — we manage every interaction, escalate where necessary, and deliver approvals that others can't.</p>
          </div>
          <div className="sa-steps sa-reveal sa-d2">
            {PROCESS_STEPS.map((s, i) => (
              <div className="sa-step" key={i}>
                <div className="sa-step-num">{s.num}</div>
                <div className="sa-step-body">
                  <div className="sa-step-title">{s.title}</div>
                  <p className="sa-step-desc">{s.desc}</p>
                  <span className="sa-step-time">{s.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sa-packages">
        <span className="sa-pkg-label sa-reveal">Service Packages</span>
        <h2 className="sa-pkg-h2 sa-reveal sa-d1">Choose Your<br /><em>Approvals Package</em></h2>
        <div className="sa-pkgs-grid">
          {[
            { name: "Assessment", tagline: "Understand what approvals you need", badge: null, featured: false, features: [{ t: "Full regulatory activity assessment", y: true }, { t: "Authority identification report", y: true }, { t: "Timeline & cost roadmap", y: true }, { t: "Document requirements list", y: true }, { t: "Application submission", y: false }, { t: "Authority liaison management", y: false }] },
            { name: "Full Management", tagline: "Complete approval — one authority", badge: "Most Popular", featured: true, features: [{ t: "Full regulatory assessment", y: true }, { t: "Document preparation & submission", y: true }, { t: "Authority liaison & tracking", y: true }, { t: "Query & objection response", y: true }, { t: "Approval integration support", y: true }, { t: "Post-approval compliance setup", y: true }] },
            { name: "Multi-Regulatory", tagline: "Multiple approvals across authorities", badge: "Enterprise", featured: false, features: [{ t: "Full multi-authority assessment", y: true }, { t: "Coordinated multi-submission", y: true }, { t: "All authority liaisons managed", y: true }, { t: "Compliance framework setup", y: true }, { t: "Ongoing regulatory advisory", y: true }, { t: "Annual compliance review", y: true }] },
          ].map((pkg, i) => (
            <div className={`sa-pkg sa-reveal sa-d${i + 1}${pkg.featured ? " featured" : ""}`} key={i}>
              {pkg.badge && <div className="sa-pkg-badge">{pkg.badge}</div>}
              <div className="sa-pkg-name">{pkg.name}</div>
              <p className="sa-pkg-tagline">{pkg.tagline}</p>
              <div className="sa-pkg-div" />
              <ul className="sa-pkg-feats">
                {pkg.features.map((f, j) => (
                  <li className="sa-pkg-feat" key={j}>
                    <span className={`sa-feat-chk ${f.y ? "yes" : "no"}`}>{f.y ? "" : "×"}</span>
                    <span style={{ color: pkg.featured ? (f.y ? "var(--w80)" : "rgba(248,245,238,0.25)") : (f.y ? "var(--cream-ink2)" : "var(--cream-bdr)") }}>{f.t}</span>
                  </li>
                ))}
              </ul>
              <button className="sa-pkg-cta" onClick={() => go("schedule")}>{pkg.featured ? "Get Started →" : "Learn More →"}</button>
            </div>
          ))}
        </div>
      </section>

      <section className="sa-faq">
        <div className="sa-faq-inner">
          <div className="sa-reveal">
            <span className="sa-section-label">Common Questions</span>
            <h2 className="sa-section-h2" style={{ marginBottom: "24px" }}>Approvals<br /><em>FAQ</em></h2>
            <p style={{ fontSize: "0.82rem", color: "var(--w60)", lineHeight: "1.8", marginBottom: "40px" }}>The most common questions about UAE special government approvals and regulated business activities.</p>
            <button className="sa-btn-gold" onClick={() => go("schedule")}>Free Assessment →</button>
          </div>
          <div className="sa-faq-list sa-reveal sa-d2">
            {FAQS.map((f, i) => (
              <div className={`sa-faq-item${openFaq === i ? " open" : ""}`} key={i}>
                <div className="sa-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="sa-faq-q-text">{f.q}</span><div className="sa-faq-icon">+</div></div>
                <div className="sa-faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sa-cta">
        <div className="sa-cta-inner">
          <span className="sa-cta-label sa-reveal">Get Compliant</span>
          <h2 className="sa-cta-h2 sa-reveal sa-d1">Navigate Every<br /><em>Regulatory Pathway.</em></h2>
          <div className="sa-cta-divider" />
          <p className="sa-cta-p sa-reveal sa-d2">Don't assume a trade license is enough. If your business operates in a regulated sector, INCOZONE will identify every required approval and manage the complete process — so you operate legally from day one.</p>
          <div className="sa-cta-btns sa-reveal sa-d3">
            <button className="sa-btn-dark" onClick={() => go("schedule")}>Schedule Private Consultation</button>
            <button className="sa-btn-outline" onClick={() => onBack && onBack()}>← Back to Services</button>
          </div>
        </div>
      </section>

      <footer className="sa-footer"><div className="sa-footer-inner"><div className="sa-footer-logo">INCO<em>ZONE</em></div><div className="sa-footer-copy">© 2026 INCOZONE. All rights reserved. Dubai, UAE.</div></div></footer>
      <div className="sa-wa"><svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></div>
    </div>
  );
}
