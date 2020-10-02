import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  logo: { height: 45 },
  logoButton: { padding: 0 },
}));

export default function LogoButton() {
  const classes = useStyles();
  return (
    <Button className={classes.logoButton}>
      <img
        src={process.env.PUBLIC_URL + '/logo.png'}
        alt="logo"
        className={classes.logo}
      />
    </Button>
  );
}
