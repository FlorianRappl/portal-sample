import * as react from 'react';
import * as reactRouterDom from 'react-router-dom';
import * as styledComponents from 'styled-components';
import { MiniAppApi, MiniAppPackage } from './api';

function requireModule(moduleName: string) {
  switch (moduleName) {
    case 'react':
      return react;
    case 'react-router-dom':
      return reactRouterDom;
    case 'styled-components':
      return styledComponents;
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
