import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { createSmallAnswerQuestionWidget } from '../../../redux/actions/mentor';
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
  const t = useTranslate();
  const [question, setQuestion] = useState(initQuestion);
  const [answer, setAnswer] = useState(initAnswer);

  const handleClick = () => {
    if (id) {
      // TODO: edit mode
    } else {
      createSmallAnswerQuestionWidget({
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
      disableAutoFocus
      disableEnforceFocus>
      <DialogTitle>{t('shortAnswerQuestion')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('writeQuestionAndAnswer')}</DialogContentText>
        <label>{t('question')}</label>
        <TinyEditorComponent
          id={`edit-text-${Math.floor(Math.random() * 1000)}`}
          content={question}
          onChange={(val) => setQuestion(val)}
        />
        <TextField
          fullWidth
          label={t('answer')}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
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

export default connect(null, { createSmallAnswerQuestionWidget })(
  SmallAnswerQuestionEditWidget
);
