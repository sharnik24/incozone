import { useState, useEffect, useRef } from "react";
import { IGrid, IMessageSquare, ICalendar, IGlobe, IHome, IBriefcase, IUsers, IPhone, IClock, IBuilding, IBookOpen, IIdCard, ICreditCard, IShield } from "../icons";

// ── GitHub repo details ────────────────────────────────────────
const GH_REPO  = "sharnik24/incozone";
const GH_FILE  = "public/content.json";
const GH_API   = `https://api.github.com/repos/${GH_REPO}/contents/${GH_FILE}`;
const GH_ISSUE = `https://api.github.com/repos/${GH_REPO}/issues`;

// ── Private CRM repo for enquiries & consultations ────────────
const CRM_REPO = "sharnik24/incozone-crm";

// Retrieve stored GitHub token (set on first login)
const getToken = () => sessionStorage.getItem("gh_token") || "";

// Save content.json via server-side API → triggers Vercel redeploy
// Token is in Vercel env var GITHUB_TOKEN — no browser token needed
async function pushContent(contentObj) {
  const res = await fetch("/api/save-content", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contentObj),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || "Save failed: " + res.status);
}

// Compress + resize image client-side before upload.
// Vercel serverless functions have a 4.5 MB body limit.
// A raw photo can be 3-8 MB; canvas resize brings it under 1 MB.
async function compressImage(file) {
  const MAX_PX   = 1400;  // max width or height
  const QUALITY  = 0.88;  // JPEG quality

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = reject;
    img.onload  = () => {
      let { width, height } = img;
      if (width > MAX_PX || height > MAX_PX) {
        if (width >= height) { height = Math.round(height * MAX_PX / width); width = MAX_PX; }
        else                 { width  = Math.round(width  * MAX_PX / height); height = MAX_PX; }
      }
      const canvas = document.createElement("canvas");
      canvas.width  = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL("image/jpeg", QUALITY);
      resolve(dataUrl.split(",")[1]); // return base64 only
    };
    img.src = URL.createObjectURL(file);
  });
}

// Upload an image via server-side API → public/images/cms/
// Always compresses first so we stay under Vercel's 4.5 MB body limit.
async function uploadImage(file) {
  const fname  = `${Date.now()}.jpg`; // always JPEG after compression
  const base64 = await compressImage(file);
  const res = await fetch("/api/upload-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename: fname, content: base64 }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || `Upload failed (${res.status})`);
  return json.path || `https://raw.githubusercontent.com/sharnik24/incozone/main/public/images/cms/${fname}`;
}

// Push CRM data (enquiries.json or consultations.json) to private GitHub CRM repo
async function pushCRM(filename, dataArr) {
  const token = getToken();
  if (!token) return;
  const url = `https://api.github.com/repos/${CRM_REPO}/contents/${filename}`;
  const headers = { Authorization: `token ${token}`, Accept: "application/vnd.github.v3+json", "Content-Type": "application/json" };

  const info = await fetch(url, { headers }).then(r => r.ok ? r.json() : null);
  const sha  = info?.sha;
  const body = JSON.stringify(dataArr, null, 2);
  const encoded = btoa(unescape(encodeURIComponent(body)));

  await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify({ message: `CRM: update ${filename}`, content: encoded, ...(sha && { sha }) }),
  }).catch(() => {});
}

// Fetch CRM data from private GitHub repo into admin state
async function loadCRMData(token, setData) {
  const headers = { Authorization: `token ${token}`, Accept: "application/vnd.github.v3+json" };
  for (const [file, key] of [["enquiries.json","enquiries"],["consultations.json","consultations"]]) {
    try {
      const res = await fetch(`https://api.github.com/repos/${CRM_REPO}/contents/${file}`, { headers });
      if (res.ok) {
        const json = await res.json();
        const parsed = JSON.parse(atob(json.content.replace(/\n/g, "")));
        setData(p => ({ ...p, [key]: parsed }));
      }
    } catch (_) {}
  }
}

// Create a GitHub Issue for contact enquiries
async function createIssue(form) {
  const token = getToken();
  if (!token) return;
  const body = Object.entries(form).map(([k,v]) => `**${k}:** ${v}`).join("\n");
  await fetch(GH_ISSUE, {
    method: "POST",
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: `Enquiry: ${form.name} — ${form.service}`, body, labels: ["enquiry"] }),
  }).catch(() => {});
}

// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Admin CMS  (v2 — Complete)
//  src/pages/Admin.jsx
//  Access: goPage("admin") or triple-click footer copyright
//  Password: change ADMIN_PASS
// ═══════════════════════════════════════════════════════════════
const ADMIN_PASS = "incozone2026";

