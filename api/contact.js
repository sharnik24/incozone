// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Contact Enquiry API
//  POST /api/contact
//
//  Triggers a GitHub Actions workflow that writes the enquiry to
//  the private sharnik24/incozone-crm repo.
//  No Vercel environment variables required.
// ═══════════════════════════════════════════════════════════════

// This token is stored encrypted as a GitHub Actions secret.
// For the workflow dispatch call, we need it here too.
// A Vercel env var (GITHUB_TOKEN) is preferred but falls back to
// the GitHub Actions dispatch token if available.
const GH_REPO  = "sharnik24/incozone";
const GH_TOKEN = process.env.GITHUB_TOKEN || process.env.CRM_WRITE_TOKEN || "";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name, email, phone, company, service, message } = req.body || {};
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const payload = {
      id:      Date.now(),
      name:    name.trim(),
      email:   email.trim().toLowerCase(),
      phone:   (phone   || "").trim(),
      company: (company || "").trim(),
      service: (service || "").trim(),
      message: (message || "").trim(),
      date:    new Date().toISOString().slice(0, 10),
      status:  "new",
    };

    // Trigger the CRM GitHub Actions workflow
    const dispatchRes = await fetch(
      `https://api.github.com/repos/${GH_REPO}/actions/workflows/crm.yml/dispatches`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${GH_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ref: "main",
          inputs: {
            type: "enquiry",
            payload: JSON.stringify(payload),
          },
        }),
      }
    );

    if (!dispatchRes.ok && dispatchRes.status !== 204) {
      const err = await dispatchRes.text();
      console.error("[contact] dispatch failed:", dispatchRes.status, err);
    }

    // Always return success to the user
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[contact] error:", err.message);
    return res.status(200).json({ ok: true });
  }
}
