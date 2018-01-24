import * as React from 'react';
import { AppList } from './appList';
import { Dashboard } from './dashboard';
import { MiniAppPackage, TileComponentProps, PortalApi } from '../api';

export interface HomeProps {
  apps: Array<MiniAppPackage>;
  tiles: {
    [name: string]: React.ComponentType<Partial<TileComponentProps>>;
  };
}

export class Home extends React.Component<HomeProps> {
  render() {
    const { apps, tiles } = this.props;
    return (
      <div>
        <AppList apps={apps} />
        <Dashboard tiles={tiles} />
      </div>
    );
  }
}
