// src/lib/githubSync.js
const GH_OWNER  = import.meta.env.VITE_GH_OWNER  || "juruk";
const GH_REPO   = import.meta.env.VITE_GH_REPO   || "prva";
const GH_BRANCH = import.meta.env.VITE_GH_BRANCH || "main";
const DATA_PATH = import.meta.env.VITE_GH_DATA_PATH || "data/app-data.json";

// If frontend and the serverless function are deployed together on Vercel,
// this can stay "/api/save-data". If frontend is elsewhere (e.g. GitHub Pages),
// set VITE_SYNC_ENDPOINT to the full URL.
const SYNC_ENDPOINT = import.meta.env.VITE_SYNC_ENDPOINT || "/api/save-data";

export async function loadData() {
  const url = `https://raw.githubusercontent.com/${GH_OWNER}/${GH_REPO}/${GH_BRANCH}/${DATA_PATH}`;
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) {
    // Fallback to cached local copy (offline/first-run safety)
    const cached = localStorage.getItem("app-data");
    return cached ? JSON.parse(cached) : { version: 1, projects: [], architects: [], contractors: [] };
  }
  const json = await r.json();
  // Keep an offline cache for quick reloads
  localStorage.setItem("app-data", JSON.stringify(json));
  return json;
}

export async function saveData(data) {
  // Optimistic local cache
  localStorage.setItem("app-data", JSON.stringify(data));
  const r = await fetch(SYNC_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      owner: GH_OWNER,
      repo: GH_REPO,
      branch: GH_BRANCH,
      path: DATA_PATH,
      data
    })
  });
  if (!r.ok) {
    const text = await r.text();
    throw new Error(`Sync failed: ${r.status} ${text}`);
  }
  return r.json(); // GitHub “contents” response
}
