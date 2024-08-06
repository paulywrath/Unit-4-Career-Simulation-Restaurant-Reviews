const client = require('./client.cjs');
const { createRestaurant } = require('./restaurants.cjs');
const { createUser } = require('./users.cjs');

const dropTables = async() => {
  try {
    await client.query(`DROP TABLE IF EXISTS restaurants, users, reviews;`)
  } catch (error) {
    console.log(error);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        score SMALLINT NOT NULL,
        review_text TEXT,
        created_at DATE DEFAULT CURRENT_DATE NOT NULL,
        edited_at DATE,
        user_id_and_restaurant_id INTEGER NOT NULL UNIQUE
      );

      CREATE TABLE restaurants (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        cuisine_type VARCHAR(30) NOT NULL,
        review_id INTEGER REFERENCES reviews(id)
      );

      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(30) NOT NULL UNIQUE,
        password VARCHAR(50) NOT NULL,
        review_id INTEGER REFERENCES reviews(id)
      );
    `)
  } catch (error) {
    console.log(error);
  }
}

const syncAndSeed = async() => {
  await client.connect();
  console.log(`connected`);

  await dropTables();
  console.log(`dropped tables`)

  await createTables();
  console.log(`created tables`);

  await createRestaurant(`Trini Girl`, `Trinidadian`);
  await createRestaurant(`El Jeffe`, `Mexican`);
  await createRestaurant(`Wing Cheong`, `Chinese`);
  await createRestaurant(`Akara House`, `Nigerian`);
  await createRestaurant(`Brooklyn Pizza Crew`, `Pizzeria`);
  console.log(`created restaurants`);

  await createUser(`user1`, `password1`);
  await createUser(`user2`, `password1`);
  console.log(`created users`);

  await client.end();
  console.log(`disconnected`);
}

syncAndSeed();