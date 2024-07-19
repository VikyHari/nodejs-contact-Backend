const asyncHandler = require("express-async-handler");
const User = require("../models/userModal")
const bcrypt = require("bcrypt");

// const Contact = require("../models/contactModel")

const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }

    const userAvailabel = await User.findOne({email:email});

    console.log("2");
    if(userAvailabel) {
        res.status(400);
        throw new Error('User already registered');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password", hashedPassword);

    const resposne=await User(req.body);

    await resposne.save();

    res.json({ message: " Register the user" });
})

const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: " Login user" });
})

const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: " Current user" });
})

module.exports = { registerUser, loginUser, currentUser }
