/*
  IMPORT MODULE CALCULATIONS MODEL
*/
const Admin = require("../models/Admin.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// register function
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    Admin.findOne({
      where: {
        email: req.body.email,
      },
    }).then((admin) => {
      if (admin) {
        res.status(400).send({
          auth: false,
          id: req.body.id,
          message: "Error",
          errors: "Email is already taken!",
        });
        return;
      }
    });

    await Admin.create({
      username: username,
      email: email,
      password: hashPassword,
    });
    res.status(201).json({ msg: "Registration Successful!" });
  } catch (error) {
    res.status(500).json({ msg: "Registration Error!" });
  }
};

// login function
exports.login = async (req, res) => {
  try {
    const admin = await Admin.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, admin[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    const adminId = admin[0].id;
    const username = admin[0].username;
    const email = admin[0].email;
    const accessToken = jwt.sign({ adminId, username, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "86400s",
    });
    const refreshToken = jwt.sign({ adminId, username, email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "86400s",
    });
    await Admin.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: adminId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken, msg: "Login successful" });
  } catch (error) {
    res.status(404).json({ msg: "Email not found" });
  }
};

// success login
exports.home = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.sendStatus(401);
  try {
    res.status(200).json({ msg: "Hallo! Welcome to LKP Elisa" });
  } catch (error) {
    res.status(500).json({ msg: "Error!" });
  }
};

// logout function
exports.logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const admin = await Admin.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!admin[0]) return res.sendStatus(204);
  const adminId = admin[0].id;
  await Admin.update(
    { refresh_token: null },
    {
      where: {
        id: adminId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.status(200).json({ msg: "Logged out!" });
};
