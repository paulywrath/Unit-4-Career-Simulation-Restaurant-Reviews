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

module.exports = { createRestaurant }