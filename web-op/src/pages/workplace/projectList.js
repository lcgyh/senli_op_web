import React, { Component } from "react";
import styles from "./style.less";
import { Avatar, Card, Col, List, Skeleton, Row, Statistic } from "antd";
import moment from 'moment';
import Link from 'umi/link';

const projectNotice=[]

class Projectlist extends React.Component {
  render() {
    return (
      <Card
        className={styles.projectList}
        style={{
          marginBottom: 24
        }}
        title="今日代办"
        bordered={false}
        extra={<Link to="/">查看更多</Link>}
        // loading={projectLoading}
        bodyStyle={{
          padding: 0
        }}
      >
        {projectNotice.map(item => (
          <Card.Grid className={styles.projectGrid} key={item.id}>
            <Card
              bodyStyle={{
                padding: 0
              }}
              bordered={false}
            >
              <Card.Meta
                title={
                  <div className={styles.cardTitle}>
                    <Avatar size="small" src={item.logo} />
                    <Link to={item.href}>{item.title}</Link>
                  </div>
                }
                description={item.description}
              />
              <div className={styles.projectItemContent}>
                <Link to={item.memberLink}>{item.member || ""}</Link>
                {item.updatedAt && (
                  <span className={styles.datetime} title={item.updatedAt}>
                    {moment(item.updatedAt).fromNow()}
                  </span>
                )}
              </div>
            </Card>
          </Card.Grid>
        ))}
      </Card>
    );
  }
}

export default Projectlist;
