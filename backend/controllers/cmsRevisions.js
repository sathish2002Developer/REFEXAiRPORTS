const { responseStatus } = require("../helpers/response");
const {
  isValidResourceType,
  listRevisions,
  revertToRevision,
  getCmsRevisionChanges,
} = require("../helpers/cmsRevisionHelper");
const cmsHomeHeroController = require("./cmsHomeHero");
const cmsHomePageController = require("./cmsHomePage");
const cmsAboutPageController = require("./cmsAboutPage");
const cmsVisionPageController = require("./cmsVisionPage");
const cmsSiteChromeController = require("./cmsSiteChrome");
const cmsNewsPageController = require("./cmsNewsPage");
const cmsPartnerPageController = require("./cmsPartnerPage");
const cmsWallPageController = require("./cmsWallPage");

function serializeLiveRow(resourceType, row, req) {
  const plain = row.get({ plain: true });
  switch (resourceType) {
    case "home-hero":
      return cmsHomeHeroController.serializeRow(row, req);
    case "home":
      return cmsHomePageController.serializeRow(row);
    case "about":
      return cmsAboutPageController.serializeRow(row);
    case "vision":
      return cmsVisionPageController.serializeForResponse(plain.payload || {}, req);
    case "site-chrome":
      return cmsSiteChromeController.serializePayload(plain.payload || {}, req);
    case "news":
      return cmsNewsPageController.serializeRow(row);
    case "partner":
      return cmsPartnerPageController.serializeRow(row);
    case "wall":
      return cmsWallPageController.serializePayload(plain.payload || {}, req);
    default:
      return plain;
  }
}

const listCmsRevisions = async (req, res) => {
  try {
    const { resource } = req.params;
    if (!isValidResourceType(resource)) {
      return responseStatus(res, 400, "Unknown CMS resource");
    }
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const { revisions, latest_version_number } = await listRevisions(resource, limit);
    return responseStatus(res, 200, "OK", { revisions, latest_version_number });
  } catch (e) {
    console.error("listCmsRevisions:", e);
    return responseStatus(res, 500, "Failed to list revisions");
  }
};

const revertCmsRevision = async (req, res) => {
  try {
    const { resource, revisionId } = req.params;
    if (!isValidResourceType(resource)) {
      return responseStatus(res, 400, "Unknown CMS resource");
    }
    const id = parseInt(revisionId, 10);
    if (!id) return responseStatus(res, 400, "Invalid revision id");

    const result = await revertToRevision(resource, id, req);
    if (!result.ok) {
      return responseStatus(res, result.code || 404, result.message || "Not found");
    }

    const data = serializeLiveRow(resource, result.row, req);
    const label = result.revision.label || `Version ${result.revision.version_number}`;
    return responseStatus(res, 200, `Reverted to ${label}`, data);
  } catch (e) {
    console.error("revertCmsRevision:", e);
    return responseStatus(res, 500, "Failed to revert");
  }
};

const getCmsRevisionChangesHandler = async (req, res) => {
  try {
    const { resource, revisionId } = req.params;
    if (!isValidResourceType(resource)) {
      return responseStatus(res, 400, "Unknown CMS resource");
    }
    const id = parseInt(revisionId, 10);
    if (!id) return responseStatus(res, 400, "Invalid revision id");

    const data = await getCmsRevisionChanges(resource, id);
    if (!data) return responseStatus(res, 404, "Revision not found");

    return responseStatus(res, 200, "OK", data);
  } catch (e) {
    console.error("getCmsRevisionChangesHandler:", e);
    return responseStatus(res, 500, "Failed to load changes");
  }
};

module.exports = {
  listCmsRevisions,
  revertCmsRevision,
  getCmsRevisionChangesHandler,
};
