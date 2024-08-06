const { Client } = require('pg');
const client = new Client('postgres://localhost:5432/restaurant_reviews');

module.exports = client;