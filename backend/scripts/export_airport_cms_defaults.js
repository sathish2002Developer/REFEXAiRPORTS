const fs = require("fs");
const path = require("path");

function extractExportArray(filePath, exportName) {
  const src = fs.readFileSync(filePath, "utf8");
  const marker = `export const ${exportName}`;
  const start = src.indexOf(marker);
  if (start < 0) throw new Error(`Export ${exportName} not found in ${filePath}`);
  const eq = src.indexOf("=", start);
  let body = src.slice(eq + 1).trim();
  if (body.endsWith(";")) body = body.slice(0, -1).trim();
  const arr = Function(`"use strict"; return (${body})`)();
  if (!Array.isArray(arr)) throw new Error(`${exportName} is not an array`);
  return arr;
}

const client = path.join(__dirname, "../../client/src/pages/admin");
const outDir = path.join(__dirname, "../data");

const travelers = extractExportArray(
  path.join(client, "travelers-editor/travelersData.ts"),
  "travelersAirports"
);
const assets = extractExportArray(
  path.join(client, "assets-editor/assetsData.ts"),
  "assetsAirports"
);

fs.writeFileSync(path.join(outDir, "cms_travelers.json"), JSON.stringify(travelers, null, 2));
fs.writeFileSync(path.join(outDir, "cms_assets.json"), JSON.stringify(assets, null, 2));
console.log(`Wrote ${travelers.length} travelers airports and ${assets.length} assets airports`);
