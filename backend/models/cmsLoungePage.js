"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CmsLoungePage extends Model {}

  CmsLoungePage.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      airport_key: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      payload: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CmsLoungePage",
      tableName: "cms_lounge_page",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        {
          unique: true,
          name: "cms_lounge_page_airport_key",
          fields: ["airport_key"],
        },
      ],
    }
  );

  return CmsLoungePage;
};
