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

export const BOMB_HEIGHT = 800;

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: 'black',
  },
  countDownSection: {
    height: `${BOMB_HEIGHT}vh`,
    position: 'fixed',
    top: 0,
  },
  countDownDigits: {
    fontFamily: 'digital !important',
    paddingRight: theme.spacing(8),
    fontSize: 30,
    color: 'red',
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
  const videoRef = useRef();
  const [countDown, setCountDown] = useState('00:00:19');

  useEffect(() => {
    function scrollPlay() {
      setCountDown(Math.max(10 - Math.ceil(window.pageYOffset / window.innerHeight), 1));
      window.requestAnimationFrame(scrollPlay);
    }
    window.requestAnimationFrame(scrollPlay);
  }, [])


  return (
    <div style={{ height: '1500vh' }} className={classes.container}>
      <Container className={classes.countDownSection}>
        <BombImage />
        <Grid
          container
          justify='center'
          alignItems="center"
          direction="column"
          className={classes.fullHeight}>
          <Grid item>
            <Typography variant="h2" align="center" className={classes.countDownDigits}>
              {countDown}
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