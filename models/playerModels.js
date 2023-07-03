/*
  IMPORT MODULE DATABASE AND SEQUELIZE
*/
const Sequelize = require("sequelize");
const db = require("../utils/database");

// DATA TYPES
const { DataTypes } = Sequelize;

// Calculations models database
const Players = db.define(
  "players",
  {
    name: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    about: {
      type: DataTypes.STRING,
    },
    birth_day: {
      type: DataTypes.DATEONLY,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    nationality: {
      type: DataTypes.STRING,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    number: {
      type: DataTypes.STRING,
    },
    join: {
      type: DataTypes.DATE,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    appearances: {
      type: DataTypes.INTEGER,
    },
    win: {
      type: DataTypes.INTEGER,
    },
    titles: {
      type: DataTypes.INTEGER,
    },
    achievement: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

module.exports = Players;
