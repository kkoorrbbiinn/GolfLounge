const mongoose = require('mongoose');

const creationSchema = new mongoose.Schema({
  creatorName: {
    type: String,
    required: true
  },
  creatorEmail: {
    type: String,
    required: true
  },
  creatorPhone: {
    type: String,
    required: true
  },
  createdCourses: {
    type: Number,
    min: 0,
    default: 0
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = creationSchema;
