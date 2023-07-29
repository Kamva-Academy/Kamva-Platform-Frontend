import { Container } from '@mui/material';
import React from 'react';

import AppBar from 'components/organisms/Appbar';

const ArticleLayout = ({
  appbarMode = 'STUDENT_DASHBOARD',
  ...props
}) => {
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
      <AppBar mode={appbarMode} position="relative" />
      <Container maxWidth='lg'
        sx={{
          display: 'flex',
          marginTop: 4,
          justifyContent: 'center',
          marginRight: 'auto !important',
          marginLeft: 'auto !important',
        }}>
        {props.children}
      </Container>
    </>
  );
};

export default ArticleLayout;
