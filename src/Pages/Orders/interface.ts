import { CartItemObject } from '../Cart/interface';

export interface OrderPOST {
  date: number;
  items: CartItemObject[];
}

export interface Order extends OrderPOST {
  id: number;
}
