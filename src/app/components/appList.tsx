import * as React from 'react';

export interface AppListProps {
  apps: Array<{
    name: string;
    author: string;
    version: string;
  }>;
}

export class AppList extends React.Component<AppListProps> {
  render() {
    const { apps } = this.props;
    return (
      <div>
        <h2>List of Loaded Widgets</h2>
        {apps.map(app => (
          <div key={app.name}>
            <b>{app.name}</b> (v{app.version}) from {app.author}
          </div>
        ))}
      </div>
    );
  }
}
