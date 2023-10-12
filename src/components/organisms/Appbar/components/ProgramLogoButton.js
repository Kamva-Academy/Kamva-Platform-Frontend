import { Button, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import useWidth from 'utils/UseWidth';

function ProgramLogoButton({ image, name, programId }) {
  const width = useWidth();
  return (
    <Stack direction={'row'} alignItems={'center'}>
      <Tooltip title={name} arrow>
        <IconButton disabled={width !== 'xs'} component={Link} to={`/program/${programId}/`}>
          <img
            src={image}
            alt='course-logo'
            style={{
              objectFit: 'cover',
              borderRadius: '50%',
              height: 40,
              width: 40,
              border: '1px solid #00000099',
            }}
          />
        </IconButton>
      </Tooltip>
      <Button sx={{ display: { xs: 'none', sm: 'inline' }, paddingLeft: 0 }} component={Link} to={`/program/${programId}/`}>
        <Typography fontSize={20} fontWeight={440} color={'black'} align='center'>
          {name}
        </Typography>
      </Button>
    </Stack>
  );
}

export default ProgramLogoButton;