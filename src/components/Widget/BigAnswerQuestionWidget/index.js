import { Button, Grid, Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import TinyPreview from '../../tiny_editor/react_tiny/Preview';
import TinyEditorComponent from '../../tiny_editor/react_tiny/TinyEditorComponent';
import { WidgetModes } from '..';
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
  sendBigAnswer,
  pushAnswer,

  id,
  text,
  mode,
}) => {
  const t = useTranslate();
  const classes = useStyles();
  const [value, setValue] = useState(text);
  const [isButtonDisabled, setButtonDisable] = useState(false);

  const handleTextChange = (text) => {
    if (pushAnswer) {
      pushAnswer('text', text);
    }
    setValue(text);
  }

  const handleButtonClick = () => {
    setButtonDisable(true);
    setTimeout(() => {
      setButtonDisable(false);
    }, 20000)
    sendBigAnswer({ problemId: id, answer: value })
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TinyPreview
          frameProps={{
            frameBorder: '0',
            scrolling: 'no',
            width: '100%',
          }}
          content={value}
        />
      </Grid>
      {/* <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="small"
          className={classes.submit}
          onClick={handleButtonClick}>
          {t('submitAnswer')}
        </Button>
      </Grid> */}
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  playerId: state.currentState.player?.id,
  pushAnswer: ownProps.pushAnswer, //todo: redundant?!
});

export default connect(
  mapStateToProps,
  {

  }
)(BigAnswerQuestionWidget);
