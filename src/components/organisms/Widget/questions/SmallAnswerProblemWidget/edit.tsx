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
  correct_answer: oldCorrectAnswer,
  paperId,
  id: widgetId,
}) {
  const t = useTranslate();
  const [text, setText] = useState<string>(oldText);
  const [correctAnswer, setCorrectAnswer] = useState<string>(oldCorrectAnswer?.text || '');
  const [solution, setSolution] = useState<string>(oldSolution || '');

  const handleSubmit = () => {
    onEdit({
      widgetId,
      paper: paperId,
      text: text,
      correct_answer: correctAnswer,
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
          <label>{'پاسخ صحیح'}</label>
          <TextField
            variant='outlined'
            fullWidth
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
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
