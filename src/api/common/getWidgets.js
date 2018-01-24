const fs = require('fs');
const path = require('path');

module.exports = function (baseDir, features) {
  return new Promise((resolve, reject) => {
    fs.readdir(baseDir, (err, entries) => {
      if (!err) {
        const promises = [];

        for (const entry of entries) {
          const p = path.join(baseDir, entry);

          promises.push(new Promise((resolve, reject) => {
            fs.stat(p, (err, stat) => {
              if (!err && stat.isDirectory()) {
                const widget = path.join(p, 'dist', 'widget.js');
                const info = path.join(p, 'package.json');

                fs.readFile(widget, 'utf8', (err, widgetContent) => {
                  if (!err) {
                    fs.readFile(info, 'utf8', (err, infoContent) => {
                      if (!err) {
                        const package = JSON.parse(infoContent);

                        if (!package.feature || features[package.feature]) {
                          return resolve({
                            content: widgetContent,
                            version: package.version,
                            name: package.name,
                            author: package.author,
                            dependencies: package.peerDependencies || {},
                          });
                        }
                      }

                      resolve(undefined);
                    });
                  } else {
                    resolve(undefined);
                  }
                });
              } else {
                resolve(undefined);
              }
            });
          }));
        }

        Promise.all(promises)
          .then(apps => resolve(apps.filter(app => app !== undefined)))
          .catch(reject);
      } else {
        reject(err);
      }
    });
  });
};
