const express = require(`express`);
const { registerUser, authUser, allUsers } = require("../controllers/userControllers");
const { protect } = require("../middleware/authhandler");
const router = express.Router();


//Creating routes to the endpoint.
router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/').get(protect, allUsers);


module.exports = router;