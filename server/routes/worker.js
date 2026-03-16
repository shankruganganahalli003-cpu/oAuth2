const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");
const { createWorker, getAllWorkers, getme } = require("../controller/workercontroller");

router.post("/create", isAuth, createWorker); // ✅ only authenticated users
router.get("/getall",isAuth, getAllWorkers);
router.get("/get",isAuth, getme);

module.exports = router;