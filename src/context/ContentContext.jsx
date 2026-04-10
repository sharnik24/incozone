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

const ContentContext = createContext({ content: DEFAULT, blogPosts: [], loading: false });

export function ContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    // Fetch the static content.json file served from /public/
    fetch(`/content.json?v=${Date.now()}`)
      .then(r => r.json())
      .then(d => {
        setContent({
          global:       { ...DEFAULT.global,       ...(d.global       || {}) },
          hero:         { ...DEFAULT.hero,         ...(d.hero         || {}) },
          expertise:    d.expertise    || DEFAULT.expertise,
          why: {
            ...DEFAULT.why,
            ...(d.why || {}),
            pillars: d.why?.pillars || DEFAULT.why.pillars,
            stats:   d.why?.stats   || DEFAULT.why.stats,
          },
          testimonials: d.testimonials || DEFAULT.testimonials,
          cta:          { ...DEFAULT.cta,   ...(d.cta   || {}) },
          footer:       { ...DEFAULT.footer, ...(d.footer || {}) },
        });
        if (d.blog?.length > 0) {
          setBlogPosts(d.blog.filter(p => p.status === "published"));
        }
      })
      .catch(() => {}); // silently use defaults if fetch fails
  }, []);

  return (
    <ContentContext.Provider value={{ content, blogPosts, loading: false }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => useContext(ContentContext);
