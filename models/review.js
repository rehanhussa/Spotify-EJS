const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
