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

const Widget = ({ widget, mode = MODES.VIEW, ...props }) => {
  const { WidgetComponent } =
    WIDGET_TYPES[
      widget.widget_type || ANSWER_TYPE_TO_WIDGET_TYPES[widget.answer_type]
    ];

  return (
    <div>
      <WidgetComponent {...props} {...widget} mode={mode} />
    </div>
  );
};

export default Widget;
