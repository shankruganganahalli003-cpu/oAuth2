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
const allowedOrigins = [
  "http://localhost:5173",
  "https://oauth2-2.onrender.com"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send("OAuth2 Backend is running 🚀");
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/worker", workerRoutes);



const PORT = process.env.PORT;
app.listen(PORT,()=>{
  connectDB();
  console.log("server is running");
})