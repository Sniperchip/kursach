import { get } from '../../http/base';
import { db } from './recoverdb';

export const getNews = () =>
  get('/news')
    .then((response) => response.data)
    .catch(() => db.news);

export const getNewsItem = (id: number) =>
  get(`/news/${id}`)
    .then((response) => ({items: [], ...response.data}))
    .catch(() => db.news[id - 1] ? db.news[id - 1] : {});
