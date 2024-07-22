const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config();

const cors = require('cors');
const path = require('path');
const connectDB = require('./Util/dbconfig');

const coursesRoute = require('./routes/courses');
const app = express();
const port = process.env.PORT || 3000;

const BlogRoute = require('./routes/blog');
const authRoute = require('./routes/authRoute');
const appointmentRoutes = require('./routes/Appointment');
<<<<<<< HEAD
const UserprofileRoutes = require('./routes/UserProfile')
=======
const UserprofileRoutes = require('./routes/UserProfile');
const accountsettingRoute = require('./routes/Acountsetting')
>>>>>>> f7099e7347961f85881d7a34540d4d4db34eee91
// const {authenticateToken} = require('./middleware/authenticate'); 
// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
connectDB();
app.use(BlogRoute);
app.use(coursesRoute);
app.use(authRoute);
app.use(appointmentRoutes);
app.use(UserprofileRoutes);
app.use(accountsettingRoute)


app.listen(port, () => console.log(`Server listening on port ${port}!`));
