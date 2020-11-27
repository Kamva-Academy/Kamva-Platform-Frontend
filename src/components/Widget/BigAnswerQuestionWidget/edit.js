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

import { createBigAnswerQuestionWidget } from '../../../redux/actions/mentor';
import TinyEditorComponent from '../../tiny_editor/react_tiny/TinyEditorComponent';

function BigAnswerQuestionEditWidget({
  open,
  handleClose,
  initQuestion = '',
  initAnswer = '',
  stateId,
  id,
  createBigAnswerQuestionWidget,
}) {
  const [question, setQuestion] = useState(initQuestion);
  const [answer, setAnswer] = useState(initAnswer);

  const handleClick = () => {
    if (id) {
      // TODO: edit mode
    } else {
      createBigAnswerQuestionWidget({
        state: stateId,
        text: question,
        answer,
      }).then(()=>window.location.reload(false));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      scroll="body">
      <DialogTitle>سوال توضیحی</DialogTitle>
      <DialogContent>
        <DialogContentText>صورت سوال و پاسخ آن را وارد کنید.</DialogContentText>
        <label>سوال</label>
        <TinyEditorComponent
          id={`edit-question-${Math.floor(Math.random() * 1000)}`}
          content={question}
          onChange={(val) => setQuestion(val)}
        />
        <br />
        <label>پاسخ</label>
        <TinyEditorComponent
          id={`edit-answer-${Math.floor(Math.random() * 1000)}`}
          content={answer}
          onChange={(val) => setAnswer(val)}
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

export default connect(null, { createBigAnswerQuestionWidget })(
  BigAnswerQuestionEditWidget
);
