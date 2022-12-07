import { Button, Card, Empty, Image, message, Tag } from 'antd';
import { useContext } from 'react';
import CartContext from '../../contexts/CartContext';
import useFetching from '../../hooks/useFetching';
import { postOrder } from '../Orders/http';
import { Order, OrderPOST } from '../Orders/interface';

export default function Cart() {
  const { cartItems, clearCart } = useContext(CartContext);

  const [fetchOrderPOST] = useFetching({
    fetch: async (order: OrderPOST) => await postOrder(order),
    afterFetch: (order: Order) => {
      clearCart();
      message.info(`Заказ № ${order.id} успешно создан`);
    },
  });

  return cartItems.length ? (
    <Card
      title='Корзина'
      style={{ width: '100%' }}
      extra={`${cartItems.reduce(
        (agg, { price, count }) => agg + price * count,
        0
      )} руб.`}
      actions={[
        <Button onClick={() => clearCart()}>Очистить</Button>,
        <Button
          type='primary'
          onClick={() => fetchOrderPOST({ items: cartItems, date: Date.now() })}
        >
          Купить
        </Button>,
      ]}
    >
      {cartItems.map(({ id, name, pic_name, price, count }) => (
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
              <Tag>{price * count} руб.</Tag>
            </div>
          </div>
        </Card.Grid>
      ))}
    </Card>
  ) : (
    <Empty description='Корзина пуста'></Empty>
  );
}
