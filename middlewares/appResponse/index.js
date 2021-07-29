module.exports = strapi => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        let response = {};
        await next();
        var body = ctx.response.body
        if (ctx.header.accept === 'application/json') {
          if (ctx.response.status === 200) {
            response.status = true;
            response.result = body;
            if (ctx.response.body.message) {
              response.message = ctx.response.body.message;
              delete ctx.response.body.message;
            } else {
              response.message = ctx.response.message;
            }
          }
          ctx.response.body = response;
        }
      });
    },
  };
};
