import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

if (process.env.ENV === 'production') {
  enableProdMode();
}

let queue = Promise.resolve();

export function setup(portal: any) {
  portal.registerTile('link', (node: HTMLElement) => {
    queue = queue.then(() => {
      node.id = 'angular-temp-root';
      return platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.log(err))
        .then(() => {
          node.id = undefined;
        });
    });
  });
}
