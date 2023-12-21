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
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyEditorComponent from 'components/tiny_editor/react_tiny/TinyEditorComponent';

function SmallAnswerProblemEditWidget({
  onEdit,
  handleClose,

  open,
  text: oldText,
  solution: oldSolution,
  answer: oldAnswer,
  paperId,
  id: widgetId,
}) {
  const t = useTranslate();
  const [text, setText] = useState<string>(oldText);
  const [answer, setAnswer] = useState<string>(oldAnswer?.text || '');
  const [solution, setSolution] = useState<string>(oldSolution || '');

  const handleSubmit = () => {
    onEdit({
      widgetId,
      paper: paperId,
      text: text,
      answer,
      solution,
      onSuccess: handleClose,
    });
  };

  return (
    <Dialog disableScrollLock
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
          <label>{t('answer')}</label>
          <TextField
            variant='outlined'
            fullWidth
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <label>{'راه‌حل'}</label>
          <TinyEditorComponent
            content={solution}
            onChange={(val: string) => setSolution(val)}
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

export default SmallAnswerProblemEditWidget;
