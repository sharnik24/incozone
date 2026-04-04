import { useState, useEffect, useRef } from "react";
import { IShield, IBolt, ITrendingUp, IMapPin, IGrid, IFileText } from "../icons";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Free Zone Incorporation Service
//  Comprehensive guide to UAE Free Zone company setup
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.fzi-root *, .fzi-root *::before, .fzi-root *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}

.fzi-root {
  --n950: #020b14; --n900: #05111e; --n800: #091928; --n750: #0c2033;
  --n700: #102540; --n600: #163354;
  --g400: #C9A84C; --g300: #D4B468; --g200: #E2CC98;
  --glow: rgba(201,168,76,0.14);
  --cream: #FAF6EE; --cream-ink: #1A120A;
  --w: #F8F5EE; --w80: rgba(248,245,238,0.80); --w60: rgba(248,245,238,0.60);
  --w30: rgba(248,245,238,0.30); --w12: rgba(248,245,238,0.12);
  --fd: 'Cormorant Garamond', Georgia, serif;
  --fb: 'DM Sans', system-ui, sans-serif;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
  font-family: var(--fb); font-weight: 300; color: var(--w);
  background: var(--n900); overflow-x: hidden; width: 100%;
}

/* NAV */
.fzi-nav {
  position: fixed; inset-inline: 0; top: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 60px; transition: all 0.5s;
  border-bottom: 1px solid transparent;
}
.fzi-nav.scrolled {
  background: rgba(5,17,30,0.96); backdrop-filter: blur(20px);
  padding: 14px 60px; border-bottom-color: rgba(201,168,76,0.12);
}
.fzi-nav-logo { 
  font-family: var(--fd); font-size: 1.5rem; font-weight: 500; 
  letter-spacing: 0.15em; color: var(--w); cursor: pointer; text-decoration: none;
}
.fzi-nav-logo em { color: var(--g400); font-style: normal; }
.fzi-nav-links { display: flex; gap: 36px; list-style: none; }
.fzi-nav-links a {
  font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--w60); text-decoration: none; transition: color 0.3s;
}
.fzi-nav-links a:hover { color: var(--g400); }
.fzi-nav-cta {
  font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
  background: transparent; border: 1px solid var(--g400); color: var(--g400);
  padding: 9px 22px; cursor: pointer; font-family: var(--fb);
  transition: all 0.3s;
}
.fzi-nav-cta:hover { background: var(--g400); color: var(--n900); }

/* HERO */
.fzi-hero {
  min-height: 85vh; position: relative; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  padding: 140px 60px 100px;
}
.fzi-hero-bg {
  position: absolute; inset: 0; z-index: 0;
  background: radial-gradient(ellipse at 30% 40%, rgba(201,168,76,0.08), transparent 60%),
              radial-gradient(ellipse at 70% 60%, rgba(22,51,84,0.4), transparent 50%);
}
.fzi-hero-inner { position: relative; z-index: 2; max-width: 1000px; text-align: center; }
.fzi-hero-overline {
  display: inline-flex; align-items: center; gap: 12px; margin-bottom: 28px;
  opacity: 0; animation: fadeUp 0.9s var(--ease) 0.3s forwards;
}
.fzi-hero-overline-line { width: 40px; height: 1px; background: var(--g400); }
.fzi-hero-overline span {
  font-size: 0.65rem; letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--g400);
}
.fzi-hero-h1 {
  font-family: var(--fd); font-weight: 300; line-height: 1.1;
  font-size: clamp(2.8rem, 5.5vw, 5.8rem);
  letter-spacing: -0.02em; color: var(--w);
  opacity: 0; animation: fadeUp 1s var(--ease) 0.5s forwards;
}
.fzi-hero-h1 em { color: var(--g400); font-style: italic; }
.fzi-hero-sub {
  margin: 32px auto 0; max-width: 680px;
  font-size: 0.95rem; color: var(--w60); line-height: 1.8;
  opacity: 0; animation: fadeUp 0.9s var(--ease) 0.75s forwards;
}

@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
  from { opacity: 0; transform: translateY(20px); }
}

