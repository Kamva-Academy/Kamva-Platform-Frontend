import { Divider, Grid, Typography, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import EventCard from 'components/organisms/cards/Event';
import {
  getAllEventsInfoAction,
} from 'redux/slices/events';
import {
  getBannersAction,
} from 'redux/slices/WebSiteAppearance';
import Layout from 'components/template/GeneralLayout';
import { EventType } from 'types/models';
import EventSkeletonCard from 'components/organisms/cards/EventSkeletonCard';
import Banner from 'components/molecules/Banner';


const Events = ({
  getAllEventsInfo,
  getBanners,
  events,
  banners,
  isLoading
}) => {

  useEffect(() => {
    getAllEventsInfo();
    getBanners({ parameters: [['banner_type', 'ProgramsPage']] });
  }, []);

  const activeEvents: EventType[] = events.filter((event: EventType) => event?.is_active).sort((event1: EventType, event2: EventType) => event2.id - event1.id)
  const inactiveEvents: EventType[] = events.filter((event: EventType) => !event?.is_active).sort((event1: EventType, event2: EventType) => event2.id - event1.id)

  const activeEventsElement = (
    <Grid item container spacing={2} xs={12}>
      {activeEvents.map((event, index) => (
        <Grid key={index} container item xs={12} sm={6} md={4} justifyContent='center' alignItems='flex-start' >
          <EventCard event={event} />
        </Grid>
      ))}
    </Grid>
  );

  const inactiveEventsElement = (
    <Grid item container spacing={2} xs={12}>
      {inactiveEvents.map((event, index) => (
        <Grid key={index} container item xs={12} sm={6} md={4} justifyContent='center' alignItems='flex-start' >
          <EventCard event={event} />
        </Grid>
      ))}
    </Grid>
  );

  const skeletonElements = (
    <Grid item container spacing={2} xs={12}>
      {[...Array(6)].map((_, index) => (
        <Grid key={index} container item xs={12} sm={6} md={4} justifyContent='center' alignItems='flex-start' >
          <EventSkeletonCard />
        </Grid>
      ))}
    </Grid>
  )

  return (
    <Layout>
      <Stack width={'100%'} spacing={4} justifyContent='center'>
        <Banner banners={banners} />
        <Typography variant="h1" align='center'>
          {'دوره‌‌ها'}
        </Typography>
        <Typography variant='h2' gutterBottom>
          {'دوره‌‌های در جریان'}
        </Typography>
        <Divider />
        <Grid container>
          {isLoading ? skeletonElements : activeEventsElement}
        </Grid>
        <Typography variant='h2' gutterBottom>
          {'دوره‌‌های گذشته'}
        </Typography>
        <Divider />
        <Grid container>
          {isLoading ? skeletonElements : inactiveEventsElement}
        </Grid>
      </Stack>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  events: state.events.events || [],
  registrableWorkshops: state.workshop.registrableWorkshops,
  isLoading: state.events.isFetching,
  banners: state.WebSiteAppearance.banners,
});

export default connect(mapStateToProps, {
  getAllEventsInfo: getAllEventsInfoAction,
  getBanners: getBannersAction,
})(Events);
