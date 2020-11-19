import BigAnswerQuestionWidget, {
  BigAnswerQuestionEditWidget,
} from './BigAnswerQuestionWidget';
import ImageWidget, { ImageEditWidget } from './ImageWidget';
import TextWidget, { TextEditWidget } from './TextWidget';
import VideoWidget, { VideoEditWidget } from './VideoWidget';
import UploadFileQuestionWidget, {
  UploadFileQuestionEditWidget,
} from './UploadFileQuestionWidget';
import MultiChoiceQuestionWidget, {
  MultiChoiceQuestionEditWidget,
} from './MultiChoiceQuestionWidget';
import SmallAnswerQuestionWidget, {
  SmallAnswerQuestionEditWidget,
} from './SmallAnswerQuestionWidget';



const WIDGET_TYPES = {
  ProblemSmallAnswer: {
    WidgetComponent: SmallAnswerQuestionWidget,
    WidgetEditDialog: SmallAnswerQuestionEditWidget,
    label: 'کوتاه پاسخ',
    backendType: 'ProblemSmallAnswer',
  },
  ProblemBigAnswer: {
    WidgetComponent: BigAnswerQuestionWidget,
    WidgetEditDialog: BigAnswerQuestionEditWidget,
    label: 'بلند پاسخ',
    backendType: 'ProblemBigAnswer',
  },
  ProblemMultiChoice: {
    WidgetComponent: MultiChoiceQuestionWidget,
    WidgetEditDialog: MultiChoiceQuestionEditWidget,
    label: 'چند گزینه‌ای',
    backendType: 'ProblemMultiChoice',
  },
  ProblemUploadFileAnswer: {
    WidgetComponent: UploadFileQuestionWidget,
    WidgetEditDialog: UploadFileQuestionEditWidget,
    label: 'فایل',
    backendType: 'ProblemUploadFileAnswer',
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
};
export default WIDGET_TYPES;