/* INTRO SECTION */
.fzi-intro {
  padding: 100px 60px;
  background: linear-gradient(180deg, var(--n900) 0%, var(--n950) 100%);
  border-top: 1px solid var(--w12);
}
.fzi-intro-inner { max-width: 1200px; margin: 0 auto; }
.fzi-intro-grid {
  display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px;
  align-items: start;
}
.fzi-intro-left h2 {
  font-family: var(--fd); font-size: 2.6rem; font-weight: 400;
  line-height: 1.2; color: var(--w); margin-bottom: 24px;
}
.fzi-intro-left h2 em { color: var(--g400); font-style: italic; }
.fzi-intro-left p {
  font-size: 0.88rem; color: var(--w60); line-height: 1.9;
}
.fzi-intro-right {
  display: flex; flex-direction: column; gap: 20px;
}
.fzi-intro-stat {
  padding: 28px 32px;
  background: linear-gradient(135deg, rgba(22,51,84,0.3), rgba(16,37,64,0.2));
  border: 1px solid var(--w12); border-radius: 2px;
  transition: all 0.4s var(--ease);
}
.fzi-intro-stat:hover {
  border-color: var(--g400); transform: translateX(8px);
  box-shadow: 0 8px 32px rgba(201,168,76,0.1);
}
.fzi-intro-stat-num {
  font-family: var(--fd); font-size: 2.4rem; font-weight: 500;
  color: var(--g400); line-height: 1;
}
.fzi-intro-stat-label {
  font-size: 0.8rem; color: var(--w80); margin-top: 8px;
  letter-spacing: 0.02em;
}

/* ZONES GRID */
.fzi-zones {
  padding: 120px 60px;
  background: var(--n900);
}
.fzi-zones-inner { max-width: 1400px; margin: 0 auto; }
.fzi-zones-header {
  text-align: center; margin-bottom: 80px;
}
.fzi-zones-header h2 {
  font-family: var(--fd); font-size: 3.2rem; font-weight: 400;
  line-height: 1.2; color: var(--w); margin-bottom: 20px;
}
.fzi-zones-header h2 em { color: var(--g400); font-style: italic; }
.fzi-zones-header p {
  font-size: 0.92rem; color: var(--w60); max-width: 600px;
  margin: 0 auto; line-height: 1.8;
}

.fzi-zones-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}
.fzi-zone-card {
  padding: 36px 32px;
  background: linear-gradient(135deg, rgba(16,37,64,0.4), rgba(5,17,30,0.6));
  border: 1px solid var(--w12);
  transition: all 0.5s var(--ease);
  cursor: pointer;
  position: relative; overflow: hidden;
}
.fzi-zone-card::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 50% 0%, var(--glow), transparent 70%);
  opacity: 0; transition: opacity 0.5s;
}
.fzi-zone-card:hover::before { opacity: 1; }
.fzi-zone-card:hover {
  border-color: var(--g400); transform: translateY(-8px);
  box-shadow: 0 12px 48px rgba(0,0,0,0.4);
}
.fzi-zone-card-num {
  font-family: var(--fd); font-size: 0.7rem; letter-spacing: 0.2em;
  color: var(--g400); margin-bottom: 16px;
}
.fzi-zone-card-title {
  font-family: var(--fd); font-size: 1.8rem; font-weight: 500;
  color: var(--w); margin-bottom: 16px; line-height: 1.3;
}
.fzi-zone-card-desc {
  font-size: 0.82rem; color: var(--w60); line-height: 1.8;
  margin-bottom: 24px;
}
.fzi-zone-card-features {
  display: flex; flex-direction: column; gap: 10px;
}
.fzi-zone-card-feature {
  display: flex; align-items: center; gap: 10px;
  font-size: 0.75rem; color: var(--w80);
}
.fzi-zone-card-feature::before {
  content: '→'; color: var(--g400); font-size: 0.9rem;
}

