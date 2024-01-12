import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { FC, Fragment, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyPreview from 'components/tiny_editor/react_tiny/Preview';
import { WidgetModes } from 'components/organisms/Widget';
import SmallAnswerProblemEditWidget from './edit';
import { toast } from 'react-toastify';
import Confetti from 'react-confetti'
import CostDialog from 'components/organisms/dialogs/CostDialog';

type SmallAnswerProblemWidgetPropsType = {
  onAnswerChange: any;
  onAnswerSubmit: any;

  reward: any;
  cost: any,
  id: number;
  mode: WidgetModes;
  text: string;
  correct_answer: any;
  last_submitted_answer: any;
  be_corrected: boolean;
}

const SmallAnswerProblemWidget: FC<SmallAnswerProblemWidgetPropsType> = ({
  onAnswerChange,
  onAnswerSubmit,

  reward,
  cost,
  id: paperId,
  mode,
  text: problemText,
  last_submitted_answer,
  correct_answer: correctAnswer,
  be_corrected: beCorrected,
}) => {
  const t = useTranslate();
  const [answer, setAnswer] = useState<string>(last_submitted_answer ? last_submitted_answer.text : '');
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [hasAnsweredCorrectly, setHasAnsweredCorrectly] = useState(false);

  const changeText = (e) => {
    if (mode === WidgetModes.InAnswerSheet) {
      onAnswerChange({ text: e.target.value });
    }
    setAnswer(e.target.value);
  }

  const submit = () => {
    if (!answer) {
      return;
    }
    onAnswerSubmit({ widgetId: paperId, text: answer });
  }

  return (
    <Fragment>
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
          alignItems='stretch'
          spacing={1}>
          {(mode === WidgetModes.View || mode === WidgetModes.InAnswerSheet) &&
            <>
              <TextField
                fullWidth
                variant='outlined'
                value={answer}
                disabled={hasAnsweredCorrectly}
                error={hasAnswered && !hasAnsweredCorrectly}
                autoComplete='false'
                placeholder={'لطفاً پاسخ خود را وارد کنید.'}
                onChange={changeText}
                size='small'
              />
              {mode === WidgetModes.View &&
                <Button
                  variant='outlined'
                  color='primary'
                  sx={{ whiteSpace: 'nowrap' }}
                  disabled={disableSubmitButton || hasAnsweredCorrectly}
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
    </Fragment>
  );
};

export { SmallAnswerProblemEditWidget };
export default SmallAnswerProblemWidget;
