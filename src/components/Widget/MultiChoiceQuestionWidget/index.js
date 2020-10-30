import React from 'react';
import clsx from 'clsx';
import { Button, makeStyles } from '@material-ui/core';
import TinyPreview from '../../tiny_editor/react_tiny/Preview';

const useStyles = makeStyles((theme) => ({
  choice: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
  selected: {
    color: '#fff',
    border: '1px solid #337733',
    margin: theme.spacing(1, 1, 0, 0),
    backgroundColor: '#5577aa',
    '&:hover': {
      color: 'black',
    },
  },
}));

const MultiChoiceQuestionWidget = ({ content, choices, lastSelected }) => {
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
            fullWidth
            variant="contained"
            className={clsx(
              classes.choice,
              index === lastSelected && classes.selected
            )}>
            {choice}
          </Button>
        ))}
    </>
  );
};

export default MultiChoiceQuestionWidget;
