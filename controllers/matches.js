/*
  IMPORT MODULE NEWS MODEL
*/
const Matches = require("../models/matchesModels");

// get Matches
exports.getMatches = async (req, res) => {
  try {
    const matches = await Matches.findAll({
      attributes: ["date", "competition", "matches", "time", "locations", "category"],
    });
    res.send(matches);
  } catch (error) {
    res.status(500).json({ msg: "Error to get Matches" });
  }
};

// get Matches by Id
exports.getMatchesById = async (req, res) => {
  try {
    const Matches = await Matches.findAll({
      where: {
        id: req.params.id,
      },
      attributes: ["competition","information"],
    });
    const data = Matches[0];
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        msg: "Not found!",
      });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving Matches!" });
  }
};

exports.createMatches = async (req, res) => {
  const { competition, matches, locations, category, information } = req.body;
  const Matches_date = new Date();

  try {
    await Matches.create({
      competition: competition,
      matches: matches,
      locations: locations,
      category: category,
      information: information,
    });

    // Send status
    res.status(201).json({
      msg: "Create Matches is success",
    });
  } catch (error) {
    res.status(500).json({ msg: "Some error occurred while creating the Matches" });
  }
};

exports.updateMatches = async (req, res) => {
  try {
    await Matches.update(req.body, {
      where: {
        id: req.params.id,
      },
      attributes: ["competition", "matches", "locations", "category", "information"],
    });
    res.status(200).json({
      msg: "update Matches successfull!",
    });
  } catch (error) {
    res.status(500).json({ msg: "Error updating Matches" });
  }
};

exports.deleteMatches = async (req, res) => {
  try {
    await Matches.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      msg: "Matches deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ msg: "Error to delete Matches" });
  }
};