/* eslint-disable jsx-a11y/alt-text */
import { Button, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { Link } from 'react-router-dom';
import { logout } from '../../utils';

const MainHeader = (props: any) => {
  const { t, changeLanguage, isToken } = props;
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <div className="header__container">
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link to="/">{t('All categories')}</Link>
          </Menu.Item>
        </Menu>
        <div className="df align-items-center header__container--right">
          <div className="header__container--locales">
            <div className="locale locale__en" onClick={() => changeLanguage('en')} />
            <div className="locale locale__ru" onClick={() => changeLanguage('ru')} />
            <div className="locale locale__zh" onClick={() => changeLanguage('zh')} />
          </div>
          <div className="header__container--auth">
            {isToken ? <Button onClick={logout}>Sign out</Button> : <Button type="primary">Sign in</Button>}
          </div>
        </div>
      </div>
    </Header>
  );
};

export default MainHeader;
