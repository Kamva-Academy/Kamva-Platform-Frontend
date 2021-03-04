import './Style.scss';

import {
  Button,
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
  countDownDigits: {
    direction: 'ltr !important',
    fontFamily: 'digital !important',
    fontSize: 30,
    color: 'red',
    transformOrigin: 'center center',
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


const BombEvent = () => {
  const classes = useStyles();
  const [countDown, setCountDown] = useState(10);
  const [scale, setScale] = useState(10);

  useEffect(() => {
    const initialCountDown = 9;
    const initialScale = Math.min(window.innerWidth / document.getElementById('countDownDigits').offsetWidth, 9);

    function scrollPlay() {
      setCountDown(Math.max(initialCountDown - Math.ceil(window.pageYOffset / window.innerHeight / (BOMB_HEIGHT / 100) * initialCountDown), 1));
      if (window.pageYOffset / window.innerHeight > 8) {
        setCountDown(0);
      }
      setScale(Math.max(initialScale - (window.pageYOffset / window.innerHeight / (BOMB_HEIGHT / 100) * initialScale), 1.2));
      window.requestAnimationFrame(scrollPlay);
    }

    window.requestAnimationFrame(scrollPlay);
  }, [])


  return (
    <div className={classes.container}>
      <Container className={classes.countDownSection}>
        <BombImage />
        <Grid
          container
          justify='center'
          alignItems="center"
          direction="column"
          className={classes.fullHeight}>
          <Grid item>
            <Typography id='countDownDigits' style={{ transform: `scale(${scale})` }} align="center" className={classes.countDownDigits}>
              {`00:00:0${countDown}`}
            </Typography>
          </Grid>
        </Grid>
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
)(BombEvent);