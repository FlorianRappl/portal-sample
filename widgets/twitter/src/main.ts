import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

if (process.env.ENV === 'production') {
  enableProdMode();
}

export function setup(portal: any) {
  portal.registerTile('link', (node: HTMLElement) => {
    node.classList.add('tile-root');
    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.log(err));
  });
}