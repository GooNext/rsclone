import TaskStore from '../../stores/TaskStore';
import TaskPageHeader from './TaskPageHeader';

const Task = ({ match }: any) => {
  const { id } = match.params;
  TaskStore.getTask(id);
  const taskInfo = TaskStore.task;
  const { title, time, icon } = taskInfo;

  return <TaskPageHeader title={title} time={time} icon={icon} id={id} />;
};

export default Task;
