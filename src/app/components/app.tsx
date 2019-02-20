import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './home';
import { Router } from './router';
import { NotFound } from './notFound';
import { Container } from './container';
import { MiniAppApi, PortalApi, TileComponentProps, PageComponentProps, BaseComponentProps } from '../api';
import { wrapComponent, Arg } from '../wrapComponent';

interface EventListeners {
  [event: string]: Array<{
    (arg: any): void;
  }>;
}

const sharedData = {};
const eventListeners: EventListeners = {};

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

  componentWillMount() {
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
    const ownedItems: Array<PropertyKey> = [];
    const api: PortalApi = {
      data: window['Proxy'] ? new Proxy(sharedData, {
        get(target, name) {
          return target[name];
        },
        set(target, name, value) {
          if (!(name in target)) {
            ownedItems.push(name);
          }

          if (ownedItems.indexOf(name) !== -1) {
            target[name] = value;
          }

          return true;
        }
      }) : sharedData,
      emit<T>(type: string, arg: T) {
        const callbacks = eventListeners[type] || [];

        for (const callback of callbacks) {
          callback(arg);
        }
      },
      on<T>(type: string, callback: (arg: T) => void) {
        const callbacks = eventListeners[type] || [];
        eventListeners[type] = [...callbacks, callback];
      },
      off<T>(type: string, callback: (arg: T) => void) {
        const callbacks = eventListeners[type] || [];
        eventListeners[type] = callbacks.filter(cb => cb !== callback);
      },
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
