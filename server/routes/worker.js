const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");
const { createWorker, getAllWorkers, getme, getid, update } = require("../controller/workercontroller");

router.post("/create", isAuth, createWorker); // ✅ only authenticated users
router.get("/getall",isAuth, getAllWorkers);
router.get("/getme",isAuth, getme);
router.get("/getid/:id",isAuth, getid);
router.get("/update/:id",isAuth, update);

module.exports = router;