import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
} from '@mui/material';
import {
  AddCircle as AddCircleIcon,
} from '@mui/icons-material';
import React, { FC, useEffect, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import TinyEditorComponent from 'components/tiny_editor/react_tiny/TinyEditorComponent';
import { toPersianNumber } from 'utils/translateNumber';
import { ChoiceType } from 'types/widgets';
import MultiChoiceQuestionChoice from 'components/molecules/MultiChoiceQuestionChoice';

type MultiChoiceQuestionEditWidgetPropsType = {
  onEdit: any;

  text: string;
  open: boolean;
  handleClose: any;
  choices: any[];
  paperId: any;
  id: string;
}

const MultiChoiceQuestionEditWidget: FC<MultiChoiceQuestionEditWidgetPropsType> = ({
  onEdit,

  text: previousQuestionText,
  choices: previousQuestionChoices,
  paperId,
  id: widgetId,
  handleClose,
  open,
}) => {
  const t = useTranslate();

  const [questionText, setQuestionText] = useState(previousQuestionText);
  const [questionChoices, setQuestionChoices] = useState<ChoiceType[]>(
    previousQuestionChoices
      ? previousQuestionChoices
      : [
        { text: 'گزینه ۱' },
        { text: 'گزینه ۲' }
      ]);

  const handleSubmit = () => {
    onEdit({
      paper: paperId,
      text: questionText,
      choices: questionChoices,
      widgetId,
      onSuccess: handleClose,
    });
  };

  const changeChoiceText = (newValue, choiceIndex) => {
    const newChoices = [...questionChoices];
    newChoices[choiceIndex] = {
      ...newChoices[choiceIndex],
      text: newValue
    };
    setQuestionChoices(newChoices);
  };

  const changeChoiceIsCorrect = (choiceIndex: number) => {
    const newChoices = [...questionChoices];
    newChoices[choiceIndex] = {
      ...newChoices[choiceIndex],
      is_correct: newChoices[choiceIndex].is_correct ? false : true
    };
    setQuestionChoices(newChoices);
  }

  const addNewChoice = () => {
    setQuestionChoices([...questionChoices, { text: `گزینه ${toPersianNumber(questionChoices.length + 1)}` }]);
  }

  const deleteChoice = (choiceIndex: number) => {
    const newChoices = [...questionChoices];
    newChoices.splice(choiceIndex, 1);
    setQuestionChoices(newChoices);
  }

  return (
    <Dialog
      disableScrollLock
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      disableAutoFocus
      disableEnforceFocus>
      <DialogTitle>{t('multipleChoiceQuestions')}</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <DialogContentText>
            {'صورت سوال و گزینه‌های آن را وارد کنید.'}
          </DialogContentText>
          <label>{'صورت سوال'}</label>
          <TinyEditorComponent content={questionText} onChange={(val) => setQuestionText(val)} />

          <label>{t('options')}</label>
          {questionChoices.map((choice, index) => (
            <Box key={index}>
              <MultiChoiceQuestionChoice
                choice={choice}
                changeChoiceIsCorrect={() => changeChoiceIsCorrect(index)}
                deleteChoice={() => deleteChoice(index)}
                changeChoiceText={(event) => changeChoiceText(event.target.value, index)}
              />
            </Box>
          ))}

          <IconButton color="primary" onClick={addNewChoice} sx={{ alignSelf: 'start', padding: 0 }}>
            <AddCircleIcon fontSize='large' />
          </IconButton>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {t('submit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MultiChoiceQuestionEditWidget;
