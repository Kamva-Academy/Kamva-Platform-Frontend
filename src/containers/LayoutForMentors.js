import { Container } from '@mui/material';
import {makeStyles} from '@mui/styles'
import React from 'react';

import AppBar from '../components/Appbar/ResponsiveAppBar';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    marginRight: 'auto !important',
    marginLeft: 'auto !important',
  },
}));

const Layout = (props) => {
  const classes = useStyles();

  return (
    <>
      {/* <AppBar mode='MENTOR_DASHBOARD' position='relative' /> */}
      <Container maxWidth='lg' className={classes.container} >
        {props.children}
      </Container>
    </>
  );
}

export default Layout;