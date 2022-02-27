import {
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import {
  addNotificationAction,
} from '../../../redux/slices/notifications'
import {
  sendSmallAnswerAction,
} from '../../../redux/slices/widget';
import TinyPreview from '../../tiny_editor/react_tiny/Preview';

const useStyles = makeStyles((theme) => ({
}));


const SmallAnswerQuestionWidget = ({
  addNotification,
  sendSmallAnswer,
  pushAnswer,

  viewMode,
  required,
  disabled,
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

  const handleTextFieldChange = (e) => {
    if (pushAnswer) {
      pushAnswer('text', e.target.value);
    }
    setRecentAnswer(e.target.value);
  }

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
    sendSmallAnswer({ widgetId, text: recentAnswer });
  }

  return (
    <>
      <TinyPreview
        frameProps={{
          frameBorder: '0',
          scrolling: 'no',
          width: '100%',
        }}
        content={required ? problemText + '<span style="color: #ff0000;">*</span>' : problemText}
      />
      <Box mt={1}>
        <Grid container spacing={1}>
          <Grid item xs>
            <TextField
              disabled={disabled || viewMode}
              fullWidth
              placeholder='پاسخ خودت رو اینجا بنویس...'
              value={recentAnswer}
              onChange={handleTextFieldChange}
            />
          </Grid>
          {!pushAnswer && !viewMode &&
            <Grid item container alignItems='stretch' xs={12} sm={3}>
              <Button
                fullWidth
                disabled={isButtonDisabled}
                variant="contained"
                color="primary"
                onClick={handleButtonClick}>
                {isButtonDisabled ? 'صبر کنید!' : t('submit')}
              </Button>
            </Grid>
          }
        </Grid>
      </Box>

    </>
  );
};

const mapStateToProps = (state) => ({
});

export default connect(
  mapStateToProps,
  {
    addNotification: addNotificationAction,
    sendSmallAnswer: sendSmallAnswerAction,
  }
)(SmallAnswerQuestionWidget);
