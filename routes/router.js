/*
  IMPORT MODULE EXPRESS AND HANDLERS
*/
const express = require("express");
// const { verifyToken } = require("../middleware/verifyToken");
// const { refreshToken } = require("../controllers/refreshToken");
const { getMatches, getMatchesById, createMatches, updateMatches, deleteMatches } = require("../controllers/matches")
const { getNews, getNewsById, createNews, updateNews, deleteNews } = require("../controllers/news")

// Define Router
const router = express.Router();

router.get("/news", getNews);
router.get("/news/:id", getNewsById);
router.post("/news", createNews);
router.put("/news/:id", updateNews);
router.delete("/news/:id", deleteNews);

router.get("/matches", getMatches);
router.get("/matches/:id", getMatchesById);
router.post("/matches", createMatches);
router.put("/matches/:id", updateMatches);
router.delete("/matches/:id", deleteMatches);

module.exports = router;
