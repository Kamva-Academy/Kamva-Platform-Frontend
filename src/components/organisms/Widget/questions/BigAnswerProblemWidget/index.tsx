import { Button, Stack, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import TinyPreview from 'components/tiny_editor/react_tiny/Preview';
import TinyEditorComponent from 'components/tiny_editor/react_tiny/TinyEditorComponent';
import { WidgetModes } from 'components/organisms/Widget';
import BigAnswerProblemEditWidget from './edit';

export { BigAnswerProblemEditWidget as BigAnswerQuestionEditWidget };

type BigAnswerProblemWidgetPropsType = {
  onAnswerSubmit: any;
  onAnswerChange: any;
  id: number;
  text: string;
  mode: WidgetModes;
  last_submitted_answer?: any;
}

const BigAnswerProblemWidget: FC<BigAnswerProblemWidgetPropsType> = ({
  onAnswerSubmit,
  onAnswerChange,
  id,
  text,
  mode,
  last_submitted_answer,
}) => {
  const t = useTranslate();
  const [answer, setAnswer] = useState<string>(last_submitted_answer?.text);
  const [isButtonDisabled, setButtonDisable] = useState(false);

  const onChangeWrapper = (val: string) => {
    if (mode === WidgetModes.InAnswerSheet) {
      onAnswerChange({ text: val });
    };
    setAnswer(val);
  }

  const onSubmitWrappere = (e) => {
    setButtonDisable(true);
    setTimeout(() => {
      setButtonDisable(false);
    }, 20000)
    onAnswerSubmit({ widgetId: id, text: answer })
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
          onChange={onChangeWrapper}
        />
      }
      {mode === WidgetModes.View &&
        <Button
          disabled={isButtonDisabled}
          fullWidth
          variant="outlined"
          color="primary"
          size="small"
          onClick={onSubmitWrappere}>
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

export default BigAnswerProblemWidget;
