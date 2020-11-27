import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

import Widget from '../../Widget';
import BackButton from './components/BackButton';
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

  const { widgets = [], inward_edges, outward_edges } = state;

  widgets.sort((a, b) => a.id - b.id);

  const questions = widgets.filter((widget) =>
    widget.widget_type.includes('Problem')
  );
  const notQuestions = widgets.filter(
    (widget) => !widget.widget_type.includes('Problem')
  );

  return (
    <Grid
      container
      spacing={2}
      className={classes.workshopContent}
      justify="center">
      {notQuestions.length > 0 && (
        <Grid item xs={12} md={7} lg={7}>
          <Paper className={classes.paper}>
            {notQuestions.map((widget) => (
              <div className={classes.mainItem}>
                <Widget widget={widget} />
              </div>
            ))}
          </Paper>
        </Grid>
      )}
      <Grid
        item
        xs={12}
        md={notQuestions.length > 0 ? 4 : 6}
        lg={notQuestions.length > 0 ? 4 : 7}>
        <Paper className={clsx(classes.paper, classes.actionPaper)}>
          <Typography align="center" component="h2" variant="h3" gutterBottom>
            {state.name}
          </Typography>
          {questions.map((widget) => (
            <Paper className={classes.item}>
              <Widget widget={widget} />
            </Paper>
          ))}
          {inward_edges && outward_edges && (
            <Grid container spacing={2} style={{ marginTop: 20 }}>
              <Grid item xs={6}>
                <BackButton inwardEdges={inward_edges} />
              </Grid>
              <Grid item xs={6}>
                <NextButton outwardEdges={outward_edges} />
              </Grid>
            </Grid>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default StatePage;
