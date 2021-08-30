import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useHistory } from 'react-router-dom';

import { StatePageContext } from '../../../../containers/Workshop';
import {
  goForwardAction,
  mentorMoveForwardAction,
} from '../../../../redux/slices/currentState';
import ChangeStateDialog from './ChangeStateDialog';
import StatePasswordDialog from './PasswordDialog';

function NextButton({ outwardEdges = [], goForward, mentorMoveForward }) {
  const t = useTranslate();
  const [openChangeStateDialog, setOpenChangeStateDialog] = useState(false);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const { isMentor, teamId } = useContext(StatePageContext);

  // const edges = isMentor
  //   ? outwardEdges
  //   : outwardEdges.filter((edge) => edge.is_hidden);
  const edges = outwardEdges;

  const history = useHistory();

  const changeState = (edge) => {
    if (isMentor) {
      mentorMoveForward({
        id: edge.id,
        teamId,
      });
    }

    if (edge.has_lock) {
      setSelectedEdge(edge);
    } else {
      goForward({ id: edge.id, teamId });
    }
  };

  const handleClick = () => {
    if (edges.length === 0) {
      history.push('/events/');
    }
    if (edges.length === 1) {
      changeState(edges[0]);
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
        disabled={edges.length === 0}
        onClick={handleClick}>
        {outwardEdges.length === 0 ? t('end') : t('next')}
      </Button>
      <ChangeStateDialog
        open={openChangeStateDialog}
        handleClose={() => setOpenChangeStateDialog(false)}
        edges={edges}
        changeState={changeState}
      />
      <StatePasswordDialog
        open={!!selectedEdge}
        handleClose={() => setSelectedEdge(null)}
        onSubmit={(password) =>
          goForward({
            edgeId: selectedEdge.id,
            password,
            teamId,
          })
        }
      />
    </>
  );
}

export default connect(null, {
  goForward: goForwardAction,
  mentorMoveForward: mentorMoveForwardAction,
})(NextButton);
