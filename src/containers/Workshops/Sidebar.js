import {
  Button,
  Container,
  Grid,
  makeStyles,
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

  console.log(event)

  return (
    <Grid container spacing={2}>
      {event?.event_type == 'Team' &&
        <Grid item xs={12}>
          <Button
            variant="outlined"
            fullWidth
            component={Link}
            to={`/event/${event.id}/team_selection/`}>
            {'تیم‌کشی'}
          </Button>
        </Grid>
      }
      {event?.has_certificate &&
        <Grid item xs={12}>
          <Button disabled={!event?.certificates_ready} onClick={doGetCertificate} variant='outlined' fullWidth>
            {'گواهی حضور'}
          </Button>
        </Grid>
      }
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
