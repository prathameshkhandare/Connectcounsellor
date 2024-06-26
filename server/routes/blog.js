const express = require('express');
const router = express.Router();
const blogModel = require('../models/blog');

// Route to create a new blog entry

    router.post('/api/blog/write', async (req, res) => {
        try {
        const blog= await blogModel.create({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            image: req.body.image,
        });
      
      
          
          res.status(201).json(blog);
        } catch (error) {
          res.status(400).json({ message: error.message });
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
router.get('/api/blog/read/:id', async (req, res) => {
    try {
        id=req.params.id;
        const blogs = await blogModel.findOne({_id:id});
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// router.get('/api/blog/delete', async (req, res) => {
//     try {
//         const blogs = await blogModel.deleteMany({});
//         // res.status(200).json(blogs);
//         res.send("done")
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// for deleting one
router.delete('/api/blog/delete/:id', async (req, res) => {
    try {
        id=req.params.id;
        const blog = await blogModel.deleteOne({_id:id});
        if(!blog){
            return res.status(404).send({ message: 'Blog not found' });
        }
        
      
res.status(200).json({ message: 'Blog deleted successfully' });

        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});













module.exports = router;
