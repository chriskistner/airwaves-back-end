
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          user_id: '989sdasudsa7',
          user_name: 'Chris',
          email: 'chris.kistner0@gmail.com',
          password: 'password',
          home_longitude: 47.380932,
          home_latitude: -122.234840
        },
        {
          id: 2,
          user_id: '99819u43kzjb',
          user_name: 'Juniper',
          email: 'juniberryjuneboug@yahoo.com',
          password: 'password',
          home_longitude: 47.307522,
          home_latitude: -122.225754

        }
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))`)
    })
}