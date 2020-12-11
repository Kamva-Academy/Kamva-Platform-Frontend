import { Box, Divider } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

import AdvanceSection from './AdvanceSection';
import EditStateHelps from './EditStateHelps';
import EditWidgets from './EditWidgets';

function EditState({ state }) {
  const { widgets = [] } = state;

  const helps = [{ widgets }, { widgets }];
  widgets.sort((a, b) => a.id - b.id);
  helps.sort((a, b) => a.id - b.id);

  return (
    <>
      <EditWidgets widgets={widgets} stateId={state.id} />
      <Box my={2}>
        <Divider />
      </Box>
      <EditStateHelps helps={helps} stateId={state.id} />
      <Box my={2}>
        <Divider />
      </Box>
      <AdvanceSection stateId={state.id} />
    </>
  );
}

export default connect()(EditState);
