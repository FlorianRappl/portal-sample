import * as React from 'react';
import * as lib from './index';
import { render } from 'react-dom';
import { App } from '../../../src/app/components/app';

const container = document.querySelector('#app');
const app = <App libs={[lib]} />;
render(app, container);
