import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

// import { sendSmallAnswerAction } from '../../../redux/slices/currentState';
import TinyPreview from '../../tiny_editor/react_tiny/Preview';
import { WidgetModes } from '..';
import SmallAnswerQuestionEditWidget from './edit';

export { SmallAnswerQuestionEditWidget };

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
  sendSmallAnswer,
  pushAnswer,

  id,
  mode,
  text = '',
  answer,
  ...props
}) => {
  const t = useTranslate();
  const classes = useStyles();
  const [value, setValue] = useState(text);
  const [isButtonDisabled, setButtonDisable] = useState(false);

  useEffect(() => {

  }, [])


  const handleTextFieldChange = (e) => {
    pushAnswer('text', e.target.value);
    setValue(value);
  }

  const handleButtonClick = () => {
    setButtonDisable(true);
    setTimeout(() => {
      setButtonDisable(false);
    }, 20000);
    // sendSmallAnswer({ problemId: id, answer: value });
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
      <Grid container alignItems="center" spacing={1}>
        {mode === WidgetModes.Edit &&
          <>
            <Grid item xs={12} sm={9} md={10}>
              <TextField
                fullWidth
                variant='outlined'
                value={value}
                onChange={handleTextFieldChange}
                size="small"
                error={
                  answer?.text &&
                  text &&
                  text !== answer?.text
                }
                className={
                  answer?.text &&
                  text &&
                  text === answer?.text &&
                  classes.success
                }
              />
            </Grid>
            {!pushAnswer &&
              <Grid item xs={12} sm={3} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="small"
                  disabled={mode === WidgetModes.Edit || isButtonDisabled}
                  onClick={handleButtonClick}>
                  {t('submit')}
                </Button>
              </Grid>
            }
          </>
        }
        {answer?.text && (
          <Grid item xs={12}>
            <Typography variant="body2">
              {t('answer') + ': ' + answer.text}
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  playerId: state.currentState.player?.id,
  pushAnswer: ownProps.pushAnswer, //todo: redundant?!
});

export default connect(mapStateToProps, {
})(SmallAnswerQuestionWidget);
