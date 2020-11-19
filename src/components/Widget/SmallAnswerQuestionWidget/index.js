import { Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import TinyPreview from '../../tiny_editor/react_tiny/Preview';
import SmallAnswerQuestionEditWidget from './edit';

export { SmallAnswerQuestionEditWidget };

const SmallAnswerQuestionWidget = ({
  text = '',
  answer = { text: '' },
  disabled = true,
}) => {
  const [value, setValue] = useState(answer.text);
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
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={9} sm={10} md={9}>
          <TextField
            fullWidth
            variant="outlined"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item xs={3} sm={2} md={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="small"
            disabled={disabled}>
            ثبت
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default SmallAnswerQuestionWidget;
