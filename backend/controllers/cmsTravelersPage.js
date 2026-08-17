const { CmsTravelersPage } = require("../models");
const { responseStatus } = require("../helpers/response");
const { deepMerge, persistJsonColumn } = require("../helpers/cmsJson");
const {
  isKnownAirport,
  normalizeAirportKey,
  defaultTravelersPayload,
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

function mergeTravelersPayload(airportKey, incoming) {
  const defaults = defaultTravelersPayload(airportKey) || {};
  return deepMerge(defaults, incoming || {});
}

function serializeRow(row) {
  const plain = row.get({ plain: true });
  const payload = mergeTravelersPayload(plain.airport_key, plain.payload || {});
  return {
    ...payload,
    airport_key: plain.airport_key,
    updated_at: plain.updated_at,
  };
}

async function getOrCreateRow(airportKeyRaw) {
  const airportKey = normalizeAirportKey(airportKeyRaw);
  if (!isKnownAirport("travelers", airportKey)) return null;

  let row = await CmsTravelersPage.findOne({ where: { airport_key: airportKey } });
  if (!row) {
    row = await CmsTravelersPage.create({
      airport_key: airportKey,
      payload: defaultTravelersPayload(airportKey),
    });
  }
  return row;
}

const getPublicTravelersPage = async (req, res) => {
  try {
    const row = await getOrCreateRow(req.params.airportKey);
    if (!row) return responseStatus(res, 404, "Unknown travelers airport");
    return responseStatus(res, 200, "OK", serializeRow(row));
  } catch (e) {
    console.error("getPublicTravelersPage:", e);
    return responseStatus(res, 500, "Failed to load travelers CMS");
  }
};

const patchAdminTravelersPage = async (req, res) => {
  try {
    const row = await getOrCreateRow(req.params.airportKey);
    if (!row) return responseStatus(res, 404, "Unknown travelers airport");

    let incoming = {};
    try {
      incoming = parseIncoming(req.body);
    } catch (parseErr) {
      console.error("patchAdminTravelersPage parse:", parseErr);
      return responseStatus(res, 400, "Invalid JSON payload");
    }

    const next = mergeTravelersPayload(row.airport_key, deepMerge(row.payload || {}, incoming));
    await persistJsonColumn(row, "payload", next);
    return responseStatus(res, 200, "Travelers page saved", serializeRow(row));
  } catch (e) {
    console.error("patchAdminTravelersPage:", e);
    return responseStatus(res, 500, "Failed to save travelers CMS");
  }
};

module.exports = {
  getPublicTravelersPage,
  patchAdminTravelersPage,
  serializeRow,
  getOrCreateRow,
};
