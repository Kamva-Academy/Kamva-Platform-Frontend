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
} from '@material-ui/core';
import ScrollTop from '../components/ScrollToTop/ScrollToTop';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import AuthDialog from '../components/Dialog/AuthDialog/AuthDialog';
import Whiteboard from '../components/Whiteboard';

const useStyles = makeStyles((theme) => ({
  centerItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 64px)',
  },
  title: {
    fontSize: 60,
    lineHeight: '80px',
    color: '#555',
    textShadow: '-2px 2px #888',
    [theme.breakpoints.down('xs')]: {
      fontSize: 40,
      lineHeight: '60px',
      marginBottom: theme.spacing(3),
    },
  },
  subtitle: {
    fontSize: 40,
    lineHeight: '40px',
    color: '#555',
    textShadow: '-1px 1px #888',
    [theme.breakpoints.down('xs')]: {
      fontSize: 30,
      marginBottom: theme.spacing(3),
    },
  },
  body: {
    background: '#F7F9FC',
  },
  firstPageImage: {
    width: '100%',
    // [theme.breakpoints.down('xs')]: {
    //   display: 'none',
    // },
  },
  rightGrid: {
    height: '100%',
  },
}));

export default function Homepage() {
  const classes = useStyles();
  const [authDialogOpen, setAuthDialogOpen] = useState();

  return (
    <>
      <Container className={classes.body}>
        <CssBaseline />
        <Toolbar id="back-to-top-anchor" />
        <Grid container spacing={1}>
          <Grid item sm={7} xs={12}>
            <img
              src={process.env.PUBLIC_URL + '/first_page.png'}
              alt="edu"
              className={classes.firstPageImage}
            />
          </Grid>
          <Grid item sm={5} xs={12}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="space-around"
              className={classes.rightGrid}>
              <Grid item>
                <Typography
                  component="h1"
                  variant="h1"
                  className={classes.title}>
                  کارگاه‌های رستا
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  component="h2"
                  variant="h4"
                  className={classes.subtitle}>
                  جایی برای یاد‌گیری بهتر
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
        </Grid>
        <ScrollTop>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Container>
      <AuthDialog
        open={authDialogOpen}
        handelClose={() => setAuthDialogOpen(false)}
      />
    </>
  );
}
