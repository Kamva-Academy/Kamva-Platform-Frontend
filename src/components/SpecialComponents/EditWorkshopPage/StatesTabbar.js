import { Button, Grid } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import CreateStateDialog from './components/CreateStateDialog';

const useStyles = makeStyles(() => ({
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
  const t = useTranslate();

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
                  <Tab label={tab} key={tab} />
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
                {t('createState')}
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
