const { CmsPartnerPage } = require("../models");
const { responseStatus } = require("../helpers/response");
const { archiveCurrentRevision } = require("../helpers/cmsRevisionHelper");
const { defaultPartnerPayload, mergePartnerPayload } = require("../helpers/cmsPartnerPageDefaults");

async function getOrCreateRow() {
  let row = await CmsPartnerPage.findOne({ where: { singleton_key: "partner" } });
  if (!row) {
    row = await CmsPartnerPage.create({
      singleton_key: "partner",
      payload: defaultPartnerPayload(),
    });
  }
  return row;
}

function serializeRow(row) {
  const plain = row.get({ plain: true });
  return {
    ...mergePartnerPayload(plain.payload || {}, {}),
    updated_at: plain.updated_at,
  };
}

const getPublicPartnerPage = async (req, res) => {
  try {
    const row = await getOrCreateRow();
    return responseStatus(res, 200, "OK", serializeRow(row));
  } catch (e) {
    console.error("getPublicPartnerPage:", e);
    return responseStatus(res, 500, "Failed to load partner CMS");
  }
};

const patchAdminPartnerPage = async (req, res) => {
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
      console.error("patchAdminPartnerPage parse:", parseErr);
      return responseStatus(res, 400, "Invalid JSON payload");
    }

    await archiveCurrentRevision("partner", req);
    row.payload = mergePartnerPayload(row.payload || {}, incoming);
    row.changed("payload", true);
    await row.save();
    return responseStatus(res, 200, "Partner page saved", serializeRow(row));
  } catch (e) {
    console.error("patchAdminPartnerPage:", e);
    return responseStatus(res, 500, "Failed to save partner CMS");
  }
};

module.exports = {
  getPublicPartnerPage,
  patchAdminPartnerPage,
  serializeRow,
  getOrCreateRow,
  defaultPartnerPayload,
};
