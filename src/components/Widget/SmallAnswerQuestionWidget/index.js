import {
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { sendSmallAnswerAction } from '../../../redux/slices/currentState';
import TinyPreview from '../../tiny_editor/react_tiny/Preview';
import { MODES } from '..';

const useStyles = makeStyles((theme) => ({
  success: {
    '& input:valid + fieldset': {
      borderColor: 'green',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },
  },
  showAnswer: {
    padding: theme.spacing(1),
    background: '#eee',
  },
}));

const SmallAnswerQuestionWidget = ({
  pushAnswer,

  required,
  id: widgetId,
  text = '',
  answer,
  last_submit,
  mode,
  playerId,
  sendSmallAnswer,
}) => {
  const t = useTranslate();
  const classes = useStyles();
  const [value, setValue] = useState(last_submit?.text);
  const [isButtonDisabled, setButtonDisable] = useState(false);

  const handleTextFieldChange = (e) => {
    pushAnswer('text', e.target.value);
    setValue(value);
  }

  const handleButtonClick = () => {
    setButtonDisable(true);
    setTimeout(() => {
      setButtonDisable(false);
    }, 20000);
    sendSmallAnswer({ playerId, problemId: widgetId, answer: value });
  }

  return (
    <>
      <TinyPreview
        frameProps={{
          frameBorder: '0',
          scrolling: 'no',
          width: '100%',
        }}
        content={
          required
            ? text + '<span style="color: #ff0000;">*</span>'
            : text
        }
      />
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs>
          <TextField
            fullWidth
            value={value}
            onChange={handleTextFieldChange}
            size="small"
            error={
              answer?.text &&
              last_submit?.text &&
              last_submit?.text !== answer?.text
            }
            className={
              answer?.text &&
              last_submit?.text &&
              last_submit?.text === answer?.text &&
              classes.success
            }
          />
        </Grid>
        {!pushAnswer &&
          <Grid item xs={3} sm={2} md={3}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="small"
              disabled={mode === MODES.EDIT || isButtonDisabled}
              onClick={handleButtonClick}>
              {t('submit')}
            </Button>
          </Grid>
        }
        {answer?.text &&
          <Grid item xs={12}>
            <Typography variant="body2">
              {t('answer') + ': ' + answer.text}
            </Typography>
          </Grid>
        }
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  playerId: state.currentState.player?.id,
});

export default connect(
  mapStateToProps,
  {
    sendSmallAnswer: sendSmallAnswerAction,
  }
)(SmallAnswerQuestionWidget);
