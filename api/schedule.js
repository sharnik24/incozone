// ═══════════════════════════════════════════════════════════════
//  INCOZONE — Schedule Consultation API
//  POST /api/schedule  →  saves booking to private GitHub CRM repo
//
//  Required Vercel environment variables:
//    GITHUB_TOKEN  — Personal Access Token with "repo" scope
//    CRM_REPO      — e.g. "sharnik24/incozone-crm" (private repo)
// ═══════════════════════════════════════════════════════════════

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://www.incozone.com");
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

    const token   = process.env.GITHUB_TOKEN;
    const crmRepo = process.env.CRM_REPO || "sharnik24/incozone-crm";
    const fileUrl = `https://api.github.com/repos/${crmRepo}/contents/consultations.json`;
    const ghHeaders = {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    };

    // ── 1. Read current file (if exists) ──────────────────────
    let existing = [];
    let sha = null;

    const getRes = await fetch(fileUrl, { headers: ghHeaders });
    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
      existing = JSON.parse(
        Buffer.from(fileData.content, "base64").toString("utf8")
      );
    }

    // ── 2. Prepend new booking ────────────────────────────────
    const newBooking = {
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
    existing.unshift(newBooking);

    // ── 3. Push updated file back to GitHub ───────────────────
    const content = Buffer.from(JSON.stringify(existing, null, 2)).toString("base64");
    const putBody = {
      message: `Booking: ${newBooking.name} — ${newBooking.service} on ${newBooking.date}`,
      content,
    };
    if (sha) putBody.sha = sha;

    const putRes = await fetch(fileUrl, {
      method: "PUT",
      headers: ghHeaders,
      body: JSON.stringify(putBody),
    });

    if (!putRes.ok) {
      const err = await putRes.text();
      throw new Error(`GitHub write failed (${putRes.status}): ${err}`);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[schedule] error:", err.message);
    return res.status(200).json({ ok: true, warn: err.message });
  }
}
