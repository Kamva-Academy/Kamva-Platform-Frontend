import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import AppBar from '../components/Appbar/ResponsiveAppBar';
import { getOneEventInfoAction, getOneRegistrationFormAction } from '../redux/slices/events'

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
    fontSize: 40,
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

const RegistrationForm = ({ getOneRegistrationForm, getOneEventInfo }) => {
  const classes = useStyles();
  const { registrationFormId, eventId } = useParams()

  useEffect(() => {
    getOneRegistrationForm({ id: registrationFormId })
    getOneEventInfo({ id: eventId })
  }, [getOneRegistrationForm])

  return (
    <>
      <AppBar mode="STUDENT_DASHBOARD" />
      <Container className={classes.container}>
        <Grid
          container
          justify="space-evenly"
          alignItems="flex-start"
          spacing={2}>
          <Grid
            item
            container
            sm={6}
            direction="column"
            justify="space-evenly"
            alignItems="center"
            style={{ minHeight: '100%' }}
            spacing={2}>
            <Grid item>
              <Typography className={classes.title}>{'فرم ثبت‌نام'}</Typography>
            </Grid>
            <Grid
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={2}>

            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  events: state.events.events || [],
});

export default connect(
  mapStateToProps,
  {
    getOneRegistrationForm: getOneRegistrationFormAction,
    getOneEventInfo: getOneEventInfoAction,
  }
)(RegistrationForm);