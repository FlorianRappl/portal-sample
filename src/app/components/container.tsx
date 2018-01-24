import * as React from 'react';
import { Link } from 'react-router-dom';

export class Container extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <div>
          <Link to="/">Home</Link>
        </div>
        {children}
      </div>
    );
  }
}
