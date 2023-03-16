const mongoose = require('mongoose');
const reviewSchema = require('./review.js')

const courseSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    difficulty: String,
    price: Number,
    city: { type: String, required: true },
    state: { type: String, maxLength: 2, required: true },
    photo: { type: String, required: true },
    description: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now },
    isFeatured: Boolean,

        review: [reviewSchema]
});

module.exports = mongoose.model('Course', courseSchema);
