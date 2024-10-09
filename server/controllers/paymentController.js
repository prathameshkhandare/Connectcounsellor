const Razorpay = require('razorpay');
const dotenv = require('dotenv');
const crypto = require('crypto');
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


exports.createOrder = async (req, res) => {
    const { amount, receiptId } = req.body;

    const options = {
        amount: amount * 100,
        currency: 'INR',
        receipt: receiptId,
        payment_capture: 1,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json({ orderId: order.id, currency: order.currency, amount: order.amount });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getkey=async(req,res)=>{res.status(200).json({ key:process.env.RAZORPAY_KEY_ID})};


exports.verifyPayment = async (req, res) => {
    const { paymentId, orderId, signature } = req.body;

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

    console.log("Expected Signature:", expectedSignature);
    console.log("Received Signature:", signature);

    // Check if the provided signature matches the expected signature
    if (expectedSignature === signature) {
        // Payment is verified
        res.json({ success: true, message: 'Payment verified successfully' });
    } else {
        // Payment verification failed
        console.error("Signature mismatch:", { expectedSignature, receivedSignature: signature });
        res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
};
