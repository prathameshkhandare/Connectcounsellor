const express = require("express");

// const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const {registerController,loginController,checkLoginStatus, getUserDetails} = require("../controllers/authController");



router.post('/api/register', registerController);
router.post('/api/login', loginController);
router.get('/api/check-login-status', checkLoginStatus);
router.get('/api/userdetails', getUserDetails);



module.exports = router;








