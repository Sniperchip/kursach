import { Card, Image } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetching from '../../hooks/useFetching';
import './CatalogList.css';
import { getCatalogs } from './http';
import { Catalog } from './interface';

const gridStyle: React.CSSProperties = {
  width: '16.66%',
  textAlign: 'center',
};

export default function CatalogList() {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);

  const [fetchCatalogs] = useFetching({
    fetch: async () => await getCatalogs(),
    afterFetch: (catalogs: Catalog[]) => setCatalogs(catalogs),
  });

  useEffect(() => {
    fetchCatalogs();
  }, []); //eslint-disable-line

  return (
    <Card title='Каталог' style={{ width: '100%' }}>
      {catalogs.map(({ id, name, pic_name }) => (
        <Card.Grid style={gridStyle} key={id}>
          <Link to={`/catalog/${id}`}>
            <div className='item'>
              <p>{name}</p>
              <div className='image'>
                <Image
                  width={200}
                  onClick={(e) => e.preventDefault()}
                  src={require(`../../assets/${pic_name}`)}
                  alt=''
                />
              </div>
            </div>
          </Link>
        </Card.Grid>
      ))}
    </Card>
  );
}
