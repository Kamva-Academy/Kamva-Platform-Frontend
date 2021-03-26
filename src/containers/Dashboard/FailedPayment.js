import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '../../components/Appbar/ResponsiveAppBar';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 80,
    height: `calc(100vh - ${80}px)`,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  logo: {
    maxHeight: '80vh',
    maxWidth: '100%',
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
  },
  title: {
    fontSize: 30,
    fontWeight: 600,
    textShadow: '1px 1px #dbd9d9',
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 400,
    textShadow: '1px 1px #dbd9d9',
  },
  listItem: {
    fontSize: 20,
    fontWeight: 300,
    textShadow: '1px 1px #dbd9d9',
  },
}));

const FailedPayment = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar mode="STUDENT_DASHBOARD" />
      <Container className={classes.container}>
        <Grid container justify="space-evenly" alignItems="center">
          <Grid
            item
            alignItems="center"
            container
            direction="column"
            sm={4}
            spacing={2}>
            <Grid item>
              <Paper className={classes.paper}>
                <Grid container direction="column" spacing={4}>
                  <Grid item>
                    <Typography className={classes.title} align="center">
                      {
                        'ای بابا! ثبت‌نامت موفق نبوده. اگه پولی از حسابت کم شده و هنوز برنگشته، به رستااینفو پیام بده.'
                      }
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                component={Link}
                color="primary"
                to="/events">
                {'باشه. متوجه شدم.'}
              </Button>
            </Grid>
          </Grid>

          <Grid container item sm={5} justify="center" alignItems="center">
            <img
              src={process.env.PUBLIC_URL + '/ZeroJourneyer/Dr.Rastaranj.png'}
              alt="logo"
              className={classes.logo}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default FailedPayment;
