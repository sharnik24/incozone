// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Master SEO Configuration
//  Covers: meta titles, descriptions, canonicals, FAQ schemas,
//  HowTo schemas, Service schemas, BreadcrumbList, Organization
//  Target: rank #1 + dominate "People Also Ask" for every
//  UAE business setup keyword
// ═══════════════════════════════════════════════════════════════

export const PHONE_NUMBER    = "+971 56 583 4586";
export const PHONE_HREF      = "+971565834586";
export const WHATSAPP_NUMBER = "971565834586";
export const BASE_URL        = "https://www.incozone.com";
export const BRAND           = "INCOZONE";

// ─── PAGE META ────────────────────────────────────────────────
export const PAGE_META = {
  home: {
    title: "UAE Company Formation | Free Zone & Mainland Setup | INCOZONE",
    description: "Set up your UAE company from AED 5,500 in 2–14 days. Free zone & mainland formation — DMCC, IFZA, ADGM, JAFZA, RAKEZ. 3,200+ companies since 2012.",
    canonical: `${BASE_URL}/`,
  },
  services: {
    title: "UAE Business Setup Services 2026 | Full Advisory | INCOZONE",
    description: "UAE business setup: free zone incorporation, mainland LLC, investor visa, Golden Visa, corporate banking, PRO services. All-in-one advisory since 2012.",
    canonical: `${BASE_URL}/services`,
  },
  freezoneincorp: {
    title: "Free Zone Company Setup Dubai 2026 | All UAE Free Zones | INCOZONE",
    description: "UAE free zone company formation from AED 5,500. Compare DMCC, IFZA, Meydan, RAKEZ, SHAMS, JAFZA, AFZ, ADGM. 100% foreign ownership. Zero tax. 2–14 days.",
    canonical: `${BASE_URL}/freezoneincorp`,
  },
  mainland: {
    title: "Mainland Company Formation UAE 2026 | Dubai LLC Setup | INCOZONE",
    description: "Form your UAE mainland LLC with 100% foreign ownership. DED-licensed trading & professional licenses. Local market access. Government liaison. From AED 15,000.",
    canonical: `${BASE_URL}/mainland`,
  },
  banking: {
    title: "Corporate Bank Account Opening UAE 2026 | Business Banking | INCOZONE",
    description: "Open UAE corporate bank account — Emirates NBD, ADCB, Mashreq, FAB, Wio. High approval rate. Full documentation support. Free zone & mainland companies welcome.",
    canonical: `${BASE_URL}/banking`,
  },
  goldenvisa: {
    title: "UAE Golden Visa 2026 | 10-Year Residency for Investors | INCOZONE",
    description: "UAE Golden Visa — 10-year renewable residency for investors, entrepreneurs & professionals. AED 2M property or business investment. Full application management.",
    canonical: `${BASE_URL}/goldenvisa`,
  },
  visa: {
    title: "UAE Investor Visa & Residence Visa Processing 2026 | INCOZONE",
    description: "UAE investor, employee and dependent residence visa. Emirates ID, medical, labour card. Fast-track processing. Company owner visas from AED 3,500.",
    canonical: `${BASE_URL}/visa`,
  },
  pro: {
    title: "PRO Services Dubai 2026 | Government Document Processing | INCOZONE",
    description: "Dubai PRO services — ministry approvals, immigration, license renewals, attestation, ejari, power of attorney. Dedicated PRO officer. Retainer available.",
    canonical: `${BASE_URL}/pro`,
  },
  about: {
    title: "About INCOZONE | UAE Business Setup Experts Since 2012 | Dubai",
    description: "Since 2012, INCOZONE has incorporated 3,200+ companies across UAE free zones and mainland. Advisory-first approach. Dubai's most trusted business setup firm.",
    canonical: `${BASE_URL}/about`,
  },
  contact: {
    title: "Contact INCOZONE | Free UAE Company Formation Consultation",
    description: "Get a free consultation on UAE company formation, visa and banking. Dubai offices. Available 7 days. Reply within 1 hour. Email: advisory@incozone.ae",
    canonical: `${BASE_URL}/contact`,
  },
  blog: {
    title: "UAE Business Setup Guides & Insights 2026 | INCOZONE Blog",
    description: "Expert guides: free zone vs mainland, setup costs, visa requirements, DMCC vs IFZA comparison, corporate banking UAE, Golden Visa 2026. Updated regularly.",
    canonical: `${BASE_URL}/blog`,
  },
  schedule: {
    title: "Book Free UAE Company Formation Consultation | INCOZONE",
    description: "Schedule a free 30-minute strategy call with an INCOZONE business setup expert. Same-day slots available. No obligation, no hard sell.",
    canonical: `${BASE_URL}/schedule`,
  },
  dmcc: {
    title: "DMCC Company Formation Dubai 2026 | From AED 18,500 | INCOZONE",
    description: "DMCC setup in 7–14 days. World's most connected free zone — 23,000+ companies. Commodities, trading, fintech, consulting. Full package from AED 18,500.",
    canonical: `${BASE_URL}/dmcc`,
  },
  ifza: {
    title: "IFZA Free Zone Company Setup Dubai 2026 | From AED 12,900 | INCOZONE",
    description: "IFZA company in 3–7 days. UAE's most flexible free zone for startups & SMEs. 100+ activities. Multiple visas. Packages from AED 12,900. Fast and affordable.",
    canonical: `${BASE_URL}/ifza`,
  },
  meydan: {
    title: "Meydan Free Zone Setup Dubai 2026 | Premium Location | INCOZONE",
    description: "Meydan Free Zone company in 5–10 days. Premium Dubai address for consultancies, tech & lifestyle brands. Flexi desk to private office. From AED 14,500.",
    canonical: `${BASE_URL}/meydan`,
  },
  rakez: {
    title: "RAKEZ Company Setup 2026 | Ras Al Khaimah | From AED 8,500 | INCOZONE",
    description: "RAKEZ business setup in 3–7 days. UAE's most competitive zone for manufacturing, trading & industrial. Warehouse & factory units. Low-cost from AED 8,500.",
    canonical: `${BASE_URL}/rakez`,
  },
  shams: {
    title: "SHAMS Sharjah Media City Free Zone 2026 | Media License UAE | INCOZONE",
    description: "SHAMS company formation in 5–8 days. UAE's #1 media free zone for content creators, agencies & consultancies. From AED 11,500. Social media, PR, production.",
    canonical: `${BASE_URL}/shams`,
  },
  jafza: {
    title: "JAFZA Company Registration Dubai 2026 | Logistics & Trade | INCOZONE",
    description: "JAFZA setup in 7–14 days. World's largest free zone — direct Jebel Ali port access. Ideal for logistics, import/export, large-scale trade. From AED 22,000.",
    canonical: `${BASE_URL}/jafza`,
  },
  afz: {
    title: "Ajman Free Zone Setup 2026 | Cheapest UAE Free Zone | INCOZONE",
    description: "AFZ company in 2–5 days. UAE's most affordable free zone. Perfect for startups, freelancers & entrepreneurs. Trading, consulting, e-commerce. From AED 5,500.",
    canonical: `${BASE_URL}/afz`,
  },
  adgm: {
    title: "ADGM Company Formation Abu Dhabi 2026 | Financial Centre | INCOZONE",
    description: "ADGM setup in 10–21 days. Abu Dhabi's premier IFC for asset management, fintech & regulated financial services. English common law. From AED 28,500.",
    canonical: `${BASE_URL}/adgm`,
  },
  offshore: {
    title: "UAE Offshore Company Formation 2026 | RAK ICC & JAFZA | INCOZONE",
    description: "UAE offshore company formation — RAK ICC and JAFZA offshore. 100% foreign ownership, zero tax, no audit requirement, full privacy. From AED 8,000.",
    canonical: `${BASE_URL}/offshore`,
  },
  trademark: {
    title: "Trademark Registration UAE 2026 | Brand Protection | INCOZONE",
    description: "Register your trademark in UAE with the Ministry of Economy. Protect your brand across all 45 classes. Fast-track available. Full IP protection from AED 3,500.",
    canonical: `${BASE_URL}/trademark`,
  },
  amendments: {
    title: "Company Amendments UAE | License Renewal & Modifications | INCOZONE",
    description: "UAE company amendments — shareholder changes, activity additions, name change, license renewal, MOA amendments. All free zones and mainland. Fast turnaround.",
    canonical: `${BASE_URL}/amendments`,
  },
  liquidation: {
    title: "Company Liquidation UAE 2026 | Business Closure Services | INCOZONE",
    description: "Orderly UAE company liquidation and deregistration. Free zone and mainland closure. Visa cancellation, bank account & license cancellation. Fully managed.",
    canonical: `${BASE_URL}/liquidation`,
  },
  specialapprovals: {
    title: "Special Approvals UAE | Regulated Business Licenses | INCOZONE",
    description: "UAE special approvals for regulated activities — healthcare, education, finance, food, real estate, crypto. Ministry approvals and sector-specific licenses.",
    canonical: `${BASE_URL}/specialapprovals`,
  },
  willregistration: {
    title: "Will Registration UAE 2026 | Expat Wills & Estate Planning | INCOZONE",
    description: "Register your will in UAE — DIFC Wills Service Centre or Abu Dhabi Judicial Department. Protect assets and family. Expat will drafting from AED 4,500.",
    canonical: `${BASE_URL}/willregistration`,
  },
};

