import React, { Component, Fragment } from 'react';
import router from 'umi/router';
import { Button, Card, Divider } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import EditableTable from '../../../components/StandardTable';

@connect(({ exployees, loading }) => ({
  exployees,
  list: exployees.list || [],
  total: exployees.total || 0,
  pageSize: exployees.pageSize || 10,
  current: exployees.current || 1,
  searchValue: exployees.searchValue || {},
  loading: loading.models.exployees,
}))
class TableCard extends Component {
  columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      render: (text, record) => (<a onClick={() => this.hindInfo(record)}>{text}</a>),
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '创建时间',
      dataIndex: 'updatedAt',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdate(record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => { this.handDelete(record) }}>删除</a>
        </Fragment>
      ),
    },
  ];


  // 跳转用户详情
  hindInfo=record => {
    router.push({
      pathname: `/account/employees/info/${record.id}`,
    });
  }

  // 编辑用户信息
  handleUpdate = record => {
    router.push({
      pathname: `/account/employees/edit/${record.id}`,
    });
  };

  // 删除用户
  handDelete=() => {

  }

  // 分页
  handleStandardTableChange = (pageSize, current) => {
    const { searchValue } = this.props;
    searchValue.pageSize = pageSize;
    searchValue.current = current;
    this.props.dispatch({
      type: 'exployees/fetch',
      payload: searchValue,
    });
  };

  // 新建
  handleadd = () => {
    router.push({
      pathname: '/account/employees/add',
    });
  };

  // render table and form 之间的操作项
  renderOpera = () => (
    <div className="tableList">
      <div className="tableListOperator">
        <Button icon="plus" type="primary" onClick={() => this.handleadd(true)}>
          新建
        </Button>
      </div>
    </div>
  );

  render() {
    return (
      <Card style={{ marginTop: '10px' }}>
        {this.renderOpera()}
        <EditableTable
          loading={this.props.loading}
          dataSource={this.props.list}
          columns={this.columns}
          pageSizeChange={this.handleStandardTableChange}
          pagination
          total={this.props.total || 0}
          pageSize={this.props.pageSize || 10}
          current={this.props.current || 1}
        />
      </Card>
    );
  }
}

export default TableCard;
