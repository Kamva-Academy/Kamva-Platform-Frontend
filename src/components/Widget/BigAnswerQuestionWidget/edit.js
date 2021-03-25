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
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { createBigAnswerQuestionWidgetAction } from '../../../redux/slices/mentor';
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
  const t = useTranslate();
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
      });
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      scroll="body"
      disableAutoFocus
      disableEnforceFocus>
      <DialogTitle>{t('longAnswerQuestion')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('writeQuestionAndAnswer')}</DialogContentText>
        <label>{t('question')}</label>
        <TinyEditorComponent
          id={`edit-question-${Math.floor(Math.random() * 1000)}`}
          content={question}
          onChange={(val) => setQuestion(val)}
        />
        <br />
        <label>{t('answer')}</label>
        <TinyEditorComponent
          id={`edit-answer-${Math.floor(Math.random() * 1000)}`}
          content={answer}
          onChange={(val) => setAnswer(val)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, {
  createBigAnswerQuestionWidget: createBigAnswerQuestionWidgetAction,
})(BigAnswerQuestionEditWidget);
