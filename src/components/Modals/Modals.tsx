/* eslint-disable react-hooks/exhaustive-deps */
import { Input, message, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { getUserByLogin } from '../../api';
import BoardsStore from '../../stores/BoardsStore';
import CategoriesStore from '../../stores/CategoriesStore';
import TasksStore from '../../stores/TasksStore';

export const AddNewBoard = ({ setIsModalVisible, isModalVisible, categoryId }: any) => {
  const { t } = useTranslation();
  const [sendObj, setSendObj] = useState({
    title: '',
    time: new Date(),
    icon: '1242154',
    categoryId,
  });

  const handleOk = useCallback(() => {
    if (sendObj.title) {
      BoardsStore.addBoard(sendObj);
      message.info(t('Board has been successfully added'));
      setIsModalVisible(false);
    } else message.error(t('Please enter a title'));
  }, [sendObj, setIsModalVisible, t]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = useCallback((e) => setSendObj({ ...sendObj, title: e.target.value }), [sendObj]);

  return (
    <Modal title={t('Add new board')} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Input onChange={handleInputChange} placeholder={t('Enter title')} />
    </Modal>
  );
};

export const AddNewTask = ({ setIsModalVisible, isModalVisible, categoryId }: any) => {
  const { t } = useTranslation();
  const [sendObj, setSendObj] = useState({
    title: '',
    time: new Date(),
    description: '',
    icon: '1242154',
    categoryId,
    isCompleted: false,
    boardId: '',
  });

  const handleOk = useCallback(() => {
    if (sendObj.title && sendObj.boardId) {
      TasksStore.addNewTask(sendObj);
      message.info(t('Task has been successfully added'));
      setIsModalVisible(false);
    } else message.error(t('Add title and board name'));
  }, [sendObj, setIsModalVisible, t]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handle = {
    inputChange: (e) => setSendObj({ ...sendObj, title: e.target.value }),
    selectChange: (e) => setSendObj({ ...sendObj, boardId: e }),
    textArea: (e) => setSendObj({ ...sendObj, description: e.target.value }),
  };

  return (
    <div>
      <Modal title={t('Add new task')} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input onChange={(e) => handle.inputChange(e)} placeholder={t('Enter title')} />
        <Select
          showSearch
          style={{ width: '100%', margin: '15px 0' }}
          placeholder={t('Select a board')}
          optionFilterProp="children"
          onChange={handle.selectChange}
          filterOption={(input: any, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {BoardsStore.boards.map((item: any) => {
            return <>{categoryId === item.categoryId ? <Option value={item._id}>{item.title}</Option> : null}</>;
          })}
        </Select>
        <TextArea placeholder={t('Enter a description')} rows={4} onChange={handle.textArea} />
      </Modal>
    </div>
  );
};

export const AddNewCategory = observer(({ setIsModalVisible, isModalVisible }: any) => {
  const { t } = useTranslation();
  const [sendObj, setSendObj] = useState({
    title: '',
    time: new Date(),
    icon: '1242154',
    description: '',
    userId: '',
  });

  useEffect(() => {
    getUserByLogin(localStorage.getItem('userLogin')).then((res: any) =>
      setSendObj({ ...sendObj, userId: res[0]?._id })
    );
  }, []);

  const handleOk = useCallback(() => {
    if (sendObj.title) {
      CategoriesStore.addCategory(sendObj);
      message.info(t('Category has been successfully added'));
      setIsModalVisible(false);
    } else message.error(t('Please enter a title'));
  }, [sendObj, setIsModalVisible, t]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handle = {
    inputChange: (e) => setSendObj({ ...sendObj, title: e.target.value }),
    textArea: (e) => setSendObj({ ...sendObj, description: e.target.value }),
  };

  return (
    <Modal title={t('Add new category')} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Input onChange={handle.inputChange} placeholder={t('Enter title')} />
      <TextArea
        style={{ margin: '15px 0' }}
        placeholder={t('Enter a description')}
        rows={4}
        onChange={handle.textArea}
      />
    </Modal>
  );
});

export const OnTaskEdit = ({ taskId, taskInfo, setIsModalVisible, isModalVisible }: any) => {
  const { t } = useTranslation();
  const [sendObj, setSendObj] = useState({
    title: taskInfo.title,
    description: taskInfo.description,
  });

  const handleOk = useCallback(() => {
    TasksStore.updateTask(sendObj, taskId);
    message.info(t('Task has been successfully updated'));
    setIsModalVisible(false);
  }, [sendObj, setIsModalVisible, taskId, t]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handle = {
    inputTitleChange: (e) => setSendObj({ ...sendObj, title: e.target.value }),
    inputDescriptionChange: (e) => setSendObj({ ...sendObj, description: e.target.value }),
  };

  return (
    <div>
      <Modal title="Update task info" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input style={{ marginBottom: '15px' }} onChange={(e) => handle.inputTitleChange(e)} placeholder="Edit title" />
        <TextArea placeholder={t('Edit description')} rows={4} onChange={(e) => handle.inputDescriptionChange(e)} />
      </Modal>
    </div>
  );
};

export const OnCategoryEdit = ({ categoryInfo, setIsModalVisible, isModalVisible }: any) => {
  const { t } = useTranslation();
  const [sendObj, setSendObj] = useState({
    title: categoryInfo.title,
    description: categoryInfo.description,
  });

  const handleOk = useCallback(() => {
    CategoriesStore.updateCategory(sendObj, categoryInfo.id);
    message.info(t('Category has been successfully updated'));
    setIsModalVisible(false);
  }, [sendObj, setIsModalVisible, categoryInfo.id, t]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handle = {
    inputTitleChange: (e) => setSendObj({ ...sendObj, title: e.target.value }),
    inputDescriptionChange: (e) => setSendObj({ ...sendObj, description: e.target.value }),
  };

  return (
    <div>
      <Modal title="Update category info" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input style={{ marginBottom: '15px' }} onChange={(e) => handle.inputTitleChange(e)} placeholder="Edit title" />
        <TextArea placeholder={t('Edit description')} rows={4} onChange={(e) => handle.inputDescriptionChange(e)} />
      </Modal>
    </div>
  );
};
