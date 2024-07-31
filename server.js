//* Import express
const express = require('express');

//* create instance for express app
const app = express();

//* config .env
require('dotenv').config();

// import db.js file for database connection
const db = require('./db');


//* taking PORT from .env
const PORT = process.env.PORT || 3000;

//* Start the server and listen for connections on the specified port
app.listen(PORT, () => {
  //* Print a message to the console when the server starts
  console.log(`Listening on port ${PORT}`);
});
