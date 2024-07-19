const express = require("express");
const router = express.Router();

const {registerUser, loginUser, currentUser} = require('../controllers/userController')

router.post("/register",registerUser).post("/login",loginUser).get("/current", currentUser)

module.exports = router