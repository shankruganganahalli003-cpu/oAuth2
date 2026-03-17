const express = require("express");
const { googleLogin } = require("../controller/authController");
const isAuth = require("../middleware/auth");

const router = express.Router();

// Google login
router.post("/google-login", googleLogin);



module.exports = router;