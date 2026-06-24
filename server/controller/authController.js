const jwt = require("jsonwebtoken");
const User = require("../models/User");
const axios = require("axios");

exports.googleLogin = async (req, res) => {
  try {
    const { token, role } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token missing" });
    }

    // 🔥 VERIFY WITH GOOGLE API (FIX)
    const { data: payload } = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    );

    console.log("GOOGLE PAYLOAD:", payload);

    if (!payload.email) {
      return res.status(401).json({ error: "Invalid Google token" });
    }

    // FIND OR CREATE USER
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
        picture: payload.picture,
        role: role || "user",
      });
    }

    // JWT
    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

   res.cookie("token", jwtToken, {
  httpOnly: true,
  secure: false,   // 🔥 MUST BE FALSE in localhost
  sameSite: "lax", // 🔥 IMPORTANT
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
    return res.json({
      success: true,
      user,
      jwtToken,
    });

  } catch (err) {
    console.error("Google login error:", err.response?.data || err.message);
    return res.status(401).json({ error: "Invalid Google token" });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.User.id).select("-password");

    if (!User) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};