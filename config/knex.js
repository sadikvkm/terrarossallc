module.exports.knexDb = function () {
  const knex_options = {
    client: 'mysql',
    connection: {
      host: process.env.DATABASE_HOST || '127.0.0.1',
      user: process.env.DATABASE_USERNAME || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
      database: process.env.DATABASE_NAME || 'database'
    }
  }
  const knex = require('knex')(knex_options);
  return knex
}
