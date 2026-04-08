/**
 * prerender.mjs — Static HTML generator for INCOZONE
 *
 * Runs after `vite build`. For each route, clones dist/index.html
 * and injects the correct title, description, canonical and OG tags.
 * No headless browser required — works on any CI including Vercel.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dir = path.dirname(fileURLToPath(import.meta.url))
const DIST  = path.join(__dir, 'dist')

// ── Import PAGE_META from seo.js ─────────────────────────────────
const { PAGE_META, BASE_URL } = await import('./src/seo.js')

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

  // <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)

  // description
  html = html.replace(
    /(<meta name="description" content=")[^"]*(")/,
    `$1${esc(description)}$2`
  )

  // canonical
  html = html.replace(
    /(<link rel="canonical" href=")[^"]*(")/,
    `$1${canonical}$2`
  )

  // OG url
  html = html.replace(
    /(<meta property="og:url" content=")[^"]*(")/,
    `$1${canonical}$2`
  )

  // OG title
  html = html.replace(
    /(<meta property="og:title" content=")[^"]*(")/,
    `$1${esc(title)}$2`
  )

  // OG description
  html = html.replace(
    /(<meta property="og:description" content=")[^"]*(")/,
    `$1${esc(description)}$2`
  )

  // Twitter title
  html = html.replace(
    /(<meta name="twitter:title" content=")[^"]*(")/,
    `$1${esc(title)}$2`
  )

  // Twitter description
  html = html.replace(
    /(<meta name="twitter:description" content=")[^"]*(")/,
    `$1${esc(description)}$2`
  )

  return html
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

  const html = injectMeta(template, meta)

  if (url === '/') {
    fs.writeFileSync(path.join(DIST, 'index.html'), html)
  } else {
    const dir = path.join(DIST, url.slice(1))
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'index.html'), html)
  }

  count++
  console.log(`✓ ${url.padEnd(20)} ${meta.title.slice(0, 55)}`)
}

console.log(`\n✅ Prerendered ${count}/${ROUTES.length} pages`)
