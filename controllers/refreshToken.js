/*
  IMPORT MODULE JWT AND USER MODELS
*/
const Admin = require("../models/Admin.models");
const jwt = require("jsonwebtoken");

// Refresh token function
exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.sendStatus(401);

    const admin = await Admin.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!admin[0]) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      const adminId = admin[0].id;
      const username = admin[0].username;
      const email = admin[0].email;
      const accessToken = jwt.sign({ adminId, username, email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7200s", // 2 hours
      });
      res.json({ accessToken });
    });
  } catch (error) {
    console.log(error);
  }
};
