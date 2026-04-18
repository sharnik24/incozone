// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Save Content API
//  POST /api/save-content
//
//  Writes content.json to GitHub → triggers Vercel redeploy.
//  GitHub token is stored server-side in GITHUB_TOKEN env var.
//  No token in the browser. No token in admin login required.
// ═══════════════════════════════════════════════════════════════

const GH_REPO  = "sharnik24/incozone";
const GH_FILE  = "public/content.json";
const GH_API   = `https://api.github.com/repos/${GH_REPO}/contents/${GH_FILE}`;
const GH_TOKEN = process.env.GITHUB_TOKEN || process.env.CRM_WRITE_TOKEN || "";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!GH_TOKEN) return res.status(500).json({ error: "Server not configured — add GITHUB_TOKEN to Vercel env vars" });

  try {
    const content = req.body;
    if (!content || typeof content !== "object") {
      return res.status(400).json({ error: "Invalid content payload" });
    }

    // Get current file SHA (required for GitHub API update)
    const infoRes = await fetch(GH_API, {
      headers: {
        Authorization: `token ${GH_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
    const info = await infoRes.json();
    if (!info.sha) {
      console.error("[save-content] No SHA returned:", info);
      return res.status(500).json({ error: "Could not fetch file SHA from GitHub" });
    }

    // Encode JSON as UTF-8 base64 (Node.js Buffer handles UTF-8 correctly)
    const jsonBody = JSON.stringify(content, null, 2);
    const encoded  = Buffer.from(jsonBody, "utf8").toString("base64");

    const pushRes = await fetch(GH_API, {
      method: "PUT",
      headers: {
        Authorization: `token ${GH_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "CMS: update site content",
        content: encoded,
        sha: info.sha,
      }),
    });

    if (!pushRes.ok) {
      const errText = await pushRes.text();
      console.error("[save-content] GitHub push failed:", pushRes.status, errText);
      return res.status(500).json({ error: `GitHub push failed (${pushRes.status})` });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[save-content] error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
