import { Button, Icon, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  iconImage: {
    maxHeight: '20px',
    width: '100%',
  },
}));

export default function DashboardButton({ name, iconImage, to, onClick }) {
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      onClick={() => {
        navigate(to);
        onClick?.();
      }}
      startIcon={
        iconImage ? (
          <Icon>
            <img
              src={`${process.env.PUBLIC_URL}/ZeroJourneyer/IconImages/${iconImage}`}
              alt="iconImage"
              className={classes.iconImage}
            />
          </Icon>
        ) : (
          ''
        )
      }>
      <Typography variant="caption">{name}</Typography>
    </Button>
  );
}
