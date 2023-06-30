/*
  IMPORT MODULE DATABASE AND SEQUELIZE
*/
const Sequelize = require("sequelize");
const db = require("../utils/database");

// DATA TYPES
const { DataTypes } = Sequelize;

// FAQ models database
const Regis = db.define(
  "registrasi",
  {
    nik: {
      type: DataTypes.STRING,
    },
    nama: {
      type: DataTypes.STRING,
    },
    ttl: {
      type: DataTypes.STRING,
    },
    jenis_kelamin: {
      type: DataTypes.STRING,
    },
    pendidikan: {
      type: DataTypes.STRING,
    },
    alamat: {
      type: DataTypes.STRING,
    },
    asal_lembaga: {
      type: DataTypes.STRING,
    },
    nama_orangtua: {
      type: DataTypes.STRING,
    },
    no_hp: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jenis_pembelajaran: {
      type: DataTypes.STRING,
    },
    status_pendaftaran: {
      type: DataTypes.STRING,
    },
    foto: {
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

module.exports = Regis;
