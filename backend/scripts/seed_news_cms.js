/**
 * Seed News & Updates CMS.
 * Usage (from backend/):
 *   npm run seed:news
 *   npm run seed:news -- --force
 */
const { sequelize, CmsNewsPage } = require("../models");
const { defaultNewsPayload } = require("../helpers/cmsNewsPageDefaults");
const { ensureDatabaseExists } = require("../helpers/ensureDatabase");

async function seedNewsCms({ force = false } = {}) {
  await ensureDatabaseExists();
  await sequelize.authenticate();
  await CmsNewsPage.sync();

  const row = await CmsNewsPage.findOne({ where: { singleton_key: "news" } });
  if (!row) {
    await CmsNewsPage.create({ singleton_key: "news", payload: defaultNewsPayload() });
    console.log("News CMS: created with default website content");
  } else if (force) {
    row.payload = defaultNewsPayload();
    await row.save();
    console.log("News CMS: reset to default website content (--force)");
  } else {
    console.log("News CMS: already exists (pass --force to reset)");
  }
}

if (require.main === module) {
  const force = process.argv.includes("--force");
  seedNewsCms({ force })
    .then(() => {
      console.log("News CMS seed complete.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("News CMS seed failed:", err);
      process.exit(1);
    });
}

module.exports = { seedNewsCms };
