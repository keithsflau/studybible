import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SKIP = new Set(["_source", "_tools", "_shared", "images"]);

let removed = 0;
for (const name of fs.readdirSync(ROOT, { withFileTypes: true })) {
  if (!name.isDirectory() || SKIP.has(name.name)) continue;
  const imgDir = path.join(ROOT, name.name, "images");
  if (!fs.existsSync(imgDir)) continue;
  for (const file of fs.readdirSync(imgDir)) {
    const lower = file.toLowerCase();
    if (lower.endsWith(".svg") || lower === "hero.png") {
      fs.unlinkSync(path.join(imgDir, file));
      removed += 1;
      console.log("deleted", path.join(name.name, "images", file));
    }
  }
}
console.log("removed", removed);
