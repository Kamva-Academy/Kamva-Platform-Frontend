import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Routes, useNavigate, useParams } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import AppBar from 'components/organisms/Appbar';
import { getUserProfileAction } from '../../redux/slices/account';
import { addNotificationAction } from '../../redux/slices/notifications';

const Layout = ({
  appbarMode = 'STUDENT_DASHBOARD',
  getUserProfile,
  addNotification,
  userProfile,
  userAccount,
  ...props
}) => {
  const { eventId } = useParams();
  const navigate = useNavigate();

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
  //     navigate('/profile/');
  //   }
  // }, [userProfile]);

  useEffect(() => {
    getUserProfile({ id: userAccount?.id });
  }, []);

  return (
    <>
      <div
        style={{
          width: '100%',
          position: 'fixed',
          top: '0',
          left: '0',
          backgroundColor: '#EBECED',
        }} />
      {eventId ? <AppBar mode='COURSE' position="relative" />
        : <AppBar mode={appbarMode} position="relative" />
      }
      <Container maxWidth='lg'
        sx={{
          display: 'flex',
          marginTop: 4,
          marginBottom: 2,
          justifyContent: 'center',
          marginRight: 'auto !important',
          marginLeft: 'auto !important',
        }}>
        {props.children}
      </Container>
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
