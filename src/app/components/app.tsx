import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Loading } from './loading';
import { Home } from './home';
import { Router } from './router';
import { NotFound } from './notFound';
import { Container } from './container';
import { MiniAppApi, MiniAppPackage, PortalApi, TileComponentProps, PageComponentProps, BaseComponentProps } from '../api';
import { loadWidget } from '../loadWidget';
import { wrapComponent, Arg } from '../wrapComponent';

export interface AppProps {
  apiUrl: string;
}

export interface ComponentRegistry<T> {
  [name: string]: React.ComponentType<Partial<T>>;
}

export interface AppState {
  apps?: Array<MiniAppPackage>;
  tiles: ComponentRegistry<TileComponentProps>;
  pages: ComponentRegistry<PageComponentProps>;
}

export class App extends React.Component<AppProps, AppState> {
  private mounted = false;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      apps: undefined,
      tiles: {},
      pages: {},
    };
  }

  private createApi(_app: MiniAppPackage): PortalApi {
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
        const { pages } = this.state;
        this.setState({
          pages: register(pages, route, arg),
        });
      },
      unregisterPage: (route: string) => {
        const { pages } = this.state;
        this.setState({
          pages: unregister(pages, route),
        });
      },
      registerTile: (name: string, arg: Arg<TileComponentProps>) => {
        const { tiles } = this.state;
        this.setState({
          tiles: register(tiles, name, arg),
        });
      },
      unregisterTile: (name: string) => {
        const { tiles } = this.state;
        this.setState({
          tiles: unregister(tiles, name),
        });
      }
    };
    return api;
  }

  private initApps(apps: Array<MiniAppPackage>) {
    for (const app of apps) {
      const portal = this.createApi(app);
      loadWidget(app).setup(portal);
    }

    this.setState({
      apps,
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

  private getHome(apps: Array<MiniAppPackage>) {
    const { tiles } = this.state;
    return () => <Home apps={apps} tiles={tiles} />;
  }

  render() {
    const { apps, pages } = this.state;
    return (
      <BrowserRouter>
        { apps ? (
          <Container>
            <Switch>
              <Route exact path="/" component={this.getHome(apps)} />
              <Router pages={pages} />
              <Route path="/:page" component={NotFound} />
            </Switch>
          </Container>
        ) : <Loading /> }
      </BrowserRouter>
    );
  }
}
