import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import TinyPreview from '../../tiny_editor/react_tiny/Preview';
import TinyEditorComponent from '../../tiny_editor/react_tiny/TinyEditorComponent';
import BigAnswerQuestionEditWidget from './edit';

export { BigAnswerQuestionEditWidget };

const useStyles = makeStyles((theme) => ({
  submit: {
    marginTop: theme.spacing(1),
  },
}));

const BigAnswerQuestionWidget = ({
  text = '',
  answer = { text: '' },
  disabled = true,
}) => {
  const classes = useStyles();
  return (
    <>
      <TinyPreview
        frameProps={{
          frameBorder: '0',
          scrolling: 'no',
          width: '100%',
        }}
        content={text}
      />
      <label>پاسخ</label>
      {disabled ? (
        <TinyPreview
          frameProps={{
            frameBorder: '1',
            scrolling: 'no',
            width: '100%',
          }}
          content={answer.text}
        />
      ) : (
        <TinyEditorComponent
          id={`edit-big-answer-${Math.floor(Math.random() * 1000)}`}
          content={answer.text}
        />
      )}

      <Button
        fullWidth
        variant="contained"
        color="primary"
        size="small"
        className={classes.submit}
        disabled={disabled}>
        ثبت پاسخ
      </Button>
    </>
  );
};

export default BigAnswerQuestionWidget;
