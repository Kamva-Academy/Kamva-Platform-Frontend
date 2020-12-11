import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { connect } from 'react-redux';

import Widget, { MODES } from '../../Widget';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    overflow: 'hidden',
  },
  mainItem: {
    margin: theme.spacing(1, 0),
  },
  helps: {
    marginBottom: theme.spacing(2),
  },
  addHelpWidget: {
    margin: theme.spacing(2, 0, 1),
    float: 'right',
  },
}));

function EditStateHelps({ helps, stateId }) {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h3" gutterBottom>
        راهنمایی
      </Typography>
      <Grid container justify="center">
        <Grid item xs={12} md={5}>
          <div className={classes.helps}>
            {helps.length > 0 ? (
              <Carousel
                autoPlay={false}
                fullHeightHover={false}
                navButtonsAlwaysInvisible={true}>
                {helps.map((help) => (
                  <Paper className={clsx(classes.mainItem, classes.paper)}>
                    {help.widgets.map((widget) => (
                      <Widget
                        stateId={stateId}
                        widget={widget}
                        mode={MODES.EDIT}
                      />
                    ))}
                    <Button
                      className={classes.addHelpWidget}
                      startIcon={<AddIcon />}
                      variant="contained"
                      color="primary">
                      ایجاد ویجت جدید
                    </Button>
                  </Paper>
                ))}
              </Carousel>
            ) : (
              <Typography align="center">موردی موجود نیست!</Typography>
            )}
          </div>
          <Button
            fullWidth
            startIcon={<AddIcon />}
            variant="contained"
            color="primary">
            راهنمایی جدید
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default connect()(EditStateHelps);
