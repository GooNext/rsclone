/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Skeleton, Card, Avatar, Popover, Space, message, PageHeader } from 'antd';
import { EditOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Meta from 'antd/lib/card/Meta';
import CategoriesStore from '../../stores/CategoriesStore';
import './AllCategories.scss';
import UserStore from '../../stores/UserStore';
import placeholder from '../../img/placeholder.png';
import { OnCategoryEdit } from '../../components/Modals/Modals';

interface ItemType {
  title: string;
  _id: string;
  t: any;
  description: string;
  userId: string;
}

interface PropsType {
  title: string;
  _id: string;
  t: any;
  description: string;
}

const CategoryItem = ({ t, title, _id, description }: PropsType) => {
  const [state, setState] = useState(false);
  const [editCategory, setIsCategory] = useState(false);
  const categoryInfo = {
    title,
    id: _id,
    description,
  };

  const handle = {
    editCategoryModal: (e) => setIsCategory(e),
  };

  const deleteCategory = () => {
    CategoriesStore.deleteCategory(_id);
    message.info(`${t('Category with id - ')}${_id} ${t('has been successfully deleted')}`);
    setState(false);
  };

  return (
    <Card
      style={{ width: 300, marginTop: 16 }}
      actions={[
        <EditOutlined onClick={() => setIsCategory(true)} key="edit" />,
        <Popover
          content={
            <div className="allCategories__popover--item" onClick={() => deleteCategory()}>
              <Space size={8}>
                <DeleteOutlined style={{ color: 'red' }} />
                {t('Delete category')}
              </Space>
            </div>
          }
          title={t('Category submenu')}
          trigger="click"
          visible={state}
          onVisibleChange={setState}
        >
          <EllipsisOutlined key="ellipsis" />
        </Popover>,
      ]}
    >
      <OnCategoryEdit
        categoryInfo={categoryInfo}
        setIsModalVisible={handle.editCategoryModal}
        isModalVisible={editCategory}
      />
      <Link to={`/categories/${_id}`}>
        <Skeleton avatar loading={false} active>
          <Meta avatar={<Avatar src={placeholder} />} title={title} description={description || '...'} />
        </Skeleton>
      </Link>
    </Card>
  );
};

const AllCategories = () => {
  const { categories } = CategoriesStore;
  const { t } = useTranslation();
  return (
    <>
      <PageHeader
        className="category__header"
        title={t('All available categories')}
        subTitle={t('Choose your own category')}
      />
      <div className="allCategories">
        <Space className="allCategories" wrap size={20}>
          {categories.map((item: ItemType) => (
            <React.Fragment key={item._id}>
              {item.userId === UserStore.user[0]?._id ? (
                <CategoryItem description={item.description} t={t} _id={item._id} title={item.title} />
              ) : null}
            </React.Fragment>
          ))}
        </Space>
      </div>
    </>
  );
};

export default observer(AllCategories);
