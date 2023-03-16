const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewerName: {
    type: String,
    required: true
  },
  reviewerEmail: {
    type: String,
    required: true
  },
  reviewerPhone: {
    type: String,
    required: true
  },
  reviewedCourses: {
    type: Number,
    min: 0,
    default: 0
  },
  reviewDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = reviewSchema;
