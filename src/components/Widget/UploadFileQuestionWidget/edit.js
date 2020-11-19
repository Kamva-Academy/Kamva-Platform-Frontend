import React, { useState } from 'react';
import { createUploadFileWidget } from '../../../redux/actions/mentor';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';

function UploadFileQuestionEditWidget({
  open,
  handleClose,
  initQuestion = '',
  stateId,
  id,
  createUploadFileWidget,
}) {
  const [question, setQuestion] = useState(initQuestion);

  const handleClick = () => {
    if (id) {
      // TODO: edit mode
    } else {
      createUploadFileWidget({ state: stateId, text: question }).then(()=>window.location.reload(false));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>فایل</DialogTitle>
      <DialogContent>
        <DialogContentText>
          متن درخواستی که برای ارسال فایل دارید در قسمت پایین وارد کنید.
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          label="متن درخواست"
          value={question}
          placeholder="مثال: لطفا فایل جواب را ارسال کنید."
          onChange={(e) => setQuestion(e.target.value)}
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

export default connect(null, { createUploadFileWidget })(
  UploadFileQuestionEditWidget
);
