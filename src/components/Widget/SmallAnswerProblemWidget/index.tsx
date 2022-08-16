import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { sendSmallAnswerAction } from '../../../redux/slices/Paper';
import TinyPreview from '../../tiny_editor/react_tiny/Preview';
import { WidgetModes } from '..';
import SmallAnswerProblemEditWidget from './edit';

type SmallAnswerProblemWidgetPropsType = {
  sendSmallAnswer: any;
  collectAnswers: any;
  id: number;
  mode: WidgetModes;
  text: string;
  answer: any;
  last_submitted_answer: any;
}

const SmallAnswerProblemWidget: FC<SmallAnswerProblemWidgetPropsType> = ({
  sendSmallAnswer,
  collectAnswers,
  id: paperId,
  mode,
  text: problemText,
  last_submitted_answer,
}) => {
  const t = useTranslate();
  const [answer, setAnswer] = useState<string>(last_submitted_answer?.text);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  const changeText = (e) => {
    if (mode === WidgetModes.InAnswerSheet) {
      collectAnswers('text', e.target.value);
    }
    setAnswer(e.target.value);
  }

  const submit = () => {
    setDisableSubmitButton(true);
    setTimeout(() => {
      setDisableSubmitButton(false);
    }, 20000);
    sendSmallAnswer({ widgetId: paperId, text: answer });
  }

  console.log(answer)

  return (
    <Stack spacing={1}>
      <TinyPreview
        frameProps={{
          frameBorder: '0',
          scrolling: 'no',
          width: '100%',
        }}
        content={problemText}
      />
      <Stack
        direction='row'
        justifyContent='flex-start'
        alignItems="stretch"
        spacing={1}>
        {(mode === WidgetModes.View || mode === WidgetModes.InAnswerSheet) &&
          <>
            <TextField
              fullWidth
              variant='outlined'
              value={answer}
              placeholder={'لطفاً پاسخ خود را وارد کنید.'}
              onChange={changeText}
              size="small"
            />
            {mode === WidgetModes.View &&
              <Button
                variant="contained"
                color="primary"
                sx={{ whiteSpace: 'nowrap' }}
                disabled={disableSubmitButton}
                onClick={submit}>
                {t('submit')}
              </Button>
            }
          </>
        }
        {mode === WidgetModes.Review &&
          <>
            {answer ?
              <Typography>{answer}</Typography> :
              <Typography color='red' variant='caption'>
                {'پاسخی برای این سوال ثبت نشده است.'}
              </Typography>
            }
          </>
        }
      </Stack>
    </Stack>
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
)(SmallAnswerProblemWidget);

export { SmallAnswerProblemEditWidget };
