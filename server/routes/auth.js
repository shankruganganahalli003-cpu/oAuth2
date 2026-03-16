const express = require("express");
const { googleLogin } = require("../controller/authController");
const isAuth = require("../middleware/auth");

const router = express.Router();

// Google login
router.post("/google-login", googleLogin);

// Example protected route
router.get("/profile", isAuth, async (req, res) => {
  const user = await require("../models/User").findById(req.userId);
  res.json({ success: true, user });
});

module.exports = router;