// ─── MASTER FAQ — 50 Questions targeting every PAA box ────────
// These cover every search variation Google shows in "People Also Ask"
export const MASTER_FAQ = [
  // ── COST QUESTIONS ──
  { q: "How much does it cost to set up a company in Dubai?", a: "Setting up a company in Dubai costs between AED 5,500 and AED 50,000+ depending on the free zone and package. The cheapest option is Ajman Free Zone (AFZ) from AED 5,500. RAKEZ starts from AED 8,500, IFZA from AED 12,900, Meydan from AED 14,500, DMCC from AED 18,500, JAFZA from AED 22,000, and ADGM from AED 28,500. Mainland company formation starts from around AED 15,000. These costs typically include the trade license but exclude visa fees and office rent." },
  { q: "What is the cheapest free zone in UAE?", a: "Ajman Free Zone (AFZ) is the cheapest free zone in UAE, with packages starting from AED 5,500 for a basic trade license. RAKEZ (Ras Al Khaimah Economic Zone) is the second most affordable at AED 8,500, followed by SHAMS (Sharjah Media City) at AED 11,500 and IFZA at AED 12,900. These budget-friendly zones offer full 100% foreign ownership, zero tax, and fast setup." },
  { q: "How much is a trade license in Dubai?", a: "A Dubai trade license costs between AED 5,500 and AED 50,000+ depending on the type and jurisdiction. Free zone licenses start from AED 5,500 (Ajman Free Zone) to AED 28,500 (ADGM). Mainland DED licenses range from AED 10,000 to AED 25,000+ depending on your business activity. Annual renewal costs are typically 60–80% of the initial license fee." },
  { q: "What is the cost of DMCC license in Dubai 2026?", a: "DMCC company formation starts from AED 18,500 for a basic Flexi Desk setup with 1 activity and 2 visas. A standard Business package with 3 activities and 4 visas costs around AED 26,900. An Elite package with unlimited activities, private office and 6+ visas costs AED 44,500. These prices include the trade license, registered address and company documents." },
  { q: "How much does an IFZA license cost?", a: "IFZA (International Free Zone Authority) license packages start from AED 12,900 for a Flexi package with 1 activity and virtual office. The Growth package with 3 activities and flexi desk costs AED 19,500. The full Corporate package with unlimited activities and private office is AED 34,500. IFZA is one of the most cost-effective free zones in Dubai." },
  { q: "What are the hidden costs of UAE company formation?", a: "Beyond the license fee, common additional costs in UAE company formation include: visa fees (AED 3,500–6,000 per visa), Emirates ID fees (AED 200–370), medical fitness test (AED 300–500), office or flexi desk rent (AED 5,000–50,000/year), bank account opening (sometimes with minimum deposit requirements), PRO service fees, and license renewal costs annually. Always request a full cost breakdown before proceeding." },

  // ── PROCESS QUESTIONS ──
  { q: "How long does it take to set up a company in UAE?", a: "UAE free zone company formation takes between 2 and 21 business days depending on the free zone. The fastest is Ajman Free Zone (AFZ) at 2–5 days, followed by RAKEZ at 3–7 days and IFZA at 3–7 days. DMCC takes 7–14 days and ADGM takes 10–21 days due to its regulated financial activities. Visa processing adds an additional 14–21 days after the license is issued." },
  { q: "What documents are required to set up a company in Dubai?", a: "To set up a company in Dubai, you typically need: a valid passport copy (all shareholders and managers), passport-sized photographs, a business plan or activity description, the proposed company name (3 options), your residential address proof, and UAE entry stamp or visit visa copy. For regulated activities (finance, healthcare, etc.), additional approvals and qualifications may be required. INCOZONE handles all document preparation and submission." },
  { q: "Can I set up a UAE company without visiting Dubai?", a: "Yes, most UAE free zone companies can be set up 100% remotely without visiting Dubai. Documents are submitted and signed digitally. The trade license and corporate documents are delivered electronically. However, UAE residence visa applications and Emirates ID collection require a physical visit to the UAE. INCOZONE manages the full remote process for companies including power of attorney arrangements." },
  { q: "What is the process to register a company in Dubai?", a: "The UAE company registration process has 5 steps: (1) Choose your business activity and free zone or mainland jurisdiction, (2) Select and reserve your company name, (3) Submit passport copies and application forms, (4) Pay the license fee and receive your trade license (3–14 days), (5) Apply for investor visa, Emirates ID and open a corporate bank account. INCOZONE manages all 5 steps end-to-end." },
  { q: "How do I start a business in Dubai as a foreigner?", a: "As a foreigner, you can start a business in Dubai through either a free zone (100% ownership, no local sponsor needed) or mainland (now 100% ownership in most sectors). Choose a free zone matching your business activity, select a company name, submit documents, pay the license fee, and receive your trade license in 3–14 days. You can then apply for an investor residence visa, open a bank account, and begin operations." },

  // ── OWNERSHIP & TAX ──
  { q: "Can foreigners own 100% of a business in UAE?", a: "Yes. Foreigners can own 100% of a UAE business both in free zones and, since 2021, in most mainland sectors without a local sponsor. Free zones have always allowed 100% foreign ownership. The UAE Companies Law amendment in 2021 extended full foreign ownership to mainland companies across most business activities, with only a few strategic sectors still requiring UAE national partners." },
  { q: "Is there corporate tax in UAE free zones?", a: "UAE free zone companies are subject to 0% corporate tax on qualifying income under the UAE Corporate Tax Law (effective June 2023), provided they meet the Qualifying Free Zone Person (QFZP) conditions. This includes maintaining substance in the free zone, earning qualifying income, and not having taxable UAE mainland income. The standard UAE corporate tax rate of 9% applies on profits above AED 375,000 for non-qualifying businesses." },
  { q: "Is UAE a tax-free country for businesses?", a: "UAE is largely tax-free for businesses. There is no personal income tax for individuals. Corporate tax of 9% applies on business profits above AED 375,000 (effective June 2023), but free zone companies earning qualifying income pay 0% corporate tax. There is also no capital gains tax, inheritance tax, or withholding tax. VAT of 5% applies to most goods and services." },
  { q: "Do I need a local sponsor to start a business in UAE?", a: "No, a local UAE sponsor is no longer required for most businesses. Free zones have always allowed 100% foreign ownership without a local sponsor. Since 2021, mainland companies across most sectors also allow 100% foreign ownership. Only a few regulated sectors (defence, security, some professional services) still require a UAE national partner or agent." },
  { q: "Can I repatriate profits from UAE to my home country?", a: "Yes, UAE free zones and mainland companies allow 100% repatriation of profits and capital with no restrictions. There are no foreign exchange controls, profit transfer taxes, or repatriation limits. This is one of the key advantages of the UAE as a business hub. Profits can be transferred internationally at any time through your UAE corporate bank account." },

  // ── FREE ZONE VS MAINLAND ──
  { q: "What is the difference between free zone and mainland company in UAE?", a: "A UAE free zone company can operate only within its free zone and internationally — it cannot sell directly to the UAE mainland market without a local distributor. A mainland company can operate anywhere in UAE and internationally. Free zones offer 100% foreign ownership (always) and various tax benefits, but mainland companies now also allow 100% foreign ownership in most sectors. Mainland is better for local market access; free zones are better for international business and lower operational costs." },
  { q: "Which is better — free zone or mainland company in UAE?", a: "It depends on your business model. Choose a free zone if you mainly operate internationally, need lower setup costs, or want a specific free zone's facilities and network. Choose mainland if you want to sell directly to UAE consumers or government, need multiple branch locations across UAE, or require a physical retail presence. Many businesses operate both a free zone entity (for international) and a mainland entity (for local market)." },
  { q: "Can a UAE free zone company do business in mainland UAE?", a: "A UAE free zone company cannot directly conduct commercial activities in the UAE mainland market without a formal arrangement. It can: (1) appoint a mainland distributor or agent, (2) sell to mainland companies (B2B) through commercial invoicing, (3) provide services via a mainland branch office, or (4) set up a separate mainland entity. Free zone companies can freely operate internationally and conduct business within their own free zone." },

  // ── VISA QUESTIONS ──
  { q: "How do I get a UAE residence visa through a company?", a: "To get a UAE residence visa through your company, you need: (1) an active UAE trade license naming you as owner/manager, (2) an Establishment Card from the free zone or DED, (3) submit visa application with passport, photo and medical test, (4) complete Emirates ID biometrics, (5) receive your Emirates ID and visa stamp. The full process takes 14–21 days. INCOZONE handles all steps including medical appointments and ministry submissions." },
  { q: "What is the UAE Golden Visa?", a: "The UAE Golden Visa is a long-term residence permit valid for 5 or 10 years (renewable) granted to investors, entrepreneurs, exceptional talents and students. It allows holders to live and work in the UAE without a local employer sponsor. Eligibility includes: investing AED 2 million in property or a UAE company, owning or founding a business valued at AED 1 million+, or having exceptional academic/professional achievements." },
  { q: "How much does a UAE investor visa cost?", a: "A UAE investor visa typically costs AED 3,500–6,000 including all government fees, medical fitness test, Emirates ID fees and PRO charges. The visa is valid for 2–3 years and renewable. Free zone investor visas are slightly cheaper (AED 3,500–4,500) than mainland investor visas. Some free zones include one investor visa in their company setup package." },
  { q: "How many visas can I get with a UAE free zone company?", a: "The number of visas you can get with a UAE free zone company depends on the free zone and your office space. Virtual or flexi desk packages typically allow 1–3 visas. Standard office units allow 3–6 visas. Premium or large office spaces can accommodate 6–15+ visas. RAKEZ offers up to 10 visas, JAFZA up to 15 visas. You can upgrade your space to increase visa quota." },
  { q: "Can my family live in UAE under my business visa?", a: "Yes. As a UAE company owner with a residence visa, you can sponsor dependent visas for your spouse, children (sons under 18 or unmarried daughters of any age), and in some cases parents. Each dependent visa costs approximately AED 2,500–4,000 including all government fees. Dependents receive full UAE residence rights including Emirates ID, health insurance eligibility and access to schools." },

  // ── FREE ZONE SPECIFIC ──
  { q: "What is DMCC free zone?", a: "DMCC (Dubai Multi Commodities Centre) is the world's most connected free zone, located in Jumeirah Lake Towers (JLT), Dubai. It hosts 23,000+ companies in commodities, fintech, professional services, tech and more. DMCC offers 100% foreign ownership, 0% personal tax, multi-commodity trading licenses, prestigious business address and world-class office space. It is consistently ranked as the world's #1 free zone." },
  { q: "What is IFZA free zone?", a: "IFZA (International Free Zone Authority) is one of UAE's most cost-effective and flexible free zones, located in Dubai Silicon Oasis. It supports 100+ business activities including trading, consulting, services and e-commerce. IFZA is popular with startups and SMEs for its competitive pricing (from AED 12,900), fast 3–7 day setup, and flexible office options from virtual to private." },
  { q: "What is RAKEZ?", a: "RAKEZ (Ras Al Khaimah Economic Zone) is the UAE's most affordable major free zone, located in Ras Al Khaimah. It offers free zone and non-free zone (industrial) business setup for manufacturing, trading, industrial and commercial activities. Setup starts from AED 8,500 with large visa quotas (up to 10), warehouse and factory units, and direct access to Saqr port." },
  { q: "What is ADGM in Abu Dhabi?", a: "ADGM (Abu Dhabi Global Market) is Abu Dhabi's premier international financial centre, located on Al Maryah Island. It operates under English Common Law and is equivalent in prestige to DIFC in Dubai. ADGM specialises in financial services, asset management, fintech, wealth management and professional services. Setup costs from AED 28,500 with a 10–21 day processing time." },
  { q: "What is JAFZA free zone?", a: "JAFZA (Jebel Ali Free Zone Authority) is the world's largest free zone by area, located next to Jebel Ali Port — the 9th largest port globally. It is the UAE's premier zone for logistics, import/export, warehousing and large-scale trade operations. JAFZA hosts 9,000+ companies and offers direct port, airport and motorway access. Setup starts from AED 22,000." },
  { q: "What is the best free zone in Dubai for e-commerce?", a: "The best UAE free zones for e-commerce in 2026 are: IFZA (most flexible, cheapest, allows e-commerce activity), Meydan Free Zone (popular with digital brands), and SHAMS (great for content-based e-commerce). For large-scale fulfilment and logistics, JAFZA and RAKEZ offer warehouse integration. DMCC suits commodity-based e-commerce. INCOZONE recommends IFZA or Meydan for most e-commerce startups." },
  { q: "Which UAE free zone is best for consultants?", a: "The best UAE free zones for consultants and consulting firms are: IFZA (widest activity range, affordable), Meydan Free Zone (premium Dubai address), SHAMS (media and creative consultants), DMCC (commodity and trade consulting), and ADGM (financial and regulatory consulting). For general management, IT, or business consulting, IFZA or Meydan offer the best value-to-prestige ratio." },
  { q: "Which UAE free zone is best for trading?", a: "For trading companies in UAE, the best free zones are: DMCC (commodities, metals, energy trading), JAFZA (import/export, logistics, port access), RAKEZ (industrial and commercial goods), and IFZA (general trading, multiple activities). For online/digital trading, IFZA or Meydan are cost-effective options. DMCC is the gold standard for commodity-based trading businesses." },

  // ── BANKING ──
  { q: "How do I open a corporate bank account in UAE?", a: "To open a UAE corporate bank account: (1) choose a bank (Emirates NBD, ADCB, Mashreq, FAB, or digital banks like Wio or Pyypl), (2) prepare documents — trade license, MOA, passport copies, business plan, 6-month bank statements, (3) attend an interview with the bank manager, (4) wait for KYC approval (2–8 weeks). Having a physical office and UAE transactions strengthens approval. INCOZONE's banking team has direct relationships with major UAE banks." },
  { q: "Which bank is best for UAE company account?", a: "The best UAE banks for business accounts in 2026 are: Emirates NBD (largest local bank, strong for SMEs), ADCB (good for free zone companies, faster approval), Mashreq (digital-forward, good for international business), FAB (First Abu Dhabi Bank, strong for Abu Dhabi-registered companies), and Wio Bank (digital, fast onboarding, good for startups and free zone companies). International options include RAKBANK and HSBC UAE." },
  { q: "Can a free zone company open a UAE bank account?", a: "Yes, UAE free zone companies can open corporate bank accounts with all major UAE banks. Requirements typically include: trade license, MOA/AOA, establishment card, passport copies of all shareholders, proof of business activity, and a detailed business plan showing revenue sources and transaction volumes. Some banks require a minimum deposit (AED 50,000–250,000). INCOZONE has bank referral relationships that significantly improve approval rates." },

  // ── MAINLAND SPECIFIC ──
  { q: "How to set up a mainland company in Dubai?", a: "To set up a mainland company in Dubai: (1) choose your business activity and legal structure (LLC, sole establishment, branch), (2) reserve your trade name with DED, (3) get initial approval from DED and sector-specific ministries, (4) sign a tenancy contract (Ejari) for your office, (5) submit all documents to DED and pay the license fee, (6) receive your trade license in 5–15 working days. INCOZONE manages all steps including DED submissions." },
  { q: "Do I need an office for a mainland Dubai company?", a: "Yes, mainland Dubai companies require a physical office with a valid Ejari (registered tenancy contract). There is no virtual office option for DED mainland licenses. The minimum office size requirements vary by activity. Some business centres offer serviced offices from AED 8,000–25,000/year that satisfy DED requirements. Free zone companies can use virtual offices or flexi desks as their registered address." },

  // ── OFFSHORE ──
  { q: "What is an offshore company in UAE?", a: "A UAE offshore company (RAK ICC or JAFZA Offshore) is a legal entity registered in UAE but designed for international business only — it cannot operate within the UAE market or obtain UAE residence visas. Offshore companies are used for holding assets, international trading, investment, intellectual property holding and wealth management. Setup costs from AED 8,000–15,000 with no office requirement." },
  { q: "What is RAK ICC offshore company?", a: "RAK ICC (Ras Al Khaimah International Corporate Centre) is UAE's most popular offshore jurisdiction. RAK ICC offshore companies offer 100% foreign ownership, high privacy, no minimum capital, no annual accounts filing requirement, and can hold shares in other companies or assets globally. They are ideal for holding companies, investment vehicles and international trade structures. Setup takes 3–7 days from AED 8,000." },

  // ── GENERAL BUSINESS ──
  { q: "What business can I start in Dubai with low investment?", a: "Low-investment businesses in Dubai include: freelancing and consulting (from AED 7,500 with a freelance permit), e-commerce (from AED 12,900 with IFZA), content creation and social media agency (from AED 11,500 with SHAMS), virtual assistant services, online education, digital marketing agencies, and IT services. Ajman Free Zone offers the cheapest multi-activity license from AED 5,500." },
  { q: "Is it worth setting up a company in UAE?", a: "Yes. UAE offers unique advantages: 0% personal income tax, up to 0% corporate tax in free zones, 100% profit repatriation, 100% foreign ownership, world-class banking, strategic location between East and West, and a stable, business-friendly regulatory environment. UAE is consistently ranked in the world's top 10 for ease of doing business. 3,200+ INCOZONE clients have verified these benefits firsthand." },
  { q: "What is the UAE corporate tax rate in 2026?", a: "The UAE corporate tax rate is 9% on business profits exceeding AED 375,000 (effective from June 2023). Profits up to AED 375,000 are taxed at 0%. Free zone companies that qualify as 'Qualifying Free Zone Persons' and earn qualifying income continue to pay 0% corporate tax. Small businesses with revenue under AED 3 million can apply for Small Business Relief (0% tax)." },
  { q: "How do I renew my UAE trade license?", a: "To renew your UAE trade license: start the renewal process 30 days before expiry to avoid fines (AED 250/month for late renewal). Submit renewal application, pay renewal fee (typically 80–100% of original license fee), update your tenancy contract (Ejari for mainland), and update any expiring visas. Most free zones allow online renewal through their portal. INCOZONE offers annual license renewal as a PRO service." },

  // ── COMPARISON ──
  { q: "What is the difference between DMCC and IFZA?", a: "DMCC vs IFZA: DMCC (AED 18,500+) is the world's #1 free zone in JLT Dubai — premium address, 23,000+ companies, ideal for commodities and multi-activity trading. IFZA (AED 12,900+) is more affordable, faster to set up (3–7 days vs 7–14), and more flexible for startups and SMEs with 100+ activities. DMCC is better for prestige and networking; IFZA is better for cost and speed." },
  { q: "DMCC vs ADGM — which is better?", a: "DMCC vs ADGM: DMCC (Dubai, from AED 18,500) suits trading, commodities, fintech and general business. ADGM (Abu Dhabi, from AED 28,500) is specifically designed for regulated financial services — asset management, funds, wealth management, banking. ADGM operates under English Common Law and is preferred by financial institutions and family offices. For non-financial businesses, DMCC is the better choice." },
  { q: "Which is cheaper — Ajman or Ras Al Khaimah free zone?", a: "Ajman Free Zone (AFZ) at AED 5,500 is cheaper than RAKEZ (Ras Al Khaimah Economic Zone) at AED 8,500 for the basic license. However, RAKEZ offers more diverse options including industrial land, warehouses and manufacturing facilities that AFZ doesn't. For a basic trading or service company, AFZ is cheaper. For industrial, manufacturing or larger teams, RAKEZ offers better infrastructure value." },
  { q: "What is the best UAE free zone in 2026?", a: "The best UAE free zone in 2026 depends on your business: Overall prestige: DMCC. Best value for startups: IFZA or AFZ. Industrial/manufacturing: RAKEZ. Media and content: SHAMS. Logistics and trade: JAFZA. Financial services: ADGM. Premium Dubai address: Meydan. Budget-friendly: AFZ (AED 5,500). INCOZONE recommends booking a free consultation to identify the optimal zone for your specific business model and budget." },

  // ── INCOZONE SPECIFIC ──
  { q: "How many companies has INCOZONE incorporated?", a: "INCOZONE has incorporated over 3,200 companies since its founding in 2012 across all major UAE free zones and mainland jurisdictions. We specialise in DMCC, IFZA, Meydan, RAKEZ, SHAMS, JAFZA, AFZ and ADGM free zones, as well as Dubai mainland LLC formation, offshore structures, visa processing and corporate banking." },
  { q: "How can I contact INCOZONE?", a: "You can contact INCOZONE by email at advisory@incozone.ae, via WhatsApp for instant response, or by scheduling a free consultation through our website. Our team operates 6 days a week and responds within 1 hour during business hours. We offer both in-person meetings at our Dubai office and video consultations for international clients." },
];

