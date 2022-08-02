import BigAnswerQuestionWidget, {
  BigAnswerQuestionEditWidget,
} from './BigAnswerQuestionWidget';
import ImageWidget, { ImageEditWidget } from './ImageWidget';
import MiniGameWidget, { MiniGameEditWidget } from './MiniGameWidget';
import MultiChoiceQuestionWidget, {
  MultiChoiceQuestionEditWidget,
} from './MultiChoiceQuestionWidget';
import SmallAnswerQuestionWidget, {
  SmallAnswerQuestionEditWidget,
} from './SmallAnswerQuestionWidget';
import TextWidget, { TextEditWidget } from './TextWidget';
import UploadFileQuestionWidget, {
  UploadFileQuestionEditWidget,
} from './UploadFileQuestionWidget';
import VideoWidget, { VideoEditWidget } from './VideoWidget';

const WIDGET_TYPES = {
  SmallAnswerProblem: {
    WidgetComponent: SmallAnswerQuestionWidget,
    WidgetEditDialog: SmallAnswerQuestionEditWidget,
    label: 'سوال کوتاه پاسخ',
    backendType: 'SmallAnswerProblem',
  },
  BigAnswerProblem: {
    WidgetComponent: BigAnswerQuestionWidget,
    WidgetEditDialog: BigAnswerQuestionEditWidget,
    label: 'سوال بلند پاسخ',
    backendType: 'BigAnswerProblem',
  },
  // MultiChoiceProblem: {
  //   WidgetComponent: MultiChoiceQuestionWidget,
  //   WidgetEditDialog: MultiChoiceQuestionEditWidget,
  //   label: 'سوال چند گزینه‌ای',
  //   backendType: 'MultiChoiceProblem',
  // },
  UploadFileProblem: {
    WidgetComponent: UploadFileQuestionWidget,
    WidgetEditDialog: UploadFileQuestionEditWidget,
    label: 'سوال ارسال فایل',
    backendType: 'UploadFileProblem',
  },
  Description: {
    WidgetComponent: TextWidget,
    WidgetEditDialog: TextEditWidget,
    label: 'متن',
    backendType: 'Description',
  },
  Image: {
    WidgetComponent: ImageWidget,
    WidgetEditDialog: ImageEditWidget,
    label: 'عکس',
    backendType: 'Image',
  },
  Video: {
    WidgetComponent: VideoWidget,
    WidgetEditDialog: VideoEditWidget,
    label: 'فیلم',
    backendType: 'Video',
  },
  Game: {
    WidgetComponent: MiniGameWidget,
    WidgetEditDialog: MiniGameEditWidget,
    label: 'بازی',
    backendType: 'Game',
  },
};
export default WIDGET_TYPES;
