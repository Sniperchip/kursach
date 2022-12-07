import { createContext } from 'react';
import { Callback } from '../hooks/useFetching';
import { CartItemObject } from '../Pages/Cart/interface';

const CartContext = createContext(
  {} as {
    cartItems: CartItemObject[];
    setCart: Callback;
    clearCart: Callback;
  }
);

export default CartContext;
