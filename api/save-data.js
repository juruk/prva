// /api/save-data.js
export default async function handler(req, res) {
  // CORS — for production, set this to your exact frontend origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
    const { owner, repo, branch = process.env.GITHUB_BRANCH || "main", path, data } = req.body || {};
    if (!owner || !repo || !path || !data) return res.status(400).send("Missing owner/repo/path/data");

    const token = process.env.GITHUB_TOKEN;
    if (!token) return res.status(500).send("Missing GITHUB_TOKEN");

    // 1) Read current file (to get its sha for updates)
    const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(branch)}`;
    const getResp = await fetch(getUrl, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" }
    });

    let sha;
    if (getResp.status === 200) {
      const info = await getResp.json();
      sha = info.sha;
    } else if (getResp.status !== 404) {
      return res.status(getResp.status).send(await getResp.text());
    }

    // 2) Encode new content as Base64 (GitHub Contents API requirement)
    const content = Buffer.from(JSON.stringify(data, null, 2), "utf8").toString("base64");

    // 3) Create or update the file (this makes a commit)
    const putUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;
    const msg = `chore(data): save via app at ${new Date().toISOString()}`;

    const putResp = await fetch(putUrl, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
      body: JSON.stringify({
        message: msg,
        content,
        sha,                 // include sha if updating existing file
        branch,
        committer: { name: "Construction PM App", email: "no-reply@example.com" }
      })
    });

    const body = await putResp.text();
    if (!putResp.ok) return res.status(putResp.status).send(body);
    return res.status(200).send(body);
  } catch (e) {
    return res.status(500).send(String(e));
  }
}