/* PROCESS STEPS */
.fzi-process {
  padding: 120px 60px;
  background: linear-gradient(180deg, var(--n900) 0%, var(--n950) 100%);
  border-top: 1px solid var(--w12);
}
.fzi-process-inner { max-width: 1200px; margin: 0 auto; }
.fzi-process-header {
  text-align: center; margin-bottom: 80px;
}
.fzi-process-header h2 {
  font-family: var(--fd); font-size: 3rem; font-weight: 400;
  color: var(--w); margin-bottom: 20px;
}
.fzi-process-header h2 em { color: var(--g400); font-style: italic; }
.fzi-process-header p {
  font-size: 0.9rem; color: var(--w60); max-width: 560px;
  margin: 0 auto; line-height: 1.8;
}

.fzi-process-steps {
  display: grid; gap: 40px;
}
.fzi-process-step {
  display: grid; grid-template-columns: 120px 1fr; gap: 40px;
  padding: 40px 0; border-bottom: 1px solid var(--w12);
}
.fzi-process-step:last-child { border-bottom: none; }
.fzi-process-step-num {
  font-family: var(--fd); font-size: 4rem; font-weight: 300;
  color: var(--g400); opacity: 0.6; line-height: 1;
}
.fzi-process-step-content h3 {
  font-family: var(--fd); font-size: 1.8rem; font-weight: 500;
  color: var(--w); margin-bottom: 16px;
}
.fzi-process-step-content p {
  font-size: 0.88rem; color: var(--w60); line-height: 1.9;
  margin-bottom: 20px;
}
.fzi-process-step-details {
  display: flex; flex-wrap: wrap; gap: 16px;
}
.fzi-process-step-tag {
  padding: 6px 14px; font-size: 0.72rem;
  background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.3);
  color: var(--g400); letter-spacing: 0.05em;
}

/* BENEFITS */
.fzi-benefits {
  padding: 120px 60px;
  background: var(--n900);
}
.fzi-benefits-inner { max-width: 1300px; margin: 0 auto; }
.fzi-benefits-header {
  text-align: center; margin-bottom: 80px;
}
.fzi-benefits-header h2 {
  font-family: var(--fd); font-size: 3rem; font-weight: 400;
  color: var(--w); margin-bottom: 20px;
}
.fzi-benefits-header h2 em { color: var(--g400); font-style: italic; }

.fzi-benefits-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
}
.fzi-benefit-card {
  padding: 32px 28px;
  background: linear-gradient(135deg, rgba(22,51,84,0.3), rgba(16,37,64,0.2));
  border: 1px solid var(--w12);
  transition: all 0.4s var(--ease);
}
.fzi-benefit-card:hover {
  border-color: var(--g400); transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(201,168,76,0.08);
}
.fzi-benefit-card-icon {
  font-size: 2rem; margin-bottom: 20px;
}
.fzi-benefit-card-title {
  font-family: var(--fd); font-size: 1.4rem; font-weight: 500;
  color: var(--w); margin-bottom: 12px;
}
.fzi-benefit-card-desc {
  font-size: 0.82rem; color: var(--w60); line-height: 1.8;
}

/* CTA SECTION */
.fzi-cta {
  padding: 100px 60px;
  background: linear-gradient(135deg, rgba(201,168,76,0.08), transparent);
  border-top: 1px solid var(--w12);
  border-bottom: 1px solid var(--w12);
}
.fzi-cta-inner {
  max-width: 900px; margin: 0 auto; text-align: center;
}
.fzi-cta-h2 {
  font-family: var(--fd); font-size: 2.8rem; font-weight: 400;
  color: var(--w); margin-bottom: 24px; line-height: 1.2;
}
.fzi-cta-h2 em { color: var(--g400); font-style: italic; }
.fzi-cta-p {
  font-size: 0.92rem; color: var(--w60); margin-bottom: 40px;
  line-height: 1.8; max-width: 640px; margin-left: auto; margin-right: auto;
}
.fzi-cta-btn {
  display: inline-block;
  padding: 16px 48px; font-size: 0.8rem; letter-spacing: 0.12em;
  text-transform: uppercase; background: var(--g400); color: var(--n900);
  border: none; cursor: pointer; font-family: var(--fb); font-weight: 500;
  transition: all 0.3s var(--ease);
}
.fzi-cta-btn:hover {
  background: var(--g300); transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(201,168,76,0.3);
}

