import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

let queue = Promise.resolve();

function initModule(module: any, node: HTMLElement) {
  return platformBrowserDynamic().bootstrapModule(module)
    .catch(err => console.log(err))
    .then(() => node.removeAttribute('id'));
}

export function registerTileAngular(portal: any, name: string, Module: any) {
  portal.registerTile(name, (node: HTMLElement) => {
    queue = queue.then(() => {
      node.id = `zeisslet`;
      return initModule(Module, node);
    });
  });
}

export function angularize(portal: any, callback: (portal: any) => void) {
  const extended = {
    registerTile(name: string, Module: any) {
      return registerTileAngular(portal, name, Module);
    }
  };
  const api = Object.assign({}, portal, extended);
  callback(api);
}
