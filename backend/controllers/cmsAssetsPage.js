const { CmsAssetsPage } = require("../models");
const { responseStatus } = require("../helpers/response");
const { deepMerge, persistJsonColumn } = require("../helpers/cmsJson");
const {
  isKnownAirport,
  normalizeAirportKey,
  defaultAssetsPayload,
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

function mergeAssetsPayload(airportKey, incoming) {
  const defaults = defaultAssetsPayload(airportKey) || {};
  const next = deepMerge(defaults, incoming || {});
  const src = incoming && typeof incoming === "object" ? incoming : {};
  if (src.comingSoon !== undefined) {
    next.comingSoon = src.comingSoon === true || src.comingSoon === "true" || src.comingSoon === 1;
  } else {
    next.comingSoon = next.comingSoon === true || next.comingSoon === "true" || next.comingSoon === 1;
  }
  return next;
}

function serializeRow(row) {
  const plain = row.get({ plain: true });
  const payload = mergeAssetsPayload(plain.airport_key, plain.payload || {});
  return {
    ...payload,
    airport_key: plain.airport_key,
    updated_at: plain.updated_at,
  };
}

async function getOrCreateRow(airportKeyRaw) {
  const airportKey = normalizeAirportKey(airportKeyRaw);
  if (!isKnownAirport("assets", airportKey)) return null;

  let row = await CmsAssetsPage.findOne({ where: { airport_key: airportKey } });
  if (!row) {
    row = await CmsAssetsPage.create({
      airport_key: airportKey,
      payload: defaultAssetsPayload(airportKey),
    });
  }
  return row;
}

const getPublicAssetsPage = async (req, res) => {
  try {
    const row = await getOrCreateRow(req.params.airportKey);
    if (!row) return responseStatus(res, 404, "Unknown assets airport");
    return responseStatus(res, 200, "OK", serializeRow(row));
  } catch (e) {
    console.error("getPublicAssetsPage:", e);
    return responseStatus(res, 500, "Failed to load assets CMS");
  }
};

const patchAdminAssetsPage = async (req, res) => {
  try {
    const row = await getOrCreateRow(req.params.airportKey);
    if (!row) return responseStatus(res, 404, "Unknown assets airport");

    let incoming = {};
    try {
      incoming = parseIncoming(req.body);
    } catch (parseErr) {
      console.error("patchAdminAssetsPage parse:", parseErr);
      return responseStatus(res, 400, "Invalid JSON payload");
    }

    const next = mergeAssetsPayload(row.airport_key, deepMerge(row.payload || {}, incoming));
    await persistJsonColumn(row, "payload", next);
    return responseStatus(res, 200, "Assets page saved", serializeRow(row));
  } catch (e) {
    console.error("patchAdminAssetsPage:", e);
    return responseStatus(res, 500, "Failed to save assets CMS");
  }
};

module.exports = {
  getPublicAssetsPage,
  patchAdminAssetsPage,
  serializeRow,
  getOrCreateRow,
};
