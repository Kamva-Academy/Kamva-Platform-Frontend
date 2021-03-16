import { Avatar, Button, IconButton, makeStyles } from '@material-ui/core';
import { stringToColor } from '../../../../utils/stringToColor';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  avatar: {

  }
}));

export default function AvatarComponent({ name = "علی" }) {
  const classes = useStyles();
  return (
    <Avatar
      // src={process.env.PUBLIC_URL + '/logo.png'}
      style={{ backgroundColor: stringToColor(name) }}
      alt="logo"
      className={classes.avatar}
    >
      {name[0]}
    </Avatar>
  );
}