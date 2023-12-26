const express = require("express");
const { protect } = require("../middleware/authhandler");

const router = express.Router();

//router.route("/").post(protect, accessChat);
//router.route("/").gett(protect, fetchChats);
//router.route("/group").post(protect, createGroupChat);
//router.route("/rename").put(protect, renameGroup);
//router.route("/groupremove").put(protect, removefromGroup);
//router.route("/groupadd").put(protect, addtoGroup);

module.exports = router;