/*
  IMPORT MODULE DATABASE AND SEQUELIZE
*/
const Sequelize = require("sequelize");
const db = require("../utils/database");

// DATA TYPES
const { DataTypes } = Sequelize;

// Articles models database
const News = db.define(
  "news",
  {
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
    release_date: {
      type: DataTypes.DATEONLY,
    },
    content: {
      type: DataTypes.STRING(10000),
    },
    draft: {
      type: DataTypes.STRING,
    },
    abstract: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

module.exports = News;
