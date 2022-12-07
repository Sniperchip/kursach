import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, Layout, Menu, MenuProps } from 'antd';
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Pages } from '../App';
import logo from '../assets/logo.png';
import { routesToArray } from '../constants';
import CartContext from '../contexts/CartContext';
import './Layout.css';

const { Header, Content, Footer, Sider } = Layout;

export default function CustomLayout({ children }: { children: JSX.Element }) {
  const redirectTo = useNavigate();
  const { pathname } = useLocation();
  const { cartItems } = useContext(CartContext);

  const items: MenuProps['items'] = routesToArray(Pages).map(
    ({ path, icon, name }) => ({
      key: path,
      icon: React.createElement(icon),
      label: name,
      onClick: () => redirectTo(path),
    })
  );
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className='logo'>
          <Link to='/about'>
            <img src={logo} alt='' />
          </Link>
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[pathname || '/about']}
          items={items}
          selectedKeys={[pathname]}
        />
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }}>
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: '.5rem 2rem',
            }}
          >
            <Badge count={cartItems.length}>
              <Link to={'/cart'}>
                <Button
                  size='large'
                  type='primary'
                  icon={<ShoppingCartOutlined />}
                ></Button>
              </Link>
            </Badge>
          </div>
        </Header>
        <Content className='content'>
          {children ? children : <>No content</>}
        </Content>

        <Footer
          style={{
            textAlign: 'center',
            boxShadow:
              '0 1px 2px -2px rgba(0, 0, 0, 0.16),0 3px 6px 0 rgba(0, 0, 0, 0.12),0 5px 12px 4px rgba(0, 0, 0, 0.09)',
          }}
        >
          <div className='footer'>
            <div className='footer-column'>
              <span>Эл. почта: info@a3c.ru</span>
              <span>Эл. почта: mail@3257272.ru</span>
              <span>Адрес: г.Новосибирск, ул. Выставочная 15/1, корп.3</span>
            </div>
            <div className='footer-column'>
              <span>Информация</span>
              <Link to='/for-partners'>Партнерам</Link>
              <Link to='/payment-and-delivery'>Условия доставки и оплаты</Link>
            </div>
            <div className='footer-column'>
              <Link to='/catalog'>Каталог</Link>
            </div>
            <div className='footer-column'>
              <span>8 800 775 04 79</span>
              <span>© 2022 Все права защищены.</span>
            </div>
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
}
