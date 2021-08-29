import { Button, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

import AppBar from '../../components/Appbar/ResponsiveAppBar';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 80,
    height: `calc(100vh - ${80}px)`,
  },
  logo: {
    height: 100,
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
  },
}));

function Dashboard() {
  const classes = useStyles();

  return (
    <>
      <AppBar mode="STUDENT_DASHBOARD" />
      <Container className={classes.container}>
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="center"
          style={{ height: '100%' }}>
          <Grid container item direction="column" sm={5}>
            <Paper className={classes.paper}>
              <Grid item>شماره تیم</Grid>
              <Grid item>اسم تیم</Grid>
              <Grid item>salam</Grid>
              <Grid item>salam</Grid>
              <Grid item>
                <Button variant="contained" color="primary" fullWidth>پرداخت</Button>
              </Grid>
            </Paper>
          </Grid>

          <Grid container item sm={5} justifyContent="center" alignItems="center">
            <img
              src={process.env.PUBLIC_URL + '/logo.png'}
              alt="logo"
              className={classes.logo}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  info: state.account.info,
  isFetching: state.account.isFetching,
  payments: state.account.payments,
});

export default connect(mapStateToProps)(Dashboard);
