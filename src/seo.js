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
    title: "DMCC, IFZA, RAKEZ & More | UAE Free Zone Setup | INCOZONE",
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

// ─── SERVICE SCHEMA: Key UAE Business Services ────────────────
export const SERVICE_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "UAE Business Setup & Company Formation",
  "serviceType": "Business Formation Advisory",
  "provider": {
    "@type": "LocalBusiness",
    "name": "INCOZONE",
    "url": BASE_URL,
    "telephone": PHONE_NUMBER,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Business Bay",
      "addressLocality": "Dubai",
      "addressCountry": "AE",
    },
  },
  "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
  "description": "Expert UAE company formation advisory covering free zone incorporation, mainland LLC, investor visa, corporate banking and PRO services. 3,200+ companies since 2012.",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "5500",
    "highPrice": "50000",
    "priceCurrency": "AED",
    "offerCount": "6",
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "UAE Business Setup Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Free Zone Company Formation UAE", "description": "100% foreign ownership free zone setup — DMCC, IFZA, RAKEZ, SHAMS, JAFZA, AFZ, Meydan, ADGM" }, "priceSpecification": { "@type": "PriceSpecification", "price": "5500", "priceCurrency": "AED", "valueAddedTaxIncluded": false } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mainland Company Formation Dubai", "description": "DED-licensed mainland LLC with 100% foreign ownership and UAE market access" }, "priceSpecification": { "@type": "PriceSpecification", "price": "15000", "priceCurrency": "AED", "valueAddedTaxIncluded": false } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UAE Investor Visa Processing", "description": "End-to-end UAE residence visa for company owners, employees and dependents" }, "priceSpecification": { "@type": "PriceSpecification", "price": "3500", "priceCurrency": "AED", "valueAddedTaxIncluded": false } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UAE Golden Visa", "description": "10-year renewable UAE residency for investors, entrepreneurs and professionals" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corporate Bank Account Opening UAE", "description": "Business banking setup — Emirates NBD, ADCB, Mashreq, FAB, Wio" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "PRO Services Dubai", "description": "Government liaison, ministry approvals, license renewals, document attestation" } },
    ],
  },
});

// ─── ARTICLE SCHEMA: Blog Articles ────────────────────────────
export const BLOG_ARTICLE_SCHEMA = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Why DMCC Remains the UAE's Most Coveted Business Address",
    "description": "Despite cheaper alternatives, DMCC continues to command a premium for institutional credibility, banking approval rates and commercial positioning.",
    "author": { "@type": "Person", "name": "Rashid Al-Mansoori", "worksFor": { "@type": "Organization", "name": "INCOZONE" } },
    "publisher": { "@type": "Organization", "name": "INCOZONE", "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo.png` } },
    "datePublished": "2026-03-08",
    "url": `${BASE_URL}/blog`,
    "mainEntityOfPage": `${BASE_URL}/blog`,
    "articleSection": "Free Zone Guide",
    "keywords": "DMCC, UAE free zone, Dubai business setup, company formation",
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "UAE Corporate Tax: What Every Free Zone Company Must Know Before 2026",
    "description": "The 9% corporate tax regime has clarified — the path to Qualifying Free Zone Person status is more navigable than initially feared.",
    "author": { "@type": "Person", "name": "Alexandra Voss", "worksFor": { "@type": "Organization", "name": "INCOZONE" } },
    "publisher": { "@type": "Organization", "name": "INCOZONE", "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo.png` } },
    "datePublished": "2026-03-05",
    "url": `${BASE_URL}/blog`,
    "mainEntityOfPage": `${BASE_URL}/blog`,
    "articleSection": "Market Intelligence",
    "keywords": "UAE corporate tax, QFZP, free zone tax, Dubai business",
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "The Mainland vs Free Zone Decision: A Framework for 2026",
    "description": "After the 2021 commercial companies law reforms allowing 100% foreign ownership on mainland, many businesses that defaulted to free zones should reconsider.",
    "author": { "@type": "Person", "name": "Khalid Ibrahim", "worksFor": { "@type": "Organization", "name": "INCOZONE" } },
    "publisher": { "@type": "Organization", "name": "INCOZONE", "logo": { "@type": "ImageObject", "url": `${BASE_URL}/logo.png` } },
    "datePublished": "2026-03-01",
    "url": `${BASE_URL}/blog`,
    "mainEntityOfPage": `${BASE_URL}/blog`,
    "articleSection": "Incorporation Guide",
    "keywords": "mainland vs free zone, UAE company formation, Dubai LLC",
  },
]);

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

// ─── STATIC BODY HTML ─────────────────────────────────────────
// Injected into <div id="root"> by prerender.mjs so Google reads
// real content immediately. React replaces this on hydration.
const _nav = `<a href="/" style="display:inline-block;font-family:'Cormorant Garamond',Georgia,serif;font-size:1.5rem;letter-spacing:.15em;color:#f8f5ee;text-decoration:none;margin-bottom:52px">INCO<span style="color:#C9A84C">ZONE</span></a>`;
const _style = `font-family:'DM Sans',system-ui,sans-serif;font-weight:300;background:#05111e;color:#f8f5ee;padding:100px 7% 64px;min-height:100vh;line-height:1.7`;
const _h1 = (t) => `<h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(2.2rem,5vw,3.8rem);font-weight:300;line-height:1.15;margin:0 0 20px;color:#f8f5ee">${t}</h1>`;
const _h2 = (t) => `<h2 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:clamp(1.4rem,2.8vw,2.2rem);font-weight:300;color:#f8f5ee;margin:40px 0 12px">${t}</h2>`;
const _p  = (t) => `<p style="color:rgba(248,245,238,0.75);max-width:720px;margin:0 0 16px;font-size:0.97rem">${t}</p>`;
const _cta = (label,href) => `<a href="${href}" style="display:inline-block;margin-top:28px;padding:14px 32px;border:1px solid #C9A84C;color:#C9A84C;text-decoration:none;font-size:0.75rem;letter-spacing:.16em;text-transform:uppercase">${label}</a>`;
const _ul = (items) => `<ul style="color:rgba(248,245,238,0.75);padding-left:20px;margin:0 0 20px;font-size:0.95rem">${items.map(i=>`<li style="margin-bottom:6px">${i}</li>`).join('')}</ul>`;
const _grid = (cards) => `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px;margin:20px 0 32px">${cards.map(c=>`<div style="border:1px solid rgba(201,168,76,0.2);padding:20px"><h3 style="color:#C9A84C;font-family:'Cormorant Garamond',Georgia,serif;font-size:1.15rem;font-weight:400;margin:0 0 8px">${c.h}</h3><p style="color:rgba(248,245,238,0.65);font-size:0.85rem;margin:0">${c.p}</p></div>`).join('')}</div>`;

