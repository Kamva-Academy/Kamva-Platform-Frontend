import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { connect } from 'react-redux';

import { StatePageContext } from '../../../../containers/Workshop';
import {
  goBackwardAction,
  mentorMoveBackwardAction,
} from '../../../../redux/slices/currentState';

function BackButton({ inwardEdges = [], goBackward, mentorMoveBackward }) {
  const { isMentor, teamId } = useContext(StatePageContext);

  if (inwardEdges.length === 0) {
    return <></>;
  }

  const handleClick = () => {
    if (isMentor) {
      mentorMoveBackward({
        id: inwardEdges[0].id,
        teamId,
      });
    }
    goBackward({
      id: inwardEdges[0].id,
      teamId,
    });
  };

  return (
    <Button fullWidth variant="outlined" color="primary" onClick={handleClick}>
      قبلی
    </Button>
  );
}

export default connect(null, {
  goBackward: goBackwardAction,
  mentorMoveBackward: mentorMoveBackwardAction,
})(BackButton);
