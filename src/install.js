const fs = require('fs');
const cp = require('child_process');
const os = require('os').platform();
const { resolve, join } = require('path');
const baseDir = resolve(__dirname, '..');
const widgets = join(baseDir, 'widgets');
const npmCmd = os.startsWith('win') ? 'npm.cmd' : 'npm'

function installPackages(dir) {
  cp.spawn(npmCmd, ['install'], { 
    env: process.env, 
    cwd: dir, 
    stdio: 'inherit',
  });
}

installPackages(baseDir);

fs.readdirSync(widgets)
  .forEach((widget) => {
    const widgetPath = join(widgets, widget);
    const packageFile = join(widgetPath, 'package.json');
    
    if (fs.existsSync(packageFile)) {
      installPackages(widgetPath);
    }
});
