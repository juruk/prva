// src/lib/gh.js
const OWNER  = 'juruk';
const REPO   = 'prva';
const BRANCH = 'main';
const PATH   = 'data/app-state.json';
const API    = 'https://api.github.com';
const VER    = '2022-11-28';

const getToken = () => localStorage.getItem('gh_pat') || '';
const b64enc = (s) => btoa(unescape(encodeURIComponent(s)));
const b64dec = (b) => decodeURIComponent(escape(atob(b)));

async function gh(path, opts = {}) {
  const headers = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': VER,
    ...opts.headers
  };
  const t = getToken();
  if (t) headers['Authorization'] = `Bearer ${t}`;
  const res = await fetch(`${API}${path}`, { ...opts, headers });
  return res;
}

export async function loadData() {
  // 1) Пробај GitHub
  try {
    const r = await gh(`/repos/${OWNER}/${REPO}/contents/${PATH}?ref=${BRANCH}`);
    if (r.ok) {
      const j = await r.json();
      window.__dataSha = j.sha;
      return JSON.parse(b64dec(j.content));
    }
  } catch (e) { console.warn('GitHub load failed', e); }

  // 2) Fallback: localStorage
  try {
    const ls = localStorage.getItem('prva:data');
    if (ls) return JSON.parse(ls);
  } catch {}

  // 3) Прв старт
  return { projects: [], architects: [], supervisors: [], contractors: [] };
}

async function getShaIfExists() {
  const r = await gh(`/repos/${OWNER}/${REPO}/contents/${PATH}?ref=${BRANCH}`);
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`sha failed ${r.status}`);
  const j = await r.json();
  return j.sha;
}

export async function saveData(data, msg = 'chore: save app data') {
  const tok = getToken();
  if (!tok) { alert('Внеси GitHub токен (Settings).'); throw new Error('no token'); }

  const body = {
    message: `${msg} (${new Date().toISOString()})`,
    content: b64enc(JSON.stringify(data, null, 2)),
    branch: BRANCH,
  };
  const sha = window.__dataSha || await getShaIfExists();
  if (sha) body.sha = sha;

  const r = await gh(`/repos/${OWNER}/${REPO}/contents/${PATH}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!r.ok) {
    const t = await r.text();
    throw new Error(`save failed ${r.status} ${t}`);
  }

  const j = await r.json();
  window.__dataSha = j.content.sha;                         // idempotent следно снимање
  localStorage.setItem('prva:data', JSON.stringify(data));  // offline backup
  return j;
}
