import { Button, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import {
  addNotificationAction,
} from '../../../redux/slices/notifications'
import {
  sendBigAnswerAction,
} from '../../../redux/slices/widget';
import TinyPreview from '../../tiny_editor/react_tiny/Preview';
import TinyEditorComponent from '../../tiny_editor/react_tiny/TinyEditorComponent';
import { MODES } from '..';

const useStyles = makeStyles((theme) => ({
  submit: {
    marginTop: theme.spacing(1),
  },
}));

const BigAnswerQuestionWidget = ({
  addNotification,
  pushAnswer,
  sendBigAnswer,

  disabled,
  viewMode,
  last_submitted_answer,
  id: widgetId,
  text: problemText,
}) => {
  const t = useTranslate();
  const classes = useStyles();
  const [recentAnswer, setRecentAnswer] = useState();
  const [isButtonDisabled, setButtonDisable] = useState(false);

  useEffect(() => {
    if (last_submitted_answer) {
      setRecentAnswer(last_submitted_answer?.text);
    }
  }, [last_submitted_answer])

  const handleTextChange = (text) => {
    if (pushAnswer) {
      pushAnswer('text', text);
    }
    setRecentAnswer(text);
  };

  const handleButtonClick = () => {
    if (!recentAnswer) {
      addNotification({
        message: 'لظفاً پاسخی وارد کنید.',
        type: 'error',
      });
      return;
    }
    setButtonDisable(true);
    setTimeout(() => {
      setButtonDisable(false);
    }, 20000);
    sendBigAnswer({ widgetId, text: recentAnswer });
  };

  return (
    <>
      <TinyPreview
        frameProps={{
          frameBorder: '0',
          scrolling: 'no',
          width: '100%',
        }}
        content={problemText}
      />

      {viewMode ?
        <TinyPreview
          frameProps={{
            frameBorder: '0',
            scrolling: 'no',
            width: '100%',
          }}
          content={recentAnswer}
        />
        :
        <TinyEditorComponent
          id={`edit-big-answer-${Math.floor(Math.random() * 1000)}`}
          content={recentAnswer}
          onChange={disabled ? () => { } : handleTextChange}
        />
      }

      {!pushAnswer && !viewMode &&
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={isButtonDisabled}
          onClick={handleButtonClick}>
          {isButtonDisabled ? 'صبر کنید!' : t('submit')}
        </Button>
      }
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
});

export default connect(
  mapStateToProps,
  {
    sendBigAnswer: sendBigAnswerAction,
    addNotification: addNotificationAction,
  }
)(BigAnswerQuestionWidget);
