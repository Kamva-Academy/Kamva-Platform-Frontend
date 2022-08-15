import { Button, Grid, Paper, Stack } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import TinyPreview from '../../tiny_editor/react_tiny/Preview';
import TinyEditorComponent from '../../tiny_editor/react_tiny/TinyEditorComponent';
import { WidgetModes } from '..';
import { sendBigAnswerAction } from '../../../redux/slices/Paper';
import BigAnswerProblemEditWidget from './edit';

export { BigAnswerProblemEditWidget as BigAnswerQuestionEditWidget };

type BigAnswerProblemWidgetPropsType = {
  sendBigAnswer: any;
  pushAnswer: any;
  isInAnswerSheet: boolean;
  id: number;
  text: string;
  mode: WidgetModes;
  last_submitted_answer?: any;
}

const BigAnswerProblemWidget: FC<BigAnswerProblemWidgetPropsType> = ({
  sendBigAnswer,
  pushAnswer,
  id,
  text,
  mode,
  isInAnswerSheet,
  last_submitted_answer,
  ...props
}) => {
  const t = useTranslate();
  const [answer, setAnswer] = useState<string>(last_submitted_answer?.text);
  const [isButtonDisabled, setButtonDisable] = useState(false);

  const submitAnswer = (e) => {
    if (isInAnswerSheet) {
      pushAnswer('text', answer);
    }
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
      {mode === WidgetModes.View &&
        <>
          <TinyEditorComponent
            content={answer}
            onChange={(val: string) => setAnswer(val)}
          />
          <Button
            disabled={isButtonDisabled}
            fullWidth
            variant="contained"
            color="primary"
            size="small"
            onClick={submitAnswer}>
            {t('submitAnswer')}
          </Button>
        </>
      }
      {mode === WidgetModes.Review &&
        <TinyPreview
          frameProps={{
            frameBorder: '0',
            scrolling: 'no',
            width: '100%',
          }}
          content={answer}
        />
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
