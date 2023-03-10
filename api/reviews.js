const express = require('express');
const { requireUser, requireAdmin } = require('./utils');
const reviewsRouter = express.Router();

const { 
  getAllReviewsByProductId,
  createReview,
} = require('../db');

// Get all reviews for a product by product id
reviewsRouter.get('/:productId/reviews', async (req, res, next) => {
  const { productId } = req.params;

  try {
    const reviews = await getAllReviewsByProductId(productId);
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

// Create a new review for a product
reviewsRouter.post('/:productId/reviews', requireUser, async (req, res, next) => {
  const { productId } = req.params;
  const { title, details, starRating } = req.body;
  const { user } = req;

  try {
    const review = await createReview( { productId, userId: user.id, title, details, starRating  });
    res.send(review);
  } catch (error) {
    next(error);
  }
});

module.exports = reviewsRouter;

