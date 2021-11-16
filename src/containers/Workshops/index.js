import {
  Container,
  Grid,
  makeStyles,
  Typography,
  Button,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import WorkshopGridItems from '../../components/SpecialComponents/WorkshopsPage/WorkshopGridItems';
import { 
  getEventWorkshopsAction,
 } from '../../redux/slices/events';
import Layout from '../Layout';
import Sidebar from './Sidebar';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 120,
  },
  grid: {
    marginTop: 40,
  },
}));

function Workshops({
  eventId,
  workshops,
  isLoading,
  getEventWorkshops,
}) {
  const classes = useStyles();

  useEffect(() => {
    getEventWorkshops({ id: eventId });
  }, []);

  return (
    <Layout>
      <Grid container spacing={4} justify='center'>
        <Grid item xs={12} sm={3}>
          <Sidebar />
        </Grid>
        <Grid
          xs={12} sm={9}
          container item
          justify='flex-start'
          alignItems='flex-start'
          spacing={3}>
          <WorkshopGridItems
            eventId={eventId}
            workshops={workshops}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Layout>
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
