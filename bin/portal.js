const { spawn } = require('child_process');
const { resolve } = require('path');
const currentDir = process.cwd();
const webpackDevServer = resolve(__dirname, '../node_modules/webpack-dev-server/bin/webpack-dev-server.js');

spawn('node', [webpackDevServer], {
  stdio: 'inherit',
});
