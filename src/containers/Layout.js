import { Container } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';

import AppBar from '../components/Appbar/ResponsiveAppBar';
import { getUserProfileAction } from '../redux/slices/account';
import { addNotificationAction } from '../redux/slices/notifications';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    marginTop: theme.spacing(4),
    justifyContent: 'center',
    marginRight: 'auto !important',
    marginLeft: 'auto !important',
  },
  background: {
    height: '100vh',
    width: '100%',
    position: 'fixed',
    top: '0',
    left: '0',
    backgroundColor: '#EBECED',
    zIndex: '-10000',
  },
}));

const Layout = ({
  appbarMode = 'STUDENT_DASHBOARD',
  getUserProfile,
  addNotification,
  userProfile,
  userAccount,
  ...props
}) => {
  const classes = useStyles();
  const history = useHistory();

  // useEffect(() => {
  //   if (
  //     userProfile &&
  //     (!userProfile?.first_name ||
  //       !userProfile?.last_name ||
  //       !userProfile?.gender ||
  //       !userProfile?.province ||
  //       !userProfile?.city) &&
  //     !window.location.href.includes('profile')
  //   ) {
  //     addNotification({
  //       message:
  //         'پیش از هر چیز، لطفاً موارد الزامی در پروفایل رو تکمیل کن! موارد الزامی با ستاره مشخص شده‌اند.',
  //       type: 'error',
  //     });
  //     history.push('/profile/');
  //   }
  // }, [userProfile]);

  useEffect(() => {
    getUserProfile({ id: userAccount?.id });
  }, []);

  return (
    <>
      <div className={classes.background} />
      <Switch>
        <Route path={'/event/:eventId/'} render={() => <AppBar mode='EVENT' position="relative" />} />
        <Route path={'/'} render={() => <AppBar mode={appbarMode} position="relative" />} />
      </Switch>
      <Container maxWidth='lg' className={classes.container}>{props.children}</Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  userProfile: state.account.userProfile,
  userAccount: state.account.userAccount,
});

export default connect(mapStateToProps, {
  getUserProfile: getUserProfileAction,
  addNotification: addNotificationAction,
})(Layout);
