import {
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import {makeStyles} from '@mui/styles'

import {
  addUserToTeamAction,
} from '../../../redux/slices/events';

const useStyles = makeStyles((theme) => ({
}));

function Index({
  event,
}) {
  const classes = useStyles()

  return (
    <>
      <Grid
        container item
        spacing={2}
        alignItems="center"
        justify="center"
        direction="row">
        <Grid item xs={12}>
          <Typography variant='h1' align='center'>{event?.name}</Typography>
        </Grid>
        <Grid item xs={12} >
          <Typography align='center'>{event?.description}</Typography>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  event: state.events.event,
});

export default connect(
  mapStateToProps,
  {
    addUserToTeam: addUserToTeamAction,
  }
)(Index);
