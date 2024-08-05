const express = require("express");

// const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const { createOrder, verifyPayment } = require('../controllers/paymentController');
// Create payment order
router.post('/api/create', createOrder);

// Verify payment
router.post('/api/verify', verifyPayment);

module.exports = router;