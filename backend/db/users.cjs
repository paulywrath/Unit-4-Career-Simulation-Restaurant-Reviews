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

const getUser = async(username, password) => {
  try {
    const { rows: [ user ] } = await client.query(`
      SELECT * FROM users 
      WHERE username='${username}';
    `)
    
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if(user && isPasswordMatch) {
      return (`yes, you can log in`);
    } else {
      const error = new Error(`bad credentials`);
      error.status = 401;
      throw error;
    }

  } catch (error) {
    throw error;
  }
}

module.exports = { createUser, getUser }