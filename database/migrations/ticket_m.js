// YYYYMMDDHHMMSS_create_ticket_table.js

exports.up = function(knex) {
    return knex.schema.createTable('ticket', function(table) {
      table.increments('ticket_id').primary();
      table.string('status').notNullable();
      table.text('worktobedone').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('ticket');
  };
  