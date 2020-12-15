import {
  Button,
  Dialog,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import Widget from '../../../Widget';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
  },
  widgets: {
    padding: theme.spacing(2, 0),
  },
}));

function HelpDialog({ open, handleClose, helps }) {
  const classes = useStyles();
  const [index, setIndex] = useState(0);

  const help = helps[index];
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <Paper className={classes.paper} key={help.id}>
        <Typography>راهنمایی شماره {index + 1}</Typography>
        <div className={classes.widgets}>
          {help.widgets.map((widget) => (
            <Widget key={widget.id} widget={widget} />
          ))}
        </div>
        <Grid container justify="space-between">
          <Grid item>
            {index > 0 && (
              <Button color="primary" onClick={() => setIndex(index - 1)}>
                قبلی
              </Button>
            )}
          </Grid>
          <Grid item>
            {index < helps.length - 1 && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIndex(index + 1)}>
                بعدی
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Dialog>
  );
}

export default connect()(HelpDialog);
