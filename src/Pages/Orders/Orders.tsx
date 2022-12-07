import { Route, Routes } from 'react-router-dom';
import { routesToArray } from '../../constants';
import { ORDER_ROUTES } from './routes';

export default function Orders() {
  return (
    <Routes>
      {routesToArray(ORDER_ROUTES).map((attrs, key) => (
        <Route {...{ ...attrs, key }} />
      ))}
    </Routes>
  );
}
