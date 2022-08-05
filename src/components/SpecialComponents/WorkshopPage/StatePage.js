import { Divider, Fab, Grid, Paper, Typography, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Help as HelpIcon } from '@mui/icons-material';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import Widget from '../../Widget';
import BackButton from './components/BackButton';
import HelpDialog from './components/HelpDialog';
import NextButton from './components/NextButton';

const useStyles = makeStyles((theme) => ({
  workshopContent: {
    paddingTop: 30,
  },
  paper: {
    padding: theme.spacing(0, 1),
    overflow: 'hidden',
  },
  mainItem: {
    margin: theme.spacing(1, 0),
  },
  item: {
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
    background: '#fafafa',
  },
  actionPaper: {
    padding: theme.spacing(2, 1),
  },
}));

function StatePage({ state = {} }) {
  const classes = useStyles();
  const t = useTranslate();
  const [openHelpDialog, setOpenHelpDialog] = useState(false);

  const widgets = [...state.widgets];
  const hints = [...state.hints];

  const { inward_edges, outward_edges } = state;

  hints.sort((a, b) => a.id - b.id);
  widgets.sort((a, b) => a.id - b.id);

  const questions = widgets.filter((widget) =>
    widget.widget_type.includes('Problem')
  );
  const notQuestions = widgets.filter(
    (widget) => !widget.widget_type.includes('Problem')
  );

  return (
    <>
      <Grid
        container
        spacing={2}
        className={classes.workshopContent}
        justifyContent="center">
        <Grid
          item
          xs={12}
          md={notQuestions.length > 0 ? 4 : 6}
          lg={notQuestions.length > 0 ? 4 : 8}>
          <Paper className={clsx(classes.paper, classes.actionPaper)}>
            <Grid container spacing={2} >
              <Grid item xs={12}>
                <Typography align="center" component="h2" variant="h3" gutterBottom>
                  {state.name}
                </Typography>
                <Divider />
              </Grid>

              {questions.map((widget) => (
                <Grid item key={widget.id} xs={12}>
                  <Widget key={widget.id} widget={widget} />
                  <Divider style={{ marginTop: 20 }} />
                </Grid>
              ))}

              {inward_edges && outward_edges && (
                <>
                  <Grid item xs={6}>
                    <BackButton inwardEdges={inward_edges} />
                  </Grid>
                  <Grid item xs={6}>
                    <NextButton outwardEdges={outward_edges} />
                  </Grid>
                </>
              )}
            </Grid>

          </Paper>
        </Grid>
        {notQuestions.length > 0 && (
          <Grid item xs={12} md={8} lg={8}>
            <Paper className={classes.paper}>
              {notQuestions.map((widget) => (
                <div className={classes.mainItem} key={widget.id}>
                  <Widget coveredWithPaper={false} widget={widget} />
                </div>
              ))}
            </Paper>
          </Grid>
        )}
      </Grid>

      {hints.length > 0 && (
        <>
          <Fab
            size="small"
            variant="extended"
            sx={{ position: 'fixed', left: 20, bottom: 20 }}
            onClick={() => setOpenHelpDialog(true)}>
            <HelpIcon sx={{ marginRight: 1 }} />
            <Typography>{t('help')}</Typography>
          </Fab>
          <HelpDialog
            open={openHelpDialog}
            handleClose={() => setOpenHelpDialog(false)}
            helps={hints}
          />
        </>
      )}
    </>
  );
}

export default StatePage;
