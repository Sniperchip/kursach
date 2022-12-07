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
import CartContext from '../../contexts/CartContext';
import useFetching from '../../hooks/useFetching';
import { getCatalogs } from '../Catalog/http';
import { Catalog, CatalogItemObject } from '../Catalog/interface';

export default function Sale() {
  const [catalogItems, setCatalogItems] = useState<CatalogItemObject[]>([]);
  const { cartItems, setCart } = useContext(CartContext);

  const [fetchSpecials] = useFetching({
    fetch: async () => getCatalogs(),
    afterFetch: (catalogs: Catalog[]) => {
      let catalogItems = [] as CatalogItemObject[];
      catalogs.forEach(
        (catalog) =>
          catalog.items &&
          catalog.items.forEach(
            (catalogItem: CatalogItemObject) =>
              catalogItem.special && catalogItems.push(catalogItem)
          )
      );
      return setCatalogItems(catalogItems);
    },
  });
  useEffect(() => {
    fetchSpecials();
  }, []); //eslint-disable-line

  const [form] = useForm();
  return (
    <Form form={form}>
      <Card title='Специальные предложения' style={{ width: '100%' }}>
        {catalogItems.length ? (
          catalogItems.map(({ id, name, pic_name, price }) => (
            <Card.Grid key={`${name}${id}`}>
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
                  <Form.Item initialValue={1} name={`${name}${id}`}>
                    <InputNumber></InputNumber>
                  </Form.Item>
                  <Button
                    type='primary'
                    onClick={() => {
                      const count = form.getFieldValue(`${name}${id}`);
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
