import React from 'react';

import WIDGET_TYPES from './WidgetTypes';

export const MODES = {
  VIEW: 'VIEW',
  EDIT: 'EDIT',
  CORRECTION: 'CORRECTION',
};

const ANSWER_TYPE_TO_WIDGET_TYPES = {
  SmallAnswer: 'SmallAnswerProblem',
  BigAnswer: 'BigAnswerProblem',
  UploadFileAnswer: 'UploadFileProblem',
  MultiChoiceAnswer: 'MultiChoiceProblem',
  Description: 'Description',
  Image: 'Image',
  Video: 'Video',
  Game: 'Game',
};

const Widget = ({ widget, ...props }) => {

  console.log(widget)

  const { WidgetComponent } =
    WIDGET_TYPES[widget.widget_type];

  return (
    <>
      <WidgetComponent  {...widget} {...props} />
    </>
  );
};

export default Widget;
