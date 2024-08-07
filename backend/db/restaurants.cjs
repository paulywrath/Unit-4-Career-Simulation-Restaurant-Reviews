const client = require('./client.cjs');

const createRestaurant = async(name, cuisine_type) => {
  try {
    await client.query (`
      INSERT INTO restaurants (name, cuisine_type)
      VALUES ('${name}', '${cuisine_type}');
    `)
  } catch (error) {
    console.log(error);
  }
}

const getAllRestaurants = async() => {
  try {
    const { rows } = await client.query(`SELECT name, cuisine_type FROM restaurants;`)
    return rows;
  } catch (error) {
    return(error);
  }
}

module.exports = { createRestaurant, getAllRestaurants }