const fs = require("fs");
const path = require("path");

function loadJson(name) {
  const file = path.join(__dirname, "../data", name);
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function loadLoungeRows() {
  const dir = path.join(__dirname, "../data/lounge");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")));
}

function indexById(rows) {
  const map = {};
  for (const row of rows) {
    map[String(row.id).toLowerCase()] = row;
  }
  return map;
}

let travelersMap;
let assetsMap;
let loungeMap;

function travelersDefaultsMap() {
  if (!travelersMap) travelersMap = indexById(loadJson("cms_travelers.json"));
  return travelersMap;
}

function assetsDefaultsMap() {
  if (!assetsMap) assetsMap = indexById(loadJson("cms_assets.json"));
  return assetsMap;
}

function loungeDefaultsMap() {
  if (!loungeMap) loungeMap = indexById(loadLoungeRows());
  return loungeMap;
}

function mapFor(kind) {
  if (kind === "assets") return assetsDefaultsMap();
  if (kind === "lounge") return loungeDefaultsMap();
  return travelersDefaultsMap();
}

function airportKeys(kind) {
  return Object.keys(mapFor(kind));
}

function normalizeAirportKey(key) {
  return String(key || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, "");
}

function isKnownAirport(kind, key) {
  return Boolean(mapFor(kind)[normalizeAirportKey(key)]);
}

function cloneRow(kind, airportKey) {
  const row = mapFor(kind)[normalizeAirportKey(airportKey)];
  if (!row) return null;
  return JSON.parse(JSON.stringify(row));
}

function defaultTravelersPayload(airportKey) {
  return cloneRow("travelers", airportKey);
}

function defaultAssetsPayload(airportKey) {
  return cloneRow("assets", airportKey);
}

function defaultLoungePayload(airportKey) {
  return cloneRow("lounge", airportKey);
}

module.exports = {
  airportKeys,
  isKnownAirport,
  normalizeAirportKey,
  defaultTravelersPayload,
  defaultAssetsPayload,
  defaultLoungePayload,
};
