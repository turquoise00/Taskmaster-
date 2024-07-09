// createDatabase.js

const sequelize = require('./sequelize');

async function createDatabase() {
  try {
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS work_management`);
    console.log('Database "work_management" created or already exists');
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    await sequelize.close();
  }
}

createDatabase();
