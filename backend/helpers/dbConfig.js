const path = require("path");

function getDbConfig() {
  const env = process.env.NODE_ENV || "development";
  const all = require(path.join(__dirname, "../config/config.json"));
  const cfg = all[env] || all.development || {};

  return {
    ...cfg,
    username: process.env.DB_USER || cfg.username,
    password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : cfg.password,
    database: process.env.DB_NAME || cfg.database,
    host: process.env.DB_HOST || cfg.host || "127.0.0.1",
    port: Number(process.env.DB_PORT || cfg.port || 3306),
    dialect: cfg.dialect || "mysql",
  };
}

function describeDbTarget(cfg = getDbConfig()) {
  return `${cfg.username}@${cfg.host}:${cfg.port}/${cfg.database} (NODE_ENV=${process.env.NODE_ENV || "development"})`;
}

module.exports = { getDbConfig, describeDbTarget };