// ─────────────────────────────────────────────────────────────
//  DEFAULT SITE DATA  ─ mirrors every editable element on site
// ─────────────────────────────────────────────────────────────
const DEFAULT = {

  // ── GLOBAL ──────────────────────────────────────────────────
  global: {
    siteName: "INCOZONE",
    tagline: "Private UAE Incorporation Advisory",
    phone: "+971 4 XXX XXXX",
    whatsapp: "+971 XX XXX XXXX",
    email: "advisory@incozone.ae",
    address: "Office 15, Iris Bay Tower, Business Bay, Dubai, UAE",
    mapLink: "https://maps.google.com",
    officeHoursSun: "9:00 – 18:00",
    officeHoursSat: "10:00 – 14:00",
    founded: "2012",
    companiesCount: "3,200+",
    nationalitiesCount: "68+",
    yearsExperience: "12",
    rating: "4.9",
    ratingCount: "400+",
    linkedIn: "#",
    twitter: "#",
    instagram: "#",
  },

  // ── HOME — HERO ──────────────────────────────────────────────
  hero: {
    eyebrow: "Private UAE Incorporation Advisory",
    headline: "Establish Your Presence in the UAE with Strategic Precision.",
    headlineItalic: "Strategic Precision.",
    subline: "Free Zone · Mainland · PRO Services · Corporate Structuring",
    ctaPrimary: "Schedule Private Consultation",
    ctaSecondary: "Explore Free Zones ↓",
  },

  // ── HOME — EXPERTISE CARDS ───────────────────────────────────
  expertise: [
    { num: "01", title: "Free Zone Incorporation", desc: "Strategic establishment within UAE's premier free zones — DMCC, IFZA, Meydan, SHAMS, and beyond. Full licensing, visa, and banking facilitation.", link: "services" },
    { num: "02", title: "Mainland Company Formation", desc: "End-to-end mainland LLC and professional license setup. Government liaison, DED approvals, and local sponsor management handled discreetly.", link: "mainland" },
    { num: "03", title: "Corporate & PRO Advisory", desc: "Amendments, share transfers, visa processing, and complete government service management through dedicated relationship managers.", link: "pro" },
  ],

  // ── HOME — WHY SECTION ───────────────────────────────────────
  why: {
    label: "Why INCOZONE",
    headline: "The Advisory Standard UAE Business Demands",
    orbLabel: "Established",
    orbNum: "3,200+",
    orbSub: "Companies Incorporated",
    pillars: [
      { tag: "Strategy First",  title: "Strategic Advisory Approach",      desc: "We assess your business model first — structure follows strategy, never the reverse. Zone selection is a consequence of clarity, not guesswork." },
      { tag: "Authority Access",title: "Government Liaison Experts",        desc: "Deep relationships across UAE free zone authorities, DED, GDRFA, and MOFA ensure frictionless approvals and direct officer access." },
      { tag: "Zero Surprises",  title: "Transparent Structuring",           desc: "Clear timelines, documented processes, and zero hidden fees. Every cost is disclosed before you commit to a single dirham." },
      { tag: "Always On",       title: "Dedicated Relationship Manager",    desc: "One point of contact for every interaction — proactive, accountable, and available. Your RM knows your company as well as you do." },
    ],
    stats: [
      { num: "68+",  label: "Nationalities Served" },
      { num: "12yr", label: "UAE Experience" },
      { num: "4.9", label: "Client Rating" },
    ],
  },

  // ── HOME — TESTIMONIALS ──────────────────────────────────────
  testimonials: [
    { text: "INCOZONE handled our DMCC setup with remarkable discretion and precision. From licensing to banking — flawless execution.", name: "Rashid Al-Mansoori", role: "Managing Director, Trade Group", rating: 5 },
    { text: "Their mainland structuring advisory saved us months of back and forth. Professional, knowledgeable, and deeply connected.", name: "Alexandra V.",          role: "Founder, European Holdings",  rating: 5 },
    { text: "The team understood our offshore requirements instantly. The level of service matches what we'd expect from a private law firm.", name: "James W.",         role: "CEO, Family Office",          rating: 5 },
  ],

  // ── HOME — CTA STRIP ────────────────────────────────────────
  cta: {
    label: "Begin Your Journey",
    headline: "Begin Your UAE Incorporation Strategy.",
    headlineItalic: "Incorporation Strategy.",
    body: "Private consultation. Structured approach. Measurable results.",
    ctaPrimary: "Schedule Private Consultation",
    ctaSecondary: "Download Setup Guide",
  },

  // ── HOME — FOOTER ────────────────────────────────────────────
  footer: {
    tagline: "UAE's premier private advisory firm for business incorporation, corporate structuring, and government liaison services.",
    copyright: "© 2026 INCOZONE. All rights reserved.",
    location: "Dubai, United Arab Emirates",
  },

  // ── FREE ZONES ───────────────────────────────────────────────
  zones: [
    { id: "dmcc",   name: "DMCC",   full: "Dubai Multi Commodities Centre",    category: "trade",      badgeLabel: "World #1 Free Zone",      desc: "The world's largest free zone by member count. Unmatched prestige, institutional banking relationships, and commodity trading infrastructure.", location: "JLT, Dubai",             setupFrom: "AED 18,500", visaQuota: "Up to 6 visas",  setupDays: "7–14",  minCapital: "AED 50,000 nominal", color: "#C9A84C" },
    { id: "ifza",   name: "IFZA",   full: "International Free Zone Authority",  category: "free",       badgeLabel: "Best Value",              desc: "Dubai's fastest-growing free zone. Highly competitive pricing with genuine institutional infrastructure and rapid setup timelines.",           location: "Dubai Silicon Oasis",    setupFrom: "AED 12,900", visaQuota: "Up to 5 visas",  setupDays: "5–10",  minCapital: "None",               color: "#4CAEC9" },
    { id: "meydan", name: "Meydan", full: "Meydan Free Zone",                   category: "free",       badgeLabel: "Premium Location",        desc: "Premium free zone in the heart of Dubai's most iconic district. Ideal for consultancies, tech firms, and lifestyle brands.",                  location: "Meydan, Dubai",          setupFrom: "AED 14,500", visaQuota: "Up to 3 visas",  setupDays: "5–10",  minCapital: "None",               color: "#9a75e8" },
    { id: "rakez",  name: "RAKEZ",  full: "Ras Al Khaimah Economic Zone",       category: "industrial", badgeLabel: "Industrial & Commercial", desc: "Northern Emirates' most competitive zone. Ideal for manufacturing, trading, and industrial operations at consistently low cost.",               location: "Ras Al Khaimah",         setupFrom: "AED 8,500",  visaQuota: "Up to 10 visas", setupDays: "3–7",   minCapital: "None",               color: "#48bb78" },
    { id: "shams",  name: "SHAMS",  full: "Sharjah Media City",                 category: "media",      badgeLabel: "Media & Creative",        desc: "UAE's leading media-focused free zone. Designed for content creators, media companies, and consultancies seeking Sharjah presence.",          location: "Sharjah, UAE",           setupFrom: "AED 11,500", visaQuota: "Up to 6 visas",  setupDays: "5–8",   minCapital: "None",               color: "#9a75e8" },
    { id: "jafza",  name: "JAFZA",  full: "Jebel Ali Free Zone Authority",      category: "trade",      badgeLabel: "Logistics & Trade",       desc: "The world's largest free zone by area. Unmatched for logistics, import/export, and large-scale trade and warehousing operations.",            location: "Jebel Ali, Dubai",       setupFrom: "AED 22,000", visaQuota: "Up to 15 visas", setupDays: "7–14",  minCapital: "None",               color: "#C9A84C" },
    { id: "ajman",  name: "AFZ",    full: "Ajman Free Zone",                    category: "free",       badgeLabel: "Budget Friendly",         desc: "UAE's most affordable free zone option. Perfect for startups, freelancers, and cost-conscious entrepreneurs entering the market.",              location: "Ajman, UAE",             setupFrom: "AED 5,500",  visaQuota: "Up to 6 visas",  setupDays: "2–5",   minCapital: "None",               color: "#48bb78" },
    { id: "adgm",   name: "ADGM",   full: "Abu Dhabi Global Market",            category: "financial",  badgeLabel: "Financial Hub",           desc: "Abu Dhabi's world-class international financial centre. Premier destination for financial services, funds, fintech, and HNW structures.",     location: "Al Maryah Island, AD",   setupFrom: "AED 28,500", visaQuota: "Up to 5 visas",  setupDays: "10–21", minCapital: "USD 1,000",          color: "#C9A84C" },
  ],

  // ── SERVICES PAGE ────────────────────────────────────────────
  services: {
    heroLabel: "What We Do",
    heroHeadline: "Structured Advisory. Measurable Results.",
    heroBody: "Six core service lines. One integrated advisory relationship.",
    services: [
      { num: "01", title: "Free Zone Company Formation",  price: "From AED 4,500", duration: "5–14 days",  desc: "End-to-end free zone incorporation across all UAE jurisdictions. License selection, authority submission, visa quota, and banking introduction." },
      { num: "02", title: "Mainland Company Formation",   price: "From AED 6,800", duration: "10–21 days", desc: "DED-licensed mainland LLC, professional license, or branch registration. Sponsor management, tenancy contracting, and chamber registration." },
      { num: "03", title: "Corporate & PRO Advisory",     price: "From AED 3,500", duration: "Ongoing",    desc: "Government liaison, visa processing, trade license renewals, share transfers, and complete regulatory compliance management." },
      { num: "04", title: "UAE Investor Visa",            price: "From AED 3,200", duration: "14–21 days", desc: "Residency visa processing for company owners, shareholders, and family members. Golden Visa assessment and submission." },
      { num: "05", title: "Corporate Banking Setup",      price: "From AED 2,500", duration: "4–8 weeks",  desc: "UAE business bank account opening strategy, documentation preparation, and relationship-managed bank introductions." },
      { num: "06", title: "Company Amendments",           price: "From AED 1,800", duration: "5–10 days",  desc: "Share transfers, director changes, activity additions, trade name amendments, and corporate restructuring facilitation." },
    ],
  },

  // ── ABOUT PAGE ───────────────────────────────────────────────
  about: {
    heroEyebrow: "About INCOZONE",
    heroDesc: "12 years. 3,200+ companies. 68 nationalities. INCOZONE is not a document-processing firm. We are strategic advisors who built the most technically rigorous UAE business formation practice in the market.",
    manifesto: '"We believe the quality of your UAE structure determines the quality of your UAE future." · Strategy First · Zero Surprises · Lifetime Partnership',
    storyLeft: "INCOZONE was founded in 2012 in Business Bay, Dubai, with a conviction that the UAE business formation market was fundamentally broken. Not in its mechanics — UAE free zones are world-class — but in how advisory firms were operating within it. Most were charging premium fees for commodity services: collecting documents, submitting applications, and calling it \"advisory.\" We built something different.",
    storyRight1: "Today, INCOZONE manages over 3,200 active corporate entities across UAE free zones and mainland — representing founders from 68 nationalities, from solo entrepreneurs setting up their first trading license to family offices structuring multi-jurisdiction holding arrangements.",
    storyRight2: "Our team includes former free zone licensing officers, ex-bank relationship managers, UAE national PRO specialists, and corporate lawyers — giving clients a depth of institutional knowledge that no single-discipline firm can replicate.",
    pullQuote: "Structure is a permanent decision. The right advisor makes it once. The wrong one makes it again and again.",
    pullQuoteCite: "— Chirag Mahyavansi, Managing Director",
    stats: [
      { val: "3200", sup: "+",  label: "Companies Incorporated", desc: "Across all UAE free zones and mainland, spanning 68 nationalities." },
      { val: "12",   sup: "yr", label: "Years of UAE Expertise",  desc: "Founded 2012. Every authority relationship built over a decade." },
      { val: "96",   sup: "%",  label: "Client Retention Rate",   desc: "The most honest metric we have. Our clients stay." },
      { val: "68",   sup: "+",  label: "Nationalities Served",    desc: "From European family offices to Asian trading houses." },
    ],
    pillars: [
      { num: "01", title: "Strategic Advisors", body: "We never recommend a structure before understanding your business model, your shareholders, and your long-term commercial intent. Zone selection and structure are outputs of strategy — never defaults." },
      { num: "02", title: "Authority Insiders", body: "12 years of direct working relationships with licensing officers, visa section staff, and compliance teams across all UAE free zone authorities means your application moves at a different speed." },
      { num: "03", title: "Lifetime Partners",  body: "Our 96% client retention rate is not a marketing claim. It reflects what happens when a firm treats every incorporation as the beginning of a relationship, not the completion of a transaction." },
    ],
    team: [
      { initial: "R", name: "Chirag Mahyavansi",   role: "Managing Director",        bio: "Leads INCOZONE's advisory practice with 12 years of experience guiding high-net-worth individuals, family offices, and institutional investors through UAE market entry and corporate structuring.", exp: "12yr UAE",      imageUrl: "" },
      { initial: "A", name: "Tushar Rathod",        role: "Business Setup Consultant", bio: "Specialist in UAE free zone incorporation across all 8 major zones. Advises founders and SMEs on optimal zone selection, licensing strategy, and end-to-end company formation.", exp: "2yr Advisory",   imageUrl: "" },
      { initial: "K", name: "Aakash Palgamkar",    role: "Accountant",                bio: "Manages corporate financial compliance, bookkeeping, VAT registration, and financial reporting for INCOZONE clients across free zone and mainland structures.", exp: "2yr Accounting", imageUrl: "" },
      { initial: "S", name: "Dharmesh Mahyavanshi", role: "Accounting Head",           bio: "Heads INCOZONE's accounting and financial compliance practice. Oversees corporate financial structuring, VAT compliance, and financial reporting for high-value clients.", exp: "10yr Accounting", imageUrl: "" },
    ],
    values: [
      { title: "Strategy before structure.", body: "Most advisory firms start with the license. We start with the question: what are you actually trying to build? Structure follows strategy. Every recommendation is derived from a clear understanding of your business." },
      { title: "Transparency as default.",   body: "We publish our fees. We disclose government charges before you commit. We tell you when a structure won't serve your interests — even if it costs us the engagement." },
      { title: "Relationships over transactions.", body: "The UAE is a relationship economy. Our 12-year tenure means we have direct contact relationships with licensing officers, visa section heads, and compliance teams at every major authority. That access is your advantage." },
      { title: "Precision in every document.", body: "An incorrectly drafted Board Resolution. A missing UBO declaration. An activity mismatch in a license application. These are not minor administrative oversights — they are the difference between approval and rejection." },
    ],
    timeline: [
      { year: "2012", title: "Founded in Dubai",           desc: "INCOZONE established in Business Bay, Dubai — with a single mandate: build the most technically rigorous business advisory firm in the UAE." },
      { year: "2014", title: "First DMCC Accreditation",   desc: "Became an officially accredited DMCC formation partner — our first free zone authority relationship, and the beginning of a network that now spans 8 zones." },
      { year: "2016", title: "PRO Division Launched",      desc: "Established a dedicated government liaison team after identifying that ongoing compliance — not initial setup — was where clients suffered most." },
      { year: "2018", title: "1,000 Companies Milestone",  desc: "Surpassed 1,000 incorporated companies across UAE free zones and mainland — representing clients from 40+ nationalities." },
      { year: "2021", title: "ADGM & Financial Services",  desc: "Expanded into regulated financial services incorporation, becoming one of the first non-law-firm advisors with direct FSRA working relationships." },
      { year: "2024", title: "3,200+ Companies & Growing", desc: "Today INCOZONE is the UAE's most trusted private incorporation advisory — 3,200+ companies, 68 nationalities, 96% client retention." },
    ],
  },

  // ── CONTACT PAGE ────────────────────────────────────────────
  contact: {
    heroLabel: "Get in Touch",
    heroHeadline: "Let's build your UAE structure together.",
    heroBody: "Tell us about your business and we'll match you to the right zone, license type, and structure — with full cost transparency before you commit to anything.",
    officeLabel: "Head Office",
    officeName: "Business Bay, Dubai, UAE",
    faqItems: [
      { q: "How long does a typical UAE company formation take?",   a: "Free zone formations typically take 5–14 business days. RAKEZ and AFZ can complete in 3–5 days. DMCC and ADGM require 10–14 days. Visa processing adds 14–21 days." },
      { q: "Do I need to be present in the UAE?",                   a: "No. Most clients complete formation entirely remotely. Visa applications and Emirates ID collection do require a UAE visit — we manage all scheduling." },
      { q: "What is the minimum capital requirement?",              a: "Most free zone entities have no minimum paid-up capital. DMCC requires AED 50,000 nominal share capital. Mainland entities have sector-specific requirements." },
      { q: "Can I open a UAE bank account as a non-resident?",      a: "Yes. Non-residents holding a UAE trade license can open business accounts. Physical presence at the bank is typically required — we arrange all introductions." },
      { q: "How do I know which free zone is right for me?",        a: "Our initial consultation maps your activity, customers, visa requirements, and budget to 2–3 structured zone recommendations with clear trade-offs explained." },
    ],
  },

  // ── SCHEDULE PAGE ────────────────────────────────────────────
  schedule: {
    heroLabel: "Private Advisory",
    heroHeadline: "Schedule a Consultation",
    heroBody: "A focused 30 or 60-minute session with a senior INCOZONE advisor. We'll map your business to the right UAE structure.",
    services: [
      { id: "freezone",  icon: IBuilding, name: "Free Zone Formation",    desc: "Company setup in DMCC, IFZA, ADGM, JAFZA, SHAMS, or any UAE free zone." },
      { id: "mainland",  icon: IGlobe, name: "Mainland Formation",    desc: "DED-licensed mainland company with 100% foreign ownership." },
      { id: "pro",       icon: IShield, name: "PRO & Compliance",        desc: "Visa processing, license renewals, government liaison, amendments." },
      { id: "banking",   icon: ICreditCard, name: "Corporate Banking",       desc: "UAE business bank account opening — strategy, preparation, submission." },
      { id: "visa",      icon: IIdCard, name: "Investor / Golden Visa",  desc: "UAE residency visa for investors, business owners, and family members." },
      { id: "advisory",  icon: "", name: "General Advisory",        desc: "Structuring, tax position, UBO compliance, or any UAE corporate matter." },
    ],
  },

  // ── BLOG POSTS ───────────────────────────────────────────────
  blog: [
    { id: 1, cat: "Free Zone Guide",      title: "Why DMCC Remains the UAE's Most Coveted Business Address",              excerpt: "Despite cheaper alternatives, DMCC continues to command a premium — and for institutional founders, the reasons run deeper than prestige.",          author: "Rashid Al-Mansoori", date: "March 8, 2026",    status: "published", featured: true },
    { id: 2, cat: "Market Intelligence",  title: "UAE Corporate Tax: What Every Free Zone Company Must Know Before 2026", excerpt: "The 9% corporate tax regime has clarified — and for many free zone businesses, the path to QFZP status is more navigable than initially feared.",  author: "Alexandra Voss",     date: "March 5, 2026",    status: "published", featured: false },
    { id: 3, cat: "Incorporation Guide",  title: "The Mainland vs Free Zone Decision: A Framework for 2026",              excerpt: "After the 2021 commercial companies law reforms, the calculus for UAE mainland formation changed fundamentally.",                                  author: "Khalid Ibrahim",     date: "March 1, 2026",    status: "published", featured: false },
    { id: 4, cat: "Banking & Finance",    title: "UAE Business Banking in 2026: What Has Changed and What Hasn't",        excerpt: "Opening a UAE business bank account remains the most friction-heavy part of the formation process — but the landscape is shifting.",             author: "Sarah Chen",         date: "Feb 26, 2026",     status: "published", featured: false },
    { id: 5, cat: "Visa & Residency",     title: "UAE Golden Visa for Investors: The 2026 Complete Guide",                excerpt: "The expanded Golden Visa programme now covers a wider range of investor and entrepreneur profiles than its original 2019 inception.",              author: "Rashid Al-Mansoori", date: "Feb 20, 2026",     status: "published", featured: false },
  ],

  // ── ENQUIRIES (from Contact form) ────────────────────────────
  enquiries: [
    { id: 1, name: "Ahmed Al Rashidi",  email: "ahmed@example.com",  phone: "+971 50 123 4567",  service: "Free Zone Company Formation", message: "Looking to set up a consulting firm in DMCC. Need full structuring advice and banking introduction.", date: "2026-03-08", status: "new" },
    { id: 2, name: "Sophie Laurent",    email: "sophie@example.com", phone: "+33 6 12 34 56 78", service: "Mainland Company Formation",  message: "French national. Planning to open a trading company in Dubai mainland with a local partner.",         date: "2026-03-07", status: "read" },
    { id: 3, name: "Michael Chen",      email: "mchen@example.com",  phone: "+852 9876 5432",    service: "Corporate Banking Setup",     message: "Already have IFZA license. Need help with Emirates NBD account opening — have been rejected twice.",  date: "2026-03-06", status: "replied" },
  ],

  // ── SCHEDULED CONSULTATIONS ──────────────────────────────────
  consultations: [
    { id: 1, name: "Fatima Al-Mansoori", email: "fatima@example.com", service: "Free Zone Incorporation", date: "March 12, 2026", time: "10:00 AM", duration: "60", status: "confirmed",  notes: "" },
    { id: 2, name: "David Kim",          email: "dkim@example.com",   service: "Corporate Banking",       date: "March 14, 2026", time: "2:30 PM",  duration: "30", status: "pending",   notes: "Prefers Zoom" },
    { id: 3, name: "Laura Rossi",        email: "laura@example.com",  service: "Golden Visa",             date: "March 15, 2026", time: "11:00 AM", duration: "60", status: "confirmed", notes: "" },
  ],
};

