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

const getReviewsForRestaurant = async(restaurant_id) => {
  try {
    const { rows } = await client.query(`
        SELECT score, review_text FROM reviews 
        WHERE restaurant_id=${restaurant_id};
      `)
    return rows;
  } catch (error) {
    return(error);
  }
}

const getAvgScoreForRestaurant = async(restaurant_id) => {
  try {
    const { rows } = await client.query(`SELECT score FROM reviews WHERE restaurant_id=${restaurant_id};`)
    
    const scoreTotal = rows.reduce((accumulator, currentScore) => {
      return accumulator += currentScore.score;
    }, 0)

    return scoreTotal / rows.length;
  } catch (error) {
    return(error);
  }
}

module.exports = { createReview, getReviewsForRestaurant, getAvgScoreForRestaurant }