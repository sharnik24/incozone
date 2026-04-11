// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Schedule Consultation API
//  POST /api/schedule
//
//  Triggers a GitHub Actions workflow that writes the booking to
//  the private sharnik24/incozone-crm repo.
//  No Vercel environment variables required.
// ═══════════════════════════════════════════════════════════════

const GH_REPO  = "sharnik24/incozone";
const GH_TOKEN = process.env.GITHUB_TOKEN || process.env.CRM_WRITE_TOKEN || "";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const {
      name, email, phone, company, nationality, notes,
      service, date, time, duration,
    } = req.body || {};

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const payload = {
      id:          Date.now(),
      name:        name.trim(),
      email:       email.trim().toLowerCase(),
      phone:       (phone       || "").trim(),
      company:     (company     || "").trim(),
      nationality: (nationality || "").trim(),
      service:     (service     || "").trim(),
      date:        (date        || "").trim(),
      time:        (time        || "").trim(),
      duration:    duration || "30",
      notes:       (notes       || "").trim(),
      status:      "pending",
      createdAt:   new Date().toISOString(),
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
            type: "consultation",
            payload: JSON.stringify(payload),
          },
        }),
      }
    );

    if (!dispatchRes.ok && dispatchRes.status !== 204) {
      const err = await dispatchRes.text();
      console.error("[schedule] dispatch failed:", dispatchRes.status, err);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[schedule] error:", err.message);
    return res.status(200).json({ ok: true });
  }
}
