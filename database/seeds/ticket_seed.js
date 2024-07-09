

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ticket').del()
    .then(function () {
      // Inserts seed entries
      return knex('ticket').insert([
        { status: 'Open', worktobedone: 'Task 1' },
        { status: 'Closed', worktobedone: 'Task 2' }
      ]);
    })
    .then(function() {
      console.log('Seed data for "ticket" table inserted successfully');
    })
    .catch(function(error) {
      console.error('Error seeding "ticket" table:', error);
    });
};
