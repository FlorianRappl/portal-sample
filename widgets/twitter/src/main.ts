import { registerTileAngular } from './lib';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { AppModule2 } from './app/app.module.2';

if (process.env.ENV === 'production') {
  enableProdMode();
}

export function setup(portal: any) {
  registerTileAngular(portal, 'angular-twitter-tile-1', AppModule);
  registerTileAngular(portal, 'angular-twitter-tile-2', AppModule2);
}
