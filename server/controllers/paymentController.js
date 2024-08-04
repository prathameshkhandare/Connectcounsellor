const Razorpay = require('razorpay');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a payment order
exports.createOrder = async (req, res) => {
    const { amount, receiptId } = req.body;

    const options = {
        amount: amount * 100, // Amount is in currency subunits (1 INR = 100 paise)
        currency: 'INR',
        receipt: receiptId,
        payment_capture: 1, // Automatically capture payment
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json({ orderId: order.id, currency: order.currency, amount: order.amount });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Verify payment (example)
exports.verifyPayment = async (req, res) => {
    const { paymentId, orderId } = req.body;

    // Here you would add logic to verify the payment
    // For example, you could call Razorpay's verifyPayment method
    // This is just a placeholder, implement your own logic here
};
