const env = process.env.NODE_ENV || 'development'

// getting config for enviroment
const config = require('../knexfile')[env]

// creating connection to database
const connection = require('knex')(config)

module.exports = connection