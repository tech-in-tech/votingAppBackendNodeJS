// Import mongoose liberary
const mongoose = require('mongoose')

// define schema for candidate
const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  party: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  votes: [
    {
      user: {
        //* Id provided by mongoDB
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      votedAt: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  voteCount: {
    type: Number,
    default: 0
  }
})

const Candidate = mongoose.model('Candidate',candidateSchema);
module.exports = candidateSchema;    