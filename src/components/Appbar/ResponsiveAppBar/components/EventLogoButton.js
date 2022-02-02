import { IconButton, makeStyles, Tooltip } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  logo: ({ size }) => ({
    borderRadius: '50%',
    height: size === 'large' ? 70 : 50,
  }),
  logoButton: ({ size }) => ({
    padding: size === 'large' ? 5 : 0,
  }),
}));

export default function LogoButton({ size, image, name, eventId }) {
  const classes = useStyles({ size });
  return (
    <Tooltip title={name} arrow>
      <IconButton component={Link} className={classes.logoButton} to={`/event/${eventId}/`}>
        <img
          src={image}
          alt=''
          className={classes.logo}
        />
      </IconButton>
    </Tooltip>
  );
}
