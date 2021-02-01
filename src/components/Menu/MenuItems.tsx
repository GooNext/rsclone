import { Button, Menu, Spin, Tooltip } from 'antd';
import './Menu.scss';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CategoriesStore from '../../stores/CategoriesStore';
import { AddNewCategory } from '../Modals/Modals';
import UserStore from '../../stores/UserStore';

interface SubMenuType {
  title: string;
  _id: string;
  userId: string;
}

const RenderMenuItems = observer(({ showModal }: any) => {
  const [state] = useState({ collapsed: false });
  const { t } = useTranslation();
  // const [taskState, setTaskState] = useState(false);
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      inlineCollapsed={state.collapsed}
    >
      {CategoriesStore.categories.length ? (
        CategoriesStore.categories.map((item: SubMenuType) => {
          return (
            <>
              {item.userId === UserStore.user[0]?._id ? (
                <Menu.Item key={item._id}>
                  <Link to={`/categories/${item._id}`}>{item.title}</Link>
                </Menu.Item>
              ) : null}
            </>
          );
        })
      ) : (
        <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Spin />
        </div>
      )}
      <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Tooltip placement="top" title={t('Add new category')}>
          <Button onClick={showModal}>
            <PlusOutlined />
          </Button>
        </Tooltip>
      </div>
    </Menu>
  );
});

const MenuItems = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sendObj, setSendObj] = useState({
    title: '',
    time: new Date(),
    icon: '1242154',
  });

  const handle = {
    setSendObj: (e: any) => setSendObj(e),
    setIsModalVisible: (e: boolean) => setIsModalVisible(e),
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <RenderMenuItems showModal={showModal} />
      <AddNewCategory
        setIsModalVisible={handle.setIsModalVisible}
        isModalVisible={isModalVisible}
        sendObj={sendObj}
        setSendObj={handle.setSendObj}
        showModal={showModal}
      />
    </>
  );
};

export default MenuItems;
