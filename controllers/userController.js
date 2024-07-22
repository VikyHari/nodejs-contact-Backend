const asyncHandler = require("express-async-handler");
const User = require("../models/userModal")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const Contact = require("../models/contactModel")

const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const userAvailabel = await User.findOne({ email: email });

    console.log("2");
    if (userAvailabel) {
        res.status(400);
        throw new Error('User already registered');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password", hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`user created ${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400);
        throw new Error("user data is not valid")
    }

    const resposne = await User(req.body);

    await resposne.save();

    res.json({ message: " Register the user" });
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("all fields are required");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        )
        res.status(200).json({ accessToken })
    } else {
        res.status(401)
        throw new Error (" email or password is not valid")
    }
});

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
})

module.exports = { registerUser, loginUser, currentUser }
