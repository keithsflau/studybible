import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { iconMarkup } from "../_shared/card-icons.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SKIP_DIRS = new Set(["_source", "_tools", "_shared", "images", "node_modules"]);

function walkHtml(dir, out = []) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    if (name.isDirectory()) {
      if (SKIP_DIRS.has(name.name) || name.name.startsWith(".")) continue;
      walkHtml(path.join(dir, name.name), out);
    } else if (name.name.endsWith(".html")) {
      out.push(path.join(dir, name.name));
    }
  }
  return out;
}

function isDecoSrc(src) {
  const s = src.split("?")[0].toLowerCase();
  if (s.endsWith("hero.png") || s.endsWith("hero.svg")) return true;
  return s.endsWith(".svg");
}

function slugFromSrc(src) {
  const base = path.posix.basename(src.split("?")[0]);
  return base.replace(/\.(svg|png|jpg|jpeg)$/i, "");
}

function stripFile(file) {
  let html = fs.readFileSync(file, "utf8");
  const before = html;

  html = html.replace(/\s*<div class="hero-media">[\s\S]*?<\/div>\s*(?=<div class="hero-shade">)/g, "\n    ");

  html = html.replace(/<figure class="topic-figure">[\s\S]*?<\/figure>\s*/g, (block) => {
    const m = block.match(/src="([^"]+)"/);
    if (m && isDecoSrc(m[1])) return "";
    return block;
  });

  html = html.replace(/<div class="media">\s*<img src="([^"]+)" alt="">\s*<\/div>/g, (all, src) => {
    if (!isDecoSrc(src)) return all;
    const slug = slugFromSrc(src);
    return `<div class="media media-icon">${iconMarkup(slug)}</div>`;
  });

  if (html !== before) fs.writeFileSync(file, html);
  return html !== before;
}

function patchCatalog() {
  const file = path.join(ROOT, "index.html");
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(
    /'<div class="card-media" style="--card-tone:' \+ topic\.tone \+ '"><img src="' \+ \(topic\.img \|\| cat\.img\) \+ '" alt=""><div class="card-wash"><\/div><div class="card-icon">' \+ iconSvg\(topic\.icon\) \+ "<\/div><\/div>" \+/g,
    `'<div class="card-media" style="--card-tone:' + topic.tone + '"><div class="card-wash"></div><div class="card-icon">' + iconSvg(topic.icon) + "</div></div>" +`
  );
  html = html.replace(/, img: "[^"]+\/images\/hero\.png"/g, "");
  fs.writeFileSync(file, html);
}

const files = walkHtml(ROOT);
let changed = 0;
for (const file of files) {
  if (path.basename(file) === "index.html" && path.dirname(file) === ROOT) continue;
  if (stripFile(file)) {
    changed += 1;
    console.log("patched", path.relative(ROOT, file));
  }
}
patchCatalog();
console.log("catalog patched");
console.log("html files changed", changed);
