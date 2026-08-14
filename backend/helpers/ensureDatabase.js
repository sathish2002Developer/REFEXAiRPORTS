const mysql = require("mysql2/promise");

async function ensureDatabaseExists() {
  const env = process.env.NODE_ENV || "development";
  const cfg = require("../config/config.json")[env];
  if (!cfg?.database) {
    throw new Error("Database name missing from config.json");
  }

  const conn = await mysql.createConnection({
    host: cfg.host || "localhost",
    port: cfg.port || 3306,
    user: cfg.username,
    password: cfg.password,
  });

  await conn.query(
    `CREATE DATABASE IF NOT EXISTS \`${cfg.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  await conn.end();
  console.log(`Database ensured: ${cfg.database}`);
}

module.exports = { ensureDatabaseExists };
