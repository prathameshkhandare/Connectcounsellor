const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Blog = new mongoose.model("Blog", blogSchema);

module.exports = Blog ;
