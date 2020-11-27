import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { StatePageContext } from '../../../../containers/Workshop';
import { goBackward } from '../../../../redux/actions/currentState';

function BackButton({ inwardEdges = [], goBackward }) {
  const { player, fsmId, isMentor } = useContext(StatePageContext);

  const history = useHistory();

  if (inwardEdges.length === 0) {
    return <></>;
  }

  const handleClick = () => {
    if (isMentor) {
      history.push(`/workshop/${player.uuid}/${fsmId}/${inwardEdges[0].tail}`);
    } else {
      goBackward({ fsmId, edgeId: inwardEdges[0].id, playerId: player.id });
    }
  };

  return (
    <Button fullWidth variant="outlined" color="primary" onClick={handleClick}>
      قبلی
    </Button>
  );
}

export default connect(null, { goBackward })(BackButton);
