import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import HomeAppbar from '../components/Appbar/HomeAppbar/HomeAppbar';

const useStyles = makeStyles((theme) => ({
  centerItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
}));

const Homepage = () => {
  const classes = useStyles();
  const t = useTranslate();
  return (
    <div>
      <Container component="main" className={classes.centerItems}>
        <CssBaseline />
        <HomeAppbar />
        <Typography>{t('hello')}</Typography>
      </Container>
    </div>
  );
};

export default connect()(Homepage);
