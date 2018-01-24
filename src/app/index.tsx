import * as React from 'react';
import { render } from 'react-dom';
import { App } from './components/app';
export { PortalApi, MiniAppApi, PageComponentProps, TileComponentProps } from './api';

const container = document.querySelector('#app');
const app = <App apiUrl="http://localhost:8081/api" />;
render(app, container);
