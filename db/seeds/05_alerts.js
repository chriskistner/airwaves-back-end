
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('alerts').del()
    .then(function () {
      // Inserts seed entries
      return knex('alerts').insert([
        {
          id: 1,
          user_id: '8H04HQ16',
          location_id: 1,
          name: 'Daily Alert',
          alert_time: '06:00:00',
          alert_frequency: '24'
        },
        {
          id: 2,
          user_id: '8H04HQ16',
          route_id: 2,
          name: 'Game Night',
          alert_time: '18:00:00',
          alert_frequency: 'weekly'
        },
        {
          id: 3,
          user_id: 'NJ69KP09',
          route_id: 3,
          name: 'Commute Alert',
          alert_time: '05:30:00',
          alert_frequency: '6'
        }
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('alerts_id_seq', (SELECT MAX(id) FROM alerts))`)
    })
  };