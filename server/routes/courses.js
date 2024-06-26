const express = require('express');

const router = express.Router();
const coursesModel = require('../models/courses');

router.post('/api/courses/write', async (req, res) => {
    try {
   const course = await coursesModel.create({
    name: req.body.name,
    image: req.body.image,
    shortdescription: req.body.shortdescription,
    description: req.body.description,
    content: req.body.content,
    category: req.body.category
   }) 


 
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
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