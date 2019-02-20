
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('alerts').del()
    .then(function () {
      // Inserts seed entries
      return knex('alerts').insert([
        {
          id: 1,
          user_id: '8H04HQ16',
          type: 'Route',
          name: 'commute',
          polyline: 'kjsdbfjsdd84983',
          alert_frequency: 'Daily'
        },
        {
          id: 2,
          user_id: '8H04HQ16',
          type: 'location',
          name: 'Home',
          polyline: 'kjsdbfjsdd84983',
          longitude: 47.380932,
          latitude: -122.234840,
          alert_frequency: 'weekly'
        },
        {
          id: 3,
          type: 'location',
          name: 'Home',
          polyline: 'kjsdbfjsdd84983',
          longitude: 47.380932,
          latitude: -122.234840,
          alert_frequency: 'weekly'
        }
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('alerts_id_seq', (SELECT MAX(id) FROM alerts))`)
    })
  };