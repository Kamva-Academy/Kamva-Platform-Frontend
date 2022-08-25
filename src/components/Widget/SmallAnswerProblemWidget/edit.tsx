import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
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
  solution: oldSolution,
  stateId,
  id: widgetId,
}) {
  const t = useTranslate();
  const [text, setText] = useState(oldText);
  const [solution, setSolution] = useState(oldSolution?.text);

  const handleSubmit = () => {
    if (widgetId) {
      updateSmallAnswerProblemWidget({
        widgetId,
        paper: stateId,
        text: text,
      })
    } else {
      createSmallAnswerProblemWidget({
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
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
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

export default connect(
  null,
  {
    createSmallAnswerProblemWidget: createSmallAnswerProblemWidgetAction,
    updateSmallAnswerProblemWidget: updateSmallAnswerProblemWidgetAction,
  }
)(SmallAnswerProblemEditWidget);
