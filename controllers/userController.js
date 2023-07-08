const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//desc Register a user
//post /api/users/register
//access public
const registerUser = asyncHandler(async (req, res) =>{
    const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
    res.json({Message : "Register the user"});
});

//desc Login user
//post /api/users/login
//access public
const loginUser = asyncHandler(async (req, res) =>{
    res.json({Message : "Login user"});
});

//desc Curent user info
//post /api/users/current
//access private
const currentUser = asyncHandler(async (req, res) =>{
    res.json({Message : "Current user information"});
});

module.exports = { registerUser, loginUser, currentUser}