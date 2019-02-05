exports.up = function(knex) {
    return knex.schema.createTable('locations', table => {
      table.increments()
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.string('name').notNullable();
      table.decimal('longitude', 5, 2).notNullable();
      table.decimal('latitude', 5, 2).notNullable();
      table.text('description').defaultTo('No description given.')
      table.timestamps(true, true)
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('locations')
  };
