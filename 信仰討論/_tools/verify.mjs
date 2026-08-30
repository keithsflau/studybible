import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const map = JSON.parse(fs.readFileSync(path.join(ROOT, "_tools", "section-map.json"), "utf8"));

let ok = 0;
let bad = 0;
for (const t of map.topics) {
  const dir = path.join(ROOT, t.dir);
  const heroPng = path.join(dir, "images", "hero.png");
  const heroSvg = path.join(dir, "images", "hero.svg");
  if (!fs.existsSync(heroPng) && !fs.existsSync(heroSvg)) {
    console.log("NO HERO", t.dir);
    bad++;
  } else ok++;
  if (!fs.existsSync(path.join(dir, "index.html"))) {
    console.log("NO INDEX", t.dir);
    bad++;
  }
  for (const ch of t.chapters) {
    const f = path.join(dir, ch.slug + ".html");
    if (!fs.existsSync(f)) {
      console.log("NO PAGE", t.dir, ch.slug);
      bad++;
    } else {
      const html = fs.readFileSync(f, "utf8");
      const empty = !/<h2/.test(html) && html.length < 4000;
      if (empty) console.log("THIN PAGE", t.dir, ch.slug, html.length);
      const img = html.match(/topic-figure"><img src="([^"]+)"/);
      if (img) {
        const p = path.join(dir, img[1]);
        if (!fs.existsSync(p)) console.log("BROKEN FIG", t.dir, ch.slug, img[1]);
      }
    }
  }
  console.log(t.dir, t.chapters.map((c) => c.slug).join(" | "));
}

const cat = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
console.log("\ncatalog has topic.img?", cat.includes("topic.img"));
console.log("catalog hero refs", (cat.match(/images\/hero\.png/g) || []).length);
console.log("ok heroes", ok, "problems", bad);
