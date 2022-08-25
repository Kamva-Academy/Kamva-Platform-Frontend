import { Button, Grid, Paper, Typography } from '@mui/material';
import {makeStyles} from '@mui/styles'
import { Add as AddIcon } from '@mui/icons-material';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import Widget, { MODES } from '../../Widget';
import CreateWidgetDialog from '../../organisms/dialogs/CreateWidgetDialog';

const useStyles = makeStyles((theme) => ({
  workshopContent: {
    paddingTop: 30,
  },
  paper: {
    padding: theme.spacing(1),
    overflow: 'hidden',
  },
  mainItem: {
    margin: theme.spacing(1, 0),
  },
  actionPaper: {
    padding: theme.spacing(2, 1),
  },
}));

function EditWidgets({ widgets, stateId, stateName }) {
  const classes = useStyles();
  const t = useTranslate();

  const [openCreateWidgetDialog, setOpenCreateWidgetDialog] = useState(false);
  return (
    <>
      <Grid
        container
        spacing={2}
        className={classes.workshopContent}
        justify="center">
        {widgets.length === 0 ? (
          <Grid item xs={12} md={5}>
            <Typography align="center">{t('thereIsNoItem')}</Typography>
          </Grid>
        ) : (
          <Grid item xs={12} md={6}>
            <Paper className={clsx(classes.paper, classes.actionPaper)}>
              <Typography
                align="center"
                component="h2"
                variant="h3"
                gutterBottom>
                {stateName}
              </Typography>
              {widgets.map((widget) => (
                <Widget
                  key={widget.id}
                  stateId={stateId}
                  widget={widget}
                  mode={MODES.EDIT}
                />
              ))}
            </Paper>
          </Grid>
        )}
        <Grid item xs={12} container justify="center">
          <Grid item xs={12} md={5}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              onClick={() => setOpenCreateWidgetDialog(true)}
              startIcon={<AddIcon />}>
              {t('createWidget')}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <CreateWidgetDialog
        stateId={stateId}
        open={openCreateWidgetDialog}
        handleClose={() => setOpenCreateWidgetDialog(false)}
      />
    </>
  );
}

export default EditWidgets;
