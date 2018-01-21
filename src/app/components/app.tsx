import * as React from 'react';
import { Dashboard } from './dashboard';
import { Loading } from './loading';
import { AppList } from './appList';
import { Container } from './container';
import { MiniAppApi, PortalApi, TileComponentProps } from '../api';

export interface AppProps {
  apiUrl: string;
}

interface MiniAppPackage {
  version: string;
  name: string;
  author: string;
  content: string;
}

export interface AppState {
  apps?: Array<MiniAppPackage>;
  tiles: {
    [name: string]: {
      api: PortalApi;
      Component: React.ComponentType<TileComponentProps>;
    };
  };
}

function requireModule(moduleName: string) {
  switch (moduleName) {
    case 'react':
      return require('react');
    default:
      return undefined;
  }
}

function importLib(app: MiniAppPackage): MiniAppApi {
  const mod = {
    exports: undefined,
  };
  const importer = new Function('module', 'exports', 'require', app.content);
  importer(mod, {}, requireModule);
  return mod.exports || {
    setup() {}
  };
}

interface RenderCallback {
  (element: HTMLElement, props: TileComponentProps): void;
}

type TileArg = React.ComponentType<TileComponentProps> | RenderCallback;

function wrapTileComponent(render: RenderCallback) {
  return (props: TileComponentProps) => (
    <div ref={node => node && render(node, props)} />
  );
}

export class App extends React.Component<AppProps, AppState> {
  private mounted = false;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      apps: undefined,
      tiles: {},
    };
  }

  private createApi(_app: MiniAppPackage): PortalApi {
    const api = {
      registerTile: (name: string, arg: TileArg) => {
        const { tiles } = this.state;
        const argAsReact = arg as React.ComponentType<TileComponentProps>;
        const argAsRender = arg as RenderCallback;
        const newTile = typeof argAsReact.prototype.render === 'function' || argAsReact.displayName ? argAsReact : wrapTileComponent(argAsRender);
        this.setState({
          tiles: {
            ...tiles,
            [name]: {
              Component: newTile,
              api,
            },
          }
        })
      },
      unregisterTile: (name: string) => {
        const { tiles } = this.state;
        const { [name]: _unused, ...rest } = tiles;
        this.setState({
          tiles: rest,
        });
      }
    };
    return api;
  }

  private initApps(apps: Array<MiniAppPackage>) {
    for (const app of apps) {
      const portal = this.createApi(app);
      importLib(app).setup(portal);
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

  render() {
    const { apps, tiles } = this.state;
    return (
      <div>
        { apps ? (
          <Container>
            <AppList apps={apps} />
            <Dashboard tiles={tiles} />
          </Container>
         ) : <Loading /> }
      </div>
    );
  }
}
