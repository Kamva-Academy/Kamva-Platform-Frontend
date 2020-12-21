import { Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';

import Help from './Help';
import Line from './Line';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1, 0.5),
  },
}));

function Paragraph({ help, lines }) {
  const classes = useStyles();
  return (
    <Grid container alignItems="center">
      <Grid item>
        <Help help={help} />
      </Grid>
      <Grid item xs={12} sm={11}>
        <Paper className={classes.paper}>
          {lines.map((line, index) => (
            <Line {...line} key={index} />
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Paragraph;
