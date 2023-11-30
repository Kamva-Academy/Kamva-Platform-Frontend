import { TextField, InputAdornment, Tooltip, Radio, IconButton } from '@mui/material';
import React, { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChoiceType } from 'types/widgets';

type MultiChoiceQuestionChoicePropsType = {
  choice: ChoiceType;
  changeChoiceIsCorrect: any;
  deleteChoice: any;
  changeChoiceText: any;
}

const MultiChoiceQuestionChoice: FC<MultiChoiceQuestionChoicePropsType> = ({
  choice,
  changeChoiceIsCorrect,
  deleteChoice,
  changeChoiceText,
}) => {

  return (
    <TextField
      InputProps={{
        sx: { paddingX: 0.5 },
        startAdornment: <InputAdornment position='start'>
          <Tooltip title='انتخاب به‌عنوان گزینه صحیح' arrow>
            <Radio checked={!!choice.is_correct} onClick={changeChoiceIsCorrect} />
          </Tooltip>
        </InputAdornment>,
        endAdornment: <InputAdornment position='end'>
          <Tooltip title='حذف' arrow>
            <IconButton onClick={deleteChoice}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </InputAdornment>
      }}
      fullWidth
      value={choice.text}
      onChange={changeChoiceText}
    />
  );
};

export default MultiChoiceQuestionChoice;