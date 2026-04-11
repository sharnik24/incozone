// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Content Context
//  Reads site content from /public/content.json (static file).
//  Admin panel updates this file via GitHub API → Vercel redeploys.
// ═══════════════════════════════════════════════════════════════
import { createContext, useContext, useState, useEffect } from "react";

export const DEFAULT = {
  global: {
    siteName: "INCOZONE",
    tagline: "Private UAE Incorporation Advisory",
    phone: "+971 56 583 4586",
    whatsapp: "+971 56 583 4586",
    email: "info@essenceuae.com",
    address: "Office 15, Iris Bay Tower, Business Bay, Dubai, UAE",
    founded: "2012",
    companiesCount: "3,200+",
    nationalitiesCount: "68+",
    yearsExperience: "12",
    rating: "4.9",
    ratingCount: "400+",
  },
  hero: {
    eyebrow: "Private UAE Incorporation Advisory",
    headline: "Ready To Setup Your Business In UAE",
    headlineItalic: "In UAE",
    subline: "Free Zone · Mainland · PRO Services · Corporate Structuring",
    ctaPrimary: "Schedule Private Consultation",
    ctaSecondary: "Explore Free Zones ↓",
  },
  expertise: [
    { num: "01", title: "Free Zone Incorporation", desc: "Strategic establishment within UAE's premier free zones — DMCC, IFZA, Meydan, SHAMS, and beyond. Full licensing, visa, and banking facilitation.", link: "services" },
    { num: "02", title: "Mainland Company Formation", desc: "End-to-end mainland LLC and professional license setup. Government liaison, DED approvals, and local sponsor management handled discreetly.", link: "mainland" },
    { num: "03", title: "Corporate & PRO Advisory", desc: "Amendments, share transfers, visa processing, and complete government service management through dedicated relationship managers.", link: "pro" },
  ],
  why: {
    label: "Why INCOZONE",
    headline: "The Advisory Standard UAE Business Demands",
    orbLabel: "Established",
    orbNum: "3,200+",
    orbSub: "Companies Incorporated",
    pillars: [
      { tag: "Strategy First",   title: "Strategic Advisory Approach",    desc: "We assess your business model first — structure follows strategy, never the reverse. Zone selection is a consequence of clarity, not guesswork." },
      { tag: "Authority Access", title: "Government Liaison Experts",     desc: "Deep relationships across UAE free zone authorities, DED, GDRFA, and MOFA ensure frictionless approvals and direct officer access." },
      { tag: "Zero Surprises",   title: "Transparent Structuring",        desc: "Clear timelines, documented processes, and zero hidden fees. Every cost is disclosed before you commit to a single dirham." },
      { tag: "Always On",        title: "Dedicated Relationship Manager", desc: "One point of contact for every interaction — proactive, accountable, and available. Your RM knows your company as well as you do." },
    ],
    stats: [
      { num: "68+",  label: "Nationalities Served" },
      { num: "12yr", label: "UAE Experience" },
      { num: "4.9",  label: "Client Rating" },
    ],
  },
  testimonials: [
    { text: "INCOZONE handled our DMCC setup with remarkable discretion and precision. From licensing to banking — flawless execution.", name: "Rashid Al-Mansoori", role: "Managing Director, Trade Group", rating: 5 },
    { text: "Their mainland structuring advisory saved us months of back and forth. Professional, knowledgeable, and deeply connected.", name: "Alexandra V.", role: "Founder, European Holdings", rating: 5 },
    { text: "The team understood our offshore requirements instantly. The level of service matches what we'd expect from a private law firm.", name: "James W.", role: "CEO, Family Office", rating: 5 },
  ],
  cta: {
    label: "Begin Your Journey",
    headline: "Begin Your UAE Incorporation Strategy.",
    headlineItalic: "Incorporation Strategy.",
    body: "Private consultation. Structured approach. Measurable results.",
    ctaPrimary: "Schedule Private Consultation",
    ctaSecondary: "Download Setup Guide",
  },
  footer: {
    tagline: "UAE's premier private advisory firm for business incorporation, corporate structuring, and government liaison services.",
    copyright: "© 2026 INCOZONE. All rights reserved.",
    location: "Dubai, United Arab Emirates",
  },
  blog: [],
};

