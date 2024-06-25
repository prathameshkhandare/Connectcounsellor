const express = require('express');

const router = express.Router();
const coursesModel = require('../models/courses');

router.get('/api/courses/write', async (req, res) => {
    try {
        const c1 = await coursesModel.create({
            name: "Effective Stress Management",
            image: "https://res.cloudinary.com/ekincare/image/upload/v1661780677/ac6yr6mfjsdc4d4yvetj.png", // Example image URL
            shortdescription: "Learn effective strategies for managing stress and anxiety",
            description: "This comprehensive course is designed to help you effectively manage stress and anxiety in your daily life. Whether you're dealing with work-related stress, academic pressures, or personal challenges, this course offers practical techniques and proven strategies to enhance your emotional well-being and resilience. Through a combination of theoretical insights and hands-on exercises, you'll gain valuable skills in stress reduction, emotional regulation, and mindfulness practices.",
            content: [
                "Understanding the science of stress",
                "Identifying stress triggers and symptoms",
                "Practical relaxation techniques (e.g., progressive muscle relaxation, deep breathing)",
                "Cognitive-behavioral strategies for stress management",
                "Mindfulness meditation practices",
                "Building resilience and coping mechanisms",
                "Effective communication and assertiveness training"
            ],
            category: "emotional therapy"
        });
        
        res.send(`data saved successfully${c1}`)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/api/courses/read', async (req, res) => {
    try {
        const courses = await coursesModel.find();
       res.send(courses)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/api/courses/read/:id', async (req, res) => {
    try {
        const courses = await coursesModel.findOne({_id:req.params.id});
       res.send(courses)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




module.exports = router;