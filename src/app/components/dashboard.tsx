import * as React from 'react';
import { TileComponentProps, PortalApi } from '../api';
import { ErrorBoundary } from './errorBoundary';

export interface DashboardProps {
  tiles: {
    [name: string]: React.ComponentType<Partial<TileComponentProps>>;
  };
}

export class Dashboard extends React.Component<DashboardProps> {
  render() {
    const { tiles } = this.props;

    return (
      <div>
        <h2>Dashboard View</h2>
        {Object.keys(tiles).map(name => {
          const Tile = tiles[name];

          return (
            <ErrorBoundary key={name}>
              <Tile columns={1} rows={1} />
            </ErrorBoundary>
          );
        })}
      </div>
    );
  }
}
