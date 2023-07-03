/*
  IMPORT MODULE SEQUELIZE
*/
const Sequelize = require("sequelize");

// Initialize database with Sequelize
const db = new Sequelize("uni", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
