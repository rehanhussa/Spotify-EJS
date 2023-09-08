const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

router.get('/', reviewsController.getAllReviews);
router.post('/album/:id', reviewsController.createReview);
router.get('/:id', reviewsController.getReviewById);
router.put('/:id', reviewsController.updateReview);
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;