// ─── PER-PAGE FAQ SCHEMAS ──────────────────────────────────────
export const PAGE_FAQ = {
  home: MASTER_FAQ.slice(0, 12),
  freezoneincorp: [
    MASTER_FAQ.find(f => f.q.includes("free zone or mainland")),
    MASTER_FAQ.find(f => f.q.includes("cheapest free zone")),
    MASTER_FAQ.find(f => f.q.includes("long does it take")),
    MASTER_FAQ.find(f => f.q.includes("documents are required")),
    MASTER_FAQ.find(f => f.q.includes("without visiting")),
    MASTER_FAQ.find(f => f.q.includes("100% of a business")),
    MASTER_FAQ.find(f => f.q.includes("best UAE free zone in 2026")),
  ].filter(Boolean),
  dmcc: [
    MASTER_FAQ.find(f => f.q.includes("DMCC free zone")),
    MASTER_FAQ.find(f => f.q.includes("DMCC license")),
    MASTER_FAQ.find(f => f.q.includes("DMCC and IFZA")),
    MASTER_FAQ.find(f => f.q.includes("DMCC vs ADGM")),
    MASTER_FAQ.find(f => f.q.includes("100% of a business")),
    MASTER_FAQ.find(f => f.q.includes("corporate bank account")),
  ].filter(Boolean),
  ifza: [
    MASTER_FAQ.find(f => f.q.includes("IFZA free zone")),
    MASTER_FAQ.find(f => f.q.includes("IFZA license")),
    MASTER_FAQ.find(f => f.q.includes("DMCC and IFZA")),
    MASTER_FAQ.find(f => f.q.includes("e-commerce")),
    MASTER_FAQ.find(f => f.q.includes("startups")||f.q.includes("low investment")),
  ].filter(Boolean),
  rakez: [
    MASTER_FAQ.find(f => f.q.includes("RAKEZ")),
    MASTER_FAQ.find(f => f.q.includes("Ajman or Ras Al Khaimah")),
    MASTER_FAQ.find(f => f.q.includes("cheapest free zone")),
    MASTER_FAQ.find(f => f.q.includes("100% of a business")),
  ].filter(Boolean),
  adgm: [
    MASTER_FAQ.find(f => f.q.includes("ADGM")),
    MASTER_FAQ.find(f => f.q.includes("DMCC vs ADGM")),
    MASTER_FAQ.find(f => f.q.includes("financial services")||f.q.includes("bank account")),
    MASTER_FAQ.find(f => f.q.includes("corporate tax")),
  ].filter(Boolean),
  jafza: [
    MASTER_FAQ.find(f => f.q.includes("JAFZA")),
    MASTER_FAQ.find(f => f.q.includes("trading")),
    MASTER_FAQ.find(f => f.q.includes("logistics")||f.q.includes("import")),
    MASTER_FAQ.find(f => f.q.includes("100% of a business")),
  ].filter(Boolean),
  mainland: [
    MASTER_FAQ.find(f => f.q.includes("mainland company in Dubai")),
    MASTER_FAQ.find(f => f.q.includes("local sponsor")),
    MASTER_FAQ.find(f => f.q.includes("office for a mainland")),
    MASTER_FAQ.find(f => f.q.includes("free zone or mainland")),
    MASTER_FAQ.find(f => f.q.includes("free zone company do business")),
  ].filter(Boolean),
  banking: [
    MASTER_FAQ.find(f => f.q.includes("corporate bank account in UAE")),
    MASTER_FAQ.find(f => f.q.includes("bank is best")),
    MASTER_FAQ.find(f => f.q.includes("free zone company open")),
  ].filter(Boolean),
  goldenvisa: [
    MASTER_FAQ.find(f => f.q.includes("Golden Visa")),
    MASTER_FAQ.find(f => f.q.includes("investor visa cost")),
    MASTER_FAQ.find(f => f.q.includes("family")),
  ].filter(Boolean),
  visa: [
    MASTER_FAQ.find(f => f.q.includes("residence visa through")),
    MASTER_FAQ.find(f => f.q.includes("investor visa cost")),
    MASTER_FAQ.find(f => f.q.includes("how many visas")),
    MASTER_FAQ.find(f => f.q.includes("family")),
  ].filter(Boolean),
};

