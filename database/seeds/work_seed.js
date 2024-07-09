// 01_work_seed.js

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('work').del()
    .then(function () {
      // Inserts seed entries
      return knex('work').insert([
        { title: 'Project A', description: 'Description of Project A' },
        { title: 'Project B', description: 'Description of Project B' }
      ]);
    })
    .then(function() {
      console.log('Seed data for "work" table inserted successfully');
    })
    .catch(function(error) {
      console.error('Error seeding "work" table:', error);
    });
};
