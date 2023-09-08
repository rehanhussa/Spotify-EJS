const express = require('express');
const router = express.Router();
const Review = require('../models/review');

// Create a new review
router.post('/reviews', async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).send(review);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all reviews
router.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find({});
        res.send(reviews);
    } catch (error) {
        res.status(500).send();
    }
});

// Get a specific review by ID
router.get('/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).send();
        }
        res.send(review);
    } catch (error) {
        res.status(500).send();
    }
});

// Update a review by ID
router.patch('/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!review) {
            return res.status(404).send();
        }
        res.send(review);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a review by ID
router.delete('/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).send();
        }
        res.send(review);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;