// ─── BUILD FAQPAGE SCHEMA JSON-LD ─────────────────────────────
export function buildFAQSchema(faqs) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  });
}

// ─── HOW-TO SCHEMA: UAE Company Setup ─────────────────────────
export const HOWTO_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Set Up a Company in UAE Free Zone",
  "description": "Step-by-step guide to setting up a UAE free zone company with 100% foreign ownership in 3–14 days.",
  "totalTime": "P14D",
  "estimatedCost": { "@type": "MonetaryAmount", "currency": "AED", "value": "5500" },
  "step": [
    { "@type": "HowToStep", "name": "Choose Your Free Zone & Business Activity", "text": "Select from 45+ UAE free zones based on your industry, budget and visa requirements. Key options: DMCC, IFZA, Meydan, RAKEZ, SHAMS, JAFZA, AFZ, ADGM. Identify your business activity code from the free zone's approved list.", "url": `${BASE_URL}/freezoneincorp` },
    { "@type": "HowToStep", "name": "Reserve Your Company Name", "text": "Submit 3 company name options to the free zone authority. Names must not contain offensive words, names of rulers, or restricted words. Approval takes 1–2 days.", "url": `${BASE_URL}/freezoneincorp` },
    { "@type": "HowToStep", "name": "Submit Documents & Application", "text": "Provide passport copies for all shareholders and managers, completed application forms, and a brief business description. Most free zones accept digital submissions with e-signatures.", "url": `${BASE_URL}/freezoneincorp` },
    { "@type": "HowToStep", "name": "Pay License Fee & Receive Trade License", "text": "Pay the trade license fee (AED 5,500–28,500 depending on free zone). Your trade license and corporate documents are issued in 2–14 business days. This makes your company legally registered.", "url": `${BASE_URL}/freezoneincorp` },
    { "@type": "HowToStep", "name": "Apply for Investor Visa & Emirates ID", "text": "Submit investor visa application with your trade license. Complete medical fitness test and biometric Emirates ID registration. Receive UAE residence visa and Emirates ID in 14–21 days.", "url": `${BASE_URL}/visa` },
    { "@type": "HowToStep", "name": "Open Corporate Bank Account", "text": "Approach UAE banks (Emirates NBD, ADCB, Mashreq) with your trade license, MOA, passport copies and business plan. Account opening takes 2–8 weeks subject to KYC approval.", "url": `${BASE_URL}/banking` },
  ],
});

