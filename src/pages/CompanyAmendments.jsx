import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Company Amendments Service
//  Comprehensive guide to UAE company amendments & restructuring
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.cam-root *, .cam-root *::before, .cam-root *::after {
  box-sizing: border-box; margin: 0; padding: 0;
}

.cam-root {
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
.cam-nav {
  position: fixed; inset-inline: 0; top: 0; z-index: 200;
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 60px; transition: all 0.5s;
  border-bottom: 1px solid transparent;
}
.cam-nav.scrolled {
  background: rgba(5,17,30,0.96); backdrop-filter: blur(20px);
  padding: 14px 60px; border-bottom-color: rgba(201,168,76,0.12);
}
.cam-nav-logo {
  font-family: var(--fd); font-size: 1.5rem; font-weight: 500;
  letter-spacing: 0.15em; color: var(--w); cursor: pointer; text-decoration: none;
}
.cam-nav-logo em { color: var(--g400); font-style: normal; }
.cam-nav-links { display: flex; gap: 36px; list-style: none; }
.cam-nav-links a {
  font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--w60); text-decoration: none; transition: color 0.3s; cursor: pointer;
}
.cam-nav-links a:hover { color: var(--g400); }
.cam-nav-cta {
  font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
  background: transparent; border: 1px solid var(--g400); color: var(--g400);
  padding: 9px 22px; cursor: pointer; font-family: var(--fb);
  transition: all 0.3s;
}
.cam-nav-cta:hover { background: var(--g400); color: var(--n900); }

/* HERO */
.cam-hero {
  min-height: 85vh; position: relative; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
  padding: 140px 60px 100px;
}
.cam-hero-bg {
  position: absolute; inset: 0; z-index: 0;
  background: radial-gradient(ellipse at 30% 40%, rgba(201,168,76,0.08), transparent 60%),
              radial-gradient(ellipse at 70% 60%, rgba(22,51,84,0.4), transparent 50%);
}
.cam-hero-inner { position: relative; z-index: 2; max-width: 1000px; text-align: center; }
.cam-hero-overline {
  display: inline-flex; align-items: center; gap: 12px; margin-bottom: 28px;
  opacity: 0; animation: camFadeUp 0.9s var(--ease) 0.3s forwards;
}
.cam-hero-overline-line { width: 40px; height: 1px; background: var(--g400); }
.cam-hero-overline span {
  font-size: 0.65rem; letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--g400);
}
.cam-hero-h1 {
  font-family: var(--fd); font-weight: 300; line-height: 1.1;
  font-size: clamp(2.8rem, 5.5vw, 5.8rem);
  letter-spacing: -0.02em; color: var(--w);
  opacity: 0; animation: camFadeUp 1s var(--ease) 0.5s forwards;
}
.cam-hero-h1 em { color: var(--g400); font-style: italic; }
.cam-hero-sub {
  margin: 32px auto 0; max-width: 680px;
  font-size: 0.95rem; color: var(--w60); line-height: 1.8;
  opacity: 0; animation: camFadeUp 0.9s var(--ease) 0.75s forwards;
}

@keyframes camFadeUp {
  to { opacity: 1; transform: translateY(0); }
  from { opacity: 0; transform: translateY(20px); }
}

/* INTRO SECTION */
.cam-intro {
  padding: 100px 60px;
  background: linear-gradient(180deg, var(--n900) 0%, var(--n950) 100%);
  border-top: 1px solid var(--w12);
}
.cam-intro-inner { max-width: 1200px; margin: 0 auto; }
.cam-intro-grid {
  display: grid; grid-template-columns: 1fr 1.2fr; gap: 80px;
  align-items: start;
}
.cam-intro-left h2 {
  font-family: var(--fd); font-size: 2.6rem; font-weight: 400;
  line-height: 1.2; color: var(--w); margin-bottom: 24px;
}
.cam-intro-left h2 em { color: var(--g400); font-style: italic; }
.cam-intro-left p {
  font-size: 0.88rem; color: var(--w60); line-height: 1.9;
}
.cam-intro-right {
  display: flex; flex-direction: column; gap: 20px;
}
.cam-intro-stat {
  padding: 28px 32px;
  background: linear-gradient(135deg, rgba(22,51,84,0.3), rgba(16,37,64,0.2));
  border: 1px solid var(--w12); border-radius: 2px;
  transition: all 0.4s var(--ease);
}
.cam-intro-stat:hover {
  border-color: var(--g400); transform: translateX(8px);
  box-shadow: 0 8px 32px rgba(201,168,76,0.1);
}
.cam-intro-stat-num {
  font-family: var(--fd); font-size: 2.4rem; font-weight: 500;
  color: var(--g400); line-height: 1;
}
.cam-intro-stat-label {
  font-size: 0.8rem; color: var(--w80); margin-top: 8px;
  letter-spacing: 0.02em;
}

