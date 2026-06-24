const express = require("express");
const { googleLogin, getusers } = require("../controller/authController");


const router = express.Router();

router.post("/google-login", googleLogin);




module.exports = router;    