// ─── ORGANIZATION SCHEMA ───────────────────────────────────────
export const ORG_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "name": "INCOZONE",
  "alternateName": "INCOZONE Advisory",
  "url": BASE_URL,
  "logo": `${BASE_URL}/logo.png`,
  "image": `${BASE_URL}/og-image.jpg`,
  "description": "UAE's premier private advisory for company formation, free zone setup, investor visa and corporate banking. 3,200+ companies incorporated since 2012.",
  "foundingDate": "2012",
  "telephone": PHONE_NUMBER,
  "email": "advisory@incozone.ae",
  "priceRange": "AED 5,500 – AED 50,000+",
  "currenciesAccepted": "AED, USD, EUR, GBP",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Business Bay",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "addressCountry": "AE",
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "25.2048", "longitude": "55.2708" },
  "areaServed": [
    { "@type": "Country", "name": "United Arab Emirates" },
    { "@type": "City", "name": "Dubai" },
    { "@type": "City", "name": "Abu Dhabi" },
    { "@type": "City", "name": "Sharjah" },
    { "@type": "City", "name": "Ras Al Khaimah" },
    { "@type": "City", "name": "Ajman" },
  ],
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Sunday"], "opens": "09:00", "closes": "18:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "10:00", "closes": "14:00" },
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "UAE Business Setup Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Free Zone Company Formation UAE", "description": "100% foreign ownership free zone setup in DMCC, IFZA, RAKEZ, SHAMS, JAFZA, AFZ, Meydan, ADGM" }, "priceSpecification": { "@type": "PriceSpecification", "price": "5500", "priceCurrency": "AED", "valueAddedTaxIncluded": false } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mainland Company Formation Dubai", "description": "DED-licensed mainland LLC with 100% foreign ownership and UAE market access" }, "priceSpecification": { "@type": "PriceSpecification", "price": "15000", "priceCurrency": "AED", "valueAddedTaxIncluded": false } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UAE Investor Visa Processing", "description": "End-to-end UAE residence visa for company owners, employees and dependents" }, "priceSpecification": { "@type": "PriceSpecification", "price": "3500", "priceCurrency": "AED", "valueAddedTaxIncluded": false } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UAE Golden Visa", "description": "10-year UAE residency visa for investors and entrepreneurs" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corporate Bank Account Opening UAE", "description": "Business bank account setup with Emirates NBD, ADCB, Mashreq and international banks" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "PRO Services Dubai", "description": "Government document processing, ministry approvals, license renewals and attestation" } },
    ],
  },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "412", "bestRating": "5", "worstRating": "1" },
  "sameAs": [
    "https://www.linkedin.com/company/incozone",
    "https://www.instagram.com/incozone",
    "https://twitter.com/incozone",
  ],
});

