const express = require('express');
const router = express.Router();
const blogModel = require('../models/blog');

// Route to create a new blog entry
router.get('/api/blog/write', async (req, res) => {
    try {
        const c1 = await blogModel.create({
            title: "LEARNING DSA ",
            content: "dsA IS one of the msot improtant thing in the wolrd of compter engineering and software",
            author: "prathmesh khandare",
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS2-4iP4fkzLwwz3PhiHbeJopErb2P2V56iQ&s"
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
