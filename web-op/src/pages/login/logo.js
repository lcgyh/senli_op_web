import React, { Component } from "react";
import styles from "./index.less";

class Logo extends React.Component {
  render() {
    return (
      <div className={styles.header}>
        <div className={styles.title}>优品汇后台业务管理系统</div>
        <div className={styles.desc}>Business Management System</div>
      </div>
    );
  }
}

export default Logo;
