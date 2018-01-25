import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './home';
import { Router } from './router';
import { NotFound } from './notFound';
import { Container } from './container';
import { MiniAppApi, MiniAppPackage, PortalApi, TileComponentProps, PageComponentProps, BaseComponentProps } from '../api';
import { loadWidget } from '../loadWidget';
import { wrapComponent, Arg } from '../wrapComponent';

export interface AppProps {
  libs: Array<MiniAppApi>;
}

export interface ComponentRegistry<T> {
  [name: string]: React.ComponentType<Partial<T>>;
}

export interface AppState {
  tiles: ComponentRegistry<TileComponentProps>;
  pages: ComponentRegistry<PageComponentProps>;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      tiles: {},
      pages: {},
    };
  }

  componentDidMount() {
    const { libs } = this.props;

    for (const lib of libs) {
      const portal = this.createApi();
      lib.setup(portal);
    }
  }

  private createApi(): PortalApi {
    const register = <T extends BaseComponentProps>(obj: ComponentRegistry<T>, key: string, value: Arg<T>): ComponentRegistry<T> => {
      const Component = wrapComponent(value, api);
      return {
        ...obj,
        [key]: Component,
      };
    };
    const unregister = <T extends BaseComponentProps>(obj: ComponentRegistry<T>, key: string): ComponentRegistry<T> => {
      const { [key]: _unused, ...rest } = obj;
      return rest;
    };
    const api = {
      registerPage: (route: string, arg: Arg<PageComponentProps>) => {
        this.setState(({ pages }) => ({
          pages: register(pages, route, arg),
        }));
      },
      unregisterPage: (route: string) => {
        this.setState(({ pages }) => ({
          pages: unregister(pages, route),
        }));
      },
      registerTile: (name: string, arg: Arg<TileComponentProps>) => {
        this.setState(({ tiles }) => ({
          tiles: register(tiles, name, arg),
        }));
      },
      unregisterTile: (name: string) => {
        this.setState(({ tiles }) => ({
          tiles: unregister(tiles, name),
        }));
      }
    };
    return api;
  }

  private getHome() {
    const { libs } = this.props;
    const { tiles } = this.state;
    return () => <Home libs={libs} tiles={tiles} />;
  }

  render() {
    const { pages } = this.state;
    return (
      <BrowserRouter>
        <Container>
          <Switch>
            <Route exact path="/" component={this.getHome()} />
            <Router pages={pages} />
            <Route path="/:page" component={NotFound} />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}
