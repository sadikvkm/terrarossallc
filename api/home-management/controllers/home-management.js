'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  find: async(ctx) => {

    let result = await strapi.api['home-management'].services['home-management'].getHome();
    return ctx.send(result);

  }

};