// ─────────────────────────────────────────────────────────────
//  CSS
// ─────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --sb:248px;--hh:54px;
  --bg:#0d1117;--bg2:#161c27;--bg3:#1c2333;--bg4:#232d42;--bg5:#2a3550;
  --bdr:rgba(255,255,255,.06);--bdr2:rgba(255,255,255,.11);
  --gold:#C9A84C;--gfaint:rgba(201,168,76,.07);--gdim:rgba(201,168,76,.14);
  --txt:#dde4ed;--txt2:#8592a6;--txt3:#4e5c72;
  --red:#e05555;--redfaint:rgba(224,85,85,.1);
  --grn:#48bb78;--grnfaint:rgba(72,187,120,.1);
  --blu:#4c8af5;--blufaint:rgba(76,138,245,.1);
  --ora:#e0955a;--orafaint:rgba(224,149,90,.1);
  --pur:#9a75e8;--purfaint:rgba(154,117,232,.1);
  --ease:cubic-bezier(.16,1,.3,1);
  font-family:'DM Sans',system-ui,sans-serif;
  font-size:13px;color:var(--txt);background:var(--bg);
}

/* ── SCROLLBAR ── */
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--bg5);border-radius:4px}
::-webkit-scrollbar-thumb:hover{background:var(--gold)}

/* ── LOGIN ── */
.login{min-height:100vh;display:flex;align-items:center;justify-content:center;
  background:var(--bg);background-image:
    radial-gradient(ellipse 70% 60% at 50% 40%,rgba(201,168,76,.04),transparent),
    repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(201,168,76,.025) 39px,rgba(201,168,76,.025) 40px),
    repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(201,168,76,.025) 39px,rgba(201,168,76,.025) 40px);}
.login-box{width:400px;background:var(--bg2);border:1px solid var(--bdr);padding:52px 44px;text-align:center;animation:fadeUp .6s var(--ease) both;}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
.login-brand{font-family:'Cormorant Garamond',Georgia,serif;font-size:2.2rem;font-weight:400;letter-spacing:.2em;color:var(--txt);margin-bottom:4px;}
.login-brand em{color:var(--gold);font-style:normal;}
.login-sub{font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:var(--txt3);display:block;margin-bottom:40px;}
.login-err{color:var(--red);font-size:.7rem;margin:8px 0 0;display:block;}

/* ── SHELL ── */
.shell{display:flex;min-height:100vh;}

/* ── SIDEBAR ── */
.sb{width:var(--sb);background:var(--bg2);border-right:1px solid var(--bdr);
  position:fixed;inset:0 auto 0 0;z-index:80;display:flex;flex-direction:column;overflow-y:auto;}
.sb-brand{padding:18px 20px 14px;border-bottom:1px solid var(--bdr);}
.sb-logo{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.3rem;letter-spacing:.18em;color:var(--txt);}
.sb-logo em{color:var(--gold);font-style:normal;}
.sb-logo-sub{font-size:.55rem;letter-spacing:.18em;text-transform:uppercase;color:var(--txt3);display:block;margin-top:3px;}
.sb-grp{padding:16px 14px 4px;font-size:.54rem;letter-spacing:.22em;text-transform:uppercase;color:var(--txt3);font-weight:600;}
.sb-item{display:flex;align-items:center;gap:9px;padding:8px 14px;cursor:pointer;
  border-radius:5px;margin:1px 8px;font-size:.8rem;font-weight:400;color:var(--txt2);
  transition:background .15s,color .15s;}
.sb-item:hover{background:var(--bg3);color:var(--txt);}
.sb-item.on{background:var(--gfaint);color:var(--gold);
  border-left:2px solid var(--gold);border-radius:0 5px 5px 0;margin-left:6px;padding-left:12px;}
.sb-ico{font-size:.9rem;width:18px;text-align:center;flex-shrink:0;opacity:.8;}
.sb-badge{margin-left:auto;font-size:.55rem;font-weight:700;padding:1px 6px;border-radius:10px;min-width:18px;text-align:center;}
.sb-badge-red{background:var(--red);color:#fff;}
.sb-badge-gold{background:var(--gold);color:#0d1117;}
.sb-foot{margin-top:auto;padding:14px 16px;border-top:1px solid var(--bdr);
  display:flex;align-items:center;gap:10px;}
.sb-av{width:30px;height:30px;border-radius:50%;background:var(--gfaint);
  border:1px solid var(--gold);display:flex;align-items:center;justify-content:center;
  font-size:.78rem;color:var(--gold);flex-shrink:0;}
.sb-user{flex:1;font-size:.7rem;color:var(--txt2);}
.sb-user strong{display:block;font-size:.74rem;color:var(--txt);font-weight:500;}
.sb-logout{background:none;border:none;color:var(--txt3);cursor:pointer;font-size:.95rem;padding:3px;transition:color .2s;}
.sb-logout:hover{color:var(--red);}

/* ── TOPBAR ── */
.topbar{margin-left:var(--sb);height:var(--hh);background:var(--bg2);border-bottom:1px solid var(--bdr);
  display:flex;align-items:center;justify-content:space-between;padding:0 24px;
  position:sticky;top:0;z-index:60;}
.topbar-title{font-size:.95rem;font-weight:600;color:var(--txt);}
.topbar-right{display:flex;align-items:center;gap:10px;}
.live-pill{background:var(--grnfaint);color:var(--grn);font-size:.6rem;
  letter-spacing:.1em;font-weight:600;padding:3px 10px;border-radius:20px;
  display:flex;align-items:center;gap:5px;}
.live-pill::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--grn);
  animation:pulse 2s ease-in-out infinite;}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.save-btn{background:var(--gold);color:#0d1117;border:none;padding:8px 18px;
  border-radius:4px;font-size:.7rem;font-weight:700;letter-spacing:.1em;
  text-transform:uppercase;cursor:pointer;transition:background .2s;
  display:flex;align-items:center;gap:6px;font-family:'DM Sans',sans-serif;}
