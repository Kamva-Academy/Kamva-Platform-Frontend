import React from 'react';
import { Avatar, makeStyles } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const UsersAvatar = () => {
  const classes = useStyles();
  return (
    <AvatarGroup max={4}>
      <Avatar>ر</Avatar>
      <Avatar className={classes.orange}>س</Avatar>
      <Avatar className={classes.purple}>م</Avatar>
    </AvatarGroup>
  );
};

export default UsersAvatar;
