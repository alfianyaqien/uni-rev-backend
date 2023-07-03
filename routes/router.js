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

// endpoint /home
router.get("/home", verifyToken, home);

// endpoint /signup
router.post("/signup", register);

// endpoint /login
router.post("/login", login);

// endpoint /token
router.get("/token", refreshToken);

router.get("/news", getNews);
router.get("/news/:id", getNewsById);
router.get("/news", createNews);
router.get("/news/:id", updateNews);
router.get("/news/:id", deleteNews);

router.get("/matches", getMatches);
router.get("/matches/:id", getMatchesById);
router.get("/matches", createMatches);
router.get("/matches/:id", updateMatches);
router.get("/matches/:id", deleteMatches);

router.put("/profile/:id", updateUser);

// endpoint /calculations for create user
router.post("/calculations", createCalculation);

// endpoint /calculations for get log calculations
router.get("/calculations", getLogCalculations);

// endpoint /calculations/:id for delete log calculations
router.delete("/calculations/:id", deleteLogCalculations);

// endpoint /articles for get articles
router.get("/articles", getArticles);

// endpoint /articles/:id for get article by Id
router.get("/articles/:id", getArticleById);

// endpoint /logout
router.delete("/logout", logout);

module.exports = router;
