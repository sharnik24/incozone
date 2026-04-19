import { useState, useEffect, useRef } from "react";
import { useContent } from "../context/ContentContext";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Schedule Consultation
//  Animated 4-step booking flow
//  Drop into: src/pages/Schedule.jsx
// ═══════════════════════════════════════════════════════════════

const CSS = `

.sc-root*,.sc-root*::before,.sc-root*::after{box-sizing:border-box;margin:0;padding:0}
.sc-root{
  --n950:#020b14;--n900:#05111e;--n800:#091928;--n750:#0c2033;--n700:#102540;
  --g400:#C9A84C;--g300:#D4B468;--g200:#E2CC98;--g100:#F0E4C0;
  --glow:rgba(201,168,76,0.14);--glow2:rgba(201,168,76,0.07);
  --w:#F8F5EE;--w80:rgba(248,245,238,0.80);--w60:rgba(248,245,238,0.60);
  --w40:rgba(248,245,238,0.40);--w30:rgba(248,245,238,0.30);
  --w12:rgba(248,245,238,0.12);--w06:rgba(248,245,238,0.06);
  --fd:'Cormorant Garamond',Georgia,serif;
  --fb:'DM Sans',system-ui,sans-serif;
  --ease:cubic-bezier(0.16,1,0.3,1);
  --ease-spring:cubic-bezier(0.34,1.56,0.64,1);
  font-family:var(--fb);font-weight:300;color:var(--w);
  background:var(--n900);overflow-x:hidden;min-height:100vh;width:100%;
}

/* ── NAV ──────────────────────────────────────────────────── */
.sc-nav{
  position:fixed;inset-inline:0;top:0;z-index:200;
  display:flex;align-items:center;justify-content:space-between;
  padding:20px 60px;
  background:rgba(5,17,30,0.97);backdrop-filter:blur(20px);
  border-bottom:1px solid rgba(201,168,76,0.12);
}
.sc-nav-logo{font-family:var(--fd);font-size:1.5rem;font-weight:500;letter-spacing:.15em;color:var(--w);cursor:pointer;}
.sc-nav-logo em{color:var(--g400);font-style:normal;}
.sc-back{background:none;border:none;font-family:var(--fb);font-size:.65rem;letter-spacing:.18em;text-transform:uppercase;color:var(--w30);cursor:pointer;display:flex;align-items:center;gap:8px;padding:0;transition:color .3s;}
.sc-back:hover{color:var(--g400);}
.sc-back::before{content:'←';}

/* ── PROGRESS BAR ─────────────────────────────────────────── */
.sc-progress{
  position:fixed;top:60px;inset-inline:0;z-index:199;
  height:2px;background:var(--w06);
}
.sc-progress-fill{
  height:100%;background:linear-gradient(90deg,var(--g400),var(--g300));
  transition:width .6s var(--ease);
}

/* ── LAYOUT ───────────────────────────────────────────────── */
.sc-layout{
  min-height:100vh;display:grid;grid-template-columns:380px 1fr;
  padding-top:62px;
}

/* LEFT SIDEBAR — persistent info */
.sc-sidebar{
  background:var(--n950);position:sticky;top:62px;height:calc(100vh - 62px);
  overflow-y:auto;display:flex;flex-direction:column;
  border-right:1px solid var(--w06);
  padding:56px 44px 40px;
}
.sc-sidebar-eyebrow{font-size:.56rem;letter-spacing:.36em;text-transform:uppercase;color:var(--g400);margin-bottom:18px;display:block;}
.sc-sidebar-h2{font-family:var(--fd);font-size:clamp(2rem,3vw,2.8rem);font-weight:300;line-height:1.05;color:var(--w);margin-bottom:6px;}
.sc-sidebar-h2 em{color:var(--g400);font-style:italic;display:block;}
.sc-sidebar-p{font-size:.78rem;color:var(--w60);line-height:1.85;margin-top:18px;margin-bottom:32px;}

/* Step pills */
.sc-steps{display:flex;flex-direction:column;gap:0;margin-top:auto;padding-top:32px;border-top:1px solid var(--w06);}
.sc-step{
  display:flex;align-items:center;gap:14px;padding:14px 0;
  border-bottom:1px solid var(--w06);position:relative;
}
.sc-step:last-child{border-bottom:none;}
.sc-step-dot{
  width:28px;height:28px;border-radius:50%;
  border:1px solid var(--w12);display:flex;align-items:center;justify-content:center;
  font-family:var(--fd);font-size:.75rem;color:var(--w30);flex-shrink:0;
  transition:all .4s var(--ease);
}
.sc-step.active .sc-step-dot{border-color:var(--g400);background:rgba(201,168,76,.1);color:var(--g400);}
.sc-step.done .sc-step-dot{border-color:var(--g400);background:var(--g400);color:var(--n900);}
.sc-step-label{font-size:.72rem;letter-spacing:.08em;color:var(--w30);transition:color .35s;}
.sc-step.active .sc-step-label{color:var(--w80);}
.sc-step.done .sc-step-label{color:var(--w60);}

/* Selected summary */
.sc-summary{margin-top:28px;display:flex;flex-direction:column;gap:8px;}
.sc-summary-item{display:flex;gap:12px;align-items:flex-start;}
.sc-summary-icon{width:18px;height:18px;flex-shrink:0;margin-top:2px;color:var(--g400);font-size:.85rem;}
.sc-summary-text{font-size:.76rem;color:var(--w60);line-height:1.5;}
.sc-summary-text strong{color:var(--w);font-weight:400;}

/* ── MAIN PANEL ───────────────────────────────────────────── */
.sc-main{
  padding:56px 64px 80px;overflow-y:auto;
  background:var(--n900);min-height:calc(100vh - 62px);
}

/* Step title */
.sc-step-num{font-size:.56rem;letter-spacing:.36em;text-transform:uppercase;color:var(--g400);display:block;margin-bottom:10px;}
.sc-step-title{font-family:var(--fd);font-size:clamp(1.8rem,3vw,2.6rem);font-weight:300;color:var(--w);margin-bottom:32px;line-height:1.1;}
.sc-step-title em{color:var(--g400);font-style:italic;}

/* ── STEP TRANSITIONS ─────────────────────────────────────── */
.sc-step-panel{
  animation:scSlideIn .5s var(--ease) forwards;
}
.sc-step-panel.exit{
  animation:scSlideOut .3s var(--ease) forwards;
}
@keyframes scSlideIn{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:translateX(0)}}
@keyframes scSlideOut{from{opacity:1;transform:translateX(0)}to{opacity:0;transform:translateX(-28px)}}

/* ── STEP 1 — SERVICE SELECTOR ────────────────────────────── */
.sc-services-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;}
.sc-service-card{
  padding:24px 22px;background:var(--n800);border:1px solid var(--w06);
  cursor:pointer;position:relative;overflow:hidden;
  transition:background .35s var(--ease),border-color .35s,transform .2s;
  text-align:left;
}
.sc-service-card:hover{background:var(--n750);transform:translateY(-2px);}
.sc-service-card.selected{border-color:var(--g400);background:rgba(201,168,76,.06);}
.sc-service-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:var(--g400);transform:scaleX(0);transform-origin:left;
  transition:transform .4s var(--ease);
}
.sc-service-card:hover::before,.sc-service-card.selected::before{transform:scaleX(1);}
.sc-service-card-icon{font-size:1.6rem;margin-bottom:14px;display:block;}
.sc-service-card-name{font-family:var(--fd);font-size:1.15rem;font-weight:400;color:var(--w);margin-bottom:6px;line-height:1.2;}
.sc-service-card.selected .sc-service-card-name{color:var(--g300);}
.sc-service-card-desc{font-size:.73rem;color:var(--w60);line-height:1.6;}
.sc-service-check{
  position:absolute;top:14px;right:14px;
  width:20px;height:20px;border-radius:50%;
  background:var(--g400);color:var(--n900);
  display:flex;align-items:center;justify-content:center;
  font-size:.65rem;font-weight:700;
  opacity:0;transform:scale(.5);
  transition:opacity .3s,transform .35s var(--ease-spring);
}
.sc-service-card.selected .sc-service-check{opacity:1;transform:scale(1);}

/* ── STEP 2 — CALENDAR ────────────────────────────────────── */
.sc-cal-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;}
.sc-cal-month{font-family:var(--fd);font-size:1.4rem;font-weight:400;color:var(--w);}
.sc-cal-nav{display:flex;gap:8px;}
.sc-cal-nav-btn{
  width:34px;height:34px;background:var(--n800);border:1px solid var(--w12);
  color:var(--w60);cursor:pointer;display:flex;align-items:center;justify-content:center;
  font-size:.9rem;transition:all .3s;
}
.sc-cal-nav-btn:hover{border-color:var(--g400);color:var(--g400);}

.sc-cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;}
.sc-cal-day-header{
  text-align:center;padding:8px 0;
  font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:var(--w30);
}
.sc-cal-day{
  aspect-ratio:1;display:flex;align-items:center;justify-content:center;
  font-size:.82rem;cursor:pointer;position:relative;
  border:1px solid transparent;transition:all .25s;
  font-family:var(--fb);color:var(--w60);
}
.sc-cal-day:hover:not(.disabled):not(.empty){
  background:rgba(201,168,76,.08);border-color:rgba(201,168,76,.2);color:var(--w);
}
.sc-cal-day.selected{
  background:var(--g400);color:var(--n900);font-weight:500;
  animation:scDatePop .35s var(--ease-spring);
}
@keyframes scDatePop{0%{transform:scale(.7)}100%{transform:scale(1)}}
.sc-cal-day.today{color:var(--g400);font-weight:500;}
.sc-cal-day.today::after{content:'';position:absolute;bottom:4px;left:50%;transform:translateX(-50%);width:4px;height:4px;border-radius:50%;background:var(--g400);}
.sc-cal-day.disabled{color:var(--w12);cursor:not-allowed;pointer-events:none;}
.sc-cal-day.empty{cursor:default;pointer-events:none;}

/* ── STEP 3 — TIME SLOTS ──────────────────────────────────── */
.sc-type-toggle{display:flex;gap:0;margin-bottom:28px;background:var(--n800);border:1px solid var(--w06);width:fit-content;}
.sc-type-btn{
  padding:10px 24px;background:none;border:none;font-family:var(--fb);
  font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:var(--w30);
  cursor:pointer;transition:all .3s;
}
.sc-type-btn.active{background:var(--g400);color:var(--n900);font-weight:500;}

.sc-slots-label{font-size:.62rem;letter-spacing:.22em;text-transform:uppercase;color:var(--w30);margin-bottom:14px;display:block;}
.sc-slots-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:28px;}
.sc-slot{
  padding:12px 8px;text-align:center;background:var(--n800);border:1px solid var(--w06);
  cursor:pointer;transition:all .25s;
  font-size:.78rem;color:var(--w60);font-family:var(--fb);
}
.sc-slot:hover:not(.unavailable){background:var(--n750);border-color:rgba(201,168,76,.2);color:var(--w);}
.sc-slot.selected{background:rgba(201,168,76,.1);border-color:var(--g400);color:var(--g400);font-weight:500;}
.sc-slot.unavailable{opacity:.25;cursor:not-allowed;pointer-events:none;}
.sc-slot.selected{animation:scSlotPop .3s var(--ease-spring);}
@keyframes scSlotPop{0%{transform:scale(.9)}100%{transform:scale(1)}}

/* Duration selection */
.sc-duration-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:32px;}
.sc-duration-card{
  padding:16px 12px;background:var(--n800);border:1px solid var(--w06);
  cursor:pointer;transition:all .3s;text-align:center;
}
.sc-duration-card:hover{border-color:rgba(201,168,76,.2);}
.sc-duration-card.selected{border-color:var(--g400);background:rgba(201,168,76,.07);}
.sc-duration-val{font-family:var(--fd);font-size:1.4rem;color:var(--g400);display:block;}
.sc-duration-label{font-size:.62rem;color:var(--w30);letter-spacing:.1em;margin-top:4px;display:block;}

/* ── STEP 4 — DETAILS FORM ────────────────────────────────── */
.sc-details-form{display:flex;flex-direction:column;gap:18px;}
.sc-field{position:relative;}
.sc-field label{display:block;font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:var(--w30);margin-bottom:7px;transition:color .3s;}
.sc-field:focus-within label{color:var(--g400);}
.sc-input,.sc-select,.sc-textarea{
  width:100%;background:var(--n800);border:1px solid var(--w12);
  color:var(--w);font-family:var(--fb);font-size:.84rem;font-weight:300;
  padding:13px 15px;outline:none;
  transition:border-color .35s,box-shadow .35s;appearance:none;
}
.sc-input::placeholder,.sc-textarea::placeholder{color:var(--w30);}
.sc-input:focus,.sc-select:focus,.sc-textarea:focus{
  border-color:var(--g400);
  box-shadow:0 0 0 3px rgba(201,168,76,.07);
}
.sc-textarea{min-height:90px;resize:vertical;line-height:1.7;}
.sc-select{cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C9A84C' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 13px center;}
.sc-select option{background:var(--n800);}
.sc-row-2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}

/* ── NAV BUTTONS ──────────────────────────────────────────── */
.sc-nav-btns{display:flex;gap:12px;margin-top:36px;align-items:center;}
.sc-btn-next{
  padding:14px 38px;background:var(--g400);color:var(--n900);
  font-family:var(--fb);font-size:.72rem;font-weight:500;letter-spacing:.16em;text-transform:uppercase;
  border:none;cursor:pointer;position:relative;overflow:hidden;
  transition:background .3s,transform .2s;
}
.sc-btn-next::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);transform:translateX(-100%);transition:transform .5s;}
.sc-btn-next:hover{background:var(--g300);transform:translateY(-2px);}
.sc-btn-next:hover::after{transform:translateX(100%);}
.sc-btn-next:disabled{opacity:.35;cursor:not-allowed;transform:none;}
.sc-btn-prev{
  padding:14px 32px;background:transparent;color:var(--w60);
  font-family:var(--fb);font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;
  border:1px solid var(--w12);cursor:pointer;transition:all .3s;
}
.sc-btn-prev:hover{border-color:var(--w30);color:var(--w);}

/* ── CONFIRMATION / SUCCESS ───────────────────────────────── */
.sc-confirm-screen{
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  min-height:calc(100vh - 62px);padding:60px 40px;text-align:center;
  animation:scSlideIn .6s var(--ease) forwards;
}

/* Animated envelope seal */
.sc-envelope{
  position:relative;width:120px;height:120px;margin-bottom:40px;
}
.sc-envelope-body{
  width:120px;height:120px;background:var(--n800);border:1px solid rgba(201,168,76,.3);
  position:relative;overflow:hidden;
  animation:scEnvIn 0.8s var(--ease-spring) .2s both;
}
@keyframes scEnvIn{from{transform:scale(.5) rotate(-8deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}
/* Flap */
.sc-envelope-flap{
  position:absolute;top:0;left:0;right:0;height:60px;
  background:var(--n750);border-bottom:1px solid rgba(201,168,76,.2);
  clip-path:polygon(0 0,100% 0,50% 100%);
  animation:scFlapOpen .6s var(--ease) 1.2s both;
  transform-origin:top center;
}
@keyframes scFlapOpen{
  0%{transform:rotateX(0deg);clip-path:polygon(0 0,100% 0,50% 100%)}
  50%{transform:rotateX(-160deg);clip-path:polygon(0 0,100% 0,50% 0%)}
  100%{transform:rotateX(-180deg);clip-path:polygon(0 0,100% 0,50% 0%)}
}
/* Gold seal */
.sc-seal{
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);
  width:48px;height:48px;border-radius:50%;background:var(--g400);
  display:flex;align-items:center;justify-content:center;
  font-size:1.4rem;color:var(--n900);z-index:2;
  animation:scSealIn .5s var(--ease-spring) 1.8s forwards;
}
@keyframes scSealIn{
  0%{transform:translate(-50%,-50%) scale(0) rotate(-180deg)}
  100%{transform:translate(-50%,-50%) scale(1) rotate(0deg)}
}
/* Checkmark draw */
.sc-check-circle{
  width:80px;height:80px;border-radius:50%;border:2px solid var(--g400);
  position:relative;display:flex;align-items:center;justify-content:center;
  margin:0 auto 32px;
  animation:scCircleIn .7s var(--ease-spring) .3s both;
}
@keyframes scCircleIn{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
.sc-check-svg{width:36px;height:36px;}
.sc-check-path{
  stroke:var(--g400);stroke-width:2.5;fill:none;stroke-linecap:round;stroke-linejoin:round;
  stroke-dasharray:50;stroke-dashoffset:50;
  animation:scCheckDraw .6s ease .9s forwards;
}
@keyframes scCheckDraw{to{stroke-dashoffset:0}}

/* Glow rings */
.sc-confirm-rings{
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  width:200px;height:200px;pointer-events:none;
}
.sc-ring{
  position:absolute;border-radius:50%;border:1px solid rgba(201,168,76,.12);
  top:50%;left:50%;transform:translate(-50%,-50%);
  animation:scRingExpand 2.5s ease-out .8s infinite;
}
.sc-ring:nth-child(1){width:80px;height:80px;}
.sc-ring:nth-child(2){width:80px;height:80px;animation-delay:1.2s;}
.sc-ring:nth-child(3){width:80px;height:80px;animation-delay:1.9s;}
@keyframes scRingExpand{
  0%{transform:translate(-50%,-50%) scale(1);opacity:.5}
  100%{transform:translate(-50%,-50%) scale(3.5);opacity:0}
}

.sc-confirm-title{font-family:var(--fd);font-size:clamp(2.2rem,4vw,3.5rem);font-weight:300;color:var(--w);line-height:1.1;margin-bottom:12px;}
.sc-confirm-title em{color:var(--g400);font-style:italic;}
.sc-confirm-sub{font-size:.86rem;color:var(--w60);line-height:1.85;max-width:480px;margin:0 auto 40px;}

/* Booking card */
.sc-booking-card{
  background:var(--n800);border:1px solid rgba(201,168,76,.2);
  padding:32px 40px;text-align:left;max-width:500px;width:100%;
  animation:scSlideIn .7s var(--ease) .4s both;
}
.sc-booking-card-label{font-size:.56rem;letter-spacing:.32em;text-transform:uppercase;color:var(--g400);margin-bottom:20px;display:block;}
.sc-booking-row{display:flex;align-items:center;gap:16px;padding:12px 0;border-bottom:1px solid var(--w06);}
.sc-booking-row:last-child{border-bottom:none;}
.sc-booking-icon{width:36px;height:36px;border:1px solid var(--w12);display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;}
.sc-booking-key{font-size:.6rem;letter-spacing:.16em;text-transform:uppercase;color:var(--w30);display:block;margin-bottom:3px;}
.sc-booking-val{font-family:var(--fd);font-size:1.05rem;font-weight:400;color:var(--w);}

.sc-confirm-actions{display:flex;gap:12px;margin-top:32px;flex-wrap:wrap;justify-content:center;}
.sc-btn-gold{padding:14px 36px;background:var(--g400);color:var(--n900);font-family:var(--fb);font-size:.7rem;font-weight:500;letter-spacing:.16em;text-transform:uppercase;border:none;cursor:pointer;transition:all .3s;}
.sc-btn-gold:hover{background:var(--g300);transform:translateY(-2px);}
.sc-btn-ghost{padding:14px 32px;background:transparent;color:var(--w60);font-family:var(--fb);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;border:1px solid var(--w12);cursor:pointer;transition:all .3s;}
.sc-btn-ghost:hover{border-color:var(--w30);color:var(--w);}

/* ── RESPONSIVE ───────────────────────────────────────────── */
@media(max-width:1000px){
  .sc-layout{grid-template-columns:1fr;}
  .sc-sidebar{position:static;height:auto;padding:40px 32px 32px;}
  .sc-main{padding:40px 32px 60px;}
  .sc-steps{flex-direction:row;flex-wrap:wrap;gap:8px;padding-top:20px;}
  .sc-step{border-bottom:none;padding:8px 12px;background:var(--n800);}
}
@media(max-width:640px){
  .sc-nav{padding:14px 20px;}
  .sc-services-grid{grid-template-columns:1fr;}
  .sc-slots-grid{grid-template-columns:repeat(3,1fr);}
  .sc-duration-grid{grid-template-columns:1fr 1fr 1fr;}
  .sc-row-2{grid-template-columns:1fr;}
  .sc-main{padding:32px 20px 60px;}
  .sc-booking-card{padding:24px 20px;}
}

  .sc-nav-hamburger {
    display: none; flex-direction: column; gap: 5px; cursor: pointer;
    background: none; border: none; padding: 6px; z-index: 310;
  }
  .sc-nav-hamburger span {
    display: block; width: 24px; height: 1.5px; background: rgba(248,245,238,0.6);
    transition: all 0.35s cubic-bezier(0.16,1,0.3,1); transform-origin: center;
  }
  .sc-nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: #C9A84C; }
  .sc-nav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .sc-nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: #C9A84C; }
  .sc-drawer {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(3,10,20,0.97); backdrop-filter: blur(24px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    transform: translateX(100%); transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
    pointer-events: none;
  }
  .sc-drawer.open { transform: translateX(0); pointer-events: all; }
  .sc-drawer-brand {
    font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.3rem;
    letter-spacing: .18em; color: #F8F5EE; margin-bottom: 44px;
    opacity: 0; transform: translateY(10px);
    transition: opacity .4s .1s, transform .4s .1s;
  }
  .sc-drawer.open .sc-drawer-brand { opacity: 1; transform: translateY(0); }
  .sc-drawer-brand em { color: #C9A84C; font-style: normal; }
  .sc-dlink {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2rem, 8vw, 3rem); font-weight: 300; color: rgba(248,245,238,0.6);
    background: none; border: none; padding: 10px 0; cursor: pointer;
    display: block; width: 100%; text-align: center;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, opacity .4s cubic-bezier(0.16,1,0.3,1), transform .4s cubic-bezier(0.16,1,0.3,1);
  }
  .sc-drawer.open .sc-dlink { opacity: 1; transform: translateY(0); }
  .sc-drawer.open .sc-dlink:nth-of-type(1) { transition-delay: .12s; }
  .sc-drawer.open .sc-dlink:nth-of-type(2) { transition-delay: .17s; }
  .sc-drawer.open .sc-dlink:nth-of-type(3) { transition-delay: .22s; }
  .sc-drawer.open .sc-dlink:nth-of-type(4) { transition-delay: .27s; }
  .sc-drawer.open .sc-dlink:nth-of-type(5) { transition-delay: .32s; }
  .sc-dlink:hover { color: #C9A84C; }
  .sc-drawer-div { width: 40px; height: 1px; background: rgba(201,168,76,.25); margin: 18px 0; opacity: 0; transition: opacity .4s .34s; }
  .sc-drawer.open .sc-drawer-div { opacity: 1; }
  .sc-dcta {
    font-family: 'DM Sans', sans-serif; font-size: .7rem; letter-spacing: .18em;
    text-transform: uppercase; color: #C9A84C; border: 1px solid #C9A84C;
    background: none; padding: 12px 32px; cursor: pointer; margin-top: 8px;
    opacity: 0; transform: translateY(18px);
    transition: color .3s, background .3s, opacity .4s .38s, transform .4s .38s;
  }
  .sc-drawer.open .sc-dcta { opacity: 1; transform: translateY(0); }
  .sc-dcta:hover { background: #C9A84C; color: #05111e; }
  @media (max-width: 900px) {
    .sc-nav-links { display: none; }
    .sc-nav-cta { display: none !important; }
    .sc-nav-hamburger { display: flex; }
  }
`;

