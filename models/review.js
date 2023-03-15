const mongoose = require('mongoose');
const creationSchema = require('./creation.js')

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    title: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now },
    review: { type: String, required: true },

        creations: [creationSchema]
});

module.exports = mongoose.model('Review', reviewSchema);