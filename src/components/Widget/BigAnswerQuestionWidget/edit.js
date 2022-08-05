import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import {
  createBigAnswerQuestionWidgetAction,
  updateBigAnswerQuestionWidgetAction,
} from '../../../redux/slices/widget';
import TinyEditorComponent from '../../tiny_editor/react_tiny/TinyEditorComponent';

function BigAnswerQuestionEditWidget({
  handleClose,
  createBigAnswerQuestionWidget,
  updateBigAnswerQuestionWidgetAction,

  open,
  text: oldText,
  solution: oldSolution,
  stateId,
  id: widgetId,
}) {
  const t = useTranslate();
  const [text, setText] = useState(oldText);
  const [solution, setSolution] = useState(oldSolution?.text);

  const handleClick = () => {
    if (widgetId) {
      updateBigAnswerQuestionWidgetAction({
        widgetId,
        paper: stateId,
        text: text,
      })
    } else {
      createBigAnswerQuestionWidget({
        paper: stateId,
        text: text,
        solution,
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
          content={text}
          onChange={(val) => setText(val)}
        />
        <br />
        <label>{t('answer')}</label>
        <TinyEditorComponent
          id={`edit-answer-${Math.floor(Math.random() * 1000)}`}
          content={solution}
          onChange={(val) => setSolution(val)}
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
  updateBigAnswerQuestionWidget: updateBigAnswerQuestionWidgetAction,
})(BigAnswerQuestionEditWidget);
