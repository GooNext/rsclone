import { Button, Input, Form } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { loginUser } from '../../../api';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AuthForm = () => {
  const onFinish = (values: any) => {
    loginUser(values).then((res: any) => {
      window.location.href = '/';
      localStorage.setItem('token', res.token);
      localStorage.setItem('userLogin', values.login);
    });
  };

  const onFinishFailed = () => {};

  return (
    <div className="auth">
      <div className="auth__container">
        <h1>Sign in</h1>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Login" name="login" rules={[{ required: true, message: 'Please input your login!' }]}>
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
            If you are not registered <Link to="/register">Click here</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default withRouter(AuthForm);
