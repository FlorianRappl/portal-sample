import * as React from 'react';

export class Container extends React.Component {
  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}
