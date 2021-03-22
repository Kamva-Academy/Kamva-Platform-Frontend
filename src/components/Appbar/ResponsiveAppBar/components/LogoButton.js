import { IconButton, makeStyles, Tooltip } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  logo: ({ size }) => ({
    height: size === 'large' ? 70 : 50,
  }),
  logoButton: ({ size }) => ({
    padding: size === 'large' ? 5 : 0,
  }),
}));

export default function LogoButton({ size }) {
  const classes = useStyles({ size });
  return (
    <Tooltip title="رستا" arrow>
      <IconButton className={classes.logoButton}>
        <img
          src={process.env.PUBLIC_URL + '/logo.png'}
          alt="logo"
          className={classes.logo}
        />
      </IconButton>
    </Tooltip>
  );
}
