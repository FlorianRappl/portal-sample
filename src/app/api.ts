export interface TileComponentProps {
  portal: PortalApi;
  columns: number;
  rows: number;
}

export interface PortalApi {
  registerTile(name: string, Component: React.ComponentType<TileComponentProps>): void;
  registerTile(name: string, render: (element: HTMLElement, props: TileComponentProps) => void): void;
  unregisterTile(name: string): void;
}

export interface MiniAppApi {
  setup(portal: PortalApi): void;
}
