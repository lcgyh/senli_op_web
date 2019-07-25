import React, { Component } from 'react';
import styles from './index.less';
import Logo from './logo';
import Loginform from './form';

class Login extends Component {
  render() {
    return (
      <div className={styles.login_form_con}>
        <Logo />
        <Loginform />
      </div>
    );
  }
}

export default Login;
