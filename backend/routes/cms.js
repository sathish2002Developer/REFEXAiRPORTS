const router = require("express").Router();
const cmsHomeHeroController = require("../controllers/cmsHomeHero");
const cmsHomePageController = require("../controllers/cmsHomePage");
const cmsAboutPageController = require("../controllers/cmsAboutPage");
const cmsTravelersPageController = require("../controllers/cmsTravelersPage");
const cmsAssetsPageController = require("../controllers/cmsAssetsPage");
const cmsLoungePageController = require("../controllers/cmsLoungePage");
const cmsVisionPageController = require("../controllers/cmsVisionPage");
const cmsSiteChromeController = require("../controllers/cmsSiteChrome");
const cmsNewsPageController = require("../controllers/cmsNewsPage");
const cmsPartnerPageController = require("../controllers/cmsPartnerPage");
const cmsWallPageController = require("../controllers/cmsWallPage");

router.get("/home", cmsHomePageController.getPublicHomePage);
router.get("/about", cmsAboutPageController.getPublicAboutPage);
router.get("/travelers/:airportKey", cmsTravelersPageController.getPublicTravelersPage);
router.get("/assets/:airportKey", cmsAssetsPageController.getPublicAssetsPage);
router.get("/lounge/:airportKey", cmsLoungePageController.getPublicLoungePage);
router.get("/home-hero", cmsHomeHeroController.getPublicHomeHero);
router.get("/vision", cmsVisionPageController.getPublicVisionPage);
router.get("/site-chrome", cmsSiteChromeController.getPublicSiteChrome);
router.get("/news", cmsNewsPageController.getPublicNewsPage);
router.get("/partner", cmsPartnerPageController.getPublicPartnerPage);
router.get("/wall", cmsWallPageController.getPublicWallPage);

module.exports = router;
