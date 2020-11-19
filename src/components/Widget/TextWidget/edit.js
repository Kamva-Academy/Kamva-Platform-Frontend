import React, { useState } from 'react';
import { createTextWidget } from '../../../redux/actions/mentor';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
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
      createTextWidget({ state: stateId, text }).then(()=>window.location.reload(false));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
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
