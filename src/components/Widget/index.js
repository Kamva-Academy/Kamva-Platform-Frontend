import React from 'react';
import BigAnswerQuestionWidget from './BigAnswerQuestionWidget';
import ImageWidget from './ImageWidget';
import TextWidget from './TextWidget';
import VideoWidget from './VideoWidget';
import UploadFileQuestion from './UploadFileQuestion';
import MultiChoiceQuestionWidget from './MultiChoiceQuestionWidget';
import SmallAnswerQuestionWidget from './SmallAnswerQuestionWidget';

const Widget = ({ widget, ...props }) => {
  switch (widget.type) {
    case 'SMALL_ANSWER_QUESTION':
      return <SmallAnswerQuestionWidget {...widget} {...props} />;
    case 'BIG_ANSWER_QUESTION':
      return <BigAnswerQuestionWidget {...widget} {...props} />;
    case 'MULTI_CHOICE_QUESTION':
      return <MultiChoiceQuestionWidget {...widget} {...props} />;
    case 'UPLOAD_FILE_QUESTION':
      return <UploadFileQuestion {...widget} {...props} />;
    case 'TEXT':
      return <TextWidget {...widget} {...props} />;
    case 'VIDEO':
      return <VideoWidget {...widget} {...props} />;
    case 'IMAGE':
      return <ImageWidget {...widget} {...props} />;
    default:
      return <></>;
  }
};

export default Widget;