/* FOOTER */
.fzi-footer {
  padding: 80px 60px 40px;
  background: var(--n950);
  border-top: 1px solid var(--w12);
}
.fzi-footer-inner { max-width: 1400px; margin: 0 auto; }
.fzi-footer-grid {
  display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 60px;
  margin-bottom: 60px;
}
.fzi-footer-col h4 {
  font-family: var(--fd); font-size: 1.2rem; font-weight: 500;
  color: var(--w); margin-bottom: 20px;
}
.fzi-footer-col p {
  font-size: 0.82rem; color: var(--w60); line-height: 1.8;
  margin-bottom: 16px;
}
.fzi-footer-col ul {
  list-style: none; display: flex; flex-direction: column; gap: 12px;
}
.fzi-footer-col a {
  font-size: 0.8rem; color: var(--w60); text-decoration: none;
  transition: color 0.3s;
}
.fzi-footer-col a:hover { color: var(--g400); }
.fzi-footer-bottom {
  padding-top: 32px; border-top: 1px solid var(--w12);
  text-align: center; font-size: 0.75rem; color: var(--w30);
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .fzi-intro-grid { grid-template-columns: 1fr; gap: 50px; }
  .fzi-zones-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
  .fzi-process-step { grid-template-columns: 80px 1fr; gap: 24px; }
  .fzi-footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
}

