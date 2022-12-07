import {
  Button,
  Card,
  Empty,
  Form,
  Image,
  InputNumber,
  message,
  Tag
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CartContext from '../../contexts/CartContext';
import useFetching from '../../hooks/useFetching';
import './Catalog.css';
import './CatalogList.css';
import { getCatalogItem } from './http';
import { Catalog, CatalogItemObject } from './interface';

export default function CatalogItem() {
  const { id } = useParams();
  const { cartItems, setCart } = useContext(CartContext);

  const [catalogItems, setCatalogItems] = useState<CatalogItemObject[]>([]);

  const [fetchCatalogItems] = useFetching({
    fetch: async (id: number) => await getCatalogItem(id),
    afterFetch: (catalogItem: Catalog) => setCatalogItems(catalogItem['items']),
  });

  useEffect(() => {
    id && fetchCatalogItems(parseInt(id));
  }, [id]); //eslint-disable-line

  const [form] = useForm();

  return (
    <Form form={form}>
      <Card title='Каталог' style={{ width: '100%' }}>
        {catalogItems.length ? (
          catalogItems.map(({ id, name, pic_name, price }) => (
            <Card.Grid key={id}>
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
                <div className='actions'>
                  <Tag>{price} руб.</Tag>
                  <Form.Item initialValue={1} name={id}>
                    <InputNumber></InputNumber>
                  </Form.Item>
                  <Button
                    type='primary'
                    onClick={() => {
                      const count = form.getFieldValue(id);
                      setCart([
                        ...cartItems,
                        { id, name, pic_name, price, count },
                      ]);
                      count &&
                        message.info(
                          `Товар '${name}' добавлен в корзину (${count} шт)`
                        );
                    }}
                  >
                    В корзину
                  </Button>
                </div>
              </div>
            </Card.Grid>
          ))
        ) : (
          <Empty description='Этот каталог пока отсутствует'></Empty>
        )}
      </Card>
    </Form>
  );
}
