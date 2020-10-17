import React from 'react';
import LogoButton from './components/LogoButton';
import CustomSelect from '../../CustomSelect/CustomSelect';
import HistoryContent from './components/HistoryContent';
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons';
import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

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

const BackButton = () => {
  const classes = useStyles();
  return (
    <Button variant="contained" className={classes.backBtn}>
      بازگشت
    </Button>
  );
};

export default () => ({
  desktopLeftItems: [
    <CustomSelect ContentComponent={HistoryContent} title="تاریخچه" />,
    <BackButton />,
  ],
  desktopRightItems: [<LogoButton />],
  mobileLeftItems: [<LogoButton />],
  mobileRightItems: [],
  mobileMenuListItems: [
    <BackButton />,
    <CustomSelect ContentComponent={HistoryContent} title="تاریخچه" />,
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="خروج" />
    </ListItem>,
  ],
});
