/*
  IMPORT MODULE NEWS MODEL
*/
const News = require("../models/newsModels");

// get news
exports.getNews = async (req, res) => {
  try {
    const news = await News.findAll({
      attributes: ["title", "release_date", "abstract"],
    });
    res.send(news);
  } catch (error) {
    res.status(500).json({ msg: "Error to get news" });
  }
};

// get news by Id
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findAll({
      where: {
        id: req.params.id,
      },
      attributes: ["title", "content", "release_date"],
    });
    const data = news[0];
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        msg: "Not found!",
      });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving News!" });
  }
};

exports.createNews = async (req, res) => {
  const { title, author, abstract, content} = req.body;
  const news_date = new Date();

  try {
    await News.create({
      title: title,
      author: author,
      abstract: abstract,
      content: content,
      release_date: news_date
    });

    // Send status
    res.status(201).json({
      msg: "Create news is success",
    });
  } catch (error) {
    res.status(500).json({ msg: "Some error occurred while creating the news" });
  }
};

exports.updateNews = async (req, res) => {
  try {
    await News.update(req.body, {
      where: {
        id: req.params.id,
      },
      attributes: ["title", "author", "abstract", "content"],
    });
    res.status(200).json({
      msg: "update news successfull!",
    });
  } catch (error) {
    res.status(500).json({ msg: "Error updating news" });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    await News.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      msg: "News deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ msg: "Error to delete news" });
  }
};