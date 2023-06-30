/*
  IMPORT MODULE SEQUELIZE
*/
const Sequelize = require("sequelize");

// Initialize database with Sequelize
const db = new Sequelize("lkp_elisa", "root", "" || process.env.PASSWORD, {
  host: "localhost" || process.env.HOST,
  dialect: "mysql",
});

module.exports = db;
