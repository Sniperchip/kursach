import NewsItem from './NewsItem';
import NewsList from './NewsList';

export const NEWS_ROUTES = {
  LIST: { path: '', element: <NewsList /> },
  ONE: { path: ':id', element: <NewsItem /> },
};
