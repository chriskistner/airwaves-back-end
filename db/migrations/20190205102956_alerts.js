
exports.up = function(knex) {
    return knex.schema.createTable('alerts', table => {
      table.increments()
      table.string('user_id').references('user_id').inTable('users').onDelete('CASCADE');
      table.string('type').notNullable();
      table.decimal('longitude', null);
      table.decimal('latitude', null);
      table.string('polyline');
      table.string('name').notNullable();
      table.string('alert_frequency').notNullable().defaultTo('daily');
      table.timestamps(true, true)
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('alerts')
  };
