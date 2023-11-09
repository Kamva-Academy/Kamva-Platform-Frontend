import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { connect } from 'react-redux';

import { StatePageContext } from 'pages/FSM';
import {
  goBackwardAction,
  mentorMoveBackwardAction,
} from 'redux/slices/currentState';

function BackButton({ inwardEdges = [], goBackward, mentorMoveBackward, playerId }) {
  const { isMentor, teamId } = useContext(StatePageContext);

  if (inwardEdges.length === 0) {
    return null;
  }

  const backEdge = inwardEdges[0];

  const handleClick = () => {
    if (isMentor) {
      mentorMoveBackward({
        id: playerId,
        teamId,
      });
    } else {
      if (backEdge.is_back_enabled) {
        goBackward({
          id: playerId,
          teamId,
        });
      }
    }
  };

  return (
    <Button disabled={!backEdge.is_back_enabled} fullWidth variant="outlined" color="primary" onClick={handleClick}>
      قبلی
    </Button>
  );
}

export default connect(null, {
  goBackward: goBackwardAction,
  mentorMoveBackward: mentorMoveBackwardAction,
})(BackButton);
