'use strict';
var knexConn = require('../../../config/knex');
const knex = knexConn.knexDb();

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  findOne: async (ctx) => {

    let result = await knex.from('pages')
      .where('page_url', ctx.params.id)
      .select("id", "title", "content")
      .first()

    return ctx.send(result)
  }

};
