import * as React from 'react';
import { TileComponentProps, PortalApi } from '../api';

export interface DashboardProps {
  tiles: {
    [name: string]: {
      Component: React.ComponentType<TileComponentProps>;
      api: PortalApi;
    }
  };
}

export class Dashboard extends React.Component<DashboardProps> {
  render() {
    const { tiles } = this.props;
    return (
      <div>
        <h2>Dashboard View</h2>
        {Object.keys(tiles).map(name => {
          const tile = tiles[name];
          const Component = tile.Component;

          return (
            <div key={name}>
              <Component columns={1} rows={1} portal={tile.api} />
            </div>
          );
        })}
      </div>
    );
  }
}
