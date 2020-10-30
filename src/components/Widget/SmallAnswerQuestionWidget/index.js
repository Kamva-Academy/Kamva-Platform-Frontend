import { Box, Button, TextField } from '@material-ui/core';
import React from 'react';
import TinyPreview from '../../tiny_editor/react_tiny/Preview';
import TinyEditorComponent from '../../tiny_editor/react_tiny/TinyEditorComponent';

const SmallAnswerQuestionWidget = ({ content = '' }) => {
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
      <Box my={1}>
        <TextField fullWidth variant="outlined" />
      </Box>
      <Button fullWidth variant="contained" color="primary" size="small">
        ثبت پاسخ
      </Button>
    </>
  );
};

export default SmallAnswerQuestionWidget;
