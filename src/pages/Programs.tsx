import { Divider, Grid, Typography, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ProgramCard from 'components/organisms/cards/ProgramCard';
import {
  getProgramsAction,
} from 'redux/slices/events';
import {
  getBannersAction,
} from 'redux/slices/WebSiteAppearance';
import Layout from 'components/template/Layout';
import { ProgramType } from 'types/models';
import EventSkeletonCard from 'components/organisms/cards/EventSkeletonCard';
import Banner from 'components/molecules/Banner';
import { useGetProgramsQuery } from 'redux/features/ProgramSlice';
import { useGetPartyQuery } from 'redux/features/PartySlice';


const Programs = ({
  getBanners,
  banners,
}) => {

  useEffect(() => {
    getBanners({ parameters: { banner_type: 'ProgramsPage' } });
  }, []);

  const { data: party } = useGetPartyQuery();

  const {
    data: programs = [],
    isLoading,
  } = useGetProgramsQuery(party?.uuid);



  const activeEvents: ProgramType[] = programs.filter((event: ProgramType) => event?.is_active).sort((event1: ProgramType, event2: ProgramType) => event2.id - event1.id)
  const inactiveEvents: ProgramType[] = programs.filter((event: ProgramType) => !event?.is_active).sort((event1: ProgramType, event2: ProgramType) => event2.id - event1.id)

  const activeEventsElement = (
    <Grid item container spacing={2} xs={12}>
      {activeEvents.map((event, index) => (
        <Grid key={index} container item xs={12} sm={6} md={4} justifyContent='center' alignItems='flex-start' >
          <ProgramCard event={event} />
        </Grid>
      ))}
    </Grid>
  );

  const inactiveEventsElement = (
    <Grid item container spacing={2} xs={12}>
      {inactiveEvents.map((event, index) => (
        <Grid key={index} container item xs={12} sm={6} md={4} justifyContent='center' alignItems='flex-start' >
          <ProgramCard event={event} />
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
    <Layout appbarMode='DASHBOARD'>
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
  banners: state.WebSiteAppearance.banners,
});

export default connect(mapStateToProps, {
  getPrograms: getProgramsAction,
  getBanners: getBannersAction,
})(Programs);
