import * as React from 'react';
import { AppList } from './appList';
import { Dashboard } from './dashboard';
import { MiniAppApi, TileComponentProps, PortalApi } from '../api';

export interface HomeProps {
  libs: Array<MiniAppApi>;
  tiles: {
    [name: string]: React.ComponentType<Partial<TileComponentProps>>;
  };
}

export class Home extends React.Component<HomeProps> {
  render() {
    const { libs, tiles } = this.props;
    return (
      <div>
        <AppList libs={libs} />
        <Dashboard tiles={tiles} />
      </div>
    );
  }
}
