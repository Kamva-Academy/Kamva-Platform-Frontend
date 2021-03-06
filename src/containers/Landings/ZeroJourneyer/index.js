import './Style.css';

import {
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import BombImage from './Bomb';

export const BOMB_HEIGHT = 500;

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: 'black',
    height: '1500vh',
  },
  countDownSection: {
    height: `${BOMB_HEIGHT}vh`,
    position: 'fixed',
    top: 0,
  },
  emptySection: {
    height: `${BOMB_HEIGHT + 200}vh`,
  },
  secondSection: {
    position: 'relative',
    height: '100vh',
    backgroundColor: 'orange',
  },
  fullHeight: {
    minHeight: '100vh',
  },
  title: {
    fontSize: 80,
    lineHeight: '80px',
    fontWeight: 900,
    color: '#eee',
    textShadow: '3px 3px #888',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 60,
      lineHeight: '70px',
    },
  },
}));


const ZeroJourneyer = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Container className={classes.countDownSection}>
        <BombImage />
      </Container>

      <Container className={classes.emptySection} />

      <Container className={classes.secondSection}>
        <Grid
          container
          justify='center'
          alignItems="center"
          direction="column"
          className={classes.fullHeight}>
          <Grid item>
            <Typography variant="h2" align="center" className={classes.title}>
              مسافر صفر
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({

})

export default connect(
  mapStateToProps,
  {

  }
)(ZeroJourneyer);