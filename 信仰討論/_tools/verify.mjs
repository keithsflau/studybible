import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const map = JSON.parse(fs.readFileSync(path.join(ROOT, "_tools", "section-map.json"), "utf8"));

let ok = 0;
let bad = 0;
for (const t of map.topics) {
  const dir = path.join(ROOT, t.dir);
  if (!fs.existsSync(path.join(dir, "index.html"))) {
    console.log("NO INDEX", t.dir);
    bad++;
  } else ok++;
  for (const ch of t.chapters) {
    const f = path.join(dir, ch.slug + ".html");
    if (!fs.existsSync(f)) {
      console.log("NO PAGE", t.dir, ch.slug);
      bad++;
    } else {
      const html = fs.readFileSync(f, "utf8");
      const empty = !/<h2/.test(html) && html.length < 4000;
      if (empty) console.log("THIN PAGE", t.dir, ch.slug, html.length);
      if (/hero-media/.test(html)) console.log("STILL HERO MEDIA", t.dir, ch.slug);
      const fig = html.match(/topic-figure"><img src="([^"]+)"/);
      if (fig) {
        const p = path.join(dir, fig[1]);
        if (!fs.existsSync(p)) console.log("BROKEN FIG", t.dir, ch.slug, fig[1]);
        if (/\.svg$/i.test(fig[1]) || /hero\.png$/i.test(fig[1])) {
          console.log("DECO FIG", t.dir, ch.slug, fig[1]);
        }
      }
    }
  }
  console.log(t.dir, t.chapters.map((c) => c.slug).join(" | "));
}

const cat = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
console.log("\ncatalog hero.png refs", (cat.match(/images\/hero\.png/g) || []).length);
console.log("ok indexes", ok, "problems", bad);
