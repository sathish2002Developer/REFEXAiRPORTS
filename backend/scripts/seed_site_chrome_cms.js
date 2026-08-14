/**
 * Seed navbar / site chrome CMS.
 * Usage (from backend/):
 *   npm run seed:site-chrome
 *   npm run seed:site-chrome -- --force
 */
const { sequelize, CmsSiteChrome } = require("../models");
const { defaultPayload } = require("../controllers/cmsSiteChrome");
const { ensureDatabaseExists } = require("../helpers/ensureDatabase");

function looksLikeLegacyVisionChrome(payload) {
  const nav = payload?.navbar || {};
  const links = Array.isArray(nav.nav_links) ? nav.nav_links : [];
  const tos = links.map((l) => String(l?.to || "")).join(" ");
  return (
    nav.logo_alt === "Vision 3030" ||
    /\/vision\b|\/wall\b/.test(tos) ||
    links.some((l) => /vision|the wall/i.test(String(l?.label || "")))
  );
}

async function seedSiteChromeCms({ force = false } = {}) {
  await ensureDatabaseExists();
  await sequelize.authenticate();
  await CmsSiteChrome.sync();

  const row = await CmsSiteChrome.findOne({ where: { singleton_key: "main" } });
  const next = defaultPayload();
  if (!row) {
    await CmsSiteChrome.create({ singleton_key: "main", payload: next });
    console.log("Navbar CMS: created with Refex menu defaults");
  } else if (force || looksLikeLegacyVisionChrome(row.payload || {})) {
    row.payload = next;
    await row.save();
    console.log(
      force
        ? "Navbar CMS: reset to Refex menu defaults (--force)"
        : "Navbar CMS: replaced leftover Vision 3030 menus with Refex defaults"
    );
  } else {
    console.log("Navbar CMS: already exists (pass --force to reset)");
  }
}

if (require.main === module) {
  const force = process.argv.includes("--force");
  seedSiteChromeCms({ force })
    .then(() => {
      console.log("Navbar CMS seed complete.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Navbar CMS seed failed:", err);
      process.exit(1);
    });
}

module.exports = { seedSiteChromeCms };
