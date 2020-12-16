/* eslint-disable jsx-a11y/media-has-caption */
import {
  Button,
  Divider,
  Fab,
  Grid,
  Hidden,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import {
  Assignment,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@material-ui/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AuthDialog from '../components/Dialog/AuthDialog/AuthDialog';
import FAQ from '../components/FAQ/FAQ';
import Footer from '../components/Footer/Footer';
import ScrollTop from '../components/ScrollToTop/ScrollToTop';
import CustomizedTimeline from '../components/TimeLine/TimeLine';
import { logout } from '../redux/actions/account';

const useStyles = makeStyles((theme) => ({
  centerItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 80,
    lineHeight: '80px',
    textAlign: 'center',
    textShadow: '-2px 2px #888',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      fontSize: 60,
      lineHeight: '60px',
    },
  },

  subtitle: {
    fontSize: 30,
    textAlign: 'center',
    // lineHeight: '40px',
    color: '#37253f',
    textShadow: '-2px 2px #888',
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
      // marginBottom: theme.spacing(3),
    },
  },

  sectionTitle: {
    fontSize: 26,
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    },
  },

  text: {
    textAlign: 'justify',
    textJustify: 'inter-word',
    paddingLeft: '20px',
  },


  apple: {
    zIndex: '5',
    position: 'fixed',
    top: '75%',
    left: '50%',
    width: '60px',
    height: '70px',
    marginTop: '-35px',
    marginLeft: '-30px',
    filter: 'drop-shadow(3px 3px 5px #33333333)',
  },

  section1: {
    height: '100vh',
    color: 'black',
    padding: theme.spacing(4, 3, 4),
  },

  fullHeight: {
    height: '100%',
  },

  section2: {
    position: 'relative',
    zIndex: '100',
    opacity: '1',
    boxShadow: '1px 1px 10px black',
    color: '#f7f2f6',
    background: '#410066',
    paddingTop: '30px',
    paddingBottom: '30px',
  },


  section5: {
    position: 'relative',
    zIndex: '100',
    opacity: '1',
    background: '#F0DBED',
    paddingTop: '30px',
    paddingBottom: '30px',
  },
}));

function Homepage({ isLoggedIn, logout }) {
  const classes = useStyles();
  const [authDialogOpen, setAuthDialogOpen] = useState();

  return (
    <>
      <Container className={classes.section1}>
        <div id="back-to-top-anchor"></div>
        <div className="landing-background" />
        <img
          src={process.env.PUBLIC_URL + '/apple.png'}
          className={classes.apple}
          alt=''
        />

        <Grid container direction="column" style={{ height: '100%' }}>

          <Grid container item justify='center' direction="row" style={{ height: '90%' }}>
            <Grid
              item
              container
              xs={12}
              sm={7}
              justify="center"
              alignItems="center"
              direction="column">
              <Grid item>
                <Typography className={classes.title} variant="h2" >
                  رویداد روز فیزیک
                </Typography>
                <br />
                <Typography
                  component="h2"
                  variant="h3"
                  className={classes.subtitle}>
                  آخرِ آخرین هفته‌ی آذر
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Container className={`${classes.section2} ${classes.centerItems}`}>
        <Grid
          container
          direction="row"
          spacing={4}
          alignItems="center"
          justify="center">
          <Grid container xs={12} sm={4} justify='center'>
            رویداد‌ها ۱
          </Grid>
          <Grid container xs={12} sm={4} justify='center'>
            <Grid item >
              <img
                style={{ height: '80vh', zIndex: '1000' }}
                src={process.env.PUBLIC_URL + '/daneshmandan.png'}
                alt='' />
            </Grid>
          </Grid>
          <Grid container xs={12} sm={4} justify='center'>
            رویدادها ۲
          </Grid>
        </Grid>
      </Container>

      <Container className={`${classes.section5} ${classes.centerItems}`}>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            <Typography
              component="h2"
              variant="h2"
              className={classes.sectionTitle}>
              برگزارکنندگان
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Footer />
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
