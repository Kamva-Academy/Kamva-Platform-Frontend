import { Box, Divider } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

import AdvanceSection from './AdvanceSection';
import EditStateHelps from './EditStateHelps';
import EditWidgets from './EditWidgets';

function EditState({ state }) {
  const widgets = [...state.widgets];
  const help_states = [...state.help_states];

  widgets.sort((a, b) => a.id - b.id);
  help_states.sort((a, b) => a.id - b.id);

  return (
    <>
      <EditWidgets widgets={widgets} stateId={state.id} />
      <Box my={2}>
        <Divider />
      </Box>
      <EditStateHelps helps={help_states} stateId={state.id} />
      <Box my={2}>
        <Divider />
      </Box>
      <AdvanceSection stateId={state.id} />
    </>
  );
}

export default connect()(EditState);
