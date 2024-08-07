const client = require('./client.cjs');
const { createRestaurant } = require('./restaurants.cjs');
const { createUser } = require('./users.cjs');
const { createReview } = require('./reviews.cjs');

const dropTables = async() => {
  try {
    await client.query(`DROP TABLE IF EXISTS reviews, restaurants, users;`)
  } catch (error) {
    console.log(error);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(30) NOT NULL UNIQUE,
        password VARCHAR(50) NOT NULL
        );

      CREATE TABLE restaurants (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        cuisine_type VARCHAR(30) NOT NULL
        );
          
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        score SMALLINT NOT NULL,
        review_text TEXT,
        created_at DATE DEFAULT CURRENT_DATE NOT NULL,
        edited_at DATE,
        user_id INTEGER REFERENCES users(id),
        restaurant_id INTEGER REFERENCES restaurants(id),
        UNIQUE (user_id, restaurant_id)
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

  await createReview(5, null, 1, 1);
  await createReview(1, null, 2, 1);
  await createReview(5, `Great!`, 2, 2);
  await createReview(5, `Great!`, 2, 3);
  console.log(`created reviews`);

  await client.end();
  console.log(`disconnected`);
}

syncAndSeed();