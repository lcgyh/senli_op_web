import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Card, Col, Form, Icon, Input, Row } from 'antd';

const FormItem = Form.Item;
const gutter = {
  md: 8,
  lg: 24,
  xl: 48,
};

@connect(({ exployees, loading }) => ({
  exployees,
}))
class SearchCard extends Component {
  state = {
    expandForm: false,
  };

  // 调用查询显示数据
  componentDidMount() {
    this.initSearchvalue();
  }

  // 注销数据
  componentWillUnmount() {
    this.props.dispatch({
      type: 'exployees/initState',
    });
  }

  // 初始化搜索条件
  initSearchvalue = () => {
    this.handleSearch()
  };

  // 查询数据
  handleSearch = (pageSize, current) => {
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        values.pageSize = pageSize || 10;
        values.current = current || 1;
        this.props.dispatch({
          type: 'exployees/fetch',
          payload: values,
        });
      }
    });
  };

  // form 搜索项
  renderForm = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form layout="inline">
        <Row gutter={gutter}>
          <Col md={7} sm={24}>
            <FormItem label="用户名">
              {getFieldDecorator('username')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            <FormItem label="手机号">
              {getFieldDecorator('mobile')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          {/* {this.expandForm()} */}
        </Row>
        {this.renderSubmit()}
      </Form>
    );
  };

  // 查询 重置行
  renderSubmit = () => (
    <Row gutter={gutter}>
      <Col md={24} sm={24} align="center">
        <Button type="primary" onClick={() => this.handleSearch(10, 1)}>
          查询
        </Button>
        <Button
          style={{
            marginLeft: 8,
          }}
          onClick={this.handleFormReset}
        >
          重置
        </Button>
      </Col>
    </Row>
  );

  // 展开与收起组件
  expandForm = () => (
    <Col md={3} sm={24}>
      <span onClick={this.toggleForm}>
        {!this.state.expandForm ? (
          <a>
            展开 <Icon type="down" />
          </a>
        ) : (
          <a>
            收起 <Icon type="up" />
          </a>
        )}
      </span>
    </Col>
  );

  // 展开和收起函数
  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  render() {
    return (
      <Card>
        <div className="tableListForm">{this.renderForm()}</div>
      </Card>
    );
  }
}

export default Form.create()(SearchCard);
