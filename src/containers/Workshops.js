import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllWorkshops } from '../redux/actions/mentor';

const useStyles = makeStyles((theme) => ({
  grid: {
    height: '100vh',
  },
  card: {
    padding: theme.spacing(2),
  },
}));

function Workshops({ workshops, getAllWorkshops }) {
  const classes = useStyles();

  useEffect(() => {
    getAllWorkshops();
  }, []);

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.grid}
      spacing={3}>
      {workshops.map((workshop) => (
        <Grid item key={workshop.id}>
          <Paper className={classes.card}>
            <Typography component="h3" variant="h3" gutterBottom>
              {workshop.name}
            </Typography>
            <Button
              size="large"
              fullWidth
              variant="contained"
              color="primary"
              component={Link}
              to={`/workshop/${workshop.id}`}>
              ورود
            </Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  workshops: state.mentor.workshops,
});

export default connect(mapStateToProps, { getAllWorkshops })(Workshops);
