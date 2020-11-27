import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { StatePageContext } from '../../../../containers/Workshop';
import { goForward } from '../../../../redux/actions/currentState';
import ChangeStateDialog from './ChangeStateDialog';

function NextButton({ outwardEdges = [], goForward }) {
  const [openChangeStateDialog, setOpenChangeStateDialog] = useState(false);
  const { player, fsmId, isMentor } = useContext(StatePageContext);

  const history = useHistory();

  const changeState = (edge) => {
    if (isMentor) {
      history.push(`/workshop/${player.uuid}/${fsmId}/${edge.head}`);
    } else {
      goForward({ edgeId: edge.id, playerId: player.id });
    }
  };

  const handleClick = () => {
    if (outwardEdges.length === 0) {
      history.push('/');
    }
    if (outwardEdges.length === 1) {
      changeState(outwardEdges[0]);
    } else {
      setOpenChangeStateDialog(true);
    }
  };

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleClick}>
        {outwardEdges.length === 0 ? 'پایان' : 'بعدی'}
      </Button>
      <ChangeStateDialog
        open={openChangeStateDialog}
        handleClose={() => setOpenChangeStateDialog(false)}
        edges={outwardEdges}
        changeState={changeState}
      />
    </>
  );
}

export default connect(null, { goForward })(NextButton);
