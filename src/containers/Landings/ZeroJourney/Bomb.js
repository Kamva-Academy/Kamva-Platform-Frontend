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
    zIndex: -1,
  },
  bomb: {
    width: '100%',
    height: 'auto',
  },
}))

const Bomb = () => {
  const classes = useStyles();
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    function scrollPlay() {
      setOpacity(window.pageYOffset / window.innerHeight / (BOMB_HEIGHT / 100));
      window.requestAnimationFrame(scrollPlay);
    }
    window.requestAnimationFrame(scrollPlay);
  }, [])

  return (
    <Grid container justify='center' alignItems='center' className={classes.container}>
      <Grid item>
        <img style={{ opacity: `${opacity}` }} className={classes.bomb} src={process.env.PUBLIC_URL + '/ZeroJourney/horizontal.png'} alt='' />
      </Grid>
    </Grid>
  )
}

export default Bomb;