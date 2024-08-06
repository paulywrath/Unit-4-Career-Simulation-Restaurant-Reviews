const client = require('./client.cjs');

const dropTables = async() => {
  try {
    await client.query(`DROP TABLE IF EXISTS restaurants;`)
  } catch (error) {
    console.log(error);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE restaurants (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        cuisine_type VARCHAR(30) NOT NULL 
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

  await client.end();
  console.log(`disconnected`);
}

syncAndSeed();