

exports.up = function(knex) {
    return knex.schema.createTable('work', function(table) {
      table.increments('work_id').primary();
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('work');
  };
  