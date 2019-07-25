import React, { Component } from "react";
import styles from "./UserLayout.less";

class Defaultfooter extends React.Component {
    render(){
      return(
        <div className={styles.footcon}>
          <div>Copyright @ www.sun.com.All Rights Reserved</div>
          <div>wwe.skd.com</div>
        </div>
      )
    }
}

export default Defaultfooter