const SERVICES = [
  { id:"freezone", icon:"", name:"Free Zone Formation", desc:"Company setup in DMCC, IFZA, ADGM, JAFZA, SHAMS, or any UAE free zone." },
  { id:"mainland", icon:"", name:"Mainland Formation", desc:"DED-licensed mainland company with 100% foreign ownership." },
  { id:"pro", icon:"", name:"PRO & Compliance", desc:"Visa processing, license renewals, government liaison, amendments." },
  { id:"banking", icon:"", name:"Corporate Banking", desc:"UAE business bank account opening — strategy, preparation, and submission." },
  { id:"visa", icon:"", name:"Investor Visa / Golden Visa", desc:"UAE residency visa for investors, business owners, and family members." },
  { id:"advisory", icon:"", name:"General Advisory", desc:"Structuring advice, tax position review, UBO compliance, or any UAE corporate matter." },
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS   = ["Su","Mo","Tu","We","Th","Fr","Sa"];

const MORNING_SLOTS   = ["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM"];
const AFTERNOON_SLOTS = ["12:00 PM","12:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM"];
const UNAVAILABLE     = [1,3,7,8]; // indices unavailable in each slot set

const STEPS = [
  { n:"01", label:"Choose Service" },
  { n:"02", label:"Select Date" },
  { n:"03", label:"Pick Time" },
  { n:"04", label:"Your Details" },
];

export default function SchedulePage({ onBack, onNavigate }) {
  const { content } = useContent();
  const services = content?.schedule?.services || SERVICES;
  const [_scOpen, setscOpen] = useState(false);
  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = _scOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [_scOpen]);

  const [step, setStep]           = useState(1);
  const [exiting, setExiting]     = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Step 1
  const [service, setService] = useState(null);
  // Step 2
  const now = new Date();
  const [calYear,  setCalYear]  = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [selDate,  setSelDate]  = useState(null);
  // Step 3
  const [timeSet,  setTimeSet]  = useState("morning"); // morning | afternoon
  const [selTime,  setSelTime]  = useState(null);
  const [duration, setDuration] = useState("30");
  // Step 4
  const [details, setDetails] = useState({ name:"", email:"", phone:"", company:"", nationality:"", notes:"" });

  const progress = confirmed ? 100 : ((step - 1) / 4) * 100;

  const goNext = () => {
    setExiting(true);
    setTimeout(() => { setStep(s => s + 1); setExiting(false); }, 280);
  };
  const goPrev = () => {
    setExiting(true);
    setTimeout(() => { setStep(s => s - 1); setExiting(false); }, 280);
  };

  const canNext = () => {
    if (step === 1) return !!service;
    if (step === 2) return !!selDate;
    if (step === 3) return !!selTime;
    if (step === 4) return details.name && details.email;
    return false;
  };

  const handleSubmit = async () => {
    setExiting(true);
    // POST to serverless function → saves to private GitHub CRM repo
    try {
      await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:        details.name,
          email:       details.email,
          phone:       details.phone,
          company:     details.company,
          nationality: details.nationality,
          notes:       details.notes,
          service:     selServiceObj?.name || service || "",
          date:        selDateStr || "",
          time:        selTime    || "",
          duration:    duration   || "30",
        }),
      });
    } catch (_) {
      // Fail silently — user still sees confirmation
    }
    setTimeout(() => { setConfirmed(true); setExiting(false); }, 280);
  };

  // Build calendar
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const calCells = [];
  for (let i = 0; i < firstDay; i++) calCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calCells.push(d);

  const isPast = (d) => {
    const dateObj = new Date(calYear, calMonth, d);
    const today = new Date(); today.setHours(0,0,0,0);
    return dateObj < today;
  };
  const isFriday = (d) => new Date(calYear, calMonth, d).getDay() === 5;

  const navMonth = (dir) => {
    const d = new Date(calYear, calMonth + dir, 1);
    setCalYear(d.getFullYear()); setCalMonth(d.getMonth());
    setSelDate(null);
  };

  const selServiceObj = SERVICES.find(s => s.id === service);
  const selDateStr = selDate
    ? `${selDate} ${MONTHS[calMonth]} ${calYear}`
    : null;

  return (
    <div className="sc-root">
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="sc-nav">
        <div className="sc-nav-logo" onClick={()=>{if(onNavigate){onNavigate("home");window.scrollTo(0,0);}}}>INCO<em>ZONE</em></div>
        <button className="sc-back" onClick={onBack}>Back to Home</button>
      
        {/* Hamburger */}
        <button
          className={`sc-nav-hamburger${_scOpen ? " open" : ""}`}
          onClick={() => setscOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`sc-drawer${_scOpen ? " open" : ""}`}>
        <div className="sc-drawer-brand"
          onClick={() => { setscOpen(false); if(onNavigate) { onNavigate("home"); window.scrollTo(0,0); } }}>
          INCO<em>ZONE</em>
        </div>
        {["Services","Free Zones","About","Blog","Contact"].map((l) => {
          const pm = {"Services":"services","Free Zones":"home","About":"about","Blog":"blog","Contact":"contact"};
          return (
            <button key={l} className="sc-dlink"
              onClick={() => { setscOpen(false); if(onNavigate) { onNavigate(pm[l]); window.scrollTo(0,0); } }}>
              {l}
            </button>
          );
        })}
        <div className="sc-drawer-div" />
        <button className="sc-dcta"
          onClick={() => { setscOpen(false); if(onNavigate) { onNavigate("schedule"); window.scrollTo(0,0); } }}>
          Schedule Consultation
        </button>
      </div>

      {/* PROGRESS */}
      <div className="sc-progress">
        <div className="sc-progress-fill" style={{width:`${progress}%`}} />
      </div>

      {confirmed ? (
        /* ══ CONFIRMATION ══════════════════════════════════════ */
        <div className="sc-confirm-screen">
          <div style={{position:"relative",display:"inline-flex",marginBottom:"36px"}}>
            <div className="sc-confirm-rings">
              <div className="sc-ring"/><div className="sc-ring"/><div className="sc-ring"/>
            </div>
            <div className="sc-check-circle">
              <svg className="sc-check-svg" viewBox="0 0 36 36">
                <path className="sc-check-path" d="M8 18 L15 25 L28 11" />
              </svg>
            </div>
          </div>

          <h1 className="sc-confirm-title">Consultation<em> Confirmed.</em></h1>
          <p className="sc-confirm-sub">
            Your appointment has been reserved. You will receive a confirmation email shortly with a calendar invite and your advisor's contact details.
          </p>

          <div className="sc-booking-card">
            <span className="sc-booking-card-label">Booking Confirmation · INCOZONE</span>
            {[
              { icon:"", key:"Service", val: selServiceObj?.name || service },
              { icon:"", key:"Name", val: details.name },
              { icon:"", key:"Date", val: selDateStr },
              { icon:"", key:"Time", val: `${selTime} · ${duration} minutes` },
              { icon:"", key:"Format", val: "Private Video Consultation" },
              { icon:"", key:"Confirmation to", val: details.email },
            ].map((r, i) => (
              <div className="sc-booking-row" key={i}
                style={{opacity:0,animation:`scSlideIn .5s var(--ease) ${.5+i*.08}s forwards`}}>
                <div className="sc-booking-icon">{r.icon}</div>
                <div>
                  <span className="sc-booking-key">{r.key}</span>
                  <div className="sc-booking-val">{r.val}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="sc-confirm-actions">
            <button className="sc-btn-gold" onClick={onBack}>← Back to Home</button>
            <button className="sc-btn-ghost" onClick={() => { setConfirmed(false); setStep(1); setService(null); setSelDate(null); setSelTime(null); setDetails({name:"",email:"",phone:"",company:"",nationality:"",notes:""}); }}>Book Another</button>
          </div>
        </div>

      ) : (
        /* ══ BOOKING FLOW ══════════════════════════════════════ */
        <div className="sc-layout">

          {/* SIDEBAR */}
          <div className="sc-sidebar">
            <span className="sc-sidebar-eyebrow">Private Advisory</span>
            <h2 className="sc-sidebar-h2">Schedule<em>a Consultation</em></h2>
            <p className="sc-sidebar-p">
              A focused 30 or 60-minute session with a senior INCOZONE advisor. We'll map your business to the right UAE structure — free zone, mainland, or hybrid.
            </p>

            {/* Step tracker */}
            <div className="sc-steps">
              {STEPS.map((s, i) => (
                <div className={`sc-step${step === i+1 ? " active" : ""}${step > i+1 ? " done" : ""}`} key={i}>
                  <div className="sc-step-dot">{step > i+1 ? "" : s.n}</div>
                  <span className="sc-step-label">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Dynamic summary */}
            {(service || selDateStr || selTime) && (
              <div className="sc-summary" style={{marginTop:"28px",borderTop:"1px solid var(--w06)",paddingTop:"20px"}}>
                <div style={{fontSize:".56rem",letterSpacing:".28em",textTransform:"uppercase",color:"var(--g400)",marginBottom:"8px"}}>Your Selection</div>
                {selServiceObj && (
                  <div className="sc-summary-item">
                    <span className="sc-summary-icon">{selServiceObj.icon}</span>
                    <span className="sc-summary-text"><strong>{selServiceObj.name}</strong></span>
                  </div>
                )}
                {selDateStr && (
                  <div className="sc-summary-item">
                    <span className="sc-summary-icon"></span>
                    <span className="sc-summary-text"><strong>{selDateStr}</strong></span>
                  </div>
                )}
                {selTime && (
                  <div className="sc-summary-item">
                    <span className="sc-summary-icon"></span>
                    <span className="sc-summary-text"><strong>{selTime}</strong> · {duration} min</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MAIN */}
          <div className="sc-main">
            <div className={`sc-step-panel${exiting?" exit":""}`}>

              {/* ── STEP 1 ── */}
              {step === 1 && (
                <div>
                  <span className="sc-step-num">Step 01 of 04</span>
                  <h2 className="sc-step-title">What do you need<em> help with?</em></h2>
                  <div className="sc-services-grid">
                    {services.map(s => (
                      <div
                        className={`sc-service-card${service===s.id?" selected":""}`}
                        key={s.id}
                        onClick={() => setService(s.id)}
                      >
                        <div className="sc-service-check"></div>
                        <span className="sc-service-card-icon">{s.icon}</span>
                        <div className="sc-service-card-name">{s.name}</div>
                        <p className="sc-service-card-desc">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="sc-nav-btns">
                    <button className="sc-btn-next" onClick={goNext} disabled={!canNext()}>
                      Select Date →
                    </button>
                  </div>
                </div>
              )}

              {/* ── STEP 2 ── */}
              {step === 2 && (
                <div>
                  <span className="sc-step-num">Step 02 of 04</span>
                  <h2 className="sc-step-title">Choose a<em> date.</em></h2>

                  <div className="sc-cal-header">
                    <span className="sc-cal-month">{MONTHS[calMonth]} {calYear}</span>
                    <div className="sc-cal-nav">
                      <button className="sc-cal-nav-btn" onClick={() => navMonth(-1)}>‹</button>
                      <button className="sc-cal-nav-btn" onClick={() => navMonth(1)}>›</button>
                    </div>
                  </div>

                  <div className="sc-cal-grid">
                    {DAYS.map(d => <div className="sc-cal-day-header" key={d}>{d}</div>)}
                    {calCells.map((d, i) => (
                      <div
                        key={i}
                        className={`sc-cal-day${!d?" empty":""}${d&&isPast(d)?" disabled":""}${d&&isFriday(d)?" disabled":""}${d&&selDate===d?" selected":""}${d&&d===now.getDate()&&calMonth===now.getMonth()&&calYear===now.getFullYear()?" today":""}`}
                        onClick={() => d && !isPast(d) && !isFriday(d) && setSelDate(d)}
                      >
                        {d}
                      </div>
                    ))}
                  </div>

                  <p style={{fontSize:".7rem",color:"var(--w30)",marginTop:"14px"}}>
                     Fridays unavailable · Availability shown in UAE time (GST/UTC+4)
                  </p>

                  <div className="sc-nav-btns">
                    <button className="sc-btn-prev" onClick={goPrev}>← Back</button>
                    <button className="sc-btn-next" onClick={goNext} disabled={!canNext()}>Choose Time →</button>
                  </div>
                </div>
              )}

              {/* ── STEP 3 ── */}
              {step === 3 && (
                <div>
                  <span className="sc-step-num">Step 03 of 04</span>
                  <h2 className="sc-step-title">Pick a<em> time slot.</em></h2>

                  {/* Duration */}
                  <span className="sc-slots-label">Session Duration</span>
                  <div className="sc-duration-grid">
                    {[["30","30 min","Focused briefing"],["60","60 min","Deep-dive session"],["90","90 min","Complex structures"]].map(([v,val,lab]) => (
                      <div className={`sc-duration-card${duration===v?" selected":""}`} key={v} onClick={() => setDuration(v)}>
                        <span className="sc-duration-val">{val}</span>
                        <span className="sc-duration-label">{lab}</span>
                      </div>
                    ))}
                  </div>

                  {/* Time period toggle */}
                  <div className="sc-type-toggle">
                    <button className={`sc-type-btn${timeSet==="morning"?" active":""}`} onClick={() => { setTimeSet("morning"); setSelTime(null); }}>Morning</button>
                    <button className={`sc-type-btn${timeSet==="afternoon"?" active":""}`} onClick={() => { setTimeSet("afternoon"); setSelTime(null); }}>Afternoon</button>
                  </div>

                  <span className="sc-slots-label">{selDateStr}</span>
                  <div className="sc-slots-grid">
                    {(timeSet==="morning" ? MORNING_SLOTS : AFTERNOON_SLOTS).map((t, i) => (
                      <div
                        className={`sc-slot${UNAVAILABLE.includes(i)?" unavailable":""}${selTime===t?" selected":""}`}
                        key={t}
                        onClick={() => !UNAVAILABLE.includes(i) && setSelTime(t)}
                      >
                        {t}
                      </div>
                    ))}
                  </div>

                  <div className="sc-nav-btns">
                    <button className="sc-btn-prev" onClick={goPrev}>← Back</button>
                    <button className="sc-btn-next" onClick={goNext} disabled={!canNext()}>Your Details →</button>
                  </div>
                </div>
              )}

              {/* ── STEP 4 ── */}
              {step === 4 && (
                <div>
                  <span className="sc-step-num">Step 04 of 04</span>
                  <h2 className="sc-step-title">A little about<em> you.</em></h2>

                  <div className="sc-details-form">
                    <div className="sc-row-2">
                      <div className="sc-field">
                        <label>Full Name *</label>
                        <input className="sc-input" placeholder="Your full name" value={details.name} onChange={e=>setDetails(p=>({...p,name:e.target.value}))} required />
                      </div>
                      <div className="sc-field">
                        <label>Email Address *</label>
                        <input className="sc-input" type="email" placeholder="your@email.com" value={details.email} onChange={e=>setDetails(p=>({...p,email:e.target.value}))} required />
                      </div>
                    </div>
                    <div className="sc-row-2">
                      <div className="sc-field">
                        <label>Phone / WhatsApp</label>
                        <input className="sc-input" placeholder="+971 or country code" value={details.phone} onChange={e=>setDetails(p=>({...p,phone:e.target.value}))} />
                      </div>
                      <div className="sc-field">
                        <label>Nationality</label>
                        <input className="sc-input" placeholder="Your nationality" value={details.nationality} onChange={e=>setDetails(p=>({...p,nationality:e.target.value}))} />
                      </div>
                    </div>
                    <div className="sc-field">
                      <label>Company Name (if any)</label>
                      <input className="sc-input" placeholder="Existing company name or 'New setup'" value={details.company} onChange={e=>setDetails(p=>({...p,company:e.target.value}))} />
                    </div>
                    <div className="sc-field">
                      <label>Anything you'd like us to know?</label>
                      <textarea className="sc-textarea" placeholder="Your business activity, current setup, specific questions…" value={details.notes} onChange={e=>setDetails(p=>({...p,notes:e.target.value}))} />
                    </div>
                  </div>

                  {/* Booking summary */}
                  <div style={{marginTop:"28px",padding:"22px 24px",background:"var(--n800)",border:"1px solid var(--w06)"}}>
                    <div style={{fontSize:".56rem",letterSpacing:".28em",textTransform:"uppercase",color:"var(--g400)",marginBottom:"14px"}}>Booking Summary</div>
                    {[
                      [selServiceObj?.name, "Service"],
                      [selDateStr, "Date"],
                      [`${selTime} · ${duration} minutes`, "Time"],
                    ].map(([v,k]) => v && (
                      <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid var(--w06)",fontSize:".78rem"}}>
                        <span style={{color:"var(--w30)",letterSpacing:".08em"}}>{k}</span>
                        <span style={{color:"var(--w80)"}}>{v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="sc-nav-btns">
                    <button className="sc-btn-prev" onClick={goPrev}>← Back</button>
                    <button className="sc-btn-next" onClick={handleSubmit} disabled={!canNext()}>
                      Confirm Consultation →
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
