const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER USER
const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;


        // CHECK USER EXISTS
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }


        // HASH PASSWORD
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);


        // CREATE USER
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });


        await newUser.save();

        res.status(201).json({
            message: "User Registered Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Registration Failed"
        });

    }
};

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;


        // CHECK USER
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }


        // CHECK PASSWORD
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }


        // GENERATE TOKEN
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            "secretkey",
            {
                expiresIn: "7d"
            }
        );


        res.status(200).json({
            message: "Login Successful",
            token
        });

    } catch (error) {

        res.status(500).json({
            message: "Login Failed"
        });

    }
};


module.exports = {
    registerUser,
    loginUser
};