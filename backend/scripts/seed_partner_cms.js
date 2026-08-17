/**
 * Seed Partner with Us CMS.
 * Usage (from backend/):
 *   npm run seed:partner
 *   npm run seed:partner -- --force
 */
const { sequelize, CmsPartnerPage } = require("../models");
const { defaultPartnerPayload } = require("../helpers/cmsPartnerPageDefaults");
const { ensureDatabaseExists } = require("../helpers/ensureDatabase");

async function seedPartnerCms({ force = false } = {}) {
  await ensureDatabaseExists();
  await sequelize.authenticate();
  await CmsPartnerPage.sync();

  const row = await CmsPartnerPage.findOne({ where: { singleton_key: "partner" } });
  if (!row) {
    await CmsPartnerPage.create({ singleton_key: "partner", payload: defaultPartnerPayload() });
    console.log("Partner CMS: created with default website content");
  } else if (force) {
    row.payload = defaultPartnerPayload();
    await row.save();
    console.log("Partner CMS: reset to default website content (--force)");
  } else {
    console.log("Partner CMS: already exists (pass --force to reset)");
  }
}

if (require.main === module) {
  const force = process.argv.includes("--force");
  seedPartnerCms({ force })
    .then(() => {
      console.log("Partner CMS seed complete.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Partner CMS seed failed:", err);
      process.exit(1);
    });
}

module.exports = { seedPartnerCms };
