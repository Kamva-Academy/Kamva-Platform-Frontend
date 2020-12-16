import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  logo: { height: 45 },
  logoButton: { padding: 0 },
}));

export default function LogoButton() {
  const classes = useStyles();
  return (
    <Button className={classes.logoButton} component={Link} to="/">
      <img
        src={process.env.PUBLIC_URL + '/logo.png'}
        alt="logo"
        className={classes.logo}
      />
    </Button>
  );
}
