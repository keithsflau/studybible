import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dirs = fs.readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);

for (const d of dirs) {
  const f = path.join(root, d, "index.html");
  if (!fs.existsSync(f)) continue;
  const html = fs.readFileSync(f, "utf8");
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) =>
    m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
  );
  const secs = [...html.matchAll(/<section\s+[^>]*id=["']([^"']+)["'][^>]*>/g)].map((m) => m[1]);
  console.log("\n===" + d + "=== h2:" + h2s.length + " section:" + secs.length);
  h2s.forEach((t, i) => console.log("  H2", i + 1, t.slice(0, 90)));
  if (secs.length) console.log("  IDs:", secs.join(", "));
}
