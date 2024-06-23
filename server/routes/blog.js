const express = require('express');
const router = express.Router();
const blogModel = require('../models/blog');

// Route to create a new blog entry
router.get('/api/blog/write', async (req, res) => {
    try {
        const c1 = await blogModel.create({
            title: "“Fight Less, Love More: How to Resolve Marital Conflicts“",
            content: "Resolving marital conflicts involves fostering open communication, active listening, and empathy. Understanding each other's perspectives and emotions can prevent misunderstandings and defensiveness. Practicing patience and compromise enables couples to find mutually agreeable solutions. Setting clear boundaries and respecting each other's needs promotes a healthy balance in relationships. Seeking professional guidance when needed encourages constructive problem-solving and strengthens marital bonds. Cultivating a supportive and nurturing environment enhances emotional intimacy and fosters long-term relationship satisfaction.",
            author: "Dr Prathmesh Khandare Sexiologist",
            image:"https://freshhope1.org/wp-content/uploads/2021/08/3-misconceptions-about-love.jpg"
        });
        
        res.send(`data saved successfully: ${c1}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




// A sample route to verify the setup

router.get('/api/blog/read', async (req, res) => {
    try {
        const blogs = await blogModel.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/api/blog/delete', async (req, res) => {
    try {
        const blogs = await blogModel.deleteMany({});
        // res.status(200).json(blogs);
        res.send("done")
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});













module.exports = router;