// ─── ITEMLIST SCHEMA: All UAE Free Zones ──────────────────────
export const FREEZONE_LIST_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "UAE Free Zones for Company Formation",
  "description": "Complete list of UAE free zones available through INCOZONE for company formation",
  "numberOfItems": 8,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "DMCC — Dubai Multi Commodities Centre", "description": "World's most connected free zone. From AED 18,500. Setup in 7–14 days.", "url": `${BASE_URL}/dmcc` },
    { "@type": "ListItem", "position": 2, "name": "IFZA — International Free Zone Authority", "description": "UAE's most flexible free zone for startups and SMEs. From AED 12,900. Setup in 3–7 days.", "url": `${BASE_URL}/ifza` },
    { "@type": "ListItem", "position": 3, "name": "Meydan Free Zone", "description": "Premium Dubai location. Ideal for consultancies and tech firms. From AED 14,500. Setup in 5–10 days.", "url": `${BASE_URL}/meydan` },
    { "@type": "ListItem", "position": 4, "name": "RAKEZ — Ras Al Khaimah Economic Zone", "description": "Most competitive zone for industrial and commercial. From AED 8,500. Setup in 3–7 days.", "url": `${BASE_URL}/rakez` },
    { "@type": "ListItem", "position": 5, "name": "SHAMS — Sharjah Media City", "description": "UAE's leading media free zone for content creators. From AED 11,500. Setup in 5–8 days.", "url": `${BASE_URL}/shams` },
    { "@type": "ListItem", "position": 6, "name": "JAFZA — Jebel Ali Free Zone Authority", "description": "World's largest free zone for logistics and trade. From AED 22,000. Setup in 7–14 days.", "url": `${BASE_URL}/jafza` },
    { "@type": "ListItem", "position": 7, "name": "AFZ — Ajman Free Zone", "description": "UAE's most affordable free zone from AED 5,500. Setup in 2–5 days.", "url": `${BASE_URL}/afz` },
    { "@type": "ListItem", "position": 8, "name": "ADGM — Abu Dhabi Global Market", "description": "Abu Dhabi's premier financial centre. From AED 28,500. Setup in 10–21 days.", "url": `${BASE_URL}/adgm` },
  ],
});

