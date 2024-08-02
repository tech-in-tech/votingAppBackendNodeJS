// ! creating routes for user using express.js
// import express
const express = require('express')
// create router using express.router function
const router = express.Router();

// Import userModel  
const User = require('../models/userModel');
const { use } = require('passport');
const { generateToken } = require('../../HMS2/jwt');

// creating signup route
router.post('/signup', async (req, res) => {
  try {
    // extract the data from req.body
    const data = req.body;
    // create newUser of type User and add data in it
    const newUser = new User(data);
    // save the newUser to database 
    const response = await newUser.save();
    // log the message
    console.log("userdata save successfully");
    res.status(200).json(response);

  } catch (error) {
    console.log(`Error in post /signup :: ${error}`)
    res.status(500).json({ error: "Error in /signup" });
  }
})


// * Login route
router.post("/login", async (req, res) => {
  try {
    // Extract aadharCardNumber and password from request body
    const { aadharCardNumber, password } = req.body;

    // check if aadharCardNumber or password is missing
    if (!aadharCardNumber || !password) {
      return res.status(400).json({ error: "Aadhar card number or password is missing" });
    }

    // find the user by aadharcard number;
    const user = await User.findOne({ aadharCardNumber: aadharCardNumber });
    // if user does not exist or password does not match return error
    if (!user ||!(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid Aadhar Card Number or Password' });
    }
    // generate Token
    const payload = {
      id: user.id,
    }
    const token = generateToken(payload);
    res.json({token});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})









// export router
module.exports = router;