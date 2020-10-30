import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import TinyPreview from '../../tiny_editor/react_tiny/Preview';
import TinyEditorComponent from '../../tiny_editor/react_tiny/TinyEditorComponent';

const useStyles = makeStyles((theme) => ({
  submit: {
    marginTop: theme.spacing(1),
  },
}));

const BigAnswerQuestionWidget = ({ content = '', lastAnswer = '' }) => {
  const classes = useStyles();
  return (
    <>
      <TinyPreview
        frameProps={{
          frameBorder: '0',
          scrolling: 'no',
          width: '100%',
        }}
        content={content}
      />
      <TinyEditorComponent
        id={`edit-big-answer-${Math.floor(Math.random() * 1000)}`}
        content={lastAnswer}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        size="small"
        className={classes.submit}>
        ثبت پاسخ
      </Button>
    </>
  );
};

export default BigAnswerQuestionWidget;
