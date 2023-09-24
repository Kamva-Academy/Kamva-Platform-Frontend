import { Stack } from '@mui/material';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function MeetingCustomSpinner() {
  return (
    <Stack sx={{ height: '100%', width: '100%', backgroundColor: 'white' }} alignItems='center' justifyContent='center'>
      <CircularProgress />
    </Stack>
  );
}

export default MeetingCustomSpinner;