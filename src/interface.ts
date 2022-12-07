import { RouteObject } from 'react-router-dom';

export interface RouteSubset {
  path: string;
  element: JSX.Element;
  routes?: RouteSubset[];
  icon?: any;
  name?: string;
  innerRoutes?: Routes;
  defaultInnerPath?: string;
  normalizedPath?: (path: string) => string;
}

export interface Routes {
  [key: string]: RouteSubset;
}

export interface RouterUnpackProps {
  routes: { [key: string]: RouteObject };
  defaultPath: string;
}
