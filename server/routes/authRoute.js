const express = require("express");

// const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const {registerController,loginController} = require("../controllers/authController");



router.post('/api/register', registerController);
router.post('/api/login', loginController);



module.exports = router;








