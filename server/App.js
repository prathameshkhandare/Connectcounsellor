const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/dbconfig');

const courses = require('./routes/courses');
const app = express();
const port = process.env.PORT || 3000;

const BlogRoute = require('./routes/blog');

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
connectDB();
app.use('/api',courses);
app.use('/api/courses',courses);
// app.use('/api/blgread',BlogRoute);
// app.use('/api/blgread/read',BlogRoute);
// app.use('/api/blogs',BlogRoute);
// app.use('/api/blog',BlogRoute);
app.use('/api/blog', BlogRoute);
app.use('/api/blog/read', BlogRoute);
app.use('/api/blog/blogs', BlogRoute);


app.get('/blogs', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
