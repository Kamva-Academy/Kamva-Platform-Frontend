import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Grid,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    position: 'fixed',
    top: 0,
    zIndex: 0,
  },
  bomb: {
    width: '100%',
    height: 'auto',
  },
}))

const VerticalBomb = () => {
  const classes = useStyles();
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    function scrollPlay() {
      setOpacity(window.pageYOffset / 10000);
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

export default VerticalBomb;