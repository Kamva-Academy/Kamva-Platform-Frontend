import { Button, makeStyles, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { sendBigAnswerAction } from '../../../redux/slices/currentState';
import TinyPreview from '../../tiny_editor/react_tiny/Preview';
import TinyEditorComponent from '../../tiny_editor/react_tiny/TinyEditorComponent';
import { MODES } from '..';
import BigAnswerQuestionEditWidget from './edit';

export { BigAnswerQuestionEditWidget };

const useStyles = makeStyles((theme) => ({
  submit: {
    marginTop: theme.spacing(1),
  },
  showAnswer: {
    background: '#eee',
  },
}));

const BigAnswerQuestionWidget = ({
  pushAnswer,
  id,
  text = '',
  answer,
  last_submit,
  mode,
  playerId,
  sendBigAnswer,
}) => {
  const t = useTranslate();
  const classes = useStyles();
  const [value, setValue] = useState(last_submit?.text);
  const [isButtonDisabled, setButtonDisable] = useState(false);

  const handleTextChange = (text) => {
    console.log(pushAnswer)
    pushAnswer('text', text);
    setValue(text);
  }

  const handleButtonClick = () => {
    setButtonDisable(true);
    setTimeout(() => {
      setButtonDisable(false);
    }, 20000)
    sendBigAnswer({ playerId, problemId: id, answer: value })
  }


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
      <label>{t('answer')}</label>
      {mode === MODES.VIEW ? (
        <TinyEditorComponent
          id={`edit-big-answer-${Math.floor(Math.random() * 1000)}`}
          content={value}
          onChange={handleTextChange}
        />
      ) : (
          <Paper className={classes.showAnswer}>
            <TinyPreview
              frameProps={{
                frameBorder: '0',
                width: '100%',
              }}
              content={mode === MODES.EDIT ? answer?.text : value}
            />
          </Paper>
        )}

      {(mode !== MODES.CORRECTION && !pushAnswer) && (
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="small"
          className={classes.submit}
          disabled={mode === MODES.EDIT || isButtonDisabled}
          onClick={handleButtonClick}>
          {t('submitAnswer')}
        </Button>
      )}
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  playerId: state.currentState.player?.id,
  pushAnswer: ownProps.pushAnswer, //todo: redundant?!
});

export default connect(mapStateToProps, { sendBigAnswer: sendBigAnswerAction })(
  BigAnswerQuestionWidget
);
