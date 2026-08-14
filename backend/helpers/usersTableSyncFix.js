/**
 * Production `users` tables are often older than the Sequelize User model.
 * `sync()` without alter will not add columns, so INSERT fails with
 * "Unknown column 'first_name'". Add any missing CMS login columns.
 */
async function prepareUsersTableForMysqlSync(sequelize) {
  if (sequelize.getDialect() !== "mysql") return;

  try {
    const [tables] = await sequelize.query(
      `SELECT TABLE_NAME AS name FROM information_schema.TABLES
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME IN ('users', 'Users')`
    );
    if (!tables || !tables.length) return;

    const tableName = tables[0].name;
    const [cols] = await sequelize.query(`SHOW COLUMNS FROM \`${tableName}\``);
    const names = new Set(cols.map((c) => c.Field));

    const needed = [
      ["first_name", "VARCHAR(85) NULL"],
      ["last_name", "VARCHAR(85) NULL"],
      ["name", "VARCHAR(170) NULL"],
      ["mobile_number", "VARCHAR(20) NULL"],
      ["email", "VARCHAR(100) NULL"],
      ["password", "VARCHAR(255) NULL"],
      ["api_key", "TEXT NULL"],
      ["user_type", "VARCHAR(32) NULL"],
      ["is_active", "TINYINT(1) NOT NULL DEFAULT 1"],
      ["created_by", "CHAR(36) NULL"],
      ["modified_by", "CHAR(36) NULL"],
      ["deleted_by", "CHAR(36) NULL"],
      ["created_at", "DATETIME NULL"],
      ["modified_at", "DATETIME NULL"],
      ["deleted_at", "DATETIME NULL"],
    ];

    let added = 0;
    for (const [column, ddl] of needed) {
      if (names.has(column)) continue;
      await sequelize.query(`ALTER TABLE \`${tableName}\` ADD COLUMN \`${column}\` ${ddl}`);
      names.add(column);
      added += 1;
    }

    if (names.has("name") && names.has("first_name") && names.has("last_name")) {
      await sequelize.query(
        `UPDATE \`${tableName}\`
         SET \`name\` = TRIM(CONCAT(IFNULL(\`first_name\`, ''), ' ', IFNULL(\`last_name\`, '')))
         WHERE (\`name\` IS NULL OR \`name\` = '')`
      );
    }

    if (added) {
      console.log(`users: added ${added} missing column(s) on \`${tableName}\`.`);
    }
  } catch (err) {
    if (err.original?.code === "ER_NO_SUCH_TABLE") return;
    throw err;
  }
}

module.exports = { prepareUsersTableForMysqlSync };