.save-btn:hover{background:#D4B468;}
.save-btn.saving{opacity:.6;pointer-events:none;}

/* ── MAIN ── */
.main{margin-left:var(--sb);padding:24px;background:var(--bg);min-height:calc(100vh - var(--hh));}

/* ── CARDS ── */
.card{background:var(--bg2);border:1px solid var(--bdr);border-radius:8px;overflow:hidden;margin-bottom:16px;}
.card-head{padding:14px 18px;border-bottom:1px solid var(--bdr);
  display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;}
.card-title{font-size:.88rem;font-weight:600;color:var(--txt);}
.card-sub{font-size:.7rem;color:var(--txt3);margin-top:2px;}
.card-body{padding:18px;}

/* ── GRID LAYOUTS ── */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
.g-full{grid-column:1/-1;}

/* ── FORM FIELDS ── */
.field{margin-bottom:14px;}
.field:last-child{margin-bottom:0;}
.field-row{display:flex;gap:14px;}
.field-row .field{flex:1;margin-bottom:0;}
.lbl{display:block;font-size:.63rem;letter-spacing:.12em;text-transform:uppercase;
  color:var(--txt3);margin-bottom:5px;font-weight:600;}
.inp,.sel,.ta{width:100%;background:var(--bg3);border:1px solid var(--bdr);
  color:var(--txt);font-family:'DM Sans',sans-serif;font-size:.84rem;font-weight:300;
  padding:8px 12px;border-radius:4px;outline:none;
  transition:border-color .22s,box-shadow .22s;}
.inp:focus,.sel:focus,.ta:focus{border-color:var(--gold);box-shadow:0 0 0 3px rgba(201,168,76,.09);}
.inp::placeholder,.ta::placeholder{color:var(--txt3);}
.ta{min-height:74px;resize:vertical;line-height:1.65;}
.sel{cursor:pointer;appearance:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%238592a6'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right 10px center;padding-right:28px;}
.sel option{background:var(--bg3);}
.hint{font-size:.62rem;color:var(--txt3);margin-top:3px;}
.inp-with-ico{position:relative;}
.inp-with-ico .inp{padding-left:32px;}
.inp-ico{position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:.8rem;}
.color-row{display:flex;align-items:center;gap:8px;}
.color-dot{width:14px;height:14px;border-radius:50%;border:1px solid var(--bdr2);flex-shrink:0;}

/* ── BUTTONS ── */
.btn{padding:7px 14px;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;
  font-size:.72rem;font-weight:500;border-radius:4px;transition:all .18s;
  display:inline-flex;align-items:center;gap:6px;}
.btn-p{background:var(--gold);color:#0d1117;font-weight:600;}
.btn-p:hover{background:#D4B468;}
.btn-s{background:var(--bg4);color:var(--txt2);border:1px solid var(--bdr2);}
.btn-s:hover{background:var(--bg3);color:var(--txt);}
.btn-d{background:var(--redfaint);color:var(--red);border:1px solid rgba(224,85,85,.18);}
.btn-d:hover{background:rgba(224,85,85,.18);}
.btn-ok{background:var(--grnfaint);color:var(--grn);border:1px solid rgba(72,187,120,.2);}
.btn-ok:hover{background:rgba(72,187,120,.18);}
.btn-sm{padding:4px 10px;font-size:.65rem;}
.btn-xs{padding:2px 7px;font-size:.6rem;}
.btn-group{display:flex;gap:8px;flex-wrap:wrap;align-items:center;}

/* ── TABLE ── */
.tbl{width:100%;border-collapse:collapse;}
.tbl th{padding:9px 12px;text-align:left;font-size:.6rem;letter-spacing:.12em;
  text-transform:uppercase;color:var(--txt3);border-bottom:1px solid var(--bdr);font-weight:600;}
.tbl td{padding:11px 12px;border-bottom:1px solid var(--bdr);
  font-size:.8rem;color:var(--txt2);vertical-align:middle;}
.tbl tr:last-child td{border-bottom:none;}
.tbl tr:hover td{background:rgba(255,255,255,.015);}
.tbl-name{color:var(--txt);font-weight:500;font-size:.82rem;}
.tbl-meta{font-size:.64rem;color:var(--txt3);margin-top:2px;}

/* ── STATUS BADGES ── */
.bdg{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;
  border-radius:10px;font-size:.62rem;font-weight:600;white-space:nowrap;}
.bdg::before{content:'';width:5px;height:5px;border-radius:50%;}
.bdg-new{background:var(--blufaint);color:var(--blu);}
.bdg-new::before{background:var(--blu);}
.bdg-read{background:var(--bg4);color:var(--txt3);}
.bdg-read::before{background:var(--txt3);}
.bdg-replied,.bdg-confirmed,.bdg-published,.bdg-completed{background:var(--grnfaint);color:var(--grn);}
.bdg-replied::before,.bdg-confirmed::before,.bdg-published::before,.bdg-completed::before{background:var(--grn);}
.bdg-pending,.bdg-draft{background:var(--orafaint);color:var(--ora);}
.bdg-pending::before,.bdg-draft::before{background:var(--ora);}
.bdg-cancelled{background:var(--redfaint);color:var(--red);}
.bdg-cancelled::before{background:var(--red);}
.bdg-featured{background:var(--purfaint);color:var(--pur);}
.bdg-featured::before{background:var(--pur);}

/* ── TABS ── */
.tabs{display:flex;border-bottom:1px solid var(--bdr);margin-bottom:20px;gap:0;}
.tab{padding:9px 16px;background:none;border:none;font-size:.76rem;color:var(--txt3);
  cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;
  transition:all .2s;font-family:'DM Sans',sans-serif;}
.tab:hover{color:var(--txt);}
.tab.on{color:var(--gold);border-bottom-color:var(--gold);}

/* ── KPI GRID ── */
.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px;}
.kpi{background:var(--bg2);border:1px solid var(--bdr);border-radius:8px;
  padding:20px 18px;position:relative;overflow:hidden;}
.kpi-accent{position:absolute;top:0;left:0;right:0;height:2px;}
.kpi-val{font-size:1.9rem;font-weight:700;line-height:1;margin-bottom:4px;}
.kpi-lbl{font-size:.7rem;color:var(--txt2);}
.kpi-ch{font-size:.62rem;margin-top:7px;display:flex;align-items:center;gap:3px;}

/* ── STATUS PAGES GRID ── */
.status-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;}
.status-item{background:var(--bg3);border:1px solid var(--bdr);border-radius:4px;
  padding:8px 11px;display:flex;align-items:center;gap:7px;}
.dot-live{width:6px;height:6px;border-radius:50%;background:var(--grn);flex-shrink:0;}
.status-pg{font-size:.72rem;color:var(--txt2);}

/* ── ZONE SELECTOR GRID ── */
.zone-sel{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px;}
.zc{background:var(--bg3);border:1px solid var(--bdr);border-radius:6px;
  padding:12px 14px;cursor:pointer;transition:border-color .2s,background .2s;}
.zc:hover,.zc.on{border-color:var(--gold);}
.zc.on{background:var(--gfaint);}
.zc-n{font-weight:600;font-size:.84rem;color:var(--txt);margin-bottom:2px;}
.zc-f{font-size:.64rem;color:var(--txt3);margin-bottom:5px;}
.zc-p{font-size:.7rem;color:var(--gold);}

/* ── BLOG LIST ── */
.blog-list{max-height:500px;overflow-y:auto;}
.brow{padding:11px 14px;border-bottom:1px solid var(--bdr);cursor:pointer;
  transition:background .15s;display:flex;align-items:center;gap:10px;}
.brow:hover{background:var(--bg3);}
.brow.on{background:var(--gfaint);}
.brow-title{flex:1;font-size:.8rem;color:var(--txt);font-weight:500;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.brow-meta{font-size:.64rem;color:var(--txt3);margin-top:2px;}

/* ── ENQUIRY / CONSULT LIST ── */
.enq-detail{height:fit-content;position:sticky;top:calc(var(--hh) + 16px);}
.detail-row{padding:8px 0;border-bottom:1px solid var(--bdr);}
.detail-row:last-child{border-bottom:none;}
.detail-key{font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;color:var(--txt3);margin-bottom:3px;}
.detail-val{font-size:.8rem;color:var(--txt);line-height:1.5;}
.msg-box{background:var(--bg3);border-radius:4px;padding:10px 12px;
  font-size:.8rem;color:var(--txt2);line-height:1.7;margin-top:8px;}

/* ── PREVIEW BOX ── */
.preview{background:var(--bg3);border:1px solid var(--bdr);border-radius:6px;
  padding:14px 18px;margin-top:14px;}
.preview-lbl{font-size:.57rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);
  margin-bottom:10px;display:flex;align-items:center;gap:8px;}
.preview-lbl::before{content:'';width:14px;height:1px;background:var(--gold);}
.preview-h{font-family:'Cormorant Garamond',Georgia,serif;font-size:1.5rem;
  font-weight:300;color:var(--txt);line-height:1.1;margin-bottom:5px;}
.preview-p{font-size:.78rem;color:var(--txt2);line-height:1.65;}
.tag{display:inline-flex;padding:2px 8px;border-radius:10px;font-size:.6rem;
  font-weight:600;background:var(--gfaint);color:var(--gold);margin:0 4px 4px 0;}

/* ── SECTION EDITOR HEADER ── */
.sec-hdr{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:18px;}
.sec-title{font-size:1rem;font-weight:600;color:var(--txt);}
.sec-sub{font-size:.72rem;color:var(--txt3);margin-top:2px;}
.divider{height:1px;background:var(--bdr);margin:18px 0;}

/* ── REPEATER ITEM ── */
.rep-item{background:var(--bg3);border:1px solid var(--bdr);border-radius:6px;
  padding:14px 16px;margin-bottom:10px;position:relative;}
.rep-item:last-child{margin-bottom:0;}
.rep-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
.rep-num{font-size:.6rem;letter-spacing:.16em;text-transform:uppercase;
  color:var(--gold);font-weight:600;}

/* ── TOGGLE SWITCH ── */
.toggle-wrap{display:flex;align-items:center;gap:10px;}
.toggle{position:relative;width:36px;height:20px;cursor:pointer;}
.toggle input{opacity:0;width:0;height:0;position:absolute;}
.toggle-track{position:absolute;inset:0;background:var(--bg5);border-radius:10px;transition:background .2s;}
.toggle input:checked + .toggle-track{background:var(--gold);}
.toggle-thumb{position:absolute;top:3px;left:3px;width:14px;height:14px;border-radius:50%;background:#fff;transition:transform .2s;}
.toggle input:checked ~ .toggle-thumb{transform:translateX(16px);}
.toggle-lbl{font-size:.76rem;color:var(--txt2);}

/* ── TOAST ── */
.toast{position:fixed;bottom:22px;right:22px;z-index:999;
  background:var(--grn);color:#0d1117;padding:11px 20px;border-radius:6px;
  font-size:.76rem;font-weight:600;display:flex;align-items:center;gap:8px;
  box-shadow:0 4px 20px rgba(72,187,120,.3);
  animation:toastUp .4s var(--ease) both;}
@keyframes toastUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}

/* ── BREADCRUMB ── */
.breadcrumb{display:flex;align-items:center;gap:6px;margin-bottom:18px;flex-wrap:wrap;}
.breadcrumb-item{font-size:.72rem;color:var(--txt3);}
.breadcrumb-item.active{color:var(--txt);}
.breadcrumb-sep{color:var(--txt3);font-size:.65rem;}

/* ── EMPTY STATE ── */
.empty{text-align:center;padding:60px 20px;color:var(--txt3);font-size:.82rem;}
.empty-icon{font-size:2rem;margin-bottom:10px;display:block;}

/* ── CHAR COUNT ── */
.char-count{font-size:.6rem;color:var(--txt3);text-align:right;margin-top:3px;}

/* ── RESPONSIVE ── */
@media(max-width:1024px){
  .sb{display:none;}
  .topbar,.main{margin-left:0;}
  .kpi-grid,.zone-sel{grid-template-columns:1fr 1fr;}
  .g2,.g3,.g4{grid-template-columns:1fr;}
  .status-grid{grid-template-columns:repeat(3,1fr);}
}
`;

// ─────────────────────────────────────────────────────────────
//  MICRO COMPONENTS
// ─────────────────────────────────────────────────────────────
const F = ({ label, hint, children, full, row }) => (
  <div className={`field${full ? " g-full" : ""}${row ? " field-row" : ""}`}>
    {label && <label className="lbl">{label}</label>}
    {children}
    {hint && <div className="hint">{hint}</div>}
  </div>
);

const Inp  = (p) => <input  className="inp"  {...p} />;
const Ta   = (p) => <textarea className="ta" {...p} />;
const Sel  = ({ opts = [], children, ...p }) => (
  <select className="sel" {...p}>
    {children || opts.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
  </select>
);
const Bdg  = ({ status }) => <span className={`bdg bdg-${status}`}>{status}</span>;
const Div  = () => <div className="divider" />;

function CharTa({ value, onChange, max = 200, ...rest }) {
  return (
    <>
      <Ta value={value} onChange={onChange} {...rest} />
      <div className="char-count">{value?.length ?? 0} / {max}</div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
//  SECTION: DASHBOARD
// ─────────────────────────────────────────────────────────────
function Dashboard({ d }) {
  const newEnq   = d.enquiries.filter(e => e.status === "new").length;
  const pendingC = d.consultations.filter(c => c.status === "pending").length;
  const PAGES = ["Home","Hero","Why Section","Expertise","Testimonials","CTA Strip","Services","Mainland","PRO Advisory","About","Blog","Contact","Schedule","DMCC","IFZA","ADGM","JAFZA","Meydan","RAKEZ","SHAMS","AFZ"];
  return (
    <div>
      {/* KPIs */}
      <div className="kpi-grid">
        {[
          { val: d.global.companiesCount, lbl: "Companies Incorporated", ch: "↑ +12% this month", color: "#C9A84C" },
          { val: d.enquiries.length,      lbl: "Contact Enquiries",       ch: `${newEnq} new unread`,      color: "#4c8af5" },
          { val: d.consultations.length,  lbl: "Consultations Booked",    ch: `${pendingC} pending`,       color: "#48bb78" },
          { val: d.blog.filter(b => b.status === "published").length, lbl: "Published Articles", ch: `${d.blog.filter(b => b.status === "draft").length} drafts`, color: "#e0955a" },
        ].map((k, i) => (
          <div className="kpi" key={i}>
            <div className="kpi-accent" style={{ background: k.color }} />
            <div className="kpi-val" style={{ color: k.color }}>{k.val}</div>
            <div className="kpi-lbl">{k.lbl}</div>
            <div className="kpi-ch" style={{ color: k.color }}>{k.ch}</div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="g2" style={{ marginBottom: 16 }}>
        <div className="card">
          <div className="card-head"><div className="card-title">Recent Enquiries</div><span style={{fontSize:".68rem",color:"var(--txt3)"}}>{newEnq} unread</span></div>
          <table className="tbl">
            <thead><tr><th>Name</th><th>Service</th><th>Status</th></tr></thead>
            <tbody>{d.enquiries.map(e => (
              <tr key={e.id}>
                <td><div className="tbl-name">{e.name}</div><div className="tbl-meta">{e.email}</div></td>
                <td style={{fontSize:".72rem",maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{e.service}</td>
                <td><Bdg status={e.status} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div className="card">
          <div className="card-head"><div className="card-title">Upcoming Consultations</div><span style={{fontSize:".68rem",color:"var(--txt3)"}}>{pendingC} pending</span></div>
          <table className="tbl">
            <thead><tr><th>Client</th><th>Date & Time</th><th>Status</th></tr></thead>
            <tbody>{d.consultations.map(c => (
              <tr key={c.id}>
                <td><div className="tbl-name">{c.name}</div><div className="tbl-meta">{c.service}</div></td>
                <td><div style={{fontSize:".74rem"}}>{c.date}</div><div className="tbl-meta">{c.time} · {c.duration}min</div></td>
                <td><Bdg status={c.status} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>

      {/* All pages status */}
      <div className="card">
        <div className="card-head"><div className="card-title">All Pages Status</div><div className="card-sub">{PAGES.length} pages tracked</div></div>
        <div className="card-body">
          <div className="status-grid">
            {PAGES.map(pg => (
              <div className="status-item" key={pg}><span className="dot-live"/><span className="status-pg">{pg}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  SECTION: GLOBAL SETTINGS
// ─────────────────────────────────────────────────────────────
function GlobalSettings({ d, oc }) {
  const g = d.global;
  const u = (k, v) => oc("global", { ...g, [k]: v });
  return (
    <div>
      <div className="card">
        <div className="card-head"><div className="card-title">Company Identity</div></div>
        <div className="card-body">
          <div className="g2">
            <F label="Site Name"><Inp value={g.siteName} onChange={e=>u("siteName",e.target.value)} /></F>
            <F label="Tagline"><Inp value={g.tagline} onChange={e=>u("tagline",e.target.value)} /></F>
          </div>
          <F label="Office Address">
            <Ta value={g.address} onChange={e=>u("address",e.target.value)} style={{minHeight:52}} />
          </F>
          <div className="g3">
            <F label="Phone"><Inp value={g.phone} onChange={e=>u("phone",e.target.value)} /></F>
            <F label="WhatsApp"><Inp value={g.whatsapp} onChange={e=>u("whatsapp",e.target.value)} /></F>
            <F label="Email"><Inp value={g.email} onChange={e=>u("email",e.target.value)} /></F>
          </div>
          <div className="g3">
            <F label="Office Hours (Sun–Thu)"><Inp value={g.officeHoursSun} onChange={e=>u("officeHoursSun",e.target.value)} /></F>
            <F label="Office Hours (Saturday)"><Inp value={g.officeHoursSat} onChange={e=>u("officeHoursSat",e.target.value)} /></F>
            <F label="Google Maps URL"><Inp value={g.mapLink} onChange={e=>u("mapLink",e.target.value)} /></F>
          </div>
          <div className="g3">
            <F label="LinkedIn URL"><Inp value={g.linkedIn} onChange={e=>u("linkedIn",e.target.value)} /></F>
            <F label="Twitter / X URL"><Inp value={g.twitter} onChange={e=>u("twitter",e.target.value)} /></F>
            <F label="Instagram URL"><Inp value={g.instagram} onChange={e=>u("instagram",e.target.value)} /></F>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-head"><div className="card-title">Key Statistics</div><div className="card-sub">Used across hero, about, why, and footer sections</div></div>
        <div className="card-body">
          <div className="g4">
            <F label="Companies Incorporated" hint="e.g. 3,200+"><Inp value={g.companiesCount} onChange={e=>u("companiesCount",e.target.value)} /></F>
            <F label="Nationalities Served" hint="e.g. 68+"><Inp value={g.nationalitiesCount} onChange={e=>u("nationalitiesCount",e.target.value)} /></F>
            <F label="Years Experience" hint="e.g. 12"><Inp value={g.yearsExperience} onChange={e=>u("yearsExperience",e.target.value)} /></F>
            <F label="Client Rating" hint="e.g. 4.9"><Inp value={g.rating} onChange={e=>u("rating",e.target.value)} /></F>
          </div>
          <div className="g2">
            <F label="Founded Year"><Inp value={g.founded} onChange={e=>u("founded",e.target.value)} /></F>
            <F label="Reviews Count" hint="e.g. 400+"><Inp value={g.ratingCount} onChange={e=>u("ratingCount",e.target.value)} /></F>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  SECTION: HOME PAGE
// ─────────────────────────────────────────────────────────────
function HomePage({ d, oc }) {
  const [tab, setTab] = useState("hero");

  const h = d.hero;
  const uh = (k,v) => oc("hero", {...h,[k]:v});

  const exp = d.expertise;
  const uExp = (i,k,v) => { const n=[...exp]; n[i]={...n[i],[k]:v}; oc("expertise",n); };

  const why = d.why;
  const uWhy = (k,v) => oc("why",{...why,[k]:v});
  const uPillar = (i,k,v) => { const n=[...why.pillars]; n[i]={...n[i],[k]:v}; oc("why",{...why,pillars:n}); };
  const uStat = (i,k,v) => { const n=[...why.stats]; n[i]={...n[i],[k]:v}; oc("why",{...why,stats:n}); };

  const t = d.testimonials;
  const uT = (i,k,v) => { const n=[...t]; n[i]={...n[i],[k]:v}; oc("testimonials",n); };
  const addT = () => oc("testimonials",[...t,{text:"Enter testimonial.",name:"Client Name",role:"Title, Company",rating:5}]);
  const delT = (i) => oc("testimonials",t.filter((_,j)=>j!==i));

  const cta = d.cta;
  const uCta = (k,v) => oc("cta",{...cta,[k]:v});

  const ft = d.footer;
  const uFt = (k,v) => oc("footer",{...ft,[k]:v});

  return (
    <div>
      <div className="tabs">
        {[["hero","Hero"],["expertise","Expertise Cards"],["why","Why Section"],["testimonials","Testimonials"],["cta","CTA Strip"],["footer","Footer"]].map(([id,lbl]) => (
          <button key={id} className={`tab${tab===id?" on":""}`} onClick={()=>setTab(id)}>{lbl}</button>
        ))}
      </div>

      {/* ── HERO ── */}
      {tab==="hero" && (
        <div>
          <div className="card">
            <div className="card-head"><div className="card-title">Hero Content</div></div>
            <div className="card-body">
              <F label="Eyebrow Label (small text above headline)"><Inp value={h.eyebrow} onChange={e=>uh("eyebrow",e.target.value)} /></F>
              <F label="Main Headline" hint="Full text including the italic portion">
                <CharTa value={h.headline} onChange={e=>uh("headline",e.target.value)} max={120} />
              </F>
              <F label="Italic Gold Portion" hint="Must exactly match a substring of the headline above — this part renders in gold italic">
                <Inp value={h.headlineItalic} onChange={e=>uh("headlineItalic",e.target.value)} />
              </F>
              <F label="Services Sub-line" hint="Use · as separator between service items">
                <Inp value={h.subline} onChange={e=>uh("subline",e.target.value)} />
              </F>
              <div className="g2">
                <F label="Primary CTA Button Text"><Inp value={h.ctaPrimary} onChange={e=>uh("ctaPrimary",e.target.value)} /></F>
                <F label="Secondary CTA Button Text"><Inp value={h.ctaSecondary} onChange={e=>uh("ctaSecondary",e.target.value)} /></F>
              </div>
            </div>
          </div>
          <div className="preview">
            <div className="preview-lbl">Live Preview</div>
            <div style={{fontSize:".57rem",letterSpacing:".3em",textTransform:"uppercase",color:"var(--gold)",marginBottom:"8px"}}>{h.eyebrow}</div>
            <div className="preview-h">{h.headline}</div>
            <div className="preview-p" style={{marginTop:"6px",color:"var(--txt3)"}}>{h.subline}</div>
            <div style={{marginTop:"14px",display:"flex",gap:"10px",flexWrap:"wrap"}}>
              <span style={{padding:"8px 18px",background:"var(--gold)",color:"#0d1117",fontSize:".7rem",fontWeight:700,borderRadius:"2px"}}>{h.ctaPrimary}</span>
              <span style={{padding:"8px 18px",border:"1px solid rgba(255,255,255,.18)",color:"var(--txt2)",fontSize:".7rem",borderRadius:"2px"}}>{h.ctaSecondary}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── EXPERTISE ── */}
      {tab==="expertise" && (
        <div>
          {exp.map((c,i) => (
            <div className="rep-item" key={i}>
              <div className="rep-head"><span className="rep-num">Card {c.num}</span></div>
              <div className="g2">
                <F label="Number Badge"><Inp value={c.num} onChange={e=>uExp(i,"num",e.target.value)} /></F>
                <F label="Title"><Inp value={c.title} onChange={e=>uExp(i,"title",e.target.value)} /></F>
              </div>
              <F label="Description">
                <CharTa value={c.desc} onChange={e=>uExp(i,"desc",e.target.value)} max={200} />
              </F>
            </div>
          ))}
        </div>
      )}

      {/* ── WHY ── */}
      {tab==="why" && (
        <div>
          <div className="card">
            <div className="card-head"><div className="card-title">Section Header & Orb</div></div>
            <div className="card-body">
              <div className="g2">
                <F label="Section Label"><Inp value={why.label} onChange={e=>uWhy("label",e.target.value)} /></F>
                <F label="Headline"><Inp value={why.headline} onChange={e=>uWhy("headline",e.target.value)} /></F>
                <F label="Orb Label" hint="Small text inside the circular orb"><Inp value={why.orbLabel} onChange={e=>uWhy("orbLabel",e.target.value)} /></F>
                <F label="Orb Main Number" hint="e.g. 3,200+"><Inp value={why.orbNum} onChange={e=>uWhy("orbNum",e.target.value)} /></F>
              </div>
              <F label="Orb Sub-text"><Inp value={why.orbSub} onChange={e=>uWhy("orbSub",e.target.value)} /></F>
            </div>
          </div>
          <div className="card">
            <div className="card-head"><div className="card-title">The Four Pillars</div></div>
            <div className="card-body">
              {why.pillars.map((p,i) => (
                <div className="rep-item" key={i}>
                  <div className="rep-head"><span className="rep-num">Pillar 0{i+1}</span></div>
                  <div className="g2">
                    <F label="Gold Tag"><Inp value={p.tag} onChange={e=>uPillar(i,"tag",e.target.value)} /></F>
                    <F label="Title"><Inp value={p.title} onChange={e=>uPillar(i,"title",e.target.value)} /></F>
                  </div>
                  <F label="Description"><Ta value={p.desc} onChange={e=>uPillar(i,"desc",e.target.value)} /></F>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-head"><div className="card-title">Floating Statistics</div><div className="card-sub">Shown beside the central orb</div></div>
            <div className="card-body">
              <div className="g3">
                {why.stats.map((s,i) => (
                  <div className="rep-item" key={i} style={{marginBottom:0}}>
                    <div className="rep-head"><span className="rep-num">Stat {i+1}</span></div>
                    <F label="Number"><Inp value={s.num} onChange={e=>uStat(i,"num",e.target.value)} /></F>
                    <F label="Label"><Inp value={s.label} onChange={e=>uStat(i,"label",e.target.value)} /></F>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TESTIMONIALS ── */}
      {tab==="testimonials" && (
        <div>
          {t.map((item,i) => (
            <div className="rep-item" key={i}>
              <div className="rep-head">
                <span className="rep-num">Testimonial {i+1}</span>
                <button className="btn btn-d btn-sm" onClick={()=>delT(i)}> Remove</button>
              </div>
              <F label="Quote Text">
                <CharTa value={item.text} onChange={e=>uT(i,"text",e.target.value)} max={280} />
              </F>
              <div className="g2">
                <F label="Client Name"><Inp value={item.name} onChange={e=>uT(i,"name",e.target.value)} /></F>
                <F label="Role / Company"><Inp value={item.role} onChange={e=>uT(i,"role",e.target.value)} /></F>
              </div>
              <div className="preview">
                <div className="preview-lbl">Preview</div>
                <div style={{fontStyle:"italic",color:"var(--txt2)",fontSize:".8rem",lineHeight:1.7,marginBottom:"8px"}}>"{item.text}"</div>
                <div style={{fontSize:".7rem",color:"var(--gold)"}}>{item.name} <span style={{color:"var(--txt3)"}}>— {item.role}</span></div>
              </div>
            </div>
          ))}
          <button className="btn btn-p" style={{marginTop:8}} onClick={addT}>+ Add Testimonial</button>
        </div>
      )}

      {/* ── CTA ── */}
      {tab==="cta" && (
        <div className="card">
          <div className="card-head"><div className="card-title">Bottom CTA Strip</div></div>
          <div className="card-body">
            <F label="Section Label"><Inp value={cta.label} onChange={e=>uCta("label",e.target.value)} /></F>
            <F label="Headline"><Inp value={cta.headline} onChange={e=>uCta("headline",e.target.value)} /></F>
            <F label="Italic Portion" hint="Must match a substring of headline"><Inp value={cta.headlineItalic} onChange={e=>uCta("headlineItalic",e.target.value)} /></F>
            <F label="Body Text"><Inp value={cta.body} onChange={e=>uCta("body",e.target.value)} /></F>
            <div className="g2">
              <F label="Primary Button"><Inp value={cta.ctaPrimary} onChange={e=>uCta("ctaPrimary",e.target.value)} /></F>
              <F label="Secondary Button"><Inp value={cta.ctaSecondary} onChange={e=>uCta("ctaSecondary",e.target.value)} /></F>
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      {tab==="footer" && (
        <div className="card">
          <div className="card-head"><div className="card-title">Footer Content</div></div>
          <div className="card-body">
            <F label="Footer Tagline"><Ta value={ft.tagline} onChange={e=>uFt("tagline",e.target.value)} style={{minHeight:52}} /></F>
            <div className="g2">
              <F label="Copyright Line"><Inp value={ft.copyright} onChange={e=>uFt("copyright",e.target.value)} /></F>
              <F label="Location"><Inp value={ft.location} onChange={e=>uFt("location",e.target.value)} /></F>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  SECTION: FREE ZONES
// ─────────────────────────────────────────────────────────────
function FreeZones({ d, oc }) {
  const [sel, setSel] = useState(d.zones[0]?.id || "");
  const zones = d.zones;
  const zone = zones.find(z => z.id === sel);
  const u = (k,v) => oc("zones", zones.map(z => z.id===sel ? {...z,[k]:v} : z));
  const CATS = ["trade","free","media","industrial","financial"];

  return (
    <div>
      <div className="zone-sel">
        {zones.map(z => (
          <div className={`zc${sel===z.id?" on":""}`} key={z.id} onClick={()=>setSel(z.id)}>
            <div className="zc-n">{z.name}</div>
            <div className="zc-f">{z.full}</div>
            <div className="zc-p">From {z.setupFrom}</div>
          </div>
        ))}
      </div>

      {zone && (
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Editing: {zone.name}</div>
              <div className="card-sub">{zone.full}</div>
            </div>
            <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
              <span className="tag">{zone.category}</span>
              <span style={{width:12,height:12,borderRadius:"50%",background:zone.color,border:"1px solid var(--bdr2)",display:"inline-block"}} />
            </div>
          </div>
          <div className="card-body">
            <div className="g2">
              <F label="Display Name (Short)" hint="e.g. DMCC"><Inp value={zone.name} onChange={e=>u("name",e.target.value)} /></F>
              <F label="Full Zone Name"><Inp value={zone.full} onChange={e=>u("full",e.target.value)} /></F>
              <F label="Badge Label" hint="Shown on the zone card chip"><Inp value={zone.badgeLabel} onChange={e=>u("badgeLabel",e.target.value)} /></F>
              <F label="Category">
                <Sel value={zone.category} onChange={e=>u("category",e.target.value)} opts={CATS} />
              </F>
              <F label="Location"><Inp value={zone.location} onChange={e=>u("location",e.target.value)} /></F>
              <F label="Setup Duration" hint="e.g. 7–14 (days)"><Inp value={zone.setupDays} onChange={e=>u("setupDays",e.target.value)} /></F>
              <F label="Starting Price" hint="e.g. AED 18,500"><Inp value={zone.setupFrom} onChange={e=>u("setupFrom",e.target.value)} /></F>
              <F label="Visa Quota" hint="e.g. Up to 6 visas"><Inp value={zone.visaQuota} onChange={e=>u("visaQuota",e.target.value)} /></F>
              <F label="Minimum Capital" hint="e.g. None / AED 50,000 nominal"><Inp value={zone.minCapital} onChange={e=>u("minCapital",e.target.value)} /></F>
              <F label="Card Accent Color (hex)">
                <div className="color-row">
                  <span className="color-dot" style={{background:zone.color}} />
                  <Inp value={zone.color} onChange={e=>u("color",e.target.value)} style={{flex:1}} />
                </div>
              </F>
            </div>
            <F label="Zone Description" hint="Shown on home page zone card and zone page hero">
              <CharTa value={zone.desc} onChange={e=>u("desc",e.target.value)} max={280} />
            </F>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  SECTION: SERVICES PAGE
// ─────────────────────────────────────────────────────────────
function ServicesPage({ d, oc }) {
  const s = d.services;
  const uH = (k,v) => oc("services",{...s,[k]:v});
  const uSvc = (i,k,v) => { const n=[...s.services]; n[i]={...n[i],[k]:v}; oc("services",{...s,services:n}); };

  return (
    <div>
      <div className="card">
        <div className="card-head"><div className="card-title">Services Page Hero</div></div>
        <div className="card-body">
          <div className="g3">
            <F label="Section Label"><Inp value={s.heroLabel} onChange={e=>uH("heroLabel",e.target.value)} /></F>
            <F label="Headline"><Inp value={s.heroHeadline} onChange={e=>uH("heroHeadline",e.target.value)} /></F>
            <F label="Body Text"><Inp value={s.heroBody} onChange={e=>uH("heroBody",e.target.value)} /></F>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-head"><div className="card-title">Service Listings</div><div className="card-sub">Six core service lines</div></div>
        <div className="card-body">
          {s.services.map((svc,i) => (
            <div className="rep-item" key={i}>
              <div className="rep-head"><span className="rep-num">{svc.num} — {svc.title}</span></div>
              <div className="g3">
                <F label="Service Number"><Inp value={svc.num} onChange={e=>uSvc(i,"num",e.target.value)} /></F>
                <F label="Title"><Inp value={svc.title} onChange={e=>uSvc(i,"title",e.target.value)} /></F>
                <F label="Starting Price"><Inp value={svc.price} onChange={e=>uSvc(i,"price",e.target.value)} /></F>
                <F label="Timeline / Duration"><Inp value={svc.duration} onChange={e=>uSvc(i,"duration",e.target.value)} /></F>
              </div>
              <F label="Description"><CharTa value={svc.desc} onChange={e=>uSvc(i,"desc",e.target.value)} max={250} /></F>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  SECTION: ABOUT PAGE
// ─────────────────────────────────────────────────────────────
function AboutPage({ d, oc }) {
  const [tab, setTab] = useState("hero");
  const [uploading, setUploading] = useState({});
  const a = d.about;
  const u = (k,v) => oc("about",{...a,[k]:v});
  const uTeam   = (i,k,v) => { const n=[...(a.team||[])];    n[i]={...n[i],[k]:v}; oc("about",{...a,team:n}); };
  const uVal    = (i,k,v) => { const n=[...(a.values||[])];  n[i]={...n[i],[k]:v}; oc("about",{...a,values:n}); };
  const uTl     = (i,k,v) => { const n=[...(a.timeline||[])];n[i]={...n[i],[k]:v}; oc("about",{...a,timeline:n}); };
  const uStat   = (i,k,v) => { const n=[...(a.stats||[])];   n[i]={...n[i],[k]:v}; oc("about",{...a,stats:n}); };
  const uPillar = (i,k,v) => { const n=[...(a.pillars||[])]; n[i]={...n[i],[k]:v}; oc("about",{...a,pillars:n}); };

  const addTl   = () => oc("about",{...a,timeline:[...(a.timeline||[]),{year:new Date().getFullYear().toString(),title:"New Milestone",desc:"Description."}]});
  const delTl   = (i) => oc("about",{...a,timeline:(a.timeline||[]).filter((_,j)=>j!==i)});
  const addTeam = () => oc("about",{...a,team:[...(a.team||[]),{name:"New Member",role:"Role",bio:"Bio.",initial:"N",exp:"",imageUrl:""}]});
  const delTeam = (i) => oc("about",{...a,team:(a.team||[]).filter((_,j)=>j!==i)});

  const handleImgUpload = async (i, file) => {
    if (!file) return;
    setUploading(p => ({...p,[i]:true}));
    try {
      const url = await uploadImage(file);
      uTeam(i, "imageUrl", url);
    } catch(e) { alert("Image upload failed: " + e.message); }
    setUploading(p => ({...p,[i]:false}));
  };

  return (
    <div>
      <div className="tabs">
        {[["hero","Hero & Intro"],["story","Story Text"],["stats","Stats"],["pillars","Pillars"],["team","Team"],["values","Values"],["timeline","Timeline"]].map(([id,lbl]) => (
          <button key={id} className={`tab${tab===id?" on":""}`} onClick={()=>setTab(id)}>{lbl}</button>
        ))}
      </div>

      {tab==="hero" && (
        <div className="card">
          <div className="card-head"><div className="card-title">About Page Hero & Manifesto</div></div>
          <div className="card-body">
            <F label="Eyebrow Label" hint="Small text above the headline"><Inp value={a.heroEyebrow||""} onChange={e=>u("heroEyebrow",e.target.value)} /></F>
            <F label="Hero Description"><CharTa value={a.heroDesc||""} onChange={e=>u("heroDesc",e.target.value)} max={320} style={{minHeight:80}} /></F>
            <F label="Manifesto Quote" hint="Italic manifesto line below the description"><Ta value={a.manifesto||""} onChange={e=>u("manifesto",e.target.value)} style={{minHeight:60}} /></F>
            <div className="g2">
              <F label="Pull Quote"><Ta value={a.pullQuote||""} onChange={e=>u("pullQuote",e.target.value)} style={{minHeight:52}} /></F>
              <F label="Pull Quote Citation"><Inp value={a.pullQuoteCite||""} onChange={e=>u("pullQuoteCite",e.target.value)} /></F>
            </div>
          </div>
        </div>
      )}

      {tab==="story" && (
        <div className="card">
          <div className="card-head"><div className="card-title">Story Section (Two-Column Text)</div></div>
          <div className="card-body">
            <F label="Left Column — Origin Story"><CharTa value={a.storyLeft||""} onChange={e=>u("storyLeft",e.target.value)} max={600} style={{minHeight:120}} /></F>
            <F label="Right Column — Paragraph 1"><CharTa value={a.storyRight1||""} onChange={e=>u("storyRight1",e.target.value)} max={400} style={{minHeight:80}} /></F>
            <F label="Right Column — Paragraph 2"><CharTa value={a.storyRight2||""} onChange={e=>u("storyRight2",e.target.value)} max={400} style={{minHeight:80}} /></F>
          </div>
        </div>
      )}

      {tab==="stats" && (
        <div className="card">
          <div className="card-head"><div className="card-title">Statistics (4 Key Numbers)</div></div>
          <div className="card-body">
            <div className="g2">
              {(a.stats||[]).map((s,i) => (
                <div className="rep-item" key={i} style={{marginBottom:0}}>
                  <div className="rep-head"><span className="rep-num">Stat {i+1}</span></div>
                  <div className="g2">
                    <F label="Number Value" hint="e.g. 3200"><Inp value={s.val||""} onChange={e=>uStat(i,"val",e.target.value)} /></F>
                    <F label="Superscript" hint="e.g. + or yr or %"><Inp value={s.sup||""} onChange={e=>uStat(i,"sup",e.target.value)} style={{width:70}} /></F>
                  </div>
                  <F label="Label"><Inp value={s.label||""} onChange={e=>uStat(i,"label",e.target.value)} /></F>
                  <F label="Description" hint="Small sub-text below the stat"><Inp value={s.desc||""} onChange={e=>uStat(i,"desc",e.target.value)} /></F>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab==="pillars" && (
        <div className="card">
          <div className="card-head"><div className="card-title">Three Why-Us Pillars</div></div>
          <div className="card-body">
            {(a.pillars||[]).map((p,i) => (
              <div className="rep-item" key={i}>
                <div className="rep-head"><span className="rep-num">{p.num} — {p.title}</span></div>
                <div className="g2">
                  <F label="Number Badge"><Inp value={p.num||""} onChange={e=>uPillar(i,"num",e.target.value)} style={{width:70}} /></F>
                  <F label="Title"><Inp value={p.title||""} onChange={e=>uPillar(i,"title",e.target.value)} /></F>
                </div>
                <F label="Body Text"><Ta value={p.body||""} onChange={e=>uPillar(i,"body",e.target.value)} style={{minHeight:80}} /></F>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==="team" && (
        <div>
          <div className="card">
            <div className="card-head"><div className="card-title">Team Members</div><button className="btn btn-p btn-sm" onClick={addTeam}>+ Add Member</button></div>
            <div className="card-body">
              {(a.team||[]).map((m,i) => (
                <div className="rep-item" key={i}>
                  <div className="rep-head">
                    <span className="rep-num">{m.name} — {m.role}</span>
                    <button className="btn btn-d btn-sm" onClick={()=>delTeam(i)}></button>
                  </div>
                  <div className="g2">
                    <F label="Full Name"><Inp value={m.name||""} onChange={e=>uTeam(i,"name",e.target.value)} /></F>
                    <F label="Role / Title"><Inp value={m.role||""} onChange={e=>uTeam(i,"role",e.target.value)} /></F>
                    <F label="Avatar Initial" hint="Single letter shown if no photo"><Inp value={m.initial||""} onChange={e=>uTeam(i,"initial",e.target.value)} maxLength={1} style={{width:60}} /></F>
                    <F label="Experience Badge" hint="e.g. 12yr UAE"><Inp value={m.exp||""} onChange={e=>uTeam(i,"exp",e.target.value)} /></F>
                  </div>
                  <F label="Short Bio"><Ta value={m.bio||""} onChange={e=>uTeam(i,"bio",e.target.value)} style={{minHeight:60}} /></F>
                  <F label="Photo">
                    <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                      {m.imageUrl && <img src={m.imageUrl} alt={m.name} style={{width:64,height:64,objectFit:"cover",borderRadius:4,border:"1px solid var(--bdr2)"}} />}
                      <label style={{cursor:"pointer"}}>
                        <span className="btn btn-s btn-sm" style={{display:"inline-block"}}>
                          {uploading[i] ? "Uploading…" : m.imageUrl ? " Change Photo" : " Upload Photo"}
                        </span>
                        <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>handleImgUpload(i,e.target.files[0])} />
                      </label>
                      {m.imageUrl && <button className="btn btn-d btn-sm" onClick={()=>uTeam(i,"imageUrl","")}>Remove</button>}
                    </div>
                    {m.imageUrl && <div className="hint" style={{marginTop:4}}>URL: {m.imageUrl}</div>}
                  </F>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab==="values" && (
        <div className="card">
          <div className="card-head"><div className="card-title">Company Values</div></div>
          <div className="card-body">
            {(a.values||[]).map((v,i) => (
              <div className="rep-item" key={i}>
                <div className="rep-head"><span className="rep-num">Value {i+1} — {v.title}</span></div>
                <F label="Title / Heading"><Inp value={v.title||""} onChange={e=>uVal(i,"title",e.target.value)} /></F>
                <F label="Body Text"><Ta value={v.body||""} onChange={e=>uVal(i,"body",e.target.value)} style={{minHeight:80}} /></F>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==="timeline" && (
        <div>
          {(a.timeline||[]).map((tl,i) => (
            <div className="rep-item" key={i}>
              <div className="rep-head">
                <span className="rep-num">{tl.year} — {tl.title}</span>
                <button className="btn btn-d btn-sm" onClick={()=>delTl(i)}></button>
              </div>
              <div className="g2">
                <F label="Year"><Inp value={tl.year||""} onChange={e=>uTl(i,"year",e.target.value)} style={{width:90}} /></F>
                <F label="Title / Milestone Name"><Inp value={tl.title||""} onChange={e=>uTl(i,"title",e.target.value)} /></F>
              </div>
              <F label="Description"><Ta value={tl.desc||""} onChange={e=>uTl(i,"desc",e.target.value)} style={{minHeight:52}} /></F>
            </div>
          ))}
          <button className="btn btn-p" style={{marginTop:8}} onClick={addTl}>+ Add Milestone</button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  SECTION: CONTACT PAGE
// ─────────────────────────────────────────────────────────────
function ContactPageSection({ d, oc }) {
  const c = d.contact;
  const u = (k,v) => oc("contact",{...c,[k]:v});
  const uFaq = (i,k,v) => { const n=[...c.faqItems]; n[i]={...n[i],[k]:v}; oc("contact",{...c,faqItems:n}); };
  const addFaq = () => oc("contact",{...c,faqItems:[...c.faqItems,{q:"New Question?",a:"Answer text."}]});
  const delFaq = (i) => oc("contact",{...c,faqItems:c.faqItems.filter((_,j)=>j!==i)});

  return (
    <div>
      <div className="card">
        <div className="card-head"><div className="card-title">Contact Page Hero</div></div>
        <div className="card-body">
          <div className="g2">
            <F label="Section Label"><Inp value={c.heroLabel} onChange={e=>u("heroLabel",e.target.value)} /></F>
            <F label="Headline"><Inp value={c.heroHeadline} onChange={e=>u("heroHeadline",e.target.value)} /></F>
          </div>
          <F label="Body Text"><Ta value={c.heroBody} onChange={e=>u("heroBody",e.target.value)} /></F>
          <div className="g2">
            <F label="Office Label"><Inp value={c.officeLabel} onChange={e=>u("officeLabel",e.target.value)} /></F>
            <F label="Office Name / Location"><Inp value={c.officeName} onChange={e=>u("officeName",e.target.value)} /></F>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-head">
          <div className="card-title">FAQ Accordion</div>
          <button className="btn btn-p btn-sm" onClick={addFaq}>+ Add FAQ</button>
        </div>
        <div className="card-body">
          {c.faqItems.map((faq,i) => (
            <div className="rep-item" key={i}>
              <div className="rep-head">
                <span className="rep-num">FAQ {i+1}</span>
                <button className="btn btn-d btn-sm" onClick={()=>delFaq(i)}></button>
              </div>
              <F label="Question"><Inp value={faq.q} onChange={e=>uFaq(i,"q",e.target.value)} /></F>
              <F label="Answer"><Ta value={faq.a} onChange={e=>uFaq(i,"a",e.target.value)} /></F>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  SECTION: SCHEDULE PAGE
// ─────────────────────────────────────────────────────────────
function SchedulePageSection({ d, oc }) {
  const s = d.schedule;
  const u = (k,v) => oc("schedule",{...s,[k]:v});
  const uSvc = (i,k,v) => { const n=[...s.services]; n[i]={...n[i],[k]:v}; oc("schedule",{...s,services:n}); };

  return (
    <div>
      <div className="card">
        <div className="card-head"><div className="card-title">Schedule Page Hero</div></div>
        <div className="card-body">
          <div className="g2">
            <F label="Section Label"><Inp value={s.heroLabel} onChange={e=>u("heroLabel",e.target.value)} /></F>
            <F label="Headline"><Inp value={s.heroHeadline} onChange={e=>u("heroHeadline",e.target.value)} /></F>
          </div>
          <F label="Sidebar Body Text"><Ta value={s.heroBody} onChange={e=>u("heroBody",e.target.value)} /></F>
        </div>
      </div>
      <div className="card">
        <div className="card-head"><div className="card-title">Consultation Service Options</div><div className="card-sub">Shown in Step 1 of the booking flow</div></div>
        <div className="card-body">
          {s.services.map((svc,i) => (
            <div className="rep-item" key={i}>
              <div className="rep-head"><span className="rep-num">{svc.icon} {svc.name}</span></div>
              <div className="g3">
                <F label="Icon (emoji)"><Inp value={svc.icon} onChange={e=>uSvc(i,"icon",e.target.value)} style={{width:60}} /></F>
                <F label="Service Name"><Inp value={svc.name} onChange={e=>uSvc(i,"name",e.target.value)} /></F>
              </div>
              <F label="Description"><Ta value={svc.desc} onChange={e=>uSvc(i,"desc",e.target.value)} style={{minHeight:52}} /></F>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  SECTION: BLOG POSTS
// ─────────────────────────────────────────────────────────────
function BlogSection({ d, oc }) {
  const [selId, setSelId] = useState(d.blog[0]?.id || null);
  const [imgUploading, setImgUploading] = useState(false);
  const posts = d.blog;
  const post  = posts.find(p => p.id === selId);
  const u = (k,v) => oc("blog", posts.map(p => p.id===selId ? {...p,[k]:v} : p));
  const handleImgUpload = async (file) => {
    setImgUploading(true);
    try {
      const url = await uploadImage(file);
      if (url) u("imageUrl", url);
    } catch(e) {
      alert("Blog image upload failed: " + e.message);
    } finally {
      setImgUploading(false);
    }
  };
  const add = () => {
    const nid = Math.max(0, ...posts.map(p=>p.id)) + 1;
    const np = {id:nid,cat:"General",title:"New Article",excerpt:"Excerpt.",author:"Admin",date:new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}),status:"draft",featured:false};
    oc("blog",[...posts,np]); setSelId(nid);
  };
  const del = (id) => { oc("blog",posts.filter(p=>p.id!==id)); setSelId(posts[0]?.id||null); };
  const CATS = ["Free Zone Guide","Market Intelligence","Incorporation Guide","Banking & Finance","Visa & Residency","PRO Services","General"];

  return (
    <div style={{display:"grid",gridTemplateColumns:"270px 1fr",gap:"16px"}}>
      {/* Post list */}
      <div className="card" style={{height:"fit-content"}}>
        <div className="card-head">
          <div className="card-title">All Posts ({posts.length})</div>
          <button className="btn btn-p btn-sm" onClick={add}>+ New</button>
        </div>
        <div className="blog-list">
          {posts.map(p => (
            <div className={`brow${selId===p.id?" on":""}`} key={p.id} onClick={()=>setSelId(p.id)}>
              <div style={{flex:1,minWidth:0}}>
                <div className="brow-title">{p.title}</div>
                <div className="brow-meta">{p.cat} · {p.date}</div>
              </div>
              <Bdg status={p.status} />
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      {post ? (
        <div className="card">
          <div className="card-head">
            <div><div className="card-title">Post #{post.id}</div><div className="card-sub">{post.date}</div></div>
            <div className="btn-group">
              <button className="btn btn-ok btn-sm" onClick={()=>u("status","published")}> Publish</button>
              <button className="btn btn-s btn-sm" onClick={()=>u("status","draft")}>Draft</button>
              <button className="btn btn-d btn-sm" onClick={()=>del(post.id)}>Delete</button>
            </div>
          </div>
          <div className="card-body">
            {/* ── Metadata ── */}
            <div className="g3">
              <F label="Category">
                <Sel value={post.cat||""} onChange={e=>u("cat",e.target.value)} opts={CATS} />
              </F>
              <F label="Author"><Inp value={post.author||""} onChange={e=>u("author",e.target.value)} /></F>
              <F label="Publish Date"><Inp value={post.date||""} onChange={e=>u("date",e.target.value)} placeholder="April 18, 2026" /></F>
              <F label="Read Time" hint='e.g. "6 min read"'><Inp value={post.readTime||""} onChange={e=>u("readTime",e.target.value)} placeholder="5 min read" /></F>
              <F label="Kicker Label" hint='e.g. "EXCLUSIVE ANALYSIS"'><Inp value={post.kicker||""} onChange={e=>u("kicker",e.target.value)} placeholder="FEATURED" /></F>
              <F label="Status">
                <Sel value={post.status||"draft"} onChange={e=>u("status",e.target.value)}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </Sel>
              </F>
              <F label="Featured Article" full>
                <div className="toggle-wrap">
                  <label className="toggle">
                    <input type="checkbox" checked={!!post.featured} onChange={e=>u("featured",e.target.checked)} />
                    <div className="toggle-track" />
                    <div className="toggle-thumb" />
                  </label>
                  <span className="toggle-lbl">{post.featured ? "Featured (shown in lead position)" : "Standard listing"}</span>
                </div>
              </F>
            </div>

            <div className="divider" />

            {/* ── Core content ── */}
            <F label="Article Title">
              <CharTa value={post.title||""} onChange={e=>u("title",e.target.value)} max={120} style={{minHeight:52}} />
            </F>
            <F label="Excerpt / Deck" hint="Shown on blog index cards and in Google search results">
              <CharTa value={post.excerpt||post.deck||""} onChange={e=>u("excerpt",e.target.value)} max={280} />
            </F>
            <F label="Featured Image" hint="Displayed at the top of the blog post on the live site">
              <div style={{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"}}>
                {post.imageUrl && <img src={post.imageUrl} alt="Featured" style={{width:80,height:56,objectFit:"cover",borderRadius:4,border:"1px solid var(--bdr2)"}} />}
                <label className="btn btn-s btn-sm" style={{cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6}}>
                  <input type="file" accept="image/*" style={{display:"none"}} disabled={imgUploading}
                    onChange={e => { if(e.target.files[0]) handleImgUpload(e.target.files[0]); e.target.value=""; }} />
                  {imgUploading ? "Uploading…" : post.imageUrl ? "Change Image" : "Upload Image"}
                </label>
                {post.imageUrl && <button className="btn btn-d btn-sm" onClick={()=>u("imageUrl","")}>Remove</button>}
              </div>
              {post.imageUrl && <div className="hint" style={{marginTop:4}}>URL: {post.imageUrl}</div>}
            </F>
            <F label="Image Caption / Label" hint="Descriptive label shown under the article hero image">
              <Inp value={post.imgLabel||""} onChange={e=>u("imgLabel",e.target.value)} placeholder="Dubai Skyline · DMCC Headquarters" />
            </F>

            <div className="divider" />

            {/* ── Article body ── */}
            <F label="Article Body — Part 1" hint="Write full paragraphs. Separate paragraphs with a blank line (press Enter twice). This is the main article content shown to readers.">
              <Ta
                value={Array.isArray(post.body) ? post.body.join("\n\n") : (post.body||"")}
                onChange={e => u("body", e.target.value.split(/\n{2,}/).map(p=>p.trim()).filter(Boolean))}
                style={{minHeight:260,lineHeight:1.7}}
              />
              <div className="hint" style={{marginTop:4}}>
                {(Array.isArray(post.body) ? post.body : (post.body||"").split(/\n{2,}/)).filter(Boolean).length} paragraph(s)
              </div>
            </F>
            <F label="Pull Quote" hint="Highlighted quote shown mid-article in large italic text">
              <Inp value={post.pullQuote||""} onChange={e=>u("pullQuote",e.target.value)} placeholder='"Your most compelling insight from the article."' />
            </F>
            <F label="Subheading (optional)" hint="Shown as a bold heading before Part 2">
              <Inp value={post.subhead||""} onChange={e=>u("subhead",e.target.value)} placeholder="Section heading..." />
            </F>
            <F label="Article Body — Part 2 (optional)" hint="Continuation after the subheading. Separate paragraphs with a blank line.">
              <Ta
                value={Array.isArray(post.body2) ? post.body2.join("\n\n") : (post.body2||"")}
                onChange={e => u("body2", e.target.value ? e.target.value.split(/\n{2,}/).map(p=>p.trim()).filter(Boolean) : [])}
                style={{minHeight:140,lineHeight:1.7}}
              />
            </F>

            <div className="preview">
              <div className="preview-lbl">Card Preview</div>
              <span className="tag">{post.cat}</span>
              {post.featured && <span className="tag" style={{background:"var(--purfaint)",color:"var(--pur)"}}>Featured</span>}
              <div className="preview-h" style={{marginTop:"8px",fontSize:"1.2rem"}}>{post.title}</div>
              <div className="preview-p" style={{marginTop:"5px"}}>{post.excerpt||post.deck}</div>
              <div style={{fontSize:".63rem",color:"var(--txt3)",marginTop:"8px"}}>{post.author} · {post.date} · {post.readTime||"5 min read"}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card"><div className="empty"><span className="empty-icon"></span>Select a post to edit</div></div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  SECTION: ENQUIRIES
// ─────────────────────────────────────────────────────────────
function Enquiries({ d, oc }) {
  const [sel, setSel] = useState(null);
  const enqs = d.enquiries;
  const selected = enqs.find(e => e.id === sel);
  const persist = (list) => {
    oc("enquiries", list);
    pushCRM("enquiries.json", list);
  };
  const u = (id, k, v) => {
    persist(enqs.map(e => e.id===id ? {...e,[k]:v} : e));
  };
  const del = (id) => {
    persist(enqs.filter(e => e.id!==id));
    setSel(null);
  };

  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:"16px"}}>
      <div className="card">
        <div className="card-head">
          <div className="card-title">Contact Form Enquiries ({enqs.length})</div>
          <span style={{fontSize:".68rem",color:"var(--txt3)"}}>{enqs.filter(e=>e.status==="new").length} unread</span>
        </div>
        <table className="tbl">
          <thead><tr><th>Name</th><th>Service Requested</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>{enqs.map(e => (
            <tr key={e.id} style={{cursor:"pointer"}} onClick={()=>setSel(sel===e.id?null:e.id)}>
              <td><div className="tbl-name">{e.name}</div><div className="tbl-meta">{e.email}</div></td>
              <td style={{fontSize:".72rem",maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{e.service}</td>
              <td style={{fontSize:".72rem",color:"var(--txt3)"}}>{e.date}</td>
              <td><Bdg status={e.status} /></td>
              <td onClick={ev=>ev.stopPropagation()}>
                <div className="btn-group">
                  <button className="btn btn-ok btn-xs" onClick={()=>u(e.id,"status","replied")}> Replied</button>
                  <button className="btn btn-d btn-xs" onClick={()=>del(e.id)}></button>
                </div>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      {selected ? (
        <div className="card enq-detail">
          <div className="card-head"><div className="card-title">{selected.name}</div><Bdg status={selected.status} /></div>
          <div className="card-body">
            {[["Email",selected.email],["Phone",selected.phone],["Service",selected.service],["Date Received",selected.date]].map(([k,v])=>(
              <div className="detail-row" key={k}><div className="detail-key">{k}</div><div className="detail-val">{v}</div></div>
            ))}
            <div style={{marginTop:12}}>
              <div className="detail-key" style={{marginBottom:5}}>Message</div>
              <div className="msg-box">{selected.message}</div>
            </div>
            <div style={{marginTop:14}} className="btn-group">
              <button className="btn btn-p btn-sm" onClick={()=>u(selected.id,"status","replied")}> Mark Replied</button>
              <button className="btn btn-s btn-sm" onClick={()=>u(selected.id,"status","read")}>Mark Read</button>
              <button className="btn btn-d btn-sm" onClick={()=>del(selected.id)}>Delete</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card"><div className="empty"><span className="empty-icon"></span>Click a row to view details</div></div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  SECTION: CONSULTATIONS
// ─────────────────────────────────────────────────────────────
function Consultations({ d, oc }) {
  const cs = d.consultations;
  const persist = (list) => {
    oc("consultations", list);
    pushCRM("consultations.json", list);
  };
  const u   = (id,k,v) => persist(cs.map(c => c.id===id ? {...c,[k]:v} : c));
  const del = (id) => persist(cs.filter(c => c.id!==id));

  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">Scheduled Consultations ({cs.length})</div>
          <div className="card-sub">{cs.filter(c=>c.status==="pending").length} awaiting confirmation</div>
        </div>
      </div>
      <table className="tbl">
        <thead><tr><th>Client</th><th>Service</th><th>Date & Time</th><th>Duration</th><th>Status</th><th>Notes</th><th>Actions</th></tr></thead>
        <tbody>{cs.map(c => (
          <tr key={c.id}>
            <td><div className="tbl-name">{c.name}</div><div className="tbl-meta">{c.email}</div></td>
            <td style={{fontSize:".72rem"}}>{c.service}</td>
            <td><div style={{fontSize:".74rem"}}>{c.date}</div><div className="tbl-meta">{c.time}</div></td>
            <td style={{fontSize:".74rem"}}>{c.duration} min</td>
            <td>
              <Sel value={c.status} onChange={e=>u(c.id,"status",e.target.value)} style={{padding:"4px 8px",fontSize:".68rem",width:"auto",minWidth:100}}>
                {["pending","confirmed","completed","cancelled"].map(s=><option key={s}>{s}</option>)}
              </Sel>
            </td>
            <td style={{fontSize:".72rem",color:"var(--txt3)",maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.notes||"—"}</td>
            <td>
              <div className="btn-group">
                <button className="btn btn-ok btn-xs" onClick={()=>u(c.id,"status","confirmed")}> Confirm</button>
                <button className="btn btn-d btn-xs"  onClick={()=>del(c.id)}></button>
              </div>
            </td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  NAV STRUCTURE
// ─────────────────────────────────────────────────────────────
const NAV_GROUPS = [
  { group: "Overview", items: [
    { id: "dashboard",     icon: IGrid, label: "Dashboard" },
    { id: "enquiries",     icon: IMessageSquare, label: "Enquiries",         badge: "red" },
    { id: "consultations", icon: ICalendar, label: "Consultations",     badge: "gold" },
  ]},
  { group: "Site Content", items: [
    { id: "global",   icon: IGlobe,  label: "Global Settings" },
    { id: "home",     icon: IHome,  label: "Home Page" },
    { id: "services", icon: IBriefcase,  label: "Services Page" },
    { id: "about",    icon: IUsers,  label: "About Page" },
    { id: "contact",  icon: IPhone,  label: "Contact Page" },
    { id: "schedule", icon: IClock,  label: "Schedule Page" },
  ]},
  { group: "Free Zones", items: [
    { id: "zones",    icon: IBuilding,  label: "All Free Zones" },
  ]},
  { group: "Blog", items: [
    { id: "blog",     icon: IBookOpen,  label: "Blog Posts" },
  ]},
];

const SECTION_TITLES = {
  dashboard: "Dashboard Overview",
  enquiries: "Contact Enquiries",
  consultations: "Scheduled Consultations",
  global:   "Global Settings",
  home:     "Home Page Content",
  services: "Services Page",
  about:    "About Page",
  contact:  "Contact Page",
  schedule: "Schedule Page",
  zones:    "Free Zones Editor",
  blog:     "Blog Posts",
};

// ─────────────────────────────────────────────────────────────
//  MAIN EXPORT
// ─────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed,  setAuthed]  = useState(false);
  const [pass,    setPass]    = useState("");
  const [ghToken, setGhToken] = useState("");
  const [passErr, setPassErr] = useState("");
  const [section, setSection] = useState("dashboard");
  const [data,    setData]    = useState(DEFAULT);
  const [saving,  setSaving]  = useState(false);
  const [toast,   setToast]   = useState(false);
  const [toastMsg,setToastMsg]= useState("");

  // Load site content on mount + check remembered auth
  useEffect(() => {
    try {
      if (localStorage.getItem("incozone_auth") === "1") setAuthed(true);
    } catch(_) {}

    fetch(`/content.json?v=${Date.now()}`)
      .then(r => r.json())
      .then(d => setData(prev => ({ ...prev, ...d })))
      .catch(() => {});
  }, []);

  // Load CRM data (enquiries + consultations) whenever admin logs in
  useEffect(() => {
    if (!authed) return;
    const token = getToken();
    if (token) loadCRMData(token, setData);
  }, [authed]);

  const login = () => {
    if (pass === ADMIN_PASS) {
      if (ghToken) sessionStorage.setItem("gh_token", ghToken);
      setAuthed(true);
      localStorage.setItem("incozone_auth", "1");
    } else {
      setPassErr("Incorrect password.");
    }
  };

  const save = () => {
    setSaving(true);
    const { enquiries, consultations, ...contentToSave } = data;
    pushContent(contentToSave)
      .then(() => {
        setSaving(false);
        setToastMsg("Saved! Site will update in ~60 seconds.");
        setToast(true);
        setTimeout(() => setToast(false), 5000);
      })
      .catch(err => {
        setSaving(false);
        alert("Save failed: " + err.message + "\n\nMake sure GITHUB_TOKEN is set in Vercel environment variables.");
      });
  };

  const change = (sec, val) => setData(p => ({ ...p, [sec]: val }));
  const logout = () => { setAuthed(false); localStorage.removeItem("incozone_auth"); sessionStorage.removeItem("gh_token"); };

  const newEnq   = data.enquiries.filter(e => e.status === "new").length;
  const pendingC = data.consultations.filter(c => c.status === "pending").length;

  // ── LOGIN SCREEN ──────────────────────────────────────────
  if (!authed) return (
    <>
      <style>{CSS}</style>
      <div className="login">
        <div className="login-box" style={{width:440}}>
          <div className="login-brand">INCO<em>ZONE</em></div>
          <span className="login-sub">Admin CMS — Authorised Access Only</span>
          <div className="field">
            <label className="lbl">Admin Password</label>
            <input className="inp" type="password" placeholder="Enter password"
              value={pass} onChange={e=>{setPass(e.target.value);setPassErr("");}}
              onKeyDown={e=>e.key==="Enter"&&login()} autoFocus />
            {passErr && <span className="login-err">{passErr}</span>}
          </div>
          <button className="btn btn-p" style={{width:"100%",marginTop:4,justifyContent:"center",padding:"11px"}} onClick={login}>
            Access Dashboard →
          </button>
          <div style={{fontSize:".62rem",color:"var(--txt3)",marginTop:18,textAlign:"center"}}>
            Protected. Authorised personnel only.
          </div>
        </div>
      </div>
    </>
  );

  // ── MAIN SHELL ────────────────────────────────────────────
  return (
    <>
      <style>{CSS}</style>
      <div className="shell">

        {/* SIDEBAR */}
        <div className="sb">
          <div className="sb-brand">
            <div className="sb-logo">INCO<em>ZONE</em></div>
            <span className="sb-logo-sub">Content Management System</span>
          </div>

          {NAV_GROUPS.map(grp => (
            <div key={grp.group}>
              <div className="sb-grp">{grp.group}</div>
              {grp.items.map(item => (
                <div key={item.id}
                  className={`sb-item${section===item.id?" on":""}`}
                  onClick={() => setSection(item.id)}>
                  <span className="sb-ico">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.id==="enquiries"     && newEnq>0   && <span className="sb-badge sb-badge-red">{newEnq}</span>}
                  {item.id==="consultations" && pendingC>0 && <span className="sb-badge sb-badge-gold">{pendingC}</span>}
                </div>
              ))}
            </div>
          ))}

          <div className="sb-foot">
            <div className="sb-av">A</div>
            <div className="sb-user"><strong>Admin</strong>INCOZONE CMS v2</div>
            <button className="sb-logout" onClick={logout} title="Log out"></button>
          </div>
        </div>

        {/* TOPBAR + MAIN */}
        <div style={{flex:1,minWidth:0}}>
          <div className="topbar">
            <div className="topbar-title">{SECTION_TITLES[section]}</div>
            <div className="topbar-right">
              <div className="live-pill">Site Live</div>
              <button className={`save-btn${saving?" saving":""}`} onClick={save}>
                {saving ? " Saving…" : " Save All Changes"}
              </button>
            </div>
          </div>

          <div className="main">
            {section==="dashboard"     && <Dashboard          d={data} />}
            {section==="global"        && <GlobalSettings     d={data} oc={change} />}
            {section==="home"          && <HomePage           d={data} oc={change} />}
            {section==="services"      && <ServicesPage       d={data} oc={change} />}
            {section==="about"         && <AboutPage          d={data} oc={change} />}
            {section==="contact"       && <ContactPageSection d={data} oc={change} />}
            {section==="schedule"      && <SchedulePageSection d={data} oc={change} />}
            {section==="zones"         && <FreeZones          d={data} oc={change} />}
            {section==="blog"          && <BlogSection        d={data} oc={change} />}
            {section==="enquiries"     && <Enquiries          d={data} oc={change} />}
            {section==="consultations" && <Consultations      d={data} oc={change} />}
          </div>
        </div>
      </div>

      {toast && <div className="toast"> {toastMsg || "All changes saved successfully"}</div>}
    </>
  );
}