import * as React from 'react';
import { Route } from 'react-router-dom';
import { PageComponentProps } from '../api';
import { ErrorBoundary } from './errorBoundary';

export interface RouterProps {
  pages: {
    [name: string]: React.ComponentType<Partial<PageComponentProps>>;
  };
}

export class Router extends React.Component<RouterProps> {
  render() {
    const { pages } = this.props;
    return (
      <div>
        { Object.keys(pages).map(route => (
          <ErrorBoundary key={route}>
            <Route exact path={route} component={pages[route]} />
          </ErrorBoundary>
        ))
        }
      </div>
    );
  }
}
