// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Image Upload API
//  POST /api/upload-image
//
//  Uploads an image to public/images/cms/ on GitHub.
//  Token stored server-side in GITHUB_TOKEN env var.
// ═══════════════════════════════════════════════════════════════

const GH_REPO  = "sharnik24/incozone";
const GH_TOKEN = process.env.GITHUB_TOKEN || process.env.CRM_WRITE_TOKEN || "";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!GH_TOKEN) return res.status(500).json({ error: "Server not configured — add GITHUB_TOKEN to Vercel env vars" });

  try {
    const { filename, content: base64content } = req.body || {};
    if (!filename || !base64content) {
      return res.status(400).json({ error: "filename and content (base64) are required" });
    }

    // Sanitise filename
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const GH_IMG   = `https://api.github.com/repos/${GH_REPO}/contents/public/images/cms/${safeName}`;

    const headers = {
      Authorization: `token ${GH_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    };

    // Check if file already exists (to get SHA for update)
    const existing = await fetch(GH_IMG, { headers }).then(r => r.ok ? r.json() : null);

    const body = {
      message: `CMS: upload image ${safeName}`,
      content: base64content,
    };
    if (existing?.sha) body.sha = existing.sha;

    const pushRes = await fetch(GH_IMG, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });

    if (!pushRes.ok) {
      const errText = await pushRes.text();
      console.error("[upload-image] GitHub push failed:", pushRes.status, errText);
      return res.status(500).json({ error: `Image upload failed (${pushRes.status})` });
    }

    return res.status(200).json({ ok: true, path: `/images/cms/${safeName}` });
  } catch (err) {
    console.error("[upload-image] error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
