const getAllFeatures = require('../common/getFeatures');
const getAllWidgets = require('../common/getWidgets');
const getUser = require('../common/getUser');

module.exports = function (app, options) {
    app.get('/api/widget', (req, res) => {
      const user = getUser(req);

      getAllFeatures(options.featurePath, user)
        .then((features) => getAllWidgets(options.widgetDir, features))
        .then((items) => {
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({
            items,
          }));
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    });
  };
