const client = require('./client.cjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async(username, password) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  
  try {
    const { rows: [ user ] } = await client.query(`
      INSERT INTO users (username, password)
      VALUES ('${username}', '${encryptedPassword}')
      RETURNING *;
    `)

    const assignedToken = jwt.sign({ userID: user.id }, process.env.JWT_SECRET);
    return assignedToken;
  } catch (error) {
    throw error;
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
      const assignedToken = await jwt.sign({ userID: user.id }, process.env.JWT_SECRET);
      return assignedToken;
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