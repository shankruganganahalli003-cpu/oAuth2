const express = require("express");
const { googleLogin, getusers } = require("../controller/authController");


const router = express.Router();

// Google login
router.post("/google-login", googleLogin);
router.get("/getusers",getusers);



module.exports = router;