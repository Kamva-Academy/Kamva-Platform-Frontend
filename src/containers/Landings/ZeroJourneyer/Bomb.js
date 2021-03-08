import {
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { BOMB_HEIGHT } from './index';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bomb: {
    maxWidth: '100vw',
    maxHeight: '100vh',
    objectFit: 'contain',
  },
  countDownDigits: {
    position: 'relative',
    fontFamily: 'digital !important',
    fontSize: 40,
    [theme.breakpoints.down('sm')]: {
      fontSize: 30,
    },
    color: 'red',
  },
  fullHeight: {
    minHeight: '100vh',
  },
}))

const Bomb = () => {
  const classes = useStyles();
  const [opacity, setOpacity] = useState(0);
  const [image, setImage] = useState()
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

  useEffect(() => {
    function scrollPlay() {
      setOpacity(window.pageYOffset / window.innerHeight / (BOMB_HEIGHT / 100));
      window.requestAnimationFrame(scrollPlay);
    }
    window.requestAnimationFrame(scrollPlay);

    if (window.innerWidth < window.innerHeight) {
      setImage(process.env.PUBLIC_URL + '/ZeroJourneyer/Vertical.png')
    } else {
      setImage(process.env.PUBLIC_URL + '/ZeroJourneyer/Horizontal.png');
    }
  }, [])

  return (
    <>
      <Grid container justify='center' alignItems='center' className={classes.container}>
        <Grid item container justify='center'>
          <img style={{ opacity: `${opacity}` }} className={classes.bomb} src={image} alt='' />
        </Grid>
      </Grid>
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
    </>
  )
}

export default Bomb;