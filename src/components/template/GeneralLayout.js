import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';

import AppBar from 'components/organisms/Appbar';

const Layout = ({
  appbarMode = 'STUDENT_DASHBOARD',
  ...props
}) => {
  const { programId } = useParams();

  return (
    <Fragment>
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
    </Fragment>
  );
};


export default Layout;
