import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import {
  createBigAnswerQuestionWidgetAction,
  updateBigAnswerQuestionWidgetAction,
} from '../../../redux/slices/widget';
import TinyEditorComponent from '../../tiny_editor/react_tiny/TinyEditorComponent';

type BigAnswerProblemEditWidgetPropsType = {
  handleClose: any;
  createBigAnswerQuestionWidget: any;
  updateBigAnswerQuestionWidget: any;

  open: boolean;
  text: string;
  solution: any;
  paperId: number;
  id: string;
}

const BigAnswerProblemEditWidget: FC<BigAnswerProblemEditWidgetPropsType> = ({
  handleClose,
  createBigAnswerQuestionWidget,
  updateBigAnswerQuestionWidget,

  open,
  text: oldText,
  solution: oldSolution,
  paperId,
  id: widgetId,
}) => {
  const t = useTranslate();
  const [text, setText] = useState<string>(oldText);
  const [solution, setSolution] = useState<string>(oldSolution || '');

  const handleClick = () => {
    if (widgetId) {
      updateBigAnswerQuestionWidget({
        widgetId,
        paper: paperId,
        text: text,
        solution,
      }).then((response) => {
        if (response.type?.endsWith('fulfilled')) {
          handleClose();
        }
      })
    } else {
      createBigAnswerQuestionWidget({
        paper: paperId,
        text: text,
        solution,
      }).then((response) => {
        if (response.type?.endsWith('fulfilled')) {
          handleClose();
        }
      })
    }
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
      <DialogTitle>{'سوال تشریحی'}</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <label>{'صورت سوال'}</label>
          <TinyEditorComponent
            content={text}
            onChange={(val: string) => setText(val)}
          />
          <label>{'راه‌حل'}</label>
          <TinyEditorComponent
            content={solution}
            onChange={(val: string) => setSolution(val)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(
  null,
  {
    createBigAnswerQuestionWidget: createBigAnswerQuestionWidgetAction,
    updateBigAnswerQuestionWidget: updateBigAnswerQuestionWidgetAction,
  }
)(BigAnswerProblemEditWidget);
