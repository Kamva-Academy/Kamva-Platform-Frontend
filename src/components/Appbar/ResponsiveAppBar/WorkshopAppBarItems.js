import React from 'react';
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons';
import { Button, IconButton, makeStyles } from '@material-ui/core';
import JitsiButton from './components/JitsiButton';
import JitsiMicButton from './components/JitsiMicButton';
import NotificationButton from './components/NotificationButton';
import UsersAvatar from './components/UsersAvatar';

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
  mentorButton: {
    marginLeft: 5,
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

const MentorButton = () => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.mentorButton}>
      درخواست منتور
    </Button>
  );
};

export default () => {
  const jitsiButton = <JitsiButton />;
  const jitsiMicButton = <JitsiMicButton />;
  const notificationButton = <NotificationButton />;
  return {
    desktopLeftItems: [notificationButton, <MentorButton />],
    desktopRightItems: [<UsersAvatar />, jitsiMicButton, jitsiButton],
    mobileLeftItems: [jitsiMicButton, jitsiButton, <MentorButton />],
    mobileRightItems: [notificationButton],
    mobileMenuListItems: [<ExitButton />],
  };
};
