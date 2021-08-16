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
  // fixed "pushAnswer"
  SmallAnswerProblem: {
    WidgetComponent: SmallAnswerQuestionWidget,
    WidgetEditDialog: SmallAnswerQuestionEditWidget,
    label: 'کوتاه پاسخ',
    backendType: 'SmallAnswerProblem',
  },
  // fixed "pushAnswer"
  BigAnswerProblem: {
    WidgetComponent: BigAnswerQuestionWidget,
    WidgetEditDialog: BigAnswerQuestionEditWidget,
    label: 'بلند پاسخ',
    backendType: 'BigAnswerProblem',
  },
  MultiChoiceProblem: {
    WidgetComponent: MultiChoiceQuestionWidget,
    WidgetEditDialog: MultiChoiceQuestionEditWidget,
    label: 'چند گزینه‌ای',
    backendType: 'MultiChoiceProblem',
  },
  UploadFileProblem: {
    WidgetComponent: UploadFileQuestionWidget,
    WidgetEditDialog: UploadFileQuestionEditWidget,
    label: 'فایل',
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
