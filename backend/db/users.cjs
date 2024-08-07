const client = require('./client.cjs');

const createUser = async(username, password) => {
  try {
    await client.query(`
      INSERT INTO users (username, password)
      VALUES ('${username}', '${password}');
    `)
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createUser }