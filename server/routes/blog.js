const express = require('express');
const router = express.Router();
const blogModel = require('../models/blog');

// Route to create a new blog entry
router.get('/api/blog/write', async (req, res) => {
    try {
        const c1 = await blogModel.create({
            title: "bhavesh ki shadi",
            content: "shadi me drama",
            author: "prathmeshkhandare",
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

module.exports = router;
