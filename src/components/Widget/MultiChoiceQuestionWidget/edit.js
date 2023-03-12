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
import makeStyles from '@mui/styles/makeStyles';
import {
  AddCircle as AddCircleIcon,
  RemoveCircle as RemoveCircleIcon,
} from '@mui/icons-material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { createMultiChoicesQuestionWidgetAction } from '../../../redux/slices/widget';
import TinyEditorComponent from '../../tiny_editor/react_tiny/TinyEditorComponent';

const useStyles = makeStyles((theme) => ({
  choice: {
    padding: theme.spacing(1, 0, 1, 4),
  },
}));

function MultiChoiceQuestionEditWidget({
  open,
  handleClose,
  initChoices = ['', ''],
  initQuestion,
  initAnswer,
  paperId,
  id,
  createMultiChoicesQuestionWidget,
}) {
  const classes = useStyles();
  const t = useTranslate();

  const [question, setQuestion] = useState(initQuestion);
  const [answer, setAnswer] = useState(initAnswer);
  const [choices, setChoices] = useState(initChoices);

  const onChangeChoices = (value, index) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const handleClick = () => {
    if (id) {
      // TODO: edit mode
    } else {
      createMultiChoicesQuestionWidget({
        paper: paperId,
        text: question,
        answer,
        choices: choices.map((choice) => ({ text: choice })),
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
      <DialogTitle>{t('multipleChoiceQuestions')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          صورت سوال و گزینه‌های آن را وارد کنید.
        </DialogContentText>
        <label>{t('question')}</label>
        <TinyEditorComponent
          id={`edit-text-${Math.floor(Math.random() * 1000)}`}
          content={question}
          onChange={(val) => setQuestion(val)}
        />
        <br />
        <label>{t('options')}</label>
        {choices.map((choice, index) => (
          <TextField
            key={index}
            fullWidth
            value={choice}
            variant="outlined"
            className={classes.choice}
            onChange={(e) => onChangeChoices(e.target.value, index)}
          />
        ))}
        <div>
          <IconButton color="primary" onClick={() => setChoices([...choices, ''])} size="large">
            <AddCircleIcon />
          </IconButton>
          <IconButton
            color="primary"
            disabled={choices.length < 3}
            onClick={() => setChoices(choices.slice(0, -1))}
            size="large">
            <RemoveCircleIcon />
          </IconButton>
        </div>
        <br />
        <br />
        <TextField
          fullWidth
          select
          label={t('answer')}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}>
          {choices.map((choice, index) => (
            <MenuItem key={index} value={index}>
              {`${index + 1}- ${choice}`}
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
