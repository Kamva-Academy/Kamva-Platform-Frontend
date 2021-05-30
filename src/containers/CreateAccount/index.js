import { Hidden } from '@material-ui/core';
import React from 'react';

import DesktopLogin from './Desktop';
import MobileLogin from './Mobile';

const CreateAccount = () => {
  return (
    <>
      <div className="login-background" />
      <Hidden smUp>
        <MobileLogin />
      </Hidden>
      <Hidden xsDown>
        <DesktopLogin />
      </Hidden>
    </>
  );
};

export default CreateAccount;
