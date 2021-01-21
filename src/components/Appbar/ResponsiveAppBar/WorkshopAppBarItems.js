import { IconButton, makeStyles } from '@material-ui/core';
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons';
import React from 'react';

import JitsiButton from './components/JitsiButton';
import JitsiMicButton from './components/JitsiMicButton';
import MentorButton from './components/MentorButton';
import NotificationButton from './components/NotificationButton';
import UsersAvatar from './components/UsersAvatar';
import WhiteboardButton from './components/WhiteboardButton';

const useStyles = makeStyles((theme) => ({
  backBtn: {
    color: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.main}`,
    marginLeft: 5,
    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.error.main,
    },
  },
}));

const ExitButton = () => {
  const classes = useStyles();
  return (
    <IconButton variant="contained" className={classes.backBtn}>
      <ExitToAppIcon />
    </IconButton>
  );
};

const WorkshopAppBarItems = () => {
  const jitsiButton = <JitsiButton />;
  const jitsiMicButton = <JitsiMicButton />;
  const whiteboardButton = <WhiteboardButton />;
  const mentorButton = <MentorButton />;
  const usersAvatar = <UsersAvatar />;
  return {
    desktopLeftItems: [whiteboardButton, mentorButton],
    desktopRightItems: [usersAvatar, jitsiMicButton, jitsiButton],
    mobileLeftItems: [jitsiMicButton, jitsiButton, mentorButton],
    mobileRightItems: [whiteboardButton],
    mobileMenuListItems: [],
  };
};

export default WorkshopAppBarItems;