/* AMENDMENT TYPES GRID */
.cam-types {
  padding: 120px 60px;
  background: var(--n900);
}
.cam-types-inner { max-width: 1400px; margin: 0 auto; }
.cam-types-header {
  text-align: center; margin-bottom: 80px;
}
.cam-types-header h2 {
  font-family: var(--fd); font-size: 3.2rem; font-weight: 400;
  line-height: 1.2; color: var(--w); margin-bottom: 20px;
}
.cam-types-header h2 em { color: var(--g400); font-style: italic; }
.cam-types-header p {
  font-size: 0.92rem; color: var(--w60); max-width: 600px;
  margin: 0 auto; line-height: 1.8;
}

.cam-types-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}
.cam-type-card {
  padding: 36px 32px;
  background: linear-gradient(135deg, rgba(16,37,64,0.4), rgba(5,17,30,0.6));
  border: 1px solid var(--w12);
  transition: all 0.5s var(--ease);
  position: relative; overflow: hidden;
}
.cam-type-card::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 50% 0%, var(--glow), transparent 70%);
  opacity: 0; transition: opacity 0.5s;
}
.cam-type-card:hover::before { opacity: 1; }
.cam-type-card:hover {
  border-color: var(--g400); transform: translateY(-8px);
  box-shadow: 0 12px 48px rgba(0,0,0,0.4);
}
.cam-type-card-num {
  font-family: var(--fd); font-size: 0.7rem; letter-spacing: 0.2em;
  color: var(--g400); margin-bottom: 16px;
}
.cam-type-card-title {
  font-family: var(--fd); font-size: 1.8rem; font-weight: 500;
  color: var(--w); margin-bottom: 16px; line-height: 1.3;
}
.cam-type-card-desc {
  font-size: 0.82rem; color: var(--w60); line-height: 1.8;
  margin-bottom: 24px;
}
.cam-type-card-features {
  display: flex; flex-direction: column; gap: 10px;
}
.cam-type-card-feature {
  display: flex; align-items: center; gap: 10px;
  font-size: 0.75rem; color: var(--w80);
}
.cam-type-card-feature::before {
  content: '→'; color: var(--g400); font-size: 0.9rem;
}

/* PROCESS STEPS */
.cam-process {
  padding: 120px 60px;
  background: linear-gradient(180deg, var(--n900) 0%, var(--n950) 100%);
  border-top: 1px solid var(--w12);
}
.cam-process-inner { max-width: 1200px; margin: 0 auto; }
.cam-process-header {
  text-align: center; margin-bottom: 80px;
}
.cam-process-header h2 {
  font-family: var(--fd); font-size: 3rem; font-weight: 400;
  color: var(--w); margin-bottom: 20px;
}
.cam-process-header h2 em { color: var(--g400); font-style: italic; }
.cam-process-header p {
  font-size: 0.9rem; color: var(--w60); max-width: 560px;
  margin: 0 auto; line-height: 1.8;
}

.cam-process-steps {
  display: grid; gap: 40px;
}
.cam-process-step {
  display: grid; grid-template-columns: 120px 1fr; gap: 40px;
  padding: 40px 0; border-bottom: 1px solid var(--w12);
}
.cam-process-step:last-child { border-bottom: none; }
.cam-process-step-num {
  font-family: var(--fd); font-size: 4rem; font-weight: 300;
  color: var(--g400); opacity: 0.6; line-height: 1;
}
.cam-process-step-content h3 {
  font-family: var(--fd); font-size: 1.8rem; font-weight: 500;
  color: var(--w); margin-bottom: 16px;
}
.cam-process-step-content p {
  font-size: 0.88rem; color: var(--w60); line-height: 1.9;
  margin-bottom: 20px;
}
.cam-process-step-details {
  display: flex; flex-wrap: wrap; gap: 16px;
}
.cam-process-step-tag {
  padding: 6px 14px; font-size: 0.72rem;
  background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.3);
  color: var(--g400); letter-spacing: 0.05em;
}

/* BENEFITS */
.cam-benefits {
  padding: 120px 60px;
  background: var(--n900);
}
.cam-benefits-inner { max-width: 1300px; margin: 0 auto; }
.cam-benefits-header {
  text-align: center; margin-bottom: 80px;
}
.cam-benefits-header h2 {
  font-family: var(--fd); font-size: 3rem; font-weight: 400;
  color: var(--w); margin-bottom: 20px;
}
.cam-benefits-header h2 em { color: var(--g400); font-style: italic; }