const DEFAULT_ABOUT = {
  heroEyebrow: "About INCOZONE",
  heroDesc: "12 years. 3,200+ companies. 68 nationalities.",
  manifesto: '"We believe the quality of your UAE structure determines the quality of your UAE future."',
  storyLeft: "INCOZONE was founded in 2012 in Business Bay, Dubai.",
  storyRight1: "Today, INCOZONE manages over 3,200 active corporate entities.",
  storyRight2: "Our team includes former free zone licensing officers and corporate lawyers.",
  pullQuote: "Structure is a permanent decision. The right advisor makes it once.",
  pullQuoteCite: "— Chirag Mahyavansi, Managing Director",
  stats: [
    { val: "3200", sup: "+",  label: "Companies Incorporated", desc: "" },
    { val: "12",   sup: "yr", label: "Years of UAE Expertise",  desc: "" },
    { val: "96",   sup: "%",  label: "Client Retention Rate",   desc: "" },
    { val: "68",   sup: "+",  label: "Nationalities Served",    desc: "" },
  ],
  pillars: [
    { num: "01", title: "Strategic Advisors", body: "We never recommend a structure before understanding your business model." },
    { num: "02", title: "Authority Insiders", body: "12 years of direct working relationships with licensing officers." },
    { num: "03", title: "Lifetime Partners",  body: "Our 96% client retention rate reflects how we treat every incorporation." },
  ],
  team: [
    { initial: "R", name: "Chirag Mahyavansi",   role: "Managing Director",        bio: "Leads INCOZONE's advisory practice with 12 years of experience.", exp: "12yr UAE",      imageUrl: "" },
    { initial: "A", name: "Tushar Rathod",        role: "Business Setup Consultant",bio: "Specialist in UAE free zone incorporation across all 8 major zones.", exp: "2yr Advisory",   imageUrl: "" },
    { initial: "K", name: "Aakash Palgamkar",     role: "Accountant",               bio: "Manages corporate financial compliance, bookkeeping, and VAT registration.", exp: "2yr Accounting", imageUrl: "" },
    { initial: "S", name: "Dharmesh Mahyavanshi", role: "Accounting Head",          bio: "Heads INCOZONE's accounting and financial compliance practice.", exp: "10yr Accounting", imageUrl: "" },
  ],
  values: [
    { title: "Strategy before structure.", body: "Most advisory firms start with the license. We start with the question: what are you actually trying to build?" },
    { title: "Transparency as default.",   body: "We publish our fees and disclose government charges before you commit." },
    { title: "Relationships over transactions.", body: "The UAE is a relationship economy. Our 12-year tenure gives clients direct access." },
    { title: "Precision in every document.", body: "An incorrectly drafted Board Resolution can be the difference between approval and rejection." },
  ],
  timeline: [
    { year: "2012", title: "Founded in Dubai",           desc: "INCOZONE established in Business Bay, Dubai." },
    { year: "2014", title: "First DMCC Accreditation",   desc: "Became an officially accredited DMCC formation partner." },
    { year: "2016", title: "PRO Division Launched",      desc: "Established a dedicated government liaison team." },
    { year: "2018", title: "1,000 Companies Milestone",  desc: "Surpassed 1,000 incorporated companies." },
    { year: "2021", title: "ADGM & Financial Services",  desc: "Expanded into regulated financial services incorporation." },
    { year: "2024", title: "3,200+ Companies & Growing", desc: "UAE's most trusted private incorporation advisory." },
  ],
};

const ContentContext = createContext({ content: DEFAULT, about: DEFAULT_ABOUT, blogPosts: [], loading: false });

export function ContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT);
  const [about, setAbout]     = useState(DEFAULT_ABOUT);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    fetch(`/content.json?v=${Date.now()}`)
      .then(r => r.json())
      .then(d => {
        setContent({
          global:       { ...DEFAULT.global,  ...(d.global || {}) },
          hero:         { ...DEFAULT.hero,    ...(d.hero   || {}) },
          expertise:    d.expertise    || DEFAULT.expertise,
          why: { ...DEFAULT.why, ...(d.why || {}), pillars: d.why?.pillars || DEFAULT.why.pillars, stats: d.why?.stats || DEFAULT.why.stats },
          testimonials: d.testimonials || DEFAULT.testimonials,
          cta:          { ...DEFAULT.cta,    ...(d.cta    || {}) },
          footer:       { ...DEFAULT.footer, ...(d.footer || {}) },
        });
        if (d.about) {
          setAbout({
            ...DEFAULT_ABOUT,
            ...d.about,
            stats:    d.about.stats    || DEFAULT_ABOUT.stats,
            pillars:  d.about.pillars  || DEFAULT_ABOUT.pillars,
            team:     d.about.team     || DEFAULT_ABOUT.team,
            values:   d.about.values   || DEFAULT_ABOUT.values,
            timeline: d.about.timeline || DEFAULT_ABOUT.timeline,
          });
        }
        if (d.blog?.length > 0) {
          setBlogPosts(d.blog.filter(p => p.status === "published"));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <ContentContext.Provider value={{ content, about, blogPosts, loading: false }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
