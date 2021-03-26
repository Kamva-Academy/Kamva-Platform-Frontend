import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: '100%',
    background: 'white',
  },
  appbar: {
    background: 'white',
  },
}));

export default function StatesTabbar({ value, setValue, tabs = [], fsmId }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.appbar}>
        <Tabs
          value={value}
          onChange={(e, val) => setValue(val)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto">
          {tabs.map((tab) => (
            <Tab label={tab} key={tab} />
          ))}
        </Tabs>
      </AppBar>
    </div>
  );
}
