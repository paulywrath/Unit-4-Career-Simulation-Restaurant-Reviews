const client = require('./db/client.cjs');
const express = require('express');
const app = express();
const { getAllRestaurants, getSpecificRestaurant } = require('./db/restaurants.cjs');
const { getReviewsForRestaurant, getAvgScoreForRestaurant } = require('./db/reviews.cjs');

client.connect();

app.get('/api/v1/restaurants', async(req, res, next) => {
  try {
    const allRestaurants = await getAllRestaurants();
    res.send(allRestaurants);
  } catch (error) {
    next(error);
  }
})

app.get('/api/v1/restaurants/:id', async(req, res, next) => {
  try {
    const { id } = req.params;
    
    const restaurantDetails = await getSpecificRestaurant(id);

    restaurantDetails.reviews  = await getReviewsForRestaurant(id);
    
    restaurantDetails.avgScore = await getAvgScoreForRestaurant(id);
    
    res.send(restaurantDetails);
  } catch (error) {
    next(error);
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));