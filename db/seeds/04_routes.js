
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
          polyline: 'ijbfjhdbfsdfnkjsfl',
          levels: 'BBB'
        },
        {
          id: 2,
          user: '8H04HQ16',
          name: 'Game Night',
          polyline: 'oawiuhsdi79476',
          levels: 'BBb'
        },
        {
          id: 3,
          user: 'NJ69KP09',
          name: 'Commute',
          polyline: 'lkasjkasdjbjdsbfas',
          levels: 'BbB'
        }
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('routes_id_seq', (SELECT MAX(id) FROM routes))`)
    })
}

