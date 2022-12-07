import { Avatar, List } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetching from '../../hooks/useFetching';
import { getNews } from './http';
import { NewsItem } from './interface';

export default function NewsList() {
  const [news, setNews] = useState<NewsItem[]>([]);

  const [fetchNews, loadingNews] = useFetching({
    fetch: async () => await getNews(),
    afterFetch: (news: NewsItem[]) => setNews(news),
  });

  useEffect(() => {
    fetchNews();
  }, []); //eslint-disable-line

  return (
    <List
      size='large'
      itemLayout='horizontal'
      dataSource={news}
      loading={loadingNews}
      renderItem={({ id, pic_name, title, date, description }) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={require(`../../assets/${pic_name}`)} />}
            title={<Link to={`/news/${id}`}>{title}</Link>}
            description={`${date} ${description}`}
          />
        </List.Item>
      )}
    />
  );
}
