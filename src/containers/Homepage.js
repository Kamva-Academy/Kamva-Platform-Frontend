/* eslint-disable jsx-a11y/media-has-caption */
import { Button, Fab, Grid, makeStyles, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AuthDialog from '../components/Dialog/AuthDialog/AuthDialog';
import ScrollTop from '../components/ScrollToTop/ScrollToTop';
import { logout } from '../redux/actions/account';

const useStyles = makeStyles((theme) => ({
  section1: {
    height: '100vh',
    color: 'black',
  },
  landingBackground: {
    height: '100%',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    background: `linear-gradient(rgba(254,206,171,.2),rgba(254,206,171,.2)),url(${process.env.PUBLIC_URL}/back.jpg) no-repeat 50% fixed`,
    filter: 'blur(6px)',
    webkitFilter: 'blur(6px)',
    opacity: 0.6,
    backgroundSize: 'cover',
    zIndex: -1,
    animation: 'show-back .8s .3s both',
  },
  firstPageContent: {
    height: '100%',
  },
  title: {
    fontSize: 80,
    lineHeight: '80px',
    fontWeight: 900,
    color: '#555',
    textShadow: '3px 3px #888',
    [theme.breakpoints.down('sm')]: {
      fontSize: 60,
      lineHeight: '60px',
    },
  },
  goToWorkshop: {
    display: 'inline-block',
    border: '1px solid #2185d0',
    background: 'rgba(33,133,208,.6)',
    borderRadius: '10px',
    transition: '.3s',
    fontSize: 50,
    lineHeight: '60px',
    fontWeight: 800,
    color: '#eee',
    textShadow: '3px 3px #888',
    padding: theme.spacing(2),
    margin: theme.spacing(6, 2),
    [theme.breakpoints.down('sm')]: {
      fontSize: 40,
      lineHeight: '40px',
    },
  },
  physicsDay: {
    display: 'inline-block',
    border: '1px solid #35be32',
    background: 'rgba(53,190,50,.6)',
    borderRadius: '10px',
    transition: '.3s',
    fontSize: 50,
    lineHeight: '60px',
    fontWeight: 800,
    color: '#eee',
    textShadow: '3px 3px #888',
    padding: theme.spacing(2),
    margin: theme.spacing(6, 2),
    [theme.breakpoints.down('sm')]: {
      fontSize: 40,
      lineHeight: '40px',
    },
  },
}));

function Homepage({ isLoggedIn, logout }) {
  const classes = useStyles();
  const [authDialogOpen, setAuthDialogOpen] = useState();

  return (
    <>
      <Container className={classes.section1}>
        <div id="back-to-top-anchor"></div>
        <div className={classes.landingBackground} />
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          className={classes.firstPageContent}>
          <Grid item>
            <Typography component="h1" variant="h1" className={classes.title}>
              مدرسه تابستانه
            </Typography>
          </Grid>
          <Grid item>
            {/* <Button className={classes.goToWorkshop}>
              ورود به کارگاه بدون منتور
            </Button> */}
            <Button
              component={Link}
              to="/physics_day"
              className={classes.physicsDay}>
              رویداد روز فیزیک
            </Button>
          </Grid>
        </Grid>
      </Container>

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

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.account.token,
});

export default connect(mapStateToProps, { logout })(Homepage);
