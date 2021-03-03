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

import VerticalBomb from './VerticalBomb';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: 'black',
  },
  countDown: {
    height: '1000vh',
    position: 'fixed',
    top: 0,
    // backgroundImage: `url(${process.env.PUBLIC_URL}/ZeroJourney/horizontal.png)`,
    // backgroundSize: '100%',
    // backgroundRepeat: 'no-repeat',
    // backgroundPosition: 'center center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  empty: {
    height: '1100vh',
  },
  second: {
    height: '100vh',
    zIndex: 1,
    backgroundColor: 'orange',
  },
  backgroundVideo: {
    position: 'fixed',
    top: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '100%',
    height: '100vh',
  },
  title: {
    fontFamily: 'digital !important',
    paddingRight: theme.spacing(8),
    fontSize: 30,
    color: 'red',
  },
  fullHeight: {
    minHeight: '100vh',
  }
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
      <VerticalBomb />
      <Container className={classes.countDown}>
        <Grid
          container
          justify='center'
          alignItems="center"
          direction="column"
          className={classes.fullHeight}>
          <Grid item>
            <Typography variant="h2" align="center" className={classes.title}>
              {countDown}
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container className={classes.empty} />
      <Container className={classes.second}>
        <Grid
          container
          justify='center'
          alignItems="center"
          direction="column"
          className={classes.fullHeight}>
          <Grid item>
            <Typography variant="h2" align="center" className={classes.title}>
              {countDown}
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