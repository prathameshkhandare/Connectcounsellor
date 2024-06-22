const express = require('express');

const router = express.Router();
const coursesModel = require('../models/courses');

router.get('/', async (req, res) => {
    try {
        const c1 = await coursesModel.create({
            name: "Mind Therapy",
            image: "",
            shortdescription: "This is the world's best course",
            description: "This is the mind therapy course. Lorem ipsum dolor sit amet.",
        });
        res.send(`data saved successfully${c1}`)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/courses', async (req, res) => {
    try {
        const courses = await coursesModel.find();
       res.send(courses)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;