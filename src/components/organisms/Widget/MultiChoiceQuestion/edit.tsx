import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  AddCircle as AddCircleIcon,
  RemoveCircle as RemoveCircleIcon,
} from '@mui/icons-material';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { createMultiChoicesQuestionWidgetAction } from 'redux/slices/Paper';
import TinyEditorComponent from 'components/tiny_editor/react_tiny/TinyEditorComponent';
import { toPersianNumber } from 'utils/translateNumber';

type MultiChoiceQuestionEditWidgetPropsType = {
  open: boolean;
  handleClose: any;
  choices: any[];
  initQuestion: any;
  initAnswer: any;
  paperId: any;
  id: string;
  createMultiChoicesQuestionWidget: any;
}

const MultiChoiceQuestionEditWidget: FC<MultiChoiceQuestionEditWidgetPropsType> = ({
  open,
  choices: initialQuestionChoices,
  paperId,
  id: widgetId,
  handleClose,
  createMultiChoicesQuestionWidget,
  ...props
}) => {
  const t = useTranslate();

  const [questionText, setQuestionText] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [questionChoices, setQuestionChoices] = useState([]);

  useEffect(() => {
    if (initialQuestionChoices) {
      setQuestionChoices(initialQuestionChoices);
    }
  }, [initialQuestionChoices])

  const onChangeChoices = (newValue, index) => {
    const newChoices = [...questionChoices];
    newChoices[index].text = newValue;
    setQuestionChoices(newChoices);
  };

  const handleClick = () => {
    if (widgetId) {
      // TODO: edit mode
    } else {
      createMultiChoicesQuestionWidget({
        paper: paperId,
        text: questionText,
        answer: correctAnswer,
        choices: questionChoices,
        onSuccess: handleClose,
      });
    }
  };

  return (
    <Dialog
      disableScrollLock
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      // scroll="body"
      disableAutoFocus
      disableEnforceFocus>
      <DialogTitle>{t('multipleChoiceQuestions')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          صورت سوال و گزینه‌های آن را وارد کنید.
        </DialogContentText>
        <label>{t('question')}</label>
        <TinyEditorComponent
          content={questionText}
          onChange={(val) => setQuestionText(val)} />
        <label>{t('options')}</label>
        {questionChoices.map((choice, index) => (
          <TextField
            key={index}
            fullWidth
            value={choice.text}
            variant="outlined"
            sx={{ padding: 1 }}
            onChange={(e) => onChangeChoices(e.target.value, index)}
          />
        ))}
        <IconButton color="primary" onClick={() => setQuestionChoices([...questionChoices, { text: `گزینه ${toPersianNumber(questionChoices.length + 1)}` }])} size="large">
          <AddCircleIcon />
        </IconButton>
        <IconButton
          color="primary"
          disabled={questionChoices.length < 3}
          onClick={() => setQuestionChoices(questionChoices.slice(0, -1))}
          size="large">
          <RemoveCircleIcon />
        </IconButton>
        <TextField
          fullWidth
          select
          label={t('answer')}
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}>
          {questionChoices.map((choice, index) => (
            <MenuItem key={index} value={choice.text}>
              {`${index + 1}- ${choice.text}`}
            </MenuItem>
          ))}
        </TextField>
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
  createMultiChoicesQuestionWidget: createMultiChoicesQuestionWidgetAction,
})(MultiChoiceQuestionEditWidget);
