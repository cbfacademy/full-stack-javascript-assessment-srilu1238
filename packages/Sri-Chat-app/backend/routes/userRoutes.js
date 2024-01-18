const express = require(`express`);
const { registerUser, authUser, allUsers } = require("../controllers/userControllers");
const { protect } = require("../middleware/authhandler");
const router = express.Router();


//Creating routes to the endpoint.
router.route('/').post(registerUser); //uses userModel to register
router.post('/login', authUser); //uses userModel to login
router.route('/').get(protect, allUsers); //uses userModel to search users.


module.exports = router;