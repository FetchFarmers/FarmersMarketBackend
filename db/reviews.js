const client = require('./client');

// Get all reviews for a product by product id
async function getAllReviewsByProductId(productId) {
  try {
    const { rows: reviews } = await client.query(`
      SELECT *
      FROM reviews
      WHERE "productId" = $1
      
    `, [productId]);

    return reviews;
  } catch (error) {
    throw error;
  }
}

// Create a new review for a product
async function createReview({ productId, title, details, starRating, userId}) {
  try {
    const { rows: [review] } = await client.query(`
      INSERT INTO reviews ("productId", title, details, "starRating", "userId" )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [ productId, title, details, starRating, userId]);

    return review;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllReviewsByProductId,
  createReview,
};
