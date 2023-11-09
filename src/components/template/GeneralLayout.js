import { Box, Container } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import AppBar from 'components/organisms/Appbar';

const Layout = ({
  appbarMode = 'STUDENT_DASHBOARD',
  getUserProfile,
  userInfo,
  ...props
}) => {
  const { programId } = useParams();

  return (
    <>
      <Box
        sx={{
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

export default connect(mapStateToProps)(Layout);
