import { delete_, get, post } from '../../http/base';
import { OrderPOST } from './interface';

export const getOrders = () =>
  get('/orders')
    .then((response) => response.data)
    .catch(() => []);

export const postOrder = (params: OrderPOST) =>
  post('/orders', params).then((response) => response.data);

export const deleteOrder = (id: number) =>
  delete_(`/orders/${id}`).then((response) => response.data);
