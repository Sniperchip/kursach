import { Route, Routes } from 'react-router-dom';
import { routesToArray } from '../../constants';
import { NEWS_ROUTES } from './routes';

export default function news() {
  return (
    <Routes>
      {routesToArray(NEWS_ROUTES).map((attrs, key) => (
        <Route {...{ ...attrs, key }} />
      ))}
    </Routes>
  );
}
