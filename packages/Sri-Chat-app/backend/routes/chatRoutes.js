const express = require("express");
const { protect } = require("../middleware/authhandler");
const { accessChat, createGroupChat, renameGroup, addtoGroup, removeFromGroup } = require("../controllers/chatController");
const { fetchChats } = require("../controllers/chatController");
const router = express.Router();

router.route("/").post(protect, accessChat);   // url/api/chat req:post
router.route("/").get(protect, fetchChats);     // url/api/chat req:get
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addtoGroup);

module.exports = router;