@media (max-width: 768px) {
  .fzi-nav { padding: 18px 30px; }
  .fzi-nav-links { display: none; }
  .fzi-hero { padding: 120px 30px 80px; }
  .fzi-intro { padding: 80px 30px; }
  .fzi-zones { padding: 80px 30px; }
  .fzi-zones-grid { grid-template-columns: 1fr; }
  .fzi-process { padding: 80px 30px; }
  .fzi-process-step { grid-template-columns: 1fr; }
  .fzi-benefits { padding: 80px 30px; }
  .fzi-benefits-grid { grid-template-columns: 1fr; }
  .fzi-cta { padding: 80px 30px; }
  .fzi-footer { padding: 60px 30px 30px; }
  .fzi-footer-grid { grid-template-columns: 1fr; gap: 32px; }
}
`;

const ZONES = [
  {
    num: "01",
    name: "DMCC",
    desc: "Dubai's leading commodities and trading hub with world-class infrastructure",
    features: ["100% foreign ownership", "Zero corporate tax", "Repatriation of profits"]
  },
  {
    num: "02",
    name: "IFZA",
    desc: "Dubai's cost-effective free zone ideal for startups and SMEs",
    features: ["Lowest setup costs", "Fast licensing", "Flexible packages"]
  },
  {
    num: "03",
    name: "Meydan",
    desc: "Premium business environment in the heart of Dubai",
    features: ["Corporate banking support", "Visa flexibility", "Elite location"]
  },
  {
    num: "04",
    name: "SHAMS",
    desc: "Sharjah's media and creative industries free zone",
    features: ["Media licenses", "Affordable rates", "Strategic location"]
  },
  {
    num: "05",
    name: "RAKEZ",
    desc: "Ras Al Khaimah's diverse business ecosystem",
    features: ["Industrial options", "Warehouse facilities", "Competitive pricing"]
  },
  {
    num: "06",
    name: "JAFZA",
    desc: "Middle East's largest free zone with port access",
    features: ["Logistics hub", "Port connectivity", "Global reach"]
  },
  {
    num: "07",
    name: "AFZ",
    desc: "Ajman's growing business-friendly free zone",
    features: ["Budget-friendly", "Quick setup", "Proximity to Dubai"]
  },
  {
    num: "08",
    name: "ADGM",
    desc: "Abu Dhabi's international financial center with English common law",
    features: ["Financial services", "Common law framework", "Global recognition"]
  }
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Consultation & Zone Selection",
    desc: "We analyze your business model, activity requirements, and budget to recommend the optimal free zone. This includes licensing feasibility checks and shareholder structure planning.",
    tags: ["Business Assessment", "Zone Comparison", "Activity Selection"]
  },
  {
    num: "02",
    title: "Documentation & Application",
    desc: "Complete preparation of all required documents including passport copies, business plans, and corporate resolutions. We handle the entire application process with the chosen free zone authority.",
    tags: ["Document Preparation", "Application Filing", "Approval Tracking"]
  },
  {
    num: "03",
    title: "License Issuance & Registration",
    desc: "Upon approval, we facilitate license issuance, office lease agreements, and registration with relevant government departments. This includes obtaining your establishment card and initial approvals.",
    tags: ["License Collection", "Lease Agreement", "Government Registration"]
  },
  {
    num: "04",
    title: "Visa Processing & Banking",
    desc: "Complete visa processing for shareholders, employees, and dependents. We also assist with corporate bank account opening at leading UAE banks with full documentation support.",
    tags: ["Visa Applications", "Emirates ID", "Bank Account Setup"]
  }
];

const BENEFITS = [
  {
    icon: IShield,
    title: "100% Foreign Ownership",
    desc: "Retain complete control of your business with full foreign ownership rights."
  },
  {
    icon: IBolt,
    title: "Zero Corporate Tax",
    desc: "Benefit from 0% corporate and personal income tax on business profits."
  },
  {
    icon: ITrendingUp,
    title: "Full Profit Repatriation",
    desc: "Transfer 100% of your capital and profits back to your home country."
  },
  {
    icon: IMapPin,
    title: "Strategic Location",
    desc: "Access to Middle East, Asian, and African markets from a central hub."
  },
  {
    icon: IGrid,
    title: "World-Class Infrastructure",
    desc: "Premium office spaces, logistics facilities, and business amenities."
  },
  {
    icon: IFileText,
    title: "Simplified Compliance",
    desc: "Minimal reporting requirements and streamlined regulatory processes."
  }
];

export default function FreeZoneIncorporationPage({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fzi-root">
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`fzi-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="fzi-nav-logo" onClick={() => onNavigate("home")}>
          INCO<em>ZONE</em>
        </div>
        <ul className="fzi-nav-links">
          <li><a onClick={() => onNavigate("services")}>Services</a></li>
          <li><a onClick={() => onNavigate("about")}>About</a></li>
          <li><a onClick={() => onNavigate("blog")}>Insights</a></li>
          <li><a onClick={() => onNavigate("contact")}>Contact</a></li>
        </ul>
        <button className="fzi-nav-cta" onClick={() => onNavigate("schedule")}>
          Book Consultation
        </button>
      </nav>

      {/* HERO */}
      <section className="fzi-hero">
        <div className="fzi-hero-bg"></div>
        <div className="fzi-hero-inner">
          <div className="fzi-hero-overline">
            <div className="fzi-hero-overline-line"></div>
            <span>Business Formation</span>
            <div className="fzi-hero-overline-line"></div>
          </div>
          <h1 className="fzi-hero-h1">
            Free Zone <em>Incorporation</em><br />in the UAE
          </h1>
          <p className="fzi-hero-sub">
            Strategic establishment within UAE's premier free zones. We match your business model to the right zone from the first conversation — <strong>not the most profitable one for us.</strong>
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="fzi-intro">
        <div className="fzi-intro-inner">
          <div className="fzi-intro-grid">
            <div className="fzi-intro-left">
              <h2>Why Choose <em>Free Zone</em> Setup?</h2>
              <p>
                UAE Free Zones offer the most business-friendly environment in the Middle East — combining 100% foreign ownership, zero taxation, and complete profit repatriation. Each zone is designed for specific industries, providing tailored infrastructure and regulatory frameworks.
              </p>
            </div>
            <div className="fzi-intro-right">
              <div className="fzi-intro-stat">
                <div className="fzi-intro-stat-num">45+</div>
                <div className="fzi-intro-stat-label">Free Zones Across UAE</div>
              </div>
              <div className="fzi-intro-stat">
                <div className="fzi-intro-stat-num">100%</div>
                <div className="fzi-intro-stat-label">Foreign Ownership Allowed</div>
              </div>
              <div className="fzi-intro-stat">
                <div className="fzi-intro-stat-num">0%</div>
                <div className="fzi-intro-stat-label">Corporate & Income Tax</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ZONES GRID */}
      <section className="fzi-zones">
        <div className="fzi-zones-inner">
          <div className="fzi-zones-header">
            <h2>Our <em>Featured</em> Free Zones</h2>
            <p>
              We specialize in 8 premier free zones, each offering unique advantages tailored to different business types and industries.
            </p>
          </div>
          <div className="fzi-zones-grid">
            {ZONES.map((zone) => (
              <div key={zone.num} className="fzi-zone-card" onClick={() => onNavigate(zone.name.toLowerCase())}>
                <div className="fzi-zone-card-num">{zone.num}</div>
                <h3 className="fzi-zone-card-title">{zone.name}</h3>
                <p className="fzi-zone-card-desc">{zone.desc}</p>
                <div className="fzi-zone-card-features">
                  {zone.features.map((feature, i) => (
                    <div key={i} className="fzi-zone-card-feature">{feature}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="fzi-process">
        <div className="fzi-process-inner">
          <div className="fzi-process-header">
            <h2>The <em>Incorporation</em> Process</h2>
            <p>
              A streamlined 4-step journey from consultation to full operational status. Typical timeline: 2-4 weeks.
            </p>
          </div>
          <div className="fzi-process-steps">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="fzi-process-step">
                <div className="fzi-process-step-num">{step.num}</div>
                <div className="fzi-process-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  <div className="fzi-process-step-details">
                    {step.tags.map((tag, i) => (
                      <span key={i} className="fzi-process-step-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="fzi-benefits">
        <div className="fzi-benefits-inner">
          <div className="fzi-benefits-header">
            <h2>Key <em>Benefits</em></h2>
          </div>
          <div className="fzi-benefits-grid">
            {BENEFITS.map((benefit, i) => (
              <div key={i} className="fzi-benefit-card">
                <div className="fzi-benefit-card-icon">{benefit.icon}</div>
                <h3 className="fzi-benefit-card-title">{benefit.title}</h3>
                <p className="fzi-benefit-card-desc">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="fzi-cta">
        <div className="fzi-cta-inner">
          <h2 className="fzi-cta-h2">
            Ready to Establish Your <em>UAE Business?</em>
          </h2>
          <p className="fzi-cta-p">
            Book a free consultation with our business setup experts. We'll analyze your requirements and recommend the perfect free zone for your business model.
          </p>
          <button className="fzi-cta-btn" onClick={() => onNavigate("schedule")}>
            Schedule Free Consultation
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="fzi-footer">
        <div className="fzi-footer-inner">
          <div className="fzi-footer-grid">
            <div className="fzi-footer-col">
              <h4>INCOZONE</h4>
              <p>Your trusted partner for UAE business setup and corporate services.</p>
            </div>
            <div className="fzi-footer-col">
              <h4>Services</h4>
              <ul>
                <li><a onClick={() => onNavigate("services")}>All Services</a></li>
                <li><a onClick={() => onNavigate("mainland")}>Mainland Setup</a></li>
                <li><a onClick={() => onNavigate("banking")}>Banking Services</a></li>
              </ul>
            </div>
            <div className="fzi-footer-col">
              <h4>Company</h4>
              <ul>
                <li><a onClick={() => onNavigate("about")}>About Us</a></li>
                <li><a onClick={() => onNavigate("blog")}>Blog</a></li>
                <li><a onClick={() => onNavigate("contact")}>Contact</a></li>
              </ul>
            </div>
            <div className="fzi-footer-col">
              <h4>Contact</h4>
              <p>Email: info@incozone.ae</p>
              <p>Phone: +971 4 XXX XXXX</p>
            </div>
          </div>
          <div className="fzi-footer-bottom">
            © 2024 Incozone. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
