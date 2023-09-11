import { Stack } from '@mui/material';
import React from 'react';

function EventLogoButton({ image }) {
  return (
    <Stack
      alignItems={'center'}
      sx={{ padding: 0, paddingRight: 1, userSelect: 'none', pointerEvents: 'none' }}>
      <img
        src={image}
        alt='course-logo'
        style={{
          objectFit: 'cover',
          borderRadius: '50%',
          height: 50,
          width: 50,
        }}
      />
    </Stack>
  );
}

export default EventLogoButton;