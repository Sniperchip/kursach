import { Route, Routes } from 'react-router-dom';
import { routesToArray } from '../../constants';
import { CATALOG_ROUTES } from './routes';

export default function Catalog() {
  return (
    <Routes>
      {routesToArray(CATALOG_ROUTES).map((attrs, key) => (
        <Route {...{ ...attrs, key }} />
      ))}
    </Routes>
  );
}
