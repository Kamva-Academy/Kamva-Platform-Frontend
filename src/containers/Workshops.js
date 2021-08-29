import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';
import WorkshopGridItems from '../components/SpecialComponents/WorkshopsPage/WorkshopGridItems';
import { getEventWorkshopsAction } from '../redux/slices/events';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 120,
  },
  grid: {
    marginTop: 40,
  },
}));

function Workshops({ eventId, workshops, isLoading, getEventWorkshops }) {
  const classes = useStyles();

  useEffect(() => {
    getEventWorkshops({ id: eventId });
  }, []);

  return (
    <>
      <ResponsiveAppBar mode="STUDENT_DASHBOARD" />
      <Container maxWidth="md" className={classes.root}>
        <Typography variant="h1" component="h2">
          کارگاه‌ها
        </Typography>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className={classes.grid}
          spacing={3}>
          <WorkshopGridItems
            eventId={eventId}
            workshops={workshops}
            isLoading={isLoading}
          />
        </Grid>
      </Container>
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({
  eventId: ownProps.match.params.eventId,
  workshops: state.events.workshops || [],
  isLoading: state.events.getWorkshopsLoading,
});

export default connect(mapStateToProps, {
  getEventWorkshops: getEventWorkshopsAction,
})(Workshops);
