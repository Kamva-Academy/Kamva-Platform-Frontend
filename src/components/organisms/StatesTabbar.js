import { Button, Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import CreateStateDialog from './dialogs/CreateStateDialog';
import makeStyles from '@mui/styles/makeStyles';

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
            <Grid item xs={9} sm={10}>
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
            <Grid item xs={3} sm={2}>
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
