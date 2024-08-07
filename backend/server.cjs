const client = require('./db/client.cjs');
const express = require('express');
const app = express();
const { getAllRestaurants, getSpecificRestaurant } = require('./db/restaurants.cjs');
const { getReviewsForRestaurant, getAvgScoreForRestaurant } = require('./db/reviews.cjs');
const { getUser } = require('./db/users.cjs');

client.connect();
app.use(express.json());

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

app.post('/api/v1/login', async(req, res, next) => {
  try {
    const { username, password } = req.body;
    const signedIn = await getUser(username, password);
    res.send(signedIn);
  } catch (error) {
    next(error);
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));