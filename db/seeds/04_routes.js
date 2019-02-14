const polyline = require('@mapbox/polyline');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('routes').del()
    .then(function () {
      // Inserts seed entries
      return knex('routes').insert([
        {
          id: 1,
          user: '8H04HQ16',
          name: 'Commute',
          polyline: polyline.encode([[38.5, 120.2], [40.7, -120.95], [43.252, -126.453]])
        },
        {
          id: 2,
          user: '8H04HQ16',
          name: 'Game Night',
          polyline: polyline.encode([[41.87509, -87.64662], [41.81140, -87.63083], [41.80808, -87.72387]])
        },
        {
          id: 3,
          user: 'NJ69KP09',
          name: 'Commute',
          polyline: polyline.encode([[38.5, 120.2], [40.7, -120.95], [43.252, -126.453]])
        }
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('routes_id_seq', (SELECT MAX(id) FROM routes))`)
    })
}

