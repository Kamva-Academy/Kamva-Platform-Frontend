import React from 'react';
import LogoButton from './components/LogoButton';
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons';
import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import JitsiButton from './components/JitsiButton';
import JitsiMicButton from './components/JitsiMicButton';

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
    <Button variant="contained" className={classes.backBtn}>
      خروج
    </Button>
  );
};

export default () => {
  const jitsiButton = <JitsiButton />;
  const jitsiMicButton = <JitsiMicButton />;
  return {
    desktopLeftItems: [jitsiMicButton, jitsiButton, <ExitButton />],
    desktopRightItems: [<LogoButton />],
    mobileLeftItems: [jitsiMicButton, jitsiButton, <LogoButton />],
    mobileRightItems: [],
    mobileMenuListItems: [
      <ExitButton />,
      <ListItem button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="خروج" />
      </ListItem>,
    ],
  };
};
