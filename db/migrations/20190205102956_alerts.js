
exports.up = function(knex) {
    return knex.schema.createTable('alerts', table => {
      table.increments()
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.integer('location_id').references('id').inTable('locations').onDelete('CASCADE');
      table.integer('route_id').references('id').inTable('routes').onDelete('CASCADE');
      table.string('name').notNullable();
      table.time('alert_time').notNullable().defaultTo('12:00:00');
      table.string('alert_frequency').notNullable().defaultTo('daily');
      table.timestamps(true, true)
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('alerts')
  };
