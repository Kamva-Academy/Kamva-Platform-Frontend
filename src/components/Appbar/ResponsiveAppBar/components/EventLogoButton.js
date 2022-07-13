import { IconButton, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const classes = useStyles({ size });
  return (
    <Tooltip title={name} arrow>
      <IconButton
        onClick={() => navigate(`/event/${eventId}/`)}
        className={classes.logoButton}
        size="large">
        <img
          src={image}
          alt=''
          className={classes.logo}
        />
      </IconButton>
    </Tooltip>
  );
}
