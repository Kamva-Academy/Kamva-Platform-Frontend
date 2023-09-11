import { IconButton, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

const useStyles = makeStyles(() => ({
  logo: ({ size }) => ({
    objectFit: 'cover',
    borderRadius: '50%',
    height: size === 'large' ? 70 : 50,
    width: size === 'large' ? 70 : 50,
  }),
  logoButton: ({ size }) => ({
    padding: size === 'large' ? 5 : 0,
  }),
}));

function LogoButton({ size, image, name = 'کاموا' }) {
  const classes = useStyles({ size });
  return (
    <Tooltip title={name} arrow>
      <IconButton sx={{ padding: 0, paddingRight: 1 }} disableRipple className={classes.logoButton}>
        <img
          src={image}
          alt=''
          className={classes.logo}
        />
      </IconButton>
    </Tooltip>
  );
}

export default LogoButton;