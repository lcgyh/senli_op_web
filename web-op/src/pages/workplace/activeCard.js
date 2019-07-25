import React, { Component } from "react";
import styles from "./style.less";
import { Avatar, Card, Col, List, Skeleton, Row, Statistic } from "antd";
import moment from 'moment';
import Link from 'umi/link';





class Activelist extends React.Component {

  renderActivities = item => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
      if (item[key]) {
        return (
          <a href={item[key].link} key={item[key].name}>
            {item[key].name}
          </a>
        );
      }

      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {moment(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };


  render() {
    const activities = []
    return (
      <Card
      bodyStyle={{
        padding: 0,
      }}
      bordered={false}
      className={styles.activeCard}
      title="动态"
      // loading={activitiesLoading}
     >
      <List
        // loading={activitiesLoading}
        renderItem={item => this.renderActivities(item)}
        dataSource={activities}
        className={styles.activitiesList}
        size="large"
      />
     </Card>
    );
  }
}

export default Activelist;





 