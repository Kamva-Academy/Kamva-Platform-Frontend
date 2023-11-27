import React, { FC, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Stack } from '@mui/material';

import { sendMultiChoiceAnswerAction } from 'redux/slices/Paper';
import TinyPreview from 'components/tiny_editor/react_tiny/Preview';
import { WidgetModes } from '..';
import MultiChoiceQuestionEditWidget from './edit';
export { MultiChoiceQuestionEditWidget };

type MultiChoiceQuestionWidgetPropsType = {
  id: string;
  text: string;
  choices: any[];
  last_submitted_answer: any;
  mode: WidgetModes;
  sendMultiChoiceAnswer: any;
}

const MultiChoiceQuestionWidget: FC<MultiChoiceQuestionWidgetPropsType> = ({
  id: widgetId,
  text: questionText,
  choices: questionChoices,
  last_submitted_answer,
  mode,
  sendMultiChoiceAnswer,
}) => {
  const [selectedChoices, setSelectedChoices] = useState<any[]>([]);

  useEffect(() => {
    if (last_submitted_answer?.choices)
      setSelectedChoices(last_submitted_answer.choices)
  }, [last_submitted_answer?.choices])

  return (
    <Fragment>
      <TinyPreview
        frameProps={{
          frameBorder: '0',
          scrolling: 'no',
          width: '100%',
        }}
        content={questionText}
      />
      <Stack spacing={1}>
        {questionChoices.map((choice, index) =>
          <Button
            key={index}
            fullWidth
            variant="contained"
            sx={{
              ...(mode === WidgetModes.View && selectedChoices.map(choice => choice.id).includes(choice.id) ? {
                border: '2px dashed white',
              } : {}),
              ...(choice?.is_correct ? {
                color: '#fff',
                borderColor: '#337766',
                margin: 1,
                backgroundColor: '#337766',
                '&:hover': {
                  color: 'black',
                }
              } : {})
            }}
            onClick={() => {
              if (mode === WidgetModes.Edit) return;
              setSelectedChoices([choice])
              sendMultiChoiceAnswer({ problemId: widgetId, selectedChoices: [choice] });
            }}>
            {choice.text}
          </Button>
        )}
      </Stack>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  playerId: state.currentState.player?.id,
});

export default connect(mapStateToProps, {
  sendMultiChoiceAnswer: sendMultiChoiceAnswerAction,
})(MultiChoiceQuestionWidget);
