/*
  IMPORT MODULE DATABASE AND SEQUELIZE
*/
const Sequelize = require("sequelize");
const db = require("../utils/database");

// DATA TYPES
const { DataTypes } = Sequelize;

// Calculations models database
const Matches = db.define(
  "matches",
  {
    date: {
      type: DataTypes.DATEONLY,
    },
    competition: {
      type: DataTypes.STRING,
    },
    matches: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.DATE,
    },
    locations: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    information: {
      type: DataTypes.STRING(10000),
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

module.exports = Matches;
