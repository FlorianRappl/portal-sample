module.exports = function (app, options) {
  app.get('/api/feature', (req, res) => {
    res.send('Hallo');
  });
};