export const STATIC_BODY = {

  home: `<div style="${_style}">${_nav}
${_h1(`UAE Company Formation — <span style="color:#C9A84C;font-style:italic">Free Zone &amp; Mainland</span>`)}
${_p(`Set up your UAE company from AED 5,500 in 2–14 days. Expert advisory for free zone and mainland company formation, investor visa, corporate banking and PRO services. 3,200+ companies incorporated since 2012.`)}
${_cta('Get a Free Consultation','/schedule')}
${_h2(`UAE Free Zone Company Formation`)}
${_p(`Choose from 8 premium UAE free zones — each offering 100% foreign ownership, zero personal income tax and full profit repatriation. Packages start from AED 5,500 with setup in 2–14 business days.`)}
${_grid([
  {h:'DMCC — From AED 18,500',p:'World\'s most connected free zone. 23,000+ companies. 7–14 days setup.'},
  {h:'IFZA — From AED 12,900',p:'UAE\'s most flexible free zone for startups and SMEs. 3–7 days setup.'},
  {h:'RAKEZ — From AED 8,500',p:'Ras Al Khaimah\'s most competitive zone for trading & industrial. 3–7 days.'},
  {h:'SHAMS — From AED 11,500',p:'Sharjah Media City. UAE\'s leading media and content free zone. 5–8 days.'},
  {h:'JAFZA — From AED 22,000',p:'World\'s largest free zone. Jebel Ali port access. Logistics & trade. 7–14 days.'},
  {h:'AFZ — From AED 5,500',p:'Ajman Free Zone. UAE\'s most affordable option. 2–5 days setup.'},
  {h:'Meydan — From AED 14,500',p:'Premium Dubai address. Ideal for tech and consultancy firms. 5–10 days.'},
  {h:'ADGM — From AED 28,500',p:'Abu Dhabi Global Market. Financial services and fintech hub. 10–21 days.'},
])}
${_h2(`All UAE Business Setup Services`)}
${_ul([
  '<strong>Free Zone Company Formation</strong> — DMCC, IFZA, ADGM, JAFZA, RAKEZ, SHAMS, AFZ, Meydan',
  '<strong>Mainland Company Formation Dubai</strong> — DED-licensed LLC with 100% foreign ownership',
  '<strong>UAE Golden Visa</strong> — 10-year renewable residency for investors and entrepreneurs',
  '<strong>Offshore Company Formation</strong> — RAK ICC and JAFZA offshore structures',
  '<strong>Corporate Bank Account Opening UAE</strong> — Emirates NBD, ADCB, Mashreq, FAB, Wio',
  '<strong>UAE Investor &amp; Employee Visa</strong> — End-to-end residence visa processing',
  '<strong>PRO Services Dubai</strong> — Government liaison, license renewals, attestation',
  '<strong>Trademark Registration UAE</strong> — Ministry of Economy brand protection',
  '<strong>Company Amendments &amp; Renewals</strong> — Shareholder changes, activity additions, name changes',
  '<strong>Company Liquidation UAE</strong> — Orderly deregistration and closure',
])}
${_h2(`Why Choose INCOZONE?`)}
${_ul([
  '3,200+ companies incorporated since 2012 across all UAE jurisdictions',
  '100% foreign ownership — no local sponsor required',
  'Zero personal and corporate tax for qualifying free zone companies',
  'Full profit repatriation — transfer earnings internationally with no restrictions',
  'Advisory-first approach: we recommend the right zone, not the most profitable for us',
  'End-to-end service: trade license, visa, Emirates ID, bank account, PRO services',
  'Same-day response and free initial consultation',
])}
${_cta('Book Free Consultation','/schedule')}
</div>`,

  dmcc: `<div style="${_style}">${_nav}
${_h1(`DMCC Company Formation Dubai — <span style="color:#C9A84C;font-style:italic">From AED 18,500</span>`)}
${_p(`Set up your DMCC (Dubai Multi Commodities Centre) company in 7–14 business days. The world's most connected free zone — home to 23,000+ companies across commodities, fintech, trading, consulting and professional services.`)}
${_cta('Get DMCC Quote','/schedule')}
${_h2(`Why DMCC Free Zone?`)}
${_p(`DMCC is consistently ranked the World's #1 Free Zone. Located in Jumeirah Lake Towers (JLT), Dubai, it offers a prestigious business address, state-of-the-art facilities, and the most extensive business activity list of any UAE free zone.`)}
${_ul([
  '100% foreign ownership — no UAE national partner required',
  '0% personal income tax and 0% corporate tax on qualifying income',
  '23,000+ member companies from 185+ countries',
  'World-class JLT address — prestigious for clients and partners',
  '100+ business activities including commodities, trading, fintech, consulting',
  'Multiple office options: Flexi Desk, Serviced Office, Private Office',
  'Up to 6 investor residence visas per package',
  'Access to DMCC\'s global commodities ecosystem',
])}
${_h2(`DMCC Packages &amp; Pricing`)}
${_grid([
  {h:'Flexi Package — AED 18,500',p:'1 activity, Flexi Desk, 2 investor visas. Ideal for startups and solo founders.'},
  {h:'Standard Package — AED 26,900',p:'3 activities, Serviced Office, 4 investor visas. Most popular for growing businesses.'},
  {h:'Elite Package — AED 44,500',p:'Unlimited activities, Private Office, 6+ visas. For established enterprises.'},
])}
${_h2(`DMCC Business Activities`)}
${_p(`DMCC supports over 600 business activities across all major sectors:`)}
${_ul([
  'Commodities trading — gold, diamonds, energy, agricultural products',
  'Financial services and fintech',
  'Technology and software development',
  'General trading — import, export, re-export',
  'Consulting and professional services',
  'Logistics and supply chain management',
  'Media, marketing and creative services',
  'Real estate and property management',
])}
${_h2(`DMCC Setup Process`)}
${_ul([
  'Step 1: Choose business activities and reserve company name (1–2 days)',
  'Step 2: Submit passport copies and application forms (1 day)',
  'Step 3: Pay license fee and receive initial approval (3–5 days)',
  'Step 4: Sign tenancy contract for office/flexi desk (1–2 days)',
  'Step 5: Receive trade license and company documents (1–2 days)',
  'Step 6: Apply for investor visa and corporate bank account (14–21 days)',
])}
${_h2(`Documents Required for DMCC Setup`)}
${_ul([
  'Valid passport copy for all shareholders and managers',
  'Passport-sized photograph (white background)',
  'Proposed company name (3 options)',
  'Business activity description',
  'UAE entry stamp or visit visa copy (if in-country)',
  'Source of funds declaration (for banking)',
])}
${_cta('Start Your DMCC Company','/schedule')}
</div>`,

  ifza: `<div style="${_style}">${_nav}
${_h1(`IFZA Free Zone Company Setup Dubai — <span style="color:#C9A84C;font-style:italic">From AED 12,900</span>`)}
${_p(`IFZA (International Free Zone Authority) is UAE's most flexible and cost-effective free zone, located in Dubai Silicon Oasis. Set up your company in 3–7 business days with 100+ business activities, no minimum capital, and packages starting from AED 12,900.`)}
${_cta('Get IFZA Quote','/schedule')}
${_h2(`Why Choose IFZA?`)}
${_ul([
  '100% foreign ownership — no local sponsor required',
  '0% personal income tax and 0% corporate tax on qualifying income',
  'Over 100 business activities available on a single license',
  'Fastest setup in Dubai — trade license in 3–7 business days',
  'Most affordable Dubai free zone from AED 12,900',
  'Flexible office options: virtual office, flexi desk, private office',
  'Multiple visa allocation — scale as your team grows',
  'Suitable for startups, SMEs, e-commerce and consulting businesses',
])}
${_h2(`IFZA Packages &amp; Pricing`)}
${_grid([
  {h:'Flexi Package — AED 12,900',p:'1 activity, virtual office, 1 investor visa. Perfect for freelancers and solopreneurs.'},
  {h:'Growth Package — AED 19,500',p:'3 activities, flexi desk, 3 investor visas. Ideal for startups and growing teams.'},
  {h:'Corporate Package — AED 34,500',p:'Unlimited activities, private office, 6+ visas. For established companies.'},
])}
${_h2(`Best Business Types for IFZA`)}
${_ul([
  'E-commerce and online retail',
  'IT and software development',
  'Digital marketing and advertising agencies',
  'Management and business consulting',
  'Import, export and general trading',
  'Media production and content creation',
  'Recruitment and HR services',
  'Education and training services',
])}
${_h2(`IFZA vs Competitors`)}
${_p(`IFZA offers the best value-to-flexibility ratio in Dubai. Compared to DMCC (AED 18,500+), IFZA is 30% cheaper and faster to set up. Unlike RAKEZ (based in Ras Al Khaimah), IFZA gives you a Dubai address — preferred by international clients and financial institutions.`)}
${_cta('Start Your IFZA Company','/schedule')}
</div>`,

  mainland: `<div style="${_style}">${_nav}
${_h1(`Mainland Company Formation UAE — <span style="color:#C9A84C;font-style:italic">Dubai LLC Setup</span>`)}
${_p(`Form your UAE mainland company with 100% foreign ownership. DED-licensed LLC and professional licenses for trading, services, retail and government contracts. Full UAE market access with no restrictions on where you can operate.`)}
${_cta('Get Mainland Quote','/schedule')}
${_h2(`UAE Mainland vs Free Zone`)}
${_p(`A mainland company (DED-licensed) can operate anywhere in the UAE — retail, government tenders, local market trading. Since 2021, foreigners can own 100% of most mainland businesses without a local sponsor. Free zone companies are limited to operating within their zone and internationally.`)}
${_h2(`Mainland Company Types`)}
${_grid([
  {h:'Limited Liability Company (LLC)',p:'Most common structure. 100% foreign ownership. Suitable for trading, services, retail.'},
  {h:'Professional / Civil Company',p:'For professional services — consulting, legal, accounting, engineering. 100% ownership.'},
  {h:'Branch of Foreign Company',p:'Extend your existing foreign company to UAE mainland. Retains parent brand and liability.'},
  {h:'Sole Establishment',p:'Single-owner entity for professional service providers. Full personal ownership.'},
])}
${_h2(`Mainland Setup Process`)}
${_ul([
  'Step 1: Choose business activity and legal structure',
  'Step 2: Reserve trade name with Dubai DED',
  'Step 3: Get initial approval from DED and sector ministries',
  'Step 4: Sign tenancy contract and register Ejari (mandatory for DED)',
  'Step 5: Submit all documents and pay license fee to DED',
  'Step 6: Receive trade license (5–15 working days)',
  'Step 7: Apply for investor visa and corporate bank account',
])}
${_h2(`Mainland Company Costs`)}
${_ul([
  'Trade license fee: AED 10,000–25,000 (varies by activity)',
  'Office/Ejari: AED 8,000–25,000/year minimum',
  'DED initial approval: AED 1,000–3,000',
  'Investor visa: AED 3,500–6,000 per person',
  'Total first-year cost: typically AED 20,000–45,000',
])}
${_h2(`Who Should Choose Mainland?`)}
${_ul([
  'Businesses selling directly to UAE consumers or retailers',
  'Companies bidding for government and semi-government contracts',
  'Retail businesses requiring physical store locations',
  'Service companies needing to operate across all UAE emirates',
  'Businesses requiring Ministry of Health, KHDA or other sector approvals',
])}
${_cta('Start Mainland Company','/schedule')}
</div>`,

  offshore: `<div style="${_style}">${_nav}
${_h1(`UAE Offshore Company Formation — <span style="color:#C9A84C;font-style:italic">RAK ICC &amp; JAFZA</span>`)}
${_p(`Set up a UAE offshore company for international business, asset holding, investment structures and wealth management. 100% foreign ownership, zero tax, complete privacy, and no physical office required. From AED 8,000.`)}
${_cta('Get Offshore Quote','/schedule')}
${_h2(`UAE Offshore Company Types`)}
${_grid([
  {h:'RAK ICC Offshore',p:'Ras Al Khaimah International Corporate Centre. UAE\'s most popular offshore jurisdiction. From AED 8,000.'},
  {h:'JAFZA Offshore',p:'Jebel Ali Free Zone offshore. Premium jurisdiction with Jebel Ali port access. From AED 12,000.'},
])}
${_h2(`Benefits of UAE Offshore Company`)}
${_ul([
  '100% foreign ownership — no UAE national partner',
  '0% corporate and personal income tax',
  'Complete privacy — no public register of shareholders or directors',
  'No minimum share capital requirement',
  'No mandatory annual audit for RAK ICC companies',
  'Can hold shares in UAE and international companies',
  'Can hold real estate and other assets',
  'No physical office or presence required in UAE',
  'Can open international bank accounts',
])}
${_h2(`Offshore vs Free Zone vs Mainland`)}
${_p(`An offshore company cannot operate within the UAE market, hire UAE-based employees directly, or obtain UAE residence visas. It is purely for international business, asset holding and investment. If you need to work in the UAE, you need a free zone or mainland company.`)}
${_h2(`Offshore Company Uses`)}
${_ul([
  'International trading and invoicing structure',
  'Holding company for UAE or international assets',
  'Investment vehicle for stock portfolios and financial assets',
  'Real estate holding (property ownership in UAE)',
  'Intellectual property holding and licensing',
  'Family wealth management and succession planning',
  'Joint venture and partnership structures',
])}
${_cta('Start Offshore Company','/schedule')}
</div>`,

  banking: `<div style="${_style}">${_nav}
${_h1(`Corporate Bank Account Opening UAE — <span style="color:#C9A84C;font-style:italic">Business Banking 2026</span>`)}
${_p(`Open a UAE corporate bank account for your free zone or mainland company. Expert guidance through the KYC process with Emirates NBD, ADCB, Mashreq, FAB, and digital banks. High approval rate through INCOZONE's direct bank relationships.`)}
${_cta('Start Bank Account Opening','/schedule')}
${_h2(`UAE Banks for Business Accounts`)}
${_grid([
  {h:'Emirates NBD',p:'UAE\'s largest bank. Strong SME banking. Good for local and international transactions.'},
  {h:'ADCB',p:'Abu Dhabi Commercial Bank. Fast approval for free zone companies. Competitive fees.'},
  {h:'Mashreq Bank',p:'Digital-first approach. Excellent for international business and multi-currency accounts.'},
  {h:'FAB — First Abu Dhabi Bank',p:'UAE\'s largest bank by assets. Preferred for Abu Dhabi and Abu Dhabi free zone companies.'},
  {h:'Wio Bank',p:'Digital business bank. Fast onboarding in days. Ideal for startups and tech companies.'},
  {h:'RAKBANK',p:'Good for SMEs and free zone companies. Competitive pricing. Fast account opening.'},
])}
${_h2(`Documents Required`)}
${_ul([
  'Valid UAE trade license',
  'Memorandum and Articles of Association (MOA/AOA)',
  'Establishment Card (from free zone or DED)',
  'Passport copies of all shareholders and signatories',
  'UAE residence visa / Emirates ID (if applicable)',
  'Detailed business plan with revenue model and transaction volumes',
  '6-month personal bank statements for all shareholders',
  'Proof of business activity (contracts, invoices, website)',
])}
${_h2(`Bank Account Opening Timeline`)}
${_p(`UAE corporate bank account approval typically takes 2–8 weeks from document submission. Digital banks like Wio can approve in 3–7 days. The process involves KYC review, credit committee approval, and compliance checks. INCOZONE's bank relationships significantly improve approval rates and speed.`)}
${_h2(`Why INCOZONE for Banking?`)}
${_ul([
  'Direct relationships with compliance teams at all major UAE banks',
  'Pre-submission document review to avoid rejection',
  'Bank manager introductions — warm referral vs cold application',
  'Guidance on business plan and interview preparation',
  'Alternative bank recommendations if first choice is declined',
])}
${_cta('Apply for Bank Account','/schedule')}
</div>`,

  goldenvisa: `<div style="${_style}">${_nav}
${_h1(`UAE Golden Visa 2026 — <span style="color:#C9A84C;font-style:italic">10-Year Residency for Investors</span>`)}
${_p(`The UAE Golden Visa grants long-term 10-year renewable residency for investors, entrepreneurs, exceptional talents and professionals. Live and work in UAE without employer sponsorship. Full application management by INCOZONE.`)}
${_cta('Apply for Golden Visa','/schedule')}
${_h2(`Who Qualifies for UAE Golden Visa?`)}
${_grid([
  {h:'Property Investors',p:'Own UAE real estate worth AED 2 million or more. Property can be mortgaged if balance is AED 2M+.'},
  {h:'Business Investors',p:'Establish or own a UAE company with a capital of AED 1 million+, or invest AED 2M+ in a UAE business.'},
  {h:'Entrepreneurs',p:'Founded a UAE startup accredited by a government accelerator or with annual revenue of AED 1M+.'},
  {h:'Exceptional Talent',p:'Specialists in science, engineering, medicine, arts, or culture recognised by competent UAE authorities.'},
  {h:'Outstanding Students',p:'Top students from UAE universities (3.75+ GPA) or international Top 100 university graduates.'},
  {h:'Professionals',p:'Holders of professional licences in priority sectors (doctors, engineers, scientists, lawyers).'},
])}
${_h2(`Golden Visa Benefits`)}
${_ul([
  '10-year renewable UAE residency — no employer sponsor required',
  'Sponsor spouse, children and parents under your visa',
  'Multiple entry into UAE with no restrictions',
  'Emirates ID valid for 10 years',
  'Ability to stay outside UAE for extended periods without losing residency',
  'Access to UAE healthcare and education system',
  'Full freedom to work, invest and do business in UAE',
  'Open bank accounts and purchase property in UAE',
])}
${_h2(`Golden Visa Application Process`)}
${_ul([
  'Step 1: Confirm eligibility category and prepare documentation',
  'Step 2: Submit application through ICA portal or GDRFA Dubai',
  'Step 3: Medical fitness test and health insurance',
  'Step 4: Emirates ID biometrics registration',
  'Step 5: Receive 10-year residency visa stamp (3–6 weeks total)',
])}
${_h2(`Golden Visa Cost`)}
${_p(`The UAE Golden Visa government fees are approximately AED 4,000–8,000 including all ICA and Emirates ID fees. INCOZONE's professional fee for end-to-end management is separate. Total cost is typically AED 8,000–15,000 per person including all fees and our advisory service.`)}
${_cta('Apply for Golden Visa','/schedule')}
</div>`,

  visa: `<div style="${_style}">${_nav}
${_h1(`UAE Investor &amp; Residence Visa Processing — <span style="color:#C9A84C;font-style:italic">Fast-Track 2026</span>`)}
${_p(`End-to-end UAE residence visa processing for company owners, employees and dependents. Investor visa from AED 3,500 including all government fees, medical test, Emirates ID and PRO charges. Processing in 14–21 days.`)}
${_cta('Apply for UAE Visa','/schedule')}
${_h2(`UAE Residence Visa Types`)}
${_grid([
  {h:'Investor Visa (2–3 years)',p:'For UAE company owners. From AED 3,500. Renewable. Sponsor family dependents.'},
  {h:'Employee Visa (2–3 years)',p:'For company employees. Sponsored by the company. Employment-linked residency.'},
  {h:'Dependent Visa',p:'For spouse, children and parents. From AED 2,500. Linked to primary visa holder.'},
  {h:'Freelance / Talent Visa',p:'For freelancers and professionals. Issued by free zones with freelance permits.'},
  {h:'Golden Visa (10 years)',p:'For investors and exceptional talent. 10-year renewable independent residency.'},
])}
${_h2(`Visa Processing Steps`)}
${_ul([
  'Step 1: Entry permit application (if outside UAE)',
  'Step 2: Medical fitness test at approved DHA/HAAD centre',
  'Step 3: Emirates ID biometrics registration',
  'Step 4: Visa stamping on passport (14–21 days total)',
  'Step 5: Collect Emirates ID card (7–14 days after stamping)',
])}
${_h2(`Required Documents`)}
${_ul([
  'Valid passport (minimum 6 months validity)',
  'Passport-sized photograph (white background)',
  'UAE trade license (for investor visa)',
  'Establishment Card from free zone or DED',
  'Entry stamp or current visa copy (if in UAE)',
  'Medical fitness certificate',
  'Health insurance certificate',
])}
${_cta('Process UAE Visa','/schedule')}
</div>`,

  freezoneincorp: `<div style="${_style}">${_nav}
${_h1(`Free Zone Company Setup UAE — <span style="color:#C9A84C;font-style:italic">All UAE Free Zones 2026</span>`)}
${_p(`Compare all 8 UAE free zones and find the best fit for your business. 100% foreign ownership, zero personal tax, full profit repatriation. INCOZONE guides you to the right zone — not the most expensive one. Packages from AED 5,500.`)}
${_cta('Compare Free Zones','/schedule')}
${_h2(`UAE Free Zone Comparison 2026`)}
${_grid([
  {h:'DMCC — From AED 18,500',p:'World #1 free zone in JLT Dubai. 23,000+ companies. Commodities, fintech, trading. Setup 7–14 days.'},
  {h:'IFZA — From AED 12,900',p:'Most flexible Dubai free zone. 100+ activities. Best for startups and SMEs. Setup 3–7 days.'},
  {h:'RAKEZ — From AED 8,500',p:'2nd cheapest UAE free zone. Industrial, manufacturing, commercial. RAK location. Setup 3–7 days.'},
  {h:'SHAMS — From AED 11,500',p:'UAE #1 media free zone in Sharjah. Content creators, agencies, media companies. Setup 5–8 days.'},
  {h:'JAFZA — From AED 22,000',p:'World\'s largest free zone. Jebel Ali port. Logistics, import/export, trade. Setup 7–14 days.'},
  {h:'AFZ — From AED 5,500',p:'Cheapest UAE free zone. Ajman. Perfect for startups and budget-conscious businesses. Setup 2–5 days.'},
  {h:'Meydan — From AED 14,500',p:'Premium Dubai address near Meydan Racecourse. Tech, consulting, lifestyle brands. Setup 5–10 days.'},
  {h:'ADGM — From AED 28,500',p:'Abu Dhabi\'s top IFC. Financial services, asset management, fintech. English common law. Setup 10–21 days.'},
])}
${_h2(`How to Choose the Right UAE Free Zone`)}
${_ul([
  'Budget: AFZ (AED 5,500) → RAKEZ (AED 8,500) → IFZA (AED 12,900) for lowest cost',
  'Dubai address needed: IFZA, Meydan, DMCC, JAFZA',
  'Trading and commodities: DMCC or JAFZA',
  'Media, content and creative: SHAMS',
  'Financial services and fintech: ADGM or DMCC',
  'Industrial and manufacturing: RAKEZ',
  'E-commerce and startups: IFZA or Meydan',
  'Logistics and import/export: JAFZA or RAKEZ',
])}
${_h2(`Free Zone Company Formation Process`)}
${_ul([
  'Step 1: Select free zone matching your activity, budget and visa needs',
  'Step 2: Reserve company name and get name approval (1–3 days)',
  'Step 3: Submit passport copies and application forms',
  'Step 4: Pay license fee — trade license issued in 2–14 days',
  'Step 5: Apply for investor residence visa and Emirates ID (14–21 days)',
  'Step 6: Open corporate bank account (2–8 weeks)',
])}
${_cta('Get Free Zone Recommendation','/schedule')}
</div>`,

  services: `<div style="${_style}">${_nav}
${_h1(`UAE Business Setup Services — <span style="color:#C9A84C;font-style:italic">Full Advisory 2026</span>`)}
${_p(`INCOZONE provides end-to-end UAE business setup advisory since 2012. From company formation to investor visa, corporate banking and ongoing PRO services. 3,200+ companies successfully incorporated.`)}
${_h2(`Company Formation Services`)}
${_grid([
  {h:'Free Zone Company Formation',p:'All 8 UAE free zones. 100% foreign ownership. From AED 5,500. 2–14 days.'},
  {h:'Mainland Company Formation',p:'DED-licensed LLC. Full UAE market access. 100% foreign ownership. From AED 15,000.'},
  {h:'Offshore Company Formation',p:'RAK ICC and JAFZA offshore. Asset holding, international trading. From AED 8,000.'},
])}
${_h2(`Visa &amp; Residency Services`)}
${_grid([
  {h:'UAE Investor Visa',p:'2–3 year residence visa for company owners. From AED 3,500. Includes Emirates ID.'},
  {h:'UAE Golden Visa',p:'10-year renewable residency for investors and entrepreneurs. Independent from employer.'},
  {h:'Employee &amp; Dependent Visa',p:'Sponsor your team and family. Full visa quota management.'},
])}
${_h2(`Business Support Services`)}
${_grid([
  {h:'Corporate Bank Account',p:'UAE business banking with major banks. High approval rate via direct bank relationships.'},
  {h:'PRO Services Dubai',p:'Government document processing, ministry approvals, license renewals, attestation.'},
  {h:'Trademark Registration UAE',p:'Ministry of Economy brand protection across all 45 trademark classes.'},
  {h:'Company Amendments',p:'Shareholder changes, activity additions, name changes, MOA amendments.'},
  {h:'Company Liquidation',p:'Orderly business closure and deregistration. All free zones and mainland.'},
  {h:'Special Approvals',p:'Regulated sector licenses — healthcare, education, finance, crypto, real estate.'},
  {h:'Will Registration UAE',p:'DIFC or ADJD will registration for expats. Asset and family protection.'},
])}
${_cta('Get a Free Consultation','/schedule')}
</div>`,

  about: `<div style="${_style}">${_nav}
${_h1(`About INCOZONE — <span style="color:#C9A84C;font-style:italic">UAE Business Setup Experts Since 2012</span>`)}
${_p(`INCOZONE is a private business setup advisory based in Dubai, UAE. Since 2012, we have incorporated over 3,200 companies across all UAE free zones and mainland jurisdictions. We are advisory-first: we recommend the jurisdiction that fits your business, not the most expensive option.`)}
${_h2(`Our Track Record`)}
${_ul([
  '3,200+ companies incorporated since 2012',
  'All 8 major UAE free zones: DMCC, IFZA, RAKEZ, SHAMS, JAFZA, AFZ, Meydan, ADGM',
  'Mainland DED-licensed companies, offshore structures (RAK ICC, JAFZA)',
  '1,000+ investor and Golden Visa applications processed',
  'Direct relationships with all major UAE banks for business accounts',
  'Clients from 60+ countries — fully remote service available',
])}
${_h2(`What Makes INCOZONE Different`)}
${_ul([
  'Advisory-first: we take time to understand your business before recommending a zone',
  'Transparent pricing: no hidden fees, full cost breakdown upfront',
  'End-to-end service: from company name reservation to bank account opening',
  'Post-setup support: PRO services, renewals, amendments, banking',
  'Private and confidential — all information handled with discretion',
])}
${_h2(`Contact INCOZONE`)}
${_p(`Email: advisory@incozone.ae | Location: Business Bay, Dubai, UAE | WhatsApp: ${PHONE_NUMBER}`)}
${_p(`Available Monday–Thursday &amp; Sunday 9am–6pm, Saturday 10am–2pm. Same-day response guaranteed.`)}
${_cta('Book Free Consultation','/schedule')}
</div>`,

  contact: `<div style="${_style}">${_nav}
${_h1(`Contact INCOZONE — <span style="color:#C9A84C;font-style:italic">Free UAE Company Formation Consultation</span>`)}
${_p(`Get a free consultation on UAE company formation, investor visa and corporate banking. Our experts respond within 1 hour during business hours. No obligation, no hard sell — just honest advisory.`)}
${_grid([
  {h:'Email',p:'advisory@incozone.ae — detailed enquiries and document submission'},
  {h:'WhatsApp',p:`${PHONE_NUMBER} — instant response for quick questions`},
  {h:'Location',p:'Business Bay, Dubai, United Arab Emirates'},
  {h:'Hours',p:'Mon–Thu &amp; Sun 9am–6pm, Sat 10am–2pm'},
])}
${_h2(`What to Expect from Your Free Consultation`)}
${_ul([
  'Free zone vs mainland recommendation based on your specific business',
  'Accurate cost breakdown for your chosen jurisdiction — no hidden fees',
  'Timeline for company formation, visa and banking',
  'Tax implications and structuring advice',
  'Step-by-step process walkthrough',
  'No obligation — take your time to decide',
])}
${_cta('Book Online Consultation','/schedule')}
</div>`,

  schedule: `<div style="${_style}">${_nav}
${_h1(`Book Free UAE Company Formation Consultation — <span style="color:#C9A84C;font-style:italic">Same-Day Slots</span>`)}
${_p(`Schedule a free 30-minute strategy call with an INCOZONE business setup expert. We'll assess your needs and recommend the optimal UAE free zone or mainland structure. Same-day and next-day slots available. No obligation.`)}
${_h2(`What We'll Cover in Your Consultation`)}
${_ul([
  'Your business activity and which UAE jurisdiction fits best',
  'Complete cost breakdown: license, visa, office, banking',
  'Timeline from application to operational company',
  'Visa options for you and your family',
  'Corporate banking introduction and requirements',
  'UAE corporate tax implications for your structure',
  'Any questions about living and working in UAE',
])}
${_p(`After your consultation, you\'ll have a clear picture of exactly what your UAE company will cost, how long it will take, and what steps are involved.`)}
${_cta('Contact Us to Book','/contact')}
</div>`,

  blog: `<div style="${_style}">${_nav}
${_h1(`UAE Business Setup Guides &amp; Insights — <span style="color:#C9A84C;font-style:italic">INCOZONE Blog 2026</span>`)}
${_p(`Expert guides on UAE company formation, free zone comparison, investor visa, Golden Visa 2026, corporate banking and business setup costs. Updated regularly by INCOZONE's advisory team.`)}
${_h2(`Essential UAE Business Setup Guides`)}
${_ul([
  'IFZA vs DMCC 2026: Which Free Zone Is Right For You?',
  'How to Set Up a Company in Dubai: Complete Step-by-Step Guide 2026',
  'UAE Golden Visa for Investors: Complete Guide 2026',
  'Cheapest Free Zone in UAE 2026 — Full Cost Comparison',
  'RAKEZ vs SHAMS: Which Free Zone Has Better Value?',
  'How to Open a Business Bank Account in UAE 2026',
  'ADGM vs DIFC: Which Is Better for Fintech and Financial Services?',
  'Free Zone vs Mainland UAE: Complete Comparison 2026',
  'UAE Corporate Tax: What Free Zone Companies Need to Know',
  'Offshore Company UAE: Complete Guide to RAK ICC and JAFZA',
])}
${_cta('Read Latest Guides','/blog')}
</div>`,

  rakez: `<div style="${_style}">${_nav}
${_h1(`RAKEZ Company Setup — <span style="color:#C9A84C;font-style:italic">Ras Al Khaimah Free Zone From AED 8,500</span>`)}
${_p(`RAKEZ (Ras Al Khaimah Economic Zone) is the UAE's most competitive free zone for commercial, industrial and manufacturing businesses. Set up in 3–7 business days from AED 8,500 with large visa quotas and direct Saqr port access.`)}
${_cta('Get RAKEZ Quote','/schedule')}
${_h2(`Why Choose RAKEZ?`)}
${_ul([
  'UAE\'s most competitive pricing from AED 8,500',
  '100% foreign ownership, 0% personal and corporate tax',
  'Large visa quotas — up to 10 visas per license',
  'Industrial land, warehouse and factory units available',
  'Direct access to Saqr Port for logistics and trade',
  'Both free zone and non-free zone (industrial) options',
  'Suitable for manufacturing, trading, industrial, commercial activities',
])}
${_h2(`RAKEZ Packages`)}
${_grid([
  {h:'Flexi Desk — AED 8,500',p:'1 activity, flexi desk, 2 visas. Perfect for trading and service companies.'},
  {h:'Executive Package — AED 14,500',p:'3 activities, serviced office, 5 visas. Ideal for growing businesses.'},
  {h:'Industrial Package — custom',p:'Factory or warehouse units. Large visa quota. Manufacturing and industrial use.'},
])}
${_cta('Start RAKEZ Company','/schedule')}
</div>`,

  shams: `<div style="${_style}">${_nav}
${_h1(`SHAMS Sharjah Media City — <span style="color:#C9A84C;font-style:italic">UAE Media Free Zone From AED 11,500</span>`)}
${_p(`SHAMS (Sharjah Media City) is UAE's leading free zone for media, content creation, advertising and creative businesses. Setup in 5–8 business days from AED 11,500. Perfect for social media agencies, content creators, PR firms and production companies.`)}
${_cta('Get SHAMS Quote','/schedule')}
${_h2(`Why Choose SHAMS?`)}
${_ul([
  'UAE\'s premier media and creative free zone',
  '100% foreign ownership, 0% personal and corporate tax',
  'Wide range of media activities: production, publishing, advertising, PR, social media',
  'Competitive pricing from AED 11,500',
  'Fast setup — trade license in 5–8 days',
  'SHAMS supports content creators, influencers and digital agencies',
])}
${_h2(`SHAMS Business Activities`)}
${_ul([
  'Social media management and digital marketing',
  'Content production and video creation',
  'Advertising and PR agencies',
  'Publishing — online, print and digital',
  'Radio and podcast production',
  'Photography and creative studios',
  'Event management',
  'E-commerce and online retail',
])}
${_cta('Start SHAMS Company','/schedule')}
</div>`,

  jafza: `<div style="${_style}">${_nav}
${_h1(`JAFZA Company Registration Dubai — <span style="color:#C9A84C;font-style:italic">Logistics &amp; Trade From AED 22,000</span>`)}
${_p(`JAFZA (Jebel Ali Free Zone Authority) is the world's largest free zone by area, located adjacent to Jebel Ali Port — the 9th largest port in the world. Ideal for large-scale logistics, import/export and warehousing businesses. Setup in 7–14 days.`)}
${_cta('Get JAFZA Quote','/schedule')}
${_h2(`Why Choose JAFZA?`)}
${_ul([
  'World\'s largest free zone — 9,000+ companies',
  'Direct integration with Jebel Ali Port (DP World)',
  'Strategic location between Dubai Airport and Abu Dhabi',
  'Warehouse, land and office units available',
  'Ideal for import/export, logistics, distribution, manufacturing',
  '100% foreign ownership, 0% import/export duties',
  'Dual licence option: free zone + mainland operations',
])}
${_cta('Start JAFZA Company','/schedule')}
</div>`,

  afz: `<div style="${_style}">${_nav}
${_h1(`Ajman Free Zone Setup — <span style="color:#C9A84C;font-style:italic">Cheapest UAE Free Zone From AED 5,500</span>`)}
${_p(`AFZ (Ajman Free Zone) is the most affordable free zone in UAE, with trade licenses starting from AED 5,500. Set up your company in 2–5 business days. Ideal for startups, freelancers, e-commerce businesses and budget-conscious entrepreneurs.`)}
${_cta('Get AFZ Quote','/schedule')}
${_h2(`Why Choose Ajman Free Zone?`)}
${_ul([
  'UAE\'s cheapest free zone from AED 5,500',
  '100% foreign ownership, 0% tax',
  'Fastest setup in UAE — trade license in 2–5 days',
  'Wide range of activities: trading, services, e-commerce, consulting',
  'Virtual office and flexi desk options',
  'Multiple visa allocation options',
  'Only 20 minutes from Dubai',
])}
${_grid([
  {h:'Starter — AED 5,500',p:'1 activity, virtual office, 1 visa. Perfect for startups and freelancers.'},
  {h:'Business — AED 9,500',p:'3 activities, flexi desk, 3 visas. For growing businesses.'},
  {h:'Premium — AED 16,500',p:'5 activities, private office, 5 visas. For established companies.'},
])}
${_cta('Start AFZ Company','/schedule')}
</div>`,

  meydan: `<div style="${_style}">${_nav}
${_h1(`Meydan Free Zone Setup Dubai — <span style="color:#C9A84C;font-style:italic">Premium Location From AED 14,500</span>`)}
${_p(`Meydan Free Zone offers a prestigious Dubai address near Meydan Racecourse, ideal for tech companies, consultancies and lifestyle brands. Set up in 5–10 days from AED 14,500 with flexible office options.`)}
${_cta('Get Meydan Quote','/schedule')}
${_h2(`Why Choose Meydan?`)}
${_ul([
  'Premium Dubai address — prestigious for clients and investors',
  '100% foreign ownership, 0% tax',
  'Wide business activities: tech, consulting, trading, e-commerce, media',
  'Flexi desk to private office options',
  'Setup in 5–10 business days',
  'Popular with digital businesses, startups and international brands',
])}
${_cta('Start Meydan Company','/schedule')}
</div>`,

  adgm: `<div style="${_style}">${_nav}
${_h1(`ADGM Company Formation Abu Dhabi — <span style="color:#C9A84C;font-style:italic">Financial Centre From AED 28,500</span>`)}
${_p(`ADGM (Abu Dhabi Global Market) is Abu Dhabi's premier international financial centre on Al Maryah Island. Equivalent prestige to DIFC, operating under English Common Law. Specialises in financial services, asset management, fintech, wealth management and family offices. Setup in 10–21 days.`)}
${_cta('Get ADGM Quote','/schedule')}
${_h2(`Why Choose ADGM?`)}
${_ul([
  'Abu Dhabi\'s top IFC — equivalent to London and Singapore financial centres',
  'English Common Law jurisdiction — preferred by international financial institutions',
  'Regulated by FSRA (Financial Services Regulatory Authority)',
  '100% foreign ownership, competitive tax framework',
  'Ideal for asset management, funds, family offices, fintech, wealth management',
  'ADGM arbitration and legal framework internationally recognised',
])}
${_h2(`ADGM vs DIFC`)}
${_p(`ADGM and DIFC are both world-class IFCs. ADGM is based in Abu Dhabi and generally seen as more accessible for smaller financial firms. DIFC is in Dubai and tends to have slightly higher minimum requirements. Both operate under English Common Law and are internationally recognised for financial services.`)}
${_cta('Start ADGM Company','/schedule')}
</div>`,

  pro: `<div style="${_style}">${_nav}
${_h1(`PRO Services Dubai — <span style="color:#C9A84C;font-style:italic">Government Document Processing 2026</span>`)}
${_p(`INCOZONE provides dedicated PRO (Public Relations Officer) services in Dubai and UAE. Our PRO team handles all government document processing, ministry submissions, visa renewals, attestation, Ejari and power of attorney — saving you time and ensuring compliance.`)}
${_cta('Enquire About PRO Services','/schedule')}
${_h2(`PRO Services We Provide`)}
${_ul([
  'Trade license renewal — DED and all UAE free zones',
  'Visa processing and renewal — investor, employee and dependent visas',
  'Ministry of Human Resources (MOHRE) labour and contract submissions',
  'Immigration Department submissions and status checks',
  'Document attestation — Ministry of Foreign Affairs, embassies',
  'Ejari tenancy registration for DED mainland companies',
  'Power of attorney drafting and notarisation',
  'Emirates ID renewal and updating',
  'Medical fitness test coordination',
  'Company Establishment Card renewal',
  'WPS (Wage Protection System) setup and management',
])}
${_h2(`PRO Retainer Service`)}
${_p(`For businesses with ongoing government document needs, INCOZONE offers a monthly PRO retainer. Your dedicated PRO officer handles all renewals, submissions and government-related tasks proactively — with 30-day advance notifications for all upcoming renewals.`)}
${_cta('Get PRO Service Quote','/schedule')}
</div>`,

  trademark: `<div style="${_style}">${_nav}
${_h1(`Trademark Registration UAE — <span style="color:#C9A84C;font-style:italic">Brand Protection 2026</span>`)}
${_p(`Register your trademark with the UAE Ministry of Economy. Protect your brand name, logo and intellectual property across all 45 trademark classes. Full IP protection from AED 3,500. Fast-track registration available.`)}
${_cta('Register Trademark','/schedule')}
${_h2(`UAE Trademark Registration Benefits`)}
${_ul([
  'Legal protection for your brand name, logo and tagline in UAE',
  'Exclusive right to use your mark across your registered classes',
  'Ability to take legal action against infringers',
  'Valid for 10 years, renewable indefinitely',
  'Required for business partnerships, franchising and licensing deals',
  'Builds brand equity and investor confidence',
])}
${_h2(`Trademark Registration Process`)}
${_ul([
  'Step 1: Trademark search — check for conflicting existing marks',
  'Step 2: Select trademark classes (1–45) relevant to your business',
  'Step 3: File application with UAE Ministry of Economy',
  'Step 4: Examination period (2–4 months)',
  'Step 5: Publication in Official Gazette (opposition period: 30 days)',
  'Step 6: Trademark certificate issued (6–12 months total)',
])}
${_cta('Start Trademark Registration','/schedule')}
</div>`,

  amendments: `<div style="${_style}">${_nav}
${_h1(`Company Amendments UAE — <span style="color:#C9A84C;font-style:italic">License Renewals &amp; Modifications</span>`)}
${_p(`INCOZONE handles all types of UAE company amendments across free zones and mainland — shareholder changes, activity additions, name changes, MOA amendments, director changes and license renewals. Fast turnaround across all jurisdictions.`)}
${_cta('Get Amendment Quote','/schedule')}
${_h2(`Types of Company Amendments`)}
${_ul([
  'Shareholder addition, removal or transfer of shares',
  'Business activity additions or removals',
  'Company name change',
  'Manager or director changes',
  'Memorandum of Association (MOA) amendments',
  'Share capital increase or decrease',
  'Registered address change',
  'License renewal — annual and multi-year',
  'Conversion from one legal structure to another',
])}
${_cta('Start Company Amendment','/schedule')}
</div>`,

  liquidation: `<div style="${_style}">${_nav}
${_h1(`Company Liquidation UAE — <span style="color:#C9A84C;font-style:italic">Business Closure Services 2026</span>`)}
${_p(`INCOZONE manages orderly UAE company liquidation and deregistration across all free zones and mainland. Full closure including visa cancellation, bank account closure, license cancellation and authority clearances. Fully managed to avoid fines and complications.`)}
${_cta('Get Liquidation Quote','/schedule')}
${_h2(`Company Liquidation Steps`)}
${_ul([
  'Step 1: Cancel all active employee and investor visas',
  'Step 2: Close corporate bank accounts',
  'Step 3: Obtain no-objection certificates from relevant authorities',
  'Step 4: Submit liquidation application to free zone or DED',
  'Step 5: Settle any outstanding license fees or fines',
  'Step 6: Receive deregistration certificate',
])}
${_p(`Important: Do not simply stop paying license fees. Underegistered companies accumulate annual renewal fines and can affect the shareholders\' UAE entry and future business activities.`)}
${_cta('Start Liquidation Process','/schedule')}
</div>`,

  specialapprovals: `<div style="${_style}">${_nav}
${_h1(`Special Approvals UAE — <span style="color:#C9A84C;font-style:italic">Regulated Business Licenses</span>`)}
${_p(`INCOZONE manages special regulatory approvals for businesses in regulated sectors — healthcare, education, financial services, food, real estate, crypto, security and more. Ministry approvals, sector-specific licenses and dual-authority filings.`)}
${_cta('Get Special Approval Quote','/schedule')}
${_h2(`Regulated Activities Requiring Special Approvals`)}
${_ul([
  'Healthcare: Ministry of Health, Dubai Health Authority (DHA), HAAD',
  'Education: Ministry of Education, KHDA (Knowledge and Human Development Authority)',
  'Financial services: Central Bank UAE, FSRA (ADGM), DFSA (DIFC)',
  'Real estate: RERA (Real Estate Regulatory Authority) Dubai',
  'Crypto and virtual assets: VARA (Virtual Assets Regulatory Authority)',
  'Food and beverage: Municipality approvals, food safety permits',
  'Security and surveillance: SIRA (Security Industry Regulatory Agency)',
  'Advertising: National Media Council (NMC) approvals',
])}
${_cta('Discuss Special Approvals','/schedule')}
</div>`,

  willregistration: `<div style="${_style}">${_nav}
${_h1(`Will Registration UAE — <span style="color:#C9A84C;font-style:italic">Expat Wills &amp; Estate Planning 2026</span>`)}
${_p(`Register your will in UAE to protect your assets and family. INCOZONE handles DIFC Wills Service Centre registration and Abu Dhabi Judicial Department (ADJD) wills for expats. Protect property, business shares, bank accounts and custody arrangements under UAE law.`)}
${_cta('Register Your UAE Will','/schedule')}
${_h2(`Why Expats Need a UAE Will`)}
${_ul([
  'Without a UAE will, Sharia law may apply to your UAE assets regardless of nationality',
  'Protect UAE property, bank accounts, business shares and investments',
  'Ensure custody of children is assigned as you intend',
  'Avoid lengthy and costly court proceedings for family',
  'A UAE will complements (not replaces) your home country will',
])}
${_h2(`UAE Will Registration Options`)}
${_grid([
  {h:'DIFC Will — From AED 4,500',p:'English-law will for non-Muslim expats. Covers Dubai and Ras Al Khaimah assets. Most popular option.'},
  {h:'ADJD Will — Abu Dhabi',p:'Abu Dhabi Judicial Department will. Covers Abu Dhabi, Al Ain and Northern Emirates assets.'},
  {h:'Mainland Will',p:'Notarised will for UAE mainland property and assets. Arabic language document.'},
])}
${_cta('Register UAE Will','/schedule')}
</div>`,

};

// ─── PAGE SCHEMAS MAP ─────────────────────────────────────────
// Maps each page key to its array of JSON-LD schema strings.
// prerender.mjs injects these as <script type="application/ld+json"> in <head>.
export const PAGE_SCHEMAS = {
  home:           [ORG_SCHEMA, HOWTO_SCHEMA, FREEZONE_LIST_SCHEMA, buildFAQSchema(PAGE_FAQ.home || MASTER_FAQ.slice(0,8)), buildBreadcrumb(BREADCRUMBS.home)],
  services:       [ORG_SCHEMA, SERVICE_SCHEMA, buildFAQSchema(MASTER_FAQ.slice(0,6)), buildBreadcrumb(BREADCRUMBS.services)],
  freezoneincorp: [ORG_SCHEMA, SERVICE_SCHEMA, FREEZONE_LIST_SCHEMA, buildFAQSchema(PAGE_FAQ.freezoneincorp), HOWTO_SCHEMA, buildBreadcrumb(BREADCRUMBS.freezoneincorp)],
  mainland:       [ORG_SCHEMA, buildFAQSchema(PAGE_FAQ.mainland), buildBreadcrumb(BREADCRUMBS.mainland)],
  offshore:       [ORG_SCHEMA, buildBreadcrumb([{name:'Home',path:'/'},{name:'Offshore Formation',path:'/offshore'}])],
  banking:        [ORG_SCHEMA, buildFAQSchema(PAGE_FAQ.banking), buildBreadcrumb(BREADCRUMBS.banking)],
  goldenvisa:     [ORG_SCHEMA, buildFAQSchema(PAGE_FAQ.goldenvisa), buildBreadcrumb(BREADCRUMBS.goldenvisa)],
  visa:           [ORG_SCHEMA, buildFAQSchema(PAGE_FAQ.visa), buildBreadcrumb(BREADCRUMBS.visa)],
  pro:            [ORG_SCHEMA, buildBreadcrumb(BREADCRUMBS.pro)],
  trademark:      [ORG_SCHEMA, buildBreadcrumb([{name:'Home',path:'/'},{name:'Trademark Registration',path:'/trademark'}])],
  amendments:     [ORG_SCHEMA, buildBreadcrumb([{name:'Home',path:'/'},{name:'Company Amendments',path:'/amendments'}])],
  liquidation:    [ORG_SCHEMA, buildBreadcrumb([{name:'Home',path:'/'},{name:'Company Liquidation',path:'/liquidation'}])],
  specialapprovals:[ORG_SCHEMA, buildBreadcrumb([{name:'Home',path:'/'},{name:'Special Approvals',path:'/specialapprovals'}])],
  willregistration:[ORG_SCHEMA, buildBreadcrumb([{name:'Home',path:'/'},{name:'Will Registration UAE',path:'/willregistration'}])],
  dmcc:           [ORG_SCHEMA, buildFAQSchema(PAGE_FAQ.dmcc), buildBreadcrumb(BREADCRUMBS.dmcc)],
  ifza:           [ORG_SCHEMA, buildFAQSchema(PAGE_FAQ.ifza), buildBreadcrumb(BREADCRUMBS.ifza)],
  meydan:         [ORG_SCHEMA, buildBreadcrumb(BREADCRUMBS.meydan)],
  rakez:          [ORG_SCHEMA, buildFAQSchema(PAGE_FAQ.rakez), buildBreadcrumb(BREADCRUMBS.rakez)],
  shams:          [ORG_SCHEMA, buildBreadcrumb(BREADCRUMBS.shams)],
  jafza:          [ORG_SCHEMA, buildFAQSchema(PAGE_FAQ.jafza), buildBreadcrumb(BREADCRUMBS.jafza)],
  afz:            [ORG_SCHEMA, buildBreadcrumb(BREADCRUMBS.afz)],
  adgm:           [ORG_SCHEMA, buildFAQSchema(PAGE_FAQ.adgm), buildBreadcrumb(BREADCRUMBS.adgm)],
  about:          [ORG_SCHEMA, buildBreadcrumb(BREADCRUMBS.about)],
  blog:           [ORG_SCHEMA, BLOG_ARTICLE_SCHEMA, buildBreadcrumb(BREADCRUMBS.blog)],
  contact:        [ORG_SCHEMA, buildBreadcrumb(BREADCRUMBS.contact)],
  schedule:       [ORG_SCHEMA, buildBreadcrumb(BREADCRUMBS.schedule)],
};

