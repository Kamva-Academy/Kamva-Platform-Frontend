import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  getCertificateAction,
  getOneEventInfoAction,
} from '../../redux/slices/events';

const useStyles = makeStyles(() => ({
}));

function Workshops({
  getCertificate,
  getOneEventInfo,

  certificateLink,
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h1" align='center' component="h2">
          {'کارگاه‌ها'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={doGetCertificate} variant='outlined' fullWidth>
          {'دریافت گواهی حضور'}
        </Button>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  event: state.events.event,
  certificateLink: state.events.certificateLink,
});

export default connect(
  mapStateToProps,
  {
    getCertificate: getCertificateAction,
    getOneEventInfo: getOneEventInfoAction,
  }
)(Workshops);