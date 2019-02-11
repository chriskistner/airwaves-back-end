exports.up = function(knex) {
    return knex.schema.createTable('locations', table => {
      table.increments()
      table.string('user').references('user_id').inTable('users');
      table.string('name').notNullable();
      table.decimal('longitude', null).notNullable();
      table.decimal('latitude', null).notNullable();
      table.timestamps(true, true)
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('locations')
  };
