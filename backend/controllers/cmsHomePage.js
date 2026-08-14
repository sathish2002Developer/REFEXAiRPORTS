const { CmsHomePage } = require("../models");
const { responseStatus } = require("../helpers/response");
const { archiveCurrentRevision } = require("../helpers/cmsRevisionHelper");
const { defaultHomePayload, mergeHomePayload } = require("../helpers/cmsHomePageDefaults");

async function getOrCreateRow() {
  let row = await CmsHomePage.findOne({ where: { singleton_key: "home" } });
  if (!row) {
    row = await CmsHomePage.create({
      singleton_key: "home",
      payload: defaultHomePayload(),
    });
  }
  return row;
}

function serializeRow(row) {
  const plain = row.get({ plain: true });
  return {
    ...mergeHomePayload(plain.payload || {}),
    updated_at: plain.updated_at,
  };
}

const getPublicHomePage = async (req, res) => {
  try {
    const row = await getOrCreateRow();
    return responseStatus(res, 200, "OK", serializeRow(row));
  } catch (e) {
    console.error("getPublicHomePage:", e);
    return responseStatus(res, 500, "Failed to load home CMS");
  }
};

const patchAdminHomePage = async (req, res) => {
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
      console.error("patchAdminHomePage parse:", parseErr);
      return responseStatus(res, 400, "Invalid JSON payload");
    }

    await archiveCurrentRevision("home", req);
    const next = mergeHomePayload(row.payload || {}, incoming);
    row.set("payload", JSON.parse(JSON.stringify(next)));
    row.changed("payload", true);
    await row.save();
    return responseStatus(res, 200, "Home page saved", serializeRow(row));
  } catch (e) {
    console.error("patchAdminHomePage:", e);
    return responseStatus(res, 500, "Failed to save home CMS");
  }
};

module.exports = {
  getPublicHomePage,
  patchAdminHomePage,
  serializeRow,
  getOrCreateRow,
  defaultHomePayload,
};
