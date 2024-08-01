//* Import the mongoose library
const mongoose = require('mongoose');
// * import bcrypt to hash the password and then save it to the database
const bcrypt = require('bcrypt');

//* Define  schema for the 'user' collection
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    aadharCardNumber: {
        type: Number,
        required: true,
        unqiue: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['voter', 'admin'],
        default: 'voter'
    },
    isVoted: {
        type: Boolean,
        default: false
    }
});

//* Create a model using the schema and name it 'Person'
const User = mongoose.model('User', userSchema);
//* Export the model so it can be used in other parts of the application
module.exports = User;
