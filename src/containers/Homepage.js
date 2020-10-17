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
import { connect } from 'react-redux';
import ScrollTop from '../components/ScrollToTop/ScrollToTop';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import AuthDialog from '../components/Dialog/AuthDialog/AuthDialog';

const useStyles = makeStyles((theme) => ({
  centerItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 64px)',
  },
  title: {
    fontSize: 60,
    color: '#555',
    marginBottom: 20,
    [theme.breakpoints.down('xs')]: {
      fontSize: 40,
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

const Homepage = (props) => {
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
                <Typography component="h1" variant="h3">
                  کارگاه‌های رستا
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setAuthDialogOpen(true)}>
                  بزن بریم!
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <ScrollTop children={props.children}>
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
};

export default connect()(Homepage);
