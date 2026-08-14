/**
 * Seed ALL website CMS data into the backend database / APIs.
 *
 * From backend/:
 *   npm run seed:website          ← loads Home, About, Assets, Travelers, Lounge, Navbar, News
 *   npm run seed:cms              ← same, fills missing rows only
 *   npm run seed:cms:force        ← reset those rows to website defaults
 *
 * Requires MySQL (see config/config.json) and npm install in backend/.
 */
require("dotenv").config();
const { sequelize } = require("../models");
const { ensureDatabaseExists } = require("../helpers/ensureDatabase");
const { prepareUsersTableForMysqlSync } = require("../helpers/usersTableSyncFix");
const { ensureCmsAdminFromSample } = require("../helpers/cmsAdminSeed");
const { seedHomeAboutCms } = require("./seed_home_about_cms");
const { seedTravelersAssetsCms } = require("./seed_travelers_assets_cms");
const { seedLoungeCms } = require("./seed_lounge_cms");
const { seedSiteChromeCms } = require("./seed_site_chrome_cms");
const { seedNewsCms } = require("./seed_news_cms");

async function seedAllCms({ force = false } = {}) {
  console.log("=== Refex website CMS seed ===");
  console.log(
    force
      ? "Mode: FORCE — reset Home, About, Assets, Travelers, Lounge, Navbar, News to website defaults"
      : "Mode: fill missing rows only (existing CMS edits are kept)"
  );

  await ensureDatabaseExists();
  await sequelize.authenticate();
  await prepareUsersTableForMysqlSync(sequelize);
  await sequelize.sync();

  console.log("\n[1/6] Home + About");
  await seedHomeAboutCms({ force });

  console.log("\n[2/6] Our Assets + For Travelers (pune, srinagar, trichy, aurangabad, shirdi)");
  await seedTravelersAssetsCms({ force });

  console.log("\n[3/6] Lounge (all airports)");
  await seedLoungeCms({ force });

  console.log("\n[4/6] Navbar");
  await seedSiteChromeCms({ force });

  console.log("\n[5/6] News & Updates");
  await seedNewsCms({ force });

  console.log("\n[6/6] CMS admin user");
  await ensureCmsAdminFromSample();

  console.log("\n=== Seed complete. Public APIs: ===");
  console.log("  GET /api/cms/home");
  console.log("  GET /api/cms/about");
  console.log("  GET /api/cms/travelers/:airportKey   (pune|srinagar|trichy|aurangabad|shirdi)");
  console.log("  GET /api/cms/assets/:airportKey");
  console.log("  GET /api/cms/lounge/:airportKey");
  console.log("  GET /api/cms/site-chrome             (navbar)");
  console.log("  GET /api/cms/news");
  console.log("Admin login: admin@refexairports.com / admin123");
}

if (require.main === module) {
  const force = process.argv.includes("--force");
  seedAllCms({ force })
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("CMS seed failed:", err);
      process.exit(1);
    });
}

module.exports = { seedAllCms };
