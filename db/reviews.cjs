const client = require('./client.cjs');

const createReview = async(score, review_text, user_id, restaurant_id) => {
  try {
    await client.query(`
      INSERT INTO reviews (score, review_text, user_id, restaurant_id)
      VALUES (${score}, '${review_text}', ${user_id}, ${restaurant_id});
    `)
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createReview }