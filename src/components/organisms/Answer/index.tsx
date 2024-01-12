import React, { FC } from 'react';
import { WidgetTypes } from '../Widget';

enum AnswerType2WidgetType {
  SmallAnswer = WidgetTypes.SmallAnswerProblem,
  BigAnswer = WidgetTypes.BigAnswerProblem,
  UploadFileAnswer = WidgetTypes.UploadFileProblem,
  MultiChoiceAnswer = WidgetTypes.MultiChoiceProblem,
  InviteeUsername = WidgetTypes.InviteeUsername,
}

type AnswerPropsType = {
}

const Answer: FC<AnswerPropsType> = ({

}) => {

  return (
    <></>
  );
};

export default Answer;
