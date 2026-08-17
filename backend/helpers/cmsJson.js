function isPlainObject(o) {
  return o !== null && typeof o === "object" && !Array.isArray(o);
}

function deepMerge(base, overlay) {
  if (!overlay) return base;
  const out = { ...(base || {}) };
  for (const k of Object.keys(overlay)) {
    const bv = out[k];
    const ov = overlay[k];
    if (ov === undefined) continue;
    if (isPlainObject(bv) && isPlainObject(ov)) {
      out[k] = deepMerge(bv, ov);
    } else {
      out[k] = ov;
    }
  }
  return out;
}

function parseStatCount(display) {
  const raw = String(display ?? "").trim();
  const m = raw.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return { count: 0, suffix: raw, countDisplay: raw };
  return { count: Number(m[1]), suffix: m[2] || "", countDisplay: raw };
}

function persistJsonColumn(row, field, value) {
  row.set(field, JSON.parse(JSON.stringify(value)));
  row.changed(field, true);
  return row.save();
}

module.exports = { isPlainObject, deepMerge, parseStatCount, persistJsonColumn };
