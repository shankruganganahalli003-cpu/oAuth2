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
  "http://localhost:3000",
  "https://o-auth2-43pmwldyy-shankruganganahalli003-cpus-projects.vercel.app"
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