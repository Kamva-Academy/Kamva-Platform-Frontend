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
  id,
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
        {mode === MODES.CORRECTION ? (
          <Grid item xs>
            <Paper className={classes.showAnswer}>{value}</Paper>
          </Grid>
        ) : (
          <>
            <Grid item xs>
              <TextField
                fullWidth
                variant={'outlined'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
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

            <Grid item xs={3} sm={2} md={3}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="small"
                disabled={mode === MODES.EDIT}
                onClick={() =>
                  sendSmallAnswer({ playerId, problemId: id, answer: value })
                }>
                {t('submit')}
              </Button>
            </Grid>
          </>
        )}

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

const mapStateToProps = (state) => ({
  playerId: state.currentState.player?.id,
});

export default connect(mapStateToProps, {
  sendSmallAnswer: sendSmallAnswerAction,
})(SmallAnswerQuestionWidget);
