const express = require('express')
const { protect } = require('../middleware/authhandler');
const { sendMessage } = require('../controllers/messageControllers');

const router = express.Router()
router.route('/').post(protect, sendMessage)
//router.route('/:chatId').get(protect, allMessages)

module.exports = router;