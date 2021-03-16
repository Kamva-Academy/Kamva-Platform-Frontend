import {
  Hidden
} from '@material-ui/core';
import React from 'react'
import { connect } from 'react-redux';
import {
  Redirect,
} from "react-router-dom";

import DesktopLogin from './Desktop';
import MobileLogin from './Mobile';

const CreateAccount = () => {

  return (
    <>
      <div className='login-background' />
      <Hidden smUp>
        <MobileLogin />
      </Hidden>
      <Hidden xsDown>
        <DesktopLogin />
      </Hidden>
    </>
  )
}

const mapStateToProps = (state) => ({
})

export default connect(
  mapStateToProps,
  {

  }
)(CreateAccount);