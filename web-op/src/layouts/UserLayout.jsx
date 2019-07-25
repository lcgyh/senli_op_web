import {
  // DefaultFooter,
  getMenuData,
  getPageTitle,
} from "@ant-design/pro-layout";
import DocumentTitle from "react-document-title";
import Link from "umi/link";
import React from "react";
import { connect } from "dva";
import { formatMessage } from "umi-plugin-react/locale";
import SelectLang from "@/components/SelectLang";
import logo from "../assets/logo.svg";
import styles from "./UserLayout.less";
import  Defaultfooter from './DefaultFooter'

const UserLayout = props => {
  const {
    route = {
      routes: []
    }
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: ""
    }
  } = props;
  const { breadcrumb } = getMenuData(routes);
  return (
    <DocumentTitle
      title={getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        formatMessage,
        ...props
      })}
    >
      <div className={styles.container}>
        {/* <div className={styles.lang}>
          <SelectLang />
        </div> */}
        <div className={styles.content}>
          {/* <div className={styles.top}>
            <div className={styles.header}>
              <span className={styles.title}>优品汇后台业务管理系统</span>
            </div>
            <div className={styles.desc}>Business Management System</div>
          </div> */}
          {children}
        </div>
        <Defaultfooter />
      </div>
    </DocumentTitle>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
