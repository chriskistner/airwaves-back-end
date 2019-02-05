
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(() => knex('locations').del())
    .then(() => knex('routes').del())
    .then(() => knex('alerts').del())
};
