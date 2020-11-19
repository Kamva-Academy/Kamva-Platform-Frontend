import React, { useState } from 'react';
import { createSmallAnswerQuestionWidget } from '../../../redux/actions/mentor';
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
import TinyEditorComponent from '../../tiny_editor/react_tiny/TinyEditorComponent';

function SmallAnswerQuestionEditWidget({
  open,
  handleClose,
  initQuestion = '',
  initAnswer = '',
  stateId,
  id,
  createSmallAnswerQuestionWidget,
}) {
  const [question, setQuestion] = useState(initQuestion);
  const [answer, setAnswer] = useState(initAnswer);

  const handleClick = () => {
    if (id) {
      // TODO: edit mode
    } else {
      createSmallAnswerQuestionWidget({ state: stateId, text: question, answer }).then(
        ()=>window.location.reload(false)
      );
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>سوال کوتاه پاسخ</DialogTitle>
      <DialogContent>
        <DialogContentText>صورت سوال و پاسخ آن را وارد کنید.</DialogContentText>
        <label>سوال</label>
        <TinyEditorComponent
          id={`edit-text-${Math.floor(Math.random() * 1000)}`}
          content={question}
          onChange={(val) => setQuestion(val)}
        />
        <TextField
          fullWidth
          label="پاسخ"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
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

export default connect(null, { createSmallAnswerQuestionWidget })(
  SmallAnswerQuestionEditWidget
);
