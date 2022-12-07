import {
  ContactsOutlined,
  FontColorsOutlined,
  NotificationOutlined,
  RocketOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
  TeamOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RouterUnpack } from './constants';
import CartContext from './contexts/CartContext';
import About from './Pages/About/About';
import Cart from './Pages/Cart/Cart';
import { CartItemObject } from './Pages/Cart/interface';
import Catalog from './Pages/Catalog/Catalog';
import Contacts from './Pages/Contacts/Contacts';
import ForPartners from './Pages/ForPartners/ForPartners';
import CustomLayout from './Pages/Layout';
import News from './Pages/News/News';
import Orders from './Pages/Orders/Orders';
import PaymentAndDelivery from './Pages/PaymentAndDelivery/PaymentAndDelivery';
import Sale from './Pages/Sale/Sale';

export const Pages = {
  ABOUT: {
    path: '/about',
    element: <About />,
    name: 'О компании',
    icon: FontColorsOutlined,
    defaultInnerPath: '',
  },
  CATALOG: {
    path: '/catalog',
    element: <Catalog />,
    name: 'Каталог',
    icon: ShopOutlined,
    defaultInnerPath: '',
  },
  FOR_PARTNERS: {
    path: '/for-partners',
    element: <ForPartners />,
    name: 'Партнерам',
    icon: TeamOutlined,
    defaultInnerPath: '',
  },
  NEWS: {
    path: '/news',
    element: <News />,
    name: 'Новости',
    icon: NotificationOutlined,
    defaultInnerPath: '',
  },
  PAYMENT_AND_DELIVERY: {
    path: '/payment-and-delivery',
    element: <PaymentAndDelivery />,
    name: 'Оплата и доставка',
    icon: RocketOutlined,
    defaultInnerPath: '',
  },
  SALE: {
    path: '/sale',
    element: <Sale />,
    name: 'Предложения',
    icon: SmileOutlined,
    defaultInnerPath: '',
  },
  CONTACTS: {
    path: '/contacts',
    element: <Contacts />,
    name: 'Контакты',
    icon: ContactsOutlined,
    defaultInnerPath: '',
  },
  ORDERS: {
    path: '/orders',
    element: <Orders />,
    name: 'Мои заказы',
    icon: WalletOutlined,
    defaultInnerPath: '',
  },
};

const CART = {
  CART: {
    path: '/cart',
    element: <Cart />,
    name: 'Корзина',
    icon: <ShoppingCartOutlined />,
    defaultInnerPath: '',
  },
};

export default function App() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('basket') || '[]')
  );
  const setCart = (cartItems: CartItemObject[]) => {
    localStorage.setItem('basket', JSON.stringify(cartItems));
    setCartItems(JSON.parse(localStorage.getItem('basket') || '[]'));
  };
  const clearCart = () => {
    localStorage.setItem('basket', '[]');
    setCartItems([]);
  };
  return (
    <BrowserRouter>
      <CartContext.Provider value={{ cartItems, setCart, clearCart }}>
        <CustomLayout>
          <RouterUnpack routes={{ ...Pages, ...CART }} defaultPath={'/about'} />
        </CustomLayout>
      </CartContext.Provider>
    </BrowserRouter>
  );
}
