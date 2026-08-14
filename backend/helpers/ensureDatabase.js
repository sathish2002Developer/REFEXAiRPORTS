const mysql = require("mysql2/promise");
const { getDbConfig, describeDbTarget } = require("./dbConfig");

async function ensureDatabaseExists() {
  const cfg = getDbConfig();
  if (!cfg?.database) {
    throw new Error("Database name missing from config.json / DB_NAME");
  }

  console.log("MySQL target:", describeDbTarget(cfg));

  const conn = await mysql.createConnection({
    host: cfg.host || "127.0.0.1",
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
