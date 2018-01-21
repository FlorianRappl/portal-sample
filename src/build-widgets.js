const fs = require('fs');
const cp = require('child_process');
const os = require('os').platform();
const { resolve, join } = require('path');
const widgets = resolve(__dirname, '..', 'widgets');
const npmCmd = os.startsWith('win') ? 'npm.cmd' : 'npm'

function buildWidget(dir) {
  cp.spawn(npmCmd, ['run', 'build'], { 
    env: process.env, 
    cwd: dir, 
    stdio: 'inherit',
  });
}

fs.readdirSync(widgets)
  .forEach((widget) => {
    const widgetPath = join(widgets, widget);
    const packageFile = join(widgetPath, 'package.json');
    
    if (fs.existsSync(packageFile)) {
      buildWidget(widgetPath);
    }
});
