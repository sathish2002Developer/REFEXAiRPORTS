const { CmsNewsPage } = require("../models");
const { responseStatus } = require("../helpers/response");
const { archiveCurrentRevision } = require("../helpers/cmsRevisionHelper");
const { persistJsonColumn } = require("../helpers/cmsJson");
const { defaultNewsPayload, mergeNewsPayload } = require("../helpers/cmsNewsPageDefaults");

async function getOrCreateRow() {
  let row = await CmsNewsPage.findOne({ where: { singleton_key: "news" } });
  if (!row) {
    row = await CmsNewsPage.create({
      singleton_key: "news",
      payload: defaultNewsPayload(),
    });
  }
  return row;
}

function serializeRow(row) {
  const plain = row.get({ plain: true });
  return {
    ...mergeNewsPayload(plain.payload || {}, {}),
    updated_at: plain.updated_at,
  };
}

const getPublicNewsPage = async (req, res) => {
  try {
    const row = await getOrCreateRow();
    return responseStatus(res, 200, "OK", serializeRow(row));
  } catch (e) {
    console.error("getPublicNewsPage:", e);
    return responseStatus(res, 500, "Failed to load news CMS");
  }
};

const patchAdminNewsPage = async (req, res) => {
  try {
    const row = await getOrCreateRow();
    let incoming = {};

    try {
      if (typeof req.body?.payload === "string" && req.body.payload.trim()) {
        incoming = JSON.parse(req.body.payload);
      } else if (req.body?.payload && typeof req.body.payload === "object") {
        incoming = req.body.payload;
      } else if (req.body && typeof req.body === "object") {
        incoming = req.body;
      }
    } catch (parseErr) {
      console.error("patchAdminNewsPage parse:", parseErr);
      return responseStatus(res, 400, "Invalid JSON payload");
    }

    await archiveCurrentRevision("news", req);
    const next = mergeNewsPayload(row.payload || {}, incoming);
    await persistJsonColumn(row, "payload", next);
    return responseStatus(res, 200, "News page saved", serializeRow(row));
  } catch (e) {
    console.error("patchAdminNewsPage:", e);
    return responseStatus(res, 500, "Failed to save news CMS");
  }
};

module.exports = {
  getPublicNewsPage,
  patchAdminNewsPage,
  serializeRow,
  getOrCreateRow,
  defaultNewsPayload,
};
