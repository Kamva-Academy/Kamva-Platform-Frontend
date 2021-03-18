import { Button, makeStyles } from '@material-ui/core';
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { StatePageContext } from '../../../../containers/Workshop';
import { callMentor } from '../../../../redux/actions/currentState';

const useStyles = makeStyles(() => ({
  mentorButton: {
    marginLeft: 5,
  },
}));

function MentorButton({ callMentor, playerId, disabled = false }) {
  const classes = useStyles();

  const t = useTranslate();

  const { fsmId } = useContext(StatePageContext);

  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.mentorButton}
      disabled={!playerId || disabled}
      onClick={() => callMentor({ fsmId, playerId })}>
      {t('callMentor')}
    </Button>
  );
}

const mapStatesToProps = (state) => ({
  playerId: state.currentState.player?.id,
});

export default connect(mapStatesToProps, { callMentor })(MentorButton);
