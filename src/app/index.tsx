import * as React from 'react';
import { render } from 'react-dom';
import { Loader } from './components/loader';
export { PortalApi, MiniAppApi, PageComponentProps, TileComponentProps } from './api';

const container = document.querySelector('#app');
const app = <Loader apiUrl="http://localhost:8081/api" />;
render(app, container);
