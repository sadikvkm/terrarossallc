module.exports = {
  load: {
    before: ["appResponse", "logger", "cors", "responses", "gzip"],
    order: ["parser",],
    after: ["router",],
  },
  settings: {
    appResponse: {
      enabled: true,
    },
    cors: {
      enabled: true,
      headers: "*"//
    },
  }
};
