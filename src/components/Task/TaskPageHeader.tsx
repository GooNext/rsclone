import { Button, PageHeader, Popconfirm, message } from 'antd';
import { withRouter } from 'react-router-dom';
import TasksStore from '../../stores/TasksStore';

const TaskPageHeader = (props: any) => {
  const { title, time, id } = props;
  const onConfirm = () => {
    TasksStore.deleteTask(id);
    props.history.push('/');
    message.info('Task has been successfully deleted');
  };

  return (
    <PageHeader
      className="site-page-header df justify-between w100"
      onBack={() => props.history.push('/')}
      title={title}
      subTitle={`Created at ${time}`}
    >
      <Popconfirm
        placement="bottom"
        title="Are you sure to delete this task?"
        onConfirm={onConfirm}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Delete task</Button>
      </Popconfirm>
    </PageHeader>
  );
};

export default withRouter(TaskPageHeader);
