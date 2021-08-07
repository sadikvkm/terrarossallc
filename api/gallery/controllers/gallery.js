'use strict';
var knexConn = require('../../../config/knex');
const { getUploadFile } = require('../../../helpers');
const knex = knexConn.knexDb();
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  find: async(ctx) => {

    let result = await knex.from('galleries')
      .select("id", "title", "sub_title")

    let pass = [];

    for (let i = 0; i < result.length; i++) {
      const element = result[i];
      pass.push({
        ...element,
        image: await getUploadFile(element.id, 'galleries')
      })
    }

    return ctx.send(pass)
  }

};
