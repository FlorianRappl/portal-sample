import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export interface NotFoundMatch {
  page: string;
}

export interface NotFoundProps extends RouteComponentProps<NotFoundMatch> {
}

export class NotFound extends React.Component<NotFoundProps> {
  render() {
    const { match } = this.props;
    return (
      <div>
        The specified page <strong>{match.params.page}</strong> cannot be found.
      </div>
    );
  }
}
