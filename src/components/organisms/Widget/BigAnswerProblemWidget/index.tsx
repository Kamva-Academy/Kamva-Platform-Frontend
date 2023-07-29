import { Button, Grid, Paper, Stack, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyPreview from '../../../tiny_editor/react_tiny/Preview';
import TinyEditorComponent from '../../../tiny_editor/react_tiny/TinyEditorComponent';
import { WidgetModes } from '..';
import { sendBigAnswerAction } from '../../../../redux/slices/Paper';
import BigAnswerProblemEditWidget from './edit';

export { BigAnswerProblemEditWidget as BigAnswerQuestionEditWidget };

type BigAnswerProblemWidgetPropsType = {
  sendBigAnswer: any;
  collectAnswers: any;
  id: number;
  text: string;
  mode: WidgetModes;
  last_submitted_answer?: any;
}

const BigAnswerProblemWidget: FC<BigAnswerProblemWidgetPropsType> = ({
  sendBigAnswer,
  collectAnswers,
  id,
  text,
  mode,
  last_submitted_answer,
  ...props
}) => {
  const t = useTranslate();
  const [answer, setAnswer] = useState<string>(last_submitted_answer?.text);
  const [isButtonDisabled, setButtonDisable] = useState(false);

  const onChange = (val) => {
    if (mode === WidgetModes.InAnswerSheet) {
      collectAnswers('text', val);
    };
    setAnswer(val);
  }

  const submitAnswer = (e) => {
    setButtonDisable(true);
    setTimeout(() => {
      setButtonDisable(false);
    }, 20000)
    sendBigAnswer({ widgetId: id, text: answer })
  }

  return (
    <Stack spacing={1}>
      <TinyPreview
        frameProps={{
          frameBorder: '0',
          scrolling: 'no',
          width: '100%',
        }}
        content={text}
      />
      {(mode === WidgetModes.View || mode === WidgetModes.InAnswerSheet) &&
        <TinyEditorComponent
          content={answer}
          onChange={(val: string) => onChange(val)}
        />
      }
      {mode === WidgetModes.View &&
        <Button
          disabled={isButtonDisabled}
          fullWidth
          variant="outlined"
          color="primary"
          size="small"
          onClick={submitAnswer}>
          {t('submitAnswer')}
        </Button>
      }
      {mode === WidgetModes.Review &&
        <>
          {answer ?
            <TinyPreview
              frameProps={{
                frameBorder: '0',
                scrolling: 'no',
                width: '100%',
              }}
              content={answer}
            /> :
            <Typography color='red' variant='caption'>
              {'پاسخی برای این سوال ثبت نشده است.'}
            </Typography>
          }
        </>
      }
    </Stack>
  );
};

const mapStateToProps = (state) => ({
  playerId: state.currentState.player?.id,
});

export default connect(
  mapStateToProps,
  {
    sendBigAnswer: sendBigAnswerAction,
  }
)(BigAnswerProblemWidget);
