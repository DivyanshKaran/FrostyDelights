const express = require("express");
const router = express.Router();
const authController = require("../controllers/authenticationController");

router.post("/signup", authController.signUp);
router.post("/login", authController.login);

module.exports = router;
