import { Alert, Breadcrumb, Button, PageHeader, Popover, Progress } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Board from 'react-trello';
import { CheckOutlined, DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import BoardsStore from '../../stores/BoardsStore';
import CategoriesStore from '../../stores/CategoriesStore';
import TasksStore from '../../stores/TasksStore';
import { AddNewBoard, AddNewTask, OnTaskEdit } from '../../components/Modals/Modals';
import BoardsData from './BoardsData';

import './Category.scss';

const Category = ({ match }: any) => {
  const { t } = useTranslation();
  const [newBoard, setNewBoard] = useState(false);
  const [newTask, setNewTask] = useState(false);
  const filteredCategory = CategoriesStore.categories.filter((e: any) => e._id === match.params.id)[0];
  const categoryInfo = {
    id: match.params.id,
    title: filteredCategory?.title,
  };

  useEffect(() => {
    BoardsStore.getBoards();
  }, []);

  const handle = {
    addNewBoard: (e: boolean) => setNewBoard(e),
    addNewTask: (e: boolean) => setNewTask(e),
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onDragEnd = (cardId, sourceLaneId, targetLaneId, position) => {
    const taskId = cardId;
    const boardId = targetLaneId;
    if (sourceLaneId !== targetLaneId) TasksStore.updateTaskByBoardId(taskId, boardId);
  };

  const onTaskDelete = (cardId) => {
    TasksStore.deleteTask(cardId);
  };

  const onBoardDelete = (id) => {
    BoardsStore.deleteBoard(id);
  };

  const onStatusUpdate = (id, isCompleted) => {
    TasksStore.updateStatus(id, { isCompleted: !isCompleted });
  };

  const CustomBoardHeader = (e) => {
    const { title, label } = e;
    const isCompletedCards = e.cards.filter((card) => card.isCompleted);
    return (
      <div className="card">
        <div className="card__progress">
          <Progress
            strokeLinecap="square"
            status="active"
            percent={isCompletedCards.length < 1 ? 1 : Math.ceil((isCompletedCards.length / e.cards.length) * 100)}
          />
        </div>
        <div className="card__content">
          <h4 className="card__title">
            {title} {label}
          </h4>
          <div>
            <Popover
              content={
                <span onClick={() => onBoardDelete(e.id)} style={{ cursor: 'pointer' }}>
                  <DeleteOutlined style={{ color: 'red' }} /> {t('Delete board')}
                </span>
              }
            >
              <MoreOutlined />
            </Popover>
          </div>
        </div>
      </div>
    );
  };

  const CustomTask = (e) => {
    const { title, description, id, isCompleted } = e;
    const [updateTask, setUpdateTask] = useState(false);

    const update = {
      updateTask: (elem: boolean) => setUpdateTask(elem),
    };

    const taskInfo = {
      title,
      description,
    };

    return (
      <div className="task">
        {updateTask ? (
          <OnTaskEdit
            taskInfo={taskInfo}
            taskId={id}
            setIsModalVisible={update.updateTask}
            isModalVisible={updateTask}
          />
        ) : null}
        <div className="task__title df justify-between align-items-center">
          <h3 className="task__title">{title}</h3>
          <Popover
            content={
              <div>
                <div className="task__menu--item" onClick={() => setUpdateTask(true)} style={{ cursor: 'pointer' }}>
                  <EditOutlined style={{ color: 'blue' }} /> {t('Edit task')}
                </div>
                <div
                  className="task__menu--item"
                  onClick={() => onStatusUpdate(id, isCompleted)}
                  style={{ cursor: 'pointer' }}
                >
                  <CheckOutlined style={{ color: 'green' }} /> {t('Change status')}
                </div>
                <div className="task__menu--item" onClick={() => onTaskDelete(id)} style={{ cursor: 'pointer' }}>
                  <DeleteOutlined style={{ color: 'red' }} /> {t('Delete task')}
                </div>
              </div>
            }
          >
            <MoreOutlined style={{ color: '#333' }} />
          </Popover>
        </div>
        <hr />
        <div className="task__body">
          <small>{description}</small>
        </div>
        <Progress status={!isCompleted ? 'exception' : 'success'} percent={100} size="small" />
      </div>
    );
  };

  const data = BoardsData(match.params.id);

  return (
    <>
      <div className="category__header">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">{t('All categories')}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{categoryInfo.title}</Breadcrumb.Item>
        </Breadcrumb>
        <PageHeader className="category__header df justify-between" title={`All boards for ${categoryInfo.title}`}>
          <div className="df">
            <div style={{ margin: '0 3px' }} className="category__header--board">
              <Button onClick={() => setNewBoard(true)}>{t('Add new board')}</Button>
              <AddNewBoard
                categoryId={match.params.id}
                isModalVisible={newBoard}
                setIsModalVisible={handle.addNewBoard}
              />
            </div>
            <div style={{ margin: '0 3px' }} className="category__header--task">
              <Button onClick={() => setNewTask(true)}>{t('Add new task')}</Button>
              <AddNewTask categoryId={match.params.id} isModalVisible={newTask} setIsModalVisible={handle.addNewTask} />
            </div>
          </div>
        </PageHeader>
      </div>
      <div className="category__body">
        {data.lanes.length ? (
          <Board
            laneStyle={{ backgroundColor: 'none' }}
            style={{ color: '#fff' }}
            handleDragEnd={onDragEnd}
            collapsibleLanes
            components={{ LaneHeader: CustomBoardHeader, Card: CustomTask }}
            data={data}
          />
        ) : (
          <Alert
            className="w100"
            message={t('There are no boards')}
            description={t("There are no boards now. Click on the 'Add boards' button to add a new one")}
            type="warning"
            showIcon
          />
        )}
      </div>
    </>
  );
};

export default withRouter(observer(Category));
