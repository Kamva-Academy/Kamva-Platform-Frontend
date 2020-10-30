import { Button } from '@material-ui/core';
import React from 'react';
import TinyPreview from '../../tiny_editor/react_tiny/Preview';
import TinyEditorComponent from '../../tiny_editor/react_tiny/TinyEditorComponent';

const BigAnswerQuestionWidget = ({ content = '' }) => {
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
      />
      <Button fullWidth variant="contained" color="primary" size="small">
        ثبت پاسخ
      </Button>
    </>
  );
};

export default BigAnswerQuestionWidget;
