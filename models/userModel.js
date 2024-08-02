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


// Pre-save hook to hash the password before saving a new user or updating an existing user's password
userSchema.pre('save', async function (next) {
    const person = this;    // Reference to the current person document

    // If the password field hasn't been modified, skip hashing and proceed to the next middleware
    if (!person.isModified('password')) return next();
    try {
        // Generate a salt with 10 rounds
        const salt = await bcrypt.genSalt(10);
        // Hash the password using the generated salt
        const hashedPassword = await bcrypt.hash(person.password, salt);
        // Replace the plain password with the hashed password
        person.password = hashedPassword;
        // Proceed to the next middleware
        next();
    } catch (error) {
        // Pass any errors to the next middleware
        return next(error);
    }
})



// Method to compare a candidate password with the stored hashed password
userSchema.methods.comparePassword = async (candidatePassword) => {
    try {
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw err;
    }
}




//* Create a model using the schema and name it 'Person'
const User = mongoose.model('User', userSchema);
//* Export the model so it can be used in other parts of the application
module.exports = User;
