import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import {
  getCertificateAction,
  getOneEventInfoAction,
  getOneRegistrationFormAction,
} from '../../redux/slices/events';

const useStyles = makeStyles(() => ({
}));

function Workshops({
  getCertificate,
  getOneEventInfo,
  getOneRegistrationForm,

  registrationForm,
  event,
}) {
  const classes = useStyles();
  const { eventId } = useParams();

  useEffect(() => {
    getOneEventInfo({ id: eventId });
  }, [getOneEventInfo]);

  const doGetCertificate = () => {
    getCertificate({ registrationReceiptId: event?.registration_receipt }).then((action) => {
      if (action.meta.requestStatus == 'fulfilled') {
        window.open(action.payload.response.certificate, '_blank');
      }
    });
  }

  return (
    <Grid container spacing={2} alignItems='center' component={Paper}>
      <Grid item xs={12}>
        <Typography variant='h4'>
          {`به رویداد ${event?.name || ''} خوش آمدید!`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          disabled={event?.event_type == 'Individual'}
          variant="outlined"
          fullWidth
          component={Link}
          to={`/event/${event?.id}/team_selection/`}>
          {'تیم‌کشی'}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button disabled={!event?.has_certificate || !event?.certificates_ready} onClick={doGetCertificate} variant='outlined' fullWidth>
          {'گواهی حضور'}
        </Button>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  event: state.events.event,
  registrationForm: state.events.registrationForm,
});

export default connect(
  mapStateToProps,
  {
    getCertificate: getCertificateAction,
    getOneEventInfo: getOneEventInfoAction,
    getOneRegistrationForm: getOneRegistrationFormAction,
  }
)(Workshops);
