const express = require("express");
const { googleLogin, getMe} = require("../controller/authController");


const router = express.Router();

router.post("/google-login", googleLogin);
router.get("/getme",getMe);




module.exports = router;    