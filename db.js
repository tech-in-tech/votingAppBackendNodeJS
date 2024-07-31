// ! Connecting MongoDB database to NodeJS

// * Import mongoose library
const mongoose = require('mongoose');

//* config .env 
require('dotenv').config();

// * fetch mongodb url from .env file
const MONGODB_URL = process.env.MONGODB_URL_LOCAL;

// * setup mongodb Connecting
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,   // *Use the new URL parser instead of the deprecated one
  useUnifiedTopology: true   // *Use the new server discovery and monitoring engine
})

//* Get the default connection
//* Mongoose maintains a default connection object representing MongoDB connection
const db = mongoose.connection;


// * define event listener for database connection
db.on('connected', () => {
  console.log("connected to MongoDB server");
})

// * event listner for if database is disconnected 
db.on('error', (err) => {
  console.log("MongoDB connection ERROR :: ", err)
})


// * event listner for any error while connection to database
db.on('disconnected', () => {
  console.log("MongoDB disconnected");
})


// * Export the database connection
module.exports = db;




