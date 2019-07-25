import React from "react";
import { Avatar, Card, Col, List, Skeleton, Row, Statistic } from 'antd';
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import PageHeaderContent from "./header";
import ExtraContent from "./extracontent";
import styles from "./style.less";
import Projectlist from './projectList'
import Activelist from './activeCard'
import Navigation from './navigation'
import Radarcard from './radar'
import Teamlist from './teamcard'

const currentUser = {};

class Workplace extends React.Component {
  render() {
    return (
      <PageHeaderWrapper
        content={<PageHeaderContent currentUser={currentUser} />}
        extraContent={<ExtraContent />}
      >
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Projectlist/>
          <Activelist/>
          </Col> 
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Navigation/>
            <Radarcard/>
            <Teamlist/>
          </Col> 
        </Row>
      </PageHeaderWrapper>
    );
  }
}
export default Workplace;
