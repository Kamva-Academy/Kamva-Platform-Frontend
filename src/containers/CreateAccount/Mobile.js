import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

import InputFields from './Fields';

const useStyles = makeStyles((theme) => ({
  background: {
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    height: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL}/ZeroJourneyer/background.jpg)`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    filter: 'blur(3px)',
    webkitFilter: 'blur(3px)',
    zIndex: -10,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    transform: 'scale(1.1)',
  },
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
  image: {
    height: '40vh',
    background: `url(${process.env.PUBLIC_URL}'/ZeroJourneyer/Dr.Rastaranj.png')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center bottom',
  },
}));

const MobileCreateAccount = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.background} />
      <Container className={classes.container}>
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="stretch"
          spacing={2}>
          <Grid item>
            <Typography
              gutterBottom
              variant="h3"
              align="center"
              style={{ color: 'white' }}>
              ثبت‌نام
            </Typography>
          </Grid>
          <Grid item className={classes.image} />
          <InputFields />
        </Grid>
      </Container>
    </>
  );
};

export default connect(undefined, {})(MobileCreateAccount);
