import { Avatar, Button, List, message, Table, Empty } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import useFetching from '../../hooks/useFetching';
import { deleteOrder, getOrders } from './http';
import { Order } from './interface';

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>();

  const [fetchOrders, loadingOrders] = useFetching({
    fetch: async () => await getOrders(),
    afterFetch: (orders: Order[]) => setOrders(orders),
  });

  const [fetchOrderDELETE] = useFetching({
    fetch: async (id: number) => await deleteOrder(id),
    afterFetch: () => {
      fetchOrders();
      message.info('Заказ успешно удален!');
    },
  });

  useEffect(() => {
    fetchOrders();
  }, []); //eslint-disable-line

  const columns: ColumnsType<Order> = [
    { title: '№ Заказа', dataIndex: 'id' },
    {
      title: 'Дата',
      dataIndex: 'date',
      render: (date: number) =>
        `${new Date(date).toLocaleDateString()} ${new Date(
          date
        ).toLocaleTimeString()}`,
    },
    {
      title: 'Кол-во товаров',
      key: 'count',
      render: (order: Order) => order.items.length,
    },
    {
      title: 'Сумма, руб.',
      key: 'amount',
      render: (order: Order) =>
        order.items.reduce((agg, { price, count }) => agg + price * count, 0),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (order: Order) => (
        <Button onClick={() => fetchOrderDELETE(order.id)}>
          Отменить заказ
        </Button>
      ),
    },
  ];

  return (
    <Table
      rowKey={'id'}
      loading={loadingOrders}
      dataSource={orders}
      columns={columns}
      locale={{emptyText: <Empty description="Нет актуальных заказов"></Empty>}}
      expandable={{
        expandedRowRender: (order) => (
          <List
            size='small'
            itemLayout='horizontal'
            dataSource={order.items}
            renderItem={({ id, price, count, name, pic_name }) => (
              <List.Item key={id}>
                <List.Item.Meta
                  avatar={<Avatar src={require(`../../assets/${pic_name}`)} />}
                  title={name}
                  description={`${price * count} руб.`}
                />
              </List.Item>
            )}
          />
        ),
        rowExpandable: (order) => !!order.items.length,
      }}
    />
  );
}
