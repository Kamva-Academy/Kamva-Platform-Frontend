import { Button, Divider, Stack } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import downloadFile from 'utils/downloadFile';

import {
  getCertificateAction,
} from 'redux/slices/events';
import ProgramPageDashboardButton from 'components/molecules/ProgramPageDashboardButton';

const ProgramPageSidebar = ({
  getCertificate,
  event: program,
}) => {
  const navigate = useNavigate();

  if (!program) return null;

  const doGetCertificate = () => {
    getCertificate({ registrationReceiptId: program.registration_receipt }).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        downloadFile(action.payload.response.certificate, `گواهی حضور ${program.name}`, 'image/jpeg');
      }
    });
  };

  return (
    <Stack spacing={2} alignItems="center" justifyContent={'space-between'}>
      {program.event_type === 'Team' &&
        <Button
          size='large'
          variant="contained"
          color='info'
          fullWidth
          onClick={() => navigate(`/program/${program.id}/team-selection/`)}>
          {'گروه‌بندی'}
        </Button>
      }
      {program.has_certificate &&
        <Button
          size='large'
          disabled={!program.certificates_ready}
          onClick={doGetCertificate}
          color='info'
          variant="contained"
          fullWidth>
          {'گواهی حضور'}
        </Button>
      }
      {program.site_help_paper_id &&
        <ProgramPageDashboardButton paperId={program.site_help_paper_id} buttonLabel='راهنمای سایت' />
      }
      {program.FAQs_paper_id &&
        <ProgramPageDashboardButton paperId={program.FAQs_paper_id} buttonLabel='سوالات متداول' />
      }
      {program.is_manager &&
        <Button
          variant="contained"
          color='info'
          fullWidth
          onClick={() => navigate(`/program/${program.id}/manage/info`)}>
          {'مدیریت دوره'}
        </Button>
      }
      <Divider sx={{ width: '100%' }} />
      <Button
        variant="outlined"
        color='warning'
        fullWidth
        onClick={() => navigate('/programs/')}>
        {'بازگشت به دوره‌ها'}
      </Button>

    </Stack>
  );
}

const mapStateToProps = (state) => ({
  event: state.events.event,
});

export default connect(mapStateToProps, {
  getCertificate: getCertificateAction,
})(ProgramPageSidebar);
