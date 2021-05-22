import { Button, Fab, Grid, makeStyles, Typography } from '@material-ui/core';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useState } from 'react';

import ResponsiveAppBar from '../../components/Appbar/ResponsiveAppBar';
import AuthDialog from '../../components/Dialog/AuthDialog';
import ScrollTop from '../../components/ScrollToTop/ScrollToTop';

const useStyles = makeStyles((theme) => ({
  section1: {
    height: '100vh',
    color: 'black',
    position: 'relative',
  },
  landingBackground: {
    height: '100%',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    background: `linear-gradient(rgba(254,206,171,.2),rgba(254,206,171,.2)),url(${process.env.PUBLIC_URL}/MathHouseProblemDay.jpg) no-repeat 50% fixed`,
    filter: 'blur(6px)',
    webkitFilter: 'blur(6px)',
    opacity: 0.6,
    backgroundSize: 'cover',
    zIndex: -1,
    animation: 'show-back .8s .3s both',
  },
  firstPageContent: {
    height: '100vh',
  },
  title: {
    fontSize: 80,
    lineHeight: '80px',
    fontWeight: 900,
    color: '#555',
    textShadow: '3px 3px #888',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 50,
      lineHeight: '50px',
    },
  },
  headButton: {
    display: 'inline-block',
    border: '1px solid #2185d0',
    background: 'rgba(33,133,208,.6)',
    borderRadius: '10px',
    transition: '.3s',
    fontSize: 45,
    lineHeight: '45px',
    fontWeight: 800,
    color: '#eee',
    textShadow: '3px 3px #888',
    padding: theme.spacing(2, 3),
    margin: theme.spacing(6, 2),
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 30,
      lineHeight: '30px',
      padding: theme.spacing(1, 2),
    },
  },
  goToWorkshop: {
    border: '1px solid #2185d0',
    background: 'rgba(33,133,208,.6)',
    color: '#eee',
    textShadow: '3px 3px #888',
  },
  physicsDayContainer: {
    position: 'absolute',
    left: 20,
    bottom: 20,
  },
  physicsDay: {
    display: 'inline-block',
    borderRadius: '10px',
    transition: '.3s',
    fontSize: 30,
    lineHeight: '30px',
    fontWeight: 700,
    padding: theme.spacing(1, 2),
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 25,
      lineHeight: '25px',
      padding: theme.spacing(1, 2),
    },
    border: '1px solid #35be32',
    background: 'rgba(53,190,50,.6)',
    color: '#eee',
    textShadow: '3px 3px #888',
  },
  newton: {
    height: 100,
    [theme.breakpoints.down('sm')]: {
      height: 80,
    },
  },
  section2: {
    padding: theme.spacing(4, 2),
    backgroundColor: '#99b898',
    color: 'white',
  },
  h_iframe_aparat_embed_frame: {
    position: 'relative',
    '& iframe': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: 'none',
      boxShadow: '0 2px 4px rgb(0 0 0 / 15%), 0 1px 3px rgb(0 0 0 / 25%)',
      borderRadius: 8,
    },
    '& span': {
      display: 'block',
      paddingTop: '57%',
    },
  },
  telegramLink: {
    display: 'inline-block',
    marginRight: 10,
    color: 'rgb(85, 85, 255)',
  },
  section2Paper: {
    padding: theme.spacing(2),
    '& img': {
      width: '100%',
    },
  },
  section3: {
    padding: theme.spacing(4, 2),
    backgroundColor: '#e84a5f',
    color: 'white',
  },
  moreButton: {
    margin: theme.spacing(2, 'auto', 0),
    textAlign: 'center',
    display: 'table',
  },

  section4: {
    padding: theme.spacing(4, 2),
    backgroundColor: '#feceab',
  },

  section5: {
    padding: theme.spacing(4, 2),
    backgroundColor: '#ededed',
  },
}));

function Homepage() {
  const classes = useStyles();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  return (
    <>
      <ResponsiveAppBar
        mode="PROBLEM_DAY"
        showBackOnScroll
        hideOnScroll={false}
      />
      <section className={classes.section1}>
        <div id="back-to-top-anchor"></div>
        <div className={classes.landingBackground} />

        <Grid
          container
          justify="space-evenly"
          alignItems="center"
          direction="column"
          className={classes.firstPageContent}>
          <Grid item></Grid>
          <Grid item container alignItems="center" direction="column">
            <Grid item>
              <Typography component="h1" variant="h1" className={classes.title}>
                تورنمنت شهرها
              </Typography>
            </Grid>
            <Grid item>
              <Button
                className={clsx(classes.headButton, classes.goToWorkshop)}
                onClick={() => setAuthDialogOpen(true)}>
                بزن بریم!
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </section>
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <AuthDialog
        open={authDialogOpen}
        handleClose={() => setAuthDialogOpen(false)}
      />
    </>
  );
}

export default Homepage;
