import { Container, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 80,
    height: `calc(100vh - ${80}px)`,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

function Correction({ answer, fsmId }) {
  const classes = useStyles();
  return (
    <>
      <ResponsiveAppBar mode="MENTOR_DASHBOARD" />
      <Container className={classes.container}>
        <Paper></Paper>
      </Container>
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({
  answers: [],
  fsmId: ownProps.match.params.fsmId,
});

export default connect(mapStateToProps)(Correction);
