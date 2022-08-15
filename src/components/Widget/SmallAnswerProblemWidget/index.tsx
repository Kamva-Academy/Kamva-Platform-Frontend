import { Button, Stack, TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { sendSmallAnswerAction } from '../../../redux/slices/Paper';
import TinyPreview from '../../tiny_editor/react_tiny/Preview';
import { WidgetModes } from '..';
import SmallAnswerProblemEditWidget from './edit';

type SmallAnswerProblemWidgetPropsType = {
  sendSmallAnswer: any;
  pushAnswer: any;
  id: number;
  mode: WidgetModes;
  text: string;
  answer: any;
  last_submitted_answer: any;
  isInAnswerSheet: boolean;
}

const SmallAnswerProblemWidget: FC<SmallAnswerProblemWidgetPropsType> = ({
  sendSmallAnswer,
  pushAnswer,

  id,
  mode,
  text: problemText,
  last_submitted_answer,
  isInAnswerSheet,
}) => {
  const t = useTranslate();
  const [newAnswer, setNewAnswer] = useState<string>(last_submitted_answer?.text);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  const handleTextFieldChange = (e) => {
    if (isInAnswerSheet) pushAnswer('text', e.target.value);
    setNewAnswer(e.target.value);
  }

  const submit = () => {
    setDisableSubmitButton(true);
    setTimeout(() => {
      setDisableSubmitButton(false);
    }, 20000);
    sendSmallAnswer({ widgetId: id, text: newAnswer });
  }

  return (
    <>
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
        justifyContent='center'
        alignItems="stretch"
        spacing={1}>
        <TextField
          fullWidth
          variant='outlined'
          value={newAnswer}
          disabled={mode === WidgetModes.Edit}
          onChange={handleTextFieldChange}
          size="small"
        />
        {!isInAnswerSheet &&
          <Button
            variant="contained"
            color="primary"
            sx={{ whiteSpace: 'nowrap' }}
            disabled={disableSubmitButton || mode === WidgetModes.Edit}
            onClick={submit}>
            {t('submit')}
          </Button>
        }
      </Stack>
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
)(SmallAnswerProblemWidget);

export { SmallAnswerProblemEditWidget };
