import { Card, Empty, Image } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetching from '../../hooks/useFetching';
import { getNewsItem } from './http';
import { NewsItem as NewsItemObject } from './interface';

export default function NewsItem() {
  const { id } = useParams();

  const [newsItem, setNewsItem] = useState<NewsItemObject>(
    {} as NewsItemObject
  );

  const [fetchNewsItem] = useFetching({
    fetch: async (id: number) => getNewsItem(id),
    afterFetch: (newsItem: NewsItemObject) => setNewsItem(newsItem),
  });

  useEffect(() => {
    id && fetchNewsItem(parseInt(id));
  }, [id]); //eslint-disable-line

  return newsItem.id ? (
    <Card
      hoverable
      title={`${newsItem.title} (${newsItem.date})`}
      style={{ width: '60%' }}
      actions={[<Link to='/news'>Назад к списку</Link>]}
      cover={
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2px',
          }}
        >
          <Image
            width={200}
            alt=''
            src={require(`../../assets/${newsItem.pic_name}`)}
          />
        </div>
      }
    >
      {newsItem.full_article}
    </Card>
  ) : (
    <Empty description='Такой новости не существует'></Empty>
  );
}
