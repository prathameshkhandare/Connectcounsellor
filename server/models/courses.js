const mongoose = require('mongoose');

const coursesSchema =mongoose.Schema({
    name: String,
    image :String,
    shortdescription: String,
    description: String,
    content:[String],
    category:   String,
    
});

const Course = mongoose.model('Course', coursesSchema);
module.exports = Course;