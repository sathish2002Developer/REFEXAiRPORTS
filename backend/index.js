require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const { sequelize } = require("./models");
const { ensureDatabaseExists } = require("./helpers/ensureDatabase");
const { seedHomeAboutCms } = require("./scripts/seed_home_about_cms");
const { seedTravelersAssetsCms } = require("./scripts/seed_travelers_assets_cms");
const { seedLoungeCms } = require("./scripts/seed_lounge_cms");
const { seedSiteChromeCms } = require("./scripts/seed_site_chrome_cms");
const { seedNewsCms } = require("./scripts/seed_news_cms");
const { cleanupWallTables } = require("./helpers/wallDbCleanup");
const { prepareLoginHistoriesForMysqlSync } = require("./helpers/loginHistoriesSyncFix");
const { prepareUsersTableForMysqlSync } = require("./helpers/usersTableSyncFix");
const {
  prepareInvestorMenuItemsForMysqlSync,
} = require("./helpers/investorMenuItemsSyncFix");
const {
  prepareCmsSingletonTablesForMysqlSync,
} = require("./helpers/cmsSingletonTablesSyncFix");
const {
  prepareCmsRevisionsForMysqlSync,
} = require("./helpers/cmsRevisionsSyncFix");
const { ensureCmsAdminFromSample } = require("./helpers/cmsAdminSeed");
const history = require("connect-history-api-fallback");
const status = require("./helpers/response");
const session = require("express-session");
const passport = require("passport");
const { Strategy } = require("passport-openidconnect");

const app = express();

// CORS must be applied before any other middleware
// More permissive CORS for development
app.use((req, res, next) => {
  // Log all incoming requests for debugging
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} from origin: ${req.headers.origin || 'no-origin'}`);
  
  // Set CORS headers for all requests
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, Pragma');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400'); // 24 hours
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling preflight request for:', req.url);
    return res.status(200).end();
  }
  
  next();
});

// Additional CORS middleware as backup
app.use(cors({
  origin: true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Cache-Control', 'Pragma'],
  optionsSuccessStatus: 200
}));

// Middleware to parse incoming JSON data ==================================
app.use(express.json({  }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));







// Routes
app.use("/auth", require("./routes/auth"));

// Home CMS — public read
app.use("/api/cms", require("./routes/cms"));

// Admin routes - protected endpoints for admin panel
app.use("/api/admin", require("./routes/admin"));

// Investor routes - public endpoints for displaying files and protected endpoints for admin
app.use("/api/investor", require("./routes/investor"));

// Business commute routes
app.use("/api/business-commute", require("./routes/businessCommute"));

// Contact form route (email + Kissflow webhook queue)
app.use("/api", require("./routes/contactForm"));

// Wall (Refex 2030) — posts, images, polls, comments, reactions
app.use("/api/wall", require("./routes/wall"));
app.use("/uploads/wall", express.static(path.join(__dirname, "uploads/wall")));
app.use("/uploads/cms", express.static(path.join(__dirname, "uploads/cms")));






// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running well",
    timestamp: new Date().toISOString()
  });
});

// CORS test endpoint
app.get("/api/cors-test", (req, res) => {
  res.json({
    success: true,
    message: "CORS is working!",
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// Test POST endpoint for CORS
app.post("/api/cors-test", (req, res) => {
  res.json({
    success: true,
    message: "POST CORS is working!",
    body: req.body,
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// // simple route
// app.get("/", (req, res) => {
//   return res.json({
//     success: true,
//     message: "Backend is running well",
//   });
// });

// app.use("/auth", require("./src/routes/auth"));

// app.use(
//   "/api",
//   require("./src/routes/user"),
//   require("./src/routes/dashboard"),
//   require("./src/routes/sales_management/customer"),
//   require("./src/routes/sales_management/lead"),
//   require("./src/routes/sales_management/quotation"),
//   require("./src/routes/sales_management/nsop_quotation"),
//   require("./src/routes/sales_management/proforma_invoice"),
//   require("./src/routes/sales_management/brief_sheet"),
//   require("./src/routes/trip_management/masters/operator"),
//   require("./src/routes/trip_management/masters/airport"),
//   require("./src/routes/trip_management/masters/aircraft"),
//   require("./src/routes/trip_management/masters/aircraft_model"),
//   require("./src/routes/trip_management/masters/country"),
//   require("./src/routes/trip_management/masters/city"),
//     require("./src/routes/trip_management/masters/zone"),
//   require("./src/routes/trip_management/masters/designation"),
//   require("./src/routes/trip_management/masters/crew"),
//   require("./src/routes/sales_management/quotation_download")
// );

// Image upload endpoint - MUST be before the catch-all API route
const uploadImage = require('./middlewares/uploadImage');
app.post('/api/upload/image', uploadImage.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    
    // Return the file path relative to the server
    const imageUrl = `/uploads/images/${req.file.filename}`;
    res.json({ 
      success: true, 
      imageUrl: imageUrl,
      filename: req.file.filename 
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.all("/api/*", (req, res) => {
  return status.responseStatus(res, 404, "Endpoint Not Found");
});

// Serve the Vite client build from ../client/out
const clientOutDir = path.join(__dirname, "../client/out");
app.use(express.static(clientOutDir));
app.use(history());

app.get("*", (req, res) => {
  res.sendFile(path.join(clientOutDir, "index.html"));
});

// set port
const PORT = 3055;

function startHttpServer() {
  return new Promise((resolve, reject) => {
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
      resolve(server);
    });
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Stop the other process or change PORT.`);
      }
      reject(err);
    });
  });
}

async function bootDatabase() {
  console.log("Ensuring database exists...");
  await ensureDatabaseExists();
  console.log("Connecting to MySQL...");
  await sequelize.authenticate();
  console.log("MySQL connected.");

  await cleanupWallTables(sequelize);
  await prepareLoginHistoriesForMysqlSync(sequelize);
  await prepareUsersTableForMysqlSync(sequelize);
  await prepareInvestorMenuItemsForMysqlSync(sequelize);
  await prepareCmsSingletonTablesForMysqlSync(sequelize);
  await prepareCmsRevisionsForMysqlSync(sequelize);

  // Do not use { alter: true } on boot — it can hang for a long time on MySQL.
  console.log("Syncing tables...");
  await sequelize.sync();
  console.log("Database synced successfully");

  console.log("Seeding CMS (missing rows only)...");
  await seedHomeAboutCms({ force: false });
  await seedTravelersAssetsCms({ force: false });
  await seedLoungeCms({ force: false });
  await seedSiteChromeCms({ force: false });
  await seedNewsCms({ force: false });
  await ensureCmsAdminFromSample();
  console.log("CMS seed finished.");
}

async function main() {
  console.log("Starting Refex API...");
  try {
    await startHttpServer();
  } catch (err) {
    console.error("Failed to bind HTTP port:", err);
    process.exit(1);
  }

  try {
    await bootDatabase();
  } catch (err) {
    console.error("Database/CMS startup error (HTTP server is still running):", err);
  }
}

main();
