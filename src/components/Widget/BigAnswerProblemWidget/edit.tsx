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
  stateId: number;
  id: string;
}

const BigAnswerProblemEditWidget: FC<BigAnswerProblemEditWidgetPropsType> = ({
  handleClose,
  createBigAnswerQuestionWidget,
  updateBigAnswerQuestionWidget,

  open,
  text: oldText,
  solution: oldSolution,
  stateId,
  id: widgetId,
}) => {
  const t = useTranslate();
  const [text, setText] = useState<string>(oldText);
  const [solution, setSolution] = useState<string>(oldSolution?.text);

  const handleClick = () => {
    if (widgetId) {
      updateBigAnswerQuestionWidget({
        widgetId,
        paper: stateId,
        text: text,
      }).then((response) => {
        if (response.type?.endsWith('fulfilled')) {
          handleClose();
        }
      })
    } else {
      createBigAnswerQuestionWidget({
        paper: stateId,
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
          <label>{t('answer')}</label>
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
