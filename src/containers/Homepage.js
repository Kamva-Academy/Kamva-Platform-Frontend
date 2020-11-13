import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {
  Button,
  Fab,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
  Paper,
} from '@material-ui/core';
import Footer from './Footer'
import ScrollTop from '../components/ScrollToTop/ScrollToTop';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import AuthDialog from '../components/Dialog/AuthDialog/AuthDialog';
import CustomizedTimeline from './TimeLine'
import FAQ from '../components/FAQ/FAQ';
import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';


const useStyles = makeStyles((theme) => ({
  centerItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 60,
    lineHeight: '80px',
    color: '#555',
    textShadow: '-2px 2px #888',
    [theme.breakpoints.down('sm')]: {
      fontSize: 40,
      lineHeight: '40px',
    },
  },

  subtitle: {
    fontSize: 30,
    // lineHeight: '40px',
    color: '#555',
    textShadow: '-2px 2px #888',
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
      // marginBottom: theme.spacing(3),
    },
  },

  section1: {
    height: '100vh',
    // background: '#DCF9E2',
    color: 'black',
    paddingTop: '50px',
    paddingBottom: '50px',
  },

  section2: {
    opacity: '1',
    background: '#6930C3',
    color: 'black',
    paddingTop: '30px',
    // paddingBottom: '50px',
  },

  section3: {
    opacity: '1',
    background: '#5390D9',
    color: 'black',
    paddingTop: '30px',
    // paddingBottom: '50px',
  },


  firstPageImage: {
    width: '100%',
    // [theme.breakpoints.down('xs')]: {
    //   display: 'none',
    // },
  },
}));

export default function Homepage() {
  const classes = useStyles();
  const [authDialogOpen, setAuthDialogOpen] = useState();

  return (
    <>
      {/* <ResponsiveAppBar /> */}
      <Container className={`${classes.section1} ${classes.centerItems}`} >
        <CssBaseline />
        <div className='landing-background' />
        <Grid
          container
          spacing={2}
          justify='center'
          direction='row'
          alignItems='center'
        >
          <Grid item xs={12} sm={8} md={6} justify='center'>
            {/* <img
              src={process.env.PUBLIC_URL + '/first_page.png'}
              alt="edu"
              className={classes.firstPageImage}
            /> */}
          </Grid>
          <Grid
            container item
            xs={12} sm={8} md={6}
            justify='center'
            alignItems="center"
            direction="column"
            spacing={4}
          >
            <Grid item>
              <Typography
                component="h1"
                variant="h1"
                className={classes.title}>
                A-Lympiad
              </Typography>
              <Typography
                component="h2"
                variant="h4"
                className={classes.subtitle}>
                چهاردمین دوره مسابقات
              </Typography>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => setAuthDialogOpen(true)}>
                <Typography component="span" variant="h3">
                  بزن بریم!
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Container className={`${classes.section2} ${classes.centerItems}`} >
        <Grid container direction='column'>
          <Grid item>
            <Typography
              component="h2"
              variant="h1"
            >
              زمان‌بندی:
            </Typography>
          </Grid>
          <Grid
            item
            container
            spacing={2}
            justify='center'
            direction='row'
          >
            <Grid item xs={12}>
              <CustomizedTimeline />
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Container className={`${classes.section3} ${classes.centerItems}`} >
        <Grid container direction='column'>
          <Grid item>
            <Typography
              component="h2"
              variant="h1"
            >
              سوالات رایج:
            </Typography>
          </Grid>
          <Grid
            item
            container
            spacing={2}
            justify='center'
            direction='row'
          >
            <Grid item xs={12}>
              <FAQ />
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      {/* <Toolbar id="back-to-top-anchor" /> */}
      <Footer />
      <AuthDialog
        open={authDialogOpen}
        handelClose={() => setAuthDialogOpen(false)}
      />
    </>
  );
}
