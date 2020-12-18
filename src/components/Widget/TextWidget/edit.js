import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createTextWidget } from '../../../redux/actions/mentor';
import TinyEditorComponent from '../../tiny_editor/react_tiny/TinyEditorComponent';

function TextEditWidget({
  open,
  handleClose,
  initText,
  stateId,
  id,
  createTextWidget,
}) {
  const [text, setText] = useState(initText);

  const handleClick = () => {
    if (id) {
      // TODO: edit mode
    } else {
      createTextWidget({ state: stateId, text });
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableAutoFocus
      disableEnforceFocus>
      <DialogTitle>متن</DialogTitle>
      <DialogContent>
        <DialogContentText>متن مورد نظر خود را وارد کنید.</DialogContentText>

        <TinyEditorComponent
          id={`edit-question-${Math.floor(Math.random() * 1000)}`}
          content={text}
          onChange={(val) => setText(val)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} color="primary" variant="contained">
          ثبت
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, { createTextWidget })(TextEditWidget);
