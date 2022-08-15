import BigAnswerProblemWidget, {
  BigAnswerQuestionEditWidget,
} from './BigAnswerProblemWidget';
import ImageWidget, { ImageEditWidget } from './ImageWidget';
import MiniGameWidget, { MiniGameEditWidget } from './MiniGameWidget';
import MultiChoiceQuestionWidget, {
  MultiChoiceQuestionEditWidget,
} from './MultiChoiceQuestionWidget';
import SmallAnswerProblemWidget, {
  SmallAnswerProblemEditWidget,
} from './SmallAnswerProblemWidget';
import TextWidget, { TextEditWidget } from './TextWidget';
import UploadFileProblemWidget, {
  UploadFileProblemEditWidget,
} from './UploadFileProblemWidget';
import VideoWidget, { VideoEditWidget } from './VideoWidget';

const WIDGET_TYPES = {
  SmallAnswerProblem: {
    WidgetComponent: SmallAnswerProblemWidget,
    EditWidgetDialog: SmallAnswerProblemEditWidget,
    label: 'سوال کوتاه‌پاسخ',
    backendType: 'SmallAnswerProblem',
  },
  BigAnswerProblem: {
    WidgetComponent: BigAnswerProblemWidget,
    EditWidgetDialog: BigAnswerQuestionEditWidget,
    label: 'سوال تشریحی',
    backendType: 'BigAnswerProblem',
  },
  // MultiChoiceProblem: {
  //   WidgetComponent: MultiChoiceQuestionWidget,
  //   EditWidgetDialog: MultiChoiceQuestionEditWidget,
  //   label: 'سوال چند گزینه‌ای',
  //   backendType: 'MultiChoiceProblem',
  // },
  UploadFileProblem: {
    WidgetComponent: UploadFileProblemWidget,
    EditWidgetDialog: UploadFileProblemEditWidget,
    label: 'ارسال فایل',
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
