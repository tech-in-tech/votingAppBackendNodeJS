// ! creating routes for user using express.js
// import express
const express = require('express')
// create router using express.router function
const router = express.Router();

// Import userModel  
const User = require('../models/userModel')

// creating signup route
router.post('/signup',async (req,res)=>{
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
    res.status(500).json({error:"Error in /signup"});
  }
})










// export router
module.exports = router;