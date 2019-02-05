
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('locations').del()
    .then(function () {
      // Inserts seed entries
      return knex('locations').insert([
        {
          id: 1,
          user_id: 1,
          name: 'Home',
          longitude: -122.1890,
          latitude: 47.29102
        },
        {
          id: 2,
          user_id: 1,
          name: 'Galvanize',
          longitude: -122.33297,
          latitude: 47.59955
        },
        {
          id: 3,
          user_id: 2,
          name: 'School',
          longitude: -122.33425,
          latitude: 47.32872
        }
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('locations_id_seq', (SELECT MAX(id) FROM locations))`)
    })
}
