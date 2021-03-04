import {
  Grid,
  makeStyles,
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
    zIndex: -1,
  },
  bomb: {
    maxWidth: '100vw',
    maxHeight: '100vh',
    objectFit: 'contain',
  },
}))

const Bomb = () => {
  const classes = useStyles();
  const [opacity, setOpacity] = useState(0);
  const [image, setImage] = useState()

  useEffect(() => {
    function scrollPlay() {
      setOpacity(window.pageYOffset / window.innerHeight / (BOMB_HEIGHT / 100));
      window.requestAnimationFrame(scrollPlay);
    }
    window.requestAnimationFrame(scrollPlay);

    if (window.innerWidth < window.innerHeight) {
      setImage(process.env.PUBLIC_URL + '/ZeroJourney/Vertical.png')
    } else {
      setImage(process.env.PUBLIC_URL + '/ZeroJourney/Horizontal.png');
    }
  }, [])

  return (
    <Grid container justify='center' alignItems='center' className={classes.container}>
      <Grid item container justify='center'>
        <img style={{ opacity: `${opacity}` }} className={classes.bomb} src={image} alt='' />
      </Grid>
    </Grid>
  )
}

export default Bomb;