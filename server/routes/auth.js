const express = require("express");
const { googleLogin} = require("../controller/authController");


const router = express.Router();

router.post("/google-login", googleLogin);




module.exports = router;    