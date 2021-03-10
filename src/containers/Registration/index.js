import React from 'react'
import {
  Hidden
} from '@material-ui/core';
import MobileLogin from './Mobile';
import DesktopLogin from './Desktop';
import { connect } from 'react-redux';
import {
  Redirect,
} from "react-router-dom";

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