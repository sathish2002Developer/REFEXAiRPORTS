"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CmsAssetsPage extends Model {}

  CmsAssetsPage.init(
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
      modelName: "CmsAssetsPage",
      tableName: "cms_assets_page",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        {
          unique: true,
          name: "cms_assets_page_airport_key",
          fields: ["airport_key"],
        },
      ],
    }
  );

  return CmsAssetsPage;
};
