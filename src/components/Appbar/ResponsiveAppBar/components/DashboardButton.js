import { Button, Icon, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  iconImage: {
    maxHeight: '20px',
    width: '100%',
  }
}));

export default function DashboardButton({ name, iconImage, ...rest }) {
  const classes = useStyles();
  return (
    <Button variant='outlined' startIcon={iconImage ? (
      <Icon>
        <img
          src={`${process.env.PUBLIC_URL}/ZeroJourneyer/IconImages/${iconImage}`}
          alt="iconImage"
          className={classes.iconImage}
        />
      </Icon>) : ''}  {...rest}>
      <Typography variant='caption' >
        {name}
      </Typography>
    </Button>
  );
}
