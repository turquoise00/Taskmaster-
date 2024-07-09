
const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del();

  // Hash passwords
  const hashedAdminPassword = await bcrypt.hash('adminpassword', 10); // Hash password with bcrypt
  const hashedUserPassword = await bcrypt.hash('userpassword', 10); // Hash password with bcrypt

  // Insert seed entries with hashed passwords
  await knex('user').insert([
    { ROLE: 'administrator', name: 'Admin User', email: 'admin@example.com', password: hashedAdminPassword },
    { ROLE: 'user', name: 'Regular User', email: 'user@example.com', password: hashedUserPassword }
  ]);

  console.log('Seed data for "user" table inserted successfully');
};
