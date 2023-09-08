const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    content: String,
    rating: Number,
    author: String, // or an ObjectId if linked to a user model
    // any other fields you want
});

module.exports = mongoose.model('Review', reviewSchema);
