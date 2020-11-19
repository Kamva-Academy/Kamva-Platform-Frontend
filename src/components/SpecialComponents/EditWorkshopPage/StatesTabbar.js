import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Button, Grid } from '@material-ui/core';
import CreateStateDialog from './components/CreateStateDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    background: 'white',
  },
  appbar: {
    background: 'white',
  },
  fullHeight: {
    height: '100%',
  },
}));

export default function StatesTabbar({ value, setValue, tabs = [], fsmId }) {
  const classes = useStyles();

  const [openCreateStateDialog, setOpenCreateStateDialog] = useState(false);

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" color="default" className={classes.appbar}>
          <Grid container>
            <Grid item xs={9} sm={10} md={11}>
              <Tabs
                value={value}
                onChange={(e, val) => setValue(val)}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto">
                {tabs.map((tab) => (
                  <Tab label={tab} />
                ))}
              </Tabs>
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <Button
                size="small"
                fullWidth
                className={classes.fullHeight}
                color="primary"
                onClick={() => setOpenCreateStateDialog(true)}
                variant="contained">
                ایجاد گام
              </Button>
            </Grid>
          </Grid>
        </AppBar>
      </div>
      <CreateStateDialog
        open={openCreateStateDialog}
        handleClose={() => setOpenCreateStateDialog(false)}
        fsmId={fsmId}
      />
    </>
  );
}
