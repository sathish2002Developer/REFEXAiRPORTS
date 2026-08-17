const { CmsAboutPage } = require("../models");
const { responseStatus } = require("../helpers/response");
const { archiveCurrentRevision } = require("../helpers/cmsRevisionHelper");
const { deepMerge, persistJsonColumn } = require("../helpers/cmsJson");
const { defaultAboutPayload, mergeAboutPayload } = require("../helpers/cmsAboutPageDefaults");

async function getOrCreateRow() {
  let row = await CmsAboutPage.findOne({ where: { singleton_key: "about" } });
  if (!row) {
    row = await CmsAboutPage.create({
      singleton_key: "about",
      payload: defaultAboutPayload(),
    });
  }
  return row;
}

function serializeRow(row) {
  const plain = row.get({ plain: true });
  return {
    ...mergeAboutPayload(plain.payload || {}),
    updated_at: plain.updated_at,
  };
}

const getPublicAboutPage = async (req, res) => {
  try {
    const row = await getOrCreateRow();
    return responseStatus(res, 200, "OK", serializeRow(row));
  } catch (e) {
    console.error("getPublicAboutPage:", e);
    return responseStatus(res, 500, "Failed to load about CMS");
  }
};

const patchAdminAboutPage = async (req, res) => {
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
      console.error("patchAdminAboutPage parse:", parseErr);
      return responseStatus(res, 400, "Invalid JSON payload");
    }

    await archiveCurrentRevision("about", req);
    const next = mergeAboutPayload(deepMerge(row.payload || {}, incoming));
    await persistJsonColumn(row, "payload", next);
    return responseStatus(res, 200, "About page saved", serializeRow(row));
  } catch (e) {
    console.error("patchAdminAboutPage:", e);
    return responseStatus(res, 500, "Failed to save about CMS");
  }
};

module.exports = {
  getPublicAboutPage,
  patchAdminAboutPage,
  serializeRow,
  getOrCreateRow,
  defaultAboutPayload,
};
