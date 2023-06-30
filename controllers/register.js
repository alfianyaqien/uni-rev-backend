/*
  IMPORT MODULE CALCULATIONS MODEL
*/
const Regis = require("../models/Register.models");
const { Op } = require("sequelize");

// create Registration
exports.createRegis = async (req, res) => {
  const { nik, nama, ttl, jenis_kelamin, pendidikan, alamat, asal_lembaga, nama_orangtua, no_hp, email, jenis_pembelajaran } = req.body;
  var imageUrl = "";

  if (req.file && req.file.cloudStoragePublicUrl) {
    imageUrl = req.file.cloudStoragePublicUrl;
  }

  try {
    await Regis.create({
      nik: nik,
      nama: nama,
      ttl: ttl,
      jenis_kelamin: jenis_kelamin,
      pendidikan: pendidikan,
      alamat: alamat,
      asal_lembaga: asal_lembaga,
      nama_orangtua: nama_orangtua,
      no_hp: no_hp,
      email: email,
      jenis_pembelajaran: jenis_pembelajaran,
      status_pendaftaran: "PENDING",
      foto: imageUrl,
    });
    // Process

    // Send status
    res.status(201).json({
      msg: "Successful registration",
    });
  } catch (error) {
    res.status(500).json({ msg: "Some error occurred while registering" });
  }
};

// get list of registered participants
exports.getParticipants = async (req, res) => {
  try {
    const participant = await Regis.findAll({
      attributes: ["id", "nik", "nama", "ttl", "jenis_kelamin", "pendidikan", "alamat", "asal_lembaga", "nama_orangtua", "no_hp", "email", "jenis_pembelajaran", "status_pendaftaran", "foto", "createdAt", "updatedAt"],
    });
    res.send(participant);
  } catch (error) {
    res.status(500).json({ msg: "Error to get a list of registered participants" });
  }
};

// get participant by id
exports.getParticipantById = async (req, res) => {
  try {
    const participant = await Regis.findAll({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "nik", "nama", "ttl", "jenis_kelamin", "pendidikan", "alamat", "asal_lembaga", "nama_orangtua", "no_hp", "email", "jenis_pembelajaran", "status_pendaftaran", "foto", "createdAt", "updatedAt"],
    });
    const data = participant[0];
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        msg: "Cannot find participant!",
      });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving participant data!" });
  }
};

// update participant
exports.updateParticipant = async (req, res) => {
  const { nik, nama, ttl, jenis_kelamin, pendidikan, alamat, asal_lembaga, nama_orangtua, no_hp, email, jenis_pembelajaran, status_pendaftaran } = req.body;
  // var imageUrl = "";

  // if (req.file && req.file.cloudStoragePublicUrl) {
  //   imageUrl = req.file.cloudStoragePublicUrl;
  // }

  try {
    await Regis.update(
      {
        nik: nik,
        nama: nama,
        ttl: ttl,
        jenis_kelamin: jenis_kelamin,
        pendidikan: pendidikan,
        alamat: alamat,
        asal_lembaga: asal_lembaga,
        nama_orangtua: nama_orangtua,
        no_hp: no_hp,
        email: email,
        jenis_pembelajaran: jenis_pembelajaran,
        status_pendaftaran: status_pendaftaran,
        // foto: imageUrl,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      msg: "update successfull!",
    });
  } catch (error) {
    res.status(500).json({ msg: "Error updating participant data" });
  }
};

exports.updatePhoto = async (req, res) => {
  var imageUrl = "";

  if (req.file && req.file.cloudStoragePublicUrl) {
    imageUrl = req.file.cloudStoragePublicUrl;
  }

  try {
    await Regis.update(
      {
        foto: imageUrl,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      msg: "update successfull!",
    });
  } catch (error) {
    res.status(500).json({ msg: "Error updating photo" });
  }
};

// search participant by NIK
exports.searchParticipantByNik = async (req, res) => {
  try {
    const { term } = req.query;

    const participant = await Regis.findAll({
      where: {
        nik: {
          [Op.like]: "%" + term + "%",
        },
      },
      attributes: ["id", "nik", "nama", "ttl", "jenis_kelamin", "pendidikan", "alamat", "asal_lembaga", "nama_orangtua", "no_hp", "email", "jenis_pembelajaran", "status_pendaftaran", "foto"],
    });
    res.send(participant);
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving participant data!" });
  }
};

// delete participant
exports.deleteParticipant = async (req, res) => {
  try {
    await Regis.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      msg: "Participant deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ msg: "Error to delete participant" });
  }
};
