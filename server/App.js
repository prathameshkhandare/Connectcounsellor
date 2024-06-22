const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/dbconfig');

const coursesRoute = require('./routes/courses');
const app = express();
const port = process.env.PORT || 3000;

const BlogRoute = require('./routes/blog');

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
connectDB();
app.use(BlogRoute);
app.use(coursesRoute)


app.get('/blogs', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
