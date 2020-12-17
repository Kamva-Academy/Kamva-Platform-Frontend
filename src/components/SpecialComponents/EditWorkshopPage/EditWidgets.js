import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import Widget, { MODES } from '../../Widget';
import CreateWidgetDialog from './components/CreateWidgetDialog';

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
  item: {
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
    background: '#fafafa',
  },
  actionPaper: {
    padding: theme.spacing(2, 1),
  },
}));

function EditWidgets({ widgets, stateId, stateName }) {
  const classes = useStyles();
  const questions = widgets.filter((widget) =>
    widget.widget_type.includes('Problem')
  );
  const notQuestions = widgets.filter(
    (widget) => !widget.widget_type.includes('Problem')
  );
  const [openCreateWidgetDialog, setOpenCreateWidgetDialog] = useState();
  return (
    <>
      <Grid
        container
        spacing={2}
        className={classes.workshopContent}
        justify="center">
        {notQuestions.length + questions.length === 0 ? (
          <Grid item xs={12} md={5}>
            <Typography align="center">ویجتی وجود ندارد</Typography>
          </Grid>
        ) : (
          <>
            {notQuestions.length > 0 && (
              <Grid item xs={12} md={7} lg={7}>
                <Paper className={classes.paper}>
                  {notQuestions.map((widget) => (
                    <div className={classes.mainItem} key={widget.id}>
                      <Widget
                        stateId={stateId}
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
                  {stateName}
                </Typography>
                {questions.map((widget) => (
                  <Paper className={classes.item} key={widget.id}>
                    <Widget
                      stateId={stateId}
                      widget={widget}
                      mode={MODES.EDIT}
                    />
                  </Paper>
                ))}
              </Paper>
            </Grid>
          </>
        )}
        <Grid item xs={12} container justify="center">
          <Grid item xs={12} md={5}>
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

      <CreateWidgetDialog
        stateId={stateId}
        open={openCreateWidgetDialog}
        handleClose={() => setOpenCreateWidgetDialog(false)}
      />
    </>
  );
}

export default connect()(EditWidgets);
