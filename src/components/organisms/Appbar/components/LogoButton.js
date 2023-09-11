import { IconButton, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  logo: ({ size }) => ({
    height: size === 'large' ? 70 : 50,
  }),
  logoButton: ({ size }) => ({
    padding: size === 'large' ? 5 : 0,
  }),
}));

export default function LogoButton({ size }) {
  const navigate = useNavigate();
  const classes = useStyles({ size });
  return (
    <Tooltip title="کاموا" arrow>
      <IconButton
        disableRipple
        sx={{ padding: 0, paddingRight: 1 }}
        className={classes.logoButton}>
        <img
          src={process.env.PUBLIC_URL + '/logo.png'}
          alt="logo"
          className={classes.logo}
        />
      </IconButton>
    </Tooltip>
  );
}
