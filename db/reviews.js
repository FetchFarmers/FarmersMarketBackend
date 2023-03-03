const client = require('./client');

// Get all reviews for a product by product id
async function getAllReviewsByProductId(productId) {
  try {
    const { rows: reviews } = await client.query(`
      SELECT *
      FROM reviews
      WHERE product_id = $1
      ORDER BY created_at DESC
    `, [productId]);

    return reviews;
  } catch (error) {
    throw error;
  }
}

// Create a new review for a product
async function createReview(productId, { title, content, rating, reviewerId }) {
  try {
    const { rows: [review] } = await client.query(`
      INSERT INTO reviews (product_id, title, content, rating, reviewer_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [productId, title, content, rating, reviewerId]);

    return review;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllReviewsByProductId,
  createReview,
};
