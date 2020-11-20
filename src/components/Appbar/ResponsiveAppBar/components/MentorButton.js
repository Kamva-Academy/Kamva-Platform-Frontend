import React, { useContext } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { callMentor } from '../../../../redux/actions/currentState';
import { connect } from 'react-redux';
import { StatePageContext } from '../../../../containers/Workshop';

const useStyles = makeStyles((theme) => ({
  mentorButton: {
    marginLeft: 5,
  },
}));

function MentorButton({ callMentor, playerId }) {
  const classes = useStyles();

  const { fsmId } = useContext(StatePageContext);

  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.mentorButton}
      disabled={!playerId}
      onClick={() => callMentor({ fsmId, playerId })}>
      درخواست منتور
    </Button>
  );
}

const mapStatesToProps = (state) => ({
  playerId: state.currentState.player.id,
});

export default connect(mapStatesToProps, { callMentor })(MentorButton);
