const express = require('express');
require('dotenv').config();

const cors = require('cors');
const path = require('path');
const connectDB = require('./config/dbconfig');

const coursesRoute = require('./routes/courses');
const app = express();
const port = process.env.PORT || 3000;

const BlogRoute = require('./routes/blog');
const authRoute = require('./routes/authRoute');
// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
connectDB();
app.use(BlogRoute);
app.use(coursesRoute);
app.use(authRoute);


app.listen(port, () => console.log(`Server listening on port ${port}!`));
