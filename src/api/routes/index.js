const routes = [
  require('./feature'),
  require('./widget'),
];

module.exports = function (app, options) {
  for (const route of routes) {
    route(app, options);
  }
};
