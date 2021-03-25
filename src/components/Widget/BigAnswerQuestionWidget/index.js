import { Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { sendBigAnswerAction } from '../../../redux/slices/currentState';
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
  id,
  text = '',
  answer,
  last_submit,
  disabled = true,
  playerId,
  sendBigAnswer,
}) => {
  const t = useTranslate();
  const classes = useStyles();
  const [value, setValue] = useState(last_submit?.text);
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
          content={value}
          onChange={setValue}
        />
      )}

      <Button
        fullWidth
        variant="contained"
        color="primary"
        size="small"
        className={classes.submit}
        disabled={disabled}
        onClick={() =>
          sendBigAnswer({ playerId, problemId: id, answer: value })
        }>
        {t('submitAnswer')}
      </Button>
    </>
  );
};

const mapStateToProps = (state) => ({
  playerId: state.currentState.player?.id,
});

export default connect(mapStateToProps, { sendBigAnswer: sendBigAnswerAction })(
  BigAnswerQuestionWidget
);
