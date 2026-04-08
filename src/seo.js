// ─── INCOZONE SEO Configuration ───────────────────────────────
// Central source of truth for all page meta tags.
// Update PHONE_NUMBER before going live.

export const PHONE_NUMBER    = "+971 4 000 0000";   // ⚠️ REPLACE with real number
export const PHONE_HREF      = "+97140000000";       // ⚠️ REPLACE (no spaces/dashes)
export const WHATSAPP_NUMBER = "971500000000";       // ⚠️ REPLACE (country code + number, no +)
export const BASE_URL        = "https://www.incozone.com";
export const BRAND           = "INCOZONE";

export const PAGE_META = {
  home: {
    title: "UAE Company Formation | Free Zone Setup Dubai | INCOZONE",
    description: "Set up your UAE company from AED 5,500. Expert free zone & mainland formation — DMCC, IFZA, ADGM, JAFZA, RAKEZ. 3,200+ companies incorporated since 2012. Free consultation.",
    canonical: `${BASE_URL}/`,
  },
  services: {
    title: "UAE Business Setup Services | Company Formation, Visa & Banking | INCOZONE",
    description: "Complete UAE business setup services: free zone incorporation, mainland formation, investor visa, corporate banking, PRO services and more. Expert advisory since 2012.",
    canonical: `${BASE_URL}/services`,
  },
  freezoneincorp: {
    title: "Free Zone Company Setup Dubai 2026 | DMCC, IFZA, RAKEZ | INCOZONE",
    description: "Set up your UAE free zone company in 3–14 days. Compare DMCC, IFZA, Meydan, RAKEZ, SHAMS, JAFZA, AFZ and ADGM. Packages from AED 5,500. Expert advisory.",
    canonical: `${BASE_URL}/freezoneincorp`,
  },
  mainland: {
    title: "Mainland Company Formation UAE | Dubai LLC Setup | INCOZONE",
    description: "Form your UAE mainland company with 100% foreign ownership. DED-licensed LLC, professional licenses, and local market access. Full government liaison included.",
    canonical: `${BASE_URL}/mainland`,
  },
  banking: {
    title: "Corporate Bank Account Opening UAE | Business Banking Setup | INCOZONE",
    description: "Open your UAE corporate bank account with expert guidance. Relationships with Emirates NBD, ADCB, Mashreq, FAB and international banks. High approval rate.",
    canonical: `${BASE_URL}/banking`,
  },
  goldenvisa: {
    title: "UAE Golden Visa 2026 | 10-Year Residency Visa | INCOZONE",
    description: "Apply for the UAE Golden Visa through your business. 10-year renewable residency for investors, entrepreneurs, and professionals. Complete application management.",
    canonical: `${BASE_URL}/goldenvisa`,
  },
  visa: {
    title: "UAE Investor & Residence Visa | Company Visa Processing | INCOZONE",
    description: "UAE investor, employee and dependent visa processing. Complete end-to-end service from application to Emirates ID collection. Fast approval track available.",
    canonical: `${BASE_URL}/visa`,
  },
  pro: {
    title: "PRO Services Dubai | Government Document Services | INCOZONE",
    description: "Professional PRO services in Dubai — immigration, ministry approvals, license renewals, attestation, and all government document processing. Dedicated PRO officers.",
    canonical: `${BASE_URL}/pro`,
  },
  about: {
    title: "About INCOZONE | UAE Business Setup Experts Since 2012",
    description: "INCOZONE has incorporated 3,200+ companies across UAE free zones and mainland since 2012. Meet our team of business setup advisors and PRO specialists.",
    canonical: `${BASE_URL}/about`,
  },
  contact: {
    title: "Contact INCOZONE | UAE Company Formation Experts",
    description: "Contact INCOZONE for a free consultation on UAE company formation, visa, banking and PRO services. Offices in Dubai. Available 7 days a week.",
    canonical: `${BASE_URL}/contact`,
  },
  blog: {
    title: "UAE Business Setup Blog & Guides 2026 | INCOZONE",
    description: "Expert guides on UAE company formation, free zone comparison, visa requirements, corporate banking and business setup costs. Updated for 2026.",
    canonical: `${BASE_URL}/blog`,
  },
  schedule: {
    title: "Book Free Consultation | UAE Company Formation | INCOZONE",
    description: "Schedule a free 30-minute consultation with an INCOZONE business setup expert. Same-day appointments available. No obligation.",
    canonical: `${BASE_URL}/schedule`,
  },
  dmcc: {
    title: "DMCC Company Formation Dubai 2026 | From AED 18,500 | INCOZONE",
    description: "Set up your DMCC company in 7–14 days. World's most connected free zone — 23,000+ companies. Trading, fintech, commodities licenses. Full package from AED 18,500.",
    canonical: `${BASE_URL}/dmcc`,
  },
  ifza: {
    title: "IFZA Free Zone Company Setup Dubai | From AED 12,900 | INCOZONE",
    description: "IFZA company formation in 3–7 days. UAE's most flexible free zone for startups and SMEs. 100+ business activities. Packages from AED 12,900.",
    canonical: `${BASE_URL}/ifza`,
  },
  meydan: {
    title: "Meydan Free Zone Company Formation | From AED 14,500 | INCOZONE",
    description: "Premium Meydan Free Zone setup in 5–10 days. Ideal for consultancies, tech firms and lifestyle brands in Dubai's most iconic district. From AED 14,500.",
    canonical: `${BASE_URL}/meydan`,
  },
  rakez: {
    title: "RAKEZ Company Setup Ras Al Khaimah | From AED 8,500 | INCOZONE",
    description: "RAKEZ business setup in 3–7 days. UAE's most competitive zone for manufacturing, trading and industrial operations. Low-cost packages from AED 8,500.",
    canonical: `${BASE_URL}/rakez`,
  },
  shams: {
    title: "SHAMS Free Zone Setup Sharjah | Media License UAE | INCOZONE",
    description: "SHAMS Sharjah Media City company formation in 5–8 days. UAE's leading free zone for media, content creators and consultancies. From AED 11,500.",
    canonical: `${BASE_URL}/shams`,
  },
  jafza: {
    title: "JAFZA Company Registration Dubai | Logistics Free Zone | INCOZONE",
    description: "JAFZA setup in 7–14 days. World's largest free zone — direct access to Jebel Ali port. Ideal for logistics, import/export and large-scale trade. From AED 22,000.",
    canonical: `${BASE_URL}/jafza`,
  },
  afz: {
    title: "Ajman Free Zone Setup | Cheapest UAE Free Zone | From AED 5,500 | INCOZONE",
    description: "AFZ Ajman Free Zone company formation in 2–5 days. UAE's most affordable free zone. Perfect for startups, freelancers and entrepreneurs. From AED 5,500.",
    canonical: `${BASE_URL}/afz`,
  },
  adgm: {
    title: "ADGM Company Formation Abu Dhabi | Financial Services | INCOZONE",
    description: "ADGM Abu Dhabi Global Market setup in 10–21 days. Premier international financial centre for asset management, fintech and regulated financial services. From AED 28,500.",
    canonical: `${BASE_URL}/adgm`,
  },
};

// Structured data schemas per page
export function getZoneSchema(zone) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${zone.full} Company Formation`,
    "provider": {
      "@type": "LocalBusiness",
      "name": BRAND,
      "url": BASE_URL,
    },
    "areaServed": "United Arab Emirates",
    "description": zone.desc,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "AED",
      "price": zone.setupFrom?.replace("AED ", ""),
    },
  };
}
