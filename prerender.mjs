/**
 * prerender.mjs — Static HTML generator for INCOZONE
 *
 * Runs after `vite build`. For each route:
 *  1. Injects per-page title, description, canonical and OG tags into <head>
 *  2. Injects JSON-LD schema markup (FAQ, HowTo, Organization, Breadcrumb) into <head>
 *  3. Injects per-page static HTML content into <div id="root"> so Google
 *     reads real content immediately (React replaces it on hydration)
 *  4. Updates per-page <noscript> content
 *  5. Generates dist/sitemap.xml
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dir = path.dirname(fileURLToPath(import.meta.url))
const DIST  = path.join(__dir, 'dist')

// ── Import SEO data from seo.js ──────────────────────────────────
const { PAGE_META, BASE_URL, STATIC_BODY, PAGE_SCHEMAS } = await import('./src/seo.js')

// ── Slug helper (mirrors Blog.jsx toSlug) ────────────────────────
function toSlug(title) {
  return String(title).toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// ── Load blog posts from content.json ───────────────────────────
let blogPosts = []
try {
  const contentRaw = fs.readFileSync(path.join(__dir, 'public', 'content.json'), 'utf-8')
  const contentJson = JSON.parse(contentRaw)
  blogPosts = (contentJson.blog || []).filter(p => p.status === 'published')
} catch (_) {}

// Also include hardcoded ARTICLES from Blog.jsx (titles only, for static generation)
const HARDCODED_TITLES = [
  // New editorial articles (ids 9–13)
  "Ultimate Beneficial Owner (UBO) Compliance in the UAE: Who Must Report, Deadlines & Penalties",
  "UAE Business Setup Timeline 2026: Step-by-Step Guide from Trade Name to Visa Issuance",
  "Mainland vs Free Zone vs Branch Office: The UAE Expansion Decision Framework",
  "Hiring Your First Employee in the UAE: The Complete Employer's Guide",
  "Business Relocation to the UAE: The Executive's Complete Playbook",
  // Legacy hardcoded articles (ids 1–8)
  "Why DMCC Remains the UAE's Most Coveted Business Address",
  "IFZA 2026: The Smart Founder's First UAE Company",
  "UAE Golden Visa 2026: The Complete Investor Qualification Guide",
  "Opening a UAE Corporate Bank Account: The Insider's Playbook",
  "Mainland vs Free Zone: Making the Right UAE Structure Decision",
  "The Hidden Costs of UAE Company Formation",
  "RAKEZ 2026: Ras Al Khaimah's Industrial & Trading Free Zone",
  "UAE PRO Services: What Every Business Owner Must Know",
  "SHAMS Free Zone: The UAE's Media & Content Creator Hub",
]

// Build blog routes: from content.json + hardcoded
const blogRoutes = []
const seenSlugs = new Set()

for (const post of blogPosts) {
  const slug = toSlug(post.title)
  if (!slug || seenSlugs.has(slug)) continue
  seenSlugs.add(slug)
  blogRoutes.push({
    url: `/blog/${slug}`,
    title: post.title,
    description: post.deck || post.excerpt || `Read ${post.title} on INCOZONE UAE Business Gazette.`,
    imageUrl: post.imageUrl || '',
    date: post.date || '',
  })
}

for (const title of HARDCODED_TITLES) {
  const slug = toSlug(title)
  if (!slug || seenSlugs.has(slug)) continue
  seenSlugs.add(slug)
  blogRoutes.push({
    url: `/blog/${slug}`,
    title,
    description: `${title} — expert UAE business insight from INCOZONE Advisory.`,
    imageUrl: '',
    date: '',
  })
}

// ── Route → meta key map ─────────────────────────────────────────
const ROUTES = [
  { url: '/',                key: 'home'             },
  { url: '/services',        key: 'services'         },
  { url: '/freezoneincorp',  key: 'freezoneincorp'   },
  { url: '/mainland',        key: 'mainland'         },
  { url: '/offshore',        key: 'offshore'         },
  { url: '/banking',         key: 'banking'          },
  { url: '/goldenvisa',      key: 'goldenvisa'       },
  { url: '/visa',            key: 'visa'             },
  { url: '/pro',             key: 'pro'              },
  { url: '/trademark',       key: 'trademark'        },
  { url: '/amendments',      key: 'amendments'       },
  { url: '/liquidation',     key: 'liquidation'      },
  { url: '/specialapprovals',key: 'specialapprovals' },
  { url: '/willregistration',key: 'willregistration' },
  { url: '/dmcc',            key: 'dmcc'             },
  { url: '/ifza',            key: 'ifza'             },
  { url: '/meydan',          key: 'meydan'           },
  { url: '/rakez',           key: 'rakez'            },
  { url: '/shams',           key: 'shams'            },
  { url: '/jafza',           key: 'jafza'            },
  { url: '/afz',             key: 'afz'              },
  { url: '/adgm',            key: 'adgm'             },
  { url: '/about',           key: 'about'            },
  { url: '/blog',            key: 'blog'             },
  { url: '/contact',         key: 'contact'          },
  { url: '/schedule',        key: 'schedule'         },
]

// ── HTML meta injection ──────────────────────────────────────────
function injectMeta(html, meta) {
  const esc = s => s.replace(/"/g, '&quot;')
  const { title, description, canonical } = meta

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
  html = html.replace(/(<meta name="description" content=")[^"]*(")/,   `$1${esc(description)}$2`)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/,         `$1${canonical}$2`)
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/,    `$1${canonical}$2`)
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/,  `$1${esc(title)}$2`)
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/,`$1${esc(description)}$2`)
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/,      `$1${esc(title)}$2`)
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/,`$1${esc(description)}$2`)

  return html
}

// ── JSON-LD schema injection ─────────────────────────────────────
function injectSchemas(html, schemas) {
  if (!schemas || schemas.length === 0) return html
  const tags = schemas
    .map(s => `  <script type="application/ld+json">\n  ${s}\n  </script>`)
    .join('\n')
  // Insert before </head>
  return html.replace('</head>', `${tags}\n</head>`)
}

// ── Static body injection ────────────────────────────────────────
// Replaces the content of <div id="root"></div> with per-page HTML.
// React uses createRoot().render() so it will replace this content on
// hydration — users see the interactive React app as normal.
// Google reads the static HTML immediately, without executing JS.
function injectBody(html, staticHtml) {
  if (!staticHtml) return html
  return html.replace(
    '<div id="root"></div>',
    `<div id="root">${staticHtml}</div>`
  )
}

// ── Sitemap generation ───────────────────────────────────────────
function generateSitemap(routes) {
  const today = new Date().toISOString().split('T')[0]

  // Priority map — higher priority for core service pages
  const priorities = {
    '/':                '1.0',
    '/services':        '0.9',
    '/freezoneincorp':  '0.9',
    '/dmcc':            '0.9',
    '/ifza':            '0.9',
    '/goldenvisa':      '0.9',
    '/mainland':        '0.85',
    '/banking':         '0.85',
    '/rakez':           '0.8',
    '/shams':           '0.8',
    '/jafza':           '0.8',
    '/afz':             '0.8',
    '/adgm':            '0.8',
    '/meydan':          '0.8',
    '/offshore':        '0.75',
    '/visa':            '0.75',
    '/pro':             '0.7',
    '/trademark':       '0.7',
    '/amendments':      '0.65',
    '/liquidation':     '0.65',
    '/specialapprovals':'0.65',
    '/willregistration':'0.65',
    '/blog':            '0.8',
    '/about':           '0.6',
    '/contact':         '0.7',
    '/schedule':        '0.8',
  }

  const urls = routes
    .filter(r => !['admin'].includes(r.key))
    .map(r => {
      const loc     = `${BASE_URL}${r.url === '/' ? '' : r.url}`
      const isBlogPost = r.url.startsWith('/blog/') && r.url.length > 6
      const prio    = isBlogPost ? '0.75' : (priorities[r.url] || '0.6')
      const freq    = ['/', '/blog'].includes(r.url) ? 'weekly' : (isBlogPost ? 'weekly' : 'monthly')
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${prio}</priority>
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}

// ── Main ─────────────────────────────────────────────────────────
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8')
let count = 0

for (const { url, key } of ROUTES) {
  const meta = PAGE_META[key]
  if (!meta) {
    console.warn(`⚠  No PAGE_META for "${key}", skipping ${url}`)
    continue
  }

  let html = injectMeta(template, meta)
  html = injectSchemas(html, PAGE_SCHEMAS?.[key])
  html = injectBody(html, STATIC_BODY?.[key])

  if (url === '/') {
    fs.writeFileSync(path.join(DIST, 'index.html'), html)
  } else {
    const dir = path.join(DIST, url.slice(1))
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'index.html'), html)
  }

  count++
  const hasBody    = STATIC_BODY?.[key]    ? '✓body' : '·body'
  const hasSchemas = PAGE_SCHEMAS?.[key]?.length ? `✓schema(${PAGE_SCHEMAS[key].length})` : '·schema'
  console.log(`✓ ${url.padEnd(22)} ${hasBody} ${hasSchemas}  ${meta.title.slice(0, 45)}`)
}

// ── Generate individual blog post pages ──────────────────────────
const blogMeta = PAGE_META['blog']
for (const post of blogRoutes) {
  const meta = {
    title: `${post.title} | INCOZONE UAE Business Gazette`,
    description: post.description,
    canonical: `${BASE_URL}${post.url}`,
  }
  let html = injectMeta(template, meta)
  // Inject Article schema
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "author": { "@type": "Organization", "name": "INCOZONE" },
    "publisher": { "@type": "Organization", "name": "INCOZONE", "url": BASE_URL },
    "url": `${BASE_URL}${post.url}`,
    ...(post.date ? { "datePublished": post.date } : {}),
    ...(post.imageUrl ? { "image": post.imageUrl } : {}),
  })
  html = injectSchemas(html, [`  ${articleSchema}`])

  const dir = path.join(DIST, 'blog', post.url.split('/blog/')[1])
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html)
  count++
  console.log(`✓ ${post.url.padEnd(55)} ·body ·schema  ${post.title.slice(0, 40)}`)
}

// ── Write sitemap.xml (core pages + blog posts) ──────────────────
const allSitemapRoutes = [
  ...ROUTES.filter(r => r.key !== 'admin'),
  ...blogRoutes.map(r => ({ url: r.url, key: 'blog-post' })),
]
const sitemap = generateSitemap(allSitemapRoutes)
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap)
console.log(`\n🗺  sitemap.xml → ${allSitemapRoutes.length} URLs (${blogRoutes.length} blog posts)`)
console.log(`✅  Prerendered ${count} pages`)
