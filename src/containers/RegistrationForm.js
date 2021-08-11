import { Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import AppBar from '../components/Appbar/ResponsiveAppBar';
import { getOneEventInfoAction, getOneRegistrationFormAction, getOneMerchandiseAction } from '../redux/slices/events'
import { toPersianNumber } from '../utils/translateNumber';
import Layout from './Layout';

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
  notificationTitle: {
    color: '#4d4a70',
  },
  content: {
    padding: '10px !important',
  },
  noPadding: {
    padding: '0px !important',
  },
  eventImage: {
    height: '100%',
    maxHeight: '300px',
    width: '100%',
    objectFit: 'cover',
  },
}));

const EVENT_TYPE = {
  'Team': 'تیمی',
  'Individual': 'انفرادی',
}

const RegistrationForm = ({
  getOneRegistrationForm,
  getOneEventInfo,
  getOneMerchandise,
  event,
  registrationForm,
}) => {
  const classes = useStyles();
  const { eventId } = useParams()

  useEffect(() => {
    getOneEventInfo({ id: eventId })
  }, [getOneRegistrationForm])

  useEffect(() => {
    if (event?.registration_form) {
      getOneRegistrationForm({ id: event?.registration_form })
    }
    if (event?.merchandise) {
      getOneMerchandise({ id: event?.merchandise })
    }
  }, [event]);

  return (
    <Layout>
      <Grid
        container
        direction='column'
        justify="space-evenly"
        alignItems="center"
        spacing={4}>
        <Grid item>
          <Typography align='center' className={classes.title}>{'ثبت‌نام'}</Typography>
        </Grid>
        <Grid item>
          <Grid
            component={Paper}
            container
            justify="center"
            alignItems="center"
            spacing={2}>
            <Grid
              className={classes.noPadding}
              item
              container
              justify="center"
              alignItems="center"
              xs={12}
              sm={4}>
              <img
                src={event?.cover_page}
                alt=""
                className={classes.eventImage}
              />
            </Grid>
            <Grid item container direction='column' xs={12} sm={8} spacing={1}>
              <Grid item>
                <Typography gutterBottom align='center' variant='h1'>{`رویداد ${event?.name}`}</Typography>
              </Grid>
              <Grid item>
                <Typography>{event?.description}</Typography>
              </Grid>
              <Grid item>
                <Typography>{`نوع مسابقه: ${EVENT_TYPE[event?.event_type]}`}</Typography>
                {event.event_type == 'Team' &&
                  <Typography>{`تعداد اعضای هر تیم: ${toPersianNumber(event?.team_size)}`}</Typography>
                }
              </Grid>
              <Grid item>
                <Typography>{`قیمت: ${toPersianNumber(60000)} تومان`}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            component={Paper}
            container
            justify="center"
            alignItems="center"
            spacing={2}>
            <Grid item xs={12}>
              <Typography gutterBottom align='center' variant='h1'>فرم ثبت‌نام</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            component={Paper}
            container
            justify="center"
            alignItems="center"
            spacing={2}>
            <Grid item xs={12}>
              <Typography gutterBottom align='center' variant='h1'>فرم ثبت‌نام</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  events: state.events.events || [],
  event: state.events.event,
  registrationForm: state.events.registrationForm,
});

export default connect(
  mapStateToProps,
  {
    getOneRegistrationForm: getOneRegistrationFormAction,
    getOneEventInfo: getOneEventInfoAction,
    getOneMerchandise: getOneMerchandiseAction,
  }
)(RegistrationForm);