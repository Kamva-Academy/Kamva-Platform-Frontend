import React, { FC, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Stack } from '@mui/material';

import TinyPreview from 'components/tiny_editor/react_tiny/Preview';
import { WidgetModes } from 'components/organisms/Widget';
import MultiChoiceQuestionEditWidget from './edit';
export { MultiChoiceQuestionEditWidget };

type MultiChoiceQuestionWidgetPropsType = {
  onAnswerSubmit: any;
  onAnswerChange: any;
  id: string;
  text: string;
  choices: any[];
  last_submitted_answer: any;
  mode: WidgetModes;
}

const MultiChoiceQuestionWidget: FC<MultiChoiceQuestionWidgetPropsType> = ({
  onAnswerSubmit,
  onAnswerChange,

  id: widgetId,
  text: questionText,
  choices: questionChoices,
  last_submitted_answer,
  mode,
}) => {
  const [selectedChoices, setSelectedChoices] = useState<any[]>([]);

  useEffect(() => {
    if (last_submitted_answer?.choices)
      setSelectedChoices(last_submitted_answer.choices)
  }, [last_submitted_answer?.choices])

  const onAnswerSubmitWrapper = (choice) => {
    if (mode === WidgetModes.Edit) return;
    setSelectedChoices([choice])
    onAnswerSubmit({ problemId: widgetId, selectedChoices: [choice] });
  }

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
            onClick={() => onAnswerSubmitWrapper(choice)}>
            {choice.text}
          </Button>
        )}
      </Stack>
    </Fragment>
  );
};

export default MultiChoiceQuestionWidget;
