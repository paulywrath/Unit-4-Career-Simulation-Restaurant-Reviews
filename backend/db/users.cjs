const client = require('./client.cjs');
const bcrypt = require('bcrypt');

const createUser = async(username, password) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  
  try {
    await client.query(`
      INSERT INTO users (username, password)
      VALUES ('${username}', '${encryptedPassword}');
    `)
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createUser }