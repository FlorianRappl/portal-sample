import { MiniAppApi, MiniAppPackage } from './api';

function requireModule(moduleName: string) {
  switch (moduleName) {
    case 'react':
      return require('react');
    case 'react-router-dom':
      return require('react-router-dom');
    case 'styled-components':
      return require('styled-components');
    default:
      return undefined;
  }
}

export function loadWidget(app: MiniAppPackage): MiniAppApi {
  const mod = {
    exports: undefined,
  };
  const importer = new Function('module', 'exports', 'require', app.content);
  importer(mod, {}, requireModule);
  return Object.assign(mod.exports || {
    setup() {}
  }, app);
}
