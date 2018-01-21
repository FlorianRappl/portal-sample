const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const options = {
  port: 8081,
  widgetDir: path.resolve(__dirname, '..', '..', 'widgets'),
}

app.use(cors());

routes(app, options);

app.listen(options.port, () => {
  console.log(`API running on port ${options.port}.`);
});
