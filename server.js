//* Import express
const express = require('express');

//* create instance for express app
const app = express();

//* config .env
require('dotenv').config();

// import db.js file for database connection
const db = require('./db');

// * Import body-parser
const bodyParser = require('body-parser');
// * Convert jsondata to object and send it to req.body
app.use(bodyParser.json());
//* taking PORT from .env
const PORT = process.env.PORT || 3000;


// import userRouter file
const userRouter = require('./routes/userRoutes');
// use the router
app.use('/user',userRouter);


//* Start the server and listen for connections on the specified port
app.listen(PORT, () => {
  //* Print a message to the console when the server starts
  console.log(`Listening on port ${PORT}`);
});