.cam-benefits-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
}
.cam-benefit-card {
  padding: 32px 28px;
  background: linear-gradient(135deg, rgba(22,51,84,0.3), rgba(16,37,64,0.2));
  border: 1px solid var(--w12);
  transition: all 0.4s var(--ease);
}
.cam-benefit-card:hover {
  border-color: var(--g400); transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(201,168,76,0.08);
}
.cam-benefit-card-icon {
  font-size: 2rem; margin-bottom: 20px;
}
.cam-benefit-card-title {
  font-family: var(--fd); font-size: 1.4rem; font-weight: 500;
  color: var(--w); margin-bottom: 12px;
}
.cam-benefit-card-desc {
  font-size: 0.82rem; color: var(--w60); line-height: 1.8;
}

/* CTA SECTION */
.cam-cta {
  padding: 100px 60px;
  background: linear-gradient(135deg, rgba(201,168,76,0.08), transparent);
  border-top: 1px solid var(--w12);
  border-bottom: 1px solid var(--w12);
}
.cam-cta-inner {
  max-width: 900px; margin: 0 auto; text-align: center;
}
.cam-cta-h2 {
  font-family: var(--fd); font-size: 2.8rem; font-weight: 400;
  color: var(--w); margin-bottom: 24px; line-height: 1.2;
}
.cam-cta-h2 em { color: var(--g400); font-style: italic; }
.cam-cta-p {
  font-size: 0.92rem; color: var(--w60); margin-bottom: 40px;
  line-height: 1.8; max-width: 640px; margin-left: auto; margin-right: auto;
}
.cam-cta-btn {
  display: inline-block;
  padding: 16px 48px; font-size: 0.8rem; letter-spacing: 0.12em;
  text-transform: uppercase; background: var(--g400); color: var(--n900);
  border: none; cursor: pointer; font-family: var(--fb); font-weight: 500;
  transition: all 0.3s var(--ease);
}
.cam-cta-btn:hover {
  background: var(--g300); transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(201,168,76,0.3);
}

/* FOOTER */
.cam-footer {
  padding: 80px 60px 40px;
  background: var(--n950);
  border-top: 1px solid var(--w12);
}
.cam-footer-inner { max-width: 1400px; margin: 0 auto; }
.cam-footer-grid {
  display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 60px;
  margin-bottom: 60px;
}
.cam-footer-col h4 {
  font-family: var(--fd); font-size: 1.2rem; font-weight: 500;
  color: var(--w); margin-bottom: 20px;
}
.cam-footer-col p {
  font-size: 0.82rem; color: var(--w60); line-height: 1.8;
  margin-bottom: 16px;
}
.cam-footer-col ul {
  list-style: none; display: flex; flex-direction: column; gap: 12px;
}
.cam-footer-col a {
  font-size: 0.8rem; color: var(--w60); text-decoration: none;
  transition: color 0.3s; cursor: pointer;
}
.cam-footer-col a:hover { color: var(--g400); }
.cam-footer-bottom {
  padding-top: 32px; border-top: 1px solid var(--w12);
  text-align: center; font-size: 0.75rem; color: var(--w30);
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .cam-intro-grid { grid-template-columns: 1fr; gap: 50px; }
  .cam-types-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
  .cam-process-step { grid-template-columns: 80px 1fr; gap: 24px; }
  .cam-footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
}

