import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import EventCard from '../../../components/Cards/Event';
import {
  getAllEventsInfoAction,
} from '../../../redux/slices/events';
import Layout from '../../Layout';

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

const Events = ({ getAllEventsInfo, events }) => {
  const classes = useStyles();

  useEffect(() => {
    getAllEventsInfo({});
  }, [getAllEventsInfo]);

  return (
    <Layout>
      <Grid container spacing={4} justify='center'>
        <Grid item xs={12}>
          <Typography variant="h1" align='center' component="h2">
            {'رویدادها'}
          </Typography>
        </Grid>
        <Grid item container spacing={2} xs={12}>
          {events.map((event, index) => (
            <Grid key={index} container item xs={12} sm={6} md={4} justify='center' alignItems='flex-start' >
              <EventCard {...event} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  events: state.events.events || [],
});

export default connect(mapStateToProps, {
  getAllEventsInfo: getAllEventsInfoAction,
})(Events);
