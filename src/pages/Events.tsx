import { Divider, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import EventCard from '../components/Cards/Event';
import WorkshopCard from '../components/Cards/WorkshopCard';
import {
  getAllEventsInfoAction,
} from '../redux/slices/events';
import {
  getRegistrableWorkshopsAction,
} from '../redux/slices/workshop';
import Layout from '../containers/Layout';
import { EventType } from '../types/redux/event';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 80,
    height: `calc(100vh - ${80}px)`,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 2,
    paddingBottom: 2,
  },
  logo: {
    maxHeight: '80vh',
    maxWidth: '100%',
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: 2,
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

const Events = ({
  getAllEventsInfo,
  getRegistrableWorkshops,
  events,
  registrableWorkshops,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getAllEventsInfo();
    getRegistrableWorkshops();
  }, []);

  const activeEvents: EventType[] = events.filter((event) => event?.is_active)
  const inactiveEvents: EventType[] = events.filter((event) => !event?.is_active)

  return (
    <Layout>
      <Grid container spacing={4} justifyContent='center'>
        <Grid item xs={12}>
          <Typography variant="h1" align='center' component="h2">
            {'رویدادها'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h2' gutterBottom>
            {'رویدادهای در جریان'}
          </Typography>
          <Divider />
        </Grid>
        <Grid item container spacing={2} xs={12}>
          {activeEvents.map((event, index) => (
            <Grid key={index} container item xs={12} sm={6} md={4} justifyContent='center' alignItems='flex-start' >
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h2' gutterBottom>
            {'رویدادهای گذشته'}
          </Typography>
          <Divider />
        </Grid>
        <Grid item container spacing={2} xs={12}>
          {inactiveEvents.map((event, index) => (
            <Grid key={index} container item xs={12} sm={6} md={4} justifyContent='center' alignItems='flex-start' >
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  events: state.events.events || [],
  registrableWorkshops: state.workshop.registrableWorkshops,
});

export default connect(mapStateToProps, {
  getAllEventsInfo: getAllEventsInfoAction,
  getRegistrableWorkshops: getRegistrableWorkshopsAction,
})(Events);
