import React, { useState } from 'react';
import { createMultiChoicesQuestionWidget } from '../../../redux/actions/mentor';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  makeStyles,
  MenuItem,
  TextField,
} from '@material-ui/core';
import TinyEditorComponent from '../../tiny_editor/react_tiny/TinyEditorComponent';
import {
  AddCircle as AddCircleIcon,
  Remove as RemoveIcon,
} from '@material-ui/icons';

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
  stateId,
  id,
  createMultiChoicesQuestionWidget,
}) {
  const classes = useStyles();

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
        state: stateId,
        text: question,
        answer,
        choices: choices.map((choice) => ({ text: choice })),
      }).then(()=>window.location.reload(false));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      scroll="body">
      <DialogTitle>سوال چند گزینه‌ای</DialogTitle>
      <DialogContent>
        <DialogContentText>
          صورت سوال و گزینه‌های آن را وارد کنید.
        </DialogContentText>
        <label>سوال</label>
        <TinyEditorComponent
          id={`edit-text-${Math.floor(Math.random() * 1000)}`}
          content={question}
          onChange={(val) => setQuestion(val)}
        />
        <br />
        <label>گزینه‌ها</label>
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
          <IconButton
            color="primary"
            onClick={() => setChoices([...choices, ''])}>
            <AddCircleIcon />
          </IconButton>
          <IconButton
            color="primary"
            disabled={choices.length < 3}
            onClick={() => setChoices(choices.slice(0, -1))}>
            <RemoveIcon />
          </IconButton>
        </div>
        <br />
        <br />
        <TextField
          fullWidth
          select
          label="پاسخ"
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
          ثبت
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(null, { createMultiChoicesQuestionWidget })(
  MultiChoiceQuestionEditWidget
);
