/*
  IMPORT MODULE EXPRESS AND HANDLERS
*/
const express = require("express");
const { createFaq, getFaq, getFaqById, updateFaq, deleteFaq } = require("../controllers/faq");
const { createRegis, getParticipants, getParticipantById, updateParticipant, deleteParticipant, searchParticipantByNik, updatePhoto } = require("../controllers/register");
const { register, login, home, logout } = require("../controllers/admin");
const { verifyToken } = require("../middleware/verifyToken");
const { refreshToken } = require("../controllers/refreshToken");
const multer = require("multer");
const imgUpload = require("../modules/imgUpload");

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// Define Router
const router = express.Router();

/* 
  Endpoint for FAQ
*/

// endpoint /faq to create FAQ
router.post("/faq", createFaq);

// endpoint /faq to get all FAQ
router.get("/faq", getFaq);

// endpoint /faq/:id to get FAQ by id
router.get("/faq/:id", getFaqById);

// endpoint /faq/:id to update FAQ
router.put("/faq/:id", updateFaq);

// endpoint /faq/:id to delete FAQ
router.delete("/faq/:id", deleteFaq);

/* 
  Endpoint for Registration
*/

// endpoint /register to create registration
router.post("/register", multerMid.single("foto"), imgUpload.uploadToGcs, createRegis);

// endpoint /profile to get all participants data
router.get("/profile", getParticipants);

// endpoint /profile/:id to get participant data by id
router.get("/profile/:id", getParticipantById);

// endpoint /profile/search to search participant data by nik
router.get("/search", searchParticipantByNik);

// endpoint /profile/:id to update participant data
router.put("/profile/:id", multerMid.single("foto"), imgUpload.uploadToGcs, updateParticipant);

// endpoint /profile/:id to delete participant data
router.delete("/profile/:id", deleteParticipant);

// endpoint /uploadImage to upload image by id to Google Storage Bucket
router.put("/uploadImage/:id", multerMid.single("foto"), imgUpload.uploadToGcs, updatePhoto);

// router.put("/uploadImage/:id", multerMid.single("foto"), imgUpload.uploadToGcs, (req, res) => {
//   var imageUrl = req.body;

//   if (req.file && req.file.cloudStoragePublicUrl) {
//     imageUrl = req.file.cloudStoragePublicUrl;
//   }

//   try {
//     Regis.update(
//       {
//         foto: imageUrl,
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       }
//     );
//     res.status(200).json({
//       msg: "update successfull!",
//     });
//   } catch (error) {
//     res.status(500).json({ msg: "Error updating participant data" });
//   }
// });

/* 
  Endpoint for Admin Login
*/

// endpoint /home
router.get("/admin", verifyToken, home);

// endpoint /signup
router.post("/signup", register);

// endpoint /login
router.post("/login", login);

// endpoint /token
router.get("/token", refreshToken);

// endpoint /logout
router.delete("/logout", logout);

module.exports = router;
