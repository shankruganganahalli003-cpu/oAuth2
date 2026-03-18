const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
// controller.js
const User = require("../models/User");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  try {
    const { token, role } = req.body;
    if (!token) return res.status(400).json({ error: "Google token is required" });

    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Find or create user
    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
        picture: payload.picture,
        role: role || "user", // default to 'user' if role not provided
      });
    } else {
      // Update role if provided and different from existing
      if (role && user.role !== role) {
        user.role = role;
        await user.save();
      }
    }

    // Generate JWT
    const jwtToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set cookie
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ success: true, user, jwtToken });
  } catch (err) {
    console.error("Google login error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};



module.exports.getusers = async (req, res) => {
  try {
    const findusers = await User.find({ role: "user" });
    return res.status(200).json({ success: true, findusers });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};