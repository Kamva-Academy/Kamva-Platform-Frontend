import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import {
  createSmallAnswerQuestionWidgetAction,
  updateSmallAnswerQuestionWidgetAction,
} from '../../../redux/slices/widget';
import TinyEditorComponent from '../../tiny_editor/react_tiny/TinyEditorComponent';

function SmallAnswerQuestionEditWidget({
  createSmallAnswerQuestionWidget,
  updateSmallAnswerQuestionWidget,
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
      updateSmallAnswerQuestionWidget({
        widgetId,
        paper: stateId,
        text: text,
      })
    } else {
      createSmallAnswerQuestionWidget({
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
        <DialogContentText>
          {t('writeQuestionAndAnswer')}
        </DialogContentText>
        <Grid container direction='column' spacing={1}>
          <label>{t('question')}</label>
          <Grid item>
            <TinyEditorComponent
              id={`edit-text-${Math.floor(Math.random() * 1000)}`}
              content={text}
              onChange={(text) => setText(text)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              fullWidth
              label={t('answer')}
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, {
  createSmallAnswerQuestionWidget: createSmallAnswerQuestionWidgetAction,
  updateSmallAnswerQuestionWidget: updateSmallAnswerQuestionWidgetAction,
})(SmallAnswerQuestionEditWidget);
