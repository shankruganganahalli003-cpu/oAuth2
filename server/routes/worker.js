const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth");
const { createWorker, getAllWorkers, getme, getid, update, deleteid } = require("../controller/workercontroller");

router.post("/create", isAuth, createWorker); // ✅ only authenticated users
router.get("/getall",isAuth, getAllWorkers);
router.get("/getme",isAuth, getme);
router.get("/getid/:id",isAuth, getid);
router.put("/update/:id",isAuth, update);
router.delete("/delete/:id",isAuth, deleteid);

module.exports = router;