const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  
    },
    image: String,
    shortdescription: String,
    description: String,
    content: [String],
    category: String,
    price: {
        type: Number,
        default: 1200,
    },
    author: {
        type: String,
        required: true, 
    },
    youtubeLink: {
        type: String,
        required: true,  
    }
});

const Course = mongoose.model('Course', coursesSchema);
module.exports = Course;
