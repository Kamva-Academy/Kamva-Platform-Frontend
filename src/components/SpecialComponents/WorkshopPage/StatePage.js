import React from 'react';
import clsx from 'clsx';
import {
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import Widget from '../../Widget';
import { Link } from 'react-router-dom';

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

function StatePage({ state = {}, teamUuid, fsmId, stateId }) {
  const classes = useStyles();

  const { widgets = [] } = state;

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
          {state.outward_edges && state.inward_edges && (
            <Grid container spacing={2} style={{ marginTop: 20 }}>
              <Grid item xs={6}>
                {state.inward_edges.length > 0 && (
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to={
                      teamUuid
                        ? `/workshop/${teamUuid}/${fsmId}/${state.inward_edges[0].tail}`
                        : `/workshop/${fsmId}/${state.inward_edges[0].tail}`
                    }>
                    قبلی
                  </Button>
                )}
              </Grid>
              <Grid item xs={6}>
                {state.outward_edges.length > 0 ? (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={
                      teamUuid
                        ? `/workshop/${teamUuid}/${fsmId}/${state.outward_edges[0].head}`
                        : `/workshop/${fsmId}/${state.outward_edges[0].head}`
                    }>
                    بعدی
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/">
                    پایان
                  </Button>
                )}
              </Grid>
            </Grid>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default connect()(StatePage);
