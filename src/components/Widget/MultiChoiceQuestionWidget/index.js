import { Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';

import { sendMultiChoiceAnswerAction } from '../../../redux/slices/currentState';
import TinyPreview from '../../tiny_editor/react_tiny/Preview';
import MultiChoiceQuestionEditWidget from './edit';

export { MultiChoiceQuestionEditWidget };

const useStyles = makeStyles((theme) => ({
  choice: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
  selected: {
    color: 'black',
    border: '2px dashed #EB1748',
    margin: theme.spacing(1, 1, 0, 0),
  },
  answer: {
    color: '#fff',
    borderColor: '#337766',
    margin: theme.spacing(1, 1, 0, 0),
    backgroundColor: '#337766',
    '&:hover': {
      color: 'black',
    },
  },
}));

const MultiChoiceQuestionWidget = ({
  id,
  text,
  choices,
  answer,
  last_submit,
  disabled = true,
  playerId,
  sendMultiChoiceAnswer,
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
      {choices &&
        choices.map((choice, index) => (
          <Button
            key={index}
            fullWidth
            variant="contained"
            disabled={disabled}
            className={clsx(
              classes.choice,
              +index === +last_submit?.text && classes.selected,
              +index === +answer?.text && classes.answer
            )}
            onClick={() =>
              sendMultiChoiceAnswer({ playerId, problemId: id, answer: index })
            }>
            {choice.text}
          </Button>
        ))}
    </>
  );
};

const mapStateToProps = (state) => ({
  playerId: state.currentState.player?.id,
});

export default connect(mapStateToProps, {
  sendMultiChoiceAnswer: sendMultiChoiceAnswerAction,
})(MultiChoiceQuestionWidget);
