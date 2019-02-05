
exports.up = function(knex) {
    return knex.schema.createTable('routes', table => {
      table.increments()
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.string('name').notNullable();
      table.string('polyline').notNullable();
      table.string('levels').notNullable();
      table.timestamps(true, true)
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('routes')
  };