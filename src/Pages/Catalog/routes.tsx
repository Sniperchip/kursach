import CatalogItem from './CatalogItem';
import CatalogList from './CatalogList';

export const CATALOG_ROUTES = {
  LIST: { path: '', element: <CatalogList /> },
  ONE: { path: ':id', element: <CatalogItem /> },
};
