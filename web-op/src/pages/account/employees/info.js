import { Card, Descriptions, Divider, Button } from 'antd';
import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getUserInfo } from './service';
import { messageErr } from '../../../utils/utils';

class Infocon extends Component {
  state = {
    userinfo: {},
  };

  componentDidMount() {
    const params = this.props.match.params || {};
    const userId = params.id;
    if (userId) {
      this.getInfoData(userId);
    } else {
      messageErr('无效的用户');
    }
  }

  // get userinfo
  getInfoData = async userId => {
    const result = await getUserInfo({ userId });
    if (result.code == '1') {
      this.setState({
        userinfo: result.data || {},
      });
    } else {
      messageErr(result.msg);
    }
  };

  handgoback = () => {
    this.props.history.goBack();
  };

  render() {
    const { userinfo } = this.state;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Divider
            style={{
              marginBottom: 32,
            }}
          />
          <Descriptions
            title="用户信息"
            style={{
              marginBottom: 32,
            }}
          >
            <Descriptions.Item label="用户名">{userinfo.username}</Descriptions.Item>
            <Descriptions.Item label="手机号">{userinfo.mobile}</Descriptions.Item>
            <Descriptions.Item label="性别">{userinfo.sex}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{userinfo.email}</Descriptions.Item>
          </Descriptions>
        </Card>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Button onClick={() => this.handgoback()} type="primary">返回</Button>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Infocon;
