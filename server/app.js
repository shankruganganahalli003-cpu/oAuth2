const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const workerRoutes = require("./routes/worker");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: [
    "https://o-auth2-abc123.vercel.app", // live frontend
    "http://localhost:5173"               // local dev
  ],
  credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/worker", workerRoutes);

// Connect DB & Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});