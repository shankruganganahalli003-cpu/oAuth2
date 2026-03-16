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

// CORS with credentials
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/worker", workerRoutes);

// Connect to DB and start server
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
  connectDB();
  console.log("server is running");
})