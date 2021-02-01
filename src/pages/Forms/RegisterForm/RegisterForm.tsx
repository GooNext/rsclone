import { Button, Input, Form } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { registerUser } from '../../../api';
import '../RegisterForm.scss';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const RegisterForm = () => {
  const onFinish = (values: any) => {
    registerUser(values);
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <h1>Registration</h1>
        <Form {...layout} name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item label="Login" name="login" rules={[{ required: true, message: 'Please input your login!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <p>
            If you are alredy registered <Link to="/auth">click here</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default withRouter(RegisterForm);
