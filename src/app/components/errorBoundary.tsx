import * as React from 'react';

export interface ErrorBoundaryProps {
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | undefined;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  componentDidCatch(error: Error) {
    this.setState({
      hasError: true,
      error,
    });
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      return <h1>{ error && error.message }</h1>;
    }

    return this.props.children;
  }
}
