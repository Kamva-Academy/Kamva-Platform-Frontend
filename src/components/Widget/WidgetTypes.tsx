import { WidgetType } from '../../types/Widget';
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
    EditWidgetDialog: SmallAnswerQuestionEditWidget,
    label: 'سوال کوتاه پاسخ',
    backendType: 'SmallAnswerProblem',
  },
  BigAnswerProblem: {
    WidgetComponent: BigAnswerQuestionWidget,
    EditWidgetDialog: BigAnswerQuestionEditWidget,
    label: 'سوال بلند پاسخ',
    backendType: 'BigAnswerProblem',
  },
  // MultiChoiceProblem: {
  //   WidgetComponent: MultiChoiceQuestionWidget,
  //   EditWidgetDialog: MultiChoiceQuestionEditWidget,
  //   label: 'سوال چند گزینه‌ای',
  //   backendType: 'MultiChoiceProblem',
  // },
  UploadFileProblem: {
    WidgetComponent: UploadFileQuestionWidget,
    EditWidgetDialog: UploadFileQuestionEditWidget,
    label: 'سوال ارسال فایل',
    backendType: 'UploadFileProblem',
  },
  Description: {
    WidgetComponent: TextWidget,
    EditWidgetDialog: TextEditWidget,
    label: 'متن',
    backendType: 'Description',
  },
  Image: {
    WidgetComponent: ImageWidget,
    EditWidgetDialog: ImageEditWidget,
    label: 'عکس',
    backendType: 'Image',
  },
  Video: {
    WidgetComponent: VideoWidget,
    EditWidgetDialog: VideoEditWidget,
    label: 'فیلم',
    backendType: 'Video',
  },
  Game: {
    WidgetComponent: MiniGameWidget,
    EditWidgetDialog: MiniGameEditWidget,
    label: 'بازی',
    backendType: 'Game',
  },
};
export default WIDGET_TYPES;
