/**
 * Seed default Travelers + Assets CMS rows (one per airport) into refex_airport.
 * Usage (from backend/):
 *   npm run seed:travelers-assets
 *   npm run seed:travelers-assets -- --force
 */
const { sequelize, CmsTravelersPage, CmsAssetsPage } = require("../models");
const { ensureDatabaseExists } = require("../helpers/ensureDatabase");
const {
  airportKeys,
  defaultTravelersPayload,
  defaultAssetsPayload,
} = require("../helpers/cmsAirportDefaults");

async function seedTravelersAssetsCms({ force = false } = {}) {
  await ensureDatabaseExists();
  await sequelize.authenticate();
  await CmsTravelersPage.sync();
  await CmsAssetsPage.sync();

  for (const key of airportKeys("travelers")) {
    const payload = defaultTravelersPayload(key);
    const existing = await CmsTravelersPage.findOne({ where: { airport_key: key } });
    if (!existing) {
      await CmsTravelersPage.create({ airport_key: key, payload });
      console.log(`Travelers CMS (${key}): created with default website content`);
    } else if (force) {
      existing.payload = payload;
      await existing.save();
      console.log(`Travelers CMS (${key}): reset to default website content (--force)`);
    } else {
      console.log(`Travelers CMS (${key}): already exists (pass --force to reset)`);
    }
  }

  for (const key of airportKeys("assets")) {
    const payload = defaultAssetsPayload(key);
    const existing = await CmsAssetsPage.findOne({ where: { airport_key: key } });
    if (!existing) {
      await CmsAssetsPage.create({ airport_key: key, payload });
      console.log(`Assets CMS (${key}): created with default website content`);
    } else if (force) {
      existing.payload = payload;
      await existing.save();
      console.log(`Assets CMS (${key}): reset to default website content (--force)`);
    } else {
      console.log(`Assets CMS (${key}): already exists (pass --force to reset)`);
    }
  }
}

if (require.main === module) {
  const force = process.argv.includes("--force");
  seedTravelersAssetsCms({ force })
    .then(() => {
      console.log("Travelers & Assets CMS seed complete.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Travelers & Assets CMS seed failed:", err);
      process.exit(1);
    });
}

module.exports = { seedTravelersAssetsCms };
