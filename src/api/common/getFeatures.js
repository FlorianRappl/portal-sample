const fs = require('fs');
const path = require('path');

module.exports = function (featuresPath, user) {
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
          let matchAll = true;

          for (const condition of conditions) {
            const value = user[condition];
            const pattern = rule.when[condition];
            const match = new RegExp(pattern);

            if (!match.test(value)) {
              matchAll = false;
              break;
            }
          }

          if (matchAll) {
            for (const feature of rule.then.enable) {
              mapping[feature] = true;
            }

            for (const feature of rule.then.disable) {
              mapping[feature] = false;
            }
          }
        }

        resolve(mapping);
      } else {
        reject(err);
      }
    });
  });
};
