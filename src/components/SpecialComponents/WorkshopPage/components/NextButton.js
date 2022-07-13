import { Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useNavigate } from 'react-router-dom';

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

  const edges = isMentor
    ? outwardEdges
    : outwardEdges.filter((edge) => edge.is_visible);
  // const edges = outwardEdges;

  const navigate = useNavigate();

  const changeState = (edge) => {
    if (isMentor) {
      mentorMoveForward({
        id: edge.id,
        teamId,
      });
    } else {
      if (edge.has_lock) {
        setSelectedEdge(edge);
      } else {
        goForward({ id: edge.id, teamId });
      }
    }
  };

  const handleClick = () => {
    if (edges.length === 0) {
      navigate('/events/');
    }
    if (edges.length === 1) {
      changeState(edges[0]);
    } else {
      setOpenChangeStateDialog(true);
    }
  };

  if (outwardEdges.length === 0) {
    return (<></>)
  }

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        disabled={edges.length === 0 && outwardEdges.length !== 0}
        onClick={handleClick}>
        {edges.length === 0
          ? 'جابجایی با همیار'
          : t('next')}
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
            id: selectedEdge.id,
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
