const { CmsLoungePage } = require("../models");
const { responseStatus } = require("../helpers/response");
const { deepMerge, persistJsonColumn } = require("../helpers/cmsJson");
const {
  isKnownAirport,
  normalizeAirportKey,
  defaultLoungePayload,
} = require("../helpers/cmsAirportDefaults");

function parseIncoming(body) {
  if (typeof body?.payload === "string" && body.payload.trim()) {
    return JSON.parse(body.payload);
  }
  if (body?.payload && typeof body.payload === "object") {
    return body.payload;
  }
  if (body && typeof body === "object") {
    return body;
  }
  return {};
}

function mergeLoungePayload(airportKey, incoming) {
  const defaults = defaultLoungePayload(airportKey) || {};
  return deepMerge(defaults, incoming || {});
}

function serializeRow(row) {
  const plain = row.get({ plain: true });
  const payload = mergeLoungePayload(plain.airport_key, plain.payload || {});
  return {
    ...payload,
    airport_key: plain.airport_key,
    updated_at: plain.updated_at,
  };
}

async function getOrCreateRow(airportKeyRaw) {
  const airportKey = normalizeAirportKey(airportKeyRaw);
  if (!isKnownAirport("lounge", airportKey)) return null;

  let row = await CmsLoungePage.findOne({ where: { airport_key: airportKey } });
  if (!row) {
    row = await CmsLoungePage.create({
      airport_key: airportKey,
      payload: defaultLoungePayload(airportKey),
    });
  }
  return row;
}

const getPublicLoungePage = async (req, res) => {
  try {
    const row = await getOrCreateRow(req.params.airportKey);
    if (!row) return responseStatus(res, 404, "Unknown lounge airport");
    return responseStatus(res, 200, "OK", serializeRow(row));
  } catch (e) {
    console.error("getPublicLoungePage:", e);
    return responseStatus(res, 500, "Failed to load lounge CMS");
  }
};

const patchAdminLoungePage = async (req, res) => {
  try {
    const row = await getOrCreateRow(req.params.airportKey);
    if (!row) return responseStatus(res, 404, "Unknown lounge airport");

    let incoming = {};
    try {
      incoming = parseIncoming(req.body);
    } catch (parseErr) {
      console.error("patchAdminLoungePage parse:", parseErr);
      return responseStatus(res, 400, "Invalid JSON payload");
    }

    const next = mergeLoungePayload(row.airport_key, deepMerge(row.payload || {}, incoming));
    await persistJsonColumn(row, "payload", next);
    return responseStatus(res, 200, "Lounge page saved", serializeRow(row));
  } catch (e) {
    console.error("patchAdminLoungePage:", e);
    return responseStatus(res, 500, "Failed to save lounge CMS");
  }
};

module.exports = {
  getPublicLoungePage,
  patchAdminLoungePage,
  serializeRow,
  getOrCreateRow,
};
