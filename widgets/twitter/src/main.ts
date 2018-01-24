import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

if (process.env.ENV === 'production') {
  enableProdMode();
}

let appName = 'angular-twitter-app';
let instanceCount = 0;
let queue = Promise.resolve();

export function setup(portal: any) {
  portal.registerTile(appName, (node: HTMLElement) => {
    queue = queue.then(() => {
      node.id = appName;
      return platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.log(err))
        .then(() => {
          node.id = appName + '-' + instanceCount;
          instanceCount++;
        });
    });
  });
}
