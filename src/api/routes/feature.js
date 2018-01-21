const getAllFeatures = require('../common/getFeatures');
const getUser = require('../common/getUser');

module.exports = function (app, options) {
  app.get('/api/feature', (req, res) => {
    const user = getUser(req);

    getAllFeatures(options.featurePath, user)
      .then((features) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(features));
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
};
