/**
 * Seed default Lounge CMS rows (one per airport) into refex_airport.
 * Usage (from backend/):
 *   npm run seed:lounge
 *   npm run seed:lounge -- --force
 */
const { sequelize, CmsLoungePage } = require("../models");
const { ensureDatabaseExists } = require("../helpers/ensureDatabase");
const { airportKeys, defaultLoungePayload } = require("../helpers/cmsAirportDefaults");

async function seedLoungeCms({ force = false } = {}) {
  await ensureDatabaseExists();
  await sequelize.authenticate();
  await CmsLoungePage.sync();

  for (const key of airportKeys("lounge")) {
    const payload = defaultLoungePayload(key);
    const existing = await CmsLoungePage.findOne({ where: { airport_key: key } });
    if (!existing) {
      await CmsLoungePage.create({ airport_key: key, payload });
      console.log(`Lounge CMS (${key}): created with default website content`);
    } else if (force) {
      existing.payload = payload;
      await existing.save();
      console.log(`Lounge CMS (${key}): reset to default website content (--force)`);
    } else {
      console.log(`Lounge CMS (${key}): already exists (pass --force to reset)`);
    }
  }
}

if (require.main === module) {
  const force = process.argv.includes("--force");
  seedLoungeCms({ force })
    .then(() => {
      console.log("Lounge CMS seed complete.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Lounge CMS seed failed:", err);
      process.exit(1);
    });
}

module.exports = { seedLoungeCms };
