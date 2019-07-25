import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { login } from './service';
import router from 'umi/router';
import styles from './index.less';


class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const result = await login(values);
        console.log('result',result)
        if (result.code == '1') {
          const token = result.data.token;
          const userId = result.data.id;
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          router.push({
            pathname: '/',
          });
        } else {
          message.error(result.msg);
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.login_form}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入账号' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入账号"
                size="large"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                size="large"
                type="password"
                placeholder="请输入密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className={styles.login_form_button}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const Loginform = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Loginform;
