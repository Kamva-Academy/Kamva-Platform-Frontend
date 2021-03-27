import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';
import WorkshopGridItems from '../components/SpecialComponents/WorkshopsPage/WorkshopGridItems';
import { getWorkshopsDescriptionAction } from '../redux/slices/events';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 120,
  },
  grid: {
    marginTop: 40,
  },
}));

function Workshops({ workshops, isLoading, getWorkshopsDescription }) {
  const classes = useStyles();

  useEffect(() => {
    getWorkshopsDescription();
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
          justify="center"
          alignItems="center"
          className={classes.grid}
          spacing={3}>
          <WorkshopGridItems workshops={workshops} isLoading={isLoading} />
        </Grid>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  workshops: state.events.workshops || [],
  isLoading: state.events.getWorkshopsLoading,
});

export default connect(mapStateToProps, {
  getWorkshopsDescription: getWorkshopsDescriptionAction,
})(Workshops);
