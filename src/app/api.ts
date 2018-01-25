export interface BaseComponentProps {
  portal: PortalApi;
}

export interface TileComponentProps extends BaseComponentProps {
  columns: number;
  rows: number;
}

export interface PageComponentProps extends BaseComponentProps {
  match: {
    params: {
      [name: string]: string;
    };
    isExact: boolean;
    path: string;
    url: string;
  };
}

export interface PortalApi {
  registerPage(route: string, render: (element: HTMLElement, props: PageComponentProps) => void): void;
  registerPage(route: string, Component: React.ComponentType<PageComponentProps>): void;
  unregisterPage(route: string): void;
  registerTile(name: string, render: (element: HTMLElement, props: TileComponentProps) => void): void;
  registerTile(name: string, Component: React.ComponentType<TileComponentProps>): void;
  unregisterTile(name: string): void;
}

export interface MiniAppPackage {
  version: string;
  name: string;
  author: string;
  content: string;
}

export interface MiniAppApi extends Partial<MiniAppPackage> {
  setup(portal: PortalApi): void;
}
