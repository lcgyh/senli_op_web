import React, { Component } from "react";
import styles from "./style.less";
import { Avatar, Card, Col, List, Skeleton, Row, Statistic } from "antd";
import moment from "moment";
import Link from "umi/link";

const projectNotice = [];


class Teamlist extends React.Component {
  render() {
    return (
      <Card
        bodyStyle={{
          paddingTop: 12,
          paddingBottom: 12
        }}
        bordered={false}
        title="遗留代办"
        // loading={projectLoading}
      >
        <div className={styles.members}>
          <Row gutter={48}>
            {projectNotice.map(item => (
              <Col span={12} key={`members-item-${item.id}`}>
                <Link to={item.href}>
                  <Avatar src={item.logo} size="small" />
                  <span className={styles.member}>{item.member}</span>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </Card>
    );
  }
}

export default Teamlist;
