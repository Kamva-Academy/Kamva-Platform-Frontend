import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import {
  createSmallAnswerProblemWidgetAction,
  updateSmallAnswerProblemWidgetAction,
} from '../../../redux/slices/Paper';
import TinyEditorComponent from '../../tiny_editor/react_tiny/TinyEditorComponent';

function SmallAnswerProblemEditWidget({
  createSmallAnswerProblemWidget,
  updateSmallAnswerProblemWidget,
  handleClose,

  open,
  text: oldText,
  answer: oldAnswer,
  stateId,
  id: widgetId,
}) {
  const t = useTranslate();
  const [text, setText] = useState(oldText);
  const [answer, setAnswer] = useState(oldAnswer?.text || '');

  const handleSubmit = () => {
    if (widgetId) {
      updateSmallAnswerProblemWidget({
        widgetId,
        paper: stateId,
        text: text,
        answer,
      })
    } else {
      createSmallAnswerProblemWidget({
        paper: stateId,
        text: text,
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
        <Stack spacing={1}>
          <label>{'صورت سوال'}</label>
          <TinyEditorComponent
            content={text}
            onChange={(text) => setText(text)}
          />
          <TextField
            variant='outlined'
            fullWidth
            label={t('answer')}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog >
  );
}

export default connect(null, {
  createSmallAnswerProblemWidget: createSmallAnswerProblemWidgetAction,
  updateSmallAnswerProblemWidget: updateSmallAnswerProblemWidgetAction,
})(SmallAnswerProblemEditWidget);
