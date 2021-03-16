import { Button, makeStyles, Icon, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(() => ({
  iconImage: {
    maxHeight: '30px',
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
      <Typography>
        {name}
      </Typography>
    </Button>
  );
}
