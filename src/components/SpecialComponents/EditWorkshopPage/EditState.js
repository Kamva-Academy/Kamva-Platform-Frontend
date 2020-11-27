import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import Widget, { MODES } from '../../Widget';
import CreateWidgetDialog from './components/CreateWidgetDialog';
import DeleteStateDialog from './components/DeleteStateDialog';

const useStyles = makeStyles((theme) => ({
  tabbar: {
    margin: theme.spacing(4, 2, 0),
    overflow: 'hidden',
  },
  centerItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 64px)',
  },
  title: {
    fontSize: 60,
    color: '#555',
    marginBottom: 20,
    [theme.breakpoints.down('xs')]: {
      fontSize: 40,
    },
  },
  body: {
    background: '#F7F9FC',
  },
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
  advance: {
    padding: theme.spacing(2),
  },
}));

function EditState({ state }) {
  const classes = useStyles();

  const { widgets = [] } = state;

  widgets.sort((a, b) => a.id - b.id);

  const questions = widgets.filter((widget) =>
    widget.widget_type.includes('Problem')
  );
  const notQuestions = widgets.filter(
    (widget) => !widget.widget_type.includes('Problem')
  );
  const [openCreateWidgetDialog, setOpenCreateWidgetDialog] = useState();
  const [openDeleteStateDialog, setOpenDeleteStateDialog] = useState();

  return (
    <>
      <Grid
        container
        spacing={2}
        className={classes.workshopContent}
        justify="center">
        {notQuestions.length + questions.length === 0 ? (
          <Grid item xs={12} md={7} lg={7}>
            <Typography align="center">ویجتی وجود ندارد</Typography>
          </Grid>
        ) : (
          <>
            {notQuestions.length > 0 && (
              <Grid item xs={12} md={7} lg={7}>
                <Paper className={classes.paper}>
                  {notQuestions.map((widget) => (
                    <div className={classes.mainItem}>
                      <Widget
                        stateId={state.id}
                        widget={widget}
                        mode={MODES.EDIT}
                      />
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
                <Typography
                  align="center"
                  component="h2"
                  variant="h3"
                  gutterBottom>
                  {state.name}
                </Typography>
                {questions.map((widget) => (
                  <Paper className={classes.item}>
                    <Widget
                      stateId={state.id}
                      widget={widget}
                      mode={MODES.EDIT}
                    />
                  </Paper>
                ))}
              </Paper>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={12} md={7} lg={7}>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                onClick={() => setOpenCreateWidgetDialog(true)}
                startIcon={<AddIcon />}>
                ایجاد ویجت جدید
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={5} lg={4}>
          <Paper className={classes.advance}>
            <Typography variant="h3" gutterBottom>
              حذف گام
            </Typography>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              disabled={true}
              onClick={() => setOpenDeleteStateDialog(true)}
              startIcon={<DeleteIcon />}>
              حذف گام
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7} lg={8}></Grid>
      </Grid>

      <CreateWidgetDialog
        stateId={state.id}
        open={openCreateWidgetDialog}
        handleClose={() => setOpenCreateWidgetDialog(false)}
      />

      <DeleteStateDialog
        open={openDeleteStateDialog}
        handleClose={() => setOpenDeleteStateDialog(false)}
        stateId={state.id}
      />
    </>
  );
}

export default connect()(EditState);
