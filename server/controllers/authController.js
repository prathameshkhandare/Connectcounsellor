
const bcrypt = require('bcrypt')
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')
// Register new user
const registerController = async function (req, res) {

    const { username, phone, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }



        bcrypt.genSalt(10, async function (err, salt) {
            await bcrypt.hash(password, salt, async function (err, hash) {
                user = await userModel.create({
                    username,
                    phone,
                    email,
                    password: hash,
                });
            });
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

//for login 

const loginController = async (req, res) => {
    const { emailorphone, password } = req.body;

    try {
        console.log(process.env.JWT_SECRET);

        // Determine if emailorphone is an email or phone
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailorphone);
        const isPhone = /^\d{10}$/.test(emailorphone); // Adjust this regex based on your phone format

        let user;
        if (isEmail) {
            user = await userModel.findOne({ email: emailorphone });
        } else if (isPhone) {
            user = await userModel.findOne({ phone: emailorphone });
        } else {
            return res.status(400).json({ message: 'invalid credentials' });
        }

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
      
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
       
        res.status(200).json({ message: 'Login successful', token });

    
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};




// for authentication after login 




// controllers/authController.js


const checkLoginStatus = async (req, res) => {
    try {
      let token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token
  
      // Check if token is in the request body (for local storage scenario)
      if (!token && req.body.token) {
        token = req.body.token;
      }
  
      if (!token) {
        return res.status(401).json({ isLoggedIn: false });
      }
  
      // Verify token
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(403).json({ isLoggedIn: false });
        }
  
        // Token is valid, now check if user exists or fetch user details
        const user = await userModel.findById(decoded.id).select('-password');
  
        if (!user) {
          return res.status(404).json({ isLoggedIn: false });
        }
  
        // If needed, you can send back user details
        res.status(200).json({ isLoggedIn: true, user });
      });
    } catch (error) {
      console.error('Error checking login status:', error);
      res.status(500).json({ isLoggedIn: false, error: 'Server error' });
    }
  };




module.exports = { registerController, loginController ,checkLoginStatus};