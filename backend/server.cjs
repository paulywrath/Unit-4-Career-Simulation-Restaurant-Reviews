const client = require('./db/client.cjs');
const express = require('express');
const app = express();
const { getAllRestaurants } = require('./db/restaurants.cjs');

client.connect();

app.get('/api/v1/allrestaurants', async(req, res, next) => {
  try {
    const allRestaurants = await getAllRestaurants();
    res.send(allRestaurants);
  } catch (error) {
    next(error);
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));