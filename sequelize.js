// sequelize.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASS || '',
});

module.exports = sequelize;
