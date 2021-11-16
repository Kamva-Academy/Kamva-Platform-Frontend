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

import {
  sendSmallAnswerAction,
} from '../../../redux/slices/widget';
import TinyPreview from '../../tiny_editor/react_tiny/Preview';

const useStyles = makeStyles((theme) => ({
}));


const SmallAnswerQuestionWidget = ({
  pushAnswer,
  required,
  id: widgetId,
  text = '',
  sendSmallAnswer,
}) => {
  const t = useTranslate();
  const classes = useStyles();
  const [value, setValue] = useState();
  const [isButtonDisabled, setButtonDisable] = useState(false);

  const handleTextFieldChange = (e) => {
    if (pushAnswer) {
      pushAnswer('text', e.target.value);
    }
    setValue(e.target.value);
  }

  console.log(value)

  const handleButtonClick = () => {
    setButtonDisable(true);
    setTimeout(() => {
      setButtonDisable(false);
    }, 20000);
    sendSmallAnswer({ widgetId, text: value });
  }

  return (
    <>
      <TinyPreview
        frameProps={{
          frameBorder: '0',
          scrolling: 'no',
          width: '100%',
        }}
        content={required ? text + '<span style="color: #ff0000;">*</span>' : text}
      />
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs>
          <TextField
            fullWidth
            value={value}
            onChange={handleTextFieldChange}
          />
        </Grid>
        {!pushAnswer &&
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              disabled={isButtonDisabled}
              variant="contained"
              color="primary"
              size="small"
              onClick={handleButtonClick}>
              {t('submit')}
            </Button>
          </Grid>
        }
        {/* {answer?.text &&
          <Grid item xs={12}>
            <Typography variant="body2">
              {t('answer') + ': ' + answer.text}
            </Typography>
          </Grid>
        } */}
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
