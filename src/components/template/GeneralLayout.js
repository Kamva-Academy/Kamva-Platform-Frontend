import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import AppBar from 'components/organisms/Appbar';
import { getUserProfileAction } from 'redux/slices/account';

const Layout = ({
  appbarMode = 'STUDENT_DASHBOARD',
  getUserProfile,
  userInfo,
  ...props
}) => {
  const { programId } = useParams();

  useEffect(() => {
    getUserProfile({ id: userInfo?.id });
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
      {programId ? <AppBar mode='PROGRAM' position="relative" />
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
  userInfo: state.account.userInfo,
});

export default connect(mapStateToProps, {
  getUserProfile: getUserProfileAction,
})(Layout);
