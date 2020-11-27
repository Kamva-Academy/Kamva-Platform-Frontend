import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grid: {
    height: '100vh',
  },
  card: {
    padding: theme.spacing(2),
  },
}));

function Workshops() {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.grid}>
      <Grid item>
        <Paper className={classes.card}>
          <Typography component="h3" variant="h3" gutterBottom>
            تست رویداد ای‌لیمپیاد
          </Typography>
          <Button
            size="large"
            fullWidth
            variant="contained"
            color="primary"
            component={Link}
            to="/workshop/4">
            ورود
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default connect()(Workshops);
