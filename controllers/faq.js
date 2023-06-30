/*
  IMPORT MODULE CALCULATIONS MODEL
*/
const Faq = require("../models/Faq.models");

// create FAQ
exports.createFaq = async (req, res) => {
  const { question, answer } = req.body;

  try {
    await Faq.create({
      question: question,
      answer: answer,
    });
    // Process

    // Send status
    res.status(201).json({
      msg: "Create FAQ is success",
    });
  } catch (error) {
    res.status(500).json({ msg: "Some error occurred while creating FAQ" });
  }
};

// get all FAQ
exports.getFaq = async (req, res) => {
  try {
    const faq = await Faq.findAll({
      attributes: ["question", "answer"]
    });
    res.send(faq);
  } catch (error) {
    res.status(500).json({ msg: "Error to get data FAQ" });
  }
};

// get FAQ by id
exports.getFaqById = async (req, res) => {
  try {
    const faq = await Faq.findAll({
      where: {
        id: req.params.id,
      },
      attributes: ["question", "answer"],
    });
    const data = faq[0];
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        msg: "Cannot find FAQ!",
      });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving FAQ!" });
  }
};

// update FAQ
exports.updateFaq = async (req, res) => {
  try {
    await Faq.update(req.body, {
      where: {
        id: req.params.id,
      },
      attributes: ["question", "answer"],
    });
    res.status(200).json({
      msg: "update successfull!",
    });
  } catch (error) {
    res.status(500).json({ msg: "Error updating FAQ" });
  }
};

// delete FAQ
exports.deleteFaq = async (req, res) => {
  try {
    await Faq.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      msg: "FAQ deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ msg: "Error to delete FAQ" });
  }
};
