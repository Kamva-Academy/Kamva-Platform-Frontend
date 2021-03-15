import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(() => ({

}));

export default function DashboardButton({ name, ...rest }) {
  const classes = useStyles();
  return (
    <Button className={classes.logoButton} {...rest}>
      {name}
    </Button>
  );
}
