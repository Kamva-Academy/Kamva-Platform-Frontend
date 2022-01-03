import {
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
  event,
  isLoading,
  getEventWorkshops,
}) {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    getEventWorkshops({ eventId });
  }, []);

  if (event?.user_registration_status && event?.user_registration_status != 'Accepted') {
    history.push(`/events/`);
  }

  const filteredWorkshops = workshops.filter((workshop) => workshop.is_active)

  return (
    <Layout>
      <Grid container justify='space-between' alignItems='flex-start'>
        <Grid container item xs={12} sm={3} direction='column' spacing={3}>
          <Sidebar />
        </Grid>
        <Grid container item xs={12} sm={9} direction='column' spacing={3}>
          <Grid item>
            <Typography variant="h1" align='center'>
              {'کارگاه‌ها'}
            </Typography>
          </Grid>
          <Grid container item spacing={3} justifyContent='center'>
            <WorkshopGridItems
              eventId={eventId}
              workshops={filteredWorkshops}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

const mapStateToProps = (state, ownProps) => ({
  eventId: ownProps.match.params.eventId,
  workshops: state.events.workshops,
  isLoading: state.events.getWorkshopsLoading,
  event: state.events.event,
});

export default connect(mapStateToProps, {
  getEventWorkshops: getEventWorkshopsAction,
})(Workshops);
