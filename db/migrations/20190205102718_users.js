
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
      table.increments();
      table.string('user_id').notNullable().unique();
      table.string('user_name').notNullable().unique();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('address').notNullable();
      table.string('city').notNullable();
      table.string('state', 2).notNullable();
      table.decimal('home_longitude', null).notNullable();
      table.decimal('home_latitude', null).notNullable();
      table.timestamps(true, true)
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users')
  };