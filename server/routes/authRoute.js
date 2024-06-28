const express = require("express");

// const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const {registerController,loginController,checkLoginStatus,logoutController} = require("../controllers/authController");



router.post('/api/register', registerController);
router.post('/api/login', loginController);
router.get('/api/check-login-status', checkLoginStatus);



module.exports = router;








