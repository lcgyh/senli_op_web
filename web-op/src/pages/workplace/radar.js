import React, { Component } from "react";
import styles from "./style.less";
import { Avatar, Card, Col, List, Skeleton, Row, Statistic } from "antd";
import moment from "moment";
import Link from "umi/link";
import Radar from "../../components/Radar";


const radarData =[]

class Radarcard extends React.Component {
  render() {
    return (
      <Card
      style={{
        marginBottom: 24,
      }}
      bordered={false}
      title="工作指数"
      loading={radarData.length === 0}
    >
      <div className={styles.chart}>
        <Radar hasLegend height={343} data={radarData} />
      </div>
    </Card>
    );
  }
}

export default Radarcard;
