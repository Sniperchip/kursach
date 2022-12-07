import {
    Navigate,
    Route,
    RouteObject,
    Routes as RouterRoutes
} from 'react-router-dom';
import { RouterUnpackProps, Routes } from './interface';

export const routesToArray = (routes: Routes) => Object.values(routes);
export const routesToArrayClass = (routes: RouteObject) =>
  Object.values(routes);

export const normalizePath = (path: string = '') =>
  path.replace('/*', '').replaceAll('/', '');

export function RouterUnpack({ routes, defaultPath }: RouterUnpackProps) {
  return (
    <RouterRoutes>
      {routesToArrayClass(routes).map(({ element, path }) => (
        <Route path={`${path}/*`} element={element} key={path} />
      ))}
      <Route path='*' element={<Navigate to={defaultPath} replace />} />
    </RouterRoutes>
  );
}