@media (max-width: 768px) {
  .cam-nav { padding: 18px 30px; }
  .cam-nav-links { display: none; }
  .cam-hero { padding: 120px 30px 80px; }
  .cam-intro { padding: 80px 30px; }
  .cam-types { padding: 80px 30px; }
  .cam-types-grid { grid-template-columns: 1fr; }
  .cam-process { padding: 80px 30px; }
  .cam-process-step { grid-template-columns: 1fr; }
  .cam-benefits { padding: 80px 30px; }
  .cam-benefits-grid { grid-template-columns: 1fr; }
  .cam-cta { padding: 80px 30px; }
  .cam-footer { padding: 60px 30px 30px; }
  .cam-footer-grid { grid-template-columns: 1fr; gap: 32px; }
}
`;

const AMENDMENT_TYPES = [
  {
    num: "01",
    name: "Shareholder Changes",
    desc: "Full management of share transfers, new shareholder additions, and shareholder exits across all UAE free zones and mainland.",
    features: ["Share Transfers", "New Shareholder Entry", "Shareholder Exit", "Updated MOA"]
  },
  {
    num: "02",
    name: "Director Appointments",
    desc: "Appointment or removal of directors and managers, including all authority submissions and updated corporate documents.",
    features: ["Director Appointment", "Director Removal", "Manager Changes", "Board Resolutions"]
  },
  {
    num: "03",
    name: "Activity Expansions",
    desc: "Adding or modifying licensed business activities to grow your operational scope within your existing license structure.",
    features: ["Activity Addition", "Activity Removal", "License Upgrade", "Feasibility Check"]
  },
  {
    num: "04",
    name: "Trade Name Changes",
    desc: "Full trade name amendment process including availability checks, authority approvals, and updated license and corporate documents.",
    features: ["Name Availability", "Authority Approval", "Updated License", "New Corporate Stamp"]
  },
  {
    num: "05",
    name: "Capital Amendments",
    desc: "Share capital increases or decreases, including updated MOA, shareholder resolutions, and authority registration.",
    features: ["Capital Increase", "Capital Decrease", "Share Allotment", "Updated MOA"]
  },
  {
    num: "06",
    name: "Corporate Restructuring",
    desc: "Complex cross-border restructuring, mergers, and holding structure changes executed with the same precision regardless of complexity.",
    features: ["Cross-Border Moves", "Holding Structures", "Zone Transfers", "Group Restructuring"]
  }
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Assessment & Advisory",
    desc: "We review your current corporate structure, identify the exact amendments required, and advise on the most efficient approach — including any authority restrictions or timeline implications.",
    tags: ["Structure Review", "Amendment Scope", "Timeline Advisory"]
  },
  {
    num: "02",
    title: "Document Preparation",
    desc: "Full preparation of all required documents — board resolutions, shareholder agreements, updated MOA drafts, and any notarised or attested paperwork needed by the relevant authority.",
    tags: ["Board Resolutions", "MOA Drafting", "Notarisation & Attestation"]
  },
  {
    num: "03",
    title: "Authority Submission",
    desc: "We submit all documents to the relevant free zone authority or DED on your behalf, track progress daily, and handle all queries and clarifications from the authority.",
    tags: ["Authority Filing", "Progress Tracking", "Query Management"]
  },
  {
    num: "04",
    title: "Updated Documents Delivery",
    desc: "Once approved, we collect your updated trade license, revised MOA, and all amended corporate documents. We brief you on next steps for bank notifications and any downstream updates.",
    tags: ["License Collection", "Updated MOA", "Bank Notification Support"]
  }
];

const BENEFITS = [
  {
    icon: "",
    title: "Fast Turnaround",
    desc: "Most standard amendments completed within 3–7 working days. Complex restructuring handled on agreed timelines."
  },
  {
    icon: "",
    title: "All Jurisdictions Covered",
    desc: "Amendments handled across all 8 major UAE free zones and DED mainland — one team, all authorities."
  },
  {
    icon: "",
    title: "Full Document Management",
    desc: "We prepare, submit, and collect all documents. You review and sign — nothing else required from you."
  },
  {
    icon: "",
    title: "Pre-Amendment Review",
    desc: "We check for restrictions, conflicts, and authority requirements before submission — preventing rejections."
  },
  {
    icon: "",
    title: "Ongoing Corporate Support",
    desc: "We remain your corporate secretary post-amendment for all future changes, renewals, and compliance needs."
  },
  {
    icon: "",
    title: "Confidential & Precise",
    desc: "Sensitive shareholder and ownership changes handled with full confidentiality and legal precision."
  }
];

export default function CompanyAmendmentsPage({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="cam-root">
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`cam-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="cam-nav-logo" onClick={() => onNavigate("home")}>
          INCO<em>ZONE</em>
        </div>
        <ul className="cam-nav-links">
          <li><a onClick={() => onNavigate("services")}>Services</a></li>
          <li><a onClick={() => onNavigate("about")}>About</a></li>
          <li><a onClick={() => onNavigate("blog")}>Insights</a></li>
          <li><a onClick={() => onNavigate("contact")}>Contact</a></li>
        </ul>
        <button className="cam-nav-cta" onClick={() => onNavigate("schedule")}>
          Book Consultation
        </button>
      </nav>

      {/* HERO */}
      <section className="cam-hero">
        <div className="cam-hero-bg"></div>
        <div className="cam-hero-inner">
          <div className="cam-hero-overline">
            <div className="cam-hero-overline-line"></div>
            <span>Corporate Services</span>
            <div className="cam-hero-overline-line"></div>
          </div>
          <h1 className="cam-hero-h1">
            Company <em>Amendments</em><br />& Restructuring
          </h1>
          <p className="cam-hero-sub">
            Shareholder changes, director appointments, activity expansions, and complex restructuring across all UAE free zones and mainland — executed with precision regardless of complexity or timeline.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="cam-intro">
        <div className="cam-intro-inner">
          <div className="cam-intro-grid">
            <div className="cam-intro-left">
              <h2>Why Work With Us for <em>Amendments?</em></h2>
              <p>
                Corporate amendments in the UAE require precise documentation, authority knowledge, and follow-through. A rejected submission means lost time and re-work. We have processed thousands of amendments across all UAE jurisdictions — we know what each authority requires and how to get it right the first time.
              </p>
            </div>
            <div className="cam-intro-right">
              <div className="cam-intro-stat">
                <div className="cam-intro-stat-num">3,200+</div>
                <div className="cam-intro-stat-label">Amendments Processed</div>
              </div>
              <div className="cam-intro-stat">
                <div className="cam-intro-stat-num">All</div>
                <div className="cam-intro-stat-label">UAE Free Zones & Mainland Covered</div>
              </div>
              <div className="cam-intro-stat">
                <div className="cam-intro-stat-num">3–7</div>
                <div className="cam-intro-stat-label">Working Days — Standard Amendments</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AMENDMENT TYPES */}
      <section className="cam-types">
        <div className="cam-types-inner">
          <div className="cam-types-header">
            <h2>Amendment <em>Types</em> We Handle</h2>
            <p>
              From a simple trade name change to a complex cross-border restructuring — we manage every type of corporate amendment in the UAE.
            </p>
          </div>
          <div className="cam-types-grid">
            {AMENDMENT_TYPES.map((type) => (
              <div key={type.num} className="cam-type-card">
                <div className="cam-type-card-num">{type.num}</div>
                <h3 className="cam-type-card-title">{type.name}</h3>
                <p className="cam-type-card-desc">{type.desc}</p>
                <div className="cam-type-card-features">
                  {type.features.map((feature, i) => (
                    <div key={i} className="cam-type-card-feature">{feature}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="cam-process">
        <div className="cam-process-inner">
          <div className="cam-process-header">
            <h2>The <em>Amendment</em> Process</h2>
            <p>
              A clear 4-step process from initial review to updated documents in hand.
            </p>
          </div>
          <div className="cam-process-steps">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="cam-process-step">
                <div className="cam-process-step-num">{step.num}</div>
                <div className="cam-process-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  <div className="cam-process-step-details">
                    {step.tags.map((tag, i) => (
                      <span key={i} className="cam-process-step-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="cam-benefits">
        <div className="cam-benefits-inner">
          <div className="cam-benefits-header">
            <h2>Why Choose <em>Incozone</em></h2>
          </div>
          <div className="cam-benefits-grid">
            {BENEFITS.map((benefit, i) => (
              <div key={i} className="cam-benefit-card">
                <div className="cam-benefit-card-icon">{benefit.icon}</div>
                <h3 className="cam-benefit-card-title">{benefit.title}</h3>
                <p className="cam-benefit-card-desc">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cam-cta">
        <div className="cam-cta-inner">
          <h2 className="cam-cta-h2">
            Need to Amend Your <em>UAE Company?</em>
          </h2>
          <p className="cam-cta-p">
            Tell us what needs to change. We'll assess the requirements, prepare all documents, and handle the authority submission — so you can focus on running your business.
          </p>
          <button className="cam-cta-btn" onClick={() => onNavigate("schedule")}>
            Schedule Free Consultation
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="cam-footer">
        <div className="cam-footer-inner">
          <div className="cam-footer-grid">
            <div className="cam-footer-col">
              <h4>INCOZONE</h4>
              <p>Your trusted partner for UAE business setup and corporate services.</p>
            </div>
            <div className="cam-footer-col">
              <h4>Services</h4>
              <ul>
                <li><a onClick={() => onNavigate("services")}>All Services</a></li>
                <li><a onClick={() => onNavigate("freezoneincorp")}>Free Zone Setup</a></li>
                <li><a onClick={() => onNavigate("mainland")}>Mainland Setup</a></li>
              </ul>
            </div>
            <div className="cam-footer-col">
              <h4>Company</h4>
              <ul>
                <li><a onClick={() => onNavigate("about")}>About Us</a></li>
                <li><a onClick={() => onNavigate("blog")}>Blog</a></li>
                <li><a onClick={() => onNavigate("contact")}>Contact</a></li>
              </ul>
            </div>
            <div className="cam-footer-col">
              <h4>Contact</h4>
              <p>Email: info@incozone.ae</p>
              <p>Phone: +971 4 XXX XXXX</p>
            </div>
          </div>
          <div className="cam-footer-bottom">
            © 2024 Incozone. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
