import * as React from 'react';

export interface AppListProps {
  libs: Array<{
    name?: string;
    author?: string;
    version?: string;
  }>;
}

export class AppList extends React.Component<AppListProps> {
  render() {
    const { libs } = this.props;
    return (
      <div>
        <h2>List of Loaded Widgets</h2>
        {libs.map(lib => (
          <div key={lib.name}>
            <b>{lib.name}</b> (v{lib.version}) from {lib.author}
          </div>
        ))}
      </div>
    );
  }
}
