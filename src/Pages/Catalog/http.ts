import { get } from '../../http/base';
import { db } from './recoverdb';

export const getCatalogs = () =>
  get('/catalogs')
    .then((response) => response.data)
    .catch(() => db.catalogs);

export const getCatalogItem = (id: number) =>
  get(`/catalogs/${id}`)
    .then((response) => ({items: [], ...response.data}))
    .catch(() => db.catalogs[id - 1]['items'] ? db.catalogs[id - 1] : {items: []});
