import * as React from 'react';
import { PortalApi, BaseComponentProps } from './api';

type ForeignComponentContainerProps<T extends BaseComponentProps> = {
  render: RenderCallback<T>;
  portal: PortalApi;
} & T;

class ForeignComponentContainer<T extends BaseComponentProps> extends React.Component<ForeignComponentContainerProps<T>> {
  private container: HTMLElement | null;

  componentDidMount() {
    const node = this.container;

    if (node) {
      const { render, ...rest } = this.props as any;
      render(node, rest);
    }
  }

  render() {
    return <div ref={node => { this.container = node; }} />
  }
}

function wrapReactComponent<T extends BaseComponentProps>(Component: React.ComponentType<T>, api: PortalApi): React.ComponentType<Partial<T>> {
  return (props: Partial<T>) => (
    <Component {...props as any} portal={api} />
  );
}

function wrapForeignComponent<T extends BaseComponentProps>(render: RenderCallback<T>, api: PortalApi): React.ComponentType<Partial<T>> {
  return (props: Partial<T>) => (
    <ForeignComponentContainer {...props} render={render as any} portal={api} />
  );
}

export interface RenderCallback<T> {
  (element: HTMLElement, props: T): void;
}

export type Arg<T> = React.ComponentType<T> | RenderCallback<T>;

export function wrapComponent<T extends BaseComponentProps>(value: Arg<T>, api: PortalApi) {
  const argAsReact = value as React.ComponentType<T>;
  const argAsRender = value as RenderCallback<T>;

  if (typeof argAsReact.prototype.render === 'function' || argAsReact.displayName) {
    return wrapReactComponent(argAsReact, api);
  }

  return wrapForeignComponent(argAsRender, api);
}
