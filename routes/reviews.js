const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

router.get('/', reviewsController.getAllReviews);
router.post('/album/:id', reviewsController.createReview);
router.get('/:id', reviewsController.getReviewById);
router.put('/:id/album/:albumId', reviewsController.updateReview);
router.delete('/:id/album/:albumId', reviewsController.deleteReview);

module.exports = router;
