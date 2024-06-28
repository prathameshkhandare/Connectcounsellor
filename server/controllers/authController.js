
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
        //   let isMatch;
        //   bcrypt.compare(password, hash, function(err, result) {
        //     try {
        //         isMatch = result;
        //         if(!isMatch){
        //             return res.status(400).json({ message: 'Invalid credentials' });
        //         }
        //         res.status(200).json({ message: 'Login successful', user });
        //         //create and store jwt token
        //        if(isEmail){
        //         let token=jwt.sign({ email: emailorphone});
        //         localStorage.setItem('token', token);
        //        }
        //        if(isPhone){
        //         let token=jwt.sign({ phone: emailorphone},process.env.JWT_SECRET);

        //         localStorage.setItem('token', token);
        //        }


        //     } catch (err) {
        //         res.status(400).json({ message: err.message });
        //     }
        // });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
       
        res.status(200).json({ message: 'Login successful', token });

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};





module.exports = { registerController, loginController };