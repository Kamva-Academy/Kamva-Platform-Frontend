import { Container } from '@mui/material';
import React, { Fragment } from 'react';
import AppBar from 'components/organisms/Appbar';
import { AppBarModes } from 'components/organisms/Appbar/modes';

const Layout = ({
  ...props
}) => {
  return (
    <Fragment>
      <AppBar mode={AppBarModes.STUDENT_DASHBOARD} position='relative' showBackOnScroll={false} hideOnScroll={false} />
      <Container sx={{
        padding: 4,
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '900px !important',
        marginRight: 'auto !important',
        marginLeft: 'auto !important',
      }}>
        {props.children}
      </Container>
    </Fragment>
  );
}

export default Layout;