// ─── BREADCRUMB BUILDER ────────────────────────────────────────
export function buildBreadcrumb(items) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": `${BASE_URL}${item.path}`,
    })),
  });
}

export const BREADCRUMBS = {
  home:         [{ name: "Home", path: "/" }],
  services:     [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }],
  freezoneincorp: [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Free Zone Incorporation", path: "/freezoneincorp" }],
  mainland:     [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Mainland Formation", path: "/mainland" }],
  dmcc:         [{ name: "Home", path: "/" }, { name: "Free Zones", path: "/freezoneincorp" }, { name: "DMCC", path: "/dmcc" }],
  ifza:         [{ name: "Home", path: "/" }, { name: "Free Zones", path: "/freezoneincorp" }, { name: "IFZA", path: "/ifza" }],
  meydan:       [{ name: "Home", path: "/" }, { name: "Free Zones", path: "/freezoneincorp" }, { name: "Meydan", path: "/meydan" }],
  rakez:        [{ name: "Home", path: "/" }, { name: "Free Zones", path: "/freezoneincorp" }, { name: "RAKEZ", path: "/rakez" }],
  shams:        [{ name: "Home", path: "/" }, { name: "Free Zones", path: "/freezoneincorp" }, { name: "SHAMS", path: "/shams" }],
  jafza:        [{ name: "Home", path: "/" }, { name: "Free Zones", path: "/freezoneincorp" }, { name: "JAFZA", path: "/jafza" }],
  afz:          [{ name: "Home", path: "/" }, { name: "Free Zones", path: "/freezoneincorp" }, { name: "AFZ", path: "/afz" }],
  adgm:         [{ name: "Home", path: "/" }, { name: "Free Zones", path: "/freezoneincorp" }, { name: "ADGM", path: "/adgm" }],
  banking:      [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Banking", path: "/banking" }],
  goldenvisa:   [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Golden Visa", path: "/goldenvisa" }],
  visa:         [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "Visa", path: "/visa" }],
  pro:          [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: "PRO Services", path: "/pro" }],
  about:        [{ name: "Home", path: "/" }, { name: "About", path: "/about" }],
  contact:      [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }],
  blog:         [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }],
  schedule:     [{ name: "Home", path: "/" }, { name: "Book Consultation", path: "/schedule" }],
};
