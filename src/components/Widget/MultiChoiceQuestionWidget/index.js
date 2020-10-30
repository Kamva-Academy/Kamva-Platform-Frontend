import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import TinyPreview from '../../tiny_editor/react_tiny/Preview';

const useStyles = makeStyles((theme) => ({
  choice: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

const MultiChoiceQuestionWidget = ({ content, choices }) => {
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
      {choices &&
        choices.map((choice, index) => (
          <Button
            key={index}
            className={classes.choice}
            fullWidth
            variant="contained">
            {choice}
          </Button>
        ))}
    </>
  );
};

export default MultiChoiceQuestionWidget;
