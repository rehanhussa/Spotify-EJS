const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    content: String,
    rating: Number,
    albumId: String
});

module.exports = mongoose.model('Review', reviewSchema);
