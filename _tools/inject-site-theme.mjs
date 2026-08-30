import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FONTS =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Noto+Serif+TC:wght@500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap";

const START = "<!-- site-theme -->";
const END = "<!-- /site-theme -->";
const CSS_START = "<!-- site-theme-css -->";
const CSS_END = "<!-- /site-theme-css -->";
const MAP_START = "<!-- map-chrome -->";
const MAP_END = "<!-- /map-chrome -->";

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === ".git" || ent.name === "node_modules") continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, out);
    else if (ent.name.toLowerCase().endsWith(".html")) out.push(full);
  }
  return out;
}

function relUnix(fromFile, target) {
  let rel = path.relative(path.dirname(fromFile), path.join(ROOT, target)).replace(/\\/g, "/");
  if (!rel.startsWith(".")) rel = "./" + rel;
  return rel;
}

function norm(p) {
  return path.relative(ROOT, p).replace(/\\/g, "/");
}

function isRevelation(rel) {
  return /啟示錄|revelation/i.test(rel);
}

function isToolOrBuild(rel) {
  return (
    rel.startsWith("信仰討論/_source") ||
    rel.startsWith("信仰討論/_tools") ||
    rel.startsWith("_tools") ||
    rel.startsWith("靈修資料/react-version") ||
    rel.startsWith("靈修資料/vue-version") ||
    rel.startsWith("經卷/_scripts") ||
    rel.startsWith("3D地圖/bible-maps/lib")
  );
}

function isMapCanvas(rel) {
  return /^3D地圖\/bible-maps\/maps\/[^/]+\/index\.html$/.test(rel);
}

function stripBlock(html, start, end) {
  const re = new RegExp(`${start}[\\s\\S]*?${end}\\s*`, "g");
  return html.replace(re, "");
}

function addHtmlClass(html, cls) {
  return html.replace(/<html([^>]*)>/i, (m, attrs) => {
    if (new RegExp(`\\b${cls}\\b`).test(attrs)) return m;
    if (/class\s*=/.test(attrs)) {
      return `<html${attrs.replace(/class\s*=\s*["']([^"']*)["']/, (mm, c) => `class="${c} ${cls}"`)}>`;
    }
    return `<html class="${cls}"${attrs}>`;
  });
}

function removeHtmlClass(html, cls) {
  return html.replace(/<html([^>]*)>/i, (m, attrs) => {
    if (!new RegExp(`\\b${cls}\\b`).test(attrs)) return m;
    return `<html${attrs.replace(new RegExp(`\\s*\\b${cls}\\b`), "").replace(/class\s*=\s*["']\s*["']/, "")}>`;
  });
}

function fontLinks() {
  return [
    `<link rel="preconnect" href="https://fonts.googleapis.com">`,
    `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`,
    `<link href="${FONTS}" rel="stylesheet">`
  ].join("\n  ");
}

const BAR_START = "<!-- site-topbar -->";
const BAR_END = "<!-- /site-topbar -->";

function pageTitle(html, rel) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (m) {
    const t = m[1].replace(/\s+/g, " ").trim().split(/[|｜·]/)[0].trim();
    if (t) return t.slice(0, 24);
  }
  const parts = rel.split("/");
  return parts[parts.length - 2] || "聖經研讀";
}

function injectTopbar(html, file) {
  html = stripBlock(html, BAR_START, BAR_END);
  if (/class="[^"]*(?:site-topbar|topbar)[^"]*"/.test(html)) return html;
  if (/<header class="site-topbar"/.test(html)) return html;
  const rel = norm(file);
  const depth = rel.split("/").filter(Boolean).length - 1;
  const home = (depth <= 0 ? "./index.html" : "../".repeat(depth) + "index.html");
  const title = pageTitle(html, rel);
  const bar = `${BAR_START}\n<header class="site-topbar"><a class="site-topbar-back" href="${home}"><svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>主頁</a><div class="site-topbar-title">${title}</div></header>\n${BAR_END}\n`;
  return html.replace(/<body([^>]*)>/i, `<body$1>\n${bar}`);
}

function injectSite(html, file) {
  html = stripBlock(html, START, END);
  html = stripBlock(html, CSS_START, CSS_END);
  html = addHtmlClass(html, "site-theme");
  html = injectTopbar(html, file);

  const themeJs = relUnix(file, "shared/tailwind-theme.js");
  const siteCss = relUnix(file, "shared/site.css");

  const headBlock = `${START}\n  ${fontLinks()}\n  <script src="${themeJs}"></script>\n  ${END}\n`;

  if (/<script[^>]+cdn\.tailwindcss\.com/i.test(html)) {
    html = html.replace(
      /<script[^>]+cdn\.tailwindcss\.com[^>]*>\s*<\/script>/i,
      `${headBlock}<script src="https://cdn.tailwindcss.com"></script>`
    );
  } else if (/<head[^>]*>/i.test(html)) {
    html = html.replace(/<head[^>]*>/i, (m) => `${m}\n  ${headBlock}`);
  }

  const cssBlock = `${CSS_START}\n  <link rel="stylesheet" href="${siteCss}">\n  ${CSS_END}\n`;
  if (/<\/head>/i.test(html)) {
    html = html.replace(/<\/head>/i, `${cssBlock}</head>`);
  }
  return html;
}

function injectMap(html, file) {
  html = stripBlock(html, MAP_START, MAP_END);
  html = stripBlock(html, START, END);
  html = stripBlock(html, CSS_START, CSS_END);
  html = removeHtmlClass(html, "site-theme");

  const chrome = relUnix(file, "shared/map-chrome.css");
  const block = `${MAP_START}\n  ${fontLinks()}\n  <link rel="stylesheet" href="${chrome}">\n  ${MAP_END}\n`;
  if (/<\/head>/i.test(html)) {
    html = html.replace(/<\/head>/i, `${block}</head>`);
  }
  // Align gold token if present; leave layout/colors otherwise.
  html = html.replace(/--accent:\s*#[0-9a-fA-F]{3,8}/g, "--accent:#c4a35a");
  return html;
}

const files = walk(ROOT);
let siteN = 0;
let mapN = 0;
let skipN = 0;
const skipped = [];

for (const file of files) {
  const rel = norm(file);
  if (isRevelation(rel)) {
    skipN += 1;
    skipped.push(rel);
    continue;
  }
  if (isToolOrBuild(rel)) continue;

  let html = fs.readFileSync(file, "utf8");
  if (!/<html[\s>]/i.test(html)) continue;

  if (isMapCanvas(rel)) {
    const next = injectMap(html, file);
    if (next !== html) {
      fs.writeFileSync(file, next);
      mapN += 1;
    }
    continue;
  }

  const next = injectSite(html, file);
  if (next !== html) {
    fs.writeFileSync(file, next);
    siteN += 1;
  }
}

console.log(JSON.stringify({ siteN, mapN, skipN, skipped }, null, 2));
