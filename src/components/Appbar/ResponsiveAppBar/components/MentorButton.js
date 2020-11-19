import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { callMentor } from '../../../../redux/actions/currentWorkshop';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  mentorButton: {
    marginLeft: 5,
  },
}));

function MentorButton({ callMentor, fsm, player }) {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.mentorButton}
      onClick={() => callMentor({ fsm, player })}>
      درخواست منتور
    </Button>
  );
}

export default connect(null, { callMentor })(MentorButton);
