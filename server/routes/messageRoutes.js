const express = require("express");
const { sendMessage, getMessages, markAsRead } = require("../controller/messageController");

const router = express.Router();

router.post("/send", sendMessage);
router.get("/:user1/:user2", getMessages);
router.post("/mark-read", markAsRead);

module.exports = router;