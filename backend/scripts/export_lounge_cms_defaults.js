const fs = require("fs");
const path = require("path");

function extractExport(filePath) {
  let src = fs.readFileSync(filePath, "utf8");
  src = src.replace(/^import[\s\S]*?;\s*/m, "");
  src = src.replace(/export default \w+\s*;?\s*$/m, "");
  const eq = src.indexOf("=");
  let body = src.slice(eq + 1).trim();
  if (body.endsWith(";")) body = body.slice(0, -1).trim();
  return Function(`"use strict"; return (${body})`)();
}

const dir = path.join(__dirname, "../../client/src/pages/admin/lounge-editor/airports");
const outDir = path.join(__dirname, "../data/lounge");
fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(dir).filter((f) => f.endsWith(".ts"));
for (const file of files) {
  const data = extractExport(path.join(dir, file));
  const out = path.join(outDir, `${data.id}.json`);
  fs.writeFileSync(out, JSON.stringify(data, null, 2));
  console.log("Wrote", out);
}
