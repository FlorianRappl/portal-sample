import * as React from 'react';
import { Loading } from './loading';
import { App } from './app';
import { MiniAppPackage, MiniAppApi } from '../api';
import { loadWidget } from '../loadWidget';

export interface LoaderProps {
  apiUrl: string;
}

export interface ComponentRegistry<T> {
  [name: string]: React.ComponentType<Partial<T>>;
}

export interface LoaderState {
  libs?: Array<MiniAppApi>;
}

export class Loader extends React.Component<LoaderProps, LoaderState> {
  private mounted = false;

  constructor(props: LoaderProps) {
    super(props);
    this.state = {
      libs: undefined,
    };
  }

  private initApps(apps: Array<MiniAppPackage>) {
    this.setState({
      libs: apps.map(loadWidget)
    });
  }

  componentDidMount() {
    const { apiUrl } = this.props;
    this.mounted = true;

    fetch(`${apiUrl}/widget`, { method: 'GET' })
      .then(res => res.json())
      .then(res => this.mounted && this.initApps(res.items));
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { libs } = this.state;
    return libs ? <App libs={libs} /> : <Loading />;
  }
}
