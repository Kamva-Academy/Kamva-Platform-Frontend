import { Button, Grid, Paper, Typography, Divider, Stack } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import downloadFile from 'utils/downloadFile';

import {
  getCertificateAction,
} from 'redux/slices/events';

function ProgramPageSidebar({
  getCertificate,
  event,
}) {
  const navigate = useNavigate();

  const doGetCertificate = () => {
    getCertificate({ registrationReceiptId: event?.registration_receipt }).then(
      (action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          downloadFile(action.payload.response.certificate, `گواهی حضور ${event?.name}`, 'image/jpeg');
        }
      }
    );
  };

  return (
    <>
      <Grid item>
        <Stack spacing={2} alignItems="center" component={Paper} padding={2}>
          <Typography variant="h5">
            {`به ${event?.name || ''} خوش آمدید!`}
          </Typography>
          <Button
            // disabled
            disabled={event?.event_type == 'Individual'}
            variant="outlined"
            fullWidth
            onClick={() => navigate(`/program/${event?.id}/team-selection/`)}>
            {'گروه‌بندی'}
          </Button>
          <Button
            disabled={!event?.has_certificate || !event?.certificates_ready}
            onClick={doGetCertificate}
            variant="outlined"
            fullWidth>
            {'گواهی حضور'}
          </Button>
          {event.is_manager && <>
            <Divider width='100%'></Divider>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate(`/program/${event?.id}/manage/info`)}>
              {'مدیریت دوره'}
            </Button>
          </>}
        </Stack>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  event: state.events.event,
  registrationForm: state.events.registrationForm,
});

export default connect(mapStateToProps, {
  getCertificate: getCertificateAction,
})(ProgramPageSidebar);
