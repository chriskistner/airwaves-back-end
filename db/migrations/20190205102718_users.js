
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
      table.increments();
      table.string('user_id').notNullable().unique();
      table.string('user_name').notNullable().unique();
      table.string('password').notNullable();
      table.integer('zip_code').notNullable()
      table.timestamps(true, true)
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users')
  };