import React, { Component } from "react";
import styles from "./style.less";
import { Avatar, Card, Col, List, Skeleton, Row, Statistic } from "antd";
import moment from "moment";
import Link from "umi/link";
import EditableLinkGroup from "../../components/EditableLinkGroup";

const links = [
  {
    title: "创建待办",
    href: ""
  },
  {
    title: "发布动态",
    href: ""
  }
];

class Navigation extends React.Component {
  render() {
    return (
      <Card
        style={{
          marginBottom: 24
        }}
        title="快速开始 / 便捷导航"
        bordered={false}
        bodyStyle={{
          padding: 0
        }}
      >
        <EditableLinkGroup onAdd={() => {}} links={links} linkElement={Link} />
      </Card>
    );
  }
}

export default Navigation;
