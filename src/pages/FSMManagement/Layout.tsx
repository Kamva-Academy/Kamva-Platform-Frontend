import { Button, Container, Grid, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import makeStyles from '@mui/styles/makeStyles';

import AppBar from 'components/organisms/Appbar';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 4,
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '900px !important',
    marginRight: 'auto !important',
    marginLeft: 'auto !important',
  },
}));

const Layout = ({
  ...props
}) => {
  const classes = useStyles();
  return (
    <>
      <AppBar mode='MENTOR_DASHBOARD' position='relative' showBackOnScroll={false} hideOnScroll={false} />
      <Container className={classes.container} >
        {props.children}
      </Container>
    </>
  );
}

export default Layout;