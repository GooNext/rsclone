import './App.scss';
import { useTranslation } from 'react-i18next';
import { Route, Switch, withRouter } from 'react-router-dom';
// import { useEffect } from 'react';
import { useEffect } from 'react';
import Layout, { Content, Footer } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import routes from '../routes/routes';
import MenuItems from '../components/Menu/MenuItems';
import MainHeader from './Header/Header';
import RegisterForm from '../pages/Forms/RegisterForm/RegisterForm';
import AuthForm from '../pages/Forms/AuthForm/AuthForm';
// import { getAccessToken } from '../utils';
import CategoriesStore from '../stores/CategoriesStore';
import TasksStore from '../stores/TasksStore';
import UserStore from '../stores/UserStore';

type LocationType = {
  pathname: string;
};

type PropsType = {
  location: LocationType;
};

const App = ({ location: { pathname } }: PropsType) => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const fetchingData = () => {
    CategoriesStore.getCategories();
    TasksStore.getTasks();
  };

  useEffect(() => {
    UserStore.getUserByLogin();
  }, []);

  const isToken = localStorage.getItem('token');

  return (
    <>
      {pathname === '/auth' || pathname === '/register' ? (
        <Switch>
          <Route component={RegisterForm} key="RegisterForm" path="/register" exact name="Register" />
          <Route component={AuthForm} key="AuthForm" path="/auth" exact name="Auth" />
        </Switch>
      ) : (
        <Layout style={{ minHeight: '100vh' }}>
          {fetchingData()}
          <Sider collapsible>
            <div className="logo">!ℵT✺Nḙ✘т</div>
            <MenuItems />
          </Sider>
          <Layout className="site-layout">
            <MainHeader isToken={isToken} t={t} changeLanguage={changeLanguage} />
            <Content style={{ margin: '0 16px' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Switch>
                  {routes.map((route) => {
                    return (
                      <Route
                        component={route.component}
                        key={route.path}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                      />
                    );
                  })}
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                Created by <a href="https://github.com/GooNext">GooNext</a> &{' '}
                <a href="https://github.com/sergeytestweb">sergeytestweb</a> ©2021
              </div>
              <div style={{ opacity: '0.3' }}>
                <a href="https://rs.school/">
                  <img src="https://app.rs.school/static/images/logo-rsschool3.png" alt="xuinya" width="60px" />
                </a>
              </div>
            </Footer>
          </Layout>
        </Layout>
      )}
    </>
  );
};

export default withRouter(App);
