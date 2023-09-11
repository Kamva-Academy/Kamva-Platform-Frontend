import { Stack } from '@mui/material';
import React from 'react';

function LogoButton() {
  return (
    <Stack
      alignItems={'center'}
      sx={{ padding: 0, paddingRight: 1, userSelect: 'none', pointerEvents: 'none' }}>
      <img
        src={process.env.PUBLIC_URL + '/logo.png'}
        alt="logo"
        style={{ height: 50 }} />
    </Stack>
  );
}

export default LogoButton;