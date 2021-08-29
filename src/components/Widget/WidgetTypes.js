import BigAnswerQuestionWidget from './BigAnswerQuestionWidget';
import ImageWidget from './ImageWidget';
import MiniGameWidget from './MiniGameWidget';
import MultiChoiceQuestionWidget from './MultiChoiceQuestionWidget';
import SmallAnswerQuestionWidget from './SmallAnswerQuestionWidget';
import TextWidget from './TextWidget';
import UploadFileQuestionWidget from './UploadFileQuestionWidget';
import VideoWidget from './VideoWidget';

const WIDGET_TYPES = {
  SmallAnswerProblem: {
    WidgetComponent: SmallAnswerQuestionWidget,
    label: 'کوتاه پاسخ',
    backendType: 'SmallAnswerProblem',
  },
  BigAnswerProblem: {
    WidgetComponent: BigAnswerQuestionWidget,
    label: 'بلند پاسخ',
    backendType: 'BigAnswerProblem',
  },
  MultiChoiceProblem: {
    WidgetComponent: MultiChoiceQuestionWidget,
    label: 'چند گزینه‌ای',
    backendType: 'MultiChoiceProblem',
  },
  UploadFileProblem: {
    WidgetComponent: UploadFileQuestionWidget,
    label: 'فایل',
    backendType: 'UploadFileProblem',
  },
  Description: {
    WidgetComponent: TextWidget,
    label: 'متن',
    backendType: 'Description',
  },
  Image: {
    WidgetComponent: ImageWidget,
    label: 'عکس',
    backendType: 'Image',
  },
  Video: {
    WidgetComponent: VideoWidget,
    label: 'فیلم',
    backendType: 'Video',
  },
  Game: {
    WidgetComponent: MiniGameWidget,
    label: 'بازی',
    backendType: 'Game',
  },
};
export default WIDGET_TYPES;
