const Review = require('../models/review');

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.createReview = async (req, res) => {
    try {
        const albumId = req.params.id;

        const reviewData = {
            albumId,
            content: req.body.content,
            rating: req.body.rating
        }

        const review = new Review(reviewData);
        await review.save();

        res.redirect(`/tracks/${albumId}`);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.body.id);
        if (!review) return res.status(404).send();
        res.json(review);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.updateReview = async (req, res) => {
    const { id, albumId } = req.params;
    const { content, rating } = req.body;

    try {
        const review = await Review.findByIdAndUpdate(id, { content, rating }, { new: true });
        if (!review) return res.status(404).send();
        res.redirect(`/tracks/${albumId}`);
    } catch (err) {
        res.status(500).send(err);
    }
};


exports.deleteReview = async (req, res) => {
    try {
        const { id, albumId } = req.params;

        const review = await Review.findByIdAndDelete(id);
        if (!review) return res.status(404).send();
        res.redirect(`/tracks/${albumId}`);
    } catch (err) {
        res.status(500).send(err);
    }
};
