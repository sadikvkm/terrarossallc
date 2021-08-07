'use strict';

const { getUploadFile } = require("../../../helpers");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  findOne: async (ctx) => {

    let result = await strapi.query('our-services').findOne({ slug: ctx.params.id })
    let data = {
      id: result.id,
      title: result.title,
      slug: result.slug,
      short_description: result.short_description,
      description: result.description,
      image: await getUploadFile(result.id, 'our_services')
    }
    return ctx.send(data)
  }
};
