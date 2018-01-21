const fs = require('fs');
const path = require('path');

function getAllFeatures(featuresPath, user) {
  return new Promise((resolve, reject) => {
    fs.readFile(featuresPath, 'utf8', (err, featuresContent) => {
      if (!err) {
        const db = JSON.parse(featuresContent);
        const features = Object.keys(db.features);
        const rules = db.rules;
        const mapping = features.reduce((o, feature) => {
          o[feature] = false;
          return o
        }, {});

        for (const rule of rules) {
          const conditions = Object.keys(rule.when);

          for (const condition of conditions) {
            const value = user[condition];
            const pattern = rule.when[condition];
            const match = new RegExp(pattern);

            if (match.test(value)) {
              for (const feature of rule.then.enable) {
                mapping[feature] = true;
              }

              for (const feature of rule.then.disable) {
                mapping[feature] = false;
              }
            }
          }
        }

        resolve(mapping);
      } else {
        reject(err);
      }
    });
  });
}

module.exports = function (app, options) {
  app.get('/api/feature', (req, res) => {
    const user = {
      name: 'foo',
      country: 'de',
      language: 'en',
      mail: 'some@test.com',
      organization: 'bar',
      context: 'med'
    };

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
