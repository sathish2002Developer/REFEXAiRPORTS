/**
 * Seed default Home + About CMS rows into the refex_airport database.
 * Usage (from backend/):
 *   npm run seed:home-about
 *   npm run seed:home-about -- --force   (reset to website defaults)
 */
const { sequelize, CmsHomePage, CmsAboutPage } = require("../models");
const { defaultHomePayload } = require("../helpers/cmsHomePageDefaults");
const { defaultAboutPayload } = require("../helpers/cmsAboutPageDefaults");
const { ensureDatabaseExists } = require("../helpers/ensureDatabase");

async function seedHomeAboutCms({ force = false } = {}) {
  await ensureDatabaseExists();
  await sequelize.authenticate();
  await CmsHomePage.sync();
  await CmsAboutPage.sync();

  const home = await CmsHomePage.findOne({ where: { singleton_key: "home" } });
  if (!home) {
    await CmsHomePage.create({ singleton_key: "home", payload: defaultHomePayload() });
    console.log("Home CMS: created with default website content");
  } else if (force) {
    home.payload = defaultHomePayload();
    await home.save();
    console.log("Home CMS: reset to default website content (--force)");
  } else {
    console.log("Home CMS: already exists (pass --force to reset)");
  }

  const about = await CmsAboutPage.findOne({ where: { singleton_key: "about" } });
  if (!about) {
    await CmsAboutPage.create({ singleton_key: "about", payload: defaultAboutPayload() });
    console.log("About CMS: created with default website content");
  } else if (force) {
    about.payload = defaultAboutPayload();
    await about.save();
    console.log("About CMS: reset to default website content (--force)");
  } else {
    console.log("About CMS: already exists (pass --force to reset)");
  }
}

if (require.main === module) {
  const force = process.argv.includes("--force");
  seedHomeAboutCms({ force })
    .then(() => {
      console.log("Home & About CMS seed complete.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Home & About CMS seed failed:", err);
      process.exit(1);
    });
}

module.exports = { seedHomeAboutCms };
