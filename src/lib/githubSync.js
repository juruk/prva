// src/lib/githubSync.js
// GitHub-only backend: Issues -> Actions -> commit to data/store.json

const OWNER = "juruk";
const REPO = "prva";
const BRANCH = "main";

// 1) LOAD: чита тековни податоци од репото (raw)
export async function loadData() {
  const url = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/data/store.json`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      // ако првпат нема датотека, врати празни сетови
      return { projects: [], architects: [], contractors: [] };
    }
    const data = await res.json();
    // sanity defaults
    return {
      projects: data.projects ?? [],
      architects: data.architects ?? [],
      contractors: data.contractors ?? [],
    };
  } catch (e) {
    console.error("loadData error:", e);
    return { projects: [], architects: [], contractors: [] };
  }
}

// 2) SAVE: отвора Issue (без тајни), а GitHub Action ќе го комитира JSON-от
export async function saveData(bundle) {
  // bundle е { projects, architects, contractors, exportDate, ... }
  const title = `Data Update ${new Date().toISOString()}`;
  const label = "data-update";
  const body = [
    "Автоматски генерирано барање за синхронизација.",
    "",
    "Внимание: Овој issue ќе го тригерира GitHub Action кој ќе го запише JSON во `data/store.json`.",
    "",
    "```json",
    JSON.stringify(bundle, null, 2),
    "```",
  ].join("\n");

  const url = new URL(`https://github.com/${OWNER}/${REPO}/issues/new`);
  url.searchParams.set("title", title);
  url.searchParams.set("labels", label);
  url.searchParams.set("body", body);

  // Отвори нов таб каде корисникот ќе кликне "Submit new issue"
  window.open(url.toString(), "_blank");
}
