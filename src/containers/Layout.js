import { Button, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';

import AppBar from '../components/Appbar/ResponsiveAppBar';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '900px !important',
    marginRight: 'auto !important',
    marginLeft: 'auto !important',
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  return (
    <>
      <AppBar mode='STUDENT_DASHBOARD' position='fixed' />
      <Container className={classes.container} >
        {props.children}
      </Container>
    </>
  );
}

export default Layout;